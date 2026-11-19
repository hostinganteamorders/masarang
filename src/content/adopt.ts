import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Animals in our care",
    description:
      "How many animals Tasikoki cares for in each category, how many are in quarantine, and the ambassador animal that speaks for each one.",
  },
  hero: {
    title: "Animals in our care, by category",
    lede: "Primates, other mammals, reptiles and birds: see how many of each are at Tasikoki now, how many are still in quarantine, and meet the ambassador animal that speaks for each category.",
    source: "Source: Tasikoki recap, 2018 to October 2026",
    unit: "Figures as of {date}",
  },
  totals: {
    title: "All together",
    lede: "Every animal here arrived from a seizure, a hand-over or a rescue. These are the totals across the four categories.",
    inCare: "In care now",
    quarantine: "In quarantine",
    released: "Released since 2018",
    entered: "Arrived since 2018",
    quarantineNote: "Example figure, to be replaced from the register",
  },
  cats: {
    primates: { name: "Primates", blurb: "Macaques, gibbons and other monkeys." },
    mammals: { name: "Other mammals", blurb: "Deer, bears, cuscus and babirusa." },
    reptiles: { name: "Reptiles", blurb: "Crocodiles, pythons, monitors and turtles." },
    birds: { name: "Birds", blurb: "Cockatoos, lories, hornbills and raptors." },
  },
  card: {
    inCare: "in care now",
    share: "{pct} of all animals in care",
    quarantine: "In quarantine",
    elsewhere: "Rehabilitation and long-term care",
    stagesLabel: "Where the animals in this category are",
    flows: "Since 2018",
    entered: "Arrived",
    born: "Born here",
    died: "Died",
    released: "Released",
    translocated: "Moved to other centres",
    ambassador: "Ambassador animal",
    ambassadorExample: "Example choice, to be confirmed by the team",
    cta: "Sponsor {name}",
    ctaNote: "Your gift supports every animal in the {category} category.",
    mailSubject: "Sponsor {name}, ambassador of {category}",
    mailBody: "Hello, I would like to sponsor {name}, the ambassador of the {category} category at Tasikoki. Please tell me how to proceed.",
    noPhoto: "Photo to come",
  },
  chart: {
    title: "How many animals were in care at the end of each year",
    lede: "Hover or tap a bar to read the numbers. The 2026 bar is the count for October.",
    source: "Source: Tasikoki recap",
    caption: "Animals in care at year end, by category",
    total: "Total",
    year: "Year end {year}",
    yearNow: "October {year}",
  },
  species: {
    title: "Every species in our care",
    lede: "Search by name, or choose a category. Species with no animals in care now are hidden unless you ask to see them.",
    search: "Search a species",
    searchPlaceholder: "Type a name, e.g. Yaki",
    all: "All",
    name: "Species",
    latin: "Scientific name",
    category: "Category",
    count: "In care",
    showEmpty: "Also show species with none in care now",
    empty: "No species match this search.",
    summary: "{n} species shown, {total} animals",
  },
  how: {
    title: "How sponsoring works",
    steps: [
      {
        title: "Choose a category",
        body: "Pick the category you want to support. Its ambassador animal stands for every animal in that group.",
      },
      {
        title: "Send your gift",
        body: "Give by bank transfer. Start from {amount} a month, or cover more of the monthly cost. Write the category in the transfer note.",
      },
      {
        title: "We report back",
        body: "Tell us which category your gift is for and we will report on its care directly to you.",
      },
    ],
    cta: "Bank details",
  },
};

const id: typeof en = {
  meta: {
    title: "Satwa dalam perawatan kami",
    description:
      "Jumlah satwa yang dirawat Tasikoki di setiap kategori, berapa yang masih dikarantina, dan satwa duta yang mewakili masing-masing kategori.",
  },
  hero: {
    title: "Satwa dalam perawatan kami, per kategori",
    lede: "Primata, mamalia lain, reptil, dan burung: lihat berapa jumlah masing-masing di Tasikoki saat ini, berapa yang masih dikarantina, dan kenali satwa duta yang mewakili tiap kategori.",
    source: "Sumber: rekapitulasi Tasikoki, 2018 sampai Oktober 2026",
    unit: "Angka per {date}",
  },
  totals: {
    title: "Seluruhnya",
    lede: "Setiap satwa di sini datang dari penyitaan, penyerahan, atau penyelamatan. Berikut jumlah gabungan keempat kategori.",
    inCare: "Dirawat saat ini",
    quarantine: "Sedang karantina",
    released: "Dilepasliarkan sejak 2018",
    entered: "Masuk sejak 2018",
    quarantineNote: "Angka contoh, akan diganti dari register",
  },
  cats: {
    primates: { name: "Primata", blurb: "Monyet, owa, dan kerabatnya." },
    mammals: { name: "Mamalia lain", blurb: "Rusa, beruang, kuskus, dan babirusa." },
    reptiles: { name: "Reptil", blurb: "Buaya, sanca, biawak, dan kura-kura." },
    birds: { name: "Burung", blurb: "Kakatua, nuri, rangkong, dan elang." },
  },
  card: {
    inCare: "dirawat saat ini",
    share: "{pct} dari seluruh satwa yang dirawat",
    quarantine: "Karantina",
    elsewhere: "Rehabilitasi dan perawatan jangka panjang",
    stagesLabel: "Posisi satwa dalam kategori ini",
    flows: "Sejak 2018",
    entered: "Masuk",
    born: "Lahir di sini",
    died: "Mati",
    released: "Dilepasliarkan",
    translocated: "Dipindahkan ke pusat lain",
    ambassador: "Satwa duta",
    ambassadorExample: "Pilihan contoh, menunggu persetujuan tim",
    cta: "Dukung {name}",
    ctaNote: "Donasi Anda membantu seluruh satwa dalam kategori {category}.",
    mailSubject: "Dukung {name}, duta kategori {category}",
    mailBody: "Halo, saya ingin mendukung {name}, satwa duta kategori {category} di Tasikoki. Mohon beri tahu langkah selanjutnya.",
    noPhoto: "Foto menyusul",
  },
  chart: {
    title: "Jumlah satwa yang dirawat pada akhir setiap tahun",
    lede: "Arahkan kursor atau ketuk batang untuk membaca angkanya. Batang 2026 menunjukkan jumlah pada Oktober.",
    source: "Sumber: rekapitulasi Tasikoki",
    caption: "Satwa yang dirawat pada akhir tahun, per kategori",
    total: "Jumlah",
    year: "Akhir {year}",
    yearNow: "Oktober {year}",
  },
  species: {
    title: "Semua jenis satwa yang kami rawat",
    lede: "Cari berdasarkan nama, atau pilih kategori. Jenis yang saat ini tidak ada satwanya disembunyikan, kecuali Anda ingin melihatnya.",
    search: "Cari jenis satwa",
    searchPlaceholder: "Ketik nama, mis. Yaki",
    all: "Semua",
    name: "Jenis",
    latin: "Nama ilmiah",
    category: "Kategori",
    count: "Dirawat",
    showEmpty: "Tampilkan juga jenis yang saat ini tidak ada satwanya",
    empty: "Tidak ada jenis yang cocok dengan pencarian ini.",
    summary: "{n} jenis ditampilkan, {total} satwa",
  },
  how: {
    title: "Cara kerja dukungan",
    steps: [
      {
        title: "Pilih kategori",
        body: "Pilih kategori yang ingin Anda dukung. Satwa dutanya mewakili seluruh satwa di kelompok itu.",
      },
      {
        title: "Kirim donasi",
        body: "Beri lewat transfer bank. Mulai {amount} per bulan, atau tanggung lebih banyak biaya bulanannya. Tulis nama kategori pada catatan transfer.",
      },
      {
        title: "Kami melapor",
        body: "Sampaikan kategori pilihan Anda, dan kami akan melaporkan perawatannya langsung kepada Anda.",
      },
    ],
    cta: "Rincian rekening",
  },
};

export const adoptCopy: Record<Locale, typeof en> = cmsText("adopt", { en, id });
export type AdoptCopy = typeof en;
