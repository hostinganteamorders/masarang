import { requireUser } from "@/cms/auth";
import { getDraft } from "@/cms/content";
import { toViews, VALUE_GROUPS } from "@/cms/value-fields";
import { ValuesForm } from "../ValuesForm";

export const metadata = { title: "Video & tautan" };
export const dynamic = "force-dynamic";

export default async function Page() {
  await requireUser();
  const draft = await getDraft();
  const group = VALUE_GROUPS.find((g) => g.id === "media")!;
  return (
    <>
      <h1>{group.title}</h1>
      {group.intro && <p className="muted">{group.intro}</p>}
      <ValuesForm
        groupId={group.id}
        fields={toViews(group, draft.values)}
      />
    </>
  );
}
