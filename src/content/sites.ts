import type { Locale } from "@/lib/i18n";

/** Teks tentang dua lokasi kerja, dipakai di beranda, halaman Program, dan halaman lokasi. */
const en = {
  temboan: {
    name: "Temboan",
    place: "Langowan Selatan, Minahasa",
    summary:
      "A 600-hectare site bordering the villages of Palamba, Rumbia and Temboan. We restore degraded land with mixed agroforestry, and we manage the existing coconut and clove gardens as the site's income so restoration does not depend on grants alone. Arenga sugar palm comes next.",
    teaser:
      "Mixed agroforestry on degraded land, paid for in part by the site's own coconut and clove gardens.",
    stats: {
      area: "Site area",
      planted: "Trees planted in 2025",
      survival: "Seedling survival at 12 months",
      active: "Area under active restoration",
      coconut: "Coconut trees mapped",
    },
    cta: "See the Temboan site",
  },
  tasikoki: {
    name: "Tasikoki",
    fullName: "Tasikoki Wildlife Rescue and Education Centre",
    place: "North Minahasa",
    summary:
      "Tasikoki takes in animals seized from the illegal wildlife trade, rehabilitates them, and returns them to the wild where it is safe to do so. It is also a classroom for local schools and the base for our coastal community programs.",
    teaser:
      "Seized animals are rehabilitated and returned to the wild where it is safe. The centre is also a classroom for local schools.",
    stats: {
      inCare: "Animals in care today",
      released: "Released in 2025",
      students: "Students visiting in 2025",
      waste: "Households in the waste pilot",
      wasteNote: "Pilot plan",
    },
    cta: "See the Tasikoki centre",
  },
  milestonesTitle: "Where the work stands",
};

const id: typeof en = {
  temboan: {
    name: "Temboan",
    place: "Langowan Selatan, Minahasa",
    summary:
      "Lahan seluas 600 hektare yang berbatasan dengan Desa Palamba, Rumbia, dan Temboan. Kami memulihkan lahan kritis dengan agroforestri campuran, dan mengelola kebun kelapa dan cengkih yang ada sebagai sumber pendapatan lokasi, agar restorasi tidak hanya bergantung pada hibah. Aren menjadi tahap berikutnya.",
    teaser:
      "Agroforestri campuran di lahan kritis, sebagian dibiayai oleh kebun kelapa dan cengkih milik lokasi itu sendiri.",
    stats: {
      area: "Luas lokasi",
      planted: "Pohon ditanam pada 2025",
      survival: "Daya hidup bibit setelah 12 bulan",
      active: "Area yang sedang dipulihkan",
      coconut: "Pohon kelapa terpetakan",
    },
    cta: "Lihat lokasi Temboan",
  },
  tasikoki: {
    name: "Tasikoki",
    fullName: "Pusat Penyelamatan dan Edukasi Satwa Tasikoki",
    place: "Minahasa Utara",
    summary:
      "Tasikoki menerima satwa sitaan dari perdagangan ilegal, merehabilitasinya, dan melepasliarkannya bila aman. Tasikoki juga menjadi ruang belajar bagi sekolah-sekolah sekitar dan basis program masyarakat pesisir kami.",
    teaser:
      "Satwa sitaan direhabilitasi dan dikembalikan ke alam bila aman. Pusat ini juga menjadi ruang belajar bagi sekolah sekitar.",
    stats: {
      inCare: "Satwa dirawat saat ini",
      released: "Dilepasliarkan pada 2025",
      students: "Pelajar berkunjung pada 2025",
      waste: "Rumah tangga dalam pilot sampah",
      wasteNote: "Rencana pilot",
    },
    cta: "Lihat pusat Tasikoki",
  },
  milestonesTitle: "Posisi pekerjaan saat ini",
};

export const sites: Record<Locale, typeof en> = { en, id };
