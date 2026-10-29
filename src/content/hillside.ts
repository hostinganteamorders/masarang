import type { Locale } from "@/lib/i18n";

const en = {
  meta: "Temboan hillside, simulated",
  source: "Based on the planting plan and expected growth",
  title: "Drag to see a hillside come back",
  body: "The left side is degraded alang-alang grassland with a few old coconut palms. The right side shows the same slope after planting pioneers, fruit trees, aren and native forest trees. This is a drawing of what we expect, not a photograph. When the drone survey is done, real photos will replace it in the same slider.",
  compare: "Compare year 0 with",
  yearN: "Year {n}",
  before: "before",
  simulated: "simulated",
  badge: "Simulation",
  sliderLabel: "Drag to compare the hillside at year 0 with year {n}",
  sceneAlt:
    "Drawing of the Temboan hillside. Left of the divider: degraded grassland with a few old coconut palms. Right of the divider: the same slope with planted trees after {n} years.",
  metricsTitle: "Per hectare",
  metrics: {
    canopy: "Canopy cover",
    trees: "Trees per hectare",
    species: "Tree species",
    bare: "Bare, eroding soil",
    carbon: "Carbon stored (t CO₂e per ha)",
  },
  note: "Figures per hectare are targets from the restoration plan, not measurements. Measured values will replace them as monitoring data comes in.",
};

const id: typeof en = {
  meta: "Lereng Temboan, simulasi",
  source: "Berdasarkan rencana penanaman dan perkiraan pertumbuhan",
  title: "Geser untuk melihat lereng bukit pulih",
  body: "Sisi kiri adalah padang alang-alang yang rusak dengan beberapa pohon kelapa tua. Sisi kanan menunjukkan lereng yang sama setelah ditanami pohon perintis, pohon buah, aren, dan pohon hutan asli. Ini gambaran yang kami harapkan, bukan foto. Setelah survei drone selesai, foto asli akan menggantikannya pada slider yang sama.",
  compare: "Bandingkan tahun 0 dengan",
  yearN: "Tahun {n}",
  before: "sebelum",
  simulated: "simulasi",
  badge: "Simulasi",
  sliderLabel: "Geser untuk membandingkan lereng pada tahun 0 dengan tahun {n}",
  sceneAlt:
    "Gambar lereng Temboan. Di kiri garis pembatas: padang rumput yang rusak dengan beberapa pohon kelapa tua. Di kanan garis pembatas: lereng yang sama dengan pohon-pohon yang ditanam setelah {n} tahun.",
  metricsTitle: "Per hektare",
  metrics: {
    canopy: "Tutupan tajuk",
    trees: "Pohon per hektare",
    species: "Jenis pohon",
    bare: "Tanah terbuka yang tererosi",
    carbon: "Karbon tersimpan (t CO₂e per ha)",
  },
  note: "Angka per hektare adalah target dari rencana restorasi, bukan hasil pengukuran. Nilai terukur akan menggantikannya seiring masuknya data pemantauan.",
};

export const hillsideCopy: Record<Locale, typeof en> = { en, id };
