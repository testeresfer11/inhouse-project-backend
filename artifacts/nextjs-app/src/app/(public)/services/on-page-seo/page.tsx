import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { OnPageSeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("on-page-seo", {
    title: "On-Page SEO Services | Top SEO Services",
    description: "Optimize your content, metadata, and internal structure for maximum organic visibility.",
  });
}

export default async function OnPageSeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="on-page-seo" />
      <OnPageSeoPageClient />
    </>
  );
}
