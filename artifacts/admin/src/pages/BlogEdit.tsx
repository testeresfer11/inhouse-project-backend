import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { useLocation } from "wouter";
import { ArrowLeft, Save } from "lucide-react";

interface BlogPost {
  id: number; title: string; slug: string; excerpt: string; content: string;
  category: string; author: string; authorRole: string; readTime: number;
  imageUrl?: string; tags: string[];
}

const EMPTY: Omit<BlogPost, "id"> = {
  title: "", slug: "", excerpt: "", content: "", category: "", author: "",
  authorRole: "", readTime: 5, imageUrl: "", tags: [],
};

export default function BlogEditPage({ id }: { id?: number }) {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<Omit<BlogPost, "id">>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!id;

  useEffect(() => {
    if (!id) return;
    api.getBlogPosts()
      .then((posts: BlogPost[]) => {
        const post = posts.find(p => p.id === id);
        if (post) {
          const { id: _id, ...rest } = post;
          setForm(rest);
          setTagsInput(Array.isArray(rest.tags) ? rest.tags.join(", ") : "");
        }
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (field: keyof typeof EMPTY, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const data = {
        ...form,
        tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
        readTime: Number(form.readTime),
      };
      if (isEdit && id) {
        await api.updateBlogPost(id, data);
      } else {
        await api.createBlogPost(data);
      }
      navigate("/blog");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLayout><div className="animate-pulse h-96 bg-white rounded-2xl border border-slate-200" /></AdminLayout>;
  }

  const Field = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}{req && " *"}</label>
      {children}
    </div>
  );

  const inputCls = "w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/blog")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{isEdit ? "Edit Post" : "New Blog Post"}</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-7 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Title" req>
              <input className={inputCls} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Post title" required />
            </Field>
            <Field label="Slug" req>
              <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="post-slug" required />
            </Field>
          </div>

          <Field label="Excerpt" req>
            <textarea className={inputCls} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short description…" rows={2} required />
          </Field>

          <Field label="Content (Markdown/HTML)" req>
            <textarea className={inputCls} value={form.content} onChange={e => set("content", e.target.value)} placeholder="Write your full article here…" rows={10} required />
          </Field>

          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Category" req>
              <input className={inputCls} value={form.category} onChange={e => set("category", e.target.value)} placeholder="e.g. Technical SEO" required />
            </Field>
            <Field label="Author" req>
              <input className={inputCls} value={form.author} onChange={e => set("author", e.target.value)} placeholder="Jane Smith" required />
            </Field>
            <Field label="Author Role" req>
              <input className={inputCls} value={form.authorRole} onChange={e => set("authorRole", e.target.value)} placeholder="Senior SEO Strategist" required />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Image URL">
              <input className={inputCls} value={form.imageUrl || ""} onChange={e => set("imageUrl", e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Read Time (minutes)" req>
              <input className={inputCls} type="number" min={1} value={form.readTime} onChange={e => set("readTime", e.target.value)} required />
            </Field>
          </div>

          <Field label="Tags (comma-separated)">
            <input className={inputCls} value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="SEO, technical, local" />
          </Field>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}
            >
              <Save className="w-4 h-4" /> {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
