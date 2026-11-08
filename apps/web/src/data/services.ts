import { Service } from '../types.js';

export const services: Service[] = [
  {
    id: 'responsive-web-dev',
    title: 'Responsive Website Development',
    shortDesc: 'Mobile-first, high-performance web applications built with React and TypeScript.',
    deliverables: [
      'Mobile, tablet, and desktop responsive layouts',
      'Clean, modular, and reusable React components',
      'High-speed page loads and accessible markup',
      'Production-ready, well-structured codebase',
    ],
    serviceType: 'Responsive Website Development',
  },
  {
    id: 'landing-page-dev',
    title: 'Landing Page Development',
    shortDesc: 'High-impact landing pages for modern products, founders, and creative projects.',
    deliverables: [
      'Visual storytelling tailored to your brand identity',
      'Optimized conversion sections and contact flows',
      'Fluid micro-interactions and scroll experiences',
      'Fast Core Web Vitals and SEO readiness',
    ],
    serviceType: 'Landing Page Development',
  },
  {
    id: 'figma-to-code',
    title: 'Figma-to-Code Implementation',
    shortDesc: 'Pixel-accurate, responsive code translation from your Figma or design specifications.',
    deliverables: [
      'Exact fidelity to design tokens, typography, and spacing',
      'Component breakdown matching design hierarchy',
      'Hover, active, and accessible focus states',
      'Clean Tailwind CSS or CSS utility integration',
    ],
    serviceType: 'Figma-to-Code Implementation',
  },
  {
    id: 'frontend-ui-refinement',
    title: 'Frontend UI Improvements',
    shortDesc: 'Polishing existing web apps for superior usability, consistency, and responsive behavior.',
    deliverables: [
      'Resolving cross-device and mobile display bugs',
      'Improving typography, alignment, and visual rhythm',
      'Enhancing accessibility (WCAG AA contrast & keyboard nav)',
      'Refactoring messy stylesheets into organized components',
    ],
    serviceType: 'Frontend UI Improvements',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Understand your project goals, target audience, and key functional requirements.',
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'Map out interface structure, component architecture, and design tokens.',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Develop the user interface using clean, type-safe React and modern styling.',
  },
  {
    step: '04',
    title: 'Test',
    desc: 'Verify cross-browser responsiveness, accessibility, and form workflows.',
  },
  {
    step: '05',
    title: 'Deliver',
    desc: 'Deploy to modern hosting platforms and deliver cleanly documented code.',
  },
];
