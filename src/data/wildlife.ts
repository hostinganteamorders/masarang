import { cmsList } from "@/cms/apply";
import type { L10n } from "@/lib/i18n";

/**
 * Data satwa Tasikoki, bersumber dari berkas "Rekapitulasi Satwa PPST 2018" (lembar OVERVIEW dan
 * rekapitulasi bulanan, data sampai Oktober 2026). Dibuat dari Excel; admin dapat mengubahnya di
 * "Data & daftar". Angka karantina belum ada di Excel, jadi masih CONTOH (`quarantinePh`), begitu juga
 * satwa duta di tiap kategori (`ambassador.ph`).
 */

export type CatId = "primates" | "mammals" | "reptiles" | "birds";
export const catOrder: CatId[] = ["primates", "mammals", "reptiles", "birds"];

export type Ambassador = {
  /** Nama umum satwa duta. */
  species: string;
  latin: string;
  /** Foto (alamat berkas); kosong = tanpa foto. */
  photo: string;
  story: L10n;
  /** Pemilihan satwa duta masih contoh. */
  ph: boolean;
};

export type WildCat = {
  id: string;
  /** Kategori. */
  cat: CatId;
  /** Sedang dirawat (Oktober 2026). */
  inCare: number;
  /** Di antaranya yang masih karantina. */
  quarantine: number;
  quarantinePh: boolean;
  /** Total sejak 2018. */
  entered: number;
  born: number;
  died: number;
  released: number;
  translocated: number;
  ambassador: Ambassador;
};

export type WildYear = { id: string; year: number } & Record<CatId, number>;

export type WildSpecies = { id: string; category: CatId; name: string; latin: string; count: number };

/** Posisi data sampai (bulan, tttt-bb). */
export const wildlifeAsOf = "2026-10";

const seedCats: WildCat[] = [
  {
    "id": "primates",
    "cat": "primates",
    "inCare": 72,
    "quarantine": 3,
    "quarantinePh": true,
    "entered": 113,
    "born": 24,
    "died": 150,
    "released": 34,
    "translocated": 26,
    "ambassador": {
      "species": "Yaki",
      "latin": "Macaca nigra",
      "photo": "/photos/conservation/animals/macaque-behind-bars_DSC08922.jpg",
      "story": {
        "en": "[Example] The crested black macaque is the face of North Sulawesi’s forests and is critically endangered. It stands for every primate we care for.",
        "id": "[Contoh] Yaki adalah wajah hutan Sulawesi Utara dan berstatus kritis. Ia mewakili seluruh primata yang kami rawat."
      },
      "ph": true
    }
  },
  {
    "id": "mammals",
    "cat": "mammals",
    "inCare": 35,
    "quarantine": 2,
    "quarantinePh": true,
    "entered": 30,
    "born": 20,
    "died": 38,
    "released": 14,
    "translocated": 4,
    "ambassador": {
      "species": "Rusa Timor",
      "latin": "Rusa timorensis",
      "photo": "",
      "story": {
        "en": "[Example] The Timor deer is the mammal we care for most. It stands for the hoofed and marsupial mammals in our care.",
        "id": "[Contoh] Rusa Timor adalah mamalia yang paling banyak kami rawat. Ia mewakili mamalia berkuku dan berkantung di Tasikoki."
      },
      "ph": true
    }
  },
  {
    "id": "reptiles",
    "cat": "reptiles",
    "inCare": 53,
    "quarantine": 2,
    "quarantinePh": true,
    "entered": 168,
    "born": 0,
    "died": 73,
    "released": 30,
    "translocated": 6,
    "ambassador": {
      "species": "Buaya Muara",
      "latin": "Crocodylus porosus",
      "photo": "/photos/conservation/animals/crocodile-in-its-pool_DSC08869.jpg",
      "story": {
        "en": "[Example] The saltwater crocodile is the reptile we care for most. It stands for the reptiles confiscated or handed over to us.",
        "id": "[Contoh] Buaya Muara adalah reptil yang paling banyak kami rawat. Ia mewakili reptil sitaan dan serahan di Tasikoki."
      },
      "ph": true
    }
  },
  {
    "id": "birds",
    "cat": "birds",
    "inCare": 88,
    "quarantine": 6,
    "quarantinePh": true,
    "entered": 809,
    "born": 37,
    "died": 410,
    "released": 73,
    "translocated": 422,
    "ambassador": {
      "species": "Nuri Talaud",
      "latin": "Eos histrio",
      "photo": "/photos/conservation/animals/lories-on-a-branch_Day-2-Story-Lab-for-Sampiri-179.jpg",
      "story": {
        "en": "[Example] The red-and-blue lory is a Talaud Islands bird and one of the species we care for most. It stands for the birds in our care.",
        "id": "[Contoh] Nuri Talaud adalah burung asli Kepulauan Talaud dan salah satu yang paling banyak kami rawat. Ia mewakili burung di Tasikoki."
      },
      "ph": true
    }
  }
];

const seedYears: WildYear[] = [  {"id": "2018", "year": 2018, "primates": 161, "mammals": 44, "reptiles": 16, "birds": 228},
  {"id": "2019", "year": 2019, "primates": 166, "mammals": 42, "reptiles": 18, "birds": 181},
  {"id": "2020", "year": 2020, "primates": 134, "mammals": 42, "reptiles": 23, "birds": 253},
  {"id": "2021", "year": 2021, "primates": 138, "mammals": 41, "reptiles": 22, "birds": 234},
  {"id": "2022", "year": 2022, "primates": 114, "mammals": 41, "reptiles": 48, "birds": 200},
  {"id": "2023", "year": 2023, "primates": 100, "mammals": 22, "reptiles": 56, "birds": 391},
  {"id": "2024", "year": 2024, "primates": 82, "mammals": 32, "reptiles": 34, "birds": 104},
  {"id": "2025", "year": 2025, "primates": 77, "mammals": 34, "reptiles": 28, "birds": 130},
  {"id": "2026", "year": 2026, "primates": 72, "mammals": 35, "reptiles": 53, "birds": 88}];

const seedSpecies: WildSpecies[] = [  {"id": "mam-5", "category": "mammals", "name": "Rusa Timor", "latin": "Rusa timorensis", "count": 28},
  {"id": "bir-78", "category": "birds", "name": "Nuri Talaud", "latin": "Eos histrio", "count": 22},
  {"id": "pri-13", "category": "primates", "name": "Monyet Dige", "latin": "Macaca hecki", "count": 21},
  {"id": "bir-63", "category": "birds", "name": "Kakatua Koki", "latin": "Cacatua galerita", "count": 16},
  {"id": "pri-16", "category": "primates", "name": "Monyet Yaki", "latin": "Macaca nigra", "count": 15},
  {"id": "pri-17", "category": "primates", "name": "Monyet Bolai", "latin": "Macaca nigrescens", "count": 14},
  {"id": "rep-42", "category": "reptiles", "name": "Sanca Hijau", "latin": "Morelia viridis", "count": 14},
  {"id": "rep-32", "category": "reptiles", "name": "Buaya Muara", "latin": "Crocodylus porosus", "count": 12},
  {"id": "bir-89", "category": "birds", "name": "Kasturi Kepala-hitam", "latin": "Lorius lory", "count": 9},
  {"id": "bir-107", "category": "birds", "name": "Perkici Dora", "latin": "Trichoglossus ornatus", "count": 9},
  {"id": "rep-52", "category": "reptiles", "name": "Biawak Pohon Totol Biru", "latin": "Varanus macraei", "count": 8},
  {"id": "pri-14", "category": "primates", "name": "Monyet Darre", "latin": "Macaca maura", "count": 8},
  {"id": "bir-67", "category": "birds", "name": "Kakatua Jambul Kuning", "latin": "Cacatua sulphurea", "count": 7},
  {"id": "bir-69", "category": "birds", "name": "Kasuari Gelambir Ganda", "latin": "Casuarius casuarius", "count": 6},
  {"id": "rep-33", "category": "reptiles", "name": "Kura-kura Daun Asia", "latin": "Cyclemys dentata", "count": 6},
  {"id": "pri-12", "category": "primates", "name": "Monyet Ekor Panjang", "latin": "Macaca fascicularis", "count": 5},
  {"id": "bir-65", "category": "birds", "name": "Kakatua Seram", "latin": "Cacatua moluccensis", "count": 4},
  {"id": "mam-4", "category": "mammals", "name": "Beruang Madu", "latin": "Helarctos malayanus", "count": 3},
  {"id": "bir-70", "category": "birds", "name": "Kasuari Gelambir Tunggal", "latin": "Casuarius unappendiculatus", "count": 3},
  {"id": "rep-44", "category": "reptiles", "name": "Kura-kura Bajuku", "latin": "Orlitia borneensis", "count": 3},
  {"id": "mam-6", "category": "mammals", "name": "Kuskus Tembung", "latin": "Strigocuscus celebensis", "count": 3},
  {"id": "bir-76", "category": "birds", "name": "Nuri Bayan", "latin": "Eclectus roratus", "count": 3},
  {"id": "rep-39", "category": "reptiles", "name": "Sanca Bibir Putih", "latin": "Leiopython albertisii", "count": 3},
  {"id": "bir-90", "category": "birds", "name": "Elang Paria", "latin": "Milvus migrans", "count": 2},
  {"id": "bir-85", "category": "birds", "name": "Elang-laut Perut-putih", "latin": "Haliaeetus leucogaster", "count": 2},
  {"id": "bir-94", "category": "birds", "name": "Kakatua Raja", "latin": "Probosciger atterimus", "count": 2},
  {"id": "rep-40", "category": "reptiles", "name": "Kura-kura Hutan Sulawesi", "latin": "Leucochepalon yuwonoii", "count": 2},
  {"id": "pri-18", "category": "primates", "name": "Monyet Boti", "latin": "Macaca tonkeana", "count": 2},
  {"id": "pri-10", "category": "primates", "name": "Owa Jenggot Putih Kalimantan", "latin": "Hylobates albibarbis", "count": 2},
  {"id": "pri-22", "category": "primates", "name": "Siamang", "latin": "Symphalangus syndactylus", "count": 2},
  {"id": "mam-2", "category": "mammals", "name": "Babirusa", "latin": "Babyrousa celebensis", "count": 1},
  {"id": "rep-51", "category": "reptiles", "name": "Biawak Leher Persik", "latin": "Varanus jobiensis", "count": 1},
  {"id": "bir-66", "category": "birds", "name": "Kakatua Rawa", "latin": "Cacatua sanguinea", "count": 1},
  {"id": "bir-64", "category": "birds", "name": "Kakatua Tanimbar", "latin": "Cacatua goffini", "count": 1},
  {"id": "rep-35", "category": "reptiles", "name": "Kura-kura Matahari", "latin": "Heosemys spinosa", "count": 1},
  {"id": "rep-29", "category": "reptiles", "name": "Labi-labi Moncong Babi", "latin": "Carretochelys insculpta", "count": 1},
  {"id": "bir-82", "category": "birds", "name": "Mambruk Ubiat", "latin": "Goura cristata", "count": 1},
  {"id": "pri-15", "category": "primates", "name": "Monyet Beruk", "latin": "Macaca nemestrina", "count": 1},
  {"id": "pri-11", "category": "primates", "name": "Owa Kalaweit", "latin": "Hylobates muelleri", "count": 1},
  {"id": "pri-9", "category": "primates", "name": "Owa Ungko", "latin": "Hylobates agilis", "count": 1},
  {"id": "rep-46", "category": "reptiles", "name": "Sanca Batik", "latin": "Python reticulatus", "count": 1},
  {"id": "rep-27", "category": "reptiles", "name": "Ular Monopohon", "latin": "Candoia carinata", "count": 1},
  {"id": "bir-102", "category": "birds", "name": "Angsabatu Topeng", "latin": "Sula dactylatra", "count": 0},
  {"id": "rep-41", "category": "reptiles", "name": "Baning Cokelat", "latin": "Manouria emys", "count": 0},
  {"id": "rep-38", "category": "reptiles", "name": "Baning Sulawesi", "latin": "Indotestudo forsteni", "count": 0},
  {"id": "pri-19", "category": "primates", "name": "Bekantan", "latin": "Nasalis larvatus", "count": 0},
  {"id": "bir-95", "category": "birds", "name": "Betet Ekor Panjang", "latin": "Psittaculla longicauda", "count": 0},
  {"id": "bir-81", "category": "birds", "name": "Betet Pipi Merah", "latin": "Geoffroyus geoffroyi", "count": 0},
  {"id": "bir-103", "category": "birds", "name": "Betet-kelapa Filipin", "latin": "Tanygnathus lucionensis", "count": 0},
  {"id": "bir-104", "category": "birds", "name": "Betet-kelapa Paruh-besar", "latin": "Tanygnatus megalorynchos", "count": 0},
  {"id": "bir-105", "category": "birds", "name": "Betet-kelapa Punggung Biru", "latin": "Tanygnathus sumatranus", "count": 0},
  {"id": "rep-53", "category": "reptiles", "name": "Biawak Banggai", "latin": "Varanus melinus", "count": 0},
  {"id": "rep-50", "category": "reptiles", "name": "Biawak Maluku", "latin": "Varanus indicus", "count": 0},
  {"id": "rep-57", "category": "reptiles", "name": "Biawak Papua", "latin": "Varanus salvadorii", "count": 0},
  {"id": "rep-54", "category": "reptiles", "name": "Biawak Pohon Hijau", "latin": "Varanus prasinus", "count": 0},
  {"id": "rep-55", "category": "reptiles", "name": "Biawak Rawa", "latin": "Varanus rainerguentheri", "count": 0},
  {"id": "rep-56", "category": "reptiles", "name": "Biawak Serunai", "latin": "Varanus rudicollis", "count": 0},
  {"id": "bir-59", "category": "birds", "name": "Boha Wasur", "latin": "Anaseranas semipalmata", "count": 0},
  {"id": "bir-58", "category": "birds", "name": "Cekakak Tunggir Hijau", "latin": "Actenoides monachus", "count": 0},
  {"id": "bir-86", "category": "birds", "name": "Elang Bondol", "latin": "Haliastur indus", "count": 0},
  {"id": "bir-91", "category": "birds", "name": "Elang Sulawesi", "latin": "Nisaetus lanceolatus", "count": 0},
  {"id": "bir-101", "category": "birds", "name": "Elang Ular Sulawesi", "latin": "Spilornis rufipectus", "count": 0},
  {"id": "rep-37", "category": "reptiles", "name": "Iguana Hijau", "latin": "Iguana iguana", "count": 0},
  {"id": "bir-74", "category": "birds", "name": "Jagal Hitam", "latin": "Cracticus quoyi", "count": 0},
  {"id": "bir-73", "category": "birds", "name": "Jagal Papua", "latin": "Cracticus cassicus", "count": 0},
  {"id": "bir-100", "category": "birds", "name": "Jalak Tunggir Merah", "latin": "Scissirostrum dubium", "count": 0},
  {"id": "bir-99", "category": "birds", "name": "Julang Papua", "latin": "Rhyticeros plicatus", "count": 0},
  {"id": "rep-47", "category": "reptiles", "name": "Kadal Panana", "latin": "Tiliqua gigas", "count": 0},
  {"id": "bir-68", "category": "birds", "name": "Kakatua Jambul Jingga", "latin": "Cacatua citrinocristata", "count": 0},
  {"id": "bir-62", "category": "birds", "name": "Kakatua Putih", "latin": "Cacatua alba", "count": 0},
  {"id": "bir-88", "category": "birds", "name": "Kasturi Ternate", "latin": "Lorius garrulus", "count": 0},
  {"id": "bir-92", "category": "birds", "name": "Kowak Malam", "latin": "Nycticorax caledonicus", "count": 0},
  {"id": "pri-23", "category": "primates", "name": "Krabuku Tangkasi", "latin": "Tarsius spectrumgurskyae", "count": 0},
  {"id": "bir-93", "category": "birds", "name": "Kring-kring Bukit", "latin": "Prioniturus platurus", "count": 0},
  {"id": "pri-20", "category": "primates", "name": "Kukang Jawa", "latin": "Nycticebus javanicus", "count": 0},
  {"id": "mam-1", "category": "mammals", "name": "Kuskus Beruang", "latin": "Ailurops ursinus", "count": 0},
  {"id": "rep-31", "category": "reptiles", "name": "Kuya Batok", "latin": "Coura amboinensis", "count": 0},
  {"id": "rep-25", "category": "reptiles", "name": "Labi-labi Bulus", "latin": "Amyda cartilaginea", "count": 0},
  {"id": "pri-24", "category": "primates", "name": "Lutung Budeng", "latin": "Trachypithecus auratus", "count": 0},
  {"id": "bir-83", "category": "birds", "name": "Mambruk viktoria", "latin": "Goura victoria", "count": 0},
  {"id": "bir-108", "category": "birds", "name": "Merpati Hitam sulawesi", "latin": "Turacoena manadensis", "count": 0},
  {"id": "mam-8", "category": "mammals", "name": "Musang Tenggalung", "latin": "Viverra tangalunga", "count": 0},
  {"id": "bir-96", "category": "birds", "name": "Nuri Ara Besar", "latin": "Psittaculirostris desmarestii", "count": 0},
  {"id": "bir-71", "category": "birds", "name": "Nuri Hitam", "latin": "Chalcopsitta atra", "count": 0},
  {"id": "bir-97", "category": "birds", "name": "Nuri Kabare", "latin": "Psittrichas fulgidus", "count": 0},
  {"id": "bir-80", "category": "birds", "name": "Nuri Kalung-ungu", "latin": "Eos squamata", "count": 0},
  {"id": "bir-77", "category": "birds", "name": "Nuri Maluku", "latin": "Eos bornea", "count": 0},
  {"id": "bir-79", "category": "birds", "name": "Nuri Tanimbar", "latin": "Eos reticulata", "count": 0},
  {"id": "pri-21", "category": "primates", "name": "Orangutan Kalimantan", "latin": "Pongo pygmaeus", "count": 0},
  {"id": "mam-7", "category": "mammals", "name": "Pelandu Aru", "latin": "Thylogale brunii", "count": 0},
  {"id": "mam-3", "category": "mammals", "name": "Pelandu Papua", "latin": "Dorcopsis hageni", "count": 0},
  {"id": "bir-75", "category": "birds", "name": "Pergam Pinon", "latin": "Ducula pinon", "count": 0},
  {"id": "bir-106", "category": "birds", "name": "Perkici Pelangi", "latin": "Trichoglossus haematodus", "count": 0},
  {"id": "bir-72", "category": "birds", "name": "Perkici Punggung Hitam", "latin": "Charmosyna pulchella", "count": 0},
  {"id": "bir-60", "category": "birds", "name": "Raja Perling Sulawesi", "latin": "Basilornis celebensis", "count": 0},
  {"id": "bir-61", "category": "birds", "name": "Ruffous Hornbill", "latin": "Buceros hydrocorax", "count": 0},
  {"id": "rep-45", "category": "reptiles", "name": "Sanca Bodo", "latin": "Python molurus bivitattus", "count": 0},
  {"id": "bir-109", "category": "birds", "name": "Serak Minahasa", "latin": "Tyto inexpectata", "count": 0},
  {"id": "bir-87", "category": "birds", "name": "Serindit Sulawesi", "latin": "Loriculus stigmatus", "count": 0},
  {"id": "rep-36", "category": "reptiles", "name": "Soa Layar", "latin": "Hydrosaurus amboinensis", "count": 0},
  {"id": "bir-84", "category": "birds", "name": "Tiong Nias", "latin": "Gracula robusta", "count": 0},
  {"id": "rep-43", "category": "reptiles", "name": "Ular Lanang", "latin": "Ophiophagus hannah", "count": 0},
  {"id": "rep-28", "category": "reptiles", "name": "Ular Monotanah", "latin": "Candoia paulsoni", "count": 0},
  {"id": "rep-34", "category": "reptiles", "name": "Ular Pipa", "latin": "Cylindrophis ruffus", "count": 0},
  {"id": "rep-26", "category": "reptiles", "name": "Ular Pohon Cokelat", "latin": "Boiga irregularis", "count": 0},
  {"id": "rep-30", "category": "reptiles", "name": "Ular Tikus Sulawesi", "latin": "Coelegnathus erythrurus celebensis", "count": 0},
  {"id": "rep-49", "category": "reptiles", "name": "Ular Viper Kapak Hijau", "latin": "Tropidolaemus subannulatus", "count": 0},
  {"id": "rep-48", "category": "reptiles", "name": "Ular Viper Kapak Sulawesi", "latin": "Tropidolaemus laticinctus", "count": 0},
  {"id": "bir-98", "category": "birds", "name": "Walik Kembang", "latin": "Ptilinopus melanospilus", "count": 0}];

export const wildCats: WildCat[] = cmsList<WildCat>("wildlifeCats", seedCats);
export const wildYears: WildYear[] = cmsList<WildYear>("wildlifeYears", seedYears);
export const wildSpecies: WildSpecies[] = cmsList<WildSpecies>("wildlifeSpecies", seedSpecies);

export const wildTotals = {
  inCare: wildCats.reduce((n, c) => n + c.inCare, 0),
  quarantine: wildCats.reduce((n, c) => n + c.quarantine, 0),
  released: wildCats.reduce((n, c) => n + c.released, 0),
  entered: wildCats.reduce((n, c) => n + c.entered, 0),
  /** Semua contoh selama karantina belum diisi dari register. */
  quarantinePh: wildCats.some((c) => c.quarantinePh),
};
