import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-5"}`}
    >
      <div className={`mx-auto px-4 transition-all duration-500 sm:px-6 ${scrolled ? "max-w-5xl" : "max-w-6xl"}`}>
        <div
          className="flex items-center justify-between px-3 py-2 sm:px-4"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(36px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
            borderRadius: "24px",
          }}
        >
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#666] transition-colors hover:text-[#111]"
                activeProps={{ className: "rounded-full px-4 py-2 text-sm font-semibold text-[#111] bg-black/[0.05]" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-[#111] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Book a Call <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white/70 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 flex flex-col gap-1 rounded-3xl p-3 lg:hidden"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 14px 40px rgba(0,0,0,0.08)",
              }}
            >
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111] hover:bg-black/[0.04]"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-2xl bg-[#111] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book a Discovery Call
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
