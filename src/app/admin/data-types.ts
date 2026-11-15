import type { FieldDef } from "@/cms/collections";

/** Bagian definisi daftar yang dikirim ke browser. */
export type ListView = {
  id: string;
  title: string;
  titleKey: string;
  addLabel: string;
  subKey?: string;
  maxItems: number;
  fields: FieldDef[];
  blank: Record<string, unknown>;
};
