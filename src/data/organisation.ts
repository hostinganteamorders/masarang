import type { L10n } from "@/lib/i18n";

/* ---------------- Dokumen ---------------- */

export type DocStatus = "request" | "preparing";
export type DocType = "legal" | "report" | "finance" | "procedure" | "method";

export type PublicDocument = {
  id: string;
  title: L10n;
  type: DocType;
  year: number | null;
  status: DocStatus;
};

export const documents: PublicDocument[] = [
  {
    id: "deed",
    title: { en: "Deed of establishment", id: "Akta pendirian yayasan" },
    type: "legal",
    year: null,
    status: "request",
  },
  {
    id: "sk",
    title: {
      en: "Ministry of Law approval (SK Kemenkumham)",
      id: "SK pengesahan Kemenkumham",
    },
    type: "legal",
    year: null,
    status: "request",
  },
  {
    id: "annual-2025",
    title: { en: "Annual report 2025", id: "Laporan tahunan 2025" },
    type: "report",
    year: 2025,
    status: "preparing",
  },
  {
    id: "audit-2025",
    title: {
      en: "Audited financial statements 2025",
      id: "Laporan keuangan teraudit 2025",
    },
    type: "finance",
    year: 2025,
    status: "preparing",
  },
  {
    id: "sop",
    title: { en: "Temboan coconut harvesting SOP", id: "SOP panen kelapa Temboan" },
    type: "procedure",
    year: 2026,
    status: "request",
  },
  {
    id: "protocol",
    title: {
      en: "Restoration monitoring protocol",
      id: "Protokol pemantauan restorasi",
    },
    type: "method",
    year: 2026,
    status: "preparing",
  },
];

/* ---------------- Tata kelola ---------------- */

export type GovernanceRole = {
  id: string;
  role: L10n;
  name: L10n;
  /** true = nama masih contoh. */
  ph?: boolean;
};

const NAME_PH: L10n = { en: "[Name]", id: "[Nama]" };

export const governance: GovernanceRole[] = [
  { id: "supervisors", role: { en: "Supervisors", id: "Pembina" }, name: NAME_PH, ph: true },
  {
    id: "chair",
    role: { en: "Chair, Executive Board", id: "Ketua Pengurus" },
    name: { en: "Aulia Reinozha Akbar", id: "Aulia Reinozha Akbar" },
  },
  { id: "treasurer", role: { en: "Treasurer", id: "Bendahara" }, name: NAME_PH, ph: true },
  { id: "oversight", role: { en: "Oversight Board", id: "Pengawas" }, name: NAME_PH, ph: true },
];

export const principles: { id: string; title: L10n; body: L10n }[] = [
  {
    id: "full-cost",
    title: { en: "Full-cost pricing", id: "Biaya penuh" },
    body: {
      en: "Every program budget includes its share of overhead, so donors see the real cost of the work.",
      id: "Setiap anggaran program mencakup porsi biaya operasional, sehingga donatur melihat biaya nyata pekerjaan.",
    },
  },
  {
    id: "surplus",
    title: { en: "Surplus stays in the work", id: "Surplus kembali ke program" },
    body: {
      en: "Income from coconut, clove and palm sugar is reinvested in restoration and animal care. Nothing is paid out to owners.",
      id: "Pendapatan dari kelapa, cengkih, dan gula aren diinvestasikan kembali ke restorasi dan perawatan satwa. Tidak ada pembagian keuntungan kepada pemilik.",
    },
  },
  {
    id: "published",
    title: { en: "Published, then audited", id: "Dipublikasikan, lalu diaudit" },
    body: {
      en: "Quarterly figures appear here first. The audited annual accounts replace them once signed.",
      id: "Angka triwulanan tampil di sini lebih dulu. Laporan tahunan yang telah diaudit menggantikannya setelah ditandatangani.",
    },
  },
];

/* ---------------- Mitra ---------------- */

export type Partner = { id: string; name: string; role: L10n; url?: string };

export const partners: Partner[] = [
  {
    id: "trees-for-all",
    name: "Trees for All",
    role: { en: "Restoration funding, Netherlands", id: "Pendanaan restorasi, Belanda" },
  },
  {
    id: "thryve",
    name: "Thryve.Earth",
    role: { en: "Restoration partnership, Singapore", id: "Kemitraan restorasi, Singapura" },
  },
  {
    id: "pge",
    name: "Pertamina Geothermal Energy",
    role: { en: "Geothermal palm sugar processing", id: "Pengolahan gula aren panas bumi" },
  },
  {
    id: "rdi",
    name: "RDI",
    role: { en: "Research partner", id: "Mitra riset" },
  },
];

/* ---------------- Dukungan ---------------- */

export type GivingOption = {
  id: string;
  /** Rupiah */
  amount: number;
  ph: boolean;
  title: L10n;
  body: L10n;
};

export const giving: GivingOption[] = [
  {
    id: "hectare",
    amount: 15_000_000,
    ph: true,
    title: { en: "Restore a hectare", id: "Pulihkan satu hektare" },
    body: {
      en: "Planting, maintenance and 12-month survival monitoring of one hectare at Temboan.",
      id: "Penanaman, perawatan, dan pemantauan daya hidup 12 bulan untuk satu hektare di Temboan.",
    },
  },
  {
    id: "animal",
    amount: 1_500_000,
    ph: true,
    title: { en: "Care for a rescued animal", id: "Rawat satu satwa sitaan" },
    body: {
      en: "Food, veterinary care and keeper time for one animal at Tasikoki for a month.",
      id: "Pakan, perawatan dokter hewan, dan waktu perawat untuk satu satwa di Tasikoki selama sebulan.",
    },
  },
];

/** Sponsor minimum per bulan (Rp). */
export const sponsorFrom = { v: 150_000, ph: true };
