import type { Metadata } from "next";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { ReportCard } from "@/components/ReportCard";
import { SectionHead } from "@/components/SectionHead";
import { UpdatesList } from "@/components/UpdatesList";
import { common } from "@/content/common";
import { updatesCopy } from "@/content/updates";
import { reports } from "@/data/reports";
import { site } from "@/data/site";
import { fill, fullDate } from "@/lib/format";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/updates">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/updates", updatesCopy[locale].meta);
}

export default async function UpdatesPage({ params }: PageProps<"/[locale]/updates">) {
  const locale = await resolveLocale(params);
  const t = updatesCopy[locale];
  const c = common[locale];

  return (
    <>
      <PageHero
        locale={locale}
        seed={13}
        meta={[fill(c.labels.updated, { date: fullDate(site.lastUpdated, locale) })]}
        title={t.hero.title}
        lede={t.hero.lede}
      />

      <section className="section on-light" aria-labelledby="reports-title">
        <div className="container">
          <SectionHead id="reports-title" title={t.reports.title} lede={t.reports.lede} />
          <ReportCard report={reports[0]} locale={locale} featured />
          {reports.length > 1 && (
            <>
              <h3 className="title-md" style={{ fontSize: "clamp(1.8rem, 1.3rem + 1.6vw, 2.6rem)", margin: "3rem 0 1.25rem" }}>
                {t.reports.earlier}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
                  gap: "clamp(1rem, 2.5vw, 1.75rem)",
                }}
              >
                {reports.slice(1).map((r) => (
                  <ReportCard key={r.id} report={r} locale={locale} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section on-soft" aria-labelledby="notes-title">
        <div className="container">
          <SectionHead id="notes-title" title={t.notes.title} lede={t.notes.lede} />
          <UpdatesList locale={locale} />
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
