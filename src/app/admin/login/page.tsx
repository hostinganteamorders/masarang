import { redirect } from "next/navigation";
import { currentUser, devLogin } from "@/cms/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Masuk" };

export default async function LoginPage() {
  if (await currentUser()) redirect("/admin");
  return (
    <div className="narrow">
      <h1>Masuk admin</h1>
      <p className="muted">Khusus staf Yayasan Masarang.</p>
      {devLogin && (
        <p className="note warn small">
          Mode pengembangan: nama pengguna <code>{devLogin.username}</code>, sandi <code>{devLogin.password}</code>. Di Vercel akun ini
          tidak ada; isi ADMIN_USERNAME dan ADMIN_PASSWORD.
        </p>
      )}
      <LoginForm />
    </div>
  );
}
