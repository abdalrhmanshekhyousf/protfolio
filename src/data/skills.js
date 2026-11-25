import { Layout, Server, Sparkles, ShieldCheck } from 'lucide-react';

export const skills = [
  { id: 'front', icon: Layout, title: { ar: 'الواجهات', en: 'Frontend' },
    items: ['React 19', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'Motion', 'TanStack Query', 'Zustand', 'i18next'] },
  { id: 'back', icon: Server, title: { ar: 'إلمام بالـ Backend', en: 'Backend (familiar)' },
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.io', 'JWT', 'Firebase', 'Firestore', 'REST APIs'] },
  { id: 'ai', icon: Sparkles, title: { ar: 'الذكاء الاصطناعي', en: 'AI' },
    items: ['Gemini', 'Prompt Engineering', 'Structured Output', 'Mermaid'] },
  { id: 'ops', icon: ShieldCheck, title: { ar: 'الجودة والنشر', en: 'Quality & Deploy' },
    items: ['Git', 'GitHub', 'Vercel', 'Firebase Hosting', 'Security Rules', 'Lighthouse'] },
];
