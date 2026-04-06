interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <section
      className="pt-32 pb-20 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F172A 0%, #1a1040 60%, #0f2040 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: "#6C5CE7", opacity: 0.1 }} />
      <div className="container mx-auto px-4 relative z-10">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: "rgba(108,92,231,0.2)", color: "#a78bfa", border: "1px solid rgba(108,92,231,0.3)" }}
        >
          {badge}
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white leading-tight mb-6 max-w-3xl mx-auto">
          {title}
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
