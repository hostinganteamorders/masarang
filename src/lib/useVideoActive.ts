"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function subscribeIntro(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}
const getIntro = () => document.documentElement.classList.contains("intro-on");

function subscribeTab(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}
const getTabOpen = () => !document.hidden;

/**
 * Apakah video ini harus berjalan sekarang: terlihat di layar, tab sedang dibuka, dan salam pembuka (`intro-on`) tidak sedang tampil.
 * Dipakai oleh semua video situs: diputar otomatis saat terlihat, dijeda otomatis saat tidak terlihat.
 * `reduced` = pengunjung memilih gerak dikurangi; video tidak diputar otomatis dan kontrol biasa ditampilkan.
 */
export function useVideoActive(ref: RefObject<Element | null>): { active: boolean; reduced: boolean } {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const introOn = useSyncExternalStore(subscribeIntro, getIntro, () => false);
  const tabOpen = useSyncExternalStore(subscribeTab, getTabOpen, () => true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35), {
      threshold: [0, 0.35, 0.7],
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, reduced]);

  return { active: inView && tabOpen && !introOn && !reduced, reduced };
}
