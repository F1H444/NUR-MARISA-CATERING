import { faqItems } from "@/data/faq";
import {
  formatRupiah,
  lowestPiringanPrice,
  lowestPriceIn,
  menuCategories,
  menuItems,
} from "@/data/menu";
import { priceListFile, priceListPath } from "@/data/price-list";
import { googleMapsPlaceUrl, site, siteUrl } from "@/data/site";

/**
 * Structured data (schema.org) yang dipasang di halaman sebagai JSON-LD.
 * Tujuannya satu: memberi Google keterangan yang bisa dibaca mesin tentang
 * bisnis ini, supaya muncul sebagai hasil lokal dengan alamat, telepon, jam
 * buka, dan daftar menu. Semua isinya diambil dari data yang sama dengan yang
 * tampil di layar, jadi tidak mungkin berbeda dengan yang dibaca pengunjung.
 */

/** Nama hari bahasa Indonesia ke nama yang dipakai schema.org. */
const dayNames: Record<string, string> = {
  senin: "Monday",
  selasa: "Tuesday",
  rabu: "Wednesday",
  kamis: "Thursday",
  jumat: "Friday",
  sabtu: "Saturday",
  minggu: "Sunday",
};

const dayOrder = Object.values(dayNames);

/** "Senin - Jumat" jadi daftar hari, dan rentangnya diperluas jadi lima hari. */
function toDayOfWeek(label: string) {
  const parts = label
    .toLowerCase()
    .split(/\s*(?:-|–|,|sampai|s\/d)\s*/)
    .map((part) => dayNames[part.trim()])
    .filter(Boolean);

  const [first, last] = [parts[0], parts[parts.length - 1]];
  if (first && last && parts.length >= 2) {
    const from = dayOrder.indexOf(first);
    const to = dayOrder.indexOf(last);
    if (from !== -1 && to >= from) return dayOrder.slice(from, to + 1);
  }
  return parts;
}

/** "07.00 - 21.00" jadi jam buka format 24 jam yang diminta schema.org. */
function toClockRange(time: string) {
  const [opens, closes] = time.match(/\d{1,2}[.:]\d{2}/g) ?? [];
  if (!opens || !closes) return null;
  const toClock = (value: string) => value.replace(".", ":").padStart(5, "0");
  return { opens: toClock(opens), closes: toClock(closes) };
}

const openingHoursSpecification = site.operationalHours.flatMap((entry) => {
  const range = toClockRange(entry.time);
  if (!range) return [];
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: toDayOfWeek(entry.day),
      opens: range.opens,
      closes: range.closes,
    },
  ];
});

/** Harga per satuan tiap menu, dipakai di dalam daftar menu structured data. */
function menuItemSchema(item: (typeof menuItems)[number]) {
  return {
    "@type": "MenuItem",
    name: item.name,
    description: item.description,
    /* Foto hanya dicantumkan kalau berkasnya memang ada, supaya Google tidak
       menerima tautan gambar yang rusak. */
    ...(item.image ? { image: `${siteUrl}${item.image}` } : {}),
    ...(item.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: item.price,
              priceCurrency: "IDR",
              unitText: item.unit,
            },
          },
        }
      : {}),
  };
}

/** Profil bisnis lokal: nama, alamat, telepon, jam buka, dan area layanan. */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  "@id": `${siteUrl}/#bisnis`,
  name: site.name,
  alternateName: `Catering ${site.city} ${site.name}`,
  description: site.description,
  url: siteUrl,
  telephone: `+${site.whatsappNumber}`,
  foundingDate: String(site.foundedYear),
  priceRange: "Rp 13.000 - Rp 45.000",
  image: [
    `${siteUrl}${site.logo.src}`,
    `${siteUrl}/images/menu/pi-premium.jpg`,
    `${siteUrl}/images/menu/pr-premium.jpg`,
  ],
  logo: `${siteUrl}${site.logo.src}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Perdagangan, Komplek HKSN Permai Blok 1A No. 35, RT 26",
    addressLocality: "Banjarmasin Utara",
    addressRegion: "Kalimantan Selatan",
    postalCode: "70125",
    addressCountry: "ID",
  },
  areaServed: [
    { "@type": "City", name: "Banjarmasin" },
    { "@type": "AdministrativeArea", name: "Banjarmasin dan sekitarnya" },
  ],
  servesCuisine: ["Masakan Banjar", "Masakan Indonesia", "Catering"],
  hasMap: googleMapsPlaceUrl,
  /* Hanya profil resmi: Instagram dan kartu bisnis Google. Tautan WhatsApp
     tidak dimasukkan karena itu bukan halaman profil. */
  sameAs: [
    ...site.socials.filter((social) => social.label !== "WhatsApp").map((social) => social.href),
    googleMapsPlaceUrl,
  ],
  ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
  hasMenu: { "@id": `${siteUrl}/menu#daftar-menu` },
  makesOffer: [
    {
      "@type": "Offer",
      name: `Paket piringan mulai ${formatRupiah(lowestPiringanPrice)} per piringan`,
      price: lowestPiringanPrice,
      priceCurrency: "IDR",
      category: "Catering piringan",
    },
    {
      "@type": "Offer",
      name: `Paket prasmanan mulai ${formatRupiah(lowestPriceIn("prasmanan"))} per pax`,
      price: lowestPriceIn("prasmanan"),
      priceCurrency: "IDR",
      category: "Catering prasmanan",
    },
    {
      "@type": "Offer",
      name: `Nasi kotak mulai ${formatRupiah(lowestPriceIn("nasi-kotak"))} per box`,
      price: lowestPriceIn("nasi-kotak"),
      priceCurrency: "IDR",
      category: "Nasi kotak",
    },
    {
      "@type": "Offer",
      name: `Aqiqah Fauget mulai ${formatRupiah(lowestPriceIn("aqiqah"))} per ekor kambing`,
      price: lowestPriceIn("aqiqah"),
      priceCurrency: "IDR",
      category: "Aqiqah",
    },
  ],
  subjectOf: {
    "@type": "DigitalDocument",
    name: "Brosur price list Nur Marisa Catering",
    url: `${siteUrl}${priceListPath}`,
    numberOfPages: priceListFile.pages,
  },
};

/** Daftar menu lengkap, dikelompokkan per kategori seperti di brosur. */
export const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": `${siteUrl}/menu#daftar-menu`,
  name: `Price list ${site.name}`,
  description: `Daftar harga catering ${site.name}: paket piringan, prasmanan, nasi kotak, cemilan, aneka kue, minuman, es termos, menu spesial, dan aqiqah.`,
  url: `${siteUrl}/menu`,
  inLanguage: "id-ID",
  hasMenuSection: menuCategories.map((category) => ({
    "@type": "MenuSection",
    name: category.name,
    description: category.description,
    hasMenuItem: menuItems
      .filter((item) => item.category === category.id)
      .map(menuItemSchema),
  })),
};

/** Tanya jawab, supaya jawabannya bisa tampil langsung di hasil pencarian. */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/#tanya-jawab`,
  inLanguage: "id-ID",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/** Keterangan situs: bahasa, nama, dan pemiliknya. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#situs`,
  url: siteUrl,
  name: site.name,
  inLanguage: "id-ID",
  publisher: { "@id": `${siteUrl}/#bisnis` },
};

/** Jejak navigasi halaman menu, supaya alamatnya tampil rapi di hasil Google. */
export const menuBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Menu & Price List", item: `${siteUrl}/menu` },
  ],
};
