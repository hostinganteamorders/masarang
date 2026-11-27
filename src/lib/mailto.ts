import { mailCopy, type MailKey } from "@/content/mail";
import { site } from "@/data/site";
import type { Locale } from "./i18n";

/** Tautan mailto dengan subjek dan isi sudah terisi. `swap` mengganti teks [berkurung] tertentu (mis. nama satwa). */
export function mailto(locale: Locale, key: MailKey, swap: Record<string, string> = {}): string {
  const t = mailCopy[locale][key];
  let { subject, body } = t;
  for (const [from, to] of Object.entries(swap)) {
    subject = subject.split(from).join(to);
    body = body.split(from).join(to);
  }
  return `mailto:${site.email.v}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
