"use client";

import { useId, useRef, useState } from "react";
import { adoptCopy } from "@/content/adopt";
import {
  animalsById,
  featuredAnimalId,
  groupOrder,
  register,
  speciesById,
  type Animal,
  type Group,
} from "@/data/animals";
import { fill, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { AnimalCard } from "./AnimalCard";
import { RegisterDots } from "./RegisterDots";
import s from "./AdoptExplorer.module.css";

export function AdoptExplorer({ locale }: { locale: Locale }) {
  const copy = adoptCopy[locale];
  const [selectedId, setSelectedId] = useState(featuredAnimalId);
  const [groups, setGroups] = useState<Group[]>([]);
  const [waiting, setWaiting] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  const asideId = useId();
  const sheetId = useId();

  const matches = (a: Animal) =>
    (groups.length === 0 || groups.includes(speciesById[a.speciesId].group)) &&
    (!waiting || (a.stage !== "released" && !a.sponsored));

  const toggleGroup = (g: Group) =>
    setGroups((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const select = (id: string, open: boolean) => {
    setSelectedId(id);
    // Di layar sempit, kartu satwa muncul sebagai lembar di bawah.
    if (open && window.matchMedia("(max-width: 62rem)").matches) sheet.current?.showModal();
  };

  const selected = animalsById[selectedId];
  const closeSheet = () => sheet.current?.close();

  return (
    <div className={s.wrap}>
      <div className={s.main}>
        <h2 className="sr-only">{copy.explorer.registerLabel}</h2>
        <div className={s.toolbar}>
          <div className="chips" role="group" aria-label={copy.explorer.filterLabel}>
            {groupOrder.map((g) => (
              <button
                key={g}
                type="button"
                className={`chip ${s.chip}`}
                aria-pressed={groups.includes(g)}
                onClick={() => toggleGroup(g)}
              >
                <span className={s.swatch} data-group={g} aria-hidden="true" />
                {copy.explorer.groups[g]}
              </button>
            ))}
            <button
              type="button"
              className={`chip ${s.chip}`}
              aria-pressed={waiting}
              onClick={() => setWaiting((w) => !w)}
            >
              <span className={s.hollow} aria-hidden="true" />
              {copy.explorer.waiting}
            </button>
          </div>

          <p className={`meta ${s.counts}`}>
            <span>{fill(copy.explorer.counts.inCare, { n: num(register.inCare, locale) })}</span>
            <span>{fill(copy.explorer.counts.sponsored, { n: num(register.sponsored, locale) })}</span>
            <span>{fill(copy.explorer.counts.waiting, { n: num(register.waiting, locale) })}</span>
          </p>
        </div>

        <RegisterDots
          locale={locale}
          copy={copy}
          onSelect={select}
          selectedId={selectedId}
          matches={groups.length || waiting ? matches : undefined}
        />

        <ul className={s.legend}>
          <li>
            <span className={s.legendDot} data-filled="true" aria-hidden="true" />
            {copy.explorer.legend.sponsored}
          </li>
          <li>
            <span className={s.legendDot} aria-hidden="true" />
            {copy.explorer.legend.waiting}
          </li>
          <li>{copy.explorer.legend.colour}</li>
        </ul>
      </div>

      <aside className={s.aside} aria-live="polite">
        <AnimalCard animal={selected} locale={locale} copy={copy} headingId={asideId} />
      </aside>

      <dialog
        ref={sheet}
        className={s.sheet}
        aria-labelledby={sheetId}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeSheet();
        }}
      >
        <div className={s.sheetBody}>
          <button type="button" className={`btn btn--ghost btn--small ${s.close}`} onClick={closeSheet}>
            {copy.detail.close}
          </button>
          <AnimalCard animal={selected} locale={locale} copy={copy} headingId={sheetId} />
        </div>
      </dialog>
    </div>
  );
}
