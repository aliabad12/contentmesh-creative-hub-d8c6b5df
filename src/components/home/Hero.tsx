import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "loading-anim-type"?: string;
          "events-target"?: string;
        },
        HTMLElement
      >;
    }
  }
}

const SPLINE_SCRIPT_SRC = "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";
const SPLINE_SCENE_URL = "https://prod.spline.design/wnDFI7P2Djs0hAAK/scene.splinecode";

const ease = [0.16, 1, 0.3, 1] as const;

function useSplineLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (customElements.get("spline-viewer")) {
      setLoaded(true);
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SPLINE_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.type = "module";
      script.src = SPLINE_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    customElements.whenDefined("spline-viewer").then(() => setLoaded(true));
  }, []);
  return loaded;
}

export function Hero() {
  const splineLoaded = useSplineLoaded();

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 7rem)", zIndex: 1 }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(50% 45% at 50% 55%, rgba(255,170,120,0.24) 0%, rgba(255,120,60,0.08) 35%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-4">
        {/* CONTENTMESH title — shifted up ~70px */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease }}
          className="hero-title pointer-events-none select-none text-center font-display"
          style={{
            fontSize: "clamp(4rem, 9vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.06em",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          <span style={{ color: "#0F4C97" }}>CONTENT</span>
          <span style={{ color: "#FF6A00" }}>MESH</span>
        </motion.h1>

        {/* Spline blob — floats BELOW the title, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: splineLoaded ? 1 : 0, scale: splineLoaded ? 1 : 0.94 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="hero-spline pointer-events-none relative flex items-center justify-center"
          style={{
            width: "clamp(180px, 26vw, 340px)",
            height: "clamp(180px, 26vw, 340px)",
            marginTop: "clamp(20px, 3vh, 40px)",
            userSelect: "none",
            overflow: "visible",
          }}
        >
          {splineLoaded ? (
            <spline-viewer
              url={SPLINE_SCENE_URL}
              style={{
                width: "140%",
                height: "140%",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                pointerEvents: "none",
                overflow: "visible",
              }}
            />
          ) : null}
        </motion.div>

        {/* CTAs — 40px below blob */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ marginTop: 40 }}
        >
          <a href="/contact" className="btn-primary-pill group">
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="/portfolio" className="btn-glass-pill">
            <Play className="h-4 w-4" /> Watch Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
