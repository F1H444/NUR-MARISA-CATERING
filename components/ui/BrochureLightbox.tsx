"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { priceListFile, type PriceListPage } from "@/data/price-list";

type BrochureLightboxProps = {
  /** Seluruh halaman yang bisa dinavigasi di pembesaran (bisa lebih banyak dari kartu yang tampil). */
  pages: PriceListPage[];
  /** Halaman yang sedang terbuka; null berarti tertutup. */
  openIndex: number | null;
  onClose: () => void;
  onStep: (delta: number) => void;
};

/**
 * Pembesaran halaman brosur yang dipakai bersama oleh halaman menu (grid 11
 * halaman) dan halaman utama (kartu pratinjau). Kunci gulir halaman saat
 * terbuka, dan mendukung Escape plus tombol panah untuk berpindah halaman.
 */
export function BrochureLightbox({ pages, openIndex, onClose, onStep }: BrochureLightboxProps) {
  const isOpen = openIndex !== null;
  const activePage = isOpen ? pages[openIndex] : null;

  // Saat pembesaran terbuka: kunci gulir halaman dan dukung tombol panah/Escape.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, onStep]);

  if (!activePage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Halaman ${activePage.page}: ${activePage.label}`}
      className="fixed inset-0 z-[60] flex flex-col bg-pine-900/90 p-3 backdrop-blur-sm sm:p-5"
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        tabIndex={-1}
      />

      <div className="relative mx-auto flex w-full max-w-[900px] items-center justify-between gap-3 rounded-full border border-forest-800 bg-forest-900 px-3 py-2">
        <p className="truncate pl-2 text-sm font-semibold text-cream-50">
          {activePage.label}
          <span className="ml-2 font-normal text-gold-300">
            Hal {activePage.page} / {priceListFile.pages}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Tutup pembesaran"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400 text-pine-900 transition-colors duration-200 hover:bg-gold-300"
        >
          <X size={17} aria-hidden />
        </button>
      </div>

      {/* `fill` + `object-contain` memakai seluruh ruang yang tersisa supaya
          halaman benar-benar terbaca besar, bukan sebatas tinggi gambarnya. */}
      <div className="relative mx-auto mt-3 min-h-0 w-full max-w-[900px] flex-1">
        <Image
          src={activePage.src}
          alt={`Halaman ${activePage.page} brosur price list Nur Marisa Catering, ${activePage.label}`}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          loading="eager"
          className="object-contain drop-shadow-2xl"
        />

        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Halaman sebelumnya"
          className="absolute top-1/2 left-0 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-forest-700 bg-forest-900/90 text-cream-50 transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-200"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>

        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Halaman berikutnya"
          className="absolute top-1/2 right-0 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-forest-700 bg-forest-900/90 text-cream-50 transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-200"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
