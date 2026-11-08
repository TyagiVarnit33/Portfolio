import React from 'react';
import { X, FileText, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/site.js';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isConfigured = siteConfig.links.resume !== '[ADD_RESUME_PDF]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-brand-text-secondary hover:text-brand-text dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-brand-purple-light dark:bg-brand-dark-purple/20 rounded-xl text-brand-purple dark:text-brand-dark-purple">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 id="resume-modal-title" className="text-xl font-bold text-brand-text dark:text-brand-dark-text">
              Varnit Tyagi — Resume
            </h2>
            <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary">
              Frontend Developer & UI/UX Designer
            </p>
          </div>
        </div>

        {isConfigured ? (
          <div className="space-y-4">
            <p className="text-sm text-brand-text dark:text-brand-dark-text leading-relaxed">
              Click below to view or download the verified curriculum vitae:
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-brand-text dark:text-brand-dark-text">
            <div className="p-4 bg-brand-bg-secondary dark:bg-brand-dark-bg/60 rounded-xl border border-brand-border dark:border-brand-dark-border space-y-2">
              <div className="font-semibold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                Resume PDF Configuration Placeholder
              </div>
              <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary leading-relaxed">
                The resume link is currently configured as a placeholder (<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">[ADD_RESUME_PDF]</code>). To attach your real resume, place your <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">resume.pdf</code> into the <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">apps/web/public/</code> directory and update <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">siteConfig.links.resume = '/resume.pdf'</code>.
              </p>
            </div>

            <div className="space-y-2 border-t border-brand-border dark:border-brand-dark-border pt-4">
              <h3 className="font-semibold text-brand-text dark:text-brand-dark-text">Quick Academic Summary:</h3>
              <ul className="space-y-1.5 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-purple shrink-0" />
                  <span><strong>Degree:</strong> B.Tech in Computer Science and Engineering (2023–2027)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-purple shrink-0" />
                  <span><strong>Institution:</strong> CGC University, Mohali (Punjab, India)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-purple shrink-0" />
                  <span><strong>Academic Standing:</strong> Current CGPA 8.16 / 10</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-purple shrink-0" />
                  <span><strong>Specialization:</strong> React, TypeScript, UI/UX Design & Responsive Layouts</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-purple hover:underline"
              >
                Connect on LinkedIn <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
