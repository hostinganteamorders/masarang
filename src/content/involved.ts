import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Get Involved: Volunteer, Partner or Donate",
    description:
      "Take part in conservation in North Sulawesi: adopt an animal, donate, partner with Masarang Foundation or volunteer in restoration, wildlife care and education.",
  },
  hero: {
    title: "Get involved",
    lede: "Conservation works when many people take part. Choose the way that fits you.",
  },
  ways: {
    title: "Four ways to take part",
    adopt: {
      title: "Adopt an animal",
      body: "Sponsor the care of an animal category at Tasikoki and meet its ambassador animal.",
      cta: "See the animals",
    },
    donate: {
      title: "Donate",
      body: "Give to restoration, conservation or education, and tell us where your gift should go.",
      cta: "How to donate",
    },
    partner: {
      title: "Become a partner",
      body: "For institutions, companies, funders and research bodies who want to work with us.",
      cta: "Partner with us",
    },
    volunteer: {
      title: "Volunteer",
      body: "Give your time and skills to restoration, animal care or education.",
      cta: "Volunteer with us",
    },
  },
  partner: {
    meta: {
      title: "Become a Partner of Masarang Foundation",
      description:
        "Institutions, companies, funders and research bodies working with Masarang Foundation to restore forests, protect wildlife and educate communities in North Sulawesi.",
    },
    hero: {
      title: "Become a partner",
      lede: "We work with institutions that share our aim: protecting nature by empowering people.",
    },
    who: {
      title: "Who we work with",
      items: [
        { title: "Funders and foundations", body: "Fund a program or a site. We write a full-cost budget and report against it every quarter." },
        { title: "Companies", body: "Support restoration or animal care, or bring your own expertise to a project." },
        { title: "Universities and research bodies", body: "Research on forests, wildlife and communities, with data that is shared back." },
        { title: "Government and community organisations", body: "Joint work on forest protection, education and local livelihoods." },
      ],
    },
    how: {
      title: "How a partnership starts",
      body: "Write to us with a few lines about your institution and what you have in mind. We reply, talk it through, and agree on scope, budget and reporting together.",
      cta: "Start a conversation",
      subject: "Partnership with Yayasan Masarang",
      message: "Hello, I am writing on behalf of [institution] about a possible partnership.",
    },
  },
  volunteer: {
    meta: {
      title: "Volunteer in Conservation in North Sulawesi",
      description:
        "Volunteer with Masarang Foundation in forest restoration, wildlife care at Tasikoki and environmental education in Tomohon. See how to apply.",
    },
    hero: {
      title: "Volunteer with us",
      lede: "Time and skills help as much as money. Tell us what you can offer and when.",
    },
    areas: {
      title: "Where volunteers help",
      items: [
        { title: "Restoration", body: "Planting and monitoring work with farmers around Temboan." },
        { title: "Conservation", body: "Support for animal care and the work of the team at Tasikoki." },
        { title: "Education", body: "Learning programs, outreach in villages and the community market." },
      ],
    },
    how: {
      title: "How to join",
      body: "Send us a short email: who you are, which area interests you, the dates you are free, and any relevant skills. We will tell you what is possible and what to prepare.",
      cta: "Email us to volunteer",
      subject: "Volunteering with Yayasan Masarang",
      message: "Hello, I would like to volunteer. Area of interest: [restoration / conservation / education]. Available: [dates].",
    },
  },
};

const id: typeof en = {
  meta: {
    title: "Terlibat: Relawan, Mitra, atau Donasi",
    description:
      "Ikut menjaga alam Sulawesi Utara: adopsi satwa, berdonasi, bermitra dengan Yayasan Masarang, atau menjadi relawan di restorasi, perawatan satwa, dan edukasi.",
  },
  hero: {
    title: "Terlibat",
    lede: "Konservasi berhasil ketika banyak orang ikut serta. Pilih cara yang cocok untuk Anda.",
  },
  ways: {
    title: "Empat cara untuk ikut serta",
    adopt: {
      title: "Adopsi satwa",
      body: "Dukung perawatan satu kategori satwa di Tasikoki dan kenali satwa dutanya.",
      cta: "Lihat satwanya",
    },
    donate: {
      title: "Donasi",
      body: "Berikan untuk restorasi, konservasi, atau edukasi, dan beri tahu kami ke mana donasi Anda ditujukan.",
      cta: "Cara berdonasi",
    },
    partner: {
      title: "Jadi mitra",
      body: "Untuk institusi, perusahaan, lembaga pendana, dan lembaga riset yang ingin bekerja bersama kami.",
      cta: "Bermitra dengan kami",
    },
    volunteer: {
      title: "Jadi relawan",
      body: "Sumbangkan waktu dan keahlian Anda untuk restorasi, perawatan satwa, atau edukasi.",
      cta: "Jadi relawan",
    },
  },
  partner: {
    meta: {
      title: "Jadi Mitra Yayasan Masarang",
      description:
        "Institusi, perusahaan, lembaga pendana, dan lembaga riset yang bekerja bersama Yayasan Masarang memulihkan hutan, melindungi satwa, dan mendidik masyarakat di Sulawesi Utara.",
    },
    hero: {
      title: "Jadi mitra",
      lede: "Kami bekerja dengan institusi yang sejalan dengan tujuan kami: melindungi alam dengan memberdayakan manusia.",
    },
    who: {
      title: "Dengan siapa kami bekerja",
      items: [
        { title: "Lembaga pendana dan yayasan", body: "Mendanai satu program atau lokasi. Kami menyusun anggaran biaya penuh dan melaporkannya setiap triwulan." },
        { title: "Perusahaan", body: "Mendukung restorasi atau perawatan satwa, atau membawa keahlian Anda ke sebuah proyek." },
        { title: "Perguruan tinggi dan lembaga riset", body: "Penelitian tentang hutan, satwa liar, dan masyarakat, dengan data yang dibagikan kembali." },
        { title: "Pemerintah dan organisasi masyarakat", body: "Kerja bersama dalam perlindungan hutan, edukasi, dan penghidupan masyarakat setempat." },
      ],
    },
    how: {
      title: "Bagaimana kemitraan dimulai",
      body: "Tulis kepada kami beberapa baris tentang institusi Anda dan gagasan Anda. Kami membalas, membicarakannya, lalu menyepakati lingkup, anggaran, dan pelaporannya bersama.",
      cta: "Mulai percakapan",
      subject: "Kemitraan dengan Yayasan Masarang",
      message: "Halo, saya menulis atas nama [institusi] mengenai kemungkinan kemitraan.",
    },
  },
  volunteer: {
    meta: {
      title: "Jadi Relawan Konservasi di Sulawesi Utara",
      description:
        "Menjadi relawan Yayasan Masarang di restorasi hutan, perawatan satwa di Tasikoki, dan edukasi lingkungan di Tomohon. Cara mendaftar ada di halaman ini.",
    },
    hero: {
      title: "Jadi relawan bersama kami",
      lede: "Waktu dan keahlian membantu sebesar uang. Beri tahu kami apa yang bisa Anda tawarkan dan kapan.",
    },
    areas: {
      title: "Tempat relawan membantu",
      items: [
        { title: "Restorasi", body: "Penanaman dan pemantauan bersama petani di sekitar Temboan." },
        { title: "Konservasi", body: "Dukungan untuk perawatan satwa dan pekerjaan tim di Tasikoki." },
        { title: "Edukasi", body: "Program belajar, penjangkauan ke desa, dan pasar masyarakat." },
      ],
    },
    how: {
      title: "Cara bergabung",
      body: "Kirim email singkat: siapa Anda, bidang yang diminati, tanggal Anda bisa hadir, dan keahlian yang relevan. Kami akan menjelaskan apa yang mungkin dilakukan dan apa yang perlu disiapkan.",
      cta: "Email kami untuk jadi relawan",
      subject: "Relawan di Yayasan Masarang",
      message: "Halo, saya ingin menjadi relawan. Bidang yang diminati: [restorasi / konservasi / edukasi]. Tanggal tersedia: [tanggal].",
    },
  },
};

export const involvedCopy: Record<Locale, typeof en> = cmsText("involved", { en, id });
