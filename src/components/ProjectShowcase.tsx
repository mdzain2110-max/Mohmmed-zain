import React, { useState, useRef } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, Code, Eye, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectShowcaseProps {
  onSelectProject: (project: Project) => void;
}

interface TiltCardProps {
  project: Project;
  isFeatured: boolean;
  onSelect: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ project, isFeatured, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates: -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  // Map mouse offsets to tilt angles (max +/- 8 to 10 deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8.5, -8.5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8.5, 8.5]);

  // Dynamic light reflection position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className={`h-full ${isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}
    >
      <motion.div
        ref={cardRef}
        onClick={onSelect}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.985 }}
        className="group relative cursor-pointer rounded-2xl bg-[#0d1322] border border-slate-800/80 hover:border-blue-500/50 transition-colors duration-200 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-500/10 h-full"
      >
        {/* Dynamic Tactile Glare / Sheen Overlay */}
        <motion.div
          style={{
            background: isHovered
              ? `radial-gradient(circle 320px at ${glareX.get()}% ${glareY.get()}%, rgba(59, 130, 246, 0.12), transparent 80%)`
              : 'transparent',
          }}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        />

        <div style={{ transform: 'translateZ(24px)' }}>
          {/* Media Container with Fallback Frame */}
          <div className={`relative w-full overflow-hidden bg-slate-950 ${isFeatured ? 'h-64 sm:h-72' : 'h-52'}`}>
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/20 to-transparent" />

            {/* Top Floating Category Tag (Clean, subtle unboxed text) */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-cyan-400">
              {project.categoryLabel}
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 p-2 rounded-full text-white shadow-lg">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Content Box */}
          <div className="p-6">
            {/* Clean unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <span>{project.tags[0]}</span>
              <span aria-hidden="true">·</span>
              <span>{project.tags[1]}</span>
              <span aria-hidden="true">·</span>
              <span>{project.tags[2]}</span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {project.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div 
          style={{ transform: 'translateZ(18px)' }}
          className="px-6 pb-6 pt-2 border-t border-slate-800/80 mt-auto flex items-center justify-between"
        >
          <div className="flex items-center gap-4 text-xs font-mono">
            {project.keyMetrics.slice(0, 2).map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] text-slate-500">{metric.label}</span>
                <span className="text-white font-bold tabular-nums">{metric.value}</span>
              </div>
            ))}
          </div>

          <span className="text-xs font-medium text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            <span>Deep Dive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cv' | 'nlp' | 'systems'>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'cv', label: 'Computer Vision' },
    { id: 'nlp', label: 'NLP & Generative AI' },
    { id: 'systems', label: 'ML Systems & MLOps' },
  ] as const;

  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>SELECTED RESEARCH & PRODUCTION PROJECTS</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>END-TO-END PIPELINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architected for Low Latency and High Precision
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            A curated portfolio of deep learning architectures, retrieval engines, and diagnostic models developed across academic research and competitive hackathons.
          </p>
        </div>

        {/* Filter Tabs (Interactive Filter Controls, Zero-Pill) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Bento Box Showcase Grid with 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const isFeatured = index === 0;

          return (
            <TiltCard
              key={project.id}
              project={project}
              isFeatured={isFeatured}
              onSelect={() => onSelectProject(project)}
            />
          );
        })}
      </div>
    </section>
  );
};
