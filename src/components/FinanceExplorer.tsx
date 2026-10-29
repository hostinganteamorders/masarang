"use client";

import { useState } from "react";
import { transparencyCopy } from "@/content/transparency";
import { finance, moneyIn, moneyOut, type FlowItem } from "@/data/finance";
import { site } from "@/data/site";
import { fill, idrBillions, idrMillions, num, usdCompact } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { Ph } from "./Ph";
import s from "./FinanceExplorer.module.css";

type Currency = "idr" | "usd";

/** Segmen terang memakai teks gelap; segmen gelap memakai teks putih. */
const DARK_TEXT = new Set(["csr", "enterprise", "donors", "visits"]);

const sum = (items: FlowItem[]) => items.reduce((acc, item) => acc + item.millions, 0);

/**
 * Dana masuk dan dana keluar berdampingan, dengan tombol rupiah/dolar AS.
 * Dua batang berisi 100% yang sama; tidak ada garis aliran dari sumber ke penggunaan karena datanya tidak ada.
 */
export function FinanceExplorer({ locale }: { locale: Locale }) {
  const t = transparencyCopy[locale];
  const [currency, setCurrency] = useState<Currency>("idr");

  const amount = (millions: number) =>
    currency === "idr"
      ? idrMillions(millions, locale)
      : usdCompact(millions * 1e6, site.fx, locale);
  const total = (millions: number) =>
    currency === "idr"
      ? idrBillions(millions * 1e6, locale)
      : usdCompact(millions * 1e6, site.fx, locale);

  return (
    <div>
      <div className={s.toolbar}>
        <div className={s.switch}>
          <span id="currency-label" className={s.switchLabel}>
            {t.currency.label}
          </span>
          <div className="chips" role="group" aria-labelledby="currency-label">
            <button
              type="button"
              className="chip"
              aria-pressed={currency === "idr"}
              onClick={() => setCurrency("idr")}
            >
              {t.currency.idr}
            </button>
            <button
              type="button"
              className="chip"
              aria-pressed={currency === "usd"}
              onClick={() => setCurrency("usd")}
            >
              {t.currency.usd}
            </button>
          </div>
        </div>
        <p className={s.fx} hidden={currency !== "usd"}>
          {fill(t.currency.fxNote, { fx: num(site.fx, locale) })}
        </p>
      </div>

      <div className={s.columns}>
        <FlowColumn
          id="in"
          title={t.in.title}
          totalLabel={t.in.total}
          barLabel={t.in.barLabel}
          items={moneyIn}
          locale={locale}
          amount={amount}
          total={total}
        />
        <FlowColumn
          id="out"
          title={t.out.title}
          totalLabel={t.out.total}
          barLabel={t.out.barLabel}
          items={moneyOut}
          locale={locale}
          amount={amount}
          total={total}
          highlight="overhead"
        />
      </div>
    </div>
  );
}

function FlowColumn({
  id,
  title,
  totalLabel,
  barLabel,
  items,
  locale,
  amount,
  total,
  highlight,
}: {
  id: string;
  title: string;
  totalLabel: string;
  barLabel: string;
  items: FlowItem[];
  locale: Locale;
  amount: (millions: number) => string;
  total: (millions: number) => string;
  highlight?: string;
}) {
  return (
    <section className={s.col} aria-labelledby={`flow-${id}`}>
      <header className={s.colHead}>
        <h2 id={`flow-${id}`}>{title}</h2>
        <p className={s.total}>
          <span className={s.totalLabel}>{totalLabel}</span>
          <span className={`num ${s.totalValue}`}>
            <Ph on={finance.ph}>{total(sum(items))}</Ph>
          </span>
        </p>
      </header>

      <div className={s.bar} role="img" aria-label={barLabel}>
        {items.map((item) => (
          <span
            key={item.id}
            className={s.segment}
            data-dark={DARK_TEXT.has(item.id)}
            style={{ flex: `${item.share} 0 0`, background: item.color }}
          >
            {item.share >= 8 && (
              <span className={`num ${s.segmentValue}`}>
                <Ph on={finance.ph}>{item.share}%</Ph>
              </span>
            )}
          </span>
        ))}
      </div>

      <ul className={s.list}>
        {items.map((item) => (
          <li
            key={item.id}
            className={s.item}
            data-highlight={item.id === highlight}
            style={{ ["--c" as string]: item.color }}
          >
            <span className={s.swatch} aria-hidden="true" />
            <span className={s.name}>{item.label[locale]}</span>
            <span className={`num ${s.amount}`}>
              <Ph on={finance.ph}>{amount(item.millions)}</Ph>
            </span>
            <span className={`tnum ${s.share}`}>
              <Ph on={finance.ph}>{item.share}%</Ph>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
