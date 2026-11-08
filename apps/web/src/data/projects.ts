import { Project } from '../types.js';

export const projects: Project[] = [
  {
    id: 'echelon',
    number: '01',
    title: 'Echelon — Clothing E-commerce Website',
    subtitle: 'Modern apparel storefront with clean typography and layout hierarchy',
    slug: 'echelon',
    description:
      'A clothing e-commerce experience focused on clean presentation, responsive layouts, and a consistent visual identity.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Frontend Architecture'],
    liveUrl: 'https://echelon.echelonstudio.workers.dev/',
    repoUrl: undefined, // Repository link to be supplied
    hasCaseStudy: true,
    featured: true,
    overview:
      'Echelon is an apparel e-commerce interface built to demonstrate high-fashion minimal aesthetics combined with responsive web engineering. It emphasizes clean typographic contrast, intuitive product browsing, responsive category filters, and an uncluttered visual hierarchy.',
    problem:
      'Many e-commerce templates suffer from visual clutter, confusing navigation patterns, and sluggish mobile interactions. The goal was to build a streamlined, visually restrained apparel interface where imagery and typography guide the user seamlessly.',
    role: 'Lead Frontend Developer & UI Designer — Created the component library, layout system, responsive product grids, and interactive states from concept to deployment.',
    techStack: [
      {
        category: 'Frontend Core',
        items: ['React 18', 'TypeScript', 'Vite'],
      },
      {
        category: 'Styling & Layout',
        items: ['Tailwind CSS', 'Mobile-first Grid & Flexbox', 'Custom Micro-interactions'],
      },
      {
        category: 'Deployment',
        items: ['Cloudflare Workers / Pages'],
      },
    ],
    features: [
      'Responsive multi-breakpoint product catalogue grid with fluid typography',
      'Interactive product modal and detail presentation view',
      'Categorized visual browsing (Menswear, Womenswear, Curated Collections)',
      'Cart drawer UI preview with state synchronization',
      'Fluid layout adjustments across mobile, tablet, and widescreen displays',
    ],
    challengesAndSolutions: [
      {
        challenge: 'Maintaining razor-sharp image presentation without introducing high initial page weights.',
        solution:
          'Utilized modern responsive image formatting and aspect-ratio preservation containers to prevent Cumulative Layout Shift (CLS).',
      },
      {
        challenge: 'Designing a modern fashion aesthetic while ensuring accessible contrast ratios.',
        solution:
          'Standardized text contrast to meet WCAG AA standards using high-contrast slate text against clean warm-white surfaces.',
      },
    ],
    notes: 'Note: Payment gateway and order checkout are front-end design representations; live transaction processing is not enabled.',
  },
  {
    id: 'ai-saas-dashboard',
    number: '02',
    title: 'AI SaaS Dashboard',
    subtitle: 'Structured SaaS analytics and AI interaction workspace',
    slug: 'ai-saas-dashboard',
    description:
      'A dashboard concept exploring a structured interface for AI-powered workflows, usage information, and product features.',
    tags: ['React', 'API Integration', 'UI/UX Design', 'Tailwind CSS', 'Dashboard Architecture'],
    liveUrl: 'https://ai-saas-dashboard-9azy.onrender.com/',
    repoUrl: undefined, // Repository link to be supplied
    hasCaseStudy: true,
    featured: true,
    overview:
      'The AI SaaS Dashboard explores structured interfaces for modern generative AI applications. It combines interactive workspaces, token consumption indicators, prompt testing playgrounds, and subscription tier visual representations.',
    problem:
      'AI tools often provide complex configuration options that overwhelm non-technical users. The objective was to design a balanced dashboard layout providing deep functional access while keeping navigation logical and distraction-free.',
    role: 'Frontend Architect & UI Designer — Structured dashboard navigation, data visualization widgets, conversation history feeds, and responsive sidebar navigation.',
    techStack: [
      {
        category: 'Frontend Core',
        items: ['React', 'JavaScript / TypeScript', 'Component State Management'],
      },
      {
        category: 'UI & Icons',
        items: ['Tailwind CSS', 'Lucide Icons', 'Responsive Sidebar Drawer'],
      },
      {
        category: 'Deployment',
        items: ['Render Cloud Platform'],
      },
    ],
    features: [
      'Multi-section layout: Overview, Prompt Playground, Usage Analytics, and Account Tiers',
      'Responsive collapsible sidebar navigation with active route highlights',
      'Token consumption meters and metric cards designed with high scannability',
      'AI generation prompt & response simulation interface with markdown preview',
      'Lightweight interactive filters for workspace switching',
    ],
    challengesAndSolutions: [
      {
        challenge: 'Organizing complex multi-pane information into a clean single-viewport experience on desktop and manageable flow on mobile.',
        solution:
          'Engineered a responsive layout switching between a multi-column persistent view on wide screens and a tabbed drawer pattern on mobile.',
      },
      {
        challenge: 'Displaying analytical data without heavy charting dependencies.',
        solution:
          'Constructed custom lightweight SVG and flex-based progress meters that load instantly with zero external charting bundle overhead.',
      },
    ],
    notes: 'Note: Usage metrics and token balances represent prototype simulation data designed for interface evaluation.',
  },
  {
    id: 'ui-ux-mobile-app',
    number: '03',
    title: 'UI/UX Mobile Application Design',
    subtitle: 'User-centered mobile product design and interactive design system in Figma',
    slug: 'ui-ux-mobile-app',
    description:
      'A high-fidelity mobile application design crafted in Figma featuring user research, component systems, accessible typography, and interactive micro-interactions.',
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Mobile App', 'Wireframing', 'User Research'],
    liveUrl: undefined,
    repoUrl: undefined,
    hasCaseStudy: true,
    featured: true,
    overview:
      'The UI/UX Mobile Application Design project demonstrates an end-to-end product design workflow from user personas and journey mapping to interactive Figma prototypes and scalable component systems.',
    problem:
      'Mobile users often experience high drop-off rates due to cognitive overload and convoluted multi-step navigation. The challenge was to simplify complex user journeys into an effortless, tactile mobile experience.',
    role: 'Lead UI/UX Designer — Conducted competitive benchmarking, designed wireframes, established color tokens, typographic hierarchy, and animated prototypes.',
    techStack: [
      {
        category: 'Design Tools',
        items: ['Figma', 'FigJam', 'Auto-Layout', 'Component Variants'],
      },
      {
        category: 'Methodology',
        items: ['User Journey Mapping', 'Wireframing', 'Interactive Prototyping', 'Usability Testing'],
      },
      {
        category: 'Design Systems',
        items: ['Atomic Design Tokens', 'WCAG AA Accessibility', 'Dark & Light Themes'],
      },
    ],
    features: [
      'Comprehensive design system with reusable typography, color tokens, and elevation levels',
      'High-fidelity interactive prototype demonstrating key onboarding and conversion flows',
      'Accessibility-first color contrast meeting WCAG AA standards across light and dark modes',
      'Micro-interaction animations for bottom sheets, tab navigation, and form validation',
      'Developer handoff documentation with spacing tokens and component specifications',
    ],
    challengesAndSolutions: [
      {
        challenge: 'Creating a modern aesthetic while preserving optimal thumb-reach ergonomic zones on large mobile displays.',
        solution:
          'Positioned primary action buttons and navigation menus within the natural thumb zone at the lower half of the screen, reducing stretch friction.',
      },
      {
        challenge: 'Ensuring seamless design-to-code handoff for frontend developers.',
        solution:
          'Mapped Figma variables and component naming directly to Tailwind CSS utility conventions and spacing tokens.',
      },
    ],
    notes: 'Interactive Figma prototype and design system specs available upon request.',
  },
  {
    id: 'react-blog',
    number: '04',
    title: 'React Blog App',
    subtitle: 'Content publishing web app powered by React and Appwrite BaaS',
    slug: 'react-blog',
    description:
      'A blog application built with React and Appwrite, focused on content presentation and backend integration.',
    tags: ['React', 'Appwrite', 'BaaS Integration', 'Database', 'Authentication'],
    liveUrl: undefined,
    repoUrl: undefined,
    hasCaseStudy: true,
    featured: false,
    overview:
      'The React Blog App demonstrates end-to-end integration between a React single-page frontend and Appwrite Backend-as-a-Service. It features authentication, database collections for posts, rich content rendering, and responsive reading views.',
    problem:
      'Demonstrating reliable client-side state synchronization with a real backend service, including error handling, session management, and CRUD operations.',
    role: 'Full-Stack Developer — Built the React frontend client, configured Appwrite collections, created authentication flows, and implemented post management.',
    techStack: [
      {
        category: 'Frontend',
        items: ['React', 'React Router', 'CSS3 / Tailwind'],
      },
      {
        category: 'Backend as a Service',
        items: ['Appwrite Cloud', 'Database Collections', 'User Authentication'],
      },
      {
        category: 'Data Management',
        items: ['REST API Client', 'Local Session Persistence'],
      },
    ],
    features: [
      'Complete article listing with pagination and tag filtering',
      'Individual article reader page with clean typography and reading estimates',
      'Appwrite user authentication flow (Sign in, Sign up, Session state)',
      'Post creation and editing interface with form validation',
      'Optimistic UI updates and graceful API error boundaries',
    ],
    challengesAndSolutions: [
      {
        challenge: 'Handling session expiration gracefully without breaking the user reading experience.',
        solution:
          'Implemented an authentication context provider that verifies active tokens on load and cleanly degrades to read-only mode if the session expires.',
      },
      {
        challenge: 'Ensuring long-form reading typography is comfortable across all device viewports.',
        solution:
          'Adopted an editorial layout with 65-character line lengths, generous line heights, and subtle contrast shifts.',
      },
    ],
    notes: 'Live demo URL and public repository are currently being finalized for production hosting.',
  },
];
