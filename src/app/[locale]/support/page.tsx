import type { Metadata } from "next";
import Link from "next/link";
import { BankCard } from "@/components/BankCard";
import { GiveBand } from "@/components/GiveBand";
import { GivingCards } from "@/components/GivingCards";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { Pillars } from "@/components/Pillars";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { supportCopy } from "@/content/support";
import { sponsorFrom } from "@/data/organisation";
import { site } from "@/data/site";
import { idrAuto } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { fillNode } from "@/lib/node";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/support">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/support", supportCopy[locale].meta);
}

const mail = (subject: string, body?: string) =>
  `mailto:${site.email.v}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export default async function SupportPage({ params }: PageProps<"/[locale]/support">) {
  const locale = await resolveLocale(params);
  const t = supportCopy[locale];
  const colors = ["var(--restoration)", "var(--conservation)", "var(--education)"];

  return (
    <>
      <PageHero
        locale={locale}
        accent="education"
        seed={15}
        title={t.hero.title}
        lede={t.hero.lede}
      />

      {/* Pilih tujuan donasi */}
      <section className="section on-light" aria-labelledby="ways-title">
        <div className="container">
          <SectionHead id="ways-title" title={t.ways.title} />
          <GivingCards locale={locale} />
        </div>
      </section>

      {/* Sponsor satwa */}
      <GiveBand
        locale={locale}
        tone="forest"
        amount={sponsorFrom.v}
        ph={sponsorFrom.ph}
        title={t.sponsor.title}
        body={fillNode(t.sponsor.body, {
          amount: <Ph on={sponsorFrom.ph}>{idrAuto(sponsorFrom.v, locale)}</Ph>,
        })}
        href={localePath(locale, "/adopt")}
        cta={t.sponsor.cta}
      />

      {/* Transfer bank */}
      <section className="section on-soft" id="bank" aria-labelledby="bank-title">
        <div className="container">
          <Split
            ratio="6-5"
            left={
              <div style={{ display: "grid", gap: "1.5rem", alignContent: "start" }}>
                <h2 id="bank-title" className="title-md">
                  {t.bank.title}
                </h2>
                <p className="lede">{t.bank.lede}</p>
                <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem", justifyItems: "start" }}>
                  <h3>{t.bank.tell.title}</h3>
                  <p style={{ maxWidth: "30rem", color: "var(--muted)" }}>{t.bank.tell.body}</p>
                  <a href={mail(t.bank.tell.subject, t.bank.tell.message)} className="btn btn--ghost">
                    {t.bank.tell.cta}
                  </a>
                </div>
              </div>
            }
            right={<BankCard locale={locale} />}
          />
        </div>
      </section>

      {/* Yang Anda terima kembali */}
      <section className="section on-light" aria-labelledby="back-title">
        <div className="container">
          <SectionHead id="back-title" title={t.back.title} />
          <Pillars
            items={t.back.items.map((item, i) => ({
              id: item.title,
              title: item.title,
              body: item.body,
              color: colors[i % colors.length],
            }))}
          />
          <p style={{ marginTop: "2.25rem" }}>
            <Link href={localePath(locale, "/transparency")} className="btn btn--ghost">
              {t.back.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Perusahaan dan pemberi hibah */}
      <section className="section on-dark" aria-labelledby="partners-title">
        <div className="container">
          <Split
            ratio="1-1"
            align="center"
            left={
              <h2 id="partners-title" className="title-md">
                {t.partners.title}
              </h2>
            }
            right={
              <div style={{ display: "grid", gap: "1.25rem", justifyItems: "start" }}>
                <p className="lede">{t.partners.body}</p>
                <a href={mail(t.partners.subject)} className="btn">
                  {t.partners.cta}
                </a>
              </div>
            }
          />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
