import type { Metadata } from "next";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { Portrait } from "@/components/Portrait";
import { Split } from "@/components/Split";
import { VideoSlot } from "@/components/VideoSlot";
import { about } from "@/content/about";
import { common } from "@/content/common";
import { apingVideo } from "@/data/media";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about/founder">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about/founder", about[locale].founder.meta);
}

export default async function FounderPage({ params }: PageProps<"/[locale]/about/founder">) {
  const locale = await resolveLocale(params);
  const t = about[locale];

  return (
    <>
      <PageHero
        locale={locale}
        title={t.founder.title}
        lede={t.founder.subheader}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.about, href: localePath(locale, "/about") }, { text: t.founder.title }]}
      />


      {/* Our Founder */}
      <section id="founder" className="section on-light" aria-labelledby="founder-title">
        <div className="container">
          <Split
            ratio="4-7"
            align="start"
            left={<Portrait name={t.founder.name} placeholder seed={7} />}
            right={
              <div className="prose">
                <h2 id="founder-title" className="title-md" style={{ marginBottom: "0.75rem" }}>
                  {t.founder.title}
                </h2>
                <p className="num" style={{ fontSize: "1.6rem", marginBottom: "0.25rem" }}>
                  {t.founder.name}
                </p>
                <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontWeight: 600 }}>{t.founder.role}</p>
                {t.founder.bio.map((p) => (
                  <p key={p} style={{ fontSize: "1.1rem" }}>
                    {p}
                  </p>
                ))}
                <h3 style={{ marginTop: "2rem", fontSize: "1.3rem" }}>
                  {t.founder.recognitionTitle}
                </h3>
                <ul>
                  {t.founder.recognition.map((r) => (
                    <li key={r}>{r.includes("[") ? <Ph on>{r}</Ph> : r}</li>
                  ))}
                </ul>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                  <Ph on>{t.founder.photoLabel}</Ph>
                </p>
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
            <VideoSlot url={apingVideo.url} poster={apingVideo.poster} title={apingVideo.title[locale]} locale={locale} />
          </div>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
