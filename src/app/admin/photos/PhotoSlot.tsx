"use client";

import { useState, useTransition } from "react";
import type { PicData } from "@/cms/apply";
import { saveSlotAction } from "../photo-actions";
import { LibraryPicker, thumb, UploadButton } from "./PhotoTools";

export function PhotoSlot({
  path,
  label,
  where,
  original,
  current,
  overridden,
}: {
  path: string;
  label: string;
  where: string;
  original: PicData;
  current: PicData;
  overridden: boolean;
}) {
  const [pic, setPic] = useState<PicData>(current);
  const [saved, setSaved] = useState(overridden);
  const [showLib, setShowLib] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(pic) !== JSON.stringify(current) || false;

  const save = (value: PicData | null) =>
    start(async () => {
      const r = await saveSlotAction(path, value);
      setMsg({ ok: Boolean(r?.ok), text: r?.message ?? "" });
      if (r?.ok) setSaved(value !== null);
    });

  return (
    <section className="card" aria-label={label} style={{ marginBottom: 0 }}>
      <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem" }}>
        {label} {saved && <span className="badge">diganti</span>}
      </h3>
      <p className="small muted" style={{ marginBottom: "0.5rem" }}>
        Tampil di <a href={`/en${where}`} target="_blank" rel="noreferrer">{where || "/"}</a>
      </p>
      <button
        type="button"
        aria-label="Klik gambar untuk menentukan bagian yang selalu terlihat saat foto dipotong"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const x = Math.round(((e.clientX - r.left) / r.width) * 100);
          const y = Math.round(((e.clientY - r.top) / r.height) * 100);
          setPic((p) => ({ ...p, focus: `${x}% ${y}%` }));
        }}
        style={{ position: "relative", display: "block", width: "100%", padding: 0, border: 0, background: "none", cursor: "crosshair" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="thumb" src={thumb(pic.src)} alt={pic.alt.id} style={{ objectPosition: pic.focus ?? "50% 50%" }} />
        {pic.focus && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: pic.focus.split(" ")[0],
              top: pic.focus.split(" ")[1],
              width: 14,
              height: 14,
              marginLeft: -7,
              marginTop: -7,
              borderRadius: "50%",
              border: "2px solid #fff",
              background: "#e87b36",
              boxShadow: "0 0 0 1px #000",
            }}
          />
        )}
      </button>
      <p className="small muted">Klik gambar untuk menandai bagian terpenting; bagian itu dipertahankan saat foto dipotong.</p>

      <div className="row" style={{ marginBottom: "0.5rem" }}>
        <UploadButton name={path.replace(/\./g, "-")} onDone={(u) => setPic((p) => ({ ...p, ...u, focus: undefined }))} />
        <button type="button" className="btn small" onClick={() => setShowLib((s) => !s)} aria-expanded={showLib}>
          Pilih dari foto yang ada
        </button>
        {(saved || dirty) && (
          <button type="button" className="btn small" disabled={pending} onClick={() => { setPic(original); save(null); }}>
            Kembalikan ke awal
          </button>
        )}
      </div>
      {showLib && (
        <LibraryPicker
          onPick={(p) => {
            setPic(p);
            setShowLib(false);
          }}
        />
      )}

      <p>
        <label htmlFor={`${path}-en`}>Keterangan foto (English)</label>
        <input id={`${path}-en`} type="text" value={pic.alt.en} onChange={(e) => setPic({ ...pic, alt: { ...pic.alt, en: e.target.value } })} />
      </p>
      <p>
        <label htmlFor={`${path}-id`}>Keterangan foto (Indonesia)</label>
        <input id={`${path}-id`} type="text" value={pic.alt.id} onChange={(e) => setPic({ ...pic, alt: { ...pic.alt, id: e.target.value } })} />
        <span className="small muted">Dibaca pembaca layar dan tampil di pop-up foto. Gambarkan isi foto.</span>
      </p>
      <div className="row">
        <button type="button" className="btn primary small" disabled={pending || !dirty} onClick={() => save(pic)}>
          {pending ? "Menyimpan…" : "Simpan foto"}
        </button>
        {msg && (
          <span className={msg.ok ? "small" : "note bad small"} role="status">
            {msg.text}
          </span>
        )}
      </div>
    </section>
  );
}
