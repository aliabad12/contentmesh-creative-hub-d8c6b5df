import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="ContentMesh home">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl gradient-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4" opacity=".85" />
          <path d="M4 17l8 4 8-4" opacity=".6" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Content<span className="text-accent">Mesh</span>
      </span>
    </Link>
  );
}
