import { governance, principles } from "@/data/organisation";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./Governance.module.css";

/** Badan tata kelola dan penanggung jawabnya. Nama yang masih contoh diberi garis bawah titik-titik selama draf. */
export function GovernanceList({ locale }: { locale: Locale }) {
  return (
    <ul className={s.roles}>
      {governance.map((g) => (
        <li key={g.id} className={s.role}>
          <span className={s.roleName}>{g.role[locale]}</span>
          <span className={`num ${s.person}`}>
            <Ph on={g.ph}>{g.name[locale]}</Ph>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Tiga prinsip pengelolaan dana. */
export function Principles({ locale }: { locale: Locale }) {
  return (
    <ul className={s.principles}>
      {principles.map((p) => (
        <li key={p.id} className={s.principle}>
          <h3 className={s.principleTitle}>{p.title[locale]}</h3>
          <p className={s.principleBody}>{p.body[locale]}</p>
        </li>
      ))}
    </ul>
  );
}
