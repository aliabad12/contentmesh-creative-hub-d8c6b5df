import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useSanity } from "@/integrations/sanity/useSanity";
import { homepageQuery } from "@/integrations/sanity/queries";
import { getIcon } from "@/lib/icon-map";
import { SectionHeader } from "./Services";

type Reason = { icon?: string; title: string; description?: string };
type Data = { whyUs?: Reason[] };

const FALLBACK: Data = {
  whyUs: [
    { icon: "Zap", title: "Fast Turnaround", description: "Most projects delivered in 3–7 days." },
    { icon: "Award", title: "Premium Quality", description: "Cinema-grade craft on every frame." },
    { icon: "DollarSign", title: "Affordable Pricing", description: "Transparent, project-based rates." },
    { icon: "Infinity", title: "Unlimited Creativity", description: "Bold ideas, no cookie-cutter templates." },
    { icon: "Cpu", title: "Latest AI Tools", description: "Runway, Sora-class, ElevenLabs, and beyond." },
    { icon: "Users", title: "Experienced Team", description: "10+ years of creative direction on staff." },
    { icon: "UserCheck", title: "Dedicated PM", description: "One point of contact, always in the loop." },
    { icon: "RefreshCw", title: "Flexible Revisions", description: "Iterate until the work sings." },
  ],
};

export function WhyUs() {
  const data = useSanity<Data>(["sanity", "homepage", "whyUs"], homepageQuery, FALLBACK);
  const reasons = data.whyUs && data.whyUs.length ? data.whyUs : FALLBACK.whyUs!;

  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why ContentMesh" title="The creative partner your brand actually needs" desc="Serious craft, cutting-edge tools, and grown-up project management." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = getIcon(r.icon, Zap);
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className="rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
