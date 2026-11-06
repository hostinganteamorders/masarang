import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Updates",
    description:
      "Quarterly Reports from Yayasan Masarang and field updates from Temboan and Tasikoki. Each entry names the evidence behind it.",
  },
  hero: {
    title: "Quarterly Reports and field updates",
    lede: "Each quarter's results are collected in the Quarterly Report. Field updates below name the evidence behind them, so you can ask to see it.",
  },
  reports: { title: "Quarterly Reports", lede: "The newest report comes first.", earlier: "Earlier reports" },
  notes: { title: "Field updates", lede: "Short notes from the sites, with the evidence behind each one." },
  list: "Field updates",
  filterLabel: "Filter by site",
  all: "All",
  mailSubject: "Evidence request: {title}",
  count: "{n} entries",
  empty: "No entries for this site yet.",
};

const id: typeof en = {
  meta: {
    title: "Kabar",
    description:
      "Quarterly Report Yayasan Masarang dan kabar lapangan dari Temboan dan Tasikoki. Setiap catatan menyebutkan bukti pendukungnya.",
  },
  hero: {
    title: "Quarterly Report dan kabar lapangan",
    lede: "Hasil tiap triwulan dihimpun dalam Quarterly Report. Kabar lapangan di bawahnya menyebutkan bukti pendukungnya, sehingga Anda dapat memintanya.",
  },
  reports: { title: "Quarterly Report", lede: "Laporan terbaru ada di urutan pertama.", earlier: "Laporan sebelumnya" },
  notes: { title: "Kabar lapangan", lede: "Catatan singkat dari lokasi, lengkap dengan bukti pendukungnya." },
  list: "Kabar lapangan",
  filterLabel: "Saring menurut lokasi",
  all: "Semua",
  mailSubject: "Permintaan bukti: {title}",
  count: "{n} catatan",
  empty: "Belum ada catatan untuk lokasi ini.",
};

export const updatesCopy: Record<Locale, typeof en> = { en, id };
