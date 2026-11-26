"use client";

import { useEffect, useRef, useState } from "react";

/** Menunggu salam pembuka selesai (kelas `intro-on` pada <html> hilang). */
function useAfterIntro(enabled: boolean) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // gerak dikurangi: jangan memutar otomatis
    const check = () => {
      if (!html.classList.contains("intro-on")) {
        setReady(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const mo = new MutationObserver(() => {
      if (check()) mo.disconnect();
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [enabled]);
  return ready;
}

/**
 * Pemutar video. Dengan `autoplay`, video mulai diputar (tanpa suara, sesuai aturan browser) begitu salam pembuka selesai.
 */
export function VideoPlayer({ embed, url, title, autoplay, poster }: { embed: string | null; url?: string; title: string; autoplay?: boolean; poster?: string }) {
  const ready = useAfterIntro(Boolean(autoplay));
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ready && video.current) void video.current.play().catch(() => {});
  }, [ready]);

  if (embed) {
    const sep = embed.includes("?") ? "&" : "?";
    const auto = autoplay && ready;
    const src = auto ? `${embed}${sep}autoplay=1&mute=1&muted=1&playsinline=1` : embed;
    return (
      <iframe
        key={auto ? "auto" : "idle"}
        src={src}
        title={title}
        loading={autoplay ? "eager" : "lazy"}
        allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  return (
    <video ref={video} controls muted={autoplay} loop={autoplay} preload="metadata" poster={poster} playsInline aria-label={title}>
      <source src={url} />
    </video>
  );
}
