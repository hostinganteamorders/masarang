import type { Metadata } from "next";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { TeamGrid } from "@/components/TeamGrid";
import { teamCopy } from "@/content/team";
import { photos } from "@/data/photos";
import { team } from "@/data/team";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/team">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/team", teamCopy[locale].meta);
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const locale = await resolveLocale(params);
  const t = teamCopy[locale];

  return (
    <>
      <PageHero locale={locale} title={t.hero.title} lede={t.hero.lede} image={photos.heroes.team} />

      <section className="section on-light" aria-labelledby="governance-title">
        <div className="container">
          <SectionHead id="governance-title" title={t.governance.title} lede={t.governance.lede} />
          <TeamGrid locale={locale} members={team.filter((m) => m.group === "governance")} columns={4} />
        </div>
      </section>

      <section className="section on-soft" aria-labelledby="programs-title">
        <div className="container">
          <SectionHead id="programs-title" title={t.programs.title} lede={t.programs.lede} />
          <TeamGrid locale={locale} members={team.filter((m) => m.group === "programs")} columns={5} />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
