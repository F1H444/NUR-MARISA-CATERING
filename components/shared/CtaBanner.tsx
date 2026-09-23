import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappUrl } from "@/data/site";

type CtaBannerProps = {
  title?: string;
  description?: string;
  /** Tombol "Lihat Menu" dimatikan di halaman menu karena pengunjung sudah ada di sana. */
  showMenuButton?: boolean;
};

/** Pita penutup: permukaan emas penuh supaya halaman berakhir dengan aksen kuat. */
export function CtaBanner({
  title = "Mau pesan untuk acara Anda?",
  description = "Kirim tanggal, jumlah tamu, dan lokasinya. Nanti kami balas dengan estimasi harga dan paket yang paling pas.",
  showMenuButton = true,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gold-400 py-16 sm:py-20 lg:py-24">
      {/* Ornamen warna solid, bukan gradient */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-gold-300"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-gold-300"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-pine-900/15 bg-pine-900/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-pine-900 uppercase">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-pine-900" />
              Pesan Sekarang
            </span>

            <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold text-pine-900 sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-pine-800/80">{description}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={whatsappUrl()}
                variant="dark"
                size="lg"
                icon={<MessageCircle size={18} aria-hidden />}
              >
                Chat WhatsApp
              </Button>
              <Button
                href={site.phoneHref}
                variant="outline"
                size="lg"
                className="border-pine-900/30 text-pine-900 hover:border-pine-900 hover:bg-gold-300 hover:text-pine-900"
                icon={<Phone size={18} aria-hidden />}
              >
                {site.phoneLabel}
              </Button>
              {showMenuButton ? (
                <Button
                  href="/menu"
                  variant="outline"
                  size="lg"
                  className="border-pine-900/30 text-pine-900 hover:border-pine-900 hover:bg-gold-300 hover:text-pine-900"
                  icon={<ArrowRight size={18} aria-hidden />}
                  iconPosition="right"
                >
                  Lihat Menu
                </Button>
              ) : null}
            </div>

            <p className="mt-6 text-xs text-pine-800/70">
              Dapur kami di {site.addressShort} · {site.orderNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
