import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarketplaceHeader } from "@/components/digital_products/MarketplaceHeader";
import {
  BLOG_POSTS,
  getAllPostSlugs,
  getPostBySlug,
} from "@/lib/blogs/data";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found | Aethon Lab" };
  }

  return { title: `${post.title} | Aethon Lab`, description: post.summary };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const more = BLOG_POSTS.filter((item) => item.slug !== post.slug);

  return (
    <div className="min-h-screen">
      <MarketplaceHeader />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-12 sm:px-8 sm:pb-32">
        <Link
          href="/digital-products/blogs"
          className="inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All posts
        </Link>

        <article className="mt-8">
          <Badge variant="secondary">{post.label}</Badge>
          <h1 className="mt-5 text-pretty text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-white/55">
            {post.author} · {post.published} · {post.readTime}
          </p>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="mt-10 space-y-6 text-base leading-8 text-white/75">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        {more.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
              More posts
            </h2>
            <ul className="mt-5 space-y-4">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/digital-products/blogs/${item.slug}`}
                    className="text-lg font-medium text-white hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
