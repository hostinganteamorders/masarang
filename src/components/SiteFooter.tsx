import Link from "next/link";
import { common } from "@/content/common";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";
import { Ph } from "./Ph";
import { Ribbon } from "./Ribbon";
import s from "./SiteFooter.module.css";

const EXPLORE = ["about", "team", "adopt", "transparency", "updates"] as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const c = common[locale];
  const year = site.lastUpdated.slice(0, 4);

  return (
    <footer className={`${s.footer} on-dark`}>
      <div className={`container ${s.top}`}>
        <div className={s.brandCol}>
          <Link href={localePath(locale)} className={s.brand} aria-label={c.nav.homeLabel}>
            <Logo className={s.logo} />
          </Link>
          <p className={s.tagline}>{c.footer.tagline}</p>
        </div>

        <nav aria-label={c.footer.explore}>
          <p className={s.colTitle}>{c.footer.explore}</p>
          <ul className={s.list}>
            {EXPLORE.map((key) => (
              <li key={key}>
                <Link href={localePath(locale, `/${key}`)}>{c.nav[key]}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={c.footer.programs}>
          <p className={s.colTitle}>{c.footer.programs}</p>
          <ul className={s.list}>
            <li>
              <Link href={localePath(locale, "/programs/temboan")}>{c.sites.temboan}</Link>
            </li>
            <li>
              <Link href={localePath(locale, "/programs/tasikoki")}>{c.sites.tasikoki}</Link>
            </li>
            <li>
              <Link href={localePath(locale, "/support")}>{c.footer.support}</Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className={s.colTitle}>{c.footer.contact}</p>
          <address className={s.address}>
            <span>{site.name}</span>
            <span>{site.address[locale]}</span>
            <a href={`mailto:${site.email.v}`}>
              <Ph on={site.email.ph}>{site.email.v}</Ph>
            </a>
          </address>
        </div>
      </div>

      <div className={s.wordmark} aria-hidden="true">
        Masarang
      </div>

      <Ribbon height={10} />

      <div className={`container ${s.bottom}`}>
        <span>{fill(c.footer.rights, { year })}</span>
        <span>{fill(c.footer.lastUpdated, { date: fullDate(site.lastUpdated, locale) })}</span>
      </div>
    </footer>
  );
}
