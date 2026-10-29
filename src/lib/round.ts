/**
 * Pembulatan untuk gambar vektor yang dihitung dengan rumus.
 *
 * Math.sin, Math.cos, dan Math.pow boleh berbeda pada digit terakhir antara Node (server) dan peramban.
 * Bila angka mentah ditulis ke atribut SVG, server dan klien menghasilkan teks yang berbeda satu digit
 * dan React (mode dev) melaporkan "hydration mismatch". Membulatkan hasilnya sebelum ditulis membuat teks
 * atribut sama di mana pun. Penjumlahan, pengurangan, perkalian, pembagian, dan akar kuadrat sudah
 * pasti sama di semua mesin, jadi hanya hasil rumus lain yang perlu dibulatkan.
 */

/** Bulatkan ke 1 desimal (0,1 satuan gambar). */
export const r1 = (n: number): number => Math.round(n * 10) / 10;

/** Bulatkan ke 2 desimal. */
export const r2 = (n: number): number => Math.round(n * 100) / 100;

/**
 * Sinus dari penjumlahan, pengurangan, perkalian, dan pembagian saja, sehingga hasilnya persis sama di
 * setiap mesin. Galat paling besar sekitar 0,00002 (untuk amplitudo 18 px: 0,0004 px), jauh di bawah
 * ketelitian gambar. Dipakai untuk kontur tanah, daun kelapa, dan garis kontur.
 */
export function stableSin(angle: number): number {
  const TWO_PI = 6.283185307179586;
  // masukkan ke rentang [-pi, pi]
  let a = angle - TWO_PI * Math.floor(angle / TWO_PI + 0.5);
  // sinus lewat deret Taylor derajat 13
  const a2 = a * a;
  a = a * (1 + a2 * (-1 / 6 + a2 * (1 / 120 + a2 * (-1 / 5040 + a2 * (1 / 362880 + a2 * (-1 / 39916800 + a2 * (1 / 6227020800)))))));
  return a;
}

/** Pangkat 0,875 (= akar^1 × akar^2 × akar^3) dengan akar kuadrat saja; pasti sama di setiap mesin. */
export function pow875(v: number): number {
  const a = Math.sqrt(v);
  const b = Math.sqrt(a);
  const c = Math.sqrt(b);
  return a * b * c;
}

/** Kosinus dengan cara yang sama seperti `stableSin`. */
export function stableCos(angle: number): number {
  return stableSin(angle + 1.5707963267948966);
}
