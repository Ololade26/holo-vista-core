import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/rms/Nav";
import { Hero } from "@/components/rms/Hero";
import { DashboardConsole } from "@/components/rms/DashboardConsole";
import { SitesInfrastructure } from "@/components/rms/SitesInfrastructure";
import { AlertsIncidentManagement } from "@/components/rms/AlertsIncidentManagement";
import { AiAnalytics } from "@/components/rms/AiAnalytics";
import { WhatIsRms } from "@/components/rms/WhatIsRms";
import {
  Solutions,
  Features,
  Alerts,
  Gis,
  Intelligence,
  RemoteControl,
  Hardware,
  HowItWorks,
  ManagementModules,
} from "@/components/rms/Sections";
import {
  Industries,
  Security,
  Why,
  FinalCta,
  Footer,
} from "@/components/rms/Sections2";

const title = "RMS360 — Intelligent Remote Monitoring for Critical Infrastructure";
const description =
  "RMS360 is an intelligent remote monitoring and infrastructure management platform that provides real-time visibility, alerts, analytics and control across distributed critical infrastructure.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RMS360" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <DashboardConsole />
        <Solutions />
        <Features />
        <ManagementModules />
        <SitesInfrastructure />
        <AlertsIncidentManagement />
        <Alerts />
        <Gis />
        <AiAnalytics />
        <Intelligence />
        <RemoteControl />
        <Hardware />
        <HowItWorks />
        <Industries />
        <Security />
        <Why />
        <WhatIsRms />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
