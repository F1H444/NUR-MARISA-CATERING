export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** Menentukan luas area pada bento grid galeri. */
  span: "4x4" | "8x4" | "4x8" | "8x8";
};

/**
 * Semua foto di sini adalah foto asli dari brosur price list kami sendiri
 * (hasil ekstraksi PDF-nya), bukan foto stok. Caption menyebut hidangan yang
 * memang terlihat pada fotonya, jadi tidak ada gambar yang diberi keterangan
 * yang tidak sesuai.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    src: "/images/menu/pr-hemat.jpg",
    alt: "Meja sajian berisi aneka lauk untuk acara",
    caption: "Meja sajian acara",
    span: "8x8",
  },
  {
    id: "g-2",
    src: "/images/menu/nk-hemat.jpg",
    alt: "Nasi dengan lauk lengkap di atas daun pisang",
    caption: "Nasi dengan lauk lengkap",
    span: "4x4",
  },
  {
    id: "g-3",
    src: "/images/menu/pr-banjar.jpg",
    alt: "Nasi box paket prasmanan berisi nasi dan lauknya",
    caption: "Paket prasmanan",
    span: "4x4",
  },
  {
    id: "g-4",
    src: "/images/menu/et-buah-jadul.jpg",
    alt: "Es buah dalam wadah kaca",
    caption: "Es buah",
    span: "4x8",
  },
  {
    id: "g-5",
    src: "/images/menu/sp-bakso.jpg",
    alt: "Bakso daging sapi berkuah dengan pangsit",
    caption: "Bakso daging sapi",
    span: "4x4",
  },
  {
    id: "g-6",
    src: "/images/menu/sp-mie-habang.jpg",
    alt: "Mie habang khas Banjar dengan cabai",
    caption: "Mie habang Banjar",
    span: "4x4",
  },
  {
    id: "g-7",
    src: "/images/menu/ku-brownis.jpg",
    alt: "Brownis kukus potong",
    caption: "Brownis kukus",
    span: "4x4",
  },
  {
    id: "g-8",
    src: "/images/menu/cm-siomay.jpg",
    alt: "Siomay dengan saus kacang dan jeruk limau",
    caption: "Siomay",
    span: "4x4",
  },
];
