import { NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export const revalidate = 3600;

interface PageGroup {
  title: string;
  color: string;
  pages: { label: string; url: string }[];
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://topseoservices.co";

  const groups: PageGroup[] = [
    {
      title: "Main Pages",
      color: "#6C5CE7",
      pages: [
        { label: "Home", url: `${siteUrl}/` },
        { label: "About Us", url: `${siteUrl}/about` },
        { label: "Services", url: `${siteUrl}/services` },
        { label: "Industries", url: `${siteUrl}/industries` },
        { label: "Blog", url: `${siteUrl}/blog` },
        { label: "Contact", url: `${siteUrl}/contact` },
      ],
    },
    {
      title: "SEO Services",
      color: "#2563EB",
      pages: [
        { label: "SEO Services", url: `${siteUrl}/services/seo` },
        { label: "Local SEO", url: `${siteUrl}/services/local-seo` },
        { label: "Technical SEO", url: `${siteUrl}/services/technical-seo` },
        { label: "On-Page SEO", url: `${siteUrl}/services/on-page-seo` },
        { label: "Off-Page SEO", url: `${siteUrl}/services/off-page-seo` },
        { label: "SEO Audit", url: `${siteUrl}/services/seo-audit` },
        { label: "AI-Powered SEO", url: `${siteUrl}/services/ai-powered-seo` },
        { label: "Answer Engine Optimisation (AEO)", url: `${siteUrl}/services/aeo` },
        { label: "Generative Engine Optimisation (GEO)", url: `${siteUrl}/services/geo` },
        { label: "Domain Authority Building", url: `${siteUrl}/services/domain-authority` },
      ],
    },
    {
      title: "Paid Advertising",
      color: "#F59E0B",
      pages: [
        { label: "Pay-Per-Click Marketing", url: `${siteUrl}/services/pay-per-click-marketing` },
        { label: "Google Ads Services", url: `${siteUrl}/services/google-ads-services` },
        { label: "Facebook Ads Services", url: `${siteUrl}/services/facebook-ads-services` },
        { label: "Instagram Ads Services", url: `${siteUrl}/services/instagram-ads-services` },
        { label: "LinkedIn Ads Services", url: `${siteUrl}/services/linkedin-ads-services` },
        { label: "YouTube Ads Services", url: `${siteUrl}/services/youtube-ads-services` },
        { label: "Amazon Ads Services", url: `${siteUrl}/services/amazon-ads-services` },
      ],
    },
    {
      title: "Social Media Marketing",
      color: "#10B981",
      pages: [
        { label: "Social Media Marketing", url: `${siteUrl}/services/social-media-marketing` },
        { label: "Facebook Marketing", url: `${siteUrl}/services/facebook-marketing` },
        { label: "Instagram Marketing", url: `${siteUrl}/services/instagram-marketing` },
        { label: "LinkedIn Marketing", url: `${siteUrl}/services/linkedin-marketing` },
        { label: "Twitter / X Marketing", url: `${siteUrl}/services/twitter-marketing` },
        { label: "YouTube Marketing", url: `${siteUrl}/services/youtube-marketing` },
        { label: "TikTok Marketing", url: `${siteUrl}/services/tiktok-marketing` },
        { label: "Pinterest Marketing", url: `${siteUrl}/services/pinterest-marketing` },
        { label: "Quora Marketing", url: `${siteUrl}/services/quora-marketing` },
      ],
    },
    {
      title: "Content & Email",
      color: "#E53E3E",
      pages: [
        { label: "Content Writing Services", url: `${siteUrl}/services/content-writing-services` },
        { label: "Email Marketing Services", url: `${siteUrl}/services/email-marketing-services` },
        { label: "Digital Marketing Services", url: `${siteUrl}/services/digital-marketing-services` },
      ],
    },
  ];

  let blogPosts: { label: string; url: string }[] = [];
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 100,
      select: { title: true, slug: true },
    });
    blogPosts = result.docs.map((post) => ({
      label: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
    }));
  } catch {
    // No posts yet
  }

  if (blogPosts.length > 0) {
    groups.push({ title: "Blog Articles", color: "#6C5CE7", pages: blogPosts });
  }

  const renderGroup = (group: PageGroup) => `
    <div class="group-card">
      <div class="group-header" style="border-left: 4px solid ${group.color}">
        <div class="group-dot" style="background:${group.color}"></div>
        <h2>${group.title}</h2>
        <span class="count">${group.pages.length} pages</span>
      </div>
      <ul class="page-list">
        ${group.pages
          .map(
            (p) => `
          <li>
            <a href="${p.url}" style="--hover:${group.color}">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              ${p.label}
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sitemap — Top SEO Services</title>
  <meta name="description" content="Complete sitemap of Top SEO Services — browse all pages, services, and blog articles." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${siteUrl}/sitemap.html" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: #F8FAFC;
      color: #1E293B;
      line-height: 1.6;
      min-height: 100vh;
    }
    header {
      background: linear-gradient(135deg, #0F172A 0%, #1a1040 100%);
      color: white;
      padding: 60px 24px 48px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    header::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 0);
      background-size: 28px 28px;
    }
    header .inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
    header .badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 999px;
      background: rgba(108,92,231,0.25);
      border: 1px solid rgba(108,92,231,0.5);
      color: #a78bfa;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    header h1 { font-size: clamp(28px, 5vw, 44px); font-weight: 800; margin-bottom: 12px; }
    header p { color: rgba(255,255,255,0.6); font-size: 16px; }
    .meta-bar {
      background: white;
      border-bottom: 1px solid #E2E8F0;
      padding: 14px 24px;
    }
    .meta-bar-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .meta-bar a { color: #6C5CE7; font-size: 13px; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 6px; }
    .meta-bar a:hover { text-decoration: underline; }
    .meta-bar .updated { font-size: 13px; color: #94A3B8; }
    main {
      max-width: 1100px;
      margin: 48px auto;
      padding: 0 24px 64px;
    }
    .summary {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .stat {
      background: white;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 16px 24px;
      flex: 1;
      min-width: 140px;
      text-align: center;
    }
    .stat .num { font-size: 28px; font-weight: 800; color: #6C5CE7; }
    .stat .lbl { font-size: 12px; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .group-card {
      background: white;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
    }
    .group-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 18px 20px;
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
    }
    .group-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .group-header h2 { font-size: 15px; font-weight: 700; flex: 1; }
    .count {
      background: #EEF2FF;
      color: #6C5CE7;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 99px;
    }
    .page-list { list-style: none; padding: 12px 0; }
    .page-list li { }
    .page-list a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      font-size: 14px;
      color: #475569;
      text-decoration: none;
      transition: all 0.15s;
    }
    .page-list a svg { color: #CBD5E1; flex-shrink: 0; transition: color 0.15s; }
    .page-list a:hover { color: var(--hover, #6C5CE7); background: #F8FAFC; }
    .page-list a:hover svg { color: var(--hover, #6C5CE7); }
    footer {
      text-align: center;
      padding: 40px 24px;
      border-top: 1px solid #E2E8F0;
      color: #94A3B8;
      font-size: 13px;
      background: white;
    }
    footer a { color: #6C5CE7; text-decoration: none; font-weight: 600; }
    footer a:hover { text-decoration: underline; }
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <div class="inner">
      <div class="badge">Sitemap</div>
      <h1>Site Directory</h1>
      <p>A complete index of every page on Top SEO Services — organised by section for easy browsing.</p>
    </div>
  </header>

  <div class="meta-bar">
    <div class="meta-bar-inner">
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        <a href="${siteUrl}/">← Back to Home</a>
        <a href="${siteUrl}/sitemap.xml">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          XML Sitemap
        </a>
      </div>
      <span class="updated">Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
    </div>
  </div>

  <main>
    <div class="summary">
      <div class="stat">
        <div class="num">${groups.reduce((acc, g) => acc + g.pages.length, 0)}</div>
        <div class="lbl">Total Pages</div>
      </div>
      <div class="stat">
        <div class="num">${groups.length}</div>
        <div class="lbl">Sections</div>
      </div>
      <div class="stat">
        <div class="num">${blogPosts.length}</div>
        <div class="lbl">Blog Articles</div>
      </div>
      <div class="stat">
        <div class="num">29</div>
        <div class="lbl">Service Pages</div>
      </div>
    </div>

    <div class="grid">
      ${groups.map(renderGroup).join("")}
    </div>
  </main>

  <footer>
    <p>© ${new Date().getFullYear()} Top SEO Services. All rights reserved. &nbsp;·&nbsp;
      <a href="${siteUrl}/sitemap.xml">XML Sitemap</a> &nbsp;·&nbsp;
      <a href="${siteUrl}/robots.txt">robots.txt</a> &nbsp;·&nbsp;
      <a href="${siteUrl}/llms.txt">llms.txt</a>
    </p>
  </footer>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
