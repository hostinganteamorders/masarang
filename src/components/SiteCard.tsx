import Link from "next/link";
import type { ReactNode } from "react";
import { common } from "@/content/common";
import { sites } from "@/content/sites";
import { tasikoki, temboan } from "@/data/programs";
import { photos } from "@/data/photos";
import { programColor } from "@/data/site";
import { num, pct } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import { Photo } from "./Photo";
import s from "./SiteCard.module.css";

type Stat = { label: string; node: ReactNode; ph?: boolean };

/** Kartu lokasi (Temboan atau Tasikoki) dengan tiga angka utama. */
export function SiteCard({
  locale,
  id,
  tone = "dark",
}: {
  locale: Locale;
  id: "temboan" | "tasikoki";
  tone?: "dark" | "light";
}) {
  const t = sites[locale];
  const c = common[locale];

  let stats: Stat[];
  let fullName: string | undefined;
  let info: { name: string; place: string; teaser: string; cta: string };

  if (id === "temboan") {
    info = t.temboan;
    stats = [
      {
        label: t.temboan.stats.area,
        node: (
          <>
            {num(temboan.areaHa.v, locale)}
            <span className={s.unit}>{c.labels.ha}</span>
          </>
        ),
        ph: temboan.areaHa.ph,
      },
      { label: t.temboan.stats.planted, node: num(temboan.treesPlanted.v, locale), ph: temboan.treesPlanted.ph },
      { label: t.temboan.stats.survival, node: pct(temboan.survival.v, locale), ph: temboan.survival.ph },
    ];
  } else {
    info = t.tasikoki;
    fullName = t.tasikoki.fullName;
    stats = [
      { label: t.tasikoki.stats.inCare, node: num(tasikoki.inCare.v, locale), ph: tasikoki.inCare.ph },
      { label: t.tasikoki.stats.released, node: num(tasikoki.released.v, locale), ph: tasikoki.released.ph },
      { label: t.tasikoki.stats.students, node: num(tasikoki.students.v, locale), ph: tasikoki.students.ph },
    ];
  }

  return (
    <article
      className={`${s.card} ${tone === "dark" ? s.dark : s.light}`}
      style={{ ["--site" as string]: id === "temboan" ? programColor.temboan : programColor.tasikoki }}
    >
      <Photo
        pic={photos.sites[id]}
        locale={locale}
        ratio="16 / 10"
        sizes="(max-width: 62rem) 100vw, 50vw"
        className={s.photo}
      />
      <div className={s.body}>
        <p className={s.place}>{info.place}</p>
        <h3 className={s.name}>{info.name}</h3>
        {fullName && <p className={s.fullName}>{fullName}</p>}
        <p className={s.teaser}>{info.teaser}</p>
        <dl className={s.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={s.stat}>
              <dt>{stat.label}</dt>
              <dd className={`num ${s.value}`}>
                <Ph on={stat.ph}>{stat.node}</Ph>
              </dd>
            </div>
          ))}
        </dl>
        <Link href={localePath(locale, `/programs/${id}`)} className="btn">
          {info.cta}
        </Link>
      </div>
    </article>
  );
}
