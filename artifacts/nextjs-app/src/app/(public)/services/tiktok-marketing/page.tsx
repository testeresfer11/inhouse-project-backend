import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { TikTokMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("tiktok-marketing", {
    title: "TikTok Marketing Services | Top SEO Services",
    description: "Reach Gen Z and millennials with viral TikTok content campaigns.",
  });
}

export default async function TikTokMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="tiktok-marketing" />
      <TikTokMarketingPageClient />
    </>
  );
}
