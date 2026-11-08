import { EducationItem, ExperienceItem } from '../types.js';

export const educationData: EducationItem = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering',
  institution: 'CGC University, Mohali',
  location: 'Mohali / Chandigarh, India',
  duration: '2023 – 2027',
  grade: 'CGPA: 8.16 / 10',
  highlights: [
    'Focus on frontend engineering, user interface design, and web technologies',
    'Comprehensive coursework in Data Structures, Algorithms, OOP with Java, DBMS, and Computer Networks',
    'Practical hands-on lab development and component-driven interface prototyping',
  ],
};

export const experienceData: ExperienceItem[] = [
  {
    title: 'College-Based Summer Technical Training',
    type: 'Academic Summer Internship / Training',
    organization: 'CGC University, Mohali',
    duration: '2 Months',
    description:
      'Participated in an intensive college-based summer technical program focused on core Java programming concepts, object-oriented software design, and the CompTIA Network+ networking curriculum.',
    skills: ['Java', 'Object-Oriented Programming', 'Computer Networks (CompTIA Network+ Curriculum)', 'Problem Solving'],
    note: 'College-conducted summer technical training module.',
  },
];
