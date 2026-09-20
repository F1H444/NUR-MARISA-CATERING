import { ClipboardList, MessageCircle, Truck, Wallet } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

const steps = [
  {
    icon: ClipboardList,
    title: "Pilih menu & jumlah",
    description:
      "Tentukan paket dari price list, jumlah pax atau boxnya, tanggal, dan lokasi acaranya.",
  },
  {
    icon: MessageCircle,
    title: "Konfirmasi via WhatsApp",
    description: `Chat ${site.phoneLabel}. Kirim tanggal acara, jumlah tamu, dan lokasinya, nanti kami kabari rincian harganya dan tanggalnya masih kosong atau tidak.`,
  },
  {
    icon: Wallet,
    title: "Uang muka & pembayaran",
    description:
      "Soal uang muka, cara bayar, dan pelunasan, kami bicarakan langsung di chat ini, menyesuaikan jumlah tamu dan tanggal acaranya.",
  },
  {
    icon: Truck,
    title: "Antar ke lokasi acara",
    description:
      "Pesanan kami antar sebelum acara mulai. Untuk paket piringan dan nasi kotak, ongkir wilayah Banjarmasin gratis, sesuai catatan di brosur.",
  },
];

export function OrderSteps() {
  return (
    <Section id="cara-pesan" className="bg-forest-950">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Cara Pesan"
          title="Dari chat pertama sampai makanan tersaji"
          description="Alurnya cuma empat langkah, dan rincian pesanannya kami konfirmasi lewat chat supaya tidak ada salah paham."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 90}>
                <li className="flex h-full flex-col rounded-4xl border border-forest-800 bg-forest-900 p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-forest-700 bg-forest-800 text-gold-300">
                      <Icon size={21} aria-hidden />
                    </span>
                    <span className="font-display text-2xl font-semibold text-gold-400/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-cream-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{step.description}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
