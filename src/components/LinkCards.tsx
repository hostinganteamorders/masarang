import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import s from "./LinkCards.module.css";

export type LinkCard = { id: string; title: string; body: ReactNode; href: string; cta: string; /** Warna garis atas, mis. warna program. */ color?: string };

/** Kartu yang seluruhnya bisa diklik (tautan ada di judul). Garis atas berganti warna program. */
export function LinkCards({ items }: { items: LinkCard[] }) {
  return (
    <ul className={s.cards}>
      {items.map((c) => (
        <li key={c.id} className={s.card} style={c.color ? ({ ["--c" as string]: c.color } as CSSProperties) : undefined}>
          <h3 className={s.title}>
            <Link href={c.href} className={s.link}>
              {c.title}
            </Link>
          </h3>
          <p className={s.body}>{c.body}</p>
          <span className={s.more} aria-hidden="true">
            {c.cta}
          </span>
        </li>
      ))}
    </ul>
  );
}
