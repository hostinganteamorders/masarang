import Image from "next/image";
import Link from "next/link";
import { Ph } from "@/components/Ph";
import { ZoomButton } from "@/components/ZoomPhoto";
import type { AdoptCopy } from "@/content/adopt";
import { catOrder, wildCats, wildTotals, type WildCat } from "@/data/wildlife";
import { fill, num, pct } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { mailto } from "@/lib/mailto";
import s from "./Wildlife.module.css";

function Card({ cat, locale, copy }: { cat: WildCat; locale: Locale; copy: AdoptCopy }) {
  const t = copy.card;
  const name = copy.cats[cat.cat].name;
  const rest = Math.max(0, cat.inCare - cat.quarantine);
  const qShare = cat.inCare > 0 ? (cat.quarantine / cat.inCare) * 100 : 0;
  const share = wildTotals.inCare > 0 ? (cat.inCare / wildTotals.inCare) * 100 : 0;
  const a = cat.ambassador;
  const pick = `${a.species} (${name})`;
  const mail = mailto(locale, "adopt", { "[animal or category]": pick, "[nama satwa atau kategori]": pick });

  const flows: [string, number][] = [
    [t.entered, cat.entered],
    [t.born, cat.born],
    [t.died, cat.died],
    [t.released, cat.released],
    [t.translocated, cat.translocated],
  ];

  return (
    <article className={s.card} data-cat={cat.cat} aria-labelledby={`cat-${cat.cat}`}>
      <header className={s.head}>
        <h3 id={`cat-${cat.cat}`}>{name}</h3>
        <p>{copy.cats[cat.cat].blurb}</p>
      </header>

      <div>
        <p className={s.big}>
          <span className={`num ${s.bigNum}`} data-count>
            {num(cat.inCare, locale)}
          </span>
          <span className={s.bigLabel}>{t.inCare}</span>
        </p>
        <p className={s.share}>{fill(t.share, { pct: pct(share, locale) })}</p>
      </div>

      <div className={s.stages} role="group" aria-label={t.stagesLabel}>
        <div className={s.stagesBar} aria-hidden="true">
          <span style={{ width: `${qShare}%` }} />
        </div>
        <ul className={s.legend}>
          <li>
            <span className={s.sw} aria-hidden="true" />
            {t.quarantine}:{" "}
            <strong>
              <Ph on={cat.quarantinePh}>{num(cat.quarantine, locale)}</Ph>
            </strong>
          </li>
          <li>
            <span className={s.sw} data-rest="" aria-hidden="true" />
            {t.elsewhere}:{" "}
            <strong>
              <Ph on={cat.quarantinePh}>{num(rest, locale)}</Ph>
            </strong>
          </li>
        </ul>
      </div>

      <div>
        <p className={s.flowsTitle}>{t.flows}</p>
        <dl className={s.flows} style={{ marginTop: "0.5rem" }}>
          {flows.map(([label, v]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd className="num" data-count>
                {num(v, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section className={s.amb} aria-label={t.ambassador}>
        <figure className={s.ambPhoto}>
          {a.photo ? (
            <>
              <Image src={a.photo} alt="" fill sizes="(max-width: 34rem) 90vw, 150px" />
              <ZoomButton
                locale={locale}
                className={s.ambZoom}
                pic={{ key: `amb-${cat.cat}`, src: a.photo, w: 1200, h: 1600, color: "#888888", alt: { en: a.species, id: a.species } }}
              />
            </>
          ) : (
            <span className={s.noPhoto}>{t.noPhoto}</span>
          )}
        </figure>
        <div className={s.ambBody}>
          <p className={s.ambTag}>{t.ambassador}</p>
          <p className={s.ambName}>
            <Ph on={a.ph}>{a.species}</Ph>
          </p>
          <p className={s.ambLatin}>{a.latin}</p>
          <p className={s.ambStory}>{a.story[locale]}</p>
          <a className={`btn small ${s.ambCta}`} href={mail}>
            {fill(t.cta, { name: a.species })}
          </a>
          <p className={s.ambNote}>
            {a.ph ? `${t.ambassadorExample}. ` : ""}
            {fill(t.ctaNote, { category: name.toLowerCase() })}
          </p>
        </div>
      </section>
    </article>
  );
}

/** Empat kartu kategori: jumlah dirawat, karantina, arus satwa sejak 2018, dan satwa duta dengan ajakan mendukung. */
export function CategoryCards({ locale, copy }: { locale: Locale; copy: AdoptCopy }) {
  const byId = new Map(wildCats.map((c) => [c.cat, c]));
  return (
    <div className={`${s.cats} ${s.grid}`}>
      {catOrder
        .map((id) => byId.get(id))
        .filter((c): c is WildCat => Boolean(c))
        .map((c) => (
          <Card key={c.id} cat={c} locale={locale} copy={copy} />
        ))}
    </div>
  );
}

/** Empat angka ringkas (jumlah per kategori) untuk halaman Konservasi; tiap kotak menaut ke kartu lengkapnya. */
export function CategoryTiles({ locale, copy, href }: { locale: Locale; copy: AdoptCopy; href: string }) {
  const byId = new Map(wildCats.map((c) => [c.cat, c]));
  return (
    <ul className={`${s.cats} ${s.tiles}`}>
      {catOrder.map((id) => {
        const c = byId.get(id);
        if (!c) return null;
        return (
          <li key={id} className={s.tile} data-cat={id}>
            <Link href={href}>
              <span className={`num ${s.tileNum}`} data-count>
                {num(c.inCare, locale)}
              </span>
              <span className={s.tileName}>{copy.cats[id].name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
