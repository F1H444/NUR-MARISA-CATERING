import Link from "next/link";
import { ChevronRight, FileText, MessageCircle, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { priceListFile, priceListPages } from "@/data/price-list";
import { whatsappUrl } from "@/data/site";

const highlights = [
  { label: "Paket piringan", value: "13–15 ribu / piringan" },
  { label: "Prasmanan", value: "40–45 ribu / pax" },
  { label: "Nasi kotak", value: "22–25 ribu / box" },
  { label: "Cemilan kekinian", value: "mulai 3 ribu / porsi" },
];

export function MenuHero() {
  return (
    <section id="menu-hero" className="scroll-mt-28 bg-forest-950 pt-28 pb-10 sm:pt-32 lg:pt-36">
      <Container>
        <Reveal variant="fade">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ash">
            <Link href="/" className="transition-colors duration-200 hover:text-gold-200">
              Beranda
            </Link>
            <ChevronRight size={13} aria-hidden />
            <span className="font-semibold text-cream-50">Menu</span>
          </nav>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-forest-900 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-gold-300 uppercase">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Menu Kami
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-6 text-[2.25rem] leading-[1.08] font-semibold text-cream-50 sm:text-4xl lg:text-[3.5rem]">
                Price list lengkap kami,
                <span className="text-gold-300"> langsung dari brosur.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ash">
                Ini persis brosur yang kami bagikan ke pelanggan. Tinggal gulir ke bawah, semua
                harga ada di situ. Kalau ada yang mau ditanyakan, chat kami saja.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="#price-list"
                  size="lg"
                  icon={<FileText size={18} aria-hidden />}
                >
                  Lihat Price List
                </Button>
                <Button
                  href={whatsappUrl("Halo, saya lihat price list-nya, mau tanya-tanya dulu.")}
                  variant="outline"
                  size="lg"
                  icon={<MessageCircle size={18} aria-hidden />}
                >
                  Tanya via WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="right" delay={150}>
              <dl className="grid gap-3 sm:grid-cols-2">
                {highlights.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-4xl border border-forest-800 bg-forest-900 p-5"
                  >
                    <dt className="text-[11px] tracking-wide text-ash uppercase">{label}</dt>
                    <dd className="mt-1 font-display text-base font-semibold text-cream-50">
                      {value}
                    </dd>
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-4xl border border-gold-400/25 bg-forest-900 p-4 sm:col-span-2">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300">
                    <Printer size={18} aria-hidden />
                  </span>
                  <p className="text-xs leading-relaxed text-forest-200">
                    {priceListPages.length} halaman brosur · PDF siap unduh ({priceListFile.sizeLabel})
                    · harganya sama seperti di brosur kami
                  </p>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
