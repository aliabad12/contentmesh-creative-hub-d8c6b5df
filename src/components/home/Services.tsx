import { motion } from "framer-motion";
import {
  Video, Wand2, Mic, Film, Sparkles, Megaphone,
  Share2, Building2, PlayCircle, Youtube, BookOpen, Brain,
} from "lucide-react";

const SERVICES = [
  { icon: Video, title: "AI Video Production", desc: "From script to screen — cinematic AI-generated videos ready to publish." },
  { icon: Wand2, title: "AI Animation", desc: "Character, product and motion animation powered by the latest models." },
  { icon: Mic, title: "Professional Voiceovers", desc: "Studio-grade AI voice with human polish, in 40+ languages." },
  { icon: Film, title: "Video Editing", desc: "Fast, precise edits with color grading, sound design, and pacing." },
  { icon: Sparkles, title: "Motion Graphics", desc: "Brand-driven kinetic typography, transitions and explainer visuals." },
  { icon: Megaphone, title: "Commercial Ads", desc: "High-converting spots for Meta, YouTube, TikTok, and CTV." },
  { icon: Share2, title: "Social Media Content", desc: "Scroll-stopping reels, shorts and vertical-native storytelling." },
  { icon: Building2, title: "In-house Production", desc: "Studio, lighting, camera and crew — end-to-end capability." },
  { icon: PlayCircle, title: "Corporate Explainers", desc: "Clear, elegant explainers that make complex ideas land." },
  { icon: Youtube, title: "YouTube Automation", desc: "Full-stack channels: research, script, voice, edit, thumbnail." },
  { icon: BookOpen, title: "Brand Storytelling", desc: "Documentary-style narratives that make your brand unforgettable." },
  { icon: Brain, title: "AI Content Strategy", desc: "A creative roadmap tuned to your goals, funnel and audience." },
];

export function Services() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="services">
      <SectionHeader eyebrow="Services" title="A full-stack creative studio, supercharged by AI" desc="Every capability you need to ship premium video content — under one roof." />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-brand text-white shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, desc, center = true }: { eyebrow: string; title: string; desc?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}
