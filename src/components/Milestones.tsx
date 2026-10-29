import { common } from "@/content/common";
import type { Milestone } from "@/data/programs";
import type { Locale } from "@/lib/i18n";
import s from "./Milestones.module.css";

/** Daftar pencapaian dengan status Berjalan / Direncanakan / Selesai. */
export function Milestones({ items, locale }: { items: Milestone[]; locale: Locale }) {
  const c = common[locale];
  return (
    <ul className={s.list}>
      {items.map((m) => (
        <li key={m.id} className={s.item}>
          <span className={s.status} data-status={m.status}>
            <span className={s.dot} aria-hidden="true" />
            {c.status[m.status]}
          </span>
          <span className={s.label}>{m.label[locale]}</span>
        </li>
      ))}
    </ul>
  );
}
