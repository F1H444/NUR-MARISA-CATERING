import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { ContactLocation } from "@/components/home/ContactLocation";
import { Faq } from "@/components/home/Faq";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { MenuPreview } from "@/components/home/MenuPreview";
import { PackageFacts } from "@/components/home/PackageFacts";
import { VisionMission } from "@/components/home/VisionMission";
import { WhyUs } from "@/components/home/WhyUs";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/data/structured-data";
import { site, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  /* Alamat resmi halaman ini, supaya versi lain (mis. dengan parameter) tidak
     dianggap halaman terpisah oleh mesin pencari. */
  alternates: { canonical: "/" },
  openGraph: {
    title: `Catering ${site.city} untuk Setiap Acara: ${site.name}`,
    url: siteUrl,
  },
};

export default function HomePage() {
  return (
    <>
      {/* Tanya jawab dipasang sebagai structured data supaya jawabannya bisa
          tampil langsung di hasil pencarian. Isinya sama dengan section FAQ. */}
      <JsonLd data={faqSchema} />
      <Hero />
      <About />
      <VisionMission />
      <WhyUs />
      <MenuPreview />
      <PackageFacts />
      <Gallery />
      <Faq />
      <ContactLocation />
      <CtaBanner />
    </>
  );
}
