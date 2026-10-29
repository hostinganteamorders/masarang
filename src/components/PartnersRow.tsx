import { partners } from "@/data/organisation";
import type { Locale } from "@/lib/i18n";
import s from "./PartnersRow.module.css";

/** Mitra: nama dan perannya. Belum ada logo, jadi nama ditampilkan sebagai teks besar. */
export function PartnersRow({ locale }: { locale: Locale }) {
  return (
    <ul className={s.row}>
      {partners.map((p) => (
        <li key={p.id} className={s.item}>
          <span className={s.name}>{p.name}</span>
          <span className={s.role}>{p.role[locale]}</span>
        </li>
      ))}
    </ul>
  );
}
