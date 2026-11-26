import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

/** Halaman Tentang Kami. Teks berkurung siku "[…]" adalah penanda tempat. */
const en = {
  meta: {
    title: "About Us",
    description:
      "Yayasan Masarang restores degraded land, cares for rescued wildlife and runs education programs in North Sulawesi, and publishes the proof.",
  },
  hero: {
    title: "We restore land, protect wildlife and teach. We publish the proof.",
    lede: "Yayasan Masarang is a foundation based in Tomohon, North Sulawesi. Meet our founder and read how Masarang began.",
  },
  founder: {
    title: "Our Founder",
    name: "Dr. Willie Smits",
    role: "Founder & Conservation Pioneer",
    bio: [
      "Dr. Willie Smits is an Indonesian-Dutch forestry engineer, microbiologist, conservationist and social entrepreneur who has dedicated more than three decades to protecting biodiversity and restoring tropical ecosystems.",
      "His work began in East Kalimantan, where he witnessed firsthand the devastating impact of deforestation and habitat destruction. This inspired him to develop solutions that connect forest conservation with sustainable livelihoods and community empowerment.",
      "In 1991, he founded the Borneo Orangutan Survival (BOS) Foundation, which grew into one of the world's largest organizations dedicated to orangutan conservation. He later established the Masarang Foundation, pioneering an approach that puts local communities at the heart of nature conservation.",
      "One of his most remarkable achievements is Samboja Lestari in East Kalimantan, where degraded alang-alang grassland was transformed into a thriving tropical forest, demonstrating that even severely damaged landscapes can recover.",
      "With a PhD in Tropical Forestry and Soil Science from Wageningen University, Dr. Smits has received international recognition for his contributions to conservation and social entrepreneurship, including an Ashoka Fellowship in 2010.",
      "Today, his work continues to advance large-scale forest restoration, sustainable resource management and innovative solutions that demonstrate how people and nature can thrive together.",
    ],
    photoLabel: "Photo of Dr. Willie Smits to be added",
    history: {
      title: "The history of Masarang",
      paragraphs: [
        "[Founding story. Say when and why the foundation began and what problem it set out to solve.]",
        "[How the work grew from there: the first site, the first rescued animal, the first partner.]",
        "[Where the foundation is heading over the next five years.]",
      ],
    },
    video: "Video: Aping",
  },
  vision: {
    title: "Our Vision",
    statement: "We preserve nature by empowering people.",
    more: [
      "We don't see people and nature as opposing forces. We see them as **part of the same future**.",
      "Real conservation happens when local communities have the **knowledge, opportunities and ownership** to protect the natural world around them.",
      "That's the change we want to create. Not just for today, but for **generations to come**.",
    ],
  },
  what: {
    title: "What We Do & Why We Do It",
    lede: "A future where people and nature thrive together.",
    intro: [
      "We believe that protecting nature starts with empowering people.",
      "Indonesia is one of the most biodiverse countries on Earth, home to extraordinary forests, wildlife and ecosystems found nowhere else. From orangutans and Sumatran tigers to thousands of unique plant species, this natural heritage is irreplaceable. Yet, deforestation, habitat destruction and unsustainable resource use continue to threaten it.",
      "The consequences go far beyond the loss of wildlife. Forest destruction contributes to climate change, threatens freshwater supplies, increases the risk of floods and undermines the livelihoods of communities who depend on nature.",
      "At Masarang, we don't believe conservation should come at the expense of human development. We believe the two must go hand in hand.",
      "Our work focuses on three interconnected pillars:",
    ],
    pillars: [
      {
        id: "nature",
        title: "Protecting Nature & Restoring Ecosystems",
        body: [
          "We protect existing forests, restore degraded landscapes and safeguard endangered wildlife. Through reforestation, habitat restoration and wildlife rehabilitation, we work to bring ecosystems back to life and protect the biodiversity that makes Indonesia so unique.",
          "But restoration is about more than planting trees. It is about rebuilding healthy, functioning ecosystems that can sustain life for generations to come.",
        ],
      },
      {
        id: "people",
        title: "Empowering People & Improving Well-being",
        body: [
          "Conservation cannot succeed if local communities are left behind.",
          "We work alongside local communities to create meaningful livelihood opportunities, improve access to education and strengthen local capacity. By supporting indigenous knowledge, culture and community-led initiatives, we aim to build a future where people have greater opportunities without having to sacrifice the natural environment around them.",
          "Because thriving communities are essential to thriving ecosystems.",
        ],
      },
      {
        id: "agriculture",
        title: "Building Sustainable Agriculture & Livelihoods",
        body: [
          "People depend on nature, but the way we produce food and use natural resources matters.",
          "We promote sustainable agriculture, agroforestry and innovative production methods that work with nature rather than against it. By creating economic value from responsibly managed natural resources, we help communities improve their livelihoods while reducing pressure on forests and ecosystems.",
          "We also believe education is key to lasting change. Through awareness, knowledge-sharing and hands-on participation, we encourage people to become active stewards of their natural environment.",
        ],
      },
    ],
    programs: {
      lead: "These pillars are carried out through three programs:",
      restoration: "Restoration",
      conservation: "Conservation",
      education: "Education",
    },
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
  partners: {
    title: "Our Partners",
    lede: "The institutions we work with, from funders to government bodies. Select a logo or name to visit the partner's website.",
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
      "Yayasan Masarang memulihkan lahan kritis, merawat satwa sitaan, dan menjalankan program edukasi di Sulawesi Utara, dan menerbitkan buktinya.",
  },
  hero: {
    title: "Kami memulihkan lahan, melindungi satwa, dan mengajar. Kami menerbitkan buktinya.",
    lede: "Yayasan Masarang adalah yayasan yang berpusat di Tomohon, Sulawesi Utara. Kenali pendiri kami dan baca bagaimana Masarang bermula.",
  },
  founder: {
    title: "Pendiri Kami",
    name: "Dr. Willie Smits",
    role: "Pendiri & Perintis Konservasi",
    bio: [
      "Dr. Willie Smits adalah insinyur kehutanan, ahli mikrobiologi, konservasionis, dan wirausahawan sosial berkebangsaan Indonesia-Belanda yang lebih dari tiga dekade mengabdikan diri untuk melindungi keanekaragaman hayati dan memulihkan ekosistem tropis.",
      "Karyanya dimulai di Kalimantan Timur, tempat ia menyaksikan langsung dampak buruk deforestasi dan kerusakan habitat. Hal ini mendorongnya mengembangkan solusi yang menghubungkan pelestarian hutan dengan mata pencaharian yang berkelanjutan dan pemberdayaan masyarakat.",
      "Pada 1991, ia mendirikan Yayasan Borneo Orangutan Survival (BOS) yang tumbuh menjadi salah satu organisasi terbesar di dunia yang berfokus pada pelestarian orangutan. Kemudian ia mendirikan Yayasan Masarang, yang memelopori pendekatan yang menempatkan masyarakat lokal di jantung pelestarian alam.",
      "Salah satu pencapaiannya yang paling luar biasa adalah Samboja Lestari di Kalimantan Timur, tempat padang alang-alang yang rusak diubah menjadi hutan tropis yang subur, membuktikan bahwa lanskap yang rusak parah pun dapat pulih.",
      "Bergelar PhD di bidang Kehutanan Tropis dan Ilmu Tanah dari Universitas Wageningen, Dr. Smits menerima pengakuan internasional atas kontribusinya bagi konservasi dan kewirausahaan sosial, termasuk Ashoka Fellowship pada 2010.",
      "Kini, karyanya terus memajukan restorasi hutan berskala besar, pengelolaan sumber daya yang berkelanjutan, dan solusi inovatif yang menunjukkan bahwa manusia dan alam dapat tumbuh bersama.",
    ],
    photoLabel: "Foto Dr. Willie Smits akan ditambahkan",
    history: {
      title: "Sejarah Masarang",
      paragraphs: [
        "[Kisah pendirian. Sebutkan kapan dan mengapa yayasan ini dimulai, dan masalah apa yang ingin diselesaikan.]",
        "[Bagaimana kerja ini tumbuh: lokasi pertama, satwa pertama yang diselamatkan, mitra pertama.]",
        "[Arah yayasan dalam lima tahun ke depan.]",
      ],
    },
    video: "Video: Aping",
  },
  vision: {
    title: "Visi Kami",
    statement: "Kami melestarikan alam dengan memberdayakan manusia.",
    more: [
      "Kami tidak memandang manusia dan alam sebagai dua kekuatan yang berlawanan. Kami melihat keduanya sebagai **bagian dari masa depan yang sama**.",
      "Konservasi sejati terjadi ketika masyarakat lokal memiliki **pengetahuan, kesempatan, dan rasa memiliki** untuk melindungi alam di sekitar mereka.",
      "Itulah perubahan yang ingin kami wujudkan. Bukan hanya untuk hari ini, tetapi untuk **generasi mendatang**.",
    ],
  },
  what: {
    title: "Apa yang Kami Kerjakan dan Mengapa",
    lede: "Masa depan tempat manusia dan alam tumbuh bersama.",
    intro: [
      "Kami percaya bahwa melindungi alam dimulai dengan memberdayakan manusia.",
      "Indonesia adalah salah satu negara dengan keanekaragaman hayati terkaya di Bumi, rumah bagi hutan, satwa, dan ekosistem luar biasa yang tidak ditemukan di tempat lain. Dari orangutan dan harimau Sumatra hingga ribuan spesies tumbuhan unik, warisan alam ini tidak tergantikan. Namun deforestasi, perusakan habitat, dan pemanfaatan sumber daya yang tidak berkelanjutan terus mengancamnya.",
      "Dampaknya jauh melampaui hilangnya satwa. Kerusakan hutan memperburuk perubahan iklim, mengancam pasokan air tawar, meningkatkan risiko banjir, dan merusak mata pencaharian masyarakat yang bergantung pada alam.",
      "Di Masarang, kami tidak percaya konservasi harus mengorbankan pembangunan manusia. Kami percaya keduanya harus berjalan beriringan.",
      "Pekerjaan kami berfokus pada tiga pilar yang saling terhubung:",
    ],
    pillars: [
      {
        id: "nature",
        title: "Melindungi Alam & Memulihkan Ekosistem",
        body: [
          "Kami melindungi hutan yang masih ada, memulihkan lanskap yang rusak, dan menjaga satwa terancam punah. Melalui penghijauan, pemulihan habitat, dan rehabilitasi satwa, kami berupaya menghidupkan kembali ekosistem dan melindungi keanekaragaman hayati yang membuat Indonesia begitu istimewa.",
          "Namun restorasi lebih dari sekadar menanam pohon. Restorasi berarti membangun kembali ekosistem yang sehat dan berfungsi, yang dapat menopang kehidupan bagi generasi mendatang.",
        ],
      },
      {
        id: "people",
        title: "Memberdayakan Masyarakat & Meningkatkan Kesejahteraan",
        body: [
          "Konservasi tidak akan berhasil jika masyarakat lokal tertinggal.",
          "Kami bekerja berdampingan dengan masyarakat lokal untuk menciptakan peluang mata pencaharian yang bermakna, memperluas akses pendidikan, dan memperkuat kapasitas lokal. Dengan mendukung pengetahuan adat, budaya, dan inisiatif yang digerakkan masyarakat, kami ingin membangun masa depan yang memberi manusia lebih banyak peluang tanpa harus mengorbankan lingkungan alam di sekitarnya.",
          "Karena masyarakat yang sejahtera adalah syarat bagi ekosistem yang sehat.",
        ],
      },
      {
        id: "agriculture",
        title: "Membangun Pertanian & Mata Pencaharian yang Berkelanjutan",
        body: [
          "Manusia bergantung pada alam, tetapi cara kita memproduksi pangan dan memanfaatkan sumber daya alam sangat menentukan.",
          "Kami mendorong pertanian berkelanjutan, agroforestri, dan metode produksi inovatif yang bekerja bersama alam, bukan melawannya. Dengan menciptakan nilai ekonomi dari sumber daya alam yang dikelola secara bertanggung jawab, kami membantu masyarakat meningkatkan mata pencaharian sekaligus mengurangi tekanan pada hutan dan ekosistem.",
          "Kami juga percaya pendidikan adalah kunci perubahan yang bertahan lama. Melalui kesadaran, berbagi pengetahuan, dan partisipasi langsung, kami mendorong orang menjadi penjaga aktif lingkungan alam mereka.",
        ],
      },
    ],
    programs: {
      lead: "Pilar-pilar ini dijalankan lewat tiga program:",
      restoration: "Restorasi",
      conservation: "Konservasi",
      education: "Edukasi",
    },
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
  partners: {
    title: "Mitra Kami",
    lede: "Institusi yang bekerja bersama kami, dari lembaga pendana hingga instansi pemerintah. Pilih logo atau nama untuk mengunjungi situs mitra.",
  },
  account: {
    title: "Cara kami bertanggung jawab",
    cta: "Buka halaman transparansi",
  },
};

export const about: Record<Locale, typeof en> = cmsText("about", { en, id });
export const aboutCopy = about;
