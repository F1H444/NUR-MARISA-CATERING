export type MenuCategoryId =
  | "piringan"
  | "prasmanan"
  | "nasi-kotak"
  | "cemilan"
  | "kue"
  | "minuman"
  | "es-termos"
  | "spesial"
  | "aqiqah";

export type MenuCategory = {
  id: MenuCategoryId;
  name: string;
  description: string;
  /** Catatan penting yang dicetak pada price list, mis. minimal order. */
  note?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategoryId;
  description: string;
  /** null berarti harga belum tercantum di price list. */
  price: number | null;
  unit: string;
  /** Rincian isi paket sesuai price list. */
  includes?: string[];
  minOrder?: string;
  /** Foto menu dari brosur. Hanya diisi untuk hidangan yang fotonya tampil di
   *  website (hero, section Kenalan, atau galeri); sisanya sengaja dikosongkan
   *  supaya tidak ada data yang menunjuk berkas yang tidak ada. */
  image?: string;
  tags: string[];
  /** Menu unggulan yang tampil di Halaman Utama. */
  featured?: boolean;
};

/** Foto menu hasil ekstraksi price list PDF.
 *  Sumber dan pemetaannya ada di scripts/build-menu-images.mjs. */
function menuPhoto(id: string) {
  return `/images/menu/${id}.jpg`;
}

/* Catatan: hanya hidangan yang fotonya benar-benar tampil di website yang
 * memakai `image`. Jadi tidak ada item menu yang menunjuk berkas gambar yang
 * sudah dihapus. Kalau nanti semua foto mau dipasang lagi, jalankan dua skrip
 * di README (extract lalu build) dan kembalikan baris `image`-nya. */

export const menuCategories: MenuCategory[] = [
  {
    id: "piringan",
    name: "Piringan",
    description:
      "Sistem piringan untuk resepsi dengan tamu banyak: satu tamu satu piringan lengkap.",
    note: "Minimal pemesanan 500 pax untuk paket premium. Paket minimalis bisa mulai 250 pax tanpa full service. Pemesanan 2.000 pax bonus 6 meja saji dan 6 gubukan. Free ongkir wilayah Banjarmasin.",
  },
  {
    id: "prasmanan",
    name: "Prasmanan",
    description: "Prasmanan dengan meja saji dan pelayan yang menjaga meja Anda.",
    note: "Minimal pemesanan 100 pax dengan full service.",
  },
  {
    id: "nasi-kotak",
    name: "Nasi Kotak",
    description: "Nasi kotak siap santap untuk rapat, pengajian, dan syukuran.",
    note: "Minimal order 100 pax. Free ongkir wilayah Banjarmasin.",
  },
  {
    id: "cemilan",
    name: "Menu Cemilan Kekinian",
    description: "Cemilan kekinian sebagai pelengkap acara. Harganya bersahabat, rasanya hebat.",
    note: "Minimal order 100 pax.",
  },
  {
    id: "kue",
    name: "Aneka Kue",
    description: "Kue basah dan kue kering untuk meja saji maupun bingkisan tamu.",
    note: "Minimal order 100 pax. Harga per jenis belum tercantum di price list. Silakan tanyakan lewat WhatsApp.",
  },
  {
    id: "minuman",
    name: "Minuman Segar",
    description: "Racikan minuman segar Fauget Segar, dikirim dingin bersama es.",
    note: "Minimal order 100 pax.",
  },
  {
    id: "es-termos",
    name: "Es Termos",
    description: "Es dalam termos besar, tamu bisa menyendok sendiri di meja acara.",
    note: "Free gelas dan sendok plastik.",
  },
  {
    id: "spesial",
    name: "Menu Spesial",
    description: "Porsi besar untuk melengkapi meja saji, termasuk masakan khas Banjar.",
    note: "Minimal order 100 pax, tercetak di halaman bakso. Rujak buah dan mie habang dijual per nampan atau porsi besar.",
  },
  {
    id: "aqiqah",
    name: "Aqiqah (Fauget)",
    description: "Layanan aqiqah Fauget sesuai syariat, berpengalaman melayani banyak keluarga.",
    note: "Harga mulai dari 3,7 juta per ekor kambing (150 potong).",
  },
];

export const menuItems: MenuItem[] = [
  // Piringan
  {
    id: "pi-minimalis",
    name: "Paket Piringan Minimalis",
    category: "piringan",
    description: "Satu piringan lengkap untuk satu tamu, tanpa pelayanan meja.",
    price: 13000,
    unit: "piringan",
    includes: ["Nasi putih", "Lauk"],
    minOrder: "Mulai 250 pax",
    image: menuPhoto("pi-minimalis"),
    tags: [],
  },
  {
    id: "pi-premium",
    name: "Paket Piringan Premium",
    category: "piringan",
    description: "Piringan lengkap dengan full service: pelayan jaga meja hingga cuci piring.",
    price: 15000,
    unit: "piringan",
    includes: [
      "Nasi putih",
      "Lauk",
      "Piring",
      "Tisu",
      "Sendok",
      "Pelayan cuci piring",
      "Pelayan ambil piring kotor",
      "Pelayan jaga meja",
      "Full service",
    ],
    minOrder: "Minimal 500 pax",
    image: menuPhoto("pi-premium"),
    tags: ["Full service"],
    featured: true,
  },

  // Prasmanan
  {
    id: "pr-hemat",
    name: "Paket Prasmanan Hemat",
    category: "prasmanan",
    description: "Paket prasmanan harian dengan lauk ayam dan sup hangat.",
    price: 40000,
    unit: "pax",
    includes: [
      "Nasi",
      "Olahan ayam",
      "Sambal goreng hati ayam",
      "Sup kimlo",
      "Krupuk",
      "Tisu",
      "Air mineral gelas",
      "Sambel",
    ],
    minOrder: "Minimal 100 pax",
    image: menuPhoto("pr-hemat"),
    tags: [],
  },
  {
    id: "pr-premium",
    name: "Paket Prasmanan Premium",
    category: "prasmanan",
    description: "Dua olahan lauk, mie goreng spesial, dan buah segar sebagai penutup.",
    price: 45000,
    unit: "pax",
    includes: [
      "Nasi",
      "Olahan daging sapi",
      "Olahan ayam",
      "Sup kimlo / mutiara",
      "Mie goreng spesial",
      "Krupuk",
      "Buah",
      "Tisu",
      "Air mineral gelas",
      "Sambel",
    ],
    minOrder: "Minimal 100 pax",
    image: menuPhoto("pr-premium"),
    tags: ["Paling sering dipesan"],
    featured: true,
  },
  {
    id: "pr-banjar",
    name: "Paket Prasmanan Masakan Banjar",
    category: "prasmanan",
    description: "Olahan ikan sungai, gangan khas Banjar, dan sambel acan.",
    price: 45000,
    unit: "pax",
    includes: [
      "Nasi",
      "Olahan ikan (patin, nila, tongkol, peda)",
      "Sayur / gangan khas Banjar",
      "Ikan kering sepat",
      "Ampal jagung",
      "Urap / sayur oseng",
      "Sambel acan",
      "Air mineral gelas",
      "Tisu",
    ],
    minOrder: "Minimal 100 pax",
    image: menuPhoto("pr-banjar"),
    tags: ["Khas Banjar"],
    featured: true,
  },

  // Nasi Kotak
  {
    id: "nk-hemat",
    name: "Nasi Kotak Paket Hemat",
    category: "nasi-kotak",
    description: "Nasi kotak harian dengan lauk ayam, sayur, dan kerupuk.",
    price: 22000,
    unit: "box",
    includes: [
      "Nasi",
      "Olahan lauk ayam",
      "Sambal goreng hati",
      "Sayur",
      "Krupuk",
      "Air mineral gelas",
      "Sambel",
      "Sendok",
    ],
    minOrder: "Minimal 100 pax",
    image: menuPhoto("nk-hemat"),
    tags: [],
  },
  {
    id: "nk-premium",
    name: "Nasi Kotak Paket Premium",
    category: "nasi-kotak",
    description: "Lauk daging atau ayam ditambah olahan telur dan buah segar.",
    price: 25000,
    unit: "box",
    includes: [
      "Nasi",
      "Olahan lauk daging / ayam",
      "Olahan lauk telur",
      "Sayur",
      "Krupuk",
      "Air mineral gelas",
      "Buah",
      "Sambel",
      "Sendok",
    ],
    minOrder: "Minimal 100 pax",
    tags: ["Free ongkir Banjarmasin"],
    featured: true,
  },

  // Cemilan
  {
    id: "cm-batagor",
    name: "Batagor",
    category: "cemilan",
    description: "Batagor goreng dengan bumbu kacang, digoreng pada hari pengiriman.",
    price: 7000,
    unit: "porsi",
    tags: [],
  },
  {
    id: "cm-jasuke",
    name: "Jasuke",
    category: "cemilan",
    description: "Jagung susu keju manis gurih, disajikan dalam cup.",
    price: 5000,
    unit: "porsi",
    tags: [],
  },
  {
    id: "cm-dimsum",
    name: "Dimsum",
    category: "cemilan",
    description: "Dimsum kukus berisi ayam, dikemas per porsi siap santap.",
    price: 3000,
    unit: "porsi",
    tags: [],
  },
  {
    id: "cm-siomay",
    name: "Siomay",
    category: "cemilan",
    description: "Siomay kukus dengan saus kacang, jeruk limau, dan kecap.",
    price: 8000,
    unit: "porsi",
    image: menuPhoto("cm-siomay"),
    tags: [],
  },
  {
    id: "cm-pentol",
    name: "Pentol Mercon",
    category: "cemilan",
    description: "Pentol sapi berkuah pedas khas, cocok untuk tamu yang suka pedas.",
    price: 6000,
    unit: "porsi",
    tags: ["Pedas"],
  },
  {
    id: "cm-kebab",
    name: "Kebab",
    category: "cemilan",
    description: "Kebab isi daging dan sayur dengan saus mayo, dibungkus per porsi.",
    price: 7000,
    unit: "porsi",
    tags: [],
  },

  // Aneka kue (harga belum tercantum pada price list)
  {
    id: "ku-brownis",
    name: "Brownis Kukus",
    category: "kue",
    description: "Brownis kukus lembut dan legit, dipotong rapi per box.",
    price: null,
    unit: "box",
    image: menuPhoto("ku-brownis"),
    tags: [],
  },
  {
    id: "ku-puding",
    name: "Puding",
    category: "kue",
    description: "Puding lembut dengan saus vla, tersedia beberapa pilihan rasa.",
    price: null,
    unit: "box",
    tags: [],
  },
  {
    id: "ku-kue-sus",
    name: "Kue Sus",
    category: "kue",
    description: "Kue sus isi vla manis dengan kulit renyah.",
    price: null,
    unit: "box",
    tags: [],
  },
  {
    id: "ku-risol",
    name: "Risol",
    category: "kue",
    description: "Risol mayones isi ayam dan telur, digoreng saat hari pengiriman.",
    price: null,
    unit: "box",
    tags: [],
  },
  {
    id: "ku-pie-buah",
    name: "Pie Buah",
    category: "kue",
    description: "Pie buah dengan vla lembut dan aneka buah segar di atasnya.",
    price: null,
    unit: "box",
    tags: [],
  },
  {
    id: "ku-kue-basah",
    name: "Kue Basah",
    category: "kue",
    description: "Aneka kue basah tradisional, pilihan jenis menyesuaikan permintaan.",
    price: null,
    unit: "box",
    tags: [],
  },

  // Minuman
  {
    id: "mn-kopi-susu",
    name: "Kopi Susu",
    category: "minuman",
    description: "Kopi susu gula aren, disajikan dingin dalam gelas.",
    price: 10000,
    unit: "gelas",
    tags: [],
  },
  {
    id: "mn-es-teler",
    name: "Es Teler",
    category: "minuman",
    description: "Es teler dengan kelapa muda, nangka, dan susu.",
    price: 10000,
    unit: "gelas",
    tags: [],
  },
  {
    id: "mn-thai-tea",
    name: "Thai Tea",
    category: "minuman",
    description: "Thai tea creamy dengan es batu, manisnya bisa disesuaikan.",
    price: 7000,
    unit: "gelas",
    tags: [],
  },
  {
    id: "mn-es-dawet",
    name: "Es Dawet",
    category: "minuman",
    description: "Es dawet gula merah dengan santan dan cincau.",
    price: 6000,
    unit: "gelas",
    tags: [],
  },
  {
    id: "mn-matcha",
    name: "Matcha",
    category: "minuman",
    description: "Matcha latte dingin dengan susu segar.",
    price: 7000,
    unit: "gelas",
    tags: [],
  },
  {
    id: "mn-jus-buah",
    name: "Jus Buah",
    category: "minuman",
    description: "Jus buah segar tanpa pemanis tambahan, pilihan buah menyesuaikan musim.",
    price: 7000,
    unit: "gelas",
    tags: [],
  },

  // Es termos
  {
    id: "et-sarang-burung",
    name: "Es Sarang Burung",
    category: "es-termos",
    description: "Es sarang burung dalam termos besar, disendok sendiri oleh tamu.",
    price: 300000,
    unit: "termos",
    tags: [],
  },
  {
    id: "et-melon",
    name: "Es Melon",
    category: "es-termos",
    description: "Es melon segar dengan sirup dan susu dalam termos.",
    price: 300000,
    unit: "termos",
    tags: [],
  },
  {
    id: "et-buah-jadul",
    name: "Es Buah Jadul",
    category: "es-termos",
    description: "Es buah jadul dengan aneka potongan buah dan kuah susu.",
    price: 350000,
    unit: "termos",
    image: menuPhoto("et-buah-jadul"),
    tags: [],
    featured: true,
  },
  {
    id: "et-jeruk",
    name: "Es Jeruk / Sirup / Teh",
    category: "es-termos",
    description: "Pilihan minuman sederhana dalam termos, disajikan dingin.",
    price: 300000,
    unit: "termos",
    image: menuPhoto("et-jeruk"),
    tags: [],
  },

  // Menu spesial
  {
    id: "sp-rujak",
    name: "Rujak Buah",
    category: "spesial",
    description: "Rujak buah dalam nampan besar, lengkap dengan piring dan garpu.",
    price: 300000,
    unit: "nampan",
    includes: ["Lengkap piring dan garpu"],
    tags: [],
  },
  {
    id: "sp-bakso",
    name: "Bakso Daging Sapi",
    category: "spesial",
    description: "Bakso sapi berkuah hangat, gurih, dan siap disajikan di lokasi acara.",
    price: 13000,
    unit: "porsi",
    image: menuPhoto("sp-bakso"),
    tags: [],
  },
  {
    id: "sp-mie-habang",
    name: "Mie Habang Banjar",
    category: "spesial",
    description: "Mie habang khas Banjar dengan kuah merah dan suwiran ayam.",
    price: 300000,
    unit: "porsi besar",
    image: menuPhoto("sp-mie-habang"),
    tags: ["Khas Banjar"],
  },

  // Aqiqah
  {
    id: "aq-kambing",
    name: "Paket Aqiqah Kambing",
    category: "aqiqah",
    description: "Satu ekor kambing berisi 150 potong, dimasak dan dikemas siap bagikan.",
    price: 3700000,
    unit: "ekor",
    includes: [
      "1 ekor kambing (150 potong)",
      "Acar buah",
      "Sambal goreng hati kambing",
      "Bawang goreng",
      "Krupuk",
    ],
    tags: ["Mulai dari 3,7 juta"],
    featured: true,
  },
];

/** Harga terendah di satu kategori, dihitung dari data menu. Dipakai untuk
 *  label "mulai dari" dan untuk structured data, jadi angkanya selalu ikut
 *  kalau harga di brosur berubah. */
export function lowestPriceIn(category: MenuCategoryId) {
  return menuItems.reduce<number>((lowest, item) => {
    if (item.category !== category || item.price === null) return lowest;
    return Math.min(lowest, item.price);
  }, Number.POSITIVE_INFINITY);
}

/** Harga piringan termurah di price list, dipakai sebagai patokan "mulai dari"
 *  pada kartu harga di hero. Sengaja dibatasi ke kategori piringan supaya label
 *  "per piringan" tetap akurat (harga termurah keseluruhan justru cemilan).
 *  Dihitung dari data, jadi tidak akan basi kalau harga di brosur berubah. */
export const lowestPiringanPrice = menuItems.reduce<number>(
  (lowest, item) =>
    item.category === "piringan" && item.price !== null && item.price < lowest
      ? item.price
      : lowest,
  Number.POSITIVE_INFINITY,
);

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Berkas price list PDF beserta gambar tiap halamannya ada di `data/price-list.ts`.
