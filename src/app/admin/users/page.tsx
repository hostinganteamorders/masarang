import { listUsers, requireUser } from "@/cms/auth";
import { removeUserAction } from "../actions";
import { UserForms } from "./UserForms";

export const metadata = { title: "Pengguna" };
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const me = await requireUser();
  const users = me.role === "owner" ? await listUsers() : [];
  return (
    <>
      <h1>{me.role === "owner" ? "Pengguna" : "Akun saya"}</h1>
      {me.role === "owner" && (
        <>
          <p className="muted">
            Anda masuk sebagai pemilik ({me.username}). Nama pengguna dan sandi pemilik bisa diganti di bawah; sesudahnya akun
            dari ADMIN_USERNAME dan ADMIN_PASSWORD tidak dipakai lagi. Editor bisa mengubah semua isi, tetapi tidak bisa mengelola pengguna.
          </p>
          <table>
            <thead>
              <tr>
                <th>Nama pengguna</th>
                <th>Peran</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="muted">
                    Belum ada editor.
                  </td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <form action={removeUserAction}>
                      <input type="hidden" name="username" value={u.username} />
                      <button className="btn small danger" type="submit">
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <UserForms owner={me.role === "owner"} username={me.username} />
    </>
  );
}
