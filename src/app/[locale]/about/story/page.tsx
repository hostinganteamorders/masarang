import type { Metadata } from "next";
import { NewsletterBand } from "@/components/NewsletterBand";
import { MenuIntro } from "@/components/MenuIntro";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Split } from "@/components/Split";
import { about } from "@/content/about";
import { common } from "@/content/common";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about/story">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about/story", { ...about[locale].meta, title: about[locale].story.title });
}

export default async function StoryPage({ params }: PageProps<"/[locale]/about/story">) {
  const locale = await resolveLocale(params);
  const t = about[locale].story;

  return (
    <>
      <PageHero
        locale={locale}
        title={t.title}
        lede={t.subheader}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.about, href: localePath(locale, "/about") }, { text: t.title }]}
      />

      <MenuIntro locale={locale} id="story" />

      <section id="story" className="section on-light" aria-labelledby="story-title">
        <div className="container">
          <Split
            ratio="5-6"
            align="start"
            left={<Photo pic={photos.about.story} locale={locale} ratio="4 / 5" sizes="(max-width: 52rem) 100vw, 45vw" />}
            right={
              <div className="prose">
                <h2 id="story-title" className="title-md" style={{ marginBottom: "1.5rem" }}>
                  {t.title}
                </h2>
                {t.paragraphs.map((p) => (
                  <p key={p} style={{ fontSize: "1.15rem" }}>
                    {p}
                  </p>
                ))}
                <h3 style={{ marginTop: "2rem", fontSize: "1.3rem" }}>{t.recognitionTitle}</h3>
                <p>{t.recognition}</p>
              </div>
            }
          />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
