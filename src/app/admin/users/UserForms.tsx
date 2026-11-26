"use client";

import { useActionState } from "react";
import { addUserAction, changePasswordAction } from "../actions";

export function UserForms({ owner }: { owner: boolean }) {
  const [add, addAction, adding] = useActionState(addUserAction, undefined);
  const [pw, pwAction, changing] = useActionState(changePasswordAction, undefined);
  return (
    <>
      {owner && (
        <form action={addAction} className="card" style={{ marginTop: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Tambah editor</h2>
          {add?.message && <p className={`note ${add.ok ? "" : "bad"}`}>{add.message}</p>}
          <p>
            <label htmlFor="e-user">Nama pengguna</label>
            <input id="e-user" name="username" type="text" autoComplete="off" autoCapitalize="none" pattern="[a-z0-9._\-]{3,32}" required />
          </p>
          <p>
            <label htmlFor="e-pw">Sandi awal (minimal 10 karakter)</label>
            <input id="e-pw" name="password" type="password" minLength={10} autoComplete="new-password" required />
          </p>
          <button className="btn primary" disabled={adding}>
            Tambah
          </button>
        </form>
      )}
      <form action={pwAction} className="card">
        <h2 style={{ marginTop: 0 }}>Ganti sandi saya</h2>
        {pw?.message && <p className={`note ${pw.ok ? "" : "bad"}`}>{pw.message}</p>}
        <p>
          <label htmlFor="n-pw">Sandi baru (minimal 10 karakter)</label>
          <input id="n-pw" name="password" type="password" minLength={10} autoComplete="new-password" required />
        </p>
        <button className="btn primary" disabled={changing}>
          Ganti sandi
        </button>
      </form>
    </>
  );
}
