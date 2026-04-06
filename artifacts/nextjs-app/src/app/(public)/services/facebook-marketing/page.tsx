import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { FacebookMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("facebook-marketing", {
    title: "Facebook Marketing Services | Top SEO Services",
    description: "Grow your Facebook presence and reach millions of potential customers.",
  });
}

export default async function FacebookMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="facebook-marketing" />
      <FacebookMarketingPageClient />
    </>
  );
}
