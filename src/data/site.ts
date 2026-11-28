import { cmsValues } from "@/cms/apply";
import type { L10n } from "@/lib/i18n";

/** Satu nilai yang dapat berupa contoh (placeholder). `ph: true` diberi garis bawah titik-titik. */
export type Fact<T = number> = { v: T; ph?: boolean };

export const site = cmsValues("site", {
  /**
   * Mode draf: mesin pencari dilarang mengindeks dan angka contoh bergaris bawah titik-titik.
   * Saat tayang: isi NEXT_PUBLIC_SITE_DRAFT=false di Vercel (lalu deploy ulang). Kosong = draf.
   */
  draft: process.env.NEXT_PUBLIC_SITE_DRAFT !== "false",

  name: "Yayasan Masarang",
  shortName: "Masarang",
  /** Isi NEXT_PUBLIC_SITE_URL di lingkungan produksi (mis. https://masarangfoundation.org). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  email: { v: "info@masarangfoundation.org" } as Fact<string>,
  /** Nomor WhatsApp untuk bukti transfer, format internasional tanpa +, mis. 6281234567890. */
  whatsapp: { v: "[628xxxxxxxxxx]", ph: true } as Fact<string>,
  address: {
    en: "Jl. Nimawanua, Amphitheater Woloan, Woloan I Utara, Tomohon Barat, Kota Tomohon, Sulawesi Utara 95421, Indonesia",
    id: "Jl. Nimawanua, Amphitheater Woloan, Woloan I Utara, Tomohon Barat, Kota Tomohon, Sulawesi Utara 95421, Indonesia",
  } satisfies L10n,
  /** Media sosial. Alamat kosong = tampil sebagai teks tanpa tautan. */
  social: {
    instagramHandle: "@masarang.id",
    instagram: "https://www.instagram.com/masarang.id",
    linkedinName: "Masarang Foundation",
    linkedin: "",
  },
  /** Data hukum untuk kaki situs. */
  legal: {
    decree: "Keputusan Menteri Hukum dan HAM RI No. AHU-4600.AH.01.04 Tahun 2010",
    npwp: "02.868.592.3-821.000",
  },

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
} as const);

/** Bagian yang sengaja disembunyikan dulu (hasil meeting). Ubah ke true untuk menayangkannya lagi. */
export const features = { team: false, transparency: false } as const;

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
