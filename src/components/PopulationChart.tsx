"use client";

import { useState } from "react";
import type { AdoptCopy } from "@/content/adopt";
import { catOrder, wildYears, type CatId } from "@/data/wildlife";
import { fill, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./Wildlife.module.css";

/**
 * Grafik batang bertumpuk: satwa yang dirawat pada akhir tiap tahun menurut kategori. Chip di atas menyaring
 * kategori, dan sebuah batang bisa disorot (kursor, ketuk, atau papan ketik) untuk membaca angkanya.
 */
export function PopulationChart({ locale, copy, names, asOfYear }: { locale: Locale; copy: AdoptCopy; names: Record<CatId, string>; asOfYear: number }) {
  const t = copy.chart;
  const [shown, setShown] = useState<CatId[]>(catOrder);
  const [pick, setPick] = useState<number>(wildYears.length - 1);

  const totalOf = (y: (typeof wildYears)[number], cats: CatId[]) => cats.reduce((n, c) => n + y[c], 0);
  const max = Math.max(1, ...wildYears.map((y) => totalOf(y, shown)));
  const toggle = (c: CatId) =>
    setShown((cur) => {
      if (cur.includes(c)) return cur.length === 1 ? cur : cur.filter((x) => x !== c);
      return catOrder.filter((x) => x === c || cur.includes(x));
    });
  const yearLabel = (y: number) => (y === asOfYear ? fill(t.yearNow, { year: y }) : fill(t.year, { year: y }));
  const current = wildYears[pick] ?? wildYears[wildYears.length - 1];

  return (
    <figure className={`${s.cats} ${s.chart}`} style={{ margin: 0 }}>
      <div className={s.chartHead}>
        <figcaption className={s.chartTitle}>{t.caption}</figcaption>
        <ul className={s.filters}>
          {catOrder.map((c) => (
            <li key={c}>
              <button type="button" className={s.chip} aria-pressed={shown.includes(c)} onClick={() => toggle(c)} style={{ ["--c" as string]: `var(--c-${c})` }}>
                <span className={s.sw} aria-hidden="true" />
                {names[c]}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={s.plot}>
        {wildYears.map((y, i) => (
          <button
            key={y.id}
            type="button"
            className={s.col}
            data-on={pick === i}
            data-dim={pick !== i}
            aria-label={`${yearLabel(y.year)}: ${num(totalOf(y, shown), locale)}`}
            onMouseEnter={() => setPick(i)}
            onFocus={() => setPick(i)}
            onClick={() => setPick(i)}
          >
            <span className={s.colTotal} aria-hidden="true">
              {num(totalOf(y, shown), locale)}
            </span>
            {catOrder
              .filter((c) => shown.includes(c))
              .map((c) => (
                <span key={c} className={s.seg} data-cat={c} style={{ height: `${(y[c] / max) * 100}%` }} aria-hidden="true" />
              ))}
          </button>
        ))}
      </div>
      <ol className={s.yearTick} aria-hidden="true">
        {wildYears.map((y) => (
          <li key={y.id}>{y.year}</li>
        ))}
      </ol>

      <dl className={s.readout} aria-live="polite">
        <div className={s.readYear}>{yearLabel(current.year)}</div>
        {catOrder
          .filter((c) => shown.includes(c))
          .map((c) => (
            <div key={c} style={{ ["--c" as string]: `var(--c-${c})` }}>
              <dt>
                <span className={s.sw} aria-hidden="true" />
                {names[c]}
              </dt>
              <dd className="num">{num(current[c], locale)}</dd>
            </div>
          ))}
        <div>
          <dt>{t.total}</dt>
          <dd className="num">{num(totalOf(current, shown), locale)}</dd>
        </div>
      </dl>
    </figure>
  );
}
