import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Support the work",
    description:
      "Give to a specific program, sponsor an animal, or partner with us. We report back on what you funded.",
  },
  hero: {
    title: "Fund a specific piece of the work",
    lede: "Tell us which program your gift is for and we will report on that program to you directly.",
  },
  ways: { title: "Choose what your gift pays for" },
  sponsor: {
    title: "Sponsor an animal",
    body: "Pick one animal from the register and give from {amount} a month, or cover its full monthly cost.",
    cta: "Meet the animals",
  },
  bank: {
    title: "Give by bank transfer",
    lede: "Transfer to the account below. In the transfer note, write where you want the gift to go: Temboan, Tasikoki, or an animal's register number.",
    fields: { bank: "Bank", number: "Account number", holder: "Account holder" },
    copy: "Copy account details",
    copied: "Copied",
    copyFailed: "Could not copy. Select the details and copy them by hand.",
    copyText: "Bank: {bank}\nAccount number: {number}\nAccount holder: {holder}",
    tell: {
      title: "Then tell us about your gift",
      body: "A short email lets us match your transfer to the program you chose and report back to you.",
      cta: "Email us about your gift",
      subject: "My gift to Yayasan Masarang",
      message:
        "Hello, I have made a gift to Yayasan Masarang for: [Temboan / Tasikoki / animal register number]",
    },
  },
  partners: {
    title: "Companies and grant-makers",
    body: "We write a full-cost budget for each program and report against it every quarter. Write to us to talk about a partnership.",
    cta: "Start a conversation",
    subject: "Partnership with Yayasan Masarang",
  },
  back: {
    title: "What you get back",
    items: [
      {
        title: "A direct report",
        body: "We report on the program or animal you chose directly to you.",
      },
      {
        title: "Quarterly figures",
        body: "Figures for every program are published on this site each quarter.",
      },
      {
        title: "Named evidence",
        body: "Each field update names its evidence. Ask and we will show it to you.",
      },
    ],
    cta: "See the accounts",
  },
};

const id: typeof en = {
  meta: {
    title: "Dukung pekerjaan kami",
    description:
      "Beri untuk program tertentu, sponsori satwa, atau bermitra dengan kami. Kami melaporkan apa yang Anda danai.",
  },
  hero: {
    title: "Danai bagian kerja yang spesifik",
    lede: "Sampaikan program pilihan Anda, dan kami akan melaporkan perkembangan program tersebut langsung kepada Anda.",
  },
  ways: { title: "Pilih apa yang dibayar oleh donasi Anda" },
  sponsor: {
    title: "Sponsori satu satwa",
    body: "Pilih satu satwa dari register dan beri mulai {amount} per bulan, atau tanggung biaya penuh bulanannya.",
    cta: "Kenali satwanya",
  },
  bank: {
    title: "Beri lewat transfer bank",
    lede: "Transfer ke rekening di bawah. Pada catatan transfer, tulis ke mana donasi Anda diarahkan: Temboan, Tasikoki, atau nomor register satwa.",
    fields: { bank: "Bank", number: "Nomor rekening", holder: "Atas nama" },
    copy: "Salin rincian rekening",
    copied: "Tersalin",
    copyFailed: "Tidak dapat menyalin. Blok rinciannya dan salin secara manual.",
    copyText: "Bank: {bank}\nNomor rekening: {number}\nAtas nama: {holder}",
    tell: {
      title: "Lalu kabari kami tentang donasi Anda",
      body: "Email singkat membantu kami mencocokkan transfer Anda dengan program pilihan Anda dan melaporkannya kepada Anda.",
      cta: "Kirim email tentang donasi Anda",
      subject: "Donasi saya untuk Yayasan Masarang",
      message:
        "Halo, saya telah berdonasi untuk Yayasan Masarang dengan tujuan: [Temboan / Tasikoki / nomor register satwa]",
    },
  },
  partners: {
    title: "Perusahaan dan pemberi hibah",
    body: "Kami menyusun anggaran biaya penuh untuk setiap program dan melaporkannya setiap triwulan. Tulis kepada kami untuk membicarakan kemitraan.",
    cta: "Mulai percakapan",
    subject: "Kemitraan dengan Yayasan Masarang",
  },
  back: {
    title: "Yang Anda terima kembali",
    items: [
      {
        title: "Laporan langsung",
        body: "Kami melaporkan program atau satwa pilihan Anda langsung kepada Anda.",
      },
      {
        title: "Angka triwulanan",
        body: "Angka setiap program diterbitkan di situs ini tiap triwulan.",
      },
      {
        title: "Bukti yang disebutkan",
        body: "Setiap kabar lapangan menyebutkan buktinya. Minta, dan kami akan menunjukkannya kepada Anda.",
      },
    ],
    cta: "Lihat laporan keuangan",
  },
};

export const supportCopy: Record<Locale, typeof en> = { en, id };
