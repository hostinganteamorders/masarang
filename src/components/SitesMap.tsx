import type { CSSProperties } from "react";
import { places } from "@/data/places";
import s from "./SitesMap.module.css";

const Z = 10;
const TILE = 256;
const SIZE = TILE * 2 ** Z;
const PAD = 70;

const px = (lon: number) => ((lon + 180) / 360) * SIZE;
const py = (lat: number) => ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * SIZE;
const tileUrl = (z: number, y: number, x: number) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/${z}/${y}/${x}`;

/**
 * Peta wilayah dengan pin bernomor. Ubin dari Esri (abu-abu muda), pin dihitung dari `places`.
 * Komponen server, tanpa skrip: pin adalah tautan ke kartu lokasi di halaman yang sama.
 */
export function SitesMap({ items, label, note }: { items: { id: string; name: string }[]; label: string; note: string }) {
  const pins = items.flatMap((it, i) => (places[it.id] ? [{ ...it, n: i + 1, x: px(places[it.id].lon), y: py(places[it.id].lat) }] : []));
  const left = Math.min(...pins.map((p) => p.x)) - PAD;
  const right = Math.max(...pins.map((p) => p.x)) + PAD;
  const top = Math.min(...pins.map((p) => p.y)) - PAD;
  const bottom = Math.max(...pins.map((p) => p.y)) + PAD;
  const W = right - left;
  const H = bottom - top;
  const tiles: { key: string; tx: number; ty: number }[] = [];
  for (let ty = Math.floor(top / TILE); ty <= Math.floor(bottom / TILE); ty++)
    for (let tx = Math.floor(left / TILE); tx <= Math.floor(right / TILE); tx++) tiles.push({ key: `${tx}/${ty}`, tx, ty });

  return (
    <figure className={s.figure}>
      <div className={s.map} role="group" aria-label={label} style={{ aspectRatio: `${Math.round(W)} / ${Math.round(H)}` }}>
        {tiles.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={t.key}
            className={s.tile}
            src={tileUrl(Z, t.ty, t.tx)}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ left: `${((t.tx * TILE - left) / W) * 100}%`, top: `${((t.ty * TILE - top) / H) * 100}%`, width: `${(TILE / W) * 100}%`, height: `${(TILE / H) * 100}%` }}
          />
        ))}
        <ol className={s.pins}>
          {pins.map((p) => (
            <li key={p.id} style={{ left: `${((p.x - left) / W) * 100}%`, top: `${((p.y - top) / H) * 100}%` } as CSSProperties}>
              <a href={`#site-${p.id}`} className={s.pin} aria-label={p.name}>
                {p.n}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className={s.caption}>
        {note} <span>Map tiles: Esri, HERE, Garmin, OpenStreetMap contributors.</span>
      </figcaption>
    </figure>
  );
}
