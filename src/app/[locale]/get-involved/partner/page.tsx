import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { MailButton } from "@/components/MailButton";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { common } from "@/content/common";
import { involvedCopy } from "@/content/involved";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import s from "@/components/Involved.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/get-involved/partner">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/get-involved/partner", involvedCopy[locale].partner.meta);
}

const tones = ["var(--restoration)", "var(--conservation)", "var(--education)", "var(--restoration)"];

export default async function Page({ params }: PageProps<"/[locale]/get-involved/partner">) {
  const locale = await resolveLocale(params);
  const t = involvedCopy[locale].partner;
  const c = common[locale];

  return (
    <>
      <PageHero
        locale={locale}
        accent="education"
        seed={13}
        crumbs={[{ text: c.nav.involved, href: localePath(locale, "/get-involved") }, { text: t.meta.title }]}
        title={t.hero.title}
        lede={t.hero.lede}
      />
      <section className="section on-light" aria-labelledby="list-title">
        <div className="container">
          <SectionHead id="list-title" title={t.who.title} />
          <ul className={s.items}>
            {t.who.items.map((item, i) => (
              <li key={item.title} style={{ ["--tone" as string]: tones[i % tones.length] } as CSSProperties}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section on-dark" aria-labelledby="how-title">
        <div className="container" style={{ display: "grid", gap: "1.25rem", justifyItems: "start", maxWidth: "46rem", marginInline: 0 }}>
          <h2 id="how-title" className="title-md">
            {t.how.title}
          </h2>
          <p className="lede">{t.how.body}</p>
          <MailButton locale={locale} mail="partner">
            {t.how.cta}
          </MailButton>
        </div>
      </section>
      <NewsletterBand locale={locale} />
    </>
  );
}
