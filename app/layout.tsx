import type { Metadata } from "next";
import { Manrope, Urbanist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { site, siteUrl } from "@/data/site";
import { businessSchema, websiteSchema } from "@/data/structured-data";
import "./globals.css";

// Judul memakai Urbanist (geometris, lebih halus dari Poppins),
// isi dan antarmuka memakai Manrope.
const headingFont = Urbanist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  /* Judul utama sengaja memuat kata kunci pencarian yang paling penting
     ("catering banjarmasin") sekaligus nama bisnisnya. */
  title: {
    default: `Catering ${site.city} & Nasi Kotak: ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Catering Banjarmasin untuk piringan, prasmanan, nasi kotak, cemilan, sampai aqiqah. Harga per satuan tertulis di brosur price list, minimal order mulai 100 pax.",
  applicationName: site.name,
  keywords: [
    "catering banjarmasin",
    "catering banjarmasin murah",
    "prasmanan banjarmasin",
    "nasi kotak banjarmasin",
    "paket piringan banjarmasin",
    "catering aqiqah banjarmasin",
    "catering acara kantor banjarmasin",
    "cemilan kekinian banjarmasin",
    "es termos catering",
    "nur marisa catering",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "Catering",
  /* Kode verifikasi Google Search Console tinggal diisi lewat variabel
     lingkungan NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION di .env.local. Kalau
     kosong, barisnya tidak ikut dipasang. */
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  /* Nama bisnis, telepon, dan alamat dibiarkan dideteksi otomatis oleh ponsel. */
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: site.name,
    countryName: "Indonesia",
    title: `Catering ${site.city} untuk Setiap Acara: ${site.name}`,
    description:
      "Piringan, prasmanan, nasi kotak, cemilan, sampai aqiqah. Harga lengkap ada di brosur price list. Melayani Banjarmasin dan sekitarnya.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: Catering ${site.city}`,
    description:
      "Piringan, prasmanan, nasi kotak, cemilan, sampai aqiqah untuk acara di Banjarmasin dan sekitarnya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-forest-950 text-cream-100 antialiased">
        {/* Keterangan bisnis untuk Google: alamat, telepon, jam buka, dan
            daftar menu. Dipasang di layout supaya berlaku di semua halaman. */}
        <JsonLd data={[businessSchema, websiteSchema]} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
