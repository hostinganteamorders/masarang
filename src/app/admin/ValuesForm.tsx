"use client";

import { useActionState, useState } from "react";
import { saveValuesAction } from "./actions";

export type ValueView = {
  id: string;
  label: string;
  help?: string;
  section?: string;
  kind: "url" | "text" | "bool" | "number";
  value: string | number | boolean | undefined;
  original: string | number | boolean | undefined;
  /** Ada bila angka ini bisa ditandai "masih contoh". */
  ph?: { value: boolean; original: boolean };
};

export function ValuesForm({ groupId, fields }: { groupId: string; fields: ValueView[] }) {
  const [state, action, pending] = useActionState(saveValuesAction.bind(null, groupId), undefined);
  // Terkendali agar isian tidak kembali ke nilai awal setelah formulir dikirim.
  const [vals, setVals] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(fields.map((f) => [f.id, f.kind === "bool" ? Boolean(f.value) : f.value === undefined ? "" : String(f.value)])),
  );
  const [phs, setPhs] = useState<Record<string, boolean>>(() => Object.fromEntries(fields.filter((f) => f.ph).map((f) => [f.id, f.ph!.value])));
  return (
    <form action={action} className="card">
      {fields.map((f, i) => (
        <div key={f.id}>
          {f.section && f.section !== fields[i - 1]?.section && <h2 className="sub">{f.section}</h2>}
        <p>
          {f.kind === "bool" ? (
            <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="checkbox"
                name={`v:${f.id}`}
                checked={vals[f.id] === true}
                onChange={(e) => setVals((v) => ({ ...v, [f.id]: e.target.checked }))}
              />{" "}
              {f.label}
            </label>
          ) : (
            <>
              <label htmlFor={`v-${f.id}`}>{f.label}</label>
              <input
                id={`v-${f.id}`}
                name={`v:${f.id}`}
                type={f.kind === "number" ? "number" : "text"}
                step={f.kind === "number" ? "any" : undefined}
                inputMode={f.kind === "url" ? "url" : undefined}
                value={String(vals[f.id])}
                onChange={(e) => {
                  setVals((v) => ({ ...v, [f.id]: e.target.value }));
                  // Mengubah angka berarti angka itu sudah diperiksa: tanda "contoh" dicabut (boleh dicentang lagi).
                  if (f.ph) setPhs((p) => ({ ...p, [f.id]: false }));
                }}
                placeholder={f.original === undefined ? "" : `Awal: ${String(f.original)}`}
              />
            </>
          )}
          {f.help && <span className="muted small">{f.help}</span>}
          {f.ph && (
            <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontWeight: 400, marginTop: "0.25rem" }}>
              <input type="checkbox" name={`ph:${f.id}`} checked={phs[f.id] === true} onChange={(e) => setPhs((p) => ({ ...p, [f.id]: e.target.checked }))} style={{ width: "auto" }} />
              Masih contoh (garis titik-titik di situs)
            </label>
          )}
        </p>
        </div>
      ))}
      <div className="row">
        <button className="btn primary" type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : "Simpan draf"}
        </button>
        {state?.message && (
          <span className={state.ok ? "" : "note bad"} role="status">
            {state.message}
          </span>
        )}
      </div>
      {state?.errors && (
        <ul className="small">
          {state.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
