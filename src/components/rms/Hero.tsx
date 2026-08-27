import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Dashboard } from "./Dashboard";
import { CtaGhost, CtaPrimary, Reveal } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      {/* connection lines between content and dashboard */}
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
            stroke="color-mix(in oklab, var(--primary) 30%, transparent)"
            strokeWidth="0.12"
            strokeDasharray="1.4 2.4"
            className="animate-dash"
            style={{ animationDelay: `${i * 400}ms` }}
          />
        ))}
      </svg>

      <div className="container-rms relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/50 px-3 py-1.5 backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-primary" />
                </span>
                <span className="eyebrow">Intelligent Remote Monitoring</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-7 text-4xl leading-[1.03] font-semibold text-balance sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                Your Infrastructure.
                <span className="mt-2 block text-gradient">
                  Connected. Visible. Intelligent.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                RMS360 gives operations teams real-time visibility across distributed assets and
                sites—helping them monitor, analyse, detect problems and take action before they
                become business-critical incidents.
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

            <Reveal delay={400}>
              <p className="mt-10 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted-foreground/80 uppercase">
                Power · Fuel · Energy · Environment · Security · Assets · CCTV
              </p>
            </Reveal>
          </div>

          <Reveal delay={220} className="lg:-mr-10 xl:-mr-20">
            <div className="animate-float">
              <Dashboard />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
