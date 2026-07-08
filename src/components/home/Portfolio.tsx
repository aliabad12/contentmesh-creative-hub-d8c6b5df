import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { SectionHeader } from "./Services";

const CATS = ["All", "AI Ads", "Product Videos", "Animations", "Corporate", "Explainers", "Reels"] as const;

type Project = { title: string; cat: (typeof CATS)[number]; gradient: string; span: string };
const PROJECTS: Project[] = [
  { title: "Aurea × Launch Film", cat: "AI Ads", gradient: "linear-gradient(135deg,#FF5A1F,#0D4C92)", span: "sm:col-span-2 sm:row-span-2" },
  { title: "Halo Wireless — Hero", cat: "Product Videos", gradient: "linear-gradient(135deg,#0D4C92,#0a2450)", span: "" },
  { title: "Nova Robotics Loop", cat: "Animations", gradient: "linear-gradient(135deg,#F6C244,#FF5A1F)", span: "" },
  { title: "Fjord — Field Story", cat: "Corporate", gradient: "linear-gradient(135deg,#0D4C92,#5a7fbf)", span: "sm:col-span-2" },
  { title: "Kairos AI Explainer", cat: "Explainers", gradient: "linear-gradient(135deg,#111,#FF5A1F)", span: "" },
  { title: "Vantage Reels Set", cat: "Reels", gradient: "linear-gradient(135deg,#FF5A1F,#F6C244)", span: "" },
  { title: "Lumen Series — S02", cat: "AI Ads", gradient: "linear-gradient(135deg,#0D4C92,#FF5A1F)", span: "sm:col-span-2" },
  { title: "Orbita — Onboarding", cat: "Explainers", gradient: "linear-gradient(135deg,#F6F2E7,#FF5A1F)", span: "" },
];

export function Portfolio() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="portfolio">
      <SectionHeader eyebrow="Portfolio" title="Work that moves — literally" desc="A curated snapshot of recent productions across formats and industries." />
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${cat === c ? "bg-primary text-primary-foreground shadow-ink" : "border border-border bg-background hover:bg-secondary"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {list.map((p) => (
            <motion.button
              layout
              key={p.title}
              onClick={() => setOpen(p)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className={`group relative overflow-hidden rounded-3xl text-left ${p.span}`}
              style={{ background: p.gradient }}
            >
              <div className="absolute inset-0 mesh-bg opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">{p.cat}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{p.title}</h3>
              </div>
              <div className="absolute right-4 top-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <ExternalLink className="h-4 w-4" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card"
            >
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-video w-full" style={{ background: open.gradient }}>
                <div className="h-full w-full mesh-bg mix-blend-overlay" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{open.cat}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{open.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">A cinematic production blending AI generation, live-action plates and premium sound design. Delivered in 4K with masters for every platform.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
