import React from 'react';
import { TIMELINE, CERTIFICATIONS } from '../data/portfolioData';
import { GraduationCap, Award, BookCheck, Trophy, Sparkles, Building2 } from 'lucide-react';

export const AcademicRoadmap: React.FC = () => {
  return (
    <section id="academic" className="py-20 border-t border-slate-800/80 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Academic & Research Journey */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>ACADEMIC MILESTONES & RESEARCH LABS</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>UNDERGRADUATE TRAJECTORY</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Education & Research Experience
              </h2>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                Combining rigorous theoretical foundation in algorithms, linear algebra, and statistical learning with hands-on lab experimentation.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-8 border-l border-slate-800 pl-6 ml-2">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-900 group-hover:scale-125 transition-transform" />

                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <span>{item.period}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{item.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {item.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="mt-3 space-y-2">
                    {item.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-blue-500 font-bold">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Hackathon Honors */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>VERIFIED ACCREDITATIONS</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>AWARDS</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Honors & Accreditations
              </h2>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                Standardized coursework completions from top institutions and competitive podium standings.
              </p>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0c1220] border border-slate-800/90 hover:border-slate-700 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold text-white">
                      {cert.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {cert.year}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-cyan-400">
                    {cert.issuer}
                  </div>

                  <p className="text-xs text-slate-400 font-mono pt-1">
                    Coverage: {cert.skills}
                  </p>
                </div>
              ))}
            </div>

            {/* Academic Standing Callout Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950 border border-blue-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-bold">HACKATHON & SCHOLASTIC STANDING</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ranked in the top 5th percentile of the B.Tech CSE (AI-ML) department. Consistently leading student engineering teams to rapid proof-of-concept deployments under strict hackathon time constraints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
