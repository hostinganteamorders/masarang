# Yayasan Masarang — situs web

Situs web Yayasan Masarang (Tomohon, Sulawesi Utara) dalam dua bahasa, Inggris dan Indonesia.
Dibuat dengan Next.js 16 (App Router), React 19, dan TypeScript. Tanpa Tailwind dan tanpa pustaka UI;
gaya memakai CSS Modules dan satu berkas token global (`src/app/globals.css`).

**Status: draf.** Semua isi dan angka dari prototipe sudah dipindahkan. Angka atau teks yang masih contoh
diberi garis bawah titik-titik di layar dan ditandai `ph: true` di berkas data. Lihat bagian
[Mode draf](#mode-draf-dan-penanda-contoh) dan [Sebelum tayang](#sebelum-tayang).

## Menjalankan

Butuh Node.js 20.9 atau lebih baru (diuji dengan Node 22).

```bash
npm install
npm run dev        # http://localhost:3000, mengalihkan ke /en atau /id
npm run build      # build produksi (semua halaman dibuat statis per bahasa)
npm start          # menjalankan hasil build di http://localhost:3000
npm run lint       # ESLint, tanpa peringatan
npm run typecheck  # pemeriksaan tipe TypeScript
```

## Halaman

Setiap halaman ada di `/en/...` dan `/id/...`. Alamat memakai kata Inggris yang sama di kedua bahasa.

| Alamat | Isi |
| --- | --- |
| `/` | Beranda: hero penggeser lereng bukit, angka kunci, dua lokasi, register satwa, pita aliran uang, donasi, mitra, kabar terbaru |
| `/about` | Tentang: surat Ketua, kisah pendirian dengan foto, prinsip, mitra |
| `/team` | Tim: pengurus dan tim program dalam grid potret, dengan dialog tugas dan biodata |
| `/programs` | Ringkasan program dan dua lokasi |
| `/programs/temboan` | Temboan: restorasi, kebun kelapa dan cengkih, tiga desa, tonggak, galeri |
| `/programs/tasikoki` | Tasikoki: perawatan satwa, grafik diselamatkan dan dilepasliarkan, tonggak, galeri |
| `/adopt` | Register satwa: 109 titik yang dapat disaring, kartu detail, sponsor lewat email, tabel spesies |
| `/transparency` | Keuangan (rupiah/dolar), biaya per satuan, dokumen, tata kelola |
| `/updates` | Kabar lapangan dengan penyaring jenis |
| `/support` | Cara mendukung: donasi, adopsi, rekening bank, kemitraan |

Alamat yang tidak ada menampilkan halaman 404 lengkap dengan header dan footer, dalam bahasa yang sedang dipakai.

## Dua bahasa

- Pilihan bahasa ada di alamat (`/en`, `/id`). Berkas `src/proxy.ts` mengalihkan alamat tanpa awalan
  (mis. `/about`) ke bahasa pengunjung: cookie `NEXT_LOCALE` lebih dulu, lalu header `Accept-Language`, lalu bawaan `en`.
- Tombol EN/ID di header menyimpan pilihan ke cookie `NEXT_LOCALE`.
- Setiap halaman punya `canonical` dan `hreflang` untuk kedua bahasa, juga `sitemap.xml`.
- Angka mengikuti bahasa: EN `Rp 25,000`, ID `Rp 25.000`. Kurs tampilan dolar tetap (lihat `site.fx`).
- Semua teks dua bahasa memakai bentuk `{ en: "...", id: "..." }`. Tipe TypeScript memaksa kedua bahasa
  selalu terisi: bila Anda menambah satu kunci di `en` dan lupa `id`, `npm run typecheck` gagal.

## Mengubah isi

| Yang ingin diubah | Berkas |
| --- | --- |
| Email, rekening bank, kurs, tanggal pembaruan, nama, mode draf | `src/data/site.ts` |
| Angka keuangan (sumber dan penggunaan dana, biaya per satuan) | `src/data/finance.ts` |
| Angka Temboan dan Tasikoki, tonggak, desa kelapa | `src/data/programs.ts` |
| Pengurus, prinsip, mitra, dokumen | `src/data/organisation.ts` |
| Anggota tim (nama, jabatan, tugas, biodata) | `src/data/team.ts` |
| Kabar lapangan | `src/data/updates.ts` |
| Daftar satwa dan jumlah per spesies | `src/data/animals.ts` |
| Foto | `src/data/photos.ts` (penempatan), `src/data/photo-catalog.ts` (daftar), `public/photos/` |
| Teks halaman (judul, paragraf, label tombol) | `src/content/*.ts` |

Berkas di `src/data` berisi angka dan catatan; berkas di `src/content` berisi kalimat. Warna, jarak, dan huruf
ada di bagian atas `src/app/globals.css`.

## Mode draf dan penanda contoh

- `site.draft` di `src/data/site.ts` bernilai `true` selama situs belum tayang. Efeknya: banner "Draf situs" di atas
  setiap halaman, garis bawah titik-titik pada semua nilai yang ditandai contoh, `noindex` di setiap halaman, dan
  `robots.txt` yang melarang semua mesin pencari.
- Nilai yang masih contoh ditandai `ph: true` (satu angka) atau `namePh` / `bioPh` (data tim), lalu ditampilkan lewat
  `<Ph on={...}>`. Ganti angkanya dengan yang asli, lalu hapus `ph` atau ubah menjadi `false`.
- Di `src/data/finance.ts`, satu bendera `finance.ph` menandai seluruh angka keuangan.
- Bila `site.draft = false`, banner, garis bawah, dan `noindex` hilang sekaligus, dan `robots.txt` membuka situs serta
  menunjuk ke `sitemap.xml`. Lakukan ini paling akhir.

## Foto

Semua foto sudah terpasang. Ada dua lapis:

- **`public/photos/`** berisi 89 foto yang sudah dikecilkan untuk web (sisi terpanjang sekitar 2000 px), dikelompokkan
  menurut program: `restoration/` (Temboan: `nursery`, `landscape`, `field-team`, `livelihood`, `sea-patrol`, `visits`,
  `workshop`), `conservation/` (Tasikoki: `animals`, `centre`, `translocation`, `specimens`), `education/`
  (`lokawaya`, `festival`, `school-visits`, `waste`), `about/`, dan `team/`.
- **`photo-archive/`** berisi seluruh 264 foto asli dengan nama berkas aslinya, dikelompokkan per program dan per
  kegiatan (`restoration`, `conservation`, `education`, `visits`, `enterprise`, `documents`). Folder ini tidak ikut
  tayang (ada di `.gitignore`). `photo-archive/INDEX.csv` mencatat tiap foto: tanggal ambil, ukuran, kamera, dan
  apakah dipakai di situs. Lihat `photo-archive/README.md`.

Cara kerjanya:

1. `src/data/photo-catalog.ts` adalah daftar semua foto web: berkas, ukuran, warna rata-rata, titik fokus, dan keterangan
   dua bahasa (`alt`). Keterangan menjadi teks di lightbox sekaligus teks pengganti untuk pembaca layar.
2. `src/data/photos.ts` hanya memilih foto mana dipakai di mana, memakai kunci katalog (editor menyarankan kunci yang
   ada). Untuk menukar foto, ganti kuncinya. 42 foto di katalog belum dipakai dan siap dipasang.
3. Galeri (Temboan, Tasikoki, pendidikan di Program) memakai baris sama tinggi tanpa memotong foto, susunannya dihitung
   otomatis dari rasio tiap foto (`src/lib/rows.ts`). Klik foto untuk lightbox (panah kiri/kanan, Esc).
4. Foto baru: kecilkan (JPG, sisi terpanjang sekitar 2000 px), taruh di `public/photos/…`, lalu tambahkan satu entri di
   katalog dengan ukuran sebenarnya dan keterangan dua bahasa.

Tidak ada kredit fotografer di situs, sesuai permintaan. Potret anggota tim tetap kosong
(`photos.portraits`, `{ chair: "/photos/team/aulia.jpg" }`, tegak 4:5) sampai fotonya ada. Gambar dioptimalkan otomatis
oleh `next/image` (AVIF/WebP) saat `npm start` atau di Vercel.

## Warna dan logo

Palet ada di `:root` pada `src/app/globals.css`:

| Peran | Warna |
| --- | --- |
| Restoration (hijau) | `#239D4D` |
| Conservation (limau) | `#CCE36E` |
| Education (oranye) | `#E87B36` |
| Dasar | `#F5F5F5` dan `#242424` |

Beberapa warna turunan (`--restoration-ink`, `--conservation-ink`, `--education-ink`, `--on-fill`, dll.) hanya dipakai
agar teks memenuhi kontras WCAG AA di atas latar terang atau di atas warna isian. Warna program tidak dipakai langsung
untuk teks kecil. Kelas `.on-light`, `.on-soft`, `.on-dark`, `.on-restoration`, `.on-conservation` mengatur warna
teks, garis, tautan, dan tombol sesuai latarnya.

Logo Masarang Foundation ada di `public/brand/` (`masarang-logo.png` hijau untuk latar terang,
`masarang-logo-light.png` putih untuk latar gelap, `masarang-emblem.png` lambang saja) dan dipakai lewat
`src/components/Logo.tsx` di header, menu ponsel, dan footer. Ikon tab adalah `src/app/icon.png`.

## Data satwa adalah contoh

`src/data/animals.ts` membangkitkan 145 catatan satwa dari tabel jumlah per spesies dan tahap perawatan, supaya semua
angka di halaman Adopsi cocok satu sama lain (109 dirawat, 28 disponsori, 81 menunggu sponsor, 36 dilepasliarkan).
Nama individu dan tanggal masuk adalah contoh. Ganti dengan register asli Tasikoki sebelum tayang, atau tampilkan
hanya angka agregat.

## Formulir dan tombol

Situs ini tidak punya server atau basis data. Karena itu:

- Berlangganan buletin, sponsor satwa, dan permintaan dokumen membuka aplikasi email pengunjung dengan pesan siap kirim
  (`mailto:` ke `site.email`).
- Tombol salin nomor rekening memakai clipboard peramban.
- Untuk buletin sungguhan (Mailchimp, Buttondown, dll.), ganti isi `onSubmit` di `src/components/NewsletterForm.tsx`.
- Tidak ada tombol WhatsApp atau pembayaran daring; donasi lewat transfer bank ke rekening di halaman Dukung.

## Variabel lingkungan

Salin `.env.example` menjadi `.env.local` (lokal) atau isi di pengaturan hosting:

| Nama | Fungsi |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Alamat publik tanpa garis miring di akhir, mis. `https://masarangfoundation.org`. Dipakai untuk `canonical`, `hreflang`, `sitemap.xml`, dan `robots.txt`. Bawaan `http://localhost:3000`. |

## Peluncuran

`src/proxy.ts` (pengalih bahasa) membutuhkan runtime server, jadi situs ini **tidak** bisa memakai `output: "export"`.
Pilihan yang cocok:

- **Vercel**: impor repositori, isi `NEXT_PUBLIC_SITE_URL`, selesai.
- **Server Node mana pun**: `npm run build` lalu `npm start` di balik Nginx atau Caddy.

Semua halaman dibuat statis saat build, jadi beban server sangat ringan.

## Sebelum tayang

- [ ] Isi `src/data/site.ts`: email asli, nama bank, nomor rekening, atas nama; perbarui `lastUpdated`.
- [ ] Ganti angka contoh di `finance.ts`, `programs.ts`, `organisation.ts`, `updates.ts`, lalu hapus penanda `ph`.
- [ ] Isi nama dan biodata tim di `team.ts`; sisa penanda tim (`namePh`, `bioPh`) dihapus.
- [ ] Tulis ulang teks yang berupa kerangka: kisah pendirian dan surat Ketua (`src/content/about.ts`), langkah
      "cara kerja sponsor" (`adopt.ts`), langkah "bagaimana angka sampai ke situs ini" (`programs.ts`),
      peran program di tim (`team.ts`).
- [ ] Ganti data satwa contoh (lihat di atas).
- [ ] Periksa keterangan foto (nama spesies hanya tebakan visual), dan pastikan izin memotret dan menayangkan orang,
      anak-anak, dan pejabat. Foto berlogo sponsor sengaja tidak dipakai.
- [ ] Pasang potret tim bila sudah ada.
- [ ] Minta penutur asli memeriksa kedua bahasa, termasuk istilah status IUCN dalam bahasa Indonesia.
- [ ] Isi `NEXT_PUBLIC_SITE_URL` di hosting.
- [ ] Ubah `site.draft` menjadi `false`.
- [ ] Jalankan `npm run lint && npm run typecheck && npm run build`.

### Angka contoh yang belum saling cocok

Hal-hal ini bukan galat kode; angkanya masih contoh. Cocokkan saat angka asli dimasukkan:

- Biaya perawatan menurut tabel spesies (sekitar Rp 1.306 juta per tahun) lebih besar daripada belanja perawatan
  satwa Tasikoki di `finance.ts` (Rp 896 juta).
- Belanja Temboan (Rp 1.088 juta) dibagi biaya per hektare (Rp 15 juta) hanya menutup sekitar 73 ha, sedangkan
  luas restorasi aktif tercatat 140 ha.

Yang sudah cocok dan dijaga konsisten: pemasukan sama dengan pengeluaran (Rp 3.200 juta) dengan persentase yang
berjumlah 100; overhead 18%; register 109/28/81; jumlah titik per spesies sama dengan tabel; pohon kelapa tiga desa
berjumlah 5.640; grafik 2025 (64 diselamatkan, 36 dilepasliarkan) sama dengan register.

## Aksesibilitas

- Tautan lompat ke isi utama, satu `h1` per halaman tanpa lompatan tingkat judul, semua kontrol bernama, semua gambar
  beralt.
- Fokus papan ketik terlihat di semua kontrol; menu seluler, lightbox, dan dialog tim memakai `<dialog>` bawaan
  (Escape menutup, fokus kembali ke pemicu).
- Titik register dapat dijelajahi dengan panah, Home, dan End; status dibaca lewat teks, tidak hanya warna.
- Gerak dikurangi saat pengunjung memilih "kurangi gerakan" di sistem.
- Tidak ada gulir horizontal pada lebar 320 sampai 1440 px (lebar yang diuji).

## Struktur

```
src/
  app/[locale]/…     halaman dan layout (root layout ada di [locale])
  app/fonts/         huruf yang dihosting sendiri + LICENSE.md
  components/        komponen dan CSS Modules-nya
  content/           teks dua bahasa per halaman
  data/              angka, daftar, penempatan foto, dan katalog foto
  lib/               i18n, format angka, SEO, util
  proxy.ts           pengalih bahasa
public/photos/       foto web, dikelompokkan per program
public/brand/        logo
photo-archive/       foto asli (tidak tayang)
```

## Lisensi huruf

Mona Sans dan Atkinson Hyperlegible Next, keduanya berlisensi SIL OFL 1.1. Keterangan ada di
`src/app/fonts/LICENSE.md`.

## Catatan untuk pengembang

Proyek ini memakai Next.js 16, yang berbeda dari versi lama: `middleware` bernama `proxy`, `params` berupa Promise,
dan tipe `PageProps<'/[locale]/…'>` tersedia global. Baca `node_modules/next/dist/docs/` sebelum mengubah struktur
routing.

Dua hal yang sengaja dibuat begitu:

- **Gambar berumus** (lereng bukit, pohon kelapa, garis kontur) memakai `src/lib/round.ts`: angka dibulatkan
  (`r1`, `r2`), dan `stableSin`, `stableCos`, `pow875` menggantikan `Math.sin`, `Math.cos`, `Math.pow`. Node (server) dan
  peramban boleh berbeda di digit terakhir untuk fungsi-fungsi itu; angka mentah di atribut SVG akan memicu galat
  "hydration mismatch" di mode dev. Bila menambah gambar berumus, ikuti pola yang sama.
- **`<html data-scroll-behavior="smooth">`** di `src/app/[locale]/layout.tsx` diwajibkan Next 16 karena CSS memakai
  `scroll-behavior: smooth`. Tanpa atribut itu mode dev memberi peringatan, dan pindah halaman ikut bergulir pelan.
