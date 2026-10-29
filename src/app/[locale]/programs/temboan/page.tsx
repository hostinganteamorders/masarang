import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { GiveBand } from "@/components/GiveBand";
import { HillsideSlider } from "@/components/HillsideSlider";
import { Milestones } from "@/components/Milestones";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { StatRow } from "@/components/StatRow";
import { UpdateItem } from "@/components/UpdateItem";
import { VillageBars } from "@/components/VillageBars";
import { common } from "@/content/common";
import { hillsideCopy } from "@/content/hillside";
import { home } from "@/content/home";
import { programsCopy } from "@/content/programs";
import { sites } from "@/content/sites";
import { photos } from "@/data/photos";
import { giving } from "@/data/organisation";
import { temboan } from "@/data/programs";
import { site } from "@/data/site";
import { updates } from "@/data/updates";
import { fill, fullDate, monthYear, num, pct } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programs/temboan">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs/temboan", programsCopy[locale].temboan.meta);
}

export default async function TemboanPage({ params }: PageProps<"/[locale]/programs/temboan">) {
  const locale = await resolveLocale(params);
  const t = programsCopy[locale].temboan;
  const st = sites[locale].temboan;
  const c = common[locale];
  const h = hillsideCopy[locale];
  const month = monthYear(temboan.coconut.mapped, locale);
  const hectare = giving.find((g) => g.id === "hectare");
  const items = updates.filter((u) => u.site === "temboan");

  return (
    <>
      <PageHero
        locale={locale}
        accent="restoration"
        image={photos.heroes.temboan}
        crumbs={[{ text: c.nav.programs, href: localePath(locale, "/programs") }, { text: st.name }]}
        meta={[st.place]}
        title={st.name}
        lede={st.summary}
      />

      {/* Angka lokasi */}
      <section className="section on-dark" aria-labelledby="stats-title">
        <div className="container">
          <SectionHead
            id="stats-title"
            meta={[
              fill(c.labels.asOf, { date: fullDate(site.lastUpdated, locale) }),
              fill(c.labels.source, { source: home[locale].sites.source }),
            ]}
            title={t.stats.title}
          />
          <StatRow
            stats={[
              { label: st.stats.area, value: num(temboan.areaHa.v, locale), unit: c.labels.ha, ph: temboan.areaHa.ph },
              { label: st.stats.planted, value: num(temboan.treesPlanted.v, locale), ph: temboan.treesPlanted.ph },
              { label: st.stats.survival, value: pct(temboan.survival.v, locale), ph: temboan.survival.ph },
              { label: st.stats.active, value: num(temboan.activeHa.v, locale), unit: c.labels.ha, ph: temboan.activeHa.ph },
            ]}
          />
        </div>
      </section>

      {/* Lereng pulih */}
      <section className="section on-soft" aria-labelledby="hillside-title">
        <div className="container">
          <SectionHead id="hillside-title" meta={[h.meta, h.source]} title={h.title} lede={h.body} />
          <HillsideSlider locale={locale} />
        </div>
      </section>

      {/* Kelapa dan pendapatan lokasi */}
      <section className="section on-light" aria-labelledby="coconut-title">
        <div className="container">
          <Split
            ratio="1-1"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="coconut-title" className="title-md">
                  {t.coconut.title}
                </h2>
                <p className="lede">
                  {fill(t.coconut.lede, { total: num(temboan.coconut.total, locale), month })}
                </p>
                <VillageBars
                  villages={temboan.coconut.villages}
                  total={temboan.coconut.total}
                  title={t.coconut.chart}
                  totalLabel={t.coconut.total}
                  source={fill(t.coconut.source, { month })}
                  locale={locale}
                />
              </div>
            }
            right={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 className="title-md">{t.income.title}</h2>
                <div className="prose" style={{ fontSize: "1.15rem" }}>
                  {t.income.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <p>
                  <Link href={localePath(locale, "/transparency")} className="btn btn--ghost">
                    {t.income.cta}
                  </Link>
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Posisi pekerjaan */}
      <section className="section on-dark" aria-labelledby="milestones-title">
        <div className="container">
          <SectionHead id="milestones-title" title={sites[locale].milestonesTitle} />
          <Milestones items={temboan.milestones} locale={locale} />
        </div>
      </section>

      {/* Galeri */}
      <section className="section on-soft" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead id="gallery-title" title={t.gallery.title} />
          <Gallery items={photos.temboan} locale={locale} labelledBy="gallery-title" />
        </div>
      </section>

      {/* Kabar terbaru dari lokasi */}
      <section className="section on-light" aria-labelledby="updates-title">
        <div className="container">
          <SectionHead id="updates-title" title={t.updates.title} />
          <div>
            {items.map((item) => (
              <UpdateItem key={item.id} item={item} locale={locale} />
            ))}
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/updates")} className="btn btn--ghost">
              {t.updates.all}
            </Link>
          </p>
        </div>
      </section>

      {hectare && (
        <GiveBand
          locale={locale}
          amount={hectare.amount}
          ph={hectare.ph}
          title={hectare.title[locale]}
          body={hectare.body[locale]}
          href={localePath(locale, "/support")}
          cta={t.give.cta}
        />
      )}

      <NewsletterBand locale={locale} />
    </>
  );
}
