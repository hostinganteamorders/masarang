"use client";

import { useState, useTransition } from "react";
import type { PicData } from "@/cms/apply";
import { saveGalleryAction } from "../photo-actions";
import { LibraryPicker, thumb, UploadButton } from "./PhotoTools";

export function GalleryEditor({
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
  original: PicData[];
  current: PicData[];
  overridden: boolean;
}) {
  const [items, setItems] = useState<PicData[]>(current);
  const [saved, setSaved] = useState(overridden);
  const [showLib, setShowLib] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(items) !== JSON.stringify(current);

  const move = (i: number, d: number) =>
    setItems((list) => {
      const next = [...list];
      const j = i + d;
      if (j < 0 || j >= next.length) return list;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const save = (value: PicData[] | null) =>
    start(async () => {
      const r = await saveGalleryAction(path, value);
      setMsg({ ok: Boolean(r?.ok), text: r?.message ?? "" });
      if (r?.ok) setSaved(value !== null);
    });
  const blank = (u: Pick<PicData, "src" | "w" | "h" | "color">): PicData => ({ ...u, alt: { en: "", id: "" } });

  return (
    <section className="card" aria-label={label}>
      <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem" }}>
        {label} {saved && <span className="badge">diubah</span>} <span className="muted small">({items.length} foto)</span>
      </h3>
      <p className="small muted">
        Tampil di <a href={`/en${where}`} target="_blank" rel="noreferrer">{where}</a>. Urutan di sini = urutan di situs.
      </p>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.5rem" }}>
        {items.map((p, i) => (
          <li key={`${p.src}-${i}`} className="row" style={{ alignItems: "flex-start", borderTop: "1px solid var(--line)", paddingTop: "0.5rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(p.src, 128)} alt="" width={96} height={72} style={{ objectFit: "cover", borderRadius: 4, background: "#ddd" }} />
            <div style={{ flex: "1 1 14rem", display: "grid", gap: "0.25rem" }}>
              <input aria-label={`Keterangan nomor ${i + 1} (English)`} type="text" placeholder="Keterangan (English)" value={p.alt.en} onChange={(e) => setItems((l) => l.map((x, k) => (k === i ? { ...x, alt: { ...x.alt, en: e.target.value } } : x)))} />
              <input aria-label={`Keterangan nomor ${i + 1} (Indonesia)`} type="text" placeholder="Keterangan (Indonesia)" value={p.alt.id} onChange={(e) => setItems((l) => l.map((x, k) => (k === i ? { ...x, alt: { ...x.alt, id: e.target.value } } : x)))} />
            </div>
            <div className="row" style={{ gap: "0.25rem" }}>
              <button type="button" className="btn small" aria-label={`Naikkan foto ${i + 1}`} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
              <button type="button" className="btn small" aria-label={`Turunkan foto ${i + 1}`} disabled={i === items.length - 1} onClick={() => move(i, 1)}>↓</button>
              <button type="button" className="btn small danger" aria-label={`Hapus foto ${i + 1}`} disabled={items.length <= 1} onClick={() => setItems((l) => l.filter((_, k) => k !== i))}>Hapus</button>
            </div>
          </li>
        ))}
      </ol>
      <div className="row" style={{ marginTop: "0.75rem" }}>
        <UploadButton name={`galeri-${path}`} label="Tambah foto…" onDone={(u) => setItems((l) => [...l, blank(u)])} />
        <button type="button" className="btn small" onClick={() => setShowLib((s) => !s)} aria-expanded={showLib}>
          Tambah dari foto yang ada
        </button>
        {(saved || dirty) && (
          <button type="button" className="btn small" disabled={pending} onClick={() => { setItems(original); save(null); }}>
            Kembalikan ke awal
          </button>
        )}
      </div>
      {showLib && <LibraryPicker onPick={(p) => setItems((l) => [...l, p])} />}
      <div className="row" style={{ marginTop: "0.75rem" }}>
        <button type="button" className="btn primary small" disabled={pending || !dirty} onClick={() => save(items)}>
          {pending ? "Menyimpan…" : "Simpan galeri"}
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
