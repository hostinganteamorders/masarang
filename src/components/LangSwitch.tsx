"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales, swapLocale, type Locale } from "@/lib/i18n";
import s from "./LangSwitch.module.css";

const NAMES: Record<Locale, string> = { en: "English", id: "Bahasa Indonesia" };

/**
 * Pengalih bahasa. Dengan `compact`, di layar sempit hanya bahasa lain yang ditampilkan,
 * supaya bilah atas tidak melebar; versi lengkap tetap ada di dalam menu.
 */
export function LangSwitch({
  locale,
  label,
  compact = false,
}: {
  locale: Locale;
  label: string;
  compact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className={`${s.lang} ${compact ? s.compact : ""}`} role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          hrefLang={l}
          lang={l}
          aria-label={NAMES[l]}
          aria-current={l === locale ? "true" : undefined}
          className={s.item}
          onClick={() => {
            // Ingat pilihan bahasa agar kunjungan berikutnya langsung ke bahasa ini.
            document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
