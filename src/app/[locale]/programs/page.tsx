import type { Metadata } from "next";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Pillars } from "@/components/Pillars";
import { SectionHead } from "@/components/SectionHead";
import { SiteCard } from "@/components/SiteCard";
import { Gallery } from "@/components/Gallery";
import { Steps } from "@/components/Steps";
import { programsCopy } from "@/content/programs";
import { photos } from "@/data/photos";
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
      <PageHero locale={locale} title={t.hero.title} lede={t.hero.lede} image={photos.heroes.programs} />

      <section className="section on-light" aria-labelledby="sites-title">
        <div className="container">
          <SectionHead id="sites-title" title={t.sites.title} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))",
              gap: "clamp(1rem, 2.5vw, 1.75rem)",
            }}
          >
            <SiteCard locale={locale} id="temboan" tone="light" />
            <SiteCard locale={locale} id="tasikoki" tone="light" />
          </div>
        </div>
      </section>

      <section className="section on-soft" aria-labelledby="across-title">
        <div className="container">
          <SectionHead id="across-title" title={t.across.title} />
          <Pillars
            columns={2}
            locale={locale}
            items={[
              {
                id: "education",
                title: t.across.education.title,
                body: t.across.education.body,
                color: "var(--education)",
                photo: photos.programs.education,
              },
              {
                id: "monitoring",
                title: t.across.monitoring.title,
                body: t.across.monitoring.body,
                color: "var(--neutral-mid)",
                photo: photos.programs.monitoring,
              },
            ]}
          />
        </div>
      </section>

      <section className="section on-light" aria-labelledby="learning-title">
        <div className="container">
          <SectionHead id="learning-title" title={t.educationGallery.title} />
          <Gallery items={photos.education} locale={locale} labelledBy="learning-title" />
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
