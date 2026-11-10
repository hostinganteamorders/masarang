import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { PartnersRow } from "@/components/PartnersRow";
import { Ph } from "@/components/Ph";
import { Photo } from "@/components/Photo";
import { Pillars } from "@/components/Pillars";
import { Portrait } from "@/components/Portrait";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { TeamGroups } from "@/components/TeamGroups";
import { VideoSlot } from "@/components/VideoSlot";
import { VisionBand } from "@/components/VisionBand";
import { about } from "@/content/about";
import { apingVideo } from "@/data/media";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about", about[locale].meta);
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const t = about[locale];

  return (
    <>
      <PageHero locale={locale} title={t.hero.title} lede={t.hero.lede} image={photos.heroes.about} />

      {/* Our Founder */}
      <section id="founder" className="section on-light" aria-labelledby="founder-title">
        <div className="container">
          <Split
            ratio="4-7"
            align="center"
            left={<Portrait name={t.founder.name} placeholder seed={7} />}
            right={
              <div className="prose">
                <h2 id="founder-title" className="title-md" style={{ marginBottom: "0.75rem" }}>
                  {t.founder.title}
                </h2>
                <p className="num" style={{ fontSize: "1.6rem", marginBottom: "0.25rem" }}>
                  {t.founder.name} <Ph on>{t.founder.nameNote}</Ph>
                </p>
                <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontWeight: 600 }}>{t.founder.role}</p>
                {t.founder.bio.map((p) => (
                  <p key={p} style={{ fontSize: "1.15rem" }}>
                    <Ph on>{p}</Ph>
                  </p>
                ))}
                <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                  <Ph on>{t.founder.photoLabel}</Ph>
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Sejarah Masarang */}
      <section className="section on-soft" aria-labelledby="history-title">
        <div className="container">
          <Split
            ratio="5-6"
            align="center"
            left={<Photo pic={photos.about.story} locale={locale} ratio="4 / 5" sizes="(max-width: 52rem) 100vw, 45vw" />}
            right={
              <div className="prose">
                <h2 id="history-title" className="title-md" style={{ marginBottom: "1.5rem" }}>
                  {t.founder.history.title}
                </h2>
                {t.founder.history.paragraphs.map((p) => (
                  <p key={p} style={{ fontSize: "1.15rem" }}>
                    <Ph on>{p}</Ph>
                  </p>
                ))}
              </div>
            }
          />
        </div>
      </section>

      {/* Video Aping */}
      <section className="section on-dark" aria-labelledby="video-title">
        <div className="container">
          <h2 id="video-title" className="sr-only">
            {t.founder.video}
          </h2>
          <div style={{ maxWidth: "60rem", marginInline: "auto" }}>
            <VideoSlot url={apingVideo.url} title={apingVideo.title[locale]} locale={locale} />
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <VisionBand title={t.vision.title} ph>
        {t.vision.body}
      </VisionBand>

      {/* What we do, why we do it */}
      <section className="section on-light" aria-labelledby="what-title">
        <div className="container">
          <SectionHead id="what-title" title={t.what.title} lede={t.what.lede} />
          <Pillars
            locale={locale}
            items={[
              {
                id: "restoration",
                title: t.what.restoration.title,
                body: t.what.restoration.body,
                color: "var(--restoration)",
                photo: photos.about.land,
                cta: t.what.restoration.cta,
                href: localePath(locale, "/programs/restoration"),
              },
              {
                id: "conservation",
                title: t.what.conservation.title,
                body: t.what.conservation.body,
                color: "var(--conservation)",
                photo: photos.about.wildlife,
                cta: t.what.conservation.cta,
                href: localePath(locale, "/programs/conservation"),
              },
              {
                id: "education",
                title: t.what.education.title,
                body: t.what.education.body,
                color: "var(--education)",
                photo: photos.programs.education,
                cta: t.what.education.cta,
                href: localePath(locale, "/programs/education"),
              },
            ]}
          />
          <div className="prose" style={{ marginTop: "3rem", maxWidth: "46rem" }}>
            <h3 className="title-md" style={{ fontSize: "clamp(1.8rem, 1.3rem + 1.6vw, 2.6rem)", marginBottom: "1rem" }}>
              {t.what.why.title}
            </h3>
            <p style={{ fontSize: "1.15rem" }}>
              <Ph on>{t.what.why.body}</Ph>
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="section on-soft" aria-labelledby="team-title">
        <div className="container">
          <SectionHead id="team-title" title={t.team.title} lede={t.team.lede} />
          <TeamGroups locale={locale} />
        </div>
      </section>

      {/* Our Partners */}
      <section id="partners" className="section on-light" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead id="partners-title" title={t.partners.title} lede={t.partners.lede} />
          <PartnersRow locale={locale} />
        </div>
      </section>

      {/* Pertanggungjawaban */}
      <section className="section on-dark" aria-labelledby="account-title">
        <div className="container">
          <SectionHead id="account-title" title={t.account.title} />
          <p>
            <Link href={localePath(locale, "/transparency")} className="btn">
              {t.account.cta}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
