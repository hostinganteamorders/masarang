import { giving } from "@/data/organisation";
import { idrAuto } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./GivingCards.module.css";

/** Dua pilihan donasi yang spesifik: satu hektare atau perawatan satu satwa. */
export function GivingCards({ locale }: { locale: Locale }) {
  return (
    <div className={s.cards}>
      {giving.map((g) => (
        <article key={g.id} className={s.card}>
          <p className={`num ${s.amount}`}>
            <Ph on={g.ph}>{idrAuto(g.amount, locale)}</Ph>
          </p>
          <h3 className={s.title}>{g.title[locale]}</h3>
          <p className={s.body}>{g.body[locale]}</p>
        </article>
      ))}
    </div>
  );
}
