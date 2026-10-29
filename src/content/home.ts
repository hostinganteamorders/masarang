import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Yayasan Masarang. Follow every rupiah to the field",
    description:
      "Yayasan Masarang restores degraded land around Minahasa and cares for rescued wildlife at Tasikoki. See what we spend, what we plant, what survives and what is not finished yet.",
  },
  hero: {
    place: "North Sulawesi, Indonesia",
    title: "Follow every rupiah to the field.",
    lede: "Yayasan Masarang restores degraded land around Minahasa and cares for rescued wildlife at Tasikoki. This site publishes what we spend, what we plant, what survives and what we have not finished yet.",
    ctaMoney: "See where the money goes",
    ctaUpdates: "Latest field updates",
  },
  figures: {
    title: "Key figures",
    labels: {
      site: "Temboan site under management",
      trees: "Trees planted in 2025",
      survival: "Seedling survival after 12 months",
      rescued: "Animals rescued at Tasikoki in 2025",
      overhead: "Share of spending on overhead",
    },
  },
  money: {
    title: "Where the money goes",
    lede: "Every program is priced at its full cost, overhead included. We show overhead as its own line because hiding it would make every other number on this page harder to trust.",
    cta: "Open the full accounts",
    ribbonLabel: "Share of spending by program, FY {year}",
    of: "of spending",
  },
  sites: {
    title: "Two places, measured the same way every quarter",
    lede: "Temboan restores land. Tasikoki cares for wildlife. Both report on the same sheets every quarter.",
    source: "field monitoring sheets",
  },
  adopt: {
    title: "Every animal in our care, and how far each one is from going home",
    lede: "Hollow dots are animals still waiting for a sponsor. Open the register to meet any of them.",
    cta: "Meet the animals",
  },
  updates: {
    title: "What happened on the ground",
    lede: "Each entry names the evidence behind it, so you can ask to see it.",
    cta: "All field updates",
  },
  partners: { title: "Who works with us" },
  support: {
    title: "Fund a specific piece of the work",
    lede: "Tell us which program your gift is for and we will report on that program to you directly.",
    cta: "Ways to give",
  },
};

const id: typeof en = {
  meta: {
    title: "Yayasan Masarang. Ikuti setiap rupiah sampai ke lapangan",
    description:
      "Yayasan Masarang memulihkan lahan kritis di Minahasa dan merawat satwa sitaan di Tasikoki. Lihat apa yang kami belanjakan, tanam, apa yang bertahan hidup, dan apa yang belum selesai.",
  },
  hero: {
    place: "Sulawesi Utara, Indonesia",
    title: "Ikuti setiap rupiah sampai ke lapangan.",
    lede: "Yayasan Masarang memulihkan lahan kritis di Minahasa dan merawat satwa sitaan di Tasikoki. Di situs ini kami terbitkan apa yang kami belanjakan, apa yang kami tanam, apa yang bertahan hidup, dan apa yang belum selesai.",
    ctaMoney: "Lihat ke mana dana mengalir",
    ctaUpdates: "Kabar lapangan terbaru",
  },
  figures: {
    title: "Angka utama",
    labels: {
      site: "Lahan Temboan yang dikelola",
      trees: "Pohon ditanam pada 2025",
      survival: "Daya hidup bibit setelah 12 bulan",
      rescued: "Satwa diselamatkan di Tasikoki pada 2025",
      overhead: "Porsi belanja untuk biaya operasional",
    },
  },
  money: {
    title: "Ke mana dana mengalir",
    lede: "Setiap program dihitung dengan biaya penuh, termasuk biaya operasional. Biaya operasional kami tampilkan sebagai baris tersendiri, karena menyembunyikannya membuat angka lain di halaman ini sulit dipercaya.",
    cta: "Buka laporan keuangan lengkap",
    ribbonLabel: "Porsi belanja menurut program, TA {year}",
    of: "dari belanja",
  },
  sites: {
    title: "Dua lokasi, diukur dengan cara yang sama setiap triwulan",
    lede: "Temboan memulihkan lahan. Tasikoki merawat satwa. Keduanya dilaporkan pada lembar yang sama setiap triwulan.",
    source: "lembar pemantauan lapangan",
  },
  adopt: {
    title: "Setiap satwa dalam perawatan kami, dan seberapa dekat mereka untuk pulang",
    lede: "Titik kosong adalah satwa yang masih menunggu sponsor. Buka register untuk mengenal mereka satu per satu.",
    cta: "Kenali satwanya",
  },
  updates: {
    title: "Apa yang terjadi di lapangan",
    lede: "Setiap catatan menyebutkan bukti pendukungnya, sehingga Anda dapat memintanya.",
    cta: "Semua kabar lapangan",
  },
  partners: { title: "Mitra kami" },
  support: {
    title: "Danai bagian kerja yang spesifik",
    lede: "Sampaikan program pilihan Anda, dan kami akan melaporkan perkembangan program tersebut langsung kepada Anda.",
    cta: "Cara berdonasi",
  },
};

export const home: Record<Locale, typeof en> = { en, id };
