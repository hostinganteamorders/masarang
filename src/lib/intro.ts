/**
 * Memutar ulang salam pembuka (lihat `components/Intro.tsx`). Dipanggil saat pengunjung menekan Home atau logo.
 * Tidak berbuat apa-apa bila sambutan sedang berjalan atau pengunjung memilih gerak dikurangi.
 */
export function playIntro(): void {
  const html = document.documentElement;
  if (html.classList.contains("intro-on")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  delete document.querySelector<HTMLElement>("[data-intro]")?.dataset.skip;
  html.classList.add("intro-on");
  // Cadangan bila peristiwa animasi tidak datang.
  window.setTimeout(() => html.classList.remove("intro-on"), 5000);
}
