import { home } from "@/content/home";
import { finance, moneyOut } from "@/data/finance";
import { fill, idrMillions } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./MoneyRibbon.module.css";

/** Teks gelap pada segmen warna program dan abu-abu tengah; segmen biaya operasional (abu-abu tua) bertulisan terang. */
const DARK_TEXT = new Set(["temboan", "tasikoki", "education", "monitoring"]);

/** Pita rupiah besar: lima segmen sebesar porsi belanja, dengan legenda rinci di bawahnya. */
export function MoneyRibbon({ locale }: { locale: Locale }) {
  const t = home[locale].money;

  return (
    <figure className={s.ribbon}>
      <div
        className={s.bar}
        role="img"
        aria-label={fill(t.ribbonLabel, { year: finance.year })}
      >
        {moneyOut.map((item) => (
          <span
            key={item.id}
            className={s.segment}
            data-dark={DARK_TEXT.has(item.id)}
            style={{ flex: `${item.share} 0 0`, background: item.color }}
          >
            <span className={`num ${s.pct}`}>
              <Ph on={finance.ph}>{item.share}%</Ph>
            </span>
          </span>
        ))}
      </div>

      <ul className={s.legend}>
        {moneyOut.map((item) => (
          <li key={item.id} style={{ ["--c" as string]: item.color }}>
            <span className={s.name}>{item.label[locale]}</span>
            <span className={`num ${s.amount}`}>
              <Ph on={finance.ph}>{idrMillions(item.millions, locale)}</Ph>
            </span>
            <span className={s.share}>
              <Ph on={finance.ph}>{item.share}%</Ph> {t.of}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
