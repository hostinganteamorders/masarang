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
    lede: "Yayasan Masarang is a foundation based in Tomohon, North Sulawesi. This page introduces our founder, our vision, our team and the partners we work with.",
  },
  founder: {
    title: "Our Founder",
    name: "Willie",
    nameNote: "[Full name and title]",
    role: "Founder of Masarang",
    bio: [
      "[Profile: who Willie is, his background and why he started Masarang.]",
      "[What he works on today.]",
    ],
    photoLabel: "Photo of Willie to be added",
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
    body: "[One or two sentences in the foundation's own words: the world Masarang is working toward.]",
  },
  what: {
    title: "What we do, and why we do it",
    lede: "Three programs, one way of reporting.",
    why: {
      title: "Why we do it",
      body: "[Say why this work matters in North Sulawesi: what is being lost, who depends on it and what changes when it is restored.]",
    },
    restoration: {
      title: "Restoration",
      body: "Replanting degraded land around Temboan, Kayuwatu and Mahembang with mixed agroforestry, together with the farmers who live next to it.",
      cta: "See Restoration",
    },
    conservation: {
      title: "Conservation",
      body: "Rehabilitating and releasing seized wildlife at Tasikoki, protecting sea turtles and forest, and keeping the biodiversity data.",
      cta: "See Conservation",
    },
    education: {
      title: "Education",
      body: "Learning programs, a community market, residencies, outreach and volunteering that bring people into the work.",
      cta: "See Education",
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
    lede: "Select a logo or name to visit the partner's website.",
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
    lede: "Yayasan Masarang adalah yayasan yang berpusat di Tomohon, Sulawesi Utara. Halaman ini memperkenalkan pendiri, visi, tim, dan mitra kami.",
  },
  founder: {
    title: "Pendiri Kami",
    name: "Willie",
    nameNote: "[Nama lengkap dan gelar]",
    role: "Pendiri Masarang",
    bio: [
      "[Profil: siapa Willie, latar belakangnya, dan mengapa ia memulai Masarang.]",
      "[Apa yang ia kerjakan sekarang.]",
    ],
    photoLabel: "Foto Willie akan ditambahkan",
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
    body: "[Satu atau dua kalimat dengan kata-kata yayasan sendiri: dunia yang ingin diwujudkan Masarang.]",
  },
  what: {
    title: "Apa yang kami kerjakan, dan mengapa",
    lede: "Tiga program, satu cara pelaporan.",
    why: {
      title: "Mengapa kami mengerjakannya",
      body: "[Jelaskan mengapa pekerjaan ini penting di Sulawesi Utara: apa yang hilang, siapa yang bergantung padanya, dan apa yang berubah ketika dipulihkan.]",
    },
    restoration: {
      title: "Restorasi",
      body: "Menanami kembali lahan kritis di sekitar Temboan, Kayuwatu, dan Mahembang dengan agroforestri campuran, bersama para petani yang tinggal di dekatnya.",
      cta: "Lihat Restorasi",
    },
    conservation: {
      title: "Konservasi",
      body: "Merehabilitasi dan melepasliarkan satwa sitaan di Tasikoki, melindungi penyu dan hutan, serta menyimpan data keanekaragaman hayati.",
      cta: "Lihat Konservasi",
    },
    education: {
      title: "Edukasi",
      body: "Program belajar, pasar masyarakat, residensi, penjangkauan, dan kerja relawan yang mengajak orang terlibat dalam pekerjaan ini.",
      cta: "Lihat Edukasi",
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
    lede: "Pilih logo atau nama untuk mengunjungi situs mitra.",
  },
  account: {
    title: "Cara kami bertanggung jawab",
    cta: "Buka halaman transparansi",
  },
};

export const about: Record<Locale, typeof en> = { en, id };
export const aboutCopy = about;
