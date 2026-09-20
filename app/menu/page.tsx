import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { PriceListBrochure } from "@/components/menu/PriceListBrochure";
import { OrderSteps } from "@/components/menu/OrderSteps";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { formatRupiah, lowestPiringanPrice, lowestPriceIn } from "@/data/menu";
import { siteUrl } from "@/data/site";
import { menuBreadcrumbSchema, menuSchema } from "@/data/structured-data";

export const metadata: Metadata = {
  title: "Menu & Harga Catering Banjarmasin",
  description: `Daftar harga catering Banjarmasin: piringan mulai ${formatRupiah(
    lowestPiringanPrice,
  )}, prasmanan mulai ${formatRupiah(lowestPriceIn("prasmanan"))}, nasi kotak mulai ${formatRupiah(
    lowestPriceIn("nasi-kotak"),
  )}, cemilan, minuman, es termos, sampai aqiqah. Lengkap dari brosur resmi kami.`,
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu & Harga Catering Banjarmasin",
    description:
      "Brosur price list 11 halaman: paket piringan, prasmanan, nasi kotak, cemilan, aneka kue, minuman, es termos, menu spesial, dan aqiqah.",
    url: `${siteUrl}/menu`,
  },
};

export default function MenuPage() {
  return (
    <>
      {/* Daftar menu dan jejak navigasi dalam bentuk structured data, supaya
          Google tahu halaman ini memuat harga catering yang bisa dipesan. */}
      <JsonLd data={[menuSchema, menuBreadcrumbSchema]} />
      <MenuHero />
      <PriceListBrochure />
      <OrderSteps />
      {/* Tanpa tombol "Lihat Menu": pengunjung sudah ada di halaman menu. */}
      <CtaBanner
        title="Mau tanya dulu sebelum pesan?"
        description="Ceritakan tanggal dan jumlah tamunya, kami bantu pilihkan yang paling pas dari price list kami."
        showMenuButton={false}
      />
    </>
  );
}
