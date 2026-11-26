import type { Metadata } from "next";
import Link from "next/link";
import { Pillars } from "@/components/Pillars";
import { Rich } from "@/components/Rich";
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
        lede={t.vision.statement}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.about, href: localePath(locale, "/about") }, { text: t.vision.title }]}
      />

      {/* Our Vision */}
      <VisionBand title={t.vision.title} statement={t.vision.statement}>
        {t.vision.more.map((p) => (
          <p key={p}>
            <Rich text={p} />
          </p>
        ))}
      </VisionBand>

      {/* What we do, why we do it */}
      <section className="section on-light" aria-labelledby="what-title">
        <div className="container">
          <SectionHead id="what-title" title={t.what.title} lede={t.what.lede} />
          <div className="prose" style={{ maxWidth: "46rem", marginBottom: "3rem" }}>
            {t.what.intro.map((p) => (
              <p key={p} style={{ fontSize: "1.15rem" }}>
                {p}
              </p>
            ))}
          </div>
          <Pillars
            locale={locale}
            compact
            items={t.what.pillars.map((pillar, i) => ({
              id: pillar.id,
              marker: `0${i + 1}`,
              title: pillar.title,
              body: pillar.body,
              color: PILLAR_STYLE[pillar.id].color,
              photo: PILLAR_STYLE[pillar.id].photo,
            }))}
          />
          <div className="prose" style={{ marginTop: "3rem" }}>
            <p style={{ fontSize: "1.15rem", fontWeight: 600 }}>{t.what.programs.lead}</p>
            <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href={localePath(locale, "/programs/restoration")} className="btn btn--ghost">
                {t.what.programs.restoration}
              </Link>
              <Link href={localePath(locale, "/programs/conservation")} className="btn btn--ghost">
                {t.what.programs.conservation}
              </Link>
              <Link href={localePath(locale, "/programs/education")} className="btn btn--ghost">
                {t.what.programs.education}
              </Link>
            </p>
          </div>
        </div>
      </section>


      <NewsletterBand locale={locale} />
    </>
  );
}
