import { r1, r2, stableCos, stableSin } from "@/lib/round";

/** Siluet pohon kelapa: batang melengkung dan daun runcing. Dipakai di hero dan ilustrasi lereng. */

function frond(tx: number, ty: number, angle: number, len: number, width: number): string {
  const cos = stableCos(angle);
  const sin = stableSin(angle);
  const ex = tx + cos * len;
  const ey = ty + sin * len + len * 0.3;
  const mx = tx + cos * len * 0.55;
  const my = ty + sin * len * 0.55 - len * 0.14;
  const nx = -sin;
  const ny = cos;
  const f = (n: number) => n.toFixed(1);
  return `M${f(tx)} ${f(ty)} Q${f(mx + nx * width)} ${f(my + ny * width)} ${f(ex)} ${f(ey)} Q${f(mx - nx * width)} ${f(my - ny * width)} ${f(tx)} ${f(ty)}Z`;
}

const ANGLES = [-172, -145, -118, -90, -62, -35, -8, 18, 160].map((d) => (d * Math.PI) / 180);

export function Palm({
  x,
  y,
  height,
  lean = 0,
  color = "#2b3a2a",
  fronds,
}: {
  /** Pangkal batang */
  x: number;
  y: number;
  height: number;
  /** Pergeseran horizontal ujung batang (px) */
  lean?: number;
  color?: string;
  /** Warna daun jika berbeda dari batang */
  fronds?: string;
}) {
  const topX = r1(x + lean);
  const topY = r1(y - height);
  const len = height * 0.5;
  const trunkWidth = r2(Math.max(2, height * 0.035));
  const knob = r2(Math.max(2, height * 0.03));

  return (
    <g>
      <path
        d={`M${r1(x)} ${r1(y)} Q${r1(x + lean * 0.1)} ${r1(y - height * 0.55)} ${topX} ${topY}`}
        stroke={color}
        strokeWidth={trunkWidth}
        strokeLinecap="round"
        fill="none"
      />
      <g fill={fronds ?? color}>
        {ANGLES.map((angle, i) => (
          <path
            key={i}
            d={frond(topX, topY, angle, len * (i % 2 ? 0.88 : 1), len * 0.12)}
          />
        ))}
        <circle cx={r1(topX - 2)} cy={r1(topY + 4)} r={knob} />
        <circle cx={r1(topX + 3)} cy={r1(topY + 5)} r={knob} />
      </g>
    </g>
  );
}
