import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Yayasan Masarang. Follow every rupiah to the field",
    description:
      "Yayasan Masarang restores degraded land around Minahasa, cares for rescued wildlife at Tasikoki and runs education programs. See what we plant, what survives and what is not finished yet.",
  },
  hero: {
    place: "North Sulawesi, Indonesia",
    title: "Follow every rupiah to the field.",
    lede: "Yayasan Masarang restores degraded land around Minahasa, cares for rescued wildlife at Tasikoki and runs education programs. This site publishes what we plant, what survives and what we have not finished yet.",
    ctaPrograms: "Our programs",
    ctaUpdates: "Latest quarterly report",
    video: "Watch Aping",
  },
  figures: {
    title: "Key figures",
    labels: {
      conservation: "Temboan conservation area",
      restoredTemboan: "Restored at Temboan in the last 4 years",
      restoredOther: "Restored at Kayuwatu and Mahembang",
      farmers: "Farmers empowered",
      income: "Increase in farmer income",
    },
  },
  money: {
    ribbonLabel: "Share of spending by program, FY {year}",
    of: "of spending",
  },
  programs: {
    title: "Three programs, measured the same way every quarter",
    lede: "Restoration, conservation and education all report on the same sheets every quarter.",
    source: "field monitoring sheets",
  },
  report: {
    title: "Latest update",
    lede: "Each quarter's results are collected in the Quarterly Report.",
    open: "Download the report",
    all: "All updates",
    period: "Quarter {q}, {year}",
  },
  donate: {
    title: "Support the work",
    lede: "Tell us which program your gift is for and we will report on that program to you directly. The bank account and other ways to give are on the donation page.",
    cta: "How to donate",
  },
};

const id: typeof en = {
  meta: {
    title: "Yayasan Masarang. Ikuti setiap rupiah sampai ke lapangan",
    description:
      "Yayasan Masarang memulihkan lahan kritis di Minahasa, merawat satwa sitaan di Tasikoki, dan menjalankan program edukasi. Lihat apa yang kami tanam, apa yang bertahan hidup, dan apa yang belum selesai.",
  },
  hero: {
    place: "Sulawesi Utara, Indonesia",
    title: "Ikuti setiap rupiah sampai ke lapangan.",
    lede: "Yayasan Masarang memulihkan lahan kritis di Minahasa, merawat satwa sitaan di Tasikoki, dan menjalankan program edukasi. Di situs ini kami terbitkan apa yang kami tanam, apa yang bertahan hidup, dan apa yang belum selesai.",
    ctaPrograms: "Program kami",
    ctaUpdates: "Quarterly Report terbaru",
    video: "Tonton Aping",
  },
  figures: {
    title: "Angka utama",
    labels: {
      conservation: "Kawasan konservasi Temboan",
      restoredTemboan: "Dipulihkan di Temboan dalam 4 tahun terakhir",
      restoredOther: "Dipulihkan di Kayuwatu dan Mahembang",
      farmers: "Petani yang diberdayakan",
      income: "Kenaikan pendapatan petani",
    },
  },
  money: {
    ribbonLabel: "Porsi belanja menurut program, TA {year}",
    of: "dari belanja",
  },
  programs: {
    title: "Tiga program, diukur dengan cara yang sama setiap triwulan",
    lede: "Restorasi, konservasi, dan edukasi dilaporkan pada lembar yang sama setiap triwulan.",
    source: "lembar pemantauan lapangan",
  },
  report: {
    title: "Kabar terbaru",
    lede: "Hasil tiap triwulan dihimpun dalam Quarterly Report.",
    open: "Unduh laporan",
    all: "Semua kabar",
    period: "Triwulan {q}, {year}",
  },
  donate: {
    title: "Dukung pekerjaan kami",
    lede: "Sampaikan program pilihan Anda, dan kami akan melaporkan perkembangan program tersebut langsung kepada Anda. Rekening bank dan cara berdonasi lainnya ada di halaman donasi.",
    cta: "Cara berdonasi",
  },
};

export const home: Record<Locale, typeof en> = { en, id };
