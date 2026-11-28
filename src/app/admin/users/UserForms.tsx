"use client";

import { useActionState } from "react";
import { addUserAction, changeOwnerAction, changePasswordAction } from "../actions";

export function UserForms({ owner, username }: { owner: boolean; username: string }) {
  const [add, addAction, adding] = useActionState(addUserAction, undefined);
  const [pw, pwAction, changing] = useActionState(changePasswordAction, undefined);
  const [own, ownAction, savingOwn] = useActionState(changeOwnerAction, undefined);
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
      {owner ? (
        <form action={ownAction} className="card">
          <h2 style={{ marginTop: 0 }}>Ganti nama pengguna dan sandi saya</h2>
          {own?.message && <p className={`note ${own.ok ? "" : "bad"}`}>{own.message}</p>}
          <p>
            <label htmlFor="o-user">Nama pengguna</label>
            <input id="o-user" name="username" type="text" defaultValue={username} autoComplete="username" autoCapitalize="none" pattern="[a-z0-9._\-]{3,32}" required />
          </p>
          <p>
            <label htmlFor="o-cur">Sandi saat ini</label>
            <input id="o-cur" name="current" type="password" autoComplete="current-password" required />
          </p>
          <p>
            <label htmlFor="o-pw">Sandi baru (minimal 10 karakter)</label>
            <input id="o-pw" name="password" type="password" minLength={10} autoComplete="new-password" required />
          </p>
          <button className="btn primary" disabled={savingOwn}>
            Simpan akun
          </button>
        </form>
      ) : (
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
      )}
    </>
  );
}
