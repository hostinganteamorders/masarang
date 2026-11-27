import type { Common } from "@/content/common";

/**
 * Intro tiap menu di navbar: alamat halaman (tanpa awalan bahasa) -> kunci teks pengantar dan nama menu.
 * Dipakai oleh `components/Intro.tsx` dan oleh skrip kecil di `layout` (sebelum cat pertama).
 */
export const MENU_INTRO: Record<string, { key: keyof Common["intro"]["menus"]; nav: keyof Common["nav"] }> = {
  "/about": { key: "about", nav: "about" },
  "/about/founder": { key: "founder", nav: "aboutFounder" },
  "/about/story": { key: "story", nav: "aboutStory" },
  "/about/vision": { key: "vision", nav: "aboutVision" },
  "/about/sites": { key: "sites", nav: "aboutSites" },
  "/about/partners": { key: "partners", nav: "aboutPartners" },
  "/programs": { key: "programs", nav: "programs" },
  "/programs/restoration": { key: "restoration", nav: "restoration" },
  "/programs/conservation": { key: "conservation", nav: "conservation" },
  "/programs/education": { key: "education", nav: "education" },
  "/programs/conservation/adopt": { key: "adopt", nav: "involvedAdopt" },
  "/get-involved": { key: "involved", nav: "involved" },
  "/get-involved/partner": { key: "partner", nav: "involvedPartner" },
  "/get-involved/volunteer": { key: "volunteer", nav: "involvedVolunteer" },
  "/support": { key: "donation", nav: "involvedDonation" },
  "/support/merchandise": { key: "merch", nav: "involvedMerch" },
  "/updates": { key: "updates", nav: "updates" },
};

/** Path tanpa awalan bahasa dan garis miring akhir: "/en/about/" -> "/about", "/en" -> "". */
export function barePath(pathname: string): string {
  return pathname.replace(/^\/(en|id)(?=\/|$)/, "").replace(/\/+$/, "");
}
