/**
 * Alamat lama -> alamat baru (tanpa awalan bahasa; pengunjung lalu diarahkan ke bahasanya oleh `proxy.ts`).
 * Dipakai `next.config.ts` sebagai pengalihan permanen (301/308) agar peringkat dan tautan lama tidak hilang.
 *
 * LENGKAPI dengan alamat asli situs lama (Squarespace): ekspor dari Google Search Console (Laporan > Halaman) atau
 * buka situs lama > Pengaturan > Advanced > URL Mappings, lalu tambahkan barisnya di sini: ["/alamat-lama", "/alamat-baru"].
 */
export const oldPaths: [from: string, to: string][] = [
  // Struktur sebelumnya dari situs ini
  ["/team", "/about/team"],
  ["/programs/temboan", "/programs/restoration"],
  ["/programs/tasikoki", "/programs/conservation"],
  ["/adopt", "/programs/conservation/adopt"],

  // Nama halaman yang lazim dipakai situs sebelumnya
  ["/home", "/"],
  ["/about-us", "/about"],
  ["/our-founder", "/about/founder"],
  ["/founder", "/about/founder"],
  ["/willie-smits", "/about/founder"],
  ["/our-story", "/about/story"],
  ["/history", "/about/story"],
  ["/our-vision", "/about/vision"],
  ["/vision", "/about/vision"],
  ["/mission", "/about/vision"],
  ["/our-sites", "/about/sites"],
  ["/locations", "/about/sites"],
  ["/our-partners", "/about/partners"],
  ["/partners", "/about/partners"],
  ["/our-programs", "/programs"],
  ["/projects", "/programs"],
  ["/restoration", "/programs/restoration"],
  ["/reforestation", "/programs/restoration"],
  ["/temboan", "/programs/restoration"],
  ["/conservation", "/programs/conservation"],
  ["/tasikoki", "/programs/conservation"],
  ["/pps-tasikoki", "/programs/conservation"],
  ["/wildlife", "/programs/conservation"],
  ["/sea-turtle", "/programs/conservation"],
  ["/education", "/programs/education"],
  ["/titik-tumbuh", "/programs/education"],
  ["/adopt-an-animal", "/programs/conservation/adopt"],
  ["/volunteer", "/get-involved/volunteer"],
  ["/volunteers", "/get-involved/volunteer"],
  ["/join-us", "/get-involved/volunteer"],
  ["/become-a-partner", "/get-involved/partner"],
  ["/contact", "/get-involved"],
  ["/contact-us", "/get-involved"],
  ["/donate", "/support"],
  ["/donation", "/support"],
  ["/give", "/support"],
  ["/support-us", "/support"],
  ["/shop", "/support/merchandise"],
  ["/merchandise", "/support/merchandise"],
  ["/news", "/updates"],
  ["/blog", "/updates"],
  ["/reports", "/updates"],
];
