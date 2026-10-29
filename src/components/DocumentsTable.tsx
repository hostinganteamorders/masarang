import { transparencyCopy } from "@/content/transparency";
import { documents } from "@/data/organisation";
import { site } from "@/data/site";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./DocumentsTable.module.css";

/** Daftar dokumen publik. Dokumen "atas permintaan" dikirim lewat email; yang belum siap ditandai "sedang disusun". */
export function DocumentsTable({ locale }: { locale: Locale }) {
  const t = transparencyCopy[locale].docs;
  return (
    <table className={`table ${s.table}`}>
      <caption className="sr-only">{t.title}</caption>
      <thead>
        <tr>
          <th scope="col">{t.columns.document}</th>
          <th scope="col">{t.columns.type}</th>
          <th scope="col">{t.columns.year}</th>
          <th scope="col">{t.columns.access}</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((d) => {
          const title = d.title[locale];
          const mail = `mailto:${site.email.v}?subject=${encodeURIComponent(
            fill(t.mailSubject, { title }),
          )}`;
          return (
            <tr key={d.id}>
              <th scope="row" className={s.title}>
                {title}
              </th>
              <td data-label={t.columns.type}>{t.types[d.type]}</td>
              <td data-label={t.columns.year} className="tnum">
                {d.year ?? "–"}
              </td>
              <td data-label={t.columns.access}>
                {d.status === "request" ? (
                  <span className={s.access}>
                    <span className={s.statusText} data-status="request">
                      {t.status.request}
                    </span>
                    <a href={mail} className="btn btn--ghost btn--small">
                      {t.requestButton}
                    </a>
                  </span>
                ) : (
                  <span className={s.statusText} data-status="preparing">
                    {t.status.preparing}
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
