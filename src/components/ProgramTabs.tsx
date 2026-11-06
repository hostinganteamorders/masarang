import Link from "next/link";
import type { CSSProperties } from "react";
import { programsCopy } from "@/content/programs";
import { programColor } from "@/data/site";
import { localePath, type Locale } from "@/lib/i18n";
import s from "./ProgramTabs.module.css";

export type ProgramId = "overview" | "restoration" | "conservation" | "education";

const TABS = [
  { id: "overview", path: "/programs", color: undefined },
  { id: "restoration", path: "/programs/restoration", color: programColor.temboan },
  { id: "conservation", path: "/programs/conservation", color: programColor.tasikoki },
  { id: "education", path: "/programs/education", color: programColor.education },
] as const;

/** Pindah antarprogram: Semua program, Restorasi, Konservasi, Edukasi. Dipasang di kepala halaman program. */
export function ProgramTabs({ locale, current }: { locale: Locale; current: ProgramId }) {
  const t = programsCopy[locale].tabs;
  return (
    <nav aria-label={t.label} className={s.nav}>
      <ul className={s.list}>
        {TABS.map((tab) => (
          <li key={tab.id}>
            <Link
              href={localePath(locale, tab.path)}
              className={s.tab}
              aria-current={tab.id === current ? "page" : undefined}
              style={tab.color ? ({ ["--dot" as string]: tab.color } as CSSProperties) : undefined}
            >
              {tab.color && <span className={s.dot} aria-hidden="true" />}
              {t[tab.id]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
