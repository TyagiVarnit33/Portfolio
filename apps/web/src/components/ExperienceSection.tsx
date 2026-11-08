import React from 'react';
import { educationData, experienceData } from '../data/experience.js';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" aria-label="Education and Experience Journey" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-2">
            My journey
          </h2>
          <p className="text-base text-brand-text-secondary dark:text-brand-dark-text-secondary mt-3">
            Academic progression and practical technical training.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-6 max-w-3xl">
          
          {/* Education Card */}
          <div className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 sm:p-8 hover:border-brand-purple/40 transition-colors shadow-subtle relative pl-8 sm:pl-10">
            <span className="absolute left-0 top-8 bottom-8 w-1 bg-brand-purple rounded-r-full" />
            
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-purple" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                  University Degree
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary font-medium">
                <Calendar className="w-3.5 h-3.5" /> {educationData.duration}
              </span>
            </div>

            <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">
              {educationData.degree}
            </h3>
            <p className="text-sm font-medium text-brand-text-secondary dark:text-brand-dark-text-secondary mt-0.5">
              {educationData.institution} • {educationData.location}
            </p>

            <div className="mt-4 p-3 bg-brand-bg-secondary dark:bg-brand-dark-bg rounded-xl border border-brand-border/60 dark:border-brand-dark-border/60">
              <span className="text-xs font-semibold text-brand-text dark:text-brand-dark-text">
                Current Performance: <strong className="text-brand-purple dark:text-brand-dark-purple">{educationData.grade}</strong>
              </span>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
              {educationData.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0 mt-1.5"></span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* College Summer Internship / Technical Training Card */}
          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 sm:p-8 hover:border-brand-purple/40 transition-colors shadow-subtle relative pl-8 sm:pl-10"
            >
              <span className="absolute left-0 top-8 bottom-8 w-1 bg-brand-border dark:bg-brand-dark-border rounded-r-full" />
              
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-purple" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                    {exp.type}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {exp.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">
                {exp.title}
              </h3>
              <p className="text-sm font-medium text-brand-text-secondary dark:text-brand-dark-text-secondary mt-0.5">
                {exp.organization}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary leading-relaxed">
                {exp.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-brand-bg-secondary dark:bg-brand-dark-bg text-brand-text-secondary dark:text-brand-dark-text-secondary border border-brand-border/60 dark:border-brand-dark-border/60"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {exp.note && (
                <p className="mt-3 text-[11px] italic text-brand-text-secondary/80 dark:text-brand-dark-text-secondary/80">
                  {exp.note}
                </p>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
