import { cn } from "@/lib/utils";
import { Reveal, SectionHeading, SectionShell, GridBackdrop, CtaPrimary, CtaGhost } from "./primitives";
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  Droplets,
  Factory,
  Fingerprint,
  FileLock2,
  KeyRound,
  Mail,
  Phone,
  Radio,
  ServerCog,
  ShieldCheck,
  Signal,
  Sun,
  Truck,
} from "lucide-react";

/* ------------------------------------------------------------- Industries */

const industries = [
  { icon: Signal, title: "Telecom operators", copy: "Tower and BTS site uptime, energy cost control and vendor SLA enforcement." },
  { icon: Sun, title: "Energy & renewables", copy: "Solar hybrid, battery and diesel plant performance across dispersed generation." },
  { icon: Banknote, title: "Banking & ATMs", copy: "Branch and ATM power continuity, environment and physical security." },
  { icon: Building2, title: "Data centres", copy: "Edge facility power chain, cooling and access monitoring." },
  { icon: Droplets, title: "Water utilities", copy: "Pump stations, reservoirs and treatment site telemetry." },
  { icon: Factory, title: "Industrial & manufacturing", copy: "Distributed plant assets, utilities and critical machinery." },
  { icon: Truck, title: "Logistics & retail", copy: "Depots, cold chain and multi-branch estate monitoring." },
  { icon: ServerCog, title: "Managed service providers", copy: "Multi-tenant operations with per-client visibility and reporting." },
];

export function Industries() {
  return (
    <SectionShell id="industries" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading
          eyebrow="Who it is for"
          title="Organizations managing distributed critical infrastructure"
          copy="Wherever uptime depends on sites nobody can visit every day, RMS360 becomes the operational system of record."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 90}>
              <div className="group h-full rounded-md border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <s.icon className="size-5 text-primary" />
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------------------------- Security */

const security = [
  { icon: KeyRound, title: "Identity & access", copy: "SSO-ready authentication, role-based permissions and least-privilege defaults." },
  { icon: FileLock2, title: "Data protection", copy: "Encryption in transit and at rest, with tenant isolation across every layer." },
  { icon: Fingerprint, title: "Auditability", copy: "Immutable logs for every login, configuration change and remote command." },
  { icon: ShieldCheck, title: "Device trust", copy: "Signed firmware, mutual TLS and unique device identity per controller." },
];

export function Security() {
  return (
    <SectionShell id="security">
      <GridBackdrop className="opacity-40" />
      <div className="container-rms relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Security & reliability"
            title="Enterprise trust, engineered in"
            copy="RMS360 is designed for environments where availability, integrity and accountability are non-negotiable."
          />
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {security.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <div className="h-full bg-background p-6">
                  <s.icon className="size-5 text-primary" />
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------- Why RMS360 */

const reasons = [
  "Unified monitoring across power, fuel, energy, environment, security, assets and CCTV",
  "Scales from thousands to a hundred thousand sites without re-platforming",
  "Predictive intelligence that reduces truck rolls and emergency logistics",
  "Authorized remote control with approval gates and full audit history",
  "Vendor-neutral integration with existing sensors, controllers and systems",
  "Operational reporting that stands up to executive and regulatory scrutiny",
];

export function Why() {
  return (
    <SectionShell id="why" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading align="center" eyebrow="Why RMS360" title="The operational advantage" />
        <div className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r} delay={(i % 2) * 90}>
              <div className="flex h-full items-start gap-3 bg-background p-5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------- Final CTA */

export function FinalCta() {
  return (
    <section id="demo" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <GridBackdrop className="opacity-60" />
      <div className="container-rms relative text-center">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
            See everything · Know everything · Control everything
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-7 max-w-4xl text-3xl leading-[1.06] font-semibold text-balance sm:text-5xl md:text-6xl">
            Ready to see your entire infrastructure
            <span className="text-gradient"> in one place?</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Book a guided walkthrough of RMS360 with our solutions team and see live telemetry,
            alerting, analytics and remote control on real infrastructure.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaPrimary href="#demo">
              Request a Demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </CtaPrimary>
            <CtaGhost href="#platform">Talk to our team</CtaGhost>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Footer */

const footerNav = [
  {
    title: "Platform",
    links: [
      ["Overview", "#platform"],
      ["Features", "#features"],
      ["GIS operations", "#gis"],
      ["AI & analytics", "#ai"],
      ["Remote control", "#control"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Power monitoring", "#solutions"],
      ["Fuel management", "#solutions"],
      ["Energy performance", "#solutions"],
      ["Security & access", "#solutions"],
      ["Asset intelligence", "#solutions"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About RMS360", "#about"],
      ["Industries", "#industries"],
      ["How it works", "#how-it-works"],
      ["Security", "#security"],
      ["Request a demo", "#demo"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/30">
      <div className="container-rms py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="RMS360 home">
              <span className="grid size-8 place-items-center rounded-sm border border-primary/40 bg-primary/10">
                <Radio className="size-3.5 text-primary" />
              </span>
              <span className="font-display text-lg leading-none font-semibold tracking-tight">
                RMS<span className="text-primary">360</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Intelligent remote monitoring and infrastructure management for organizations running
              distributed critical infrastructure.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <span>© {new Date().getFullYear()} RMS360. All rights reserved.</span>
          <span>See everything · Know everything · Control everything</span>
        </div>
      </div>
    </footer>
  );
}
