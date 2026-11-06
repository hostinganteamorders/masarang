import type { L10n } from "@/lib/i18n";
import type { Fact } from "./site";

export type Status = "underway" | "planned" | "done";

export type Milestone = { id: string; label: L10n; status: Status };

/**
 * Program Restorasi: angka dari daftar tim (Christina Sinadia, 6 Nov 2026). Belum diperiksa terhadap dokumen sumber,
 * jadi semuanya `ph` sampai data akhirnya dikompilasi.
 */
export const restoration = {
  /** Kawasan konservasi Temboan (ha). */
  conservationHa: { v: 500, ph: true } as Fact,
  /** Luas restorasi dalam 4 tahun terakhir (ha). */
  restoredYears: 4,
  restoredTemboanHa: { v: 70, ph: true } as Fact,
  /** "Lebih dari 10 ha": tampilkan sebagai 10+. */
  restoredKayuwatuMahembangHa: { v: 10, ph: true, more: true } as Fact & { more: true },
  farmers: { v: 53, ph: true } as Fact,
  /** Kenaikan pendapatan petani (%). Definisi pembanding belum ditetapkan. */
  incomeIncreasePct: { v: 35, ph: true } as Fact,
};

/** Perlindungan hutan Gunung Masarang (ha). Belum ada angkanya. */
export const forestProtection = { ha: { v: "xx", ph: true } as Fact<string> };

/** Angka utama di beranda (per tanggal pembaruan). */
export const keyFigures = {
  conservationHa: restoration.conservationHa,
  restoredTemboanHa: restoration.restoredTemboanHa,
  restoredOtherHa: restoration.restoredKayuwatuMahembangHa,
  farmers: restoration.farmers,
  incomeIncreasePct: restoration.incomeIncreasePct,
  treesPlanted: { v: 18500, ph: true } as Fact,
  survival: { v: 78, ph: true } as Fact,
  rescued: { v: 64, ph: true } as Fact,
  overhead: { v: 18, ph: true } as Fact,
};

export const temboan = {
  areaHa: restoration.conservationHa,
  /** Pohon kelapa terpetakan per desa (pemetaan GPS, Juni 2026). */
  coconut: {
    total: 5640,
    mapped: "2026-06",
    villages: [
      { id: "palamba", name: "Palamba", trees: 1776 },
      { id: "rumbia", name: "Rumbia", trees: 2023 },
      { id: "temboan", name: "Temboan", trees: 1841 },
    ],
  },
  treesPlanted: { v: 18500, ph: true } as Fact,
  survival: { v: 78, ph: true } as Fact,
  activeHa: { v: 140, ph: true } as Fact,
  milestones: [
    {
      id: "sop",
      label: {
        en: "Community coconut harvesting system (SOP)",
        id: "Sistem panen kelapa bersama masyarakat (SOP)",
      },
      status: "underway",
    },
    {
      id: "access",
      label: {
        en: "Village access agreement: Palamba, Rumbia, Temboan",
        id: "Kesepakatan akses desa: Palamba, Rumbia, Temboan",
      },
      status: "planned",
    },
    {
      id: "arenga",
      label: { en: "Arenga sugar palm planting", id: "Penanaman aren" },
      status: "planned",
    },
  ] satisfies Milestone[],
};

export const tasikoki = {
  inCare: { v: 109, ph: true } as Fact,
  released: { v: 36, ph: true } as Fact,
  /** Jumlah satwa yang ditranslokasi: belum ada angkanya. */
  translocated: { v: "[n]", ph: true } as Fact<string>,
  students: { v: 1200, ph: true } as Fact,
  wasteHouseholds: { v: "30–40", ph: true } as Fact<string>,
  perYear: [
    { year: 2022, rescued: 48, released: 19 },
    { year: 2023, rescued: 57, released: 24 },
    { year: 2024, rescued: 52, released: 22 },
    { year: 2025, rescued: 64, released: 36 },
  ],
  perYearPh: true,
  milestones: [
    {
      id: "turtle",
      label: {
        en: "Sea turtle program, Desa Tulap: baseline survey",
        id: "Program penyu, Desa Tulap: survei awal",
      },
      status: "underway",
    },
    {
      id: "livelihood",
      label: {
        en: "Livelihoods for former egg collectors",
        id: "Mata pencaharian bagi mantan pengambil telur",
      },
      status: "planned",
    },
    {
      id: "waste",
      label: {
        en: "Community waste management pilot",
        id: "Pilot pengelolaan sampah masyarakat",
      },
      status: "underway",
    },
  ] satisfies Milestone[],
};

export type HillsideMetrics = {
  canopy: number;
  trees: number;
  species: number;
  bare: number;
  carbon: number;
};

/** Kondisi tahun 0 dan target rencana restorasi (bukan hasil ukur). */
export const hillside: {
  years: number[];
  baseline: HillsideMetrics;
  targets: Record<number, HillsideMetrics>;
} = {
  years: [1, 2, 3, 5, 10],
  baseline: { canopy: 5, trees: 45, species: 4, bare: 35, carbon: 12 },
  targets: {
    1: { canopy: 28, trees: 980, species: 19, bare: 19, carbon: 16 },
    2: { canopy: 44, trees: 980, species: 28, bare: 11, carbon: 22 },
    3: { canopy: 56, trees: 1010, species: 31, bare: 6, carbon: 30 },
    5: { canopy: 71, trees: 1070, species: 37, bare: 2, carbon: 47 },
    10: { canopy: 85, trees: 1220, species: 52, bare: 0, carbon: 102 },
  },
};
