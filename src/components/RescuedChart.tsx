import { common } from "@/content/common";
import { programsCopy } from "@/content/programs";
import { site } from "@/data/site";
import { tasikoki } from "@/data/programs";
import { fill, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./RescuedChart.module.css";

/**
 * Batang berkelompok (HTML/CSS): satwa diselamatkan dan dilepasliarkan per tahun.
 * Nilai ditulis langsung di atas batang. Tabel tersembunyi menyediakan data untuk pembaca layar,
 * sehingga batang itu sendiri disembunyikan dari teknologi bantu.
 */
export function RescuedChart({ locale }: { locale: Locale }) {
  const t = programsCopy[locale].tasikoki.chart;
  const c = common[locale];
  const data = tasikoki.perYear;
  const max = Math.max(...data.flatMap((d) => [d.rescued, d.released]));

  return (
    <figure className={s.fig}>
      <figcaption className={s.head}>
        <span className={s.title}>{t.label}</span>
        <ul className={s.legend}>
          <li>
            <span className={s.swatch} data-series="rescued" aria-hidden="true" />
            {t.rescued}
          </li>
          <li>
            <span className={s.swatch} data-series="released" aria-hidden="true" />
            {t.released}
          </li>
        </ul>
        {tasikoki.perYearPh && site.draft && (
          <span className={`ph ${s.flag}`} title={c.placeholderHint}>
            {c.labels.placeholderFigure}
          </span>
        )}
      </figcaption>

      <div className={s.plot} aria-hidden="true">
        {data.map((d) => (
          <div key={d.year} className={s.group}>
            <div className={s.bars}>
              {(
                [
                  ["rescued", d.rescued],
                  ["released", d.released],
                ] as const
              ).map(([series, value]) => (
                <div key={series} className={s.col}>
                  <span className={s.bar} data-series={series} style={{ height: `${(value / max) * 100}%` }}>
                    <span className={`num ${s.value}`}>{num(value, locale)}</span>
                  </span>
                </div>
              ))}
            </div>
            <span className={s.year}>{d.year}</span>
          </div>
        ))}
      </div>

      {/* Pembungkus sr-only: tabel yang diberi sr-only langsung tidak patuh pada lebar 1px dan melebarkan halaman. */}
      <div className="sr-only">
        <table>
          <caption>{t.label}</caption>
          <thead>
            <tr>
              <th scope="col">{t.year}</th>
              <th scope="col">{t.rescued}</th>
              <th scope="col">{t.released}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.year}>
                <th scope="row">{d.year}</th>
                <td>{num(d.rescued, locale)}</td>
                <td>{num(d.released, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={s.source}>{fill(c.labels.source, { source: t.source })}</p>
    </figure>
  );
}
