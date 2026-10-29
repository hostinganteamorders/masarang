import { supportCopy } from "@/content/support";
import { site } from "@/data/site";
import { fill } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { CopyAccount } from "./CopyAccount";
import { Ph } from "./Ph";
import s from "./BankCard.module.css";

/** Rincian rekening untuk transfer bank, dengan tombol salin. Data di `site.bank`. */
export function BankCard({ locale }: { locale: Locale }) {
  const t = supportCopy[locale].bank;
  const b = site.bank;
  const rows = [
    { label: t.fields.bank, field: b.bank },
    { label: t.fields.number, field: b.number },
    { label: t.fields.holder, field: b.holder },
  ];
  const text = fill(t.copyText, { bank: b.bank.v, number: b.number.v, holder: b.holder.v });

  return (
    <div className={s.card}>
      <dl className={s.rows}>
        {rows.map((r) => (
          <div key={r.label} className={s.row}>
            <dt>{r.label}</dt>
            <dd className={`num ${s.value}`}>
              <Ph on={r.field.ph}>{r.field.v}</Ph>
            </dd>
          </div>
        ))}
      </dl>
      <CopyAccount text={text} label={t.copy} done={t.copied} failed={t.copyFailed} />
    </div>
  );
}
