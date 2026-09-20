import { About } from "@/components/home/About";
import { ContactLocation } from "@/components/home/ContactLocation";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { MenuPreview } from "@/components/home/MenuPreview";
import { PackageFacts } from "@/components/home/PackageFacts";
import { VisionMission } from "@/components/home/VisionMission";
import { WhyUs } from "@/components/home/WhyUs";
import { CtaBanner } from "@/components/shared/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <VisionMission />
      <WhyUs />
      <MenuPreview />
      <PackageFacts />
      <Gallery />
      <ContactLocation />
      <CtaBanner />
    </>
  );
}
