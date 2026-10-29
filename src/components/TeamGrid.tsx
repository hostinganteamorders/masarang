"use client";

import { useId, useRef, useState } from "react";
import { teamCopy } from "@/content/team";
import type { Member } from "@/data/team";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import { Portrait } from "./Portrait";
import s from "./TeamGrid.module.css";

/**
 * Grid potret anggota (tata letak mengikuti halaman tim thryve.earth, tanpa foto mereka).
 * Mengetuk kartu membuka lembar dialog berisi tugas dan latar belakang.
 */
export function TeamGrid({
  locale,
  members,
  columns = 3,
}: {
  locale: Locale;
  members: Member[];
  columns?: 3 | 4 | 5;
}) {
  const t = teamCopy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const titleId = useId();

  const current = members.find((m) => m.id === openId);
  const seedOf = (id: string) => members.findIndex((m) => m.id === id) + 1;

  const open = (id: string) => {
    setOpenId(id);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <ul className={`${s.grid} ${columns === 4 ? s.four : columns === 5 ? s.five : ""}`}>
        {members.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              className={s.card}
              aria-haspopup="dialog"
              aria-label={fill(t.card.open, { name: m.name[locale], role: m.role[locale] })}
              onClick={() => open(m.id)}
            >
              <Portrait
                name={m.name[locale]}
                src={m.photo}
                placeholder={m.namePh}
                seed={i + 1}
                className={s.portrait}
              />
              <span className={`num ${s.name}`}>
                <Ph on={m.namePh}>{m.name[locale]}</Ph>
              </span>
              <span className={s.role}>{m.role[locale]}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby={titleId}
        onClose={() => setOpenId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {current && (
          <div className={s.sheet}>
            <button type="button" className={`btn btn--ghost btn--small ${s.close}`} onClick={close}>
              {t.dialog.close}
            </button>
            <Portrait
              name={current.name[locale]}
              src={current.photo}
              placeholder={current.namePh}
              seed={seedOf(current.id)}
              className={s.sheetPortrait}
            />
            <div className={s.detail}>
              <p className={s.detailRole}>{current.role[locale]}</p>
              <h3 id={titleId} className={s.detailName}>
                <Ph on={current.namePh}>{current.name[locale]}</Ph>
              </h3>
              <h4 className={s.detailHead}>{t.dialog.duty}</h4>
              <p>{current.duty[locale]}</p>
              <h4 className={s.detailHead}>{t.dialog.bio}</h4>
              <p>
                <Ph on={current.bioPh}>{current.bio[locale]}</Ph>
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
