import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { TwitterMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("twitter-marketing", {
    title: "Twitter (X) Marketing Services | Top SEO Services",
    description: "Amplify your brand voice and engage your audience on Twitter/X.",
  });
}

export default async function TwitterMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="twitter-marketing" />
      <TwitterMarketingPageClient />
    </>
  );
}
