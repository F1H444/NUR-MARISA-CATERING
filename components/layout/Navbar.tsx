"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, MessageCircle, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { navLinks, whatsappUrl } from "@/data/site";

const SECTION_IDS = navLinks
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.slice(2));

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("beranda");

  // Panel mobile ditutup otomatis saat rute berubah karena statusnya
  // diturunkan dari perbandingan path, tanpa perlu effect tambahan.
  const [menuState, setMenuState] = useState({ open: false, path: pathname });
  const isMenuOpen = menuState.open && menuState.path === pathname;

  const isHome = pathname === "/";

  // Navbar mengapung: saat halaman digulir, warna kartu dibuat lebih pekat.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy sederhana untuk menandai menu yang sedang dilihat.
  useEffect(() => {
    if (!isHome) return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const toggleMenu = () =>
    setMenuState((state) => ({
      open: !(state.open && state.path === pathname),
      path: pathname,
    }));

  const closeMenu = () => setMenuState({ open: false, path: pathname });

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen, pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/menu") return pathname === "/menu";
    if (!isHome) return false;
    return href === `/#${activeSection}`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={[
          "mx-auto flex max-w-[1200px] items-center gap-3 rounded-full border px-3 py-2.5 transition-colors duration-300 sm:px-4",
          isScrolled
            ? "border-gold-400/25 bg-forest-950 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)]"
            : "border-forest-800 bg-forest-900",
        ].join(" ")}
      >
        {/* Logo */}
        <Link
          href="/#beranda"
          className="group flex shrink-0 items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
        >
          <BrandMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-[1.04]" priority />
          <span className="font-display text-[1.0625rem] leading-none font-semibold text-cream-50">
            nur marisa
            <span className="text-gold-300"> catering.</span>
          </span>
        </Link>

        {/* Navigasi desktop */}
        <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-gold-400 text-forest-950"
                    : "text-forest-200 hover:bg-forest-800 hover:text-cream-50",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          {/* CTA utama */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-gold-500 bg-gold-400 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-forest-950 transition-colors duration-200 hover:bg-gold-300 sm:inline-flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-forest-950 text-gold-300">
              <MessageCircle size={14} aria-hidden />
            </span>
            Pesan Sekarang
          </a>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            className="grid h-10 w-10 place-items-center rounded-full bg-cream-50 text-forest-950 transition-colors duration-200 hover:bg-cream-100 lg:hidden"
          >
            {isMenuOpen ? <X size={18} aria-hidden /> : <MenuIcon size={18} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Panel navigasi mobile: inert saat tertutup agar tidak ikut ter-fokus */}
      <div
        inert={!isMenuOpen}
        className={[
          "mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-4xl border border-forest-800 bg-forest-900 transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          isMenuOpen ? "max-h-[36rem] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Navigasi mobile">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={[
                  "rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200",
                  active
                    ? "bg-gold-400 text-forest-950"
                    : "text-forest-200 hover:bg-forest-800 hover:text-cream-50",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-400 px-4 py-3 text-sm font-semibold text-forest-950"
          >
            <MessageCircle size={16} aria-hidden />
            Pesan Sekarang
          </a>
        </nav>
      </div>
    </header>
  );
}
