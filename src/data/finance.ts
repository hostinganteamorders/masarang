import type { L10n } from "@/lib/i18n";
import { programColor } from "./site";

export type FlowItem = {
  id: string;
  label: L10n;
  /** Persen dari total */
  share: number;
  /** Nilai dalam jutaan rupiah */
  millions: number;
  color: string;
};

/**
 * Keuangan TA 2025. Semua angka di berkas ini masih contoh (placeholder) sampai audit selesai.
 * Ganti nilainya, lalu set `finance.ph = false`.
 */
export const finance = {
  ph: true,
  year: "2025",
  totalIdr: 3_200_000_000,
  source: {
    en: "annual accounts (audit pending)",
    id: "laporan keuangan tahunan (audit berjalan)",
  } satisfies L10n,
};

/** Sumber dana: skala satu warna (hijau restorasi, dari tua ke muda) karena urutannya menurut besar, bukan kategori program. */
export const moneyIn: FlowItem[] = [
  {
    id: "grants",
    label: { en: "International grants", id: "Hibah internasional" },
    share: 58,
    millions: 1856,
    color: "#23733f",
  },
  {
    id: "csr",
    label: { en: "Corporate partners (CSR)", id: "Mitra perusahaan (CSR)" },
    share: 22,
    millions: 704,
    color: "#239d4d",
  },
  {
    id: "enterprise",
    label: {
      en: "Own enterprise (coconut, clove, sugar)",
      id: "Usaha sendiri (kelapa, cengkih, gula)",
    },
    share: 9,
    millions: 288,
    color: "#6dbc88",
  },
  {
    id: "donors",
    label: { en: "Individual donors", id: "Donatur perorangan" },
    share: 8,
    millions: 256,
    color: "#a1d2b2",
  },
  {
    id: "visits",
    label: { en: "Visits and education fees", id: "Kunjungan dan edukasi" },
    share: 3,
    millions: 96,
    color: "#cbe3d3",
  },
];

/** Penggunaan dana: warna program yang sama dengan pita rupiah. */
export const moneyOut: FlowItem[] = [
  {
    id: "temboan",
    label: { en: "Temboan restoration", id: "Restorasi Temboan" },
    share: 34,
    millions: 1088,
    color: programColor.temboan,
  },
  {
    id: "tasikoki",
    label: { en: "Tasikoki animal care", id: "Perawatan satwa Tasikoki" },
    share: 28,
    millions: 896,
    color: programColor.tasikoki,
  },
  {
    id: "education",
    label: { en: "Education and community", id: "Edukasi dan masyarakat" },
    share: 12,
    millions: 384,
    color: programColor.education,
  },
  {
    id: "monitoring",
    label: { en: "Monitoring and reporting", id: "Pemantauan dan pelaporan" },
    share: 8,
    millions: 256,
    color: programColor.monitoring,
  },
  {
    id: "overhead",
    label: { en: "Overhead", id: "Biaya operasional" },
    share: 18,
    millions: 576,
    color: programColor.overhead,
  },
];

export type UnitCost = {
  id: string;
  /** Rupiah */
  amount: number;
  ph: boolean;
  label: L10n;
};

export const unitCosts: UnitCost[] = [
  {
    id: "hectare",
    amount: 15_000_000,
    ph: true,
    label: {
      en: "restores and monitors 1 ha for a year",
      id: "memulihkan dan memantau 1 ha selama setahun",
    },
  },
  {
    id: "animal",
    amount: 1_500_000,
    ph: true,
    label: {
      en: "cares for one rescued animal for a month",
      id: "merawat satu satwa sitaan selama sebulan",
    },
  },
  {
    id: "seedling",
    amount: 25_000,
    ph: true,
    label: {
      en: "grows and plants one seedling",
      id: "menyemai dan menanam satu bibit",
    },
  },
];

export const overheadShare = { v: 18, ph: true };
