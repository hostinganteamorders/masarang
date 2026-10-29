import type { AdoptCopy } from "@/content/adopt";
import { speciesById, type Animal, type Stage } from "@/data/animals";
import { site } from "@/data/site";
import { sponsorFrom } from "@/data/organisation";
import { fill, idr, idrAuto, monthYear } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./AnimalCard.module.css";

const TRACK: Stage[] = ["quarantine", "rehab", "prerelease", "released"];

export function AnimalCard({
  animal,
  locale,
  copy,
  headingId,
}: {
  animal: Animal;
  locale: Locale;
  copy: AdoptCopy;
  headingId: string;
}) {
  const d = copy.detail;
  const sp = speciesById[animal.speciesId];
  const stage = animal.stage;
  const current = stage === "lifetime" ? -1 : TRACK.indexOf(stage);
  const state =
    stage === "released" ? "released" : animal.sponsored ? "sponsored" : "waiting";
  const statusText =
    state === "released" ? d.released : state === "sponsored" ? d.sponsored : d.waiting;

  const mail = `mailto:${site.email.v}?subject=${encodeURIComponent(
    fill(d.mailSubject, { name: animal.name, id: animal.id }),
  )}&body=${encodeURIComponent(fill(d.mailBody, { name: animal.name, id: animal.id }))}`;

  return (
    <article className={s.card} data-group={sp.group} aria-labelledby={headingId}>
      <div className={s.top}>
        <span className={s.dot} aria-hidden="true" data-filled={state !== "waiting"} />
        <span className={s.status} data-state={state}>
          {statusText}
        </span>
      </div>

      <h3 id={headingId} className={s.name}>
        {animal.name}
      </h3>
      <p className={s.species}>
        {sp.name[locale]} <i className={s.latin}>{sp.latin}</i>
      </p>
      <p className={s.iucn}>
        <span className={s.iucnCode} data-level={sp.iucn}>
          {sp.iucn}
        </span>
        {d.iucn[sp.iucn]}
      </p>

      <div className={s.trackBlock}>
        <p className={s.trackTitle}>{d.track}</p>
        {stage === "lifetime" ? (
          <p className={s.lifetime}>{d.lifetime}</p>
        ) : (
          <ol className={s.track}>
            {TRACK.map((st, i) => (
              <li
                key={st}
                data-state={i < current ? "done" : i === current ? "current" : "todo"}
                aria-current={i === current ? "step" : undefined}
              >
                <span className={s.pip} aria-hidden="true" />
                {copy.explorer.stages[st].name}
              </li>
            ))}
          </ol>
        )}
      </div>

      <dl className={s.facts}>
        <div>
          <dt>{d.register}</dt>
          <dd className="tnum">{animal.id}</dd>
        </div>
        <div>
          <dt>{d.now}</dt>
          <dd>{copy.explorer.stages[stage].name}</dd>
        </div>
        <div>
          <dt>{d.since}</dt>
          <dd>{monthYear(animal.since, locale)}</dd>
        </div>
        {animal.releasedOn && (
          <div>
            <dt>{d.released}</dt>
            <dd>{monthYear(animal.releasedOn, locale)}</dd>
          </div>
        )}
        <div>
          <dt>{d.arrived}</dt>
          <dd>{d.arrival[animal.arrival]}</dd>
        </div>
        <div>
          <dt>{d.care}</dt>
          <dd className="tnum">{idrAuto(sp.carePerMonth, locale)}</dd>
        </div>
      </dl>

      {state === "waiting" && (
        <div className={s.cta}>
          <a className="btn" href={mail}>
            {fill(d.adopt, { name: animal.name })}
          </a>
          <p className={s.price}>
            <Ph on={sponsorFrom.ph}>
              {fill(d.price, { amount: idr(sponsorFrom.v, locale) })}
            </Ph>
          </p>
        </div>
      )}
    </article>
  );
}
