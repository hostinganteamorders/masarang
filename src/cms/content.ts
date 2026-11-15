import "server-only";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { Overrides } from "./apply";
import { readDoc, remote, writeDoc } from "./store";

/** Selalu objek baru: draf diubah langsung, jadi tidak boleh ada bagian yang dipakai bersama. */
export const emptyOverrides = (): Overrides => ({ text: {}, values: {}, photos: {}, lists: {} });
type LogEntry = { t: string; who: string; what: string };

export const getDraft = async (): Promise<Overrides> => ({ ...emptyOverrides(), ...(await readDoc<Partial<Overrides>>("draft", {})) });
export const getPublished = async (): Promise<Overrides> => ({ ...emptyOverrides(), ...(await readDoc<Partial<Overrides>>("published", {})) });
export const getLog = () => readDoc<LogEntry[]>("log", []);

/** Di komputer sendiri berkas overrides.json ikut diperbarui agar `next dev` langsung menampilkan perubahan. */
async function mirrorLocal(data: Overrides) {
  if (remote || process.env.VERCEL) return;
  await writeFile(path.join(process.cwd(), "src/cms/overrides.json"), JSON.stringify(data, null, 2) + "\n");
}

async function log(who: string, what: string) {
  const entries = await getLog();
  entries.unshift({ t: new Date().toISOString(), who, what });
  await writeDoc("log", entries.slice(0, 100));
}

/** Ubah draf: `mutate` menerima salinan dan mengubahnya langsung. */
export async function updateDraft(who: string, what: string, mutate: (d: Overrides) => void) {
  const draft = await getDraft();
  mutate(draft);
  await writeDoc("draft", draft);
  await mirrorLocal(draft);
  await log(who, what);
}

const canon = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(canon)
    : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b)).map(([k, x]) => [k, canon(x)]))
      : v;
const same = (a: unknown, b: unknown) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));

/** Berapa banyak butir yang berbeda antara draf dan yang sudah terbit, per jenis. */
export async function pending() {
  const [d, p] = await Promise.all([getDraft(), getPublished()]);
  const count = (a: Record<string, unknown>, b: Record<string, unknown>) =>
    new Set([...Object.keys(a), ...Object.keys(b)]).size
      ? [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => !same(a[k], b[k])).length
      : 0;
  return {
    text: count(d.text, p.text),
    // Penanda contoh (.ph) yang ikut berubah bersama nilainya (.v) tidak dihitung dua kali.
    values: (() => {
      const keys = [...new Set([...Object.keys(d.values), ...Object.keys(p.values)])].filter((k) => !same(d.values[k], p.values[k]));
      const changed = new Set(keys);
      return keys.filter((k) => !(k.endsWith(".ph") && changed.has(`${k.slice(0, -3)}.v`))).length;
    })(),
    photos: count(d.photos, p.photos),
    lists: count(d.lists, p.lists),
  };
}

/** Terbitkan: draf menjadi isi yang dipakai build, lalu minta Vercel membangun ulang bila ada Deploy Hook. */
export async function publish(who: string): Promise<{ triggered: boolean; error?: string }> {
  const draft = await getDraft();
  await writeDoc("published", draft);
  await mirrorLocal(draft);
  await log(who, "Menerbitkan perubahan");
  revalidatePath("/[locale]", "layout");
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) return { triggered: false };
  try {
    const res = await fetch(hook, { method: "POST", cache: "no-store" });
    return res.ok ? { triggered: true } : { triggered: false, error: `Deploy Hook membalas ${res.status}` };
  } catch (e) {
    return { triggered: false, error: (e as Error).message };
  }
}
