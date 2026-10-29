import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { GiveBand } from "@/components/GiveBand";
import { Milestones } from "@/components/Milestones";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { RegisterDots } from "@/components/RegisterDots";
import { RescuedChart } from "@/components/RescuedChart";
import { SectionHead } from "@/components/SectionHead";
import { Split } from "@/components/Split";
import { StatRow } from "@/components/StatRow";
import { UpdateItem } from "@/components/UpdateItem";
import { adoptCopy } from "@/content/adopt";
import { common } from "@/content/common";
import { home } from "@/content/home";
import { programsCopy } from "@/content/programs";
import { sites } from "@/content/sites";
import { supportCopy } from "@/content/support";
import { register } from "@/data/animals";
import { sponsorFrom } from "@/data/organisation";
import { photos } from "@/data/photos";
import { tasikoki } from "@/data/programs";
import { site } from "@/data/site";
import { updates } from "@/data/updates";
import { fill, fullDate, idrAuto, num } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { fillNode } from "@/lib/node";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programs/tasikoki">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs/tasikoki", programsCopy[locale].tasikoki.meta);
}

export default async function TasikokiPage({ params }: PageProps<"/[locale]/programs/tasikoki">) {
  const locale = await resolveLocale(params);
  const t = programsCopy[locale].tasikoki;
  const st = sites[locale].tasikoki;
  const c = common[locale];
  const a = adoptCopy[locale];
  const items = updates.filter((u) => u.site === "tasikoki");

  return (
    <>
      <PageHero
        locale={locale}
        accent="conservation"
        image={photos.heroes.tasikoki}
        crumbs={[{ text: c.nav.programs, href: localePath(locale, "/programs") }, { text: st.name }]}
        meta={[st.place, st.fullName]}
        title={st.name}
        lede={st.summary}
      />

      {/* Angka pusat penyelamatan */}
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
              { label: st.stats.inCare, value: num(tasikoki.inCare.v, locale), ph: tasikoki.inCare.ph },
              { label: st.stats.released, value: num(tasikoki.released.v, locale), ph: tasikoki.released.ph },
              { label: st.stats.students, value: num(tasikoki.students.v, locale), ph: tasikoki.students.ph },
              {
                label: st.stats.waste,
                note: st.stats.wasteNote,
                value: tasikoki.wasteHouseholds.v,
                ph: tasikoki.wasteHouseholds.ph,
              },
            ]}
          />
        </div>
      </section>

      {/* Diselamatkan dan dilepasliarkan per tahun */}
      <section className="section on-light" aria-labelledby="chart-title">
        <div className="container">
          <SectionHead id="chart-title" title={t.chart.title} lede={t.chart.lede} />
          <RescuedChart locale={locale} />
        </div>
      </section>

      {/* Register satwa */}
      <section className="section on-dark" aria-labelledby="register-title">
        <div className="container">
          <SectionHead
            id="register-title"
            meta={[a.hero.source, a.hero.unit]}
            title={t.register.title}
            lede={t.register.lede}
          />
          <RegisterDots locale={locale} copy={a} tone="dark" compact />
          <p className="meta" style={{ marginTop: "1.75rem", fontWeight: 700, color: "var(--fg)" }}>
            <span>{fill(a.explorer.counts.inCare, { n: num(register.inCare, locale) })}</span>
            <span>{fill(a.explorer.counts.sponsored, { n: num(register.sponsored, locale) })}</span>
            <span>{fill(a.explorer.counts.waiting, { n: num(register.waiting, locale) })}</span>
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/adopt")} className="btn">
              {t.register.cta}
            </Link>
          </p>
        </div>
      </section>

      {/* Edukasi dan posisi pekerjaan */}
      <section className="section on-soft" aria-labelledby="education-title">
        <div className="container">
          <Split
            ratio="5-6"
            left={
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <h2 id="education-title" className="title-md">
                  {t.education.title}
                </h2>
                <p className="lede">
                  {fillNode(t.education.body, {
                    students: <Ph on={tasikoki.students.ph}>{num(tasikoki.students.v, locale)}</Ph>,
                  })}
                </p>
              </div>
            }
            right={
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <h2 className="title-md">{sites[locale].milestonesTitle}</h2>
                <Milestones items={tasikoki.milestones} locale={locale} />
              </div>
            }
          />
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
        href={localePath(locale, "/adopt")}
        cta={t.give.cta}
      />

      <NewsletterBand locale={locale} />
    </>
  );
}
