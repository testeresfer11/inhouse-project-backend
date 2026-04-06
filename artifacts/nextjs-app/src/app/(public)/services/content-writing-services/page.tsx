import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { ContentWritingServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("content-writing-services", {
    title: "Content Writing Services | Top SEO Services",
    description: "Engage your audience with expertly crafted SEO-optimized content.",
  });
}

export default async function ContentWritingServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="content-writing-services" />
      <ContentWritingServicesPageClient />
    </>
  );
}
