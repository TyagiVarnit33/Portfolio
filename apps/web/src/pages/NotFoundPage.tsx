import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md w-full bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-8 shadow-sm space-y-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-purple-light dark:bg-brand-dark-purple/20 text-brand-purple flex items-center justify-center">
          <Compass className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-purple">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
            Page Not Found
          </h1>
          <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary">
            The page you are looking for doesn't exist or has moved.
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
