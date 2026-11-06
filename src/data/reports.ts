import type { L10n } from "@/lib/i18n";

/**
 * Quarterly Report Masarang. Terbaru lebih dulu. `pdf` kosong = dokumen belum diunggah (tombol unduh belum muncul).
 * Entri di bawah adalah penanda tempat sampai dokumen aslinya ada.
 */
export type QuarterlyReport = {
  id: string;
  year: number;
  quarter: 1 | 2 | 3 | 4;
  title: L10n;
  summary: L10n;
  /** Alamat berkas, mis. /reports/quarterly-2026-q3.pdf (taruh di public/reports). */
  pdf?: string;
  /** true = entri contoh. */
  ph?: boolean;
};

const SUMMARY_PH: L10n = {
  en: "[Two or three sentences on what this report covers: restoration, conservation and education for the quarter.]",
  id: "[Dua atau tiga kalimat tentang isi laporan ini: restorasi, konservasi, dan edukasi pada triwulan tersebut.]",
};

export const reports: QuarterlyReport[] = [
  { id: "2026-q3", year: 2026, quarter: 3, title: { en: "Quarterly Report Q3 2026", id: "Quarterly Report Triwulan III 2026" }, summary: SUMMARY_PH, ph: true },
  { id: "2026-q2", year: 2026, quarter: 2, title: { en: "Quarterly Report Q2 2026", id: "Quarterly Report Triwulan II 2026" }, summary: SUMMARY_PH, ph: true },
  { id: "2026-q1", year: 2026, quarter: 1, title: { en: "Quarterly Report Q1 2026", id: "Quarterly Report Triwulan I 2026" }, summary: SUMMARY_PH, ph: true },
];

export const latestReport = reports[0];
