"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { SiteViewsCopy } from "@/content/siteviews";
import type { SiteView, ViewKind } from "@/data/siteviews";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./SiteViews.module.css";

type Spot = { lat: number; lon: number; zoom: number; ph: boolean };

const BCP = { en: "en-US", id: "id-ID" } as const;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function monthName(m: number, locale: Locale) {
  return new Intl.DateTimeFormat(BCP[locale], { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2000, m - 1, 1)));
}
const yearOf = (v: SiteView) => v.date.slice(0, 4);
const monthOf = (v: SiteView) => Number(v.date.slice(5, 7));
const labelOf = (v: SiteView, locale: Locale) => `${monthName(monthOf(v), locale)} ${yearOf(v)}`;

/* ---------- Pilih tahun dan bulan ---------- */
function Picker({ legend, list, value, onChange, copy, locale, idp }: { legend: string; list: SiteView[]; value: string; onChange: (id: string) => void; copy: SiteViewsCopy; locale: Locale; idp: string }) {
  const cur = list.find((v) => v.id === value) ?? list[0];
  const years = [...new Set(list.map(yearOf))];
  const inYear = list.filter((v) => yearOf(v) === yearOf(cur));
  return (
    <fieldset className={s.picker}>
      <legend>{legend}</legend>
      <div className={s.row}>
        <label>
          {copy.year}
          <select
            value={yearOf(cur)}
            onChange={(e) => {
              const c = list.filter((v) => yearOf(v) === e.target.value);
              onChange((c.find((v) => monthOf(v) === monthOf(cur)) ?? c[c.length - 1]).id);
            }}
            id={`${idp}-year`}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label>
          {copy.month}
          <select value={cur.id} onChange={(e) => onChange(e.target.value)} id={`${idp}-month`}>
            {inYear.map((v) => (
              <option key={v.id} value={v.id}>
                {monthName(monthOf(v), locale)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </fieldset>
  );
}

/* ---------- Bingkai perbandingan (garis pembatas, label, seret) ---------- */
function Stage({
  split,
  setSplit,
  tagL,
  tagR,
  hint,
  tools,
  onPan,
  label,
  children,
}: {
  split: number;
  setSplit: (n: number) => void;
  tagL: ReactNode;
  tagR: ReactNode;
  hint: string;
  tools: ReactNode;
  onPan: (dx: number, dy: number) => void;
  label: string;
  children: (w: number, h: number) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const drag = useRef<{ mode: "pan" | "split"; x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const moveSplit = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r && r.width > 0) setSplit(clamp(((clientX - r.left) / r.width) * 100, 0, 100));
  };

  return (
    <div
      ref={ref}
      className={s.stage}
      role="group"
      aria-label={label}
      tabIndex={0}
      onPointerDown={(e) => {
        const onKnob = (e.target as HTMLElement).closest("[data-knob]");
        if ((e.target as HTMLElement).closest("button")) return;
        drag.current = { mode: onKnob ? "split" : "pan", x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
        if (onKnob) moveSplit(e.clientX);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        if (d.mode === "split") return moveSplit(e.clientX);
        onPan(e.clientX - d.x, e.clientY - d.y);
        d.x = e.clientX;
        d.y = e.clientY;
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      onKeyDown={(e) => {
        const k = { ArrowLeft: [40, 0], ArrowRight: [-40, 0], ArrowUp: [0, 40], ArrowDown: [0, -40] }[e.key];
        if (k) {
          e.preventDefault();
          onPan(k[0], k[1]);
        }
      }}
    >
      {size.w > 0 && children(size.w, size.h)}
      <div className={s.divider} style={{ left: `${split}%` }} aria-hidden="true">
        <span className={s.knob} data-knob>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 5 3 11l5 6M14 5l5 6-5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <span className={`${s.tag} ${s.tagL}`}>{tagL}</span>
      <span className={`${s.tag} ${s.tagR}`}>{tagR}</span>
      <span className={s.hint}>{hint}</span>
      <div className={s.tools}>{tools}</div>
    </div>
  );
}

/* ---------- Satelit: kisi ubin Esri ---------- */
const tileUrl = (release: number | null, z: number, y: number, x: number) =>
  release
    ? `https://wayback.maptiles.arcgis.com/arcgis/rest/services/world_imagery/wmts/1.0.0/default028mm/mapserver/tile/${release}/${z}/${y}/${x}`
    : `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;

function TileLayer({ release, spot, z, pan, w, h }: { release: number | null; spot: Spot; z: number; pan: { x: number; y: number }; w: number; h: number }) {
  const tiles = useMemo(() => {
    const n = 2 ** z;
    const size = 256 * n;
    const cx = ((spot.lon + 180) / 360) * size + pan.x;
    const latRad = (spot.lat * Math.PI) / 180;
    const cy = ((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * size + pan.y;
    const left = cx - w / 2;
    const top = cy - h / 2;
    const out: { key: string; x: number; y: number; tx: number; ty: number }[] = [];
    for (let ty = Math.floor(top / 256); ty <= Math.floor((top + h) / 256); ty++) {
      if (ty < 0 || ty >= n) continue;
      for (let tx = Math.floor(left / 256); tx <= Math.floor((left + w) / 256); tx++) {
        out.push({ key: `${tx}/${ty}`, x: Math.round(tx * 256 - left), y: Math.round(ty * 256 - top), tx: ((tx % n) + n) % n, ty });
      }
    }
    return out;
  }, [spot.lat, spot.lon, z, pan.x, pan.y, w, h]);
  return (
    <>
      {tiles.map((t) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={t.key} data-map-tile className={s.tile} style={{ left: t.x, top: t.y }} src={tileUrl(release, z, t.ty, t.tx)} alt="" draggable={false} loading="eager" decoding="async" />
      ))}
    </>
  );
}

/* ---------- 360°: WebGL, satu kanvas dengan dua tekstur ---------- */
const VS = "attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.,1.);}";
const FS = `precision highp float;varying vec2 v;uniform sampler2D a;uniform sampler2D b;uniform float yaw;uniform float pitch;uniform float fov;uniform float aspect;uniform float split;
void main(){
  float t=tan(fov*0.5);
  vec3 d=normalize(vec3(v.x*aspect*t,v.y*t,-1.0));
  float cp=cos(pitch),sp=sin(pitch);
  d=vec3(d.x,d.y*cp-d.z*sp,d.y*sp+d.z*cp);
  float cy=cos(yaw),sy=sin(yaw);
  d=vec3(d.x*cy-d.z*sy,d.y,d.x*sy+d.z*cy);
  float lon=atan(d.x,-d.z);
  float lat=asin(clamp(d.y,-1.0,1.0));
  vec2 tc=vec2(lon/6.28318530718+0.5,0.5-lat/3.14159265359);
  gl_FragColor=(v.x*0.5+0.5)<split?texture2D(a,tc):texture2D(b,tc);
}`;

type GL = { gl: WebGLRenderingContext; u: Record<string, WebGLUniformLocation | null>; tex: Map<string, WebGLTexture>; blank: WebGLTexture };
export type PanoView = { yaw: number; pitch: number; fov: number };

function PanoLayer({ a, b, split, view, w, h, onFail }: { a: string; b: string; split: number; view: PanoView; w: number; h: number; onFail: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const g = useRef<GL | null>(null);
  const [tick, setTick] = useState(0);
  const ready = tick > 0;

  useEffect(() => {
    const c = canvas.current;
    const gl = c?.getContext("webgl", { antialias: false, preserveDrawingBuffer: false }) as WebGLRenderingContext | null;
    if (!c || !gl) return onFail();
    const sh = (type: number, src: string) => {
      const o = gl.createShader(type)!;
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return onFail();
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const blank = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, blank);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([29, 42, 32, 255]));
    const u: GL["u"] = {};
    for (const n of ["a", "b", "yaw", "pitch", "fov", "aspect", "split"]) u[n] = gl.getUniformLocation(prog, n);
    g.current = { gl, u, tex: new Map(), blank };
    setTick((t) => t + 1);
    return () => {
      g.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const st = g.current;
    if (!st) return;
    let alive = true;
    for (const src of new Set([a, b])) {
      if (st.tex.has(src)) continue;
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => {
        if (!alive || !g.current) return;
        const { gl } = g.current;
        const max = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
        let source: TexImageSource = im;
        if (im.width > max) {
          const c = document.createElement("canvas");
          c.width = max;
          c.height = Math.round(max / 2);
          c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
          source = c;
        }
        const t = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        g.current.tex.set(src, t);
        setTick((n) => n + 1);
      };
      im.src = src;
    }
    return () => {
      alive = false;
    };
  }, [a, b, ready]);

  useEffect(() => {
    const st = g.current;
    const c = canvas.current;
    if (!st || !c) return;
    const { gl, u } = st;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.max(1, Math.round(w * dpr));
    c.height = Math.max(1, Math.round(h * dpr));
    gl.viewport(0, 0, c.width, c.height);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, st.tex.get(a) ?? st.blank);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, st.tex.get(b) ?? st.blank);
    gl.uniform1i(u.a, 0);
    gl.uniform1i(u.b, 1);
    gl.uniform1f(u.yaw, view.yaw);
    gl.uniform1f(u.pitch, view.pitch);
    gl.uniform1f(u.fov, view.fov);
    gl.uniform1f(u.aspect, w / h);
    gl.uniform1f(u.split, split / 100);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [a, b, split, view, w, h, tick]);

  return <canvas ref={canvas} className={s.canvas} role="img" aria-hidden="true" />;
}

const PANO0: PanoView = { yaw: 0, pitch: -0.18, fov: (80 * Math.PI) / 180 };

/* ---------- Komponen utama ---------- */
export function SiteViews({ locale, copy, views, spot }: { locale: Locale; copy: SiteViewsCopy; views: SiteView[]; spot: Spot }) {
  const lists = useMemo(() => {
    const by = (k: ViewKind) => views.filter((v) => v.kind === k).sort((a, b) => a.date.localeCompare(b.date));
    return { satellite: by("satellite"), pano: by("pano") };
  }, [views]);
  const first: ViewKind = lists.satellite.length ? "satellite" : "pano";
  const [mode, setMode] = useState<ViewKind>(first);
  const [sel, setSel] = useState(() => ({
    satellite: { l: lists.satellite[0]?.id ?? "", r: lists.satellite[lists.satellite.length - 1]?.id ?? "" },
    pano: { l: lists.pano[0]?.id ?? "", r: lists.pano[lists.pano.length - 1]?.id ?? "" },
  }));
  const [split, setSplit] = useState(50);
  const z0 = clamp(Math.round(spot.zoom), 14, 17);
  const [z, setZ] = useState(z0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [pv, setPv] = useState<PanoView>(PANO0);
  const [glFailed, setGlFailed] = useState(false);
  const failed = useCallback(() => setGlFailed(true), []);

  const list = lists[mode];
  const L = list.find((v) => v.id === sel[mode].l) ?? list[0];
  const R = list.find((v) => v.id === sel[mode].r) ?? list[list.length - 1];
  const setSide = (side: "l" | "r") => (id: string) => setSel((c) => ({ ...c, [mode]: { ...c[mode], [side]: id } }));

  if (!L || !R) return null;

  const zoom = (dir: 1 | -1) => {
    if (mode === "satellite") {
      const nz = clamp(z + dir, 14, 17);
      if (nz === z) return;
      const f = 2 ** (nz - z);
      setPan((p) => ({ x: p.x * f, y: p.y * f }));
      setZ(nz);
    } else setPv((v) => ({ ...v, fov: clamp(v.fov * (dir > 0 ? 0.8 : 1.25), (25 * Math.PI) / 180, (110 * Math.PI) / 180) }));
  };
  const reset = () => {
    setPan({ x: 0, y: 0 });
    setZ(z0);
    setPv(PANO0);
  };
  const onPan = (dx: number, dy: number) => {
    if (mode === "satellite") setPan((p) => ({ x: p.x - dx, y: p.y - dy }));
    else setPv((v) => ({ yaw: v.yaw - (dx * v.fov) / 600, pitch: clamp(v.pitch + (dy * v.fov) / 600, -1.45, 1.45), fov: v.fov }));
  };

  const tag = (v: SiteView) => (
    <>
      <strong>{labelOf(v, locale)}</strong>
      {v.note[locale] && <span>{v.note[locale]}</span>}
    </>
  );

  const tools = (
    <>
      <button type="button" className={s.tool} onClick={() => zoom(1)} aria-label={copy.zoomIn}>
        +
      </button>
      <button type="button" className={s.tool} onClick={() => zoom(-1)} aria-label={copy.zoomOut}>
        −
      </button>
      <button type="button" className={s.tool} onClick={reset} aria-label={copy.reset}>
        ↺
      </button>
    </>
  );

  const names = { a: labelOf(L, locale), b: labelOf(R, locale) };

  return (
    <div className={s.wrap}>
      <div className={s.top}>
        <div className={s.modes} role="group" aria-label={copy.modes}>
          {(["satellite", "pano"] as const).map(
            (k) =>
              lists[k].length > 0 && (
                <button key={k} type="button" className={s.mode} aria-pressed={mode === k} onClick={() => setMode(k)}>
                  {copy[k]}
                </button>
              ),
          )}
        </div>
      </div>

      <div className={s.pickers}>
        <Picker legend={copy.left} list={list} value={L.id} onChange={setSide("l")} copy={copy} locale={locale} idp={`sv-${mode}-l`} />
        <Picker legend={copy.right} list={list} value={R.id} onChange={setSide("r")} copy={copy} locale={locale} idp={`sv-${mode}-r`} />
      </div>

      <Stage
        split={split}
        setSplit={setSplit}
        tagL={tag(L)}
        tagR={tag(R)}
        hint={mode === "satellite" ? copy.hintSatellite : copy.hintPano}
        tools={tools}
        onPan={onPan}
        label={fill(copy.stageLabel, names)}
      >
        {(w, h) =>
          mode === "satellite" ? (
            <>
              <div className={s.layer}>
                <TileLayer release={R.release} spot={spot} z={z} pan={pan} w={w} h={h} />
              </div>
              <div className={s.layer} style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                <TileLayer release={L.release} spot={spot} z={z} pan={pan} w={w} h={h} />
              </div>
            </>
          ) : glFailed ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.flat} src={R.image} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.flat} src={L.image} alt="" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` } as CSSProperties} />
            </>
          ) : (
            <PanoLayer a={L.image} b={R.image} split={split} view={pv} w={w} h={h} onFail={failed} />
          )
        }
      </Stage>

      <div className={s.sliderWrap}>
        <label htmlFor="sv-split">{copy.compare}</label>
        <input id="sv-split" className={s.slider} type="range" min={0} max={100} step={1} value={Math.round(split)} onChange={(e) => setSplit(Number(e.target.value))} aria-label={fill(copy.sliderLabel, names)} />
      </div>

      {mode === "pano" && list.length < 2 && <p className={s.fine}>{copy.oneCapture}</p>}
      {mode === "pano" && glFailed && <p className={s.fine}>{copy.noWebgl}</p>}
      <p className={s.fine}>
        <Ph on={spot.ph}>{fill(copy.location, { lat: spot.lat.toFixed(4), lon: spot.lon.toFixed(4) })}</Ph>
        {mode === "satellite" ? ` · ${copy.credit}` : ""}
      </p>
    </div>
  );
}
