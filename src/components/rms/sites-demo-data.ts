export type InfrastructureType = "Telecom tower" | "Power substation" | "Fuel depot" | "Water treatment";
export type SiteHealth = "Healthy" | "Warning" | "Critical" | "Offline" | "Maintenance";

export type SiteAlert = {
  severity: "Critical" | "Major" | "Minor" | "Warning";
  message: string;
  time: string;
};

export type SiteActivity = {
  event: string;
  time: string;
  detail: string;
};

export type InfrastructureSite = {
  id: string;
  name: string;
  location: string;
  type: InfrastructureType;
  health: SiteHealth;
  connectivity: string;
  power: string;
  equipment: string;
  lastCommunication: string;
  alertCount: number;
  telemetry: { label: string; value: string; detail: string }[];
  alerts: SiteAlert[];
  activity: SiteActivity[];
};

export const demoInfrastructureSites: InfrastructureSite[] = [
  {
    id: "LAG-042",
    name: "Victoria Island Hub",
    location: "Lagos, Lagos",
    type: "Telecom tower",
    health: "Critical",
    connectivity: "Offline",
    power: "Mains failed",
    equipment: "Generator standby",
    lastCommunication: "2 min ago",
    alertCount: 9,
    telemetry: [{ label: "Battery voltage", value: "43.1 V", detail: "Below threshold" }, { label: "Fuel reserve", value: "64%", detail: "Generator available" }, { label: "Cabinet temperature", value: "34.2 C", detail: "Within range" }, { label: "Signal quality", value: "0%", detail: "No carrier response" }],
    alerts: [{ severity: "Critical", message: "Mains power unavailable", time: "12:04:18" }, { severity: "Major", message: "Primary link not responding", time: "12:03:44" }, { severity: "Warning", message: "Generator start pending", time: "12:02:09" }],
    activity: [{ event: "Site became unreachable", time: "2 min ago", detail: "Connectivity monitor" }, { event: "Mains failure detected", time: "3 min ago", detail: "Power controller" }, { event: "Last successful heartbeat", time: "4 min ago", detail: "Edge gateway" }],
  },
  {
    id: "KAD-118",
    name: "Kaduna North Relay",
    location: "Kaduna, Kaduna",
    type: "Telecom tower",
    health: "Warning",
    connectivity: "Connected",
    power: "Generator",
    equipment: "Fuel low",
    lastCommunication: "18 sec ago",
    alertCount: 3,
    telemetry: [{ label: "Battery voltage", value: "51.8 V", detail: "Nominal" }, { label: "Fuel reserve", value: "18%", detail: "Refill recommended" }, { label: "Cabinet temperature", value: "31.6 C", detail: "Within range" }, { label: "Signal quality", value: "78%", detail: "Stable" }],
    alerts: [{ severity: "Major", message: "Fuel level below 20%", time: "12:02:52" }, { severity: "Warning", message: "Generator runtime review due", time: "11:58:20" }],
    activity: [{ event: "Fuel threshold crossed", time: "4 min ago", detail: "Fuel sensor" }, { event: "Generator switched to load", time: "18 min ago", detail: "Power controller" }],
  },
  {
    id: "ENU-206",
    name: "Enugu Distribution",
    location: "Enugu, Enugu",
    type: "Power substation",
    health: "Critical",
    connectivity: "Degraded",
    power: "Battery backup",
    equipment: "Battery low",
    lastCommunication: "44 sec ago",
    alertCount: 6,
    telemetry: [{ label: "Battery voltage", value: "43.1 V", detail: "Critical threshold" }, { label: "Load", value: "82%", detail: "High demand" }, { label: "Transformer temp", value: "68.4 C", detail: "Watch closely" }, { label: "Signal quality", value: "41%", detail: "Intermittent" }],
    alerts: [{ severity: "Critical", message: "Battery voltage below threshold", time: "12:03:11" }, { severity: "Major", message: "Telemetry link degraded", time: "12:00:06" }],
    activity: [{ event: "Battery reserve recalculated", time: "44 sec ago", detail: "Energy monitor" }, { event: "Load crossed 80%", time: "6 min ago", detail: "Substation controller" }],
  },
  {
    id: "JOS-051",
    name: "Jos Plateau Node",
    location: "Jos, Plateau",
    type: "Telecom tower",
    health: "Healthy",
    connectivity: "Connected",
    power: "Mains",
    equipment: "All nominal",
    lastCommunication: "8 sec ago",
    alertCount: 0,
    telemetry: [{ label: "Battery voltage", value: "53.4 V", detail: "Nominal" }, { label: "Fuel reserve", value: "88%", detail: "Available" }, { label: "Cabinet temperature", value: "27.8 C", detail: "Optimal" }, { label: "Signal quality", value: "96%", detail: "Excellent" }],
    alerts: [{ severity: "Minor", message: "Access event acknowledged", time: "11:59:42" }],
    activity: [{ event: "Routine heartbeat received", time: "8 sec ago", detail: "Edge gateway" }, { event: "Daily health check passed", time: "22 min ago", detail: "RMS360 monitor" }],
  },
  {
    id: "PHC-090",
    name: "Port Harcourt South",
    location: "Port Harcourt, Rivers",
    type: "Fuel depot",
    health: "Warning",
    connectivity: "Connected",
    power: "Mains",
    equipment: "Temperature high",
    lastCommunication: "31 sec ago",
    alertCount: 4,
    telemetry: [{ label: "Tank level", value: "72%", detail: "Within operating range" }, { label: "Tank temperature", value: "41.0 C", detail: "Above setpoint" }, { label: "Pump status", value: "Ready", detail: "No faults" }, { label: "Signal quality", value: "86%", detail: "Stable" }],
    alerts: [{ severity: "Major", message: "Cabinet temperature above setpoint", time: "12:01:58" }, { severity: "Warning", message: "Ventilation cycle extended", time: "11:55:30" }],
    activity: [{ event: "Temperature alert raised", time: "31 sec ago", detail: "Environment sensor" }, { event: "Pump inspection completed", time: "1 hr ago", detail: "Field operations" }],
  },
  {
    id: "ABJ-014",
    name: "Abuja Core Exchange",
    location: "Abuja, FCT",
    type: "Power substation",
    health: "Maintenance",
    connectivity: "Connected",
    power: "Mains",
    equipment: "Service scheduled",
    lastCommunication: "5 sec ago",
    alertCount: 1,
    telemetry: [{ label: "Load", value: "61%", detail: "Normal demand" }, { label: "Battery voltage", value: "52.9 V", detail: "Nominal" }, { label: "Transformer temp", value: "54.1 C", detail: "Within range" }, { label: "Signal quality", value: "99%", detail: "Excellent" }],
    alerts: [{ severity: "Minor", message: "Planned relay inspection", time: "10:42:13" }],
    activity: [{ event: "Maintenance window confirmed", time: "14 min ago", detail: "Asset management" }, { event: "Routine heartbeat received", time: "5 sec ago", detail: "Edge gateway" }],
  },
  {
    id: "IBD-077",
    name: "Ibadan West Tower",
    location: "Ibadan, Oyo",
    type: "Telecom tower",
    health: "Offline",
    connectivity: "Offline",
    power: "Unknown",
    equipment: "No response",
    lastCommunication: "18 min ago",
    alertCount: 7,
    telemetry: [{ label: "Battery voltage", value: "Unknown", detail: "No recent sample" }, { label: "Fuel reserve", value: "Unknown", detail: "No recent sample" }, { label: "Cabinet temperature", value: "29.1 C", detail: "Last known" }, { label: "Signal quality", value: "0%", detail: "No response" }],
    alerts: [{ severity: "Critical", message: "Site has not communicated", time: "11:46:12" }, { severity: "Major", message: "Backhaul link unavailable", time: "11:46:00" }],
    activity: [{ event: "Communication timeout", time: "18 min ago", detail: "Connectivity monitor" }, { event: "Last successful heartbeat", time: "18 min ago", detail: "Edge gateway" }],
  },
  {
    id: "KNO-032",
    name: "Kano Industrial Edge",
    location: "Kano, Kano",
    type: "Water treatment",
    health: "Healthy",
    connectivity: "Connected",
    power: "Generator",
    equipment: "All nominal",
    lastCommunication: "23 sec ago",
    alertCount: 1,
    telemetry: [{ label: "Flow rate", value: "248 L/s", detail: "Nominal" }, { label: "Reservoir level", value: "76%", detail: "Healthy reserve" }, { label: "Pump efficiency", value: "91%", detail: "Within range" }, { label: "Signal quality", value: "91%", detail: "Stable" }],
    alerts: [{ severity: "Warning", message: "Generator runtime review due", time: "11:57:20" }],
    activity: [{ event: "Water quality check passed", time: "8 min ago", detail: "Treatment controller" }, { event: "Routine heartbeat received", time: "23 sec ago", detail: "Edge gateway" }],
  },
];
