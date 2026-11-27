import Link from "next/link";
import { home } from "@/content/home";
import { apingVideo } from "@/data/media";
import { localePath, type Locale } from "@/lib/i18n";
import { VideoSlot } from "../VideoSlot";
import s from "./Hero.module.css";

export function Hero({ locale }: { locale: Locale }) {
  const t = home[locale];
  return (
    <section className={`${s.hero} on-dark`} aria-labelledby="hero-title">
      <div className={`container ${s.content}`}>
        <p className={s.place}>
          <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" focusable="false">
            <path d="M8 0a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 8 4.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" />
          </svg>
          {t.hero.place}
        </p>
        <div className={s.head}>
          <h1 id="hero-title" className={s.title}>
            {t.hero.title}
          </h1>
          <div className={s.side}>
            <p className={`lede ${s.lede}`}>{t.hero.lede}</p>
            <div className={s.actions}>
              <Link href={localePath(locale, "/programs")} className="btn">
                {t.hero.ctaPrograms}
              </Link>
              <Link href={localePath(locale, "/support")} className="btn btn--ghost">
                {t.hero.ctaSupport}
              </Link>
            </div>
          </div>
        </div>
        {/* Video besar tepat di bawah slogan. */}
        <VideoSlot url={apingVideo.url} poster={apingVideo.poster} title={apingVideo.title[locale]} locale={locale} className={s.video} autoplay />
      </div>

    </section>
  );
}
