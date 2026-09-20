# Nur Marisa Catering: Landing Page

Website landing page dua halaman untuk bisnis katering rumahan, dibangun dengan Next.js App Router + TypeScript + Tailwind CSS.

- `/`: halaman utama (Hero, Kenalan Yuk, Visi & Misi, Mengapa Kami, Intip Menu, Ketentuan, Galeri, Kontak & Lokasi, CTA)
- `/menu`: halaman menu berisi brosur price list 11 halaman (klik untuk zoom) + cara pesan

> **Data pemilik bisnis sudah terpasang** (jam operasional, tahun berdiri 2017, sertifikat halal,
slogan, cerita dapur, domain). Email, Facebook, dan skor ulasan Google Maps sengaja tidak
ditampilkan: dua yang pertama belum ada, dan ulasan Google jumlahnya masih sedikit menurut
pemiliknya. Yang masih menunggu ada di [`CHECKLIST-DATA.md`](./CHECKLIST-DATA.md): kutipan
testimoni pelanggan, jam akhir pekan, nomor sertifikat halal, dan kode pos. Seluruh foto memakai
foto asli dari brosur, bukan foto stok.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
npm run lint    # ESLint (flat config)
```

## Struktur

```
app/
  layout.tsx            # font, Navbar, Footer, metadata (server component)
  page.tsx              # halaman utama
  menu/page.tsx         # halaman menu
  globals.css           # token warna (@theme), base style, override peta
components/
  layout/               # Navbar (client) & Footer (server)
  home/                 # section halaman utama (Hero, About, WhyUs, MenuPreview,
                        #   PackageFacts, Gallery, VisionMission, ContactLocation)
  menu/                 # hero menu, brosur price list, cara pesan
  map/                  # LocationMap: embed Google Maps (tanpa API key)
  admin/                # DataForm: form isi data untuk pemilik bisnis
  shared/               # CtaBanner yang dipakai dua halaman
  ui/                   # Button, Section, SectionHeading, Reveal, CountUp, BrochureLightbox,
                        #   BrandIcons
data/                   # isi konten: site.ts, menu.ts, price-list.ts, gallery.ts
```

## Sumber data menu

Isi `data/menu.ts` disalin dari price list PDF asli di `assets-src/` (11 halaman):
9 kelompok menu dan 33 item, lengkap dengan rincian isi paket dan catatan minimal order.
Field tambahan pada `MenuItem`:

- `includes`: rincian isi paket (dipakai untuk menyusun ringkasan paket).
- `minOrder`: batas minimal pesanan, mis. `"Minimal 500 pax"`.
- `price: null`: dipakai untuk Aneka Kue yang harganya belum ada di price list; kartu
  otomatis menampilkan "Harga menyusul" dan tombol tanya via WhatsApp.

## Brosur price list di halaman menu

Section **Brosur resmi** (`components/menu/PriceListBrochure.tsx`) menampilkan brosur price list
halaman per halaman sebagai gambar dalam grid, satu kartu berisi satu halaman penuh, persis
seperti brosur cetaknya.

Kenapa gambar, bukan penampil PDF bawaan peramban: ponsel tidak bisa menggelar PDF di dalam
halaman. Dengan gambar, brosur bisa dibaca di semua perangkat.

- Klik satu halaman untuk membukanya lebih besar. Gambar besar itu mendukung tombol ←/→ dan
  Escape, serta mengunci gulir halaman selama terbuka.
- Tombol **Unduh brosur PDF** mengarah ke berkas hasil kompresi di `public` (±3,8 MB).
- PDF asli dari pemilik bisnis (34 MB) disimpan di `assets-src/` di luar folder `public`,
  jadi tidak ikut terdeploy ke pengunjung, tapi tetap ada sebagai sumber gambar & foto menu.
- Tombol **Lihat Price List (PDF)** di hero halaman menu hanya menggulir ke section ini.
- Informasi jumlah halaman dan ukuran berkas ada di `data/price-list.ts` (`priceListFile`).

### Membuat ulang gambar halaman

Gambar `public/images/price-list/page-NN.jpg` dihasilkan oleh `pdf-to-img` (pdfjs + canvas, sudah
terpasang sebagai devDependency) lalu dioptimalkan dengan sharp:

```bash
npm install   # pdf-to-img sudah terdaftar di devDependencies
node scripts/render-price-list-pages.mjs "assets-src/Price list Nurmarisa Catering.pdf" public/images/price-list 1300 78
```

Argumennya: berkas PDF, folder keluaran, lebar gambar, dan kualitas JPEG. Skrip juga menulis
`manifest.json` berisi ukuran tiap halaman. Salin angka itu ke `priceListPages` bila lebar
render diubah, karena `next/image` memakainya agar tata letak tidak bergeser.

### Mengompres ulang PDF unduhan

`public/Price list Nurmarisa Catering.pdf` (yang diunduh pengunjung) adalah versi ringan: setiap
halaman dirender jadi JPEG lalu dirakit ulang sebagai PDF A4 oleh `scripts/compress-price-list-pdf.mjs`
(menggunakan `pdf-to-img` + `pdf-lib`, keduanya devDependency). Hasilnya 34,6 MB → ±3,8 MB dengan
isi visual identik. Kalau PDF aslinya berubah, jalankan ulang:

```bash
node scripts/compress-price-list-pdf.mjs
```

Catatan: teks di PDF hasil kompresi tidak bisa diseleksi/dicari, hanya tampilan visualnya yang
dipertahankan. Untuk arsip internal tetap pakai berkas asli di `assets-src/`.

## Foto menu dari PDF

Foto menu di `public/images/menu/<id-menu>.jpg` adalah hasil ekstraksi gambar dari price list PDF,
bukan lagi foto stok. Prosesnya dua langkah dan bisa diulang kapan saja:

```bash
node scripts/extract-price-list-images.mjs "assets-src/Price list Nurmarisa Catering.pdf" .next/pdf-images
node scripts/build-menu-images.mjs
```

1. `extract-price-list-images.mjs` membaca objek PDF (xref klasik, jadi tanpa library), menelusuri
   gambar sampai ke dalam Form XObject, menyalin gambar JPEG apa adanya, dan mendekode gambar
   FlateDecode (termasuk unfilter PNG predictor) memakai sharp. Hasilnya plus `manifest.json`
   berisi halaman, posisi, ukuran, dan warna rata-rata tiap gambar. Warna ini dipakai untuk
   memastikan foto cocok dengan menunya (mis. Matcha hijau, Thai tea oranye, Mie Habang merah).
2. `build-menu-images.mjs` memetakan gambar ke item menu lewat tabel `PHOTO_BY_ITEM`, lalu
   mengecilkannya ke lebar 1100 px (JPEG q76). Total aset sekitar 2,5 MB.

Halaman PDF yang tidak memuat foto produk (halaman Prasmanan hanya berisi panel grafis gelap)
memakai foto meja saji dari halaman lain yang relevan. Lihat komentar pada `PHOTO_BY_ITEM`.
Kalau ada pasangan foto yang kurang pas, ubah tabel itu lalu jalankan ulang langkah 2.

## Form isi data pemilik bisnis

Halaman `/isi-data` berisi form untuk semua data yang belum pasti (email, jam operasional,
skema DP, klaim opsional, testimoni asli). Pemilik bisnis mengisi lewat peramban, tekan
**Simpan**, dan jawabannya tersimpan sebagai `isi-data.json` di root project untuk dipasang.

- Halaman dan alamat penyimpannya **hanya aktif di mode development**. Di production keduanya
  balas 404 (`app/isi-data/page.tsx`, `app/api/simpan-data/route.ts`), jadi tidak ada jalan
  menulis berkas di website yang sudah dipasang.
- `isi-data.json` diabaikan Git (lihat `.gitignore`), karena isinya data internal bisnis.
- Isian tersimpan otomatis di peramban (localStorage), dan tersedia tombol unduh serta salin
  JSON supaya jawabannya bisa dikirim lewat chat.

## Mengubah konten

| Ingin mengubah | File |
| --- | --- |
| Nama bisnis, kontak, alamat, jam operasional, cerita, slogan | `data/site.ts` |
| Pencarian nama bisnis di Google Maps (peta & tombol arah) | `data/site.ts` → `googleMapsQuery` |
| Logo di navbar & footer | `public/logo.png` (dipakai lewat `site.logo`) |
| Ikon tab peramban | `app/icon.png` dan `app/apple-icon.png` |
| Brosur price list, judul tiap halaman | `data/price-list.ts` |
| Menu, kategori, harga, isi paket, minimal order | `data/menu.ts` |
| Ketentuan & fasilitas (section "Ketentuan") | `data/site.ts` → `orderFacts` |
| Statistik di hero | `data/site.ts` → `stats` (otomatis dari `data/menu.ts` & `data/price-list.ts`) |
| Foto galeri | `data/gallery.ts` |
| Foto hero & section Kenalan | `components/home/Hero.tsx`, `about.image` di `data/site.ts` |
| Warna dan token desain | `app/globals.css` (`@theme`) |

Nomor WhatsApp, telepon, dan tautan sosial media diturunkan dari satu nilai di bagian atas
`data/site.ts` (`whatsappNumber`), jadi mengubah satu baris itu memperbarui seluruh tautan
`wa.me`, `tel:`, dan footer sekaligus.

Tidak ada gambar dari luar: seluruh foto website ini berkas lokal di `public/`, jadi
`next.config.ts` tidak perlu daftar host gambar. Foto menu dan foto galeri berasal dari brosur
price list di `assets-src/` (lihat skrip ekstraksi di atas), dan caption galeri menyebut hidangan
yang memang terlihat di fotonya.

Untuk menggantinya dengan foto dari Anda sendiri: taruh berkasnya di `public/images/`, lalu ubah
`src`-nya di `data/gallery.ts` (galeri), `about.image` di `data/site.ts` (section Kenalan), dan dua
`<Image>` di `components/home/Hero.tsx`. Ukuran ideal minimal 1100 px lebar.

## Catatan desain

- Palet hijau solid (forest 50–950): latar hijau tua dengan teks krem, aksen emas (gold 200–500).
  Beberapa permukaan sengaja krem (mis. bingkai halaman brosur & tombol utama). Tidak ada gradient.
- Ikon memakai `lucide-react`; ikon merek sosial digambar inline di `components/ui/BrandIcons.tsx`
  karena Lucide v1 tidak lagi menyediakan ikon merek.
- Animasi scroll berbasis `IntersectionObserver` di `components/ui/Reveal.tsx` dan `CountUp.tsx`,
  otomatis nonaktif bila pengguna mengaktifkan `prefers-reduced-motion`.
- **Tidak ada klaim yang tidak bisa dibuktikan.** Setiap klaim punya sumbernya: ketentuan dan
  harga dari price list resmi, tahun berdiri dan sertifikat halal dari keterangan pemilik, dan
  angka statistik dihitung langsung dari data. Kutipan testimoni pelanggan tidak dipakai selama
  pemilik belum mengirimkan tulisan aslinya lengkap dengan nama akun dan tautan postingannya,
  karena ulasan karangan tidak boleh ditempelkan. Daftar yang masih menunggu ada di
  [`CHECKLIST-DATA.md`](./CHECKLIST-DATA.md).
- Peta memakai **embed Google Maps resmi tanpa API key**, jadi tidak ada dependensi peta tambahan
  di `package.json`.
- Yang di-embed adalah **pencarian nama bisnis** (`site.googleMapsQuery` di `data/site.ts`), bukan
  koordinat hasil hitung sendiri. Dengan begitu Google menampilkan kartu bisnis resmi (nama,
  alamat, skor ulasan, tombol Buka di Maps), dan pin-nya sama persis dengan yang dilihat orang saat
  mencari Nur Marisa Catering di Google Maps. Titik hasil hitung sendiri pernah meleset, karena
  Google tidak mengenal nomor blok di dalam komplek ("Blok 1A No. 35").
- Tombol **Petunjuk arah** memakai nama yang sama sebagai tujuan
  (`https://www.google.com/maps/dir/?api=1&destination=<nama bisnis>`), jadi navigasi pelanggan
  berhenti di titik yang sama.
- **Skor ulasan Google Maps tidak ditampilkan**, atas keputusan pemilik: ulasannya masih sedikit.
  Kalau nanti mau dipasang lagi, tampilkan angka persis seperti di kartu bisnis Google beserta
  tautannya, dan simpan nilainya di satu tempat supaya mudah diperbarui.
- Berkas logo berupa kotak berlatar krem dengan lambang bulat di tengahnya dan tanpa transparansi,
  jadi `components/ui/BrandMark.tsx` menampilkannya di wadah `rounded-full` + `object-cover`:
  sudut kotaknya terpotong dan lambangnya yang tersisa. Berkas aslinya tidak perlu diedit.
