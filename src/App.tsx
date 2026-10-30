/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { InteractiveLab } from './components/InteractiveLab';
import { TechnicalStack } from './components/TechnicalStack';
import { AcademicRoadmap } from './components/AcademicRoadmap';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './types';

// Refined easing curve for luxury, responsive motion feel
const sectionTransition = {
  duration: 0.65,
  ease: [0.16, 1, 0.3, 1] as const
};

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionTransition
  }
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  // Subtle top reading progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 overflow-x-hidden">
      {/* 2px Sophisticated Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 origin-left z-50 pointer-events-none"
      />

      {/* Navigation Top Bar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      <main>
        {/* Hero Section with immediate smooth entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <Hero onOpenResume={() => setResumeOpen(true)} />
        </motion.div>

        {/* Selected Projects (Bento Box + Dynamic Categories) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <ProjectShowcase onSelectProject={(project) => setSelectedProject(project)} />
        </motion.div>

        {/* Live Interactive AI-ML Lab & Simulation Playground */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <InteractiveLab />
        </motion.div>

        {/* Technical Stack & Skill Matrix */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <TechnicalStack />
        </motion.div>

        {/* Academic Journey, Labs & Certifications */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <AcademicRoadmap />
        </motion.div>

        {/* Contact Section & Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <ContactSection />
        </motion.div>
      </main>

      {/* Clean Anti-Slop Footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={sectionVariants}
      >
        <Footer />
      </motion.div>

      {/* Project Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Curriculum Vitae Modal with AnimatePresence */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal
            isOpen={resumeOpen}
            onClose={() => setResumeOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
