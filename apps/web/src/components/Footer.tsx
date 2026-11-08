import React from 'react';
import { ArrowUp, Lock, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.js';
import { siteConfig } from '../config/site.js';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-brand-dark-bg border-t border-brand-border dark:border-brand-dark-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-brand-text dark:text-brand-dark-text">
                VARNIT TYAGI
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-purple inline-block"></span>
            </div>
            <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
              {siteConfig.title} • CGC University, Mohali
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            {siteConfig.links.resume && (
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-purple dark:text-brand-dark-purple bg-brand-purple-light/60 dark:bg-brand-dark-purple/15 border border-brand-purple/20 hover:border-brand-purple/40 transition-colors"
                aria-label="View Varnit Tyagi Resume"
                title="View Resume"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            )}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-brand-text-secondary hover:text-brand-purple dark:hover:text-brand-dark-purple transition-colors border border-transparent hover:border-brand-border dark:hover:border-brand-dark-border"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-brand-text-secondary hover:text-brand-purple dark:hover:text-brand-dark-purple transition-colors border border-transparent hover:border-brand-border dark:hover:border-brand-dark-border"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <Link
              to="/admin"
              className="p-2 rounded-lg text-brand-text-secondary hover:text-brand-purple dark:hover:text-brand-dark-purple transition-colors border border-transparent hover:border-brand-border dark:hover:border-brand-dark-border"
              title="Secured Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 p-2 rounded-lg text-xs font-semibold text-brand-text-secondary hover:text-brand-text dark:hover:text-white border border-brand-border dark:border-brand-dark-border transition-colors ml-2"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-brand-border/60 dark:border-brand-dark-border/60 text-center text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Designed & Built with React, TypeScript & Tailwind CSS.
          </span>
          <span className="text-[11px] opacity-75">
            Inspired by minimal purple aesthetics • Mohali / Chandigarh, India
          </span>
        </div>
      </div>
    </footer>
  );
};
