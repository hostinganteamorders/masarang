"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="card">
      {state?.message && (
        <p className="note bad" role="alert">
          {state.message}
        </p>
      )}
      <p>
        <label htmlFor="username">Nama pengguna</label>
        <input id="username" name="username" type="text" autoComplete="username" autoCapitalize="none" defaultValue={state?.username} required />
      </p>
      <p>
        <label htmlFor="password">Sandi</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </p>
      <button className="btn primary" type="submit" disabled={pending}>
        {pending ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
