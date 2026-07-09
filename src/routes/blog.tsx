import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRight } from "lucide-react";
import { useSanity } from "@/integrations/sanity/useSanity";
import { blogListQuery } from "@/integrations/sanity/queries";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — ContentMesh" },
      { name: "description", content: "Playbooks, experiments, and behind-the-scenes on AI video, animation, and modern brand storytelling." },
      { property: "og:title", content: "Blog — ContentMesh" },
      { property: "og:description", content: "Playbooks and experiments from the ContentMesh studio." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string | null;
  publishedAt?: string;
  tags?: string[];
  authorName?: string;
};

const GRADIENTS = [
  "linear-gradient(135deg,#FF5A1F,#0D4C92)",
  "linear-gradient(135deg,#0D4C92,#0a2450)",
  "linear-gradient(135deg,#F6C244,#FF5A1F)",
  "linear-gradient(135deg,#111,#FF5A1F)",
  "linear-gradient(135deg,#0D4C92,#5a7fbf)",
  "linear-gradient(135deg,#FF5A1F,#F6C244)",
];

const FALLBACK: Post[] = [
  { _id: "1", slug: "state-of-ai-video-2026", title: "The 2026 State of AI Video", tags: ["Insights"], excerpt: "9 min read" },
  { _id: "2", slug: "cut-ad-production-time", title: "How we cut ad production time by 78%", tags: ["Case Study"], excerpt: "6 min read" },
  { _id: "3", slug: "directors-guide-runway", title: "A director's guide to prompting Runway", tags: ["Playbook"], excerpt: "12 min read" },
  { _id: "4", slug: "human-sounding-voiceovers", title: "AI voiceovers that actually sound human", tags: ["Craft"], excerpt: "7 min read" },
  { _id: "5", slug: "brand-safe-ai-pipeline", title: "Building a brand-safe AI pipeline", tags: ["Ops"], excerpt: "8 min read" },
  { _id: "6", slug: "storyboards-still-win", title: "Why storyboards still win in 2026", tags: ["Craft"], excerpt: "5 min read" },
];

function Blog() {
  const posts = useSanity<Post[]>(["sanity", "blog", "list"], blogListQuery, FALLBACK);
  return (
    <SiteLayout>
      <PageHero eyebrow="Blog" title="Notes from the studio" desc="Playbooks, experiments, and behind-the-scenes on modern brand storytelling." />
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className="relative aspect-[16/10]"
                style={p.coverUrl ? { background: `url(${p.coverUrl}) center/cover` } : { background: GRADIENTS[i % GRADIENTS.length] }}
              >
                {!p.coverUrl && <div className="absolute inset-0 mesh-bg opacity-40 mix-blend-overlay" />}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs">
                  {p.tags?.[0] && <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-accent">{p.tags[0]}</span>}
                  <span className="text-muted-foreground">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : p.excerpt}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                {p.excerpt && p.publishedAt && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
