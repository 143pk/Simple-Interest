import React from 'react';
import { ShieldCheck, Globe2, Code, FileCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10 px-4 mt-12 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-slate-200 block text-xs">Google Verified</strong>
              <span className="text-[10px] text-slate-500">Search Console Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
            <Globe2 className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <strong className="text-slate-200 block text-xs">International SEO</strong>
              <span className="text-[10px] text-slate-500">US, UK, CA, AU, IN, NZ</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
            <Code className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <strong className="text-slate-200 block text-xs">Schema.org Valid</strong>
              <span className="text-[10px] text-slate-500">JSON-LD Financial App</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
            <FileCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-slate-200 block text-xs">GitHub Pages Ready</strong>
              <span className="text-[10px] text-slate-500">100% Static HTML/CSS/JS</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-300 text-sm">Simple Interest Calculator</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Accurate online interest calculator, formulas, schedule breakdown tables, and reverse calculations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="./google13c2e7412d3ff1b2.html" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              Search Console Token
            </a>
            <span className="text-slate-700">•</span>
            <a href="./sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              Sitemap.xml
            </a>
            <span className="text-slate-700">•</span>
            <a href="./robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              Robots.txt
            </a>
            <span className="text-slate-700">•</span>
            <a href="./ads.txt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              Ads.txt
            </a>
            <span className="text-slate-700">•</span>
            <a href="./manifest.json" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
              Manifest
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-500 leading-relaxed space-y-2">
          <p>
            Disclaimer: This Simple Interest Calculator provides estimated calculations for educational and informational purposes only. Results do not constitute official financial advice, loan quotes, or binding terms. Consult a qualified financial advisor or lending institution for formal agreements.
          </p>
          <p className="flex justify-between items-center">
            <span>© {new Date().getFullYear()} Simple Interest Calculator. All rights reserved.</span>
            <span className="font-mono text-slate-600">Built with Vite, React & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
