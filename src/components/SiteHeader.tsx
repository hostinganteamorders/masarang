"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Common } from "@/content/common";
import { localePath, type Locale } from "@/lib/i18n";
import { LangSwitch } from "./LangSwitch";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";
import s from "./SiteHeader.module.css";

/** `path` kosong = judul kelompok (bukan tautan). `children` dua tingkat: dipakai "Support our work". */
type Leaf = { key: keyof Common["nav"]; path?: string; children?: Leaf[] };
type Item = Leaf & { path: string };

/** Menu utama: Home, Tentang (dropdown), Program (dropdown), Terlibat (dropdown), Kabar. Donasi ada sebagai tombol terpisah. */
const ITEMS: Item[] = [
  { key: "home", path: "" },
  {
    key: "about",
    path: "/about",
    children: [
      { key: "aboutFounder", path: "/about/founder" },
      { key: "aboutStory", path: "/about/story" },
      { key: "aboutVision", path: "/about/vision" },
      { key: "aboutSites", path: "/about/sites" },
      { key: "aboutPartners", path: "/about/partners" },
    ],
  },
  {
    key: "programs",
    path: "/programs",
    children: [
      { key: "restoration", path: "/programs/restoration" },
      { key: "conservation", path: "/programs/conservation" },
      { key: "education", path: "/programs/education" },
    ],
  },
  {
    key: "involved",
    path: "/get-involved",
    children: [
      { key: "involvedAdopt", path: "/programs/conservation/adopt" },
      {
        key: "involvedSupport",
        children: [
          { key: "involvedDonation", path: "/support" },
          { key: "involvedMerch", path: "/support/merchandise" },
        ],
      },
      { key: "involvedPartner", path: "/get-involved/partner" },
      { key: "involvedVolunteer", path: "/get-involved/volunteer" },
    ],
  },
  { key: "updates", path: "/updates" },
];

export function SiteHeader({ locale, nav }: { locale: Locale; nav: Common["nav"] }) {
  const pathname = usePathname();
  const sheet = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  const isActive = (path: string) => {
    const full = localePath(locale, path);
    if (path === "") return pathname === full;
    if (path === "/programs") return pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  };
  /** Induk menu aktif bila halaman ada di bawahnya. */
  const isActiveItem = (item: Item) =>
    item.key === "programs"
      ? pathname.startsWith(`${localePath(locale, "/programs")}`) && !isActive("/programs/conservation/adopt")
      : item.key === "involved"
        ? isActive("/get-involved") || isActive("/programs/conservation/adopt") || isActive("/support")
        : isActive(item.path);

  // Menutup dropdown: pindah halaman, Esc, klik di luar.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(null);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        navRef.current?.querySelector<HTMLButtonElement>(`[data-toggle="${open}"]`)?.focus();
      }
    };
    const onDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const closeSheet = () => sheet.current?.close();

  return (
    <header className={`${s.header} on-dark`}>
      <div className={`container ${s.bar}`}>
        <HomeLink href={localePath(locale)} className={s.brand} aria-label={nav.homeLabel}>
          <Logo className={s.logo} />
        </HomeLink>

        <nav ref={navRef} className={s.nav} aria-label={nav.main}>
          <ul>
            {ITEMS.map((item) => {
              const href = localePath(locale, item.path);
              const current = isActiveItem(item);
              if (!item.children) {
                return (
                  <li key={item.key}>
                    {item.key === "home" ? (
                      <HomeLink href={href} className={s.link} aria-current={current ? "page" : undefined}>
                        {nav[item.key]}
                      </HomeLink>
                    ) : (
                      <Link href={href} className={s.link} aria-current={current ? "page" : undefined}>
                        {nav[item.key]}
                      </Link>
                    )}
                  </li>
                );
              }
              const expanded = open === item.key;
              return (
                <li
                  key={item.key}
                  className={s.group}
                  onMouseEnter={() => setOpen(item.key)}
                  onMouseLeave={() => setOpen((o) => (o === item.key ? null : o))}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setOpen((o) => (o === item.key ? null : o));
                    }
                  }}
                >
                  <Link href={href} className={s.link} aria-current={current ? "page" : undefined}>
                    {nav[item.key]}
                  </Link>
                  <button
                    type="button"
                    className={s.chevron}
                    data-toggle={item.key}
                    aria-expanded={expanded}
                    aria-controls={`menu-${item.key}`}
                    aria-label={nav.submenu.replace("{name}", nav[item.key])}
                    onClick={() => setOpen(expanded ? null : item.key)}
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
                      <path d="m1 1.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <ul id={`menu-${item.key}`} className={s.panel} hidden={!expanded}>
                    {item.children.map((child) => (
                      <li key={child.key}>
                        {child.path ? (
                          <Link href={localePath(locale, child.path)} className={s.panelLink} onClick={() => setOpen(null)}>
                            {nav[child.key]}
                          </Link>
                        ) : (
                          <>
                            <span className={s.panelHeading}>{nav[child.key]}</span>
                            <ul className={s.panelNested}>
                              {child.children?.map((sub) => (
                                <li key={sub.key}>
                                  <Link href={localePath(locale, sub.path!)} className={s.panelLink} onClick={() => setOpen(null)}>
                                    {nav[sub.key]}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
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
          <HomeLink
            href={localePath(locale)}
            className={s.brand}
            aria-label={nav.homeLabel}
            onClick={closeSheet}
          >
            <Logo className={s.logo} />
          </HomeLink>
          <button type="button" className={s.menuButton} onClick={closeSheet}>
            {nav.closeMenu}
          </button>
        </div>
        <nav className={`container ${s.sheetNav}`} aria-label={nav.main}>
          <ul>
            {ITEMS.map((item) => (
              <li key={item.key}>
                {(() => {
                  const LinkTag = item.key === "home" ? HomeLink : Link;
                  return (
                    <LinkTag
                      href={localePath(locale, item.path)}
                      className={s.sheetLink}
                      aria-current={isActiveItem(item) ? "page" : undefined}
                      onClick={closeSheet}
                    >
                      {nav[item.key]}
                    </LinkTag>
                  );
                })()}
                {item.children && (
                  <ul className={s.sheetSub}>
                    {item.children.map((child) => (
                      <li key={child.key}>
                        {child.path ? (
                          <Link href={localePath(locale, child.path)} className={s.sheetSubLink} onClick={closeSheet}>
                            {nav[child.key]}
                          </Link>
                        ) : (
                          <>
                            <span className={s.sheetSubHeading}>{nav[child.key]}</span>
                            <ul className={s.sheetNested}>
                              {child.children?.map((sub) => (
                                <li key={sub.key}>
                                  <Link href={localePath(locale, sub.path!)} className={s.sheetSubLink} onClick={closeSheet}>
                                    {nav[sub.key]}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
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
