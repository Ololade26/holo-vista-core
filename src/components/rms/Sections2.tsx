import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading, SectionShell, GridBackdrop, CtaGhost } from "./primitives";
import {
  Banknote,
  Building2,
  CheckCircle2,
  Droplets,
  Factory,
  Fingerprint,
  FileLock2,
  KeyRound,
  Radio,
  ShieldCheck,
  Signal,
  Sun,
} from "lucide-react";

/* ------------------------------------------------------------- Industries */

const industries = [
  { icon: Signal, title: "Telecommunications", copy: "Monitor tower sites, generators, batteries, fuel systems, power infrastructure and physical security across thousands of locations." },
  { icon: Sun, title: "Energy & utilities", copy: "Improve visibility across substations, power assets, renewable installations and distributed energy infrastructure." },
  { icon: Droplets, title: "Oil & gas", copy: "Monitor fuel, equipment, environmental conditions, security and operational parameters across remote facilities." },
  { icon: Banknote, title: "Solar & renewable energy", copy: "Monitor solar generation, battery systems, inverter performance and energy consumption." },
  { icon: Building2, title: "Data centres", copy: "Monitor power, cooling, environmental conditions, security and critical infrastructure." },
  { icon: Factory, title: "Commercial & industrial facilities", copy: "Connect distributed equipment and facility infrastructure to a central monitoring platform." },
];

export function Industries() {
  return (
    <SectionShell id="industries" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading
          eyebrow="Industries"
          title="Built for critical infrastructure"
          copy="RMS360 helps teams manage distributed infrastructure across industries where uptime, visibility and fast response matter."
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
  { icon: KeyRound, title: "Role-based access control", copy: "Control access by role and give each user only the permissions their work requires." },
  { icon: Fingerprint, title: "User authentication", copy: "Authenticate users before they access infrastructure data or operational controls." },
  { icon: FileLock2, title: "Audit trails", copy: "Keep a traceable record of important operational actions and remote commands." },
  { icon: ShieldCheck, title: "Secure communications", copy: "Protect communication between field devices, networks and the RMS360 platform." },
  { icon: KeyRound, title: "Access management", copy: "Manage access to sites, assets, workflows and platform capabilities." },
  { icon: FileLock2, title: "Data protection", copy: "Treat infrastructure data as critical and protect it across the platform." },
  { icon: Fingerprint, title: "Event logging", copy: "Make every important operational action traceable through platform event logs." },
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
  "Real-time visibility across your infrastructure",
  "Centralized operations from a single platform",
  "Faster response to incidents and alarms",
  "Better decisions supported by operational data",
  "Reduced operational costs through less waste and inefficiency",
  "Scalable architecture for individual sites to large distributed networks",
  "Integrated ecosystem of sensors, meters, controllers, cameras and third-party systems",
];

function sendDemoRequestByEmail(event: FormEvent<HTMLFormElement>, onSubmitted?: () => void) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const fields = [
    ["Name", formData.get("name")],
    ["Company", formData.get("company")],
    ["Email", formData.get("email")],
    ["Phone", formData.get("phone")],
    ["Industry", formData.get("industry")],
    ["Number of Sites", formData.get("sites")],
    ["Monitoring Requirements", formData.get("requirements")],
  ];
  const message = ["Hello, I would like to request a demo of RMS360.", "", ...fields.map(([label, value]) => `${label}: ${value || "Not provided"}`)].join("\n");
  window.location.href = `mailto:shadebtechlimited@gmail.com?subject=${encodeURIComponent("RMS360 Demo Request")}&body=${encodeURIComponent(message)}`;
  onSubmitted?.();
}

export function Why() {
  return (
    <SectionShell id="why" className="border-y border-border bg-surface/20">
      <div className="container-rms relative">
        <SectionHeading align="center" eyebrow="Why RMS360?" title="Why organizations choose RMS360" />
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
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="demo" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <GridBackdrop className="opacity-60" />
      <div className="container-rms relative text-center">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
            See Your Infrastructure Differently
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-7 max-w-4xl text-3xl leading-[1.06] font-semibold text-balance sm:text-5xl md:text-6xl">
            Ready to take control of your infrastructure?
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            RMS360 turns infrastructure data into visibility, intelligence and action.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CtaGhost onClick={() => setContactOpen(true)}>
              Talk to our team
            </CtaGhost>
          </div>
        </Reveal>

      </div>

      {contactOpen ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setContactOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-background p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 id="contact-dialog-title" className="font-display text-2xl font-semibold tracking-tight">
                  Request a Demo
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us about your infrastructure and monitoring requirements.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close contact form"
                onClick={() => setContactOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-sm border border-border text-lg text-muted-foreground hover:border-primary/50 hover:text-foreground"
              >
                ×
              </button>
            </div>
            <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={(event) => sendDemoRequestByEmail(event, () => setContactOpen(false))}>
              <input required name="name" placeholder="Name" aria-label="Name" className="h-10 rounded-sm border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60" />
              <input required name="company" placeholder="Company" aria-label="Company" className="h-10 rounded-sm border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60" />
              <input required type="email" name="email" placeholder="Email" aria-label="Email" className="h-10 rounded-sm border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60" />
              <input name="phone" placeholder="Phone" aria-label="Phone" className="h-10 rounded-sm border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60" />
              <input name="industry" placeholder="Industry" aria-label="Industry" className="h-10 rounded-sm border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60" />
              <input name="sites" placeholder="Number of sites" aria-label="Number of sites" className="h-10 rounded-sm border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60" />
              <textarea name="requirements" placeholder="Monitoring requirements" aria-label="Monitoring requirements" rows={3} className="resize-none rounded-sm border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 sm:col-span-2" />
              <button type="submit" className="inline-flex h-10 items-center justify-center rounded-sm bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:col-span-2">
                Submit
              </button>
            </form>
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 text-sm sm:flex-row sm:items-center sm:justify-center sm:gap-6">
              <a href="tel:+2348035106187" className="text-foreground hover:text-primary">+234 803 510 6187</a>
              <a href="mailto:shadebtechlimited@gmail.com" className="break-words text-foreground hover:text-primary">shadebtechlimited@gmail.com</a>
            </div>
          </div>
        </div>
      ) : null}
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
