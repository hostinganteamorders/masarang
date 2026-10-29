"use client";

import { useId, type FormEvent } from "react";
import type { Common } from "@/content/common";
import { fill } from "@/lib/format";
import s from "./Newsletter.module.css";

/**
 * Formulir berlangganan tanpa server: membuka aplikasi email dengan pesan siap kirim.
 * Untuk layanan buletin sungguhan (Mailchimp, Buttondown, dll.) ganti isi onSubmit
 * dengan permintaan ke layanan tersebut.
 */
export function NewsletterForm({
  copy,
  to,
}: {
  copy: Common["newsletter"];
  /** Alamat email tujuan. */
  to: string;
}) {
  const inputId = useId();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = String(new FormData(event.currentTarget).get("email") ?? "");
    const body = fill(copy.message, { email: address });
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <label htmlFor={inputId} className="sr-only">
        {copy.label}
      </label>
      <div className={s.row}>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={copy.placeholder}
          className={s.input}
        />
        <button type="submit" className="btn">
          {copy.button}
        </button>
      </div>
      <p className={s.note}>{copy.note}</p>
    </form>
  );
}
