"use client";

import { usePathname } from "next/navigation";
import { common } from "@/content/common";
import { site } from "@/data/site";
import { hasLocale, localePath, type Locale } from "@/lib/i18n";
import { MENU_INTRO, barePath } from "@/lib/menuIntro";

/** Tanam data terstruktur (JSON-LD). Tanda `<` diganti agar tidak bisa menutup tag skrip. */
function Script({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Data organisasi dan situs, ada di semua halaman. */
export function OrganizationLd({ locale }: { locale: Locale }) {
  const c = common[locale];
  const base = site.url.replace(/\/$/, "");
  const org = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${base}/#organization`,
    name: site.name,
    alternateName: ["Masarang Foundation", "Yayasan Masarang"],
    url: `${base}/`,
    logo: `${base}/brand/masarang-emblem.png`,
    image: `${base}/og/masarang-${locale}.png`,
    description: c.footer.tagline,
    email: site.email.v,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Nimawanua, Amphitheater Woloan, Woloan I Utara, Tomohon Barat",
      addressLocality: "Tomohon",
      addressRegion: "Sulawesi Utara",
      postalCode: "95421",
      addressCountry: "ID",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Sulawesi Utara" },
    founder: { "@type": "Person", name: "Dr. Willie Smits" },
    sameAs: [site.social.instagram, site.social.linkedin].filter(Boolean),
  };
  const web = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: `${base}/`,
    name: site.name,
    inLanguage: ["en", "id"],
    publisher: { "@id": `${base}/#organization` },
  };
  return (
    <>
      <Script data={org} />
      <Script data={web} />
    </>
  );
}

/** Jejak halaman (BreadcrumbList) dari alamat saat ini, memakai nama menu di navbar. */
export function BreadcrumbsLd({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const bare = barePath(pathname);
  const lang = hasLocale(pathname.split("/")[1]) ? (pathname.split("/")[1] as Locale) : locale;
  if (!bare) return null;

  const c = common[lang];
  const base = site.url.replace(/\/$/, "");
  const segments = bare.split("/").filter(Boolean);
  const items = [{ name: c.nav.home, path: "" }];
  segments.forEach((_, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const entry = MENU_INTRO[path];
    if (entry) items.push({ name: c.nav[entry.nav], path });
  });
  if (items.length < 2) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${localePath(lang, item.path)}`,
    })),
  };
  return <Script data={data} />;
}
