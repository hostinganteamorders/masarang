"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const DURATION = 1400;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

type Part = { node: Text; prefix: string; suffix: string; target: number; decimals: number };

/** Teks angka pertama di sebuah node, dibaca menurut bahasa halaman (EN 18,500.5 / ID 18.500,5). */
function parts(el: Element, lang: string): Part[] {
  const out: Part[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    const m = /\d[\d.,]*/.exec(n.data);
    if (!m) continue;
    const [thousand, decimal] = lang === "id" ? [".", ","] : [",", "."];
    const raw = m[0].replace(/[.,]+$/, "");
    const clean = raw.split(thousand).join("").replace(decimal, ".");
    const target = Number(clean);
    if (!Number.isFinite(target)) continue;
    const decimals = raw.includes(decimal) ? raw.length - raw.indexOf(decimal) - 1 : 0;
    out.push({ node: n, prefix: n.data.slice(0, m.index), suffix: n.data.slice(m.index + raw.length), target, decimals });
  }
  return out;
}

/**
 * Angka yang bertanda `data-count` berhitung naik dari 0 saat masuk layar (sekali per halaman).
 * Teks akhir selalu dikembalikan persis seperti aslinya. Dilewati bila pengunjung memilih gerak dikurangi.
 */
export function CountUp() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lang = document.documentElement.lang === "id" ? "id" : "en";
    const fmt = (v: number, d: number) => new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
    const timers: number[] = [];

    const run = (el: Element) => {
      const ps = parts(el, lang);
      if (!ps.length) return;
      const finals = ps.map((p) => p.node.data);
      el.setAttribute("aria-busy", "true");
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        for (const p of ps) p.node.data = `${p.prefix}${fmt(p.target * ease(t), p.decimals)}${p.suffix}`;
        if (t < 1) timers.push(requestAnimationFrame(frame));
        else {
          ps.forEach((p, i) => (p.node.data = finals[i]));
          el.removeAttribute("aria-busy");
        }
      };
      timers.push(requestAnimationFrame(frame));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          run(e.target);
        }
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach((id) => cancelAnimationFrame(id));
    };
  }, [pathname]);

  return null;
}
