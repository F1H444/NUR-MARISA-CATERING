import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { advantages, whatsappUrl } from "@/data/site";

export function WhyUs() {
  return (
    <Section id="mengapa-kami" className="bg-forest-900">
      <Container>
        <SectionHeading
          eyebrow="Mengapa Pilih Kami?"
          title="Kenapa pesan catering ke kami?"
          description="Semua yang ada di daftar ini tertulis di brosur price list kami, silakan cek sendiri sebelum memesan."
          action={
            <Link
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-colors duration-200 hover:text-gold-200"
            >
              Tanya langsung
              <ArrowRight size={16} aria-hidden />
            </Link>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            // Dua kartu pertama dibuat lebih lebar supaya desktop tidak
            // terasa seperti enam kotak yang sama.
            const isWide = index < 2;

            return (
              <Reveal
                key={advantage.title}
                delay={(index % 4) * 80}
                className={isWide ? "lg:col-span-2" : undefined}
              >
                <div className="group flex h-full flex-col rounded-4xl border border-forest-800 bg-forest-950 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-lift">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300 transition-colors duration-300 group-hover:border-gold-400/50 group-hover:bg-gold-400 group-hover:text-forest-950">
                      <Icon size={21} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-sm font-semibold tracking-[0.16em] text-gold-400/50"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-lg font-semibold text-cream-50">
                    {advantage.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ash">
                    {advantage.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
