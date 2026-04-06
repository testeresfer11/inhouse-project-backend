import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getPayload } from "@/lib/payload";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("blog", {
    title: "SEO Blog — Expert Strategies, Guides & Industry Insights",
    description: "Read the latest SEO strategies, technical guides, algorithm updates and industry insights from our senior SEO experts.",
  });
}

export const revalidate = 60;

async function getPosts() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 1,
      limit: 100,
    });
    return result.docs;
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
    <div className="min-h-screen bg-white">
      <PageHeader
        badge="Insights & Strategies"
        title="The Search Insider"
        description="Deep-dive strategies, industry news, and technical SEO guides written by our senior experts."
      />

      <section className="py-12 pb-24" style={{ background: "#F8FAFC" }}>
        <div className="container mx-auto px-4">
          {posts.length === 0 && (
            <div className="text-center py-32 bg-white rounded-2xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No posts published yet.</h3>
              <p className="text-slate-400">Check back soon for our latest insights.</p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const author = typeof post.author === "object" ? post.author : null;
                const firstCategory =
                  post.categories && post.categories.length > 0
                    ? typeof post.categories[0] === "object"
                      ? (post.categories[0] as any).name
                      : null
                    : null;
                const featuredImage =
                  post.featuredImage && typeof post.featuredImage === "object"
                    ? (post.featuredImage as any).url
                    : null;

                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col">
                      <div className="h-56 overflow-hidden bg-slate-100 relative">
                        <img
                          src={
                            featuredImage ||
                            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {firstCategory && (
                          <div className="absolute top-4 left-4">
                            <span
                              className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold rounded-full border"
                              style={{ color: "#6C5CE7", borderColor: "#6C5CE730" }}
                            >
                              {firstCategory}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          )}
                          {author && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {(author as any).name}
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                          {post.excerpt || ""}
                        </p>
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all"
                          style={{ color: "#6C5CE7" }}
                        >
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
      <SeoJsonLd pageKey="blog" />
    </>
  );
}
