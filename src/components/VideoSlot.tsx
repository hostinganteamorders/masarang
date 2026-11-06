import { common } from "@/content/common";
import type { Locale } from "@/lib/i18n";
import s from "./VideoSlot.module.css";

/** Ambil alamat sematan dari tautan YouTube atau Vimeo. Mengembalikan null bila bukan keduanya. */
function embedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") return `https://www.youtube-nocookie.com/embed/${u.searchParams.get("v")}`;
      if (u.pathname.startsWith("/embed/")) return `https://www.youtube-nocookie.com${u.pathname}`;
    }
    if (host === "vimeo.com") return `https://player.vimeo.com/video/${u.pathname.split("/").filter(Boolean)[0]}`;
    if (host === "player.vimeo.com") return url;
  } catch {
    /* alamat relatif atau salah: ditangani di bawah */
  }
  return null;
}

/**
 * Tempat video. Tanpa `url`, kotak penanda tempat ditampilkan. Dengan `url`: YouTube/Vimeo disematkan
 * (tanpa cookie pelacak sebelum diputar), berkas .mp4/.webm diputar langsung.
 */
export function VideoSlot({
  url,
  title,
  locale,
  className,
}: {
  url?: string;
  title: string;
  locale: Locale;
  className?: string;
}) {
  const c = common[locale].video;
  const embed = url ? embedUrl(url) : null;

  return (
    <figure className={`${s.slot} ${className ?? ""}`}>
      <div className={s.frame}>
        {embed ? (
          <iframe
            src={embed}
            title={title}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : url ? (
          <video controls preload="none" playsInline aria-label={title}>
            <source src={url} />
          </video>
        ) : (
          <div className={s.empty}>
            <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
              <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M23 18.5v19l16-9.5-16-9.5Z" fill="currentColor" />
            </svg>
            <span>{c.placeholder}</span>
          </div>
        )}
      </div>
      <figcaption className={s.caption}>{title}</figcaption>
    </figure>
  );
}
