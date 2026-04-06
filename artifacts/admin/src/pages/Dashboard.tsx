import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { FileText, Mail, Search, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function DashboardPage() {
  const [stats, setStats] = useState({ posts: 0, contacts: 0, seoPages: 0 });

  useEffect(() => {
    Promise.all([api.getBlogPosts(), api.getContacts(), api.getSeoSettings()])
      .then(([posts, contacts, seo]) => {
        setStats({ posts: posts.length, contacts: contacts.length, seoPages: seo.length });
      })
      .catch(() => {});
  }, []);

  const CARDS = [
    { label: "Blog Posts", value: stats.posts, icon: FileText, color: "#6C5CE7", href: "/blog" },
    { label: "Contact Leads", value: stats.contacts, icon: Mail, color: "#00CEC9", href: "/contacts" },
    { label: "SEO Pages Configured", value: stats.seoPages, icon: Search, color: "#F59E0B", href: "/seo" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your SEO content and settings</p>
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {CARDS.map(({ label, value, icon: Icon, color, href }) => (
            <Link key={label} href={href}>
              <a className="bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{label}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-500" /> Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/blog/new">
              <a className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}>
                <FileText className="w-4 h-4" /> New Blog Post
              </a>
            </Link>
            <Link href="/contacts">
              <a className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <Mail className="w-4 h-4" /> View Contacts
              </a>
            </Link>
            <Link href="/seo">
              <a className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <Search className="w-4 h-4" /> Edit SEO Settings
              </a>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
