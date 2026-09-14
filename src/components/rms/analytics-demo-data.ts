export type AnalyticsRange = "24 Hours" | "7 Days" | "30 Days";
export type AnomalySeverity = "Critical" | "High" | "Medium" | "Low";

export type TelemetryPoint = {
  label: string;
  power: number;
  battery: number;
  temperature: number;
  connectivity: number;
  equipment: number;
  signal: number;
};

export type DemoAnomaly = {
  id: string;
  site: string;
  siteId: string;
  metric: string;
  detectedValue: string;
  normalRange: string;
  severity: AnomalySeverity;
  detectedAt: string;
  status: "Investigating" | "Observed" | "Acknowledged";
  description: string;
};

export type DemoPrediction = {
  id: string;
  site: string;
  issue: string;
  confidence: number;
  timeframe: string;
  action: string;
  detail: string;
};

export const telemetryByRange: Record<AnalyticsRange, TelemetryPoint[]> = {
  "24 Hours": [
    { label: "00:00", power: 62, battery: 89, temperature: 28, connectivity: 98, equipment: 94, signal: 93 },
    { label: "02:00", power: 58, battery: 88, temperature: 27, connectivity: 98, equipment: 95, signal: 94 },
    { label: "04:00", power: 55, battery: 87, temperature: 27, connectivity: 97, equipment: 95, signal: 92 },
    { label: "06:00", power: 68, battery: 86, temperature: 30, connectivity: 97, equipment: 94, signal: 94 },
    { label: "08:00", power: 74, battery: 84, temperature: 33, connectivity: 96, equipment: 93, signal: 91 },
    { label: "10:00", power: 82, battery: 83, temperature: 36, connectivity: 94, equipment: 92, signal: 89 },
    { label: "12:00", power: 91, battery: 81, temperature: 39, connectivity: 88, equipment: 89, signal: 84 },
    { label: "14:00", power: 86, battery: 80, temperature: 38, connectivity: 91, equipment: 90, signal: 86 },
    { label: "16:00", power: 78, battery: 79, temperature: 35, connectivity: 94, equipment: 92, signal: 89 },
    { label: "18:00", power: 73, battery: 78, temperature: 33, connectivity: 96, equipment: 93, signal: 92 },
    { label: "20:00", power: 67, battery: 77, temperature: 31, connectivity: 97, equipment: 94, signal: 93 },
    { label: "22:00", power: 63, battery: 76, temperature: 29, connectivity: 98, equipment: 95, signal: 94 },
  ],
  "7 Days": [
    { label: "Mon", power: 64, battery: 91, temperature: 29, connectivity: 98, equipment: 95, signal: 94 },
    { label: "Tue", power: 67, battery: 89, temperature: 30, connectivity: 97, equipment: 95, signal: 93 },
    { label: "Wed", power: 71, battery: 87, temperature: 31, connectivity: 96, equipment: 94, signal: 92 },
    { label: "Thu", power: 75, battery: 85, temperature: 34, connectivity: 95, equipment: 93, signal: 90 },
    { label: "Fri", power: 83, battery: 82, temperature: 37, connectivity: 92, equipment: 91, signal: 88 },
    { label: "Sat", power: 77, battery: 80, temperature: 35, connectivity: 94, equipment: 92, signal: 90 },
    { label: "Sun", power: 73, battery: 78, temperature: 33, connectivity: 96, equipment: 93, signal: 92 },
  ],
  "30 Days": [
    { label: "01 Jun", power: 58, battery: 96, temperature: 27, connectivity: 99, equipment: 97, signal: 96 },
    { label: "04 Jun", power: 61, battery: 94, temperature: 28, connectivity: 98, equipment: 96, signal: 95 },
    { label: "07 Jun", power: 63, battery: 92, temperature: 29, connectivity: 98, equipment: 96, signal: 94 },
    { label: "10 Jun", power: 67, battery: 90, temperature: 30, connectivity: 97, equipment: 95, signal: 93 },
    { label: "13 Jun", power: 70, battery: 88, temperature: 31, connectivity: 96, equipment: 94, signal: 92 },
    { label: "16 Jun", power: 74, battery: 86, temperature: 33, connectivity: 95, equipment: 93, signal: 91 },
    { label: "19 Jun", power: 79, battery: 84, temperature: 35, connectivity: 94, equipment: 92, signal: 89 },
    { label: "22 Jun", power: 82, battery: 81, temperature: 37, connectivity: 92, equipment: 90, signal: 87 },
    { label: "25 Jun", power: 86, battery: 79, temperature: 38, connectivity: 91, equipment: 90, signal: 86 },
    { label: "28 Jun", power: 81, battery: 77, temperature: 36, connectivity: 93, equipment: 91, signal: 88 },
  ],
};

export const demoAnomalies: DemoAnomaly[] = [
  { id: "ANM-208", site: "Victoria Island Hub", siteId: "LAG-042", metric: "Temperature", detectedValue: "41.8 C", normalRange: "24 - 36 C", severity: "Critical", detectedAt: "12 min ago", status: "Investigating", description: "A rapid temperature increase was detected across three consecutive samples." },
  { id: "ANM-207", site: "Enugu Distribution", siteId: "ENU-206", metric: "Power consumption", detectedValue: "91 kW", normalRange: "48 - 76 kW", severity: "High", detectedAt: "28 min ago", status: "Acknowledged", description: "Power demand is running above the expected daytime profile for this site." },
  { id: "ANM-206", site: "Ibadan West Tower", siteId: "IBD-077", metric: "Connectivity quality", detectedValue: "41%", normalRange: "88 - 100%", severity: "High", detectedAt: "42 min ago", status: "Investigating", description: "Repeated connectivity drops are reducing the confidence of recent telemetry." },
  { id: "ANM-205", site: "Kaduna North Relay", siteId: "KAD-118", metric: "Battery level", detectedValue: "18%", normalRange: "45 - 100%", severity: "Medium", detectedAt: "1 hr ago", status: "Observed", description: "Battery reserve is declining faster than the recent operating baseline." },
  { id: "ANM-204", site: "Port Harcourt South", siteId: "PHC-090", metric: "Equipment performance", detectedValue: "72% efficiency", normalRange: "88 - 100%", severity: "Medium", detectedAt: "2 hrs ago", status: "Observed", description: "Pump efficiency has declined gradually across the last four readings." },
  { id: "ANM-203", site: "Abuja Core Exchange", siteId: "ABJ-014", metric: "Signal strength", detectedValue: "74%", normalRange: "85 - 100%", severity: "Low", detectedAt: "3 hrs ago", status: "Acknowledged", description: "A small signal quality deviation was detected during a scheduled telemetry cycle." },
];

export const demoPredictions: DemoPrediction[] = [
  { id: "PRD-091", site: "Kaduna North Relay", issue: "Potential battery degradation", confidence: 87, timeframe: "7 - 10 days", action: "Schedule a battery health inspection and review charge cycles.", detail: "The simulated model sees a sustained downward trend in reserve capacity." },
  { id: "PRD-090", site: "Port Harcourt South", issue: "Possible equipment failure", confidence: 74, timeframe: "14 days", action: "Plan preventive inspection for the cooling and pump assembly.", detail: "Efficiency has drifted below the demo baseline over four observation windows." },
  { id: "PRD-089", site: "Enugu Distribution", issue: "Increasing power consumption", confidence: 81, timeframe: "3 - 5 days", action: "Review load distribution and compare against scheduled demand.", detail: "The simulated forecast projects continued daytime demand growth." },
  { id: "PRD-088", site: "Ibadan West Tower", issue: "Connectivity instability", confidence: 92, timeframe: "Within 24 hours", action: "Inspect the backhaul path and verify gateway power.", detail: "Repeated signal interruptions are present in the demonstration series." },
];

export const demoRecommendations = [
  { id: "REC-01", title: "Inspect battery performance", detail: "Kaduna North Relay is showing an accelerated reserve decline.", action: "Review site telemetry" },
  { id: "REC-02", title: "Review connectivity interruptions", detail: "Ibadan West Tower has repeated low-confidence samples.", action: "Open site record" },
  { id: "REC-03", title: "Schedule preventive inspection", detail: "Port Harcourt South equipment efficiency is trending down.", action: "Create maintenance note" },
  { id: "REC-04", title: "Monitor temperature trends", detail: "Victoria Island Hub has a simulated temperature anomaly.", action: "Watch anomaly" },
];
