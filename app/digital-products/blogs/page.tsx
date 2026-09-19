import type { Metadata } from "next";
import { MarketplaceHeader } from "@/components/digital_products/MarketplaceHeader";
import { Blog7 } from "@/components/ui/blog7";
import { BLOG_POSTS } from "@/lib/blogs/data";

export const metadata: Metadata = {
  title: "Blog | Aethon Lab",
  description:
    "Guides, templates and ideas for getting more out of your digital products.",
};

const posts = BLOG_POSTS.map((post) => ({
  id: post.slug,
  title: post.title,
  summary: post.summary,
  label: post.label,
  author: post.author,
  published: post.published,
  url: `/digital-products/blogs/${post.slug}`,
  image: post.image,
}));

export default function BlogsPage() {
  return (
    <div className="min-h-screen">
      <MarketplaceHeader />
      <main>
        <Blog7
          tagline="Latest Updates"
          heading="Blog"
          description="Guides, templates and ideas for getting more out of your digital products."
          buttonText="Browse digital products"
          buttonUrl="/digital-products"
          posts={posts}
        />
      </main>
    </div>
  );
}
