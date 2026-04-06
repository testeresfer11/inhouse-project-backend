import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { MotionProvider } from "@/components/MotionProvider";
import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Top SEO Services",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://twitter.com/topseoservices",
    "https://www.linkedin.com/company/topseoservices",
    "https://www.facebook.com/topseoservices",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@topseoservices.co",
  },
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <MotionProvider>
          <PageLoader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
