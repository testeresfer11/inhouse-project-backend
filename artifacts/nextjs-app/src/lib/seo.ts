import type { Metadata } from "next";
import { cache } from "react";
import { db } from "@workspace/db";
import { seoSettingsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export const getPageSeo = cache(async (pageKey: string) => {
  try {
    const [row] = await db
      .select()
      .from(seoSettingsTable)
      .where(eq(seoSettingsTable.page, pageKey));
    return row ?? null;
  } catch {
    return null;
  }
});

export async function buildSeoMetadata(
  pageKey: string,
  fallback: Metadata = {}
): Promise<Metadata> {
  const seo = await getPageSeo(pageKey);

  if (!seo || !seo.title) return fallback;

  const meta: Metadata = { ...fallback };

  if (seo.title) meta.title = seo.title;
  if (seo.description) meta.description = seo.description;
  if (seo.keywords) meta.keywords = seo.keywords;
  if (seo.canonicalUrl) meta.alternates = { canonical: seo.canonicalUrl };

  meta.robots = {
    index: seo.robotsIndex !== "noindex",
    follow: seo.robotsFollow !== "nofollow",
  };

  const ogFields: Record<string, string | string[]> = {};
  if (seo.ogTitle || seo.title) ogFields.title = seo.ogTitle || seo.title;
  if (seo.ogDescription || seo.description) ogFields.description = seo.ogDescription || seo.description;
  if (seo.ogImage) ogFields.images = [seo.ogImage];
  if (Object.keys(ogFields).length > 0) {
    meta.openGraph = { ...(fallback.openGraph as object ?? {}), ...ogFields } as Metadata["openGraph"];
  }

  meta.twitter = {
    card: (seo.twitterCard as "summary" | "summary_large_image" | "app" | "player") || "summary_large_image",
    ...(seo.twitterSite ? { site: seo.twitterSite } : {}),
    ...(seo.ogTitle || seo.title ? { title: seo.ogTitle || seo.title } : {}),
    ...(seo.ogDescription || seo.description ? { description: seo.ogDescription || seo.description } : {}),
  };

  return meta;
}
