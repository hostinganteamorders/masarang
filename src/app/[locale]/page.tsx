import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { ProgramCards } from "@/components/ProgramCards";
import { ReportCard } from "@/components/ReportCard";
import { SectionHead } from "@/components/SectionHead";
import { StatRow } from "@/components/StatRow";
import { Hero } from "@/components/home/Hero";
import { common } from "@/content/common";
import { home } from "@/content/home";
import { adoptCopy } from "@/content/adopt";
import { finance, moneyOut } from "@/data/finance";
import { keyFigures, tasikoki } from "@/data/programs";
import { latestReport } from "@/data/reports";
import { site } from "@/data/site";
import { catOrder, wildCats, wildTotals } from "@/data/wildlife";
import { fill, fullDate, num, pct } from "@/lib/format";
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

      {/* Dampak kami: semua angka, bisa diunduh */}
      <section className="section on-soft" aria-labelledby="impact-title">
        <div className="container">
          <SectionHead
            id="impact-title"
            meta={[fill(c.labels.updated, { date: fullDate(site.lastUpdated, locale) })]}
            title={t.impact.title}
            lede={t.impact.lede}
          />
          <p style={{ marginBottom: "2.5rem" }}>
            <a href={`${localePath(locale)}/impact.xlsx`} className="btn" download>
              {t.impact.download}
            </a>
            <span className="small" style={{ marginLeft: "1rem", color: "var(--muted)" }}>
              {t.impact.downloadNote}
            </span>
          </p>

          <h3 style={{ marginBottom: "1rem", fontSize: "1.6rem" }}>{t.impact.restoration}</h3>
          <StatRow
            size="md"
            stats={[
              { label: t.figures.labels.conservation, value: num(keyFigures.conservationHa.v, locale), unit: c.labels.ha, ph: keyFigures.conservationHa.ph },
              { label: t.figures.labels.restoredTemboan, value: num(keyFigures.restoredTemboanHa.v, locale), unit: c.labels.ha, ph: keyFigures.restoredTemboanHa.ph },
              { label: t.figures.labels.farmers, value: num(keyFigures.farmers.v, locale), ph: keyFigures.farmers.ph },
              { label: t.figures.labels.income, value: pct(keyFigures.incomeIncreasePct.v, locale), ph: keyFigures.incomeIncreasePct.ph },
              { label: t.impact.labels.trees, value: num(keyFigures.treesPlanted.v, locale), ph: keyFigures.treesPlanted.ph },
              { label: t.impact.labels.survival, value: pct(keyFigures.survival.v, locale), ph: keyFigures.survival.ph },
            ]}
          />

          <h3 style={{ margin: "3rem 0 1rem", fontSize: "1.6rem" }}>{t.impact.conservation}</h3>
          <StatRow
            size="md"
            stats={[
              { label: t.impact.labels.inCare, value: num(wildTotals.inCare, locale) },
              ...catOrder.map((cat) => ({
                label: adoptCopy[locale].cats[cat].name,
                value: num(wildCats.find((w) => w.cat === cat)?.inCare ?? 0, locale),
              })),
              { label: t.impact.labels.released, value: num(wildTotals.released, locale) },
              { label: t.impact.labels.entered, value: num(wildTotals.entered, locale) },
            ]}
          />
          <p style={{ marginTop: "1.25rem" }}>
            <Link href={localePath(locale, "/programs/conservation/adopt")} className="btn btn--ghost">
              {t.impact.labels.more}
            </Link>
          </p>

          <h3 style={{ margin: "3rem 0 1rem", fontSize: "1.6rem" }}>{t.impact.education}</h3>
          <StatRow size="md" stats={[{ label: t.impact.labels.students, value: num(tasikoki.students.v, locale), ph: tasikoki.students.ph }]} />

          <h3 style={{ margin: "3rem 0 1rem", fontSize: "1.6rem" }}>{t.impact.finance}</h3>
          <StatRow
            size="md"
            stats={moneyOut.map((f) => ({ label: f.label[locale], value: pct(f.share, locale), ph: finance.ph }))}
          />
          <p className="small" style={{ marginTop: "0.75rem", color: "var(--muted)" }}>
            {fill(c.labels.period, { year: finance.year })}
          </p>
        </div>
      </section>

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
