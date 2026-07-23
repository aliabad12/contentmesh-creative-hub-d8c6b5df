import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Main header bar ─────────────────────────────────────── */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 py-4 sm:px-6"
      >
        <div
          className="relative flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 sm:px-5"
          style={{
            background: scrolled
              ? "rgba(8,8,12,0.82)"
              : "rgba(8,8,12,0.55)",
            backdropFilter: "blur(32px) saturate(160%)",
            WebkitBackdropFilter: "blur(32px) saturate(160%)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset"
              : "0 4px 24px rgba(0,0,0,0.25)",
            transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className="group relative px-4 py-2 text-sm font-medium transition-colors"
                  style={{ color: active ? "#fff" : "rgba(255,255,255,0.52)" }}
                >
                  {/* Hover pill background */}
                  <span
                    className="absolute inset-0 rounded-xl transition-opacity duration-200 group-hover:opacity-100 opacity-0"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />

                  {/* Label */}
                  <span className="relative">{n.label}</span>

                  {/* Active orange dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-orange-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all sm:inline-flex"
              style={{
                background: "linear-gradient(135deg, #FF5A1F 0%, #FF8C00 100%)",
                boxShadow: "0 0 20px rgba(255,90,31,0.35)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 32px rgba(255,90,31,0.55)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(255,90,31,0.35)")}
            >
              Book a Call <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative grid h-9 w-9 place-items-center rounded-xl border transition-colors lg:hidden"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute"
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute"
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay menu ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] flex flex-col lg:hidden"
            style={{ background: "rgba(6,6,10,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Decorative orange glow */}
            <div
              className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full opacity-25"
              style={{ background: "radial-gradient(circle, #FF5A1F 0%, transparent 70%)" }}
            />

            {/* Nav links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6">
              {NAV.map((n, i) => {
                const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                return (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      to={n.to}
                      className="group flex w-full items-center justify-between rounded-2xl px-6 py-4 transition-colors"
                      style={{
                        background: active ? "rgba(255,90,31,0.12)" : "transparent",
                        border: active ? "1px solid rgba(255,90,31,0.25)" : "1px solid transparent",
                        color: active ? "#FF7A3F" : "rgba(255,255,255,0.65)",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <span className="text-lg font-semibold tracking-tight">{n.label}</span>
                      <ArrowUpRight
                        className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: active ? "#FF7A3F" : "rgba(255,255,255,0.4)" }}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: NAV.length * 0.055 + 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 w-full max-w-xs"
              >
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #FF5A1F 0%, #FF8C00 100%)",
                    boxShadow: "0 0 32px rgba(255,90,31,0.35)",
                  }}
                >
                  Book a Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>

            {/* Bottom brand line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="pb-8 text-center text-xs tracking-widest text-white/20 uppercase"
            >
              ContentMesh © {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
