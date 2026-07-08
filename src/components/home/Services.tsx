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
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32" id="services">
      <SectionHeader eyebrow="Services" title="A full-stack creative studio, supercharged by AI" desc="Every capability you need to ship premium video content — under one roof." />
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, rotate: -0.4 }}
            className="glass glass-reflect shimmer group relative overflow-hidden rounded-[2rem] p-7 transition-shadow hover:shadow-float"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.5),transparent_60%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-[2]">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.72_0.19_42)] to-[oklch(0.42_0.15_260)] text-white shadow-[0_10px_25px_-10px_rgba(255,90,31,0.55)] ring-1 ring-white/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
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
      <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-[52px]">{title}</h2>
      {desc && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{desc}</p>}
    </div>
  );
}
