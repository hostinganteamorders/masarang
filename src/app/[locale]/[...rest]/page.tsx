import { notFound } from "next/navigation";

/** Semua alamat yang tidak dikenal di bawah /en atau /id ditampilkan lewat halaman 404 bersama tata letak situs. */
export default function CatchAll() {
  notFound();
}
