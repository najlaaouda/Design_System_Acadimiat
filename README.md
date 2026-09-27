# نظام تصميم أكاديميات

**الحالة:** معتمد · **النطاق:** لوحة التحكم (`src/app/views/admin`) · **الإصدار:** 1.0

> **المصدر الوحيد للحقيقة** لكل قرار بصري وسلوكي في لوحة التحكم.
> أُعيد تنظيمه في 2026-09-26 بهيكل الطبقات الأربع. المحتوى نفسه بلا حذف، والملفات القديمة (`components/` و`01-FOUNDATIONS.md` و`02-ICONS.md` و`03-UX-WRITING.md` و`tokens/README.md`) حُذفت بعد نقلها — انظر [خريطة النقل](#خريطة-النقل).

---

## بنية المجلد

```
Design-System/
├── README.md              ← أنت هنا: الخريطة، ترتيب القراءة، الفهرس، حالة التنفيذ، الناقص
├── DESIGN.md              ← نظرة عامة: السياق، المبادئ، الطبقات الأربع، الفرض، الحوكمة
├── CLAUDE.md              ← قواعد الذكاء الاصطناعي: أوامر قصيرة، ✗/✓، «إذا حدث ← افعل»
├── specs/
│   ├── _templates/        ← قوالب: component.md · foundation.md · pattern.md
│   ├── foundations/       ← الطبقة 1 — الأسس: ملف لكل أساس
│   ├── tokens/            ← الطبقة 2 — token-reference.md: كل توكن، متى، ومتى لا
│   ├── atoms/             ← الطبقة 3 — عنصر واحد لا يتجزأ
│   ├── molecules/                    مكوّن من عدة عناصر
│   ├── organisms/                    جزء كبير من الصفحة
│   └── patterns/          ← الطبقة 4 — قرارات تجمع عدة مكوّنات
├── tokens/
│   ├── tokens.css         ← ★ القيم نفسها — يحمّلها angular.json من هذا المسار
│   └── tokens.js          ← جسر Tailwind الموروث (مراجع var() لا قيم)
├── migration/             ← دليل الترحيل، خريطة Bootstrap، عوائق صفحة المستخدمين
├── TECHNICAL-DEBT.md      ← سجلّ مُلحَق: قرارات مؤجَّلة تمسّ أكثر من ميزة
└── BACKEND-REQUIREMENTS.md← سجلّ مُلحَق: ما تحتاجه الواجهة من الخادم
```

**التوثيق هنا، والكود في [`src/app/shared/ui/`](../src/app/shared/ui/).** السجلّان يُضاف إليهما ولا يُعاد كتابتهما.

---

## ترتيب القراءة

| الخطوة | الملف | لماذا |
|---|---|---|
| 1 | [`DESIGN.md`](./DESIGN.md) | الصورة الكاملة: ما النظام، ومبادئه، وطبقاته، ومن يقرّر |
| 2 | [`specs/foundations/color.md`](./specs/foundations/color.md) | السلالم، والألوان الدلالية، وقاعدة النص الحاكمة |
| 3 | [`specs/foundations/spacing.md`](./specs/foundations/spacing.md) · [`typography.md`](./specs/foundations/typography.md) · [`radius.md`](./specs/foundations/radius.md) | القيم المسموحة وحدها |
| 4 | [`specs/tokens/token-reference.md`](./specs/tokens/token-reference.md) | العقد: أيّ توكن، متى، ومتى لا |
| 5 | [`specs/atoms/button.md`](./specs/atoms/button.md) | مواصفة مكوّن كاملة على القالب |
| 6 | [`specs/patterns/states.md`](./specs/patterns/states.md) | نمط كامل على القالب |
| 7 | [`CLAUDE.md`](./CLAUDE.md) | القواعد المفروضة — تُقرأ أخيرًا فتُفهم أسبابها |

---

## فهرس المواصفات

### الأسس — `specs/foundations/`
- [`color.md`](./specs/foundations/color.md) — السلالم (OKLCH)، الألوان الدلالية، التباين
- [`typography.md`](./specs/foundations/typography.md) — الخط والمقاسات والأوزان
- [`spacing.md`](./specs/foundations/spacing.md) — سلّم المسافات
- [`radius.md`](./specs/foundations/radius.md) — أنصاف الأقطار
- [`elevation.md`](./specs/foundations/elevation.md) — الظلال
- [`motion.md`](./specs/foundations/motion.md) — الحركة
- [`controls.md`](./specs/foundations/controls.md) — عناصر التحكم وأهداف اللمس
- [`z-index.md`](./specs/foundations/z-index.md) — ترتيب الطبقات
- [`rtl.md`](./specs/foundations/rtl.md) — الاتجاه والخصائص المنطقية
- [`accessibility.md`](./specs/foundations/accessibility.md) — إمكانية الوصول في الأسس
- [`dark-mode.md`](./specs/foundations/dark-mode.md) — الوضع الداكن
- [`iconography.md`](./specs/foundations/iconography.md) — الأيقونات: `src/icons/`، المقاسات، شكل واحد لكل معنى
- [`ux-writing.md`](./specs/foundations/ux-writing.md) — كتابة تجربة المستخدم

### التوكنز — `specs/tokens/`
- [`token-reference.md`](./specs/tokens/token-reference.md) — كل توكن دلالي بقيمته ومتى يُستعمل ومتى لا، وبادئات توكنز المكوّنات

### الذرّات — `specs/atoms/`
- [`button.md`](./specs/atoms/button.md) — الأزرار وتسلسلها
- [`icon.md`](./specs/atoms/icon.md) — الأيقونة `<ds-icon>`: من `src/icons/`، مضمَّنة وقت البناء
- [`badge-status.md`](./specs/atoms/badge-status.md) — الشارات والحالات
- [`checkbox-radio-switch.md`](./specs/atoms/checkbox-radio-switch.md) — الاختيار والتبديل: أيّها تستخدم، والقواعد المشتركة
- [`switch.md`](./specs/atoms/switch.md) — المفتاح: تشغيل وإيقاف فوري، كرة عليها وجه يدور ويبتسم حين يشتعل
- [`tooltip.md`](./specs/atoms/tooltip.md) — التلميحات
- [`file-name.md`](./specs/atoms/file-name.md) — اسم الملف: اتجاهه من أوّل حرف فيه («الدرس 1.mp4» من اليمين)، ويُقصّ الاسم ويبقى الامتداد
- [`type-cover.md`](./specs/atoms/type-cover.md) — غلاف النوع: غلاف المحتوى بلا صورة: مشهد يطلّ من أسفل لوحة العلامة
- [`avatar.md`](./specs/atoms/avatar.md) — الصورة الشخصية `<app-avatar>`: 24/32/40، والبديل الحرفان (**جديد** 2026-09-24 — لم يكن له ملف)

### الجزيئات — `specs/molecules/`
**الحقول**
- [`input-and-form.md`](./specs/molecules/input-and-form.md) — الحقول والنماذج
- [`select.md`](./specs/molecules/select.md) — القوائم المنسدلة
- [`search-field.md`](./specs/molecules/search-field.md) — حقل البحث: اقتراحات أثناء الكتابة، ويطابق «احمد» مع «أحمد»
- [`phone.md`](./specs/molecules/phone.md) — حقل رقم الجوال: الدولة تُكتشف، والنائب يتبعها، والقيمة E.164 واحدة
- [`color-field.md`](./specs/molecules/color-field.md) — حقل اللون: الحاضنة داخل الحقل تفتح منتقي المتصفح، والرمز ‎#RRGGBB بعدها، ويُعتمد عند الإغلاق أو المغادرة لا مع كل حرف
- [`date-field.md`](./specs/molecules/date-field.md) — حقل التاريخ (يوم واحد): شكل حقل الفترة وتقويمه بشهر واحد، ونقرة على اليوم تختاره وتغلق، و«مسح التاريخ» في الذيل
- [`date-range-field.md`](./specs/molecules/date-range-field.md) — حقل الفترة الزمنية: يعرض ما اختير («الشهر الماضي» أو «12 أغسطس – 3 سبتمبر 2026»)، ويفتح فترات جاهزة وتقويمًا بدائرتين وشريط بينهما، و«عرض النتائج»
- [`upload.md`](./specs/molecules/upload.md) — رفع الصور: حقلٌ في النموذج لا عنصر مستقل، ومظهر المربّع (`appearance="tile"`) لشعار يُعرف بشكله
- [`drop-zone.md`](./specs/molecules/drop-zone.md) — منطقة الإفلات: تسحب الملفات إلى أي مكان في الصفحة فتظهر «أفلت الملفات هنا» — لسحب الملفات وحده
- [`optional-field.md`](./specs/molecules/optional-field.md) — الحقل خلف «إضافة…»: حقل اختياري يظهر مكان رابطه بالضغط، والتركيز ينتقل إليه
- [`setting-chip.md`](./specs/molecules/setting-chip.md) — رقاقة الإعداد: تعرض القيمة المختارة («النبرة: احترافي ودود») وتفتح لوحة خيارات جاهزة وحقلًا حرًّا، ونوع «إضافة» بحدّ مقطّع
- [`segmented.md`](./specs/molecules/segmented.md) — المفتاح المقسّم: خياران أو ثلاثة متلاصقة لطريقة عرض واحدة («كمبيوتر / جوال»)، بدلالة radiogroup

**التنقّل والطبقات الصغيرة**
- [`menu.md`](./specs/molecules/menu.md) — القائمة ⋯: إجراءات ثانوية على عنصر، و«حذف» آخرها بالأحمر وخطّ فوقه (`appMenuItem danger`)
- [`overlay.md`](./specs/molecules/overlay.md) — اللوحة العائمة وحبس التركيز: ما يفتح القائمة ⋯ ولوحة الفلترة فوق الصفحة، ويُبقي لوحة المفاتيح داخل الدرج — بلا مكتبة
- [`breadcrumb.md`](./specs/molecules/breadcrumb.md) — مسار التنقّل: الطيّ، aria-current، ولماذا التبويب ليس درجة
- [`tabs.md`](./specs/molecules/tabs.md) — التبويبات: متى تبويب ومتى صفحة ومتى فلتر، والفرق بين المكوّنين، وقائمة الأقسام العمودية بشريط ينزلق (`orientation="vertical"`)
- [`sortable.md`](./specs/molecules/sortable.md) — الترتيب بالسحب: مقبض يُسحب بالفأرة واللمس، ويُحرَّك بالسهمين ويُحفظ بعد التوقف — بلا مكتبة

**التغذية الراجعة**
- [`notice-strip.md`](./specs/molecules/notice-strip.md) — شريط الإشارة: شعارات ثم جملة قيد تحت العنوان · بوابات الدفع
- [`alert-toast.md`](./specs/molecules/alert-toast.md) — التنبيهات وToast والإشعارات

**عرض البيانات والبطاقات**
- [`stat.md`](./specs/molecules/stat.md) — مربّع الرقم: تسمية هادئة فوق رقم بارز وتلميحٌ يشرح ما يدخل فيه — بلا أيقونة ملوّنة ولا خلفية
- [`distribution-bar.md`](./specs/molecules/distribution-bar.md) — شريط التوزيع: مبلغ واحد مقسوم على أجزاء قليلة بنسبها وقيمها، وشارة اختيارية لكل جزء («مثال») · مقسوم على أجزاء في شريط واحد وخريطة ألوان بجانبه، والرقم مع اللون دائمًا
- [`card.md`](./specs/molecules/card.md) — البطاقات
- [`collapsible-card.md`](./specs/molecules/collapsible-card.md) — البطاقة التي تُطوى: عنوانٌ زرّ بسهم بلا ساق يفتح قسمًا اختياريًّا، مطويّة ابتداءً
- [`accordion.md`](./specs/molecules/accordion.md) — الطيّ: أقسام متتالية، كلٌّ بطاقة برأس رمادي وجسم أبيض، والمفتوحة بظلّ
- [`connection-card.md`](./specs/molecules/connection-card.md) — بطاقة الربط: تطبيق أو بوابة دفع بحسابه المتصل وإجراء واحد يتبع الحالة، وملخص «2 من 6 متصلة» فوق الشبكة
- [`social-link-card.md`](./specs/molecules/social-link-card.md) — بطاقة حساب التواصل: منصّة واحدة بلون علامتها، اللون فيها هو الحالة — فلا شارة ولا فلتر
- [`bank-account-item.md`](./specs/molecules/bank-account-item.md) — بلوك الحساب البنكي في «طريقة سحب الأرباح»: البنك وصاحبه وآخر خانات IBAN، والبلوك كلّه يُضغط ليصير الحساب الأساسي — بحدّ ملوّن وخلفية، بلا دائرة اختيار ظاهرة

### الكائنات — `specs/organisms/`
- [`table.md`](./specs/organisms/table.md) — الجداول والترقيم
- [`table-columns.md`](./specs/organisms/table-columns.md) — زرّ «الأعمدة»: إظهار أعمدة الجدول وإخفاؤها وترتيبها بالسحب، والعمود الذي يُعرف به الصفّ ثابت؛ ويرتّب بطاقات «نظرة عامة» ويُخفيها («تخصيص البطاقات»)
- [`chart.md`](./specs/organisms/chart.md) — المخططات: المنحنى للاتجاه عبر الزمن، والحلقة لأجزاء كلٍّ واحد، والأعمدة لفئات معدودة، والأعمدة المتراكمة لتقسيم فئات قليلة يُقارن حجمها — ولكلٍّ بديل جدوليّ بجانبه
- [`sidebar.md`](./specs/organisms/sidebar.md) — الشريط الجانبي: الأوضاع الثلاثة، المجموعات، اللوحة العائمة
- [`app-header.md`](./specs/organisms/app-header.md) — الشريط العلوي: الشعار، زرّ الطيّ، اسم الأكاديمية، الحساب
- [`page-layout.md`](./specs/organisms/page-layout.md) — تخطيط الصفحة: الحشوة الموحّدة من الجهات الأربع، ورأس الصفحة (العنوان والوصف تحته)
- [`modal-drawer.md`](./specs/organisms/modal-drawer.md) — الحوارات والأدراج
- [`sheet.md`](./specs/organisms/sheet.md) — النافذة بملء الشاشة: إنشاء وتحرير رئيسي فوق الصفحة المعتمة، بمسار له رابطه ولوحة إعدادات تُطوى
- [`detail-panel.md`](./specs/organisms/detail-panel.md) — لوحة التفاصيل (Master-detail): تجلس بجوار القائمة لا فوقها فيبقى الجدول مقروءًا وقابلًا للنقر، وفيها تنقّل «طلب 3 من 24» — بلا حجاب ولا حبس تركيز
- [`save-bar.md`](./specs/organisms/save-bar.md) — شريط الحفظ الثابت: «حفظ» صفحة من عدّة بطاقات في شريط بعرض الكانفاس ملتصق بحافّته السفلى، بخطّ فوقه، والزرّ باهت حتى يتغيّر شيء
- [`shelf-tabs.md`](./specs/organisms/shelf-tabs.md) — رفوف التصفّح: بطاقات تعمل تبويبًا بنوع المحتوى وعدده («فيديوهات 42»)، وخلفها ورقة تطلّ — مجموعة لا مجلد
- [`upload-tray.md`](./specs/organisms/upload-tray.md) — قائمة الرفع: بطاقة عائمة بتقدّم كل ملف، و«تعذر الرفع» بسببه وزرّ إعادة المحاولة، تُطوى ولا تمنع الصفحة

### الأنماط — `specs/patterns/`
- [`states.md`](./specs/patterns/states.md) — الحالات الفارغة والتحميل والخطأ
- [`filtering.md`](./specs/patterns/filtering.md) — نمط الفلترة المعتمد: مفتاح الحالة، لوحة «فلترة» بعمودين، رقائق المطبَّق، الترتيب المستقل، «لا نتائج» بزرّ لكل فلتر
- [`dialogs.md`](./specs/patterns/dialogs.md) — نافذة أم درج أم ورقة أم لوحة تفاصيل، ومكان الإشارة، والحجم (**جديد** 2026-09-24 — مجمَّع)
- [`forms.md`](./specs/patterns/forms.md) — ترتيب النموذج، علامتا المطلوب والاختياري، التحقق، حقلان في صفّ (**جديد** 2026-09-24 — مجمَّع)
- [`page-structure.md`](./specs/patterns/page-structure.md) — رأس الصفحة، التبويبات، فتات الخبز، الفلاتر
- [`page-naming.md`](./specs/patterns/page-naming.md) — اسم الصفحة واحد في كل مكان، ومتى يظهر مسار التنقّل (**جديد** 2026-09-24 — مجمَّع)

---

## حالة التنفيذ

| المكوّن | الكود | الحالة |
|---|---|---|
| Button | [`shared/ui/button`](../src/app/shared/ui/button/) | ✅ على التوكنز |
| Icon | [`shared/ui/icon`](../src/app/shared/ui/icon/) | ✅ جديد · [`icon.md`](./specs/atoms/icon.md) · يرفض الاسم غير الموجود |
| Input / Textarea | [`shared/ui/form-field`](../src/app/shared/ui/form-field/) | ✅ على التوكنز · 94 موضعًا في 25 قالبًا (قيس 2026-09-26) · [`input-and-form.md`](./specs/molecules/input-and-form.md) |
| Checkbox | [`shared/ui/checkbox`](../src/app/shared/ui/checkbox/) | ✅ على التوكنز |
| Radio | [`shared/ui/radio`](../src/app/shared/ui/radio/) | ✅ على التوكنز |
| Switch | [`shared/ui/toggle`](../src/app/shared/ui/toggle/) | ✅ على التوكنز · أُصلح خلل RTL |
| Select | [`standalone/native-select`](../src/app/standalone/native-select/) | ◑ على التوكنز داخل `form-field` · خارجه ⏳ · [`select.md`](./specs/molecules/select.md) |
| Table | [`shared/ui/table`](../src/app/shared/ui/table/) | ✅ جديد · 48 موضعًا في 33 ملفًّا (قيس 2026-09-26) · [`table.md`](./specs/organisms/table.md) |
| Pagination | [`shared/ui/table/paginator`](../src/app/shared/ui/table/) | ⏳ يحتاج ترقية |
| Chart (مخطط خطي/منحنٍ) | [`shared/ui/chart`](../src/app/shared/ui/chart/) | ✅ جديد (2026-09-17) · غلاف توكنز فوق ApexCharts · أوّل متبنٍّ: سجل المسحوبات · [`chart.md`](./specs/organisms/chart.md) |
| Chart (حلقة وأعمدة) | [`shared/ui/chart`](../src/app/shared/ui/chart/) | ✅ جديد (2026-09-21) · `app-donut-chart` لأجزاء كلٍّ واحد و`app-bar-chart` لفئات معدودة · أوّل متبنٍّ: التقارير والإحصائيات · [`chart.md`](./specs/organisms/chart.md) |
| Stat (مربّع الرقم) | [`shared/ui/stat`](../src/app/shared/ui/stat/) | ✅ جديد (2026-09-21) · بديل `fin-stat` و`cpd-stat` و`ac-stat` · أوّل متبنٍّ: «الأرقام السريعة» · [`stat.md`](./specs/molecules/stat.md) · النقل في DEBT-016 |
| Card | [`shared/ui/card`](../src/app/shared/ui/card/) | ✅ جديد |
| Connection card | [`shared/ui/connection-card`](../src/app/shared/ui/connection-card/) | ✅ جديد (2026-09-11) · بطاقة الربط + الملخص · صفحة التطبيقات · بوابات الدفع (2026-09-12) · [`connection-card.md`](./specs/molecules/connection-card.md) |
| Type cover (غلاف النوع) | [`shared/ui/type-cover`](../src/app/shared/ui/type-cover/) | ✅ جديد (2026-09-17) · غلاف المحتوى بلا صورة: مشهد يطلّ من أسفل لوحة العلامة · أوّل متبنٍّ: إدارة الملفات · [`type-cover.md`](./specs/atoms/type-cover.md) |
| Badge | [`shared/ui/badge`](../src/app/shared/ui/badge/) | ✅ جديد |
| Status | [`shared/ui/badge/status`](../src/app/shared/ui/badge/) | ✅ جديد · خريطة مركزية |
| Alert | [`shared/ui/alert`](../src/app/shared/ui/alert/) | ✅ جديد |
| Notice strip | [`shared/ui/notice-strip`](../src/app/shared/ui/notice-strip/) | ✅ جديد (2026-09-12) · شريط الإشارة: شعارات ثم جملة قيد تحت العنوان · بوابات الدفع · [`notice-strip.md`](./specs/molecules/notice-strip.md) |
| Toast | [`shared/ui/toast`](../src/app/shared/ui/toast/) | ✅ جديد · أُعيد رسمه (2026-09-26): بطاقة بغسلة لون الحالة ومربّع أيقونة، أسفل الصفحة بجوار الشريط الجانبي · [`alert-toast.md`](./specs/molecules/alert-toast.md) · مستعمل في 42 ملفًّا، ونُقلت إليه صفحة الدورات (2026-09-26)؛ رسائل SweetAlert في اللوحة (~680 في 171 ملفًّا) لم تُنقل بعد |
| Tooltip | [`shared/ui/tooltip`](../src/app/shared/ui/tooltip/) | ✅ على التوكنز |
| Drawer | [`shared/ui/drawer`](../src/app/shared/ui/drawer/) | ✅ جديد · في شاشتين وثلاثة مكوّنات على الجوال (قيس 2026-09-26) · [`modal-drawer.md`](./specs/organisms/modal-drawer.md) |
| Modal | [`shared/custom-dialog`](../src/app/shared/custom-dialog/) | ⏳ يحتاج ترقية |
| Tabs | [`shared/ui/tabs`](../src/app/shared/ui/tabs/) | ✅ على التوكنز · `app-tab-nav` للمسارات |
| Accordion | [`shared/ui/accordion`](../src/app/shared/ui/accordion/) | ✅ على التوكنز (2026-09-19) · بطاقة برأس منحسر وسهم `arrow/arrow-down-02` · 11 شاشة · [`accordion.md`](./specs/molecules/accordion.md) |
| Menu / Dropdown | [`shared/ui/menu`](../src/app/shared/ui/menu/) | ⏳ يحتاج ترقية |
| Progress | [`shared/ui/progress-bar`](../src/app/shared/ui/progress-bar/) | ⏳ يحتاج ترقية |
| Empty / Error state | [`shared/ui/empty-state`](../src/app/shared/ui/empty-state/) | ✅ جديد |
| Skeleton | [`shared/ui/skeleton`](../src/app/shared/ui/skeleton/) | ✅ جديد |
| Page header | [`shared/ui/page-header`](../src/app/shared/ui/page-header/) | ✅ على التوكنز · [`page-layout.md`](./specs/organisms/page-layout.md) · 45 شاشة (قيس 2026-09-26) · `DEBT-013` |
| Page padding | [`views/admin/components/base`](../src/app/views/admin/components/base/base.component.scss) | ✅ في القشرة · `--ds-page-padding-*` · [`page-layout.md`](./specs/organisms/page-layout.md) |
| Filter bar | [`shared/ui/filter-bar`](../src/app/shared/ui/filter-bar/) | ✅ جديد · مظهر `inline` تحت شريط الجدول وتمييز عدد عربي (2026-09-10) · [`filtering.md`](./specs/patterns/filtering.md) |
| Filter panel | [`shared/ui/filter-bar/filter-panel`](../src/app/shared/ui/filter-bar/filter-panel.component.ts) | ✅ جديد (2026-09-10) · أوّل متبنٍّ: المقالات · [`filtering.md`](./specs/patterns/filtering.md) |
| Segmented (مفتاح مقطّع) | [`shared/ui/radio`](../src/app/shared/ui/radio/) — `appRadioGroup appearance="segmented"` | ✅ جديد (2026-09-10) · مظهر لا مكوّن · 3 شاشات (قيس 2026-09-26) · [`checkbox-radio-switch.md`](./specs/atoms/checkbox-radio-switch.md) |
| Chip select (رقائق الاختيار) | [`shared/ui/radio`](../src/app/shared/ui/radio/) — `appRadioGroup appearance="chip"` | ✅ جديد (2026-09-18) · مظهر لا مكوّن · حقل نموذج بشكل [رقاقة الإعداد](./specs/molecules/setting-chip.md) · أوّل متبنٍّ: «نطاق الكوبون» · [`checkbox-radio-switch.md`](./specs/atoms/checkbox-radio-switch.md) |
| Sidebar | [`views/global/deznav-native`](../src/app/views/global/deznav-native/) | ✅ موثّق · [`sidebar.md`](./specs/organisms/sidebar.md) |
| Breadcrumb | [`shared/ui/breadcrumb`](../src/app/shared/ui/breadcrumb/) | ✅ جديد · [`breadcrumb.md`](./specs/molecules/breadcrumb.md) |
| Breadcrumbs (محوِّل) | [`standalone/breadcrumbs`](../src/app/standalone/breadcrumbs/) | ✅ يشتقّ الدرجات من `PATHES` ويعرضها بالمكوّن الجديد |
| Date / Time picker | [`standalone/date-pickers`](../src/app/standalone/date-pickers/) | ⏳ يحتاج ترقية |
| File upload | `input[type=file]` ×64 · `[appUploadContainer]` ×41 · ngx-dropzone ×12 · Uppy ×7 | ⛔ أربعة أنظمة · مواصفة `<app-upload>` في [`upload.md`](./specs/molecules/upload.md) · `DEBT-008` |
| Avatar | [`shared/ui/avatar`](../src/app/shared/ui/avatar/) | ✅ · [`avatar.md`](./specs/atoms/avatar.md) · خلل مفتوح في نافذة تفاصيل الطلب (§15) |

> الجدول منقول من README القديم بنصّه (عدا الروابط وسطر Avatar). بعض خاناته تخالف رأس بيانات المواصفة — انظر [التعارضات](#5-تعارضات-في-الأصل-تنتظر-قرارًا)، البندان 47–49.

---

## الاصطلاحات

- **قالب لكل نوع.** المكوّن ستة عشر قسمًا، والأساس ثمانية، والنمط ثلاثة عشر — العناوين نفسها وبالترتيب نفسه في كل ملف ([`_templates/`](./specs/_templates/)).
- **رأس بيانات في أول كل ملف:** `title` · `name` · `tier` · `status` · `source` (مسار الكود) · `origin` (الملف الأصلي) · `keywords` · `last_verified`.
- **«متى لا» بجوار «متى» دائمًا**، وكل «لا» معها البديل ورابطه.
- **القسم الخالي لا يُحذف.** يُكتب تحته أحد سطرين:
  - `> ⚠️ **غير موثّق بعد:** …` — قسم إلزامي ينقصه محتوى. هذه فجوات حقيقية تنتظر قرارًا.
  - `> لا ينطبق — …` — قسم لا معنى له في هذا المكوّن، مع السبب.
- **أمثلة ✓/✗ متقابلة** في الأسس و`CLAUDE.md`.
- **روابط في آخر كل ملف:** يستخدم · يُستخدم في · ذو صلة · الكود · الأصل.
- **القرار بين مكوّنات يسكن في النمط**، والمكوّن يشير إليه بسطر. لا يُكتب النصّ نفسه في مكانين.
- **الترقيم § في `iconography.md` و`ux-writing.md` محفوظ** كما في الأصل، لأن ملفات كثيرة تشير إلى «§11» و«§6، §8».

---

## خريطة النقل

نُقل كل شيء في 2026-09-24 وحُذف الأصل في 2026-09-26. وحُدّثت المسارات القديمة في كل المشروع (الروابط، وتعليقات الكود، و`CLAUDE.md` الجذر، والسجلات). أما حقل `origin` في رأس بيانات كل مواصفة فيحفظ المسار القديم كما هو، سجلًّا لمصدرها.

| الأصل في `Design-System/` | الجديد |
|---|---|
| `01-FOUNDATIONS.md` §1–§11 | `specs/foundations/` — `color` · `typography` · `spacing` · `radius` · `elevation` · `motion` · `controls` · `z-index` · `rtl` · `accessibility` · `dark-mode` |
| `02-ICONS.md` | `specs/foundations/iconography.md` |
| `03-UX-WRITING.md` | `specs/foundations/ux-writing.md` |
| `tokens/README.md` + `tokens.css` | `specs/tokens/token-reference.md` |
| `components/states.md` | `specs/patterns/states.md` |
| `components/filters.md` | `specs/patterns/filtering.md` |
| `components/navigation.md` | `specs/patterns/page-structure.md` |
| `components/<الباقي>.md` | `specs/atoms/` · `molecules/` · `organisms/` بالاسم نفسه |
| `README.md` · `components/README.md` | هذا الملف و`DESIGN.md` و`CLAUDE.md` |
| — | `specs/patterns/dialogs.md` · `forms.md` · `page-naming.md` — مجمَّعة من أقسام المكوّنات وقرارات `CLAUDE.md` الجذر |
| — | `specs/atoms/avatar.md` — من `CLAUDE.md` الجذر والكود |

---

## ما هو ناقص

نُقل المحتوى كله بلا حذف. والقالب الثابت كشف ما لم يكن ظاهرًا: أقسام لم تُكتب قط، وقرارات متعارضة بين ملفين. لا شيء من هذا حُسم أثناء النقل — كلّه ينتظر قرارًا.

**بالأرقام (بعد مراجعة 2026-09-26):** 71 ملفًا · **64** موضع «غير موثّق بعد» في 35 ملفًا (كانت 131 في 53) · 72 موضع «لا ينطبق» · من نحو 50 تعارضًا في الأصل حُسم 15 بالكود (✅ في §5)، ووُجد في المراجعة تعارضات وخلل جديد في الشاشات (§5 و§6).

### 1. أقسام تنتظر محتوى

بعد مراجعة كل المواصفات مقابل الكود (2026-09-26) نزلت الفجوات من **131 إلى 64** ومن 53 ملفًا إلى 35. ما بقي لا يعرفه الكود — قرارات تنتظر صاحبها («متى لا يُستعمل»، شكل الخطأ، سلوك الجوال).

<details>
<summary>35 ملفًا — الأقسام التي بقي تحتها «غير موثّق بعد»</summary>

| الملف | الأقسام |
|---|---|
| [`atoms/avatar.md`](./specs/atoms/avatar.md) | §2 متى لا تستخدمه · §10 RTL |
| [`atoms/checkbox-radio-switch.md`](./specs/atoms/checkbox-radio-switch.md) | §5 الحالات |
| [`atoms/file-name.md`](./specs/atoms/file-name.md) | §2 متى لا تستخدمه · §5 الحالات |
| [`atoms/switch.md`](./specs/atoms/switch.md) | §5 الحالات |
| [`atoms/type-cover.md`](./specs/atoms/type-cover.md) | §5 الحالات |
| [`foundations/accessibility.md`](./specs/foundations/accessibility.md) | §5 شجرة القرار · §6 افعل / لا تفعل |
| [`foundations/controls.md`](./specs/foundations/controls.md) | §4 قواعد إلزامية · §6 افعل / لا تفعل |
| [`foundations/dark-mode.md`](./specs/foundations/dark-mode.md) | §2 القيم · §3 الاستعمال · §5 شجرة القرار · §6 افعل / لا تفعل |
| [`foundations/elevation.md`](./specs/foundations/elevation.md) | §4 قواعد إلزامية · §6 افعل / لا تفعل |
| [`foundations/motion.md`](./specs/foundations/motion.md) | §6 افعل / لا تفعل |
| [`foundations/rtl.md`](./specs/foundations/rtl.md) | §5 شجرة القرار |
| [`foundations/spacing.md`](./specs/foundations/spacing.md) | §6 افعل / لا تفعل |
| [`foundations/typography.md`](./specs/foundations/typography.md) | §6 افعل / لا تفعل |
| [`foundations/z-index.md`](./specs/foundations/z-index.md) | §3 الاستعمال · §5 شجرة القرار · §6 افعل / لا تفعل |
| [`molecules/color-field.md`](./specs/molecules/color-field.md) | §9 الاستجابة |
| [`molecules/distribution-bar.md`](./specs/molecules/distribution-bar.md) | §5 الحالات · §9 الاستجابة |
| [`molecules/drop-zone.md`](./specs/molecules/drop-zone.md) | §9 الاستجابة · §14 ممنوع |
| [`molecules/input-and-form.md`](./specs/molecules/input-and-form.md) | §1 متى تستخدمه · §2 متى لا تستخدمه |
| [`molecules/menu.md`](./specs/molecules/menu.md) | §12 النصوص |
| [`molecules/optional-field.md`](./specs/molecules/optional-field.md) | §9 الاستجابة · §10 RTL |
| [`molecules/phone.md`](./specs/molecules/phone.md) | §2 متى لا تستخدمه · §9 الاستجابة |
| [`molecules/search-field.md`](./specs/molecules/search-field.md) | §9 الاستجابة |
| [`molecules/segmented.md`](./specs/molecules/segmented.md) | §5 الحالات · §9 الاستجابة |
| [`molecules/select.md`](./specs/molecules/select.md) | §4 الأنواع والمقاسات · §9 الاستجابة · §12 النصوص |
| [`molecules/setting-chip.md`](./specs/molecules/setting-chip.md) | §9 الاستجابة |
| [`molecules/social-link-card.md`](./specs/molecules/social-link-card.md) | §2 متى لا تستخدمه |
| [`molecules/upload.md`](./specs/molecules/upload.md) | §2 متى لا تستخدمه · §9 الاستجابة |
| [`organisms/chart.md`](./specs/organisms/chart.md) | §5 الحالات · §9 الاستجابة · §10 RTL |
| [`organisms/save-bar.md`](./specs/organisms/save-bar.md) | §14 ممنوع |
| [`organisms/shelf-tabs.md`](./specs/organisms/shelf-tabs.md) | §12 النصوص |
| [`organisms/table.md`](./specs/organisms/table.md) | §2 متى لا تستخدمه |
| [`organisms/upload-tray.md`](./specs/organisms/upload-tray.md) | §12 النصوص |
| [`patterns/forms.md`](./specs/patterns/forms.md) | §4 التشريح · §5 الأنواع · §8 RTL والاستجابة · §11 مثال |
| [`patterns/page-structure.md`](./specs/patterns/page-structure.md) | §1 متى تستخدمه |
| [`patterns/states.md`](./specs/patterns/states.md) | §2 متى لا تستخدمه · §7 القواعد |

</details>

**الأكثر تكرارًا:** §9 الاستجابة (11) · §2 متى لا تستخدمه (8) · §6 افعل / لا تفعل في الأسس (8) · §5 الحالات (7).

### 2. مكوّنات في الكود بلا مواصفة

في `src/app/shared/ui/` ولا ملف لها — **وكلها خارج لوحة التحكم**، فهي خارج نطاق هذا النظام:

| المكوّن | أين يُستعمل |
|---|---|
| `carousel` · `simple-carousel` · `product-cards-carousel` | الملف الشخصي للمتعلّم في موقع الأكاديمية |
| `progress-bar` | منطقة المتعلّم (دوراتي، الاختبارات، الخطة التدريبية) وصفحات القمع العامة |
| `simple-opt-in-form` · `slider` | غير مستعملين في أي شاشة |

و`canvas-sticky` موصوف داخل [`page-layout.md`](./specs/organisms/page-layout.md) لا في ملف خاص.

### 3. توكنز

- **في `tokens.css` بلا ذكر في الأسس:** `--ds-easing-standard/enter/exit` · `--ds-line-height-relaxed` · `--ds-touch-target-min` · `--ds-border-width-sm/md` · `--ds-container-max` · `--ds-prose-max` · `--ds-z-base` · `--ds-z-raised`. والأسس تقول إن ما ليس في جداولها غير مسموح — فإمّا تُضاف إليها وإمّا تُحذف.
- **مرجع معلّق:** `--ds-color-field-bg-readonly` في `tokens.js` و`DEBT-002`، وغير معرّف. المعرّف `--ds-field-bg-readonly`.
- **مقترحة ولم تُضف** (في `input-and-form.md`): `--ds-field-height-sm/-lg` · `-padding-x` · `-radius` · `-gap` · `-label-*` · `-hint-*` · `-error-color` · `--ds-color-field-placeholder`.
- **مواصفات لا تذكر توكنزها:** `distribution-bar` (`--ds-distribution-*`) · `shelf-tabs` (`--ds-shelf-*`).

### 4. أدوات وإجراءات غير موجودة

- بوابة آلية ترفض القيمة الخام في SCSS (لون hex، بكسل خارج السلّم، `z-index` رقمي) — القاعدة مكتوبة بلا فاحص.
- سجلّ تغييرات للنظام، وقاعدة لرفع رقم الإصدار.
- إجراء لإعادة تسمية توكن أو إلغائه.
- استثناءات البكسل المسموحة داخل SCSS المكوّن.

### 5. تعارضات في الأصل تنتظر قرارًا

كل تعارض مُعلَّم في موضعه بـ⚠️ أو مذكور في «الدَّين القائم». المعلَّم ✅ حسمه الكود في مراجعة 2026-09-26 (الكود طبّق أحد الطرفين فوُثّق)؛ والباقي ينتظر قرارًا.

<details>
<summary>نحو 50 تعارضًا مجمّعة بالموضوع</summary>

**القيم والتوكنز**

| # | الموضوع | الطرف الأول | الطرف الثاني |
|---|---|---|---|
| 1 | ترتيب النافذة والدرج | الأسس: النافذة 1050 والدرج 1055 | `tokens.css`: الدرج 1050 والنافذة 1055 |
| 2 | الفجوة بين الأيقونة والنص | الأسس §3: `space-1` (4) | الأيقونات §4 و`CLAUDE.md`: 8 دائمًا |
| 3 | الفجوة بين التسمية والحقل | جدول الأسس: 12 | رسم UI-15 في الملف نفسه: 8 |
| 4 | `radius-xl` | الأسس: لا يستعمله مكوّن | الشريط الجانبي المطويّ (2026-09-14) |
| 5 | ظلّ النافذة | الأسس: `elevation-3` | `--ds-modal-shadow`: `elevation-4` |
| 6 | لون `accent` | `tokens.css`: لشارة المالك | `badge-status`: الشارة على `warning` منذ 2026-09-15 |
| 7 | استدارة هيكل التحميل | `tokens.css`: `radius-md` | الأسس §4: `radius-xs` |
| 8 | `font-size-2xs` | «شارات دقيقة فقط» | تسمية الشريط المطويّ |
| 9 | من يقرأ التوكن الدلالي | `tokens/README`: المكوّن يقرأه | تعليق الزر في `tokens.css`: لا يقرأه مباشرة |
| 10 ✅ | التعطيل | «ليس شفافية — `action-disabled-*`» | `--ds-opacity-disabled` والزر بـ0.5؛ و`switch.md` نفسه: المسار والمقبض ≠ المسار وحده — **حُسم 2026-09-26:** الشفافية على المسار والمقبض داخله (`switch.md`) |
| 11 ✅ | استدارة الزر | `button.md`: 8/8/12 | `tokens.css` و`CLAUDE.md`: 12 للكل — **حُسم 2026-09-26:** 12 للمقاسات الثلاثة كما في `tokens.css` (`button.md`) |
| 12 | الصورة الشخصية | `CLAUDE.md`: استدارة 8؛ `REQ-004`: خلفية `brand-100` | `tokens.css`: `sm` = 6؛ الكود: `surface-sunken` |
| 13 | ارتفاع صف «الأعمدة» | «40 — `--ds-control-height-md`» | التوكن 44 |
| 14 | عرض عمود النص في الجدول | `CLAUDE.md`: «بعرض عنوان المقال» و`--ds-table-clamp-line-length` (60ch) | `table.md`: عنوان المقال `--ds-table-title-line-length` (281px) |
| 15 | القائمة المنسدلة | الترقية: ارتفاع 44 وحلقة `--ds-focus-ring` و`--ds-z-dropdown` | الحقل 40 والحلقة الملتصقة (`DEBT-005`) و2000 في الشيفرة |
| 16 ✅ | الرفّ المختار | `brand-solid` / `brand-border` | `tokens.css`: `brand-800` والورقة `brand-600` — **حُسم 2026-09-26:** `--ds-shelf-selected-*` كما في `tokens.css` (`shelf-tabs.md`) |

**النصوص**

| # | الموضوع | الطرف الأول | الطرف الثاني |
|---|---|---|---|
| 17 | كلمات الحالات | `ux-writing` §8: «فعال/غير فعال»، «متصل» | `badge-status`: «نشط/غير نشط»، «تم الربط/غير مرتبط» |
| 18 | التشكيل | قرار 2026-09-17: لا تشكيل في اللوحة | «جارٍ» (الرفع، الحالات)، «لم يُضف بعد» (بطاقة التواصل والكود)، «جارٍ التحقق…» و«من 12 تطبيقًا» (بطاقة الربط)، «ولّد بالذكاء الاصطناعي» (الزر) |
| 19 | الأرقام | 0-9 في كل الواجهة | «٦٢٪» (الرفع)، «٣٥٠ ر.س» (الجدول)، «٣ ملفات» (الشارات)، «١–٢٥ من ٤٠٠» (بنية الصفحة) |
| 20 | «لا نتائج» في القائمة المنسدلة | `notFoundText`: «لا توجد نتائج» | جدول الحالات: «لا توجد نتائج مطابقة لـ …» |
| 21 | فاصل مسار التنقّل | `‹` | `›` في مثال الطيّ |

**الأزرار والنوافذ**

| # | الموضوع | الطرف الأول | الطرف الثاني |
|---|---|---|---|
| 22 | ترتيب الأزرار | النافذة: «إلغاء» أولًا (2026-09-10) | النموذج و`06-UX-WRITING` §21: الأساسي أولًا |
| 23 | أزرار النافذة على الجوال | متجاوران بعرضين متساويين (2026-09-11) | مكدّسة بعرض كامل (§ الاستجابة، الذيل، النموذج) |
| 24 | النافذة `lg` (640) لعمودين | تكفي (جدول الأحجام، `tokens.css`) | تضيق — لذلك `xl` (2026-09-11، `CLAUDE.md`) |
| 25 ✅ | التركيز الأوّل في النافذة | أوّل حقل (2026-09-10) | جدول الوصول: زرّ الإغلاق — **حُسم 2026-09-26:** أوّل حقل (`modal-drawer.md`) |
| 26 ✅ | إعادة التركيز عند إغلاق الدرج | `dsFocusTrap` يعيده | مسؤولية المُستدعي — **حُسم 2026-09-26:** `dsFocusTrap` يعيده (`modal-drawer.md`) |
| 27 | درج بلا حجاب أم لوحة تفاصيل | درج `clear` لتفاصيل بجوار الجدول | `<app-detail-panel>` لقراءة سجلّ — ولا قاعدة فاصلة |
| 28 | عدد حقول النافذة | UI-12: ≤ 3 حقول | نوافذ `xl` بعمودين قائمة |
| 29 | التعديلات غير المحفوظة | `ConfirmUnsavedDialog` | `UnsavedDataGuard` على `ConfirmDialogComponent` |
| 30 | زرّ رأس البطاقة | جدول «المكان»: `sm` | «المقاس الافتراضي»: `md` (2026-09-21) |
| 31 | الأساسي في رأس الصفحة | «أقصى اليمين في RTL» | «أقصى اليسار» — في الملف نفسه |
| 32 | رأس الصفحة على الجوال | العنوان ثم الإجراء بعرض كامل | الإجراءات بجوار العنوان (2026-09-10) |

**المكوّنات**

| # | الموضوع | الطرف الأول | الطرف الثاني |
|---|---|---|---|
| 33 | مفتاحان مقطّعان | `appRadioGroup appearance="segmented"`: 2–5 خيارات، ارتفاع 40 | `<app-segmented>`: ≤ 3، ارتفاع 44/40، ألوان أخرى |
| 34 | التبويبات | بنية الصفحة: خط سفلي، النشط في الرابط، الأسهم للكل | `tabs.md`: مقطّع (2026-09-13)، `selectedIndex` بلا رابط، `app-tab-nav` بـTab |
| 35 ✅ | سهم زرّ الطيّ | `app-header`: `arrow-right-01` (ومثال `CLAUDE.md` الجذر) | `sidebar` والكود: `-02` بلا ساق — والأيقونات §11 تمنع ذات الساق — **حُسم 2026-09-26:** `arrow-right-02` بلا ساق، كالكود (`app-header.md`) |
| 36 ✅ | الشعار | قرار: 48 بعرض 128 | جدول الملف نفسه: 106.7×48 والرسم 40 — **حُسم 2026-09-26:** 128×48 برسم 48 (`app-header.md`) |
| 37 ✅ | `app-nav-header` | `sidebar.md` يصفه | `app-header.md`: دُمج وحُذف — **حُسم 2026-09-26:** دُمج في الشريط العلوي، والوصف في `sidebar.md` صُحّح |
| 38 ✅ | الشريط الجانبي | «خمس مجموعات»؛ ❌ خطّ فوق «الإعدادات» | «الستّ»؛ قرار 2026-09-23 بخطّ فوقها — **حُسم 2026-09-26:** «الإعدادات» مثبّتة أسفل الشريط بخطّ فوقها (قرار 2026-09-23)، والعدّ صُحّح (`sidebar.md`) |
| 39 ✅ | الحساب البنكي الأساسي | القرار 7: الشارة وحدها؛ القرار 6: لوح رمادي | الوصف: حدّ وخلفية؛ «لوح أبيض» — **حُسم 2026-09-26:** الشارة وحدها — القرار 7 (`bank-account-item.md`) |
| 40 ✅ | `appearance` في الشارة | 3 قيم | الكود: 4 (`'status'`) — **حُسم 2026-09-26:** أربع قيم (`badge-status.md`) |
| 41 ✅ | المخططات | «الحلقة والأعمدة لم تُبنَ»، ويقترح `fin-stat` | مبنيّة 2026-09-21؛ و`stat.md` يمنع `fin-stat` — **حُسم 2026-09-26:** الحلقة والأعمدة مبنيّتان، و`<app-stat>` قائم (`chart.md`) |
| 42 | «مقارنة المبيعات» | شريط التوزيع بشارة «مثال» | `chart.md` (2026-09-24): مخطط الخطين حلّ محلّه |
| 43 | رابط في شريط الإشارة | «لا رابط في آخر السطر» | القرار نفسه يسمح برابط الدليل |
| 44 | لوحة الورقة | فهرس المكوّنات: «تُطوى» | `sheet.md`: لا زرّ طيّ (2026-09-11) |
| 45 | مكتبة الأيقونات | `02-ICONS` §1 §6 وممنوعات README: Font Awesome وحدها | تصحيح الملف و`CLAUDE.md`: `src/icons/` |
| 46 | عدد الأيقونات | `CLAUDE.md`: 1,188 | `iconography.md`: 1,189 |

**حالة المكوّن**

| # | المكوّن | الطرف الأول | الطرف الثاني |
|---|---|---|---|
| 47 ✅ | `input-and-form` | `implemented` | فهرس الحالة: «صفر استخدام»؛ والملف: استعمال واحد — **حُسم 2026-09-26:** مستعمل: 94 موضعًا في 25 قالبًا — وسطر «حالة التنفيذ» صُحّح |
| 48 | `upload` · `filters` · `menu` | `implemented` · «المعتمد» · الشكل «ب» مطبّق | ⛔ أربعة أنظمة · `partial` · ⏳ يحتاج ترقية |
| 49 ✅ | الدرج · المفتاح المقطّع | «صفر استخدام» · «بلا مستخدم» | مستعمل في إدارة الملفات · فلتر حالة الربط — **حُسم 2026-09-26:** الدرج في شاشتين وثلاثة مكوّنات على الجوال؛ المفتاح المقطّع في 3 شاشات |
| 50 ✅ | `app-phone-input` | 17 ملفًا | 11 ملفًا — **حُسم 2026-09-26:** 11 قالبًا (`phone.md`، قيس 2026-09-26) |

</details>

### 6. خلل في الشاشات ظهر أثناء المراجعة

وجدته مراجعة المواصفات مقابل الكود (2026-09-24 و2026-09-26). **✅ = أُصلح في 2026-09-27** بطلب المستخدم («صلح»)؛ والباقي لم يُصلح بعد — كل بند مذكور أيضًا في §15 من مواصفته.

**ما يراه المستخدم**
- ✅ **ألوان أنواع الملفات لا تظهر في «إدارة الملفات»** — قرار 2026-09-16 (فيديو أخضر، صور برتقالي، PDF أحمر، صوت أزرق): الصفحة لا تمرّر `tone` إلى `<app-shelf-tabs>`، فالمربّعات رمادية كلها. [`shelf-tabs.md`](./specs/organisms/shelf-tabs.md)
- ✅ **صورة افتراضية بدل الحرفين** في نافذة تفاصيل الطلب (`order-details.component.ts` السطران 87 و100) — تفتحها «المدفوعات الملغاة» وتبويب «الطلبات» في صفحة العميل. [`avatar.md`](./specs/atoms/avatar.md)
- ✅ **«النشرة البريدية» ناقصة من الشريط الجانبي المطويّ** — لا تظهر في لوحة «التسويق» العائمة، فلا يُوصل إليها. [`sidebar.md`](./specs/organisms/sidebar.md)
- ✅ **زرّ إغلاق بعلامة × لا زرّ النظام** في الدرج `<app-drawer>` والتنبيه الثابت `<app-alert>` (قاعدة 2026-09-15). ⚠️ وبقيت الورقة `<app-sheet>` بزرّ `dsButton`: مواصفتها تصفه كذلك، فتعارض ينتظر قرارًا لا خلل.
- ✅ **نافذة ربط التطبيقات بلا «(مطلوب إدخاله)»** (`[requiredMark]="false"`) — وهي النافذة المرجعية في [`dialogs.md`](./specs/patterns/dialogs.md).
- **ارتفاع المنحنى لا يتغيّر** — مدخل `height` بلا أثر، فالمخطط 320 دائمًا (280 في «نظرة عامة» و300 في «مقارنة المبيعات» يُتجاهلان).
- **الزرّ أثناء التحميل يُخفي أيقونته اللاحقة** على عكس المقصود. [`button.md`](./specs/atoms/button.md)
- ✅ (في الشريطين ومكوّنات النظام وحوار التأكيد) · ⚠️ (في الصفحات: نحو 740 موضعًا في ~250 ملفًّا، أغلبها صفحات لم تُنقل) — **تشكيل في نصوص الواجهة** رغم قرار 2026-09-17: «يُفتح» و«طيّ» و«حالياً» في الشريطين، و«جارٍ» في الرفع، و«لم يُضف بعد» في بطاقة التواصل، و«يُحفظ/نُقل/أُلغي» في إعلانات السحب.

**إمكانية الوصول**
- حدّ مربّع الاختيار غير المحدَّد تباينه **1.71:1** (المطلوب 3:1)، ولا قاعدة له في وضع التباين القسري.
- رأس الفرز `[appSortHeader]` ليس زرًّا: لا يصله التركيز ولا لوحة المفاتيح، و`aria-sort` لا يُكتب.
- أهداف لمس دون 44: زرّ النسخ (24) ومقبض السحب (32) في الجدول، وزرّا النسخ والفتح في بطاقة التواصل، وهدف زرّ تلميح مربّع الرقم مُزاح عن الزرّ.
- القائمة المنسدلة: لا `aria-activedescendant`، والخيار المميَّز بخلفية تباينها 1.09:1.
- عدد الإشعارات غير المقروءة لا يصل قارئ الشاشة؛ و`aria-expanded` لا يتغيّر في لوحة الشريط المطويّ.
- Escape في لوحة التفاصيل يغلقها مع أيّ حوار أو قائمة فوقها.
- أسهم `app-tabs` معكوسة في العربية، وثلاثة `app-tabs` بلا `ariaLabel`.

**في الكود وحده**
- توكن غير معرّف مستعمل: `--ds-color-text-tertiary` في الشريط العلوي. وتوكن معرّف غير مستعمل: `--ds-toast-icon`.
- قيم خامّة: `z-index: 1000000` و`left: 25px` في القشرة، `2000` في القائمة المنسدلة، `#FFFFFF` في الحلقة، عروض الدرج 360/480/640، وقيم في مربّع الرقم وشريط التوزيع.
- «ملفات المنتج» و«العملاء» في المنتج الرقمي مسجّلتان `level: 4` وإخوتهما 3.
- صفحة «الأداء» في أكاديميات بلس بلا مسار منذ 2026-09-23 — وهي المستهلك الوحيد لشريط التوزيع.
- قواعد تكثيف رؤوس الطيّ في بانيَي الصفحات ميتة لا تُطبَّق؛ والموجّه القديم `[dsIcon]` بلا مستخدم.
- تعليقات قديمة في الكود تخالف ما يفعله (التنبيه «182»، الحساب البنكي، الرفّ «other»، غلاف النوع، اسم الملف، `--ds-radius-md`).

**مكوّنات في اللوحة بلا مواصفة:** `<app-chat-bell>` و`<app-academy-progress>` و`<app-new-feature-badge>`، ولوحة الإشعارات (قالب داخل الشريط العلوي على `cdkConnectedOverlay`).

### 7. أجزاء بُنيت داخل الصفحات ولم تصر مكوّنات مشتركة (جرد 2026-09-27)

| الجزء | أين يُعرَّف | الانتشار | موثّق؟ | التوصية |
|---|---|---|---|---|
| **أدوات `.ds-page*`** — قشرة الصفحة، `ds-page__clamp-2` المفروضة في `CLAUDE.md`، النصّ الخافت، خليّة الحالة، كتلة الجدول | نسخة كاملة في `blog/blog-page.scss` (يحمّلها **18** شاشة) وثانية في `site/site-page.scss` (شاشتان)، وتعريفات جزئية أو تجاوزات في **11** ورقة أخرى؛ و`ds-page__clamp-2` معرَّفة أو متجاوَزة في 9 أوراق | 11 قالبًا تستعمل `ds-page__clamp-2` | مذكورة متفرّقة في 12 مواصفة، ولا مواصفة لها | **تُنقل إلى ورقة مشتركة واحدة وتُوثَّق** — `DEBT-015` (2026-09-21) يقول «ثلاث نسخ والرابعة على الطريق»، واليوم 13 ورقة |
| **`fin-stat` · `cpd-stat` · `ac-stat`** | «الأرباح والسحوبات» (`fin-stat`) · تفاصيل الكوبون (`cpd-stat`) · السلات المتروكة (`ac-stat`) | صفحة لكلٍّ | في `stat.md` §15 | **تُستبدل بـ`<app-stat>`** — `DEBT-016` مفتوح |
| **نجمة «مميزة» `.courses-star`** | `products/courses/courses.component.scss` | صفحة الدورات وحدها | في تعليق القالب وقرار المستخدم (2026-09-21، و2026-09-26 للتعطيل بتلميح) | **تبقى محليّة** ما دامت في صفحة واحدة؛ وتصير مكوّنًا حين تصل إلى الباقات وغيرها |
| **حوارات عمل تسكن مجلّد صفحة** — `CreateTrainerDialog` · `UpgradePlanDialog` · `FilePreviewDialog` | مجلّدات صفحاتها الأصلية | 6 · 3 · 3 مستوردين | لا — وهي حوارات محتوى لا مكوّنات نظام | **تبقى** — تُبنى على `<app-modal>`؛ نقلها مسألة تنظيم كود لا نظام تصميم |

