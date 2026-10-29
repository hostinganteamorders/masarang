import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "About",
    description:
      "Yayasan Masarang restores degraded land and cares for rescued wildlife in North Sulawesi, and publishes the proof.",
  },
  hero: {
    title: "We restore land and care for wildlife. We publish the proof.",
    lede: "Yayasan Masarang is a foundation based in Tomohon, North Sulawesi. It runs two sites, Temboan and Tasikoki, and reports on both the same way.",
  },
  work: {
    title: "What we do",
    land: {
      title: "Restore land",
      body: "At Temboan we replant degraded land with mixed agroforestry and count what survives.",
      cta: "See Temboan",
    },
    wildlife: {
      title: "Care for wildlife",
      body: "At Tasikoki we take in seized animals, rehabilitate them and release those that can go home.",
      cta: "See Tasikoki",
    },
    proof: {
      title: "Show our work",
      body: "Quarterly figures, named evidence and audited accounts are published here for anyone to check.",
      cta: "Open transparency",
    },
  },
  story: {
    title: "Why Masarang exists",
    paragraphs: [
      "[Founding story. Say when and why the foundation began and what problem it set out to solve.]",
      "[How the work grew from there: the first site, the first rescued animal, the first partner.]",
      "[Where the foundation is heading over the next five years.]",
    ],
  },
  letter: {
    title: "A note from the Chair",
    body: "[Write 120 to 200 words in the Chair's own voice: why the work matters, what went well in 2025, what is not finished yet, and how supporters can help.]",
    signature: "Chair, Executive Board",
  },
  now: { title: "Where we are today" },
  account: {
    title: "How we hold ourselves to account",
    lede: "Three rules shape how we handle money and report on the work. The full accounts, the documents and the people accountable for them are on the Transparency page.",
    cta: "Open the transparency page",
  },
};

const id: typeof en = {
  meta: {
    title: "Tentang kami",
    description:
      "Yayasan Masarang memulihkan lahan kritis dan merawat satwa sitaan di Sulawesi Utara, dan menerbitkan buktinya.",
  },
  hero: {
    title: "Kami memulihkan lahan dan merawat satwa. Kami menerbitkan buktinya.",
    lede: "Yayasan Masarang adalah yayasan yang berpusat di Tomohon, Sulawesi Utara. Yayasan ini mengelola dua lokasi, Temboan dan Tasikoki, dan melaporkan keduanya dengan cara yang sama.",
  },
  work: {
    title: "Apa yang kami kerjakan",
    land: {
      title: "Memulihkan lahan",
      body: "Di Temboan kami menanami kembali lahan kritis dengan agroforestri campuran dan menghitung berapa yang bertahan hidup.",
      cta: "Lihat Temboan",
    },
    wildlife: {
      title: "Merawat satwa",
      body: "Di Tasikoki kami menerima satwa sitaan, merehabilitasinya, dan melepasliarkan yang dapat pulang.",
      cta: "Lihat Tasikoki",
    },
    proof: {
      title: "Menunjukkan kerja kami",
      body: "Angka triwulanan, bukti yang disebutkan namanya, dan laporan keuangan teraudit diterbitkan di sini agar siapa pun dapat memeriksanya.",
      cta: "Buka transparansi",
    },
  },
  story: {
    title: "Mengapa Masarang ada",
    paragraphs: [
      "[Kisah pendirian. Sebutkan kapan dan mengapa yayasan ini dimulai, dan masalah apa yang ingin diselesaikan.]",
      "[Bagaimana kerja ini tumbuh: lokasi pertama, satwa pertama yang diselamatkan, mitra pertama.]",
      "[Arah yayasan dalam lima tahun ke depan.]",
    ],
  },
  letter: {
    title: "Catatan dari Ketua",
    body: "[Tulis 120–200 kata dengan suara Ketua sendiri: mengapa pekerjaan ini penting, apa yang berjalan baik pada 2025, apa yang belum selesai, dan bagaimana pendukung dapat membantu.]",
    signature: "Ketua Pengurus",
  },
  now: { title: "Di mana kami berada sekarang" },
  account: {
    title: "Cara kami bertanggung jawab",
    lede: "Tiga aturan membentuk cara kami mengelola dana dan melaporkan pekerjaan. Laporan keuangan lengkap, dokumen, dan orang-orang yang bertanggung jawab ada di halaman Transparansi.",
    cta: "Buka halaman transparansi",
  },
};

export const about: Record<Locale, typeof en> = { en, id };
