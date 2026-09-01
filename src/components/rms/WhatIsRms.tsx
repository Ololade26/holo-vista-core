import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-reveal";
import {
  Reveal,
  SectionShell,
  SectionHeading,
  StatusDot,
  GridBackdrop,
} from "./primitives";
import {
  Activity,
  BrainCircuit,
  Camera,
  Cpu,
  DoorOpen,
  Droplets,
  Eye,
  Fuel,
  Gauge,
  LineChart,
  Power,
  Radio,
  Server,
  SlidersHorizontal,
  Thermometer,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* --------------------------------------------------------- domain topology */

type Tone = "healthy" | "info" | "major";

const domains: { icon: LucideIcon; label: string; tone: Tone; angle: number }[] = [
  { icon: Power, label: "Power", tone: "healthy", angle: -90 },
  { icon: Zap, label: "Energy", tone: "healthy", angle: -45 },
  { icon: Fuel, label: "Fuel", tone: "major", angle: 0 },
  { icon: Thermometer, label: "Environment", tone: "healthy", angle: 45 },
  { icon: DoorOpen, label: "Security", tone: "info", angle: 90 },
  { icon: Server, label: "Assets", tone: "healthy", angle: 135 },
  { icon: Camera, label: "CCTV", tone: "healthy", angle: 180 },
  { icon: Radio, label: "Network / Comms", tone: "info", angle: -135 },
];

const RADIUS = 40; // % of container half-size

function polar(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + RADIUS * Math.cos(rad),
    y: 50 + RADIUS * Math.sin(rad),
  };
}

function DomainNode({
  icon: Icon,
  label,
  tone,
  className,
  style,
}: {
  icon: LucideIcon;
  label: string;
  tone: Tone;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "glass group flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5 transition-colors duration-300 hover:border-primary/50",
        className,
      )}
      style={style}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-sm border border-primary/25 bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-mono text-[10px] tracking-[0.14em] text-foreground uppercase">
          {label}
        </span>
      </span>
      <StatusDot tone={tone} pulse={false} className="shrink-0" />
    </div>
  );
}

function CentralNode() {
  return (
    <div className="panel relative flex flex-col items-center justify-center gap-1 rounded-lg px-6 py-6 text-center shadow-[var(--shadow-glow)]">
      <span
        aria-hidden
        className="animate-sweep absolute inset-0 rounded-lg opacity-25"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--primary) 40deg, transparent 90deg)",
          maskImage: "radial-gradient(circle, transparent 62%, black 100%)",
        }}
      />
      <Cpu className="relative size-5 text-primary" />
      <span className="relative mt-1 font-display text-xl font-semibold tracking-tight">
        RMS360
      </span>
      <span className="relative font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
        Infrastructure intelligence
      </span>
    </div>
  );
}

function Topology() {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="relative">
      {/* Desktop / tablet radial diagram */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] md:block">
        <GridBackdrop className="opacity-40" />
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          {domains.map((d, i) => {
            const p = polar(d.angle);
            return (
              <g key={d.label}>
                <line
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--border)"
                  strokeWidth="0.3"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--primary)"
                  strokeWidth="0.6"
                  strokeDasharray="3 9"
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    "animate-dash transition-opacity duration-700",
                    inView ? "opacity-70" : "opacity-0",
                  )}
                  style={{ animationDelay: `${i * 240}ms`, transitionDelay: `${300 + i * 90}ms` }}
                />
              </g>
            );
          })}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.2"
            strokeDasharray="1 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className={cn(
            "reveal absolute top-1/2 left-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2",
            inView && "is-revealed",
          )}
        >
          <CentralNode />
        </div>

        {domains.map((d, i) => {
          const p = polar(d.angle);
          return (
            <div
              key={d.label}
              className={cn(
                "reveal absolute w-[38%] -translate-x-1/2 -translate-y-1/2",
                inView && "is-revealed",
              )}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                ["--reveal-delay" as string]: `${260 + i * 90}ms`,
              }}
            >
              <DomainNode icon={d.icon} label={d.label} tone={d.tone} />
            </div>
          );
        })}
      </div>

      {/* Mobile stacked layout */}
      <div className="md:hidden">
        <div className={cn("reveal mx-auto max-w-[240px]", inView && "is-revealed")}>
          <CentralNode />
        </div>
        <div aria-hidden className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-primary/60 to-transparent" />
        <div className="grid grid-cols-2 gap-2.5">
          {domains.map((d, i) => (
            <div
              key={d.label}
              className={cn("reveal", inView && "is-revealed")}
              style={{ ["--reveal-delay" as string]: `${200 + i * 70}ms` }}
            >
              <DomainNode icon={d.icon} label={d.label} tone={d.tone} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ capabilities */

const capabilities: { n: string; icon: LucideIcon; title: string; copy: string }[] = [
  {
    n: "01",
    icon: Eye,
    title: "See",
    copy: "Monitor every critical asset and site from a single operational view.",
  },
  {
    n: "02",
    icon: BrainCircuit,
    title: "Know",
    copy: "Turn live telemetry into actionable intelligence, trends and predictive insights.",
  },
  {
    n: "03",
    icon: Activity,
    title: "Respond",
    copy: "Detect anomalies and alarms before they become operational failures.",
  },
  {
    n: "04",
    icon: SlidersHorizontal,
    title: "Control",
    copy: "Take informed remote action across connected infrastructure.",
  },
];

const strip: { icon: LucideIcon; label: string; tone: Tone }[] = [
  { icon: Gauge, label: "Real-time telemetry", tone: "healthy" },
  { icon: LineChart, label: "Predictive intelligence", tone: "info" },
  { icon: Droplets, label: "Centralized operations", tone: "healthy" },
  { icon: SlidersHorizontal, label: "Remote control", tone: "info" },
];

/* ------------------------------------------------------------------ export */

export function WhatIsRms() {
  return (
    <SectionShell id="about" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="container-rms relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What is RMS360"
              title={
                <>
                  One platform.
                  <span className="block text-muted-foreground">
                    Total infrastructure visibility.
                  </span>
                </>
              }
              copy="RMS360 brings distributed infrastructure into one intelligent operational layer — giving operations teams the visibility, intelligence and control they need to keep critical systems running."
            />
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                {["Infrastructure data", "RMS360", "Intelligence", "Action"].map((s, i) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    {i > 0 ? <span className="text-primary/60">→</span> : null}
                    <span
                      className={cn(
                        "rounded-sm border border-border bg-surface/50 px-2.5 py-1",
                        i === 1 && "border-primary/40 text-primary",
                      )}
                    >
                      {s}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Topology />
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <div className="group h-full bg-background p-6 transition-colors duration-300 hover:bg-surface-2/50">
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl font-semibold text-muted-foreground/30 transition-colors duration-300 group-hover:text-primary/70">
                    {c.n}
                  </span>
                  <span className="grid size-9 place-items-center rounded-sm border border-border bg-surface/60 text-primary transition-colors duration-300 group-hover:border-primary/40">
                    <c.icon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-md border border-border bg-surface/30 px-5 py-4">
            {strip.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase"
              >
                <StatusDot tone={s.tone} pulse={false} />
                <s.icon className="size-3.5 text-primary/80" />
                {s.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
