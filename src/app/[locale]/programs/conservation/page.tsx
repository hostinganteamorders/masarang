import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTiles } from "@/components/CategoryCards";
import { Gallery } from "@/components/Gallery";
import { GiveBand } from "@/components/GiveBand";
import { Milestones } from "@/components/Milestones";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { Photo } from "@/components/Photo";
import { ProgramTabs } from "@/components/ProgramTabs";
import { RescuedChart } from "@/components/RescuedChart";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { StatRow } from "@/components/StatRow";
import { Steps } from "@/components/Steps";
import { UpdateItem } from "@/components/UpdateItem";
import { adoptCopy } from "@/content/adopt";
import { common } from "@/content/common";
import { programsCopy } from "@/content/programs";
import { supportCopy } from "@/content/support";
import { wildFlows, wildTotals, wildlifeAsOf } from "@/data/wildlife";
import { sponsorFrom } from "@/data/organisation";
import { photos } from "@/data/photos";
import { forestProtection, homeImpact, tasikoki } from "@/data/programs";
import { updates } from "@/data/updates";
import { fill, fullDate, idrAuto, monthYear, num } from "@/lib/format";
import { fillNode } from "@/lib/node";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programs/conservation">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs/conservation", programsCopy[locale].conservation.meta);
}

export default async function ConservationPage({ params }: PageProps<"/[locale]/programs/conservation">) {
  const locale = await resolveLocale(params);
  const t = programsCopy[locale].conservation;
  const c = common[locale];
  const a = adoptCopy[locale];
  const items = updates.filter((u) => u.site === "tasikoki");
  const turtle = tasikoki.milestones.filter((m) => m.id !== "waste");
  const flowEntered = wildFlows.reduce((n, f) => n + f.entered, 0);
  const flowReleased = wildFlows.reduce((n, f) => n + f.released + f.translocated, 0);

  return (
    <>
      <PageHero
        locale={locale}
        accent="conservation"
        image={photos.heroes.tasikoki}
        crumbs={[{ text: c.nav.programs, href: localePath(locale, "/programs") }, { text: t.meta.title }]}
        title={t.hero.title}
        lede={t.hero.lede}
      >
        <ProgramTabs locale={locale} current="conservation" />
      </PageHero>


      {/* Pengantar program */}
      <section className="section on-soft" aria-labelledby="intro-title">
        <div className="container">
          <div className="prose" style={{ maxWidth: "46rem" }}>
            <h2 id="intro-title" className="title-md" style={{ marginBottom: "1.5rem" }}>
              {t.intro.title}
            </h2>
            {t.intro.body.map((p) => (
              <p key={p} style={{ fontSize: "1.15rem" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Tasikoki: rehabilitasi, translokasi, pelepasliaran */}
      <section className="section on-light" aria-labelledby="tasikoki-title">
        <div className="container">
          <Split
            ratio="6-5"
            align="center"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="tasikoki-title" className="title-md">
                  {t.tasikoki.title}
                </h2>
                <p className="lede">{t.tasikoki.body}</p>
              </div>
            }
            right={
              <Photo pic={photos.conservation.tasikoki} locale={locale} ratio="4 / 3" sizes="(max-width: 52rem) 100vw, 40vw" />
            }
          />
          <div style={{ marginTop: "3rem" }}>
            <StatRow
              stats={[
                { label: t.tasikoki.inCare, value: num(wildTotals.inCare, locale) },
                { label: t.tasikoki.entered, value: num(flowEntered, locale) },
                { label: t.tasikoki.released, value: num(flowReleased, locale) },
              ]}
            />
            <p className="meta" style={{ marginTop: "1.25rem" }}>
              <span>{fill(c.labels.asOf, { date: monthYear(wildlifeAsOf, locale) })}</span>
              <span>{fill(c.labels.source, { source: t.chart.source })}</span>
            </p>
          </div>

          <div style={{ marginTop: "3.5rem" }}>
            <h3 className="title-md" style={{ marginBottom: "1.5rem", fontSize: "clamp(1.8rem, 1.3rem + 1.6vw, 2.6rem)" }}>
              {t.tasikoki.journeyTitle}
            </h3>
            <Steps steps={t.tasikoki.journey} />
          </div>

          <div className="prose" style={{ maxWidth: "46rem", marginTop: "3rem" }}>
            {t.tasikoki.after.map((p) => (
              <p key={p} style={{ fontSize: "1.1rem" }}>
                {p}
              </p>
            ))}
            <p style={{ fontSize: "1.1rem" }}>
              {fill(t.tasikoki.numbers, {
                entered: num(flowEntered, locale),
                species: num(homeImpact.speciesRescued.v, locale),
                released: num(flowReleased, locale),
                inCare: num(wildTotals.inCare, locale),
                date: monthYear(wildlifeAsOf, locale),
              })}
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              {t.tasikoki.adoptLead}{" "}
              <Link href={localePath(locale, "/programs/conservation/adopt")} className="btn btn--ghost">
                {t.tasikoki.adoptCta}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Diselamatkan dan dilepasliarkan per tahun */}
      <section className="section on-soft" aria-labelledby="chart-title">
        <div className="container">
          <SectionHead id="chart-title" title={t.chart.title} lede={t.chart.lede} />
          <RescuedChart locale={locale} />
        </div>
      </section>

      {/* Animals to adopt */}
      <section className="section on-dark" aria-labelledby="adopt-title">
        <div className="container">
          <SectionHead
            id="adopt-title"
            meta={[a.hero.source, fill(a.hero.unit, { date: monthYear(wildlifeAsOf, locale) })]}
            title={t.adopt.title}
            lede={t.adopt.lede}
          />
          <CategoryTiles locale={locale} copy={a} href={localePath(locale, "/programs/conservation/adopt")} />
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/programs/conservation/adopt")} className="btn">
              {t.adopt.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Sea Turtle Project */}
      <section className="section on-light" aria-labelledby="turtle-title">
        <div className="container">
          <Split
            ratio="5-6"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="turtle-title" className="title-md">
                  {t.turtle.title}
                </h2>
                {t.turtle.body.map((p) => (
                  <p key={p} className="lede">
                    {p}
                  </p>
                ))}
                <p>
                  <Ph on>{t.turtle.adopt}</Ph>
                </p>
              </div>
            }
            right={
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <h3 className="title-md" style={{ fontSize: "clamp(1.8rem, 1.3rem + 1.6vw, 2.6rem)" }}>
                  {t.turtle.status}
                </h3>
                <Milestones items={turtle} locale={locale} />
              </div>
            }
          />
        </div>
      </section>

      {/* Forest Protection */}
      <section className="section on-conservation" aria-labelledby="forest-title">
        <div className="container">
          <Split
            ratio="6-5"
            align="center"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="forest-title" className="title-md">
                  {t.forest.title}
                </h2>
                <p className="lede" style={{ color: "inherit" }}>
                  <Ph on>{t.forest.body}</Ph>
                </p>
              </div>
            }
            right={
              <StatRow
                stats={[
                  {
                    label: t.forest.stat,
                    value: forestProtection.ha.v,
                    unit: c.labels.ha,
                    ph: forestProtection.ha.ph,
                  },
                ]}
              />
            }
          />
        </div>
      </section>

      {/* Data keanekaragaman hayati */}
      <section className="section on-dark" aria-labelledby="biodiversity-title">
        <div className="container">
          <SectionHead id="biodiversity-title" title={t.biodiversity.title} lede={<Ph on>{t.biodiversity.body}</Ph>} />
        </div>
      </section>

      {/* Galeri */}
      <section className="section on-light" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead id="gallery-title" title={t.gallery.title} />
          <Gallery items={photos.tasikoki} locale={locale} labelledBy="gallery-title" />
        </div>
      </section>

      {/* Kabar terbaru dari lokasi */}
      <section className="section on-soft" aria-labelledby="updates-title">
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

      <GiveBand
        locale={locale}
        amount={sponsorFrom.v}
        ph={sponsorFrom.ph}
        title={supportCopy[locale].sponsor.title}
        body={fillNode(supportCopy[locale].sponsor.body, {
          amount: <Ph on={sponsorFrom.ph}>{idrAuto(sponsorFrom.v, locale)}</Ph>,
        })}
        href={localePath(locale, "/programs/conservation/adopt")}
        cta={t.give.cta}
      />

      <NewsletterBand locale={locale} />
    </>
  );
}
