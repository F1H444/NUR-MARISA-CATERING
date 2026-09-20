import { ArrowRight, ClipboardList, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { priceListFile } from "@/data/price-list";
import { orderFacts, site, whatsappUrl } from "@/data/site";

/**
 * Pengganti section testimoni. Isinya sengaja hanya ketentuan yang tercetak di
 * brosur price list resmi bisnis ini, bukan ulasan atau klaim pemasaran yang
 * tidak bisa dibuktikan. Semua barisnya berasal dari `orderFacts`.
 */
export function PackageFacts() {
  return (
    <Section id="ketentuan" className="bg-forest-900">
      <Container>
        <SectionHeading
          eyebrow="Ketentuan & Fasilitas"
          title="Semua ketentuan kami, apa adanya"
          description="Semua poin di bawah ini ada di brosur price list kami, bukan ketentuan tambahan."
          action={
            <Button
              href="/menu#price-list"
              variant="primary"
              size="sm"
              icon={<ArrowRight size={15} aria-hidden />}
              iconPosition="right"
            >
              Lihat brosur
            </Button>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Panel sumber data: menempel di desktop, kartu biasa di ponsel */}
          <Reveal variant="left" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex h-full flex-col justify-between rounded-4xl border border-forest-800 bg-forest-950 p-7 sm:p-8">
                <div>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300">
                    <FileText size={20} aria-hidden />
                  </span>
                  <p className="mt-6 font-display text-2xl leading-snug font-semibold text-cream-50">
                    Sumber: brosur resmi kami
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-forest-200">
                    Semua angka di sampingnya disalin dari price list kami yang isinya {" "}
                    {priceListFile.pages} halaman. Brosurnya bisa dibuka halaman per halaman di
                    menu, atau diunduh sebagai PDF.
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-forest-800 pt-6 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-ash">Jumlah halaman</dt>
                      <dd className="font-medium text-cream-50">{priceListFile.pages} halaman</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ash">Ukuran PDF</dt>
                      <dd className="font-medium text-cream-50">{priceListFile.sizeLabel}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ash">Bisa diunduh</dt>
                      <dd className="font-medium text-cream-50">Gratis</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-forest-800 pt-6">
                  <Button
                    href="/menu#price-list"
                    icon={<ArrowRight size={16} aria-hidden />}
                    iconPosition="right"
                  >
                    Buka brosur di halaman menu
                  </Button>
                  <Button
                    href={whatsappUrl(
                      "Halo Nur Marisa Catering, saya mau tanya soal ketentuan pemesanan dan uang muka.",
                    )}
                    variant="outline"
                    icon={<MessageCircle size={16} aria-hidden />}
                  >
                    Tanya ketentuan
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Daftar ketentuan */}
          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              {orderFacts.map((fact, index) => (
                <Reveal key={fact.title} delay={(index % 2) * 90}>
                  <li className="flex h-full gap-4 rounded-4xl border border-forest-800 bg-forest-950 p-6 sm:p-7">
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-forest-700 bg-forest-800 font-display text-xs font-semibold text-gold-200"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-base leading-snug font-semibold text-cream-50">
                        {fact.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ash">{fact.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <p className="mt-5 flex gap-3 rounded-4xl border border-forest-800 bg-forest-950 px-6 py-5 text-xs leading-relaxed text-ash">
              <ClipboardList size={16} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
              <span>
                Masih ada yang mau ditanyakan soal ketentuan, atau mau menyesuaikan paket dengan
                acaranya? Tanya saja dulu sebelum memesan. {site.paymentNote}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
