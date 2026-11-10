import type { ReactNode } from "react";
import { Ph } from "./Ph";
import s from "./VisionBand.module.css";

/** Pernyataan visi dalam pita berwarna (hijau Restoration). Bila `ph`, isi masih penanda tempat. */
export function VisionBand({ title, children, ph }: { title: string; children: ReactNode; ph?: boolean }) {
  return (
    <section id="vision" className={`${s.band} on-restoration`} aria-labelledby="vision-title">
      <div className={`container ${s.inner}`}>
        <h2 id="vision-title" className={`title-md ${s.title}`}>
          {title}
        </h2>
        <p className={s.statement}>
          <Ph on={ph}>{children}</Ph>
        </p>
      </div>
    </section>
  );
}
