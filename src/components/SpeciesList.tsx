"use client";

import { useMemo, useState } from "react";
import type { AdoptCopy } from "@/content/adopt";
import { catOrder, wildSpecies, type CatId } from "@/data/wildlife";
import { fill, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./Wildlife.module.css";

/** Daftar jenis satwa yang bisa dicari dan disaring menurut kategori. */
export function SpeciesList({ locale, copy, names }: { locale: Locale; copy: AdoptCopy; names: Record<CatId, string> }) {
  const t = copy.species;
  const [cat, setCat] = useState<CatId | "all">("all");
  const [q, setQ] = useState("");
  const [empty, setEmpty] = useState(false);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return wildSpecies
      .filter((r) => (cat === "all" || r.category === cat) && (empty || r.count > 0) && (!needle || `${r.name} ${r.latin}`.toLowerCase().includes(needle)))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [cat, q, empty]);
  const total = rows.reduce((n, r) => n + r.count, 0);
  const max = Math.max(1, ...wildSpecies.map((r) => r.count));

  return (
    <div className={s.cats}>
      <div className={s.tools}>
        <div className={s.search}>
          <label htmlFor="sp-q">{t.search}</label>
          <input id="sp-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchPlaceholder} />
        </div>
        <label className={s.check}>
          <input type="checkbox" aria-label={t.showEmpty} checked={empty} onChange={(e) => setEmpty(e.target.checked)} /> {t.showEmpty}
        </label>
      </div>
      <ul className={s.filters} style={{ marginBottom: "1.25rem" }}>
        <li>
          <button type="button" className={s.chip} aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            {t.all}
          </button>
        </li>
        {catOrder.map((c) => (
          <li key={c}>
            <button type="button" className={s.chip} aria-pressed={cat === c} onClick={() => setCat(c)} style={{ ["--c" as string]: `var(--c-${c})` }}>
              <span className={s.sw} aria-hidden="true" />
              {names[c]}
            </button>
          </li>
        ))}
      </ul>
      <p className={s.summary} aria-live="polite">
        {fill(t.summary, { n: num(rows.length, locale), total: num(total, locale) })}
      </p>
      <div className={s.tableWrap} tabIndex={0} role="region" aria-label={t.title}>
        {rows.length === 0 ? (
          <p className={s.empty}>{t.empty}</p>
        ) : (
          <table className="table">
            <caption className="sr-only">{t.title}</caption>
            <thead>
              <tr>
                <th scope="col">{t.name}</th>
                <th scope="col">{t.category}</th>
                <th scope="col" className="right">
                  {t.count}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <th scope="row" style={{ display: "table-cell" }}>
                    <span className={s.spName}>{r.name}</span>
                    <span className={s.spLatin}>{r.latin}</span>
                  </th>
                  <td data-label={t.category}>{names[r.category]}</td>
                  <td className="right" data-label={t.count} style={{ ["--c" as string]: `var(--c-${r.category})`, minWidth: "8rem" }}>
                    <span className={s.cell}>
                      <span className={`num ${s.n}`}>{num(r.count, locale)}</span>
                      <span className={s.bar} style={{ width: `${Math.max(2, (r.count / max) * 80)}px` }} aria-hidden="true" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
