import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { LinkCards } from "@/components/LinkCards";
import { PartnersRow } from "@/components/PartnersRow";
import { Ph } from "@/components/Ph";
import { ReportCard } from "@/components/ReportCard";
import { SectionHead } from "@/components/SectionHead";
import { StatRow, type StatItem } from "@/components/StatRow";
import { Hero } from "@/components/home/Hero";
import { common } from "@/content/common";
import { home } from "@/content/home";
import { adoptCopy } from "@/content/adopt";
import { finance, moneyOut } from "@/data/finance";
import { forestProtection, homeImpact, keyFigures, tasikoki } from "@/data/programs";
import { updates } from "@/data/updates";
import { latestReport } from "@/data/reports";
import { site } from "@/data/site";
import { catOrder, wildCats, wildFlows, wildTotals } from "@/data/wildlife";
import { fill, fullDate, monthYear, num, pct } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import h from "./home.module.css";

const PROGRAM_COLOR: Record<string, string> = {
  restoration: "var(--restoration)",
  conservation: "var(--conservation)",
  education: "var(--education)",
};

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = home[locale].meta;
  return pageMetadata(locale, "", { ...t, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const t = home[locale];
  const c = common[locale];
  const pl = t.pillars;
  const flowEntered = wildFlows.reduce((n, f) => n + f.entered, 0);
  const flowReleased = wildFlows.reduce((n, f) => n + f.released + f.translocated, 0);
  const kf = keyFigures;
  const hi = homeImpact;

  const restorationStats: StatItem[] = [
    { label: pl.restoration.labels.temboan, value: `${num(kf.restoredTemboanHa.v, locale)}+`, unit: c.labels.ha, ph: kf.restoredTemboanHa.ph },
    { label: pl.restoration.labels.other, value: `${num(kf.restoredOtherHa.v, locale)}+`, unit: c.labels.ha, ph: kf.restoredOtherHa.ph },
    { label: pl.restoration.labels.trees, value: num(kf.treesPlanted.v, locale), ph: kf.treesPlanted.ph },
    { label: pl.restoration.labels.species, value: hi.treeSpecies.v, ph: hi.treeSpecies.ph },
    { label: pl.restoration.labels.farmers, value: num(kf.farmers.v, locale), ph: kf.farmers.ph },
    { label: pl.restoration.labels.income, value: `+${pct(kf.incomeIncreasePct.v, locale)}`, ph: kf.incomeIncreasePct.ph },
  ];
  const conservationStats: StatItem[] = [
    { label: pl.conservation.labels.rescued, note: pl.window, value: num(flowEntered, locale) },
    { label: pl.conservation.labels.species, value: num(hi.speciesRescued.v, locale), ph: hi.speciesRescued.ph },
    { label: pl.conservation.labels.released, value: num(flowReleased, locale) },
    { label: pl.conservation.labels.forest, value: forestProtection.ha.v, unit: c.labels.ha, ph: forestProtection.ha.ph },
    { label: pl.conservation.labels.nests, note: pl.window, value: hi.turtleNests.v, ph: hi.turtleNests.ph },
    { label: pl.conservation.labels.hatchlings, value: hi.hatchlings.v, ph: hi.hatchlings.ph },
  ];
  const educationStats: StatItem[] = [
    { label: pl.education.labels.reached, value: num(hi.peopleReached.v, locale), ph: hi.peopleReached.ph },
    { label: pl.education.labels.students, value: num(hi.studentsVisited.v, locale), ph: hi.studentsVisited.ph },
    { label: pl.education.labels.volunteers, value: hi.volunteers.v, ph: hi.volunteers.ph },
    { label: pl.education.labels.artists, value: num(hi.artists.v, locale), ph: hi.artists.ph },
    { label: pl.education.labels.communities, value: num(hi.communities.v, locale), ph: hi.communities.ph },
    { label: pl.education.labels.msmes, value: num(hi.msmes.v, locale), ph: hi.msmes.ph },
  ];
  const pillars = [
    { id: "restoration", color: "var(--restoration)", stats: restorationStats, ...pl.restoration },
    { id: "conservation", color: "var(--conservation)", stats: conservationStats, ...pl.conservation },
    { id: "education", color: "var(--education)", stats: educationStats, ...pl.education },
  ] as const;
  const newest = updates.slice(0, 3);

  return (
    <>
      <Hero locale={locale} />

      {/* Perjalanan manusia dan alam */}
      <section className="section on-light" aria-labelledby="journey-title">
        <div className="container">
          <div className={h.journey}>
            <h2 id="journey-title" className="title-md">
              {t.journey.title}
            </h2>
            <div className="prose">
              <p style={{ fontSize: "1.2rem" }}>{t.journey.body}</p>
              <p>
                <Link href={localePath(locale, "/about/story")} className="btn btn--ghost">
                  {t.journey.cta}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiga pilar dan dampaknya */}
      <section className="section on-soft" aria-labelledby="pillars-title">
        <div className="container">
          <SectionHead id="pillars-title" meta={[pl.meta]} title={pl.title} />
          <ul className={h.pillars}>
            {pillars.map((p) => (
              <li key={p.id} className={h.pillar} style={{ ["--c" as string]: p.color }}>
                <p className={h.place}>{p.place}</p>
                <h3 className={h.pillarName}>{p.name}</h3>
                <p className={h.lede}>{p.lede}</p>
                <StatRow size="md" stats={p.stats} />
                <p>
                  <Link href={localePath(locale, `/programs/${p.id}`)} className="btn btn--ghost">
                    {p.cta}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <p className="small" style={{ marginTop: "1.5rem", color: "var(--muted)" }}>
            {pl.source}
          </p>
        </div>
      </section>

      {/* Dampak kami: semua angka, bisa diunduh */}
      <section className="section on-soft" aria-labelledby="impact-title">
        <div className="container">
          <SectionHead
            id="impact-title"
            meta={[fill(c.labels.updated, { date: fullDate(site.lastUpdated, locale) })]}
            title={t.impact.title}
            lede={t.impact.lede}
          />
          <p style={{ marginBottom: "2.5rem" }}>
            <a href={`${localePath(locale)}/impact.xlsx`} className="btn" download>
              {t.impact.download}
            </a>
            <span className="small" style={{ marginLeft: "1rem", color: "var(--muted)" }}>
              {t.impact.downloadNote}
            </span>
          </p>

          <h3 style={{ marginBottom: "1rem", fontSize: "1.6rem" }}>{t.impact.restoration}</h3>
          <StatRow
            size="md"
            stats={[
              { label: t.figures.labels.conservation, value: num(keyFigures.conservationHa.v, locale), unit: c.labels.ha, ph: keyFigures.conservationHa.ph },
              { label: t.figures.labels.restoredTemboan, value: num(keyFigures.restoredTemboanHa.v, locale), unit: c.labels.ha, ph: keyFigures.restoredTemboanHa.ph },
              { label: t.figures.labels.farmers, value: num(keyFigures.farmers.v, locale), ph: keyFigures.farmers.ph },
              { label: t.figures.labels.income, value: pct(keyFigures.incomeIncreasePct.v, locale), ph: keyFigures.incomeIncreasePct.ph },
              { label: t.impact.labels.trees, value: num(keyFigures.treesPlanted.v, locale), ph: keyFigures.treesPlanted.ph },
              { label: t.impact.labels.survival, value: pct(keyFigures.survival.v, locale), ph: keyFigures.survival.ph },
            ]}
          />

          <h3 style={{ margin: "3rem 0 1rem", fontSize: "1.6rem" }}>{t.impact.conservation}</h3>
          <StatRow
            size="md"
            stats={[
              { label: t.impact.labels.inCare, value: num(wildTotals.inCare, locale) },
              ...catOrder.map((cat) => ({
                label: adoptCopy[locale].cats[cat].name,
                value: num(wildCats.find((w) => w.cat === cat)?.inCare ?? 0, locale),
              })),
              { label: t.impact.labels.released, value: num(wildTotals.released, locale) },
              { label: t.impact.labels.entered, value: num(wildTotals.entered, locale) },
            ]}
          />
          <p style={{ marginTop: "1.25rem" }}>
            <Link href={localePath(locale, "/programs/conservation/adopt")} className="btn btn--ghost">
              {t.impact.labels.more}
            </Link>
          </p>

          <h3 style={{ margin: "3rem 0 1rem", fontSize: "1.6rem" }}>{t.impact.education}</h3>
          <StatRow size="md" stats={[{ label: t.impact.labels.students, value: num(tasikoki.students.v, locale), ph: tasikoki.students.ph }]} />

          <h3 style={{ margin: "3rem 0 1rem", fontSize: "1.6rem" }}>{t.impact.finance}</h3>
          <StatRow
            size="md"
            stats={moneyOut.map((f) => ({ label: f.label[locale], value: pct(f.share, locale), ph: finance.ph }))}
          />
          <p className="small" style={{ marginTop: "0.75rem", color: "var(--muted)" }}>
            {fill(c.labels.period, { year: finance.year })}
          </p>
        </div>
      </section>

      {/* Lokasi kami */}
      <section className="section on-light" aria-labelledby="sites-title">
        <div className="container">
          <SectionHead id="sites-title" title={t.sites.title} lede={t.sites.lede} />
          <LinkCards
            items={t.sites.list.map((st) => ({
              id: st.id,
              title: st.name,
              body: (
                <>
                  {st.programName}
                  <br />
                  {t.sites.statusLabel}: <Ph on={st.ph}>{st.status}</Ph>
                </>
              ),
              href: localePath(locale, `/programs/${st.program}`),
              color: PROGRAM_COLOR[st.program],
              cta: t.pillars[st.program as "restoration" | "conservation" | "education"].cta,
            }))}
          />
          <p style={{ marginTop: "1.5rem" }}>
            <Link href={localePath(locale, "/about/sites")} className="btn btn--ghost">
              {t.sites.all}
            </Link>
          </p>
        </div>
      </section>

      {/* Kabar terbaru dari lapangan */}
      <section className="section on-soft" aria-labelledby="field-title">
        <div className="container">
          <SectionHead id="field-title" title={t.field.title} lede={t.field.lede} />
          <div className={h.field}>
            <div>
              <ReportCard report={latestReport} locale={locale} featured />
              <p style={{ marginTop: "1.25rem" }}>
                <Link href={localePath(locale, "/updates")} className="btn btn--ghost">
                  {t.field.all}
                </Link>
              </p>
            </div>
            <div>
              <h3 className={h.storiesTitle}>{t.field.stories}</h3>
              <ul className={h.stories}>
                {newest.map((u) => (
                  <li key={u.id} className={h.story}>
                    <p className={h.storyMeta}>
                      {monthYear(u.date, locale)} · {c.sites[u.site]}
                    </p>
                    <h4 className={h.storyTitle}>
                      <Link href={localePath(locale, "/updates")}>
                        <Ph on={u.ph}>{u.title[locale]}</Ph>
                      </Link>
                    </h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mitra */}
      <section className="section on-light" aria-labelledby="partners-title">
        <div className="container">
          <SectionHead id="partners-title" title={t.partners.title} lede={t.partners.lede} />
          <PartnersRow locale={locale} flat />
          <p style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href={localePath(locale, "/about/partners")} className="btn btn--ghost">
              {t.partners.all}
            </Link>
            <Link href={localePath(locale, "/get-involved/partner")} className="btn">
              {t.partners.become}
            </Link>
          </p>
        </div>
      </section>

      {/* Ikuti perjalanan kami */}
      <section className="section on-soft" aria-labelledby="follow-title">
        <div className="container">
          <SectionHead id="follow-title" title={t.follow.title} lede={t.follow.lede} />
          <p className="small" style={{ color: "var(--muted)", marginBottom: "1rem" }}>
            <Ph on>{t.follow.posts}</Ph>
          </p>
          <p>
            <a href={site.social.instagram} className="btn" target="_blank" rel="noopener noreferrer">
              {t.follow.instagram} {site.social.instagramHandle}
              <span className="sr-only"> ({c.externalNote})</span>
            </a>
          </p>
        </div>
      </section>

      {/* Dukung pekerjaan kami */}
      <section className="section on-light" aria-labelledby="support-title">
        <div className="container">
          <SectionHead id="support-title" title={t.support.title} lede={t.support.lede} />
          <LinkCards
            items={[
              { id: "donate", ...t.support.cards.donate, href: localePath(locale, "/support") },
              { id: "adopt", ...t.support.cards.adopt, href: localePath(locale, "/programs/conservation/adopt") },
              { id: "merch", ...t.support.cards.merch, href: localePath(locale, "/support/merchandise") },
              { id: "join", ...t.support.cards.join, href: localePath(locale, "/get-involved") },
            ]}
          />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
