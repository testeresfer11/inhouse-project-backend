import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { DomainAuthorityPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("domain-authority", {
    title: "Domain Authority Services | Top SEO Services",
    description: "Increase your domain authority with strategic link building campaigns.",
  });
}

export default async function DomainAuthorityPage() {
  return (
    <>
      <SeoJsonLd pageKey="domain-authority" />
      <DomainAuthorityPageClient />
    </>
  );
}
