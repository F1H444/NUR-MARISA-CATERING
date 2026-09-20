"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Download, FileText, ZoomIn } from "lucide-react";
import { BrochureLightbox } from "@/components/ui/BrochureLightbox";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { priceListFile, priceListPages, priceListPath } from "@/data/price-list";

/**
 * Brosur price list: setiap halaman PDF ditampilkan sebagai gambar, sehingga
 * bisa dibaca langsung di halaman menu, termasuk di ponsel yang tidak punya
 * penampil PDF bawaan. Di layar besar panel informasi menempel di kiri
 * sementara halaman brosur disusun dua kolom di kanan. Klik satu halaman untuk
 * memperbesarnya lewat BrochureLightbox.
 */
export function PriceListBrochure() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + priceListPages.length) % priceListPages.length;
    });
  }, []);

  return (
    <Section id="price-list" className="bg-forest-900">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Panel informasi: menempel saat digulir di layar besar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                layout="stack"
                eyebrow="Brosur resmi"
                title="Brosur price list Nur Marisa Catering"
                description="Seluruh daftar harga kami, halaman per halaman, persis seperti brosur yang kami bagikan ke pelanggan."
              />

              <div className="mt-8 flex flex-col items-start gap-3">
                <Button
                  href={priceListPath}
                  size="lg"
                  icon={<Download size={18} aria-hidden />}
                  download
                >
                  Unduh brosur PDF
                </Button>

                <p className="flex items-center gap-1.5 text-xs text-ash">
                  <FileText size={13} aria-hidden />
                  {priceListFile.pages} halaman · PDF · {priceListFile.sizeLabel}
                </p>
              </div>

              <p className="mt-6 hidden items-center gap-2 rounded-full border border-forest-800 bg-forest-950 px-4 py-2 text-xs font-medium text-forest-200 lg:inline-flex">
                <ZoomIn size={14} className="text-gold-400" aria-hidden />
                Klik salah satu halaman untuk memperbesarnya
              </p>
            </div>
          </div>

          {/* Halaman brosur */}
          <div className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {priceListPages.map((page, index) => (
                <Reveal key={page.page} delay={(index % 2) * 70}>
                  <div className="group h-full">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-label={`Perbesar halaman ${page.page}: ${page.label}`}
                      /* Bingkai krem dipertahankan: halaman brosur sendiri berlatar hijau
                         tua, jadi bingkai terang membuatnya terbaca seperti brosur cetak. */
                      className="flex w-full flex-col rounded-4xl border border-gold-400/20 bg-cream-100 p-2.5 text-left shadow-soft outline-none transition-colors duration-300 hover:border-gold-400/55 focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-900"
                    >
                      <span className="relative block overflow-hidden rounded-3xl bg-forest-950">
                        <Image
                          src={page.src}
                          alt={`Halaman ${page.page} brosur price list Nur Marisa Catering, ${page.label}`}
                          width={page.width}
                          height={page.height}
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                          className="h-auto w-full"
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
          </div>
        </div>
      </Container>

      {/* Pembesaran halaman: komponen bersama dengan halaman utama */}
      <BrochureLightbox pages={priceListPages} openIndex={openIndex} onClose={close} onStep={step} />
    </Section>
  );
}
