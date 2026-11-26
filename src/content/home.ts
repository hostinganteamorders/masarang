import { cmsText } from "@/cms/apply";
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
  impact: {
    title: "Our impact",
    lede: "All the numbers we publish, in one place. Download them as a spreadsheet to check, reuse or report on.",
    download: "Download all data (Excel)",
    downloadNote: "One file with the summary, animals, species, finance and notes.",
    restoration: "Restoration",
    conservation: "Conservation",
    education: "Education",
    finance: "Where the money goes",
    labels: {
      trees: "Trees planted",
      survival: "Tree survival",
      inCare: "Animals in rehabilitation today",
      released: "Animals released since 2018",
      entered: "Animals arrived since 2018",
      students: "Students reached",
      more: "Full animal data",
    },
    categories: "In rehabilitation today, by category",
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
    expand: "See the breakdown",
    breakdown: "Summary per program",
    programs: { restoration: "Restoration", conservation: "Conservation", education: "Education" },
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
  impact: {
    title: "Dampak kami",
    lede: "Semua angka yang kami terbitkan, dalam satu tempat. Unduh sebagai lembar kerja untuk memeriksa, memakai ulang, atau melapor.",
    download: "Unduh semua data (Excel)",
    downloadNote: "Satu berkas berisi ringkasan, satwa, jenis, keuangan, dan catatan.",
    restoration: "Restorasi",
    conservation: "Konservasi",
    education: "Edukasi",
    finance: "Ke mana uang dipakai",
    labels: {
      trees: "Pohon ditanam",
      survival: "Pohon bertahan hidup",
      inCare: "Satwa dalam rehabilitasi hari ini",
      released: "Satwa dilepasliarkan sejak 2018",
      entered: "Satwa masuk sejak 2018",
      students: "Pelajar yang dijangkau",
      more: "Data lengkap satwa",
    },
    categories: "Dalam rehabilitasi hari ini, per kategori",
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
    expand: "Lihat rinciannya",
    breakdown: "Ringkasan per program",
    programs: { restoration: "Restorasi", conservation: "Konservasi", education: "Edukasi" },
  },
  donate: {
    title: "Dukung kerja kami",
    lede: "Sampaikan program pilihan Anda, dan kami akan melaporkan perkembangan program tersebut langsung kepada Anda. Rekening bank dan cara berdonasi lainnya ada di halaman donasi.",
    cta: "Cara berdonasi",
  },
};

export const home: Record<Locale, typeof en> = cmsText("home", { en, id });
