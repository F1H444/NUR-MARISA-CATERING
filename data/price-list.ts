/**
 * Price list resmi dalam dua bentuk:
 * 1. berkas PDF asli di folder public (untuk diunduh), dan
 * 2. gambar tiap halamannya, supaya brosur bisa ditampilkan langsung di
 *    halaman menu, termasuk di ponsel yang tidak bisa menggelar PDF di
 *    dalam halaman.
 *
 * Gambar `page-NN.jpg` dihasilkan oleh `scripts/render-price-list-pages.mjs`.
 * Ukuran width/height di bawah disalin dari manifest skrip tersebut dan dipakai
 * `next/image` supaya tata letak tidak bergeser saat gambar dimuat.
 */

/** Path berkas PDF asli (ada di folder public). */
export const priceListPath = "/" + encodeURIComponent("Price list Nurmarisa Catering.pdf");

export const priceListFile = {
  /** Jumlah halaman yang dirender. */
  pages: 11,
  /** Ukuran berkas PDF di folder public, ditampilkan apa adanya ke pengunjung.
   *  Berkas ini hasil kompresi scripts/compress-price-list-pdf.mjs; versi asli
   *  (34 MB) disimpan di assets-src/ sebagai sumber. */
  sizeLabel: "3,8 MB",
  width: 1300,
  height: 1839,
} as const;

/** Satu halaman brosur, lengkap dengan judul isinya. */
export type PriceListPage = {
  page: number;
  src: string;
  label: string;
  width: number;
  height: number;
};

export const priceListPages: PriceListPage[] = [
  { page: 1, src: "/images/price-list/page-01.jpg", label: "Price list piringan", width: 1300, height: 1839 },
  { page: 2, src: "/images/price-list/page-02.jpg", label: "Aqiqah Fauget", width: 1300, height: 1839 },
  { page: 3, src: "/images/price-list/page-03.jpg", label: "Paket prasmanan", width: 1300, height: 1839 },
  { page: 4, src: "/images/price-list/page-04.jpg", label: "Nasi kotak", width: 1300, height: 1839 },
  { page: 5, src: "/images/price-list/page-05.jpg", label: "Cemilan kekinian", width: 1300, height: 1839 },
  { page: 6, src: "/images/price-list/page-06.jpg", label: "Aneka kue", width: 1300, height: 1839 },
  { page: 7, src: "/images/price-list/page-07.jpg", label: "Minuman fauget segar", width: 1300, height: 1839 },
  { page: 8, src: "/images/price-list/page-08.jpg", label: "Rujak buah", width: 1300, height: 1839 },
  { page: 9, src: "/images/price-list/page-09.jpg", label: "Bakso daging sapi", width: 1300, height: 1839 },
  { page: 10, src: "/images/price-list/page-10.jpg", label: "Mie Habang Banjar", width: 1300, height: 1839 },
  { page: 11, src: "/images/price-list/page-11.jpg", label: "Es termos", width: 1300, height: 1839 },
];
