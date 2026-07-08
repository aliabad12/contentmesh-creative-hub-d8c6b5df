import { motion } from "framer-motion";
import { Zap, Award, DollarSign, Infinity as InfIcon, Cpu, Users, UserCheck, RefreshCw } from "lucide-react";
import { SectionHeader } from "./Services";

const REASONS = [
  { icon: Zap, title: "Fast Turnaround", desc: "Most projects delivered in 3–7 days." },
  { icon: Award, title: "Premium Quality", desc: "Cinema-grade craft on every frame." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Transparent, project-based rates." },
  { icon: InfIcon, title: "Unlimited Creativity", desc: "Bold ideas, no cookie-cutter templates." },
  { icon: Cpu, title: "Latest AI Tools", desc: "Runway, Sora-class, ElevenLabs, and beyond." },
  { icon: Users, title: "Experienced Team", desc: "10+ years of creative direction on staff." },
  { icon: UserCheck, title: "Dedicated PM", desc: "One point of contact, always in the loop." },
  { icon: RefreshCw, title: "Flexible Revisions", desc: "Iterate until the work sings." },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why ContentMesh" title="The creative partner your brand actually needs" desc="Serious craft, cutting-edge tools, and grown-up project management." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
