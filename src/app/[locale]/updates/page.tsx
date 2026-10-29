import type { Metadata } from "next";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { UpdatesList } from "@/components/UpdatesList";
import { common } from "@/content/common";
import { updatesCopy } from "@/content/updates";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/updates">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/updates", updatesCopy[locale].meta);
}

export default async function UpdatesPage({ params }: PageProps<"/[locale]/updates">) {
  const locale = await resolveLocale(params);
  const t = updatesCopy[locale];
  const c = common[locale];

  return (
    <>
      <PageHero
        locale={locale}
        seed={13}
        meta={[fill(c.labels.updated, { date: fullDate(site.lastUpdated, locale) })]}
        title={t.hero.title}
        lede={t.hero.lede}
      />

      <section className="section on-light" aria-label={t.hero.title}>
        <div className="container">
          <UpdatesList locale={locale} />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
