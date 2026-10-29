import type { Metadata } from "next";
import Link from "next/link";
import { GivingCards } from "@/components/GivingCards";
import { HillsideSlider } from "@/components/HillsideSlider";
import { MoneyRibbon } from "@/components/MoneyRibbon";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PartnersRow } from "@/components/PartnersRow";
import { RegisterDots } from "@/components/RegisterDots";
import { SectionHead } from "@/components/SectionHead";
import { SiteCard } from "@/components/SiteCard";
import { UpdateItem } from "@/components/UpdateItem";
import { Hero } from "@/components/home/Hero";
import { adoptCopy } from "@/content/adopt";
import { common } from "@/content/common";
import { hillsideCopy } from "@/content/hillside";
import { home } from "@/content/home";
import { register } from "@/data/animals";
import { finance } from "@/data/finance";
import { site } from "@/data/site";
import { updates } from "@/data/updates";
import { fill, fullDate, num } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = home[locale].meta;
  return pageMetadata(locale, "", { ...t, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const t = home[locale];
  const c = common[locale];
  const a = adoptCopy[locale];
  const h = hillsideCopy[locale];
  const date = fullDate(site.lastUpdated, locale);

  return (
    <>
      <Hero locale={locale} />

      {/* Ke mana dana mengalir */}
      <section className="section on-light" aria-labelledby="money-title">
        <div className="container">
          <SectionHead
            id="money-title"
            meta={[
              fill(c.labels.period, { year: finance.year }),
              fill(c.labels.source, { source: finance.source[locale] }),
            ]}
            title={t.money.title}
            lede={t.money.lede}
          />
          <MoneyRibbon locale={locale} />
          <p style={{ marginTop: "2rem" }}>
            <Link href={localePath(locale, "/transparency")} className="btn">
              {t.money.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Dua lokasi */}
      <section className="section on-dark" aria-labelledby="sites-title">
        <div className="container">
          <SectionHead
            id="sites-title"
            meta={[
              fill(c.labels.source, { source: t.sites.source }),
              fill(c.labels.updated, { date }),
            ]}
            title={t.sites.title}
            lede={t.sites.lede}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))",
              gap: "clamp(1rem, 2.5vw, 1.75rem)",
            }}
          >
            <SiteCard locale={locale} id="temboan" />
            <SiteCard locale={locale} id="tasikoki" />
          </div>
        </div>
      </section>

      {/* Geser untuk melihat lereng pulih */}
      <section className="section on-soft" aria-labelledby="hillside-title">
        <div className="container">
          <SectionHead
            id="hillside-title"
            meta={[h.meta, h.source]}
            title={h.title}
            lede={h.body}
          />
          <HillsideSlider locale={locale} />
        </div>
      </section>

      {/* Satwa dalam perawatan */}
      <section className="section on-dark" aria-labelledby="adopt-title">
        <div className="container">
          <SectionHead
            id="adopt-title"
            meta={[a.hero.source, a.hero.unit]}
            title={t.adopt.title}
            lede={t.adopt.lede}
          />
          <RegisterDots locale={locale} copy={a} tone="dark" compact />
          <p className="meta" style={{ marginTop: "1.75rem", fontWeight: 700, color: "var(--fg)" }}>
            <span>{fill(a.explorer.counts.inCare, { n: num(register.inCare, locale) })}</span>
            <span>{fill(a.explorer.counts.sponsored, { n: num(register.sponsored, locale) })}</span>
            <span>{fill(a.explorer.counts.waiting, { n: num(register.waiting, locale) })}</span>
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/adopt")} className="btn">
              {t.adopt.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Kabar lapangan */}
      <section className="section on-light" aria-labelledby="updates-title">
        <div className="container">
          <SectionHead id="updates-title" title={t.updates.title} lede={t.updates.lede} />
          <div>
            {updates.slice(0, 3).map((item) => (
              <UpdateItem key={item.id} item={item} locale={locale} />
            ))}
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/updates")} className="btn btn--ghost">
              {t.updates.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Mitra */}
      <section className="section on-soft" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead id="partners-title" title={t.partners.title} />
          <PartnersRow locale={locale} />
        </div>
      </section>

      {/* Dukung kerja yang spesifik */}
      <section className="section on-restoration" aria-labelledby="support-title">
        <div className="container">
          <SectionHead id="support-title" title={t.support.title} lede={t.support.lede} />
          <GivingCards locale={locale} />
          <p style={{ marginTop: "2rem" }}>
            <Link href={localePath(locale, "/support")} className="btn">
              {t.support.cta}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
