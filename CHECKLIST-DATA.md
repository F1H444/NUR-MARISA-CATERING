# Daftar Cek Data: Nur Marisa Catering

Status terakhir diperbarui: **20 September 2026**, setelah jawaban dari halaman
`/isi-data` dipasang ke website, dan setelah keputusan soal ulasan (bagian 3).

Sebagian besar data yang dulu belum pasti **sudah terisi dan sudah terpasang** (bagian 1).
Sisanya masih menunggu Anda (bagian 2), plus keputusan soal testimoni (bagian 3) dan
langkah SEO yang hanya bisa Anda kerjakan, terutama klaim Google Business Profile (bagian 6).

Legenda: **🔴 perlu keputusan** · **🟡 penting kalau ada** · **🟢 pelengkap**.

---

## 1. ✅ Sudah terpasang

| Data | Jawaban Anda | Dipasang di |
|---|---|---|
| Jam operasional | Senin - Jumat, 07.00 - 21.00 | Kontak & Lokasi, Footer |
| Instagram | instagram.com/nurmarisacatering | Kontak & Lokasi, Footer |
| Nama domain | nurmarisacatering.biz.id | `app/layout.tsx` (alamat kanonik & pratinjau saat link dibagikan) |
| Tahun berdiri | 2017 | Badge hero & Footer ("Catering rumahan sejak 2017") |
| Sertifikat halal | Sudah | Kartu keunggulan "Sudah bersertifikat halal" + baris kepercayaan di hero |
| Slogan | Cita rasa otentik di setiap hidangan. | Kutipan di section Kenalan |
| Cerita dapur | Teks Anda | Tiga paragraf section Kenalan |
| Daerah layanan | Banjarmasin dan sekitarnya | Kontak & Lokasi, Footer |
| Foto acara | Ambil dari brosur | Sudah begitu sejak sebelumnya (foto asli dari brosur Anda) |
| Email | Kosong (Anda tulis "-") | Tombol email **dihapus** dari Kontak & Lokasi dan Footer |
| Facebook | Kosong (Anda tulis "-") | Tautan Facebook **dihapus** dari Kontak & Lokasi dan Footer |
| Skor ulasan Google | Tampilkan 4,9 | **Tidak dipasang, lalu disembunyikan lagi.** Baca bagian 3 |

**Skema DP**: Anda pilih dibicarakan langsung saat chat admin, jadi tidak ada angka di website.
Yang tampil sekarang hanya "Uang muka, cara bayar, dan pelunasan kami bicarakan langsung lewat
WhatsApp saat pesanan dikonfirmasi", di section Ketentuan dan langkah "Cara Pesan" halaman menu.
Kalau nanti berubah pikiran dan ingin angkanya tertulis, kirim rinciannya, saya pasang.

---

## 2. ⏳ Yang masih menunggu Anda

| # | Data | Kenapa belum bisa saya isi |
|---|---|---|
| 2.1 | **Kutipan testimoni pelanggan** 🔴 | Saya tidak bisa membaca komentar Instagram (tertutup login), dan hasil pencarian Google di IG Anda mayoritas caption buatan pemiliknya sendiri, bukan ulasan pelanggan. Cara kirimnya ada di bagian 3. |
| 2.2 | **Jam Sabtu & Minggu** | Anda hanya menyebut Senin - Jumat. Kalau akhir pekan tetap melayani, kirim jamnya. |
| 2.3 | **Nomor & masa berlaku sertifikat halal** 🟡 | Sekarang tertulis "sudah bersertifikat halal". Kalau nomornya dicantumkan, orang bisa memverifikasi sendiri. |
| 2.4 | **Akun Facebook** 🟢 | Saya menemukan halaman "Nur Marisa Catering" di Facebook (facebook.com/people/Nur-Marisa-Catering/100072234882940), isinya masih sedikit dan Anda mengosongkan kolomnya, jadi saya tidak pasang. Mau dipasang? |
| 2.5 | **Foto dokumentasi acara Anda** 🟢 | Galeri sekarang memakai foto dari brosur. Kalau ada foto acara sendiri, kirim 6 sampai 12 foto ke `public/`, sebutkan nama berkasnya. |
| 2.6 | **Harga 6 menu Aneka Kue** 🟢 | Brownis Kukus, Puding, Kue Sus, Risol, Pie Buah, Kue Basah. Tersimpan di `data/menu.ts` tapi tidak tampil, karena halaman menu sekarang sepenuhnya brosur. |
| 2.7 | **Kode pos** 🟡 | Alamat di website memakai 70125 (dari alamat Anda). Kartu Google Maps menulis 70126. Kalau 70126 yang benar, tinggal bilang. |

---

## 3. 🔴 Testimoni: dari mana dan bagaimana

**Keputusan yang sudah jalan: skor Google Maps disembunyikan.** Alasannya sesuai kata Anda:
yang mengulas di Google masih sedikit (kartu bisnis menunjukkan 4,0 dari 3 ulasan per
20 September 2026), jadi angka itu saya cabut dari hero, footer, dan pita penutup. Peta dan
tombol petunjuk arah tetap normal, karena keduanya tidak menunjukkan skor.

**Testimoni dari Instagram: perlu bantuan Anda.** Saya sudah mencoba dua jalur:

1. Membuka komentar di postingan IG Anda: tertutup login, jadi tidak terbaca.
2. Mencari lewat Google: yang muncul dari akun Anda hampir semuanya caption sendiri, misalnya
   "Terima kasih sudah mempercayakan acara spesialx bersama NUR MARISA CATERING". Itu ucapan
   terima kasih kepada pelanggan, bukan ulasan dari pelanggan, jadi tidak boleh saya pakai
   sebagai testimoni.

Yang bisa dipakai adalah **komentar asli pelanggan** di postingan Anda. Cara mengirimnya, pilih
yang paling gampang:

- **Lewat form**: buka `http://localhost:3000/isi-data`, bagian 5 ("Testimoni asli") sudah
  menyediakan 6 baris: nama atau username, kota atau jenis acara, dan isi ulasannya. Tempel
  komentar apa adanya, lalu tekan Simpan dan kirim berkasnya ke saya.
- **Langsung di chat**: kirim tangkapan layar komentarnya, atau salin teksnya satu per satu.
  Sebutkan username pengomentar supaya atribusinya benar.

Kalimat komentar akan saya rapikan seperlunya (ejaan dan tanda baca), tapi maknanya tidak saya
ubah, dan saya tidak akan menambah kalimat yang tidak ada di komentar aslinya. Nanti section
"Kata Mereka" menampilkan nama akunnya, jadi bisa ditelusuri balik ke postingannya.

Catatan sopan santun: komentar itu tulisan orang di akun publik Anda, jadi aman ditampilkan,
tapi kalau ada pelanggan yang minta dihapus, tinggal bilang, saya cabut kutipannya.

---

## 4. Yang sudah pasti, tidak perlu diisi

- Nomor WhatsApp +62 858-2053-1295 (semua tombol WhatsApp, telepon, dan footer memakai ini)
- Harga, isi paket, dan minimal order semua paket: dari price list PDF Anda
- Ketentuan & fasilitas (8 baris di section "Ketentuan"): dari price list PDF Anda
- Statistik hero (33 menu, 9 kategori, 11 halaman price list): dihitung otomatis dari data
- Kartu harga di hero (Rp 13.000 per piringan): dihitung otomatis dari price list
- Alamat komplek, kelurahan, dan titik peta: dari kartu bisnis resmi Anda di Google Maps
- Brosur 11 halaman + tombol unduh PDF (3,8 MB)
- Seluruh foto: asli dari brosur Anda, tidak ada foto stok

---

## 5. Klaim yang sengaja tidak dipakai

| Klaim | Alasan |
|---|---|
| Skor ulasan Google Maps (4,0 dari 3) | Keputusan Anda: ulasannya masih sedikit. Bisa dipasang lagi kapan saja |
| Kapasitas harian "hingga 1.000 pax" | Anda memilih dibicarakan saat chat admin, jadi tidak dijanjikan di website |
| Tarif ongkir ke luar Banjarmasin | Sama, dibicarakan saat chat admin |
| "Melayani Banjarbaru, Martapura, Kertak Hanyar, Gambut" | Anda menjawab cukup Banjarmasin dan sekitarnya |
| Kutipan atas nama "Nur Marisa, Pendiri" | Kalimat buatan saya, bukan kata-kata pemilik. Sekarang jadi slogan tanpa atribusi |
| Janji "hari itu juga kami balas" | Janji waktu yang tidak bisa dipastikan |
| Lencana "Diperbarui setiap bulan" di Galeri | Tidak ada yang diperbarui tiap bulan. Diganti "Foto dari brosur resmi" |
| Tombol email & Facebook | Anda mengosongkan keduanya |
| Foto stok Unsplash | Diganti foto asli dari brosur Anda |
| Caption IG yang ditulis pemilik sebagai "testimoni" | Itu ucapan pemilik kepada pelanggan, bukan ulasan pelanggan |

Kalau salah satu sebenarnya benar dan ada buktinya, tinggal bilang, saya pasang lagi.

---

## 6. SEO: yang sudah dikerjakan, dan yang hanya bisa Anda kerjakan

**Sudah dikerjakan di dalam website** (tidak perlu Anda apa-apakan):

- Judul dan deskripsi halaman memuat "catering Banjarmasin" dan harga mulai.
- Keterangan bisnis untuk Google: nama, alamat, telepon, jam buka, area layanan, dan daftar
  33 menu beserta harganya.
- Section Tanya Jawab berisi 10 pertanyaan yang sering ditanyakan, lengkap dengan jawaban yang
  bisa muncul langsung di hasil pencarian.
- `robots.txt`, `sitemap.xml`, dan gambar pratinjau saat tautan dibagikan.

**Yang hanya bisa Anda kerjakan, dan ini yang paling menentukan.** Untuk pencarian seperti
"catering banjarmasin", Google hampir selalu menampilkan kotak peta di paling atas. Tempat di
kotak itu ditentukan oleh **Google Business Profile**, bukan oleh kode website. Urutannya:

| # | Langkah | Kenapa penting |
|---|---|---|
| 6.1 | **Klaim & verifikasi Google Business Profile** di [business.google.com](https://business.google.com) 🔴 | Tanpa ini, website sebaik apa pun tidak akan masuk tiga besar kotak peta |
| 6.2 | **Samakan alamat & telepon persis** dengan yang ada di website: Jl. Perdagangan, Komplek HKSN Permai Blok 1A No. 35, RT 26, Banjarmasin 70125, telepon +62 858-2053-1295 🔴 | Google mencocokkan tulisan di website dengan profil bisnis. Beda satu karakter bisa menurunkan kepercayaan |
| 6.3 | **Kategori utama: Caterer**, tambahkan "Layanan katering" dan "Toko kue" kalau ada | Kategori menentukan untuk kata kunci apa bisnis Anda boleh muncul |
| 6.4 | **Area layanan & jam buka** diisi sama seperti di website | Bagian dari kecocokan data |
| 6.5 | **Unggah 10 sampai 20 foto asli** (hidangan, meja acara, dapur, logo) 🟡 | Profil berfoto jauh lebih sering diklik daripada yang kosong |
| 6.6 | **Minta ulasan pelanggan**, terutama yang pernah memesan lewat Anda 🟡 | Jumlah dan kesegaran ulasan termasuk faktor peringkat kotak peta |
| 6.7 | **Daftarkan website di [Google Search Console](https://search.google.com/search-console)** lalu kirim `https://nurmarisacatering.biz.id/sitemap.xml` 🟡 | Supaya halaman cepat terindeks. Kode verifikasinya bisa dipasang lewat `.env.local` (lihat README) |
| 6.8 | **Daftar di direktori lokal** (Google Business, Instagram, Facebook, dan direktori UMKM Banjarmasin) 🟢 | Menambah jalur orang menemukan bisnis Anda |

Satu hal yang jujur perlu dikatakan: **tidak ada yang bisa menjamin peringkat 1.** Yang bisa
dilakukan adalah membuat website-nya rapi dan informatif, lalu memastikan profil Google-nya
lengkap. Peringkat ditentukan Google dari gabungan keduanya, dan berubah dari waktu ke waktu.
Yang jelas, website ini sekarang sudah menyiapkan semua bagian yang dibaca Google.

---

## 7. Setelah Anda mengirim sisa bagian 2

1. Testimoni asli saya susun jadi section "Kata Mereka" di halaman utama, lengkap dengan nama
   akunnya, dan bahasanya saya rapikan tanpa mengubah makna.
2. Jam akhir pekan, nomor sertifikat halal, dan kode pos saya masukkan ke tempat yang tepat.
3. Foto acara Anda menggantikan foto brosur di galeri.
4. Hasilnya saya periksa di layar HP (320 px) dan desktop sebelum saya laporkan.
