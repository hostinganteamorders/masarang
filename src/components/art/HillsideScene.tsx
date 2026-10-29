import { Palm } from "./Palm";
import { mulberry32 } from "@/lib/random";
import { pow875, r1, r2, stableSin } from "@/lib/round";

/**
 * Gambar vektor lereng Temboan (kotak 1200×600). Mode "before": padang alang-alang rusak.
 * Mode "after": lereng yang sama setelah N tahun. Pohon yang sama tumbuh di tempat yang sama
 * dari tahun ke tahun; yang bertambah hanya jumlah dan ukurannya.
 * Ini ilustrasi dari rencana restorasi, bukan foto.
 */

/*
 * Semua angka gambar dibulatkan (r1, r2) dan rumus sin/pow diganti versi yang pasti sama di setiap mesin
 * (lib/round.ts). Tanpa itu, server (Node) dan peramban bisa menulis angka yang berbeda di digit terakhir,
 * lalu React melaporkan "hydration mismatch" di mode dev.
 */

const W = 1200;
const H = 600;

/** Tinggi tanah di posisi x (dibulatkan ke 0,1). */
const ground = (x: number) => r1(330 + 0.1 * x + 18 * stableSin(x / 170 + 0.5));

function groundPath(): string {
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 20) pts.push(`${x === 0 ? "M" : "L"}${x} ${ground(x)}`);
  return `${pts.join("")}L${W} ${H}L0 ${H}Z`;
}

const GROUND = groundPath();

/* ---------- Unsur tetap (sama untuk sebelum dan sesudah) ---------- */

const OLD_PALMS = [
  { x: 130, off: 58, h: 160, lean: 18 },
  { x: 330, off: 80, h: 175, lean: -22 },
  { x: 520, off: 40, h: 140, lean: 14 },
  { x: 700, off: 22, h: 90, lean: -8 },
  { x: 1010, off: 60, h: 165, lean: 20 },
].map((p) => ({ ...p, y: r1(ground(p.x) + p.off) }));

type Tuft = { y: number; tone: number; d: string };
type Patch = { x: number; y: number; rx: number; ry: number };
type Stick = { x: number; y: number; dx: number; h: number };
type Tree = { x: number; y: number; t: number; j: number; color: number; palm: boolean };

const rand = mulberry32(7);

/** Satu rumpun rumput: tiga helai melengkung dengan ukuran s. */
function tuftPath(x: number, y: number, s: number): string {
  const q = (a: number, b: number, c: number, d: number) => `q${r1(a * s)} ${r1(b * s)} ${r1(c * s)} ${r1(d * s)}`;
  return `M${x} ${y} ${q(-2, -9, -5, -14)} M${x} ${y} ${q(1, -10, 1, -16)} M${x} ${y} ${q(3, -9, 6, -13)}`;
}

const TUFTS: Tuft[] = Array.from({ length: 300 }, () => {
  const x = r1(rand() * W);
  const gy = ground(x);
  const y = r1(gy + 8 + rand() * (H - gy - 14));
  const s = r2(0.6 + ((y - gy) / (H - gy)) * 1.1);
  return { y, tone: Math.floor(rand() * 3), d: tuftPath(x, y, s) };
}).sort((a, b) => a.y - b.y);

const PATCHES: Patch[] = Array.from({ length: 8 }, () => {
  const x = r1(40 + rand() * (W - 80));
  const gy = ground(x);
  const y = r1(gy + 30 + rand() * (H - gy - 60));
  return { x, y, rx: r1(40 + rand() * 60), ry: r1(8 + rand() * 9) };
});

const STICKS: Stick[] = Array.from({ length: 7 }, () => {
  const x = r1(30 + rand() * (W - 60));
  return { x, y: r1(ground(x) + 30 + rand() * 120), dx: r1((rand() - 0.5) * 14), h: r1(28 + rand() * 24) };
});

const TREE_COLORS = ["#239d4d", "#2d8a49", "#6dbc88", "#1d6f3a", "#9cc95c", "#165a2e"];

const TREES: Tree[] = Array.from({ length: 150 }, () => {
  const x = r1(12 + rand() * (W - 24));
  const t = pow875(rand());
  const gy = ground(x);
  const y = r1(gy + 14 + t * (H - gy - 26));
  return {
    x,
    y,
    t,
    j: 0.8 + rand() * 0.4,
    color: Math.floor(rand() * TREE_COLORS.length),
    palm: rand() < 0.05,
  };
});

/** Tahap pertumbuhan per tahun: kepadatan (jumlah pohon), ukuran, dan warna tanah. */
const GROWTH: Record<number, { canopy: number; bare: number; size: number; tone: number }> = {
  1: { canopy: 28, bare: 19, size: 0.34, tone: 0.2 },
  2: { canopy: 44, bare: 11, size: 0.5, tone: 0.38 },
  3: { canopy: 56, bare: 6, size: 0.66, tone: 0.52 },
  5: { canopy: 71, bare: 2, size: 0.86, tone: 0.76 },
  10: { canopy: 85, bare: 0, size: 1.18, tone: 1 },
};

const lerpColor = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
};

const TUFT_COLORS = ["#c9a46a", "#e6c898", "#b88b52"];

function Backdrop() {
  return (
    <>
      {/* gunung */}
      <path
        d="M560 350 C650 335 720 205 770 152 C790 132 812 130 832 137 C884 162 952 292 1070 338 L1070 420 L560 420Z"
        fill="#b4bab0"
      />
      <path
        d="M770 152 C790 132 812 130 832 137 C860 150 890 200 920 250 C870 230 820 200 770 152Z"
        fill="#cdd1c8"
        opacity="0.8"
      />
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="768" cy="182" rx="62" ry="13" />
        <ellipse cx="806" cy="170" rx="44" ry="10" />
        <ellipse cx="738" cy="192" rx="36" ry="8" />
      </g>
      {/* punggung bukit */}
      <path
        d="M0 332 C120 302 260 328 400 306 S640 288 760 318 S1000 344 1200 312 L1200 600 L0 600Z"
        fill="#9fc27a"
      />
      <path
        d="M0 356 C150 330 300 356 450 340 S750 326 900 350 S1100 370 1200 350 L1200 600 L0 600Z"
        fill="#7fa95f"
      />
    </>
  );
}

function OldPalms() {
  return (
    <>
      {OLD_PALMS.map((p) => (
        <Palm key={p.x} x={p.x} y={p.y} height={p.h} lean={p.lean} color="#6b5a3a" fronds="#6f8040" />
      ))}
    </>
  );
}

function BeforeLayer() {
  return (
    <>
      <path d={GROUND} fill="#e0b98a" />
      {PATCHES.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill="#b8794a" />
      ))}
      <g stroke="#8b6a46" strokeWidth="2.5" fill="none" strokeLinecap="round">
        {PATCHES.slice(0, 5).map((p, i) => (
          <path key={i} d={`M${r1(p.x - p.rx * 0.5)} ${r1(p.y - 3)} q${r1(p.rx * 0.2)} ${r1(p.ry * 2.2)} ${r1(p.rx * 0.45)} ${r1(p.ry * 3.4)}`} />
        ))}
      </g>
      {TUFTS.map((t, i) => (
        <path
          key={i}
          d={t.d}
          stroke={TUFT_COLORS[t.tone]}
          strokeWidth={1.6}
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <g stroke="#7a6a4a" strokeWidth="3" strokeLinecap="round">
        {STICKS.map((s, i) => (
          <line key={i} x1={s.x} y1={s.y} x2={r1(s.x + s.dx)} y2={r1(s.y - s.h)} />
        ))}
      </g>
      <OldPalms />
    </>
  );
}

function AfterLayer({ year }: { year: number }) {
  const g = GROWTH[year] ?? GROWTH[5];
  const count = 14 + Math.round(g.canopy * 1.5);
  const trees = TREES.slice(0, count).sort((a, b) => a.y - b.y);
  const soil = lerpColor("#b9c97a", "#2f8f4a", g.tone);
  const tuftCount = Math.round(TUFTS.length * (1 - g.canopy / 100) * 0.9);
  const patchScale = g.bare / 35;

  return (
    <>
      <path d={GROUND} fill={soil} />
      {TUFTS.slice(0, tuftCount).map((t, i) => (
        <path
          key={i}
          d={t.d}
          stroke="#7ea05a"
          strokeWidth={1.6}
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {patchScale > 0.04 &&
        PATCHES.map((p, i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx={r1(p.rx * patchScale)} ry={r1(p.ry * patchScale)} fill="#b8794a" />
        ))}

      {/* sungai kecil yang kembali mengalir */}
      <path
        d={`M860 ${Math.round(ground(860))} C880 410 835 440 868 470 S935 525 905 562 S940 590 952 600`}
        stroke="#59b0d1"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M860 ${Math.round(ground(860))} C880 410 835 440 868 470 S935 525 905 562 S940 590 952 600`}
        stroke="#a6dbee"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* kelapa tua tetap ada */}
      <OldPalms />

      {trees.map((t, i) => {
        const r = (10 + 21 * t.t) * t.j * g.size;
        const trunk = r * 0.95;
        if (t.palm) {
          return (
            <Palm
              key={i}
              x={t.x}
              y={t.y}
              height={r1((34 + 40 * t.t) * g.size * 1.4)}
              lean={(i % 2 ? 1 : -1) * 6}
              color="#5b7a3a"
              fronds="#4f8a3f"
            />
          );
        }
        return (
          <g key={i}>
            <ellipse cx={t.x} cy={r1(t.y + 1)} rx={r2(r * 0.9)} ry={r2(r * 0.22)} fill="#000" opacity="0.12" />
            <rect
              x={r2(t.x - r * 0.09)}
              y={r2(t.y - trunk)}
              width={r2(r * 0.18)}
              height={r2(trunk)}
              fill="#5a4630"
              rx={r2(r * 0.05)}
            />
            <circle cx={t.x} cy={r2(t.y - trunk - r * 0.55)} r={r2(r)} fill={TREE_COLORS[t.color]} />
            <circle
              cx={r2(t.x - r * 0.28)}
              cy={r2(t.y - trunk - r * 0.82)}
              r={r2(r * 0.55)}
              fill="#ffffff"
              opacity="0.12"
            />
          </g>
        );
      })}
    </>
  );
}

export function HillsideScene({
  mode,
  year = 5,
  className,
}: {
  mode: "before" | "after";
  year?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ background: "linear-gradient(#e6ecea, #f5f5f5 62%)" }}
    >
      <Backdrop />
      {mode === "before" ? <BeforeLayer /> : <AfterLayer year={year} />}
    </svg>
  );
}
