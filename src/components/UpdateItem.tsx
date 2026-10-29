import { common } from "@/content/common";
import { updatesCopy } from "@/content/updates";
import type { FieldUpdate } from "@/data/updates";
import { site } from "@/data/site";
import { fill, monthYear } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./UpdateItem.module.css";

/** Satu catatan lapangan: tanggal, lokasi, judul, isi, dan bukti yang dapat diminta pembaca. */
export function UpdateItem({ item, locale }: { item: FieldUpdate; locale: Locale }) {
  const c = common[locale];
  const title = item.title[locale];
  const mail = `mailto:${site.email.v}?subject=${encodeURIComponent(
    fill(updatesCopy[locale].mailSubject, { title }),
  )}`;

  return (
    <article className={s.item}>
      <p className={`num ${s.date}`}>{monthYear(item.date, locale)}</p>
      <div className={s.body}>
        <p className={s.tag} data-site={item.site}>
          <span className={s.dot} aria-hidden="true" />
          {c.sites[item.site]}
        </p>
        <h3 className={s.title}>
          <Ph on={item.ph}>{title}</Ph>
        </h3>
        <p className={s.text}>{item.body[locale]}</p>
      </div>
      <div className={s.evidence}>
        <p className={s.evLabel}>{c.labels.evidence}</p>
        <p className={s.evText}>{item.evidence[locale]}</p>
        <a href={mail} className="btn btn--ghost btn--small">
          {c.labels.askEvidence}
        </a>
      </div>
    </article>
  );
}
