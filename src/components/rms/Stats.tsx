import { useCountUp, useInView } from "@/hooks/use-reveal";

const stats = [
  { value: 10000, suffix: "+", label: "Initial site capacity" },
  { value: 100000, suffix: "", label: "Target site capacity" },
  { value: 10000, suffix: "+", label: "Concurrent users" },
  { value: 100, suffix: "M+", label: "Telemetry records per day" },
];

function Stat({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="relative px-5 py-8 md:px-8">
      <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {n.toLocaleString("en-US")}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView(0.3);
  return (
    <section className="relative border-y border-border bg-surface/30" ref={ref}>
      <div className="container-rms">
        <div className="grid divide-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
      <div aria-hidden className="hairline-x absolute inset-x-0 bottom-0" />
    </section>
  );
}
