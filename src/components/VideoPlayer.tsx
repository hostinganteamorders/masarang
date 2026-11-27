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

/** Alamat sematan untuk video pembuka: tanpa kontrol, YouTube/Vimeo dapat dijeda lewat skrip. */
function introSrc(embed: string, play: boolean): string {
  const sep = embed.includes("?") ? "&" : "?";
  const auto = play ? "1" : "0";
  if (embed.includes("vimeo.com")) {
    // Mode latar Vimeo: tanpa kontrol, tanpa suara, berulang.
    return `${embed}${sep}background=1&autoplay=${auto}&muted=1&loop=1&playsinline=1`;
  }
  const id = embed.split("/embed/")[1]?.split(/[?#]/)[0] ?? "";
  return `${embed}${sep}enablejsapi=1&controls=0&disablekb=1&rel=0&modestbranding=1&iv_load_policy=3&fs=0&playsinline=1&mute=1&loop=1&playlist=${id}&autoplay=${auto}`;
}

/** Perintah jeda/putar ke iframe YouTube atau Vimeo. */
function command(frame: HTMLIFrameElement | null, vimeo: boolean, play: boolean) {
  const win = frame?.contentWindow;
  if (!win) return;
  const msg = vimeo
    ? { method: play ? "play" : "pause" }
    : { event: "command", func: play ? "playVideo" : "pauseVideo", args: [] };
  win.postMessage(JSON.stringify(msg), "*");
}

/**
 * Video pembuka menu: diputar otomatis (tanpa suara), tanpa tombol jeda, dan otomatis dijeda saat keluar dari layar
 * lalu dilanjutkan saat terlihat lagi. Bila pengunjung meminta gerak dikurangi, kontrol biasa ditampilkan.
 */
function IntroPlayer({ embed, url, title, poster }: { embed: string | null; url?: string; title: string; poster?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false); // iframe hanya dimuat setelah pertama kali terlihat
  const visible = useRef(false);
  const vimeo = Boolean(embed?.includes("vimeo.com"));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const show = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        visible.current = show;
        if (show) setStarted(true);
        if (video.current) {
          if (show) void video.current.play().catch(() => {});
          else video.current.pause();
        } else {
          command(frame.current, vimeo, show);
        }
      },
      { threshold: [0, 0.4, 0.7] },
    );
    io.observe(el);
    // Tab disembunyikan = jeda.
    const vis = () => {
      const play = !document.hidden && visible.current;
      if (video.current) {
        if (play) void video.current.play().catch(() => {});
        else video.current.pause();
      } else command(frame.current, vimeo, play);
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, [reduced, vimeo]);

  if (reduced) {
    // Gerak dikurangi: tanpa putar otomatis, kontrol bawaan tersedia.
    if (embed) return <iframe src={embed} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen />;
    return (
      <video controls preload="metadata" poster={poster} playsInline aria-label={title}>
        <source src={url} />
      </video>
    );
  }

  return (
    <div ref={box} style={{ position: "absolute", inset: 0 }}>
      {embed ? (
        started && (
          <iframe
            ref={frame}
            src={introSrc(embed, true)}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
            onLoad={() => {
              // Bila sudah keluar layar sebelum pemutar siap, jeda.
              if (!visible.current) window.setTimeout(() => command(frame.current, vimeo, false), 800);
            }}
          />
        )
      ) : (
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
      )}
    </div>
  );
}

/**
 * Pemutar video. Dengan `autoplay`, video mulai diputar (tanpa suara, sesuai aturan browser) begitu salam pembuka selesai.
 */
export function VideoPlayer({ embed, url, title, autoplay, poster, intro }: { embed: string | null; url?: string; title: string; autoplay?: boolean; poster?: string; intro?: boolean }) {
  if (intro) return <IntroPlayer embed={embed} url={url} title={title} poster={poster} />;
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
