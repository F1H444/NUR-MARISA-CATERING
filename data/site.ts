import {
  BadgeCheck,
  ClipboardList,
  ListChecks,
  Soup,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { menuCategories, menuItems } from "@/data/menu";
import { priceListFile } from "@/data/price-list";

/** Nomor WhatsApp dalam format internasional tanpa tanda baca,
 *  karena itulah format yang dipakai tautan wa.me.
 *  Semua tautan WhatsApp di website diturunkan dari satu nilai ini. */
const whatsappNumber = "6285820531295";
/** Versi tampilan dari nomor yang sama, supaya mudah dibaca pengunjung. */
const whatsappLabel = "+62 858-2053-1295";

/** Alamat resmi website. Dipakai metadata, sitemap, robots, dan structured data,
 *  jadi semuanya menunjuk ke satu domain yang sama. */
export const siteUrl = "https://nurmarisacatering.biz.id";

/** Nama bisnis seperti yang terdaftar di Google Maps.
 *  Dipakai untuk peta dan tombol petunjuk arah supaya keduanya menunjuk ke
 *  kartu bisnis resmi kami. Kalau dipatok ke koordinat hasil hitung sendiri,
 *  titiknya bisa beda dengan yang dilihat orang saat mencari kami di Google. */
export const googleMapsQuery = "Nur Marisa Catering Banjarmasin";

/** Tautan petunjuk arah: tujuan diambil dari kartu bisnis yang sama,
 *  jadi pelanggan diantar ke titik yang sama seperti saat mereka mencari
 *  sendiri nama Nur Marisa Catering di Google Maps. */
export const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(googleMapsQuery)}`;

/** Tautan ke kartu bisnis kami di Google Maps. Dipakai sebagai `hasMap` dan
 *  `sameAs` pada structured data supaya Google bisa mencocokkan website ini
 *  dengan profil bisnisnya. */
export const googleMapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery)}`;

/** Data kontak, narasi, dan pengaturan dasar bisnis.
 *  Semua yang tampil di website diambil dari sini supaya mudah diubah. */
export const site = {
  name: "Nur Marisa Catering",
  shortName: "Nur Marisa",
  /** Logo asli dari folder public. */
  logo: { src: "/logo.png", alt: "Logo Nur Marisa Catering" },
  /** Slogan dari pemilik. */
  tagline: "Cita rasa otentik di setiap hidangan.",
  /** Tahun dapur ini mulai menerima pesanan. */
  foundedYear: 2017,
  description:
    "Mulai paket piringan, prasmanan, nasi kotak, sampai cemilan, es termos, dan aqiqah. Bisa dipesan untuk acara keluarga, kantor, atau syukuran di Banjarmasin dan sekitarnya.",
  city: "Banjarmasin",
  address:
    "Jl. Perdagangan, Komplek HKSN Permai Blok 1A No. 35, RT 26, Alalak Utara, Banjarmasin Utara, Banjarmasin 70125",
  addressShort: "Komplek HKSN Permai, Banjarmasin Utara",
  googleMapsUrl: googleMapsDirectionsUrl,
  phoneLabel: whatsappLabel,
  phoneHref: `tel:+${whatsappNumber}`,
  whatsappNumber,
  /** Jam dapur buka. Pemilik hanya menyebut jam hari kerja. */
  operationalHours: [{ day: "Senin - Jumat", time: "07.00 - 21.00" }],
  orderNote:
    "Sebagian besar paket minimal 100 pax. Piringan dan nasi kotak free ongkir se-Banjarmasin.",
  /** Uang muka dan cara bayar sengaja tidak dijanjikan di website.
   *  Pemilik memutuskan semuanya dibicarakan langsung saat pemesanan. */
  paymentNote:
    "Soal uang muka, cara bayar, dan pelunasan, kami bicarakan langsung lewat WhatsApp saat pesanan dikonfirmasi, menyesuaikan jumlah tamu dan tanggal acaranya.",
  socials: [
    {
      label: "Instagram",
      href: "https://instagram.com/nurmarisacatering",
      handle: "@nurmarisacatering",
    },
    { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}`, handle: whatsappLabel },
  ],
  /** Hanya wilayah yang benar-benar dijanjikan: free ongkir wilayah Banjarmasin
   *  tercetak di price list untuk piringan dan nasi kotak. Untuk paket lain
   *  brosur tidak mencantumkan catatan ongkir, jadi tidak dijanjikan di sini. */
  serviceAreas: ["Banjarmasin"],
} as const;

/** Kalimat area layanan yang dipakai di beberapa tempat sekaligus. */
export const serviceAreaLabel = `${site.serviceAreas.join(", ")} dan sekitarnya`;

/** URL WhatsApp dengan pesan siap kirim. */
export function whatsappUrl(
  message = "Halo Nur Marisa Catering, saya ingin bertanya tentang paket catering.",
) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type NavLink = { label: string; href: string };

/** Dipakai bersama oleh Navbar, Footer, dan section CTA. */
export const navLinks: NavLink[] = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Kenalan", href: "/#kenalan" },
  { label: "Visi & Misi", href: "/#visi-misi" },
  { label: "Mengapa Kami", href: "/#mengapa-kami" },
  { label: "Menu", href: "/menu" },
  { label: "Ketentuan", href: "/#ketentuan" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Kontak", href: "/#kontak" },
];

export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

/** Statistik di hero. Hanya berisi angka yang dihitung langsung dari price list
 *  resmi, bukan klaim yang tidak bisa dibuktikan. Jadi tidak akan pernah
 *  bertentangan dengan brosur. */
export const stats: Stat[] = [
  { value: menuItems.length, suffix: "", label: "Pilihan menu" },
  { value: menuCategories.length, suffix: "", label: "Kategori menu" },
  { value: priceListFile.pages, suffix: "", label: "Halaman price list" },
];

export type Advantage = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** Keunggulan yang bisa dibuktikan: ketentuan di price list resmi, sertifikat
 *  halal, dan kebiasaan kerja yang memang dijalankan. */
export const advantages: Advantage[] = [
  {
    icon: Wallet,
    title: "Harga lengkap di price list",
    description:
      "Per pax, per box, per piringan, sampai per termos, semuanya ada di brosur. Silakan unduh dan cek dulu sebelum memesan.",
  },
  {
    icon: BadgeCheck,
    title: "Bersertifikat halal",
    description:
      "Masakan kami bersertifikat halal, jadi tamu tidak perlu ragu soal bahannya.",
  },
  {
    icon: Soup,
    title: "Piringan full service",
    description:
      "Pelayan jaga meja, ambil piring kotor, sampai cuci piring. Semuanya sudah termasuk di paket piringan premium.",
  },
  {
    icon: Truck,
    title: "Free ongkir piringan & nasi kotak",
    description:
      "Ongkir wilayah Banjarmasin gratis untuk paket piringan dan nasi kotak, sesuai catatan di brosur kami.",
  },
  {
    icon: ClipboardList,
    title: "Ketentuan jelas dari awal",
    description:
      "Minimal order, isi tiap paket, dan catatan ongkirnya tertulis di price list, jadi bisa dibaca dulu sebelum memesan.",
  },
  {
    icon: ListChecks,
    title: "Aqiqah siap bagikan",
    description:
      "Satu ekor kambing jadi 150 potong, sudah lengkap dengan acar buah, sambal goreng hati, bawang goreng, dan krupuk.",
  },
];

export type OrderFact = { title: string; detail: string };

/** Ketentuan & fasilitas yang tampil di halaman utama.
 *  Semua baris di bawah disalin dari brosur price list resmi, jadi apa pun yang
 *  dibaca pengunjung di website sama dengan yang tertulis di brosur. */
export const orderFacts: OrderFact[] = [
  {
    title: "Minimal order 100 pax",
    detail:
      "Ada di brosur untuk paket prasmanan, nasi kotak, cemilan, aneka kue, minuman, dan bakso daging sapi.",
  },
  {
    title: "Piringan mulai 250 pax",
    detail:
      "Paket minimalis bisa mulai 250 pax tanpa full service, sedangkan paket premium minimal 500 pax.",
  },
  {
    title: "Free ongkir wilayah Banjarmasin",
    detail:
      "Untuk paket piringan dan nasi kotak, ongkir wilayah Banjarmasin gratis, sesuai catatan di brosur.",
  },
  {
    title: "Bonus pesanan piringan 2.000 pax",
    detail: "Kami tambah 6 meja saji dan 6 gubukan untuk pesanannya.",
  },
  {
    title: "Prasmanan full service",
    detail: "Catatan di brosur: minimal pemesanan 100 pax, dan pelayanannya full service.",
  },
  {
    title: "Es termos dapat gelas & sendok",
    detail: "Setiap pesanan es termos dapat free gelas dan sendok plastik.",
  },
  {
    title: "Aqiqah mulai Rp 3.700.000",
    detail:
      "Satu ekor kambing jadi 150 potong, lengkap dengan acar buah, sambal goreng hati kambing, bawang goreng, dan krupuk.",
  },
  {
    title: "Semua harga tertulis per satuan",
    detail:
      "Di brosur harganya per satuan, bukan borongan: per piringan, per pax, per box, per gelas, per termos, per nampan, sampai per ekor. Tinggal dikalikan jumlah yang dipesan.",
  },
];

export const visionMission = {
  vision:
    "Jadi catering rumahan yang paling dipercaya di Banjarmasin dan sekitarnya. Masakan tetap terasa seperti masakan rumah, dikerjakan rapi, dan harganya masih masuk buat keluarga.",
  mission: [
    "Masak pakai bahan yang dibeli segar dan bumbu alami, sebisa mungkin tanpa pengawet.",
    "Jaga rasa, porsi, dan waktu antar tetap sama di setiap pesanan.",
    "Balas pertanyaan pelanggan dengan jujur, sebisa mungkin cepat.",
    "Ikut melibatkan warga sekitar dapur, terutama saat pesanan sedang menumpuk.",
  ],
  motto: "Masak dengan hati, sajikan dengan ramah.",
  values: [
    { title: "Jujur", description: "Harga dan porsinya sesuai yang kami tulis di price list." },
    { title: "Teliti", description: "Tiap pesanan kami cek ulang sebelum dikirim." },
    { title: "Ramah", description: "Pelanggan kami layani seperti tamu di rumah sendiri." },
  ],
};

export const about = {
  eyebrow: "Kenalan Yuk!",
  title: "Ceritanya mulai dari dapur rumah di Banjarmasin",
  paragraphs: [
    "Semuanya mulai dari dapur rumah di Banjarmasin. Awalnya cuma hobi masak masakan khas, hasilnya sering dibagikan ke kerabat.",
    "Lama-lama pesanan datang dari syukuran kecil-kecilan, karena rasanya pas dan dapurnya dijaga bersih. Sekarang, dari acara keluarga sampai acara kantor, sudah ada paket piringan, prasmanan, nasi kotak, cemilan, sampai aqiqah.",
    "Semua harga dan isi paketnya ada di brosur price list kami, silakan dicek dulu. Kalau sudah cocok, tinggal kirim tanggal acara, jumlah tamu, dan lokasinya lewat WhatsApp.",
  ],
  highlights: [
    {
      label: "Minimal order",
      value: "Mulai 100 pax",
      description:
        "Sebagian besar paket minimal 100 pax. Piringan minimalis mulai 250 pax, premium mulai 500 pax.",
    },
    {
      label: "Piringan full service",
      value: "Sampai cuci piring",
      description:
        "Paket piringan premium sudah termasuk pelayan yang jaga meja, angkat piring kotor, dan cuci piring.",
    },
    {
      label: "Free ongkir",
      value: "Piringan & nasi kotak",
      description:
        "Ongkir wilayah Banjarmasin gratis untuk dua paket ini, sesuai catatan di brosur kami.",
    },
  ],
  /** Foto asli dari brosur price list kami, bukan foto stok. */
  image: {
    src: "/images/menu/pi-minimalis.jpg",
    alt: "Pelayanan pesanan Nur Marisa Catering di lokasi acara",
  },
};
