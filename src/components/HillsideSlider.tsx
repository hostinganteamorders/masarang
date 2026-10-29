"use client";

import { useId, useState } from "react";
import { hillsideCopy } from "@/content/hillside";
import { hillside } from "@/data/programs";
import { fill, num, pct } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { HillsideScene } from "./art/HillsideScene";
import s from "./HillsideSlider.module.css";

export function HillsideSlider({ locale }: { locale: Locale }) {
  const t = hillsideCopy[locale];
  const [year, setYear] = useState(5);
  const [pos, setPos] = useState(50);
  const describedBy = useId();

  const target = hillside.targets[year];
  const base = hillside.baseline;

  const rows = [
    { key: "canopy", a: pct(base.canopy, locale), b: pct(target.canopy, locale) },
    { key: "trees", a: num(base.trees, locale), b: num(target.trees, locale) },
    { key: "species", a: num(base.species, locale), b: num(target.species, locale) },
    { key: "bare", a: pct(base.bare, locale), b: pct(target.bare, locale) },
    { key: "carbon", a: num(base.carbon, locale), b: num(target.carbon, locale) },
  ] as const;

  return (
    <div className={s.layout}>
      <div className={s.stage}>
        <div className={s.frame}>
          <HillsideScene mode="before" className={s.scene} />
          <div className={s.after} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <HillsideScene mode="after" year={year} className={s.scene} />
          </div>

          <div className={s.handle} style={{ left: `${pos}%` }} aria-hidden="true">
            <span className={s.knob}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8 5 3 11l5 6M14 5l5 6-5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <span className={s.badge}>{t.badge}</span>
          <span className={`${s.tag} ${s.tagLeft}`}>
            <strong>{fill(t.yearN, { n: 0 })}</strong>
            <span>{t.before}</span>
          </span>
          <span className={`${s.tag} ${s.tagRight}`}>
            <strong>{fill(t.yearN, { n: year })}</strong>
            <span>{t.simulated}</span>
          </span>

          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(pos)}
            onChange={(event) => setPos(Number(event.target.value))}
            className={s.range}
            aria-label={fill(t.sliderLabel, { n: year })}
            aria-describedby={describedBy}
          />
        </div>
        <p id={describedBy} className="sr-only">
          {fill(t.sceneAlt, { n: year })}
        </p>

        <div className={s.years} role="group" aria-label={t.compare}>
          <span className={s.compare}>{t.compare}</span>
          <div className="chips">
            {hillside.years.map((y) => (
              <button
                key={y}
                type="button"
                className="chip"
                aria-pressed={y === year}
                onClick={() => setYear(y)}
              >
                {fill(t.yearN, { n: y })}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.metrics}>
        <table className="table">
          <caption className={s.caption}>{t.metricsTitle}</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">{t.metricsTitle}</span>
              </th>
              <th scope="col" className="right">
                {fill(t.yearN, { n: 0 })}
              </th>
              <th scope="col" className="right">
                {fill(t.yearN, { n: year })}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <th scope="row" className={s.rowHead}>
                  {t.metrics[row.key]}
                </th>
                <td className="right tnum">{row.a}</td>
                <td className={`right tnum ${s.target}`}>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={s.note}>{t.note}</p>
      </div>
    </div>
  );
}
