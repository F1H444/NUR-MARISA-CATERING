import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { PriceListBrochure } from "@/components/menu/PriceListBrochure";
import { OrderSteps } from "@/components/menu/OrderSteps";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata: Metadata = {
  title: "Menu & Price List",
  description:
    "Price list lengkap Nur Marisa Catering: paket piringan, prasmanan, nasi kotak, cemilan, aneka kue, minuman, es termos, menu spesial, dan aqiqah, langsung dari brosur resmi kami.",
};

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <PriceListBrochure />
      <OrderSteps />
      {/* Tanpa tombol "Lihat Menu": pengunjung sudah ada di halaman menu. */}
      <CtaBanner
        title="Mau tanya dulu sebelum pesan?"
        description="Ceritakan tanggal dan jumlah tamu Anda, kami bantu pilihkan paket yang paling pas. Tidak dipungut biaya."
        showMenuButton={false}
      />
    </>
  );
}
