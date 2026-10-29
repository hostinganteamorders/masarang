import type { ReactNode } from "react";
import s from "./Steps.module.css";

export type Step = { title: string; body: ReactNode };

/** Urutan langkah bernomor. Dipakai hanya untuk urutan yang sebenarnya (alur data, cara menyumbang). */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className={s.steps} style={{ ["--n" as string]: steps.length }}>
      {steps.map((st, i) => (
        <li key={st.title} className={s.step}>
          <span className={`num ${s.n}`} aria-hidden="true">
            {i + 1}
          </span>
          <h3 className={s.title}>{st.title}</h3>
          <p className={s.body}>{st.body}</p>
        </li>
      ))}
    </ol>
  );
}
