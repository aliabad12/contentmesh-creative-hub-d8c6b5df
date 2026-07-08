import { Link } from "@tanstack/react-router";
import logo from "@/assets/contentmesh-logo.png.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="ContentMesh home"
    >
      <img
        src={logo.url}
        alt="ContentMesh"
        className="h-10 w-auto sm:h-11"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
