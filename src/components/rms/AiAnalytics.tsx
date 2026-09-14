import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Lightbulb,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { StatusDot } from "./primitives";
import {
  demoAnomalies,
  demoPredictions,
  demoRecommendations,
  telemetryByRange,
  type AnalyticsRange,
  type AnomalySeverity,
  type DemoAnomaly,
  type DemoPrediction,
} from "./analytics-demo-data";

const ranges: AnalyticsRange[] = ["24 Hours", "7 Days", "30 Days"];
const anomalySeverities: Array<"All" | AnomalySeverity> = ["All", "Critical", "High", "Medium", "Low"];
const metricOptions = [
  { key: "power", label: "Power consumption", unit: "kW index", color: "var(--primary)", domain: [40, 100] },
  { key: "battery", label: "Battery level", unit: "%", color: "var(--healthy)", domain: [60, 100] },
  { key: "temperature", label: "Temperature", unit: "C", color: "var(--major)", domain: [20, 50] },
  { key: "connectivity", label: "Connectivity quality", unit: "%", color: "var(--info)", domain: [70, 100] },
  { key: "equipment", label: "Equipment performance", unit: "%", color: "var(--accent)", domain: [70, 100] },
  { key: "signal", label: "Signal strength", unit: "%", color: "var(--primary)", domain: [60, 100] },
] as const;

type MetricKey = (typeof metricOptions)[number]["key"];

const severityTone: Record<AnomalySeverity, "critical" | "major" | "info" | "healthy"> = {
  Critical: "critical",
  High: "major",
  Medium: "info",
  Low: "healthy",
};

const severityStyle: Record<AnomalySeverity, string> = {
  Critical: "border-critical/40 bg-critical/10 text-critical",
  High: "border-major/40 bg-major/10 text-major",
  Medium: "border-info/40 bg-info/10 text-info",
  Low: "border-healthy/40 bg-healthy/10 text-healthy",
};

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[9px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{children}</span>;
}

function SeverityPill({ severity }: { severity: AnomalySeverity }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[10px] font-semibold", severityStyle[severity])}><StatusDot tone={severityTone[severity]} pulse={severity === "Critical"} />{severity}</span>;
}

function MetricCard({ label, value, detail, icon: Icon, tone = "default" }: { label: string; value: string; detail: string; icon: React.ComponentType<{ className?: string }>; tone?: "default" | "healthy" | "critical" | "info" }) {
  return <div className="rounded-md border border-hairline bg-surface/60 p-3"><div className="flex items-center justify-between gap-2"><Label>{label}</Label><Icon className={cn("size-4", tone === "healthy" ? "text-healthy" : tone === "critical" ? "text-critical" : tone === "info" ? "text-info" : "text-primary")} /></div><p className={cn("mt-3 font-numeric text-2xl font-bold", tone === "healthy" ? "text-healthy" : tone === "critical" ? "text-critical" : tone === "info" ? "text-info" : "text-foreground")}>{value}</p><p className="mt-1 text-[10px] text-muted-foreground">{detail}</p></div>;
}

function AnomalyDetail({ anomaly, onClose }: { anomaly: DemoAnomaly; onClose: () => void }) {
  return <aside className="absolute inset-y-0 right-0 z-30 w-full max-w-md overflow-y-auto border-l border-hairline bg-surface-2 shadow-2xl" aria-label={`${anomaly.id} anomaly details`}><div className="sticky top-0 z-10 flex items-start justify-between border-b border-hairline bg-surface-2/95 p-4 backdrop-blur"><div><div className="flex items-center gap-2"><Label>Anomaly detail</Label><SeverityPill severity={anomaly.severity} /></div><h3 className="mt-2 font-display text-xl font-semibold">{anomaly.metric}</h3><p className="mt-1 font-mono text-[10px] text-muted-foreground">{anomaly.id} / {anomaly.siteId} / {anomaly.site}</p></div><button type="button" onClick={onClose} aria-label="Close anomaly details" className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"><X className="size-4" /></button></div><div className="space-y-4 p-4"><div className="grid grid-cols-2 gap-2"><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Detected value</Label><p className="mt-2 text-sm font-semibold text-foreground">{anomaly.detectedValue}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Normal range</Label><p className="mt-2 text-sm font-semibold text-foreground">{anomaly.normalRange}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Detection time</Label><p className="mt-2 text-xs text-foreground">{anomaly.detectedAt}</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Current status</Label><p className="mt-2 text-xs text-foreground">{anomaly.status}</p></div></div><div className="rounded-sm border border-primary/20 bg-primary/[0.06] p-3 text-sm leading-relaxed text-muted-foreground">{anomaly.description}</div><div className="rounded-sm border border-hairline bg-surface/50 p-3 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-primary">Simulated detection.</span> This anomaly is generated from fictional telemetry for demonstrating the RMS360 analytics workflow.</div></div></aside>;
}

function PredictionDetail({ prediction, onClose, onDismiss }: { prediction: DemoPrediction; onClose: () => void; onDismiss: () => void }) {
  return <aside className="absolute inset-y-0 right-0 z-30 w-full max-w-md overflow-y-auto border-l border-hairline bg-surface-2 shadow-2xl" aria-label={`${prediction.id} prediction details`}><div className="sticky top-0 z-10 flex items-start justify-between border-b border-hairline bg-surface-2/95 p-4 backdrop-blur"><div><div className="flex items-center gap-2"><Label>Demo prediction</Label><Sparkles className="size-3.5 text-primary" /></div><h3 className="mt-2 font-display text-xl font-semibold">{prediction.issue}</h3><p className="mt-1 font-mono text-[10px] text-muted-foreground">{prediction.id} / {prediction.site}</p></div><button type="button" onClick={onClose} aria-label="Close prediction details" className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"><X className="size-4" /></button></div><div className="space-y-4 p-4"><div className="grid grid-cols-2 gap-2"><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Confidence</Label><p className="mt-2 font-numeric text-xl font-bold text-primary">{prediction.confidence}%</p></div><div className="rounded-sm border border-hairline bg-surface/70 p-3"><Label>Estimated timeframe</Label><p className="mt-2 text-xs font-semibold text-foreground">{prediction.timeframe}</p></div></div><div className="rounded-sm border border-hairline bg-surface/50 p-3 text-sm leading-relaxed text-muted-foreground">{prediction.detail}</div><div className="rounded-sm border border-primary/20 bg-primary/[0.06] p-3"><Label>Recommended action</Label><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{prediction.action}</p></div><button type="button" onClick={onDismiss} className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"><Check className="size-3.5" /> Dismiss demo insight</button></div></aside>;
}

export function AiAnalytics({ className }: { className?: string }) {
  const [range, setRange] = useState<AnalyticsRange>("24 Hours");
  const [metric, setMetric] = useState<MetricKey>("power");
  const [anomalyFilter, setAnomalyFilter] = useState<"All" | AnomalySeverity>("All");
  const [selectedAnomaly, setSelectedAnomaly] = useState<DemoAnomaly | null>(null);
  const [predictions, setPredictions] = useState(demoPredictions);
  const [selectedPrediction, setSelectedPrediction] = useState<DemoPrediction | null>(null);
  const [dismissedRecommendations, setDismissedRecommendations] = useState<string[]>([]);

  const selectedMetric = metricOptions.find((option) => option.key === metric) ?? metricOptions[0];
  const visibleAnomalies = useMemo(() => demoAnomalies.filter((anomaly) => anomalyFilter === "All" || anomaly.severity === anomalyFilter), [anomalyFilter]);
  const visibleRecommendations = demoRecommendations.filter((recommendation) => !dismissedRecommendations.includes(recommendation.id));

  const dismissPrediction = (id: string) => { setPredictions((current) => current.filter((prediction) => prediction.id !== id)); setSelectedPrediction(null); };

  return <section id="ai-analytics" className={cn("relative border-y border-hairline bg-surface/20 py-16 sm:py-20", className)}><div className="container-rms">
    <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="flex items-center gap-3"><span className="h-px w-8 bg-primary/60" /><span className="eyebrow">Decision intelligence</span></div><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">AI &amp; Analytics</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Turn telemetry patterns into clearer operational context, earlier warnings, and focused next actions.</p></div><div className="flex items-center gap-2 text-[10px] text-muted-foreground"><BrainCircuit className="size-3.5 text-primary" /><span className="font-mono tracking-[0.12em] uppercase">Simulated intelligence layer</span></div></div>
    <div className="panel relative overflow-hidden rounded-xl p-3 sm:p-4"><div className="mb-3 flex items-center justify-between gap-3 border-b border-hairline pb-3"><div className="flex items-center gap-2"><Activity className="size-4 text-primary" /><Label>Analytics workspace</Label></div><span className="font-mono text-[9px] text-muted-foreground">fictional telemetry / demo mode</span></div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"><MetricCard label="Fleet health" value="94.4%" detail="30-day operating view" icon={ShieldCheck} tone="healthy" /><MetricCard label="System reliability" value="99.1%" detail="Telemetry availability" icon={Activity} tone="healthy" /><MetricCard label="Active anomalies" value="6" detail="Across 5 demo sites" icon={AlertTriangle} tone="critical" /><MetricCard label="Predicted issues" value={String(predictions.length)} detail="Model confidence above 70%" icon={TrendingUp} tone="info" /><MetricCard label="Sites requiring attention" value="4" detail="Priority review queue" icon={Zap} tone="critical" /></div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[1.6fr_0.8fr]"><div className="rounded-md border border-hairline bg-surface/40 p-3"><div className="flex flex-col gap-3 border-b border-hairline pb-3 sm:flex-row sm:items-center sm:justify-between"><div><Label>Telemetry trends</Label><p className="mt-1 text-xs text-muted-foreground">{selectedMetric.label} / {selectedMetric.unit}</p></div><div className="flex flex-wrap gap-1 rounded-sm border border-border bg-background/40 p-1">{ranges.map((option) => <button type="button" key={option} onClick={() => setRange(option)} className={cn("rounded-sm px-2 py-1 text-[10px] font-medium", range === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{option}</button>)}</div></div><div className="mt-3 h-64 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={telemetryByRange[range]} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><defs><linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={selectedMetric.color} stopOpacity={0.38} /><stop offset="100%" stopColor={selectedMetric.color} stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="var(--hairline)" vertical={false} /><XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis domain={selectedMetric.domain} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "4px", color: "var(--foreground)", fontSize: "11px" }} /><Area type="monotone" dataKey={selectedMetric.key} stroke={selectedMetric.color} fill="url(#analyticsFill)" strokeWidth={2} dot={{ r: 2, fill: selectedMetric.color, strokeWidth: 0 }} activeDot={{ r: 4 }} /></AreaChart></ResponsiveContainer></div><div className="mt-3 flex flex-wrap gap-1.5 border-t border-hairline pt-3">{metricOptions.map((option) => <button type="button" key={option.key} onClick={() => setMetric(option.key)} className={cn("rounded-sm border px-2 py-1.5 text-[10px]", metric === option.key ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground")}>{option.label}</button>)}</div></div>
        <div className="rounded-md border border-hairline bg-surface/40 p-3"><div className="flex items-center justify-between border-b border-hairline pb-3"><div><Label>Model signal</Label><p className="mt-1 text-xs text-muted-foreground">Current analytics posture</p></div><LineChart className="size-4 text-primary" /></div><div className="mt-4 space-y-4"><div><div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Telemetry completeness</span><span className="font-numeric text-foreground">99.1%</span></div><div className="mt-2 h-1.5 rounded-full bg-surface-2"><div className="h-full w-[99%] rounded-full bg-healthy" /></div></div><div><div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Pattern confidence</span><span className="font-numeric text-foreground">87.0%</span></div><div className="mt-2 h-1.5 rounded-full bg-surface-2"><div className="h-full w-[87%] rounded-full bg-primary" /></div></div><div><div className="flex justify-between text-[10px]"><span className="text-muted-foreground">Anomaly review coverage</span><span className="font-numeric text-foreground">76.0%</span></div><div className="mt-2 h-1.5 rounded-full bg-surface-2"><div className="h-full w-[76%] rounded-full bg-major" /></div></div></div><div className="mt-5 rounded-sm border border-primary/20 bg-primary/[0.06] p-3 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-primary">Simulated AI insight.</span> Signals shown here are generated from fictional telemetry and are not connected to live infrastructure.</div></div></div>
      <div className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_0.9fr]"><div className="rounded-md border border-hairline bg-surface/40"><div className="flex flex-col gap-3 border-b border-hairline p-3 sm:flex-row sm:items-center sm:justify-between"><div><Label>Detected anomalies</Label><p className="mt-1 text-xs text-muted-foreground">Pattern deviations requiring review</p></div><select value={anomalyFilter} onChange={(event) => setAnomalyFilter(event.target.value as "All" | AnomalySeverity)} aria-label="Filter anomalies by severity" className="h-8 rounded-sm border border-border bg-background/60 px-2 text-[10px] text-foreground outline-none focus:border-primary/60">{anomalySeverities.map((option) => <option key={option} value={option}>{option} severity</option>)}</select></div><div className="divide-y divide-hairline">{visibleAnomalies.map((anomaly) => <button type="button" key={anomaly.id} onClick={() => setSelectedAnomaly(anomaly)} className={cn("group flex w-full items-start gap-3 p-3 text-left hover:bg-primary/[0.04]", anomaly.severity === "Critical" && "border-l-2 border-l-critical bg-critical/[0.035]", anomaly.severity === "High" && "border-l-2 border-l-major bg-major/[0.025]")}><AlertTriangle className="mt-1 size-3.5 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-foreground">{anomaly.metric}</span><SeverityPill severity={anomaly.severity} /></span><span className="mt-1 block text-[10px] text-muted-foreground">{anomaly.site} / {anomaly.siteId} / {anomaly.detectedValue}</span><span className="mt-1 block text-[10px] text-muted-foreground">Normal {anomaly.normalRange} / {anomaly.detectedAt}</span></span><ChevronRight className="mt-1 size-4 text-muted-foreground group-hover:text-primary" /></button>)}{visibleAnomalies.length === 0 ? <div className="p-8 text-center text-xs text-muted-foreground">No anomalies match this filter.</div> : null}</div></div>
        <div className="rounded-md border border-hairline bg-surface/40"><div className="border-b border-hairline p-3"><div className="flex items-center gap-2"><Lightbulb className="size-4 text-primary" /><Label>Predictive insights</Label></div><p className="mt-1 text-xs text-muted-foreground">Demo predictions with confidence above 70%</p></div><div className="divide-y divide-hairline">{predictions.map((prediction) => <button type="button" key={prediction.id} onClick={() => setSelectedPrediction(prediction)} className="group flex w-full items-start gap-3 p-3 text-left hover:bg-primary/[0.04]"><div className="grid size-7 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary"><TrendingUp className="size-3.5" /></div><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-foreground">{prediction.issue}</span><span className="mt-1 block text-[10px] text-muted-foreground">{prediction.site} / {prediction.timeframe}</span><span className="mt-2 block h-1 rounded-full bg-surface-2"><span className="block h-full rounded-full bg-primary" style={{ width: `${prediction.confidence}%` }} /></span></span><span className="font-mono text-[10px] text-primary">{prediction.confidence}%</span><ChevronRight className="mt-1 size-4 text-muted-foreground group-hover:text-primary" /></button>)}{predictions.length === 0 ? <div className="p-8 text-center text-xs text-muted-foreground">All demo insights dismissed.</div> : null}</div></div></div>
      <div className="mt-3 rounded-md border border-hairline bg-surface/40"><div className="border-b border-hairline p-3"><div className="flex items-center gap-2"><Lightbulb className="size-4 text-major" /><Label>AI recommendations</Label></div><p className="mt-1 text-xs text-muted-foreground">Focused next steps from the simulated analysis layer</p></div><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{visibleRecommendations.map((recommendation) => <div key={recommendation.id} className="flex flex-col justify-between gap-4 border-b border-hairline p-3 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0"><div><p className="text-xs font-semibold text-foreground">{recommendation.title}</p><p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{recommendation.detail}</p></div><button type="button" onClick={() => setDismissedRecommendations((current) => [...current, recommendation.id])} className="inline-flex items-center gap-1.5 text-left text-[10px] text-primary hover:underline"><Check className="size-3" /> {recommendation.action}</button></div>)}</div></div>
      {selectedAnomaly ? <AnomalyDetail anomaly={selectedAnomaly} onClose={() => setSelectedAnomaly(null)} /> : null}{selectedPrediction ? <PredictionDetail prediction={selectedPrediction} onClose={() => setSelectedPrediction(null)} onDismiss={() => dismissPrediction(selectedPrediction.id)} /> : null}
    </div><p className="mt-3 text-[10px] text-muted-foreground"><span className="font-semibold text-primary">Demonstration only.</span> Analytics, anomalies, predictions, and recommendations are simulated from fictional telemetry for the RMS360 product experience.</p></div></section>;
}
