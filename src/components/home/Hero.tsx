import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSanity } from "@/integrations/sanity/useSanity";
import { homepageQuery } from "@/integrations/sanity/queries";

// ─── Types ──────────────────────────────────────────────────────────────────

type HeroSlide = {
  category?: string;
  title?: string;
  description?: string;
  youtubeUrl?: string;
  backgroundImageUrl?: string;
};

type HomepageData = {
  heroSlides?: HeroSlide[];
};

// ─── Fallback content (shown while Sanity loads or if no slides exist) ──────

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    category: "AI VIDEO PRODUCTION",
    title: "VISUALS THAT MOVE PEOPLE.",
    description:
      "From concept to final cut — AI-powered video production that makes your brand impossible to ignore.",
  },
  {
    category: "GENERATIVE ART",
    title: "IMAGES BORN FROM IMAGINATION.",
    description:
      "Photoreal AI imagery, campaign visuals and brand-defining art direction produced at the speed of thought.",
  },
  {
    category: "BRAND FILMS",
    title: "STORIES WORTH WATCHING.",
    description:
      "Premium brand films, commercial spots and social content crafted by our in-house production crew.",
  },
];

// Gradient fallbacks when no background image is uploaded
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #04081a 0%, #0D4C92 55%, #FF5A1F 100%)",
  "linear-gradient(135deg, #0a0010 0%, #330055 50%, #FF5A1F 100%)",
  "linear-gradient(135deg, #000a10 0%, #003344 50%, #0D4C92 100%)",
];

const SLIDE_DURATION = 6000; // ms

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractYouTubeId(url: string): string | null {
  try {
    const patterns = [
      /[?&]v=([^&\n?#]+)/,
      /youtu\.be\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m?.[1]) return m[1];
    }
  } catch {
    /* noop */
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Hero() {
  const data = useSanity<HomepageData>(["sanity", "homepage"], homepageQuery, {});
  const slides: HeroSlide[] =
    data?.heroSlides && data.heroSlides.length > 0 ? data.heroSlides : FALLBACK_SLIDES;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);

  // ── Auto-advance ────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(
      () => setCurrent((c) => (c + 1) % slides.length),
      SLIDE_DURATION,
    );
    return () => clearTimeout(t);
  }, [current, slides.length]);

  // ── Progress bar ────────────────────────────────────────────────────────────
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(((Date.now() - start) / SLIDE_DURATION) * 100, 100);
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [current]);

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoId(null);
      if (!videoId && e.key === "ArrowLeft")
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
      if (!videoId && e.key === "ArrowRight")
        setCurrent((c) => (c + 1) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoId, slides.length]);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length],
  );

  const slide = slides[current] ?? {};
  const ytId = slide.youtubeUrl ? extractYouTubeId(slide.youtubeUrl) : null;
  const bg = slide.backgroundImageUrl
    ? `url(${slide.backgroundImageUrl})`
    : FALLBACK_GRADIENTS[current % FALLBACK_GRADIENTS.length];

  return (
    <>
      {/* ══════════════════════ HERO SECTION ══════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100dvh" }}
        aria-label="Hero"
      >
        {/* Background */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{
              backgroundImage: bg,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>

        {/* Dark overlay — heavier on left/bottom for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.10) 100%), " +
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
          }}
        />

        {/* ── Category label top-left ───────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`cat-${current}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45 }}
            className="absolute left-8 z-10 text-xs font-bold uppercase tracking-[0.22em] text-orange-400 sm:left-14"
            style={{ top: "calc(var(--navbar-h, 6rem) + 1.5rem)" }}
          >
            {slide.category ?? "CONTENTMESH"} &mdash;{" "}
            {String(current + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
          </motion.p>
        </AnimatePresence>

        {/* ── Center play button (only if YouTube URL provided) ─── */}
        {ytId && (
          <button
            onClick={() => setVideoId(ytId)}
            aria-label="Play video"
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <motion.span
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 ring-4 ring-orange-500/30"
              style={{ boxShadow: "0 0 50px rgba(255,90,31,0.55)" }}
            >
              <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" />
            </motion.span>
          </button>
        )}

        {/* ── Arrow — prev ─────────────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* ── Arrow — next ─────────────────────────────────────── */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* ── Content — bottom-left ─────────────────────────────── */}
        <div className="absolute bottom-20 left-8 z-10 max-w-lg sm:left-14 sm:bottom-24 lg:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Title */}
              <h1
                className="font-display font-black uppercase leading-[0.92] tracking-tight text-white"
                style={{ fontSize: "clamp(2.2rem, 5vw + 1rem, 4.5rem)" }}
              >
                {slide.title ?? "CREATIVE PRODUCTION REIMAGINED."}
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base max-w-md">
                {slide.description ??
                  "AI-powered creative studio delivering video, art and brand content at the speed of thought."}
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  View Portfolio{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-orange-600"
                  style={{ boxShadow: "0 0 24px rgba(255,90,31,0.45)" }}
                >
                  Book an Order
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress bar + counter — bottom-right ────────────── */}
        <div className="absolute bottom-8 right-6 z-10 flex items-center gap-3 sm:right-10">
          {/* Play/pause icon */}
          <button
            aria-label="Pause / play slideshow"
            className="text-white/40 hover:text-white/70 transition"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="0" y="0" width="4" height="12" rx="1" />
              <rect x="7" y="0" width="4" height="12" rx="1" />
            </svg>
          </button>

          {/* Progress track */}
          <div className="h-[3px] w-28 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-orange-500 transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Volume icon placeholder */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/40"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </div>

        {/* ── Dot navigation — bottom-center ───────────────────── */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-[3px] bg-orange-500"
                  : "w-[6px] h-[3px] bg-white/35 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════ YOUTUBE MODAL ══════════════════════ */}
      <AnimatePresence>
        {videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setVideoId(null)}
                aria-label="Close video"
                className="absolute -top-10 right-0 flex items-center gap-1.5 text-xs font-semibold text-white/50 transition hover:text-white"
              >
                <X className="h-4 w-4" /> Close
              </button>

              {/* 16:9 iframe wrapper */}
              <div
                className="relative overflow-hidden rounded-2xl bg-black"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title="ContentMesh Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
