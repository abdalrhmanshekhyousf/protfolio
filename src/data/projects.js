// art: الرسمة المتحركة لكل مشروع (diagram | heart | receipt | cap)
// preview/poster: حط الفيديوهات بـ public/previews — إذا مو موجودة بتظهر الرسمة المتحركة بدالها
export const projects = [
  {
    id: 'bunyan',
    art: 'diagram',
    name: { ar: 'بُنيان', en: 'Bunyan' },
    desc: {
      ar: 'بيحوّل وصف النظام لمتطلبات، مخططات UML، وتصميم قاعدة بيانات بالذكاء الاصطناعي.',
      en: 'Turns a system description into requirements, UML diagrams and a database design with AI.',
    },
    features: {
      ar: ['استخراج المتطلبات والكيانات تلقائياً', 'خمس مخططات UML بـ Mermaid', 'توليد SQL وتقرير PDF'],
      en: ['Automatic requirements & entity extraction', 'Five UML diagrams with Mermaid', 'SQL generation and a PDF report'],
    },
    stack: ['React 19', 'Firebase', 'Gemini', 'Mermaid', 'Tailwind'],
    live: 'https://bunyan-b69ea.web.app',
    repo: 'https://github.com/abdalrhmanshekhyousf/Bunyan',
    preview: null, // '/previews/bunyan.webm'
    poster: null, // '/previews/bunyan.webp'
  },
  {
    id: 'nabd',
    art: 'heart',
    name: { ar: 'نبض', en: 'Nabd' },
    desc: {
      ar: 'منصّة لإدارة المستشفيات، لحظية ومتعددة المستشفيات.',
      en: 'A real-time, multi-hospital management platform.',
    },
    features: {
      ar: ['تحديثات لحظية بين الأقسام بـ Socket.io', 'عدة مستشفيات بنظام واحد', 'دخول آمن وصلاحيات حسب الدور (JWT)'],
      en: ['Real-time updates across departments via Socket.io', 'Multiple hospitals in one system', 'Secure login and role-based permissions (JWT)'],
    },
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.io', 'TanStack Query'],
    live: null,
    repo: 'https://github.com/abdalrhmanshekhyousf/nabd',
    preview: null, // '/previews/nabd.webm' — جولة مسجّلة (تاسك 55)
    poster: null,
  },
  {
    id: 'modir',
    art: 'receipt',
    name: { ar: 'مدير', en: 'Modir' },
    desc: {
      ar: 'نظام نقاط بيع وإدارة للمحلات والمطاعم.',
      en: 'Point-of-sale and management system for shops and restaurants.',
    },
    features: {
      ar: ['بيع سريع بالباركود', 'فواتير PDF', 'تقارير وإحصائيات المبيعات'],
      en: ['Fast barcode checkout', 'PDF invoices', 'Sales reports and charts'],
    },
    stack: ['React', 'Firebase', 'Recharts', 'React Router'],
    live: 'https://modir-app.vercel.app',
    repo: 'https://github.com/abdalrhmanshekhyousf/modir-app',
    preview: null,
    poster: null,
  },
  {
    id: 'golden-school',
    art: 'cap',
    name: { ar: 'Golden School', en: 'Golden School' },
    desc: { ar: 'موقع مدرسة بتصميم عصري ومتجاوب.', en: 'A modern, responsive school website.' },
    features: {
      ar: ['صفحات للأقسام والأنشطة', 'تصميم متجاوب لكل الشاشات', 'منشور على Vercel'],
      en: ['Pages for departments and activities', 'Responsive on every screen', 'Deployed on Vercel'],
    },
    stack: ['React', 'Tailwind', 'Vercel'],
    live: 'https://golden-school-gules.vercel.app',
    repo: 'https://github.com/abdalrhmanshekhyousf/Golden-school',
    preview: null,
    poster: null,
  },
];
