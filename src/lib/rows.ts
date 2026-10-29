/**
 * Menyusun foto menjadi baris-baris dengan tinggi yang sama, tanpa memotong gambar ("justified rows").
 * Urutan foto dipertahankan. Setiap baris berisi 1 sampai `maxPerRow` foto, dan jumlah rasio lebar/tinggi
 * tiap baris diusahakan mendekati `target`, sehingga di layar lebar tinggi barisnya kurang lebih seragam
 * (lebar wadah 1280 px dan target 4,4 memberi tinggi sekitar 290 px).
 *
 * Dihitung dengan pemrograman dinamis: biaya baris = (jumlah rasio - target)², lalu pilih pemisahan
 * dengan biaya total terkecil. Hasilnya deterministik, jadi sama di server dan di browser.
 */
export function justify<T extends { w: number; h: number }>(items: readonly T[], target = 4.4, maxPerRow = 4): T[][] {
  const n = items.length;
  const ratio = items.map((item) => item.w / item.h);
  const best = new Array<number>(n + 1).fill(Infinity);
  const next = new Array<number>(n + 1).fill(n);
  best[n] = 0;

  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i; j < Math.min(n, i + maxPerRow); j++) {
      sum += ratio[j];
      const cost = (sum - target) ** 2 + best[j + 1];
      if (cost < best[i]) {
        best[i] = cost;
        next[i] = j + 1;
      }
    }
  }

  const rows: T[][] = [];
  for (let i = 0; i < n; i = next[i]) rows.push(items.slice(i, next[i]));
  return rows;
}
