import type { ReactNode } from "react";
import { Ph } from "./Ph";
import s from "./StatRow.module.css";

export type StatItem = {
  label: string;
  value: ReactNode;
  unit?: string;
  /** Catatan kecil di bawah label (mis. padanan dolar AS). */
  note?: string;
  /** true = angka masih contoh (garis bawah titik-titik selama draf). */
  ph?: boolean;
};

/** Deretan angka besar dengan label di bawahnya. Warna mengikuti konteks bagian (on-*). */
export function StatRow({ stats, size = "lg" }: { stats: StatItem[]; size?: "lg" | "md" }) {
  return (
    <dl className={`${s.row} ${size === "md" ? s.md : ""}`}>
      {stats.map((st) => (
        <div key={st.label} className={s.stat}>
          <dt>
            {st.label}
            {st.note && <span className={s.note}>{st.note}</span>}
          </dt>
          <dd className={`num ${s.value}`}>
            <Ph on={st.ph}>
              {st.value}
              {st.unit && <span className={s.unit}>{st.unit}</span>}
            </Ph>
          </dd>
        </div>
      ))}
    </dl>
  );
}
