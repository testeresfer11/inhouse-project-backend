import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { YouTubeMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("youtube-marketing", {
    title: "YouTube Marketing Services | Top SEO Services",
    description: "Grow your channel with compelling YouTube content and marketing strategies.",
  });
}

export default async function YouTubeMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="youtube-marketing" />
      <YouTubeMarketingPageClient />
    </>
  );
}
