import { cn } from "@/lib/utils";
import { useCountUp, useCycle, useInView } from "@/hooks/use-reveal";
import { Activity, AlertTriangle, Radio, ShieldCheck } from "lucide-react";
import { StatusDot } from "./primitives";

type Tone = "default" | "healthy" | "critical";

type Metric = {
  label: string;
  target: number;
  decimals?: number;
  suffix?: string;
  tone: Tone;
  icon: React.ComponentType<{ className?: string }>;
  sub: string;
  status: "healthy" | "attention" | "critical" | "muted";
};

const metrics: Metric[] = [
  {
    label: "Monitored sites",
    target: 8412,
    tone: "default",
    icon: Radio,
    sub: "8,412 of 8,412 reporting",
    status: "healthy",
  },
  {
    label: "Operational",
    target: 7946,
    tone: "healthy",
    icon: ShieldCheck,
    sub: "94.4% of fleet",
    status: "healthy",
  },
  {
    label: "Open alarms",
    target: 74,
    tone: "critical",
    icon: AlertTriangle,
    sub: "9 critical · 65 major",
    status: "critical",
  },
  {
    label: "Fleet health",
    target: 944,
    decimals: 1,
    suffix: "%",
    tone: "healthy",
    icon: Activity,
    sub: "30-day rolling",
    status: "healthy",
  },
];

const toneText = {
  default: "text-foreground",
  healthy: "text-healthy",
  critical: "text-critical",
} as const;

const statusDot = {
  healthy: "bg-healthy",
  attention: "bg-major",
  critical: "bg-critical",
  muted: "bg-muted-foreground/50",
} as const;

/** Site-health distribution — regions with healthy / attention / critical share. */
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "text-[9.5px] font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:text-[10px]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function MetricCard({ m, active }: { m: Metric; active: boolean }) {
  const raw = useCountUp(m.target, active, 1500);
  const value = m.decimals === 1 ? (raw / 10).toFixed(1) : raw.toLocaleString("en-US");
  const Icon = m.icon;

  return (
    <div className="group flex h-full flex-col justify-between rounded-md border border-hairline bg-surface/50 p-3 transition-colors duration-300 hover:border-primary/30 hover:bg-surface-2/50">
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5">
          <span className={cn("size-1.5 shrink-0 rounded-full", statusDot[m.status])} />
          <Label>{m.label}</Label>
        </span>
        <Icon className="size-3.5 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" />
      </div>
      <div
        className={cn(
          "mt-3 font-numeric text-[1.6rem] leading-none font-bold tabular-nums sm:text-[1.75rem]",
          toneText[m.tone],
        )}
      >
        {value}
        {m.suffix ?? ""}
      </div>
      <div className="mt-2 border-t border-hairline pt-2 text-[10px] leading-tight text-muted-foreground">
        {m.sub}
      </div>
    </div>
  );
}

export function CommandCenter({ className }: { className?: string }) {
  const { ref, inView } = useInView(0.25);
  const step = useCycle(alarms.length, 3600);

  return (
    <div ref={ref} className={cn("panel relative overflow-hidden rounded-xl", className)}>
      {/* soft accent lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(70% 50% at 80% 0%, color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%)",
        }}
      />

      {/* console header */}
      <div className="relative flex items-center justify-between gap-3 border-b border-hairline bg-surface-2/50 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-5 shrink-0 place-items-center rounded-[4px] bg-primary/12 ring-1 ring-primary/25">
            <Activity className="size-3 text-primary" />
          </span>
          <span className="truncate font-display text-[11px] font-semibold tracking-tight sm:text-xs">
            RMS360 <span className="text-primary">COMMAND CENTER</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <StatusDot tone="healthy" />
            <Label className="text-healthy">Operational</Label>
          </span>
          <Label className="hidden sm:inline">Demonstration data</Label>
        </div>
      </div>

      <div className="relative p-3 sm:p-4">
        {/* primary metrics */}
        <div className="grid grid-cols-2 items-stretch gap-2.5 lg:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard key={m.label} m={m} active={inView} />
          ))}
        </div>

        {/* site health + throughput */}
        <div className="mt-2.5 grid items-stretch gap-2.5 sm:grid-cols-2">
          <div className="flex flex-col rounded-md border border-hairline bg-surface/50 p-3">
            <div className="flex items-center justify-between gap-2 border-b border-hairline pb-2">
              <Label>Site health by region</Label>
              <span className="font-numeric text-[11px] font-bold text-healthy tabular-nums">
                94.4%
              </span>
            </div>
            <ul className="mt-3 space-y-3">
              {regions.map((r) => (
                <li key={r.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-medium text-foreground/80">{r.name}</span>
                    <span className="font-numeric text-[11px] font-semibold tabular-nums text-foreground/70">
                      {r.healthy}%
                    </span>
                  </div>
                  <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-surface-2">
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
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-hairline pt-2">
              {(
                [
                  ["Healthy", "bg-healthy"],
                  ["Attention", "bg-major"],
                  ["Critical", "bg-critical"],
                ] as const
              ).map(([l, c]) => (
                <span key={l} className="inline-flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", c)} />
                  <Label>{l}</Label>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-md border border-hairline bg-surface/50 p-3">
            <div className="flex items-center justify-between gap-2 border-b border-hairline pb-2">
              <Label>Telemetry throughput</Label>
              <Label>24 h</Label>
            </div>
            <div className="mt-3 flex flex-1 items-end gap-[3px] min-h-[68px]">
              {trend.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[2px] bg-primary/55 transition-[height] duration-1000 ease-out"
                  style={{ height: inView ? `${h}%` : "6%" }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-2 border-t border-hairline pt-2">
              <Label>Signals / min</Label>
              <span className="text-[10px] text-muted-foreground">
                grid <span className="font-numeric font-semibold text-foreground/80">68%</span> · gen{" "}
                <span className="font-numeric font-semibold text-foreground/80">32%</span>
              </span>
            </div>
          </div>
        </div>

        {/* alarm log */}
        <div className="mt-2.5 overflow-hidden rounded-md border border-hairline bg-surface/50">
          <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-2">
            <Label>Recent alarms</Label>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="size-1.5 rounded-full bg-critical" />
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-critical" />
              </span>
              <Label className="text-critical">3 unacknowledged</Label>
            </span>
          </div>
          <ul className="divide-y divide-hairline">
            {alarms.map((a, i) => {
              const s = sevStyle[a.sev];
              return (
                <li
                  key={a.t}
                  className={cn(
                    "grid min-h-[38px] grid-cols-[auto_auto_1fr] items-center gap-x-2.5 px-3 py-2 transition-colors duration-500 sm:grid-cols-[64px_54px_74px_1fr] sm:gap-x-3",
                    i === step ? "bg-primary/[0.04]" : "",
                  )}
                >
                  <span className="font-numeric text-[10px] font-medium tabular-nums text-muted-foreground">
                    {a.t}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={cn("size-1.5 shrink-0 rounded-full", s.dot)} />
                    <span
                      className={cn(
                        "hidden text-[9.5px] font-semibold tracking-[0.12em] sm:inline",
                        s.text,
                      )}
                    >
                      {s.label}
                    </span>
                  </span>
                  <span className="text-[10.5px] font-semibold text-foreground sm:text-[11px]">
                    {a.site}
                  </span>
                  <span className="col-span-3 truncate text-[10.5px] text-muted-foreground sm:col-span-1 sm:text-[11px]">
                    {a.msg}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
