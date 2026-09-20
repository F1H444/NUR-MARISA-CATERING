import type { Metadata } from "next";
import { Manrope, Urbanist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/data/site";
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
  metadataBase: new URL("https://nurmarisacatering.biz.id"),
  title: {
    default: `${site.name}: Catering Piringan, Prasmanan & Nasi Kotak ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "catering banjarmasin",
    "prasmanan banjarmasin",
    "nasi kotak banjarmasin",
    "paket piringan",
    "cemilan kekinian",
    "aqiqah banjarmasin",
    "nur marisa catering",
  ],
  openGraph: {
    title: `${site.name}: Catering untuk Setiap Acara`,
    description: site.description,
    type: "website",
    locale: "id_ID",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
