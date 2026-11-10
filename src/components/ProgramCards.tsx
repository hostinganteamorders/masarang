import Link from "next/link";
import { programsCopy } from "@/content/programs";
import { photos } from "@/data/photos";
import { programColor } from "@/data/site";
import { localePath, type Locale } from "@/lib/i18n";
import { Photo } from "./Photo";
import s from "./ProgramCards.module.css";

const ITEMS = [
  { id: "restoration", color: programColor.temboan, pic: photos.sites.temboan },
  { id: "conservation", color: programColor.tasikoki, pic: photos.sites.tasikoki },
  { id: "education", color: programColor.education, pic: photos.programs.education },
] as const;

/** Tiga kartu program (Restorasi, Konservasi, Edukasi) dengan garis warna program dan tautan ke halamannya. */
export function ProgramCards({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const t = programsCopy[locale].overview.items;

  return (
    <ul className={s.list}>
      {ITEMS.map(({ id, color, pic }) => {
        const item = t[id];
        return (
          <li key={id} className={`${s.card} ${tone === "dark" ? s.dark : s.light}`} style={{ ["--site" as string]: color }}>
            <Photo pic={pic} locale={locale} ratio="16 / 10" sizes="(max-width: 62rem) 100vw, 33vw" decorative className={s.photo} />
            <div className={s.body}>
              <p className={s.place}>{item.place}</p>
              <h3 className={s.name}>{item.name}</h3>
              <p className={s.teaser}>{item.teaser}</p>
              <Link href={localePath(locale, `/programs/${id}`)} className="btn">
                {item.cta}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
