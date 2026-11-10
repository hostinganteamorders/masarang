import { common } from "@/content/common";
import { home } from "@/content/home";
import type { QuarterlyReport } from "@/data/reports";
import { site } from "@/data/site";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./ReportCard.module.css";

const PROGRAMS = ["restoration", "conservation", "education"] as const;

/**
 * Satu Quarterly Report: periode, judul, dan ringkasan. Rincian per program (Restorasi, Konservasi, Edukasi)
 * tertutup sampai pengunjung mengkliknya, dan tombol unduh ada di dalam rincian (belum aktif bila PDF belum ada).
 */
export function ReportCard({
  report,
  locale,
  featured = false,
}: {
  report: QuarterlyReport;
  locale: Locale;
  featured?: boolean;
}) {
  const t = home[locale].report;
  const c = common[locale];

  return (
    <article className={`${s.card} ${featured ? s.featured : ""}`}>
      <p className={`num ${s.period}`}>{fill(t.period, { q: report.quarter, year: report.year })}</p>
      <h3 className={s.title}>
        <Ph on={report.ph}>{report.title[locale]}</Ph>
      </h3>
      <p className={s.summary}>
        <Ph on={report.ph}>{report.summary[locale]}</Ph>
      </p>

      <details className={s.details}>
        <summary className={s.toggle}>
          <span>{t.expand}</span>
          <span className={s.chevron} aria-hidden="true" />
        </summary>
        <div className={s.panel}>
          <h4 className={s.breakdown}>{t.breakdown}</h4>
          <ul className={s.programs}>
            {PROGRAMS.map((id) => (
              <li key={id} className={`${s.program} ${s[id]}`}>
                <p className={s.programName}>{t.programs[id]}</p>
                <p className={s.programText}>
                  <Ph on={report.ph}>{report.breakdown[id][locale]}</Ph>
                </p>
              </li>
            ))}
          </ul>
          {report.pdf ? (
            <a href={report.pdf} className="btn" download>
              {t.open} (PDF)
            </a>
          ) : (
            site.draft && (
              <span className="btn btn--ghost ph" data-pending="">
                {t.open} ({c.soon.toLowerCase()})
              </span>
            )
          )}
        </div>
      </details>
    </article>
  );
}
