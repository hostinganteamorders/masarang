import type { Locale } from "./i18n";

const BCP47: Record<Locale, string> = { en: "en-US", id: "id-ID" };

const MONTHS: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
};

/** Angka dengan pemisah ribuan dan desimal sesuai bahasa (EN: 18,500.5 / ID: 18.500,5). */
export function num(n: number, locale: Locale, maxFraction = 0, minFraction = 0): string {
  return new Intl.NumberFormat(BCP47[locale], {
    maximumFractionDigits: maxFraction,
    minimumFractionDigits: minFraction,
  }).format(n);
}

export function pct(n: number, locale: Locale, maxFraction = 0): string {
  return `${num(n, locale, maxFraction)}%`;
}

/** Rupiah penuh: Rp 25,000 (EN) / Rp 25.000 (ID). */
export function idr(amount: number, locale: Locale): string {
  return `Rp ${num(amount, locale)}`;
}

/** Nilai dalam jutaan rupiah: Rp 1,856 m (EN) / Rp 1.856 jt (ID). */
export function idrMillions(millions: number, locale: Locale, fraction = 0): string {
  const unit = locale === "id" ? "jt" : "m";
  return `Rp ${num(millions, locale, fraction, fraction)} ${unit}`;
}

/** Rupiah ringkas otomatis: >= 1 juta jadi "Rp 15 m" / "Rp 1,5 jt", di bawahnya penuh "Rp 600,000". */
export function idrAuto(amount: number, locale: Locale): string {
  if (amount < 1_000_000) return idr(amount, locale);
  const unit = locale === "id" ? "jt" : "m";
  return `Rp ${num(amount / 1e6, locale, 1)} ${unit}`;
}

/** Total besar: Rp 3.2 bn (EN) / Rp 3,2 miliar (ID). Input dalam rupiah. */
export function idrBillions(amount: number, locale: Locale, fraction = 1): string {
  const unit = locale === "id" ? "miliar" : "bn";
  return `Rp ${num(amount / 1e9, locale, fraction, fraction)} ${unit}`;
}

/** Dolar AS dari rupiah dengan kurs tetap, ringkas: US$114k / US$114 rb. */
export function usdCompact(amountIdr: number, fx: number, locale: Locale): string {
  const v = amountIdr / fx;
  const sp = locale === "id" ? " " : "";
  const [k, m] = locale === "id" ? ["rb", "jt"] : ["k", "m"];
  if (v >= 1e6) return `US$${num(v / 1e6, locale, 2)}${sp}${m}`;
  if (v >= 1e4) return `US$${num(v / 1e3, locale, 0)}${sp}${k}`;
  if (v >= 1e3) return `US$${num(v / 1e3, locale, 1)}${sp}${k}`;
  return `US$${num(v, locale, v < 100 ? 2 : 0)}`;
}

/** Dolar AS penuh dari rupiah: US$1,534. */
export function usd(amountIdr: number, fx: number, locale: Locale): string {
  const v = amountIdr / fx;
  return `US$${num(v, locale, v < 100 ? 2 : 0)}`;
}

/** "2026-09" -> "Sep 2026" */
export function monthYear(iso: string, locale: Locale): string {
  const [y, m] = iso.split("-");
  return `${MONTHS[locale][Number(m) - 1]} ${y}`;
}

/** "2026-09-30" -> "30 Sep 2026" */
export function fullDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS[locale][Number(m) - 1]} ${y}`;
}

/** Isi token {nama} pada teks: fill("Per {date}", { date: "30 Sep 2026" }) */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}
