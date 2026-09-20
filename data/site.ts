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

/** Nama bisnis seperti yang terdaftar di Google Maps.
 *  Dipakai untuk peta dan tombol petunjuk arah supaya keduanya menunjuk ke
 *  kartu bisnis resmi kami. Kalau dipatok ke koordinat hasil hitung sendiri,
 *  titiknya bisa beda dengan yang dilihat orang saat mencari kami di Google. */
export const googleMapsQuery = "Nur Marisa Catering Banjarmasin";

/** Tautan petunjuk arah: tujuan diambil dari kartu bisnis yang sama,
 *  jadi pelanggan diantar ke titik yang sama seperti saat mereka mencari
 *  sendiri nama Nur Marisa Catering di Google Maps. */
export const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(googleMapsQuery)}`;

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
    "Dari paket piringan, prasmanan, nasi kotak, sampai cemilan, es termos, dan aqiqah. Semuanya bisa dipesan untuk acara keluarga, kantor, atau syukuran di Banjarmasin dan sekitarnya.",
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
    "Sebagian besar paket minimal 100 pax, dan free ongkir untuk acara di Banjarmasin.",
  /** Uang muka dan cara bayar sengaja tidak dijanjikan di website.
   *  Pemilik memutuskan semuanya dibicarakan langsung saat pemesanan. */
  paymentNote:
    "Uang muka, cara bayar, dan pelunasan kami bicarakan langsung lewat WhatsApp saat pesanan dikonfirmasi, menyesuaikan jumlah dan tanggal acaranya.",
  socials: [
    {
      label: "Instagram",
      href: "https://instagram.com/nurmarisacatering",
      handle: "@nurmarisacatering",
    },
    { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}`, handle: whatsappLabel },
  ],
  /** Hanya wilayah yang benar-benar dijanjikan di price list (free ongkir
   *  se-Banjarmasin). Daerah lain belum bisa dipastikan, jadi tidak ditulis. */
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
    title: "Harga terbuka di price list",
    description:
      "Harga per pax, per box, per piringan, sampai per termos ada semua di brosur kami. Silakan unduh dan cek sendiri sebelum memesan.",
  },
  {
    icon: BadgeCheck,
    title: "Sudah bersertifikat halal",
    description:
      "Masakan kami sudah bersertifikat halal, jadi tamu tidak perlu ragu soal bahan maupun cara mengolahnya.",
  },
  {
    icon: Soup,
    title: "Piringan full service",
    description:
      "Pelayan jaga meja, angkat piring kotor, sampai cuci piring. Semuanya sudah termasuk di paket piringan premium.",
  },
  {
    icon: Truck,
    title: "Free ongkir Banjarmasin",
    description: "Selama acaranya di wilayah Banjarmasin, tidak ada tambahan biaya kirim.",
  },
  {
    icon: ClipboardList,
    title: "Ketentuan jelas sejak awal",
    description:
      "Minimal order, isi tiap paket, dan free ongkir wilayah Banjarmasin tertulis di price list, bukan cuma kesepakatan lisan.",
  },
  {
    icon: ListChecks,
    title: "Aqiqah siap bagikan",
    description:
      "Satu ekor kambing jadi 150 potong, sudah termasuk acar buah, sambal goreng hati, bawang goreng, dan krupuk.",
  },
];

export type OrderFact = { title: string; detail: string };

/** Ketentuan & fasilitas yang tampil di halaman utama.
 *  Semua baris di bawah disalin dari brosur price list resmi, jadi apa pun yang
 *  dibaca pengunjung di website sama dengan yang tertulis di brosur. */
export const orderFacts: OrderFact[] = [
  {
    title: "Minimal order 100 pax",
    detail: "Berlaku untuk paket prasmanan, nasi kotak, cemilan, minuman, dan menu spesial.",
  },
  {
    title: "Piringan mulai 250 pax",
    detail: "Paket minimalis bisa mulai 250 pax, sementara paket premium mulai 500 pax.",
  },
  {
    title: "Free ongkir wilayah Banjarmasin",
    detail: "Tidak ada biaya kirim tambahan selama lokasi acaranya ada di Banjarmasin.",
  },
  {
    title: "Bonus pesanan 2.000 pax",
    detail: "Dapat tambahan 6 meja saji dan 6 gubukan dari kami.",
  },
  {
    title: "Prasmanan sudah full service",
    detail: "Meja saji dijaga pelayan selama acara berlangsung, mulai 100 pax.",
  },
  {
    title: "Es termos dapat gelas & sendok",
    detail: "Setiap pesanan es termos gratis gelas dan sendok plastik.",
  },
  {
    title: "Aqiqah mulai Rp 3.700.000",
    detail:
      "Satu ekor kambing jadi 150 potong, lengkap dengan acar buah, sambal goreng hati, bawang goreng, dan krupuk.",
  },
  {
    title: "Semua harga tertulis per satuan",
    detail:
      "Piringan, pax, box, gelas, termos, atau nampan. Tinggal dikalikan jumlah tamu, tanpa biaya tersembunyi.",
  },
];

export const visionMission = {
  vision:
    "Jadi catering rumahan yang paling dipercaya di Banjarmasin dan sekitarnya. Masakan yang rasanya khas rumah, dikerjakan serapi mungkin, dengan harga yang tetap ramah buat keluarga.",
  mission: [
    "Masak pakai bahan yang dibeli segar dan bumbu alami, sebisa mungkin tanpa pengawet.",
    "Jaga rasa, porsi, dan waktu antar tetap sama di setiap pesanan.",
    "Balas pertanyaan pelanggan dengan jujur dan secepat yang kami bisa.",
    "Ikut melibatkan warga sekitar dapur, terutama saat pesanan sedang menumpuk.",
  ],
  motto: "Masak dengan hati, sajikan dengan ramah.",
  values: [
    { title: "Jujur", description: "Harga dan porsi sesuai apa yang kami tulis di price list." },
    { title: "Teliti", description: "Tiap pesanan kami cek ulang sebelum dikirim." },
    { title: "Ramah", description: "Pelanggan kami layani seperti tamu di rumah sendiri." },
  ],
};

export const about = {
  eyebrow: "Kenalan Yuk!",
  title: "Dari dapur rumah, kini melayani acara Anda",
  description: "Ceritanya sederhana, dan semuanya berawal dari dapur rumah di Banjarmasin.",
  paragraphs: [
    "Nur Marisa Catering berawal dari dapur rumah di Banjarmasin, tepatnya dari hobi masak masakan khas yang hasilnya sering dibagikan ke kerabat.",
    "Dari acara syukuran kecil-kecilan, masakan kami makin sering dipesan orang karena rasanya pas dan dapurnya dijaga bersih. Sekarang pesanan datang dari acara keluarga sampai acara kantor, mulai paket piringan, prasmanan, nasi kotak, cemilan, sampai aqiqah.",
    "Harga dan isi tiap paketnya tertulis di brosur price list kami, jadi Anda bisa cek dulu sebelum memesan. Kalau sudah cocok, tinggal kirim tanggal acara, jumlah tamu, dan lokasinya lewat WhatsApp.",
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
      value: "Wilayah Banjarmasin",
      description: "Tidak ada biaya kirim tambahan selama acara Anda ada di Banjarmasin.",
    },
  ],
  /** Foto asli dari brosur price list kami, bukan foto stok. */
  image: {
    src: "/images/menu/pi-minimalis.jpg",
    alt: "Pelayanan pesanan Nur Marisa Catering di lokasi acara",
  },
};
