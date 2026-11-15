"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import type { PicData } from "@/cms/apply";
import { uploadImageAction } from "../photo-actions";

export type LibItem = { id: string; pic: PicData };

const LibraryContext = createContext<LibItem[]>([]);
/** Pustaka foto dikirim sekali untuk seluruh halaman, bukan per kartu. */
export function LibraryProvider({ items, children }: { items: LibItem[]; children: ReactNode }) {
  return <LibraryContext.Provider value={items}>{children}</LibraryContext.Provider>;
}
export const useLibrary = () => useContext(LibraryContext);

/** Alamat gambar kecil untuk pratinjau (lewat pengoptimal gambar Next). */
export const thumb = (src: string, w = 384) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

const MAX_SIDE = 2000;

/** Kecilkan foto di browser (sisi terpanjang 2000 px, JPEG) dan hitung warna rata-rata. */
async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number; color: string }> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bmp, 0, 0, w, h);
  const tiny = document.createElement("canvas");
  tiny.width = tiny.height = 1;
  tiny.getContext("2d")!.drawImage(canvas, 0, 0, 1, 1);
  const [r, g, b] = tiny.getContext("2d")!.getImageData(0, 0, 1, 1).data;
  const color = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  let blob: Blob | null = null;
  for (const q of [0.86, 0.75, 0.62]) {
    blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", q));
    if (blob && blob.size <= 3_300_000) break;
  }
  if (!blob) throw new Error("Foto tidak bisa diproses.");
  return { blob, w, h, color };
}

/** Tombol pilih berkas: mengecilkan, mengunggah, lalu memanggil `onDone` dengan alamat foto baru. */
export function UploadButton({ name, onDone, label = "Unggah foto…" }: { name: string; onDone: (p: Pick<PicData, "src" | "w" | "h" | "color">) => void; label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <span>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setBusy(true);
          setError("");
          try {
            const { blob, w, h, color } = await prepare(file);
            const fd = new FormData();
            fd.set("file", new File([blob], "foto.jpg", { type: "image/jpeg" }));
            fd.set("w", String(w));
            fd.set("h", String(h));
            fd.set("color", color);
            fd.set("name", name);
            const res = await uploadImageAction(fd);
            if (res.error || !res.src) setError(res.error ?? "Gagal mengunggah.");
            else onDone({ src: res.src, w: res.w!, h: res.h!, color: res.color! });
          } catch (err) {
            setError((err as Error).message || "Gagal memproses foto.");
          } finally {
            setBusy(false);
          }
        }}
      />
      <button type="button" className="btn small" disabled={busy} onClick={() => input.current?.click()}>
        {busy ? "Mengunggah…" : label}
      </button>
      {error && (
        <span className="note bad small" role="alert" style={{ marginLeft: "0.5rem" }}>
          {error}
        </span>
      )}
    </span>
  );
}

/** Daftar foto yang sudah ada di situs untuk dipilih. */
export function LibraryPicker({ onPick }: { onPick: (p: PicData) => void }) {
  const items = useLibrary();
  return (
    <div className="card" style={{ marginTop: "0.5rem", maxHeight: "22rem", overflow: "auto" }}>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(7rem, 1fr))", gap: "0.5rem" }}>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            title={it.pic.alt.id}
            onClick={() => onPick(it.pic)}
            style={{ border: 0, padding: 0, background: "none", cursor: "pointer", textAlign: "left" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="thumb" src={thumb(it.pic.src, 256)} alt={it.pic.alt.id} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
