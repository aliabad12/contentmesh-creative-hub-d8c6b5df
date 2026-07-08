import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles, Video, Mic, Wand2, Film } from "lucide-react";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mx.set(x); my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const tX = useTransform(sx, (v) => `${v}px`);
  const tY = useTransform(sy, (v) => `${v}px`);

  return (
    <section className="relative overflow-hidden">
      <div className="mesh-bg absolute inset-0 -z-10" />
      <motion.div
        aria-hidden
        className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        style={{ x: tX, y: tY }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 top-48 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        style={{ x: useTransform(sx, (v) => `${-v}px`), y: useTransform(sy, (v) => `${-v}px`) }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
            <span className="grid h-4 w-4 place-items-center rounded-full gradient-brand"><Sparkles className="h-2.5 w-2.5 text-white" /></span>
            Now booking Q1 productions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[76px]"
          >
            AI-powered creative content{" "}
            <span className="gradient-text">that grows your business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            We craft stunning AI videos, cinematic animations, professional voiceovers, and high-converting marketing content for brands worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-ink transition-transform hover:scale-[1.03]">
              Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary">
              <Play className="h-4 w-4" /> View Portfolio
            </Link>
          </motion.div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["#FF5A1F", "#0D4C92", "#F6C244", "#111"].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full border-2 border-background" style={{ background: c }} />
              ))}
            </div>
            <p><span className="font-semibold text-foreground">250+ brands</span> shipped premium content with ContentMesh.</p>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 15 });
  const sry = useSpring(ry, { stiffness: 120, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10); rx.set(-py * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }} className="relative">
        <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-ink">
          <div className="flex items-center gap-1.5 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-muted-foreground">mesh.studio / render</span>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl gradient-brand">
            <div className="absolute inset-0 mesh-bg opacity-70" />
            <div className="absolute inset-0 grid place-items-center">
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-primary shadow-2xl">
                <Play className="h-6 w-6 translate-x-0.5" />
              </motion.div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2 text-[11px] text-white backdrop-blur">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"><motion.span initial={{ width: 0 }} animate={{ width: "62%" }} transition={{ duration: 2, delay: 0.6 }} className="block h-full rounded-full bg-white" /></span>
              <span>02:41 / 04:20</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
            {["Scene A", "Scene B", "Scene C"].map((s, i) => (
              <div key={s} className="aspect-video rounded-lg border border-border/70 bg-background/60 p-1.5">
                <div className="h-full rounded-md" style={{ background: `linear-gradient(135deg, ${["#FF5A1F","#0D4C92","#F6C244"][i]}22, transparent)` }} />
                <p className="mt-1 text-muted-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <FloatingCard style={{ top: -18, left: -28 }} delay={0.6} icon={<Video className="h-3.5 w-3.5" />} label="AI Videos" />
        <FloatingCard style={{ top: 60, right: -36 }} delay={0.9} icon={<Wand2 className="h-3.5 w-3.5" />} label="Animation" />
        <FloatingCard style={{ bottom: 90, left: -40 }} delay={1.1} icon={<Mic className="h-3.5 w-3.5" />} label="Voiceovers" />
        <FloatingCard style={{ bottom: -18, right: -20 }} delay={1.3} icon={<Film className="h-3.5 w-3.5" />} label="Video Editing" />
      </motion.div>
    </motion.div>
  );
}

function FloatingCard({ style, delay, icon, label }: { style: React.CSSProperties; delay: number; icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={{ opacity: { delay, duration: 0.5 }, scale: { delay, duration: 0.5 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
      style={style}
      className="glass absolute hidden items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium shadow-soft sm:inline-flex"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full gradient-brand text-white">{icon}</span>
      <span>✓ {label}</span>
    </motion.div>
  );
}
