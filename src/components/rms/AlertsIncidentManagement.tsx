import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Filter,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusDot } from "./primitives";
import {
  demoAlerts,
  type AlertCategory,
  type AlertSeverity,
  type AlertStatus,
  type DemoAlert,
} from "./alerts-demo-data";

type FilterValue<T extends string> = "All" | T;

type SortOrder = "newest" | "oldest";

const severityOptions: Array<FilterValue<AlertSeverity>> = ["All", "Critical", "High", "Medium", "Low"];
const statusOptions: Array<FilterValue<AlertStatus>> = ["All", "Active", "Acknowledged", "Resolved"];
const categoryOptions: Array<FilterValue<AlertCategory>> = ["All", "Power", "Connectivity", "Equipment", "Temperature", "Security", "System"];
const severityRank: Record<AlertSeverity, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };

const severityTone: Record<AlertSeverity, "critical" | "major" | "info" | "healthy"> = {
  Critical: "critical",
  High: "major",
  Medium: "info",
  Low: "healthy",
};

const severityStyles: Record<AlertSeverity, string> = {
  Critical: "border-critical/40 bg-critical/10 text-critical",
  High: "border-major/40 bg-major/10 text-major",
  Medium: "border-info/40 bg-info/10 text-info",
  Low: "border-healthy/40 bg-healthy/10 text-healthy",
};

const statusStyles: Record<AlertStatus, string> = {
  Active: "border-critical/30 bg-critical/10 text-critical",
  Acknowledged: "border-major/30 bg-major/10 text-major",
  Resolved: "border-healthy/30 bg-healthy/10 text-healthy",
};

function Label({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{children}</span>;
}

function SeverityPill({ severity }: { severity: AlertSeverity }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[10px] font-semibold", severityStyles[severity])}><StatusDot tone={severityTone[severity]} pulse={severity === "Critical"} />{severity}</span>;
}

function StatusPill({ status }: { status: AlertStatus }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[10px] font-medium", statusStyles[status])}>{status === "Resolved" ? <CheckCircle2 className="size-3" /> : <CircleDot className="size-3" />}{status}</span>;
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="flex min-w-0 flex-1 flex-col gap-1"><Label>{label}</Label><select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full rounded-sm border border-border bg-background/60 px-2 text-xs text-foreground outline-none focus:border-primary/60">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function AlertDetail({ alert, onClose, onStatusChange }: { alert: DemoAlert; onClose: () => void; onStatusChange: (status: AlertStatus) => void }) {
  return <aside className="absolute inset-y-0 right-0 z-30 w-full max-w-xl overflow-y-auto border-l border-hairline bg-surface-2 shadow-2xl" aria-label={`${alert.id} alert details`}>
    <div className="sticky top-0 z-10 flex items-start justify-between border-b border-hairline bg-surface-2/95 p-4 backdrop-blur"><div><div className="flex flex-wrap items-center gap-2"><Label>Alert detail</Label><SeverityPill severity={alert.severity} /><StatusPill status={alert.status} /></div><h3 className="mt-2 font-display text-xl font-semibold">{alert.title}</h3><p className="mt-1 font-mono text-[10px] text-muted-foreground">{alert.id} / {alert.siteId} / {alert.siteName}</p></div><button type="button" onClick={onClose} aria-label="Close alert details" className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"><X className="size-4" /></button></div>
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-2"><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Site</Label><p className="mt-2 text-xs font-medium text-foreground">{alert.siteName}</p><p className="mt-1 text-[10px] text-muted-foreground">{alert.location}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Category</Label><p className="mt-2 text-xs font-medium text-foreground">{alert.category}</p><p className="mt-1 text-[10px] text-muted-foreground">Detected by site monitor</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Time detected</Label><p className="mt-2 text-xs font-medium text-foreground">{alert.timestamp}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Last updated</Label><p className="mt-2 text-xs font-medium text-foreground">{alert.lastUpdated}</p></div></div>
      <div className="rounded-sm border border-hairline bg-surface/50 p-3"><Label>Description</Label><p className="mt-2 text-sm leading-relaxed text-foreground/85">{alert.description}</p><div className="mt-3 border-t border-hairline pt-3"><Label>Trigger condition</Label><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{alert.trigger}</p></div></div>
      <div><Label>Recent activity</Label><div className="mt-2 space-y-2">{alert.activity.map((item) => <div key={`${item.time}-${item.event}`} className="flex gap-3 border-l border-primary/30 pl-3"><div className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" /><div><p className="text-xs text-foreground">{item.event}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{item.time} / {item.detail}</p></div></div>)}</div></div>
      <div className="rounded-sm border border-primary/20 bg-primary/[0.06] p-3"><Label>Recommended response</Label><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{alert.recommendedAction}</p></div>
      <div className="flex flex-wrap gap-2 border-t border-hairline pt-4">{alert.status === "Active" ? <button type="button" onClick={() => onStatusChange("Acknowledged")} className="inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110"><Check className="size-3.5" /> Acknowledge alert</button> : null}{alert.status !== "Resolved" ? <button type="button" onClick={() => onStatusChange("Resolved")} className="inline-flex items-center gap-2 rounded-sm border border-healthy/40 px-3 py-2 text-xs font-semibold text-healthy hover:bg-healthy/10"><CheckCircle2 className="size-3.5" /> Resolve alert</button> : <button type="button" onClick={() => onStatusChange("Active")} className="inline-flex items-center gap-2 rounded-sm border border-major/40 px-3 py-2 text-xs font-semibold text-major hover:bg-major/10"><Activity className="size-3.5" /> Reopen alert</button>}<button type="button" onClick={onClose} className="rounded-sm border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground">Close</button></div>
    </div>
  </aside>;
}

export function AlertsIncidentManagement({ className }: { className?: string }) {
  const [alerts, setAlerts] = useState(demoAlerts);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<FilterValue<AlertSeverity>>("All");
  const [status, setStatus] = useState<FilterValue<AlertStatus>>("All");
  const [category, setCategory] = useState<FilterValue<AlertCategory>>("All");
  const [site, setSite] = useState("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedAlert, setSelectedAlert] = useState<DemoAlert | null>(null);

  const siteOptions = useMemo(() => ["All", ...new Set(alerts.map((alert) => alert.siteId))], [alerts]);
  const counts = useMemo(() => ({ active: alerts.filter((alert) => alert.status === "Active").length, critical: alerts.filter((alert) => alert.severity === "Critical").length, high: alerts.filter((alert) => alert.severity === "High").length, medium: alerts.filter((alert) => alert.severity === "Medium").length, low: alerts.filter((alert) => alert.severity === "Low").length, acknowledged: alerts.filter((alert) => alert.status === "Acknowledged").length, resolved: alerts.filter((alert) => alert.status === "Resolved").length }), [alerts]);
  const filteredAlerts = useMemo(() => alerts.filter((alert) => {
    const haystack = `${alert.id} ${alert.title} ${alert.siteName} ${alert.siteId} ${alert.location}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (severity === "All" || alert.severity === severity) && (status === "All" || alert.status === status) && (category === "All" || alert.category === category) && (site === "All" || alert.siteId === site);
  }).sort((a, b) => sortOrder === "newest" ? demoAlerts.indexOf(a) - demoAlerts.indexOf(b) : demoAlerts.indexOf(b) - demoAlerts.indexOf(a)), [alerts, category, query, severity, site, sortOrder, status]);

  const updateStatus = (id: string, nextStatus: AlertStatus) => {
    setAlerts((current) => current.map((alert) => alert.id === id ? { ...alert, status: nextStatus, lastUpdated: "Just now", activity: [{ event: `Alert ${nextStatus.toLowerCase()}`, time: "Just now", detail: "Demo operator" }, ...alert.activity] } : alert));
    setSelectedAlert((current) => current?.id === id ? { ...current, status: nextStatus, lastUpdated: "Just now", activity: [{ event: `Alert ${nextStatus.toLowerCase()}`, time: "Just now", detail: "Demo operator" }, ...current.activity] } : current);
  };

  return <section id="alerts-management" className={cn("relative border-y border-hairline bg-background py-16 sm:py-20", className)}>
    <div className="container-rms">
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="flex items-center gap-3"><span className="h-px w-8 bg-primary/60" /><span className="eyebrow">Response operations</span></div><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Alerts &amp; Incident Management</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Detect, prioritize, and manage exceptions across the RMS360 operating environment.</p></div><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><ShieldAlert className="size-3.5 text-primary" /><span className="font-mono tracking-[0.12em] uppercase">Simulated alert stream</span></div></div>
      <div className="panel relative overflow-hidden rounded-xl p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-hairline pb-3"><div className="flex items-center gap-2"><Activity className="size-4 text-primary" /><Label>Incident queue</Label></div><span className="font-mono text-[9px] text-muted-foreground">{filteredAlerts.length} shown / {alerts.length} total</span></div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7"><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Total active</Label><p className="mt-2 font-numeric text-xl font-bold text-critical">{counts.active}</p></div><div className="rounded-md border border-critical/30 bg-critical/[0.06] p-3"><Label>Critical</Label><p className="mt-2 font-numeric text-xl font-bold text-critical">{counts.critical}</p></div><div className="rounded-md border border-major/30 bg-major/[0.06] p-3"><Label>High</Label><p className="mt-2 font-numeric text-xl font-bold text-major">{counts.high}</p></div><div className="rounded-md border border-info/30 bg-info/[0.06] p-3"><Label>Medium</Label><p className="mt-2 font-numeric text-xl font-bold text-info">{counts.medium}</p></div><div className="rounded-md border border-healthy/30 bg-healthy/[0.06] p-3"><Label>Low</Label><p className="mt-2 font-numeric text-xl font-bold text-healthy">{counts.low}</p></div><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Acknowledged</Label><p className="mt-2 font-numeric text-xl font-bold text-major">{counts.acknowledged}</p></div><div className="rounded-md border border-hairline bg-surface/50 p-3"><Label>Resolved</Label><p className="mt-2 font-numeric text-xl font-bold text-healthy">{counts.resolved}</p></div></div>
        <div className="mt-3 rounded-md border border-hairline bg-surface/40 p-3"><div className="mb-3 flex items-center gap-2"><Filter className="size-3.5 text-primary" /><Label>Search and filter alerts</Label></div><div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_0.9fr]"><label className="relative flex min-w-0 flex-col gap-1 sm:col-span-2 lg:col-span-1"><Label>Search</Label><Search className="absolute bottom-2.5 left-2.5 size-3.5 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Alert, site, or ID" aria-label="Search alerts" className="h-9 w-full rounded-sm border border-border bg-background/60 pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary/60" /></label><FilterSelect label="Severity" value={severity} options={severityOptions} onChange={(value) => setSeverity(value as FilterValue<AlertSeverity>)} /><FilterSelect label="Status" value={status} options={statusOptions} onChange={(value) => setStatus(value as FilterValue<AlertStatus>)} /><FilterSelect label="Category" value={category} options={categoryOptions} onChange={(value) => setCategory(value as FilterValue<AlertCategory>)} /><FilterSelect label="Site" value={site} options={siteOptions} onChange={setSite} /><FilterSelect label="Sort" value={sortOrder} options={["newest", "oldest"]} onChange={(value) => setSortOrder(value as SortOrder)} /></div><div className="mt-3 flex justify-end border-t border-hairline pt-3"><button type="button" onClick={() => { setQuery(""); setSeverity("All"); setStatus("All"); setCategory("All"); setSite("All"); setSortOrder("newest"); }} className="text-[10px] text-primary hover:underline">Clear filters</button></div></div>
        <div className="mt-3 overflow-hidden rounded-md border border-hairline bg-surface/40"><div className="hidden grid-cols-[1.2fr_1.1fr_0.8fr_0.8fr_0.9fr_0.8fr_24px] gap-3 border-b border-hairline px-3 py-2 text-[9px] tracking-[0.12em] text-muted-foreground uppercase lg:grid"><span>Alert</span><span>Site / location</span><span>Category</span><span>Severity</span><span>Status</span><span>Last updated</span><span /></div><div className="divide-y divide-hairline">{filteredAlerts.map((alert) => <button type="button" key={alert.id} onClick={() => setSelectedAlert(alert)} className={cn("grid w-full gap-2 p-3 text-left transition-colors hover:bg-primary/[0.04] lg:grid-cols-[1.2fr_1.1fr_0.8fr_0.8fr_0.9fr_0.8fr_24px] lg:items-center lg:gap-3", alert.severity === "Critical" && "border-l-2 border-l-critical bg-critical/[0.035]", alert.severity === "High" && "border-l-2 border-l-major bg-major/[0.025]")}><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="truncate text-xs font-semibold text-foreground">{alert.title}</span><span className="font-mono text-[9px] text-muted-foreground">{alert.id}</span></div><p className="mt-1 text-[10px] text-muted-foreground lg:hidden">{alert.siteName} / {alert.location}</p></div><div className="hidden min-w-0 lg:block"><p className="truncate text-xs text-foreground/85">{alert.siteName}</p><p className="mt-1 text-[10px] text-muted-foreground">{alert.siteId} / {alert.location}</p></div><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><span className="lg:hidden"><Label>Category </Label></span>{alert.category}</div><div><SeverityPill severity={alert.severity} /></div><div><StatusPill status={alert.status} /></div><div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Clock3 className="size-3 lg:hidden" />{alert.lastUpdated}<span className="lg:hidden">/ {alert.timestamp}</span></div><ChevronRight className="hidden size-4 text-muted-foreground lg:block" /></button>)}{filteredAlerts.length === 0 ? <div className="p-10 text-center text-xs text-muted-foreground">No demo alerts match the current filters.</div> : null}</div></div>
        {selectedAlert ? <AlertDetail alert={selectedAlert} onClose={() => setSelectedAlert(null)} onStatusChange={(nextStatus) => updateStatus(selectedAlert.id, nextStatus)} /> : null}
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground"><span className="font-semibold text-primary">Demonstration data only.</span> Alerts and incident states are fictional local records for evaluating the RMS360 workflow and do not represent live infrastructure.</p>
    </div>
  </section>;
}
