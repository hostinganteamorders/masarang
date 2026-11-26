"use server";

import { requireUser } from "@/cms/auth";
import type { PicData } from "@/cms/apply";
import { updateDraft } from "@/cms/content";
import { GALLERY_LABELS, SLOT_LABELS } from "@/cms/photo-slots";
import { putFile } from "@/cms/store";
import type { FormState } from "./actions";

const MAX_BYTES = 3_500_000;
const SRC_OK = /^(\/photos\/[\w./-]+|\/uploads\/[\w./-]+|https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+)$/;

function cleanPic(raw: unknown): PicData | string {
  if (typeof raw !== "object" || raw === null) return "Data foto tidak valid.";
  const p = raw as Record<string, unknown>;
  const alt = p.alt as Record<string, unknown> | undefined;
  if (typeof p.src !== "string" || !SRC_OK.test(p.src)) return "Alamat foto tidak dikenal.";
  const w = Number(p.w);
  const h = Number(p.h);
  if (!Number.isInteger(w) || !Number.isInteger(h) || w < 50 || h < 50 || w > 8000 || h > 8000) return "Ukuran foto tidak valid.";
  if (typeof p.color !== "string" || !/^#[0-9a-f]{6}$/i.test(p.color)) return "Warna rata-rata tidak valid.";
  if (p.focus !== undefined && (typeof p.focus !== "string" || !/^\d{1,3}(\.\d+)?% \d{1,3}(\.\d+)?%$/.test(p.focus))) return "Titik fokus tidak valid.";
  const en = typeof alt?.en === "string" ? alt.en.trim() : "";
  const id = typeof alt?.id === "string" ? alt.id.trim() : "";
  if (!en || !id) return "Keterangan foto (alt) wajib diisi dalam Inggris dan Indonesia.";
  if (en.length > 300 || id.length > 300) return "Keterangan foto terlalu panjang (maks. 300 karakter).";
  return { src: p.src, w, h, color: p.color.toLowerCase(), focus: p.focus as string | undefined, alt: { en, id } };
}

/** Unggah satu foto yang sudah dikecilkan di browser. Belum mengubah draf; hanya menyimpan berkasnya. */
export async function uploadImageAction(form: FormData): Promise<{ error?: string; src?: string; w?: number; h?: number; color?: string }> {
  await requireUser();
  const file = form.get("file");
  if (!(file instanceof File)) return { error: "Berkas tidak ada." };
  if (file.size > MAX_BYTES) return { error: "Foto terlalu besar (maks. 3,5 MB setelah dikecilkan)." };
  const data = Buffer.from(await file.arrayBuffer());
  // Hanya JPEG (browser mengonversi semuanya ke JPEG sebelum dikirim); periksa isi, bukan hanya nama.
  if (!(data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff)) return { error: "Berkas bukan foto JPEG." };
  const w = Number(form.get("w"));
  const h = Number(form.get("h"));
  const color = String(form.get("color") ?? "");
  if (!Number.isInteger(w) || !Number.isInteger(h) || !/^#[0-9a-f]{6}$/i.test(color)) return { error: "Data foto tidak lengkap." };
  const name = String(form.get("name") ?? "foto").slice(0, 40);
  try {
    const src = await putFile(`${name}.jpg`, data, "image/jpeg");
    return { src, w, h, color };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function saveSlotAction(path: string, pic: unknown): Promise<FormState> {
  const user = await requireUser();
  if (!(path in SLOT_LABELS)) return { message: "Tempat foto tidak dikenal." };
  if (pic === null) {
    await updateDraft(user.username, `Mengembalikan foto: ${SLOT_LABELS[path].label}`, (d) => void delete d.photos[path]);
    return { ok: true, message: "Dikembalikan ke foto awal (draf)." };
  }
  const clean = cleanPic(pic);
  if (typeof clean === "string") return { message: clean };
  await updateDraft(user.username, `Mengganti foto: ${SLOT_LABELS[path].label}`, (d) => void (d.photos[path] = clean));
  return { ok: true, message: 'Foto tersimpan sebagai draf. Tekan "Terbitkan" di Beranda admin agar tayang.' };
}

export async function saveGalleryAction(path: string, pics: unknown): Promise<FormState> {
  const user = await requireUser();
  if (!(path in GALLERY_LABELS)) return { message: "Galeri tidak dikenal." };
  const key = `photos.${path}`;
  if (pics === null) {
    await updateDraft(user.username, `Mengembalikan galeri: ${GALLERY_LABELS[path].label}`, (d) => void delete d.lists[key]);
    return { ok: true, message: "Dikembalikan ke galeri awal (draf)." };
  }
  if (!Array.isArray(pics) || pics.length < 1 || pics.length > 40) return { message: "Galeri harus berisi 1–40 foto." };
  const clean: PicData[] = [];
  for (const [i, raw] of pics.entries()) {
    const c = cleanPic(raw);
    if (typeof c === "string") return { message: `Foto nomor ${i + 1}: ${c}` };
    clean.push(c);
  }
  await updateDraft(user.username, `Mengubah galeri: ${GALLERY_LABELS[path].label}`, (d) => void (d.lists[key] = clean));
  return { ok: true, message: 'Galeri tersimpan sebagai draf. Tekan "Terbitkan" di Beranda admin agar tayang.' };
}
