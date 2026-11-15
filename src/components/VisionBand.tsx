import type { ReactNode } from "react";
import { Ph } from "./Ph";
import s from "./VisionBand.module.css";

/**
 * Pernyataan visi dalam pita berwarna (hijau Restoration): kalimat utama besar, lalu paragraf penjelas.
 * Bila `ph`, isi masih penanda tempat.
 */
export function VisionBand({
  title,
  statement,
  children,
  ph,
}: {
  title: string;
  statement: ReactNode;
  children?: ReactNode;
  ph?: boolean;
}) {
  return (
    <section id="vision" className={`${s.band} on-restoration`} aria-labelledby="vision-title">
      <div className={`container ${s.inner}`}>
        <h2 id="vision-title" className={`title-md ${s.title}`}>
          {title}
        </h2>
        <div>
          <p className={s.statement}>
            <Ph on={ph}>{statement}</Ph>
          </p>
          {children && <div className={s.more}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
