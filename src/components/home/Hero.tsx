import Link from "next/link";
import { home } from "@/content/home";
import { keyFigures } from "@/data/programs";
import { apingVideo } from "@/data/media";
import { site } from "@/data/site";
import { common } from "@/content/common";
import { fill, fullDate, num, pct } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import { Ph } from "../Ph";
import { VideoSlot } from "../VideoSlot";
import s from "./Hero.module.css";

export function Hero({ locale }: { locale: Locale }) {
  const t = home[locale];
  const c = common[locale];
  const kf = keyFigures;
  const unit = (text: string) => <span className={s.unit}>{text}</span>;

  const figures = [
    { key: "conservation", label: t.figures.labels.conservation, node: <>{num(kf.conservationHa.v, locale)}{unit(c.labels.ha)}</>, ph: kf.conservationHa.ph },
    { key: "temboan", label: t.figures.labels.restoredTemboan, node: <>{num(kf.restoredTemboanHa.v, locale)}{unit(c.labels.ha)}</>, ph: kf.restoredTemboanHa.ph },
    { key: "other", label: t.figures.labels.restoredOther, node: <>{num(kf.restoredOtherHa.v, locale)}+{unit(c.labels.ha)}</>, ph: kf.restoredOtherHa.ph },
    { key: "farmers", label: t.figures.labels.farmers, node: num(kf.farmers.v, locale), ph: kf.farmers.ph },
    { key: "income", label: t.figures.labels.income, node: pct(kf.incomeIncreasePct.v, locale), ph: kf.incomeIncreasePct.ph },
  ];

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
              <Link href={localePath(locale, "/updates")} className="btn btn--ghost">
                {t.hero.ctaUpdates}
              </Link>
            </div>
          </div>
        </div>
        {/* Video besar tepat di bawah slogan. */}
        <VideoSlot url={apingVideo.url} title={apingVideo.title[locale]} locale={locale} className={s.video} />
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
