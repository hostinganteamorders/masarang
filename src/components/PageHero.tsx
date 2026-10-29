import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { common } from "@/content/common";
import type { Pic } from "@/data/photos";
import type { Locale } from "@/lib/i18n";
import { Contours } from "./art/Contours";
import s from "./PageHero.module.css";

export type Crumb = { text: string; href?: string };

/**
 * Kepala halaman dalam: judul besar dan kalimat pengantar di atas foto (bila ada `image`) atau di atas garis kontur.
 * `accent` mewarnai garis kontur dan garis bawah: restorasi (hijau), konservasi (lime), edukasi (oranye).
 */
export function PageHero({
  locale,
  title,
  lede,
  meta,
  crumbs,
  accent = "restoration",
  size = "default",
  seed = 5,
  image,
  children,
}: {
  locale: Locale;
  title: ReactNode;
  lede?: ReactNode;
  meta?: string[];
  crumbs?: Crumb[];
  accent?: "restoration" | "conservation" | "education";
  /** "long" untuk judul berupa kalimat panjang. */
  size?: "default" | "long";
  seed?: number;
  /** Foto penuh di balik judul (dekoratif: maknanya sudah ada di judul). Tanpa ini, garis kontur dipakai. */
  image?: Pic;
  children?: ReactNode;
}) {
  return (
    <section
      className={`${s.hero} on-dark ${image ? s.withImage : ""}`}
      data-accent={accent}
      aria-labelledby="page-title"
    >
      {image ? (
        <div className={s.photo} style={{ ["--c" as string]: image.color } as CSSProperties} aria-hidden="true">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            preload
            className={s.image}
            style={{ objectPosition: image.focus }}
          />
        </div>
      ) : (
        <Contours className={s.contours} seed={seed} />
      )}
      <div className={`container ${s.inner}`}>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label={common[locale].labels.breadcrumb}>
            <ol className={s.crumbs}>
              {crumbs.map((c, i) => (
                <li key={c.text}>
                  {c.href ? (
                    <Link href={c.href}>{c.text}</Link>
                  ) : (
                    <span aria-current={i === crumbs.length - 1 ? "page" : undefined}>{c.text}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {meta && meta.length > 0 && (
          <p className="meta">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        )}
        <h1 id="page-title" className={size === "long" ? s.titleLong : s.title}>
          {title}
        </h1>
        {lede && <p className={`lede ${s.lede}`}>{lede}</p>}
        {children}
      </div>
    </section>
  );
}
