"use client";

import { useState } from "react";
import { common } from "@/content/common";
import { updatesCopy } from "@/content/updates";
import { updates, type UpdateSite } from "@/data/updates";
import { fill, num } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { UpdateItem } from "./UpdateItem";
import s from "./UpdatesList.module.css";

type Filter = "all" | UpdateSite;

/** Daftar kabar lapangan dengan saringan lokasi (Semua / Temboan / Tasikoki). */
export function UpdatesList({ locale }: { locale: Locale }) {
  const t = updatesCopy[locale];
  const c = common[locale];
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? updates : updates.filter((u) => u.site === filter);
  const options: { id: Filter; label: string }[] = [
    { id: "all", label: t.all },
    { id: "temboan", label: c.sites.temboan },
    { id: "tasikoki", label: c.sites.tasikoki },
  ];

  return (
    <div>
      <h2 className="sr-only">{t.list}</h2>
      <div className={s.bar}>
        <div className="chips" role="group" aria-label={t.filterLabel}>
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              className="chip"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className={s.count} role="status">
          {fill(t.count, { n: num(shown.length, locale) })}
        </p>
      </div>

      {shown.length > 0 ? (
        <div>
          {shown.map((item) => (
            <UpdateItem key={item.id} item={item} locale={locale} />
          ))}
        </div>
      ) : (
        <p className={s.empty}>{t.empty}</p>
      )}
    </div>
  );
}
