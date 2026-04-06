import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { YouTubeAdsServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("youtube-ads-services", {
    title: "YouTube Ads Services | Top SEO Services",
    description: "Grow brand awareness with strategic YouTube video ad campaigns.",
  });
}

export default async function YouTubeAdsServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="youtube-ads-services" />
      <YouTubeAdsServicesPageClient />
    </>
  );
}
