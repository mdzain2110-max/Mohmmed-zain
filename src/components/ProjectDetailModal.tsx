import React, { useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Code, CheckCircle, BarChart3, Layers, BookOpen, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative w-full max-w-4xl bg-[#0d1322] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Dataset: {project.dataset}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs (Zero-Pill, functional Segmented Control) */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-3 bg-[#0a0f1d]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              System Overview & Benchmarks
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Neural Architecture
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Python Implementation
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-md transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 mb-2">PROJECT ABSTRACT & MOTIVATION</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Benchmarks Grid */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 mb-3">EMPIRICAL BENCHMARKS & EVALUATION METRICS</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.keyMetrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 block truncate">{m.label}</span>
                      <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div>
                <h4 className="text-xs font-mono text-slate-400 mb-3">KEY ENGINEERING CONTRIBUTIONS</h4>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clean Unboxed Metadata Tags */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-500 mr-2">TECH STACK:</span>
                <span className="text-xs font-mono text-slate-300">
                  {project.tags.join(' · ')}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-slate-400 mb-2">NEURAL PIPELINE & TOPOLOGY</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.architecture}
                </p>
              </div>

              {project.paperOrRef && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">THEORETICAL FOUNDATION / PAPER INSPIRATION</span>
                    <span className="text-sm font-semibold text-white">{project.paperOrRef}</span>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-slate-400 block">OPTIMIZATION & LOSS OBJECTIVES</span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  L_total = λ₁ · L_ Lovasz-Softmax(y_true, y_pred) + λ₂ · L_CrossEntropy(y_true, y_pred)
                </p>
                <p className="text-xs text-slate-400">
                  AdamW Optimizer with Cosine Annealing learning rate schedule (η_min = 1e-6, T_max = 50 epochs).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  CORE PYTORCH / PYTHON IMPLEMENTATION SNIPPET
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0a0f1d] border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            Press ESC or click anywhere outside to close
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Overview
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
