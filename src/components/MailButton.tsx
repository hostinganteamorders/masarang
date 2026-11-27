import { site } from "@/data/site";
import { mailto } from "@/lib/mailto";
import type { MailKey } from "@/content/mail";
import type { Locale } from "@/lib/i18n";

/**
 * Tombol email dengan pesan siap pakai, plus alamat email sebagai teks biasa di sampingnya
 * (tidak semua pengunjung punya aplikasi email yang terhubung ke tautan mailto).
 */
export function MailButton({
  locale,
  mail,
  children,
  ghost = false,
  swap,
}: {
  locale: Locale;
  mail: MailKey;
  children: React.ReactNode;
  ghost?: boolean;
  swap?: Record<string, string>;
}) {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem 1rem" }}>
      <a href={mailto(locale, mail, swap)} className={ghost ? "btn btn--ghost" : "btn"}>
        {children}
      </a>
      <span style={{ fontSize: "0.95rem" }}>{site.email.v}</span>
    </span>
  );
}
