/**
 * Penerapan perubahan dari admin ke konten bawaan. Berkas `overrides.json` dibuat saat build dari isi yang
 * diterbitkan di admin (lihat `scripts/pull-cms.mjs`), sehingga perubahan ikut terkirim ke komponen server
 * maupun klien tanpa komponen perlu tahu admin ada. Berkas ini aman dipakai di sisi klien.
 *
 * - `text`   : "<scope>.<bahasa>.<jalur>" -> teks pengganti (hanya menimpa teks yang sudah ada).
 * - `values` : "<scope>.<jalur>" -> nilai tunggal (alamat video, tombol draf, angka...).
 * - `photos` : "<jalur slot>" -> foto unggahan pengganti.
 * - `lists`  : nama daftar -> seluruh isi daftar pengganti (laporan, mitra, galeri...).
 */
import raw from "./overrides.json";

export type PicData = {
  src: string;
  w: number;
  h: number;
  /** Warna rata-rata (hex) untuk latar saat foto dimuat. */
  color: string;
  /** object-position CSS, mis. "50% 30%". */
  focus?: string;
  alt: { en: string; id: string };
};

export type Overrides = {
  text: Record<string, string>;
  values: Record<string, string | number | boolean | null>;
  photos: Record<string, PicData>;
  lists: Record<string, unknown[]>;
};

export const overrides: Overrides = {
  text: {},
  values: {},
  photos: {},
  lists: {},
  ...(raw as Partial<Overrides>),
};

/** Nilai bawaan (sebelum perubahan admin), dipakai editor untuk menampilkan "asli" dan tombol reset. */
export const defaults = {
  text: new Map<string, unknown>(),
  values: new Map<string, unknown>(),
  lists: new Map<string, unknown[]>(),
  photos: new Map<string, unknown>(),
};

type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain => typeof v === "object" && v !== null && !Array.isArray(v);

function clone<T>(v: T): T {
  if (Array.isArray(v)) return v.map(clone) as T;
  if (isPlain(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clone(x)])) as T;
  return v;
}

/** Jalur "a.b.0.c" -> bagian-bagian; menelusuri objek dan larik. Mengembalikan induk dan kunci terakhir. */
function walk(root: unknown, parts: string[], create: boolean): { parent: Plain | unknown[]; key: string } | null {
  let node: unknown = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    let next = Array.isArray(node) ? node[Number(key)] : isPlain(node) ? node[key] : undefined;
    if (next === undefined && create && isPlain(node)) {
      next = {};
      node[key] = next;
    }
    if (typeof next !== "object" || next === null) return null;
    node = next;
  }
  if (typeof node !== "object" || node === null) return null;
  return { parent: node as Plain | unknown[], key: parts[parts.length - 1] };
}

/** Terapkan teks pengganti untuk satu berkas konten. Hanya menimpa teks yang memang sudah ada. */
export function cmsText<T extends object>(scope: string, obj: T): T {
  defaults.text.set(scope, obj);
  const prefix = `${scope}.`;
  const entries = Object.entries(overrides.text).filter(([k]) => k.startsWith(prefix));
  if (!entries.length) return obj;
  const copy = clone(obj);
  for (const [k, value] of entries) {
    const hit = walk(copy, k.slice(prefix.length).split("."), false);
    if (!hit) continue;
    const { parent, key } = hit;
    const current = Array.isArray(parent) ? parent[Number(key)] : parent[key];
    if (typeof current !== "string") continue;
    if (Array.isArray(parent)) parent[Number(key)] = value;
    else parent[key] = value;
  }
  return copy;
}

/** Terapkan nilai pengganti pada objek data. Boleh membuat kunci baru (mis. `url` yang awalnya kosong). */
export function cmsValues<T extends object>(scope: string, obj: T): T {
  defaults.values.set(scope, obj);
  const prefix = `${scope}.`;
  const entries = Object.entries(overrides.values).filter(([k]) => k.startsWith(prefix));
  if (!entries.length) return obj;
  const copy = clone(obj);
  for (const [k, value] of entries) {
    const hit = walk(copy, k.slice(prefix.length).split("."), true);
    if (!hit || Array.isArray(hit.parent)) continue;
    hit.parent[hit.key] = value === null ? undefined : value;
  }
  return copy;
}

/** Ganti seluruh isi daftar bila admin pernah menyimpannya. */
export function cmsList<T>(name: string, list: T[]): T[] {
  defaults.lists.set(name, list);
  const o = overrides.lists[name];
  return Array.isArray(o) ? (o as T[]) : list;
}

const isPic = (v: unknown): v is { src: string; alt: unknown } => isPlain(v) && typeof v.src === "string" && "alt" in v;

/**
 * Terapkan foto pengganti pada pohon penempatan foto: foto tunggal diganti menurut jalurnya ("heroes.about"),
 * galeri (larik) diganti seluruhnya menurut `lists["photos.<jalur>"]`, potret tim menurut `values["photos.portraits.<id>"]`.
 */
export function cmsPhotos<T extends object>(scope: string, tree: T): T {
  defaults.photos.set(scope, tree);
  const apply = (node: unknown, path: string): unknown => {
    if (isPic(node)) {
      const o = overrides.photos[path];
      return o ? { key: `cms:${path}`, ...o } : node;
    }
    if (Array.isArray(node)) {
      const o = overrides.lists[`${scope}.${path}`] as PicData[] | undefined;
      return o ? o.map((p, i) => ({ key: `cms:${path}:${i}`, ...p })) : node;
    }
    if (isPlain(node)) {
      return Object.fromEntries(
        Object.entries(node).map(([k, v]) => {
          if (path === "" && k === "portraits" && isPlain(v)) {
            const extra = Object.entries(overrides.values)
              .filter(([key]) => key.startsWith(`${scope}.portraits.`))
              .map(([key, val]) => [key.slice(`${scope}.portraits.`.length), val]);
            return [k, { ...v, ...Object.fromEntries(extra) }];
          }
          return [k, apply(v, path ? `${path}.${k}` : k)];
        }),
      );
    }
    return node;
  };
  return apply(tree, "") as T;
}
