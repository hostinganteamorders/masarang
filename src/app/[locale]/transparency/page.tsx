import type { Metadata } from "next";
import Link from "next/link";
import { DocumentsTable } from "@/components/DocumentsTable";
import { FinanceExplorer } from "@/components/FinanceExplorer";
import { GiveBand } from "@/components/GiveBand";
import { GovernanceList, Principles } from "@/components/Governance";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { SectionHead } from "@/components/SectionHead";
import { StatRow } from "@/components/StatRow";
import { common } from "@/content/common";
import { transparencyCopy } from "@/content/transparency";
import { finance, overheadShare, unitCosts } from "@/data/finance";
import { site } from "@/data/site";
import { fill, idrAuto, pct, usd } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/transparency">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/transparency", transparencyCopy[locale].meta);
}

export default async function TransparencyPage({ params }: PageProps<"/[locale]/transparency">) {
  const locale = await resolveLocale(params);
  const t = transparencyCopy[locale];
  const c = common[locale];
  const overhead = <Ph on={overheadShare.ph}>{pct(overheadShare.v, locale)}</Ph>;

  return (
    <>
      <PageHero
        locale={locale}
        accent="restoration"
        size="long"
        seed={11}
        meta={[
          fill(c.labels.period, { year: finance.year }),
          fill(c.labels.source, { source: finance.source[locale] }),
        ]}
        title={t.hero.title}
        lede={fill(t.hero.lede, { year: finance.year })}
      />

      {/* Dana masuk dan keluar */}
      <section className="section on-light" aria-label={fill(c.labels.period, { year: finance.year })}>
        <div className="container">
          <FinanceExplorer locale={locale} />
        </div>
      </section>

      {/* Biaya operasional */}
      <GiveBand
        locale={locale}
        tone="deep"
        value={overhead}
        caption={t.overhead.caption}
        title={t.overhead.title}
        body={t.overhead.body}
        href="#principles"
        cta={t.overhead.cta}
      />

      {/* Biaya satuan */}
      <section className="section on-soft" aria-labelledby="unit-title">
        <div className="container">
          <SectionHead id="unit-title" title={t.unit.title} lede={t.unit.lede} />
          <StatRow
            size="md"
            stats={unitCosts.map((u) => ({
              label: u.label[locale],
              value: idrAuto(u.amount, locale),
              note: fill(t.unit.approx, { usd: usd(u.amount, site.fx, locale) }),
              ph: u.ph,
            }))}
          />
        </div>
      </section>

      {/* Dokumen */}
      <section className="section on-light" aria-labelledby="docs-title">
        <div className="container">
          <SectionHead id="docs-title" title={t.docs.title} lede={t.docs.lede} />
          <DocumentsTable locale={locale} />
        </div>
      </section>

      {/* Tata kelola */}
      <section className="section on-dark" aria-labelledby="governance-title">
        <div className="container">
          <SectionHead id="governance-title" title={t.governance.title} lede={t.governance.lede} />
          <GovernanceList locale={locale} />
          <p style={{ marginTop: "2.25rem" }}>
            <Link href={localePath(locale, "/team")} className="btn">
              {t.governance.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Prinsip pengelolaan dana */}
      <section className="section on-soft" id="principles" aria-labelledby="principles-title">
        <div className="container">
          <SectionHead id="principles-title" title={t.principles.title} />
          <Principles locale={locale} />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
