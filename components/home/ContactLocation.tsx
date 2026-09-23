import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { LocationMap } from "@/components/map/LocationMap";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { serviceAreaLabel, site, whatsappUrl } from "@/data/site";

/** Sama seperti peta: arahkan ke alamat lengkap, bukan hanya koordinat. */
const mapLink = site.googleMapsUrl;

const socialLinks = [
  { label: "Instagram", href: site.socials[0].href, icon: InstagramIcon },
  { label: "WhatsApp", href: whatsappUrl(), icon: MessageCircle },
];

export function ContactLocation() {
  return (
    <Section id="kontak" className="bg-forest-900">
      <Container>
        <SectionHeading
          eyebrow="Kontak & Lokasi"
          title="Mampir ke dapur kami di Banjarmasin, atau chat saja lebih dulu"
          description="Kalau mau lihat sendiri tempat kami masak, alamat lengkapnya ada di bawah. Untuk pesanan, WhatsApp yang paling cepat dibalas."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Info kontak: min-w-0 supaya kolom boleh menyusut di layar 320px */}
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <Reveal variant="left">
              <div className="rounded-4xl border border-forest-800 bg-forest-950 p-7">
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
                  Hubungi kami
                </p>

                <ul className="mt-5 space-y-3">
                  <li>
                    <a
                      href={site.phoneHref}
                      className="flex items-center gap-4 rounded-3xl border border-forest-800 bg-forest-900 px-4 py-3.5 transition-colors duration-200 hover:border-gold-400/40"
                    >
                      <Phone size={18} className="text-gold-400" aria-hidden />
                      <span>
                        <span className="block text-[11px] tracking-wide text-ash uppercase">
                          Telepon
                        </span>
                        <span className="text-sm font-semibold text-cream-50">
                          {site.phoneLabel}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-3xl border border-forest-800 bg-forest-900 px-4 py-3.5 transition-colors duration-200 hover:border-gold-400/40"
                    >
                      <MessageCircle size={18} className="text-gold-400" aria-hidden />
                      <span>
                        <span className="block text-[11px] tracking-wide text-ash uppercase">
                          WhatsApp
                        </span>
                        <span className="text-sm font-semibold text-cream-50">
                          {site.phoneLabel}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900 px-3.5 py-2 text-xs font-semibold text-cream-100 transition-colors duration-200 hover:border-gold-400/45 hover:text-gold-200"
                    >
                      <Icon size={14} aria-hidden />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variant="left" delay={90}>
              <div className="rounded-4xl border border-forest-800 bg-forest-950 p-7">
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
                  Alamat &amp; jam operasional
                </p>

                <div className="mt-5 flex gap-4">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
                  <p className="text-sm leading-relaxed text-cream-100">{site.address}</p>
                </div>

                <div className="mt-5 flex gap-4">
                  <Clock size={18} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
                  <dl className="w-full space-y-1.5 text-sm">
                    {site.operationalHours.map((entry) => (
                      <div key={entry.day} className="flex justify-between gap-4">
                        <dt className="text-ash">{entry.day}</dt>
                        <dd className="font-medium text-cream-50">{entry.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <p className="mt-6 rounded-3xl border border-forest-800 bg-forest-900 px-4 py-3.5 text-xs leading-relaxed text-forest-200">
                  {site.orderNote}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Peta lokasi */}
          <Reveal variant="right" delay={120} className="min-w-0 lg:col-span-7">
            <div className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-4xl border border-forest-800 bg-forest-950">
              <div className="relative min-h-[22rem] flex-1 bg-forest-900">
                <LocationMap />
              </div>

              <div className="flex flex-col gap-4 border-t border-forest-800 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-800 text-gold-300">
                    <MapPin size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream-50">
                      Dapur &amp; kantor pemesanan kami
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ash">
                      {site.addressShort} · Melayani {serviceAreaLabel}
                    </p>
                  </div>
                </div>

                <Button
                  href={mapLink}
                  variant="secondary"
                  icon={<ExternalLink size={16} aria-hidden />}
                  className="shrink-0"
                >
                  Petunjuk arah
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
