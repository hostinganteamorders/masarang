import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { localePath, locales } from "@/lib/i18n";
import { publicPaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (locale: (typeof locales)[number], path: string) =>
    `${site.url}${localePath(locale, path)}`;

  return publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: abs(locale, path),
      lastModified: site.lastUpdated,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, abs(l, path)])),
      },
    })),
  );
}
