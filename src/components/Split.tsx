import type { ReactNode } from "react";
import s from "./Split.module.css";

/** Dua kolom dengan perbandingan lebar tertentu; menjadi satu kolom di layar sempit (urutan DOM dipertahankan). */
export function Split({
  left,
  right,
  ratio = "1-1",
  align = "start",
  reverse = false,
}: {
  left: ReactNode;
  right: ReactNode;
  ratio?: "1-1" | "5-6" | "6-5" | "4-7" | "7-4";
  align?: "start" | "center" | "end";
  /** Tukar sisi di layar lebar. */
  reverse?: boolean;
}) {
  return (
    <div className={s.split} data-ratio={ratio} data-align={align} data-reverse={reverse || undefined}>
      <div className={s.cell}>{left}</div>
      <div className={s.cell}>{right}</div>
    </div>
  );
}
