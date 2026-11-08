import { SkillCategory } from '../types.js';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    description: 'Crafting responsive, accessible, and high-performance user interfaces.',
    skills: [
      { name: 'React', inProjects: true },
      { name: 'TypeScript', inProjects: true },
      { name: 'JavaScript (ES6+)', inProjects: true },
      { name: 'HTML5 & Semantic Web', inProjects: true },
      { name: 'CSS3 & Modern Layouts', inProjects: true },
      { name: 'Tailwind CSS', inProjects: true },
    ],
  },
  {
    title: 'Design & Prototyping',
    description: 'Translating product concepts into intuitive digital user experiences.',
    skills: [
      { name: 'Figma', inProjects: true },
      { name: 'UI/UX Design', inProjects: true },
      { name: 'Responsive Web Design', inProjects: true },
      { name: 'Interface Prototyping', inProjects: true },
      { name: 'Design Systems', inProjects: true },
      { name: 'Typography & Visual Hierarchy', inProjects: true },
    ],
  },
  {
    title: 'Computer Science & Core',
    description: 'Solid academic computer science foundation and problem-solving.',
    skills: [
      { name: 'Java', inProjects: true },
      { name: 'Data Structures & Algorithms', inProjects: true },
      { name: 'Object-Oriented Programming (OOP)', inProjects: true },
      { name: 'Database Management Systems (DBMS)', inProjects: true },
      { name: 'Computer Networks', inProjects: true },
    ],
  },
  {
    title: 'Backend & Development Tools',
    description: 'Integration, version control, and development workflow tooling.',
    skills: [
      { name: 'Git', inProjects: true },
      { name: 'GitHub', inProjects: true },
      { name: 'REST APIs', inProjects: true },
      { name: 'Appwrite', inProjects: true },
      { name: 'Node.js & Express', inProjects: true },
      { name: 'PostgreSQL', inProjects: true },
    ],
  },
];
