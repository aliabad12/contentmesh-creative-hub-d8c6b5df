import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useSanity } from "@/integrations/sanity/useSanity";
import { homepageQuery } from "@/integrations/sanity/queries";
import { BlobModel } from "./BlobModel";

type HeroData = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroTitleAccent?: string;
  heroSubtitle?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
};

const FALLBACK: HeroData = {
  heroEyebrow: "Now booking Q1 productions",
  heroTitle: "AI-powered content",
  heroTitleAccent: "that moves people.",
  heroSubtitle:
    "We create cinematic AI videos, animations, voiceovers, and premium visual experiences for modern brands, creators, and agencies.",
  heroPrimaryCtaLabel: "Start Project",
  heroPrimaryCtaHref: "/contact",
  heroSecondaryCtaLabel: "View Work",
  heroSecondaryCtaHref: "/portfolio",
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const data = useSanity<HeroData>(["sanity", "homepage", "hero"], homepageQuery, FALLBACK);
  const d = { ...FALLBACK, ...data };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-28 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#666] shadow-[0_6px_20px_rgba(0,0,0,0.04)] backdrop-blur"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#111]">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </span>
            {d.heroEyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease }}
            className="mt-8 font-display text-[52px] font-bold leading-[0.95] tracking-[-0.04em] text-[#111] sm:text-7xl lg:text-[88px]"
          >
            {d.heroTitle}
            <br />
            <span className="gradient-text">{d.heroTitleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-[#666]"
          >
            {d.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href={d.heroPrimaryCtaHref ?? "/contact"} className="btn-primary-pill group">
              <span>{d.heroPrimaryCtaLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={d.heroSecondaryCtaHref ?? "/portfolio"} className="btn-glass-pill">
              <Play className="h-4 w-4" /> {d.heroSecondaryCtaLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex items-center gap-6 text-xs text-[#666]"
          >
            <div className="flex -space-x-2">
              {["#FF5A1F", "#111111", "#F6C244", "#0D4C92"].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full ring-2 ring-white" style={{ background: c }} />
              ))}
            </div>
            <p>
              <span className="font-semibold text-[#111]">250+ brands</span> shipped premium content with ContentMesh.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative"
        >
          <BlobModel />
        </motion.div>
      </div>
    </section>
  );
}
