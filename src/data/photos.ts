import { catalog, type CatalogPhoto, type PhotoKey } from "./photo-catalog";

/**
 * Penempatan foto di situs. Semua foto berasal dari katalog (`photo-catalog.ts`); di sini kita hanya memilih
 * foto mana yang dipakai di tempat mana, memakai kunci katalog. Untuk menukar foto, ganti kuncinya
 * (editor akan menyarankan kunci yang ada) dan susun ulang bila perlu.
 *
 * Foto galeri tidak dipotong, jadi tidak perlu rasio tertentu.
 */
export type Pic = CatalogPhoto & { key: PhotoKey };

const pic = (key: PhotoKey): Pic => ({ key, ...catalog[key] });
const set = (...keys: PhotoKey[]): Pic[] => keys.map(pic);

export const photos = {
  /** Beranda: foto penuh di balik judul. */
  hero: pic("walking-through-regrowth"),

  /** Sampul kartu lokasi di beranda dan halaman Program (rasio 16:10). */
  sites: {
    temboan: pic("nursery-keeper-seedlings"),
    tasikoki: pic("cassowary-portrait"),
  },

  /** Foto penuh di balik judul halaman dalam. */
  heroes: {
    about: pic("amphitheatre-and-mountains"),
    team: pic("temboan-team-at-the-sign"),
    programs: pic("central-nursery"),
    temboan: pic("forested-hills"),
    tasikoki: pic("lories-on-a-branch"),
    adopt: pic("macaque-behind-bars"),
  },

  about: {
    /** Di samping kisah pendirian (rasio 4:5, tegak). */
    story: pic("hq-lawn-portrait"),
    /** Di atas ketiga pilar "Apa yang kami kerjakan". */
    land: pic("young-trees-in-grass"),
    wildlife: pic("cockatoo-on-its-perch"),
    proof: pic("researchers-in-the-forest"),
  },

  /** Halaman Program: dua pilar lintas lokasi. */
  programs: {
    education: pic("painting-an-animal"),
    monitoring: pic("mapping-on-paper"),
  },


  /** Galeri halaman Temboan (12 foto; susunan baris dihitung otomatis dari rasio foto). */
  temboan: set(
    "nursery-keeper-seedlings",
    "papaya-tree",
    "coconut-palms",
    "coconut-shell-beds",
    "mulched-demonstration-plot",
    "coast-from-the-bow",
    "transplanting-seedling",
    "hoe-and-boots",
    "lookout-tower",
    "track-through-young-trees",
    "beach-from-the-hut",
    "patrol-boat",
  ),

  /** Galeri halaman Tasikoki. */
  tasikoki: set(
    "macaque-behind-bars",
    "white-bellied-sea-eagle",
    "crocodile-in-its-pool",
    "loading-crates",
    "crates-in-the-ship-hold",
    "students-in-the-hall",
    "langur-in-transport-box",
    "tree-mural",
    "preparing-fruit",
    "snake-in-transport-box",
    "cockatoo-on-its-perch",
    "watching-the-cassowary",
  ),

  /** Galeri pendidikan di halaman Program. */
  education: set(
    "amphitheatre-and-mountains",
    "market-hall",
    "library-workshop",
    "musicians-on-the-deck",
    "amphitheatre-over-the-valley",
    "painting-in-progress",
    "mural-wall-coloured",
    "mural-wall-to-colour",
    "bamboo-talk-stage",
    "students-with-sacks",
    "sorting-waste-on-the-grass",
    "clean-up-crew",
  ),

  /**
   * Potret anggota tim menurut `id` anggota (lihat `src/data/team.ts`), mis. { chair: "/photos/team/aulia.jpg" }.
   * Rasio tegak 4:5; wajah di tengah atas. Dibiarkan kosong sampai foto dan nama yang sebenarnya ada.
   */
  portraits: {} as Record<string, string>,
};
