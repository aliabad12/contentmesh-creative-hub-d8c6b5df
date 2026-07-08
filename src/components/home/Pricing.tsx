import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./Services";

const TIERS = [
  { name: "Starter", price: "$1.5k", desc: "For founders and creators shipping their first videos.",
    features: ["1 project / month", "AI video up to 60s", "1 voiceover language", "2 revision rounds", "5-day turnaround"], },
  { name: "Professional", price: "$4.9k", desc: "For growing brands running multi-channel content.", featured: true,
    features: ["4 projects / month", "AI video + animation", "3 voiceover languages", "Unlimited revisions*", "Dedicated PM", "48h priority queue"], },
  { name: "Enterprise", price: "Custom", desc: "For teams needing an end-to-end creative partner.",
    features: ["Unlimited projects", "In-house production crew", "10+ voiceover languages", "Custom workflows & CMS", "SLA & priority support"], },
];

export function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="pricing">
      <SectionHeader eyebrow="Pricing" title="Simple, scalable creative retainers" desc="Transparent monthly plans — no hidden fees, no long agencies contracts." />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`relative rounded-[2rem] border p-8 ${t.featured ? "border-transparent gradient-brand text-white shadow-ink scale-100 lg:scale-[1.04]" : "border-border bg-card"}`}
          >
            {t.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary shadow">Most Popular</span>}
            <h3 className="font-display text-xl font-semibold">{t.name}</h3>
            <p className={`mt-1 text-sm ${t.featured ? "text-white/80" : "text-muted-foreground"}`}>{t.desc}</p>
            <p className="mt-6 font-display text-5xl font-bold tracking-tight">{t.price}<span className={`ml-1 text-base font-medium ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.price !== "Custom" ? "/mo" : ""}</span></p>
            <ul className="mt-6 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-white" : "text-accent"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${t.featured ? "bg-white text-primary" : "bg-primary text-primary-foreground"}`}
            >
              Get Quote
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
