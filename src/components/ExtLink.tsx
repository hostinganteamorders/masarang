import { common } from "@/content/common";
import type { ExternalLink } from "@/data/media";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";

/**
 * Tautan ke situs luar yang alamatnya bisa belum ada. Dengan `url`: tautan biasa (tab baru).
 * Tanpa `url`: selama draf tampil tombol tak aktif berlabel "Tautan menyusul"; setelah draf selesai tidak tampil.
 */
export function ExtLink({
  link,
  locale,
  className = "btn",
}: {
  link: ExternalLink;
  locale: Locale;
  className?: string;
}) {
  if (link.url) {
    return (
      <a href={link.url} className={className} target="_blank" rel="noopener noreferrer">
        {link.label[locale]}
        <span className="sr-only"> ({common[locale].externalNote})</span>
      </a>
    );
  }
  if (!site.draft) return null;
  return (
    <span className={`${className} btn--ghost ph`} data-pending="">
      {link.label[locale]} ({common[locale].soon.toLowerCase()})
    </span>
  );
}
