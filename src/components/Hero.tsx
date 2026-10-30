import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeNeuralCore } from './ThreeNeuralCore';
import { ArrowDown, Sparkles, ExternalLink, Download, Layers, UserCheck } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [visualMode, setVisualMode] = useState<'3d' | 'portrait'>('3d');

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background radial gradient accent */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-3xl opacity-70"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>B.Tech CSE</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Artificial Intelligence & Machine Learning</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Year 2</span>
            </div>

            {/* Display Headline with Balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              Engineering intelligent systems at the intersection of theory and code.
            </h1>

            {/* Lead Copy */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {PERSONAL_INFO.headline} Specializing in real-time edge computer vision, retrieval-augmented neural models, and scalable machine learning software.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-95 whitespace-nowrap"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#interactive-lab"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 py-1 whitespace-nowrap"
              >
                <span>Launch Interactive AI Lab</span>
                <span>→</span>
              </a>
            </div>

            {/* Quick Metadata Info */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="text-slate-300">{PERSONAL_INFO.name}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{PERSONAL_INFO.location}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-400 hover:underline">
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas or Verified Photo */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Visual Viewport Toggle Bar */}
            <div className="w-full flex items-center justify-between pb-2 px-1">
              <span className="text-xs font-mono text-slate-400">
                {visualMode === '3d' ? '3D NEURAL TOPOLOGY CANVAS' : 'STUDENT PROFILE VERIFICATION'}
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-md">
                <button
                  onClick={() => setVisualMode('3d')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                    visualMode === '3d'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D Manifold
                </button>
                <button
                  onClick={() => setVisualMode('portrait')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                    visualMode === 'portrait'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Student Profile
                </button>
              </div>
            </div>

            {/* Display Viewport */}
            {visualMode === '3d' ? (
              <ThreeNeuralCore />
            ) : (
              <div className="relative w-full h-[420px] lg:h-[480px] rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-end">
                <img
                  src={PERSONAL_INFO.portraitUrl}
                  alt="Md Zain Portrait"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="relative z-10 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span>Md Zain</span>
                    <span className="text-xs font-mono text-cyan-400 font-normal">· B.Tech CSE (AI-ML)</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    2nd Year Undergraduate Researcher specializing in Machine Learning, Computer Vision, and Deep Neural Networks.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-width Metric Strip below the hero split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {PERSONAL_INFO.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs font-medium text-slate-400">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
