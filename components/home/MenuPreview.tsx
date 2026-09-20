"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ArrowRight, UtensilsCrossed, ZoomIn } from "lucide-react";
import { BrochureLightbox } from "@/components/ui/BrochureLightbox";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { priceListFile, priceListPages } from "@/data/price-list";
import { whatsappUrl } from "@/data/site";

/** Enam halaman pertama brosur sebagai intipan; sisanya ada di halaman menu. */
const previewPages = priceListPages.slice(0, 6);

/**
 * Pratinjau brosur di halaman utama. Klik kartu membuka pembesaran langsung di
 * sini, tanpa perlu pindah ke halaman menu dulu, dan dari pembesaran itu
 * semua 11 halaman tetap bisa dinavigasi.
 */
export function MenuPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + priceListPages.length) % priceListPages.length;
    });
  }, []);

  return (
    <Section id="intip-menu" className="bg-forest-950">
      <Container>
        <SectionHeading
          eyebrow="Intip Menu"
          title="Price list kami, langsung dari brosur resmi"
          description="Klik halamannya untuk membacanya lebih besar. Daftar lengkapnya ada di halaman menu."
          action={
            <Button
              href="/menu"
              size="lg"
              icon={<ArrowRight size={18} aria-hidden />}
              iconPosition="right"
            >
              Lihat Semua Menu
            </Button>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {previewPages.map((page, index) => (
            <Reveal key={page.page} delay={(index % 3) * 90}>
              <div className="group h-full">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`Perbesar halaman ${page.page}: ${page.label}`}
                  className="flex w-full flex-col rounded-4xl border border-gold-400/20 bg-cream-100 p-2.5 text-left shadow-soft outline-none transition-colors duration-300 hover:border-gold-400/55 focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950"
                >
                  <span className="relative block overflow-hidden rounded-3xl bg-forest-950">
                    <Image
                      src={page.src}
                      alt={`Halaman ${page.page} brosur price list Nur Marisa Catering, ${page.label}`}
                      width={page.width}
                      height={page.height}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 grid place-items-center bg-forest-950/0 transition-colors duration-300 group-hover:bg-forest-950/25"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-forest-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ZoomIn size={18} aria-hidden />
                      </span>
                    </span>
                  </span>

                  <span className="flex items-center justify-between gap-3 px-1.5 pt-3 pb-0.5">
                    <span className="font-display text-sm font-semibold text-forest-950">
                      {page.label}
                    </span>
                    <span className="shrink-0 text-[11px] font-semibold tracking-[0.14em] text-forest-700 uppercase">
                      Hal {page.page} / {priceListFile.pages}
                    </span>
                  </span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Strip penutup grid */}
        <Reveal delay={120}>
          <div className="mt-5 flex flex-col items-start gap-6 rounded-4xl border border-forest-800 bg-forest-900 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300">
                <UtensilsCrossed size={21} aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-cream-50 sm:text-xl">
                  Punya pertanyaan soal paket atau jumlah tamu?
                </p>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-forest-200">
                  Chat saja, kami bantu pilihkan paket yang paling pas dengan jumlah tamu dan
                  anggaran Anda.
                </p>
              </div>
            </div>

            <Button
              href={whatsappUrl("Halo, saya ingin meminta susunan paket catering khusus.")}
              variant="light"
              size="lg"
              className="shrink-0"
            >
              Konsultasi Gratis
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* Pembesaran brosur: navigasi tetap bisa menjangkau ke-11 halaman */}
      <BrochureLightbox pages={priceListPages} openIndex={openIndex} onClose={close} onStep={step} />
    </Section>
  );
}
