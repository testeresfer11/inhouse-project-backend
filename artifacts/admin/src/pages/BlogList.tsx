import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, Calendar, Clock } from "lucide-react";

interface BlogPost { id: number; title: string; slug: string; category: string; author: string; publishedAt: string; readTime: number; }

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.getBlogPosts().then(setPosts).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.deleteBlogPost(id);
      setPosts(p => p.filter(x => x.id !== id));
    } catch (err) {
      alert("Failed to delete post.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
            <p className="text-slate-500 text-sm mt-1">{posts.length} posts published</p>
          </div>
          <Link href="/blog/new">
            <a className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}>
              <Plus className="w-4 h-4" /> New Post
            </a>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl border border-slate-200 h-20 animate-pulse" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-400 mb-4">No blog posts yet.</p>
            <Link href="/blog/new">
              <a className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}>
                <Plus className="w-4 h-4" /> Create your first post
              </a>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3.5 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-900 text-sm line-clamp-1">{post.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime} min read
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#6C5CE715", color: "#6C5CE7" }}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/blog/${post.id}`}>
                          <a className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-purple-100 flex items-center justify-center transition-colors">
                            <Pencil className="w-3.5 h-3.5 text-slate-600 hover:text-purple-600" />
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-40"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-slate-600 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
