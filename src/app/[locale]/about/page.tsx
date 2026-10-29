import type { Metadata } from "next";
import Link from "next/link";
import { Principles } from "@/components/Governance";
import { Letter } from "@/components/Letter";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { PartnersRow } from "@/components/PartnersRow";
import { Ph } from "@/components/Ph";
import { Photo } from "@/components/Photo";
import { Pillars } from "@/components/Pillars";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { StatRow } from "@/components/StatRow";
import { about } from "@/content/about";
import { common } from "@/content/common";
import { home } from "@/content/home";
import { photos } from "@/data/photos";
import { governance } from "@/data/organisation";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { keyStats } from "@/lib/stats";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about", about[locale].meta);
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const t = about[locale];
  const c = common[locale];
  const chair = governance.find((g) => g.id === "chair");

  return (
    <>
      <PageHero locale={locale} title={t.hero.title} lede={t.hero.lede} image={photos.heroes.about} />

      {/* Apa yang kami kerjakan */}
      <section className="section on-light" aria-labelledby="work-title">
        <div className="container">
          <SectionHead id="work-title" title={t.work.title} />
          <Pillars
            locale={locale}
            items={[
              {
                id: "land",
                title: t.work.land.title,
                body: t.work.land.body,
                color: "var(--restoration)",
                photo: photos.about.land,
                cta: t.work.land.cta,
                href: localePath(locale, "/programs/temboan"),
              },
              {
                id: "wildlife",
                title: t.work.wildlife.title,
                body: t.work.wildlife.body,
                color: "var(--conservation)",
                photo: photos.about.wildlife,
                cta: t.work.wildlife.cta,
                href: localePath(locale, "/programs/tasikoki"),
              },
              {
                id: "proof",
                title: t.work.proof.title,
                body: t.work.proof.body,
                color: "var(--neutral-dark)",
                photo: photos.about.proof,
                cta: t.work.proof.cta,
                href: localePath(locale, "/transparency"),
              },
            ]}
          />
        </div>
      </section>

      {/* Kisah pendirian (isi masih contoh) */}
      <section className="section on-soft" aria-labelledby="story-title">
        <div className="container">
          <Split
            ratio="5-6"
            align="center"
            left={
              <Photo pic={photos.about.story} locale={locale} ratio="4 / 5" sizes="(max-width: 52rem) 100vw, 45vw" />
            }
            right={
              <div className="prose">
                <h2 id="story-title" className="title-md" style={{ marginBottom: "1.5rem" }}>
                  {t.story.title}
                </h2>
                {t.story.paragraphs.map((p) => (
                  <p key={p} style={{ fontSize: "1.15rem" }}>
                    <Ph on>{p}</Ph>
                  </p>
                ))}
              </div>
            }
          />
        </div>
      </section>

      {/* Surat dari ketua (isi masih contoh) */}
      <Letter
        title={t.letter.title}
        body={t.letter.body}
        ph
        name={chair ? chair.name[locale] : ""}
        namePh={chair?.ph}
        role={t.letter.signature}
      />

      {/* Posisi saat ini */}
      <section className="section on-dark" aria-labelledby="now-title">
        <div className="container">
          <SectionHead
            id="now-title"
            meta={[fill(c.labels.asOf, { date: fullDate(site.lastUpdated, locale) })]}
            title={t.now.title}
          />
          <StatRow stats={keyStats(locale)} />
        </div>
      </section>

      {/* Pertanggungjawaban */}
      <section className="section on-light" aria-labelledby="account-title">
        <div className="container">
          <SectionHead id="account-title" title={t.account.title} lede={t.account.lede} />
          <Principles locale={locale} />
          <p style={{ marginTop: "2.25rem" }}>
            <Link href={localePath(locale, "/transparency")} className="btn">
              {t.account.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Mitra */}
      <section className="section on-soft" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead id="partners-title" title={home[locale].partners.title} />
          <PartnersRow locale={locale} />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
