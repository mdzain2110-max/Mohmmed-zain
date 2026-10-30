import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#060911] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-sm font-bold text-white tracking-tight">MD ZAIN</span>
          <p className="text-xs text-slate-500 mt-1">
            2nd Year B.Tech CSE (AI & ML) · Undergraduate Engineering Portfolio
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
          <a href="#projects" className="hover:text-slate-300 transition-colors">Projects</a>
          <a href="#interactive-lab" className="hover:text-cyan-400 transition-colors">Interactive Lab</a>
          <a href="#stack" className="hover:text-slate-300 transition-colors">Stack</a>
          <a href="#academic" className="hover:text-slate-300 transition-colors">Academic</a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors text-slate-400 ml-4"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-slate-800/60 text-center sm:text-left text-[11px] text-slate-600 font-mono">
        © {new Date().getFullYear()} Md Zain · Built for AI Studio Hackathon Showcase
      </div>
    </footer>
  );
};
