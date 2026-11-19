import "server-only";
import { defaults } from "./apply";
import "@/data/media";
import "@/data/site";
import "@/data/programs";
import "@/data/siteviews";

export type ValueField = {
  id: string;
  scope: string;
  path: string;
  label: string;
  /** Judul kelompok kecil di atas isian ini (tampil bila berbeda dari isian sebelumnya). */
  section?: string;
  help?: string;
  kind: "url" | "text" | "bool" | "number";
  /** Kunci lengkap penanda contoh (ph) milik nilai ini; tampil sebagai kotak centang "Masih contoh". */
  clearPh?: string;
};

export type ValueGroup = { id: string; title: string; intro?: string; fields: ValueField[] };

const BASE_GROUPS: ValueGroup[] = [
  {
    id: "media",
    title: "Video & tautan luar",
    intro: "Tempel alamat lengkap (https://…). Kosong = kotak penanda tempat tampil di situs.",
    fields: [
      { id: "aping", scope: "media.apingVideo", path: "url", kind: "url", label: "Video Aping (Beranda dan Tentang Kami)", help: "Alamat YouTube atau Vimeo (biasa maupun embed), atau berkas video .mp4. Video besar sebaiknya diunggah dulu ke YouTube atau Vimeo, lalu alamatnya ditempel di sini." },
      { id: "tms", scope: "media.tms", path: "url", kind: "url", label: "Situs TMS (usaha gula aren petani)" },
      { id: "edutour", scope: "media.edutourCatalog", path: "url", kind: "url", label: "Katalog karya EduTour" },
    ],
  },
  {
    id: "settings",
    title: "Pengaturan situs",
    fields: [
      { id: "draft", scope: "site", path: "draft", kind: "bool", label: "Mode draf", help: "Dicentang: banner draf tampil, penanda contoh bergaris titik-titik, dan mesin pencari diminta tidak mengindeks. Hilangkan centang saat situs siap tayang." },
      { id: "email", scope: "site", path: "email.v", kind: "text", label: "Email yayasan", clearPh: "site.email.ph" },
      { id: "whatsapp", scope: "site", path: "whatsapp.v", kind: "text", label: "Nomor WhatsApp (bukti transfer)", help: "Format internasional tanpa tanda +, mis. 6281234567890. Selama masih contoh, tombol WhatsApp tidak aktif.", clearPh: "site.whatsapp.ph" },
      { id: "svLat", scope: "siteviews.lat", path: "v", kind: "number", label: "Lokasi satelit dan 360°: lintang (mis. 1.0434)", section: "Lokasi tampilan satelit", help: "Titik tengah peta satelit di halaman Restorasi. Lintang utara bernilai positif.", clearPh: "siteviews.lat.ph" },
      { id: "svLon", scope: "siteviews.lon", path: "v", kind: "number", label: "Lokasi satelit dan 360°: bujur (mis. 124.9225)", section: "Lokasi tampilan satelit", clearPh: "siteviews.lon.ph" },
      { id: "svZoom", scope: "siteviews.zoom", path: "v", kind: "number", label: "Zoom awal peta satelit (14–17)", section: "Lokasi tampilan satelit" },
      { id: "bank", scope: "site", path: "bank.bank.v", kind: "text", label: "Nama bank", clearPh: "site.bank.bank.ph" },
      { id: "banknum", scope: "site", path: "bank.number.v", kind: "text", label: "Nomor rekening", clearPh: "site.bank.number.ph" },
      { id: "bankholder", scope: "site", path: "bank.holder.v", kind: "text", label: "Atas nama rekening", clearPh: "site.bank.holder.ph" },
    ],
  },
];

const fact = (scope: string, id: string, section: string, label: string, kind: "number" | "text" = "number", help?: string): ValueField => ({
  id, scope, path: "v", kind, label, section, help, clearPh: `${scope}.ph`,
});
const PH_HELP = "Mengisi angka ini otomatis menghilangkan tanda \"contoh\" (garis titik-titik) pada angka tersebut.";

export const FIGURES_GROUP: ValueGroup = {
  id: "figures",
  title: "Angka program",
  intro: "Angka yang tampil di Beranda dan halaman program. " + PH_HELP + " Kosongkan isian untuk mengembalikan angka awal.",
  fields: [
    fact("programs.restoration.conservationHa", "conservationHa", "Restorasi (Temboan)", "Kawasan konservasi Temboan (ha)"),
    fact("programs.restoration.restoredTemboanHa", "restoredTemboanHa", "Restorasi (Temboan)", "Luas restorasi di Temboan (ha)"),
    fact("programs.restoration.restoredKayuwatuMahembangHa", "restoredOther", "Restorasi (Temboan)", "Luas restorasi di Kayuwatu dan Mahembang (ha)", "number", "Tampil dengan tanda + (mis. 10+)."),
    fact("programs.restoration.farmers", "farmers", "Restorasi (Temboan)", "Jumlah petani yang terlibat"),
    fact("programs.restoration.incomeIncreasePct", "incomePct", "Restorasi (Temboan)", "Kenaikan pendapatan petani (%)"),
    fact("programs.keyFigures.treesPlanted", "treesPlanted", "Restorasi (Temboan)", "Pohon ditanam"),
    fact("programs.keyFigures.survival", "survival", "Restorasi (Temboan)", "Daya hidup pohon (%)"),
    fact("programs.temboanActive", "activeHa", "Restorasi (Temboan)", "Lahan restorasi aktif (ha)"),
    fact("programs.tasikoki.inCare", "inCare", "Konservasi (Tasikoki)", "Satwa dalam perawatan"),
    fact("programs.tasikoki.released", "released", "Konservasi (Tasikoki)", "Satwa dilepasliarkan"),
    fact("programs.tasikoki.translocated", "translocated", "Konservasi (Tasikoki)", "Satwa ditranslokasi", "text"),
    fact("programs.keyFigures.rescued", "rescued", "Konservasi (Tasikoki)", "Satwa diselamatkan (tahun ini)"),
    fact("programs.forestProtection.ha", "forestHa", "Konservasi (Tasikoki)", "Hutan Gunung Masarang yang dilindungi (ha)", "text"),
    fact("programs.tasikoki.students", "students", "Edukasi", "Siswa yang dijangkau"),
    fact("programs.tasikoki.wasteHouseholds", "wasteHouseholds", "Edukasi", "Rumah tangga pilot sampah", "text", "Boleh berupa rentang, mis. 30–40."),
    fact("programs.keyFigures.overhead", "overhead", "Keuangan", "Biaya operasional (% dari anggaran)"),
  ],
};

export const VALUE_GROUPS: ValueGroup[] = [...BASE_GROUPS, FIGURES_GROUP];

export const fieldKey = (f: ValueField) => `${f.scope}.${f.path}`;

/** Nilai bawaan pada satu kunci lengkap ("<berkas>.<jalur>") sebelum perubahan admin; memakai berkas data terpanjang yang cocok. */
export function defaultAt(full: string): string | number | boolean | undefined {
  const scope = [...defaults.values.keys()].filter((k) => full === k || full.startsWith(`${k}.`)).sort((a, b) => b.length - a.length)[0];
  if (!scope) return undefined;
  let node: unknown = defaults.values.get(scope);
  for (const part of full.slice(scope.length + 1).split(".").filter(Boolean)) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" || typeof node === "number" || typeof node === "boolean" ? node : undefined;
}

export const defaultValue = (f: ValueField) => defaultAt(`${f.scope}.${f.path}`);

type Val = string | number | boolean | undefined;

/** Isian untuk formulir admin: nilai sekarang (draf, atau bawaan) dan nilai awal, plus status "contoh" bila ada. */
export function toViews(group: ValueGroup, values: Record<string, unknown>) {
  return group.fields.map((f) => ({
    id: f.id,
    label: f.label,
    help: f.help,
    section: f.section,
    kind: f.kind,
    original: defaultValue(f),
    value: (values[fieldKey(f)] as Val) ?? defaultValue(f),
    ph: f.clearPh ? { value: ((values[f.clearPh] as Val) ?? defaultAt(f.clearPh)) === true, original: defaultAt(f.clearPh) === true } : undefined,
  }));
}
