import "server-only";
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { bump, clearBump, misconfigured, readDoc, writeDoc } from "./store";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

export type Role = "owner" | "editor";
export type User = { username: string; role: Role; hash?: string; name?: string };

const COOKIE = "masarang_admin";
const MAX_AGE = 60 * 60 * 24 * 7;
const dev = process.env.NODE_ENV !== "production";

/** Rahasia penanda tangan sesi. Di produksi wajib diisi lewat ADMIN_SECRET. */
function secret(): string {
  const s = process.env.ADMIN_SECRET;
  if (s && s.length >= 16) return s;
  if (dev) return "masarang-dev-secret-jangan-dipakai-di-produksi";
  throw new Error("ADMIN_SECRET belum diisi (minimal 16 karakter).");
}

/** Pemilik bawaan dari variabel lingkungan; saat pengembangan lokal ada akun contoh. */
function envOwner(): { username: string; password: string } | null {
  // ADMIN_EMAIL masih dibaca agar pasangan variabel lama tetap berfungsi.
  const username = (process.env.ADMIN_USERNAME ?? process.env.ADMIN_EMAIL)?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (username && password) return { username, password };
  if (dev) return { username: "admin", password: "masarang-dev" };
  return null;
}
export const devLogin = dev && !process.env.ADMIN_USERNAME && !process.env.ADMIN_EMAIL ? { username: "admin", password: "masarang-dev" } : null;

export async function hashPassword(pw: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(pw, salt, 32);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}
async function checkHash(pw: string, stored: string): Promise<boolean> {
  const [kind, saltHex, keyHex] = stored.split("$");
  if (kind !== "scrypt" || !saltHex || !keyHex) return false;
  const key = await scrypt(pw, Buffer.from(saltHex, "hex"), 32);
  const want = Buffer.from(keyHex, "hex");
  return key.length === want.length && timingSafeEqual(key, want);
}
function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function listUsers(): Promise<User[]> {
  // Akun lama tersimpan dengan kolom "email"; dibaca sebagai nama pengguna.
  const rows = await readDoc<(Partial<User> & { email?: string })[]>("users", []);
  return rows.map((u) => ({ ...u, username: (u.username ?? u.email ?? "").toLowerCase() }) as User);
}
export async function saveUsers(users: User[]) {
  await writeDoc("users", users);
}

async function findUser(username: string): Promise<User | null> {
  const owner = envOwner();
  if (owner && owner.username === username) return { username, role: "owner" };
  return (await listUsers()).find((u) => u.username === username) ?? null;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

/** Periksa nama pengguna dan sandi; pasang cookie sesi bila benar. Mengembalikan pesan galat atau null. */
export async function login(usernameRaw: string, password: string): Promise<string | null> {
  if (misconfigured) return "Penyimpanan belum dipasang di Vercel, lihat panduan admin.";
  const username = usernameRaw.trim().toLowerCase();
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "lokal";
  const key = `login:${username}:${ip}`;
  if ((await bump(key, 15 * 60)) > 8) return "Terlalu banyak percobaan. Coba lagi dalam 15 menit.";

  let ok = false;
  const owner = envOwner();
  if (owner && owner.username === username) ok = same(owner.password, password);
  if (!ok) {
    const user = (await listUsers()).find((u) => u.username === username);
    if (user?.hash) ok = await checkHash(password, user.hash);
  }
  if (!ok) {
    await new Promise((r) => setTimeout(r, 500));
    return "Nama pengguna atau sandi salah.";
  }
  await clearBump(key);
  const payload = Buffer.from(JSON.stringify({ e: username, x: Math.floor(Date.now() / 1000) + MAX_AGE })).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: !dev,
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE,
  });
  return null;
}

export async function logout() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

/** Pengguna yang sedang masuk, atau null. */
export async function currentUser(): Promise<User | null> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return null;
  const [payload, sig] = value.split(".");
  if (!payload || !sig || !same(sig, sign(payload))) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e: string; x: number };
    if (x < Date.now() / 1000) return null;
    return await findUser(e);
  } catch {
    return null;
  }
}

/** Dipanggil di awal setiap halaman dan aksi admin. */
export async function requireUser(role?: Role): Promise<User> {
  const user = await currentUser();
  if (!user) redirect("/admin/login");
  if (role === "owner" && user.role !== "owner") redirect("/admin");
  return user;
}
