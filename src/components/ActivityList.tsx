import type { ReactNode } from "react";
import type { Pic } from "@/data/photos";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import { Photo } from "./Photo";
import s from "./ActivityList.module.css";

export type Activity = {
  id: string;
  title: string;
  /** Teks pendek; bila `ph`, masih penanda tempat. */
  body: string;
  ph?: boolean;
  photo?: Pic;
  /** Isi tambahan di bawah teks: tombol, angka, atau kegiatan turunan. */
  children?: ReactNode;
};

/** Daftar kegiatan: judul besar di kiri, penjelasan dan (bila ada) foto di kanan. Garis atas berwarna program. */
export function ActivityList({
  items,
  locale,
  color = "var(--education)",
}: {
  items: Activity[];
  locale: Locale;
  color?: string;
}) {
  return (
    <ul className={s.list} style={{ ["--c" as string]: color }}>
      {items.map((it) => (
        <li key={it.id} className={s.item}>
          <h3 className={s.title}>{it.title}</h3>
          <div className={s.content}>
            <p className={s.body}>
              <Ph on={it.ph}>{it.body}</Ph>
            </p>
            {it.children}
            {it.photo && (
              <Photo pic={it.photo} locale={locale} ratio="16 / 10" sizes="(max-width: 52rem) 100vw, 40vw" className={s.photo} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
