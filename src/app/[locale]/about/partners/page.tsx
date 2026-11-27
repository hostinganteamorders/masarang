import type { Metadata } from "next";
import Link from "next/link";
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
        lede={t.partners.subheader}
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

      <section className="section on-soft" aria-labelledby="closing-title">
        <div className="container">
          <h2 id="closing-title" className="sr-only">
            {t.partners.cta}
          </h2>
          <p className="prose" style={{ fontSize: "1.3rem", fontWeight: 600, maxWidth: "46rem" }}>
            {t.partners.closing}
          </p>
          <p>
            <Link href={localePath(locale, "/get-involved/partner")} className="btn">
              {t.partners.cta}
            </Link>
          </p>
        </div>
      </section>


      <NewsletterBand locale={locale} />
    </>
  );
}
