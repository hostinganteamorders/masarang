import Link from "next/link";
import { requireUser } from "@/cms/auth";
import { getLog, pending } from "@/cms/content";
import { misconfigured, remote, blobReady } from "@/cms/store";
import { PublishPanel } from "./PublishPanel";

export const metadata = { title: "Beranda admin" };
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await requireUser();
  const [p, log] = await Promise.all([pending(), getLog()]);
  const total = p.text + p.values + p.photos + p.lists;
  return (
    <>
      <h1>Beranda admin</h1>
      {misconfigured && (
        <p className="note bad">
          Penyimpanan (Redis) belum dipasang di Vercel, jadi perubahan tidak bisa disimpan. Lihat panduan di README bagian
          &quot;Admin&quot;.
        </p>
      )}
      {!misconfigured && !remote && (
        <p className="note warn small">Mode lokal: data disimpan di folder .cms-data dan foto di public/uploads.</p>
      )}
      {remote && !blobReady && (
        <p className="note warn small">Vercel Blob belum dipasang, jadi unggah foto belum bisa dipakai.</p>
      )}

      <section className="card" aria-labelledby="pub">
        <h2 id="pub" style={{ marginTop: 0 }}>
          Terbitkan perubahan
        </h2>
        {total === 0 ? (
          <p className="muted">Tidak ada perubahan yang belum terbit.</p>
        ) : (
          <p>
            Belum terbit: <strong>{p.text}</strong> teks, <strong>{p.photos}</strong> foto, <strong>{p.values}</strong> nilai
            (video, tautan, pengaturan), <strong>{p.lists}</strong> daftar data.
          </p>
        )}
        <PublishPanel disabled={misconfigured} />
        <p className="muted small" style={{ marginTop: "0.75rem" }}>
          Perubahan disimpan sebagai draf lebih dulu. Situs publik baru berubah setelah kamu menekan Terbitkan; situs lalu
          dibangun ulang dan tayang sekitar 1–2 menit kemudian.
        </p>
      </section>

      <h2>Yang bisa diubah</h2>
      <div className="grid">
        <Link className="card" href="/admin/text">
          <strong>Teks</strong>
          <br />
          <span className="muted small">Narasi, judul, dan tombol dalam Inggris dan Indonesia.</span>
        </Link>
        <Link className="card" href="/admin/photos">
          <strong>Foto</strong>
          <br />
          <span className="muted small">Unggah foto pengganti dan atur galeri.</span>
        </Link>
        <Link className="card" href="/admin/media">
          <strong>Video &amp; tautan</strong>
          <br />
          <span className="muted small">Video Aping, situs TMS, katalog EduTour.</span>
        </Link>
        <Link className="card" href="/admin/data">
          <strong>Data</strong>
          <br />
          <span className="muted small">Laporan, mitra, tim, angka utama, satwa.</span>
        </Link>
      </div>

      <h2>Riwayat terakhir</h2>
      {log.length === 0 ? (
        <p className="muted">Belum ada.</p>
      ) : (
        <table>
          <tbody>
            {log.slice(0, 12).map((e) => (
              <tr key={e.t + e.what}>
                <td className="small muted" style={{ whiteSpace: "nowrap" }}>
                  {new Date(e.t).toLocaleString("id-ID", { timeZone: "Asia/Makassar" })}
                </td>
                <td className="small">{e.who}</td>
                <td>{e.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
