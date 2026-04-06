import type { MetadataRoute } from "next";
import { getPayload } from "@/lib/payload";

export const revalidate = 3600;

const SERVICE_SLUGS = [
  "seo",
  "local-seo",
  "technical-seo",
  "on-page-seo",
  "off-page-seo",
  "aeo",
  "geo",
  "seo-audit",
  "ai-powered-seo",
  "domain-authority",
  "pay-per-click-marketing",
  "google-ads-services",
  "facebook-ads-services",
  "instagram-ads-services",
  "linkedin-ads-services",
  "youtube-ads-services",
  "amazon-ads-services",
  "social-media-marketing",
  "facebook-marketing",
  "instagram-marketing",
  "linkedin-marketing",
  "twitter-marketing",
  "youtube-marketing",
  "tiktok-marketing",
  "pinterest-marketing",
  "quora-marketing",
  "content-writing-services",
  "email-marketing-services",
  "digital-marketing-services",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,                         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${siteUrl}/about`,              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`,           lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${siteUrl}/industries`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/blog`,               lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${siteUrl}/contact`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/sitemap.html`,       lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  try {
    const payload = await getPayload();

    const [postsResult, cmsServiceResult] = await Promise.all([
      payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: "service-pages",
        where: { status: { equals: "published" } },
        limit: 100,
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const postRoutes: MetadataRoute.Sitemap = postsResult.docs.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt as string),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const cmsServiceRoutes: MetadataRoute.Sitemap = cmsServiceResult.docs
      .filter((page: any) => !SERVICE_SLUGS.includes(page.slug))
      .map((page: any) => ({
        url: `${siteUrl}/services/${page.slug}`,
        lastModified: new Date(page.updatedAt as string),
        changeFrequency: "monthly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...serviceRoutes, ...cmsServiceRoutes, ...postRoutes];
  } catch {
    return [...staticRoutes, ...serviceRoutes];
  }
}
