import Link from "next/link";
import { aboutCopy } from "@/content/about";
import { governance, type GovernanceBody } from "@/data/organisation";
import { localePath, type Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./TeamGroups.module.css";

const BODIES: GovernanceBody[] = ["supervisors", "oversight", "board", "deputy"];

/** Ringkasan tim di halaman Tentang: Pembina, Pengawas, Pengurus, Deputi, dengan tautan ke tim lengkap. */
export function TeamGroups({ locale }: { locale: Locale }) {
  const t = aboutCopy[locale].team;
  return (
    <>
      <ul className={s.grid}>
        {BODIES.map((body) => (
          <li key={body} className={s.group}>
            <h3 className={s.title}>{t.bodies[body]}</h3>
            <ul className={s.members}>
              {governance
                .filter((g) => g.body === body)
                .map((g) => (
                  <li key={g.id}>
                    <span className={`num ${s.name}`}>
                      <Ph on={g.ph}>{g.name[locale]}</Ph>
                    </span>
                    {body === "board" && <span className={s.role}>{g.role[locale]}</span>}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className={s.more}>
        <Link href={localePath(locale, "/about/team")} className="btn">
          {t.cta}
        </Link>
      </p>
    </>
  );
}
