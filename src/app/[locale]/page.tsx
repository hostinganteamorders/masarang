import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { ProgramCards } from "@/components/ProgramCards";
import { ReportCard } from "@/components/ReportCard";
import { SectionHead } from "@/components/SectionHead";
import { Hero } from "@/components/home/Hero";
import { common } from "@/content/common";
import { home } from "@/content/home";
import { latestReport } from "@/data/reports";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = home[locale].meta;
  return pageMetadata(locale, "", { ...t, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const t = home[locale];
  const c = common[locale];

  return (
    <>
      <Hero locale={locale} />

      {/* Ringkasan program */}
      <section className="section on-light" aria-labelledby="programs-title">
        <div className="container">
          <SectionHead
            id="programs-title"
            meta={[
              fill(c.labels.source, { source: t.programs.source }),
              fill(c.labels.updated, { date: fullDate(site.lastUpdated, locale) }),
            ]}
            title={t.programs.title}
            lede={t.programs.lede}
          />
          <ProgramCards locale={locale} tone="light" />
        </div>
      </section>

      {/* Update terbaru: Quarterly Report */}
      <section className="section on-soft" aria-labelledby="report-title">
        <div className="container">
          <SectionHead id="report-title" title={t.report.title} lede={t.report.lede} />
          <ReportCard report={latestReport} locale={locale} featured />
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/updates")} className="btn btn--ghost">
              {t.report.all}
            </Link>
          </p>
        </div>
      </section>

      {/* Donasi */}
      <section className="section on-restoration" aria-labelledby="donate-title">
        <div className="container">
          <SectionHead id="donate-title" title={t.donate.title} lede={t.donate.lede} />
          <p>
            <Link href={localePath(locale, "/support")} className="btn">
              {t.donate.cta}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
