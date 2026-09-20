import { formatRupiah, lowestPiringanPrice, menuItems } from "@/data/menu";
import { priceListFile } from "@/data/price-list";
import { serviceAreaLabel, site } from "@/data/site";

export type FaqItem = { question: string; answer: string };

/** Harga piringan premium, dipakai di jawaban FAQ dan dihitung dari data menu
 *  supaya tidak pernah bertentangan dengan brosur. */
const premiumPiringan = menuItems.find((item) => item.id === "pi-premium");
const aqiqahPaket = menuItems.find((item) => item.id === "aq-kambing");

/**
 * Pertanyaan yang benar-benar ditanyakan calon pelanggan sebelum memesan.
 * Semua jawabannya diambil dari data yang sama dengan isi website (brosur price
 * list, keterangan pemilik, dan info kontak), jadi tidak ada klaim baru yang
 * muncul hanya di sini. Dipakai dua tempat sekaligus: section FAQ di halaman
 * utama dan structured data FAQPage, supaya jawabannya bisa tampil langsung di
 * hasil pencarian Google.
 */
export const faqItems: FaqItem[] = [
  {
    question: "Berapa harga catering per piringan?",
    answer: `Paket minimalis ${formatRupiah(lowestPiringanPrice)} per piringan, isinya nasi putih dan lauk. Paket premium ${
      premiumPiringan?.price ? formatRupiah(premiumPiringan.price) : ""
    } per piringan, sudah full service: ada piring, tisu, sendok, sampai pelayan yang jaga meja, angkat piring kotor, dan cuci piring.`,
  },
  {
    question: "Minimal pesannya berapa pax?",
    answer:
      "Paket prasmanan, nasi kotak, cemilan, aneka kue, minuman, dan bakso minimal 100 pax. Khusus piringan, paket minimalis bisa mulai 250 pax tanpa full service, sedangkan paket premium minimal 500 pax. Untuk rujak buah, mie habang, dan es termos hitungannya beda, karena dijual per nampan, porsi besar, atau per termos.",
  },
  {
    question: "Ongkir ke lokasi acara dikenakan biaya?",
    answer:
      "Paket piringan dan nasi kotak gratis ongkir untuk wilayah Banjarmasin, itu tertulis di brosur kami. Kalau paket lainnya atau acaranya di luar Banjarmasin, ongkirnya kami kabari saat pemesanan.",
  },
  {
    question: "Daerah mana saja yang dilayani?",
    answer: `Dapur kami ada di ${site.addressShort}, dan kami melayani pesanan untuk acara di ${serviceAreaLabel}.`,
  },
  {
    question: "Bagaimana cara pesannya?",
    answer: `Pilih dulu paket dan jumlahnya dari brosur price list kami, lalu chat WhatsApp ke ${site.phoneLabel}. Kirim tanggal acara, jumlah tamu, dan lokasinya, nanti kami kabari rincian harganya dan tanggalnya masih kosong atau tidak.`,
  },
  {
    question: "Soal uang muka dan pembayaran bagaimana?",
    answer: site.paymentNote,
  },
  {
    question: "Ada paket aqiqah?",
    answer: `Ada. Paket aqiqah Fauget mulai ${
      aqiqahPaket?.price ? formatRupiah(aqiqahPaket.price) : "Rp 3.700.000"
    } untuk satu ekor kambing yang jadi 150 potong, sudah lengkap dengan acar buah, sambal goreng hati kambing, bawang goreng, dan krupuk.`,
  },
  {
    question: "Bisa lihat daftar harga lengkapnya dulu?",
    answer: `Bisa, dan memang sebaiknya begitu. Brosur price list kami ${priceListFile.pages} halaman, bisa dibaca halaman per halaman di menu atau diunduh gratis sebagai PDF. Harganya tertulis per satuan, jadi bisa dihitung sendiri dulu.`,
  },
  {
    question: "Masakannya halal?",
    answer: "Ya, sudah bersertifikat halal, jadi tamu tidak perlu ragu soal bahannya.",
  },
  {
    question: "Bisa pesan untuk acara kantor, rapat, atau syukuran?",
    answer:
      "Bisa. Nasi kotak biasanya dipakai untuk rapat dan pengajian, piringan dan prasmanan untuk resepsi, syukuran, dan acara keluarga. Cemilan, aneka kue, minuman, dan es termos biasanya dipesan sebagai pelengkap meja saji.",
  },
];
