import type { Locale } from "@/lib/i18n";

/**
 * Teks halaman program: ringkasan (/programs), Restorasi, Konservasi, dan Edukasi.
 * Teks berkurung siku, mis. "[…]", adalah penanda tempat: isi setelah datanya dikompilasi.
 */
const en = {
  overview: {
    meta: {
      title: "Programs",
      description:
        "Restoration, conservation and education: the three programs of Yayasan Masarang, reported the same way every quarter.",
    },
    hero: {
      title: "Three programs, one way of reporting",
      lede: "We restore degraded land, care for rescued wildlife and protect forest, and run education programs that bring people into the work. Each is measured the same way every quarter, and the results are published here.",
    },
    itemsTitle: "What we run",
    items: {
      restoration: {
        name: "Restoration",
        place: "Temboan, Kayuwatu and Mahembang",
        teaser:
          "Mixed agroforestry on degraded land, and the farmers who earn from the land they help restore.",
        points: ["Temboan Restoration Project", "Farmers Empowered"],
        cta: "See Restoration",
      },
      conservation: {
        name: "Conservation",
        place: "Tasikoki and Mount Masarang",
        teaser:
          "Seized animals are rehabilitated and returned to the wild where it is safe. Sea turtles, forest and biodiversity data are part of the same program.",
        points: [
          "Tasikoki: rehabilitation, translocation and release",
          "Animals to adopt",
          "Sea Turtle Project",
          "Forest Protection",
          "Biodiversity data",
        ],
        cta: "See Conservation",
      },
      education: {
        name: "Education",
        place: "Tomohon, Tasikoki and the villages we work in",
        teaser: "Learning programs, a community market, residencies, outreach and volunteering.",
        points: [".Tumbuh", "Pasar Lokawaya", "SAPA ALAM", "Residency", "Outreach and community development", "Volunteering"],
        cta: "See Education",
      },
    },
    monitoring: {
      title: "Monitoring and reporting",
      body: "Field teams record planting, survival and animal care on standard sheets. The figures on this site come from those sheets, and each quarter's results are collected in the Quarterly Report.",
      cta: "Read the Quarterly Reports",
    },
    how: {
      title: "How a number gets to this site",
      steps: [
        {
          title: "Recorded in the field",
          body: "Field teams write planting, survival and animal care figures on the same monitoring sheets at every site.",
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

  /** Navigasi antarprogram (tab di atas halaman program). */
  tabs: { label: "Programs", overview: "All programs", restoration: "Restoration", conservation: "Conservation", education: "Education" },

  restoration: {
    meta: {
      title: "Restoration",
      description:
        "The Temboan Restoration Project and Farmers Empowered: restoring degraded land in Minahasa with mixed agroforestry, together with the farmers who live next to it.",
    },
    hero: {
      title: "Restoration",
      lede: "Replanting degraded land around Temboan, Kayuwatu and Mahembang, together with the farmers who live next to it.",
    },
    project: {
      title: "Temboan Restoration Project",
      body: [
        "Temboan is a {ha}-hectare conservation area in Minahasa, bordering the villages of Palamba, Rumbia and Temboan. We restore degraded land there with mixed agroforestry.",
        "The coconut and clove gardens already on the site are managed as its income, so restoration does not depend on grants alone.",
      ],
    },
    stats: {
      title: "Restoration in numbers",
      years: "Area restored in the last {n} years",
      area: "Temboan conservation area",
      temboan: "Restored at Temboan",
      other: "Restored at Kayuwatu and Mahembang",
    },
    farmers: {
      title: "Farmers Empowered",
      body: "[Describe the program: who the farmers are, what they produce and how TMS markets it.]",
      count: "Farmers taking part",
      income: "Increase in farmer income",
      note: "[State what the 35% is measured against and over which period.]",
    },
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
        "Income from coconut, clove and palm sugar is reinvested in restoration and animal care. Nothing is paid out to owners.",
      ],
      cta: "How we handle money",
    },
    gallery: { title: "On the site" },
    updates: { title: "Latest from Temboan", all: "All field updates" },
    give: { cta: "Give to restoration" },
  },

  conservation: {
    meta: {
      title: "Conservation",
      description:
        "Tasikoki rehabilitates animals seized from the illegal wildlife trade and releases them where it is safe. Sea turtles, forest protection and biodiversity data are part of the same program.",
    },
    hero: {
      title: "Conservation",
      lede: "Caring for rescued wildlife at Tasikoki, protecting sea turtles and the forest of Mount Masarang, and keeping the data.",
    },
    tasikoki: {
      title: "Tasikoki Wildlife Rescue and Education Centre",
      body: "Tasikoki takes in animals seized from the illegal wildlife trade, rehabilitates them, moves them to safer places and returns them to the wild where it is safe to do so.",
      inCare: "Animals in rehabilitation today",
      translocated: "Animals translocated",
      released: "Released in 2025",
    },
    chart: {
      title: "Animals rescued and released each year",
      lede: "Animals arrive from seizures, hand-overs and rescues. Released animals have passed their health checks and have a release permit.",
      rescued: "Rescued",
      released: "Released",
      label: "Animals rescued and released per year",
      source: "Tasikoki animal register",
      year: "Year",
    },
    adopt: {
      title: "Animals to adopt",
      lede: "Every dot is one animal. Hollow dots are still waiting for a sponsor. Open the register to meet them.",
      cta: "Meet the animals",
    },
    turtle: {
      title: "Sea Turtle Project",
      body: "We began with a baseline survey of nesting beaches, households and egg collection at Desa Tulap, Kecamatan Kombi. The results set the targets for the school program and for a livelihood pilot for former egg collectors.",
      adopt: "[Decide whether supporters can adopt a nest, then describe how it works.]",
      status: "Where the work stands",
    },
    forest: {
      title: "Forest Protection",
      body: "[Describe how the forest of Mount Masarang is protected: boundaries, patrols and partners.]",
      stat: "Forest protected on Mount Masarang",
    },
    biodiversity: {
      title: "Biodiversity data",
      body: "[Explain what is recorded (species lists, surveys, dates), where the data is kept and how researchers can ask for it.]",
    },
    gallery: { title: "At the centre" },
    updates: { title: "Latest from Tasikoki", all: "All field updates" },
    give: { cta: "Meet the animals" },
  },

  education: {
    meta: {
      title: "Education",
      description:
        "Learning programs, a community market, residencies, outreach and volunteering run by Yayasan Masarang.",
    },
    hero: {
      title: "Education",
      lede: "Learning programs, a community market, residencies, outreach and volunteering that bring people into the work.",
    },
    listTitle: "What we run",
    pending: "Details to be added",
    items: {
      tumbuh: { title: ".Tumbuh", body: "[What .Tumbuh is, who takes part and how often it happens.]" },
      lokawaya: { title: "Pasar Lokawaya", body: "[What the market is, who sells and visits, and when it opens.]" },
      sapa: { title: "SAPA ALAM", body: "[What SAPA ALAM is and who it is for.]" },
      residency: {
        title: "Residency",
        body: "[How the residency works: who comes, for how long and what they make.]",
        edutour: { title: "EduTour", body: "[What an EduTour is and who joins.]" },
        storylab: {
          title: "StoryLab for Sampiri",
          body: "[What StoryLab is, who took part and what came out of it.]",
        },
      },
      outreach: {
        title: "Outreach and community development",
        body: "School visits at Tasikoki, agreements with the villages around Temboan and the coastal community programs near Desa Tulap, including the waste pilot.",
        students: "Students visiting Tasikoki in 2025",
        waste: "Households in the waste pilot",
        wasteNote: "Pilot plan",
      },
      volunteering: {
        title: "Volunteering",
        body: "[How to volunteer: roles, length of stay, costs and how to apply.]",
      },
    },
    gallery: { title: "Learning, in pictures" },
    give: { cta: "Ways to give" },
  },
};

const id: typeof en = {
  overview: {
    meta: {
      title: "Program",
      description:
        "Restorasi, konservasi, dan edukasi: tiga program Yayasan Masarang, dilaporkan dengan cara yang sama setiap triwulan.",
    },
    hero: {
      title: "Tiga program, satu cara pelaporan",
      lede: "Kami memulihkan lahan kritis, merawat satwa sitaan, melindungi hutan, dan menjalankan program edukasi yang mengajak orang terlibat. Semuanya diukur dengan cara yang sama setiap triwulan, dan hasilnya diterbitkan di sini.",
    },
    itemsTitle: "Yang kami jalankan",
    items: {
      restoration: {
        name: "Restorasi",
        place: "Temboan, Kayuwatu, dan Mahembang",
        teaser:
          "Agroforestri campuran di lahan kritis, dan para petani yang memperoleh penghasilan dari lahan yang ikut mereka pulihkan.",
        points: ["Temboan Restoration Project", "Farmers Empowered"],
        cta: "Lihat Restorasi",
      },
      conservation: {
        name: "Konservasi",
        place: "Tasikoki dan Gunung Masarang",
        teaser:
          "Satwa sitaan direhabilitasi dan dilepasliarkan bila aman. Penyu, hutan, dan data keanekaragaman hayati bagian dari program yang sama.",
        points: [
          "Tasikoki: rehabilitasi, translokasi, dan pelepasliaran",
          "Satwa untuk diadopsi",
          "Proyek Penyu",
          "Perlindungan Hutan",
          "Data keanekaragaman hayati",
        ],
        cta: "Lihat Konservasi",
      },
      education: {
        name: "Edukasi",
        place: "Tomohon, Tasikoki, dan desa-desa tempat kami bekerja",
        teaser: "Program belajar, pasar masyarakat, residensi, penjangkauan, dan kerja relawan.",
        points: [".Tumbuh", "Pasar Lokawaya", "SAPA ALAM", "Residensi", "Outreach dan pengembangan masyarakat", "Relawan"],
        cta: "Lihat Edukasi",
      },
    },
    monitoring: {
      title: "Pemantauan dan pelaporan",
      body: "Tim lapangan mencatat penanaman, daya hidup, dan perawatan satwa pada lembar standar. Angka di situs ini berasal dari lembar-lembar itu, dan hasil tiap triwulan dihimpun dalam Quarterly Report.",
      cta: "Baca Quarterly Report",
    },
    how: {
      title: "Bagaimana sebuah angka sampai ke situs ini",
      steps: [
        {
          title: "Dicatat di lapangan",
          body: "Tim lapangan menulis angka penanaman, daya hidup, dan perawatan satwa pada lembar pemantauan yang sama di setiap lokasi.",
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

  tabs: { label: "Program", overview: "Semua program", restoration: "Restorasi", conservation: "Konservasi", education: "Edukasi" },

  restoration: {
    meta: {
      title: "Restorasi",
      description:
        "Temboan Restoration Project dan Farmers Empowered: memulihkan lahan kritis di Minahasa dengan agroforestri campuran, bersama para petani yang tinggal di sekitarnya.",
    },
    hero: {
      title: "Restorasi",
      lede: "Menanami kembali lahan kritis di sekitar Temboan, Kayuwatu, dan Mahembang, bersama para petani yang tinggal di dekatnya.",
    },
    project: {
      title: "Temboan Restoration Project",
      body: [
        "Temboan adalah kawasan konservasi seluas {ha} hektare di Minahasa, berbatasan dengan desa Palamba, Rumbia, dan Temboan. Di sana kami memulihkan lahan kritis dengan agroforestri campuran.",
        "Kebun kelapa dan cengkih yang sudah ada di lokasi dikelola sebagai sumber pendapatannya, agar pemulihan tidak hanya bergantung pada hibah.",
      ],
    },
    stats: {
      title: "Restorasi dalam angka",
      years: "Luas yang dipulihkan dalam {n} tahun terakhir",
      area: "Kawasan konservasi Temboan",
      temboan: "Dipulihkan di Temboan",
      other: "Dipulihkan di Kayuwatu dan Mahembang",
    },
    farmers: {
      title: "Farmers Empowered",
      body: "[Jelaskan programnya: siapa para petani, apa yang mereka hasilkan, dan bagaimana TMS memasarkannya.]",
      count: "Petani yang terlibat",
      income: "Kenaikan pendapatan petani",
      note: "[Tulis 35% itu dibandingkan dengan apa dan dalam periode berapa.]",
    },
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
        "Pendapatan dari kelapa, cengkih, dan gula aren diinvestasikan kembali ke restorasi dan perawatan satwa. Tidak ada pembagian keuntungan kepada pemilik.",
      ],
      cta: "Cara kami mengelola dana",
    },
    gallery: { title: "Di lokasi" },
    updates: { title: "Terbaru dari Temboan", all: "Semua kabar lapangan" },
    give: { cta: "Beri untuk restorasi" },
  },

  conservation: {
    meta: {
      title: "Konservasi",
      description:
        "Tasikoki merehabilitasi satwa sitaan dari perdagangan ilegal dan melepasliarkannya bila aman. Penyu, perlindungan hutan, dan data keanekaragaman hayati bagian dari program yang sama.",
    },
    hero: {
      title: "Konservasi",
      lede: "Merawat satwa sitaan di Tasikoki, melindungi penyu dan hutan Gunung Masarang, serta menyimpan datanya.",
    },
    tasikoki: {
      title: "Tasikoki Wildlife Rescue and Education Centre",
      body: "Tasikoki menerima satwa sitaan dari perdagangan ilegal, merehabilitasinya, memindahkannya ke tempat yang lebih aman, dan melepasliarkannya bila aman.",
      inCare: "Satwa dalam rehabilitasi saat ini",
      translocated: "Satwa yang ditranslokasi",
      released: "Dilepasliarkan pada 2025",
    },
    chart: {
      title: "Satwa diselamatkan dan dilepasliarkan setiap tahun",
      lede: "Satwa datang dari penyitaan, penyerahan, dan penyelamatan. Satwa yang dilepasliarkan telah lolos pemeriksaan kesehatan dan memiliki izin pelepasliaran.",
      rescued: "Diselamatkan",
      released: "Dilepasliarkan",
      label: "Satwa diselamatkan dan dilepasliarkan per tahun",
      source: "Register satwa Tasikoki",
      year: "Tahun",
    },
    adopt: {
      title: "Satwa untuk diadopsi",
      lede: "Setiap titik adalah satu satwa. Titik kosong masih menunggu sponsor. Buka register untuk mengenal mereka.",
      cta: "Kenali satwanya",
    },
    turtle: {
      title: "Proyek Penyu",
      body: "Kami memulai dengan survei awal pantai peneluran, rumah tangga, dan pengambilan telur di Desa Tulap, Kecamatan Kombi. Hasilnya menentukan target program sekolah dan pilot mata pencaharian bagi mantan pengambil telur.",
      adopt: "[Putuskan apakah pendukung dapat mengadopsi sarang, lalu jelaskan caranya.]",
      status: "Posisi pekerjaan",
    },
    forest: {
      title: "Perlindungan Hutan",
      body: "[Jelaskan bagaimana hutan Gunung Masarang dilindungi: batas kawasan, patroli, dan mitra.]",
      stat: "Hutan terlindungi di Gunung Masarang",
    },
    biodiversity: {
      title: "Data keanekaragaman hayati",
      body: "[Jelaskan apa yang dicatat (daftar jenis, survei, tanggal), di mana data disimpan, dan bagaimana peneliti dapat memintanya.]",
    },
    gallery: { title: "Di pusat penyelamatan" },
    updates: { title: "Terbaru dari Tasikoki", all: "Semua kabar lapangan" },
    give: { cta: "Kenali satwanya" },
  },

  education: {
    meta: {
      title: "Edukasi",
      description:
        "Program belajar, pasar masyarakat, residensi, penjangkauan, dan kerja relawan yang dijalankan Yayasan Masarang.",
    },
    hero: {
      title: "Edukasi",
      lede: "Program belajar, pasar masyarakat, residensi, penjangkauan, dan kerja relawan yang mengajak orang terlibat dalam pekerjaan ini.",
    },
    listTitle: "Yang kami jalankan",
    pending: "Keterangan menyusul",
    items: {
      tumbuh: { title: ".Tumbuh", body: "[Apa itu .Tumbuh, siapa yang terlibat, dan seberapa sering diadakan.]" },
      lokawaya: { title: "Pasar Lokawaya", body: "[Apa itu pasar ini, siapa yang berjualan dan berkunjung, dan kapan buka.]" },
      sapa: { title: "SAPA ALAM", body: "[Apa itu SAPA ALAM dan untuk siapa.]" },
      residency: {
        title: "Residensi",
        body: "[Cara kerja residensi: siapa yang datang, berapa lama, dan apa yang mereka hasilkan.]",
        edutour: { title: "EduTour", body: "[Apa itu EduTour dan siapa yang ikut.]" },
        storylab: {
          title: "StoryLab for Sampiri",
          body: "[Apa itu StoryLab, siapa yang ikut, dan apa hasilnya.]",
        },
      },
      outreach: {
        title: "Outreach dan pengembangan masyarakat",
        body: "Kunjungan sekolah di Tasikoki, kesepakatan dengan desa-desa di sekitar Temboan, dan program masyarakat pesisir di dekat Desa Tulap, termasuk pilot sampah.",
        students: "Pelajar berkunjung ke Tasikoki pada 2025",
        waste: "Rumah tangga dalam pilot sampah",
        wasteNote: "Rencana pilot",
      },
      volunteering: {
        title: "Relawan",
        body: "[Cara menjadi relawan: peran, lama tinggal, biaya, dan cara mendaftar.]",
      },
    },
    gallery: { title: "Belajar bersama, dalam gambar" },
    give: { cta: "Cara berdonasi" },
  },
};

export const programsCopy: Record<Locale, typeof en> = { en, id };
