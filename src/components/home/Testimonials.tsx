import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useSanity } from "@/integrations/sanity/useSanity";
import { testimonialsQuery } from "@/integrations/sanity/queries";
import { SectionHeader } from "./Services";

type T = {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  avatarUrl?: string | null;
  rating?: number;
  accentColor?: string;
};

const FALLBACK: T[] = [
  { _id: "1", authorName: "Amelia Chen", authorRole: "Head of Growth, Aurea", quote: "ContentMesh reshaped our video pipeline. We ship in days what used to take months.", accentColor: "#FF5A1F" },
  { _id: "2", authorName: "Marcus Rivera", authorRole: "Founder, Halo Wireless", quote: "The craft is incredible and the AI pipeline gave us shot variety we couldn't afford before.", accentColor: "#0D4C92" },
  { _id: "3", authorName: "Priya Sharma", authorRole: "CMO, Kairos", quote: "Every deliverable was on-brand, on-time, and just… better than we asked for.", accentColor: "#F6C244" },
  { _id: "4", authorName: "Jonas Weber", authorRole: "Creative Director, Fjord", quote: "Rare studio that gets narrative AND execution. They're now our default creative partner.", accentColor: "#FF5A1F" },
];

export function Testimonials() {
  const list = useSanity<T[]>(["sanity", "testimonials"], testimonialsQuery, FALLBACK);
  const [i, setI] = useState(0);
  const idx = i % list.length;
  const cur = list[idx];
  const go = (d: number) => setI((v) => (v + d + list.length) % list.length);
  if (!cur) return null;
  const rating = cur.rating ?? 5;

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader eyebrow="Testimonials" title="Loved by builders and brand teams" />
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="glass-strong glass-reflect rounded-[2rem] p-8 shadow-float sm:p-12"
            >
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-5 font-display text-2xl leading-snug tracking-tight sm:text-3xl">"{cur.quote}"</p>
              <div className="mt-8 flex items-center gap-3">
                {cur.avatarUrl ? (
                  <img src={cur.avatarUrl} alt={cur.authorName} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span className="grid h-11 w-11 place-items-center rounded-full font-semibold text-white" style={{ background: cur.accentColor ?? "#FF5A1F" }}>
                    {cur.authorName.split(" ").map((n) => n[0]).join("")}
                  </span>
                )}
                <div>
                  <p className="font-semibold">{cur.authorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {cur.authorRole}{cur.company ? `, ${cur.company}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5">
              {list.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Go to testimonial ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${k === idx ? "w-8 bg-accent" : "w-4 bg-border"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous" className="glass grid h-10 w-10 place-items-center rounded-full hover:bg-white/60 dark:hover:bg-white/10"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => go(1)} aria-label="Next" className="glass grid h-10 w-10 place-items-center rounded-full hover:bg-white/60 dark:hover:bg-white/10"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
