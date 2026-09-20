import Image from "next/image";
import { Camera } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { galleryItems, type GalleryItem } from "@/data/gallery";

const spanClass: Record<GalleryItem["span"], string> = {
  "4x4": "col-span-1 row-span-1",
  "8x4": "col-span-2 row-span-1",
  "4x8": "col-span-1 row-span-2",
  "8x8": "col-span-2 row-span-2",
};

export function Gallery() {
  return (
    <Section id="galeri" className="bg-forest-950">
      <Container>
        <SectionHeading
          eyebrow="Galeri"
          title="Hidangan kami, apa adanya"
          description="Semua foto di halaman ini diambil dari brosur resmi kami. Tidak ada foto sewaan, dan hidangannya memang seperti itu."
          action={
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-400/30 bg-forest-900 px-4 py-2 text-xs font-semibold text-gold-300">
              <Camera size={15} aria-hidden />
              Foto dari brosur resmi
            </span>
          }
        />

        <div className="mt-14 grid auto-rows-[9.5rem] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[12.5rem]">
          {galleryItems.map((item, index) => (
            <Reveal
              key={item.id}
              variant="zoom"
              delay={(index % 4) * 80}
              className={["h-full", spanClass[item.span]].join(" ")}
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-3xl border border-forest-800 bg-forest-900">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full border border-gold-400/25 bg-forest-950/90 px-3 py-1.5 text-[11px] font-medium text-cream-50 backdrop-blur-sm">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
