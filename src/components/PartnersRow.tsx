import Image from "next/image";
import { common } from "@/content/common";
import { partners } from "@/data/organisation";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import s from "./PartnersRow.module.css";

/**
 * Mitra sebagai deretan kotak logo. Logo diisi lewat `partners[].logo`; selama belum ada, kotak kosong
 * bergaris putus diberi nama mitra. Kotak menjadi tautan ke situs mitra (tab baru) bila `url` sudah diisi.
 */
export function PartnersRow({ locale }: { locale: Locale }) {
  const c = common[locale];
  return (
    <ul className={s.row}>
      {partners.map((p) => {
        const tile = (
          <>
            <span className={`${s.box} ${p.logo ? "" : s.empty}`}>
              {p.logo ? (
                <Image src={p.logo} alt="" width={240} height={120} className={s.logo} />
              ) : (
                <span className={s.label}>{p.name}</span>
              )}
            </span>
            <span className={s.name}>{p.name}</span>
            <span className={s.role}>{p.role[locale]}</span>
            {!p.url && site.draft && <span className={`${s.role} ph`}>{c.soon}</span>}
          </>
        );
        return (
          <li key={p.id} className={s.item}>
            {p.url ? (
              <a href={p.url} className={`${s.tile} ${s.link}`} target="_blank" rel="noopener noreferrer">
                {tile}
                <span className="sr-only"> ({c.externalNote})</span>
              </a>
            ) : (
              <div className={s.tile}>{tile}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
