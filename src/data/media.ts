import type { L10n } from "@/lib/i18n";

/**
 * Video dan tautan luar yang belum ada alamatnya. Isi `url` bila sudah ada; sampai itu, halaman menampilkan
 * kotak penanda tempat (berlabel) dan tidak ada tautan yang mengarah ke mana pun.
 */
export type ExternalLink = { url?: string; label: L10n };

/** Video Aping. Tempel alamat YouTube/Vimeo (embed atau biasa) atau berkas video di /public. */
export const apingVideo: { url?: string; title: L10n } = {
  url: undefined,
  title: { en: "Video: Aping", id: "Video: Aping" },
};

/** Situs TMS (usaha gula aren petani). */
export const tms: ExternalLink = {
  url: undefined,
  label: { en: "Visit the TMS website", id: "Kunjungi situs TMS" },
};

/** Katalog karya EduTour (Residensi). */
export const edutourCatalog: ExternalLink = {
  url: undefined,
  label: { en: "Open the EduTour catalogue", id: "Buka katalog karya EduTour" },
};
