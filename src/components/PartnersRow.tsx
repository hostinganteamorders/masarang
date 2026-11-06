import { common } from "@/content/common";
import { partners } from "@/data/organisation";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import s from "./PartnersRow.module.css";

/**
 * Mitra: nama (tautan ke situs mitra bila alamatnya sudah diisi di `partners`) dan perannya.
 * Selama draf, mitra tanpa alamat diberi catatan kecil "Tautan menyusul".
 */
export function PartnersRow({ locale }: { locale: Locale }) {
  const c = common[locale];
  return (
    <ul className={s.row}>
      {partners.map((p) => (
        <li key={p.id} className={s.item}>
          {p.url ? (
            <a href={p.url} className={`${s.name} ${s.link}`} target="_blank" rel="noopener noreferrer">
              {p.name}
              <span className="sr-only"> ({c.externalNote})</span>
            </a>
          ) : (
            <span className={s.name}>{p.name}</span>
          )}
          <span className={s.role}>{p.role[locale]}</span>
          {!p.url && site.draft && <span className={`${s.role} ph`}>{c.soon}</span>}
        </li>
      ))}
    </ul>
  );
}
