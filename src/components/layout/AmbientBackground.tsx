/**
 * Bright, minimal ambient background — subtle radial gradients on white.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#FAFAFA]" />
      {/* very subtle warm glow top-left */}
      <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,140,90,0.18),transparent_60%)] blur-3xl" />
      {/* cool wash right */}
      <div className="absolute right-[-15%] top-[15%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(120,140,200,0.12),transparent_60%)] blur-3xl" />
      {/* warm center accent */}
      <div className="absolute left-[25%] top-[55%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,180,140,0.10),transparent_60%)] blur-3xl" />
      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_50%,rgba(0,0,0,0.04)_100%)]" />
    </div>
  );
}
