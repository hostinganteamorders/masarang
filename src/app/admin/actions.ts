"use server";

import { redirect } from "next/navigation";
import { checkOwnerPassword, hashPassword, listUsers, login, logout, requireUser, saveUsers, setOwnerAccount, startSession } from "@/cms/auth";
import { publish, updateDraft } from "@/cms/content";
import { flatten, placeholders } from "@/cms/walk";
import { defaultsFor, scopeById } from "@/cms/scopes";
import { defaultAt, defaultValue, fieldKey, VALUE_GROUPS, type ValueField } from "@/cms/value-fields";

export type FormState = { ok?: boolean; message?: string; errors?: string[]; username?: string } | undefined;

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

export async function loginAction(_: FormState, form: FormData): Promise<FormState> {
  const username = str(form.get("username"));
  const error = await login(username, str(form.get("password")));
  if (error) return { message: error, username };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

/** Simpan semua teks satu halaman sebagai draf. Hanya jalur yang memang ada di konten bawaan yang diterima. */
export async function saveTextAction(scope: string, _: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  if (!scopeById(scope)) return { message: "Berkas teks tidak dikenal." };
  const base = defaultsFor(scope);
  if (!base) return { message: "Isi bawaan tidak ditemukan." };

  const original = new Map<string, string>();
  for (const lang of ["en", "id"] as const) for (const { path, value } of flatten(base[lang])) original.set(`${lang}.${path}`, value);

  const errors: string[] = [];
  const next = new Map<string, string | null>(); // jalur -> teks baru, atau null bila kembali ke bawaan
  for (const [name, raw] of form.entries()) {
    if (!name.startsWith("t:")) continue;
    const key = name.slice(2);
    const was = original.get(key);
    if (was === undefined || typeof raw !== "string") continue;
    const value = raw.replace(/\r\n/g, "\n");
    if (value.length > 6000) {
      errors.push(`${key}: terlalu panjang (maks. 6000 karakter).`);
      continue;
    }
    if (value === was) next.set(key, null);
    else if (placeholders(value).join() !== placeholders(was).join()) {
      errors.push(`${key}: penanda seperti {q} atau {year} harus tetap ada dan tidak berubah.`);
    } else next.set(key, value);
  }
  if (errors.length) return { message: "Ada isian yang ditolak; tidak ada yang disimpan.", errors: errors.slice(0, 8) };

  let changed = 0;
  await updateDraft(user.username, `Mengedit teks: ${scopeById(scope)!.label}`, (d) => {
    for (const [key, value] of next) {
      const full = `${scope}.${key}`;
      if (value === null) {
        if (full in d.text) {
          delete d.text[full];
          changed++;
        }
      } else if (d.text[full] !== value) {
        d.text[full] = value;
        changed++;
      }
    }
  });
  return { ok: true, message: changed ? `Draf tersimpan (${changed} perubahan). Tekan "Terbitkan" di Beranda admin agar tayang.` : "Tidak ada perubahan." };
}

export async function publishAction(): Promise<FormState> {
  const user = await requireUser();
  const r = await publish(user.username);
  if (r.error) return { message: `Tersimpan, tetapi gagal memicu pembangunan ulang: ${r.error}` };
  return {
    ok: true,
    message: r.triggered
      ? "Diterbitkan. Situs sedang dibangun ulang dan akan tayang dalam sekitar 1–2 menit."
      : "Diterbitkan ke penyimpanan. Belum ada Deploy Hook, jadi bangun ulang situs dari Vercel (Redeploy) agar tayang.",
  };
}

export async function addUserAction(_: FormState, form: FormData): Promise<FormState> {
  await requireUser("owner");
  const username = str(form.get("username")).trim().toLowerCase();
  const password = str(form.get("password"));
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) return { message: "Nama pengguna 3–32 karakter: huruf kecil, angka, titik, garis bawah, atau strip." };
  if (password.length < 10) return { message: "Sandi minimal 10 karakter." };
  const users = await listUsers();
  if (users.some((u) => u.username === username)) return { message: "Nama pengguna itu sudah terdaftar." };
  users.push({ username, role: "editor", hash: await hashPassword(password) });
  await saveUsers(users);
  return { ok: true, message: `Editor ${username} ditambahkan.` };
}

export async function removeUserAction(form: FormData) {
  await requireUser("owner");
  const username = str(form.get("username"));
  await saveUsers((await listUsers()).filter((u) => u.username !== username));
  redirect("/admin/users");
}

export async function changePasswordAction(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireUser();
  const password = str(form.get("password"));
  if (password.length < 10) return { message: "Sandi minimal 10 karakter." };
  const users = await listUsers();
  const user = users.find((u) => u.username === me.username);
  if (!user) return { message: "Akun pemilik diatur lewat variabel lingkungan ADMIN_PASSWORD di Vercel, bukan di sini." };
  user.hash = await hashPassword(password);
  await saveUsers(users);
  return { ok: true, message: "Sandi diganti." };
}

/** Simpan isian nilai tunggal (video, tautan, pengaturan). */
export async function saveValuesAction(groupId: string, _: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const group = VALUE_GROUPS.find((g) => g.id === groupId);
  if (!group) return { message: "Kelompok tidak dikenal." };

  const errors: string[] = [];
  const changes: { f: ValueField; value: string | number | boolean | null }[] = [];
  for (const f of group.fields) {
    const raw = f.kind === "bool" ? (form.get(`v:${f.id}`) === "on") : str(form.get(`v:${f.id}`)).trim();
    const def = defaultValue(f);
    if (f.kind === "bool") {
      changes.push({ f, value: raw === def ? null : (raw as boolean) });
    } else if (raw === "" || raw === String(def ?? "")) {
      changes.push({ f, value: null });
    } else if (f.kind === "url") {
      if (!/^(https:\/\/|http:\/\/|\/)[^\s]+$/.test(raw as string)) errors.push(`${f.label}: alamat harus diawali https://`);
      else changes.push({ f, value: raw as string });
    } else if (f.kind === "number") {
      const n = Number(raw);
      if (!Number.isFinite(n)) errors.push(`${f.label}: harus berupa angka.`);
      else changes.push({ f, value: n });
    } else {
      if ((raw as string).length > 300) errors.push(`${f.label}: terlalu panjang.`);
      else changes.push({ f, value: raw as string });
    }
  }
  if (errors.length) return { message: "Ada isian yang ditolak; tidak ada yang disimpan.", errors };

  await updateDraft(user.username, `Mengubah ${group.title.toLowerCase()}`, (d) => {
    for (const { f, value } of changes) {
      const key = fieldKey(f);
      if (value === null) delete d.values[key];
      else d.values[key] = value;
      if (f.clearPh) {
        // Kotak "Masih contoh": disimpan hanya bila berbeda dari keadaan awal.
        const checked = form.get(`ph:${f.id}`) === "on";
        if (checked === (defaultAt(f.clearPh) === true)) delete d.values[f.clearPh];
        else d.values[f.clearPh] = checked;
      }
    }
  });
  return { ok: true, message: 'Draf tersimpan. Tekan "Terbitkan" di Beranda admin agar tayang.' };
}

/** Pemilik mengganti nama pengguna dan sandinya sendiri. */
export async function changeOwnerAction(_: FormState, form: FormData): Promise<FormState> {
  const me = await requireUser("owner");
  const username = str(form.get("username")).trim().toLowerCase();
  const current = str(form.get("current"));
  const password = str(form.get("password"));
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) return { message: "Nama pengguna 3–32 karakter: huruf kecil, angka, titik, garis bawah, atau strip." };
  if (password.length < 10) return { message: "Sandi baru minimal 10 karakter." };
  if (!(await checkOwnerPassword(me.username, current))) {
    await new Promise((r) => setTimeout(r, 500));
    return { message: "Sandi saat ini salah." };
  }
  const error = await setOwnerAccount(me.username, username, password);
  if (error) return { message: error };
  await startSession(username);
  return { ok: true, message: "Akun pemilik diganti. Gunakan nama pengguna dan sandi baru untuk masuk berikutnya." };
}
