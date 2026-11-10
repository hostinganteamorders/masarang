"use client";

import Image from "next/image";
import { useId, useRef, useState, type CSSProperties, type RefObject } from "react";
import { common } from "@/content/common";
import type { Pic } from "@/data/photos";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import g from "./Gallery.module.css";
import s from "./Photo.module.css";

/**
 * Foto tunggal yang bisa diklik: membuka pop-up berisi foto penuh dan keterangannya.
 * Dipakai oleh `Photo` (kecuali `zoom={false}`). Galeri berurutan memakai `Gallery`.
 */

/** Dialog pop-up satu foto; dipakai oleh `ZoomPhoto` dan `ZoomButton`. */
function PhotoDialog({
  pic,
  locale,
  dialog,
  open,
  setOpen,
}: {
  pic: Pic;
  locale: Locale;
  dialog: RefObject<HTMLDialogElement | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const t = common[locale].gallery;
  const titleId = useId();
  return (
    <dialog
      ref={dialog}
      className={g.dialog}
      aria-labelledby={titleId}
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      {open && (
        <div className={g.sheet}>
          <div className={g.stage}>
            <Image src={pic.src} alt={pic.alt[locale]} fill sizes="100vw" className={g.full} />
          </div>
          <div className={g.bar}>
            <p id={titleId} className={g.caption}>
              {pic.alt[locale]}
            </p>
            <div className={g.buttons}>
              <button type="button" className="btn btn--small" onClick={() => dialog.current?.close()}>
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/**
 * Tombol kecil di pojok untuk foto latar yang tertimpa teks (kepala halaman): membuka pop-up foto yang sama.
 * Letakkan di dalam elemen ber-`position: relative`.
 */
export function ZoomButton({ pic, locale, className }: { pic: Pic; locale: Locale; className?: string }) {
  const t = common[locale].gallery;
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`${s.corner} ${className ?? ""}`}
        aria-haspopup="dialog"
        aria-label={fill(t.open, { label: pic.alt[locale] })}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      />
      <PhotoDialog pic={pic} locale={locale} dialog={dialog} open={open} setOpen={setOpen} />
    </>
  );
}

export function ZoomPhoto({
  pic,
  locale,
  ratio,
  sizes,
  preload,
  className,
}: {
  pic: Pic;
  locale: Locale;
  ratio: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const t = common[locale].gallery;
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure
        className={`${s.slot} ${className ?? ""}`}
        style={{ aspectRatio: ratio, ["--c" as string]: pic.color } as CSSProperties}
      >
        <Image
          src={pic.src}
          alt=""
          fill
          sizes={sizes}
          preload={preload}
          className={s.image}
          style={{ objectPosition: pic.focus }}
        />
        <button
          type="button"
          className={s.zoom}
          aria-haspopup="dialog"
          aria-label={fill(t.open, { label: pic.alt[locale] })}
          onClick={() => {
            setOpen(true);
            dialog.current?.showModal();
          }}
        />
      </figure>

      <PhotoDialog pic={pic} locale={locale} dialog={dialog} open={open} setOpen={setOpen} />
    </>
  );
}
