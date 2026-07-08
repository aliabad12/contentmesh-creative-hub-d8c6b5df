import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Stats } from "@/components/home/Stats";
import { CTA } from "@/components/home/CTA";
import { Target, Eye, Heart, Building2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ContentMesh" },
      { name: "description", content: "ContentMesh is an AI-powered creative studio combining senior craft with cutting-edge production tools." },
      { property: "og:title", content: "About — ContentMesh" },
      { property: "og:description", content: "The team, mission and studio behind ContentMesh." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const PILLARS = [
  { icon: Target, t: "Mission", d: "Give every brand a world-class creative team on demand." },
  { icon: Eye, t: "Vision", d: "A future where AI and taste ship stories at the speed of ideas." },
  { icon: Heart, t: "Values", d: "Craft, honesty, speed, and relentless usefulness for clients." },
  { icon: Building2, t: "Studio", d: "In-house production stage, edit bays, and a dedicated VO booth." },
];

const TEAM = [
  { n: "Ava Morgan", r: "Creative Director", c: "#FF5A1F" },
  { n: "Leo Park", r: "Head of AI Production", c: "#0D4C92" },
  { n: "Sara Bello", r: "Executive Producer", c: "#F6C244" },
  { n: "Ethan Cole", r: "Lead Motion Designer", c: "#111" },
];

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About" title="A modern studio for the AI era" desc="We're a small, senior team of directors, editors, and technologists building the future of branded content." />

      <section className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12">
          <p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">
            ContentMesh started as a bet: <span className="gradient-text">that AI + real craft would beat traditional agency pipelines</span> — in speed, in quality, and in cost. Two years later, we produce work for hundreds of brands across four continents.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div key={p.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white"><p.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display font-semibold">{p.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Stats />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">The team</h2>
        <p className="mt-2 text-muted-foreground">Senior creatives, deeply hands-on.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div key={m.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card">
              <div className="aspect-[4/5] relative" style={{ background: `linear-gradient(135deg, ${m.c}, #0D4C92)` }}>
                <div className="absolute inset-0 mesh-bg opacity-40 mix-blend-overlay" />
                <p className="absolute bottom-4 left-4 font-display text-4xl font-bold text-white/90">
                  {m.n.split(" ").map((x) => x[0]).join("")}
                </p>
              </div>
              <div className="p-4">
                <p className="font-display font-semibold">{m.n}</p>
                <p className="text-sm text-muted-foreground">{m.r}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
