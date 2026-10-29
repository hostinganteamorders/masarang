import Link from "next/link";
import type { ReactNode } from "react";
import type { Pic } from "@/data/photos";
import type { Locale } from "@/lib/i18n";
import { Photo } from "./Photo";
import s from "./Pillars.module.css";

export type Pillar = {
  id: string;
  title: string;
  body: ReactNode;
  /** Warna garis atas, mis. "var(--restoration)". */
  color: string;
  /** Foto di atas judul (dekoratif; maknanya sudah ada di teks). */
  photo?: Pic;
  cta?: string;
  href?: string;
};

/** Tiga (atau dua) pilar dengan garis atas berwarna program. Beri `locale` bila ada pilar yang memakai foto. */
export function Pillars({
  items,
  columns = 3,
  locale,
}: {
  items: Pillar[];
  columns?: 2 | 3;
  locale?: Locale;
}) {
  return (
    <ul className={`${s.list} ${columns === 2 ? s.two : ""}`}>
      {items.map((p) => (
        <li key={p.id} className={s.item} style={{ ["--c" as string]: p.color }}>
          {p.photo && locale && (
            <Photo
              pic={p.photo}
              locale={locale}
              ratio="4 / 3"
              sizes={columns === 2 ? "(max-width: 62rem) 100vw, 50vw" : "(max-width: 62rem) 100vw, 33vw"}
              decorative
              className={s.photo}
            />
          )}
          <h3 className={s.title}>{p.title}</h3>
          <p className={s.body}>{p.body}</p>
          {p.cta && p.href && (
            <Link href={p.href} className={`link ${s.link}`}>
              {p.cta}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
