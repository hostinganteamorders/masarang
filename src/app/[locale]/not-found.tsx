"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { common } from "@/content/common";
import { defaultLocale, hasLocale, localePath } from "@/lib/i18n";

export default function NotFound() {
  const segment = usePathname().split("/")[1] ?? "";
  const locale = hasLocale(segment) ? segment : defaultLocale;
  const c = common[locale].notFound;

  return (
    <section className="section on-light" style={{ minHeight: "60vh" }}>
      <div className="container" style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
        <h1>{c.title}</h1>
        <p className="lede">{c.body}</p>
        <Link href={localePath(locale)} className="btn">
          {c.button}
        </Link>
      </div>
    </section>
  );
}
