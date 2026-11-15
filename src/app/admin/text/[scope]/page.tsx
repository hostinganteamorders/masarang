import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/cms/auth";
import { getDraft } from "@/cms/content";
import { defaultsFor, scopeById } from "@/cms/scopes";
import { flatten } from "@/cms/walk";
import { TextForm, type Field } from "./TextForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ scope: string }> }) {
  const { scope } = await params;
  return { title: scopeById(scope)?.label ?? "Teks" };
}

export default async function TextScopePage({ params }: { params: Promise<{ scope: string }> }) {
  await requireUser();
  const { scope } = await params;
  const meta = scopeById(scope);
  const base = defaultsFor(scope);
  if (!meta || !base) notFound();
  const draft = await getDraft();

  const en = flatten(base.en);
  const id = new Map(flatten(base.id).map((l) => [l.path, l.value]));
  const fields: Field[] = en.map(({ path, value }) => ({
    path,
    en: { original: value, value: draft.text[`${scope}.en.${path}`] ?? value },
    id: { original: id.get(path) ?? "", value: draft.text[`${scope}.id.${path}`] ?? id.get(path) ?? "" },
  }));

  return (
    <>
      <p className="small">
        <Link href="/admin/text">← Semua halaman</Link>
      </p>
      <h1>{meta.label}</h1>
      <p className="muted">
        Ubah teks lalu tekan <strong>Simpan draf</strong>. Kolom hijau = sudah berbeda dari teks awal; tombol &quot;Kembalikan&quot;
        mengembalikan ke teks awal. Teks seperti <code>{"{q}"}</code> adalah isian otomatis: jangan dihapus atau diubah.
        Tanda <code>**tebal**</code> membuat huruf tebal.
        {meta.page !== undefined && (
          <>
            {" "}
            <a href={`/en${meta.page}`} target="_blank" rel="noreferrer">
              Lihat halamannya
            </a>{" "}
            (menampilkan versi yang sudah terbit).
          </>
        )}
      </p>
      <TextForm scope={scope} fields={fields} />
    </>
  );
}
