import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/rms/Nav";
import { Hero } from "@/components/rms/Hero";
import { Stats } from "@/components/rms/Stats";
import {
  About,
  Solutions,
  Features,
  Alerts,
  Gis,
  Intelligence,
  RemoteControl,
  Hardware,
  HowItWorks,
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
  "RMS360 unifies power, fuel, energy, environment, security, assets and CCTV monitoring across distributed sites — with GIS operations, AI analytics and authorized remote control.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <Stats />
        <About />
        <Solutions />
        <Features />
        <Alerts />
        <Gis />
        <Intelligence />
        <RemoteControl />
        <Hardware />
        <HowItWorks />
        <Industries />
        <Security />
        <Why />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
