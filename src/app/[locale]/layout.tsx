import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { CountUp } from "@/components/CountUp";
import { Intro } from "@/components/Intro";
import { DraftBanner } from "@/components/DraftBanner";
import { Ribbon } from "@/components/Ribbon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { common } from "@/content/common";
import { site } from "@/data/site";
import { hasLocale, locales } from "@/lib/i18n";

// Kanit (satu keluarga untuk judul dan isi), di-host sendiri.
const kanit = localFont({
  src: [
    { path: "../fonts/Kanit-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Kanit-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Kanit-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Kanit-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Kanit-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-kanit",
  display: "swap",
});

const INTRO_SCRIPT = `try{if(!sessionStorage.getItem("masarang-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-on");sessionStorage.setItem("masarang-intro","1")}}catch(e){}`;

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
    <html lang={locale} data-scroll-behavior="smooth" className={kanit.variable} suppressHydrationWarning>
      <body>
        {/* Sebelum cat pertama: tentukan apakah salam pembukaan diputar (sekali per sesi, tidak bila gerak dikurangi). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <Intro locale={locale} />
        <CountUp />
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
