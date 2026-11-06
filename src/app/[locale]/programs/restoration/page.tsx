import type { Metadata } from "next";
import Link from "next/link";
import { ExtLink } from "@/components/ExtLink";
import { Gallery } from "@/components/Gallery";
import { GiveBand } from "@/components/GiveBand";
import { HillsideSlider } from "@/components/HillsideSlider";
import { Milestones } from "@/components/Milestones";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { Photo } from "@/components/Photo";
import { ProgramTabs } from "@/components/ProgramTabs";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { StatRow } from "@/components/StatRow";
import { UpdateItem } from "@/components/UpdateItem";
import { VillageBars } from "@/components/VillageBars";
import { common } from "@/content/common";
import { hillsideCopy } from "@/content/hillside";
import { programsCopy } from "@/content/programs";
import { sites } from "@/content/sites";
import { tms } from "@/data/media";
import { giving } from "@/data/organisation";
import { photos } from "@/data/photos";
import { restoration, temboan } from "@/data/programs";
import { site } from "@/data/site";
import { updates } from "@/data/updates";
import { fill, fullDate, monthYear, num, pct } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programs/restoration">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs/restoration", programsCopy[locale].restoration.meta);
}

export default async function RestorationPage({ params }: PageProps<"/[locale]/programs/restoration">) {
  const locale = await resolveLocale(params);
  const t = programsCopy[locale].restoration;
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
        crumbs={[{ text: c.nav.programs, href: localePath(locale, "/programs") }, { text: t.meta.title }]}
        title={t.hero.title}
        lede={t.hero.lede}
      >
        <ProgramTabs locale={locale} current="restoration" />
      </PageHero>

      {/* Temboan Restoration Project */}
      <section className="section on-light" aria-labelledby="project-title">
        <div className="container">
          <Split
            ratio="6-5"
            align="center"
            left={
              <div className="prose">
                <h2 id="project-title" className="title-md" style={{ marginBottom: "1.5rem" }}>
                  {t.project.title}
                </h2>
                {t.project.body.map((p) => (
                  <p key={p} style={{ fontSize: "1.15rem" }}>
                    {fill(p, { ha: num(restoration.conservationHa.v, locale) })}
                  </p>
                ))}
              </div>
            }
            right={
              <Photo pic={photos.restoration.project} locale={locale} ratio="4 / 3" sizes="(max-width: 52rem) 100vw, 40vw" />
            }
          />
        </div>
      </section>

      {/* Restorasi dalam angka */}
      <section className="section on-dark" aria-labelledby="stats-title">
        <div className="container">
          <SectionHead
            id="stats-title"
            meta={[
              fill(c.labels.asOf, { date: fullDate(site.lastUpdated, locale) }),
              fill(t.stats.years, { n: restoration.restoredYears }),
            ]}
            title={t.stats.title}
          />
          <StatRow
            stats={[
              { label: t.stats.area, value: num(restoration.conservationHa.v, locale), unit: c.labels.ha, ph: restoration.conservationHa.ph },
              { label: t.stats.temboan, value: num(restoration.restoredTemboanHa.v, locale), unit: c.labels.ha, ph: restoration.restoredTemboanHa.ph },
              {
                label: t.stats.other,
                value: `${num(restoration.restoredKayuwatuMahembangHa.v, locale)}+`,
                unit: c.labels.ha,
                ph: restoration.restoredKayuwatuMahembangHa.ph,
              },
            ]}
          />
        </div>
      </section>

      {/* Farmers Empowered */}
      <section className="section on-restoration" aria-labelledby="farmers-title">
        <div className="container">
          <Split
            ratio="6-5"
            align="center"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="farmers-title" className="title-md">
                  {t.farmers.title}
                </h2>
                <p className="lede" style={{ color: "inherit" }}>
                  <Ph on>{t.farmers.body}</Ph>
                </p>
                <StatRow
                  size="md"
                  stats={[
                    { label: t.farmers.count, value: num(restoration.farmers.v, locale), ph: restoration.farmers.ph },
                    { label: t.farmers.income, value: pct(restoration.incomeIncreasePct.v, locale), ph: restoration.incomeIncreasePct.ph },
                  ]}
                />
                <p style={{ fontSize: "0.95rem" }}>
                  <Ph on>{t.farmers.note}</Ph>
                </p>
                <p>
                  <ExtLink link={tms} locale={locale} />
                </p>
              </div>
            }
            right={
              <Photo pic={photos.restoration.farmers} locale={locale} ratio="4 / 5" sizes="(max-width: 52rem) 100vw, 40vw" />
            }
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
