/**
 * Site-wide ambient background: soft mesh grid + animated color orbs.
 * Placed once in SiteLayout, sits behind all content (pointer-events-none).
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base cream/white wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f1_50%,#f5f7fa_100%)] dark:bg-[linear-gradient(180deg,#0b1020_0%,#0e1530_60%,#0a0f1f_100%)]" />
      {/* subtle diagonal mesh */}
      <div className="mesh-grid absolute inset-0 opacity-60 dark:opacity-20" />
      {/* orbs */}
      <div className="orb-a absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,90,31,0.35),transparent_60%)] blur-3xl" />
      <div className="orb-b absolute right-[-15%] top-[15%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(13,76,146,0.30),transparent_60%)] blur-3xl" />
      <div className="orb-c absolute left-[25%] top-[55%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(246,194,68,0.22),transparent_60%)] blur-3xl" />
      <div className="orb-a absolute right-[10%] bottom-[-10%] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.22),transparent_60%)] blur-3xl" />
      {/* subtle top vignette for navbar contrast */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent dark:from-black/40" />
    </div>
  );
}
