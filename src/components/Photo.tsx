import Image from "next/image";
import type { CSSProperties } from "react";
import type { Pic } from "@/data/photos";
import type { Locale } from "@/lib/i18n";
import s from "./Photo.module.css";

/**
 * Satu foto dari katalog dalam bingkai berrasio tetap (dipotong dengan object-fit: cover, titik fokus dari katalog).
 * Warna rata-rata foto dipakai sebagai latar selagi foto dimuat. `decorative` mengosongkan teks pengganti
 * untuk foto yang hanya menghias dan keterangannya sudah ada di teks sekitarnya.
 */
export function Photo({
  pic,
  locale,
  ratio = "4 / 3",
  sizes = "(max-width: 800px) 100vw, 50vw",
  preload,
  decorative,
  className,
}: {
  pic: Pic;
  locale: Locale;
  ratio?: string;
  sizes?: string;
  preload?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`${s.slot} ${className ?? ""}`}
      style={{ aspectRatio: ratio, ["--c" as string]: pic.color } as CSSProperties}
    >
      <Image
        src={pic.src}
        alt={decorative ? "" : pic.alt[locale]}
        fill
        sizes={sizes}
        preload={preload}
        className={s.image}
        style={{ objectPosition: pic.focus }}
      />
    </figure>
  );
}
