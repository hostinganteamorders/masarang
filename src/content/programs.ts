import type { Locale } from "@/lib/i18n";

const en = {
  overview: {
    meta: {
      title: "Programs",
      description:
        "Temboan restores land and Tasikoki cares for wildlife. Both report the same way, every quarter.",
    },
    hero: {
      title: "Two places, one way of reporting",
      lede: "Temboan restores degraded land. Tasikoki cares for rescued wildlife. Each is measured on the same sheets every quarter, and the results are published here.",
    },
    sites: { title: "The two sites" },
    educationGallery: { title: "Learning, in pictures" },
    across: {
      title: "Work that runs through both sites",
      education: {
        title: "Education and community",
        body: "School visits at Tasikoki, agreements with the villages around Temboan and the coastal community programs near Desa Tulap.",
      },
      monitoring: {
        title: "Monitoring and reporting",
        body: "Field teams record planting, survival and animal care on standard sheets. The figures on this site come from those sheets.",
      },
    },
    how: {
      title: "How a number gets to this site",
      steps: [
        {
          title: "Recorded in the field",
          body: "Field teams write planting, survival and animal care figures on the same monitoring sheets at both sites.",
        },
        {
          title: "Published each quarter",
          body: "Quarterly figures appear on this site first, dated, with the period they cover.",
        },
        {
          title: "Evidence named",
          body: "Each update names the document, data or photos behind it. Ask and we will show you.",
        },
        {
          title: "Replaced by the audit",
          body: "When the annual accounts are audited and signed, they replace the quarterly figures.",
        },
      ],
    },
  },

  temboan: {
    meta: {
      title: "Temboan: land restoration",
      description:
        "A 600-hectare site in Minahasa where we restore degraded land with mixed agroforestry and manage coconut and clove gardens as the site's income.",
    },
    stats: { title: "Temboan in numbers" },
    coconut: {
      title: "Every coconut tree counted",
      lede: "Field teams mapped {total} coconut trees across the three villages in {month}. This is the baseline for the site's income plan.",
      chart: "Coconut trees mapped by village",
      total: "Total mapped",
      source: "GPS mapping, {month}",
    },
    income: {
      title: "Income that keeps restoration going",
      body: [
        "The coconut and clove gardens already on the site are managed as its income, so restoration does not depend on grants alone. Arenga sugar palm comes next.",
        "Income from coconut, clove and palm sugar is reinvested in restoration and animal care. Nothing is paid out to owners.",
      ],
      cta: "How we handle money",
    },
    gallery: {
      title: "On the site",
    },
    updates: { title: "Latest from Temboan", all: "All field updates" },
    give: { cta: "Give to Temboan" },
  },

  tasikoki: {
    meta: {
      title: "Tasikoki: wildlife rescue",
      description:
        "Tasikoki takes in animals seized from the illegal wildlife trade, rehabilitates them and returns them to the wild where it is safe.",
    },
    stats: { title: "Tasikoki in numbers" },
    chart: {
      title: "Animals rescued and released each year",
      lede: "Animals arrive from seizures, hand-overs and rescues. Released animals have passed their health checks and have a release permit.",
      rescued: "Rescued",
      released: "Released",
      label: "Animals rescued and released per year",
      source: "Tasikoki animal register",
      year: "Year",
    },
    register: {
      title: "The animals in our care today",
      lede: "Every dot is one animal. Open the register to meet them.",
      cta: "Meet the animals",
    },
    education: {
      title: "A classroom as well as a rescue centre",
      body: "Local schools use Tasikoki as a classroom. In 2025, {students} students visited.",
    },
    gallery: {
      title: "At the centre",
    },
    updates: { title: "Latest from Tasikoki", all: "All field updates" },
    give: { cta: "Meet the animals" },
  },
};

const id: typeof en = {
  overview: {
    meta: {
      title: "Program",
      description:
        "Temboan memulihkan lahan dan Tasikoki merawat satwa. Keduanya dilaporkan dengan cara yang sama setiap triwulan.",
    },
    hero: {
      title: "Dua lokasi, satu cara pelaporan",
      lede: "Temboan memulihkan lahan kritis. Tasikoki merawat satwa sitaan. Keduanya diukur pada lembar yang sama setiap triwulan, dan hasilnya diterbitkan di sini.",
    },
    sites: { title: "Dua lokasi" },
    educationGallery: { title: "Belajar bersama, dalam gambar" },
    across: {
      title: "Pekerjaan yang melintasi kedua lokasi",
      education: {
        title: "Edukasi dan masyarakat",
        body: "Kunjungan sekolah di Tasikoki, kesepakatan dengan desa-desa di sekitar Temboan, dan program masyarakat pesisir di dekat Desa Tulap.",
      },
      monitoring: {
        title: "Pemantauan dan pelaporan",
        body: "Tim lapangan mencatat penanaman, daya hidup, dan perawatan satwa pada lembar standar. Angka di situs ini berasal dari lembar-lembar itu.",
      },
    },
    how: {
      title: "Bagaimana sebuah angka sampai ke situs ini",
      steps: [
        {
          title: "Dicatat di lapangan",
          body: "Tim lapangan menulis angka penanaman, daya hidup, dan perawatan satwa pada lembar pemantauan yang sama di kedua lokasi.",
        },
        {
          title: "Diterbitkan tiap triwulan",
          body: "Angka triwulanan tampil di situs ini lebih dulu, bertanggal, dengan periode yang dicakupnya.",
        },
        {
          title: "Bukti disebutkan",
          body: "Setiap kabar menyebutkan dokumen, data, atau foto pendukungnya. Minta, dan kami akan menunjukkannya.",
        },
        {
          title: "Digantikan hasil audit",
          body: "Setelah laporan tahunan diaudit dan ditandatangani, laporan itu menggantikan angka triwulanan.",
        },
      ],
    },
  },

  temboan: {
    meta: {
      title: "Temboan: pemulihan lahan",
      description:
        "Lahan seluas 600 hektare di Minahasa tempat kami memulihkan lahan kritis dengan agroforestri campuran dan mengelola kebun kelapa dan cengkih sebagai sumber pendapatan lokasi.",
    },
    stats: { title: "Temboan dalam angka" },
    coconut: {
      title: "Setiap pohon kelapa dihitung",
      lede: "Tim lapangan memetakan {total} pohon kelapa di tiga desa pada {month}. Ini menjadi dasar bagi rencana pendapatan lokasi.",
      chart: "Pohon kelapa terpetakan menurut desa",
      total: "Total terpetakan",
      source: "Pemetaan GPS, {month}",
    },
    income: {
      title: "Pendapatan yang menjaga pemulihan tetap berjalan",
      body: [
        "Kebun kelapa dan cengkih yang sudah ada di lokasi dikelola sebagai sumber pendapatannya, agar pemulihan tidak hanya bergantung pada hibah. Aren menjadi tahap berikutnya.",
        "Pendapatan dari kelapa, cengkih, dan gula aren diinvestasikan kembali ke restorasi dan perawatan satwa. Tidak ada pembagian keuntungan kepada pemilik.",
      ],
      cta: "Cara kami mengelola dana",
    },
    gallery: {
      title: "Di lokasi",
    },
    updates: { title: "Terbaru dari Temboan", all: "Semua kabar lapangan" },
    give: { cta: "Beri untuk Temboan" },
  },

  tasikoki: {
    meta: {
      title: "Tasikoki: penyelamatan satwa",
      description:
        "Tasikoki menerima satwa sitaan dari perdagangan ilegal, merehabilitasinya, dan melepasliarkannya bila aman.",
    },
    stats: { title: "Tasikoki dalam angka" },
    chart: {
      title: "Satwa diselamatkan dan dilepasliarkan setiap tahun",
      lede: "Satwa datang dari penyitaan, penyerahan, dan penyelamatan. Satwa yang dilepasliarkan telah lolos pemeriksaan kesehatan dan memiliki izin pelepasliaran.",
      rescued: "Diselamatkan",
      released: "Dilepasliarkan",
      label: "Satwa diselamatkan dan dilepasliarkan per tahun",
      source: "Register satwa Tasikoki",
      year: "Tahun",
    },
    register: {
      title: "Satwa dalam perawatan kami saat ini",
      lede: "Setiap titik adalah satu satwa. Buka register untuk mengenal mereka.",
      cta: "Kenali satwanya",
    },
    education: {
      title: "Ruang belajar sekaligus pusat penyelamatan",
      body: "Sekolah-sekolah sekitar memakai Tasikoki sebagai ruang belajar. Pada 2025, {students} pelajar berkunjung.",
    },
    gallery: {
      title: "Di pusat penyelamatan",
    },
    updates: { title: "Terbaru dari Tasikoki", all: "Semua kabar lapangan" },
    give: { cta: "Kenali satwanya" },
  },
};

export const programsCopy: Record<Locale, typeof en> = { en, id };
