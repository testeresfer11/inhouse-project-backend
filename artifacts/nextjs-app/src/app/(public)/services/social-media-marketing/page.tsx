import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { SocialMediaMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("social-media-marketing", {
    title: "Social Media Marketing Services | Top SEO Services",
    description: "Build brand awareness across Instagram, Facebook, LinkedIn, and more.",
  });
}

export default async function SocialMediaMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="social-media-marketing" />
      <SocialMediaMarketingPageClient />
    </>
  );
}
