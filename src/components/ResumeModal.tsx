import React from 'react';
import { X, Printer, Download, Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { motion } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
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
        className="relative w-full max-w-3xl bg-[#0d1322] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0f1d] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Curriculum Vitae</span>
            <span className="text-xs font-mono text-slate-500">· Md Zain (B.Tech CSE AI-ML)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Paper */}
        <div className="p-8 sm:p-10 space-y-6 max-h-[75vh] overflow-y-auto bg-slate-950 text-slate-200 text-xs sm:text-sm font-sans leading-relaxed selection:bg-blue-500/20">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              MD ZAIN
            </h1>
            <p className="text-xs font-mono text-cyan-400">
              B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                Hyderabad, India
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500" />
                {PERSONAL_INFO.email}
              </span>
              <span>·</span>
              <a href="https://github.com/mdzain" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                GitHub: github.com/mdzain
              </a>
              <span>·</span>
              <a href="https://linkedin.com/in/mdzain" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                LinkedIn: linkedin.com/in/mdzain
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Education
            </h2>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-white text-sm">Bachelor of Technology in CSE (AI & Machine Learning)</span>
              <span className="text-xs font-mono text-slate-400">2023 — 2027 (Expected)</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>School of Computing & Engineering</span>
              <span className="text-emerald-400 font-bold">Cumulative GPA: 9.24 / 10.0 (Top 5%)</span>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Design & Analysis of Algorithms, Linear Algebra, Probability & Statistics, Deep Learning, Operating Systems, Database Management Systems, Object-Oriented Software.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <div>
                <strong className="text-slate-300">Languages:</strong> Python (Advanced), TypeScript, JavaScript, C++, SQL, Bash.
              </div>
              <div>
                <strong className="text-slate-300">Deep Learning & AI:</strong> PyTorch, TorchVision, Hugging Face Transformers, ONNX Runtime, TensorRT, Scikit-Learn, OpenCV, Librosa.
              </div>
              <div>
                <strong className="text-slate-300">Generative AI & Search:</strong> Retrieval-Augmented Generation (RAG), ChromaDB, FAISS, Gemini API, LangChain, Embeddings.
              </div>
              <div>
                <strong className="text-slate-300">Frameworks & Cloud:</strong> FastAPI, React, Node.js, Docker, Git, Linux, Prometheus, Redis.
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Featured Projects
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-white">NeuroVision Edge: Real-Time Drone Obstacle Segmentation</span>
                <span className="text-xs font-mono text-slate-400">PyTorch, TensorRT, CUDA, ONNX</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
                <li>Designed a lightweight bilateral spatial/context network achieving 94.2% mIoU on urban aerial obstacle benchmarks.</li>
                <li>Compiled to INT8 precision with TensorRT, reaching 48 FPS (sub-20ms latency) on Jetson Orin Nano edge platform.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-white">LexiRAG Neural Search: Multi-Hop Retrieval & Reranker</span>
                <span className="text-xs font-mono text-slate-400">ChromaDB, Gemini SDK, FastAPI, Python</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
                <li>Engineered hybrid BM25 + dense vector search pipeline indexing 12,000+ scientific computer science papers.</li>
                <li>Reduced hallucination rate by 42% via cross-encoder contextual re-ranking and verifiable citation extraction.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-white">MedScan CADe: Self-Supervised Chest Pathology Screener</span>
                <span className="text-xs font-mono text-slate-400">Vision Transformer, PyTorch, Grad-CAM</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
                <li>Fine-tuned ViT-Base on 112,000+ radiographs, attaining 0.938 mean ROC-AUC across 14 thoracic conditions.</li>
                <li>Integrated pixel-level Grad-CAM heatmaps allowing transparent clinical validation of pulmonary abnormalities.</li>
              </ul>
            </div>
          </div>

          {/* Research & Experience */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Research & Academic Experience
            </h2>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-white">Undergraduate Research Assistant · Autonomous Vision Lab</span>
              <span className="text-xs font-mono text-slate-400">2024 — Present</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
              <li>Developing lightweight spatial feature distillation models for autonomous micro-robot navigation.</li>
              <li>Co-authoring empirical paper on edge quantization loss mitigation for real-time semantic segmentation.</li>
            </ul>
          </div>

          {/* Accreditations & Awards */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Awards & Certifications
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
              <li><strong>1st Runner-Up</strong> · National Smart Campus Engineering Hackathon (2024)</li>
              <li><strong>Deep Learning Specialization</strong> (5 Courses) · DeepLearning.AI by Andrew Ng (Coursera)</li>
              <li><strong>CS50's Intro to AI with Python</strong> · Harvard University Online</li>
              <li><strong>350+ LeetCode Solutions</strong> · Verified Data Structures & Algorithms problem solver</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0a0f1d] border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            Available for AI/ML Internships & Research Collaborations
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
