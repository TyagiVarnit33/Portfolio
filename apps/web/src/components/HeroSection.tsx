import React from 'react';
import {
  ArrowDown,
  Download,
  ChevronRight,
  Sparkles,
  Code2,
  Palette,
} from 'lucide-react';
import { siteConfig } from '../config/site.js';

export const HeroSection: React.FC = () => {
  const hasPhoto =
    siteConfig.links.profilePhoto &&
    siteConfig.links.profilePhoto !== '[ADD_PROFILE_PHOTO]';

  const hasResume =
    siteConfig.links.resume &&
    siteConfig.links.resume !== '[ADD_RESUME_PDF]';

  return (
    <section
      id="hero"
      aria-label="Introduction and Hero"
      className="relative pt-14 pb-24 md:pt-24 md:pb-32 overflow-hidden"
    >
      {/* Background hero glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(to right, rgba(124,58,237,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ─── Left Column: Headline and CTAs (7 cols on desktop) ─── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">

            {/* Availability Pill */}
            {siteConfig.availability && (
              <div
                className="animate-fade-in-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple-light/80 dark:bg-brand-dark-purple/15 border border-brand-purple/20 dark:border-brand-dark-purple/30 text-xs font-semibold text-brand-purple dark:text-brand-dark-purple shadow-sm"
                role="status"
                aria-label="Availability status"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple" />
                </span>
                <span>{siteConfig.availability}</span>
              </div>
            )}

            {/* Greeting */}
            <div className="animate-fade-in-up delay-200 flex items-center gap-2 text-brand-text-secondary dark:text-brand-dark-text-secondary font-medium text-lg sm:text-xl">
              <span aria-label="Greeting">Hey, I'm Varnit 👋</span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up delay-300 text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] text-brand-text dark:text-brand-dark-text">
              <span className="purple-gradient-text-hero">Frontend</span>
              <br />
              <span>Developer</span>
              <span className="text-brand-purple dark:text-brand-dark-purple"> & </span>
              <br />
              <span>UI/UX Designer</span>
            </h1>

            {/* Supporting Tagline */}
            <p className="animate-fade-in-up delay-400 text-lg sm:text-xl text-brand-text-secondary dark:text-brand-dark-text-secondary max-w-xl leading-relaxed">
              {siteConfig.tagline}
            </p>

            {/* Short Bio */}
            <p className="animate-fade-in-up delay-500 text-sm sm:text-base text-brand-text-secondary dark:text-brand-dark-text-secondary max-w-lg leading-relaxed opacity-80">
              {siteConfig.bio}
            </p>

            {/* Primary CTAs */}
            <div className="animate-fade-in-up delay-500 pt-2 flex flex-wrap items-center gap-4">

              {/* Primary: View My Projects */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-brand-purple/25 hover:shadow-xl hover:shadow-brand-purple/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
                aria-label="View my projects portfolio"
              >
                <span>View My Projects</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </a>

              {/* Secondary: Download Resume */}
              {hasResume ? (
                <a
                  href={siteConfig.links.resume}
                  download="Varnit-Tyagi-Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-brand-dark-card border-2 border-brand-border dark:border-brand-dark-border hover:border-brand-purple dark:hover:border-brand-dark-purple text-brand-text dark:text-brand-dark-text hover:text-brand-purple dark:hover:text-brand-dark-purple rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-label="Download Varnit Tyagi's resume as PDF"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-100 dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-brand-text-secondary dark:text-brand-dark-text-secondary rounded-xl text-sm font-semibold opacity-60 cursor-not-allowed"
                  title="Resume PDF not yet configured — place Varnit-Tyagi-Resume.pdf in public/assets/"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Resume (Coming Soon)</span>
                </button>
              )}
            </div>

            {/* Tertiary CTA: Let's Work Together */}
            <a
              href="#contact"
              className="animate-fade-in-up delay-600 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple dark:text-brand-dark-purple hover:underline underline-offset-4 transition-all group"
              aria-label="Scroll to contact section"
            >
              <span>Let's Work Together</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>

            {/* Education badge */}
            <div className="animate-fade-in-up delay-700 flex flex-wrap items-center gap-2 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
              <span className="px-3 py-1 rounded-lg bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border font-semibold text-brand-text dark:text-brand-dark-text shadow-sm">
                {siteConfig.education.degree}
              </span>
              <span aria-hidden="true">•</span>
              <span>{siteConfig.education.institution}</span>
              <span aria-hidden="true">•</span>
              <span className="font-bold text-brand-purple dark:text-brand-dark-purple">
                CGPA {siteConfig.education.cgpa}
              </span>
            </div>
          </div>

          {/* ─── Right Column: Profile Photo (5 cols on desktop) ─── */}
          <div className="animate-slide-in-right delay-200 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">

              {/* Decorative orbit ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-brand-purple/25 dark:border-brand-dark-purple/25 profile-orbit"
                style={{ margin: '-16px' }}
                aria-hidden="true"
              />

              {/* Outer glow aura */}
              <div
                className="absolute rounded-full bg-gradient-to-tr from-brand-purple/20 via-purple-400/10 to-transparent dark:from-brand-dark-purple/25 dark:via-purple-500/10 dark:to-transparent filter blur-2xl profile-glow-pulse"
                style={{ inset: '-24px' }}
                aria-hidden="true"
              />

              {/* Profile image container */}
              <div className="profile-image-container relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">

                {/* Border ring */}
                <div
                  className="absolute inset-0 rounded-full border-4 border-white dark:border-brand-dark-card shadow-2xl z-10 pointer-events-none"
                  style={{
                    boxShadow:
                      '0 0 0 4px white, 0 8px 40px rgba(124,58,237,0.25), 0 2px 8px rgba(0,0,0,0.15)',
                  }}
                  aria-hidden="true"
                />

                {/* Shimmer overlay on hover */}
                <div
                  className="profile-shimmer absolute inset-0 z-20 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                    transform: 'translateX(-100%) rotate(45deg)',
                  }}
                  aria-hidden="true"
                />

                {/* Profile Photo */}
                {hasPhoto ? (
                  <img
                    src={siteConfig.links.profilePhoto}
                    alt="Varnit Tyagi — Frontend Developer & UI/UX Designer, wearing a formal navy suit, professional headshot"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    width={320}
                    height={320}
                  />
                ) : (
                  /* Fallback SVG avatar */
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    fill="currentColor"
                    aria-label="Varnit Tyagi avatar placeholder"
                  >
                    <circle cx="100" cy="100" r="100" fill="#F3E8FF" className="dark:fill-[#1E1B4B]" />
                    <path
                      d="M 60 70 L 45 90 L 60 110 M 140 70 L 155 90 L 140 110"
                      stroke="#7C3AED"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.4"
                    />
                    <path
                      d="M 100 50 C 82 50, 72 65, 72 82 C 72 98, 83 112, 100 112 C 117 112, 128 98, 128 82 C 128 65, 118 50, 100 50 Z"
                      fill="#7C3AED"
                      className="dark:fill-[#A78BFA]"
                    />
                    <path
                      d="M 50 165 C 50 135, 72 124, 100 124 C 128 124, 150 135, 150 165 C 150 175, 140 185, 100 185 C 60 185, 50 175, 50 165 Z"
                      fill="#581C87"
                      className="dark:fill-[#6D28D9]"
                    />
                  </svg>
                )}
              </div>

              {/* Floating badge: Role */}
              <div
                className="animate-float absolute -bottom-3 -left-4 sm:-left-6 bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl px-3.5 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold text-brand-text dark:text-brand-dark-text z-20"
                aria-hidden="true"
              >
                <Code2 className="w-4 h-4 text-brand-purple dark:text-brand-dark-purple shrink-0" />
                <div className="leading-tight">
                  <div className="font-bold text-brand-text dark:text-brand-dark-text">Frontend Dev</div>
                  <div className="text-[10px] text-brand-text-secondary dark:text-brand-dark-text-secondary">React · TypeScript</div>
                </div>
              </div>

              {/* Floating badge: Design */}
              <div
                className="animate-float-delayed absolute -top-3 -right-4 sm:-right-6 bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl px-3.5 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold text-brand-text dark:text-brand-dark-text z-20"
                aria-hidden="true"
              >
                <Palette className="w-4 h-4 text-brand-purple dark:text-brand-dark-purple shrink-0" />
                <div className="leading-tight">
                  <div className="font-bold text-brand-text dark:text-brand-dark-text">UI/UX</div>
                  <div className="text-[10px] text-brand-text-secondary dark:text-brand-dark-text-secondary">Figma · Design</div>
                </div>
              </div>

              {/* Floating badge: Availability */}
              <div
                className="absolute top-4 -left-8 sm:-left-10 bg-white dark:bg-brand-dark-card border border-emerald-200 dark:border-emerald-800/60 rounded-xl px-2.5 py-1.5 shadow-lg flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 z-20"
                aria-hidden="true"
              >
                <Sparkles className="w-3 h-3" />
                <span>Open to Work</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in delay-800 absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-text-secondary dark:text-brand-dark-text-secondary opacity-50">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce-gentle" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
};
