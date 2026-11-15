import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/cms/auth";
import { collection, defaultList, fieldsFor } from "@/cms/collections";
import { getDraft } from "@/cms/content";
import type { ListView } from "../../data-types";
import { ListEditor } from "./ListEditor";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const c = collection((await params).name);
  return { title: c?.title ?? "Data" };
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  await requireUser();
  const c = collection((await params).name);
  if (!c) notFound();
  const draft = await getDraft();
  const saved = draft.lists[c.listName];
  const view: ListView = { id: c.id, title: c.title, titleKey: c.titleKey, addLabel: c.addLabel, maxItems: c.maxItems, subKey: c.subKey, fields: fieldsFor(c, draft.lists), blank: c.blank() };
  return (
    <>
      <p className="small">
        <Link href="/admin/data">← Data</Link>
      </p>
      <h1>{c.title}</h1>
      <p className="muted">{c.intro}</p>
      <ListEditor view={view} initial={(Array.isArray(saved) ? saved : defaultList(c)) as Record<string, unknown>[]} overridden={Array.isArray(saved)} />
    </>
  );
}
