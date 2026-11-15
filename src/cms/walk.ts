/** Menelusuri objek konten dan mengumpulkan teks (string) beserta jalurnya, mis. "founder.bio.0". */
export type Leaf = { path: string; value: string };

export function flatten(node: unknown, prefix = ""): Leaf[] {
  if (typeof node === "string") return [{ path: prefix, value: node }];
  if (Array.isArray(node)) return node.flatMap((item, i) => flatten(item, prefix ? `${prefix}.${i}` : String(i)));
  if (typeof node === "object" && node !== null) {
    return Object.entries(node).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}

/** Penanda {nama} di dalam teks (bahan isian); harus tetap ada setelah diedit agar situs tidak rusak. */
export const placeholders = (s: string): string[] => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
