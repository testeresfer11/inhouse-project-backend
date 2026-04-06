import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { QuoraMarketingPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("quora-marketing", {
    title: "Quora Marketing Services | Top SEO Services",
    description: "Build expertise and drive targeted traffic through Quora marketing.",
  });
}

export default async function QuoraMarketingPage() {
  return (
    <>
      <SeoJsonLd pageKey="quora-marketing" />
      <QuoraMarketingPageClient />
    </>
  );
}
