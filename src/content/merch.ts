import { cmsText } from "@/cms/apply";
import type { Locale } from "@/lib/i18n";

const en = {
  meta: {
    title: "Merchandise",
    description: "Bags, shirts and village products that fund Yayasan Masarang's field work.",
  },
  hero: {
    title: "Take a piece of Masarang home",
    lede: "Every purchase pays for restoration, animal care and education. Order on WhatsApp and we will arrange payment and delivery.",
  },
  list: {
    title: "Available now",
    example: "Example products and prices, to be replaced with the official list",
    order: "Order {name}",
    orderMessage: "Hello, I would like to order: {name}. Please tell me how to pay and how it will be delivered.",
    noPhoto: "Photo to come",
    empty: "Products will be listed here soon.",
  },
  how: {
    title: "How ordering works",
    steps: [
      { title: "Choose a product", body: "Press Order on the product you want. WhatsApp opens with a ready message." },
      { title: "Confirm and pay", body: "We confirm stock and the total, including delivery. You pay by bank transfer." },
      { title: "We send it", body: "We ship once your payment arrives and send you the tracking details." },
    ],
  },
  donate: { title: "Prefer to give directly?", cta: "Go to donation" },
};

const id: typeof en = {
  meta: {
    title: "Merchandise",
    description: "Tas, kaos, dan produk desa yang mendanai kerja lapangan Yayasan Masarang.",
  },
  hero: {
    title: "Bawa pulang sepotong Masarang",
    lede: "Setiap pembelian membiayai restorasi, perawatan satwa, dan edukasi. Pesan lewat WhatsApp, kami atur pembayaran dan pengirimannya.",
  },
  list: {
    title: "Tersedia sekarang",
    example: "Produk dan harga contoh, akan diganti dengan daftar resmi",
    order: "Pesan {name}",
    orderMessage: "Halo, saya ingin memesan: {name}. Mohon beri tahu cara pembayaran dan pengirimannya.",
    noPhoto: "Foto menyusul",
    empty: "Produk akan segera ditampilkan di sini.",
  },
  how: {
    title: "Cara memesan",
    steps: [
      { title: "Pilih produk", body: "Tekan Pesan pada produk yang Anda mau. WhatsApp terbuka dengan pesan yang sudah siap." },
      { title: "Konfirmasi dan bayar", body: "Kami memastikan stok dan total, termasuk ongkos kirim. Anda membayar lewat transfer bank." },
      { title: "Kami kirim", body: "Kami mengirim setelah pembayaran diterima dan memberi Anda nomor lacak." },
    ],
  },
  donate: { title: "Ingin menyumbang langsung?", cta: "Ke halaman donasi" },
};

export const merchCopy: Record<Locale, typeof en> = cmsText("merch", { en, id });
