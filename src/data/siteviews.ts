import { cmsList, cmsValues } from "@/cms/apply";
import type { Fact } from "@/data/site";
import type { L10n } from "@/lib/i18n";

/**
 * Tampilan lokasi dari angkasa dan udara.
 * - "satellite": citra Esri World Imagery. `release` = nomor rilis Esri Wayback (kosong = citra terbaru);
 *   `date` = bulan rilis itu terbit (foto aslinya bisa lebih lama).
 * - "pano": foto panorama 360° dari drone (equirectangular 2:1). `image` = alamat berkas.
 * Titik tengah peta diambil dari koordinat GPS foto drone 2 Nov 2026; admin dapat mengubahnya di Pengaturan.
 */
export type ViewKind = "satellite" | "pano";

export type SiteView = {
  id: string;
  kind: ViewKind;
  /** tttt-bb */
  date: string;
  release: number | null;
  image: string;
  note: L10n;
};

export const siteViewSpot = {
  lat: cmsValues("siteviews.lat", { v: 1.0434, ph: true } as Fact),
  lon: cmsValues("siteviews.lon", { v: 124.9225, ph: true } as Fact),
  zoom: cmsValues("siteviews.zoom", { v: 16 } as Fact),
};

const none: L10n = { en: "", id: "" };

const seed: SiteView[] = [
  { id: "sat-2014-02", kind: "satellite", date: "2014-02", release: 10, image: "", note: none },
  { id: "sat-2017-02", kind: "satellite", date: "2017-02", release: 31026, image: "", note: none },
  { id: "sat-2020-04", kind: "satellite", date: "2020-04", release: 15045, image: "", note: none },
  { id: "sat-2021-02", kind: "satellite", date: "2021-02", release: 9812, image: "", note: none },
  { id: "sat-2022-02", kind: "satellite", date: "2022-02", release: 26083, image: "", note: none },
  { id: "sat-2022-07", kind: "satellite", date: "2022-07", release: 13851, image: "", note: none },
  { id: "sat-2023-06", kind: "satellite", date: "2023-06", release: 47963, image: "", note: none },
  { id: "sat-2024-06", kind: "satellite", date: "2024-06", release: 12428, image: "", note: none },
  { id: "sat-2025-04", kind: "satellite", date: "2025-04", release: 27982, image: "", note: none },
  { id: "sat-2026-05", kind: "satellite", date: "2026-05", release: 10842, image: "", note: none },
  { id: "pano-2026-11", kind: "pano", date: "2026-11", release: null, image: "/photos/site-views/pano-2026-11.jpg", note: { en: "Drone flight, 2 November 2026", id: "Penerbangan drone, 2 November 2026" } },
];

export const siteViews: SiteView[] = cmsList<SiteView>("siteViews", seed);
