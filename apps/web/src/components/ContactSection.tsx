import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Clock, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.js';
import { siteConfig } from '../config/site.js';

interface ContactSectionProps {
  selectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service_type: selectedService || '',
    message: '',
    budget_range: '',
    project_deadline: '',
  });

  // Keep service_type updated if prop changes
  React.useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service_type: selectedService }));
    }
  }, [selectedService]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please write a message of at least 10 characters';
    } else if (formData.message.trim().length > 3000) {
      errors.message = 'Message must be under 3000 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          service_type: '',
          message: '',
          budget_range: '',
          project_deadline: '',
        });
        setFieldErrors({});
      } else if (response.status === 429) {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Too many submissions from this connection. Please try again later.');
      } else {
        setSubmitStatus('error');
        if (data.details && Array.isArray(data.details)) {
          const detailMap: Record<string, string> = {};
          data.details.forEach((d: { field: string; message: string }) => {
            detailMap[d.field] = d.message;
          });
          setFieldErrors(detailMap);
          setStatusMessage('Please fix the indicated fields below.');
        } else {
          setStatusMessage(data.error || 'Failed to submit form. Please try again.');
        }
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Network connection error. Please verify your connection or use the mailto link below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-label="Contact and Inquiries" className="py-20 bg-brand-bg-secondary/50 dark:bg-brand-dark-bg-secondary/40 border-t border-brand-border dark:border-brand-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-2">
            Have a project in mind?
          </h2>
          <p className="text-base text-brand-text-secondary dark:text-brand-dark-text-secondary mt-3">
            Whether you're hiring for a frontend role or planning a web project, I'd be happy to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              
              <div>
                <h3 className="font-bold text-lg text-brand-text dark:text-brand-dark-text">
                  Direct Channels
                </h3>
                <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary mt-1">
                  Connect with me directly on professional platforms:
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border hover:border-brand-purple hover:bg-brand-purple-light/20 dark:hover:bg-brand-dark-purple/10 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-brand-text dark:text-brand-dark-text group-hover:text-brand-purple block">
                      LinkedIn Profile
                    </span>
                    <span className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                      varnit-tyagi
                    </span>
                  </div>
                </a>

                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border hover:border-brand-purple hover:bg-brand-purple-light/20 dark:hover:bg-brand-dark-purple/10 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-brand-text dark:text-brand-dark-text group-hover:text-brand-purple block">
                      GitHub Profile
                    </span>
                    <span className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                      TyagiVarnit33
                    </span>
                  </div>
                </a>

                <div className="p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg-secondary/40 dark:bg-brand-dark-bg/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1">
                    <Mail className="w-4 h-4 text-brand-purple" />
                    <span>Email Inquiries</span>
                  </div>
                  <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                    Use the contact form here or email directly once public address is configured.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border dark:border-brand-dark-border">
                <span className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-purple" />
                  Typically responds within 24–48 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 sm:p-8 shadow-sm">
              
              {/* Submission Status Alerts */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Message Received!</p>
                    <p className="text-xs mt-0.5">{statusMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3 text-red-800 dark:text-red-300">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Unable to Send Message</p>
                    <p className="text-xs mt-0.5">{statusMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                      Your Name <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border ${
                        fieldErrors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-brand-border dark:border-brand-dark-border focus:ring-brand-purple'
                      } text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                      Your Email <span className="text-brand-purple">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border ${
                        fieldErrors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-brand-border dark:border-brand-dark-border focus:ring-brand-purple'
                      } text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 mt-1">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service Type Selection & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                      Service / Project Type
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                    >
                      <option value="">General Inquiry / Hiring</option>
                      <option value="Responsive Website Development">Responsive Website Development</option>
                      <option value="Landing Page Development">Landing Page Development</option>
                      <option value="Figma-to-Code Implementation">Figma-to-Code Implementation</option>
                      <option value="Frontend UI Improvements">Frontend UI Improvements</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                    />
                  </div>
                </div>

                {/* Optional Budget & Deadline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                      Estimated Budget (Optional)
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget_range}
                      onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                    >
                      <option value="">Select range...</option>
                      <option value="< $500">&lt; $500</option>
                      <option value="$500 - $1,500">$500 - $1,500</option>
                      <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                      <option value="$3,000+">$3,000+</option>
                      <option value="Full-time / Internship Compensation">Full-time / Internship Compensation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-deadline" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                      Target Timeline / Deadline (Optional)
                    </label>
                    <input
                      id="contact-deadline"
                      type="date"
                      value={formData.project_deadline}
                      onChange={(e) => setFormData({ ...formData, project_deadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
                    Your Message <span className="text-brand-purple">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, goals, or role specifications..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border ${
                      fieldErrors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-brand-border dark:border-brand-dark-border focus:ring-brand-purple'
                    } text-brand-text dark:text-brand-dark-text text-sm focus:outline-none focus:ring-2 transition-all resize-y`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {fieldErrors.message ? (
                      <p className="text-[11px] text-red-600 dark:text-red-400">{fieldErrors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[11px] text-brand-text-secondary dark:text-brand-dark-text-secondary">
                      {formData.message.length} / 3000
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-purple hover:bg-brand-purple-hover disabled:opacity-70 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-brand-purple/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
