import Link from "next/link";
import { common } from "@/content/common";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";
import { Ph } from "./Ph";
import { Ribbon } from "./Ribbon";
import s from "./SiteFooter.module.css";

const EXPLORE = [
  { key: "about", path: "/about" },
  { key: "team", path: "/about/team" },
  { key: "updates", path: "/updates" },
  { key: "transparency", path: "/transparency" },
] as const;

const PROGRAMS = [
  { key: "restoration", path: "/programs/restoration" },
  { key: "conservation", path: "/programs/conservation" },
  { key: "education", path: "/programs/education" },
  { key: "adopt", path: "/programs/conservation/adopt" },
] as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const c = common[locale];
  const year = site.lastUpdated.slice(0, 4);

  return (
    <footer className={`${s.footer} on-dark`}>
      <div className={`container ${s.top}`}>
        <div className={s.brandCol}>
          <HomeLink href={localePath(locale)} className={s.brand} aria-label={c.nav.homeLabel}>
            <Logo className={s.logo} />
          </HomeLink>
          <p className={s.tagline}>{c.footer.tagline}</p>
        </div>

        <nav aria-label={c.footer.explore}>
          <p className={s.colTitle}>{c.footer.explore}</p>
          <ul className={s.list}>
            {EXPLORE.map(({ key, path }) => (
              <li key={key}>
                <Link href={localePath(locale, path)}>{c.nav[key]}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={c.footer.programs}>
          <p className={s.colTitle}>{c.footer.programs}</p>
          <ul className={s.list}>
            {PROGRAMS.map(({ key, path }) => (
              <li key={key}>
                <Link href={localePath(locale, path)}>{c.nav[key]}</Link>
              </li>
            ))}
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
