import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { EmailMarketingServicesPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("email-marketing-services", {
    title: "Email Marketing Services | Top SEO Services",
    description: "Drive conversions with personalized email marketing campaigns.",
  });
}

export default async function EmailMarketingServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="email-marketing-services" />
      <EmailMarketingServicesPageClient />
    </>
  );
}
