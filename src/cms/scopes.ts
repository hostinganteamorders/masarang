import "server-only";
import { defaults } from "./apply";
import "@/content/about";
import "@/content/adopt";
import "@/content/common";
import "@/content/hillside";
import "@/content/home";
import "@/content/drone";
import "@/content/involved";
import "@/content/mail";
import "@/content/merch";
import "@/content/programs";
import "@/content/siteviews";
import "@/content/sites";
import "@/content/support";
import "@/content/team";
import "@/content/transparency";
import "@/content/updates";

/** Berkas teks yang bisa diedit di admin, dengan nama yang dikenal staf dan halaman situs yang memakainya. */
export const TEXT_SCOPES = [
  { id: "home", label: "Beranda", page: "" },
  { id: "about", label: "Tentang Kami (pendiri, kisah, visi dan pendekatan, lokasi, mitra)", page: "/about" },
  { id: "programs", label: "Program (ringkasan, Restorasi, Konservasi, Edukasi)", page: "/programs" },
  { id: "sites", label: "Lokasi: Temboan dan Tasikoki", page: "/programs/restoration" },
  { id: "hillside", label: "Slider lereng pulih", page: "/programs/restoration" },
  { id: "siteviews", label: "Satelit dan 360° (halaman Restorasi)", page: "/programs/restoration" },
  { id: "adopt", label: "Adopsi satwa", page: "/programs/conservation/adopt" },
  { id: "updates", label: "Updates dan Quarterly Report", page: "/updates" },
  { id: "involved", label: "Terlibat (Get involved, mitra, relawan)", page: "/get-involved" },
  { id: "support", label: "Dukung kami (donasi)", page: "/support" },
  { id: "drone", label: "Video drone (halaman Restorasi)", page: "/programs/restoration" },
  { id: "mail", label: "Pesan email siap pakai (tombol Hubungi, Relawan, Mitra, Donasi, Adopsi, Kunjungan)", page: "/get-involved" },
  { id: "merch", label: "Merchandise (halaman Dukung kami)", page: "/support/merchandise" },
  { id: "transparency", label: "Transparansi", page: "/transparency" },
  { id: "team", label: "Halaman tim lengkap", page: "/about/team" },
  { id: "common", label: "Menu, footer, tombol, dan teks umum", page: "" },
] as const;

export type ScopeId = (typeof TEXT_SCOPES)[number]["id"];
export const scopeById = (id: string) => TEXT_SCOPES.find((s) => s.id === id);

/** Isi bawaan satu berkas teks ({ en, id }), sebelum perubahan admin. */
export function defaultsFor(id: string): Record<"en" | "id", unknown> | undefined {
  return defaults.text.get(id) as Record<"en" | "id", unknown> | undefined;
}
