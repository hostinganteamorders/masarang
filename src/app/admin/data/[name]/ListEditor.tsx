"use client";

import { useRef, useState, useTransition } from "react";
import type { FieldDef } from "@/cms/collections";
import type { ListView } from "../../data-types";
import { restoreListAction, saveListAction, uploadAssetAction } from "../../list-actions";

type Item = Record<string, unknown> & { __k: string };

const uid = () => Math.random().toString(36).slice(2, 10);
const withKey = (o: Record<string, unknown>): Item => ({ ...JSON.parse(JSON.stringify(o)), __k: uid() });
const strip = (it: Item) => {
  const { __k, ...rest } = it;
  void __k;
  return rest;
};

function getAt(o: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((n, k) => (n && typeof n === "object" ? (n as Record<string, unknown>)[k] : undefined), o);
}
function setAt(o: Item, path: string, value: unknown): Item {
  const copy: Item = JSON.parse(JSON.stringify(o));
  const parts = path.split(".");
  let n: Record<string, unknown> = copy;
  for (const p of parts.slice(0, -1)) {
    if (typeof n[p] !== "object" || n[p] === null) n[p] = {};
    n = n[p] as Record<string, unknown>;
  }
  n[parts[parts.length - 1]] = value;
  return copy;
}

/** Kecilkan gambar di browser. PNG tetap PNG (agar latar transparan terjaga), selain itu JPEG. */
async function shrink(file: File, maxSide: number): Promise<File> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bmp.width * scale));
  canvas.height = Math.max(1, Math.round(bmp.height * scale));
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const png = file.type === "image/png";
  const blob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Gagal memproses gambar."))), png ? "image/png" : "image/jpeg", 0.85));
  return new File([blob], file.name, { type: blob.type });
}

function FileField({ f, value, onChange, hint }: { f: FieldDef; value: string; onChange: (v: string) => void; hint: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const isImage = f.type === "image";
  const pick = async (file: File | undefined) => {
    if (!file) return;
    setErr("");
    setBusy(true);
    try {
      let upload = file;
      if (isImage) {
        if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) throw new Error("Pilih berkas gambar JPEG atau PNG.");
        upload = await shrink(file, f.maxSide ?? (f.key === "logo" ? 600 : 1000));
      }
      const fd = new FormData();
      fd.set("file", upload);
      fd.set("kind", isImage ? "image" : "pdf");
      fd.set("name", file.name.replace(/\.[^.]+$/, "").slice(0, 30) || "berkas");
      const r = await uploadAssetAction(fd);
      if (r.error || !r.src) throw new Error(r.error ?? "Gagal mengunggah.");
      onChange(r.src);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };
  return (
    <div className="filebox">
      {isImage && value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="prev" src={value} alt="" />
      )}
      <input type="text" inputMode="url" aria-label={`${f.label}: alamat berkas`} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Alamat berkas atau https://…" />
      <input ref={input} type="file" accept={isImage ? "image/jpeg,image/png" : "application/pdf"} hidden aria-label={`${f.label}: pilih berkas ${hint}`} onChange={(e) => void pick(e.target.files?.[0])} />
      <button type="button" className="btn small" disabled={busy} onClick={() => input.current?.click()}>
        {busy ? "Mengunggah…" : "Unggah"}
      </button>
      {value && (
        <button type="button" className="btn small" onClick={() => onChange("")}>
          Kosongkan
        </button>
      )}
      {err && (
        <span className="note bad small" role="status" style={{ flexBasis: "100%", margin: 0 }}>
          {err}
        </span>
      )}
    </div>
  );
}

function Field({ f, item, i, onSet }: { f: FieldDef; item: Item; i: number; onSet: (path: string, v: unknown) => void }) {
  const id = `f-${item.__k}-${f.key}`;
  const label = f.label;
  if (f.type === "bool") {
    return (
      <div className="ff">
        <label className="chk">
          <input type="checkbox" checked={getAt(item, f.key) === true} onChange={(e) => onSet(f.key, e.target.checked)} /> {label}
        </label>
      </div>
    );
  }
  const control = (path: string, aria: string, domId: string) => {
    const v = getAt(item, path);
    if (f.type === "long")
      return <textarea id={domId} aria-label={aria} rows={4} value={typeof v === "string" ? v : ""} onChange={(e) => onSet(path, e.target.value)} />;
    if (f.type === "select")
      return (
        <select id={domId} aria-label={aria} value={v === undefined ? "" : String(v)} onChange={(e) => onSet(path, e.target.value)}>
          <option value="">— pilih —</option>
          {f.options!.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    if (f.type === "pdf" || f.type === "image")
      return <FileField f={f} value={typeof v === "string" ? v : ""} onChange={(x) => onSet(path, x)} hint={`butir ${i + 1}`} />;
    return (
      <input
        id={domId}
        aria-label={aria}
        type={f.type === "number" ? "number" : "text"}
        inputMode={f.type === "url" ? "url" : undefined}
        value={v === null || v === undefined ? "" : String(v)}
        onChange={(e) => onSet(path, f.type === "number" ? (e.target.value === "" ? (f.nullable ? null : "") : e.target.value) : e.target.value)}
      />
    );
  };
  if (f.l10n) {
    return (
      <div className="ff">
        <span className="lbl">{label}</span>
        <div className="pair">
          <div>
            <span className="lang">Inggris</span>
            {control(`${f.key}.en`, `${label} (Inggris), butir ${i + 1}`, `${id}-en`)}
          </div>
          <div>
            <span className="lang">Indonesia</span>
            {control(`${f.key}.id`, `${label} (Indonesia), butir ${i + 1}`, `${id}-id`)}
          </div>
        </div>
        {f.help && <span className="muted small">{f.help}</span>}
      </div>
    );
  }
  const isFile = f.type === "pdf" || f.type === "image";
  return (
    <div className="ff">
      {isFile ? <span className="lbl">{label}</span> : <label htmlFor={id} className="lbl">{label}</label>}
      {control(f.key, `${label}, butir ${i + 1}`, id)}
      {f.help && <span className="muted small">{f.help}</span>}
    </div>
  );
}

export function ListEditor({ view, initial, overridden }: { view: ListView; initial: Record<string, unknown>[]; overridden: boolean }) {
  const [items, setItems] = useState<Item[]>(() => initial.map(withKey));
  const [saved, setSaved] = useState(overridden);
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string; errors?: string[] } | null>(null);
  const [pending, start] = useTransition();
  const [q, setQ] = useState("");

  const titleOf = (it: Item) => {
    const v = getAt(it, view.titleKey);
    const t = typeof v === "string" ? v : typeof getAt(v, "id") === "string" ? (getAt(v, "id") as string) : "";
    return t || "(belum diberi judul)";
  };
  const subOf = (it: Item) => (view.subKey ? String(getAt(it, view.subKey) ?? "") : "");
  const update = (k: string, path: string, value: unknown) => setItems((all) => all.map((it) => (it.__k === k ? setAt(it, path, value) : it)));
  const move = (idx: number, d: number) =>
    setItems((all) => {
      const to = idx + d;
      if (to < 0 || to >= all.length) return all;
      const c = [...all];
      [c[idx], c[to]] = [c[to], c[idx]];
      return c;
    });
  const add = () => {
    const it = withKey(view.blank);
    setItems((all) => [...all, it]);
    setOpen(it.__k);
  };
  const save = () =>
    start(async () => {
      setMsg(null);
      const r = await saveListAction(view.id, items.map(strip));
      setMsg({ ok: Boolean(r.ok), text: r.message ?? "", errors: r.errors });
      if (r.ok && r.items) {
        // Pakai hasil bersih dari server (id baru, urutan otomatis), pertahankan butir yang sedang dibuka bila masih ada.
        setItems(r.items.map(withKey));
        setSaved(true);
        setOpen(null);
      }
    });
  const restore = () =>
    start(async () => {
      const r = await restoreListAction(view.id);
      setMsg({ ok: Boolean(r.ok), text: r.message ?? "" });
      if (r.ok) window.location.reload();
    });

  return (
    <>
      <p className="muted small" aria-live="polite">
        {items.length} butir {saved && <span className="badge">diubah</span>}
      </p>
      {items.length > 12 && (
        <p>
          <label htmlFor="list-filter">Cari di daftar</label>
          <input id="list-filter" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ketik nama atau nomor" />
        </p>
      )}
      {items.length === 0 && <p className="note warn">Daftar kosong. Tekan &quot;{view.addLabel}&quot;.</p>}
      {items.map((it, i) => (
        <details key={it.__k} className="item" hidden={q.trim() !== "" && !`${titleOf(it)} ${subOf(it)}`.toLowerCase().includes(q.trim().toLowerCase())} open={open === it.__k || undefined} onToggle={(e) => {
            const isOpen = e.currentTarget.open;
            setOpen((o) => (isOpen ? it.__k : o === it.__k ? null : o));
          }}>
          <summary>
            <span className="n">{i + 1}.</span> {titleOf(it)} {subOf(it) && <span className="muted small">{subOf(it)}</span>}
          </summary>
          <div className="body">
            <div className="tools">
              <button type="button" className="btn small" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Naikkan butir ${i + 1}`}>
                ↑ Naik
              </button>
              <button type="button" className="btn small" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label={`Turunkan butir ${i + 1}`}>
                ↓ Turun
              </button>
              <button type="button" className="btn small danger" onClick={() => setItems((all) => all.filter((x) => x.__k !== it.__k))} aria-label={`Hapus butir ${i + 1}`}>
                Hapus
              </button>
            </div>
            {view.fields
              .filter((f) => !f.showIf || String(getAt(it, f.showIf.key) ?? "") === f.showIf.value)
              .map((f) => (
                <Field key={f.key} f={f} item={it} i={i} onSet={(path, v) => update(it.__k, path, v)} />
              ))}
          </div>
        </details>
      ))}
      <div className="sticky">
        <button type="button" className="btn" onClick={add} disabled={items.length >= view.maxItems}>
          + {view.addLabel}
        </button>
        <button type="button" className="btn primary" onClick={save} disabled={pending}>
          {pending ? "Menyimpan…" : "Simpan draf"}
        </button>
        {saved && (
          <button type="button" className="btn" onClick={restore} disabled={pending}>
            Kembalikan ke isi awal
          </button>
        )}
        {msg && (
          <span className={msg.ok ? "" : "note bad"} role="status">
            {msg.text}
          </span>
        )}
      </div>
      {msg?.errors && (
        <ul className="small note bad">
          {msg.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </>
  );
}
