import { cmsList } from "@/cms/apply";
import type { L10n } from "@/lib/i18n";

/**
 * Video penerbangan drone untuk pemantauan lokasi. Dua di antaranya dapat dibandingkan berdampingan
 * di halaman Restorasi. Video di sini versi web 720p (aslinya 4K).
 */
export type DroneVideo = {
  id: string;
  /** tttt-bb */
  date: string;
  /** Alamat berkas video langsung (.mp4). */
  video: string;
  poster: string;
  note: L10n;
};

const none: L10n = { en: "", id: "" };

export const droneVideos: DroneVideo[] = cmsList<DroneVideo>("droneVideos", [
  { id: "drone-2025-01", date: "2025-01", video: "/videos/drone-2025-01.mp4", poster: "/photos/drone/drone-2025-01.jpg", note: none },
  { id: "drone-2026-01", date: "2026-01", video: "/videos/drone-2026-01.mp4", poster: "/photos/drone/drone-2026-01.jpg", note: none },
]);
