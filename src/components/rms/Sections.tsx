import { cn } from "@/lib/utils";
import { GisMap } from "./GisMap";
import {
  Reveal,
  SectionHeading,
  SectionShell,
  SeverityBadge,
  StatusDot,
  GridBackdrop,
  CtaGhost,
  CtaPrimary,
  type Severity,
} from "./primitives";
import {
  Activity,
  AlertTriangle,
  Antenna,
  BellRing,
  BrainCircuit,
  Camera,
  Cpu,
  DoorOpen,
  Droplets,
  Fuel,
  Gauge,
  LineChart,
  Lock,
  MapPinned,
  Power,
  Radio,
  RefreshCw,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ About */

const pillars = [
  {
    icon: Radio,
    title: "Sense",
    copy: "Sensors and edge controllers capture power, fuel, energy, environment, security and asset telemetry at every site.",
  },
  {
    icon: BrainCircuit,
    title: "Understand",
    copy: "Streaming analytics turn raw signals into health scores, anomalies, trends and early warnings.",
  },
  {
    icon: SlidersHorizontal,
    title: "Act",
    copy: "Alerts, incident workflows and authorized remote control close the loop — from detection to resolution.",
  },
];

export function About() {
  return (
    <SectionShell id="about">
      <GridBackdrop className="opacity-40" />
      <div className="container-rms relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
          <SectionHeading
            eyebrow="About RMS360"
            title={
              <>
                One platform for every remote site,
                <span className="text-muted-foreground"> asset and signal.</span>
              </>
            }
            copy="RMS360 is an intelligent remote monitoring and infrastructure management platform. It connects distributed sites to a single operational picture — continuously measuring what matters, detecting what is changing, and giving teams the control to respond without a site visit."
          />

          <div className="grid gap-3 self-center">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <div className="group flex gap-4 rounded-md border border-border bg-surface/40 p-5 transition-colors hover:border-primary/40 hover:bg-surface-2/40">
                  <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-primary/30 bg-primary/10 text-primary">
                    <p.icon className="size-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------- Solutions */

const solutions = [
  {
    icon: Power,
    title: "Power",
    copy: "Monitor grid availability, generator status, voltage, current, battery systems, rectifiers and UPS infrastructure.",
    metric: "99.1% mains availability",
  },
  {
    icon: Fuel,
    title: "Fuel",
    copy: "Track fuel levels, consumption patterns, refuelling activities and abnormal fuel behaviour.",
    metric: "41 low-fuel sites flagged",
  },
  {
    icon: Zap,
    title: "Energy",
    copy: "Monitor energy generation, consumption, load behaviour and renewable energy systems.",
    metric: "grid 68% · gen 32%",
  },
  {
    icon: Thermometer,
    title: "Environment",
    copy: "Temperature, humidity, water ingress and airflow — protecting sensitive equipment.",
    metric: "18 thermal excursions",
  },
  {
    icon: DoorOpen,
    title: "Security",
    copy: "Monitor doors, access events, intrusion sensors and security infrastructure.",
    metric: "16 events / 24h",
  },
  {
    icon: Server,
    title: "Assets",
    copy: "Track the operational status and health of critical equipment across your sites.",
    metric: "8,412 assets tracked",
  },
  {
    icon: Camera,
    title: "CCTV",
    copy: "Integrate cameras and video intelligence into your operational monitoring environment.",
    metric: "1,208 cameras online",
  },
  {
    icon: Gauge,
    title: "One operational view",
    copy: "Bring critical infrastructure data together in one intelligent platform for faster decisions.",
    metric: "94.4 average health",
  },
];

export function Solutions() {
  return (
    <SectionShell id="solutions" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading
          eyebrow="What we monitor"
          title="Every critical domain, on one pane of glass"
          copy="RMS360 unifies the signals that determine uptime — so no domain is monitored in isolation."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 90}>
              <div className="group h-full bg-background p-6 transition-colors hover:bg-surface-2/50">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-sm border border-border bg-surface/60 text-primary transition-colors group-hover:border-primary/40">
                    <s.icon className="size-4" />
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground/70 uppercase">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <div className="mt-5 border-t border-border pt-3 font-mono text-[10px] tracking-[0.1em] text-primary/80 uppercase">
                  {s.metric}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Features */

const features = [
  {
    icon: Activity,
    title: "Real-time telemetry",
    copy: "Sub-minute polling and event-driven push from every controller, with store-and-forward during outages.",
  },
  {
    icon: BellRing,
    title: "Intelligent alerting",
    copy: "Severity-graded alarms with de-duplication, suppression windows and escalation matrices.",
  },
  {
    icon: LineChart,
    title: "Analytics & reporting",
    copy: "Scheduled operational reports, SLA compliance, energy and fuel analytics with export.",
  },
  {
    icon: MapPinned,
    title: "GIS operations view",
    copy: "Geospatial clustering, status colouring and drill-down from region to a single asset.",
  },
  {
    icon: Wrench,
    title: "Incident management",
    copy: "Ticketing, assignment, field acknowledgement, resolution notes and mean-time-to-repair tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based control",
    copy: "Granular permissions, approval gates and a tamper-evident audit log for every command.",
  },
];

export function Features() {
  return (
    <SectionShell id="features">
      <div className="container-rms relative">
        <SectionHeading
          align="center"
          eyebrow="Platform capabilities"
          title="Built for operations at national scale"
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 100}>
              <div className="relative h-full overflow-hidden rounded-md border border-border bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "var(--gradient-accent)" }}
                />
                <f.icon className="size-5 text-primary" />
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------ Management modules */

const managementModules = [
  {
    icon: Server,
    eyebrow: "Asset management",
    title: "Every asset. One platform.",
    copy: "Create a digital record of every critical asset and view its history, status, alarms, maintenance information and operational performance from one place.",
    items: "Generators · Batteries · Rectifiers · Solar systems · Fuel tanks · Controllers · Sensors · Cameras",
  },
  {
    icon: LineChart,
    eyebrow: "Reports & analytics",
    title: "Turn data into decisions",
    copy: "Transform raw operational data into meaningful business intelligence for operational and management teams.",
    items: "Fuel · Energy · Generator · Power · Battery · Alarm · Site · Security · Maintenance · SLA",
  },
];

export function ManagementModules() {
  return (
    <SectionShell id="management" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading
          align="center"
          eyebrow="Management dashboard"
          title="Your command centre"
          copy="Give management and operations teams a consolidated view of infrastructure performance."
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
          {managementModules.map((module, i) => (
            <Reveal key={module.eyebrow} delay={i * 100}>
              <article className="h-full rounded-md border border-border bg-background p-6">
                <module.icon className="size-5 text-primary" />
                <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {module.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{module.copy}</p>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-primary/80">
                  {module.items}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Platform */

const alarms: { id: string; site: string; level: Severity; msg: string; age: string }[] = [
  { id: "ALM-88214", site: "LAG-042", level: "Critical", msg: "Mains failure — on generator", age: "2m" },
  { id: "ALM-88213", site: "ENU-206", level: "Critical", msg: "Battery voltage 43.1V", age: "6m" },
  { id: "ALM-88209", site: "KAD-118", level: "Major", msg: "Fuel level 18% below threshold", age: "14m" },
  { id: "ALM-88201", site: "PHC-090", level: "Minor", msg: "Shelter temperature 41°C", age: "31m" },
  { id: "ALM-88197", site: "YOL-077", level: "Warning", msg: "Rectifier load imbalance", age: "48m" },
  { id: "ALM-88190", site: "JOS-051", level: "Information", msg: "Door opened — technician verified", age: "1h" },
];

export function Alerts() {
  return (
    <SectionShell id="platform" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <SectionHeading
              eyebrow="Alerts & notifications"
              title="Know when something needs attention"
              copy="RMS360 continuously monitors your infrastructure and automatically generates alerts when predefined conditions occur."
          />

          <Reveal delay={120}>
            <div className="panel overflow-hidden rounded-lg">
              <div className="flex items-center justify-between border-b border-border bg-surface-2/40 px-4 py-3">
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  Alarm console
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                  <StatusDot tone="critical" /> 9 critical
                </span>
              </div>
              <ul className="divide-y divide-border">
                {alarms.map((a, i) => (
                  <li
                    key={a.id}
                    className={cn(
                      "flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 transition-colors hover:bg-primary/[0.04]",
                      i > 3 && "hidden sm:flex",
                    )}
                  >
                    <SeverityBadge level={a.level} />
                    <span className="font-mono text-[11px] text-foreground">{a.site}</span>
                    <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                      {a.msg}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/70">{a.age}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-border bg-surface-2/30 px-4 py-3 font-mono text-[10px] text-muted-foreground">
                <span>MTTA 4m 12s · MTTR 1h 38m</span>
                <span className="text-primary">escalation matrix active</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------- GIS */

export function Gis() {
  return (
    <SectionShell id="gis">
      <div className="container-rms relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <Reveal>
            <GisMap className="h-72 w-full sm:h-96" showSweep />
          </Reveal>
          <SectionHeading
            eyebrow="GIS"
            title="See your infrastructure on the map"
            copy="Visualise your entire infrastructure geographically, from a national overview down to an individual site."
          />
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------ AI/Analytics */

const intelligence = [
  {
    icon: BrainCircuit,
    title: "Anomaly detection",
    copy: "Baselines per site and per asset class surface abnormal behaviour before a threshold is ever breached.",
  },
  {
    icon: LineChart,
    title: "Predictive maintenance",
    copy: "Runtime, load and degradation curves forecast component failure windows and service needs.",
  },
  {
    icon: Fuel,
    title: "Consumption forecasting",
    copy: "Fuel and energy demand projections drive refuel scheduling and reduce emergency logistics.",
  },
  {
    icon: AlertTriangle,
    title: "Root-cause correlation",
    copy: "Related alarms are grouped into a single probable cause, cutting alarm noise dramatically.",
  },
];

export function Intelligence() {
  return (
    <SectionShell id="ai" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading
          eyebrow="AI & intelligence"
          title="Move from monitoring to prediction"
          copy="RMS360 helps you understand what is happening, why it is happening and what may happen next."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {intelligence.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 100}>
              <div className="flex h-full gap-5 rounded-md border border-border bg-background p-6 transition-colors hover:border-primary/40">
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-primary/30 bg-primary/10 text-primary">
                  <f.icon className="size-4.5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------- Remote control */

const controls = [
  { label: "Generator start / stop", state: "Authorized" },
  { label: "Rectifier reset", state: "Authorized" },
  { label: "Load transfer", state: "Approval required" },
  { label: "Door release", state: "Dual approval" },
  { label: "Controller firmware push", state: "Scheduled" },
];

export function RemoteControl() {
  return (
    <SectionShell id="control">
      <div className="container-rms relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Remote control"
            title="Don't just see. Take action."
            copy="Where supported by deployed hardware and customer authorization, RMS360 provides authenticated, authorized and recorded remote control capabilities."
          />
          <Reveal delay={120}>
            <div className="panel rounded-lg p-5">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                <span>Command palette</span>
                <span className="inline-flex items-center gap-2">
                  <Lock className="size-3 text-primary" /> RBAC enforced
                </span>
              </div>
              <ul className="mt-4 grid gap-2">
                {controls.map((c, i) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between gap-4 rounded-sm border border-border bg-surface/60 px-4 py-3 transition-colors hover:border-primary/40"
                    style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                  >
                    <span className="flex items-center gap-3 text-sm text-foreground">
                      <RefreshCw className="size-3.5 text-primary/80" />
                      {c.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      {c.state}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] text-muted-foreground">
                every command written to an immutable audit trail
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Hardware */

const hardwareSpecs = [
  { k: "Protocols", v: "Modbus RTU/TCP · SNMP · MQTT · CAN · dry contact" },
  { k: "Connectivity", v: "LTE/4G · Ethernet · satellite failover" },
  { k: "Inputs", v: "Analog, digital, pulse and serial sensor channels" },
  { k: "Resilience", v: "Local buffering, watchdog and remote firmware update" },
  { k: "Security", v: "Mutual TLS, signed firmware, device identity" },
  { k: "Power", v: "Wide DC input with battery-backed operation" },
];

export function Hardware() {
  return (
    <SectionShell id="hardware" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="panel relative overflow-hidden rounded-lg p-8">
              <GridBackdrop className="opacity-50" />
              <div className="relative mx-auto max-w-sm">
                <div className="rounded-md border border-primary/25 bg-[oklch(0.2_0.03_258)] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold tracking-tight">
                      RMS360 Edge Controller
                    </span>
                    <Cpu className="size-4 text-primary" />
                  </div>
                  <div className="mt-5 grid grid-cols-6 gap-1.5">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-4 rounded-[2px] border border-border/70 bg-surface-2/70",
                          i % 5 === 0 && "border-primary/40 bg-primary/20",
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <StatusDot tone="healthy" /> ONLINE
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Antenna className="size-3 text-primary" /> LTE −71 dBm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Hardware"
              title="Built for the field"
              copy="RMS360 connects the physical world to your operational command centre through an intelligent edge monitoring architecture."
            />
            <dl className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border">
              {hardwareSpecs.map((s, i) => (
                <Reveal key={s.k} delay={i * 60}>
                  <div className="flex flex-col gap-1 bg-background px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                    <dt className="w-40 shrink-0 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      {s.k}
                    </dt>
                    <dd className="text-sm text-foreground">{s.v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------ How it works */

const steps = [
  { icon: Thermometer, title: "Sense", copy: "Sensors, meters and equipment controllers collect operational data from the field." },
  { icon: Antenna, title: "Connect", copy: "The RMS360 edge device securely communicates with the cloud platform through available networks." },
  { icon: Cpu, title: "Process", copy: "RMS360 processes, stores and analyses incoming data." },
  { icon: Gauge, title: "Visualise", copy: "Operators access real-time information through dashboards, GIS, reports and asset views." },
  { icon: BellRing, title: "Alert", copy: "The platform identifies predefined abnormal conditions and generates alerts." },
  { icon: Wrench, title: "Act", copy: "Teams respond, create tickets or execute authorised remote commands." },
];

export function HowItWorks() {
  return (
    <SectionShell id="how-it-works">
      <div className="container-rms relative">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From sensor to insight"
        />
        <div className="relative mt-16">
          <div aria-hidden className="hairline-x absolute top-6 right-0 left-0 hidden lg:block" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110}>
                <div className="relative h-full">
                  <span className="relative z-10 grid size-12 place-items-center rounded-md border border-primary/30 bg-background text-primary shadow-[var(--shadow-glow)]">
                    <s.icon className="size-5" />
                  </span>
                  <div className="mt-5">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      Step 0{i + 1}
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <CtaPrimary>Request a Demo</CtaPrimary>
            <CtaGhost href="#industries">See who uses RMS360</CtaGhost>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
