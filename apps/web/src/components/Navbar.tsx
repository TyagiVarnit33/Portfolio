import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site.js';
import { ThemeToggle } from './ThemeToggle.js';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const hasResume =
    siteConfig.links.resume && siteConfig.links.resume !== '[ADD_RESUME_PDF]';

  // Scroll spy to highlight active section on the homepage
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/90 dark:bg-brand-dark-bg/90 backdrop-blur-md border-brand-border dark:border-brand-dark-border shadow-subtle'
            : 'bg-white/70 dark:bg-brand-dark-bg/70 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/#hero"
            className="flex items-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-md"
            aria-label="Varnit Tyagi Homepage"
          >
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-brand-text dark:text-brand-dark-text group-hover:text-brand-purple dark:group-hover:text-brand-dark-purple transition-colors">
              VARNIT TYAGI
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-purple inline-block" aria-hidden="true" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => {
              const sectionId = link.href.replace('/#', '');
              const isActive = location.pathname === '/' && activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
                    isActive
                      ? 'text-brand-purple dark:text-brand-dark-purple font-semibold'
                      : 'text-brand-text-secondary dark:text-brand-dark-text-secondary hover:text-brand-text dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/40'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand-purple dark:bg-brand-dark-purple rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Theme Toggle & Resume */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {hasResume ? (
              <div className="flex items-center gap-2">
                {/* View in tab */}
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-brand-border dark:border-brand-dark-border text-xs font-semibold text-brand-text dark:text-brand-dark-text hover:border-brand-purple hover:text-brand-purple dark:hover:border-brand-dark-purple dark:hover:text-brand-dark-purple transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-label="View resume in browser"
                  title="View Resume"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-purple" aria-hidden="true" />
                  <span>Resume</span>
                  <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                </a>
                {/* Download */}
                <a
                  href={siteConfig.links.resume}
                  download="Varnit-Tyagi-Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  aria-label="Download Varnit Tyagi Resume PDF"
                  title="Download Resume PDF"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download</span>
                </a>
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-brand-border dark:border-brand-dark-border text-xs font-semibold text-brand-text-secondary dark:text-brand-dark-text-secondary transition-colors cursor-default opacity-60"
                title="Resume PDF not configured yet"
                aria-disabled="true"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Resume</span>
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-brand-text dark:text-brand-dark-text hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-brand-dark-card border-l border-brand-border dark:border-brand-dark-border shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-border dark:border-brand-dark-border mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-brand-text dark:text-brand-dark-text">VARNIT TYAGI</span>
                  <span className="w-2 h-2 rounded-full bg-brand-purple inline-block" aria-hidden="true" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-brand-text-secondary hover:text-brand-text dark:hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
                {siteConfig.navLinks.map((link) => {
                  const sectionId = link.href.replace('/#', '');
                  const isActive = location.pathname === '/' && activeSection === sectionId;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-purple-light dark:bg-brand-dark-purple/20 text-brand-purple dark:text-brand-dark-purple font-semibold'
                          : 'text-brand-text dark:text-brand-dark-text hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" aria-hidden="true" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-brand-border dark:border-brand-dark-border space-y-3">
              {hasResume ? (
                <>
                  <a
                    href={siteConfig.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border text-sm font-semibold text-brand-text dark:text-brand-dark-text hover:border-brand-purple transition-colors"
                    aria-label="View resume in browser"
                  >
                    <FileText className="w-4 h-4 text-brand-purple" aria-hidden="true" />
                    <span>View Resume</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                  </a>
                  <a
                    href={siteConfig.links.resume}
                    download="Varnit-Tyagi-Resume.pdf"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-hover text-white text-sm font-semibold transition-colors shadow-sm"
                    aria-label="Download Varnit Tyagi Resume PDF"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Download Resume</span>
                  </a>
                </>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border text-sm font-semibold text-brand-text-secondary dark:text-brand-dark-text-secondary opacity-60">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Resume (Coming Soon)</span>
                </div>
              )}

              <p className="text-center text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                {siteConfig.education.institution} • {siteConfig.education.duration}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
