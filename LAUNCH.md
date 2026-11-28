# Daftar periksa tayang dan SEO

Jalankan `npm run launch-check` (dengan variabel lingkungan yang sama seperti di Vercel) untuk melihat apa yang masih kurang.

## 1. Pengaturan di Vercel (Settings > Environment Variables, Production)

| Variabel | Isi |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://masarangfoundation.org` (tanpa garis miring akhir). Kosong = canonical dan sitemap menunjuk ke localhost. |
| `NEXT_PUBLIC_SITE_DRAFT` | `false` saat siap tayang. Selama kosong, situs `noindex` dan `robots.txt` melarang semua mesin pencari. |
| `GOOGLE_SITE_VERIFICATION` | Kode dari Search Console (metode "HTML tag", hanya isi `content`). Opsional bila memverifikasi lewat DNS. |
| `BING_SITE_VERIFICATION` | Kode dari Bing Webmaster (`msvalidate.01`). Opsional. |

Setelah mengubah variabel, deploy ulang (Deployments > ... > Redeploy). Sebelum mematikan mode draf, ganti dulu angka contoh yang masih bergaris bawah titik-titik.

## 2. Domain

- Tambahkan `masarangfoundation.org` dan `www.masarangfoundation.org` di Vercel (Settings > Domains). `www` otomatis dialihkan permanen ke alamat tanpa `www` (diatur di `next.config.ts`).
- Alamat lama dari Squarespace dialihkan lewat daftar di `src/data/redirects.ts`. Lengkapi dengan alamat asli situs lama
  (Search Console > Halaman, atau Squarespace > Settings > Developer Tools > URL Mappings). Tiap baris: `["/alamat-lama", "/alamat-baru"]`.
- Jangan menghapus situs Squarespace sebelum pengalihan teruji. Tes: buka alamat lama dan pastikan berpindah ke halaman baru (kode 308).

## 3. Search Console dan Bing

1. Tambahkan properti domain `masarangfoundation.org` di Google Search Console, verifikasi (DNS atau kode di atas).
2. Kirim `https://masarangfoundation.org/sitemap.xml` (Sitemaps).
3. Uji beberapa alamat dengan "URL Inspection", lalu "Request indexing" untuk Beranda, Programs, dan Support.
4. Lakukan hal yang sama di Bing Webmaster Tools (bisa mengimpor dari Search Console).
5. Uji data terstruktur: https://search.google.com/test/rich-results (Beranda: organisasi dan situs; halaman dalam: jejak halaman).

## 4. Yang sudah dikerjakan di kode

- Judul dan deskripsi unik per halaman (EN/ID), canonical, hreflang, sitemap dengan pasangan bahasa.
- Data terstruktur (JSON-LD): `NGO` (organisasi), `WebSite`, dan `BreadcrumbList` per halaman (`src/components/JsonLd.tsx`).
- Gambar pratinjau 1200x630 per bahasa untuk WhatsApp/LinkedIn/X (`public/og/`), kartu Twitter besar.
- Teks alt pada foto galeri (dua bahasa), halaman statis cepat, `/admin` tidak diindeks.

## 5. Setelah tayang

- Isi Updates secara rutin (Quarterly Report dan kabar lapangan).
- Minta mitra (Masarang EU, World Parrot Trust, Trees For All, dan lainnya) menautkan ke situs ini.
- Buat profil Google Business untuk alamat Tomohon, dan samakan nama, alamat, dan email dengan footer.
- Cek PageSpeed Insights (utamakan versi ponsel). Video besar sebaiknya di YouTube/Vimeo.
- Pantau kata kunci dan halaman di Search Console tiap bulan.
