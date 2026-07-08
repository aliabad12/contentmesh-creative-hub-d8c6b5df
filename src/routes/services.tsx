import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Services } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ContentMesh AI Creative Studio" },
      { name: "description", content: "AI video production, animation, voiceovers, motion graphics, and in-house production. Explore ContentMesh's full creative capability." },
      { property: "og:title", content: "Services — ContentMesh" },
      { property: "og:description", content: "AI video, animation, voiceovers, and cinematic marketing content." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Services" title="Every creative capability. One studio." desc="From concept to master files, we handle the full production pipeline — powered by the latest AI tools and led by senior creatives." />
      <Services />
      <WhyUs />
      <Process />
      <CTA />
    </SiteLayout>
  );
}
