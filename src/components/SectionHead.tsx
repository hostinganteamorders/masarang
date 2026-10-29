import type { ReactNode } from "react";

/** Kepala bagian: judul besar di kiri, kalimat pengantar di kanan, dan baris sumber/tanggal di atasnya. */
export function SectionHead({
  id,
  title,
  lede,
  meta,
  as: Tag = "h2",
}: {
  id?: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: string[];
  as?: "h1" | "h2";
}) {
  return (
    <header className="sectionHead">
      <div>
        {meta && meta.length > 0 && (
          <p className="meta">
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        )}
        <Tag id={id}>{title}</Tag>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}
