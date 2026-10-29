import { stableCos, stableSin } from "@/lib/round";

/** Garis kontur topografi dari fungsi polar yang deterministik: pengganti foto sebelum foto asli ada. */
export function contourPaths(seed: number, rings = 11): string[] {
  const paths: string[] = [];
  const cx = 250 + ((seed * 37) % 160);
  const cy = 150 + ((seed * 53) % 90);
  const p1 = (seed * 1.7) % 6.28;
  const p2 = (seed * 2.3) % 6.28;
  for (let k = 1; k <= rings; k++) {
    const R = k * 30;
    const pts: string[] = [];
    const N = 72;
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * Math.PI * 2;
      const wobble = 1 + 0.14 * stableSin(2 * t + p1 + k * 0.12) + 0.08 * stableSin(3 * t + p2);
      const x = cx + stableCos(t) * R * wobble * 1.25;
      const y = cy + stableSin(t) * R * wobble * 0.8;
      pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    paths.push(`${pts.join("")}Z`);
  }
  return paths;
}
