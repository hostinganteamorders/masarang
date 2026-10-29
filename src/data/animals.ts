import type { L10n } from "@/lib/i18n";
import { mulberry32, shuffle } from "@/lib/random";

/**
 * Daftar satwa Tasikoki — DATA CONTOH.
 * Dibuat deterministik dari tabel di bawah (jumlah per spesies dan tahap) agar angka
 * pada halaman Adopsi selalu cocok: 109 dirawat, 28 disponsori, 81 menunggu sponsor,
 * ditambah 36 satwa yang dilepasliarkan pada 2025.
 * Ganti dengan data register asli lalu hapus pembangkit di bawah.
 */

export type Group = "primates" | "mammals" | "birds" | "reptiles";
export type Stage = "quarantine" | "rehab" | "prerelease" | "lifetime" | "released";
export type Iucn = "CR" | "EN" | "VU" | "LC";
export type Arrival = "seized" | "surrendered" | "rescued";

export const stageOrder: Stage[] = ["quarantine", "rehab", "prerelease", "lifetime", "released"];
export const groupOrder: Group[] = ["primates", "mammals", "birds", "reptiles"];

export type Species = {
  id: string;
  /** Kode register: huruf pertama genus + epitet. */
  code: string;
  group: Group;
  name: L10n;
  latin: string;
  iucn: Iucn;
  /** Biaya perawatan penuh per satwa per bulan (Rp). */
  carePerMonth: number;
  /** Jumlah per tahap perawatan: karantina, rehabilitasi, pra-lepas liar, seumur hidup. */
  stages: [number, number, number, number];
  /** Dilepasliarkan pada 2025. */
  released: number;
  /** Disponsori (dari yang sedang dirawat). */
  sponsored: number;
};

export const species: Species[] = [
  {
    id: "macaque",
    code: "MN",
    group: "primates",
    name: { en: "Celebes crested macaque", id: "Yaki" },
    latin: "Macaca nigra",
    iucn: "CR",
    carePerMonth: 1_800_000,
    stages: [2, 8, 4, 6],
    released: 3,
    sponsored: 9,
  },
  {
    id: "sunbear",
    code: "HM",
    group: "mammals",
    name: { en: "Sun bear", id: "Beruang madu" },
    latin: "Helarctos malayanus",
    iucn: "VU",
    carePerMonth: 4_500_000,
    stages: [0, 1, 0, 3],
    released: 0,
    sponsored: 3,
  },
  {
    id: "cuscus",
    code: "AU",
    group: "mammals",
    name: { en: "Sulawesi bear cuscus", id: "Kuskus beruang" },
    latin: "Ailurops ursinus",
    iucn: "VU",
    carePerMonth: 1_200_000,
    stages: [1, 3, 2, 1],
    released: 2,
    sponsored: 2,
  },
  {
    id: "hornbill",
    code: "RC",
    group: "birds",
    name: { en: "Knobbed hornbill", id: "Julang Sulawesi" },
    latin: "Rhyticeros cassidix",
    iucn: "VU",
    carePerMonth: 1_000_000,
    stages: [1, 3, 3, 2],
    released: 4,
    sponsored: 0,
  },
  {
    id: "ycockatoo",
    code: "CS",
    group: "birds",
    name: { en: "Yellow-crested cockatoo", id: "Kakatua jambul kuning" },
    latin: "Cacatua sulphurea",
    iucn: "CR",
    carePerMonth: 600_000,
    stages: [3, 7, 4, 6],
    released: 4,
    sponsored: 8,
  },
  {
    id: "scockatoo",
    code: "CM",
    group: "birds",
    name: { en: "Salmon-crested cockatoo", id: "Kakatua Maluku" },
    latin: "Cacatua moluccensis",
    iucn: "VU",
    carePerMonth: 600_000,
    stages: [3, 9, 4, 5],
    released: 6,
    sponsored: 5,
  },
  {
    id: "lory",
    code: "EB",
    group: "birds",
    name: { en: "Red lory", id: "Nuri Maluku" },
    latin: "Eos bornea",
    iucn: "LC",
    carePerMonth: 400_000,
    stages: [3, 15, 6, 0],
    released: 12,
    sponsored: 0,
  },
  {
    id: "turtle",
    code: "CH",
    group: "reptiles",
    name: { en: "Green turtle", id: "Penyu hijau" },
    latin: "Chelonia mydas",
    iucn: "EN",
    carePerMonth: 800_000,
    stages: [1, 3, 0, 0],
    released: 5,
    sponsored: 1,
  },
];

export const speciesById = Object.fromEntries(species.map((s) => [s.id, s])) as Record<
  string,
  Species
>;

export const inCareOf = (s: Species) => s.stages.reduce((a, b) => a + b, 0);

export type Animal = {
  /** Nomor register, mis. MN-105 */
  id: string;
  name: string;
  speciesId: string;
  stage: Stage;
  sponsored: boolean;
  /** Dirawat sejak (yyyy-mm) */
  since: string;
  /** Bulan pelepasliaran 2025 (yyyy-mm), hanya untuk stage "released" */
  releasedOn?: string;
  arrival: Arrival;
};

/* ---------------- Pembangkit deterministik ---------------- */

const NAMES = [
  "Bintang", "Kenari", "Mawar", "Siti", "Rimba", "Sari", "Cempaka", "Melati", "Anggrek", "Kamboja",
  "Teratai", "Seruni", "Kemuning", "Dahlia", "Embun", "Fajar", "Senja", "Pelangi", "Mentari", "Bulan",
  "Awan", "Hujan", "Badai", "Kilat", "Samudra", "Karang", "Ombak", "Tanjung", "Teluk", "Gunung",
  "Bukit", "Lembah", "Sungai", "Danau", "Rani", "Wati", "Tini", "Yanti", "Lina", "Maya",
  "Nia", "Ratna", "Sinta", "Tari", "Uli", "Vina", "Wulan", "Yuli", "Zara", "Agus",
  "Budi", "Candra", "Dodi", "Eko", "Gani", "Hasan", "Indra", "Joko", "Kiki", "Lukas",
  "Mario", "Nando", "Oscar", "Pandu", "Rio", "Sandi", "Toni", "Umar", "Vino", "Wawan",
  "Yoga", "Zaki", "Tumbuh", "Rindu", "Harapan", "Damai", "Cahaya", "Pagi", "Sore", "Malam",
  "Bayu", "Angin", "Laras", "Merpati", "Nuri", "Kasih", "Lestari", "Asri", "Permata", "Intan",
  "Mutiara", "Zamrud", "Safir", "Kristal", "Emas", "Perak", "Tembaga", "Batu", "Karya", "Tegar",
  "Gesit", "Lincah", "Manis", "Mungil", "Ceria", "Riang", "Tenang", "Sabar", "Setia", "Berani",
  "Pintar", "Cerdik", "Jago", "Juara", "Bijak", "Arif", "Adil", "Jujur", "Rukun", "Santun",
  "Ayu", "Eka", "Dwi", "Tri", "Catur", "Panca", "Sapta", "Nanda", "Dian", "Oka",
  "Tomi", "Ujang", "Vera", "Wira", "Yudi", "Tika", "Rika", "Mika", "Lika", "Nika",
  "Boni", "Coki", "Dino", "Edo", "Fino", "Gilang", "Hilmi", "Ical", "Jaya", "Kemal",
];

/** Bulan ke-n sejak 0000-01 -> "yyyy-mm". */
function iso(monthIndex: number): string {
  const y = Math.floor(monthIndex / 12);
  const m = (monthIndex % 12) + 1;
  return `${y}-${String(m).padStart(2, "0")}`;
}

const NOW = 2026 * 12 + 8; // Sep 2026
const DEWI_ID = "MN-105";

function build(): Animal[] {
  const rand = mulberry32(20260930);
  const names = shuffle(NAMES, rand);
  let nameCursor = 0;
  const nextName = () => names[nameCursor++ % names.length];
  const between = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1));
  const pickArrival = (): Arrival => {
    const r = rand();
    return r < 0.6 ? "seized" : r < 0.85 ? "surrendered" : "rescued";
  };

  const out: Animal[] = [];

  for (const sp of species) {
    const inCareStages: Stage[] = [];
    (["quarantine", "rehab", "prerelease", "lifetime"] as const).forEach((stage, i) => {
      for (let n = 0; n < sp.stages[i]; n++) inCareStages.push(stage);
    });
    const all: Stage[] = [...inCareStages, ...Array<Stage>(sp.released).fill("released")];

    // Nomor register: urutan acak per spesies. Dewi (MN-105) tetap.
    const total = all.length;
    const pool: number[] = [];
    for (let n = 100; n <= 100 + total; n++) {
      if (`${sp.code}-${n}` !== DEWI_ID) pool.push(n);
    }
    const numbers = shuffle(pool, rand).slice(0, total);

    // Siapa yang disponsori (hanya yang sedang dirawat, bukan Dewi).
    let dewiAssigned = false;
    const eligible = shuffle(
      inCareStages.map((_, idx) => idx),
      rand,
    );
    const sponsoredSet = new Set<number>();

    // Pilih Dewi: makaka pertama di tahap rehabilitasi.
    let dewiIndex = -1;
    if (sp.id === "macaque") dewiIndex = inCareStages.indexOf("rehab");
    for (const idx of eligible) {
      if (sponsoredSet.size >= sp.sponsored) break;
      if (idx === dewiIndex) continue;
      sponsoredSet.add(idx);
    }

    all.forEach((stage, idx) => {
      const isDewi = idx === dewiIndex && !dewiAssigned;
      if (isDewi) dewiAssigned = true;
      const id = isDewi ? DEWI_ID : `${sp.code}-${numbers.shift()}`;
      const name = isDewi ? "Dewi" : nextName();

      let since: string;
      let releasedOn: string | undefined;
      if (isDewi) {
        since = "2025-07";
      } else if (stage === "quarantine") {
        since = iso(NOW - between(0, 2));
      } else if (stage === "rehab") {
        since = iso(NOW - between(3, 15));
      } else if (stage === "prerelease") {
        since = iso(NOW - between(6, 20));
      } else if (stage === "lifetime") {
        since = iso(NOW - between(15, 70));
      } else {
        const releaseMonth = 2025 * 12 + between(1, 11); // Feb–Des 2025
        releasedOn = iso(releaseMonth);
        since = iso(releaseMonth - between(3, 18));
      }

      out.push({
        id,
        name,
        speciesId: sp.id,
        stage,
        sponsored: stage !== "released" && sponsoredSet.has(idx),
        since,
        releasedOn,
        arrival: isDewi ? "seized" : pickArrival(),
      });
    });
  }

  return out;
}

export const animals: Animal[] = build();

export const animalsById = Object.fromEntries(animals.map((a) => [a.id, a])) as Record<
  string,
  Animal
>;

export const featuredAnimalId = DEWI_ID;

export const register = {
  inCare: animals.filter((a) => a.stage !== "released").length,
  sponsored: animals.filter((a) => a.sponsored).length,
  waiting: animals.filter((a) => a.stage !== "released" && !a.sponsored).length,
  released: animals.filter((a) => a.stage === "released").length,
  byStage: Object.fromEntries(
    stageOrder.map((s) => [s, animals.filter((a) => a.stage === s).length]),
  ) as Record<Stage, number>,
};
