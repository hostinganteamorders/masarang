import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { SectionHead } from "@/components/SectionHead";
import { SitesMap } from "@/components/SitesMap";
import { Split } from "@/components/Split";
import { about } from "@/content/about";
import { common } from "@/content/common";
import { photos } from "@/data/photos";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import s from "./sites.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/about/sites">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/about/sites", { ...about[locale].meta, title: about[locale].sites.title });
}

const PROGRAM_PATH: Record<string, string> = {
  restoration: "/programs/restoration",
  conservation: "/programs/conservation",
  education: "/programs/education",
};

export default async function SitesPage({ params }: PageProps<"/[locale]/about/sites">) {
  const locale = await resolveLocale(params);
  const t = about[locale].sites;

  return (
    <>
      <PageHero
        locale={locale}
        title={t.title}
        lede={t.subheader}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.about, href: localePath(locale, "/about") }, { text: t.title }]}
      />

      <section id="sites" className="section on-light" aria-labelledby="sites-title">
        <div className="container">
          <SectionHead id="sites-title" title={t.mapTitle} lede={t.lede} />
          <Split
            ratio="5-6"
            align="start"
            left={<SitesMap items={t.profiles} label={t.mapLabel} note={t.mapNote} />}
            right={
              <div>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>{t.profilesTitle}</h3>
                <ol className={s.list}>
                  {t.profiles.map((p, i) => {
                    const path = PROGRAM_PATH[p.program];
                    return (
                      <li key={p.id} id={`site-${p.id}`} className={s.item}>
                        <span className={s.num} aria-hidden="true">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className={s.name}>{p.name}</h4>
                          <p className={s.tags}>
                            <span>{t.programTag[p.program as keyof typeof t.programTag]}</span>
                            {"associated" in p && p.associated && <span>{t.associated}</span>}
                          </p>
                          <p className={s.body}>{"ph" in p && p.ph ? <Ph on>{p.body}</Ph> : p.body}</p>
                          {path && (
                            <Link href={localePath(locale, path)} className={s.more}>
                              {t.seeProgram}
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
                <p className={s.source}>{t.sources}</p>
              </div>
            }
          />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
