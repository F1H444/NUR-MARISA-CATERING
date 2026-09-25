# PROMPT UNTUK AI AGENT — WEBSITE CATERING (CLONE DESIGN & STRUKTUR NUR MARISA CATERING)

> Salin seluruh isi file ini dan berikan ke AI agent Anda. Ganti dulu semua teks
> di dalam tanda `[KURUNG SIKU]` dengan data bisnis Anda. Prompt ini sudah
> memuat spesifikasi design system, struktur halaman, arsitektur data, dan SEO
> yang sama persis dengan website Nur Marisa Catering (nurmarisacatering.biz.id).

---

## 1. PERAN & TUJUAN

Anda adalah senior frontend engineer. Bangun sebuah website company profile +
katalog menu untuk bisnis catering rumahan bernama **[NAMA BISNIS]** di
**[KOTA]**, dengan gaya, struktur, dan pengalaman pengguna yang sama dengan
website catering modern berbasis Next.js yang profesional, cepat, dan SEO-friendly.

Tujuan website:
1. Membuat pengunjung percaya (kepercayaan dibangun dari fakta yang bisa dibuktikan: price list, sertifikat halal, ketentuan tertulis).
2. Menampilkan katalog menu lengkap dengan harga per satuan.
3. Mengarahkan semua pemesanan lewat **WhatsApp** (bukan form order online).

---

## 2. TEKNOLOGI (WAJIB)

- **Next.js 16 (App Router)** + **React 19** + **TypeScript** (strict).
- **Tailwind CSS v4** — konfigurasi tema via blok `@theme` di `app/globals.css`, TANPA file `tailwind.config`.
- **lucide-react** untuk semua ikon (jangan pakai emoji sebagai ikon).
- **next/font/google**: heading pakai **Urbanist** (variabel `--font-heading`), body pakai **Manrope** (variabel `--font-body`).
- **next/image** untuk semua gambar.
- Tidak ada library UI eksternal (tanpa shadcn, tanpa framer-motion — animasi dibuat sendiri dengan IntersectionObserver).
- Bahasa konten: **Indonesia**. `<html lang="id">`.

---

## 3. DESIGN SYSTEM (WAJIB SAMA)

### 3.1 Warna — tema hijau cerah + krem + aksen emas, semua warna SOLID (dilarang keras memakai gradient di mana pun)

```css
@theme {
  /* forest: latar, kartu, border (hijau emerald cerah) */
  --color-forest-950: #0c5f56;  /* latar utama body */
  --color-forest-900: #117064;  /* kartu */
  --color-forest-800: #158273;  /* border kartu, tombol sekunder */
  --color-forest-700: #1b9484;
  --color-forest-600: #22a795;
  --color-forest-500: #2fbcab;
  --color-forest-400: #62d0c0;
  --color-forest-300: #a1e5d8;
  --color-forest-200: #c7efe8;
  --color-forest-100: #e0f7f1;
  --color-forest-50:  #f0fbf8;

  /* pine: teks gelap di atas permukaan terang (krem/emas) */
  --color-pine-900: #06301f;
  --color-pine-800: #0a452c;
  --color-pine-700: #0e5637;

  /* cream: teks di atas latar hijau */
  --color-cream-50:  #fdfbf6;
  --color-cream-100: #faf5ea;
  --color-cream-200: #f2ead9;

  /* gold: aksen dari brosur price list */
  --color-gold-100: #f9f0d8;
  --color-gold-200: #f7e9c4;
  --color-gold-300: #eed9a0;   /* teks aksen utama di atas hijau */
  --color-gold-400: #ddb96b;   /* tombol primer */
  --color-gold-500: #c99b46;   /* border tombol primer */
  --color-gold-600: #8f6c27;

  --color-ink: #0a1a12;  /* teks di atas emas */
  --color-ash: #cfe6da;  /* teks pendukung di atas hijau */

  --radius-4xl: 2rem;

  --shadow-soft: 0 1px 2px rgba(3,12,8,.35), 0 14px 34px -20px rgba(3,12,8,.75);
  --shadow-lift: 0 2px 6px rgba(3,12,8,.4), 0 30px 56px -30px rgba(3,12,8,.9);
}
```

Aturan pemakaian:
- Body: `bg-forest-950 text-cream-100 antialiased`.
- Heading (h1–h4): `font-display`, `letter-spacing: -0.02em`, warna `cream-50`.
- Teks paragraf: `text-ash`, `leading-relaxed`.
- Aksen penting (angka harga, highlight): `text-gold-300`.
- `::selection`: background `gold-400`, color `pine-900`.
- `scroll-behavior: smooth`, `scroll-padding-top: 7rem` (offset navbar mengapung), `overflow-x: clip` pada html & body.
- Teks di atas tombol/kartu emas selalu `pine-900`, bukan hitam murni.

### 3.2 Bentuk & komponen

- **Tombol**: `rounded-full` (pill), font medium, focus ring `gold-300`. Varian:
  - `primary`: `bg-gold-400 text-pine-900 hover:bg-gold-300 border border-gold-500`
  - `secondary`: `bg-forest-800 text-cream-50 hover:bg-forest-700 border border-forest-700`
  - `outline`: transparan, `border-forest-700`, hover `border-gold-400/70 text-gold-200`
  - `light`: `bg-cream-50 text-pine-900 hover:bg-cream-100`
  - `dark`: `bg-forest-950 text-cream-100 hover:bg-forest-900`
  - Ukuran sm/md/lg (py-2/2.5/3.5, px-4/5/6). Dukung ikon kiri/kanan, otomatis `<Link>` untuk internal, `<a>` untuk eksternal, `<button>` tanpa href, prop `download` dan `newTab`.
- **Kartu**: `rounded-4xl` (2rem), `border border-forest-800`, `bg-forest-900`, shadow `soft`/`lift`.
- **Badge/eyebrow**: pill kecil `border-gold-400/30 bg-forest-900 text-gold-300 text-xs font-semibold tracking-wide` dengan ikon lucide kecil.
- **Section**: setiap section punya `id` dan `scroll-mt-28`; ada komponen `Container` (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8) dan `SectionHeading` (eyebrow + judul + deskripsi, rata tengah atau kiri).
- **Animasi**: komponen `Reveal` memakai IntersectionObserver — elemen muncul fade/slide (kiri/kanan/bawah, delay per step 80–400ms) hanya sekali saat masuk viewport, dengan `prefers-reduced-motion` dihormati.
- **CountUp**: angka statistik menghitung naik saat pertama terlihat.
- **Navbar**: mengapung (floating pill) + `position: sticky`, logo kiri, nav links tengah/kanan, tombol WhatsApp gold di kanan, menu hamburger + drawer di mobile. Nav links memakai anchor section (`/#kenalan` dst).
- **Footer**: hijau paling gelap, kolom: identitas + tagline + sosmed, daftar nav links, kontak (alamat, WA, jam buka), copyright.

---

## 4. STRUKTUR HALAMAN UTAMA (urutan section persis seperti ini)

Semua konten section diambil dari file data terpusat (lihat Bab 6), bukan hardcode di komponen.

1. **Hero** (`id="beranda"`): grid 2 kolom (teks kiri, kolase foto kanan).
   - Kiri: badge "Catering rumahan di [KOTA] sejak [TAHUN]" → H1 besar (mis. "Masakan rumahan untuk acara besar di [KOTA]." dengan 1 frasa warna emas) → paragraf deskripsi → 2 tombol (`Lihat Menu` primary ke /menu, `Pesan Sekarang` outline ke WhatsApp) → 3 trust points berikon → strip statistik (angka CountUp + label) di atas border atas `border-gold-400/20`.
   - Kanan: **kolase bento** grid 6×6 dengan `rounded-4xl`: 1 foto besar (4×4), 1 kartu harga emas "Mulai dari Rp [X] / per [satuan] dari brosur kami" (2×2, `bg-gold-400 text-pine-900`), 1 foto tinggi (2×4), 1 kartu keunggulan berikon truck (4×2), 1 foto kecil (2×2).
2. **Kenalan / About** (`id="kenalan"`): cerita asal-usul bisnis (2–3 paragraf), foto asli menu di sisi lain, plus 3 highlight cards (label + value + deskripsi, mis. minimal order, full service, free ongkir).
3. **Visi & Misi** (`id="visi-misi"`): dua kartu (Visi = 1 paragraf; Misi = daftar bernomor), plus motto dalam kartu emas dan 3 nilai (Jujur/Teliti/Ramah) berikon.
4. **Mengapa Kami** (`id="mengapa-kami"`): grid 3×2 kartu ikon (Wallet, BadgeCheck, Soup, Truck, ClipboardList, ListChecks) berisi keunggulan yang bisa dibuktikan.
5. **Menu Preview**: kartu kategori menu unggulan (foto, nama kategori, deskripsi, "mulai dari Rp X", tombol ke /menu) — hanya item ber-tag `featured`.
6. **Ketentuan / PackageFacts** (`id="ketentuan"`): grid kartu fakta pemesanan yang disalin dari price list (minimal order, minimal pax per paket, free ongkir, bonus, dsb).
7. **Galeri** (`id="galeri"`): grid foto masonry/2–3 kolom dengan caption; foto dari brosur/real activities, bukan stok.
8. **FAQ** (`id="faq"`): accordion (detail/summary atau state) 6–10 pertanyaan; isinya juga dipakai sebagai FAQPage JSON-LD.
9. **Kontak & Lokasi** (`id="kontak"`): dua kolom — kartu kontak (alamat, WhatsApp, jam operasional, tombol "Petunjuk Arah" ke Google Maps) + embed/iframe Google Maps.
10. **CtaBanner**: kartu emas full-width sebelum footer: judul ajakan, tombol WhatsApp primary + tombol lihat menu outline, catatan kecil "konsultasi gratis".

---

## 5. HALAMAN `/menu`

- **MenuHero**: judul + deskripsi + tombol unduh brosur PDF price list (`download`) + tombol WhatsApp.
- **Filter kategori sticky** (chips pill horizontal, scrollable di mobile; sticky di bawah navbar; klik mengganti kategori tanpa reload — client component).
- **Grid kartu menu** per kategori: foto (jika ada), nama, deskripsi, **harga per satuan** (format Rupiah `Rp 13.000`; jika `null` tampilkan "Silakan tanya via WhatsApp"), isi paket (list `includes`), min order badge, tags.
- **OrderSteps**: 3–4 langkah cara pesan (1. Cek price list → 2. Chat WhatsApp: tanggal, jumlah tamu, lokasi → 3. Konfirmasi menu & ketentuan → 4. Dapur memasak & antar).
- **PriceListBrochure**: preview halaman brosur (thumbnail gambar hasil ekstraksi PDF), klik → **lightbox** (modal) untuk melihat & zoom halaman; tombol unduh PDF lengkap.
- Structured data tambahan: `ItemList` / `OfferCatalog` dari semua menu.

---

## 6. ARSITEKTUR DATA (sumber kebenaran tunggal)

Buat folder `data/` — SEMUA teks, harga, kontak, FAQ, galeri diambil dari sini:

- **`data/site.ts`**: `siteUrl`, `whatsappNumber` (format 62xxx tanpa tanda baca), `whatsappLabel`, fungsi `whatsappUrl(message?)` (wa.me + encodeURIComponent), `googleMapsQuery` (nama bisnis seperti di Google Maps, BUKAN koordinat), `googleMapsDirectionsUrl`, `googleMapsPlaceUrl`, objek `site` (name, shortName, logo, tagline, foundedYear, description, city, address, addressShort, phone, operationalHours, orderNote, paymentNote, socials, serviceAreas), `navLinks`, `stats` (dihitung dari data menu, bukan klaim palsu), `advantages`, `orderFacts`, `visionMission`, `about`.
- **`data/menu.ts`**: type `MenuCategoryId` (union string), `MenuCategory` (id, name, description, note), `MenuItem` (id, name, category, description, `price: number | null`, unit, includes?, minOrder?, image?, tags, featured?), helper `formatRupiah()` dan `lowestPriceIn(category)`.
- **`data/faq.ts`**: daftar pertanyaan + jawaban.
- **`data/gallery.ts`**: daftar foto + caption.
- **`data/price-list.ts`**: path PDF brosur, jumlah halaman, path thumbnail tiap halaman.
- **`data/structured-data.ts`**: generator JSON-LD.

Isi data dengan placeholder `[DIISI]` jika belum ada, tetapi struktur datanya harus lengkap dan terpakai.

---

## 7. SEO & TECHNICAL (WAJIB)

- **JSON-LD di layout** (komponen `<JsonLd data={...}/>`): `LocalBusiness`/`FoodEstablishment` (name, image, address lengkap, telephone, openingHours, servesCuisine, priceRange, areaServed, sameAs: Instagram & Maps, hasMap) + `WebSite`.
- **FAQPage JSON-LD** di halaman utama (isinya sama persis dengan section FAQ).
- `metadata` lengkap: `metadataBase`, title template `%s | [NAMA BISNIS]`, description memuat kata kunci utama "catering [KOTA]", keywords lokal (catering [kota] murah, nasi kotak [kota], catering aqiqah [kota], dsb.), openGraph (locale `id_ID`, `summary_large_image`), robots index+follow, `formatDetection: { telephone: true, address: true }`, canonical per halaman.
- **`app/opengraph-image.tsx`** (OG image dinamis dengan ImageResponse) + `app/icon.png` + `app/apple-icon.png`.
- **`app/sitemap.ts`**, **`app/robots.ts`**, **`app/manifest.ts`** (nama, short_name, theme_color hijau).
- Verifikasi Google Search Console via env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (jika kosong, baris tidak dipasang).
- Prinsip konten: **hanya menulis klaim yang bisa dibuktikan dari price list/keterangan pemilik** (harga per satuan, minimal order, free ongkir wilayah tertentu); soal DP/cara bayar ditulis "dibicarakan langsung saat pemesanan"; tidak mengada-ada angka pengalaman/pelanggan.

---

## 8. KUALITAS UX & A11Y

- Mobile-first, mulus dari 320px sampai desktop (perhatikan `min-w-0` pada kolom grid agar tidak overflow).
- Semua foto: `next/image` dengan `sizes` tepat, `priority` hanya untuk foto hero.
- Semua tombol WhatsApp membuka wa.me dengan **pesan default sudah terisi** ("Halo [NAMA BISNIS], saya ingin bertanya tentang paket catering.").
- Ikon dekoratif `aria-hidden`; nav punya `aria-label`; modal/lightbox bisa ditutup dengan Esc & klik backdrop, fokus ter-trap.
- `prefers-reduced-motion` mematikan animasi Reveal/CountUp.
- Lighthouse target: Performance & SEO ≥ 90 di mobile.

---

## 9. DELIVERABLES

1. Project Next.js lengkap yang bisa `npm run dev` dan `npm run build` tanpa error (typecheck lolos).
2. Struktur folder:
   ```
   app/            layout.tsx, page.tsx, menu/page.tsx, globals.css,
                   manifest.ts, robots.ts, sitemap.ts, opengraph-image.tsx
   components/     home/ (Hero, About, VisionMission, WhyUs, MenuPreview,
                   PackageFacts, Gallery, Faq, ContactLocation),
                   layout/ (Navbar, Footer), menu/ (MenuHero, OrderSteps,
                   PriceListBrochure), shared/ (CtaBanner), seo/ (JsonLd),
                   ui/ (Button, Section, Reveal, CountUp, BrandMark, Lightbox)
   data/           site.ts, menu.ts, faq.ts, gallery.ts, price-list.ts, structured-data.ts
   public/         logo.png, images/menu/*.jpg, images/price-list/*.jpg, brosur.pdf
   ```
3. Semua konten memakai placeholder `[NAMA BISNIS]`, `[KOTA]`, `[NOMOR WHATSAPP]`, `[ALAMAT]` yang terkumpul rapi di `data/site.ts` agar mudah diganti.
4. README singkat: cara mengganti data, cara menambah menu, cara deploy.

**Mulai dari `data/site.ts` dan design tokens di `globals.css`, lalu bangun UI-nya section per section sesuai urutan Bab 4. Kerjakan sampai selesai dan pastikan build sukses.**
