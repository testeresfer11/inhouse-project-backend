import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { OffPageSeoPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("off-page-seo", {
    title: "Off-Page SEO Services | Top SEO Services",
    description: "Build authority through high-quality backlinks, brand mentions, and digital PR.",
  });
}

export default async function OffPageSeoPage() {
  return (
    <>
      <SeoJsonLd pageKey="off-page-seo" />
      <OffPageSeoPageClient />
    </>
  );
}
