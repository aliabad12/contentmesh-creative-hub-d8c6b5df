import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="ContentMesh home"
    >
      <img
        src="/Content_mesh_AI_video_production_agency.png"
        alt="ContentMesh"
        className="h-12 w-auto object-contain sm:h-14"
        loading="eager"
        decoding="async"
        style={{ maxWidth: "180px" }}
      />
    </Link>
  );
}
