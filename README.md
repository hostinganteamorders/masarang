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
| `/` | Beranda: salam pembuka, tagline lalu video besar (Aping), angka utama, ringkasan tiga program, update terbaru (Quarterly Report, rincian per program dibuka dengan klik), tombol donasi |
| `/about` | Pendiri (Dr. Willie Smits), sejarah Masarang, Video Aping |
| `/about/vision` | Visi, apa dan mengapa (tiga pilar) |
| `/about/partners` | Mitra, dikelompokkan menurut jenis institusi. Bagian Tim disembunyikan dulu (`features.team` di `src/data/site.ts`) |
| `/support` dan `/support/merchandise` | Donasi (rekening, pilihan dukungan) dan Merchandise (produk contoh, pesan lewat WhatsApp). Keduanya ada di menu Terlibat > Support our work |
| `/en/impact.xlsx`, `/id/impact.xlsx` | Unduhan Excel semua angka "Our impact" di Home (enam lembar) |
| `/get-involved` | Terlibat: empat cara (adopsi satwa, donasi, jadi mitra, jadi relawan), dengan halaman `/get-involved/partner` dan `/get-involved/volunteer` |
| `/programs` | Ringkasan tiga program, pemantauan dan pelaporan |
| `/programs/restoration` | Restorasi: pengantar program, Temboan Restoration Project (500 ha; 70 ha di Temboan dan 10+ ha di Kayuwatu dan Mahembang dalam 4 tahun), Farmers Empowered (53 petani, 35%, tautan TMS), lereng pulih (simulasi), **penampil Satelit + 360°** (bandingkan dua tanggal), **pembanding video drone** (Jan 2025 vs Jan 2026), kelapa, tonggak, galeri |
| `/programs/conservation` | Konservasi: pengantar program, Tasikoki Wildlife Center (rehabilitasi, translokasi, pelepasliaran), jumlah satwa per kategori, Proyek Penyu, Perlindungan Hutan, data keanekaragaman hayati, galeri |
| `/programs/conservation/adopt` | Satwa per kategori (data Excel Rekapitulasi Satwa PPST sampai Oktober 2026): total, empat kartu kategori (jumlah dirawat, karantina, masuk/lahir/mati/lepas/translokasi sejak 2018, satwa duta dengan tombol dukung), tabel tahunan per kategori sejak 2021 (masuk, pelepasliaran, translokasi, akhir tahun, rata-rata rehabilitasi), grafik per tahun yang bisa disaring, daftar 109 jenis yang bisa dicari |
| `/programs/education` | Edukasi: .Tumbuh, Pasar Lokawaya, SAPA ALAM, Residensi (EduTour, StoryLab for Sampiri), Outreach dan ComDev, Relawan, galeri |
| `/updates` | Quarterly Report (terbaru dan arsip) dan kabar lapangan dengan penyaring lokasi |
| `/support` | Donasi: cara mendukung, rekening bank, tombol kirim bukti transfer lewat WhatsApp, kemitraan |
| `/transparency` | Keuangan (rupiah/dolar), biaya per satuan, dokumen, tata kelola (tidak di menu utama; ada di footer dan di halaman Tentang) |

Struktur ini mengikuti daftar dari tim (Home, About Us, Programs). Alamat lama (`/team`, `/adopt`, `/programs/temboan`,
`/programs/tasikoki`) dialihkan otomatis ke alamat baru (lihat `next.config.ts`).

### Navigasi, salam pembuka, dan pop-up foto

- **Menu**: Home | About Us ▾ (Our Founder, Our Vision, Our Partners) | Programs ▾ (Restoration,
  Conservation, Education) | Get involved ▾ (Adopt an animal, Donate, Become a partner, Volunteer) | Updates, ditambah tombol Donate. Susunannya ada di `ITEMS` pada
  `src/components/SiteHeader.tsx`, teks menu di `nav` pada `src/content/common.ts`. Dropdown terbuka dengan hover,
  fokus, atau klik panah; Esc menutup. Di ponsel, submenu ada di dalam lembar menu.
- **Salam pembuka** (`src/components/Intro.tsx`, teks di `intro` pada `common.ts`): lambang, "Selamat datang" / "Welcome",
  lalu seluruh lapisan memudar. Diputar sekali per sesi peramban dan diputar ulang setiap Home atau logo ditekan (`HomeLink`, `src/lib/intro.ts`; Ctrl/Cmd-klik tidak), tidak diputar bila pengunjung memilih gerak dikurangi, bisa
  dilewati dengan klik, tombol Lewati, atau tombol papan ketik. Keputusan diambil oleh skrip kecil di `layout.tsx`
  sebelum cat pertama (kunci `masarang-intro` di `sessionStorage`). Untuk menonaktifkan sama sekali, hapus `<Intro />`
  dan skripnya di `layout.tsx`. Pada pengujian otomatis, set `sessionStorage["masarang-intro"] = "1"` lebih dulu.
- **Hero Beranda**: tagline, lalu video besar tepat di bawahnya, tanpa foto latar. Video diisi lewat `apingVideo.url`.
- **Pop-up foto**: semua foto di situs bisa diklik. Komponen `Photo` otomatis membungkus foto dengan `ZoomPhoto`
  (`zoom={false}` untuk mematikan). Foto latar kepala halaman memakai tombol di pojok (`ZoomButton`). Potret tim belum
  punya pop-up karena fotonya masih kosong.
- **Quarterly Report**: kartu tertutup; klik "Lihat rinciannya" untuk ringkasan per program (Restorasi, Konservasi,
  Edukasi) dan tombol unduh. Isi rincian per laporan ada di `breakdown` pada `src/data/reports.ts`.
- **Mitra**: kotak logo. Taruh logo di `public/partners/` lalu isi `logo` pada `partners` di `src/data/organisation.ts`;
  selama kosong, kotak putus-putus berlabel nama mitra tampil. Kotak menjadi tautan (tab baru) bila `url` ada.

### Isi yang masih menunggu data

Teks berkurung siku `[…]` dan angka bergaris titik-titik adalah penanda tempat (hilang bila `site.draft = false`
atau setelah `ph` diubah menjadi `false`):

- Video Aping: bawaan `/videos/aping.mp4` (+ sampul `apingVideo.poster`) di `src/data/media.ts`; bisa diganti YouTube, Vimeo, atau berkas .mp4 lain.
- Situs TMS dan katalog EduTour: isi `tms.url` dan `edutourCatalog.url` di `src/data/media.ts`. Tombolnya baru aktif bila alamat ada.
- Alamat web mitra: isi `url` pada `partners` di `src/data/organisation.ts` (Trees for All dan PGE sudah terisi; Thryve.Earth belum). RDI sudah dihapus dari daftar mitra.
- Quarterly Report: isi daftar di `src/data/reports.ts` dan taruh PDF di `public/reports/`, lalu isi `pdf`.
- Angka Restorasi (500, 70, 10+, 53, 35%) ada di `src/data/programs.ts` (`restoration`); luas Perlindungan Hutan di `forestProtection`.
- Profil Dr. Willie Smits, Visi, dan "What We Do & Why We Do It" sudah memakai naskah resmi (`Narasi_Website`); terjemahan Indonesianya buatan sendiri dan perlu ditinjau. Yang masih penanda tempat: sejarah Masarang, foto Dr. Smits, dan deskripsi kegiatan Edukasi (`src/content/about.ts`, `src/content/programs.ts`).

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
| Satwa per kategori, per tahun, dan daftar jenis (dari Excel PPST) | `src/data/wildlife.ts` |
| Tanggal citra satelit, foto 360°, lokasi peta | `src/data/siteviews.ts` |
| Foto | `src/data/photos.ts` (penempatan), `src/data/photo-catalog.ts` (daftar), `public/photos/` |
| Teks halaman (judul, paragraf, label tombol) | `src/content/*.ts` |

Berkas di `src/data` berisi angka dan catatan; berkas di `src/content` berisi kalimat. Warna, jarak, dan huruf
ada di bagian atas `src/app/globals.css`.

## Admin: mengubah isi tanpa menyentuh kode

Staf (1–3 orang, tanpa keahlian teknis) mengubah isi lewat **`/admin`**. Admin ini bagian dari situs yang sama; tidak ada
layanan CMS berbayar.

**Yang bisa diubah**

| Menu | Isi |
| --- | --- |
| Teks | Semua kalimat halaman (Inggris dan Indonesia berdampingan). Tanda `{...}` di dalam kalimat harus tetap ada. |
| Foto | Mengganti foto di 20 tempat, mengatur galeri (urutan, hapus, tambah dari pustaka 89 foto atau unggah), keterangan foto, titik fokus. |
| Video & tautan | Video Aping (YouTube/Vimeo/.mp4), situs TMS, katalog EduTour. |
| Angka | 16 angka program (hektare, petani, pohon, satwa, siswa, biaya operasional). Mengisi angka mematikan tanda "contoh". |
| Data | Laporan triwulan (unggah PDF), mitra (unggah logo), tim dan tata kelola (foto), kabar lapangan, dokumen publik, pilihan dukungan, satwa per kategori (jumlah, karantina, satwa duta), satwa per tahun (grafik), daftar jenis satwa, dan tanggal satelit/360°. |
| Pengaturan | Email, nomor WhatsApp (bukti transfer), rekening bank, lokasi peta satelit, mode draf situs. |
| Pengguna | Pemilik menambah/menghapus editor. |

**Cara kerjanya.** Setiap simpan masuk ke *draf*. Tombol **Terbitkan** di Beranda admin menyalin draf menjadi isi
terbit, lalu meminta Vercel membangun ulang situs (sekitar 1–2 menit). Situs publik tetap statis dan cepat; admin
hanya menyimpan perubahan di `src/cms/overrides.json` saat build. Setiap isian divalidasi di server: hanya jalur yang
ada, alamat harus `https://`, PDF/foto diperiksa isinya, foto wajib punya keterangan dua bahasa.

**Pemasangan di Vercel (sekali saja)**

1. Di Vercel: *Storage* → buat **Upstash Redis** (Marketplace) dan **Blob**, hubungkan ke proyek. Variabel
   `KV_REST_API_URL`, `KV_REST_API_TOKEN`, dan `BLOB_READ_WRITE_TOKEN` terisi otomatis.
2. Isi variabel lingkungan (Production): `ADMIN_USERNAME`, `ADMIN_PASSWORD` (sandi pemilik, panjang), `ADMIN_SECRET`
   (acak, minimal 16 karakter; kunci penanda masuk), `NEXT_PUBLIC_SITE_URL`.
3. *Settings → Git → Deploy Hooks*: buat hook untuk cabang produksi, salin alamatnya ke `VERCEL_DEPLOY_HOOK_URL`.
   Tanpa ini, perubahan tetap tersimpan, tetapi situs baru berubah setelah Anda menekan *Redeploy* di Vercel.
4. Deploy. Masuk di `https://situs-anda/admin`. Pemilik menambahkan editor di menu Pengguna.

Build selalu menjalankan `scripts/pull-cms.mjs` lebih dulu (skrip `prebuild`): ia mengambil isi terbit dari Redis ke
`src/cms/overrides.json`. Bila Redis dipasang tetapi tidak terjangkau, build **gagal** (lebih baik daripada
menayangkan situs tanpa perubahan staf).

**Di komputer sendiri** (tanpa Redis): data admin disimpan di `.cms-data/`, foto/PDF di `public/uploads/`, dan
`src/cms/overrides.json` ikut diperbarui. Berkas itu berisi perubahan percobaan Anda: kembalikan ke
`{ "text": {}, "values": {}, "photos": {}, "lists": {} }` sebelum commit. Unggahan baru baru terlihat setelah server
dimulai ulang. Jalankan dengan `ADMIN_USERNAME=... ADMIN_PASSWORD=... ADMIN_SECRET=... npm run dev`.

**Menambah bagian yang bisa diubah (pengembang).** Teks: tambahkan berkas ke `TEXT_SCOPES` di `src/cms/scopes.ts`
dan bungkus ekspornya dengan `cmsText("nama", { en, id })`. Angka/tautan: bungkus objek dengan `cmsValues` dan daftarkan
isiannya di `src/cms/value-fields.ts`. Daftar: bungkus dengan `cmsList("nama", [...])` dan tambahkan skema di
`src/cms/collections.ts`. Tidak perlu mengubah halaman yang memakai datanya.

Belum bisa diubah lewat admin (masih di kode): angka keuangan di `src/data/finance.ts`, tonggak program, data
tahunan grafik satwa dilepasliarkan, dan proyeksi lereng.

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
   otomatis dari rasio tiap foto (`src/lib/rows.ts`). Klik foto untuk lightbox (panah kiri/kanan, Esc). Foto tunggal di halaman lain membuka pop-up satu foto.
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

## Data satwa: dari Excel, dengan dua bagian contoh

`src/data/wildlife.ts` dibuat dari `Rekapitulasi_Satwa_PPST_2018-new.xlsx` (lembar OVERVIEW dan rekap bulanan, data sampai
Oktober 2026: 248 satwa dirawat = 72 primata, 35 mamalia lain, 53 reptil, 88 burung). Dua hal **belum ada di Excel** dan
masih bertanda contoh (garis titik-titik): **jumlah karantina** per kategori dan **pilihan satwa duta** (Yaki, Rusa Timor,
Buaya Muara, Nuri Talaud, dipilih dari jenis terbanyak). Ganti lewat Admin > Data > "Satwa per kategori" lalu hilangkan
centang "masih contoh".

Catatan data: bulan terakhir yang terisi di Excel adalah Oktober 2026 (kolom November dan Desember hanya mengulang
Oktober), jadi situs memakai angka Oktober. Arus masuk/lahir/mati/lepas/translokasi 2026 dihitung dari lembar rekap
bulanan sampai Oktober; tahun 2018 sampai 2025 memakai lembar OVERVIEW. Semua angka bisa diubah admin kapan saja.

Tabel tahunan (mulai 2021) ada di Admin > Data > "Satwa per tahun dan kategori (tabel Adopsi)": satu baris untuk tiap
pasangan tahun dan kategori. Kolom "rata-rata yang direhabilitasi" adalah rata-rata hitungan bulanan; untuk 2026 dihitung
dari Januari sampai Oktober (Excel menghitung 12 bulan, termasuk November dan Desember yang hanya mengulang Oktober).

## Video pembuka tiap menu

Tiap menu di navbar (Tentang Kami, Program, Restorasi, Konservasi, Edukasi, Terlibat, Updates) punya blok video pembuka
tepat di bawah judul halaman, seperti video di Beranda (`src/components/MenuIntro.tsx`). Tempel alamat YouTube/Vimeo atau
berkas .mp4 di Admin > Pengaturan > "Video & tautan luar"; kosong = kotak penanda tempat.

## Halaman yang disembunyikan

`features` di `src/data/site.ts`: `team: false` dan `transparency: false`. Halaman Transparansi (`/transparency`) tidak
tayang (404), tautannya dilepas dari menu, footer, dan sitemap. Ubah ke `true` untuk menayangkannya lagi (tombol di
halaman Dukung dan Restorasi, serta bagian "pertanggungjawaban", perlu dipasang lagi di halaman About bila diinginkan).

## Satelit dan 360°

Bagian di halaman Restorasi. **Satelit** memakai citra Esri World Imagery (rilis Esri Wayback). Tanggal yang ditawarkan
adalah rilis yang citranya benar-benar berbeda di lokasi ini (2014, 2017, 2020 sampai 2026); tanggal itu adalah saat Esri
menerbitkan citra, foto aslinya bisa lebih lama. Tambah tanggal lewat Admin > Data > "Satelit dan 360°" (nomor rilis ada di
livingatlas.arcgis.com/wayback). **360°** memakai foto panorama equirectangular (rasio 2:1) dari drone; satu foto (2 Nov 2026,
DJI) sudah terpasang. Titik tengah peta diambil dari koordinat GPS foto itu dan bisa diubah di Admin > Pengaturan. Penampil 360°
memakai WebGL dan jatuh ke gambar datar bila peramban tidak mendukung.

## Video drone dan video Aping

Berkas video ada di `public/videos/` (`aping.mp4` 1080p, `drone-2025-01.mp4` dan `drone-2026-01.mp4` 720p), gambar sampulnya di
`public/photos/drone/`. Pembanding drone (`components/DroneCompare.tsx`, data di `src/data/drone.ts`, teks di `src/content/drone.ts`)
menampilkan dua video berdampingan, tiap sisi dengan pilihan tahun dan bulan, plus tombol putar/ulang bersamaan. Tambah penerbangan
lewat Admin > Data > "Video drone" (alamat `.mp4` langsung, bukan YouTube). Kompres sumber 4K dengan ffmpeg sebelum dipakai, mis.
`ffmpeg -i in.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -preset veryfast -an -movflags +faststart out.mp4`. Video tidak dimuat otomatis
(`preload="metadata"`), jadi halaman tetap ringan.

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
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Akun pemilik admin (masuk dengan nama pengguna, tanpa email; `ADMIN_EMAIL` lama masih terbaca). Wajib agar `/admin` bisa dipakai. |
| `ADMIN_SECRET` | Kunci penanda masuk admin, acak, minimal 16 karakter. Wajib di produksi. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Penyimpanan draf/terbit (Upstash Redis). Terisi otomatis dari Vercel Marketplace. |
| `BLOB_READ_WRITE_TOKEN` | Penyimpanan foto dan PDF unggahan (Vercel Blob). Terisi otomatis. |
| `VERCEL_DEPLOY_HOOK_URL` | Alamat hook yang dipicu tombol Terbitkan agar situs dibangun ulang. |

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
berjumlah 100; overhead 18%; jumlah per kategori (74/34/27/138) sama dengan total 273 dan dengan daftar jenis; pohon kelapa tiga desa
berjumlah 5.640; grafik 2025 (64 diselamatkan, 36 dilepasliarkan).

## Aksesibilitas

- Tautan lompat ke isi utama, satu `h1` per halaman tanpa lompatan tingkat judul, semua kontrol bernama, semua gambar
  beralt.
- Fokus papan ketik terlihat di semua kontrol; menu seluler, lightbox, dan dialog tim memakai `<dialog>` bawaan
  (Escape menutup, fokus kembali ke pemicu).
- Grafik per tahun dapat dijelajahi per batang (fokus papan ketik, hover, ketuk); penampil peta dapat digeser dengan panah.
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
