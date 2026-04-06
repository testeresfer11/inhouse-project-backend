import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { ContactPageClient } from "./client";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata("contact", {
    title: "Contact Us | Top SEO Services",
    description: "Get in touch with Top SEO Services. Request a free audit or discuss your SEO goals.",
  });
}

export default async function ContactPage() {
  return (
    <>
      <SeoJsonLd pageKey="contact" />
      <ContactPageClient />
    </>
  );
}
