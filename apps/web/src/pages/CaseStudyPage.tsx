import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code, CheckCircle } from 'lucide-react';
import { projects } from '../data/projects.js';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-text dark:text-brand-dark-text mb-4">
          Case Study Not Found
        </h1>
        <p className="text-brand-text-secondary dark:text-brand-dark-text-secondary mb-8">
          The requested project case study could not be located.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-secondary hover:text-brand-purple dark:text-brand-dark-text-secondary dark:hover:text-brand-dark-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </Link>

          <span className="font-mono text-xs font-bold text-brand-purple dark:text-brand-dark-purple px-2.5 py-1 rounded bg-brand-purple-light dark:bg-brand-dark-purple/20">
            PROJECT {project.number}
          </span>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text dark:text-brand-dark-text leading-tight">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-brand-text-secondary dark:text-brand-dark-text-secondary leading-relaxed">
            {project.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-xl text-sm font-semibold transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Application</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm font-medium cursor-not-allowed">
                Live URL Coming Soon
              </span>
            )}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-border dark:border-brand-dark-border hover:border-brand-purple rounded-xl text-sm font-semibold text-brand-text dark:text-brand-dark-text transition-colors"
              >
                <Code className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                Source repository available upon request
              </span>
            )}
          </div>
        </div>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-brand-bg-secondary dark:bg-brand-dark-card rounded-2xl border border-brand-border dark:border-brand-dark-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-text-secondary block mb-1">
              My Role
            </span>
            <p className="text-sm font-medium text-brand-text dark:text-brand-dark-text">
              {project.role}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text-secondary dark:text-brand-dark-text-secondary block mb-1">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs bg-white dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text border border-brand-border dark:border-brand-dark-border font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            Project Overview
          </h2>
          <p className="text-brand-text-secondary dark:text-brand-dark-text-secondary text-base leading-relaxed">
            {project.overview}
          </p>
        </section>

        {/* 2. Problem / Objective */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            Problem & Objectives
          </h2>
          <p className="text-brand-text-secondary dark:text-brand-dark-text-secondary text-base leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* 3. Implemented Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            Implemented Features
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 p-4 rounded-xl bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-sm text-brand-text dark:text-brand-dark-text"
              >
                <CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Technology Stack Breakdown */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            Architecture & Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.techStack.map((stackGroup) => (
              <div
                key={stackGroup.category}
                className="p-5 rounded-2xl bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border space-y-3"
              >
                <h3 className="font-bold text-sm text-brand-text dark:text-brand-dark-text border-b border-brand-border dark:border-brand-dark-border pb-2">
                  {stackGroup.category}
                </h3>
                <ul className="space-y-1.5">
                  {stackGroup.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Challenges & Engineering Solutions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-purple" />
            Technical Challenges & Solutions
          </h2>
          <div className="space-y-4">
            {project.challengesAndSolutions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border space-y-2.5"
              >
                <div className="flex items-start gap-2 text-sm font-semibold text-brand-text dark:text-brand-dark-text">
                  <span className="font-mono text-xs text-red-500 font-bold px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/50">
                    CHALLENGE
                  </span>
                  <span>{item.challenge}</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary pl-2 border-l-2 border-brand-purple">
                  <span>{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notes / Limitations Disclosure */}
        {project.notes && (
          <div className="p-4 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary italic">
            {project.notes}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-brand-border dark:border-brand-dark-border flex justify-between items-center">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Link>
        </div>

      </div>
    </article>
  );
};
