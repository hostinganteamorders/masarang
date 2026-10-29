import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@/content/home";
import { keyFigures } from "@/data/programs";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { common } from "@/content/common";
import { fill, fullDate, num, pct } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import { Ph } from "../Ph";
import s from "./Hero.module.css";

export function Hero({ locale }: { locale: Locale }) {
  const t = home[locale];
  const c = common[locale];
  const kf = keyFigures;
  const photo = photos.hero;

  const figures = [
    { key: "site", label: t.figures.labels.site, node: <>{num(kf.siteHa.v, locale)}<span className={s.unit}>{c.labels.ha}</span></>, ph: kf.siteHa.ph },
    { key: "trees", label: t.figures.labels.trees, node: num(kf.treesPlanted.v, locale), ph: kf.treesPlanted.ph },
    { key: "survival", label: t.figures.labels.survival, node: pct(kf.survival.v, locale), ph: kf.survival.ph },
    { key: "rescued", label: t.figures.labels.rescued, node: num(kf.rescued.v, locale), ph: kf.rescued.ph },
    { key: "overhead", label: t.figures.labels.overhead, node: pct(kf.overhead.v, locale), ph: kf.overhead.ph },
  ];

  return (
    <section className={`${s.hero} on-dark`} aria-labelledby="hero-title">
      {/* Foto penuh: dekoratif, maknanya sudah ada di judul. Sisi kiri digelapkan agar teks terbaca. */}
      <div className={s.photo} style={{ ["--c" as string]: photo.color } as CSSProperties} aria-hidden="true">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          preload
          className={s.image}
          style={{ objectPosition: photo.focus }}
        />
      </div>

      <div className={`container ${s.content}`}>
        <p className={s.place}>
          <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" focusable="false">
            <path d="M8 0a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 8 4.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" />
          </svg>
          {t.hero.place}
        </p>
        <h1 id="hero-title" className={s.title}>
          {t.hero.title}
        </h1>
        <p className={`lede ${s.lede}`}>{t.hero.lede}</p>
        <div className={s.actions}>
          <Link href={localePath(locale, "/transparency")} className="btn">
            {t.hero.ctaMoney}
          </Link>
          <Link href={localePath(locale, "/updates")} className="btn btn--ghost">
            {t.hero.ctaUpdates}
          </Link>
        </div>
      </div>

      <div className={s.figures}>
        <div className="container">
          <p className={`meta ${s.figuresHead}`}>
            <span>{t.figures.title}</span>
            <span>{fill(c.labels.asOf, { date: fullDate(site.lastUpdated, locale) })}</span>
          </p>
          <dl className={s.grid}>
            {figures.map((f) => (
              <div key={f.key} className={s.figure}>
                <dt className={s.label}>{f.label}</dt>
                <dd className={`num ${s.value}`}>
                  <Ph on={f.ph}>{f.node}</Ph>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
