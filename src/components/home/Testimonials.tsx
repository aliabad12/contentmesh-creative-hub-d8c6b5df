import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./Services";

const T = [
  { name: "Amelia Chen", role: "Head of Growth, Aurea", quote: "ContentMesh reshaped our video pipeline. We ship in days what used to take months.", color: "#FF5A1F" },
  { name: "Marcus Rivera", role: "Founder, Halo Wireless", quote: "The craft is incredible and the AI pipeline gave us shot variety we couldn't afford before.", color: "#0D4C92" },
  { name: "Priya Sharma", role: "CMO, Kairos", quote: "Every deliverable was on-brand, on-time, and just… better than we asked for.", color: "#F6C244" },
  { name: "Jonas Weber", role: "Creative Director, Fjord", quote: "Rare studio that gets narrative AND execution. They're now our default creative partner.", color: "#FF5A1F" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const cur = T[i];
  const go = (d: number) => setI((v) => (v + d + T.length) % T.length);
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader eyebrow="Testimonials" title="Loved by builders and brand teams" />
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12"
            >
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-5 font-display text-2xl leading-snug tracking-tight sm:text-3xl">"{cur.quote}"</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full font-semibold text-white" style={{ background: cur.color }}>
                  {cur.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="font-semibold">{cur.name}</p>
                  <p className="text-sm text-muted-foreground">{cur.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5">
              {T.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Go to testimonial ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-4 bg-border"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => go(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
