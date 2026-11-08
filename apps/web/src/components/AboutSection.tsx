import React from 'react';
import { GraduationCap, MapPin, Code2, Palette } from 'lucide-react';
import { siteConfig } from '../config/site.js';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" aria-label="About Varnit Tyagi" className="py-20 bg-brand-bg-secondary/60 dark:bg-brand-dark-bg-secondary/40 border-y border-brand-border dark:border-brand-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
            Background & Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-2">
            A little about me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Story & Focus Areas (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-brand-text-secondary dark:text-brand-dark-text-secondary text-base sm:text-lg leading-relaxed">
            <p>
              I'm a Computer Science and Engineering student at <strong>CGC University, Mohali</strong>, with a dedicated focus on frontend engineering and UI/UX design. I enjoy turning ideas into accessible, responsive interfaces and building web experiences that balance visual clarity with practical functionality.
            </p>

            <p>
              My development philosophy centers around crafting clean, modular component architectures using <strong>React</strong> and <strong>TypeScript</strong>. I care deeply about the nuances that separate an ordinary interface from an exceptional one: consistent spacing, sensible line-heights, keyboard accessibility, and snappy loading performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border space-y-1.5">
                <div className="flex items-center gap-2 text-brand-text dark:text-brand-dark-text font-semibold text-sm">
                  <Code2 className="w-4 h-4 text-brand-purple" />
                  <span>Frontend Engineering</span>
                </div>
                <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                  Reusable components, type safety with TypeScript, and mobile-first layouts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border space-y-1.5">
                <div className="flex items-center gap-2 text-brand-text dark:text-brand-dark-text font-semibold text-sm">
                  <Palette className="w-4 h-4 text-brand-purple" />
                  <span>UI/UX & Usability</span>
                </div>
                <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                  High-contrast typography, restrained visual effects, and Figma design translation.
                </p>
              </div>
            </div>
          </div>

          {/* Compact Education Card & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-dark-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-brand-purple-light dark:bg-brand-dark-purple/20 text-brand-purple dark:text-brand-dark-purple">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-text dark:text-brand-dark-text text-base">
                      Formal Education
                    </h3>
                    <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                      Academic Background
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                  CGPA {siteConfig.education.cgpa}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-brand-text dark:text-brand-dark-text">
                    {siteConfig.education.degree}
                  </h4>
                  <p className="text-brand-text-secondary dark:text-brand-dark-text-secondary text-xs">
                    {siteConfig.education.institution}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {siteConfig.location}
                  </span>
                  <span className="font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {siteConfig.education.duration}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-brand-border dark:border-brand-dark-border space-y-2">
                <span className="text-xs font-semibold text-brand-text dark:text-brand-dark-text block">
                  Core Coursework & Studies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Data Structures & Algorithms', 'Java & OOP', 'DBMS', 'Computer Networks', 'Web Technologies'].map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 rounded text-[11px] bg-brand-bg-secondary dark:bg-brand-dark-bg text-brand-text-secondary dark:text-brand-dark-text-secondary border border-brand-border/70 dark:border-brand-dark-border/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
