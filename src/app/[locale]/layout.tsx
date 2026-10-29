import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { DraftBanner } from "@/components/DraftBanner";
import { Ribbon } from "@/components/Ribbon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { common } from "@/content/common";
import { site } from "@/data/site";
import { hasLocale, locales } from "@/lib/i18n";

// Mona Sans: sumbu lebar (wdth) dipakai untuk judul yang rapat. Atkinson Hyperlegible Next: teks isi.
const mona = localFont({
  src: "../fonts/MonaSans-latin.woff2",
  variable: "--font-mona",
  weight: "200 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

const atkinson = localFont({
  src: "../fonts/AtkinsonNext-latin.woff2",
  variable: "--font-atkinson",
  weight: "200 800",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  applicationName: site.name,
  // Selama masih draf, minta mesin pencari tidak mengindeks.
  robots: site.draft ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#242424",
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = common[locale];

  return (
    // data-scroll-behavior: Next mematikan scroll halus sesaat saat pindah halaman (langsung ke atas),
    // tetapi tetap halus untuk tautan di dalam halaman. Tanpa atribut ini mode dev memberi peringatan.
    <html lang={locale} data-scroll-behavior="smooth" className={`${mona.variable} ${atkinson.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          {c.skip}
        </a>
        <DraftBanner locale={locale} />
        <Ribbon />
        <SiteHeader locale={locale} nav={c.nav} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
