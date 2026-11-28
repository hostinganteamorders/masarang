"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { common } from "@/content/common";
import { armIntroFallback, leaveIntro, playIntro } from "@/lib/intro";
import type { Locale } from "@/lib/i18n";
import { MENU_INTRO, barePath } from "@/lib/menuIntro";
import s from "./Intro.module.css";

/**
 * Salam pembukaan: lambang, sapaan, lalu seluruh lapisan memudar membuka situs. Diputar ulang saat Home atau logo ditekan (`HomeLink`). Diputar sekali per sesi (keputusan diambil
 * oleh skrip kecil di `layout` sebelum cat pertama, lewat kelas `intro-on` pada <html>). Tanpa kelas itu
 * (dikunjungi lagi, gerak dikurangi, JavaScript mati) seluruh bagian ini tersembunyi.
 * Tiap menu di navbar punya intro serupa yang lebih singkat (lambang, nama menu, satu kalimat pengantar) dan diputar setiap kali
 * menu itu dibuka (`MENU_INTRO`). Bisa dilewati dengan klik, tombol Lewati, atau tombol apa pun di papan ketik.
 */
export function Intro({ locale }: { locale: Locale }) {
  const c = common[locale];
  const t = c.intro;
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const bare = barePath(pathname);
  const menu = MENU_INTRO[bare];
  const lastPath = useRef(pathname);

  // Pindah halaman tanpa muat ulang: putar intro menu yang dibuka. (Muat awal diputuskan oleh skrip di layout.)
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (menu) playIntro({ restart: true });
  }, [pathname, menu]);

  useEffect(() => {
    const skip = () => {
      const el = root.current;
      if (!el || !document.documentElement.classList.contains("intro-on")) return;
      el.dataset.skip = "";
    };
    // Intro muat awal dipasang oleh skrip di layout; pasang cadangannya di sini.
    if (document.documentElement.classList.contains("intro-on")) armIntroFallback();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  return (
    <div
      ref={root}
      data-intro=""
      data-kind={menu ? "menu" : "home"}
      className={s.root}
      onClick={(event) => {
        if (root.current) root.current.dataset.skip = "";
        event.stopPropagation();
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) leaveIntro();
      }}
    >
      <div className={s.center}>
        <Image src="/brand/masarang-emblem.png" alt="" width={213} height={245} className={s.emblem} priority />
        {menu ? (
          <>
            <p className={s.greeting} lang={locale}>
              <span className={s.greetingText}>{c.nav[menu.nav]}</span>
            </p>
            <span className={s.rule} aria-hidden="true" />
            <p className={s.tagline}>{t.menus[menu.key]}</p>
          </>
        ) : (
          <>
            <p className={s.greeting} lang={locale}>
              <span className={s.greetingText}>{t.greeting}</span>
            </p>
            <span className={s.rule} aria-hidden="true" />
            <p className={s.name}>
              {t.name}
              <span className={s.place}>{t.place}</span>
            </p>
          </>
        )}
      </div>
      <button type="button" className={s.skip}>
        {t.skip}
      </button>
    </div>
  );
}
