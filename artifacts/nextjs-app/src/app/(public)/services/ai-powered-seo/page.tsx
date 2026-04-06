import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { AiPoweredSeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("ai-powered-seo", {
    title: "AI-Powered SEO Services | Top SEO Services",
    description: "Leverage artificial intelligence to supercharge your SEO strategy.",
  });
}

export default async function AiPoweredSeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="ai-powered-seo" />
      <AiPoweredSeoPageClient />
    </>
  );
}
