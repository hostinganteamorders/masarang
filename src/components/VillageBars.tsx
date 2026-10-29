import { num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./VillageBars.module.css";

export type VillageCount = { id: string; name: string; trees: number };

/** Batang horizontal pohon kelapa per desa. Skala mulai dari nol; nilai ditulis langsung di ujung batang. */
export function VillageBars({
  villages,
  total,
  title,
  totalLabel,
  source,
  locale,
}: {
  villages: VillageCount[];
  total: number;
  title: string;
  totalLabel: string;
  source: string;
  locale: Locale;
}) {
  const max = Math.max(...villages.map((v) => v.trees));
  return (
    <figure className={s.fig}>
      <figcaption className={s.title}>{title}</figcaption>
      <ul className={s.list}>
        {villages.map((v) => (
          <li key={v.id} className={s.row}>
            <span className={s.name}>{v.name}</span>
            <span className={s.track} aria-hidden="true">
              <span className={s.bar} style={{ width: `${(v.trees / max) * 100}%` }} />
            </span>
            <span className={`num ${s.value}`}>{num(v.trees, locale)}</span>
          </li>
        ))}
      </ul>
      <p className={s.total}>
        <span>{totalLabel}</span>
        <span className={`num ${s.totalValue}`}>{num(total, locale)}</span>
      </p>
      <p className={s.source}>{source}</p>
    </figure>
  );
}
