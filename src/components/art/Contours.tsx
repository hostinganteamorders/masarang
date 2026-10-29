import { contourPaths } from "./contours";

/** Hiasan: garis kontur tipis yang memakai warna teks (currentColor). Atur warna dan posisi lewat CSS. */
export function Contours({ seed = 4, className }: { seed?: number; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {contourPaths(seed, 14).map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1.4" />
      ))}
    </svg>
  );
}
