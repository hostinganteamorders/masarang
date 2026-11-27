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
