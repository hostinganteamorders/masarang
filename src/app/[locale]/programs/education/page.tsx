import type { Metadata } from "next";
import Link from "next/link";
import { ActivityList, type Activity } from "@/components/ActivityList";
import { ExtLink } from "@/components/ExtLink";
import { Gallery } from "@/components/Gallery";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { ProgramTabs } from "@/components/ProgramTabs";
import { SectionHead } from "@/components/SectionHead";
import { StatRow } from "@/components/StatRow";
import { common } from "@/content/common";
import { programsCopy } from "@/content/programs";
import { edutourCatalog } from "@/data/media";
import { photos } from "@/data/photos";
import { tasikoki } from "@/data/programs";
import { num } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programs/education">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/programs/education", programsCopy[locale].education.meta);
}

export default async function EducationPage({ params }: PageProps<"/[locale]/programs/education">) {
  const locale = await resolveLocale(params);
  const t = programsCopy[locale].education;
  const c = common[locale];
  const it = t.items;

  const subStyle = { display: "grid", gap: "1.25rem", marginTop: "0.5rem" } as const;

  const activities: Activity[] = [
    { id: "tumbuh", title: it.tumbuh.title, body: it.tumbuh.body, ph: true, photo: photos.educationItems.tumbuh },
    { id: "lokawaya", title: it.lokawaya.title, body: it.lokawaya.body, ph: true, photo: photos.educationItems.lokawaya },
    { id: "sapa", title: it.sapa.title, body: it.sapa.body, ph: true },
    {
      id: "residency",
      title: it.residency.title,
      body: it.residency.body,
      ph: true,
      children: (
        <div style={subStyle}>
          <div>
            <h4 className="num" style={{ fontSize: "1.5rem" }}>
              {it.residency.edutour.title}
            </h4>
            <p style={{ color: "var(--muted)" }}>{it.residency.edutour.body}</p>
            <p style={{ marginTop: "0.75rem" }}>
              <ExtLink link={edutourCatalog} locale={locale} className="btn btn--ghost" />
            </p>
          </div>
          <div>
            <h4 className="num" style={{ fontSize: "1.5rem" }}>
              {it.residency.storylab.title}
            </h4>
            <p style={{ color: "var(--muted)" }}>{it.residency.storylab.body}</p>
          </div>
        </div>
      ),
    },
    {
      id: "outreach",
      title: it.outreach.title,
      body: it.outreach.body,
      children: (
        <StatRow
          size="md"
          stats={[
            { label: it.outreach.students, value: num(tasikoki.students.v, locale), ph: tasikoki.students.ph },
            { label: it.outreach.waste, note: it.outreach.wasteNote, value: tasikoki.wasteHouseholds.v, ph: tasikoki.wasteHouseholds.ph },
          ]}
        />
      ),
    },
    { id: "volunteering", title: it.volunteering.title, body: it.volunteering.body, ph: true },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        accent="education"
        image={photos.heroes.education}
        crumbs={[{ text: c.nav.programs, href: localePath(locale, "/programs") }, { text: t.meta.title }]}
        title={t.hero.title}
        lede={t.hero.lede}
      >
        <ProgramTabs locale={locale} current="education" />
      </PageHero>

      <section className="section on-light" aria-labelledby="list-title">
        <div className="container">
          <SectionHead id="list-title" title={t.listTitle} />
          <ActivityList items={activities} locale={locale} />
        </div>
      </section>

      <section className="section on-soft" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHead id="gallery-title" title={t.gallery.title} />
          <Gallery items={photos.education} locale={locale} labelledBy="gallery-title" />
        </div>
      </section>

      <section className="section on-dark" aria-label={t.give.cta}>
        <div className="container">
          <p>
            <Link href={localePath(locale, "/support")} className="btn">
              {t.give.cta}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
