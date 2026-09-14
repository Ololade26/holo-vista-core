import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  Check,
  ChevronRight,
  CircleX,
  Cpu,
  Fuel,
  Gauge,
  MapPin,
  Radio,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SeverityBadge, StatusDot, type Severity } from "./primitives";

type SiteStatus = "Healthy" | "Attention" | "Critical";
type AlertSeverity = "Critical" | "Major" | "Minor" | "Warning";

type Site = {
  id: string;
  name: string;
  region: string;
  status: SiteStatus;
  connectivity: string;
  power: string;
  equipment: string;
  lastCommunication: string;
  signal: number;
};

type Alert = {
  id: string;
  siteId: string;
  site: string;
  message: string;
  severity: AlertSeverity;
  time: string;
  category: string;
};

const sites: Site[] = [
  { id: "LAG-042", name: "Victoria Island Hub", region: "Lagos", status: "Critical", connectivity: "Offline", power: "Mains failed", equipment: "Generator standby", lastCommunication: "2 min ago", signal: 0 },
  { id: "KAD-118", name: "Kaduna North Relay", region: "Kaduna", status: "Attention", connectivity: "Connected", power: "Generator", equipment: "Fuel low", lastCommunication: "18 sec ago", signal: 78 },
  { id: "ENU-206", name: "Enugu Distribution", region: "Enugu", status: "Critical", connectivity: "Degraded", power: "Battery backup", equipment: "Battery low", lastCommunication: "44 sec ago", signal: 41 },
  { id: "JOS-051", name: "Jos Plateau Node", region: "Plateau", status: "Healthy", connectivity: "Connected", power: "Mains", equipment: "All nominal", lastCommunication: "8 sec ago", signal: 96 },
  { id: "PHC-090", name: "Port Harcourt South", region: "Rivers", status: "Attention", connectivity: "Connected", power: "Mains", equipment: "Temperature high", lastCommunication: "31 sec ago", signal: 86 },
  { id: "ABJ-014", name: "Abuja Core Exchange", region: "FCT", status: "Healthy", connectivity: "Connected", power: "Mains", equipment: "All nominal", lastCommunication: "5 sec ago", signal: 99 },
  { id: "IBD-077", name: "Ibadan West Tower", region: "Oyo", status: "Healthy", connectivity: "Connected", power: "Mains", equipment: "All nominal", lastCommunication: "12 sec ago", signal: 94 },
  { id: "KNO-032", name: "Kano Industrial Edge", region: "Kano", status: "Healthy", connectivity: "Connected", power: "Generator", equipment: "All nominal", lastCommunication: "23 sec ago", signal: 91 },
];

const initialAlerts: Alert[] = [
  { id: "ALT-7401", siteId: "LAG-042", site: "Victoria Island Hub", message: "Mains power unavailable", severity: "Critical", time: "12:04:18", category: "Power" },
  { id: "ALT-7400", siteId: "ENU-206", site: "Enugu Distribution", message: "Battery voltage below threshold", severity: "Critical", time: "12:03:11", category: "Equipment" },
  { id: "ALT-7399", siteId: "KAD-118", site: "Kaduna North Relay", message: "Fuel level below 20%", severity: "Major", time: "12:02:52", category: "Fuel" },
  { id: "ALT-7398", siteId: "PHC-090", site: "Port Harcourt South", message: "Cabinet temperature above setpoint", severity: "Major", time: "12:01:58", category: "Environment" },
  { id: "ALT-7397", siteId: "JOS-051", site: "Jos Plateau Node", message: "Access event acknowledged", severity: "Minor", time: "11:59:42", category: "Security" },
  { id: "ALT-7396", siteId: "KNO-032", site: "Kano Industrial Edge", message: "Generator runtime review due", severity: "Warning", time: "11:57:20", category: "Maintenance" },
];

const statusTone: Record<SiteStatus, "healthy" | "major" | "critical"> = {
  Healthy: "healthy",
  Attention: "major",
  Critical: "critical",
};

const severityTone: Record<AlertSeverity, Severity> = {
  Critical: "Critical",
  Major: "Major",
  Minor: "Minor",
  Warning: "Warning",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{children}</span>;
}

function Metric({ label, value, detail, icon: Icon, tone = "default" }: { label: string; value: string; detail: string; icon: React.ComponentType<{ className?: string }>; tone?: "default" | "healthy" | "critical" }) {
  return (
    <div className="rounded-md border border-hairline bg-surface/60 p-3">
      <div className="flex items-center justify-between gap-2"><SectionLabel>{label}</SectionLabel><Icon className={cn("size-4", tone === "critical" ? "text-critical" : tone === "healthy" ? "text-healthy" : "text-primary")} /></div>
      <div className={cn("mt-3 font-numeric text-2xl font-bold tabular-nums", tone === "critical" ? "text-critical" : tone === "healthy" ? "text-healthy" : "text-foreground")}>{value}</div>
      <div className="mt-1 text-[10px] text-muted-foreground">{detail}</div>
    </div>
  );
}

function SiteDetail({ site, onClose }: { site: Site; onClose: () => void }) {
  return (
    <div className="absolute inset-y-0 right-0 z-20 w-full max-w-md border-l border-hairline bg-surface-2 shadow-2xl">
      <div className="flex items-start justify-between border-b border-hairline p-4"><div><SectionLabel>Site detail</SectionLabel><h3 className="mt-1 font-display text-lg font-semibold">{site.name}</h3><p className="mt-1 font-mono text-[10px] text-muted-foreground">{site.id} / {site.region}</p></div><button type="button" onClick={onClose} aria-label="Close site details" className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground hover:text-foreground"><X className="size-4" /></button></div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {[['Status', site.status], ['Connectivity', site.connectivity], ['Power', site.power], ['Equipment', site.equipment], ['Last communication', site.lastCommunication], ['Signal strength', `${site.signal}%`]].map(([label, value]) => <div key={label} className="rounded-sm border border-hairline bg-surface/70 p-3"><SectionLabel>{label}</SectionLabel><p className="mt-2 text-sm font-medium text-foreground">{value}</p></div>)}
      </div>
      <div className="mx-4 rounded-sm border border-primary/20 bg-primary/[0.06] p-3 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-primary">Demo record.</span> This is locally generated monitoring data for interface demonstration only.</div>
    </div>
  );
}

function AlertDetail({ alert, onClose, onResolve }: { alert: Alert; onClose: () => void; onResolve: () => void }) {
  return (
    <div className="absolute inset-y-0 right-0 z-20 w-full max-w-md border-l border-hairline bg-surface-2 shadow-2xl">
      <div className="flex items-start justify-between border-b border-hairline p-4"><div><SectionLabel>Alert detail</SectionLabel><h3 className="mt-1 font-display text-lg font-semibold">{alert.message}</h3><p className="mt-1 font-mono text-[10px] text-muted-foreground">{alert.id} / {alert.siteId}</p></div><button type="button" onClick={onClose} aria-label="Close alert details" className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground hover:text-foreground"><X className="size-4" /></button></div>
      <div className="space-y-2 p-4"><div className="flex items-center justify-between"><SectionLabel>Severity</SectionLabel><SeverityBadge level={severityTone[alert.severity]} /></div><div className="flex items-center justify-between border-t border-hairline pt-3"><SectionLabel>Site</SectionLabel><span className="text-sm text-foreground">{alert.site}</span></div><div className="flex items-center justify-between border-t border-hairline pt-3"><SectionLabel>Category</SectionLabel><span className="text-sm text-foreground">{alert.category}</span></div><div className="flex items-center justify-between border-t border-hairline pt-3"><SectionLabel>Raised</SectionLabel><span className="font-mono text-xs text-muted-foreground">{alert.time} UTC</span></div></div>
      <div className="flex gap-2 p-4"><button type="button" onClick={onResolve} className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110"><Check className="size-3.5" /> Resolve demo alert</button><button type="button" onClick={onClose} className="rounded-sm border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground">Close</button></div>
    </div>
  );
}

export function DashboardConsole({ className }: { className?: string }) {
  const [statusFilter, setStatusFilter] = useState<"All" | SiteStatus>("All");
  const [severityFilter, setSeverityFilter] = useState<"All" | AlertSeverity>("All");
  const [query, setQuery] = useState("");
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredSites = useMemo(() => sites.filter((site) => {
    const matchesStatus = statusFilter === "All" || site.status === statusFilter;
    const haystack = `${site.id} ${site.name} ${site.region}`.toLowerCase();
    return matchesStatus && haystack.includes(query.toLowerCase());
  }), [query, statusFilter]);

  const filteredAlerts = useMemo(() => alerts.filter((alert) => severityFilter === "All" || alert.severity === severityFilter), [alerts, severityFilter]);
  const resolveAlert = (id: string) => { setAlerts((current) => current.filter((alert) => alert.id !== id)); setSelectedAlert(null); };

  return (
    <section id="command-center" className={cn("relative border-y border-hairline bg-background py-16 sm:py-20", className)}>
      <div className="container-rms">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="h-px w-8 bg-primary/60" /><span className="eyebrow">Operations workspace</span></div><h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">Command Center</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Monitor distributed infrastructure, investigate exceptions, and keep every site within view.</p></div><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><StatusDot tone="healthy" /><span className="font-mono tracking-[0.12em] uppercase">Demo environment</span></div></div>
        <div className="panel relative overflow-hidden rounded-xl p-3 sm:p-4">
          <div className="mb-3 flex flex-col gap-3 border-b border-hairline pb-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><Activity className="size-4 text-primary" /><SectionLabel>Fleet overview</SectionLabel></div><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><span className="size-1.5 rounded-full bg-healthy" /> Updated moments ago</div></div>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4"><Metric label="Sites monitored" value="8,412" detail="+38 sites this month" icon={Radio} /><Metric label="Sites healthy" value="7,946" detail="94.4% of monitored fleet" icon={ShieldCheck} tone="healthy" /><Metric label="Active alerts" value={String(74 - (initialAlerts.length - alerts.length))} detail="9 critical across fleet" icon={AlertTriangle} tone="critical" /><Metric label="Fleet health" value="94.4%" detail="30-day rolling performance" icon={Gauge} tone="healthy" /></div>
          <div className="mt-3 grid gap-3 xl:grid-cols-[1.5fr_1fr]">
            <div className="min-w-0 rounded-md border border-hairline bg-surface/40">
              <div className="flex flex-col gap-3 border-b border-hairline p-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><SectionLabel>Infrastructure sites</SectionLabel><span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary">{filteredSites.length} shown</span></div><div className="relative w-full sm:w-56"><Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sites" aria-label="Search monitoring sites" className="h-8 w-full rounded-sm border border-border bg-background/50 pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary/60" /></div></div>
              <div className="flex flex-wrap items-center gap-1.5 border-b border-hairline px-3 py-2"><SlidersHorizontal className="mr-1 size-3.5 text-muted-foreground" />{(["All", "Healthy", "Attention", "Critical"] as const).map((status) => <button type="button" key={status} onClick={() => setStatusFilter(status)} className={cn("rounded-sm px-2 py-1 text-[10px] font-medium transition-colors", statusFilter === status ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface-2 hover:text-foreground")}>{status}</button>)}</div>
              <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="border-b border-hairline text-[9px] tracking-[0.12em] text-muted-foreground uppercase"><tr><th className="px-3 py-2 font-medium">Site</th><th className="px-3 py-2 font-medium">Status</th><th className="px-3 py-2 font-medium">Connectivity</th><th className="px-3 py-2 font-medium">Power / equipment</th><th className="px-3 py-2 font-medium">Last communication</th><th /></tr></thead><tbody className="divide-y divide-hairline">{filteredSites.map((site) => <tr key={site.id} className="group hover:bg-primary/[0.04]"><td className="px-3 py-3"><button type="button" onClick={() => setSelectedSite(site)} className="text-left"><span className="block text-xs font-semibold text-foreground group-hover:text-primary">{site.name}</span><span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">{site.id} / {site.region}</span></button></td><td className="px-3 py-3"><span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground"><StatusDot tone={statusTone[site.status]} pulse={site.status !== "Healthy"} />{site.status}</span></td><td className="px-3 py-3"><span className={cn("text-[10px]", site.connectivity === "Connected" ? "text-healthy" : "text-critical")}>{site.connectivity}</span><span className="ml-2 font-mono text-[9px] text-muted-foreground">{site.signal}%</span></td><td className="px-3 py-3"><span className="block text-[10px] text-foreground/80">{site.power}</span><span className="block text-[9px] text-muted-foreground">{site.equipment}</span></td><td className="px-3 py-3 font-mono text-[10px] text-muted-foreground">{site.lastCommunication}</td><td className="px-3 py-3"><ChevronRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" /></td></tr>)}</tbody></table>{filteredSites.length === 0 ? <div className="p-8 text-center text-xs text-muted-foreground">No monitoring sites match this filter.</div> : null}</div>
            </div>
            <div className="min-w-0 rounded-md border border-hairline bg-surface/40"><div className="flex flex-col gap-3 border-b border-hairline p-3 sm:flex-row sm:items-center sm:justify-between"><SectionLabel>Active alerts</SectionLabel><select value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value as "All" | AlertSeverity)} aria-label="Filter alerts by severity" className="h-8 rounded-sm border border-border bg-background/50 px-2 text-[10px] text-foreground outline-none focus:border-primary/60"><option value="All">All severities</option><option value="Critical">Critical</option><option value="Major">Major</option><option value="Minor">Minor</option><option value="Warning">Warning</option></select></div><div className="divide-y divide-hairline">{filteredAlerts.map((alert) => <button type="button" key={alert.id} onClick={() => setSelectedAlert(alert)} className="group flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-primary/[0.04]"><span className={cn("mt-1 size-1.5 shrink-0 rounded-full", alert.severity === "Critical" ? "bg-critical" : alert.severity === "Major" ? "bg-major" : "bg-minor")} /><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="text-xs font-medium text-foreground">{alert.message}</span><SeverityBadge level={severityTone[alert.severity]} /></span><span className="mt-1 block truncate text-[10px] text-muted-foreground">{alert.site} / {alert.category}</span></span><span className="shrink-0 font-mono text-[9px] text-muted-foreground">{alert.time}</span></button>)}{filteredAlerts.length === 0 ? <div className="p-8 text-center text-xs text-muted-foreground">No active alerts in this view.</div> : null}</div></div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4"><div className="flex items-center gap-2 rounded-sm border border-hairline bg-surface/40 p-3"><Zap className="size-4 text-primary" /><div><SectionLabel>Power status</SectionLabel><p className="mt-1 text-xs text-foreground">98.2% nominal</p></div></div><div className="flex items-center gap-2 rounded-sm border border-hairline bg-surface/40 p-3"><BatteryCharging className="size-4 text-healthy" /><div><SectionLabel>Battery reserve</SectionLabel><p className="mt-1 text-xs text-foreground">91.8% available</p></div></div><div className="flex items-center gap-2 rounded-sm border border-hairline bg-surface/40 p-3"><Cpu className="size-4 text-primary" /><div><SectionLabel>Equipment</SectionLabel><p className="mt-1 text-xs text-foreground">99.1% nominal</p></div></div><div className="flex items-center gap-2 rounded-sm border border-hairline bg-surface/40 p-3"><Fuel className="size-4 text-major" /><div><SectionLabel>Fuel reserve</SectionLabel><p className="mt-1 text-xs text-foreground">72% average</p></div></div></div>
          {selectedSite ? <SiteDetail site={selectedSite} onClose={() => setSelectedSite(null)} /> : null}{selectedAlert ? <AlertDetail alert={selectedAlert} onClose={() => setSelectedAlert(null)} onResolve={() => resolveAlert(selectedAlert.id)} /> : null}
        </div>
        <p className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground"><CircleX className="size-3.5 text-primary" /> All records shown above are realistic local demo data and do not represent live infrastructure.</p>
      </div>
    </section>
  );
}
