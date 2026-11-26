import type { Metadata } from "next";
import { PartnersRow } from "@/components/PartnersRow";
import { SectionHead } from "@/components/SectionHead";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { about } from "@/content/about";
import { common } from "@/content/common";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about/partners">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about/partners", { ...about[locale].meta, title: about[locale].partners.title });
}

export default async function PartnersPage({ params }: PageProps<"/[locale]/about/partners">) {
  const locale = await resolveLocale(params);
  const t = about[locale];

  return (
    <>
      <PageHero
        locale={locale}
        title={t.partners.title}
        lede={t.partners.lede}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.about, href: localePath(locale, "/about") }, { text: t.partners.title }]}
      />

      {/* Our Partners */}
      <section id="partners" className="section on-light" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead id="partners-title" title={t.partners.title} lede={t.partners.lede} />
          <PartnersRow locale={locale} />
        </div>
      </section>


      <NewsletterBand locale={locale} />
    </>
  );
}
