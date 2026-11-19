import Image from "next/image";
import { common } from "@/content/common";
import { partners, type PartnerKind } from "@/data/organisation";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";
import s from "./PartnersRow.module.css";

/**
 * Mitra sebagai deretan kotak logo. Logo diisi lewat `partners[].logo`; selama belum ada, kotak kosong
 * bergaris putus diberi nama mitra. Kotak menjadi tautan ke situs mitra (tab baru) bila `url` sudah diisi.
 */
export function PartnersRow({ locale }: { locale: Locale }) {
  const c = common[locale];
  const order: PartnerKind[] = [
    "government",
    "research",
    "funder",
    "corporate",
    "community",
  ];
  const groups = order
    .map((kind) => ({
      kind,
      list: partners.filter((p) => (p.kind ?? "corporate") === kind),
    }))
    .filter((g) => g.list.length);
  return (
    <div className={s.groups}>
      {groups.map((g) => (
        <section key={g.kind} aria-labelledby={`pk-${g.kind}`}>
          <h3 id={`pk-${g.kind}`} className={s.kind}>
            {c.partnerKinds[g.kind]}
          </h3>
          <ul className={s.row}>
            {g.list.map((p) => {
              const tile = (
                <>
                  <span className={`${s.box} ${p.logo ? "" : s.empty}`}>
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt=""
                        width={240}
                        height={120}
                        className={s.logo}
                      />
                    ) : (
                      <span className={s.label}>{p.name}</span>
                    )}
                  </span>
                  <span className={s.name}>{p.name}</span>
                  <span className={s.role}>{p.role[locale]}</span>
                  {!p.url && site.draft && (
                    <span className={`${s.role} ph`}>{c.soon}</span>
                  )}
                </>
              );
              return (
                <li key={p.id} className={s.item}>
                  {p.url ? (
                    <a
                      href={p.url}
                      className={`${s.tile} ${s.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
        </section>
      ))}
    </div>
  );
}
