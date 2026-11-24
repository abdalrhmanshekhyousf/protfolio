# Abdalrhman Shekh Yousf — Portfolio

**🔗 https://protfolio-beta-liard-67.vercel.app**

موقع شخصي بالعربي والإنجليزي، فاتح وداكن، مبني بـ React 19 وTailwind CSS v4 وMotion وi18next.

## التشغيل

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run icons    # يولّد PNG الشعار وصور المشاركة من ملفات SVG بـ public/
```

## وين بعدّل

- `src/data/profile.js` — الروابط والإيميل والأرقام
- `src/data/projects.js` — المشاريع (نص بلغتين، تقنيات، روابط، فيديو اختياري)
- `src/data/skills.js` — المهارات
- `src/locales/ar.json` و `en.json` — كل نصوص الواجهة

## النشر

Vercel: اربط المستودع، الإعدادات الافتراضية لـ Vite بتكفي (Build: `npm run build`، Output: `dist`).
