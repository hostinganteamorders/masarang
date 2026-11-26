"use client";

import { useRef, useState } from "react";
import type { DroneCopy } from "@/content/drone";
import type { DroneVideo } from "@/data/drone";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./DroneCompare.module.css";

const BCP = { en: "en-US", id: "id-ID" } as const;
const monthName = (m: number, locale: Locale) =>
  new Intl.DateTimeFormat(BCP[locale], { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2000, m - 1, 1)));
const yearOf = (v: DroneVideo) => v.date.slice(0, 4);
const monthOf = (v: DroneVideo) => Number(v.date.slice(5, 7));
const labelOf = (v: DroneVideo, locale: Locale) => `${monthName(monthOf(v), locale)} ${yearOf(v)}`;

function Pane({
  legend,
  list,
  value,
  onChange,
  copy,
  locale,
  videoRef,
}: {
  legend: string;
  list: DroneVideo[];
  value: string;
  onChange: (id: string) => void;
  copy: DroneCopy;
  locale: Locale;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const cur = list.find((v) => v.id === value) ?? list[0];
  const years = [...new Set(list.map(yearOf))];
  const inYear = list.filter((v) => yearOf(v) === yearOf(cur));
  return (
    <div className={s.pane}>
      <fieldset className={s.picker}>
        <legend>{legend}</legend>
        <div className={s.row}>
          <label>
            {copy.year}
            <select
              value={yearOf(cur)}
              onChange={(e) => {
                const c = list.filter((v) => yearOf(v) === e.target.value);
                onChange((c.find((v) => monthOf(v) === monthOf(cur)) ?? c[c.length - 1]).id);
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label>
            {copy.month}
            <select value={cur.id} onChange={(e) => onChange(e.target.value)}>
              {inYear.map((v) => (
                <option key={v.id} value={v.id}>
                  {monthName(monthOf(v), locale)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <div className={s.frame}>
        <video
          key={cur.id}
          ref={videoRef}
          controls
          muted
          playsInline
          preload="metadata"
          poster={cur.poster || undefined}
          aria-label={fill(copy.videoLabel, { date: labelOf(cur, locale) })}
        >
          <source src={cur.video} type="video/mp4" />
        </video>
      </div>
      {cur.note[locale] && <p className={s.caption}>{cur.note[locale]}</p>}
    </div>
  );
}

/** Dua video drone berdampingan; tiap sisi punya pilihan tahun dan bulan sendiri. */
export function DroneCompare({ locale, copy, videos }: { locale: Locale; copy: DroneCopy; videos: DroneVideo[] }) {
  const list = [...videos].sort((a, b) => a.date.localeCompare(b.date));
  const [left, setLeft] = useState(list[0]?.id ?? "");
  const [right, setRight] = useState(list[list.length - 1]?.id ?? "");
  const [playing, setPlaying] = useState(false);
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);

  if (list.length === 0) return null;
  const all = () => [a.current, b.current].filter((v): v is HTMLVideoElement => Boolean(v));

  const toggle = () => {
    if (playing) {
      all().forEach((v) => v.pause());
      setPlaying(false);
    } else {
      all().forEach((v) => void v.play().catch(() => {}));
      setPlaying(true);
    }
  };
  const restart = () => {
    all().forEach((v) => {
      v.currentTime = 0;
      void v.play().catch(() => {});
    });
    setPlaying(true);
  };

  return (
    <div className={s.wrap}>
      <div className={s.panes}>
        <Pane legend={copy.left} list={list} value={left} onChange={(v) => { setLeft(v); setPlaying(false); }} copy={copy} locale={locale} videoRef={a} />
        <Pane legend={copy.right} list={list} value={right} onChange={(v) => { setRight(v); setPlaying(false); }} copy={copy} locale={locale} videoRef={b} />
      </div>
      <div className={s.actions}>
        <button type="button" className="btn" onClick={toggle} aria-pressed={playing}>
          {playing ? copy.pauseBoth : copy.playBoth}
        </button>
        <button type="button" className="btn btn--ghost" onClick={restart}>
          {copy.restart}
        </button>
      </div>
      <p className={s.note}>{list.length === 1 ? copy.one : copy.note}</p>
    </div>
  );
}
