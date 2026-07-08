import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const STEPS = [
  { t: "Discovery", d: "Kickoff, goals, audience, tone." },
  { t: "Strategy", d: "Concept, narrative arc, deliverables." },
  { t: "Script", d: "Writing, storyboard, mood board." },
  { t: "Production", d: "AI generation, shoot, VO sessions." },
  { t: "Editing", d: "Assembly, color, sound, motion." },
  { t: "Delivery", d: "Masters, cutdowns, launch support." },
];

export function Process() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader eyebrow="Process" title="A tight, transparent creative workflow" desc="Six focused steps from brief to broadcast — with checkpoints at every stage." />
      <div className="relative mt-16">
        <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:block" />
        <div className="space-y-8 lg:space-y-16">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:col-start-2" : ""}`}
            >
              <div className={`rounded-3xl border border-border bg-card p-6 shadow-soft ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                <p className="font-display text-4xl font-bold gradient-text">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
              <div className="hidden lg:block" />
              <span aria-hidden className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-glow lg:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
