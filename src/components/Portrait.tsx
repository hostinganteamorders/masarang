import Image from "next/image";
import { contourPaths } from "./art/contours";
import s from "./Portrait.module.css";

function initials(name: string): string {
  const words = name.replace(/[\[\]]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * Potret anggota tim. Dengan `src` menampilkan foto; tanpa foto menampilkan kontur topografi
 * dengan inisial (nama nyata) atau siluet (nama masih contoh).
 */
export function Portrait({
  name,
  src,
  placeholder,
  seed = 1,
  className,
}: {
  name: string;
  src?: string;
  /** true = nama masih contoh, tampilkan siluet. */
  placeholder?: boolean;
  seed?: number;
  className?: string;
}) {
  if (src) {
    return (
      <span className={`${s.frame} ${className ?? ""}`}>
        <Image src={src} alt={name} fill sizes="(max-width: 700px) 50vw, 25vw" className={s.image} />
      </span>
    );
  }

  return (
    <span className={`${s.frame} ${className ?? ""}`}>
      <svg className={s.contours} viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {contourPaths(seed + 6).map((d, i) => (
          <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1.6" />
        ))}
      </svg>
      {placeholder ? (
        <svg className={s.silhouette} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <circle cx="50" cy="36" r="17" fill="currentColor" />
          <path d="M14 100 C14 70 30 58 50 58 S86 70 86 100Z" fill="currentColor" />
        </svg>
      ) : (
        <span className={`num ${s.initials}`} aria-hidden="true">
          {initials(name)}
        </span>
      )}
    </span>
  );
}
