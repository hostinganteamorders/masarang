import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

const en = {
  meta: "Restoration site, from space and from the air",
  source: "Esri satellite imagery and our own drone flights",
  title: "See the land change, from space and from our drone",
  body: "Choose satellite or 360°, pick a year and month for each side, then drag the divider to compare. The satellite date is when Esri published that image, and the photo itself may be a little older. The 360° views are our own drone flights.",
  modes: "View type",
  satellite: "Satellite",
  pano: "360° drone",
  left: "Left side",
  right: "Right side",
  year: "Year",
  month: "Month",
  compare: "Drag to compare the two dates",
  hintSatellite: "Drag the picture to move the map.",
  hintPano: "Drag the picture to look around.",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  reset: "Reset view",
  oneCapture: "So far there is one 360° capture. Each new drone flight adds another date to compare.",
  location: "Location: {lat}, {lon}",
  credit: "Satellite imagery: Esri, Maxar, Earthstar Geographics and the GIS User Community.",
  latest: "Latest",
  noWebgl: "Your browser cannot show the 360° view, so this is the flat image.",
  sliderLabel: "Position of the divider between {a} and {b}",
  stageLabel: "Comparison of {a} and {b}",
};

const id: typeof en = {
  meta: "Lokasi restorasi, dari angkasa dan dari udara",
  source: "Citra satelit Esri dan penerbangan drone kami",
  title: "Lihat perubahan lahan dari angkasa dan dari drone kami",
  body: "Pilih satelit atau 360°, tentukan tahun dan bulan untuk masing-masing sisi, lalu geser garis pembatas untuk membandingkan. Tanggal satelit adalah saat Esri menerbitkan citra itu, sedangkan foto aslinya bisa sedikit lebih lama. Tampilan 360° berasal dari penerbangan drone kami sendiri.",
  modes: "Jenis tampilan",
  satellite: "Satelit",
  pano: "Drone 360°",
  left: "Sisi kiri",
  right: "Sisi kanan",
  year: "Tahun",
  month: "Bulan",
  compare: "Geser untuk membandingkan kedua tanggal",
  hintSatellite: "Seret gambar untuk menggeser peta.",
  hintPano: "Seret gambar untuk melihat ke sekeliling.",
  zoomIn: "Perbesar",
  zoomOut: "Perkecil",
  reset: "Setel ulang tampilan",
  oneCapture: "Sejauh ini baru ada satu rekaman 360°. Setiap penerbangan drone berikutnya menambah satu tanggal untuk dibandingkan.",
  location: "Lokasi: {lat}, {lon}",
  credit: "Citra satelit: Esri, Maxar, Earthstar Geographics, dan komunitas pengguna GIS.",
  latest: "Terbaru",
  noWebgl: "Peramban Anda tidak dapat menampilkan tampilan 360°, jadi yang tampil adalah gambar datar.",
  sliderLabel: "Posisi garis pembatas antara {a} dan {b}",
  stageLabel: "Perbandingan {a} dan {b}",
};

export const siteViewsCopy: Record<Locale, typeof en> = cmsText("siteviews", { en, id });
export type SiteViewsCopy = typeof en;
