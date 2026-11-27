import { cmsValues } from "@/cms/apply";
import type { L10n } from "@/lib/i18n";

/**
 * Video dan tautan luar yang belum ada alamatnya. Isi `url` bila sudah ada; sampai itu, halaman menampilkan
 * kotak penanda tempat (berlabel) dan tidak ada tautan yang mengarah ke mana pun.
 */
export type ExternalLink = { url?: string; label: L10n };

/** Video Aping. Tempel alamat YouTube/Vimeo (embed atau biasa) atau berkas video di /public. */
export const apingVideo: { url?: string; poster?: string; title: L10n } = cmsValues("media.apingVideo", {
  // Versi web (1080p, sekitar 57 MB) dari Company Profile - Final. Ganti lewat Admin > Pengaturan bila ada versi baru.
  url: "/videos/aping.mp4" as string | undefined,
  poster: "/photos/drone/aping-poster.jpg" as string | undefined,
  title: { en: "Video: Aping", id: "Video: Aping" },
});

/** Situs TMS (usaha gula aren petani). */
export const tms: ExternalLink = cmsValues("media.tms", {
  url: undefined,
  label: { en: "Visit the TMS website", id: "Kunjungi situs TMS" },
});

/** Katalog karya EduTour (Residensi). */
export const edutourCatalog: ExternalLink = cmsValues("media.edutourCatalog", {
  url: undefined,
  label: { en: "Open the EduTour catalogue", id: "Buka katalog karya EduTour" },
});

/**
 * Video pembuka tiap menu di navbar (seperti video di Beranda). Tempel alamat YouTube/Vimeo atau berkas .mp4
 * lewat Admin > Video; kosong = kotak penanda tempat.
 */
export type MenuVideoId =
  | "about" | "founder" | "story" | "vision" | "sites" | "partners"
  | "programs" | "restoration" | "conservation" | "education"
  | "involved" | "adopt" | "donation" | "merch" | "partner" | "volunteer"
  | "updates";

const menuTitle = (en: string, id: string) => ({ url: undefined as string | undefined, title: { en: `Video: ${en}`, id: `Video: ${id}` } });

export const menuVideos: Record<MenuVideoId, { url?: string; title: L10n }> = {
  about: cmsValues("media.menu.about", menuTitle("About us", "Tentang kami")),
  founder: cmsValues("media.menu.founder", menuTitle("Our Founder", "Pendiri kami")),
  story: cmsValues("media.menu.story", menuTitle("Our Story", "Kisah kami")),
  vision: cmsValues("media.menu.vision", menuTitle("Vision & Approach", "Visi & Pendekatan")),
  sites: cmsValues("media.menu.sites", menuTitle("Our Sites", "Lokasi kami")),
  partners: cmsValues("media.menu.partners", menuTitle("Our Partners", "Mitra kami")),
  programs: cmsValues("media.menu.programs", menuTitle("Our programs", "Program kami")),
  restoration: cmsValues("media.menu.restoration", menuTitle("Restoration", "Restorasi")),
  conservation: cmsValues("media.menu.conservation", menuTitle("Conservation", "Konservasi")),
  education: cmsValues("media.menu.education", menuTitle("Education", "Edukasi")),
  involved: cmsValues("media.menu.involved", menuTitle("Get involved", "Terlibat")),
  adopt: cmsValues("media.menu.adopt", menuTitle("Adopt an animal", "Adopsi satwa")),
  donation: cmsValues("media.menu.donation", menuTitle("Donation", "Donasi")),
  merch: cmsValues("media.menu.merch", menuTitle("Merchandise", "Merchandise")),
  partner: cmsValues("media.menu.partner", menuTitle("Become a partner", "Jadi mitra")),
  volunteer: cmsValues("media.menu.volunteer", menuTitle("Volunteer", "Relawan")),
  updates: cmsValues("media.menu.updates", menuTitle("Updates", "Kabar")),
};
