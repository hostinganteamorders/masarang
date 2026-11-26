import { hasLocale, locales } from "@/lib/i18n";
import { impactWorkbook } from "@/lib/impact-workbook";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Unduhan Excel berisi semua angka "Our impact" (Beranda). */
export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) return new Response("Not found", { status: 404 });
  const body = impactWorkbook(locale);
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="masarang-impact-${locale}.xlsx"`,
    },
  });
}
