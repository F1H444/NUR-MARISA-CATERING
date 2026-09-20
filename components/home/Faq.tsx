import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqItems } from "@/data/faq";
import { whatsappUrl } from "@/data/site";

/**
 * Pertanyaan yang sering ditanyakan calon pelanggan. Sengaja memakai
 * <details>/<summary> bawaan peramban supaya jawabannya tetap ada di HTML
 * walaupun JavaScript belum jalan. Itu penting dua kali: pengunjung di koneksi
 * lambat tetap bisa membukanya, dan mesin pencari membaca seluruh jawabannya.
 */
export function Faq() {
  return (
    <Section id="faq" className="bg-forest-950">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Judul section: menempel saat digulir di layar besar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                layout="stack"
                eyebrow="Tanya Jawab"
                title="Hal yang paling sering ditanyakan"
                description="Semua jawabannya diambil dari brosur dan keterangan kami sendiri, jadi sama seperti yang Anda dengar saat chat."
              />

              <div className="mt-8 flex items-center gap-3 rounded-4xl border border-forest-800 bg-forest-900 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300">
                  <Search size={18} aria-hidden />
                </span>
                <p className="text-xs leading-relaxed text-forest-200">
                  Belum ketemu jawabannya? Tanya langsung saja, tidak perlu sungkan.
                </p>
              </div>

              <Button
                href={whatsappUrl("Halo Nur Marisa Catering, saya mau tanya soal pemesanan catering.")}
                variant="outline"
                className="mt-4"
                icon={<MessageCircle size={16} aria-hidden />}
              >
                Tanya lewat WhatsApp
              </Button>
            </div>
          </div>

          {/* Daftar pertanyaan */}
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {faqItems.map((item, index) => (
                <Reveal key={item.question} delay={Math.min(index, 4) * 60}>
                  <li>
                    <details className="group rounded-4xl border border-forest-800 bg-forest-900 transition-colors duration-300 open:border-gold-400/40 hover:border-gold-400/30">
                      <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
                        <span
                          aria-hidden
                          className="mt-0.5 font-display text-xs font-semibold text-gold-400/70"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="flex-1 font-display text-base leading-snug font-semibold text-cream-50 sm:text-[1.0625rem]">
                          {item.question}
                        </h3>
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className="mt-0.5 shrink-0 text-gold-400 transition-transform duration-300 group-open:rotate-180"
                        />
                      </summary>
                      <p className="px-6 pb-6 pl-[3.75rem] text-sm leading-relaxed text-ash sm:pl-[4rem]">
                        {item.answer}
                      </p>
                    </details>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
