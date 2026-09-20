import { HeartHandshake, ListChecks, SearchCheck, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { visionMission } from "@/data/site";

const valueIcons = [ShieldCheck, SearchCheck, HeartHandshake];

export function VisionMission() {
  return (
    <Section id="visi-misi" className="bg-forest-950">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Visi & Misi"
          title="Arah yang kami pegang di tiap pesanan"
          description="Kami tidak mau cuma jual makanan. Yang penting buat kami, acara Anda lancar dan tamunya pulang puas."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Visi */}
          <Reveal variant="up" className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-4xl border border-forest-800 bg-forest-900 p-7 sm:p-9">                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-forest-700 bg-forest-950 text-gold-300">
                  <Target size={20} aria-hidden />
                </span>
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">
                  Visi
                </p>
                <p className="mt-3 font-display text-lg leading-relaxed font-medium text-cream-50 sm:text-xl lg:text-[1.375rem]">
                  {visionMission.vision}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Motto */}
          <Reveal variant="up" delay={90} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-4xl border border-gold-500 bg-gold-400 p-7 sm:p-9">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-950 text-gold-300">
                <Sparkles size={20} aria-hidden />
              </span>
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-forest-900/75 uppercase">
                  Motto
                </p>
                <p className="mt-3 font-display text-xl leading-snug font-semibold text-forest-950 sm:text-2xl">
                  {visionMission.motto}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Misi */}
          <Reveal variant="up" delay={140} className="lg:col-span-7">
            <div className="h-full rounded-4xl border border-forest-800 bg-forest-900 p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-forest-700 bg-forest-950 text-gold-300">
                  <ListChecks size={20} aria-hidden />
                </span>
                <p className="text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">
                  Misi
                </p>
              </div>

              <ol className="mt-6 space-y-4">
                {visionMission.mission.map((mission, index) => (
                  <li key={mission} className="flex gap-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-forest-700 bg-forest-800 font-display text-xs font-semibold text-gold-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-forest-100 sm:text-[0.9375rem]">
                      {mission}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Nilai */}
          <Reveal variant="up" delay={190} className="lg:col-span-5">
            <div className="h-full rounded-4xl border border-forest-800 bg-forest-900 p-7 sm:p-9">
              <p className="text-xs font-semibold tracking-[0.18em] text-forest-400 uppercase">
                Nilai yang kami jaga
              </p>
              <ul className="mt-6 divide-y divide-forest-800">
                {visionMission.values.map((value, index) => {
                  const Icon = valueIcons[index] ?? ShieldCheck;
                  return (
                    <li key={value.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <Icon size={19} className="mt-0.5 shrink-0 text-gold-400" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-cream-50">{value.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-forest-200">
                          {value.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
