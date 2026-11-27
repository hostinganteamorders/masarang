import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

/** Halaman Tentang Kami (ringkasan + Founder, Story, Vision & Approach, Sites, Partners). Teks berkurung siku "[…]" adalah penanda tempat. */
const en = {
  meta: {
    title: "About Us",
    description:
      "Masarang Foundation connects nature conservation with the empowerment of local communities in North Sulawesi. Meet our founder, our story, our approach, our sites and our partners.",
  },
  hero: {
    title: "About Us",
    lede: "Who we are, where we work, and who we work with.",
  },
  overview: {
    title: "Five ways in",
    lede: "Start anywhere. Each page tells one part of the Masarang story.",
    open: "Read more",
    cards: {
      founder: { title: "Our Founder", body: "Three decades of restoring forests by empowering the people who live alongside them." },
      story: { title: "Our Story", body: "From one mountain to a movement across North Sulawesi." },
      vision: { title: "Vision & Approach", body: "Preserving Nature Through the Empowerment of Local People." },
      sites: { title: "Our Sites", body: "Where our work takes root." },
      partners: { title: "Our Partners", body: "Working together for people and nature." },
    },
  },
  founder: {
    title: "Our Founder",
    subheader: "Three decades of restoring forests by empowering the people who live alongside them.",
    name: "Dr. Willie Smits",
    role: "Founder & Conservation Pioneer",
    bio: [
      "Dr. Willie Smits is an Indonesian-Dutch forester, microbiologist, conservationist, and social entrepreneur who has spent more than three decades protecting biodiversity and restoring tropical ecosystems.",
      "His work began in East Kalimantan, where he witnessed firsthand the impact of deforestation. In 1991, he founded the Borneo Orangutan Survival (BOS) Foundation. Through Samboja Lestari, he demonstrated how degraded alang-alang grassland could recover and develop into tropical forest. In 2001, he established Masarang Foundation in North Sulawesi, placing local communities at the heart of conservation efforts.",
    ],
    recognitionTitle: "Recognition",
    recognition: [
      "PhD, Wageningen University [field of study to be confirmed]",
      "Ashoka Fellow, 2009",
      "Bambi Award, 2017/2018, and other awards [to be added once verified]",
    ],
    photoLabel: "Photo of Dr. Willie Smits to be added",
    video: "Video: Aping",
  },
  story: {
    title: "Our Story",
    subheader: "From one mountain to a movement across North Sulawesi.",
    paragraphs: [
      "Masarang began in 2001 with a simple idea: restore the forests of Mount Masarang, and the water will return. And it did. Reforestation on the slopes above Tomohon helped reduce flooding in the villages below and revive springs that had been dry for decades. Today, five protected springs provide free access to clean water for around 20,000 people.",
      "As the forests recovered, our work expanded. Restoration efforts extended from Mount Masarang to Pulisan and later to Temboan in 2015. In 2004, we established Pusat Penyelamatan Satwa Tasikoki to rescue and rehabilitate wildlife affected by the illegal wildlife trade. In 2026, the centre was rebranded as Tasikoki Wildlife Centre, with a dedicated focus on the rehabilitation and care of Sulawesi's endemic wildlife. In 2006, we also established a geothermal-powered palm sugar factory in Lahendong, creating sustainable income opportunities for local palm sugar farmers while helping protect standing forests.",
      "Education grew alongside these efforts, from the establishment of the Walanda Library and Woloan Amphitheater to our collaboration with Institut Teknologi Minaesa. In 2026, the amphitheater evolved into Titik Tumbuh, a space where people can connect, learn about nature, and take part in protecting it.",
      "Twenty-five years on, our original idea remains unchanged: when local communities are empowered, nature has the opportunity to recover and thrive.",
    ],
    recognitionTitle: "Recognition",
    recognition: "BBC World Challenge Finalist (2007) · Sidhakarya Award · Paramakarya Award (2017, together with Pertamina)",
  },
  vision: {
    title: "Vision & Approach",
    subheader: "Preserving Nature Through the Empowerment of Local People.",
    ourVision: {
      title: "Our Vision",
      body: "People and nature are part of the same future. Conservation lasts when local communities have the knowledge, opportunities, and sense of ownership needed to protect the natural environment around them.",
    },
    why: {
      title: "Why We Do It",
      body: "North Sulawesi lies within Wallacea, one of the world's most distinctive natural regions. It is home to the black-crested macaque (yaki), tarsiers, and the elusive Sulawesi civet. Its beaches also serve as nesting grounds for five species of sea turtles. Deforestation, the illegal wildlife trade, and unsustainable land use threaten this natural heritage, as well as the communities that depend on healthy forests, water sources, and coastal ecosystems.",
    },
    how: {
      title: "How We Work",
      pillars: [
        {
          id: "nature",
          title: "Protecting Nature & Restoring Ecosystems",
          body: "We protect forests, restore degraded land, and rehabilitate rescued wildlife.",
        },
        {
          id: "people",
          title: "Empowering People & Improving Well-being",
          body: "We work alongside communities, strengthen local capacity, and respect local knowledge and culture.",
        },
        {
          id: "agriculture",
          title: "Sustainable Agriculture & Livelihoods",
          body: "Through agroforestry, palm sugar production, and environmentally responsible practices, we create livelihood opportunities while reducing pressure on forests.",
        },
      ],
      closing: "Lasting change happens when people are empowered to become active stewards of nature.",
    },
    programs: {
      lead: "These pillars are carried out through three programs:",
      restoration: "Restoration",
      conservation: "Conservation",
      education: "Education",
    },
  },
  sites: {
    title: "Our Sites",
    subheader: "Where our work takes root.",
    lede: "From mountain forests to turtle-nesting beaches, each site plays a distinct role in our restoration, conservation, and education efforts.",
    mapTitle: "North Sulawesi",
    mapNote: "Pins mark the general area of each site, not exact positions.",
    mapLabel: "Map of North Sulawesi with the Masarang sites",
    profilesTitle: "Site profiles",
    associated: "Associated site",
    programTag: { restoration: "Restoration", conservation: "Conservation", education: "Education", livelihood: "Livelihood" },
    seeProgram: "See the program",
    sources: "Data come from the Masarang Pocket Book. Temboan data have been confirmed by the team.",
    profiles: [
      { id: "masarang", name: "Mount Masarang, Tomohon", program: "conservation", body: "325 ha reforested, with more than 100 tree species; also serves as a pre-release site for rescued yaki." },
      { id: "springs", name: "Protected Springs, Tomohon", program: "conservation", body: "Five protected springs providing clean water to around 20,000 people." },
      { id: "temboan", name: "Temboan, Minahasa", program: "restoration", body: "736 ha under conservation and more than 70 ha restored, with 4 km of coastline." },
      { id: "pulisan", name: "Pulisan", program: "conservation", body: "65 ha of agroforestry featuring sugar palms and fruit trees; also home to around 100 crested macaques." },
      { id: "kayuwatu", name: "Kayuwatu & Mahembang", program: "restoration", body: "More than 10 ha under restoration." },
      { id: "boltim", name: "Bolaang Mongondow Timur (Boltim)", program: "conservation", body: "Protected forest [area to be provided by Billy & Brando].", ph: true },
      { id: "tasikoki", name: "Tasikoki Wildlife Centre, North Minahasa", program: "conservation", body: "Established in 2004, the centre focuses on wildlife rescue and rehabilitation, with around 400 animals currently under its care." },
      { id: "tulap", name: "Tulap, Minahasa", program: "conservation", body: "A 14 ha sea turtle nesting area where five species of sea turtles nest. Around 20,000 hatchlings are released each year." },
      { id: "salimburung", name: "Salimburung Island", program: "conservation", associated: true, body: "A 6 ha island reserve managed under a 25-year agreement." },
      { id: "lahendong", name: "Palm Sugar Factory, Lahendong", program: "livelihood", associated: true, body: "Geothermal-powered palm sugar production facility operating since 2006." },
      { id: "titik", name: "Titik Tumbuh, Tomohon", program: "education", body: "Home to Masarang Foundation's headquarters, the Walanda Library, and the Woloan Amphitheater." },
    ],
  },
  partners: {
    title: "Our Partners",
    subheader: "Working together for people and nature.",
    lede: "Protecting nature and empowering communities require collaboration. We work with organizations, institutions, and companies that share our commitment to strengthening our programs, exchanging knowledge, and creating meaningful opportunities for collective action. Select a logo or name to visit the partner's website.",
    networkTitle: "Our Network",
    partnersTitle: "Partners",
    closing: "Interested in working together? Discover how you can become part of our work.",
    cta: "Become a Partner",
  },
  team: {
    title: "Our Team",
    lede: "The people who answer for the foundation.",
    bodies: {
      supervisors: "Supervisors",
      oversight: "Oversight Board",
      board: "Executive Board",
      deputy: "Deputy",
    },
    cta: "See the full team",
  },
  account: {
    title: "How we hold ourselves to account",
    cta: "Open the transparency page",
  },
};

const id: typeof en = {
  meta: {
    title: "Tentang Kami",
    description:
      "Yayasan Masarang menghubungkan pelestarian alam dengan pemberdayaan masyarakat lokal di Sulawesi Utara. Kenali pendiri, kisah, pendekatan, lokasi, dan mitra kami.",
  },
  hero: {
    title: "Tentang Kami",
    lede: "Siapa kami, di mana kami bekerja, dan dengan siapa kami berkolaborasi.",
  },
  overview: {
    title: "Lima pintu masuk",
    lede: "Mulai dari mana saja. Tiap halaman menceritakan satu bagian kisah Masarang.",
    open: "Baca selengkapnya",
    cards: {
      founder: { title: "Pendiri Kami", body: "Tiga dekade memulihkan hutan melalui pemberdayaan masyarakat yang hidup berdampingan dengannya." },
      story: { title: "Kisah Kami", body: "Dari satu gunung menjadi gerakan di Sulawesi Utara." },
      vision: { title: "Visi & Pendekatan", body: "Melestarikan Alam melalui Pemberdayaan Masyarakat Lokal." },
      sites: { title: "Lokasi Kami", body: "Tempat di mana upaya kami berakar dan bertumbuh." },
      partners: { title: "Mitra Kami", body: "Bekerja bersama untuk manusia dan alam." },
    },
  },
  founder: {
    title: "Pendiri Kami",
    subheader: "Tiga dekade memulihkan hutan melalui pemberdayaan masyarakat yang hidup berdampingan dengannya.",
    name: "Dr. Willie Smits",
    role: "Pendiri & Perintis Konservasi",
    bio: [
      "Dr. Willie Smits adalah ahli kehutanan, mikrobiolog, konservasionis, dan wirausahawan sosial berkebangsaan Indonesia-Belanda yang telah mengabdikan lebih dari tiga dekade untuk melindungi keanekaragaman hayati dan memulihkan ekosistem tropis.",
      "Perjalanannya dimulai di Kalimantan Timur, ketika ia menyaksikan secara langsung dampak deforestasi. Pada tahun 1991, ia mendirikan Borneo Orangutan Survival (BOS) Foundation. Melalui Samboja Lestari, ia menunjukkan bahwa padang alang-alang yang terdegradasi dapat pulih dan berkembang menjadi hutan tropis. Pada tahun 2001, ia mendirikan Yayasan Masarang di Sulawesi Utara dengan menempatkan masyarakat lokal sebagai bagian utama dalam upaya konservasi.",
    ],
    recognitionTitle: "Penghargaan",
    recognition: [
      "PhD, Wageningen University [bidang studi akan dikonfirmasi]",
      "Ashoka Fellow, 2009",
      "Bambi Award, 2017/2018, dan penghargaan lainnya [ditambahkan setelah diverifikasi]",
    ],
    photoLabel: "Foto Dr. Willie Smits akan ditambahkan",
    video: "Video: Aping",
  },
  story: {
    title: "Kisah Kami",
    subheader: "Dari satu gunung menjadi gerakan di Sulawesi Utara.",
    paragraphs: [
      "Masarang berawal pada tahun 2001 dari sebuah gagasan sederhana: pulihkan hutan di Gunung Masarang, maka air akan kembali. Dan hal itu terbukti. Reboisasi di lereng Gunung Masarang yang berada di atas Kota Tomohon membantu mengurangi banjir di desa-desa di bawahnya serta memulihkan mata air yang telah mengering selama puluhan tahun. Kini, lima mata air yang dilindungi menyediakan akses air bersih secara gratis bagi sekitar 20.000 warga.",
      "Seiring dengan pulihnya hutan, cakupan pekerjaan kami pun berkembang. Upaya restorasi meluas dari Gunung Masarang ke Pulisan, kemudian ke Temboan pada tahun 2015. Pada tahun 2004, kami mendirikan Pusat Penyelamatan Satwa Tasikoki untuk menyelamatkan dan merehabilitasi satwa yang terdampak perdagangan satwa liar ilegal. Pada tahun 2026, pusat ini melakukan rebranding menjadi Tasikoki Wildlife Centre, dengan fokus khusus pada rehabilitasi dan perawatan satwa endemik Sulawesi. Pada tahun 2006, kami juga mendirikan pabrik gula aren bertenaga panas bumi di Lahendong, yang membuka peluang penghasilan berkelanjutan bagi petani aren lokal sekaligus mendukung upaya menjaga kelestarian hutan.",
      "Seiring dengan perkembangan tersebut, edukasi juga menjadi bagian penting dari perjalanan kami, mulai dari pendirian Perpustakaan Walanda dan Amfiteater Woloan hingga kerja sama dengan Institut Teknologi Minaesa. Pada tahun 2026, amfiteater tersebut berkembang menjadi Titik Tumbuh, sebuah ruang bagi masyarakat untuk saling terhubung, belajar tentang alam, dan terlibat dalam upaya melindunginya.",
      "Dua puluh lima tahun berlalu, gagasan awal kami tetap sama: ketika masyarakat lokal berdaya, alam memiliki kesempatan untuk pulih dan berkembang.",
    ],
    recognitionTitle: "Penghargaan",
    recognition: "Finalis BBC World Challenge (2007) · Sidhakarya Award · Paramakarya Award (2017, bersama Pertamina)",
  },
  vision: {
    title: "Visi & Pendekatan",
    subheader: "Melestarikan Alam melalui Pemberdayaan Masyarakat Lokal.",
    ourVision: {
      title: "Visi Kami",
      body: "Manusia dan alam merupakan bagian dari masa depan yang sama. Upaya pelestarian alam akan berkelanjutan ketika masyarakat lokal memiliki pengetahuan, kesempatan, dan rasa memiliki untuk menjaga lingkungan di sekitarnya.",
    },
    why: {
      title: "Mengapa Kami Melakukannya",
      body: "Sulawesi Utara berada di kawasan Wallacea, salah satu wilayah dengan keunikan alam yang luar biasa di dunia. Kawasan ini merupakan habitat bagi yaki (monyet hitam Sulawesi), tarsius, dan musang Sulawesi yang sulit dijumpai. Pantai-pantainya juga menjadi tempat bertelur bagi lima jenis penyu. Deforestasi, perdagangan satwa liar ilegal, dan pemanfaatan lahan yang tidak berkelanjutan mengancam kekayaan alam ini, sekaligus masyarakat yang bergantung pada kelestarian hutan, sumber air, dan ekosistem pesisir.",
    },
    how: {
      title: "Cara Kami Bekerja",
      pillars: [
        {
          id: "nature",
          title: "Melindungi Alam & Memulihkan Ekosistem",
          body: "Kami melindungi hutan, memulihkan lahan yang terdegradasi, dan merehabilitasi satwa yang diselamatkan.",
        },
        {
          id: "people",
          title: "Memberdayakan Masyarakat & Meningkatkan Kesejahteraan",
          body: "Kami bekerja bersama masyarakat, memperkuat kapasitas lokal, serta menghargai pengetahuan dan budaya setempat.",
        },
        {
          id: "agriculture",
          title: "Pertanian & Penghidupan Berkelanjutan",
          body: "Melalui agroforestri, produksi gula aren, dan praktik pengelolaan yang ramah lingkungan, kami menciptakan peluang mata pencaharian sekaligus mengurangi tekanan terhadap hutan.",
        },
      ],
      closing: "Perubahan yang berkelanjutan terwujud ketika masyarakat berdaya dan mampu berperan aktif dalam menjaga alam.",
    },
    programs: {
      lead: "Pilar-pilar ini dijalankan lewat tiga program:",
      restoration: "Restorasi",
      conservation: "Konservasi",
      education: "Edukasi",
    },
  },
  sites: {
    title: "Lokasi Kami",
    subheader: "Tempat di mana upaya kami berakar dan bertumbuh.",
    lede: "Dari hutan pegunungan hingga pantai tempat penyu bertelur, setiap lokasi memiliki peran tersendiri dalam mendukung upaya restorasi, konservasi, dan edukasi kami.",
    mapTitle: "Sulawesi Utara",
    mapNote: "Pin menandai wilayah umum tiap lokasi, bukan posisi tepat.",
    mapLabel: "Peta Sulawesi Utara dengan lokasi-lokasi Masarang",
    profilesTitle: "Profil lokasi",
    associated: "Lokasi terkait",
    programTag: { restoration: "Restorasi", conservation: "Konservasi", education: "Edukasi", livelihood: "Mata pencaharian" },
    seeProgram: "Lihat programnya",
    sources: "Data bersumber dari Masarang Pocket Book. Data Temboan telah dikonfirmasi oleh tim.",
    profiles: [
      { id: "masarang", name: "Gunung Masarang, Tomohon", program: "conservation", body: "325 ha telah direforestasi dengan lebih dari 100 jenis pohon; juga menjadi lokasi pra-pelepasliaran yaki yang diselamatkan." },
      { id: "springs", name: "Mata Air yang Dilindungi, Tomohon", program: "conservation", body: "Lima mata air yang dilindungi dan menyediakan air bersih bagi sekitar 20.000 warga." },
      { id: "temboan", name: "Temboan, Minahasa", program: "restoration", body: "Sebanyak 736 ha berada dalam kawasan konservasi dan lebih dari 70 ha telah direstorasi, dengan panjang garis pantai mencapai 4 km." },
      { id: "pulisan", name: "Pulisan", program: "conservation", body: "Kawasan agroforestri seluas 65 ha yang ditanami pohon aren dan berbagai jenis pohon buah; juga merupakan habitat bagi sekitar 100 ekor yaki." },
      { id: "kayuwatu", name: "Kayuwatu & Mahembang", program: "restoration", body: "Lebih dari 10 ha lahan dalam proses restorasi." },
      { id: "boltim", name: "Bolaang Mongondow Timur (Boltim)", program: "conservation", body: "Kawasan hutan lindung [luas area akan dilengkapi oleh Billy & Brando].", ph: true },
      { id: "tasikoki", name: "Tasikoki Wildlife Centre, Minahasa Utara", program: "conservation", body: "Didirikan pada tahun 2004, pusat ini berfokus pada penyelamatan dan rehabilitasi satwa, dengan sekitar 400 satwa yang saat ini berada dalam perawatan." },
      { id: "tulap", name: "Tulap, Minahasa", program: "conservation", body: "Kawasan pantai peneluran penyu seluas 14 ha, tempat lima jenis penyu bertelur. Sekitar 20.000 tukik dilepasliarkan setiap tahun." },
      { id: "salimburung", name: "Pulau Salimburung", program: "conservation", associated: true, body: "Kawasan konservasi pulau seluas 6 ha yang dikelola berdasarkan perjanjian kerja sama selama 25 tahun." },
      { id: "lahendong", name: "Pabrik Gula Aren, Lahendong", program: "livelihood", associated: true, body: "Fasilitas produksi gula aren yang menggunakan energi panas bumi dan telah beroperasi sejak tahun 2006." },
      { id: "titik", name: "Titik Tumbuh, Tomohon", program: "education", body: "Lokasi kantor pusat Yayasan Masarang, Perpustakaan Walanda, dan Amfiteater Woloan." },
    ],
  },
  partners: {
    title: "Mitra Kami",
    subheader: "Bekerja bersama untuk manusia dan alam.",
    lede: "Melindungi alam dan memberdayakan masyarakat membutuhkan kolaborasi. Kami bekerja bersama berbagai organisasi, institusi, dan perusahaan yang memiliki komitmen serupa untuk memperkuat program, berbagi pengetahuan, dan menciptakan peluang kolaborasi yang bermakna. Pilih logo atau nama untuk mengunjungi situs mitra.",
    networkTitle: "Jaringan Kami",
    partnersTitle: "Mitra",
    closing: "Tertarik untuk berkolaborasi? Temukan berbagai cara untuk menjadi bagian dari upaya kami.",
    cta: "Jadi Mitra",
  },
  team: {
    title: "Tim Kami",
    lede: "Orang-orang yang bertanggung jawab atas yayasan.",
    bodies: {
      supervisors: "Pembina",
      oversight: "Pengawas",
      board: "Pengurus",
      deputy: "Deputi",
    },
    cta: "Lihat tim lengkap",
  },
  account: {
    title: "Cara kami bertanggung jawab",
    cta: "Buka halaman transparansi",
  },
};

export const about: Record<Locale, typeof en> = cmsText("about", { en, id });
export const aboutCopy = about;
