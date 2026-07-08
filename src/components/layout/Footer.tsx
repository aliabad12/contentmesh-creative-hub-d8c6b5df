import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube, Send } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              An AI-powered creative studio helping brands ship cinematic content — faster, sharper, on-message.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" links={[["About", "/about"], ["Portfolio", "/portfolio"], ["Blog", "/blog"], ["Contact", "/contact"]]} />
          <FooterCol title="Services" links={[["AI Video", "/services"], ["Animation", "/services"], ["Voiceovers", "/services"], ["Motion Graphics", "/services"]]} />

          <div>
            <h4 className="font-display text-sm font-semibold">Get creative drops</h4>
            <p className="mt-2 text-sm text-muted-foreground">Monthly experiments, launches, and behind-the-scenes.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex overflow-hidden rounded-full border border-border bg-background pr-1">
              <input type="email" required placeholder="you@company.com" className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground" />
              <button className="grid h-9 w-9 shrink-0 place-items-center self-center rounded-full bg-primary text-primary-foreground" aria-label="Subscribe"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ContentMesh Studio. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/contact" className="hover:text-foreground">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-muted-foreground transition-colors hover:text-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
