import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  CircleDot,
  MapPin,
  Search,
  Server,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SeverityBadge, StatusDot, type Severity } from "./primitives";
import {
  demoInfrastructureSites,
  type InfrastructureSite,
  type InfrastructureType,
  type SiteHealth,
} from "./sites-demo-data";

const healthOptions: Array<"All" | SiteHealth> = ["All", "Healthy", "Warning", "Critical", "Offline", "Maintenance"];
const typeOptions: Array<"All" | InfrastructureType> = ["All", "Telecom tower", "Power substation", "Fuel depot", "Water treatment"];
const locations = ["All", ...new Set(demoInfrastructureSites.map((site) => site.location.split(", ")[1]).filter(Boolean))];

const healthTone: Record<SiteHealth, "healthy" | "major" | "critical" | "info"> = {
  Healthy: "healthy",
  Warning: "major",
  Critical: "critical",
  Offline: "critical",
  Maintenance: "info",
};

const healthStyles: Record<SiteHealth, string> = {
  Healthy: "text-healthy border-healthy/30 bg-healthy/10",
  Warning: "text-major border-major/30 bg-major/10",
  Critical: "text-critical border-critical/30 bg-critical/10",
  Offline: "text-critical border-critical/30 bg-critical/10",
  Maintenance: "text-info border-info/30 bg-info/10",
};

const severityMap: Record<string, Severity> = {
  Critical: "Critical",
  Major: "Major",
  Minor: "Minor",
  Warning: "Warning",
  Information: "Information",
};

function Label({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{children}</span>;
}

function HealthBadge({ health }: { health: SiteHealth }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[10px] font-medium", healthStyles[health])}><StatusDot tone={healthTone[health]} pulse={health === "Critical" || health === "Warning"} />{health}</span>;
}

function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="flex min-w-0 flex-1 flex-col gap-1"><Label>{label}</Label><select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full rounded-sm border border-border bg-background/60 px-2 text-xs text-foreground outline-none focus:border-primary/60">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function SiteDetail({ site, onClose }: { site: InfrastructureSite; onClose: () => void }) {
  return <aside className="absolute inset-y-0 right-0 z-30 w-full max-w-xl overflow-y-auto border-l border-hairline bg-surface-2 shadow-2xl" aria-label={`${site.name} site details`}>
    <div className="sticky top-0 z-10 flex items-start justify-between border-b border-hairline bg-surface-2/95 p-4 backdrop-blur"><div><div className="flex items-center gap-2"><Label>Selected site</Label><HealthBadge health={site.health} /></div><h3 className="mt-2 font-display text-xl font-semibold">{site.name}</h3><p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground"><MapPin className="size-3" />{site.id} / {site.location}</p></div><button type="button" onClick={onClose} aria-label="Close site details" className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"><X className="size-4" /></button></div>
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Connectivity</Label><p className="mt-2 text-xs font-medium text-foreground">{site.connectivity}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Power</Label><p className="mt-2 text-xs font-medium text-foreground">{site.power}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Equipment</Label><p className="mt-2 text-xs font-medium text-foreground">{site.equipment}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Last communication</Label><p className="mt-2 text-xs font-medium text-foreground">{site.lastCommunication}</p></div></div>
      <div><div className="mb-2 flex items-center justify-between"><Label>Key telemetry</Label><span className="font-mono text-[9px] text-muted-foreground">demo readings</span></div><div className="grid grid-cols-2 gap-2">{site.telemetry.map((metric) => <div key={metric.label} className="rounded-sm border border-hairline bg-surface/50 p-3"><Label>{metric.label}</Label><p className="mt-2 font-numeric text-lg font-semibold text-foreground">{metric.value}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{metric.detail}</p></div>)}</div></div>
      <div><div className="mb-2 flex items-center justify-between"><Label>Recent alerts</Label><span className="font-mono text-[9px] text-muted-foreground">{site.alertCount} total</span></div><div className="divide-y divide-hairline rounded-sm border border-hairline bg-surface/50">{site.alerts.map((alert) => <div key={`${alert.time}-${alert.message}`} className="flex items-start justify-between gap-3 p-3"><div className="flex min-w-0 items-start gap-2"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" /><div><p className="text-xs text-foreground">{alert.message}</p><p className="mt-1 font-mono text-[9px] text-muted-foreground">{alert.time} UTC</p></div></div><SeverityBadge level={severityMap[alert.severity]} /></div>)}</div></div>
      <div><Label>Recent activity</Label><div className="mt-2 space-y-2">{site.activity.map((item) => <div key={`${item.time}-${item.event}`} className="flex gap-3 border-l border-primary/30 pl-3"><div className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" /><div><p className="text-xs text-foreground">{item.event}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{item.time} / {item.detail}</p></div></div>)}</div></div>
      <div className="rounded-sm border border-primary/20 bg-primary/[0.06] p-3 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-primary">Demonstration record.</span> Site details and telemetry are fictional local data for evaluating the RMS360 interface. They do not represent live infrastructure.</div>
    </div>
  </aside>;
}

export function SitesInfrastructure({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState<"All" | SiteHealth>("All");
  const [type, setType] = useState<"All" | InfrastructureType>("All");
  const [location, setLocation] = useState("All");
  const [selectedSite, setSelectedSite] = useState<InfrastructureSite | null>(null);

  const filteredSites = useMemo(() => demoInfrastructureSites.filter((site) => {
    const haystack = `${site.name} ${site.id}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (health === "All" || site.health === health) && (type === "All" || site.type === type) && (location === "All" || site.location.endsWith(location));
  }), [health, location, query, type]);

  return <section id="sites" className={cn("relative border-y border-hairline bg-surface/20 py-16 sm:py-20", className)}>
    <div className="container-rms">
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="flex items-center gap-3"><span className="h-px w-8 bg-primary/60" /><span className="eyebrow">Asset operations</span></div><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Sites &amp; Infrastructure</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">A structured view of every connected site, its operating condition, and the signals that need attention.</p></div><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><Server className="size-3.5 text-primary" /><span className="font-mono tracking-[0.12em] uppercase">{demoInfrastructureSites.length} demo sites indexed</span></div></div>
      <div className="panel relative overflow-hidden rounded-xl p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-3 border-b border-hairline pb-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><Activity className="size-4 text-primary" /><Label>Site register</Label></div><span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><CircleDot className="size-3 text-healthy" /> Demo environment</span></div>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Total sites</Label><p className="mt-2 font-numeric text-2xl font-bold text-foreground">8,412</p><p className="mt-1 text-[10px] text-muted-foreground">Platform-wide register</p></div><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Healthy</Label><p className="mt-2 font-numeric text-2xl font-bold text-healthy">7,946</p><p className="mt-1 text-[10px] text-muted-foreground">94.4% of fleet</p></div><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Needs attention</Label><p className="mt-2 font-numeric text-2xl font-bold text-major">466</p><p className="mt-1 text-[10px] text-muted-foreground">Warning, critical, offline</p></div><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Communication</Label><p className="mt-2 font-numeric text-2xl font-bold text-primary">99.1%</p><p className="mt-1 text-[10px] text-muted-foreground">Demo network availability</p></div></div>
        <div className="mt-3 rounded-md border border-hairline bg-surface/40 p-3"><div className="mb-3 flex items-center gap-2"><SlidersHorizontal className="size-3.5 text-primary" /><Label>Search and filter sites</Label></div><div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"><label className="relative flex min-w-0 flex-col gap-1 sm:col-span-2 lg:col-span-1"><Label>Search</Label><Search className="absolute bottom-2.5 left-2.5 size-3.5 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Site name or ID" aria-label="Search by site name or ID" className="h-9 w-full rounded-sm border border-border bg-background/60 pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary/60" /></label><SelectFilter label="Health / status" value={health} options={healthOptions} onChange={(value) => setHealth(value as "All" | SiteHealth)} /><SelectFilter label="Infrastructure type" value={type} options={typeOptions} onChange={(value) => setType(value as "All" | InfrastructureType)} /><SelectFilter label="Location" value={location} options={locations} onChange={setLocation} /></div><div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3"><span className="text-[10px] text-muted-foreground">Showing <span className="font-semibold text-foreground">{filteredSites.length}</span> of {demoInfrastructureSites.length} demo records</span><button type="button" onClick={() => { setQuery(""); setHealth("All"); setType("All"); setLocation("All"); }} className="text-[10px] text-primary hover:underline">Clear filters</button></div></div>
        <div className="mt-3 grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">{filteredSites.map((site) => <button type="button" key={site.id} onClick={() => setSelectedSite(site)} className="group rounded-md border border-hairline bg-surface/50 p-3 text-left transition-colors hover:border-primary/50 hover:bg-surface-2/60"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">{site.name}</p><p className="mt-1 flex items-center gap-1 font-mono text-[9px] text-muted-foreground"><MapPin className="size-3" />{site.id} / {site.location}</p></div><ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground group-hover:text-primary" /></div><div className="mt-3 flex items-center justify-between gap-2"><HealthBadge health={site.health} /><span className="font-mono text-[9px] text-muted-foreground">{site.type}</span></div><div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-hairline pt-3"><div><Label>Connectivity</Label><p className={cn("mt-1 text-[10px]", site.connectivity === "Connected" ? "text-healthy" : "text-critical")}>{site.connectivity}</p></div><div><Label>Power</Label><p className="mt-1 truncate text-[10px] text-foreground/80">{site.power}</p></div><div><Label>Equipment</Label><p className="mt-1 truncate text-[10px] text-foreground/80">{site.equipment}</p></div><div><Label>Alerts / last comms</Label><p className="mt-1 text-[10px] text-foreground/80">{site.alertCount} / {site.lastCommunication}</p></div></div></button>)}{filteredSites.length === 0 ? <div className="rounded-md border border-dashed border-border p-10 text-center text-xs text-muted-foreground md:col-span-2 xl:col-span-3">No demo sites match the current filters.</div> : null}</div>
        {selectedSite ? <SiteDetail site={selectedSite} onClose={() => setSelectedSite(null)} /> : null}
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground"><span className="font-semibold text-primary">Demo data only.</span> The sites, health states, alerts, and telemetry shown here are fictional examples for the RMS360 product experience.</p>
    </div>
  </section>;
}
