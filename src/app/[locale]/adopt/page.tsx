import type { Metadata } from "next";
import Link from "next/link";
import { AdoptExplorer } from "@/components/AdoptExplorer";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { SectionHead } from "@/components/SectionHead";
import { SpeciesTable } from "@/components/SpeciesTable";
import { Steps } from "@/components/Steps";
import { adoptCopy } from "@/content/adopt";
import { sponsorFrom } from "@/data/organisation";
import { photos } from "@/data/photos";
import { idrAuto } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { fillNode } from "@/lib/node";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/adopt">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/adopt", adoptCopy[locale].meta);
}

export default async function AdoptPage({ params }: PageProps<"/[locale]/adopt">) {
  const locale = await resolveLocale(params);
  const a = adoptCopy[locale];

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
        meta={[a.hero.source, a.hero.unit]}
        title={a.hero.title}
        lede={a.hero.lede}
      />

      {/* Register interaktif */}
      <section className="section on-light" aria-label={a.explorer.registerLabel}>
        <div className="container">
          <AdoptExplorer locale={locale} />
        </div>
      </section>

      {/* Menurut spesies */}
      <section className="section on-soft" aria-labelledby="species-title">
        <div className="container">
          <SectionHead id="species-title" title={a.table.title} />
          <SpeciesTable locale={locale} copy={a} />
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
