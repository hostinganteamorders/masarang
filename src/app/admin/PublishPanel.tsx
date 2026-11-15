"use client";

import { useActionState } from "react";
import { publishAction } from "./actions";

export function PublishPanel({ disabled }: { disabled?: boolean }) {
  const [state, action, pending] = useActionState(publishAction, undefined);
  return (
    <form action={action}>
      {state?.message && (
        <p className={`note ${state.ok ? "" : "bad"}`} role="status">
          {state.message}
        </p>
      )}
      <button className="btn primary" type="submit" disabled={pending || disabled}>
        {pending ? "Menerbitkan…" : "Terbitkan"}
      </button>
    </form>
  );
}
