import { menuVideos, type MenuVideoId } from "@/data/media";
import type { Locale } from "@/lib/i18n";
import { VideoSlot } from "./VideoSlot";

/** Video pembuka sebuah menu di navbar, tepat di bawah judul halaman. */
export function MenuIntro({ locale, id }: { locale: Locale; id: MenuVideoId }) {
  const v = menuVideos[id];
  return (
    <section className="section on-dark" aria-label={v.title[locale]} style={{ paddingBlock: "clamp(2rem, 4vw, 3.5rem)" }}>
      <div className="container">
        <div style={{ maxWidth: "60rem", marginInline: "auto" }}>
          <VideoSlot url={v.url} title={v.title[locale]} locale={locale} intro />
        </div>
      </div>
    </section>
  );
}
