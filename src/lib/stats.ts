import { common } from "@/content/common";
import { home } from "@/content/home";
import type { StatItem } from "@/components/StatRow";
import { keyFigures } from "@/data/programs";
import { num, pct } from "./format";
import type { Locale } from "./i18n";

/** Lima angka utama yayasan (sama dengan beranda), siap dipakai StatRow. */
export function keyStats(locale: Locale): StatItem[] {
  const labels = home[locale].figures.labels;
  const c = common[locale];
  return [
    { label: labels.site, value: num(keyFigures.siteHa.v, locale), unit: c.labels.ha, ph: keyFigures.siteHa.ph },
    { label: labels.trees, value: num(keyFigures.treesPlanted.v, locale), ph: keyFigures.treesPlanted.ph },
    { label: labels.survival, value: pct(keyFigures.survival.v, locale), ph: keyFigures.survival.ph },
    { label: labels.rescued, value: num(keyFigures.rescued.v, locale), ph: keyFigures.rescued.ph },
    { label: labels.overhead, value: pct(keyFigures.overhead.v, locale), ph: keyFigures.overhead.ph },
  ];
}
