import Link from "next/link";
import { requireUser } from "@/cms/auth";
import { getDraft } from "@/cms/content";
import { TEXT_SCOPES } from "@/cms/scopes";

export const metadata = { title: "Teks" };
export const dynamic = "force-dynamic";

export default async function TextIndex() {
  await requireUser();
  const draft = await getDraft();
  return (
    <>
      <h1>Teks</h1>
      <p className="muted">Pilih halaman. Setiap teks punya kolom Inggris dan Indonesia.</p>
      <div className="grid">
        {TEXT_SCOPES.map((s) => {
          const n = Object.keys(draft.text).filter((k) => k.startsWith(`${s.id}.`)).length;
          return (
            <Link key={s.id} className="card" href={`/admin/text/${s.id}`}>
              <strong>{s.label}</strong>
              <br />
              {n > 0 && <span className="badge">{n} diubah</span>}
            </Link>
          );
        })}
      </div>
    </>
  );
}
