import type { L10n } from "@/lib/i18n";

export type UpdateSite = "temboan" | "tasikoki";

export type FieldUpdate = {
  id: string;
  /** yyyy-mm */
  date: string;
  site: UpdateSite;
  title: L10n;
  body: L10n;
  /** Bukti pendukung; pengunjung dapat memintanya. */
  evidence: L10n;
  /** true = entri contoh yang harus diganti. */
  ph?: boolean;
};

/** Terbaru lebih dulu. */
export const updates: FieldUpdate[] = [
  {
    id: "turtle-baseline",
    date: "2026-09",
    site: "tasikoki",
    title: {
      en: "Sea turtle baseline survey at Desa Tulap",
      id: "Survei awal penyu di Desa Tulap",
    },
    body: {
      en: "First survey of nesting beaches, households and current egg collection in Kecamatan Kombi. Results will set the targets for the school program and the livelihood pilot.",
      id: "Survei pertama terhadap pantai peneluran, rumah tangga, dan pengambilan telur yang masih berlangsung di Kecamatan Kombi. Hasilnya akan menentukan target program sekolah dan pilot mata pencaharian.",
    },
    evidence: {
      en: "Survey report (in preparation)",
      id: "Laporan survei (sedang disusun)",
    },
  },
  {
    id: "coconut-sop",
    date: "2026-07",
    site: "temboan",
    title: { en: "Coconut harvesting SOP agreed", id: "SOP panen kelapa disepakati" },
    body: {
      en: "An 18-page bilingual procedure sets out who may harvest, how income is shared and how harvesters are contracted across the three villages.",
      id: "Prosedur dwibahasa setebal 18 halaman ini mengatur siapa yang boleh memanen, bagaimana pendapatan dibagi, dan bagaimana pemanen dikontrak di ketiga desa.",
    },
    evidence: { en: "SOP document", id: "Dokumen SOP" },
  },
  {
    id: "coconut-count",
    date: "2026-06",
    site: "temboan",
    title: { en: "Every coconut tree counted", id: "Seluruh pohon kelapa dihitung" },
    body: {
      en: "Field teams mapped 5,640 coconut trees: 1,776 in Palamba, 2,023 in Rumbia and 1,841 in Temboan. This is the baseline for the site's income plan.",
      id: "Tim lapangan memetakan 5.640 pohon kelapa: 1.776 di Palamba, 2.023 di Rumbia, dan 1.841 di Temboan. Ini menjadi dasar bagi rencana pendapatan lokasi.",
    },
    evidence: { en: "GPS mapping data", id: "Data pemetaan GPS" },
  },
  {
    id: "release-example",
    date: "2026-03",
    site: "tasikoki",
    ph: true,
    title: {
      en: "[Example] Release of rehabilitated animals",
      id: "[Contoh] Pelepasliaran satwa hasil rehabilitasi",
    },
    body: {
      en: "Placeholder entry. Describe the species, number of animals, release site and the agency (BKSDA) that approved it.",
      id: "Catatan contoh. Jelaskan spesies, jumlah satwa, lokasi pelepasliaran, dan lembaga (BKSDA) yang menyetujuinya.",
    },
    evidence: {
      en: "BKSDA release record, photos",
      id: "Berita acara BKSDA, foto",
    },
  },
];
