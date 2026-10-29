import { common } from "@/content/common";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import { NewsletterForm } from "./NewsletterForm";
import s from "./Newsletter.module.css";

/** Pita berlangganan di atas kaki situs. */
export function NewsletterBand({ locale }: { locale: Locale }) {
  const copy = common[locale].newsletter;
  return (
    <section className={`${s.band} on-conservation`} aria-labelledby="newsletter-title">
      <div className={`container ${s.inner}`}>
        <div>
          <h2 id="newsletter-title" className={s.title}>
            {copy.title}
          </h2>
          <p className={s.body}>{copy.body}</p>
        </div>
        <NewsletterForm copy={copy} to={site.email.v} />
      </div>
    </section>
  );
}
