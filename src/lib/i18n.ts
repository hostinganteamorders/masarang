export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Teks dua bahasa untuk data (nama satwa, kabar lapangan, dokumen, dll.). */
export type L10n = Record<Locale, string>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pick(text: L10n, locale: Locale): string {
  return text[locale];
}

/** Ganti segmen bahasa pada path, mis. /en/programs -> /id/programs */
export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && hasLocale(parts[1])) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

/** Path publik dengan prefix bahasa. localePath("en", "/about") -> "/en/about" */
export function localePath(locale: Locale, path = ""): string {
  if (path === "" || path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
