import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, User, Twitter, Linkedin, Globe, ChevronRight } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "@/lib/payload";

export const revalidate = 60;

type SerializedEditorState = { root: { children: any[] } };
type Heading = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function extractHeadings(data: SerializedEditorState | null | undefined): Heading[] {
  if (!data?.root?.children) return [];
  const headings: Heading[] = [];
  function traverse(nodes: any[]) {
    for (const node of nodes) {
      if (node.type === "heading") {
        const text = (node.children || []).map((c: any) => c.text || "").join("");
        const id = slugify(text);
        const level = parseInt((node.tag as string)?.replace("h", "") || "2", 10);
        headings.push({ id, text, level });
      }
      if (node.children) traverse(node.children);
    }
  }
  traverse(data.root.children);
  return headings;
}

async function getPost(slug: string) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      },
      depth: 2,
      limit: 1,
    });
    return result.docs[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";
  const seo = post.seo as any;
  const featuredImage =
    post.featuredImage && typeof post.featuredImage === "object"
      ? (post.featuredImage as any).url
      : null;

  const title = seo?.metaTitle || post.title;
  const description = seo?.metaDescription || post.excerpt || "";
  const ogTitle = seo?.ogTitle || title;
  const ogDesc = seo?.ogDescription || description;
  const ogImageUrl = seo?.ogImage
    ? typeof seo.ogImage === "object"
      ? seo.ogImage.url
      : null
    : featuredImage;

  return {
    title,
    description,
    robots: seo?.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: seo?.canonicalUrl || `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";

  const author =
    post.author && typeof post.author === "object" ? (post.author as any) : null;
  const categories =
    post.categories?.map((c: any) => (typeof c === "object" ? c : null)).filter(Boolean) || [];
  const featuredImage =
    post.featuredImage && typeof post.featuredImage === "object"
      ? (post.featuredImage as any).url
      : null;
  const faqs = (post.faqs as any[]) || [];
  const relatedPosts =
    ((post.relatedPosts as any[]) || []).filter((r) => r && typeof r === "object") || [];
  const headings = extractHeadings(post.content as SerializedEditorState | null | undefined);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: featuredImage ? [featuredImage] : [],
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: new Date(post.updatedAt).toISOString(),
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.role || undefined }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "TopSEO Services",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero */}
      <section
        className="pt-24 pb-0 relative"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1a1040 60%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container mx-auto px-4 pt-8 pb-16 relative z-10 max-w-5xl">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300 line-clamp-1">{post.title}</span>
          </nav>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((cat: any) => (
                <span
                  key={cat.id}
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(108,92,231,0.2)",
                    color: "#a78bfa",
                    border: "1px solid rgba(108,92,231,0.3)",
                  }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-display font-black text-white leading-tight max-w-4xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-slate-400 text-sm">
            {author && (
              <span className="flex items-center gap-2">
                {author.avatar && typeof author.avatar === "object" ? (
                  <img
                    src={(author.avatar as any).url}
                    alt={author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="text-white font-medium">{author.name}</span>
                {author.role && <span className="text-slate-500">· {author.role}</span>}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {featuredImage && (
        <div className="container mx-auto px-4 max-w-5xl">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            style={{ maxHeight: 500 }}
          >
            <img
              src={featuredImage}
              alt={post.title}
              className="w-full object-cover"
              style={{ maxHeight: 500 }}
            />
          </div>
        </div>
      )}

      {/* Two-column layout: ToC sidebar + main content */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className={headings.length > 0 ? "flex gap-12" : ""}>
          {/* Main Content */}
          <article className="min-w-0 flex-1">
            {post.content && (
              <RichText
                data={post.content as any}
                className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-purple-600 prose-strong:text-slate-900"
              />
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <section className="mt-16 pt-12 border-t border-slate-200">
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq: any, i: number) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 transition-colors list-none">
                        {faq.question}
                        <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                      </summary>
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Author bio */}
            {author && (
              <section className="mt-16 pt-12 border-t border-slate-200">
                <div className="flex gap-5 items-start p-6 bg-slate-50 rounded-2xl">
                  {author.avatar && typeof author.avatar === "object" ? (
                    <img
                      src={(author.avatar as any).url}
                      alt={author.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-4 ring-white shadow"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full flex-shrink-0 bg-purple-100 flex items-center justify-center">
                      <User className="w-8 h-8 text-purple-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Written by
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{author.name}</h3>
                    {author.role && (
                      <p className="text-sm text-purple-600 font-medium mb-2">{author.role}</p>
                    )}
                    {author.bio && <p className="text-slate-600 text-sm leading-relaxed">{author.bio}</p>}
                    {author.socialLinks && (
                      <div className="flex items-center gap-3 mt-3">
                        {author.socialLinks.twitter && (
                          <a
                            href={author.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {author.socialLinks.linkedin && (
                          <a
                            href={author.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {author.socialLinks.website && (
                          <a
                            href={author.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </article>

          {/* ToC Sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Table of Contents
                </p>
                <nav className="space-y-1">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block text-sm text-slate-600 hover:text-purple-600 transition-colors py-1 border-l-2 border-transparent hover:border-purple-400"
                      style={{ paddingLeft: `${(h.level - 2) * 12 + 12}px` }}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-slate-100 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel: any) => {
                const relImage =
                  rel.featuredImage && typeof rel.featuredImage === "object"
                    ? rel.featuredImage.url
                    : null;
                return (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
                    <article className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-md hover:border-purple-200 transition-all">
                      <div className="h-40 overflow-hidden bg-slate-100">
                        <img
                          src={
                            relImage ||
                            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                          }
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {rel.title}
                        </h3>
                        {rel.publishedAt && (
                          <p className="text-xs text-slate-400 mt-2">
                            {new Date(rel.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1a1040 60%)" }}>
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to grow your organic traffic?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Book a free strategy call with our SEO experts and get a personalised roadmap.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <button
                className="px-8 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-opacity shadow-lg"
                style={{ background: "linear-gradient(135deg, #F97316, #ea580c)" }}
              >
                Get Free Consultation
              </button>
            </Link>
            <Link href="/blog">
              <button className="px-8 py-3.5 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                ← Back to Blog
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
