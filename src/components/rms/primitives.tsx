import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-reveal";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const { ref, inView } = useInView();
  return (
    <As
      ref={ref as never}
      className={cn("reveal", inView && "is-revealed", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

export function SectionShell({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <div className="flex items-center gap-3" style={{ justifyContent: align === "center" ? "center" : undefined }}>
            <span className="h-px w-8 bg-primary/60" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <h2 className="mt-5 text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {copy ? (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

const ctaBase =
  "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium tracking-tight transition-all duration-300 will-change-transform active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function CtaPrimary({
  children,
  className,
  href = "#demo",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        ctaBase,
        "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function CtaGhost({
  children,
  className,
  href = "#platform",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        ctaBase,
        "border border-border bg-surface/40 text-foreground backdrop-blur hover:border-primary/50 hover:bg-surface-2/60",
        className,
      )}
    >
      {children}
    </a>
  );
}

const severityMap = {
  Critical: "text-critical border-critical/40 bg-critical/10",
  Major: "text-major border-major/40 bg-major/10",
  Minor: "text-minor border-minor/40 bg-minor/10",
  Warning: "text-warning border-warning/40 bg-warning/10",
  Information: "text-info border-info/40 bg-info/10",
} as const;

export type Severity = keyof typeof severityMap;

export function SeverityBadge({ level, className }: { level: Severity; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase",
        severityMap[level],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export function StatusDot({
  tone = "healthy",
  pulse = true,
  className,
}: {
  tone?: "healthy" | "critical" | "major" | "info";
  pulse?: boolean;
  className?: string;
}) {
  const color = {
    healthy: "bg-healthy",
    critical: "bg-critical",
    major: "bg-major",
    info: "bg-info",
  }[tone];
  return (
    <span className={cn("relative inline-flex size-2", className)}>
      <span className={cn("relative z-10 size-2 rounded-full", color)} />
      {pulse ? (
        <span
          className={cn(
            "animate-pulse-ring absolute inset-0 rounded-full",
            color,
          )}
        />
      ) : null}
    </span>
  );
}

export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]",
        className,
      )}
    />
  );
}
