import { cn } from "@/lib/utils";
import { useCountUp, useCycle, useInView } from "@/hooks/use-reveal";
import { Activity, AlertTriangle, Radio, ShieldCheck } from "lucide-react";
import { StatusDot } from "./primitives";

type Metric = {
  label: string;
  target: number;
  decimals?: number;
  suffix?: string;
  tone: "default" | "healthy" | "critical";
  icon: React.ComponentType<{ className?: string }>;
  sub: string;
};

const metrics: Metric[] = [
  { label: "Live sites", target: 8412, tone: "default", icon: Radio, sub: "+38 today" },
  { label: "Healthy", target: 7946, tone: "healthy", icon: ShieldCheck, sub: "94.4% uptime" },
  {
    label: "Active alarms",
    target: 74,
    tone: "critical",
    icon: AlertTriangle,
    sub: "9 critical",
  },
  {
    label: "Fleet health",
    target: 944,
    decimals: 1,
    suffix: "%",
    tone: "healthy",
    icon: Activity,
    sub: "30-day rolling",
  },
];

const toneText = {
  default: "text-foreground",
  healthy: "text-healthy",
  critical: "text-critical",
} as const;

/** Global site-health distribution — regions with healthy / attention / critical share. */
const regions = [
  { name: "Lagos", healthy: 92, attention: 6, critical: 2 },
  { name: "Abuja", healthy: 95, attention: 4, critical: 1 },
  { name: "Kano", healthy: 88, attention: 9, critical: 3 },
  { name: "Port Harcourt", healthy: 90, attention: 7, critical: 3 },
];

const trend = [46, 52, 49, 58, 61, 57, 66, 71, 64, 74, 69, 78, 73, 82];

const alarms = [
  {
    t: "12:04:18",
    site: "LAG-042",
    msg: "Power failure — mains unavailable",
    sev: "critical" as const,
  },
  { t: "12:03:52", site: "KAD-118", msg: "Fuel level below threshold", sev: "major" as const },
  { t: "12:03:11", site: "ENU-206", msg: "Battery low voltage 43.1V", sev: "critical" as const },
];

const sevStyle = {
  critical: { dot: "bg-critical", text: "text-critical", label: "CRIT" },
  major: { dot: "bg-major", text: "text-major", label: "MAJ" },
  minor: { dot: "bg-minor", text: "text-minor", label: "MIN" },
} as const;

function MetricCard({ m, active }: { m: Metric; active: boolean }) {
  const raw = useCountUp(m.target, active, 1500);
  const value =
    m.decimals === 1
      ? (raw / 10).toFixed(1)
      : raw.toLocaleString("en-US");
  const Icon = m.icon;

  return (
    <div className="group relative overflow-hidden rounded-md border border-hairline bg-surface/45 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-surface-2/50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "var(--gradient-line)" }}
      />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
          {m.label}
        </span>
        <Icon className="size-3.5 text-primary/60 transition-colors group-hover:text-primary" />
      </div>
      <div
        className={cn(
          "mt-2.5 font-display text-2xl leading-none font-semibold tabular-nums",
          toneText[m.tone],
        )}
      >
        {value}
        {m.suffix ?? ""}
      </div>
      <div className="mt-1.5 font-mono text-[9px] text-muted-foreground">{m.sub}</div>
    </div>
  );
}

export function CommandCenter({ className }: { className?: string }) {
  const { ref, inView } = useInView(0.25);
  const step = useCycle(alarms.length, 3200);

  return (
    <div
      ref={ref}
      className={cn(
        "panel relative overflow-hidden rounded-xl",
        className,
      )}
    >
      {/* soft accent lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 50% at 80% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      {/* top bar */}
      <div className="relative flex items-center justify-between gap-3 border-b border-hairline bg-surface-2/40 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="group grid size-5 place-items-center rounded-[4px] bg-primary/15 ring-1 ring-primary/25">
            <BrandMark className="size-3.5 text-primary" />
          </span>
          <span className="truncate font-display text-[11px] font-semibold tracking-tight sm:text-xs">
            RMS360 <span className="text-primary">COMMAND CENTER</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase sm:text-[10px]">
          <span className="inline-flex items-center gap-1.5 text-healthy">
            <StatusDot tone="healthy" /> Live
          </span>
          <span className="hidden sm:inline">Global Infrastructure</span>
        </div>
      </div>

      <div className="relative p-3 sm:p-4">
        <div
          aria-hidden
          className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.05]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 90%, transparent), transparent)",
          }}
        />

        {/* main metrics */}
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard key={m.label} m={m} active={inView} />
          ))}
        </div>

        {/* global site health */}
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-md border border-hairline bg-surface/45 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                Global site health
              </span>
              <span className="font-mono text-[9px] text-healthy">94.4%</span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {regions.map((r) => (
                <li key={r.name}>
                  <div className="flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                    <span>{r.name}</span>
                    <span className="tabular-nums">{r.healthy}%</span>
                  </div>
                  <div className="mt-1 flex h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="bg-healthy/80 transition-[width] duration-1000 ease-out"
                      style={{ width: inView ? `${r.healthy}%` : "0%" }}
                    />
                    <span
                      className="bg-major/80 transition-[width] duration-1000 ease-out"
                      style={{ width: inView ? `${r.attention}%` : "0%" }}
                    />
                    <span
                      className="bg-critical/80 transition-[width] duration-1000 ease-out"
                      style={{ width: inView ? `${r.critical}%` : "0%" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-hairline bg-surface/45 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                Telemetry throughput
              </span>
              <span className="animate-blink font-mono text-[9px] text-primary">live</span>
            </div>
            <div className="mt-3 flex h-[68px] items-end gap-[3px]">
              {trend.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[2px] bg-primary/60"
                  style={{
                    ["--h-a" as string]: `${h}%`,
                    ["--h-b" as string]: `${Math.min(100, h + 12)}%`,
                    height: `${h}%`,
                    animation: `rms-bar ${4 + (i % 5) * 0.7}s ease-in-out ${i * 110}ms infinite`,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
              <span>signals / min</span>
              <span className="text-healthy">grid 68% · gen 32%</span>
            </div>
          </div>
        </div>

        {/* live alarm stream */}
        <div className="mt-2.5 overflow-hidden rounded-md border border-hairline bg-surface/45">
          <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
            <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
              Live alarm stream
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-critical">
              <span className="relative flex size-1.5">
                <span className="size-1.5 rounded-full bg-critical" />
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-critical" />
              </span>
              3 new
            </span>
          </div>
          <ul className="divide-y divide-hairline">
            {alarms.map((a, i) => {
              const s = sevStyle[a.sev];
              return (
                <li
                  key={a.t}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 font-mono text-[10px] transition-colors duration-500 sm:gap-3",
                    i === step ? "bg-primary/[0.05]" : "",
                  )}
                >
                  <span className="shrink-0 text-muted-foreground">{a.t}</span>
                  <span className={cn("size-1.5 shrink-0 rounded-full", s.dot)} />
                  <span
                    className={cn(
                      "hidden shrink-0 tracking-[0.12em] sm:inline",
                      s.text,
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="shrink-0 text-foreground">{a.site}</span>
                  <span className="truncate text-muted-foreground">{a.msg}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
