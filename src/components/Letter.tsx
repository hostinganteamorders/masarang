import { Ph } from "./Ph";
import s from "./Letter.module.css";

/**
 * Surat singkat dari ketua. Teks diset besar agar terbaca seperti kutipan.
 * Selama isi masih contoh (`ph`), garis bawah titik-titik menandainya.
 */
export function Letter({
  title,
  body,
  ph,
  name,
  role,
  namePh,
}: {
  title: string;
  body: string;
  ph?: boolean;
  name: string;
  role: string;
  namePh?: boolean;
}) {
  return (
    <section className={`${s.band} on-restoration`} aria-labelledby="letter-title">
      <div className={`container ${s.inner}`}>
        <h2 id="letter-title" className="title-md">
          {title}
        </h2>
        <figure className={s.figure}>
          <blockquote className={s.quote}>
            <p>
              <Ph on={ph}>{body}</Ph>
            </p>
          </blockquote>
          <figcaption className={s.caption}>
            <span className={`num ${s.name}`}>
              <Ph on={namePh}>{name}</Ph>
            </span>
            <span>{role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
