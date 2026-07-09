import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="ContentMesh home"
    >
      <img
        src="/contentmesh-logo.png"
        alt="ContentMesh"
        className="h-10 w-auto sm:h-11"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
