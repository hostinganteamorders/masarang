import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { involvedCopy } from "@/content/involved";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import s from "@/components/Involved.module.css";
import type { CSSProperties } from "react";

export async function generateMetadata({ params }: PageProps<"/[locale]/get-involved">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/get-involved", involvedCopy[locale].meta);
}

export default async function GetInvolvedPage({ params }: PageProps<"/[locale]/get-involved">) {
  const locale = await resolveLocale(params);
  const t = involvedCopy[locale];
  const ways = [
    { key: "adopt", href: "/programs/conservation/adopt", tone: "var(--conservation)", ...t.ways.adopt },
    { key: "donate", href: "/support", tone: "var(--restoration)", ...t.ways.donate },
    { key: "partner", href: "/get-involved/partner", tone: "var(--education)", ...t.ways.partner },
    { key: "volunteer", href: "/get-involved/volunteer", tone: "var(--restoration)", ...t.ways.volunteer },
  ];

  return (
    <>
      <PageHero locale={locale} accent="conservation" seed={11} title={t.hero.title} lede={t.hero.lede} />
      <section className="section on-light" aria-labelledby="ways-title">
        <div className="container">
          <SectionHead id="ways-title" title={t.ways.title} />
          <ul className={s.cards}>
            {ways.map((w) => (
              <li key={w.key}>
                <Link href={localePath(locale, w.href)} className={s.card} style={{ ["--tone" as string]: w.tone } as CSSProperties}>
                  <h3 className={s.title}>{w.title}</h3>
                  <p className={s.body}>{w.body}</p>
                  <span className={s.cta}>{w.cta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NewsletterBand locale={locale} />
    </>
  );
}
