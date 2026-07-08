import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { v: 250, s: "+", l: "Projects Delivered" },
  { v: 98,  s: "%", l: "Client Satisfaction" },
  { v: 40,  s: "+", l: "Brands Served" },
  { v: 12,  s: "+", l: "Creative Services" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[2rem] gradient-brand p-8 shadow-ink sm:p-12">
        <div className="grid grid-cols-2 gap-8 text-white sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                <Counter to={s.v} />{s.s}
              </p>
              <p className="mt-2 text-sm text-white/85">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now(); const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}
