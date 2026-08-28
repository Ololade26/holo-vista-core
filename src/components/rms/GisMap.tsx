import { cn } from "@/lib/utils";
import { useCycle } from "@/hooks/use-reveal";

type Site = { x: number; y: number; tone: "healthy" | "critical" | "major" | "info"; id: string };

export const SITES: Site[] = [
  { x: 18, y: 26, tone: "healthy", id: "ABJ-004" },
  { x: 31, y: 44, tone: "major", id: "KAD-118" },
  { x: 24, y: 62, tone: "healthy", id: "ILR-072" },
  { x: 44, y: 33, tone: "healthy", id: "JOS-051" },
  { x: 57, y: 52, tone: "critical", id: "ENU-206" },
  { x: 69, y: 30, tone: "healthy", id: "MAI-011" },
  { x: 12, y: 74, tone: "critical", id: "LAG-042" },
  { x: 48, y: 74, tone: "info", id: "PHC-090" },
  { x: 78, y: 63, tone: "healthy", id: "CAL-133" },
  { x: 63, y: 15, tone: "healthy", id: "SOK-002" },
  { x: 36, y: 15, tone: "info", id: "KAN-019" },
  { x: 85, y: 42, tone: "major", id: "YOL-077" },
];

const toneColor: Record<Site["tone"], string> = {
  healthy: "bg-healthy",
  critical: "bg-critical",
  major: "bg-major",
  info: "bg-info",
};

export function GisMap({
  className,
  compact = false,
  showSweep = true,
}: {
  className?: string;
  compact?: boolean;
  showSweep?: boolean;
}) {
  const active = useCycle(SITES.length, 2200);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-[oklch(0.185_0.03_258)]",
        className,
      )}
    >
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 40% 40%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />

      {/* abstract landmass */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path
          d="M8 30 L26 16 L48 10 L70 14 L88 26 L92 46 L84 68 L64 82 L40 86 L18 78 L6 58 Z"
          fill="color-mix(in oklab, var(--primary) 7%, transparent)"
          stroke="color-mix(in oklab, var(--primary) 40%, transparent)"
          strokeWidth="0.35"
        />
        <path
          d="M30 18 L34 44 L58 50 L62 78"
          fill="none"
          stroke="color-mix(in oklab, var(--foreground) 12%, transparent)"
          strokeWidth="0.25"
        />
        <path
          d="M12 56 L44 34 L84 44"
          fill="none"
          stroke="color-mix(in oklab, var(--foreground) 12%, transparent)"
          strokeWidth="0.25"
        />
        {SITES.slice(0, 8).map((s, i) => {
          const next = SITES[(i + 3) % SITES.length]!;
          return (
            <line
              key={s.id}
              x1={s.x}
              y1={s.y}
              x2={next.x}
              y2={next.y}
              stroke="color-mix(in oklab, var(--primary) 26%, transparent)"
              strokeWidth="0.18"
              strokeDasharray="2 3"
              className="animate-dash"
              style={{ animationDelay: `${i * 260}ms` }}
            />
          );
        })}
      </svg>

      {showSweep ? (
        <div
          aria-hidden
          className="animate-sweep absolute top-1/2 left-1/2 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, color-mix(in oklab, var(--primary) 24%, transparent), transparent 28%)",
          }}
        />
      ) : null}

      {SITES.map((s, i) => (
        <div
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <span className="relative flex size-2 items-center justify-center">
            <span className={cn("z-10 size-1.5 rounded-full", toneColor[s.tone])} />
            <span
              className={cn(
                "animate-pulse-ring absolute inset-0 rounded-full",
                toneColor[s.tone],
              )}
              style={{ animationDelay: `${i * 190}ms` }}
            />
          </span>
          {!compact && i === active ? (
            <div className="glass absolute top-3 left-3 z-20 rounded-sm px-2 py-1 font-mono text-[10px] whitespace-nowrap">
              <span className="text-foreground">{s.id}</span>
              <span className="ml-2 text-muted-foreground">
                {s.tone === "critical"
                  ? "POWER FAIL"
                  : s.tone === "major"
                    ? "LOW FUEL"
                    : s.tone === "info"
                      ? "TECHNICIAN"
                      : "HEALTHY"}
              </span>
            </div>
          ) : null}
        </div>
      ))}

      {!compact ? (
        <div className="glass absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-sm px-3 py-2 font-mono text-[10px] text-muted-foreground">
          {(
            [
              ["healthy", "Healthy"],
              ["major", "Attention"],
              ["critical", "Critical"],
              ["info", "Technician"],
            ] as const
          ).map(([tone, label]) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span className={cn("size-1.5 rounded-full", toneColor[tone])} />
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
