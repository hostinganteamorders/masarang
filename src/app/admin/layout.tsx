import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@/cms/auth";
import { logoutAction } from "./actions";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin Yayasan Masarang", template: "%s | Admin Masarang" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  return (
    <html lang="id">
      <body>
        <header className="bar">
          <Link href="/admin" className="brand">
            Admin Masarang
          </Link>
          {user && (
            <>
              <nav aria-label="Menu admin" className="row" style={{ gap: "0.25rem 1.25rem" }}>
                <Link href="/admin/text">Teks</Link>
                <Link href="/admin/photos">Foto</Link>
                <Link href="/admin/media">Video &amp; tautan</Link>
                <Link href="/admin/figures">Angka</Link>
                <Link href="/admin/data">Data</Link>
                <Link href="/admin/settings">Pengaturan</Link>
                {user.role === "owner" && <Link href="/admin/users">Pengguna</Link>}
              </nav>
              <span className="spacer" />
              <span className="small">{user.email}</span>
              <form action={logoutAction}>
                <button className="btn small" type="submit">
                  Keluar
                </button>
              </form>
            </>
          )}
        </header>
        <main className="wrap">{children}</main>
      </body>
    </html>
  );
}
