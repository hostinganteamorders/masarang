"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { common } from "@/content/common";
import type { Locale } from "@/lib/i18n";
import s from "./Intro.module.css";

const leave = () => document.documentElement.classList.remove("intro-on");

/**
 * Salam pembukaan: lambang, sapaan, lalu seluruh lapisan memudar membuka situs. Diputar ulang saat Home atau logo ditekan (`HomeLink`). Diputar sekali per sesi (keputusan diambil
 * oleh skrip kecil di `layout` sebelum cat pertama, lewat kelas `intro-on` pada <html>). Tanpa kelas itu
 * (dikunjungi lagi, gerak dikurangi, JavaScript mati) seluruh bagian ini tersembunyi.
 * Bisa dilewati dengan klik, tombol Lewati, atau tombol apa pun di papan ketik.
 */
export function Intro({ locale }: { locale: Locale }) {
  const t = common[locale].intro;
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skip = () => {
      const el = root.current;
      if (!el || !document.documentElement.classList.contains("intro-on")) return;
      el.dataset.skip = "";
    };
    // Cadangan bila peristiwa animasi tidak datang (mis. tab di latar belakang).
    const fallback = window.setTimeout(leave, 5000);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <div
      ref={root}
      data-intro=""
      className={s.root}
      onClick={(event) => {
        if (root.current) root.current.dataset.skip = "";
        event.stopPropagation();
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) leave();
      }}
    >
      <div className={s.center}>
        <Image src="/brand/masarang-emblem.png" alt="" width={213} height={245} className={s.emblem} priority />
        <p className={s.greeting} lang={locale}>
          <span className={s.greetingText}>{t.greeting}</span>
        </p>
        <span className={s.rule} aria-hidden="true" />
        <p className={s.name}>
          {t.name}
          <span className={s.place}>{t.place}</span>
        </p>
      </div>
      <button type="button" className={s.skip}>
        {t.skip}
      </button>
    </div>
  );
}
