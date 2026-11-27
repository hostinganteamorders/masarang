import type { Metadata } from "next";
import { LinkCards } from "@/components/LinkCards";
import { MenuIntro } from "@/components/MenuIntro";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { about } from "@/content/about";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about", about[locale].meta);
}

const CARDS = [
  { id: "founder", path: "/about/founder" },
  { id: "story", path: "/about/story" },
  { id: "vision", path: "/about/vision" },
  { id: "sites", path: "/about/sites" },
  { id: "partners", path: "/about/partners" },
] as const;

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const t = about[locale];

  return (
    <>
      <PageHero locale={locale} title={t.hero.title} lede={t.hero.lede} image={photos.heroes.about} />

      <MenuIntro locale={locale} id="about" />

      <section className="section on-light" aria-labelledby="overview-title">
        <div className="container">
          <SectionHead id="overview-title" title={t.overview.title} lede={t.overview.lede} />
          <LinkCards
            items={CARDS.map((c) => ({
              id: c.id,
              title: t.overview.cards[c.id].title,
              body: t.overview.cards[c.id].body,
              href: localePath(locale, c.path),
              cta: t.overview.open,
            }))}
          />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
