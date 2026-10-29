import type { AdoptCopy } from "@/content/adopt";
import { inCareOf, register, species } from "@/data/animals";
import { idrAuto, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./SpeciesTable.module.css";

/** Tabel per spesies: status IUCN, jumlah dirawat, jumlah disponsori, dan biaya perawatan bulanan. */
export function SpeciesTable({ locale, copy }: { locale: Locale; copy: AdoptCopy }) {
  const t = copy.table;
  return (
    <table className={`table ${s.table}`}>
      <caption className="sr-only">{t.title}</caption>
      <thead>
        <tr>
          <th scope="col">{t.species}</th>
          <th scope="col">{t.iucn}</th>
          <th scope="col" className="right">
            {t.inCare}
          </th>
          <th scope="col" className="right">
            {t.sponsored}
          </th>
          <th scope="col" className="right">
            {t.care}
          </th>
        </tr>
      </thead>
      <tbody>
        {species.map((sp) => (
          <tr key={sp.id}>
            <th scope="row" className={s.speciesCell}>
              <span className={s.name}>{sp.name[locale]}</span>
              <span className={s.latin}>{sp.latin}</span>
            </th>
            <td data-label={t.iucn}>
              <span className={s.iucn} data-level={sp.iucn}>
                {sp.iucn}
              </span>
              <span className="sr-only"> {copy.detail.iucn[sp.iucn]}</span>
            </td>
            <td className={`right tnum ${s.num}`} data-label={t.inCare}>
              {num(inCareOf(sp), locale)}
            </td>
            <td className={`right tnum ${s.num}`} data-label={t.sponsored}>
              {num(sp.sponsored, locale)}
            </td>
            <td className={`right tnum ${s.num}`} data-label={t.care}>
              {idrAuto(sp.carePerMonth, locale)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">{t.total}</th>
          <td />
          <td className={`right tnum ${s.num}`} data-label={t.inCare}>
            {num(register.inCare, locale)}
          </td>
          <td className={`right tnum ${s.num}`} data-label={t.sponsored}>
            {num(register.sponsored, locale)}
          </td>
          <td />
        </tr>
      </tfoot>
    </table>
  );
}
