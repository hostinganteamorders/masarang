import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Penyimpanan admin. Di Vercel: Redis (Upstash) lewat REST untuk dokumen JSON dan Vercel Blob untuk berkas.
 * Tanpa itu (komputer sendiri): berkas di folder `.cms-data/` dan foto di `public/uploads/`.
 * Dokumen: "draft" (yang sedang diedit), "published" (yang dipakai build), "users", "log".
 */
const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export const remote = Boolean(REDIS_URL && REDIS_TOKEN);
export const blobReady = Boolean(BLOB_TOKEN);
/** Di Vercel penyimpanan harus dipasang; berkas lokal tidak bisa ditulis di sana. */
export const misconfigured = Boolean(process.env.VERCEL) && !remote;

const DIR = path.join(process.cwd(), ".cms-data");

async function redis<T>(...command: (string | number)[]): Promise<T> {
  const res = await fetch(REDIS_URL!, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new Error(`Redis: ${data.error ?? res.status}`);
  return data.result as T;
}

export async function readDoc<T>(name: string, fallback: T): Promise<T> {
  if (misconfigured) return fallback;
  if (remote) {
    const text = await redis<string | null>("GET", `cms:${name}`);
    return text ? (JSON.parse(text) as T) : fallback;
  }
  try {
    return JSON.parse(await readFile(path.join(DIR, `${name}.json`), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeDoc(name: string, value: unknown): Promise<void> {
  if (misconfigured) throw new Error("Penyimpanan belum dipasang di Vercel (lihat panduan admin di README).");
  const text = JSON.stringify(value);
  if (remote) {
    await redis("SET", `cms:${name}`, text);
    return;
  }
  await mkdir(DIR, { recursive: true });
  const file = path.join(DIR, `${name}.json`);
  await writeFile(`${file}.tmp`, text);
  await rename(`${file}.tmp`, file);
}

/** Penghitung dengan masa berlaku, untuk membatasi percobaan masuk. */
const memory = new Map<string, { n: number; until: number }>();
export async function bump(key: string, windowSeconds: number): Promise<number> {
  if (remote) {
    const n = await redis<number>("INCR", `cms:rl:${key}`);
    if (n === 1) await redis("EXPIRE", `cms:rl:${key}`, windowSeconds);
    return n;
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.until < now) {
    memory.set(key, { n: 1, until: now + windowSeconds * 1000 });
    return 1;
  }
  entry.n += 1;
  return entry.n;
}
export async function clearBump(key: string) {
  if (remote) await redis("DEL", `cms:rl:${key}`);
  else memory.delete(key);
}

/** Simpan berkas (foto atau PDF) dan kembalikan alamat publiknya. */
export async function putFile(name: string, data: Buffer, contentType: string): Promise<string> {
  const safe = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "berkas";
  if (blobReady) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`cms/${safe}`, data, { access: "public", addRandomSuffix: true, contentType });
    return blob.url;
  }
  if (process.env.VERCEL) throw new Error("Vercel Blob belum dipasang (lihat panduan admin di README).");
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const unique = `${Date.now().toString(36)}-${safe}`;
  await writeFile(path.join(dir, unique), data);
  return `/uploads/${unique}`;
}
