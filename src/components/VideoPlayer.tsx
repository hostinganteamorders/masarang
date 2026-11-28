"use client";

import { useEffect, useRef, useState } from "react";
import { useVideoActive } from "@/lib/useVideoActive";

/** Alamat sematan tanpa kontrol (YouTube/Vimeo), tanpa suara, berulang. */
function autoSrc(embed: string): string {
  const sep = embed.includes("?") ? "&" : "?";
  if (embed.includes("vimeo.com")) return `${embed}${sep}background=1&autoplay=1&muted=1&loop=1&playsinline=1`;
  const id = embed.split("/embed/")[1]?.split(/[?#]/)[0] ?? "";
  return `${embed}${sep}enablejsapi=1&controls=0&disablekb=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&playsinline=1&mute=1&loop=1&playlist=${id}&autoplay=1`;
}

/** Perintah jeda/putar ke iframe YouTube atau Vimeo. */
function command(frame: HTMLIFrameElement | null, vimeo: boolean, play: boolean) {
  const win = frame?.contentWindow;
  if (!win) return;
  const msg = vimeo ? { method: play ? "play" : "pause" } : { event: "command", func: play ? "playVideo" : "pauseVideo", args: [] };
  win.postMessage(JSON.stringify(msg), "*");
}

/**
 * Pemutar semua video situs: diputar otomatis (tanpa suara, sesuai aturan browser), tanpa tombol putar atau kontrol,
 * berulang, dan dijeda otomatis saat keluar dari layar (dilanjutkan saat terlihat lagi). Bila pengunjung memilih
 * "kurangi gerak", video tidak diputar otomatis dan kontrol biasa ditampilkan.
 */
export function VideoPlayer({ embed, url, title, poster }: { embed: string | null; url?: string; title: string; poster?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const el = embed ? frame : video;
  const { active, reduced } = useVideoActive(el);
  const [started, setStarted] = useState(false); // iframe dimuat setelah pertama kali terlihat
  if (active && !started) setStarted(true);
  const vimeo = Boolean(embed?.includes("vimeo.com"));

  useEffect(() => {
    if (embed) command(frame.current, vimeo, active);
    else if (video.current) {
      if (active) void video.current.play().catch(() => {});
      else video.current.pause();
    }
  }, [active, embed, vimeo]);

  if (reduced) {
    if (embed) return <iframe src={embed} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />;
    return (
      <video controls preload="metadata" poster={poster} playsInline aria-label={title}>
        <source src={url} />
      </video>
    );
  }

  if (embed) {
    return (
      <iframe
        ref={frame}
        src={started ? autoSrc(embed) : undefined}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        tabIndex={-1}
        style={{ pointerEvents: "none" }}
        onLoad={() => {
          // Sudah keluar layar sebelum pemutar siap: jeda.
          if (!active) window.setTimeout(() => command(frame.current, vimeo, false), 800);
        }}
      />
    );
  }

  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={title}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
      tabIndex={-1}
      style={{ pointerEvents: "none" }}
    >
      <source src={url} />
    </video>
  );
}
