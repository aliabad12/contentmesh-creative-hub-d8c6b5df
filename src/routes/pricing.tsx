import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Pricing } from "@/components/home/Pricing";
import { FAQ_ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ContentMesh" },
      { name: "description", content: "Transparent monthly creative retainers from ContentMesh. Starter, Professional, and Enterprise plans." },
      { property: "og:title", content: "Pricing — ContentMesh" },
      { property: "og:description", content: "Simple, scalable creative retainers." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Pricing" title="Plans built to scale with your brand" desc="Straightforward retainers with clear deliverables. Upgrade, downgrade, or pause any time." />
      <Pricing />
      <FAQ_ />
      <CTA />
    </SiteLayout>
  ),
});
