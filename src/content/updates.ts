import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Field updates",
    description:
      "What happened on the ground at Temboan and Tasikoki. Each entry names the evidence behind it.",
  },
  hero: {
    title: "What happened on the ground",
    lede: "Each entry names the evidence behind it, so you can ask to see it.",
  },
  list: "Field updates",
  filterLabel: "Filter by site",
  all: "All",
  mailSubject: "Evidence request: {title}",
  count: "{n} entries",
  empty: "No entries for this site yet.",
};

const id: typeof en = {
  meta: {
    title: "Kabar lapangan",
    description:
      "Apa yang terjadi di lapangan di Temboan dan Tasikoki. Setiap catatan menyebutkan bukti pendukungnya.",
  },
  hero: {
    title: "Apa yang terjadi di lapangan",
    lede: "Setiap catatan menyebutkan bukti pendukungnya, sehingga Anda dapat memintanya.",
  },
  list: "Kabar lapangan",
  filterLabel: "Saring menurut lokasi",
  all: "Semua",
  mailSubject: "Permintaan bukti: {title}",
  count: "{n} catatan",
  empty: "Belum ada catatan untuk lokasi ini.",
};

export const updatesCopy: Record<Locale, typeof en> = { en, id };
