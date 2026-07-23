import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { Services } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { Portfolio } from "@/components/home/Portfolio";
import { Process } from "@/components/home/Process";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { FAQ_ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout heroSlot={<Hero />}>
      <TrustedBy />
      <Services />
      <WhyUs />
      <Portfolio />
      <Process />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ_ />
      <CTA />
    </SiteLayout>
  );
}

