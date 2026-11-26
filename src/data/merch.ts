import { cmsList } from "@/cms/apply";
import type { L10n } from "@/lib/i18n";

export type MerchItem = {
  id: string;
  title: L10n;
  body: L10n;
  /** Rupiah */
  price: number;
  /** Foto produk (alamat berkas); kosong = kotak "Foto menyusul". */
  photo: string;
  /** Produk dan harga masih contoh. */
  ph: boolean;
};

/** Produk contoh sampai tim mengirim daftar resmi. Admin dapat menambah, mengubah, atau menghapusnya. */
export const merch: MerchItem[] = cmsList<MerchItem>("merch", [
  {
    id: "tote-bag",
    title: { en: "Tote bag", id: "Tas kain" },
    body: {
      en: "Canvas tote bag with the Masarang emblem. Sold to fund our field work.",
      id: "Tas kain kanvas berlambang Masarang. Hasil penjualan mendukung kerja lapangan kami.",
    },
    price: 85_000,
    photo: "",
    ph: true,
  },
  {
    id: "t-shirt",
    title: { en: "T-shirt", id: "Kaos" },
    body: {
      en: "Cotton T-shirt printed with a Sulawesi species.",
      id: "Kaos katun bergambar satwa Sulawesi.",
    },
    price: 150_000,
    photo: "",
    ph: true,
  },
  {
    id: "palm-sugar",
    title: { en: "Palm sugar", id: "Gula aren" },
    body: {
      en: "Palm sugar made by the farmers we work with in Temboan.",
      id: "Gula aren buatan petani mitra kami di Temboan.",
    },
    price: 45_000,
    photo: "",
    ph: true,
  },
]);
