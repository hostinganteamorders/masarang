import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Ph";
import { SectionHead } from "@/components/SectionHead";
import { Steps } from "@/components/Steps";
import { common } from "@/content/common";
import { merchCopy } from "@/content/merch";
import { merch } from "@/data/merch";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { fill, idrAuto } from "@/lib/format";
import { localePath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import s from "./merch.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/support/merchandise">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata(locale, "/support/merchandise", merchCopy[locale].meta);
}

export default async function MerchandisePage({ params }: PageProps<"/[locale]/support/merchandise">) {
  const locale = await resolveLocale(params);
  const t = merchCopy[locale];
  const waDigits = site.whatsapp.v.replace(/\D/g, "");
  const anyExample = merch.some((m) => m.ph);

  return (
    <>
      <PageHero
        locale={locale}
        accent="education"
        seed={21}
        title={t.hero.title}
        lede={t.hero.lede}
        image={photos.heroes.about}
        crumbs={[{ text: common[locale].nav.involvedSupport, href: localePath(locale, "/support") }, { text: t.meta.title }]}
      />


      <section className="section on-light" aria-labelledby="list-title">
        <div className="container">
          <SectionHead id="list-title" title={t.list.title} lede={anyExample ? t.list.example : undefined} />
          {merch.length === 0 ? (
            <p>{t.list.empty}</p>
          ) : (
            <ul className={s.grid}>
              {merch.map((m) => (
                <li key={m.id} className={s.card}>
                  <div className={s.photo}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.title[locale]} fill sizes="(max-width: 40rem) 90vw, 22rem" />
                    ) : (
                      <span className={s.noPhoto}>{t.list.noPhoto}</span>
                    )}
                  </div>
                  <h3 className={s.title}>{m.title[locale]}</h3>
                  <p className={s.body}>{m.body[locale]}</p>
                  <p className={`num ${s.price}`}>
                    <Ph on={m.ph}>{idrAuto(m.price, locale)}</Ph>
                  </p>
                  <a
                    className="btn btn--small"
                    href={`https://wa.me/${waDigits}?text=${encodeURIComponent(fill(t.list.orderMessage, { name: m.title[locale] }))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {fill(t.list.order, { name: m.title[locale] })}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section on-soft" aria-labelledby="how-title">
        <div className="container">
          <SectionHead id="how-title" title={t.how.title} />
          <Steps steps={t.how.steps} />
          <p style={{ marginTop: "2.25rem" }}>
            <strong>{t.donate.title}</strong>{" "}
            <Link href={localePath(locale, "/support")} className="btn btn--ghost">
              {t.donate.cta}
            </Link>
          </p>
        </div>
      </section>

      <NewsletterBand locale={locale} />
    </>
  );
}
