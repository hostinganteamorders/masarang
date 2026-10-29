import type { L10n } from "@/lib/i18n";

/** Satu nilai yang dapat berupa contoh (placeholder). `ph: true` diberi garis bawah titik-titik. */
export type Fact<T = number> = { v: T; ph?: boolean };

export const site = {
  /** Set false sebelum dipublikasikan: menghilangkan banner draf dan garis bawah placeholder. */
  draft: true,

  name: "Yayasan Masarang",
  shortName: "Masarang",
  /** Isi NEXT_PUBLIC_SITE_URL di lingkungan produksi (mis. https://masarangfoundation.org). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  email: { v: "info@masarangfoundation.org", ph: true } as Fact<string>,
  address: {
    en: "Tomohon, North Sulawesi, Indonesia",
    id: "Tomohon, Sulawesi Utara, Indonesia",
  } satisfies L10n,

  /** Tanggal data terakhir diperbarui (ISO). */
  lastUpdated: "2026-09-30",
  /** Kurs tetap untuk tampilan USD (rupiah per US$1). */
  fx: 16300,
  /** Periode keuangan yang ditampilkan. */
  fiscalYear: "2025",

  bank: {
    bank: { v: "[nama bank]", ph: true } as Fact<string>,
    number: { v: "[000-000-0000]", ph: true } as Fact<string>,
    holder: { v: "Yayasan Masarang", ph: true } as Fact<string>,
  },
} as const;

/** Warna program, dipakai bersama oleh pita rupiah, grafik, dan titik satwa. */
export const programColor = {
  /** Restorasi (Temboan): hijau. */
  temboan: "var(--restoration)",
  /** Konservasi (Tasikoki): lime. */
  tasikoki: "var(--conservation)",
  /** Edukasi: oranye. */
  education: "var(--education)",
  /** Pemantauan dan biaya operasional bukan program lapangan: abu-abu netral dari warna dasar. */
  monitoring: "var(--neutral-mid)",
  overhead: "var(--neutral-dark)",
} as const;
