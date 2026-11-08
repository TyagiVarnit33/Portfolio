import React from 'react';
import { skillCategories } from '../data/skills.js';
import { CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" aria-label="Technical Skills and Tools" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-2">
            Tools I work with
          </h2>
          <p className="text-base text-brand-text-secondary dark:text-brand-dark-text-secondary mt-3">
            A practical toolkit refined through academic coursework, project development, and hands-on frontend engineering.
          </p>
        </div>

        {/* Skill Groups Grid (2x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 hover:border-brand-purple/40 dark:hover:border-brand-dark-purple/40 transition-colors shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-brand-purple"></span>
                  <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary mb-5">
                  {category.description}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text text-xs font-medium border border-brand-border/70 dark:border-brand-dark-border/70 hover:border-brand-purple/50 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
