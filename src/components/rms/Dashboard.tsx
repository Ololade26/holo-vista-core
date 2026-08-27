import { cn } from "@/lib/utils";
import { useCycle } from "@/hooks/use-reveal";
import { GisMap } from "./GisMap";
import { StatusDot } from "./primitives";
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  Fuel,
  Radio,
  ShieldCheck,
  Siren,
  Zap,
} from "lucide-react";

function Tile({
  label,
  value,
  sub,
  tone = "default",
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "healthy" | "critical" | "major";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const toneText = {
    default: "text-foreground",
    healthy: "text-healthy",
    critical: "text-critical",
    major: "text-major",
  }[tone];
  return (
    <div className="group relative overflow-hidden rounded-sm border border-border bg-surface/70 p-3 transition-colors hover:border-primary/40">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </span>
        <Icon className="size-3.5 text-primary/70" />
      </div>
      <div className={cn("mt-2 font-display text-xl leading-none font-semibold", toneText)}>
        {value}
      </div>
      {sub ? <div className="mt-1 font-mono text-[9px] text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

const feed = [
  { t: "12:04:18", s: "LAG-042", m: "Power failure — mains unavailable", tone: "critical" as const },
  { t: "12:03:52", s: "KAD-118", m: "Fuel level below threshold (18%)", tone: "major" as const },
  { t: "12:03:11", s: "ENU-206", m: "Battery low voltage 43.1V", tone: "critical" as const },
  { t: "12:02:40", s: "JOS-051", m: "Door opened — access authorized", tone: "info" as const },
  { t: "12:01:58", s: "PHC-090", m: "Temperature 41°C above setpoint", tone: "major" as const },
];

const bars = [42, 68, 55, 80, 61, 92, 74, 58, 86, 70, 48, 77];

export function Dashboard({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "full";
}) {
  const step = useCycle(feed.length, 2400);

  return (
    <div
      className={cn(
        "panel relative overflow-hidden rounded-lg",
        variant === "full" && "rounded-xl",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2/50 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-xs font-semibold tracking-tight">
            RMS<span className="text-primary">360</span>
          </span>
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
            / operations command centre
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <StatusDot tone="healthy" /> LIVE
          </span>
          <span className="hidden sm:inline">12:04:21 UTC</span>
        </div>
      </div>

      <div className="relative p-3 sm:p-4">
        <div
          aria-hidden
          className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.07]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--primary) 90%, transparent), transparent)",
          }}
        />

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Tile label="Live sites" value="8,412" sub="+38 today" icon={Radio} />
          <Tile label="Healthy" value="7,946" sub="94.4% uptime" tone="healthy" icon={ShieldCheck} />
          <Tile label="Attention" value="392" sub="within SLA" tone="major" icon={AlertTriangle} />
          <Tile label="Active alarms" value="74" sub="9 critical" tone="critical" icon={Siren} />
        </div>

        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
          {/* map */}
          <div className="lg:col-span-3">
            <GisMap className="h-44 w-full sm:h-56 lg:h-full" compact />
          </div>

          {/* right column */}
          <div className="grid gap-2.5 lg:col-span-2">
            <div className="rounded-sm border border-border bg-surface/70 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                  Energy performance
                </span>
                <Zap className="size-3.5 text-primary/70" />
              </div>
              <div className="mt-3 flex h-16 items-end gap-1">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-[2px] bg-primary/70"
                    style={{
                      ["--h-a" as string]: `${h}%`,
                      ["--h-b" as string]: `${Math.min(100, h + 18)}%`,
                      height: `${h}%`,
                      animation: `rms-bar ${3 + (i % 4) * 0.6}s ease-in-out ${i * 90}ms infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
                <span>kWh / site / day</span>
                <span className="text-healthy">grid 68% · gen 32%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Tile label="Fuel status" value="72%" sub="41 sites low" tone="major" icon={Fuel} />
              <Tile label="Security" value="16" sub="events / 24h" icon={ShieldCheck} />
              <Tile label="Comms" value="99.1%" sub="LTE / ETH" tone="healthy" icon={Activity} />
              <Tile
                label="Critical incidents"
                value="9"
                sub="4 assigned"
                tone="critical"
                icon={BatteryCharging}
              />
            </div>
          </div>
        </div>

        {/* alarm feed */}
        <div className="mt-2.5 rounded-sm border border-border bg-surface/70">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
              Live alarm stream
            </span>
            <span className="animate-blink font-mono text-[9px] text-primary">streaming</span>
          </div>
          <ul className="divide-y divide-border">
            {feed.map((f, i) => (
              <li
                key={f.t}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 font-mono text-[10px] transition-colors",
                  i === step ? "bg-primary/[0.06]" : "",
                  i > 2 && "hidden sm:flex",
                )}
              >
                <span className="text-muted-foreground">{f.t}</span>
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    f.tone === "critical"
                      ? "bg-critical"
                      : f.tone === "major"
                        ? "bg-major"
                        : "bg-info",
                  )}
                />
                <span className="text-foreground">{f.s}</span>
                <span className="truncate text-muted-foreground">{f.m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
