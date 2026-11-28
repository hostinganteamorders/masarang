/**
 * Pengatur intro (lihat `components/Intro.tsx`). Satu penghitung waktu cadangan saja, supaya cadangan dari intro
 * sebelumnya tidak memotong intro yang baru dibuka.
 */
const FALLBACK_MS = 7000;
let timer: number | undefined;

const html = () => document.documentElement;

/** Cadangan bila peristiwa animasi tidak datang (mis. tab di latar belakang). Menggantikan cadangan sebelumnya. */
export function armIntroFallback(): void {
  window.clearTimeout(timer);
  timer = window.setTimeout(leaveIntro, FALLBACK_MS);
}

/** Tutup intro dan batalkan cadangannya. */
export function leaveIntro(): void {
  window.clearTimeout(timer);
  timer = undefined;
  html().classList.remove("intro-on");
}

/**
 * Putar intro. Dari `HomeLink` (Home/logo): tidak berbuat apa-apa bila intro sedang berjalan.
 * Dengan `restart`: bila intro lain masih berjalan, diulang dari awal untuk halaman yang baru dibuka.
 * Tidak berbuat apa-apa bila pengunjung memilih gerak dikurangi.
 */
export function playIntro(options?: { restart?: boolean }): void {
  const root = html();
  const running = root.classList.contains("intro-on");
  if (running && !options?.restart) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  delete document.querySelector<HTMLElement>("[data-intro]")?.dataset.skip;
  if (running) {
    root.classList.remove("intro-on");
    void root.offsetWidth; // paksa gambar ulang agar animasi mulai dari awal
  }
  root.classList.add("intro-on");
  armIntroFallback();
}
