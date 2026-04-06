import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Mail, Building2, Phone, Globe, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Contact {
  id: number; name: string; email: string; company?: string; phone?: string;
  service: string; message: string; website?: string; createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    api.getContacts().then(setContacts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const SERVICE_LABELS: Record<string, string> = {
    "seo": "Enterprise SEO", "local-seo": "Local SEO", "ecommerce-seo": "eCommerce SEO",
    "technical-seo": "Technical SEO", "link-building": "Link Building",
    "content-marketing": "Content Marketing", "other": "Other",
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Contact Leads</h1>
          <p className="text-slate-500 text-sm mt-1">{contacts.length} total inquiries</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl border border-slate-200 h-20 animate-pulse" />)}
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            No contact submissions yet.
          </div>
        ) : (
          <div className="space-y-3">
            {[...contacts].reverse().map(c => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div
                  className="flex items-start gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}>
                    {c.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#6C5CE715", color: "#6C5CE7" }}>
                          {SERVICE_LABELS[c.service] || c.service}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                        {expanded === c.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>
                  </div>
                </div>

                {expanded === c.id && (
                  <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
                    <div className="grid sm:grid-cols-3 gap-4 mb-4 text-sm">
                      {c.company && <div className="flex items-center gap-2 text-slate-600"><Building2 className="w-4 h-4 text-slate-400" />{c.company}</div>}
                      {c.phone && <div className="flex items-center gap-2 text-slate-600"><Phone className="w-4 h-4 text-slate-400" />{c.phone}</div>}
                      {c.website && <div className="flex items-center gap-2 text-slate-600"><Globe className="w-4 h-4 text-slate-400" /><a href={c.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline truncate">{c.website}</a></div>}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed bg-white rounded-xl p-4 border border-slate-200">{c.message}</p>
                    <div className="mt-3 flex gap-2">
                      <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #6C5CE7, #00CEC9)" }}>
                        <Mail className="w-3.5 h-3.5" /> Reply via Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
