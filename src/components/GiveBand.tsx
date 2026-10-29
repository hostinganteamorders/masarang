import Link from "next/link";
import type { ReactNode } from "react";
import { idrAuto } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./GiveBand.module.css";

const TONE_CLASS = { leaf: "on-restoration", forest: "on-dark", deep: "on-dark" } as const;

/**
 * Pita dengan satu angka besar di kiri, lalu judul, penjelasan, dan satu tombol di kanan.
 * Dipakai untuk ajakan menyumbang (nominal rupiah) dan untuk sorotan angka (mis. porsi biaya operasional).
 * Beri `amount` (rupiah) atau `value` (simpul bebas).
 */
export function GiveBand({
  locale,
  amount,
  ph,
  value,
  caption,
  title,
  body,
  href,
  cta,
  tone = "leaf",
}: {
  locale: Locale;
  amount?: number;
  ph?: boolean;
  value?: ReactNode;
  /** Keterangan kecil di bawah angka, mis. "dari total belanja". */
  caption?: string;
  title: ReactNode;
  body: ReactNode;
  href: string;
  cta: string;
  tone?: keyof typeof TONE_CLASS;
}) {
  // Nominal panjang (mis. "Rp 150,000") memakai ukuran lebih kecil agar muat di kolom kirinya.
  const text = value === undefined ? idrAuto(amount ?? 0, locale) : undefined;
  const long = text !== undefined && text.length > 9;

  return (
    <section className={`${s.band} ${TONE_CLASS[tone]}`} data-tone={tone}>
      <div className={`container ${s.inner}`}>
        <div className={s.figure}>
          <p className={`num ${s.amount} ${long ? s.amountLong : ""}`}>
            {value ?? <Ph on={ph}>{text}</Ph>}
          </p>
          {caption && <p className={s.caption}>{caption}</p>}
        </div>
        <div className={s.text}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.body}>{body}</p>
          <Link href={href} className="btn">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
