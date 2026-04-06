import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { LinkedInMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("linkedin-marketing", {
    title: "LinkedIn Marketing Services | Top SEO Services",
    description: "Establish thought leadership and generate B2B leads through LinkedIn.",
  });
}

export default async function LinkedInMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="linkedin-marketing" />
      <LinkedInMarketingPageClient />
    </>
  );
}
