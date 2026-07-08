import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — ContentMesh" },
      { name: "description", content: "Playbooks, experiments, and behind-the-scenes on AI video, animation, and modern brand storytelling." },
      { property: "og:title", content: "Blog — ContentMesh" },
      { property: "og:description", content: "Playbooks and experiments from the ContentMesh studio." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const POSTS = [
  { t: "The 2026 State of AI Video", c: "Insights", d: "9 min read", g: "linear-gradient(135deg,#FF5A1F,#0D4C92)" },
  { t: "How we cut ad production time by 78%", c: "Case Study", d: "6 min read", g: "linear-gradient(135deg,#0D4C92,#0a2450)" },
  { t: "A director's guide to prompting Runway", c: "Playbook", d: "12 min read", g: "linear-gradient(135deg,#F6C244,#FF5A1F)" },
  { t: "AI voiceovers that actually sound human", c: "Craft", d: "7 min read", g: "linear-gradient(135deg,#111,#FF5A1F)" },
  { t: "Building a brand-safe AI pipeline", c: "Ops", d: "8 min read", g: "linear-gradient(135deg,#0D4C92,#5a7fbf)" },
  { t: "Why storyboards still win in 2026", c: "Craft", d: "5 min read", g: "linear-gradient(135deg,#FF5A1F,#F6C244)" },
];

function Blog() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Blog" title="Notes from the studio" desc="Playbooks, experiments, and behind-the-scenes on modern brand storytelling." />
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <motion.article
              key={p.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[16/10]" style={{ background: p.g }}>
                <div className="absolute inset-0 mesh-bg opacity-40 mix-blend-overlay" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-accent">{p.c}</span>
                  <span className="text-muted-foreground">{p.d}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.t}</h3>
                <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
