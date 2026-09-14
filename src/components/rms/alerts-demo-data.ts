export type AlertSeverity = "Critical" | "High" | "Medium" | "Low";
export type AlertStatus = "Active" | "Acknowledged" | "Resolved";
export type AlertCategory = "Power" | "Connectivity" | "Equipment" | "Temperature" | "Security" | "System";

export type DemoAlert = {
  id: string;
  title: string;
  siteName: string;
  siteId: string;
  location: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: string;
  lastUpdated: string;
  description: string;
  trigger: string;
  recommendedAction: string;
  activity: { event: string; time: string; detail: string }[];
};

export const demoAlerts: DemoAlert[] = [
  {
    id: "ALT-7401",
    title: "Mains power unavailable",
    siteName: "Victoria Island Hub",
    siteId: "LAG-042",
    location: "Lagos, Lagos",
    category: "Power",
    severity: "Critical",
    status: "Active",
    timestamp: "Today, 12:04:18",
    lastUpdated: "2 min ago",
    description: "The site controller is reporting no mains input while the primary link is unreachable.",
    trigger: "Mains voltage below 180 V for more than 30 seconds.",
    recommendedAction: "Confirm generator start sequence and assign a field response for the power path.",
    activity: [{ event: "Alert opened", time: "12:04:18", detail: "Power controller" }, { event: "Connectivity degraded", time: "12:03:44", detail: "RMS360 monitor" }],
  },
  {
    id: "ALT-7400",
    title: "Battery voltage below threshold",
    siteName: "Enugu Distribution",
    siteId: "ENU-206",
    location: "Enugu, Enugu",
    category: "Equipment",
    severity: "Critical",
    status: "Acknowledged",
    timestamp: "Today, 12:03:11",
    lastUpdated: "44 sec ago",
    description: "Backup battery reserve is falling below the configured operating threshold.",
    trigger: "Battery voltage below 44 V while operating on backup power.",
    recommendedAction: "Inspect the battery bank and verify charging equipment before reserve is exhausted.",
    activity: [{ event: "Alert acknowledged", time: "12:03:52", detail: "Operations desk" }, { event: "Battery sample received", time: "12:03:11", detail: "Energy monitor" }],
  },
  {
    id: "ALT-7399",
    title: "Fuel reserve below threshold",
    siteName: "Kaduna North Relay",
    siteId: "KAD-118",
    location: "Kaduna, Kaduna",
    category: "Power",
    severity: "High",
    status: "Active",
    timestamp: "Today, 12:02:52",
    lastUpdated: "4 min ago",
    description: "The generator fuel reserve has entered the replenishment band.",
    trigger: "Fuel level below 20% for two consecutive readings.",
    recommendedAction: "Schedule replenishment and review generator runtime against the maintenance plan.",
    activity: [{ event: "Alert opened", time: "12:02:52", detail: "Fuel sensor" }, { event: "Generator load confirmed", time: "11:58:20", detail: "Power controller" }],
  },
  {
    id: "ALT-7398",
    title: "Cabinet temperature above setpoint",
    siteName: "Port Harcourt South",
    siteId: "PHC-090",
    location: "Port Harcourt, Rivers",
    category: "Temperature",
    severity: "High",
    status: "Acknowledged",
    timestamp: "Today, 12:01:58",
    lastUpdated: "31 sec ago",
    description: "Cabinet temperature is above the preferred operating band for this site.",
    trigger: "Temperature above 40 C for more than 5 minutes.",
    recommendedAction: "Inspect ventilation and confirm that cabinet cooling is unobstructed.",
    activity: [{ event: "Alert acknowledged", time: "12:02:30", detail: "Regional operator" }, { event: "Temperature crossed setpoint", time: "12:01:58", detail: "Environment sensor" }],
  },
  {
    id: "ALT-7397",
    title: "Unusual access event",
    siteName: "Jos Plateau Node",
    siteId: "JOS-051",
    location: "Jos, Plateau",
    category: "Security",
    severity: "Medium",
    status: "Resolved",
    timestamp: "Today, 11:59:42",
    lastUpdated: "18 min ago",
    description: "A cabinet access event was recorded outside the normal maintenance window.",
    trigger: "Door contact opened with an unplanned access schedule.",
    recommendedAction: "Retain the access log and confirm the authorized technician record.",
    activity: [{ event: "Alert resolved", time: "12:06:20", detail: "Security review" }, { event: "Access event acknowledged", time: "12:00:08", detail: "Operations desk" }],
  },
  {
    id: "ALT-7396",
    title: "Site heartbeat delayed",
    siteName: "Ibadan West Tower",
    siteId: "IBD-077",
    location: "Ibadan, Oyo",
    category: "Connectivity",
    severity: "High",
    status: "Active",
    timestamp: "Today, 11:46:12",
    lastUpdated: "18 min ago",
    description: "The edge gateway has not delivered a heartbeat within the expected interval.",
    trigger: "No heartbeat received for 10 minutes.",
    recommendedAction: "Check backhaul reachability and confirm local gateway power.",
    activity: [{ event: "Alert opened", time: "11:46:12", detail: "Connectivity monitor" }, { event: "Last heartbeat", time: "11:28:04", detail: "Edge gateway" }],
  },
  {
    id: "ALT-7395",
    title: "Generator runtime review due",
    siteName: "Kano Industrial Edge",
    siteId: "KNO-032",
    location: "Kano, Kano",
    category: "System",
    severity: "Low",
    status: "Resolved",
    timestamp: "Today, 11:40:20",
    lastUpdated: "25 min ago",
    description: "A scheduled review reminder was generated for the backup generator runtime.",
    trigger: "Generator runtime exceeded the configured review interval.",
    recommendedAction: "Review the runtime log during the next planned maintenance window.",
    activity: [{ event: "Alert resolved", time: "11:52:10", detail: "Maintenance queue" }, { event: "Review reminder created", time: "11:40:20", detail: "RMS360 scheduler" }],
  },
  {
    id: "ALT-7394",
    title: "Telemetry package delayed",
    siteName: "Abuja Core Exchange",
    siteId: "ABJ-014",
    location: "Abuja, FCT",
    category: "System",
    severity: "Medium",
    status: "Acknowledged",
    timestamp: "Today, 11:32:04",
    lastUpdated: "32 min ago",
    description: "A scheduled telemetry package arrived outside its expected delivery window.",
    trigger: "Telemetry delivery latency exceeded 90 seconds.",
    recommendedAction: "Observe the next reporting interval and investigate queue depth if latency persists.",
    activity: [{ event: "Alert acknowledged", time: "11:33:41", detail: "Operations desk" }, { event: "Delayed package received", time: "11:32:04", detail: "Data gateway" }],
  },
];
