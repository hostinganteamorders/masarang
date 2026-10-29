"use client";

import { useEffect, useRef, useState } from "react";
import s from "./CopyAccount.module.css";

/** Tombol salin: menyalin teks ke papan klip dan mengumumkan hasilnya untuk pembaca layar. */
export function CopyAccount({
  text,
  label,
  done,
  failed,
}: {
  text: string;
  label: string;
  done: string;
  failed: string;
}) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 3500);
  }

  return (
    <div className={s.wrap}>
      <button type="button" className="btn btn--small" onClick={copy}>
        {label}
      </button>
      <span role="status" className={s.status}>
        {state === "done" ? done : state === "failed" ? failed : ""}
      </span>
    </div>
  );
}
