"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import type { Common } from "@/content/common";
import { localePath, type Locale } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";
import s from "./SiteHeader.module.css";

const ITEMS = [
  { key: "about", path: "/about" },
  { key: "team", path: "/team" },
  { key: "programs", path: "/programs" },
  { key: "adopt", path: "/adopt" },
  { key: "transparency", path: "/transparency" },
  { key: "updates", path: "/updates" },
] as const;

export function SiteHeader({ locale, nav }: { locale: Locale; nav: Common["nav"] }) {
  const pathname = usePathname();
  const sheet = useRef<HTMLDialogElement>(null);

  const isActive = (path: string) => {
    const full = localePath(locale, path);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const closeSheet = () => sheet.current?.close();

  return (
    <header className={`${s.header} on-dark`}>
      <div className={`container ${s.bar}`}>
        <Link href={localePath(locale)} className={s.brand} aria-label={nav.homeLabel}>
          <Logo className={s.logo} />
        </Link>

        <nav className={s.nav} aria-label={nav.main}>
          <ul>
            {ITEMS.map(({ key, path }) => (
              <li key={key}>
                <Link
                  href={localePath(locale, path)}
                  className={s.link}
                  aria-current={isActive(path) ? "page" : undefined}
                >
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <LangSwitch locale={locale} label={nav.language} compact />
          <Link href={localePath(locale, "/support")} className={`btn btn--small ${s.donate}`}>
            {nav.donate}
          </Link>
          <button
            type="button"
            className={s.menuButton}
            aria-haspopup="dialog"
            onClick={() => sheet.current?.showModal()}
          >
            {nav.menu}
          </button>
        </div>
      </div>

      <dialog
        ref={sheet}
        className={`${s.sheet} on-dark`}
        aria-label={nav.menu}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSheet();
        }}
      >
        <div className={`container ${s.sheetBar}`}>
          <Link
            href={localePath(locale)}
            className={s.brand}
            aria-label={nav.homeLabel}
            onClick={closeSheet}
          >
            <Logo className={s.logo} />
          </Link>
          <button type="button" className={s.menuButton} onClick={closeSheet}>
            {nav.closeMenu}
          </button>
        </div>
        <nav className={`container ${s.sheetNav}`} aria-label={nav.main}>
          <ul>
            {ITEMS.map(({ key, path }) => (
              <li key={key}>
                <Link
                  href={localePath(locale, path)}
                  className={s.sheetLink}
                  aria-current={isActive(path) ? "page" : undefined}
                  onClick={closeSheet}
                >
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
          <div className={s.sheetActions}>
            <Link
              href={localePath(locale, "/support")}
              className="btn"
              onClick={closeSheet}
            >
              {nav.donate}
            </Link>
            <LangSwitch locale={locale} label={nav.language} />
          </div>
        </nav>
      </dialog>
    </header>
  );
}
