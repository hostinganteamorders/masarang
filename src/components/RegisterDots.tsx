import type { AdoptCopy } from "@/content/adopt";
import {
  animals,
  speciesById,
  stageOrder,
  type Animal,
  type Stage,
} from "@/data/animals";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import s from "./RegisterDots.module.css";

export type RegisterProps = {
  locale: Locale;
  copy: AdoptCopy;
  /** Latar gelap memakai warna kelompok yang lebih terang. */
  tone?: "light" | "dark";
  /** Bila diisi, titik menjadi tombol. */
  onSelect?: (id: string, open: boolean) => void;
  selectedId?: string;
  /** Titik yang tidak cocok dengan saringan diredupkan. */
  matches?: (animal: Animal) => boolean;
  /** Tahap yang ditampilkan (bawaan: semua). */
  stages?: Stage[];
  compact?: boolean;
};

export function RegisterDots({
  locale,
  copy,
  tone = "light",
  onSelect,
  selectedId,
  matches,
  stages = stageOrder,
  compact = false,
}: RegisterProps) {
  const interactive = Boolean(onSelect);
  const visible = animals.filter((a) => stages.includes(a.stage));
  const ordered = stages.flatMap((st) => visible.filter((a) => a.stage === st));

  const label = (a: Animal) => {
    const sp = speciesById[a.speciesId];
    const sponsor =
      a.stage === "released"
        ? copy.explorer.releasedWord
        : a.sponsored
          ? copy.explorer.sponsoredWord
          : copy.explorer.waitingWord;
    return fill(copy.explorer.dotLabel, {
      name: a.name,
      species: sp.name[locale],
      stage: copy.explorer.stages[a.stage].name,
      sponsor,
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (!onSelect) return;
    const pool = ordered.filter((a) => !matches || matches(a) || a.id === id);
    const index = pool.findIndex((a) => a.id === id);
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(pool.length - 1, index + 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = pool.length - 1;
    else return;
    event.preventDefault();
    const target = pool[next];
    if (!target) return;
    onSelect(target.id, false);
    requestAnimationFrame(() => document.getElementById(`dot-${target.id}`)?.focus());
  };

  return (
    <div
      className={`${s.register} ${tone === "dark" ? s.dark : s.light} ${compact ? s.compact : ""}`}
      role={interactive ? "group" : undefined}
      aria-label={interactive ? copy.explorer.registerLabel : undefined}
      aria-hidden={interactive ? undefined : true}
      style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}
    >
      {stages.map((stage) => {
        const inStage = visible.filter((a) => a.stage === stage);
        const info = copy.explorer.stages[stage];
        return (
          <section key={stage} className={s.column}>
            <header className={s.head}>
              <span className={s.stageName}>{info.name}</span>
              <span className={`num ${s.count}`}>{inStage.length}</span>
            </header>
            {!compact && <p className={s.note}>{info.note}</p>}
            <ul className={s.dots}>
              {inStage.map((a) => {
                const sp = speciesById[a.speciesId];
                const filled = a.stage === "released" || a.sponsored;
                const dim = matches ? !matches(a) : false;
                const selected = selectedId === a.id;
                const common = {
                  className: s.dot,
                  "data-group": sp.group,
                  "data-filled": filled,
                  "data-released": a.stage === "released",
                  "data-dim": dim,
                  "data-selected": selected,
                };
                return (
                  <li key={a.id}>
                    {interactive ? (
                      <button
                        type="button"
                        id={`dot-${a.id}`}
                        {...common}
                        aria-label={label(a)}
                        aria-pressed={selected}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => onSelect?.(a.id, true)}
                        onKeyDown={(event) => onKeyDown(event, a.id)}
                      />
                    ) : (
                      <span {...common} />
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
