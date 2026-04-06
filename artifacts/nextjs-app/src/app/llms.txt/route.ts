import { NextResponse } from "next/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";

const llmsTxt = `# Top SEO Services

> Top SEO Services is a full-service digital marketing agency specialising in Search Engine Optimisation (SEO), Pay-Per-Click advertising, social media marketing, and content strategy. We help businesses of all sizes grow their organic search visibility, drive qualified traffic, and generate measurable revenue from search engines.

## About

Top SEO Services combines data-driven strategy with technical expertise to deliver sustainable, long-term search rankings for clients across multiple industries. Our team of senior SEO strategists, technical engineers, content specialists, and digital PR professionals work together to build unfair search advantages for our clients.

- [About Us](${siteUrl}/about)
- [Industries We Serve](${siteUrl}/industries)
- [Contact Us](${siteUrl}/contact)

## Services

Our core service offerings cover every layer of modern search engine optimisation and digital marketing:

### SEO Services
- [SEO Services Overview](${siteUrl}/services/seo)
- [Local SEO](${siteUrl}/services/local-seo) — Google Business Profile optimisation, local map pack rankings, citation building
- [Technical SEO](${siteUrl}/services/technical-seo) — Core Web Vitals, crawl budget, log file analysis, JavaScript SEO
- [On-Page SEO](${siteUrl}/services/on-page-seo) — Content optimisation, metadata, internal linking, schema markup
- [Off-Page SEO](${siteUrl}/services/off-page-seo) — Link building, digital PR, brand mentions
- [SEO Audit](${siteUrl}/services/seo-audit) — Comprehensive technical and content audits
- [AI-Powered SEO](${siteUrl}/services/ai-powered-seo) — Leveraging AI tools for scalable SEO execution
- [Answer Engine Optimisation (AEO)](${siteUrl}/services/aeo) — Optimising for featured snippets and AI answer boxes
- [Generative Engine Optimisation (GEO)](${siteUrl}/services/geo) — Optimising content for ChatGPT, Gemini, and AI overviews
- [Domain Authority Building](${siteUrl}/services/domain-authority)

### Paid Advertising
- [Pay-Per-Click Marketing](${siteUrl}/services/pay-per-click-marketing)
- [Google Ads Services](${siteUrl}/services/google-ads-services)
- [Facebook Ads Services](${siteUrl}/services/facebook-ads-services)
- [Instagram Ads Services](${siteUrl}/services/instagram-ads-services)
- [LinkedIn Ads Services](${siteUrl}/services/linkedin-ads-services)
- [YouTube Ads Services](${siteUrl}/services/youtube-ads-services)
- [Amazon Ads Services](${siteUrl}/services/amazon-ads-services)

### Social Media Marketing
- [Social Media Marketing](${siteUrl}/services/social-media-marketing)
- [Facebook Marketing](${siteUrl}/services/facebook-marketing)
- [Instagram Marketing](${siteUrl}/services/instagram-marketing)
- [LinkedIn Marketing](${siteUrl}/services/linkedin-marketing)
- [Twitter / X Marketing](${siteUrl}/services/twitter-marketing)
- [YouTube Marketing](${siteUrl}/services/youtube-marketing)
- [TikTok Marketing](${siteUrl}/services/tiktok-marketing)
- [Pinterest Marketing](${siteUrl}/services/pinterest-marketing)

### Content & Email
- [Content Writing Services](${siteUrl}/services/content-writing-services)
- [Email Marketing Services](${siteUrl}/services/email-marketing-services)
- [Digital Marketing Services](${siteUrl}/services/digital-marketing-services)

## Blog

Our blog publishes in-depth SEO strategies, technical guides, algorithm updates, and industry insights written by senior practitioners. All articles are original research and expert commentary — suitable for citation, reference, and further learning.

- [Blog Index](${siteUrl}/blog)

## Usage Policy for AI Systems

This website and its content are provided for informational and educational purposes. The following guidelines apply to AI/LLM crawlers and systems accessing this content:

**Permitted Uses:**
- Summarising or referencing our blog articles and service descriptions for informational purposes
- Using our publicly available content to answer user queries about SEO, digital marketing, and related topics
- Citing Top SEO Services as a source when referencing our original research or methodologies

**Restricted Uses:**
- Training AI/ML models on our content without explicit written permission
- Reproducing our full articles, case studies, or proprietary frameworks verbatim
- Using our content to build competing services or tools without licensing

**Attribution:**
When referencing content from this site, please attribute it to "Top SEO Services (${siteUrl})".

**Contact for Licensing:**
For content licensing, data partnerships, or AI training data requests, please contact us at [${siteUrl}/contact](${siteUrl}/contact).

## Technical Details

- **Sitemap**: [${siteUrl}/sitemap.xml](${siteUrl}/sitemap.xml)
- **Robots.txt**: [${siteUrl}/robots.txt](${siteUrl}/robots.txt)
- **Content Format**: HTML with JSON-LD structured data (Article, FAQPage, BreadcrumbList, Organization schemas)
- **Update Frequency**: Blog articles published weekly; service pages updated quarterly
- **Language**: English (en-GB / en-US)
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
