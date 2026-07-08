import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Portfolio } from "@/components/home/Portfolio";
import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — ContentMesh" },
      { name: "description", content: "A curated look at recent AI ads, product videos, animations, corporate stories, explainers, and social reels." },
      { property: "og:title", content: "Portfolio — ContentMesh" },
      { property: "og:description", content: "Selected creative work by ContentMesh Studio." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Portfolio" title="Selected work" desc="A snapshot of recent productions across industries and formats." />
      <Portfolio />
      <CTA />
    </SiteLayout>
  ),
});
