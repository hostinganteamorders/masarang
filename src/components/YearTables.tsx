import type { AdoptCopy } from "@/content/adopt";
import { catOrder, wildFlows, wildlifeAsOf } from "@/data/wildlife";
import { monthName, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./Wildlife.module.css";

/** Satu tabel per kategori: tiap baris satu tahun, kolom dari kiri ke kanan mengikuti alur satwa. */
export function YearTables({ locale, copy }: { locale: Locale; copy: AdoptCopy }) {
  const t = copy.years;
  const [nowYear, nowMonth] = wildlifeAsOf.split("-").map(Number);
  const cols = ["entered", "released", "translocated", "yearEnd", "rehab"] as const;

  return (
    <div className={s.cats}>
      <div className={s.yearGrid}>
        {catOrder.map((cat) => {
          const rows = wildFlows.filter((r) => r.cat === cat).sort((a, b) => a.year - b.year);
          const name = copy.cats[cat].name;
          return (
            <section key={cat} className={s.yearCard} data-cat={cat} aria-labelledby={`yr-${cat}`}>
              <h3 id={`yr-${cat}`}>{name}</h3>
              <div className={s.tableWrap} tabIndex={0} role="region" aria-labelledby={`yr-${cat}`}>
                <table className={s.yearTable}>
                  <caption>{t.caption.replace("{name}", name)}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{t.year}</th>
                      {cols.map((c) => (
                        <th key={c} scope="col">
                          {t[c]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id}>
                        <th scope="row">
                          {r.year === nowYear ? t.partial.replace("{year}", String(r.year)).replace("{month}", monthName(nowMonth, locale)) : r.year}
                        </th>
                        {cols.map((c) => (
                          <td key={c}>{num(r[c], locale, c === "rehab" ? 1 : 0)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
      <p className={s.yearNote}>{t.note}</p>
    </div>
  );
}
