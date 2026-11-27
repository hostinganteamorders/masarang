import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

/**
 * Pesan email siap pakai (dokumen "Email Pre-filled Messages", Nov 2026). Pengunjung mengisi bagian [berkurung]
 * lalu mengirim. Versi EN dipakai di halaman Inggris dan ID di halaman Indonesia. Baris baru = enter.
 */
const en = {
  contact: {
    subject: "Hello Masarang Foundation",
    body: "Hi Masarang Foundation,\n\nMy name is [your name] from [city, country]. I would like to know more about [topic].\n\n[Your message]\n\nThank you,\n[Your name]",
  },
  volunteer: {
    subject: "Volunteer inquiry – [your name]",
    body: "Hi Masarang team,\n\nMy name is [your name] from [country]. I would like to volunteer with Masarang in [Tasikoki Wildlife Centre / Restoration / Education], from [start date] to [end date].\n\nA little about me: [background and skills].\n\nI have attached my CV and motivation letter.\n\nThank you,\n[Your name]",
  },
  partner: {
    subject: "Partnership inquiry – [organisation]",
    body: "Hi Masarang Foundation,\n\nMy name is [your name], [position] at [organisation]. We are interested in working with Masarang on [restoration / conservation / education / other].\n\n[Short description of your organisation and idea]\n\nCould we schedule a call to discuss this further?\n\nBest regards,\n[Your name] · [phone number]",
  },
  donation: {
    subject: "Donation confirmation – [your name]",
    body: "Hi Masarang Foundation,\n\nI have made a donation of Rp [amount] on [date] for [Restoration / Conservation / Education / where it is most needed].\n\nI have attached the proof of transfer.\n\nThank you,\n[Your name]",
  },
  adopt: {
    subject: "Adopt an animal – [animal or category]",
    body: "Hi Masarang team,\n\nI would like to adopt [animal or category] at Tasikoki Wildlife Centre with the [package name] package.\n\nPlease let me know the next steps.\n\nThank you,\n[Your name] · [country]",
  },
  visit: {
    subject: "Visit request – [school or group name]",
    body: "Hi Masarang team,\n\nI am [your name] from [school or group name]. We would like to visit [Titik Tumbuh / Tasikoki Wildlife Centre / restoration site] on [preferred date] with about [number] people.\n\n[Purpose of the visit or activity you are interested in]\n\nThank you,\n[Your name] · [phone number]",
  },
  newsletter: {
    subject: "Subscribe to Masarang updates",
    body: "Hi Masarang Foundation,\n\nPlease add me to your mailing list for field stories and the Quarterly Report.\n\nName: [your name]\nEmail: {email}",
  },
};

const id: typeof en = {
  contact: {
    subject: "Halo Yayasan Masarang",
    body: "Halo Yayasan Masarang,\n\nSaya [nama Anda] dari [kota]. Saya ingin bertanya tentang [topik].\n\n[Pesan Anda]\n\nTerima kasih,\n[Nama Anda]",
  },
  volunteer: {
    subject: "Pendaftaran relawan – [nama Anda]",
    body: "Halo tim Masarang,\n\nSaya [nama Anda] dari [kota/negara]. Saya ingin menjadi relawan di [Tasikoki Wildlife Centre / Restorasi / Edukasi] pada [tanggal mulai] sampai [tanggal selesai].\n\nSedikit tentang saya: [latar belakang dan keahlian].\n\nSaya lampirkan CV dan motivation letter saya.\n\nTerima kasih,\n[Nama Anda]",
  },
  partner: {
    subject: "Permohonan kerja sama – [nama lembaga]",
    body: "Halo Yayasan Masarang,\n\nSaya [nama Anda], [jabatan] di [nama lembaga]. Kami tertarik bekerja sama dengan Masarang dalam bidang [restorasi / konservasi / edukasi / lainnya].\n\n[Gambaran singkat lembaga dan ide kerja sama]\n\nApakah kita bisa menjadwalkan diskusi lebih lanjut?\n\nSalam,\n[Nama Anda] · [nomor telepon]",
  },
  donation: {
    subject: "Konfirmasi donasi – [nama Anda]",
    body: "Halo Yayasan Masarang,\n\nSaya telah berdonasi sebesar Rp [jumlah] pada [tanggal] untuk program [Restorasi / Konservasi / Edukasi / yang paling membutuhkan].\n\nBukti transfer saya lampirkan.\n\nTerima kasih,\n[Nama Anda]",
  },
  adopt: {
    subject: "Adopsi satwa – [nama satwa atau kategori]",
    body: "Halo tim Masarang,\n\nSaya ingin mengadopsi [nama satwa atau kategori] di Tasikoki Wildlife Centre dengan paket [nama paket].\n\nMohon informasi langkah selanjutnya.\n\nTerima kasih,\n[Nama Anda] · [kota]",
  },
  visit: {
    subject: "Permohonan kunjungan – [nama sekolah atau rombongan]",
    body: "Halo tim Masarang,\n\nSaya [nama Anda] dari [nama sekolah atau rombongan]. Kami ingin berkunjung ke [Titik Tumbuh / Tasikoki Wildlife Centre / lokasi restorasi] pada [tanggal] dengan sekitar [jumlah] orang.\n\n[Tujuan kunjungan atau kegiatan yang diminati]\n\nTerima kasih,\n[Nama Anda] · [nomor telepon]",
  },
  newsletter: {
    subject: "Berlangganan kabar Masarang",
    body: "Halo Yayasan Masarang,\n\nMohon daftarkan saya untuk menerima cerita lapangan dan Laporan Triwulan.\n\nNama: [nama Anda]\nEmail: {email}",
  },
};

export type MailKey = keyof typeof en;
export const mailCopy: Record<Locale, typeof en> = cmsText("mail", { en, id });
