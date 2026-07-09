import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { sanityClient } from "@/integrations/sanity/client";
import { blogPostBySlugQuery } from "@/integrations/sanity/queries";
import { ArrowLeft } from "lucide-react";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string | null;
  body?: PortableTextBlock[];
  publishedAt?: string;
  tags?: string[];
  author?: { name: string; role?: string; photoUrl?: string | null };
};

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<Post | null> => {
    try {
      return await sanityClient.fetch<Post | null>(blogPostBySlugQuery, { slug: params.slug });
    } catch {
      return null;
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — ContentMesh" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} — ContentMesh` },
        { name: "description", content: loaderData.excerpt ?? "ContentMesh article" },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt ?? "ContentMesh article" },
        ...(loaderData.coverUrl ? [{ property: "og:image", content: loaderData.coverUrl }] : []),
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: PostNotFound,
});

function BlogPost() {
  const post = Route.useLoaderData();
  if (!post) throw notFound();

  return (
    <SiteLayout>
      <PageHero eyebrow={post.tags?.[0] ?? "Article"} title={post.title} desc={post.excerpt} />
      <article className="mx-auto max-w-3xl px-6 pb-24">
        {post.coverUrl && (
          <img src={post.coverUrl} alt={post.title} className="mb-10 aspect-[16/9] w-full rounded-3xl object-cover" />
        )}
        <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
          {post.author?.photoUrl && <img src={post.author.photoUrl} alt={post.author.name} className="h-8 w-8 rounded-full object-cover" />}
          {post.author?.name && <span className="font-medium text-foreground">{post.author.name}</span>}
          {post.publishedAt && <span>· {new Date(post.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>}
        </div>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {post.body ? <PortableText value={post.body} /> : <p className="text-muted-foreground">This article has no content yet.</p>}
        </div>
        <Link to="/blog" className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>
      </article>
    </SiteLayout>
  );
}

function PostNotFound() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Not found" title="Article not found" desc="The post you're looking for isn't available." />
      <div className="mx-auto max-w-3xl px-6 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>
      </div>
    </SiteLayout>
  );
}
