import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Save, Globe } from "lucide-react";

interface SeoSetting {
  id?: number; page: string; title: string; description: string; keywords: string;
  ogTitle: string; ogDescription: string; ogImage: string; canonicalUrl: string; structuredData: string;
}

const PAGES = [
  { key: "home", label: "Home (/)" },
  { key: "services", label: "Services (/services)" },
  { key: "about", label: "About (/about)" },
  { key: "blog", label: "Blog (/blog)" },
  { key: "contact", label: "Contact (/contact)" },
];

const EMPTY = (page: string): SeoSetting => ({
  page, title: "", description: "", keywords: "", ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", structuredData: ""
});

export default function SeoSettingsPage() {
  const [activePage, setActivePage] = useState("home");
  const [settings, setSettings] = useState<Record<string, SeoSetting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

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
  const set = (field: keyof SeoSetting, value: string) =>
    setSettings(s => ({ ...s, [activePage]: { ...current, [field]: value } }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const inputCls = "w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";
  const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">SEO Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure meta tags, OG cards and structured data per page</p>
        </div>

        <div className="flex gap-6">
          {/* Page selector */}
          <div className="w-44 flex-shrink-0 space-y-1">
            {PAGES.map(({ key, label }) => {
              const configured = !!settings[key]?.title;
              return (
                <button
                  key={key}
                  onClick={() => setActivePage(key)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    activePage === key ? "text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                  style={activePage === key ? { background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" } : {}}
                >
                  <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{label.split(" ")[0]}</span>
                  {configured && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div className="flex-1">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 h-96 animate-pulse" />
            ) : (
              <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-7 space-y-5">
                <h2 className="font-semibold text-slate-900 text-base border-b border-slate-100 pb-4">
                  {PAGES.find(p => p.key === activePage)?.label}
                </h2>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}
                {saved && <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm rounded-xl px-4 py-3">Settings saved successfully!</div>}

                <Field label="Page Title" hint="Shown in the browser tab and Google results (50–60 chars)">
                  <input className={inputCls} value={current.title} onChange={e => set("title", e.target.value)} placeholder="My Page Title | Site Name" />
                </Field>

                <Field label="Meta Description" hint="Shown under the title in Google results (150–160 chars)">
                  <textarea className={inputCls} value={current.description} onChange={e => set("description", e.target.value)} rows={3} placeholder="Concise summary of this page…" />
                </Field>

                <Field label="Keywords" hint="Comma-separated keywords (for informational purposes)">
                  <input className={inputCls} value={current.keywords} onChange={e => set("keywords", e.target.value)} placeholder="SEO, local SEO, technical SEO" />
                </Field>

                <div className="grid sm:grid-cols-2 gap-5 border-t border-slate-100 pt-5">
                  <Field label="OG Title" hint="Open Graph / social share title">
                    <input className={inputCls} value={current.ogTitle} onChange={e => set("ogTitle", e.target.value)} placeholder="Leave blank to use page title" />
                  </Field>
                  <Field label="OG Image URL" hint="Recommended: 1200×630px">
                    <input className={inputCls} value={current.ogImage} onChange={e => set("ogImage", e.target.value)} placeholder="https://…/og-image.jpg" />
                  </Field>
                </div>

                <Field label="OG Description">
                  <textarea className={inputCls} value={current.ogDescription} onChange={e => set("ogDescription", e.target.value)} rows={2} placeholder="Leave blank to use meta description" />
                </Field>

                <Field label="Canonical URL" hint="Override the canonical URL for this page">
                  <input className={inputCls} value={current.canonicalUrl} onChange={e => set("canonicalUrl", e.target.value)} placeholder="https://topseoagency.com/page" />
                </Field>

                <Field label="Structured Data (JSON-LD)" hint="Paste valid Schema.org JSON-LD — leave blank to use defaults">
                  <textarea className={inputCls} value={current.structuredData} onChange={e => set("structuredData", e.target.value)} rows={5} placeholder='{"@context":"https://schema.org","@type":"WebPage",...}' style={{ fontFamily: "monospace", fontSize: 12 }} />
                </Field>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
                  >
                    <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Settings"}
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
