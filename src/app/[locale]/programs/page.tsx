import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { ProgramCards } from "@/components/ProgramCards";
import { ProgramTabs } from "@/components/ProgramTabs";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { Steps } from "@/components/Steps";
import { programsCopy } from "@/content/programs";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/programs">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs", programsCopy[locale].overview.meta);
}

export default async function ProgramsPage({ params }: PageProps<"/[locale]/programs">) {
  const locale = await resolveLocale(params);
  const t = programsCopy[locale].overview;

  return (
    <>
      <PageHero locale={locale} title={t.hero.title} lede={t.hero.lede} image={photos.heroes.programs}>
        <ProgramTabs locale={locale} current="overview" />
      </PageHero>

      <section className="section on-light" aria-labelledby="items-title">
        <div className="container">
          <SectionHead id="items-title" title={t.itemsTitle} />
          <ProgramCards locale={locale} tone="light" />
        </div>
      </section>

      <section className="section on-soft" aria-labelledby="monitoring-title">
        <div className="container">
          <Split
            ratio="6-5"
            align="center"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="monitoring-title" className="title-md">
                  {t.monitoring.title}
                </h2>
                <p className="lede">{t.monitoring.body}</p>
                <p>
                  <Link href={localePath(locale, "/updates")} className="btn">
                    {t.monitoring.cta}
                  </Link>
                </p>
              </div>
            }
            right={
              <Photo pic={photos.programs.monitoring} locale={locale} ratio="4 / 3" sizes="(max-width: 52rem) 100vw, 40vw" decorative />
            }
          />
        </div>
      </section>

      <section className="section on-dark" aria-labelledby="how-title">
        <div className="container">
          <SectionHead id="how-title" title={t.how.title} />
          <Steps steps={t.how.steps} />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
