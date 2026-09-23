import Link from "next/link";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Section";
import { priceListPath } from "@/data/price-list";
import { navLinks, serviceAreaLabel, site, whatsappUrl } from "@/data/site";

/** Kolom "Menu & Harga": semuanya menuju anchor yang benar-benar ada.
 *  Tautan langsung ke halaman menu tidak dipakai di sini karena kolom
 *  "Jelajahi" di sebelah sudah punya tautan Menu, dan tautan yang sama akan
 *  mengarah ke halaman itu sendiri kalau pengunjung sedang di /menu. */
const menuLinks = [
  { label: "Price list lengkap", href: "/menu#price-list" },
  { label: "Cara pesan", href: "/menu#cara-pesan" },
  { label: "Tanya jawab", href: "/#faq" },
];

/** Sama dengan navigasi utama, ditambah tautan ke section tanya jawab yang
 *  tidak muat kalau dimasukkan ke navbar. */
const footerLinks = [...navLinks, { label: "Tanya jawab", href: "/#faq" }];

const socials = [
  { label: "Instagram", href: site.socials[0].href, icon: InstagramIcon },
  { label: "WhatsApp", href: whatsappUrl(), icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="border-t border-forest-900 bg-forest-950 text-forest-200">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Identitas bisnis */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <BrandMark className="h-11 w-11" />
              <div>
                <p className="font-display text-lg leading-tight font-semibold text-cream-50">
                  {site.name}
                </p>
                <p className="text-xs text-gold-300">
                  Catering rumahan sejak {site.foundedYear} · {site.city}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-forest-200">
              {site.description}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-forest-800 bg-forest-900 text-forest-200 transition-colors duration-200 hover:border-gold-400/45 hover:text-gold-200"
                >
                  <Icon size={17} aria-hidden />
                </a>
              ))}
            </div>

          </div>

          {/* Navigasi */}
          <nav className="lg:col-span-2" aria-label="Navigasi footer">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Jelajahi
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-forest-200 transition-colors duration-200 hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu & harga */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Menu &amp; Harga
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-forest-200 transition-colors duration-200 hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={priceListPath}
                  download
                  className="text-forest-200 transition-colors duration-200 hover:text-gold-200"
                >
                  Unduh brosur PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Hubungi
            </p>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-gold-500" aria-hidden />
                <span className="leading-relaxed text-forest-200">{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-gold-500" aria-hidden />
                <a
                  href={site.phoneHref}
                  className="text-forest-200 transition-colors duration-200 hover:text-gold-200"
                >
                  {site.phoneLabel}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-gold-500" aria-hidden />
                <span className="leading-relaxed text-forest-200">
                  {site.operationalHours.map((entry) => (
                    <span key={entry.day} className="block">
                      {entry.day}: {entry.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-forest-800 pt-6 text-xs text-forest-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-ash">
            Melayani {serviceAreaLabel} · Dapur di {site.addressShort}
          </p>
        </div>
      </Container>
    </footer>
  );
}
