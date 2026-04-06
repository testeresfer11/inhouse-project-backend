"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#050d1f" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* Logo mark */}
          <m.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "backOut" }}
            className="flex flex-col items-center gap-5"
          >
            {/* Animated ring */}
            <div className="relative w-20 h-20">
              <m.div
                className="absolute inset-0 rounded-full"
                style={{ border: "3px solid rgba(249,115,22,0.25)" }}
              />
              <m.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "3px solid transparent",
                  borderTopColor: "#F97316",
                  borderRightColor: "#F97316",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
              />
              {/* Inner dot */}
              <m.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
              </m.div>
            </div>

            {/* Brand name */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-white font-black text-2xl tracking-tight">
                Top <span style={{ color: "#F97316" }}>SEO</span> Services
              </p>
              <m.div
                className="h-0.5 mt-2 rounded-full"
                style={{ background: "linear-gradient(90deg, #F97316, #3B82F6)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              />
            </m.div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
