import React from 'react';
import { ExternalLink, ArrowRight, Code, Sparkles, Layers } from 'lucide-react';
import { Project } from '../types.js';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Visual mockup representation tailored to each project's theme
  const renderMockup = () => {
    if (project.id === 'echelon') {
      return (
        <div className="w-full h-56 sm:h-64 bg-gradient-to-br from-stone-900 to-zinc-800 text-stone-100 p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex justify-between items-center z-10">
            <span className="text-xs font-mono tracking-widest uppercase text-stone-400">ECHELON ATELIER</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-700/80 text-stone-300">AUTUMN / WINTER</span>
          </div>

          <div className="z-10 space-y-1">
            <p className="text-2xl font-light tracking-wide text-white">MINIMALIST APPAREL</p>
            <p className="text-xs text-stone-400">Clean typography • Responsive catalogue • Curated visual hierarchy</p>
          </div>

          <div className="z-10 flex gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded bg-stone-800/90 border border-stone-700 text-stone-300">
              React + TypeScript
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded bg-stone-800/90 border border-stone-700 text-stone-300">
              Tailwind UI
            </span>
          </div>
        </div>
      );
    }

    if (project.id === 'ai-saas-dashboard') {
      return (
        <div className="w-full h-56 sm:h-64 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/20 rounded-full blur-2xl -z-0" />
          
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-mono font-semibold tracking-wider text-indigo-300">AI WORKSPACE DASHBOARD</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              LIVE APP
            </span>
          </div>

          <div className="z-10 grid grid-cols-3 gap-2 my-auto">
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Token Balance</span>
              <span className="text-sm font-semibold text-white">84,200</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Model</span>
              <span className="text-sm font-semibold text-indigo-400">GPT-4 / API</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block">Status</span>
              <span className="text-sm font-semibold text-emerald-400">Active</span>
            </div>
          </div>

          <div className="z-10 flex gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
              API Workflows
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
              Responsive Metrics
            </span>
          </div>
        </div>
      );
    }

    if (project.id === 'ui-ux-mobile-app') {
      return (
        <div className="w-full h-56 sm:h-64 bg-gradient-to-br from-neutral-950 via-slate-900 to-indigo-950 text-neutral-100 p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-44 h-44 bg-fuchsia-600/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-fuchsia-500 to-indigo-500 inline-block" />
              <span className="text-xs font-mono font-semibold tracking-wider text-fuchsia-300">FIGMA MOBILE PROTOTYPE</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
              UI/UX CASE
            </span>
          </div>

          <div className="z-10 flex items-center justify-center gap-3 my-auto">
            {/* Mini phone frame simulation */}
            <div className="w-28 h-28 rounded-2xl bg-neutral-900/90 border border-neutral-700 p-2 shadow-xl flex flex-col justify-between">
              <div className="w-10 h-1 bg-neutral-700 rounded-full mx-auto" />
              <div className="space-y-1">
                <div className="h-2 w-3/4 bg-fuchsia-400/80 rounded" />
                <div className="h-1.5 w-1/2 bg-neutral-600 rounded" />
              </div>
              <div className="flex justify-between items-center gap-1">
                <div className="h-4 w-10 bg-indigo-500/80 rounded-md" />
                <div className="h-4 w-8 bg-neutral-800 rounded-md" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-white block">Design System & Flows</span>
              <span className="text-[11px] text-neutral-300 block">User Research • Wireframes</span>
              <span className="text-[10px] text-fuchsia-400 block font-mono">Auto-Layout & Variants</span>
            </div>
          </div>

          <div className="z-10 flex gap-2">
            <span className="text-[11px] px-2.5 py-1 rounded bg-neutral-800/90 border border-neutral-700 text-neutral-300">
              Figma Design
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded bg-neutral-800/90 border border-neutral-700 text-neutral-300">
              Design Systems
            </span>
          </div>
        </div>
      );
    }

    // React Blog App
    return (
      <div className="w-full h-56 sm:h-64 bg-gradient-to-br from-violet-950 via-purple-900 to-slate-900 text-purple-100 p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-mono tracking-wider text-purple-200">REACT + APPWRITE BLOG</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-800/60 text-purple-200 border border-purple-700">
            CONTENT & BAAS
          </span>
        </div>

        <div className="z-10 space-y-2">
          <div className="p-3 bg-purple-900/60 rounded-lg border border-purple-800/70">
            <span className="text-xs font-semibold text-white block">Appwrite Collections & Auth</span>
            <span className="text-[11px] text-purple-300">Synchronized publishing, user sessions, and post CRUD flows</span>
          </div>
        </div>

        <div className="z-10 flex gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300">
            Appwrite BaaS
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300">
            React State
          </span>
        </div>
      </div>
    );
  };

  return (
    <article className="group bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl overflow-hidden hover:border-brand-purple/50 dark:hover:border-brand-dark-purple/50 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between">
      <div>
        {/* Project Visual / Screenshot Area */}
        <div className="relative border-b border-brand-border dark:border-brand-dark-border overflow-hidden bg-brand-bg-secondary dark:bg-brand-dark-bg">
          {renderMockup()}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white font-mono text-xs font-bold z-20">
            {project.number}
          </span>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text group-hover:text-brand-purple transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-bg-secondary dark:bg-brand-dark-bg text-brand-text-secondary dark:text-brand-dark-text-secondary border border-brand-border dark:border-brand-dark-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-brand-border/60 dark:border-brand-dark-border/60 mt-2">
        <div className="flex items-center gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              aria-label={`Open live demo for ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium cursor-not-allowed">
              Link coming soon
            </span>
          )}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border dark:border-brand-dark-border hover:border-brand-purple text-brand-text dark:text-brand-dark-text text-xs font-medium transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>View Source</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-brand-text-secondary dark:text-brand-dark-text-secondary">
              Source on request
            </span>
          )}
        </div>

        {project.hasCaseStudy && (
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-purple dark:text-brand-dark-purple hover:underline"
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </article>
  );
};
