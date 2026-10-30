import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Terminal, Database, Code2, Network, Cpu, CheckCircle2 } from 'lucide-react';

export const TechnicalStack: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="stack" className="py-20 border-t border-slate-800/80 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>ENGINEERING FOUNDATIONS & PROFICIENCIES</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SYSTEMS & TOOLING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Structured Technical Competencies
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            A verified inventory of algorithmic mathematics, deep learning frameworks, and production systems cultivated across academic coursework and open-source development.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800/80">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategoryIndex === idx
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800/80'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="bg-[#0c1220] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-800/80 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                {SKILL_CATEGORIES[activeCategoryIndex].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {SKILL_CATEGORIES[activeCategoryIndex].description}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {SKILL_CATEGORIES[activeCategoryIndex].skills.length} Core Modules
            </span>
          </div>

          {/* Clean Typographic Matrix (Zero-Pills) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 font-medium">
                    {skill.level}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400 font-mono leading-relaxed">
                  {skill.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-white font-bold block mb-1">DSA & Problem Solving</span>
            <span>350+ LeetCode problems solved across Trees, Graphs, DP, and Bit Manipulation.</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-white font-bold block mb-1">Hardware Acceleration</span>
            <span>Hands-on experience with NVIDIA CUDA, TensorRT INT8 optimization, and Jetson Nano.</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span className="text-white font-bold block mb-1">Modern AI & LLMs</span>
            <span>Deep retrieval-augmented pipelines, Google Gemini SDK, and embeddings architectures.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
