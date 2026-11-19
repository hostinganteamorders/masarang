import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCards } from "@/components/CategoryCards";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { SectionHead } from "@/components/SectionHead";
import { PopulationChart } from "@/components/PopulationChart";
import { SpeciesList } from "@/components/SpeciesList";
import { StatRow } from "@/components/StatRow";
import { Steps } from "@/components/Steps";
import { adoptCopy } from "@/content/adopt";
import { common } from "@/content/common";
import { sponsorFrom } from "@/data/organisation";
import { photos } from "@/data/photos";
import { catOrder, wildTotals, wildlifeAsOf } from "@/data/wildlife";
import { fill, idrAuto, monthYear, num } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { fillNode } from "@/lib/node";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/programs/conservation/adopt">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs/conservation/adopt", adoptCopy[locale].meta);
}

export default async function AdoptPage({ params }: PageProps<"/[locale]/programs/conservation/adopt">) {
  const locale = await resolveLocale(params);
  const a = adoptCopy[locale];

  const names = Object.fromEntries(catOrder.map((c) => [c, a.cats[c].name])) as Record<(typeof catOrder)[number], string>;
  const amount = <Ph on={sponsorFrom.ph}>{idrAuto(sponsorFrom.v, locale)}</Ph>;
  const steps = a.how.steps.map((step) => ({
    title: step.title,
    body: fillNode(step.body, { amount }),
  }));

  return (
    <>
      <PageHero
        locale={locale}
        accent="conservation"
        size="long"
        image={photos.heroes.adopt}
        crumbs={[
          { text: common[locale].nav.programs, href: localePath(locale, "/programs") },
          { text: common[locale].nav.conservation, href: localePath(locale, "/programs/conservation") },
          { text: common[locale].nav.adopt },
        ]}
        meta={[a.hero.source, fill(a.hero.unit, { date: monthYear(wildlifeAsOf, locale) })]}
        title={a.hero.title}
        lede={a.hero.lede}
      />

      {/* Jumlah keseluruhan */}
      <section className="section on-light" aria-labelledby="totals-title">
        <div className="container">
          <SectionHead id="totals-title" title={a.totals.title} lede={a.totals.lede} />
          <StatRow
            stats={[
              { label: a.totals.inCare, value: num(wildTotals.inCare, locale) },
              { label: a.totals.quarantine, value: num(wildTotals.quarantine, locale), ph: wildTotals.quarantinePh, note: wildTotals.quarantinePh ? a.totals.quarantineNote : undefined },
              { label: a.totals.released, value: num(wildTotals.released, locale) },
              { label: a.totals.entered, value: num(wildTotals.entered, locale) },
            ]}
          />
        </div>
      </section>

      {/* Per kategori */}
      <section className="section on-soft" aria-label={a.hero.title}>
        <div className="container">
          <CategoryCards locale={locale} copy={a} />
        </div>
      </section>

      {/* Grafik per tahun */}
      <section className="section on-light" aria-labelledby="chart-title">
        <div className="container">
          <SectionHead id="chart-title" meta={[a.chart.source]} title={a.chart.title} lede={a.chart.lede} />
          <PopulationChart locale={locale} copy={a} names={names} asOfYear={Number(wildlifeAsOf.slice(0, 4))} />
        </div>
      </section>

      {/* Menurut jenis */}
      <section className="section on-soft" aria-labelledby="species-title">
        <div className="container">
          <SectionHead id="species-title" title={a.species.title} lede={a.species.lede} />
          <SpeciesList locale={locale} copy={a} names={names} />
        </div>
      </section>

      {/* Cara kerja sponsor */}
      <section className="section on-dark" aria-labelledby="how-title">
        <div className="container">
          <SectionHead id="how-title" title={a.how.title} />
          <Steps steps={steps} />
          <p style={{ marginTop: "2.25rem" }}>
            <Link href={`${localePath(locale, "/support")}#bank`} className="btn">
              {a.how.cta}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
