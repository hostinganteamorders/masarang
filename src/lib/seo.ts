import type { Metadata } from "next";
import { site } from "@/data/site";
import { localePath, locales, type Locale } from "./i18n";

/** Gambar pratinjau saat tautan dibagikan (WhatsApp, LinkedIn, Instagram, X), 1200×630, per bahasa. */
export function shareImage(locale: Locale) {
  return {
    url: `/og/masarang-${locale}.png`,
    width: 1200,
    height: 630,
    alt: locale === "id" ? "Yayasan Masarang: Melestarikan Alam melalui Pemberdayaan Masyarakat Lokal" : "Masarang Foundation: Preserving Nature Through the Empowerment of Local People",
  };
}

/** Metadata per halaman: judul, deskripsi, canonical, dan hreflang untuk kedua bahasa. */
export function pageMetadata(
  locale: Locale,
  path: string,
  meta: { title: string; description: string; absoluteTitle?: boolean },
): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localePath(l, path)]),
  );
  languages["x-default"] = localePath("en", path);

  return {
    title: meta.absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: localePath(locale, path), languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: localePath(locale, path),
      siteName: site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      type: "website",
      images: [shareImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [shareImage(locale).url],
    },
  };
}

/** Semua path publik (tanpa prefix bahasa), dipakai sitemap. */
export const publicPaths = [
  "",
  "/about",
  "/about/founder",
  "/about/story",
  "/about/vision",
  "/about/sites",
  "/about/partners",
  "/programs",
  "/programs/restoration",
  "/programs/conservation",
  "/programs/conservation/adopt",
  "/programs/education",
  "/get-involved",
  "/get-involved/partner",
  "/get-involved/volunteer",
  "/updates",
  "/support",
  "/support/merchandise",
];
