import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Team",
    description: "The bodies that govern Yayasan Masarang and the people who run each program area.",
  },
  hero: {
    title: "The people behind the numbers",
    lede: "A foundation is accountable through its people. These are the three bodies that govern Masarang and the leads who run each program area.",
  },
  governance: {
    title: "Governance",
    lede: "Indonesian foundation law requires three bodies: Supervisors, an Executive Board and an Oversight Board.",
  },
  programs: {
    title: "Program areas",
    lede: "The people who run the work day to day.",
  },
  card: { photoLabel: "Photo to be added", open: "Open {name}, {role}" },
  dialog: { close: "Close", duty: "What this role does", bio: "Background" },
};

const id: typeof en = {
  meta: {
    title: "Tim",
    description:
      "Badan yang mengatur Yayasan Masarang dan orang-orang yang menjalankan setiap bidang program.",
  },
  hero: {
    title: "Orang-orang di balik angka",
    lede: "Sebuah yayasan bertanggung jawab melalui orang-orangnya. Inilah tiga badan yang mengatur Masarang dan para penanggung jawab setiap bidang program.",
  },
  governance: {
    title: "Tata kelola",
    lede: "Hukum yayasan di Indonesia mewajibkan tiga badan: Pembina, Pengurus, dan Pengawas.",
  },
  programs: {
    title: "Bidang program",
    lede: "Orang-orang yang menjalankan pekerjaan sehari-hari.",
  },
  card: { photoLabel: "Foto akan ditambahkan", open: "Buka {name}, {role}" },
  dialog: { close: "Tutup", duty: "Tugas jabatan ini", bio: "Latar belakang" },
};

export const teamCopy: Record<Locale, typeof en> = { en, id };
