"use client";

import { useActionState, useMemo, useState } from "react";
import { saveTextAction } from "../../actions";

export type Side = { original: string; value: string };
export type Field = { path: string; en: Side; id: Side };

const humanize = (path: string) =>
  path
    .split(".")
    .map((s, i, all) => (/^\d+$/.test(s) ? `nomor ${Number(s) + 1}` : s.replace(/([a-z])([A-Z])/g, "$1 $2")) + (i === all.length - 1 ? "" : " ›"))
    .join(" ");

function Box({ name, side, label }: { name: string; side: Side; label: string }) {
  const [value, setValue] = useState(side.value);
  const changed = value !== side.original;
  return (
    <div className={changed ? "changed" : undefined}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <label htmlFor={name} className="lang" style={{ marginBottom: 0 }}>
          {label}
        </label>
        {changed && (
          <button type="button" className="btn small" onClick={() => setValue(side.original)}>
            Kembalikan
          </button>
        )}
      </div>
      <textarea
        id={name}
        name={`t:${name}`}
        value={value}
        rows={Math.min(14, Math.max(2, Math.ceil(side.original.length / 55)))}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function TextForm({ scope, fields }: { scope: string; fields: Field[] }) {
  const [state, action, pending] = useActionState(saveTextAction.bind(null, scope), undefined);
  const sections = useMemo(() => {
    const map = new Map<string, Field[]>();
    for (const f of fields) {
      const head = f.path.split(".")[0];
      map.set(head, [...(map.get(head) ?? []), f]);
    }
    return [...map];
  }, [fields]);

  return (
    <form action={action}>
      {sections.map(([head, list], i) => {
        const edited = list.filter((f) => f.en.value !== f.en.original || f.id.value !== f.id.original).length;
        return (
          <details key={head} className="sec" open={i === 0 || edited > 0}>
            <summary>
              {head.replace(/([a-z])([A-Z])/g, "$1 $2")} <span className="muted small">({list.length} teks)</span>{" "}
              {edited > 0 && <span className="badge">{edited} diubah</span>}
            </summary>
            <div className="body">
              {list.map((f) => (
                <div key={f.path} className="field">
                  <div className="path">{humanize(f.path)}</div>
                  <div className="pair">
                    <Box name={`en.${f.path}`} side={f.en} label="English" />
                    <Box name={`id.${f.path}`} side={f.id} label="Indonesia" />
                  </div>
                </div>
              ))}
            </div>
          </details>
        );
      })}
      <div className="sticky">
        <button className="btn primary" type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : "Simpan draf"}
        </button>
        {state?.message && (
          <span className={state.ok ? "" : "note bad"} role="status">
            {state.message}
          </span>
        )}
        {state?.errors && (
          <ul className="small" style={{ margin: 0 }}>
            {state.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
