import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./i18n";

/** Ambil dan periksa parameter [locale] pada halaman server. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return locale;
}
