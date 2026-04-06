import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { IndustriesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("industries", {
    title: "Industries We Serve | Top SEO Services",
    description: "We provide tailored SEO and digital marketing services across healthcare, real estate, e-commerce, and more.",
  });
}

export default async function IndustriesPage() {
  return (
    <>
      <SeoJsonLd pageKey="industries" />
      <IndustriesPageClient />
    </>
  );
}
