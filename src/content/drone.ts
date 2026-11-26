import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

const en = {
  meta: "Drone monitoring",
  source: "Our own drone flights",
  title: "Watch the same hills a year apart",
  body: "Every January our drone flies the restoration site. Pick a month for each side and play both videos together to compare how the land has changed.",
  left: "Left side",
  right: "Right side",
  year: "Year",
  month: "Month",
  playBoth: "Play both together",
  pauseBoth: "Pause both",
  restart: "Restart both",
  one: "Only one flight is listed so far. Each new flight adds another date to compare.",
  note: "Videos are shown in 720p. Different flights can have different lengths, so each video also has its own controls.",
  videoLabel: "Drone video, {date}",
};

const id: typeof en = {
  meta: "Pemantauan drone",
  source: "Penerbangan drone kami sendiri",
  title: "Lihat bukit yang sama dengan selang setahun",
  body: "Setiap Januari drone kami terbang di lokasi restorasi. Pilih bulan untuk tiap sisi, lalu putar kedua video bersamaan untuk melihat perubahan lahan.",
  left: "Sisi kiri",
  right: "Sisi kanan",
  year: "Tahun",
  month: "Bulan",
  playBoth: "Putar keduanya",
  pauseBoth: "Jeda keduanya",
  restart: "Ulang keduanya",
  one: "Baru satu penerbangan yang terdaftar. Setiap penerbangan berikutnya menambah satu tanggal untuk dibandingkan.",
  note: "Video ditampilkan dalam 720p. Panjang tiap penerbangan bisa berbeda, jadi setiap video juga punya kontrol sendiri.",
  videoLabel: "Video drone, {date}",
};

export const droneCopy: Record<Locale, typeof en> = cmsText("drone", { en, id });
export type DroneCopy = typeof en;
