import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

/**
 * Teks halaman program: ringkasan (/programs), Restorasi, Konservasi, dan Edukasi.
 * Teks berkurung siku, mis. "[…]", adalah penanda tempat: isi setelah datanya dikompilasi.
 */
const en = {
  overview: {
    meta: {
      title: "Programs: Restoration, Conservation and Education",
      description:
        "Three programs of Masarang Foundation in North Sulawesi: forest restoration at Temboan, wildlife conservation at Tasikoki, and environmental education at Titik Tumbuh.",
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
        cta: "See Restoration",
      },
      conservation: {
        name: "Conservation",
        place: "Tasikoki and Mount Masarang",
        teaser:
          "Seized animals are rehabilitated and returned to the wild where it is safe. Sea turtles, forest and biodiversity data are part of the same program.",
        cta: "See Conservation",
      },
      education: {
        name: "Education",
        place: "Tomohon, Tasikoki and the villages we work in",
        teaser: "Learning programs, a community market, residencies, outreach and volunteering.",
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
      title: "Forest Restoration and Agroforestry in Minahasa",
      description:
        "The Temboan Restoration Project and Farmers Empowered restore degraded land in Minahasa, North Sulawesi, with mixed agroforestry and the farmers who live beside it.",
    },
    hero: {
      title: "Restoration",
      lede: "Replanting degraded land around Temboan, Kayuwatu and Mahembang, together with the farmers who live next to it.",
    },
    intro: {
      title: "About Restoration",
      body: [
        "Restoration is our work on degraded land in Minahasa. We plant mixed agroforestry: trees that rebuild the soil together with crops that farmers can sell.",
        "The land is restored with the farmers, not for them. They look after the plots and earn from what grows, so the forest has people who depend on keeping it alive.",
        "Every quarter we publish how much land is restored, how many trees survive and how farmer income changes.",
      ],
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
      title: "Wildlife Conservation: Tasikoki and Sea Turtles",
      description:
        "Tasikoki Wildlife Centre rehabilitates animals rescued from the illegal wildlife trade and releases them where it is safe. See our sea turtle project at Tulap and forest protection.",
    },
    hero: {
      title: "Conservation",
      lede: "Sulawesi is home to wildlife found nowhere else on Earth, and to forests and cultures that grew up alongside it. We rescue and rehabilitate endemic animals, guard the forests they need to survive, and work with local communities to keep alive the traditions and knowledge that have protected this land for generations.",
    },
    intro: {
      title: "About Conservation",
      body: [
        "North Sulawesi sits in Wallacea, where Asia and Australia meet and where many animals live nowhere else on Earth: the crested black macaque (yaki), tarsiers, babirusa, anoa, the maleo and the Sulawesi hornbills. These species face the same threats: forests cleared for farmland, hunting for bushmeat, and the illegal pet trade.",
        "Our Conservation Division works on three fronts. We rescue and rehabilitate wildlife taken from the trade, we protect the forests and beaches these animals need, and we work with local communities and authorities so that protection lasts. Every animal we return to the wild, and every hectare we guard, is part of the same goal: keeping Sulawesi's wildlife where it belongs.",
      ],
    },
    tasikoki: {
      title: "Tasikoki Wildlife Centre",
      body: "Since 2004, Tasikoki Wildlife Centre in Minahasa Utara has taken in animals confiscated from the illegal wildlife trade, illegal pets, or found injured. Most arrive through the North Sulawesi Natural Resources Conservation Agency (BKSDA Sulut), our main government partner. From 2026, Tasikoki is focusing on the rehabilitation of Sulawesi's endemic species, so that our resources go to the animals that can only be returned to the wild here.",
      journeyTitle: "An animal's journey",
      journey: [
        { title: "Rescue", body: "Animals come to us from confiscations, handovers by the public and BKSDA, often weak, stressed or injured." },
        { title: "Quarantine and health check", body: "Our veterinarians examine and treat every animal and screen it for disease before it joins others of its kind." },
        { title: "Rehabilitation", body: "Animal keepers help each animal relearn natural behaviour, with a natural diet, enrichment and as little human contact as possible." },
        { title: "Release or translocation", body: "Animals that are healthy and ready are released into protected habitat. Animals from other parts of Indonesia are returned to their region of origin." },
      ],
      after: [
        "Not every animal can go back to the wild. Animals that are too injured or too used to people stay in our long-term care, and their stories help us teach visitors and students why wildlife does not belong in a cage at home.",
        "Translocation and release is a big part of our work. Many animals seized in North Sulawesi were taken from other islands, such as parrots and cockatoos from Maluku and Papua. With partners such as World Parrot Trust, we send them home, for example to North Maluku, where they can be released in their natural range.",
      ],
      numbers: "From 2021 to 2026, Tasikoki took in {entered} animals of {species} species, and {released} were released or translocated back to their habitat. Around {inCare} animals are in our care today ({date}).",
      adoptLead: "You can support an animal's care through our Tasikoki Adoption program.",
      adoptCta: "Adopt an Animal",
      inCare: "Animals in rehabilitation today",
      entered: "Animals taken in, 2021 to 2026",
      released: "Released or translocated, 2021 to 2026",
    },
    chart: {
      title: "Animals rescued and released each year",
      lede: "Animals arrive from seizures, hand-overs and rescues. Released animals have passed their health checks and have a release permit.",
      rescued: "Rescued",
      released: "Released",
      label: "Animals rescued and released per year",
      source: "Tasikoki animal recap",
      year: "Year",
    },
    adopt: {
      title: "Animals in our care",
      lede: "How many animals Tasikoki cares for in each category, and the ambassador animal that speaks for each one.",
      cta: "See every category",
    },
    turtle: {
      title: "Sea Turtle Project",
      body: [
        "Tulap beach in Minahasa is a nesting beach where five species of sea turtle come ashore to lay their eggs. Turtle eggs are still taken for food and trade, and nests are lost to erosion, waste and predators.",
        "Our patrol team walks the beach at night during the nesting season to find and secure nests. Nests at risk are moved to our hatchery, where the eggs incubate safely until the hatchlings are released to the sea.",
      ],
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
      title: "Environmental Education at Titik Tumbuh",
      description:
        "School visits, EduTour, art residencies, community outreach and volunteering at Titik Tumbuh in Tomohon, run by Masarang Foundation to connect people with nature.",
    },
    hero: {
      title: "Education",
      lede: "Through its Education programs, Masarang Foundation brings together students, artists, local makers, volunteers, and village communities to learn, create, and engage with the Foundation's work.",
    },
    intro: {
      title: "About Education",
      body: [
        "Beyond conservation education, the Education Division communicates Masarang's initiatives in restoration, wildlife protection, community empowerment, culture, and sustainability through creative programs and public engagement. From a creative hub in Tomohon, every activity connects people with Masarang's work and inspires them to take part.",
      ],
    },
    listTitle: "What we run",
    pending: "Details to be added",
    items: {
      tumbuh: {
        title: "Titik Tumbuh",
        tagline: "Rooted in Nature, Thriving in Connection",
        body: "Titik Tumbuh is the new name of Amphitheater Woloan in Tomohon, now a creative hub where nature, culture and community meet. The amphitheater was built by hand by local residents and has natural, unplugged acoustics. It houses a café, a learning space, a library of old and rare books, a gallery of works from our artist residency, and a venue for community events. Visitors can also learn about Yayasan Masarang's history, programs, and impact on site. Every visit supports Masarang's restoration and conservation work.",
        visit: "Plan a Visit",
      },
      lokawaya: {
        title: "Pasar Lokawaya",
        body: "Pasar Lokawaya is a monthly market that brings local talents and small businesses together with visitors at Amphitheater Woloan, Tomohon. Purchases are made in Dobu (the name of the Lokatana currency), the market's own currency, which turns shopping into an experience rather than a simple transaction. The market is a place to learn about local products, sustainable food, and low-waste shopping. Each edition is also a gathering point for community activities such as SAPA ALAM clean-ups.",
      },
      sapa: {
        title: "SAPA ALAM",
        tagline: "Sabtu Pagi Ambil Sampah (Saturday Morning Clean-Up)",
        body: "SAPA ALAM is an open, waste focused clean-up action held in conjunction with Pasar Lokawaya. Participants collect, sort, and record waste around our sites and learn where that waste should go. As a thank-you, they receive Dobu to spend at Pasar Lokawaya. The pilot phase ran 3 times, collecting 73.74 kg of waste with 101 participants. We are now preparing the next phase to widen its impact.",
      },
      residency: {
        title: "Residency",
        body: "Our Residency program invites artists, writers, and illustrators to live and create close to our conservation work. They learn directly from field staff and the animals at Tasikoki Wildlife Centre, then turn that experience into work that reaches people who may never have heard about conservation.",
        edutour: {
          title: "EduTour & Art Exhibition",
          body: "Resident artists join an educational tour of [Tasikoki Wildlife Centre and other Masarang sites], meeting the rescued animals and learning their stories. The works created during the residency are exhibited at the Titik Tumbuh gallery and are available to collectors. Proceeds from sales [support Masarang's conservation programs].",
        },
        storylab: {
          title: "StoryLab for Sampiri",
          body: "StoryLab for Sampiri is a creative residency producing an educational storybook about the Sampiri, or Red-and-blue Lory (Eos histrio), an endangered bird found only in the Talaud and Sangihe islands. Through a public open call, [three] writer–illustrator pairs were selected for a three-day workshop at Tasikoki Wildlife Centre in September 2026. Working with our conservation team and partners rooted in Talaud culture, they wrote a collection of short stories for readers aged about 11 to 13. The book [will be published in December 2026] and shared with [schools in North Sulawesi and Talaud].",
        },
      },
      outreach: {
        title: "Outreach & Community Development",
        body: "We visit schools, villages and communities around Masarang's sites to share knowledge about forests, wildlife and coasts. Through school visits, village discussions and community support, we show that protecting nature also protects livelihoods. Our community development work is designed together with residents, so conservation grows from their own needs. So far we have reached [xx schools] and [xx villages] across [regencies].",
        students: "Students visiting Tasikoki in 2025",
        waste: "Households in the waste pilot",
        wasteNote: "Pilot plan",
      },
      volunteering: {
        title: "Volunteering",
        body: "Join us as a volunteer at Tasikoki Wildlife Centre and help care for confiscated animals during their rehabilitation. Volunteers work alongside our team on daily care, food preparation, enrichment and site maintenance. It is a first-hand look at an animal's journey from rescue to release. We welcome volunteers from Indonesia and abroad, with a minimum stay of [2 weeks].",
        applyTitle: "How to apply",
        steps: [
          "Send your CV and motivation letter through [form/email].",
          "Shortlisted candidates receive our introductory documents.",
          "Online interview.",
          "Confirm your arrival date and complete the pre-arrival preparation.",
        ],
        cta: "Volunteer with Us",
      },
    },
    gallery: { title: "Learning, in pictures" },
    give: { cta: "Ways to give" },
  },
};

const id: typeof en = {
  overview: {
    meta: {
      title: "Program: Restorasi, Konservasi, dan Edukasi",
      description:
        "Tiga program Yayasan Masarang di Sulawesi Utara: restorasi hutan di Temboan, konservasi satwa di Tasikoki, dan edukasi lingkungan di Titik Tumbuh.",
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
        cta: "Lihat Restorasi",
      },
      conservation: {
        name: "Konservasi",
        place: "Tasikoki dan Gunung Masarang",
        teaser:
          "Satwa sitaan direhabilitasi dan dilepasliarkan bila aman. Penyu, hutan, dan data keanekaragaman hayati bagian dari program yang sama.",
        cta: "Lihat Konservasi",
      },
      education: {
        name: "Edukasi",
        place: "Tomohon, Tasikoki, dan desa-desa tempat kami bekerja",
        teaser: "Program belajar, pasar masyarakat, residensi, penjangkauan, dan kerja relawan.",
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
      title: "Restorasi Hutan dan Agroforestri di Minahasa",
      description:
        "Temboan Restoration Project dan Farmers Empowered memulihkan lahan kritis di Minahasa, Sulawesi Utara, dengan agroforestri campuran bersama para petani di sekitarnya.",
    },
    hero: {
      title: "Restorasi",
      lede: "Menanami kembali lahan kritis di sekitar Temboan, Kayuwatu, dan Mahembang, bersama para petani yang tinggal di dekatnya.",
    },
    intro: {
      title: "Tentang Restorasi",
      body: [
        "Restorasi adalah pekerjaan kami di lahan kritis di Minahasa. Kami menanam agroforestri campuran: pohon yang memulihkan tanah bersama tanaman yang bisa dijual petani.",
        "Lahan dipulihkan bersama petani, bukan hanya untuk mereka. Petani merawat petak-petaknya dan memperoleh penghasilan dari hasilnya, sehingga hutan punya orang yang berkepentingan menjaganya tetap hidup.",
        "Setiap triwulan kami menerbitkan luas lahan yang dipulihkan, jumlah pohon yang bertahan hidup, dan perubahan pendapatan petani.",
      ],
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
      title: "Konservasi Satwa: Tasikoki dan Penyu Tulap",
      description:
        "Tasikoki Wildlife Centre merehabilitasi satwa sitaan dari perdagangan ilegal dan melepasliarkannya bila aman. Lihat juga proyek penyu di Tulap dan perlindungan hutan.",
    },
    hero: {
      title: "Konservasi",
      lede: "Sulawesi adalah rumah bagi satwa yang tidak ditemukan di tempat lain di Bumi, serta hutan dan budaya yang tumbuh berdampingan dengannya. Kami menyelamatkan dan merehabilitasi satwa endemik, menjaga hutan yang mereka butuhkan untuk bertahan hidup, dan bekerja bersama masyarakat lokal untuk melestarikan tradisi dan pengetahuan yang telah menjaga tanah ini selama berabad-abad.",
    },
    intro: {
      title: "Tentang Konservasi",
      body: [
        "Sulawesi Utara berada di Wallacea, tempat Asia dan Australia bertemu dan tempat banyak satwa hidup tanpa ada di bagian lain Bumi: yaki (monyet hitam Sulawesi), tarsius, babirusa, anoa, maleo, dan rangkong Sulawesi. Spesies-spesies ini menghadapi ancaman yang sama: hutan dibuka untuk lahan pertanian, perburuan untuk daging liar, dan perdagangan satwa peliharaan ilegal.",
        "Divisi Konservasi kami bekerja di tiga lini. Kami menyelamatkan dan merehabilitasi satwa liar hasil perdagangan, melindungi hutan dan pantai yang dibutuhkan satwa-satwa ini, dan bekerja bersama masyarakat lokal serta pemerintah agar perlindungan itu bertahan lama. Setiap satwa yang kami kembalikan ke alam, dan setiap hektare yang kami jaga, adalah bagian dari tujuan yang sama: menjaga satwa Sulawesi tetap berada di tempatnya.",
      ],
    },
    tasikoki: {
      title: "Tasikoki Wildlife Centre",
      body: "Sejak 2004, Tasikoki Wildlife Centre di Minahasa Utara menerima satwa yang disita dari perdagangan satwa liar ilegal, satwa peliharaan ilegal, atau ditemukan dalam keadaan terluka. Sebagian besar datang melalui Balai Konservasi Sumber Daya Alam Sulawesi Utara (BKSDA Sulut), mitra pemerintah utama kami. Mulai 2026, Tasikoki berfokus pada rehabilitasi spesies endemik Sulawesi, agar sumber daya kami tertuju pada satwa yang hanya dapat dikembalikan ke alam di sini.",
      journeyTitle: "Perjalanan seekor satwa",
      journey: [
        { title: "Penyelamatan", body: "Satwa datang kepada kami dari penyitaan, serta penyerahan oleh masyarakat dan BKSDA, sering kali dalam keadaan lemah, stres, atau terluka." },
        { title: "Karantina dan pemeriksaan kesehatan", body: "Dokter hewan kami memeriksa dan mengobati setiap satwa serta memeriksanya dari penyakit sebelum bergabung dengan sesamanya." },
        { title: "Rehabilitasi", body: "Perawat satwa membantu setiap satwa mempelajari kembali perilaku alaminya, dengan pakan alami, pengayaan lingkungan, dan sesedikit mungkin kontak dengan manusia." },
        { title: "Pelepasliaran atau translokasi", body: "Satwa yang sehat dan siap dilepasliarkan ke habitat yang dilindungi. Satwa dari bagian lain Indonesia dikembalikan ke daerah asalnya." },
      ],
      after: [
        "Tidak semua satwa dapat kembali ke alam. Satwa yang terlalu terluka atau terlalu terbiasa dengan manusia tetap dalam perawatan jangka panjang kami, dan kisah mereka membantu kami mengajarkan kepada pengunjung dan pelajar mengapa satwa liar tidak seharusnya berada di dalam sangkar di rumah.",
        "Translokasi dan pelepasliaran adalah bagian besar dari pekerjaan kami. Banyak satwa yang disita di Sulawesi Utara berasal dari pulau lain, seperti burung nuri dan kakatua dari Maluku dan Papua. Bersama mitra seperti World Parrot Trust, kami mengirim mereka pulang, misalnya ke Maluku Utara, tempat mereka dapat dilepasliarkan di habitat aslinya.",
      ],
      numbers: "Dari 2021 sampai 2026, Tasikoki menerima {entered} satwa dari {species} spesies, dan {released} di antaranya dilepasliarkan atau ditranslokasikan kembali ke habitatnya. Sekitar {inCare} satwa berada dalam perawatan kami hari ini ({date}).",
      adoptLead: "Anda dapat mendukung perawatan satwa melalui program Adopsi Tasikoki kami.",
      adoptCta: "Adopsi Satwa",
      inCare: "Satwa dalam rehabilitasi hari ini",
      entered: "Satwa diterima, 2021 sampai 2026",
      released: "Dilepasliarkan atau ditranslokasi, 2021 sampai 2026",
    },
    chart: {
      title: "Satwa diselamatkan dan dilepasliarkan setiap tahun",
      lede: "Satwa datang dari penyitaan, penyerahan, dan penyelamatan. Satwa yang dilepasliarkan telah lolos pemeriksaan kesehatan dan memiliki izin pelepasliaran.",
      rescued: "Diselamatkan",
      released: "Dilepasliarkan",
      label: "Satwa diselamatkan dan dilepasliarkan per tahun",
      source: "Rekapitulasi satwa Tasikoki",
      year: "Tahun",
    },
    adopt: {
      title: "Satwa dalam perawatan kami",
      lede: "Jumlah satwa yang dirawat Tasikoki di setiap kategori, dan satwa duta yang mewakili masing-masing.",
      cta: "Lihat semua kategori",
    },
    turtle: {
      title: "Proyek Penyu",
      body: [
        "Pantai Tulap di Minahasa adalah pantai peneluran tempat lima jenis penyu naik ke darat untuk bertelur. Telur penyu masih diambil untuk dimakan dan diperdagangkan, dan sarang hilang karena erosi, sampah, dan pemangsa.",
        "Tim patroli kami menyusuri pantai pada malam hari selama musim bertelur untuk menemukan dan mengamankan sarang. Sarang yang terancam dipindahkan ke tempat penetasan kami, tempat telur dieram dengan aman sampai tukik dilepas ke laut.",
      ],
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
      title: "Edukasi Lingkungan di Titik Tumbuh",
      description:
        "Kunjungan sekolah, EduTour, residensi seni, penjangkauan masyarakat, dan kerja relawan di Titik Tumbuh, Tomohon, untuk menghubungkan masyarakat dengan alam.",
    },
    hero: {
      title: "Edukasi",
      lede: "Melalui program Edukasi, Yayasan Masarang mempertemukan pelajar, seniman, pelaku usaha lokal, relawan, dan masyarakat desa untuk belajar, berkarya, dan terlibat dalam pekerjaan yayasan.",
    },
    intro: {
      title: "Tentang Edukasi",
      body: [
        "Selain edukasi konservasi, Divisi Edukasi mengomunikasikan inisiatif Masarang di bidang restorasi, perlindungan satwa liar, pemberdayaan masyarakat, budaya, dan keberlanjutan melalui program kreatif dan keterlibatan publik. Dari sebuah pusat kreatif di Tomohon, setiap kegiatan menghubungkan masyarakat dengan pekerjaan Masarang dan mengajak mereka ikut serta.",
      ],
    },
    listTitle: "Yang kami jalankan",
    pending: "Rincian menyusul",
    items: {
      tumbuh: {
        title: "Titik Tumbuh",
        tagline: "Berakar pada Alam, Bertumbuh dalam Kebersamaan",
        body: "Titik Tumbuh adalah nama baru Amfiteater Woloan di Tomohon, kini menjadi pusat kreatif tempat alam, budaya, dan komunitas bertemu. Amfiteater ini dibangun dengan tangan oleh warga setempat dan memiliki akustik alami tanpa pengeras suara. Di dalamnya ada kafe, ruang belajar, perpustakaan buku-buku lama dan langka, galeri karya dari residensi seniman kami, dan tempat acara komunitas. Pengunjung juga dapat mempelajari sejarah, program, dan dampak Yayasan Masarang di lokasi. Setiap kunjungan mendukung pekerjaan restorasi dan konservasi Masarang.",
        visit: "Rencanakan Kunjungan",
      },
      lokawaya: {
        title: "Pasar Lokawaya",
        body: "Pasar Lokawaya adalah pasar bulanan yang mempertemukan talenta lokal dan usaha kecil dengan pengunjung di Amfiteater Woloan, Tomohon. Pembelian dilakukan dengan Dobu (nama mata uang Lokatana), mata uang khusus pasar ini, yang menjadikan berbelanja sebuah pengalaman, bukan sekadar transaksi. Pasar ini adalah tempat belajar tentang produk lokal, pangan berkelanjutan, dan belanja minim sampah. Setiap edisi juga menjadi titik kumpul kegiatan komunitas seperti aksi bersih-bersih SAPA ALAM.",
      },
      sapa: {
        title: "SAPA ALAM",
        tagline: "Sabtu Pagi Ambil Sampah",
        body: "SAPA ALAM adalah aksi bersih-bersih terbuka yang berfokus pada sampah, diadakan bersamaan dengan Pasar Lokawaya. Peserta mengumpulkan, memilah, dan mencatat sampah di sekitar lokasi kami dan belajar ke mana sampah itu seharusnya pergi. Sebagai ucapan terima kasih, mereka menerima Dobu untuk dibelanjakan di Pasar Lokawaya. Fase percontohan berlangsung 3 kali, mengumpulkan 73,74 kg sampah dengan 101 peserta. Kini kami menyiapkan fase berikutnya untuk memperluas dampaknya.",
      },
      residency: {
        title: "Residensi",
        body: "Program Residensi kami mengundang seniman, penulis, dan ilustrator untuk tinggal dan berkarya dekat dengan pekerjaan konservasi kami. Mereka belajar langsung dari petugas lapangan dan satwa di Tasikoki Wildlife Centre, lalu menuangkan pengalaman itu menjadi karya yang menjangkau orang-orang yang mungkin belum pernah mendengar tentang konservasi.",
        edutour: {
          title: "EduTour & Pameran Seni",
          body: "Seniman residensi mengikuti tur edukasi ke [Tasikoki Wildlife Centre dan lokasi Masarang lainnya], bertemu satwa yang diselamatkan dan mempelajari kisah mereka. Karya yang dibuat selama residensi dipamerkan di galeri Titik Tumbuh dan tersedia bagi kolektor. Hasil penjualan [mendukung program konservasi Masarang].",
        },
        storylab: {
          title: "StoryLab for Sampiri",
          body: "StoryLab for Sampiri adalah residensi kreatif yang menghasilkan buku cerita edukatif tentang Sampiri, atau Nuri Talaud (Eos histrio), burung terancam punah yang hanya ditemukan di Kepulauan Talaud dan Sangihe. Melalui panggilan terbuka, [tiga] pasangan penulis–ilustrator terpilih untuk lokakarya tiga hari di Tasikoki Wildlife Centre pada September 2026. Bersama tim konservasi kami dan mitra yang berakar pada budaya Talaud, mereka menulis kumpulan cerita pendek untuk pembaca berusia sekitar 11 sampai 13 tahun. Buku ini [akan terbit pada Desember 2026] dan dibagikan kepada [sekolah-sekolah di Sulawesi Utara dan Talaud].",
        },
      },
      outreach: {
        title: "Outreach & Pengembangan Masyarakat",
        body: "Kami mengunjungi sekolah, desa, dan komunitas di sekitar lokasi Masarang untuk berbagi pengetahuan tentang hutan, satwa liar, dan pesisir. Melalui kunjungan sekolah, diskusi desa, dan dukungan masyarakat, kami menunjukkan bahwa melindungi alam juga melindungi mata pencaharian. Kerja pengembangan masyarakat kami dirancang bersama warga, sehingga konservasi tumbuh dari kebutuhan mereka sendiri. Sejauh ini kami telah menjangkau [xx sekolah] dan [xx desa] di [kabupaten].",
        students: "Pelajar berkunjung ke Tasikoki pada 2025",
        waste: "Rumah tangga dalam pilot sampah",
        wasteNote: "Rencana pilot",
      },
      volunteering: {
        title: "Relawan",
        body: "Bergabunglah sebagai relawan di Tasikoki Wildlife Centre dan bantu merawat satwa sitaan selama masa rehabilitasi. Relawan bekerja bersama tim kami dalam perawatan harian, penyiapan pakan, pengayaan lingkungan, dan pemeliharaan lokasi. Ini kesempatan melihat langsung perjalanan seekor satwa dari penyelamatan hingga pelepasliaran. Kami menerima relawan dari Indonesia dan luar negeri, dengan masa tinggal minimal [2 minggu].",
        applyTitle: "Cara mendaftar",
        steps: [
          "Kirim CV dan surat motivasi Anda melalui [formulir/email].",
          "Kandidat yang terpilih menerima dokumen pengantar kami.",
          "Wawancara daring.",
          "Konfirmasi tanggal kedatangan dan selesaikan persiapan sebelum tiba.",
        ],
        cta: "Jadi Relawan",
      },
    },
    gallery: { title: "Belajar bersama, dalam gambar" },
    give: { cta: "Cara berdonasi" },
  },
};

export const programsCopy: Record<Locale, typeof en> = cmsText("programs", { en, id });
