# Najmelgadra

واجهة ويب عربية لنظام نجم الغدراء للمقاولات.

## تشغيل المعاينة

يتطلب Node.js. لا توجد حزم إضافية مطلوبة.

```powershell
npm.cmd run dev
```

أو:

```sh
node preview-server.js
```

افتح الرابط الظاهر في الطرفية. المنفذ الافتراضي هو `4173`، ويختار الخادم منفذًا متاحًا تلقائيًا إذا كان مشغولًا. لإيقاف الخادم اضغط `Ctrl+C`.

## الملفات الرئيسية

- `index.html`: هيكل الواجهة.
- `styles.css`: التنسيق.
- `app.js`: وظائف التطبيق.
- `assets/`: الصور.
- `PROJECT_REQUIREMENTS.md`: متطلبات المشروع.
- `BACKEND_DATA_MODEL.md`: نموذج بيانات الخادم المقترح.
- `BACKEND_PROVIDER_COMPARISON.md`: مقارنة خيارات الخادم.
