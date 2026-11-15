"use server";

import { requireUser } from "@/cms/auth";
import { collection, cleanList, defaultList, fieldsFor, governanceFromTeam } from "@/cms/collections";
import { getDraft, updateDraft } from "@/cms/content";
import { putFile } from "@/cms/store";
import type { FormState } from "./actions";

const MAX_IMAGE = 3_500_000;
const MAX_PDF = 3_500_000;

const isJpeg = (d: Buffer) => d[0] === 0xff && d[1] === 0xd8 && d[2] === 0xff;
const isPng = (d: Buffer) => d[0] === 0x89 && d[1] === 0x50 && d[2] === 0x4e && d[3] === 0x47;
const isPdf = (d: Buffer) => d.subarray(0, 5).toString("latin1") === "%PDF-";

/** Simpan seluruh daftar sebagai draf. */
export async function saveListAction(id: string, items: unknown): Promise<NonNullable<FormState> & { items?: Record<string, unknown>[] }> {
  const user = await requireUser();
  const c = collection(id);
  if (!c) return { message: "Daftar tidak dikenal." };
  const before = await getDraft();
  const r = cleanList(c, items, fieldsFor(c, before.lists));
  if ("errors" in r) return { message: "Ada isian yang ditolak; tidak ada yang disimpan.", errors: r.errors.slice(0, 12) };
  if (c.id === "species") {
    const bad: string[] = [];
    const codes = new Set<string>();
    for (const sp of r.items) {
      const code = String(sp.code ?? "").toUpperCase();
      if (!/^[A-Z]{1,4}$/.test(code)) bad.push(`Kode register "${sp.code}" harus 1–4 huruf.`);
      else if (codes.has(code)) bad.push(`Kode register ${code} dipakai dua spesies.`);
      codes.add(code);
      sp.code = code;
    }
    // Spesies yang masih dipakai satwa tidak boleh dihapus.
    const reg = Array.isArray(before.lists.animals) ? before.lists.animals : defaultList(collection("animals")!);
    const ids = new Set(r.items.map((x) => x.id));
    const used = [...new Set((reg as { speciesId: string }[]).map((a) => a.speciesId))].filter((id) => !ids.has(id));
    if (used.length) bad.push(`Spesies ini masih dipakai di Register satwa dan tidak boleh dihapus: ${used.join(", ")}. Pindahkan satwanya dulu.`);
    if (bad.length) return { message: "Ada isian yang ditolak; tidak ada yang disimpan.", errors: bad };
  }
  await updateDraft(user.email, `Mengubah daftar: ${c.title}`, (d) => {
    d.lists[c.listName] = r.items;
    if (c.id === "team") d.lists.governance = governanceFromTeam(r.items);
  });
  return { ok: true, items: r.items, message: 'Draf tersimpan. Tekan "Terbitkan" di Beranda admin agar tayang.' };
}

/** Kembalikan daftar ke isi awal (hapus perubahan draf). */
export async function restoreListAction(id: string): Promise<NonNullable<FormState>> {
  const user = await requireUser();
  const c = collection(id);
  if (!c) return { message: "Daftar tidak dikenal." };
  await updateDraft(user.email, `Mengembalikan daftar: ${c.title}`, (d) => {
    delete d.lists[c.listName];
    if (c.id === "team") delete d.lists.governance;
  });
  return { ok: true, message: "Dikembalikan ke isi awal (draf). Muat ulang halaman untuk melihatnya." };
}

/** Unggah satu berkas untuk isian daftar: PDF, atau gambar (JPEG/PNG) yang sudah dikecilkan di browser. */
export async function uploadAssetAction(form: FormData): Promise<{ error?: string; src?: string }> {
  await requireUser();
  const file = form.get("file");
  const kind = String(form.get("kind") ?? "");
  if (!(file instanceof File)) return { error: "Berkas tidak ada." };
  const data = Buffer.from(await file.arrayBuffer());
  const name = String(form.get("name") ?? "berkas").slice(0, 40);
  try {
    if (kind === "pdf") {
      if (data.length > MAX_PDF) return { error: "PDF terlalu besar (maks. 3,5 MB). Unggah ke Google Drive lalu tempel alamatnya." };
      if (!isPdf(data)) return { error: "Berkas bukan PDF." };
      return { src: await putFile(`${name.replace(/\.pdf$/i, "")}.pdf`, data, "application/pdf") };
    }
    if (kind === "image") {
      if (data.length > MAX_IMAGE) return { error: "Gambar terlalu besar (maks. 3,5 MB)." };
      if (isJpeg(data)) return { src: await putFile(`${name}.jpg`, data, "image/jpeg") };
      if (isPng(data)) return { src: await putFile(`${name}.png`, data, "image/png") };
      return { error: "Gambar harus JPEG atau PNG." };
    }
    return { error: "Jenis berkas tidak dikenal." };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
