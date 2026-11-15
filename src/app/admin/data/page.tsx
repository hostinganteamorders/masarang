import Link from "next/link";
import { requireUser } from "@/cms/auth";
import { COLLECTIONS } from "@/cms/collections";
import { getDraft } from "@/cms/content";

export const metadata = { title: "Data" };
export const dynamic = "force-dynamic";

export default async function Page() {
  await requireUser();
  const draft = await getDraft();
  return (
    <>
      <h1>Data</h1>
      <p className="muted">Daftar yang bisa ditambah, dihapus, diurutkan, dan diubah isinya.</p>
      <div className="grid">
        <Link className="card" href="/admin/figures">
          <strong>Angka program</strong>
          <br />
          <span className="muted small">Hektare, petani, pohon, satwa, siswa, dan angka utama Beranda.</span>
        </Link>
        {COLLECTIONS.map((c) => (
          <Link key={c.id} className="card" href={`/admin/data/${c.id}`}>
            <strong>{c.title}</strong> {c.listName in draft.lists && <span className="badge">diubah</span>}
            <br />
            <span className="muted small">{c.intro}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
