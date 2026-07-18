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
    <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Background glow — z:0 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(50% 45% at 50% 50%, rgba(255,170,120,0.28) 0%, rgba(255,120,60,0.10) 35%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] items-center justify-center px-4 pt-16">
        {/* Centered composition wrapper — text + blob share this center */}
        <div className="relative flex w-full items-center justify-center">
          {/* CONTENTMESH background wordmark — z:1 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
            aria-hidden
            className="hero-title pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display"
            style={{
              zIndex: 1,
              fontSize: "clamp(5rem, 11vw, 9.5rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            <span style={{ color: "#0E447F" }}>CONTENT</span>
            <span style={{ color: "#FF7A00" }}>MESH</span>
          </motion.h2>

          {/* Spline blob — z:2 — overlaps only the upper half of the text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: splineLoaded ? 1 : 0, scale: splineLoaded ? 1 : 0.92 }}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
            className="hero-spline pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 items-center justify-center"
            style={{
              zIndex: 2,
              width: "min(700px, 92vw)",
              height: "clamp(340px, 48vw, 560px)",
              transform: "translate(-50%, calc(-50% - 130px))",
              userSelect: "none",
            }}
          >
            {splineLoaded ? (
              <spline-viewer
                url={SPLINE_SCENE_URL}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  pointerEvents: "none",
                }}
              />
            ) : null}
          </motion.div>
        </div>

        {/* CTAs — pinned near bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="absolute inset-x-0 bottom-16 flex flex-wrap items-center justify-center gap-3"
          style={{ zIndex: 3 }}
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
