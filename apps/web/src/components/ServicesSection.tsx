import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { services, processSteps } from '../data/services.js';

interface ServicesSectionProps {
  onSelectService?: (serviceType: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const handleDiscussClick = (serviceType: string) => {
    if (onSelectService) {
      onSelectService(serviceType);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" aria-label="Freelance and Collaboration Services" className="py-20 bg-brand-bg-secondary/40 dark:bg-brand-dark-bg-secondary/30 border-y border-brand-border dark:border-brand-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
            Services & Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-2">
            How I can help
          </h2>
          <p className="text-base text-brand-text-secondary dark:text-brand-dark-text-secondary mt-3">
            Available for select freelance engagements, interface conversions, and frontend engineering contracts.
          </p>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-purple/50 dark:hover:border-brand-dark-purple/50 transition-all duration-300 hover:shadow-card-hover group"
            >
              <div>
                <h3 className="text-xl font-bold text-brand-text dark:text-brand-dark-text group-hover:text-brand-purple transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-semibold text-brand-text dark:text-brand-dark-text uppercase tracking-wider block">
                    Key Deliverables:
                  </span>
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                      <div className="p-0.5 rounded-full bg-brand-purple-light dark:bg-brand-dark-purple/20 text-brand-purple dark:text-brand-dark-purple shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discuss CTA */}
              <button
                type="button"
                onClick={() => handleDiscussClick(service.serviceType)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-brand-purple/30 text-brand-purple dark:text-brand-dark-purple hover:bg-brand-purple hover:text-white dark:hover:bg-brand-dark-purple dark:hover:text-white text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* 5-Step Process Section */}
        <div className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
              Workflow
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-text dark:text-brand-dark-text mt-1">
              Structured from Concept to Delivery
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="relative space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-purple dark:text-brand-dark-purple px-2 py-0.5 rounded bg-brand-purple-light dark:bg-brand-dark-purple/20">
                    {step.step}
                  </span>
                  <h4 className="font-bold text-sm text-brand-text dark:text-brand-dark-text">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
