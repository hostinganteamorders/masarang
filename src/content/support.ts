import { cmsText } from "@/cms/apply";
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
    body: "Pick an animal category and give from {amount} a month. Its ambassador animal speaks for every animal in that group.",
    cta: "See the animals",
  },
  bank: {
    title: "Give by bank transfer",
    lede: "Transfer to the account below. In the transfer note, write where you want the gift to go: Temboan, Tasikoki, or an animal category.",
    fields: { bank: "Bank", number: "Account number", holder: "Account holder" },
    copy: "Copy account details",
    copied: "Copied",
    copyFailed: "Could not copy. Select the details and copy them by hand.",
    copyText: "Bank: {bank}\nAccount number: {number}\nAccount holder: {holder}",
    tell: {
      title: "Then tell us about your gift",
      body: "A short message lets us match your transfer to the program you chose and report back to you. Send the proof of transfer on WhatsApp, or write to us by email.",
      cta: "Email us about your gift",
      wa: {
        cta: "Send proof of transfer on WhatsApp",
        soon: "WhatsApp number to be added",
        message: "Hello, I have transferred a gift to Yayasan Masarang. Amount: Rp [amount]. For: [Temboan / Tasikoki / animal category]. Name: [your name]. Proof of transfer attached.",
      },
      subject: "My gift to Yayasan Masarang",
      message:
        "Hello, I have made a gift to Yayasan Masarang for: [Temboan / Tasikoki / animal category]",
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
    title: "Dukung kerja kami",
    description:
      "Berdonasi untuk program tertentu, dukung satwa, atau bermitra dengan kami. Kami melaporkan apa yang Anda danai.",
  },
  hero: {
    title: "Danai bagian kerja yang Anda pilih",
    lede: "Sampaikan program pilihan Anda, dan kami akan melaporkan perkembangan program tersebut langsung kepada Anda.",
  },
  ways: { title: "Tentukan ke mana donasi Anda disalurkan" },
  sponsor: {
    title: "Dukung satwa kami",
    body: "Pilih satu kategori satwa dan berikan donasi mulai {amount} per bulan. Satwa dutanya mewakili seluruh satwa dalam kelompok itu.",
    cta: "Lihat satwanya",
  },
  bank: {
    title: "Donasi lewat transfer bank",
    lede: "Transfer ke rekening di bawah. Pada catatan transfer, tulis ke mana donasi Anda diarahkan: Temboan, Tasikoki, atau kategori satwa.",
    fields: { bank: "Bank", number: "Nomor rekening", holder: "Atas nama" },
    copy: "Salin rincian rekening",
    copied: "Tersalin",
    copyFailed: "Tidak dapat menyalin. Blok rinciannya dan salin secara manual.",
    copyText: "Bank: {bank}\nNomor rekening: {number}\nAtas nama: {holder}",
    tell: {
      title: "Lalu kabari kami tentang donasi Anda",
      body: "Pesan singkat membantu kami mencocokkan transfer Anda dengan program pilihan Anda, lalu melaporkannya kepada Anda. Kirim bukti transfer lewat WhatsApp, atau tulis kepada kami lewat email.",
      cta: "Kirim email tentang donasi Anda",
      wa: {
        cta: "Kirim bukti transfer lewat WhatsApp",
        soon: "Nomor WhatsApp menyusul",
        message: "Halo, saya telah mentransfer donasi untuk Yayasan Masarang. Jumlah: Rp [jumlah]. Untuk: [Temboan / Tasikoki / kategori satwa]. Nama: [nama Anda]. Bukti transfer terlampir.",
      },
      subject: "Donasi saya untuk Yayasan Masarang",
      message:
        "Halo, saya telah berdonasi untuk Yayasan Masarang dengan tujuan: [Temboan / Tasikoki / kategori satwa]",
    },
  },
  partners: {
    title: "Perusahaan dan pemberi hibah",
    body: "Kami menyusun anggaran biaya penuh untuk setiap program dan melaporkannya setiap triwulan. Tulis kepada kami untuk membicarakan kemitraan.",
    cta: "Mulai percakapan",
    subject: "Kemitraan dengan Yayasan Masarang",
  },
  back: {
    title: "Yang Anda dapatkan",
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
        title: "Bukti yang bisa diperiksa",
        body: "Setiap kabar lapangan menyebutkan buktinya. Minta, dan kami akan menunjukkannya kepada Anda.",
      },
    ],
    cta: "Lihat laporan keuangan",
  },
};

export const supportCopy: Record<Locale, typeof en> = cmsText("support", { en, id });
