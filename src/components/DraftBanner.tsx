import { common } from "@/content/common";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function DraftBanner({ locale }: { locale: Locale }) {
  if (!site.draft) return null;
  return (
    <div
      role="note"
      style={{
        background: "var(--soft-deep)",
        color: "var(--dark)",
        padding: "0.55rem var(--gutter)",
        textAlign: "center",
        fontSize: "0.9rem",
        lineHeight: 1.4,
      }}
    >
      {common[locale].draftBanner}
    </div>
  );
}
