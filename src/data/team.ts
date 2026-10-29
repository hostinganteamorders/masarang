import type { L10n } from "@/lib/i18n";
import { governance } from "./organisation";
import { photos } from "./photos";

export type TeamGroup = "governance" | "programs";

export type Member = {
  id: string;
  group: TeamGroup;
  name: L10n;
  role: L10n;
  /** Tugas jabatan, satu atau dua kalimat. */
  duty: L10n;
  /** Biodata singkat. */
  bio: L10n;
  /** Foto, mis. /photos/team/aulia.jpg (taruh berkas di public/photos/team). */
  photo?: string;
  /** true = nama masih contoh. */
  namePh?: boolean;
  /** true = biodata masih contoh. */
  bioPh?: boolean;
};

const BIO_PH: L10n = {
  en: "[Short biography: background, years with Masarang and what this person works on.]",
  id: "[Biodata singkat: latar belakang, lama bergabung dengan Masarang, dan apa yang dikerjakan.]",
};

const NAME_PH: L10n = { en: "[Name]", id: "[Nama]" };

const duties: Record<string, L10n> = {
  supervisors: {
    en: "The foundation's highest body under Indonesian foundation law. Appoints the Executive Board and approves the annual plan and budget.",
    id: "Organ tertinggi yayasan menurut hukum Indonesia. Mengangkat Pengurus serta mengesahkan rencana dan anggaran tahunan.",
  },
  chair: {
    en: "Leads the Executive Board and is accountable for the foundation's programs and reports.",
    id: "Memimpin Pengurus dan bertanggung jawab atas program dan laporan yayasan.",
  },
  treasurer: {
    en: "Keeps the accounts, prepares the quarterly figures published on this site and works with the auditor.",
    id: "Memegang pembukuan, menyiapkan angka triwulanan yang diterbitkan di situs ini, dan bekerja sama dengan auditor.",
  },
  oversight: {
    en: "Checks that the Executive Board follows the statutes and the approved plan.",
    id: "Memeriksa bahwa Pengurus menjalankan anggaran dasar dan rencana yang telah disetujui.",
  },
};

const governanceMembers: Member[] = governance.map((g) => ({
  id: g.id,
  group: "governance",
  name: g.name,
  role: g.role,
  duty: duties[g.id],
  bio: BIO_PH,
  namePh: g.ph,
  bioPh: true,
}));

/** Penanggung jawab bidang program. Nama dan biodata masih contoh; ganti dengan orang yang sebenarnya. */
const programMembers: Member[] = [
  {
    id: "temboan-lead",
    group: "programs",
    name: NAME_PH,
    role: { en: "Temboan site manager", id: "Manajer lokasi Temboan" },
    duty: {
      en: "Runs restoration, the coconut and clove gardens and the agreements with the three villages.",
      id: "Mengelola restorasi, kebun kelapa dan cengkih, serta kesepakatan dengan tiga desa.",
    },
    bio: BIO_PH,
    namePh: true,
    bioPh: true,
  },
  {
    id: "tasikoki-lead",
    group: "programs",
    name: NAME_PH,
    role: { en: "Tasikoki centre manager", id: "Manajer pusat Tasikoki" },
    duty: {
      en: "Runs animal care, releases and the centre's programs for schools.",
      id: "Mengelola perawatan satwa, pelepasliaran, dan program sekolah di pusat.",
    },
    bio: BIO_PH,
    namePh: true,
    bioPh: true,
  },
  {
    id: "vet",
    group: "programs",
    name: NAME_PH,
    role: { en: "Head veterinarian", id: "Dokter hewan kepala" },
    duty: {
      en: "Leads health checks, quarantine and the decision on when an animal is ready for release.",
      id: "Memimpin pemeriksaan kesehatan, karantina, dan keputusan kapan satwa siap dilepasliarkan.",
    },
    bio: BIO_PH,
    namePh: true,
    bioPh: true,
  },
  {
    id: "education",
    group: "programs",
    name: NAME_PH,
    role: { en: "Education and community lead", id: "Penanggung jawab edukasi dan masyarakat" },
    duty: {
      en: "Runs school visits and the coastal community programs, including the waste pilot.",
      id: "Menjalankan kunjungan sekolah dan program masyarakat pesisir, termasuk pilot sampah.",
    },
    bio: BIO_PH,
    namePh: true,
    bioPh: true,
  },
  {
    id: "monitoring",
    group: "programs",
    name: NAME_PH,
    role: { en: "Monitoring and reporting lead", id: "Penanggung jawab pemantauan dan pelaporan" },
    duty: {
      en: "Keeps the monitoring sheets and prepares each quarterly report.",
      id: "Menyimpan lembar pemantauan dan menyiapkan setiap laporan triwulanan.",
    },
    bio: BIO_PH,
    namePh: true,
    bioPh: true,
  },
];

/** Foto diambil dari `src/data/photos.ts` menurut id anggota. */
export const team: Member[] = [...governanceMembers, ...programMembers].map((member) => ({
  ...member,
  photo: photos.portraits[member.id] ?? member.photo,
}));
