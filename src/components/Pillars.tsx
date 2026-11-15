import Link from "next/link";
import type { ReactNode } from "react";
import type { Pic } from "@/data/photos";
import type { Locale } from "@/lib/i18n";
import { Photo } from "./Photo";
import s from "./Pillars.module.css";

export type Pillar = {
  id: string;
  title: string;
  /** Satu paragraf (ReactNode) atau beberapa paragraf (string[]). */
  body: ReactNode | string[];
  /** Penanda urutan kecil sebelum judul, mis. "01". */
  marker?: string;
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
  compact = false,
}: {
  items: Pillar[];
  columns?: 2 | 3;
  locale?: Locale;
  /** Judul lebih kecil, untuk judul panjang. */
  compact?: boolean;
}) {
  return (
    <ul className={`${s.list} ${columns === 2 ? s.two : ""} ${compact ? s.compact : ""}`}>
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
          <h3 className={s.title}>
            {p.marker && <span className={`num ${s.marker}`}>{p.marker}</span>}
            {p.title}
          </h3>
          {Array.isArray(p.body) ? (
            <div className={s.bodies}>
              {p.body.map((para) => (
                <p key={para} className={s.body}>
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <p className={s.body}>{p.body}</p>
          )}
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
