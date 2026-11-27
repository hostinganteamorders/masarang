import type { Metadata } from "next";
import Link from "next/link";
import { Pillars } from "@/components/Pillars";
import { SectionHead } from "@/components/SectionHead";
import { VisionBand } from "@/components/VisionBand";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { about } from "@/content/about";
import { common } from "@/content/common";
import { photos, type Pic } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

/** Warna dan foto tiap pilar "What we do". Pilar bukan program, jadi warna hanya membedakan ketiganya. */
const PILLAR_STYLE: Record<string, { color: string; photo: Pic }> = {
  nature: { color: "var(--restoration)", photo: photos.about.land },
  people: { color: "var(--education)", photo: photos.about.people },
  agriculture: { color: "var(--conservation)", photo: photos.about.agriculture },
};


export async function generateMetadata({ params }: PageProps<"/[locale]/about/vision">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about/vision", { ...about[locale].meta, title: about[locale].vision.title });
}

export default async function VisionPage({ params }: PageProps<"/[locale]/about/vision">) {
  const locale = await resolveLocale(params);
  const t = about[locale];

  return (
    <>
      <PageHero
        locale={locale}
        title={t.vision.title}
        lede={t.vision.subheader}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.about, href: localePath(locale, "/about") }, { text: t.vision.title }]}
      />

      {/* Our Vision */}
      <VisionBand title={t.vision.ourVision.title} statement={t.vision.ourVision.body} />

      {/* Why we do it */}
      <section className="section on-light" aria-labelledby="why-title">
        <div className="container">
          <SectionHead id="why-title" title={t.vision.why.title} />
          <div className="prose" style={{ maxWidth: "46rem" }}>
            <p style={{ fontSize: "1.15rem" }}>{t.vision.why.body}</p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section on-soft" aria-labelledby="how-title">
        <div className="container">
          <SectionHead id="how-title" title={t.vision.how.title} />
          <Pillars
            locale={locale}
            compact
            items={t.vision.how.pillars.map((pillar) => ({
              id: pillar.id,
              title: pillar.title,
              body: [pillar.body],
              color: PILLAR_STYLE[pillar.id].color,
              photo: PILLAR_STYLE[pillar.id].photo,
            }))}
          />
          <p className="prose" style={{ marginTop: "3rem", fontSize: "1.3rem", fontWeight: 600, maxWidth: "46rem" }}>
            {t.vision.how.closing}
          </p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginTop: "1.5rem" }}>
            <span style={{ fontWeight: 600 }}>{t.vision.programs.lead}</span>
            <Link href={localePath(locale, "/programs/restoration")} className="btn btn--ghost">
              {t.vision.programs.restoration}
            </Link>
            <Link href={localePath(locale, "/programs/conservation")} className="btn btn--ghost">
              {t.vision.programs.conservation}
            </Link>
            <Link href={localePath(locale, "/programs/education")} className="btn btn--ghost">
              {t.vision.programs.education}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
