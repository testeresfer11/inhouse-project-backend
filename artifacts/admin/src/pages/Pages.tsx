import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Save, Globe, CheckCircle2, ChevronDown, ChevronRight, ExternalLink, AlertCircle } from "lucide-react";

interface SeoSetting {
  id?: number;
  page: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  structuredData: string;
  robotsIndex?: string;
  robotsFollow?: string;
  twitterCard?: string;
  twitterSite?: string;
}

const EMPTY = (page: string): SeoSetting => ({
  page, title: "", description: "", keywords: "",
  ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "",
  structuredData: "", robotsIndex: "index", robotsFollow: "follow",
  twitterCard: "summary_large_image", twitterSite: "",
});

interface PageDef { key: string; label: string; path: string; }
interface PageGroup { group: string; pages: PageDef[]; }

const PAGE_GROUPS: PageGroup[] = [
  {
    group: "Core Pages",
    pages: [
      { key: "home",    label: "Home",    path: "/" },
      { key: "blog",    label: "Blog",    path: "/blog" },
      { key: "about",   label: "About",   path: "/about" },
      { key: "contact", label: "Contact", path: "/contact" },
    ],
  },
  {
    group: "SEO Services",
    pages: [
      { key: "seo",              label: "SEO Services",      path: "/services/seo" },
      { key: "local-seo",        label: "Local SEO",         path: "/services/local-seo" },
      { key: "technical-seo",    label: "Technical SEO",     path: "/services/technical-seo" },
      { key: "on-page-seo",      label: "On-Page SEO",       path: "/services/on-page-seo" },
      { key: "off-page-seo",     label: "Off-Page SEO",      path: "/services/off-page-seo" },
      { key: "aeo",              label: "AEO",               path: "/services/aeo" },
      { key: "geo",              label: "GEO",               path: "/services/geo" },
      { key: "seo-audit",        label: "SEO Audit",         path: "/services/seo-audit" },
      { key: "ai-powered-seo",   label: "AI-Powered SEO",    path: "/services/ai-powered-seo" },
      { key: "domain-authority", label: "Domain Authority",  path: "/services/domain-authority" },
    ],
  },
  {
    group: "Paid Advertising",
    pages: [
      { key: "pay-per-click-marketing", label: "PPC Marketing",    path: "/services/pay-per-click-marketing" },
      { key: "google-ads-services",     label: "Google Ads",       path: "/services/google-ads-services" },
      { key: "facebook-ads-services",   label: "Facebook Ads",     path: "/services/facebook-ads-services" },
      { key: "instagram-ads-services",  label: "Instagram Ads",    path: "/services/instagram-ads-services" },
      { key: "linkedin-ads-services",   label: "LinkedIn Ads",     path: "/services/linkedin-ads-services" },
      { key: "youtube-ads-services",    label: "YouTube Ads",      path: "/services/youtube-ads-services" },
      { key: "amazon-ads-services",     label: "Amazon Ads",       path: "/services/amazon-ads-services" },
    ],
  },
  {
    group: "Social Media",
    pages: [
      { key: "social-media-marketing", label: "Social Media",       path: "/services/social-media-marketing" },
      { key: "facebook-marketing",     label: "Facebook",           path: "/services/facebook-marketing" },
      { key: "instagram-marketing",    label: "Instagram",          path: "/services/instagram-marketing" },
      { key: "linkedin-marketing",     label: "LinkedIn",           path: "/services/linkedin-marketing" },
      { key: "twitter-marketing",      label: "Twitter / X",        path: "/services/twitter-marketing" },
      { key: "youtube-marketing",      label: "YouTube",            path: "/services/youtube-marketing" },
      { key: "tiktok-marketing",       label: "TikTok",             path: "/services/tiktok-marketing" },
      { key: "pinterest-marketing",    label: "Pinterest",          path: "/services/pinterest-marketing" },
      { key: "quora-marketing",        label: "Quora",              path: "/services/quora-marketing" },
    ],
  },
  {
    group: "Content & Email",
    pages: [
      { key: "content-writing-services",   label: "Content Writing",   path: "/services/content-writing-services" },
      { key: "email-marketing-services",   label: "Email Marketing",   path: "/services/email-marketing-services" },
      { key: "digital-marketing-services", label: "Digital Marketing", path: "/services/digital-marketing-services" },
    ],
  },
];

const ALL_PAGES = PAGE_GROUPS.flatMap(g => g.pages);

function CharCount({ value, ideal, max }: { value: string; ideal: number; max: number }) {
  const len = value.length;
  const color = len === 0 ? "text-slate-400" : len > max ? "text-red-500" : len >= ideal ? "text-emerald-500" : "text-amber-500";
  return (
    <span className={`text-xs font-medium tabular-nums ${color}`}>
      {len}/{max}
    </span>
  );
}

export default function PagesPage() {
  const [activePage, setActivePage] = useState(ALL_PAGES[0].key);
  const [settings, setSettings] = useState<Record<string, SeoSetting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ "Core Pages": true, "SEO Services": true });
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    api.getSeoSettings()
      .then((data: SeoSetting[]) => {
        const map: Record<string, SeoSetting> = {};
        for (const item of data) map[item.page] = item;
        setSettings(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const current = settings[activePage] || EMPTY(activePage);

  const set = useCallback((field: keyof SeoSetting, value: string) => {
    setSettings(s => ({
      ...s,
      [activePage]: { ...(s[activePage] || EMPTY(activePage)), [field]: value },
    }));
    if (field === "structuredData") {
      if (!value.trim()) { setJsonError(""); return; }
      try { JSON.parse(value); setJsonError(""); }
      catch { setJsonError("Invalid JSON — check your syntax"); }
    }
  }, [activePage]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jsonError) return;
    setSaving(true); setError(""); setSaved(false);
    try {
      const result = await api.updateSeoSettings(activePage, current);
      setSettings(s => ({ ...s, [activePage]: result }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleGroup = (group: string) =>
    setOpenGroups(g => ({ ...g, [group]: !g[group] }));

  const isConfigured = (key: string) => !!(settings[key]?.title);
  const configuredCount = ALL_PAGES.filter(p => isConfigured(p.key)).length;

  const inputCls = "w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  const activeDef = ALL_PAGES.find(p => p.key === activePage)!;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pages & SEO</h1>
            <p className="text-slate-500 text-sm mt-1">
              {configuredCount} of {ALL_PAGES.length} pages configured
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {configuredCount}/{ALL_PAGES.length} configured
          </div>
        </div>

        <div className="flex gap-5">
          {/* ── Left: page list ── */}
          <div className="w-56 flex-shrink-0 space-y-1">
            {PAGE_GROUPS.map(({ group, pages }) => {
              const isOpen = openGroups[group] ?? false;
              const groupConfigured = pages.filter(p => isConfigured(p.key)).length;
              return (
                <div key={group}>
                  <button
                    onClick={() => toggleGroup(group)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 transition-colors"
                  >
                    {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    <span className="flex-1 text-left">{group}</span>
                    <span className="text-slate-400 font-normal normal-case tracking-normal">
                      {groupConfigured}/{pages.length}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="ml-2 space-y-0.5">
                      {pages.map(({ key, label }) => {
                        const configured = isConfigured(key);
                        const active = activePage === key;
                        return (
                          <button
                            key={key}
                            onClick={() => setActivePage(key)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                              active ? "text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                            style={active ? { background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" } : {}}
                          >
                            <Globe className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                            <span className="flex-1 truncate">{label}</span>
                            {configured && (
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? "bg-white/70" : "bg-emerald-400"}`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Right: SEO editor ── */}
          <div className="flex-1 min-w-0">
            {/* Page header bar */}
            <div className="flex items-center justify-between mb-4 bg-white border border-slate-200 rounded-xl px-4 py-3">
              <div>
                <p className="font-semibold text-slate-900 text-sm">{activeDef.label}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeDef.path}</p>
              </div>
              <a
                href={activeDef.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View page
              </a>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse h-14 bg-slate-100 rounded-xl" />
                ))}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </div>
                )}

                {/* ── Basic Meta ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Basic Meta Tags</h3>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-semibold text-slate-700">Meta Title</label>
                      <CharCount value={current.title} ideal={50} max={60} />
                    </div>
                    <p className="text-xs text-slate-400 mb-1.5">Shown as the clickable headline in Google results (50–60 chars ideal)</p>
                    <input
                      className={inputCls}
                      value={current.title}
                      onChange={e => set("title", e.target.value)}
                      placeholder="Page Title | Top SEO Services"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-semibold text-slate-700">Meta Description</label>
                      <CharCount value={current.description} ideal={150} max={160} />
                    </div>
                    <p className="text-xs text-slate-400 mb-1.5">Shown under the title in search results (150–160 chars ideal)</p>
                    <textarea
                      className={inputCls}
                      value={current.description}
                      onChange={e => set("description", e.target.value)}
                      rows={3}
                      placeholder="Concise, compelling summary of this page…"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Keywords</label>
                    <p className="text-xs text-slate-400 mb-1.5">Comma-separated (informational only, not a ranking factor)</p>
                    <input
                      className={inputCls}
                      value={current.keywords}
                      onChange={e => set("keywords", e.target.value)}
                      placeholder="SEO agency, local SEO, technical SEO…"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Canonical URL</label>
                    <p className="text-xs text-slate-400 mb-1.5">Override the self-referencing canonical URL (leave blank to use page URL)</p>
                    <input
                      className={inputCls}
                      value={current.canonicalUrl}
                      onChange={e => set("canonicalUrl", e.target.value)}
                      placeholder={`https://yourdomain.com${activeDef.path}`}
                    />
                  </div>
                </div>

                {/* ── Open Graph / Social ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Open Graph / Social Sharing</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-semibold text-slate-700">OG Title</label>
                        <CharCount value={current.ogTitle} ideal={55} max={95} />
                      </div>
                      <input
                        className={inputCls}
                        value={current.ogTitle}
                        onChange={e => set("ogTitle", e.target.value)}
                        placeholder="Leave blank to use Meta Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">OG Image URL</label>
                      <p className="text-xs text-slate-400 mb-1.5">Recommended: 1200×630 px</p>
                      <input
                        className={inputCls}
                        value={current.ogImage}
                        onChange={e => set("ogImage", e.target.value)}
                        placeholder="https://…/og-image.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-semibold text-slate-700">OG Description</label>
                      <CharCount value={current.ogDescription} ideal={200} max={300} />
                    </div>
                    <textarea
                      className={inputCls}
                      value={current.ogDescription}
                      onChange={e => set("ogDescription", e.target.value)}
                      rows={2}
                      placeholder="Leave blank to use Meta Description"
                    />
                  </div>
                </div>

                {/* ── Twitter / X Card ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Twitter / X Card</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Card Type</label>
                      <select
                        className={selectCls}
                        value={current.twitterCard || "summary_large_image"}
                        onChange={e => set("twitterCard", e.target.value)}
                      >
                        <option value="summary_large_image">Summary Large Image</option>
                        <option value="summary">Summary</option>
                        <option value="app">App</option>
                        <option value="player">Player</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Twitter Site Handle</label>
                      <input
                        className={inputCls}
                        value={current.twitterSite || ""}
                        onChange={e => set("twitterSite", e.target.value)}
                        placeholder="@youraccount"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Robots ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Robots Directive</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Index</label>
                      <select
                        className={selectCls}
                        value={current.robotsIndex || "index"}
                        onChange={e => set("robotsIndex", e.target.value)}
                      >
                        <option value="index">index (default — allow indexing)</option>
                        <option value="noindex">noindex — hide from search engines</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Follow</label>
                      <select
                        className={selectCls}
                        value={current.robotsFollow || "follow"}
                        onChange={e => set("robotsFollow", e.target.value)}
                      >
                        <option value="follow">follow (default — follow links)</option>
                        <option value="nofollow">nofollow — don't pass link equity</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── Structured Data ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Structured Data (JSON-LD)</h3>
                    {jsonError && (
                      <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {jsonError}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">Paste valid Schema.org JSON-LD — leave blank to use the page's default schema</p>
                  <textarea
                    className={`${inputCls} border-slate-200 ${jsonError ? "border-red-400 focus:ring-red-400" : ""}`}
                    value={current.structuredData}
                    onChange={e => set("structuredData", e.target.value)}
                    rows={7}
                    placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Page Name"\n}'}
                    style={{ fontFamily: "ui-monospace, monospace", fontSize: 12 }}
                  />
                </div>

                {/* ── Save bar ── */}
                <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3 sticky bottom-4">
                  {saved ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Saved successfully
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">Changes are saved per page</span>
                  )}
                  <button
                    type="submit"
                    disabled={saving || !!jsonError}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving…" : "Save Page SEO"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
