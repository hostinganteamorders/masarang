import "server-only";
import { defaults, type PicData } from "./apply";
import "@/data/photos";
import { catalog } from "@/data/photo-catalog";

type Label = { label: string; where: string };

/** Nama tempat foto yang dikenal staf. Tempat yang tidak tercantum di sini tidak dipakai situs dan tidak ditampilkan. */
export const SLOT_LABELS: Record<string, Label> = {
  "sites.temboan": { label: "Sampul kartu Restorasi", where: "/" },
  "sites.tasikoki": { label: "Sampul kartu Konservasi", where: "/" },
  "programs.education": { label: "Sampul kartu Edukasi", where: "/" },
  "programs.monitoring": { label: "Pemantauan dan pelaporan", where: "/programs" },
  "heroes.about": { label: "Banner Tentang Kami", where: "/about" },
  "heroes.team": { label: "Banner Tim", where: "/about/team" },
  "heroes.programs": { label: "Banner Program", where: "/programs" },
  "heroes.temboan": { label: "Banner Restorasi", where: "/programs/restoration" },
  "heroes.tasikoki": { label: "Banner Konservasi", where: "/programs/conservation" },
  "heroes.adopt": { label: "Banner Adopsi", where: "/programs/conservation/adopt" },
  "heroes.education": { label: "Banner Edukasi", where: "/programs/education" },
  "about.story": { label: "Sejarah Masarang (foto tegak 4:5)", where: "/about" },
  "about.land": { label: "Pilar 1: Protecting Nature & Restoring Ecosystems", where: "/about" },
  "about.people": { label: "Pilar 2: Empowering People & Improving Well-being", where: "/about" },
  "about.agriculture": { label: "Pilar 3: Building Sustainable Agriculture & Livelihoods", where: "/about" },
  "restoration.project": { label: "Temboan Restoration Project", where: "/programs/restoration" },
  "restoration.farmers": { label: "Farmers Empowered", where: "/programs/restoration" },
  "conservation.tasikoki": { label: "Tasikoki", where: "/programs/conservation" },
  "educationItems.tumbuh": { label: ".Tumbuh", where: "/programs/education" },
  "educationItems.lokawaya": { label: "Pasar Lokawaya", where: "/programs/education" },
};

export const GALLERY_LABELS: Record<string, Label> = {
  temboan: { label: "Galeri Restorasi (Temboan)", where: "/programs/restoration" },
  tasikoki: { label: "Galeri Konservasi (Tasikoki)", where: "/programs/conservation" },
  education: { label: "Galeri Edukasi", where: "/programs/education" },
};

const get = (tree: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((n, k) => (typeof n === "object" && n !== null ? (n as Record<string, unknown>)[k] : undefined), tree);

const strip = ({ src, w, h, color, focus, alt }: PicData & { key?: string }): PicData => ({ src, w, h, color, focus, alt });

/** Foto bawaan (sebelum perubahan admin) untuk semua tempat yang bisa diganti. */
export function slotList() {
  const tree = defaults.photos.get("photos");
  const singles = Object.entries(SLOT_LABELS).flatMap(([path, meta]) => {
    const pic = get(tree, path) as PicData | undefined;
    return pic ? [{ path, ...meta, original: strip(pic) }] : [];
  });
  const galleries = Object.entries(GALLERY_LABELS).flatMap(([path, meta]) => {
    const items = get(tree, path) as PicData[] | undefined;
    return items ? [{ path, ...meta, original: items.map(strip) }] : [];
  });
  return { singles, galleries };
}

/** Pustaka: semua foto yang sudah ada di situs (termasuk yang belum dipakai). */
export const library = (): { id: string; pic: PicData }[] =>
  Object.entries(catalog).map(([id, p]) => ({ id, pic: strip(p as PicData) }));
