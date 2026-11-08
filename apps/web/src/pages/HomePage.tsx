import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection.js';
import { ProjectCard } from '../components/ProjectCard.js';
import { AboutSection } from '../components/AboutSection.js';
import { SkillsSection } from '../components/SkillsSection.js';
import { ServicesSection } from '../components/ServicesSection.js';
import { ExperienceSection } from '../components/ExperienceSection.js';
import { ContactSection } from '../components/ContactSection.js';
import { projects } from '../data/projects.js';

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Selected Work Section */}
      <section id="projects" aria-label="Selected Projects" className="py-20 border-t border-brand-border dark:border-brand-dark-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple dark:text-brand-dark-purple">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-2">
              Selected Work
            </h2>
            <p className="text-base text-brand-text-secondary dark:text-brand-dark-text-secondary mt-3">
              A selection of projects where development, usability, and design come together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Skills Section */}
      <SkillsSection />

      {/* 5. Services Section */}
      <ServicesSection onSelectService={(service) => setSelectedService(service)} />

      {/* 6. Experience & Milestones Section */}
      <ExperienceSection />

      {/* 7. Contact Section */}
      <ContactSection selectedService={selectedService} />
    </div>
  );
};
