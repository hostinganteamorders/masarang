import Link from "next/link";
import { common } from "@/content/common";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { mailto } from "@/lib/mailto";
import { localePath, type Locale } from "@/lib/i18n";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";
import { Ph } from "./Ph";
import { Ribbon } from "./Ribbon";
import s from "./SiteFooter.module.css";

const QUICK = [
  { key: "programs", path: "/programs" },
  { key: "reports", path: "/updates" },
  { key: "partners", path: "/about/partners" },
  { key: "involved", path: "/get-involved" },
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
  const waDigits = site.whatsapp.v.replace(/\D/g, "");

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
            {QUICK.map(({ key, path }) => (
              <li key={key}>
                <Link href={localePath(locale, path)}>{c.footer.quick[key]}</Link>
              </li>
            ))}
            <li>
              <a href={mailto(locale, "contact")}>{c.footer.quick.contact}</a>
            </li>
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
            <Logo className={s.contactLogo} />
            <span>{site.address[locale]}</span>
            <a href={mailto(locale, "contact")}>
              <Ph on={site.email.ph}>{c.footer.emailUs}</Ph>
            </a>
            <span>{site.email.v}</span>
            <a href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer">
              <Ph on={site.whatsapp.ph}>{c.footer.whatsappUs}</Ph>
            </a>
          </address>
          <p className={s.colTitle} style={{ marginTop: "1.25rem" }}>
            {c.footer.social}
          </p>
          <ul className={s.list}>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {site.social.instagramHandle}
                <span className="sr-only"> ({c.externalNote})</span>
              </a>
            </li>
            <li>
              {site.social.linkedin ? (
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn {site.social.linkedinName}
                  <span className="sr-only"> ({c.externalNote})</span>
                </a>
              ) : (
                <>LinkedIn {site.social.linkedinName}</>
              )}
            </li>
          </ul>
          <p className={s.colTitle} style={{ marginTop: "1.25rem" }}>
            {c.footer.network}
          </p>
          <ul className={s.list}>
            <li>Masarang EU</li>
          </ul>
        </div>
      </div>

      <Ribbon height={10} />

      <div className={`container ${s.bottom}`}>
        <span>
          {fill(c.footer.rights, { year })} · {c.footer.legal} · NPWP {site.legal.npwp} · <Ph on>{c.footer.privacy}</Ph>
        </span>
        <span>{fill(c.footer.lastUpdated, { date: fullDate(site.lastUpdated, locale) })}</span>
      </div>
    </footer>
  );
}
