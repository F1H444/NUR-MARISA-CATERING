import Image from "next/image";
import { ClipboardList, Quote, Soup, Truck } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { about, site } from "@/data/site";

const highlightIcons = [ClipboardList, Soup, Truck];

export function About() {
  return (
    <Section id="kenalan" className="bg-forest-900">
      <Container>
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Foto dapur & acara */}
          <Reveal variant="left" className="lg:col-span-7">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-4xl border border-forest-800 bg-forest-900 sm:min-h-[26rem]">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-forest-700 bg-forest-900/95 p-5 backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:max-w-md">
                <Quote size={18} className="text-gold-400" aria-hidden />
                <p className="mt-2 text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
                  &ldquo;{site.tagline}&rdquo;
                </p>
                <p className="mt-3 font-display text-sm font-semibold text-cream-50">
                  {site.name} · {site.city}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Narasi. Heading sengaja dibuat bertumpuk dengan ukuran rapat: kolom ini
              hanya selebar 5/12 grid, jadi kalau dipisah dua kolom judulnya terpecah
              jadi empat baris pendek dan terlihat berantakan. */}
          <Reveal variant="right" delay={100} className="lg:col-span-5">
            <div className="flex h-full min-w-0 flex-col justify-center rounded-4xl border border-forest-800 bg-forest-900 p-7 sm:p-9">
              <SectionHeading
                layout="stack"
                size="compact"
                eyebrow={about.eyebrow}
                title={about.title}
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ash sm:text-[0.9375rem]">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Kartu ringkasan */}
          {about.highlights.map((highlight, index) => {
            const Icon = highlightIcons[index] ?? ClipboardList;
            return (
              <Reveal key={highlight.label} delay={index * 90} className="lg:col-span-4">
                <div className="flex h-full flex-col gap-4 rounded-4xl border border-forest-800 bg-forest-900 p-6 transition-colors duration-300 hover:border-gold-400/35 sm:p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-gold-400 uppercase">
                      {highlight.label}
                    </p>
                    <p className="mt-2 font-display text-lg leading-snug font-semibold text-cream-50">
                      {highlight.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ash">{highlight.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
