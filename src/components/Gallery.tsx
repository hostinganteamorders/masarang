"use client";

import Image from "next/image";
import { useId, useRef, useState, type CSSProperties } from "react";
import { common } from "@/content/common";
import type { Pic } from "@/data/photos";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { justify } from "@/lib/rows";
import s from "./Gallery.module.css";

/**
 * Galeri foto: baris-baris dengan tinggi sama dan foto tidak dipotong (potret dan lanskap bercampur),
 * lalu lightbox untuk melihat foto penuh dengan keterangannya.
 * Susunan barisnya dihitung dari rasio tiap foto (lihat `src/lib/rows.ts`).
 */
export function Gallery({
  items,
  locale,
  labelledBy,
}: {
  items: Pic[];
  locale: Locale;
  /** id judul bagian yang memuat galeri ini. */
  labelledBy?: string;
}) {
  const t = common[locale].gallery;
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const rows = justify(items);
  const current = items[index];

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
    dialog.current?.showModal();
  };
  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <>
      <div className={s.grid} role="group" aria-labelledby={labelledBy}>
        {rows.map((row, r) => {
          const sum = row.reduce((total, p) => total + p.w / p.h, 0);
          return (
            <div key={r} className={s.row}>
              {row.map((p) => {
                const ratio = p.w / p.h;
                return (
                  <button
                    key={p.key}
                    type="button"
                    className={s.item}
                    style={{ ["--r" as string]: ratio.toFixed(4), ["--c" as string]: p.color } as CSSProperties}
                    aria-haspopup="dialog"
                    aria-label={fill(t.open, { label: p.alt[locale] })}
                    onClick={() => openAt(items.indexOf(p))}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes={`(max-width: 40rem) 100vw, ${Math.ceil((ratio / sum) * 92)}vw`}
                      className={s.image}
                    />
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (items.length < 2) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {open && current && (
          <div className={s.sheet}>
            <div className={s.stage}>
              <Image key={current.key} src={current.src} alt={current.alt[locale]} fill sizes="100vw" className={s.full} />
            </div>
            <div className={s.bar}>
              <p id={titleId} className={s.caption}>
                {current.alt[locale]}
              </p>
              <p className={s.count}>
                {fill(t.count, { n: index + 1, total: items.length })}
              </p>
              <div className={s.buttons}>
                {items.length > 1 && (
                  <>
                    <button type="button" className="btn btn--ghost btn--small" onClick={() => step(-1)}>
                      {t.previous}
                    </button>
                    <button type="button" className="btn btn--ghost btn--small" onClick={() => step(1)}>
                      {t.next}
                    </button>
                  </>
                )}
                <button type="button" className="btn btn--small" onClick={() => dialog.current?.close()}>
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
