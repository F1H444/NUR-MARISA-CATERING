import Image from "next/image";
import { ArrowRight, BadgeCheck, Leaf, MessageCircle, Soup, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { formatRupiah, lowestPiringanPrice } from "@/data/menu";
import { site, stats, whatsappUrl } from "@/data/site";

/** Tiga hal yang bisa dicek sendiri: ketentuan di price list, free ongkir, dan
 *  sertifikat halal. */
const trustPoints = [
  { icon: Soup, label: "Piringan full service" },
  { icon: Truck, label: "Free ongkir Banjarmasin" },
  { icon: BadgeCheck, label: "Bersertifikat halal" },
];

export function Hero() {
  return (
    <section id="beranda" className="scroll-mt-28 pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Narasi utama */}
          <div className="lg:col-span-6 min-w-0">
            <Reveal variant="fade">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-forest-900 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold-300">
                <Leaf size={14} aria-hidden />
                Catering rumahan di {site.city} sejak {site.foundedYear}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-semibold text-cream-50 sm:text-5xl lg:text-[3.75rem]">
                Masakan rumahan yang pantas
                <span className="text-gold-300"> untuk acara besar.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
                {site.name} menyiapkan paket piringan, prasmanan, nasi kotak, cemilan, sampai
                aqiqah untuk resepsi, rapat kantor, syukuran, atau kumpul keluarga. Harga dan isi
                tiap paketnya tertulis lengkap di brosur price list kami, jadi Anda bisa cek dulu
                sebelum memesan.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/menu" size="lg" icon={<ArrowRight size={18} aria-hidden />} iconPosition="right">
                  Lihat Menu
                </Button>
                <Button
                  href={whatsappUrl()}
                  variant="outline"
                  size="lg"
                  icon={<MessageCircle size={18} aria-hidden />}
                >
                  Pesan Sekarang
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-sm font-medium text-forest-200">
                    <Icon size={17} className="text-gold-400" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={400}>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-gold-400/20 pt-8">
                {stats.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-2xl font-semibold text-gold-300 sm:text-[1.75rem]">
                        <CountUp
                          value={item.value}
                          prefix={item.prefix ?? ""}
                          suffix={item.suffix}
                          decimals={item.decimals ?? 0}
                        />
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-ash sm:text-[0.8125rem]">
                        {item.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Kolase bento: min-w-0 supaya kolom boleh menyusut di layar 320px */}
          <div className="lg:col-span-6 min-w-0">
            <Reveal variant="right" delay={120} className="h-full min-w-0">
              <div className="grid h-[26rem] min-w-0 grid-cols-6 grid-rows-6 gap-3 sm:h-[32rem] sm:gap-4 lg:h-[34rem]">
                <div className="relative col-span-4 row-span-4 overflow-hidden rounded-4xl border border-forest-800 bg-forest-900">
                  <Image
                    src="/images/menu/pi-premium.jpg"
                    alt="Aneka lauk paket piringan premium di atas meja"
                    fill
                    priority
                    sizes="(max-width: 1024px) 66vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="col-span-2 row-span-2 flex min-w-0 flex-col justify-between rounded-4xl border border-gold-500 bg-gold-400 p-3 text-forest-950 sm:p-5">
                  <div className="flex items-center gap-1.5">
                    <Wallet size={13} aria-hidden />
                    <span className="text-[10px] font-semibold tracking-[0.14em] uppercase">
                      Mulai dari
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-lg leading-none font-semibold sm:text-2xl">
                      {formatRupiah(lowestPiringanPrice)}
                    </p>
                    <p className="mt-1.5 text-[0.6875rem] leading-snug text-forest-900/80 sm:text-xs">
                      per piringan
                      <span className="mt-0.5 block">sesuai price list</span>
                    </p>
                  </div>
                </div>

                <div className="relative col-span-2 row-span-4 overflow-hidden rounded-4xl border border-forest-800 bg-forest-900">
                  <Image
                    src="/images/menu/et-jeruk.jpg"
                    alt="Es jeruk segar dalam termos untuk acara"
                    fill
                    priority
                    sizes="(max-width: 1024px) 33vw, 17vw"
                    className="object-cover"
                  />
                </div>

                <div className="col-span-4 row-span-2 flex min-w-0 items-center gap-3 rounded-4xl border border-forest-800 bg-forest-900 p-4 sm:gap-4 sm:p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forest-700 bg-forest-800 text-gold-300">
                    <Truck size={20} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-cream-50">
                      Free ongkir se-Banjarmasin
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-ash">
                      Sebagian besar paket minimal 100 pax, dan prasmanan sudah full service.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
