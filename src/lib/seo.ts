import type { Metadata } from "next";
import { site } from "@/data/site";
import { localePath, locales, type Locale } from "./i18n";

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
      type: "website",
    },
  };
}

/** Semua path publik (tanpa prefix bahasa), dipakai sitemap. */
export const publicPaths = [
  "",
  "/about",
  "/team",
  "/programs",
  "/programs/temboan",
  "/programs/tasikoki",
  "/adopt",
  "/transparency",
  "/updates",
  "/support",
];
