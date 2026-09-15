import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Camera,
  Fuel,
  Gauge,
  Boxes,
  ShieldCheck,
  Thermometer,
  Zap,
} from "lucide-react";
import { CommandCenter } from "./CommandCenter";
import { CtaGhost, CtaPrimary, Reveal } from "./primitives";

const capabilities = [
  { label: "Power", icon: Zap },
  { label: "Fuel", icon: Fuel },
  { label: "Energy", icon: Gauge },
  { label: "Environment", icon: Thermometer },
  { label: "Security", icon: ShieldCheck },
  { label: "Assets", icon: Boxes },
  { label: "CCTV", icon: Camera },
  { label: "AI Analytics", icon: BrainCircuit },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div
        aria-hidden
        className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]"
      />
      {/* soft radial lighting behind the command centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 76% 42%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />

      {/* faint telemetry / network lines */}
      <svg
        aria-hidden
        className="absolute inset-0 hidden size-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {[
          "M4 62 C 26 62, 34 40, 52 40",
          "M6 74 C 30 74, 38 56, 54 56",
          "M2 50 C 24 50, 30 30, 50 30",
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="color-mix(in oklab, var(--primary) 24%, transparent)"
            strokeWidth="0.1"
            strokeDasharray="1.4 2.6"
            className="animate-dash"
            style={{ animationDelay: `${i * 400}ms` }}
          />
        ))}
      </svg>

      {/* ambient data points */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {[
          { l: "12%", t: "26%", d: 0 },
          { l: "22%", t: "68%", d: 700 },
          { l: "38%", t: "18%", d: 1400 },
          { l: "58%", t: "82%", d: 2100 },
          { l: "88%", t: "34%", d: 2800 },
          { l: "72%", t: "12%", d: 3500 },
        ].map((p) => (
          <span
            key={`${p.l}-${p.t}`}
            className="absolute size-1 rounded-full bg-primary/50"
            style={{
              left: p.l,
              top: p.t,
              animation: `rms-blink 5s ease-in-out ${p.d}ms infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-rms relative">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          <div className="min-w-0 max-w-2xl">
            <Reveal>
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-hairline bg-surface/50 px-3 py-1.5 backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-primary" />
                </span>
                <span className="min-w-0 break-words eyebrow text-[10px] sm:text-[11px]">
                  RMS360 Platform — Live Infrastructure Intelligence
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-7 flex max-w-full flex-col gap-1.5 font-display text-[1.5rem] leading-[1.1] font-bold tracking-[-0.03em] sm:gap-2 sm:text-[2.2rem] lg:text-[2.6rem] xl:text-[3rem]">
                <span className="block min-w-0 sm:whitespace-nowrap text-gradient">SEE EVERYTHING.</span>
                <span className="block min-w-0 sm:whitespace-nowrap text-foreground/90">KNOW EVERYTHING.</span>
                <span className="block min-w-0 sm:whitespace-nowrap text-foreground/75">
                  CONTROL EVERYTHING.
                </span>
              </h1>

            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                The intelligence layer for distributed critical infrastructure. RMS360 brings
                power, energy, fuel, security and asset health into one live view, so teams can
                protect uptime and act before small signals become costly incidents.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CtaPrimary>
                  Request a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </CtaPrimary>
                <CtaGhost href="#about">
                  Explore RMS360
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </CtaGhost>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border/70 pt-4 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                <span>One view across every site</span>
                <span>Built for uptime-critical teams</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="lg:-mr-2 xl:-mr-6">
            <div className="animate-float">
              <CommandCenter />
            </div>
          </Reveal>
        </div>

        {/* capability strip */}
        <Reveal delay={160}>
          <div className="mt-14 border-t border-hairline pt-6 md:mt-20">
            <ul className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
              {capabilities.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/35 px-3 py-1.5 transition-colors duration-300 hover:border-primary/35 hover:bg-surface-2/50"
                >
                  <Icon className="size-3.5 text-primary/70" />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
