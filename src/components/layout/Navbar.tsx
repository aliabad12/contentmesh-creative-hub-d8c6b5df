import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useTheme } from "@/components/theme-provider";

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
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-5"}`}>
      <div className={`mx-auto px-4 transition-all duration-500 sm:px-6 ${scrolled ? "max-w-5xl" : "max-w-7xl"}`}>
        <div className={`glass glass-reflect flex items-center justify-between rounded-full px-3 py-2 transition-all sm:px-4 ${scrolled ? "shadow-float" : "shadow-glass"}`}>
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative z-[2] rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "relative z-[2] rounded-full px-3.5 py-2 text-sm font-medium text-foreground bg-white/60 dark:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="relative z-[2] flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/50 text-muted-foreground ring-1 ring-white/40 transition-colors hover:bg-white/70 hover:text-foreground dark:bg-white/5 dark:ring-white/10"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-[oklch(0.72_0.19_42)] to-[oklch(0.62_0.22_30)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_-10px_rgba(255,90,31,0.6)] ring-1 ring-white/30 transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Book a Discovery Call <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/50 ring-1 ring-white/40 lg:hidden dark:bg-white/5 dark:ring-white/10"
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
              className="glass-strong glass-reflect mt-2 flex flex-col gap-1 rounded-3xl p-3 shadow-float lg:hidden"
            >
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                Book a Discovery Call
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
