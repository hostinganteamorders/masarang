import "server-only";
import { defaults } from "./apply";
import "@/data/reports";
import "@/data/organisation";
import "@/data/team";
import "@/data/updates";
import "@/data/animals";

/**
 * Daftar data yang boleh diubah admin (laporan, mitra, tim, ...). Setiap daftar punya skema isian;
 * server hanya menerima isian yang ada di skema, jadi admin tidak bisa menyisipkan kunci lain.
 */
export type FieldType = "text" | "long" | "number" | "select" | "url" | "bool" | "pdf" | "image" | "month";

export type FieldDef = {
  /** Jalur titik di dalam butir, mis. `breakdown.restoration`. */
  key: string;
  label: string;
  type: FieldType;
  /** Disimpan sebagai { en, id }. */
  l10n?: boolean;
  options?: { value: string; label: string }[];
  /** Pilihan berupa angka (mis. triwulan). */
  numeric?: boolean;
  /** Angka boleh kosong (disimpan null). */
  nullable?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  help?: string;
  /** Isian ini hanya tampil bila isian lain bernilai tertentu. */
  showIf?: { key: string; value: string };
};

export type CollectionDef = {
  id: string;
  /** Kunci di `overrides.lists`. */
  listName: string;
  title: string;
  intro: string;
  fields: FieldDef[];
  /** Isian (kunci) yang dipakai sebagai judul butir di daftar; untuk L10n dipakai bahasa Indonesia. */
  titleKey: string;
  /** Nama butir baru. */
  addLabel: string;
  /** Butir kosong untuk tombol Tambah. */
  blank: () => Record<string, unknown>;
  maxItems: number;
  /** Urutkan otomatis saat disimpan. */
  sortBy?: (a: Record<string, unknown>, b: Record<string, unknown>) => number;
  /** Dasar nama untuk id butir baru. */
  idFrom: (item: Record<string, unknown>) => string;
  /** Id diisi admin sendiri (mis. nomor register) dan harus cocok dengan pola ini. */
  idRegex?: RegExp;
  /** Teks kecil di samping judul butir di daftar (kunci isian), mis. nomor register. */
  subKey?: string;
  /** Rapikan butir sesudah diperiksa (mis. satwa yang dilepas tidak lagi disponsori). */
  normalize?: (item: Record<string, unknown>) => void;
};

const l = (en = "", id = "") => ({ en, id });
const get = (o: Record<string, unknown>, path: string): unknown => path.split(".").reduce<unknown>((n, k) => (n && typeof n === "object" ? (n as Record<string, unknown>)[k] : undefined), o);
const str = (v: unknown) => (typeof v === "string" ? v : "");

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

const thisYear = new Date().getFullYear();

export const COLLECTIONS: CollectionDef[] = [
  {
    id: "reports",
    listName: "reports",
    title: "Laporan triwulan",
    intro: "Kartu di halaman Transparansi. Terbaru otomatis di atas. Tombol unduh baru muncul setelah berkas PDF diisi.",
    titleKey: "title",
    addLabel: "Tambah laporan",
    maxItems: 40,
    blank: () => ({ year: thisYear, quarter: 1, title: l(), summary: l(), breakdown: { restoration: l(), conservation: l(), education: l() }, pdf: "", ph: false }),
    sortBy: (a, b) => Number(b.year) - Number(a.year) || Number(b.quarter) - Number(a.quarter),
    idFrom: (i) => `${i.year}-q${i.quarter}`,
    fields: [
      { key: "year", label: "Tahun", type: "number", min: 2000, max: 2100, required: true },
      { key: "quarter", label: "Triwulan", type: "select", numeric: true, required: true, options: [1, 2, 3, 4].map((n) => ({ value: String(n), label: `Triwulan ${n}` })) },
      { key: "title", label: "Judul", type: "text", l10n: true, required: true },
      { key: "summary", label: "Ringkasan (2–3 kalimat)", type: "long", l10n: true, required: true },
      { key: "breakdown.restoration", label: "Rincian restorasi", type: "long", l10n: true, required: true },
      { key: "breakdown.conservation", label: "Rincian konservasi", type: "long", l10n: true, required: true },
      { key: "breakdown.education", label: "Rincian edukasi", type: "long", l10n: true, required: true },
      { key: "pdf", label: "Berkas laporan (PDF)", type: "pdf", help: "Unggah PDF (maks. 3,5 MB) atau tempel alamat https:// (mis. dari Google Drive)." },
      { key: "ph", label: "Masih contoh (teks bergaris titik-titik)", type: "bool" },
    ],
  },
  {
    id: "partners",
    listName: "partners",
    title: "Mitra",
    intro: "Kotak logo mitra di Beranda dan halaman Transparansi. Urutan di sini = urutan tampil.",
    titleKey: "name",
    addLabel: "Tambah mitra",
    maxItems: 40,
    blank: () => ({ name: "", role: l(), url: "", logo: "" }),
    idFrom: (i) => slug(str(i.name)) || "mitra",
    fields: [
      { key: "name", label: "Nama mitra", type: "text", required: true, max: 120 },
      { key: "role", label: "Peran mitra", type: "text", l10n: true, required: true },
      { key: "url", label: "Alamat situs mitra", type: "url", help: "Kosong = kotak tidak jadi tautan." },
      { key: "logo", label: "Logo (PNG atau JPEG)", type: "image", help: "Latar transparan lebih baik (PNG). Kosong = kotak bertuliskan nama mitra." },
    ],
  },
  {
    id: "team",
    listName: "team",
    title: "Tim dan tata kelola",
    intro: "Halaman Tim: pengurus dan penanggung jawab program. Anggota kelompok Tata kelola juga tampil di bagan tata kelola.",
    titleKey: "name",
    addLabel: "Tambah anggota",
    maxItems: 60,
    blank: () => ({ group: "programs", name: l(), role: l(), duty: l(), bio: l(), photo: "", namePh: false, bioPh: false }),
    idFrom: (i) => slug(str(get(i, "name.en")) || str(get(i, "role.en"))) || "anggota",
    fields: [
      { key: "group", label: "Kelompok", type: "select", required: true, options: [{ value: "governance", label: "Tata kelola (Pembina, Pengurus, Pengawas, Deputi)" }, { value: "programs", label: "Penanggung jawab program" }] },
      { key: "body", label: "Organ yayasan", type: "select", showIf: { key: "group", value: "governance" }, options: [{ value: "supervisors", label: "Pembina" }, { value: "board", label: "Pengurus" }, { value: "oversight", label: "Pengawas" }, { value: "deputy", label: "Deputi" }] },
      { key: "name", label: "Nama", type: "text", l10n: true, required: true },
      { key: "role", label: "Jabatan", type: "text", l10n: true, required: true },
      { key: "duty", label: "Tugas jabatan", type: "long", l10n: true, required: true },
      { key: "bio", label: "Biodata singkat", type: "long", l10n: true, required: true },
      { key: "photo", label: "Foto", type: "image", help: "Foto potret, JPEG. Dikecilkan otomatis." },
      { key: "namePh", label: "Nama masih contoh", type: "bool" },
      { key: "bioPh", label: "Biodata masih contoh", type: "bool" },
    ],
  },
  {
    id: "updates",
    listName: "updates",
    title: "Kabar lapangan",
    intro: "Halaman Kabar. Terbaru otomatis di atas.",
    titleKey: "title",
    addLabel: "Tambah kabar",
    maxItems: 100,
    blank: () => ({ date: new Date().toISOString().slice(0, 7), site: "temboan", title: l(), body: l(), evidence: l(), ph: false }),
    sortBy: (a, b) => str(b.date).localeCompare(str(a.date)),
    idFrom: (i) => `${str(i.date)}-${slug(str(get(i, "title.en")))}`.slice(0, 60),
    fields: [
      { key: "date", label: "Bulan (tttt-bb, mis. 2026-09)", type: "month", required: true },
      { key: "site", label: "Lokasi", type: "select", required: true, options: [{ value: "temboan", label: "Temboan (restorasi)" }, { value: "tasikoki", label: "Tasikoki (konservasi)" }] },
      { key: "title", label: "Judul", type: "text", l10n: true, required: true },
      { key: "body", label: "Isi kabar", type: "long", l10n: true, required: true },
      { key: "evidence", label: "Bukti pendukung", type: "text", l10n: true, required: true, help: "Dokumen atau data yang bisa diminta pengunjung." },
      { key: "ph", label: "Masih contoh", type: "bool" },
    ],
  },
  {
    id: "documents",
    listName: "documents",
    title: "Dokumen publik",
    intro: "Daftar dokumen di halaman Transparansi. Status \"diminta\" berarti pengunjung dapat memintanya lewat email.",
    titleKey: "title",
    addLabel: "Tambah dokumen",
    maxItems: 60,
    blank: () => ({ title: l(), type: "legal", year: null, status: "preparing" }),
    idFrom: (i) => slug(str(get(i, "title.en"))) || "dokumen",
    fields: [
      { key: "title", label: "Judul", type: "text", l10n: true, required: true },
      { key: "type", label: "Jenis", type: "select", required: true, options: [{ value: "legal", label: "Hukum" }, { value: "report", label: "Laporan" }, { value: "finance", label: "Keuangan" }, { value: "procedure", label: "Prosedur" }, { value: "method", label: "Metode" }] },
      { key: "year", label: "Tahun (boleh kosong)", type: "number", nullable: true, min: 1990, max: 2100 },
      { key: "status", label: "Status", type: "select", required: true, options: [{ value: "request", label: "Tersedia atas permintaan" }, { value: "preparing", label: "Sedang disiapkan" }] },
    ],
  },
  {
    id: "giving",
    listName: "giving",
    title: "Pilihan dukungan",
    intro: "Kartu \"Cara mendukung\" di halaman Dukungan. Jumlah dalam rupiah.",
    titleKey: "title",
    addLabel: "Tambah pilihan",
    maxItems: 12,
    blank: () => ({ amount: 0, ph: true, title: l(), body: l() }),
    idFrom: (i) => slug(str(get(i, "title.en"))) || "pilihan",
    fields: [
      { key: "title", label: "Judul", type: "text", l10n: true, required: true },
      { key: "body", label: "Penjelasan", type: "long", l10n: true, required: true },
      { key: "amount", label: "Jumlah (Rp)", type: "number", min: 1000, max: 100_000_000_000, required: true },
      { key: "ph", label: "Angka masih contoh", type: "bool" },
    ],
  },
  {
    id: "animals",
    listName: "animals",
    title: "Register satwa (Adopsi)",
    intro: "Satu baris per satwa di Tasikoki. Angka di halaman Adopsi (dirawat, disponsori, menunggu sponsor, dilepasliarkan) dihitung otomatis dari daftar ini.",
    titleKey: "name",
    subKey: "id",
    addLabel: "Tambah satwa",
    maxItems: 600,
    idRegex: /^[A-Z]{1,4}-\d{1,5}$/,
    blank: () => ({ id: "", name: "", speciesId: "", stage: "quarantine", sponsored: false, since: new Date().toISOString().slice(0, 7), arrival: "seized" }),
    idFrom: () => "ID",
    normalize: (it) => {
      if (it.stage === "released") it.sponsored = false;
    },
    fields: [
      { key: "id", label: "Nomor register (mis. MN-105)", type: "text", required: true, max: 10, help: "Huruf kode spesies, tanda hubung, angka. Nomor ini tampil di kartu satwa dan tidak boleh kembar." },
      { key: "name", label: "Nama satwa", type: "text", required: true, max: 60 },
      { key: "speciesId", label: "Spesies", type: "select", required: true, options: [] },
      { key: "stage", label: "Tahap perawatan", type: "select", required: true, options: [{ value: "quarantine", label: "Karantina" }, { value: "rehab", label: "Rehabilitasi" }, { value: "prerelease", label: "Pra-lepas liar" }, { value: "lifetime", label: "Perawatan seumur hidup" }, { value: "released", label: "Sudah dilepasliarkan" }] },
      { key: "arrival", label: "Cara tiba", type: "select", required: true, options: [{ value: "seized", label: "Sitaan" }, { value: "surrendered", label: "Diserahkan" }, { value: "rescued", label: "Diselamatkan" }] },
      { key: "since", label: "Dirawat sejak (tttt-bb)", type: "month", required: true },
      { key: "releasedOn", label: "Bulan dilepasliarkan (tttt-bb)", type: "month", required: true, showIf: { key: "stage", value: "released" } },
      { key: "sponsored", label: "Sudah disponsori", type: "bool", help: "Satwa yang sudah dilepasliarkan tidak dihitung sebagai disponsori." },
    ],
  },
  {
    id: "species",
    listName: "species",
    title: "Spesies (Adopsi)",
    intro: "Nama, status IUCN, dan biaya perawatan per bulan di tabel spesies. Jumlah satwa per spesies dihitung dari Register satwa.",
    titleKey: "name",
    addLabel: "Tambah spesies",
    maxItems: 40,
    blank: () => ({ code: "", group: "birds", name: l(), latin: "", iucn: "LC", carePerMonth: 500000 }),
    idFrom: (i) => slug(str(get(i, "name.en"))) || "spesies",
    fields: [
      { key: "code", label: "Kode register (huruf besar, 1–4 huruf)", type: "text", required: true, max: 4, help: "Awalan nomor register satwa, mis. MN untuk Macaca nigra." },
      { key: "group", label: "Kelompok", type: "select", required: true, options: [{ value: "primates", label: "Primata" }, { value: "mammals", label: "Mamalia" }, { value: "birds", label: "Burung" }, { value: "reptiles", label: "Reptil" }] },
      { key: "name", label: "Nama umum", type: "text", l10n: true, required: true },
      { key: "latin", label: "Nama ilmiah", type: "text", required: true, max: 80 },
      { key: "iucn", label: "Status IUCN", type: "select", required: true, options: [{ value: "CR", label: "CR, kritis" }, { value: "EN", label: "EN, terancam" }, { value: "VU", label: "VU, rentan" }, { value: "LC", label: "LC, risiko rendah" }] },
      { key: "carePerMonth", label: "Biaya perawatan per satwa per bulan (Rp)", type: "number", min: 10000, max: 1_000_000_000, required: true },
    ],
  },
];

export const collection = (id: string) => COLLECTIONS.find((c) => c.id === id);

const MAX_SHORT = 300;
const MAX_LONG = 2000;
const IMG_OK = /^(\/(photos|uploads|partners|brand)\/[\w./-]+|https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+)$/;
const PDF_OK = /^(\/(reports|uploads)\/[\w./-]+|https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+|https:\/\/[^\s"'<>]+)$/;
const URL_OK = /^https?:\/\/[^\s"'<>]+$/;

/** Daftar spesies yang berlaku (draf bila sudah diubah, jika tidak bawaan). */
export function speciesInUse(lists: Record<string, unknown>): { id: string; name: { id: string } }[] {
  const l = lists.species;
  const arr = Array.isArray(l) ? l : (defaults.lists.get("species") as unknown[]) ?? [];
  return (arr as { id: string; name: { id: string } }[]).map((x) => ({ id: x.id, name: x.name }));
}

/** Isian dengan pilihan yang bergantung pada isi draf (spesies untuk satwa). */
export function fieldsFor(c: CollectionDef, lists: Record<string, unknown>): FieldDef[] {
  if (c.id !== "animals") return c.fields;
  const options = speciesInUse(lists).map((sp) => ({ value: sp.id, label: sp.name.id }));
  return c.fields.map((f) => (f.key === "speciesId" ? { ...f, options } : f));
}

/** Isi bawaan sebelum diubah admin (kloning supaya aman diubah). */
export function defaultList(c: CollectionDef): Record<string, unknown>[] {
  return JSON.parse(JSON.stringify(defaults.lists.get(c.listName) ?? []));
}

function setPath(o: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split(".");
  let n = o;
  for (const p of parts.slice(0, -1)) {
    if (typeof n[p] !== "object" || n[p] === null) n[p] = {};
    n = n[p] as Record<string, unknown>;
  }
  n[parts[parts.length - 1]] = value;
}

function cleanText(raw: unknown, f: FieldDef, label: string, long: boolean): string | { error: string } {
  const v = typeof raw === "string" ? raw.trim() : "";
  const max = f.max ?? (long ? MAX_LONG : MAX_SHORT);
  if (f.required && !v) return { error: `${label} wajib diisi.` };
  if (v.length > max) return { error: `${label} terlalu panjang (maks. ${max} karakter).` };
  return v;
}

/** Periksa dan bersihkan seluruh daftar dari editor. Mengembalikan daftar bersih atau daftar pesan galat. */
export function cleanList(c: CollectionDef, raw: unknown, fields: FieldDef[] = c.fields): { items: Record<string, unknown>[] } | { errors: string[] } {
  if (!Array.isArray(raw)) return { errors: ["Data daftar tidak valid."] };
  if (raw.length > c.maxItems) return { errors: [`Terlalu banyak butir (maks. ${c.maxItems}).`] };
  const errors: string[] = [];
  const items: Record<string, unknown>[] = [];
  raw.forEach((r, idx) => {
    if (typeof r !== "object" || r === null) return void errors.push(`Butir ${idx + 1}: data tidak valid.`);
    const src = r as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    const name = `Butir ${idx + 1}`;
    for (const f of fields) {
      if (c.idRegex && f.key === "id") continue;
      const label = `${name}, ${f.label}`;
      if (f.showIf && str(get(out, f.showIf.key)) !== f.showIf.value) continue;
      const value = get(src, f.key);
      if (f.l10n) {
        const o = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
        const pair: Record<string, string> = {};
        for (const lang of ["en", "id"] as const) {
          const t = cleanText(o[lang], f, `${label} (${lang === "en" ? "Inggris" : "Indonesia"})`, f.type === "long");
          if (typeof t === "object") errors.push(t.error);
          else pair[lang] = t;
        }
        setPath(out, f.key, pair);
        continue;
      }
      switch (f.type) {
        case "text":
        case "long": {
          const t = cleanText(value, f, label, f.type === "long");
          if (typeof t === "object") errors.push(t.error);
          else setPath(out, f.key, t);
          break;
        }
        case "month": {
          const t = str(value).trim();
          if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(t)) errors.push(`${label}: tulis seperti 2026-09.`);
          else setPath(out, f.key, t);
          break;
        }
        case "number": {
          if ((value === "" || value === null || value === undefined) && f.nullable) {
            setPath(out, f.key, null);
            break;
          }
          const n = typeof value === "number" ? value : Number(String(value).trim());
          if (value === "" || value === null || value === undefined || !Number.isFinite(n)) errors.push(`${label}: harus berupa angka.`);
          else if ((f.min !== undefined && n < f.min) || (f.max !== undefined && n > f.max)) errors.push(`${label}: di luar batas (${f.min ?? ""}–${f.max ?? ""}).`);
          else setPath(out, f.key, n);
          break;
        }
        case "select": {
          const t = String(value ?? "");
          const opt = f.options?.find((o) => o.value === t);
          if (!opt) {
            if (f.required) errors.push(`${label}: pilih salah satu.`);
          } else setPath(out, f.key, f.numeric ? Number(t) : t);
          break;
        }
        case "bool":
          setPath(out, f.key, value === true);
          break;
        case "url":
        case "pdf":
        case "image": {
          const t = str(value).trim();
          if (!t) break;
          const ok = f.type === "url" ? URL_OK : f.type === "pdf" ? PDF_OK : IMG_OK;
          if (!ok.test(t) || t.length > 600) errors.push(`${label}: alamat tidak valid${f.type === "url" ? " (harus diawali https://)" : ""}.`);
          else setPath(out, f.key, t);
          break;
        }
      }
    }
    // Id: pertahankan yang sudah ada (halaman lain memakainya), buat untuk butir baru.
    const given = str(src.id).trim();
    if (c.idRegex) {
      if (!c.idRegex.test(given)) errors.push(`${name}, nomor register tidak valid (contoh: MN-105).`);
      out.id = given;
    } else out.id = /^[a-z0-9][a-z0-9-]{0,59}$/.test(given) ? given : "";
    c.normalize?.(out);
    items.push(out);
  });
  if (errors.length) return { errors };
  if (c.id === "animals" && items.length < 1) return { errors: ["Register tidak boleh kosong."] };
  const seen = new Set<string>();
  for (const it of items) {
    let id = str(it.id);
    if (!id) {
      const base = slug(c.idFrom(it)) || c.id;
      id = base;
      for (let n = 2; seen.has(id) || items.some((o) => o !== it && o.id === id); n++) id = `${base}-${n}`;
    }
    if (seen.has(id)) return { errors: [`Ada dua butir dengan ${c.idRegex ? "nomor register" : "id"} yang sama (${id}).`] };
    seen.add(id);
    it.id = id;
  }
  if (c.sortBy) items.sort(c.sortBy);
  return { items };
}

/** Daftar tata kelola diturunkan dari anggota tim kelompok tata kelola, supaya keduanya selalu sama. */
export function governanceFromTeam(team: Record<string, unknown>[]) {
  return team
    .filter((m) => m.group === "governance")
    .map((m) => ({ id: m.id, body: str(m.body) || "board", role: m.role, name: m.name, ...(m.namePh ? { ph: true } : {}) }));
}
