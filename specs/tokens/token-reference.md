---
title: مرجع التوكنز
name: token-reference
tier: tokens
status: approved
source: ['Design-System/tokens/tokens.css']
origin: ['Design-System/tokens/README.md', 'Design-System/tokens/tokens.css']
last_verified: 2026-09-24
---

# مرجع التوكنز

> العقد بين الكود والنظام: كل توكن يحقّ للمكوّن استعماله، ومتى، ومتى لا. **إن لم يكن في هذا الملف فهو غير موجود.**

## كيف تقرأ هذا الملف

- **المصدر الوحيد للقيم** [`tokens.css`](../../tokens/tokens.css). القيمة في كل جدول منقولة منه كما هي: `var(--…)` حين يشتقّ التوكن من غيره، والقيمة الخامّ حين يكون خامًّا، وما بين القوسين (px، نسبة التباين) من تعليق الملف نفسه.
- **§1** السلالم الأولية — مرجع فقط. **§2–§14.5** الطبقة الدلالية والأسس — صفّ لكل توكن بالأعمدة: التوكن · القيمة · الداكن · متى · متى لا. **§15** توكنز المكوّنات — صفّ لكل بادئة، وتفاصيل كل توكن في مواصفة مكوّنه.
- **عمود «الداكن»** من كتلة `html.dark-theme`. «—» فيه = لا يُعاد تعريف التوكن هناك، فيبقى على قيمة الفاتح أو يتبع ما يشير إليه. والجدول الذي لا يُعاد تعريف شيء منه في الداكن بلا عمود. ⚠️ الكتلة نفسها تقول: «الوضع الداكن — البنية جاهزة، غير مُفعّلة بعد. ThemeService يضيف الفئة dark-theme على `<html>`. تنبيه: هذه القيم مبدئية ولم تُدقّق بعد بمعايير التباين. لا تُعتمد قبل مراجعة كاملة» — [`dark-mode.md`](../foundations/dark-mode.md).
- **«متى» و«متى لا»** منقولان من مصدر مكتوب، واسمه بين قوسين: تعليق في `tokens.css` · الأسس · مواصفة مكوّن · قرار في [`CLAUDE.md`](../../../CLAUDE.md). **«—» = لم يقل مصدر شيئًا بعد**؛ لا يُستنتج الاستعمال من الاسم.
- **«يقرؤه:»** في عمود «متى» = توكنز المكوّنات التي تشتقّ منه في `tokens.css` اليوم — استعمال قائم لا قاعدة.
- **الأعداد (2026-09-24):** في `:root` ‏**583** توكنًا `--ds-*`، بلا اسم معرَّف مرّتين. وفوقها **96** إعادة تعريف في الكتل الشرطية: 82 في الداكن · 5 على اللمس `(pointer: coarse)` · 4 على الجوال `(max-width: 767.98px)` · 5 لتقليل الحركة. و**3** متغيّرات `--p-*` في جسر الثيم القديم. هنا **273** صفًّا (§1–§14.5) و**310** توكنًا في §15 عبر 27 بادئة.

## الطبقات

من رأس [`tokens.css`](../../tokens/tokens.css):

> هذا الملف هو المصدر الوحيد للحقيقة لكل قرار بصري في لوحة التحكم.
> لا يجوز كتابة أي قيمة لون / مسافة / خط / نصف قطر / ظل مباشرة داخل مكوّن.
>
> البنية ثلاث طبقات، ولا يقفز المكوّن فوق الطبقة الدلالية:
>
> `Primitive → Semantic → Component` (لوحة خام → معنى → استخدام)
>
> البادئة `--ds-` محجوزة لهذا النظام ولا تتقاطع مع الطبقات القديمة (`--primary` من القالب المُشترى، `--bs-*` من Bootstrap، `--p-*` من panel-style).
>
> سلالم الألوان مولّدة رياضيًا في فضاء OKLCH لضمان تدرّج متساوٍ إدراكيًا، وكل خطوة مدقّقة بنسبة التباين مقابل الأبيض.

### الطبقات الثلاث

```
Primitive        --ds-brand-800: #6E2BA1
     ↓
Semantic         --ds-color-action-primary-bg: var(--ds-brand-800)
     ↓
Component        background: var(--ds-color-action-primary-bg)
```

**المكوّن يستهلك الطبقة الدلالية فقط.**

```css
/* ✅ */  background: var(--ds-color-action-primary-bg);
/* ❌ */  background: var(--ds-brand-800);   /* يكسر الوضع الداكن */
```

القفز فوق الطبقة الدلالية يعمل في الوضع الفاتح ويفشل في الداكن، لأن الوضع الداكن يقلب الإجراء الأساسي إلى `brand-600` لا `brand-800`.

المجموعات الدلالية (الأسس): `surface-*` للأسطح، `text-*` للنصوص، `border-*` للحدود، `action-*-*` للإجراءات، `field-*` للحقول، و`{tone}-bg/border/solid` للحالات الدلالية.

**طبقة المكوّن** (تعليق قسم الزرّ في `tokens.css`): «Primitive ← Semantic ← Component (DS-Rule 6). المكوّن لا يقرأ التوكن الدلالي مباشرة، فتغييرُ مقاس زرٍّ لا يمسّ بقيّة عناصر التحكّم.» — توكنزها في §15.

### الملفات

| الملف | الدور |
|---|---|
| [`tokens.css`](../../tokens/tokens.css) | **المصدر الوحيد للحقيقة.** كل قيمة تصميم في المنتج تُكتب هنا فقط. |
| [`tokens.js`](../../tokens/tokens.js) | جسر إلى Tailwind. **لا يحتوي أي قيمة** — كله مراجع `var()`. |

### أين تُحمَّل

**[`angular.json`](../../../angular.json)** — في مصفوفة `styles` بعد `rtl.css` وقبل `styles.scss`، في إعدادَي البناء والاختبار معًا:

```json
"src/assets/css/rtl.css",
"Design-System/tokens/tokens.css",
"src/styles.scss"
```

**[`tailwind.config.js`](../../../tailwind.config.js)**:

```js
const ds = require('./Design-System/tokens/tokens.js');
theme: { extend: { ...ds.tailwindTheme } }
```

الترتيب لا يهم لتعريف المتغيرات نفسها: البادئة `--ds-` فريدة ولا تتصادم مع `--primary` أو `--bs-*` أو `--p-*`.

### كيف يعمل الجسر

```js
// tokens.js
const ref = (name) => `var(--ds-${name})`;
brand: { 800: ref('brand-800') }   // → "var(--ds-brand-800)"
```

فتصير أداة Tailwind:

```css
.tw-bg-brand-800 { background-color: var(--ds-brand-800) }
```

### لماذا مراجع لا قيمًا؟

| | نسخ القيم | مراجع `var()` |
|---|---|---|
| مصدر الحقيقة | اثنان يتباعدان | **واحد** |
| تغيير لون العلامة | تعديل في مكانين | **سطر واحد** |
| الوضع الداكن | إعادة بناء أدوات كاملة | **يعمل تلقائيًا** |
| وقت الحل | وقت البناء | **وقت التشغيل** |

### الأدوات المتاحة في Tailwind

| المجموعة | مثال |
|---|---|
| الأسطح | `tw-bg-surface` · `tw-bg-surface-page` · `tw-bg-surface-hover` |
| النصوص | `tw-text-content` · `tw-text-content-muted` · `tw-text-content-brand` |
| الحدود | `tw-border-stroke-subtle` · `tw-border-stroke` |
| اللوحات الخام | `tw-bg-brand-800` · `tw-text-danger-700` |
| المسافات | `tw-p-ds-4` · `tw-gap-ds-6` · `tw-mb-ds-8` |
| الخط | `tw-text-ds-md` · `tw-font-ds` |
| نصف القطر | `tw-rounded-ds-md` · `tw-rounded-ds-pill` |
| الظل | `tw-shadow-ds-1` … `tw-shadow-ds-4` · `tw-shadow-ds-focus` |
| الارتفاع | `tw-h-ds-control-md` · `tw-min-h-ds-touch` |
| الطبقات | `tw-z-ds-modal` · `tw-z-ds-toast` |

**قيد معروف:** تعديلات الشفافية (`tw-bg-brand-800/50`) لا تعمل مع مراجع `var()` التي تحمل صيغة hex. عند الحاجة لشفافية استخدم توكنًا دلاليًا جاهزًا مثل `--ds-color-overlay`.

وفي [`tokens.js`](../../tokens/tokens.js) نفسه: «الطبقة الدلالية — هذه هي التي يجب أن تستخدمها المكونات»، والسلالم الخام «للحالات النادرة التي تحتاج درجة محددة». وتحذيره عن الارتفاع: «⚠️ الزرّ مفكوك عن سلّم عناصر التحكّم: control = 36/44/52 وbutton = 32/40/48. لا تقس زرًّا بـ `h-ds-control-*` ولا العكس — الاسمان يعنيان رقمين مختلفين.»

**Tailwind إرث لا يُوسَّع** (قرار المنتج 2026-09-10 — CLAUDE.md): «No styling or component libraries in new code — no Tailwind, no Bootstrap, no Angular Material, no `@angular/cdk`. New UI and every `src/app/shared/ui/*` component is plain per-component SCSS on `--ds-` tokens (`Design-System/tokens/tokens.css`).» و«Tailwind with the `tw-` prefix and `preflight: false` in ~200 existing files. Don't add new `tw-` classes». فالجسر أعلاه يبقى ليعمل الموروث، والكود الجديد يقرأ `var(--ds-*)` في SCSS المكوّن.

### جسر الثيم القديم — `--p-primary-*`

ثلاثة متغيّرات ليست من النظام، يعيد `tokens.css` تعريفها في آخره فتصير قيمتها منه:

| المتغيّر | القيمة |
|---|---|
| `--p-primary-color` | `var(--ds-brand-800)` |
| `--p-primary-semi-light` | `color-mix(in srgb, var(--ds-brand-800) 87.5%, transparent)` |
| `--p-primary-light` | `color-mix(in srgb, var(--ds-brand-800) 12.2%, transparent)` |

من تعليقها في `tokens.css` (المرحلة 0 من توحيد الأزرار):

> المشكلة: لون العلامة كان له مصدران. `panel-style.css` (الثيم المشترى) يعرّف `--p-primary-color: #702EA4` حرفيًّا، والنظام يعرّف `--ds-brand-800`. مصدران لقرار تصميمي واحد = خرق DS-Rule 2، وهو ما أنتج أربع درجات بنفسجية في الكود (#6a2cda، #702ea4، #7c3aed، #78398d).
>
> الحل: هذا الملف يُحمَّل **بعد** panel-style.css في angular.json (63 ← 65)، فتغلب هذه التعريفات عليها بلا تعديل الملف المشترى وبلا !important. ~1720 عنصرًا يقرأ `--p-primary-*` اليوم يصير مصدره النظام.
>
> ⚠️ الربط بالتوكن **الأوّلي** (`--ds-brand-800`) لا الدلالي (`--ds-color-action-primary-bg`) — بقرار صريح. الدلالي ينقلب في الوضع الداكن إلى `--ds-brand-600`، وكان ذلك سيغيّر مظهر تلك الـ1720 دفعةً واحدة قبل أن تُدقَّق قيم الوضع الداكن. الأوّلي ثابت في الوضعين، فالمظهر الحالي محفوظ كما هو. عند اعتماد الوضع الداكن: انقل هذه الثلاثة إلى التوكن الدلالي.
>
> الفارق البصري عن #702EA4: ‏#6E2BA1 — ‏3/255 كحدّ أقصى في كل قناة (ΔE < 1، دون عتبة الإدراك). التباين المضمون على الأبيض: 8.32 (AAA).
>
> البديلان الشفّافان كانا hex بثماني خانات (`df` = ‏87.5%، `1f` = ‏12.2%). لا يمكن تركيب قناة ألفا على متغيّر بهذه الصيغة، فـ`color-mix` هي الطريقة الوحيدة لاشتقاقهما من المصدر نفسه بدل تكرار الـhex.
>
> ⛔ لا تُضف هنا جسورًا لكلاسات `.btn-*`. الجسر للتوكنات فقط؛ توحيد الكلاسات يتم بترحيلها إلى `[dsButton]` (المراحل 1-4).

## 1 · اللون — السلالم الأولية

> **مرجع فقط — ممنوعة داخل المكوّنات إلا حيث يقول قرار معتمد.**

`tokens.css`: «قيم خام. لا تُستخدم مباشرة داخل المكونات؛ استخدم الطبقة الدلالية. الرقم بعد كل لون = نسبة التباين مقابل الأبيض #FFFFFF». كيف بُنيت السلالم (OKLCH، منحنى الإضاءة، الإشباع الجرسي، القصّ إلى sRGB) وقاعدة النص الحاكمة وقرارا الأصفر والأخضر في [`color.md`](../foundations/color.md). وعمود «ما قاله الأصل» أدناه من تعليقات `tokens.css` ومن جدول «الأساس: بنفسجي أكاديميات» في الأسس.

### brand — بنفسجي أكاديميات

المرساة `#702EA4` (الهوية السائدة في اللوحة).

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-brand-50` | `#F8F3FF` | 1.09 | خلفية مختارة، خلفية رقاقة |
| `--ds-brand-100` | `#F0E4FF` | 1.22 | حالة ضغط لخلفية خافتة |
| `--ds-brand-200` | `#E4CEFE` | 1.44 | حدود خافتة |
| `--ds-brand-300` | `#D8B5FE` | 1.76 | — |
| `--ds-brand-400` | `#C68FFE` | 2.40 | — |
| `--ds-brand-500` | `#B36BF5` | 3.31 | — |
| `--ds-brand-600` | `#9D4CE0` | 4.62 | **أفتح درجة تصلح لنص عادي على أبيض** |
| `--ds-brand-700` | `#8538C2` | 6.28 | حلقة التركيز |
| `--ds-brand-800` | `#6E2BA1` | 8.32 | **الدرجة التفاعلية الأساسية** (تعادل `#702EA4` الحالي) |
| `--ds-brand-900` | `#5C2488` | 10.18 | تمرير الفأرة على الأساسي |
| `--ds-brand-950` | `#391456` | 14.91 | الضغط على الأساسي |

### accent — مساند للعلامة

المرساة `#912C97` (قيمة `--p-secondary-color` الحالية).

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-accent-50` | `#FCF2FC` | — | — |
| `--ds-accent-100` | `#F7E2F8` | — | — |
| `--ds-accent-200` | `#F1CBF1` | — | — |
| `--ds-accent-300` | `#E9B0EB` | — | — |
| `--ds-accent-400` | `#DB8ADF` | — | — |
| `--ds-accent-500` | `#CA66D0` | — | «accent-500 كان 3.3:1» مع نصّ أبيض — دون 4.5 (تعليق `--ds-color-accent-*`) |
| `--ds-accent-600` | `#B448BA` | 4.59 | أفتح درجة يبقى عليها النصّ الأبيض فوق 4.5:1 |
| `--ds-accent-700` | `#99359F` | 6.24 | — |
| `--ds-accent-800` | `#7E2884` | 8.32 | — |
| `--ds-accent-900` | `#6B216F` | — | — |
| `--ds-accent-950` | `#431345` | — | — |

### neutral — رمادي

«رمادي بميل خفيف لدرجة العلامة، للتماسك البصري». المرساة في الأسس `#5B5766`.

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-neutral-0` | `#FFFFFF` | — | — |
| `--ds-neutral-50` | `#F5F5F7` | 1.09 | — |
| `--ds-neutral-100` | `#EAE9ED` | 1.21 | — |
| `--ds-neutral-200` | `#D9D8DE` | 1.42 | — |
| `--ds-neutral-300` | `#C7C5CE` | 1.71 | — |
| `--ds-neutral-400` | `#AEAAB7` | 2.27 | — |
| `--ds-neutral-500` | `#9591A1` | 3.07 | — |
| `--ds-neutral-600` | `#7E7A8A` | 4.17 | **لا يصلح لنص عادي. حدود وأيقونات معطّلة فقط** |
| `--ds-neutral-700` | `#686573` | 5.68 | **أفتح رمادي مسموح للنص** |
| `--ds-neutral-800` | `#55525E` | 7.62 | — |
| `--ds-neutral-900` | `#47454F` | 9.41 | — |
| `--ds-neutral-950` | `#2B2A30` | 14.22 | النص الأساسي |

### success — أخضر

المرساة `#309255` (اللون الأخضر الحالي في المنتج).

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-success-50` | `#F0F8F2` | — | — |
| `--ds-success-100` | `#DEEFE2` | — | — |
| `--ds-success-200` | `#C4E2CB` | — | — |
| `--ds-success-300` | `#A6D4B2` | — | — |
| `--ds-success-400` | `#7CBF8F` | — | — |
| `--ds-success-500` | `#53A96F` | — | — |
| `--ds-success-600` | `#309255` | 3.91 | اللون الحالي. **يرسب في AA لنص أبيض فوقه** — محفوظ للحدود والأيقونات |
| `--ds-success-700` | `#1C7A43` | 5.37 | يُستخدم للتعبئة الصلبة بدلًا منه |
| `--ds-success-800` | `#126535` | — | — |
| `--ds-success-900` | `#0F552C` | — | — |
| `--ds-success-950` | `#083419` | — | — |

### danger — أحمر

المرساة `#DC3545` (قيمة `--bs-danger` الحالية).

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-danger-50` | `#FFF2F1` | — | — |
| `--ds-danger-100` | `#FFE2E1` | — | — |
| `--ds-danger-200` | `#FECAC8` | — | — |
| `--ds-danger-300` | `#FEAFAC` | — | — |
| `--ds-danger-400` | `#FE8282` | — | 5.92:1 على السطح المعكوس (تعليق `--ds-table-selection-danger-fg`) |
| `--ds-danger-500` | `#F1585F` | — | 4.27:1 على السطح المعكوس «فترسب في AA» (التعليق نفسه) |
| `--ds-danger-600` | `#DB3444` | 4.58 | — |
| `--ds-danger-700` | `#BC1E33` | 6.23 | — |
| `--ds-danger-800` | `#9C1327` | — | — |
| `--ds-danger-900` | `#841020` | — | — |
| `--ds-danger-950` | `#530812` | — | — |

### warning — كهرماني

«بديل `#FFC107` الذي يستحيل وضع نص مقروء فوقه». المرساة في الأسس `#B45309`.

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-warning-25` | `#FEF8F5` | — | أفتح من 50 بنصف المسافة إلى الأبيض. **لخلفية شريط الملاحظات وحده** (قرار المنتج 2026-09-13: «أخفّ من هيك»): الملاحظة قاعدة هادئة لا تنبيه |
| `--ds-warning-50` | `#FDF3EE` | — | — |
| `--ds-warning-100` | `#FAE5DA` | — | — |
| `--ds-warning-200` | `#F5D0BD` | — | — |
| `--ds-warning-300` | `#F0B99C` | — | — |
| `--ds-warning-400` | `#E5976D` | — | — |
| `--ds-warning-500` | `#D57842` | — | — |
| `--ds-warning-600` | `#BF5D1B` | 4.38 | — |
| `--ds-warning-700` | `#A34902` | 5.98 | بديل الأصفر `#FFC107` (1.66:1) الذي أُسقط |
| `--ds-warning-800` | `#863C04` | — | — |
| `--ds-warning-900` | `#723100` | — | — |
| `--ds-warning-950` | `#471D01` | — | — |

### info — أزرق

المرساة في الأسس `#0B6BCB`.

| الدرجة | القيمة | التباين على الأبيض | ما قاله الأصل |
|---|---|---|---|
| `--ds-info-50` | `#EFF6FF` | — | — |
| `--ds-info-100` | `#DCEBFF` | — | — |
| `--ds-info-200` | `#C1DCFE` | — | — |
| `--ds-info-300` | `#A1CAFE` | — | — |
| `--ds-info-400` | `#71B0FE` | — | — |
| `--ds-info-500` | `#4295F7` | — | كان لون «أكاديميات بلس» في المخططات حتى 2026-09-24 ([`chart.md`](../organisms/chart.md)) |
| `--ds-info-600` | `#197BE4` | 4.20 | — |
| `--ds-info-700` | `#0865C2` | 5.75 | — |
| `--ds-info-800` | `#0152A1` | — | — |
| `--ds-info-900` | `#024588` | — | — |
| `--ds-info-950` | `#002A57` | — | — |

### حيث يقرأ توكنُ مكوّن السلّمَ مباشرة اليوم

كل ما يلي في `tokens.css` بقرار أو بتعليق يشرحه — لا يُتّخذ سابقةً لمكوّن جديد:

| التوكن | يقرأ | السبب المكتوب |
|---|---|---|
| `--ds-filetype-*` (§14.4) | `success/warning/danger/info/accent` 700 و50 | «طبقةٌ فئوية مستقلّة: تستعير من السلالم مباشرةً لا من التوكنز الدلالية، فلا يصير الأخضر «نجاحًا» ولا الأحمر «خطرًا»» (قرار المنتج 2026-09-16) |
| `--ds-channel-site` · `-mid` · `-subtle` (§14.5) | `brand-800` · `600` · `400` | لونا قناتي البيع (قرار المنتج 2026-09-24) |
| `--ds-notice-strip-warning-bg` | `warning-25` | «أفتح من خلفية التنبيه» (قرار المنتج 2026-09-13) |
| `--ds-accordion-header-bg` · `-hover` | `neutral-50` · `neutral-100` | «درجتان من سلّم الرمادي لا سطحان دلاليّان» (قرار المنتج 2026-09-19) |
| `--ds-type-cover-*` | `brand-100` · `300` · `800` · `950` · `neutral-0` | غلاف النوع (قرار المنتج 2026-09-17) |
| `--ds-shelf-selected-bg` · `-paper` | `brand-800` · `brand-600` | «جُرّبت 900 فبدت ثقيلة» (قرار المنتج 2026-09-16) |
| `--ds-table-group-accent` | `brand-600` | الخطّ في بداية القسم (قرار المنتج 2026-09-14) |
| `--ds-table-selection-danger-fg` | `danger-400` | «الدرجة 400 لا 500: الحمراء 500 تعطي 4.27:1 على سطحنا المعكوس فترسب في AA» |
| `--ds-table-total-border` | `brand-200` | — |
| `--ds-table-bar-track` · `--ds-distribution-bar-track` | `neutral-100` | — |
| `--ds-field-bg` · `--ds-field-bg-focus` · `--ds-field-ring` | `neutral-0` · `neutral-0` · `brand-100` | طبقة المكوّن للحقل (قرار 2026-09-10) |
| `--p-primary-color` | `brand-800` | جسر الثيم القديم — «بقرار صريح» (§ الطبقات) |

### كيف تغيّر لون العلامة

1. عدّل السلّم في `tokens.css` (11 خطوة).
2. لا شيء آخر.

`tokens.js` وTailwind وكل المكونات تتبع تلقائيًا.

**لتوليد سلّم جديد رياضيًا** استخدم المنهج الموصوف في [`color.md`](../foundations/color.md) (§ كيف بُنيت السلالم): درجة لون ثابتة، منحنى إضاءة ثابت، منحنى إشباع جرسي، وقصّ إلى نطاق sRGB بخفض الإشباع.

**وبعد أي تغيير، دقّق التباين:** كل درجة تُستخدم لنص على أبيض يجب أن تحقق `4.5:1`، وكل درجة تُستخدم كتعبئة صلبة تحت نص أبيض كذلك.

## 2 · اللون — الأسطح

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-surface-page` | `var(--ds-neutral-50)` | `#17161B` | لون الكانفاس (تعليق `surface-hover-on-page`). أرضية لوحة الورقة: «رمادي الصفحة» وبطاقاتها بيضاء عليها ([`sheet.md`](../organisms/sheet.md)). يقرؤه: `table-toolbar-bg` — «رمادي خفيف لا أبيض: الشريط منطقة **أدوات** لا بيانات» | خلفية عنوان قسم الجدول — «كانت رمادية فاتحة `surface-page`» وصارت بيضاء (قرار المنتج 2026-09-14، [`table.md`](../organisms/table.md)) |
| `--ds-color-surface-default` | `var(--ds-neutral-0)` | `#1E1D23` | السطح الأبيض: الرقاقة المطبَّقة «بيضاء بحدّ محايد» ([`filtering.md`](../patterns/filtering.md))؛ المقطع المختار ([`segmented.md`](../molecules/segmented.md)). يقرؤه: `modal-bg` · `detail-panel-bg` · `table-group-bg` · `tab-surface-active` · `switch-thumb-bg` · `upload-file-bg` · `color-action-ai-bg` · والفجوة البيضاء في `focus-ring` | — |
| `--ds-color-surface-raised` | `var(--ds-neutral-0)` | `#26252C` | بطاقة الرصيف المطويّ في الشريط الجانبي: `surface-raised` + حدّ `border-subtle` (قرار المنتج 2026-09-14، [`sidebar.md`](../organisms/sidebar.md)). خلفية شريط الحفظ ([`save-bar.md`](../organisms/save-bar.md)). يقرؤه: `phone-panel-bg` · `accordion-bg` | — |
| `--ds-color-surface-sunken` | `var(--ds-neutral-100)` | `#131217` | يقرؤه: `tab-track` · `avatar-bg` («رمادي خفيف جدًا: الأفاتار حاملٌ للصورة أو للحرفين») · `field-affix-bg` («سطح غائر») · `phone-flag-bg` · `upload-placeholder-bg` · `upload-progress-track` · `switch-thumb-shade`. والفراغ عند السحب ([`sortable.md`](../molecules/sortable.md)) | رأس لوحة الطيّ الساكن: «`surface-sunken` (100) ساكنًا يستهلك الوسطى فلا يبقى للمرور إلا 200» (قرار المنتج 2026-09-19، [`accordion.md`](../molecules/accordion.md)) · خلفية عنوان قسم الجدول (كانت، قبل 2026-09-14) |
| `--ds-color-surface-hover` | `var(--ds-neutral-50)` | `#2C2B33` | تمرير على سطح أبيض. يقرؤه: `modal-close-bg-hover` · `phone-country-bg-hover` · `phone-option-bg-active` · `upload-zone-bg-hover` · `upload-replace-bg-hover` | عنصر يجلس على الكانفاس مباشرة: «مشتقّ من neutral-50 وهو **نفس** لون الكانفاس، فالتمرير عليه يرسم رماديًا فوق الرمادي نفسه ولا يُرى» — ذلك `surface-hover-on-page` |
| `--ds-color-surface-hover-on-page` | `var(--ds-neutral-100)` | `var(--ds-color-surface-hover)` | «تمرير لعنصر يجلس على الكانفاس مباشرة لا على سطح أبيض». الشريط العلوي ([`app-header.md`](../organisms/app-header.md)) | — |
| `--ds-color-surface-selected` | `var(--ds-brand-50)` | `var(--ds-brand-950)` | خلفية مختارة (`brand-50` في الأسس). يقرؤه: `table-total-bg` · `phone-option-bg-selected` · `upload-zone-bg-active` | بلوك الحساب البنكي الأساسي: «**بلا خلفية `surface-selected` وبلا حدّ `border-brand`**» — يُعرف بشارته وحدها (قرار المنتج 2026-09-17، [`bank-account-item.md`](../molecules/bank-account-item.md)) |
| `--ds-color-surface-selected-bold` | `var(--ds-brand-100)` | `var(--ds-brand-900)` | «أبرز من التمرير — للتنقّل حيث يجب أن يُقرأ «هنا أنا» لا «مررت هنا»». صندوق الصفحة المفتوحة في الشريط الجانبي (قرار المنتج 2026-09-23، واللون 2026-09-24) | — |
| `--ds-color-surface-disabled` | `var(--ds-neutral-100)` | `#26252C` | الراديو المعطَّل: «حدّ `action-disabled-border` على `surface-disabled` بلون `text-disabled`» ([`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md)) | — |
| `--ds-color-surface-inverse` | `var(--ds-neutral-950)` | `var(--ds-neutral-50)` | يقرؤه: `table-selection-bg` — شريط التحديد «**مقلوب**. سطح داكن على صفحة فاتحة يقول «هذه طبقة مؤقتة ظهرت بفعلك» بلا حدّ ولا ظل» | — |
| `--ds-color-overlay` | `rgba(43, 42, 48, 0.48)` | `rgba(9, 9, 11, 0.66)` | «الحجاب خلف الحوارات والأدراج». وعند الحاجة لشفافية: «استخدم توكنًا دلاليًا جاهزًا مثل `--ds-color-overlay`» (README التوكنز) | خلفية `<app-modal>` — لها `--ds-modal-backdrop` (slate-900 بشفافية 55% وطمس 2px، بطلب صريح 2026-09-10)، و«⚠️ تخالف خلفية الدرج (`--ds-color-overlay` بلا طمس)». في الداكن يعود `--ds-modal-backdrop` إليه |
| `--ds-color-skeleton-base` | `var(--ds-neutral-100)` | `#26252C` | «الهيكل العظمي أثناء التحميل» | — |
| `--ds-color-skeleton-shimmer` | `var(--ds-neutral-200)` | `#302F38` | الهيكل العظمي أثناء التحميل — اللمعة | — |

## 3 · اللون — النص

> «النص — لا تُستخدم درجة أفتح من neutral-700 لأي نص» (`tokens.css`). و«`neutral-700` هو أفتح رمادي مسموح لأي نص… وهذا يشمل الـ placeholder» (الأسس — [`color.md`](../foundations/color.md)).

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-text-primary` | `var(--ds-neutral-950)` | `var(--ds-neutral-50)` | «النص `text-primary`» ([PLAYBOOK §0](../../migration/PLAYBOOK.md#0-راجع-المقاسات-المعتمدة-قبل-أي-رسم)). يقرؤه: `page-header-title-fg` · `table-group-fg` («اسم القسم أسود») · `breadcrumb-current-fg` · `tab-fg-active` · `upload-file-name-fg` · `phone-country-fg` · ونصّ الكلمات العادية في شريط الإشارة (CLAUDE.md) | — |
| `--ds-color-text-secondary` | `var(--ds-neutral-800)` | `var(--ds-neutral-200)` | يقرؤه: `modal-description-color` · `breadcrumb-link-fg` · `upload-prompt-fg` · `phone-flag-fg`. وصف الخيار «12 بلون `text-secondary`» ([`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md)). النصّ فوق اللاصقة «text-secondary (6.2:1)» | — |
| `--ds-color-text-muted` | `var(--ds-neutral-700)` | `var(--ds-neutral-400)` | «الثانوي `text-muted`» (PLAYBOOK §0). وصف رأس الصفحة: «معلومة شارحة لا تنافس العنوان، وأفتح درجة يسمح بها النظام لنصّ يُقرأ». التبويب الخامل «`text-muted` على السكّة: 4.7:1». يقرؤه أيضًا: `modal-close-fg` · `breadcrumb-separator-fg` · `accordion-chevron-fg` · `upload-file-meta-fg` | «❌ لون أفتح من `text-muted` للوصف» ([`page-layout.md`](../organisms/page-layout.md)) — ولا لأي نص |
| `--ds-color-text-placeholder` | `var(--ds-neutral-700)` | `var(--ds-neutral-400)` | الـ placeholder — «الـ placeholder نص، ويخضع للحد نفسه» (الأسس) | بديلًا عن التسمية: «الـ placeholder ليس تسمية» (الأسس) · «❌ `placeholder` بديلًا عن التسمية» ([`input-and-form.md`](../molecules/input-and-form.md)) |
| `--ds-color-text-disabled` | `var(--ds-neutral-600)` | `var(--ds-neutral-600)` | تسمية الحقل المعطَّل — «**لا `opacity` على الحاوية**» (input-and-form.md). تسمية المفتاح المعطَّل «تأخذ `text-disabled` ولا تبهت» ([`switch.md`](../atoms/switch.md)) | نصّ فعّال يُقرأ: `neutral-600` «تباينه 4.17:1 — أقل من 4.5:1. يُستخدم للحدود والأيقونات المعطّلة فقط، لا لنص يُقرأ» (الأسس) |
| `--ds-color-text-inverse` | `var(--ds-neutral-0)` | `var(--ds-neutral-950)` | نصّ على سطح مقلوب. يقرؤه: `table-selection-fg` · `type-cover-mark-fg`. ونصّ شارة «مالك الأكاديمية» في الداكن فوق الصلب الفاتح (تعليق الـaccent الداكن) | — |
| `--ds-color-text-brand` | `var(--ds-brand-800)` | `var(--ds-brand-400)` | يقرؤه: `table-total-fg` · `avatar-fg` («الحرفان يبقيان بلون العلامة — هما المعلومة») · `phone-check-fg`. أيقونة الصفحة المفتوحة وتسميتها في الشريط الجانبي ([`sidebar.md`](../organisms/sidebar.md)). نصّ رقاقة الاختيار المختارة ([`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md)) | — |
| `--ds-color-text-link` | `var(--ds-brand-800)` | `var(--ds-brand-400)` | الروابط. يقرؤه: `color-action-link-text` · `upload-action-fg` | — |
| `--ds-color-text-success` | `var(--ds-success-700)` | `var(--ds-success-400)` | — | — |
| `--ds-color-text-danger` | `var(--ds-danger-700)` | `var(--ds-danger-400)` | يقرؤه: `upload-remove-fg` — «زرّ الحذف عارٍ بلا نصّ، فيحمل اللونُ المعنى — نبرة الخطر مشروعة هنا» | «❌ لون أحمر بصنف محلّي أو `text-danger` في الشاشة — `danger` وحده» لعنصر القائمة ([`menu.md`](../molecules/menu.md)) |
| `--ds-color-text-warning` | `var(--ds-warning-700)` | `var(--ds-warning-400)` | الكلمات المفتاحية في شريط الإشارة: «the key words in `<strong>`, which the strip colors `--ds-color-text-warning`» (قرار المنتج 2026-09-14 — CLAUDE.md). نصّ شارة الصفة على `--ds-color-warning-bg` (قرار المنتج 2026-09-15، [`badge-status.md`](../atoms/badge-status.md)) | — |
| `--ds-color-text-info` | `var(--ds-info-700)` | `var(--ds-info-400)` | نصّ شريط الإشارة بنبرة `info` ([`notice-strip.md`](../molecules/notice-strip.md)) | — |
| `--ds-color-text-accent` | `var(--ds-accent-800)` | `var(--ds-accent-400)` | تمييزٌ لا نيّة: شارة «مالك الأكاديمية» (قرار 2026-09-13) — «والنصّ 8.32:1 على الأبيض». ⚠️ انظر ملاحظة §6 عن الـaccent | «ليس حالةً ولا فعلًا، فلا يدخل STATUS_MAP ولا الأزرار» |

## 4 · اللون — الحدود

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-border-subtle` | `var(--ds-neutral-200)` | `#302F38` | «الحدود `border-subtle`» (PLAYBOOK §0). حدّ بطاقة الرصيف المطويّ «كالكانفاس، بلا ظلّ» ([`sidebar.md`](../organisms/sidebar.md)). يقرؤه: `detail-panel-border` · `accordion-border` · `phone-panel-border` · `phone-flag-ring` | — |
| `--ds-color-border-default` | `var(--ds-neutral-300)` | `#3D3B45` | حدّ الرقاقة المطبَّقة «بيضاء بحدّ محايد» (قرار 2026-09-10، [`filtering.md`](../patterns/filtering.md)). جذع الخط الشجري في الشريط الجانبي (قرار المنتج 2026-09-14). يقرؤه: `upload-file-border` · `swatch-edge` · `switch-track-off` («⚠️ … 1.71:1 … قرار جمالي صريح بعد عرض الرقم»). وفي الداكن يقرؤه `color-field-border-disabled` و`color-action-ai-border-track` | حدّ الحقل: «⚠️ الحدّ neutral-500 لا neutral-300 — والسبب معيار لا ذوق» — 1.71:1 لا يبلغ 3:1 (WCAG 1.4.11، `DEBT-001`) |
| `--ds-color-border-strong` | `var(--ds-neutral-400)` | `#4E4C57` | «**اليوم** حلقة رقيقة (`border-strong`) — لا لون، فلا يُخلط بالمختار» ([`date-range-field.md`](../molecules/date-range-field.md)). إطار الفراغ عند السحب ([`sortable.md`](../molecules/sortable.md)). يقرؤه: `switch-track-off-hover` | — |
| `--ds-color-border-brand` | `var(--ds-brand-800)` | — | يقرؤه: `tab-indicator` (الشريط المنزلق في قائمة الأقسام العمودية) | بلوك الحساب البنكي الأساسي (قرار المنتج 2026-09-17، [`bank-account-item.md`](../molecules/bank-account-item.md)) |
| `--ds-color-border-danger` | `var(--ds-danger-600)` | — | — | — |
| `--ds-color-divider` | `var(--ds-neutral-200)` | `#302F38` | الفواصل. يقرؤه: `modal-divider` («يظهران حين يفيض الجسم وحده») · `table-toolbar-border` · `phone-divider`. خطّ تحت التبويبات الملتصقة حين ينضغط الرأس ([`tabs.md`](../molecules/tabs.md)) | — |
| `--ds-border-width-sm` | `1px` | — | يقرؤه: `button-border-width` · `save-bar-block-size`. إطار الفراغ عند السحب ([`sortable.md`](../molecules/sortable.md)) | — |
| `--ds-border-width-md` | `2px` | — | يقرؤه: `upload-zone-border-width` — «أعرض من حدّ الحقل: الخطّ المتقطّع بسمك 1px يُقرأ إطارًا باهتًا لا دعوة» | — |

## 5 · اللون — الإجراءات

> «لكل شاشة أو قسم **إجراء أساسي واحد**» — التسلسل كاملًا وجدول الحسم السريع في [`button.md`](../atoms/button.md). «متى» و«متى لا» لكل نوع أدناه من جداول «متى تستخدم كل نوع — وأين، ومتى لا» هناك.

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-action-primary-bg` | `var(--ds-brand-800)` | `var(--ds-brand-600)` | «الفعل الذي جاء المستخدم من أجله: حفظ، نشر، إنشاء، تأكيد» — **واحد** في الشاشة أو القسم. يقرؤه: `switch-track-on` | «فعلٌ لا يُنهي مهمة · فعل داخل صفّ جدول · إلغاء · تنقّل إلى صفحة أخرى». وفي المكوّن لا `--ds-brand-800` مكانه: «يكسر الوضع الداكن» |
| `--ds-color-action-primary-bg-hover` | `var(--ds-brand-900)` | `var(--ds-brand-500)` | تمرير الفأرة على الأساسي (الأسس). يقرؤه: `switch-track-on-hover` | — |
| `--ds-color-action-primary-bg-active` | `var(--ds-brand-950)` | `var(--ds-brand-700)` | الضغط على الأساسي (الأسس) | — |
| `--ds-color-action-primary-text` | `var(--ds-neutral-0)` | `var(--ds-neutral-950)` | نصّ الأساسي. يقرؤه: `color-action-ai-text-hover` | — |
| `--ds-color-action-secondary-bg` | `var(--ds-neutral-0)` | — | «فعل موازٍ يختاره بعض المستخدمين بدل الأساسي: «حفظ كمسودة» بجانب «نشر»» | «إلغاء — ذلك `tertiary` · فعل مدمِّر — ذلك `danger` · أكثر من ثلاثة في صفّ واحد» |
| `--ds-color-action-secondary-bg-hover` | `var(--ds-neutral-50)` | — | تمرير الثانوي | — |
| `--ds-color-action-secondary-bg-active` | `var(--ds-neutral-100)` | — | ضغط الثانوي | — |
| `--ds-color-action-secondary-text` | `var(--ds-neutral-950)` | — | نصّ الثانوي | — |
| `--ds-color-action-secondary-border` | `var(--ds-neutral-300)` | — | «سطح أبيض بإطار محايد» | إطار بنفسجي: «البنفسجي لون الفعل الأساسي، وحملُ الثانوي له يجعل الصفّ الواحد يعرض لونين متطابقين برتبتين مختلفتين — فيضيع أيّهما المقصود» |
| `--ds-color-action-tertiary-bg` | `transparent` | — | «إلغاء · إغلاق · فعل منخفض الأولوية · أفعال متكرّرة داخل صفوف الجدول». «قيمة مكتوبة لا خاصّية محذوفة: النوع لا يعتمد على غياب إعلان» | «الفعل الوحيد في الشاشة — لن يراه أحد · فعل مدمِّر يحتاج تحذيرًا بصريًّا» |
| `--ds-color-action-tertiary-bg-hover` | `var(--ds-neutral-100)` | — | تمرير الثالثي — «بلا صندوق حتى يُلمس» | — |
| `--ds-color-action-tertiary-bg-active` | `var(--ds-neutral-200)` | — | ضغط الثالثي | — |
| `--ds-color-action-tertiary-text` | `var(--ds-neutral-800)` | — | نصّ الثالثي | — |
| `--ds-color-action-link-bg` | `transparent` | — | «فعل نصّي بلا صندوق، بلون العلامة لا بالأسود… فعل يُقرأ رابطًا فيأخذ لون الرابط نفسه — وإلا لم يُميَّز عن نصّ عادي». مثاله `dsButton variant="link" size="sm"` في [`optional-field.md`](../molecules/optional-field.md) | فعل ثانويّ محايد: «الثالثيّ فعل ثانويّ محايد (زرّ ⋯، إغلاق)» |
| `--ds-color-action-link-bg-hover` | `var(--ds-brand-50)` | — | تمرير الرابط | — |
| `--ds-color-action-link-bg-active` | `var(--ds-brand-100)` | — | ضغط الرابط | — |
| `--ds-color-action-link-text` | `var(--ds-color-text-link)` | — | نصّ الرابط — يتبع `text-link` في الوضعين | — |
| `--ds-color-action-danger-bg` | `var(--ds-danger-600)` | — | «حذف · إلغاء اشتراك · إنهاء عضوية · أي فعل لا يُسترجع». «600 لا 700: الدرجة التي يُقرأ منها «خطر» بلا لبس، وتمرّ AA مع الأبيض (4.58:1)» | «لفت الانتباه إلى فعل غير مدمِّر · «إلغاء» — الإلغاء يُلغي فعلًا ولا يدمّر شيئًا» |
| `--ds-color-action-danger-bg-hover` | `var(--ds-danger-700)` | — | «و700/800 للتمرير والضغط بعدها» | — |
| `--ds-color-action-danger-bg-active` | `var(--ds-danger-800)` | — | الضغط على الخطر | — |
| `--ds-color-action-danger-text` | `var(--ds-neutral-0)` | — | نصّ الخطر | — |
| `--ds-color-action-danger-bg-subtle` | `var(--ds-danger-50)` | — | — | — |
| `--ds-color-action-neutral-bg` | `var(--ds-neutral-800)` | `var(--ds-neutral-200)` | «فعل مصمت لا يجوز أن يحمل وزن العلامة (تصدير، طباعة)، أو فعل أساسي داخل منطقة فيها primary أعلى منه رتبةً». «يجوز تكراره في الشريط الواحد» | «بديلًا عن `primary` لمجرّد تفضيل الرمادي · فعل مدمِّر · إلغاء» |
| `--ds-color-action-neutral-bg-hover` | `var(--ds-neutral-900)` | `var(--ds-neutral-100)` | «الدرجات 800→900→950 تحاكي نمط primary وdanger حرفيًّا». في الداكن «التمرير يفتح لا يُغمق» | — |
| `--ds-color-action-neutral-bg-active` | `var(--ds-neutral-950)` | `var(--ds-neutral-300)` | ضغط المحايد | — |
| `--ds-color-action-neutral-text` | `var(--ds-neutral-0)` | `var(--ds-neutral-950)` | «المحايد ينعكس كما ينعكس الأساسي: تعبئة فاتحة ونصّ داكن» (الداكن) | — |
| `--ds-color-action-ai-bg` | `var(--ds-color-surface-default)` | — | «فعل يُنشئ محتوى بالذكاء الاصطناعي يراه المستخدم» — واحد في المنطقة، رتبته رتبة `secondary`. الغطاء في السكون: «السطح الافتراضي معتمًا كاملًا، فلا يظهر إلا حلقة الإطار» | «لفت الانتباه إلى فعل عادي · فعل يستعمل الذكاء الاصطناعي في الخلفية دون ناتج يراه المستخدم · بديلًا عن `primary`» |
| `--ds-color-action-ai-bg-hover` | `transparent` | — | الغطاء عند التمرير: «شفاف تمامًا، فيظهر التدرّج في الزرّ كلّه» (قرار المنتج 2026-09-15) | — |
| `--ds-color-action-ai-bg-active` | `rgb(0 0 0 / 0.16)` | `rgb(255 255 255 / 0.16)` | الضغط: «حجابٌ أسود 16% فوق التدرّج، فيغمق كما يغمق كل زرّ مضغوط» (اختيار المنتج 2026-09-15). في الداكن «حجابٌ أبيض لا أسود» | — |
| `--ds-color-action-ai-text` | `var(--ds-brand-800)` | `var(--ds-brand-400)` | نصّ زرّ الذكاء في السكون — 8.32:1 على الأبيض | — |
| `--ds-color-action-ai-text-hover` | `var(--ds-color-action-primary-text)` | — | النصّ فوق التدرّج عند التمرير | — |
| `--ds-color-action-ai-icon` | `var(--ds-accent-700)` | `var(--ds-accent-400)` | أيقونة زرّ الذكاء — 6.24:1 | — |
| `--ds-color-action-ai-gradient-start` | `var(--ds-brand-700)` | `var(--ds-brand-500)` | طرف التدرّج ورأس الشعاع — «التدرّج من لون العلامة إلى لونها المساند يقول قبل القراءة إن هذا الفعل **يولّد** لا يحرّر» | لون خارج السلّمين: «الأزرق معلومة في دلالة الألوان، فلا يُستعار للذكاء» |
| `--ds-color-action-ai-gradient-end` | `var(--ds-accent-600)` | `var(--ds-accent-500)` | الطرف الثاني وذيل الشعاع | كالسطر أعلاه |
| `--ds-color-action-ai-border-track` | `var(--ds-brand-200)` | `var(--ds-color-border-default)` | «مسار الشعاع: الإطار الفاتح الذي يجري عليه شعاع زرّ الذكاء (قرار 2026-09-11). فاتح عمدًا» — 1.44:1، «الزرّ يُعرف بنصّه (8.32:1) لا بإطاره» | في الداكن لا `brand-200`: «يتوهّج على السطح الداكن فينافس الشعاع» |
| `--ds-color-action-ai-gradient` | `linear-gradient(135deg, var(--ds-color-action-ai-gradient-start), var(--ds-color-action-ai-gradient-end))` | — | «التدرّج الثابت — لبطاقة البدء في الحالة الفارغة» | الشعاع المتحرّك على غير زرّ `ai`: «لا يُنقل الشعاع إلى أي عنصر آخر — بطاقة البدء في الحالة الفارغة تحمل التدرّج **ثابتًا**» |
| `--ds-opacity-disabled` | `0.5` | — | «الزرّ يبهت بلونه ولا يُستبدل برمادي… فيعرف المستخدم أيّ فعل تعذّر عليه». المعطَّل المحدَّد في المربّع والمفتاح (قرار 2026-09-10). الصفوف الباقية عند بلوغ حدّ التمييز ([`table.md`](../organisms/table.md)) | حاوية الحقل المعطَّل: «تضرب تباين التسمية والنص معًا وتُنزلهما تحت الحد المسموح» (input-and-form.md). ⚠️ وفهرس المكوّنات: «**التعطيل ليس شفافية.** `opacity: 0.5` على حاوية يهبط بتباين النص تحت الحد المسموح. استخدم توكنز `action-disabled-*`» |
| `--ds-color-action-disabled-bg` | `var(--ds-neutral-200)` | — | «حالة التعطيل — للحقول والعناصر التي لا تبهت». رابط زيارة موقع الأكاديمية في الشريط العلوي ([`app-header.md`](../organisms/app-header.md)) | — |
| `--ds-color-action-disabled-text` | `var(--ds-neutral-600)` | — | نصّ العنصر المعطَّل الذي لا يبهت | — |
| `--ds-color-action-disabled-border` | `var(--ds-neutral-200)` | — | حدّ الراديو المعطَّل «على `surface-disabled`» ([`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md)) | — |

> أُزيل `--ds-color-action-ai-gradient-highlight` في 2026-09-11: «كان بقعة الضوء في الدوران المخروطي، والشعاع حلّ محلّه» (`tokens.css`).

## 6 · اللون — الحالات

> «الحالات الدلالية — خلفية خافتة + حد + لون صلب، لكل نية» (`tokens.css`). ودلالة اللون ثابتة (الأسس): بنفسجي «العلامة، الإجراء الأساسي، العنصر المحدَّد» · أخضر «نجاح، نشط، مكتمل، منشور» · أحمر «خطأ، فشل، إجراء مدمّر» · كهرماني «تحذير، قيد المراجعة، انتباه مطلوب» · أزرق «معلومة، قيد المعالجة» · رمادي «ثانوي، معطّل، مسودة، منتهي». **ممنوع** استخدام اللون كوسيلة التبليغ الوحيدة — كل حالة تحمل نصًا أو أيقونة أيضًا. والحالة في الشاشة «`<app-status>` من خريطة الحالات — كبسولة محايدة واللون في النقطة — لا كبسولة ملوّنة بالكامل» (PLAYBOOK §0).

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-success-bg` | `var(--ds-success-50)` | — | خلفية خافتة لنيّة النجاح | اللون وحده وسيلةً للتبليغ |
| `--ds-color-success-border` | `var(--ds-success-200)` | — | حدّ نيّة النجاح | — |
| `--ds-color-success-solid` | `var(--ds-success-700)` | — | «كل تعبئة صلبة خضراء → `--ds-color-success-solid` (`#1C7A43`، تباين `5.37:1`)» (PLAYBOOK، الدين 4). حالة `Success` في الحقل «للتحقّق الفوري فقط» ([`input-and-form.md`](../molecules/input-and-form.md)) | `#309255` (`success-600`) تعبئةً صلبة — «تباينه مع نص أبيض 3.91:1 — يرسب في WCAG AA» |
| `--ds-color-danger-bg` | `var(--ds-danger-50)` | — | خلفية خافتة لنيّة الخطر. يقرؤه: `upload-remove-bg-hover` | اللون وحده وسيلةً للتبليغ |
| `--ds-color-danger-border` | `var(--ds-danger-200)` | — | حدّ نيّة الخطر | — |
| `--ds-color-danger-solid` | `var(--ds-danger-700)` | — | اللون الصلب لنيّة الخطر | — |
| `--ds-color-warning-bg` | `var(--ds-warning-50)` | — | خلفية خافتة لنيّة التحذير. شارة الصفة («مالك الأكاديمية»، «النطاق الافتراضي»): `--ds-color-text-warning` على `--ds-color-warning-bg` (قرار المنتج 2026-09-15، [`badge-status.md`](../atoms/badge-status.md)) | خلفية شريط الإشارة — له `--ds-notice-strip-warning-bg` «أفتح من خلفية التنبيه» (قرار المنتج 2026-09-13) |
| `--ds-color-warning-border` | `var(--ds-warning-200)` | — | حدّ نيّة التحذير | — |
| `--ds-color-warning-solid` | `var(--ds-warning-700)` | — | اللون الصلب لنيّة التحذير | — |
| `--ds-color-info-bg` | `var(--ds-info-50)` | — | خلفية خافتة لنيّة المعلومة. شريط الإشارة بنبرة `info` ([`notice-strip.md`](../molecules/notice-strip.md)) | إشارة داخل حوار: «Never `<app-alert tone="info">`, `tone="info"` on the strip, or a hand-drawn colored box for a notice in a dialog» (قرار المنتج 2026-09-14 — CLAUDE.md) |
| `--ds-color-info-border` | `var(--ds-info-200)` | — | حدّ نيّة المعلومة | — |
| `--ds-color-info-solid` | `var(--ds-info-700)` | — | اللون الصلب لنيّة المعلومة | — |
| `--ds-color-neutral-bg` | `var(--ds-neutral-100)` | — | خلفية خافتة للنيّة المحايدة | — |
| `--ds-color-neutral-border` | `var(--ds-neutral-300)` | — | حدّ النيّة المحايدة | — |
| `--ds-color-neutral-solid` | `var(--ds-neutral-700)` | — | اللون الصلب للنيّة المحايدة | — |
| `--ds-color-brand-bg` | `var(--ds-brand-50)` | — | خلفية رقاقة الاختيار المختارة «(أفتح درجة، `brand-50`) … **ولا تغميق عند المرور**» ([`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md)) | تعبئة الحقل عند التركيز: «كان `--ds-color-field-bg-focus` يشير إلى `--ds-color-brand-bg`، فيتلوّن الحقل بنفسجيًّا عند التركيز» — حُسم (`DEBT-004`) |
| `--ds-color-brand-border` | `var(--ds-brand-200)` | — | حدّ رقاقة الاختيار المختارة (المصدر نفسه) | — |
| `--ds-color-brand-solid` | `var(--ds-brand-800)` | — | يقرؤه: `table-bar-fill` · `upload-progress-fill` | — |
| `--ds-color-accent-bg` | `var(--ds-accent-50)` | — | «الـaccent — تمييزٌ لا نيّة: شارة «مالك الأكاديمية» (قرار 2026-09-13)» | «ليس حالةً ولا فعلًا، فلا يدخل STATUS_MAP ولا الأزرار» |
| `--ds-color-accent-border` | `var(--ds-accent-200)` | — | كالسطر أعلاه | كالسطر أعلاه |
| `--ds-color-accent-solid` | `var(--ds-accent-700)` | `var(--ds-accent-400)` | «الصلب تدرّجٌ كتدرّج شارة «جديد»: من accent-700 (6.24:1 مع نصّ أبيض)». في الداكن «الصلب الفاتح تحت نصّ text-inverse الداكن» | `accent-700` في الداكن: «يطمس نصًّا داكنًا فوقه» |
| `--ds-color-accent-solid-end` | `var(--ds-accent-600)` | `var(--ds-accent-300)` | «إلى accent-600 (4.59:1) — أفتح درجة يبقى عليها النصّ الأبيض فوق 4.5:1» | «accent-500 كان 3.3:1» |

> ⚠️ **الـaccent اليوم:** تعليق `tokens.css` يربطه بشارة «مالك الأكاديمية» (2026-09-13). و[`badge-status.md`](../atoms/badge-status.md) يقول إن الشارة «وُحِّدت مع «النطاق الافتراضي» على `warning` الهادئة في 2026-09-15، فلم تعد نغمة `accent` مستعملةً في أي شاشة — تبقى معرّفة ولا تُستعمل حتى يقرّر المنتج غير ذلك». المصدران يختلفان؛ لم يُحسم هنا.

## 7 · التركيز

> «حلقة التركيز — إلزامية ولا يجوز إزالتها» (`tokens.css`). «`:focus-visible` يعرض `var(--ds-focus-ring)` في كل مكوّن» (فهرس المكوّنات). «`outline: none` دون بديل مرئي ممنوع» (الأسس — [`accessibility.md`](../foundations/accessibility.md)).

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-focus-ring` | `var(--ds-brand-700)` | `var(--ds-brand-400)` | لون حلقة التركيز (`brand-700` «حلقة التركيز» في الأسس). يقرؤه: `color-field-border-focus` — «حدّ التركيز هو لون التركيز نفسه» | تلوين الحلقة في عنصر واحد بإعادة تعريفه وحده: «⚠️ لا يكفي إعادة تعريف --ds-color-focus-ring عليه: var() داخل --ds-focus-ring تُحَلّ هنا على :root، والعنصر يرث القيمة محلولةً. أعِد تعريف --ds-focus-ring معه بالتركيبة نفسها (كما يفعل زرّ danger في button.component.scss)» |
| `--ds-focus-ring-width` | `2px` | — | «بعرض 2px وإزاحة 2px» (الأسس) | — |
| `--ds-focus-ring-offset` | `2px` | — | الفجوة البيضاء بين العنصر والحلقة | — |
| `--ds-focus-ring` | `0 0 0 var(--ds-focus-ring-offset) var(--ds-color-surface-default), 0 0 0 calc(var(--ds-focus-ring-offset) + var(--ds-focus-ring-width)) var(--ds-color-focus-ring)` | — | «حلقة موحّدة عبر `--ds-focus-ring`» (الأسس) في كل مكوّن. أداة Tailwind الموروثة `tw-shadow-ds-focus` | الحقل والبحث: «⚠️ لا يُستعمل --ds-focus-ring العام هنا بقرار صريح: فجوته البيضاء … تفصل الحلقة عن الحدّ، فيُقرآن خطّين بنفسجيّين بينهما فراغ» — لهما `--ds-field-ring` الملتصقة (`DEBT-005` منجز) |

**الفئة المساعدة الوحيدة** في `tokens.css`: «حلقة تركيز موحّدة. تُستخدم داخل مكونات النظام فقط — لا تُستخدم كـ utility عامة.»

```css
.ds-focus-ring:focus-visible {
  outline: none;
  box-shadow: var(--ds-focus-ring);
}
```

`.ds-field__control` **مستثنى** من قاعدة إخفاء التركيز العامة في `src/styles.scss` (`DEBT-011`، [`input-and-form.md`](../molecules/input-and-form.md)).

## 8 · الخط

> «**لا حجم خارج هذا الجدول.** 13px و15px ليستا درجتين» (الأسس). و«`letter-spacing: 0` دائمًا. بلا استثناء» — القاعدة كاملة في [`typography.md`](../foundations/typography.md). ولا توكن للوزن 300: «محمّل لكنه غير مستخدم في الواجهة: النص الخفيف يهبط بالتباين الفعلي».

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-font-family` | `'Readex Pro', system-ui, -apple-system, 'Segoe UI', sans-serif` | «Readex Pro محمّل في index.html بأوزان 300–700 ويدعم العربية» | — |
| `--ds-font-family-mono` | `ui-monospace, 'SFMono-Regular', 'Cascadia Mono', Consolas, monospace` | — | — |
| `--ds-font-size-2xs` | `0.625rem` (10px) | «شارات دقيقة فقط» · «شارة دقيقة فقط» (الأسس). تسمية الشريط الجانبي المطويّ «أصغر درجة في السلّم» ([`sidebar.md`](../organisms/sidebar.md)) | — |
| `--ds-font-size-xs` | `0.75rem` (12px) | «نص مساعد، رسالة خطأ» · «السطر التوضيحي تحت عنوان البطاقة (`description` في `app-card`)، النص المساعد، الشارة، رسالة الخطأ، سطر الفئة فوق العنوان» (الأسس). يقرؤه: `field-font-size` · `upload-prompt-size` · `upload-file-meta-size` | — |
| `--ds-font-size-md` | `0.875rem` (14px — الأساس) | «**النص الأساسي**» · «النص الجاري، وصف عنصر داخل بطاقة، نص الزر، خلية الجدول» (الأسس). نصّ شريط الإشارة: «text 14 (`--ds-font-size-md`) regular» (CLAUDE.md) | 13px: «وصف العنصر 14px لا 13px» |
| `--ds-font-size-lg` | `1rem` (16px) | «عنوان بطاقة، واسم عنصر داخل بطاقة». رأس لوحة الطيّ | 15px: «اسم العنصر في بطاقة 16px لا 15px» |
| `--ds-font-size-xl` | `1.125rem` (18px) | «عنوان درج / حوار». يقرؤه: `modal-title-size` | — |
| `--ds-font-size-2xl` | `1.25rem` (20px) | «عنوان قسم كبير». عنوان الصفحة على الجوال (`--ds-page-header-title-size` تحت 768px) | — |
| `--ds-font-size-3xl` | `1.5rem` (24px) | «عنوان الصفحة `<h1>`» — «والوحيد في الصفحة بهذا المقاس — عناوين الأقسام تحته 20px فما دون» | — |
| `--ds-font-size-4xl` | `1.875rem` (30px) | «عنوان بارز نادر» | — |
| `--ds-line-height-tight` | `1.3` | مع `3xl` و`4xl` (الأسس، و`fontSize` في `tokens.js`). عنوان رأس الصفحة | النص الجاري — «الحد الأدنى للنص الجاري **1.6**» |
| `--ds-line-height-snug` | `1.45` | مع `2xl` · `xl` · `xs` · `2xs` (الأسس و`tokens.js`) | النص الجاري |
| `--ds-line-height-normal` | `1.6` | مع `md` و`lg` — «العربية تحتاج تنفّسًا أكبر من اللاتينية». وصف رأس الصفحة، نصّ شريط الإشارة «line-height 1.6» (CLAUDE.md) | — |
| `--ds-line-height-relaxed` | `1.75` | — | — |
| `--ds-font-weight-regular` | `400` | «عادي». النص؛ نصّ الحقل وتلميحه | — |
| `--ds-font-weight-medium` | `500` | «متوسط (تسميات، أزرار)». «الوزن واحد للجميع» في التبويبات | تثقيل التبويب المفتوح: «تثقيل المفتوح يوسّعه فتزحف جيرانه» |
| `--ds-font-weight-semibold` | `600` | «شبه عريض (عناوين)». عنوان الصفحة، عنوان الحوار، الدرجة الحالية في الفتات | — |
| `--ds-font-weight-bold` | `700` | «عريض (نادر)» | — |

## 9 · المسافات

> «شبكة **4px**، والقيم الشائعة على مضاعفات **8px** (UI-03)». «**لا مسافة خارج هذا الجدول:** 10 و14 و18 و28 ليست درجات» (الأسس — [`spacing.md`](../foundations/spacing.md)).

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-space-0` | `0` | — | — |
| `--ds-space-1` | `0.25rem` (4) | «فجوة أيقونة/نص» (الأسس). يقرؤه: `tab-track-padding` · `tab-gap` · `accordion-inset` · `upload-progress-height` · `upload-file-meta-gap` · `upload-tile-padding` · `switch-face-dot` · `switch-face-gap` | ⚠️ الفجوة بين الأيقونة والنص: «Icon-to-label gap is 8px — everywhere (`--ds-space-2`)» (CLAUDE.md) و«8px. دائمًا» ([`iconography.md`](../foundations/iconography.md) §4) — تخالف سطر الأسس؛ لم يُحسم هنا |
| `--ds-space-2` | `0.5rem` (8) | «فجوة داخل مجموعة» (الأسس). الفجوة بين الأيقونة والنص في الأزرار وعناصر القائمة وصفوف القوائم والشريط الجانبي — «It comes from `gap` on the container» (CLAUDE.md). «أيقونة ونص في زر 8» (PLAYBOOK §0). يقرؤه: `button-gap` · `modal-action-gap` · `page-header-title-gap` · `page-header-actions-gap` · `table-toolbar-gap-actions` · `breadcrumb-gap` · `phone-country-gap` · `upload-list-gap` | «Never `mr-*`/`ml-*` on an icon inside a button — it stacks on top of the gap» (CLAUDE.md) |
| `--ds-space-3` | `0.75rem` (12) | «نصف خطوة مبرّرة: الفجوة بين التسمية والحقل» (`tokens.css`) · «تسمية ↔ حقل» (الأسس). يقرؤه: `table-toolbar-gap-fields` — «12 بين البحث والفلتر — 8 تجعل حدّي الحقلين يتلامسان» · `button-padding-x-sm` · `tab-padding-inline` · `accordion-gap` · `upload-file-padding` | ⚠️ مخطّط «المسافة تعبّر عن العلاقة» في الأسس يضع «التسمية ↕ 8px» — يخالف الجدول؛ لم يُحسم هنا |
| `--ds-space-4` | `1rem` (16) | «حشو عنصر» (الأسس). حشوة الصفحة وحشو البطاقة على الجوال (PLAYBOOK §0). يقرؤه: `table-cell-padding-block` · `table-cell-padding-inline` · `table-toolbar-gap-sides` · `save-bar-padding-block` · `button-padding-x-md` · `modal-header-gap` · `modal-margin` · `page-header-gap` | — |
| `--ds-space-5` | `1.25rem` (20) | «حشو بطاقة» (الأسس) — «حشو البطاقة 20 (16 على الجوال)» (PLAYBOOK §0). يقرؤه: `modal-padding` · `detail-panel-padding` | — |
| `--ds-space-6` | `1.5rem` (24) | «بين حقلين» (الأسس). يقرؤه: `page-padding-block` · `page-padding-inline` · `modal-gap` · `page-header-spacing` · `button-padding-x-lg` | — |
| `--ds-space-8` | `2rem` (32) | «بين قسمين» (الأسس). يقرؤه: `modal-footer-gap` — «الذيل منطقة فعل لا حقلٌ تالٍ» · `breadcrumb-min-height` | — |
| `--ds-space-10` | `2.5rem` (40) | «فراغ واسع داخل كتلة» | — |
| `--ds-space-12` | `3rem` (48) | «بين كتلتين رئيسيتين» | — |
| `--ds-space-16` | `4rem` (64) | «فراغ بين كتل كبيرة، نادر». يقرؤه: `button-ai-beam-size` (طول الشعاع) | — |

## 10 · أنصاف الأقطار

> «الاستدارة تتبع **نوع العنصر** لا ذوق الشاشة» و«10px ليست استدارة» (الأسس، PLAYBOOK §0 — [`radius.md`](../foundations/radius.md)). المقاسات الشائعة (CLAUDE.md): «controls, cards and dialogs radius 12 (`--ds-radius-control` / `--ds-radius-lg`), small containers 8, badges pill».

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-radius-xs` | `4px` | «خطوط هيكل التحميل» (الأسس). نقطة شريط التوزيع «مربّع مستدير 10 لا دائرة» | — |
| `--ds-radius-sm` | `6px` | «عنصر صغير داخل مكوّن: مربع الاختيار، رابط الفتات، زر صغير داخل مكوّن» (الأسس). أفاتار sm (`--ds-avatar-radius-sm`). يقرؤه: `upload-button-radius` · `swatch-radius` | — |
| `--ds-radius-md` | `8px` | «حاويات صغيرة: تنبيه، توست، هيكل تحميل» (`tokens.css`) · «حاوية صغيرة: تنبيه، توست، صورة رمزية، رقاقة فلتر» (الأسس). زرّ إغلاق الحوار «radius 8» والأفاتار «radius 8» (CLAUDE.md). يقرؤه: `tab-radius` · `upload-thumb-radius` · `accordion-header-radius` | زرّ أو حقل: «لا تكتب `--ds-radius-md` على زر أو حقل» (الأسس) |
| `--ds-radius-lg` | `12px` | «بطاقات وحوارات وعناصر التحكم» (`tokens.css`) · «**بطاقة، حوار، جدول، لوحة منبثقة**» (الأسس). شريط الإشارة في الحوار «radius 12 (`--ds-radius-lg`)» (CLAUDE.md). يقرؤه: `modal-radius` — «radius-lg لا xl: هذا الملف يقول إن lg «للبطاقات والحوارات»» · `accordion-radius` · `phone-panel-radius` · `table-selection-radius` | زرّ أو حقل مباشرة — يقرآن `--ds-radius-control` |
| `--ds-radius-xl` | `16px` | «معرّفان ولا يستعملهما أي مكوّن بعد — استعمالهما قرار نظام» (الأسس). ⚠️ بطاقة الرصيف المطويّ في الشريط الجانبي على `radius-xl` (قرار المنتج 2026-09-14، [`sidebar.md`](../organisms/sidebar.md)) — يخالف سطر الأسس؛ لم يُحسم هنا | بلا قرار نظام |
| `--ds-radius-2xl` | `20px` | «معرّفان ولا يستعملهما أي مكوّن بعد — استعمالهما قرار نظام» (الأسس) | بلا قرار نظام |
| `--ds-radius-pill` | `9999px` | «شارة، مفتاح تبديل، زر راديو، مؤشر التبويب» (الأسس) · «badges pill» (CLAUDE.md). يقرؤه: `table-bar-radius` · `upload-progress-radius` · `distribution-bar-radius` · `tab-indicator-radius` | — |
| `--ds-radius-control` | `var(--ds-radius-lg)` | «دلالي — استدارة كل عناصر التحكم التفاعلية (زر، حقل، قائمة). مصدر واحد: تغييره هنا يوحّد الزر والحقل معًا ولا يمس البطاقات» · «**كل عناصر التحكم: زر، حقل، بحث، رفع ملف، رقم الموبايل**» — «على 12px لا 8px (قرار 2026-09-10)». يقرؤه: `button-radius-*` · `search-radius` · `upload-radius` · `upload-tile-radius` · `tab-track-radius` | البطاقات — «ولا يمسّ البطاقات» |

## 11 · الظلال

> «الارتفاع (الظلال) — خافتة، لأن لوحة التحكم أداة عمل لا صفحة تسويق» (`tokens.css`). «الظل هنا يفصل الطبقات لا يزيّنها (UI-16)» (الأسس — [`elevation.md`](../foundations/elevation.md)). ولا إعادة تعريف في الداكن؛ وقائمة ما ينقص قبل تفعيله: «مراجعة الظلال — الظل الأسود لا يُرى على خلفية داكنة؛ الفصل يكون بالحدود».

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-elevation-0` | `none` | «مسطح على السطح» | — |
| `--ds-elevation-1` | `0 1px 2px rgba(16, 16, 20, 0.06), 0 1px 3px rgba(16, 16, 20, 0.04)` | «بطاقة مرفوعة» (الأسس). يقرؤه: `tab-shadow-active` (قرص المقطع المفتوح) · `accordion-shadow-open` — «المفتوحة ترتفع قليلًا عن أخواتها المطويّة» | — |
| `--ds-elevation-2` | `0 2px 4px rgba(16, 16, 20, 0.06), 0 4px 8px rgba(16, 16, 20, 0.05)` | «قائمة منسدلة، منبثق» (الأسس). يقرؤه: `detail-panel-shadow` — «تطفو فوق القائمة فتحتاج ظلًّا يقول ذلك» · `switch-thumb-shadow` — «الكرة تحتاج ظلًّا يرفعها عن المسار» | — |
| `--ds-elevation-3` | `0 4px 8px rgba(16, 16, 20, 0.06), 0 12px 20px rgba(16, 16, 20, 0.08)` | «حوار، Toast» (الأسس). يقرؤه: `phone-panel-shadow` | — |
| `--ds-elevation-4` | `0 8px 16px rgba(16, 16, 20, 0.08), 0 24px 40px rgba(16, 16, 20, 0.10)` | «درج جانبي» (الأسس). يقرؤه: `modal-shadow` — ⚠️ الحوار هنا على 4 والأسس تضعه على 3؛ لم يُحسم هنا | — |

## 12 · الحركة

> «الحركة — قصيرة وهادفة» (`tokens.css`). «الحركة لها غرض: تغذية راجعة، أو تغيير حالة، أو توجيه. الحركة الزخرفية ممنوعة» (الأسس — [`motion.md`](../foundations/motion.md)). «احترام تفضيل تقليل الحركة — إلزامي (WCAG 2.3.3)»: الكتلة `prefers-reduced-motion: reduce` تصفّر المدد الأربع (و`--ds-switch-duration`).

| التوكن | القيمة | تقليل الحركة | متى | متى لا |
|---|---|---|---|---|
| `--ds-duration-instant` | `80ms` | `0ms` | «تغيير لون» | — |
| `--ds-duration-fast` | `140ms` | `0ms` | «تمرير الفأرة، التركيز». يقرؤه: `button-transition` · `breadcrumb-transition` | — |
| `--ds-duration-normal` | `220ms` | `0ms` | «ظهور حوار أو درج» | — |
| `--ds-duration-slow` | `320ms` | `0ms` | «انتقال أكبر». يقرؤه: `button-ai-wash` — «320ms تجعله **يمتلئ**» (قرار المنتج 2026-09-15) | — |
| `--ds-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | — | يقرؤه: `button-transition` · `button-ai-wash` · `breadcrumb-transition` | دورة كاملة طويلة: «standard يُنجز معظم الدورة في أول 100ms فتبدو خاطفة» — للمفتاح `--ds-switch-easing` |
| `--ds-easing-enter` | `cubic-bezier(0, 0, 0, 1)` | — | — | — |
| `--ds-easing-exit` | `cubic-bezier(0.3, 0, 1, 1)` | — | — | — |

الحلقات المستمرّة **خارج هذا السلّم بقرار صريح**: «ذلك سلّم انتقالات (80–320ms)، وهذه حلقة مستمرّة» — `--ds-button-ai-loop` (3s) و`--ds-switch-duration` (600ms، قرار 2026-09-12) في §15.

## 13 · الطبقات (z-index)

> «نطاق z-index المحجوز. ممنوع استخدام أي قيمة خارج هذه التوكنز» (`tokens.css`). «**أي `z-index` بقيمة حرة في كود جديد مرفوض.** القيم الموروثة العالية دَين تقني مسجّل في PLAYBOOK» (الأسس — [`z-index.md`](../foundations/z-index.md)).

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-z-base` | `0` | — | — |
| `--ds-z-raised` | `10` | الشريط العلوي «ثابت على `--ds-z-raised`» ([`app-header.md`](../organisms/app-header.md)، [`tooltip.md`](../atoms/tooltip.md)) — «فرأس جدول ثابت يمرّ **فوقه** عند التمرير. عيب قائم» | — |
| `--ds-z-sticky` | `1020` | شريط الحفظ «`--ds-z-sticky` — لا أعلى» ([`save-bar.md`](../organisms/save-bar.md)). الرؤوس الملتصقة في الصفحة | «لا `z-index` أعلى من `--ds-z-sticky` في محتوى الصفحة، وإلا مرّ فوق الشريط» ([`page-layout.md`](../organisms/page-layout.md)) |
| `--ds-z-dropdown` | `1030` | «القائمة المنسدلة تستخدم `--ds-z-dropdown`» ([`select.md`](../molecules/select.md)) | لوحة تُفتح داخل الحوارات: «`--ds-z-dropdown` أدنى منها» (select.md) |
| `--ds-z-overlay` | `1040` | النافذة بملء الشاشة: «`--ds-z-overlay` (1040) للتعتيم والنافذة — **لا** `--ds-z-modal`» ([`sheet.md`](../organisms/sheet.md)) | — |
| `--ds-z-drawer` | `1050` | الدرج — «الحوار فوق الدرج لا تحته: الحوار يُفتح من الدرج (تأكيد حذف من لوح تفاصيل) لا العكس» | — |
| `--ds-z-modal` | `1055` | إطار الحوار — «فتعلوه التوستات (1080) وSweetAlert (1060)» ([`modal-drawer.md`](../organisms/modal-drawer.md)). «و1055 لا 1050: لوح محرّر الصفحات v2 عند 1055 خامّ، وعند 1050 كان يعلو كل حوار يُفتح منه. والتعادل يحسمه ترتيب DOM لصالح الحوار — إطار CustomDialogService يُلحق بـ body آخرًا» | «❌ `z-index` حر بدل `--ds-z-modal` / `--ds-z-drawer`» (modal-drawer.md) |
| `--ds-z-popover` | `1060` | قوائم `app-menu` ولوحة الفلترة ورقاقته عبر `FloatingPanel` «فوق الحوار (1055)» ([`overlay.md`](../molecules/overlay.md)). النسخة المرفوعة عند السحب ([`sortable.md`](../molecules/sortable.md)). اللوحة العائمة في الشريط الجانبي | «❌ `z-index` حرّ بدل `--ds-z-popover`» (overlay.md) |
| `--ds-z-toast` | `1080` | التوستات — تعلو إطار الحوار | — |
| `--ds-z-tooltip` | `1090` | التلميح «فوقها لأنه قد يقف على حافّتها» ([`sidebar.md`](../organisms/sidebar.md)) | — |

> ⚠️ جدول الأسس §8 يعطي `--ds-z-modal` = 1050 و`--ds-z-drawer` = 1055، و`tokens.css` بعكسهما (الدرج 1050، الحوار 1055)؛ و`modal-drawer.md` يذكر التبديل صراحةً («بُدّلت القيمتان») ويبقى فيه سطر بالقيم القديمة. القيم أعلاه من `tokens.css`؛ التعارض لم يُحسم هنا.

## 14 · عناصر التحكم واللمس

> «ارتفاعات عناصر التحكم — md = 44px يحقق الحد الأدنى لهدف اللمس» (`tokens.css`). «**اللمس 44px.** ولو كان العنصر المرسوم أصغر، الهدف القابل للنقر لا يقل عن `--ds-touch-target-min`» (فهرس المكوّنات — [`controls.md`](../foundations/controls.md)).

| التوكن | القيمة | على اللمس `(pointer: coarse)` | متى | متى لا |
|---|---|---|---|---|
| `--ds-control-height-sm` | `36px` | `var(--ds-touch-target-min)` | «جداول مضغوطة، شريط فلاتر» (الأسس). يقرؤه: `date-field-day-size` | — |
| `--ds-control-height-md` | `44px` | — | «**الافتراضي**» (الأسس). يقرؤه: `tab-min-height` («هدف لمس 44px (WCAG 2.5.5)») · `connection-logo-size` | الزرّ والبحث والحقل: «⚠️ الزرّ وحده مفكوك عن --ds-control-height-* بقرار صريح» — ثم البحث والحقل (40px، قرار 2026-09-10). و«لا تقس زرًّا بـ `h-ds-control-*` ولا العكس» (`tokens.js`) |
| `--ds-control-height-lg` | `52px` | — | «إجراء بارز» | — |
| `--ds-touch-target-min` | `44px` | — | الحد الأدنى لهدف اللمس — «ترتفع إليه على اللمس» `control-height-sm` و`button-height-sm/md` و`search-height` و`field-height-md`. يقرؤه: `modal-close-size` (44×44 — CLAUDE.md) · `phone-option-height` | — |

## 14.1 · اللون — الحقول

> «دلاليّة، يشاركها الحقلَ مربّعُ الاختيار وزرُّ الراديو وحقلُ البحث» ([`input-and-form.md`](../molecules/input-and-form.md)). تعبئة سطح الكتابة نفسها طبقة مكوّن `--ds-field-*` (§15).

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-color-field-border` | `var(--ds-neutral-500)` (3.07) | `var(--ds-neutral-600)` | حدّ الحقل: «WCAG 1.4.11 يفرض 3:1 لحدّ عنصر الواجهة حين يكون الحدّ وسيلة تمييزه… neutral-500 يبلغ 3.07:1». وجه المفتاح المطفأ `switch-icon-off`، وحدّ منطقة الإسقاط `upload-zone-border`. في الداكن «neutral-600 أدنى درجة تمرّ على الأسطح الثلاثة (4.01:1 على #1E1D23)» | «⛔ ولا يُحلّ هذا بتعبئة رمادية خفيفة تحت الحدّ: المعيار لا يجمع تباينين تحت الحدّ ليصنع منهما واحدًا فوقه». في الداكن لا `#3D3B45` («1.52:1 على السطح فيختفي الحقل») ولا `neutral-700` («يسقط عليه (2.95)») |
| `--ds-color-field-border-hover` | `var(--ds-neutral-600)` (4.17) | `var(--ds-neutral-500)` | «التمرير أدكن من الافتراضي، فينتقل مع الحدّ الجديد درجةً واحدة». في الداكن «يفتح درجةً: في الداكن الأبرز هو الأفتح» | على الحقل المركَّز — التمرير «لا يسري على الحقل المركَّز» (input-and-form.md) |
| `--ds-color-field-border-focus` | `var(--ds-color-focus-ring)` | — | «حدّ التركيز هو لون التركيز نفسه — لا درجة ثانية بجوار الحلقة… وربطه بـ --ds-color-focus-ring يقلبه في الداكن تلقائيًّا إلى brand-400 (6.98:1)». يقرؤه: `upload-zone-border-active` | `brand-800`: «كان brand-800 والحلقة brand-700: بنفسجيّان متقاربان حول حقلٍ واحد… وكان brand-800 هناك 2.01:1 فيرسب في WCAG 1.4.11» |
| `--ds-color-field-border-error` | `var(--ds-danger-600)` | — | حدّ الخطأ — «يثبت أحمر في التمرير والتركيز، وحافة التركيز تتبعه». يقرؤه: `upload-zone-border-error` | اللون وحده: «لا يُبلَّغ باللون وحده» — مع رسالة. «⚠️ ولا يُعاد تعريف --ds-color-field-border-error في الداكن: danger-600 على #1E1D23 تباينه 3.65:1 فيمرّ كما هو» |
| `--ds-color-field-border-disabled` | `var(--ds-neutral-300)` | `var(--ds-color-border-default)` | «المعطَّل يعود إلى الدرجة الفاتحة: غياب التفاعل يُرى بخفوت الحدّ مع خلفيته الرمادية، ولا يسري عليه 1.4.11 (استثناء العنصر المعطَّل)». يقرؤه: `upload-zone-border-disabled` | في الداكن بلا إعادة تعريف: «كان يرث neutral-300 من الفاتح — أسطع حدّ في الشاشة لحقلٍ معطَّل» |
| `--ds-color-field-bg` | `var(--ds-neutral-0)` | `#1E1D23` | «تعبئة عناصر الاختيار (مربّع الاختيار وزرّ الراديو) — تبقى بيضاء: تعبئة هذين تحمل **حالة** (محدَّد/غير محدَّد)» | تعبئة حقل الإدخال: «⚠️ `--ds-color-field-bg` (أبيض) ليست تعبئة الحقل» — الحقل يقرأ `--ds-field-bg`. وتلوينها رماديًّا «يجعل غير المحدَّد يُقرأ معطَّلًا» |
| `--ds-color-field-bg-disabled` | `var(--ds-neutral-100)` | `#26252C` | تعبئة المعطَّل في عناصر الاختيار. يقرؤه: `field-bg-disabled` · `field-bg-readonly` | — |
| `--ds-color-field-text` | `var(--ds-neutral-950)` | `var(--ds-neutral-50)` | نصّ الحقل | — |

## 14.2 · الأيقونات

> «**Size** from `--ds-icon-size-sm/md/lg` (16/20/24), never `fa-lg`/`fa-xl`/`fa-2x` and never a free value» (CLAUDE.md) · «❌ حجم أيقونة بقيمة حرة عندما يوجد `--ds-icon-size-*`» ([`iconography.md`](../foundations/iconography.md)). لا إعادة تعريف في الداكن.

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-icon-size-sm` | `16px` | «داخل الجداول والشارات» (iconography.md §3). يقرؤه: `button-icon-sm` · `breadcrumb-separator-size` · `phone-check-size` · `notice-strip-logo-glyph` | أيقونة داخل حقل — «16px أصغر من أن تُقرأ علامةً للحقل» (لها `--ds-field-icon-size` 18px، «استثناء واحد موثَّق») |
| `--ds-icon-size-md` | `20px` | «الافتراضي» (iconography.md §3) — `<ds-icon>` بلا `size` «decorative, 20px» (CLAUDE.md). زرّ إغلاق الحوار: «`essential/close-circle` at 20» (CLAUDE.md). يقرؤه: `button-icon-md` · `modal-close-icon` · `phone-flag-size` | أيقونة داخل حقل — «20px أثقل منه» (من نصّ الحقل 12px) |
| `--ds-icon-size-lg` | `24px` | «رؤوس الصفحات والحالات الفارغة» (iconography.md §3). يقرؤه: `button-icon-lg`. صفّ الشريط الجانبي (`icon-size-lg` — [`sidebar.md`](../organisms/sidebar.md)) | — |

`--ds-icon-glyph` **ليس توكنًا** في `tokens.css`: يضبطه المستهلك نفسه — «a consumer needing a larger tile than glyph uses `size="inherit"` and sets the element's size plus `--ds-icon-glyph` in CSS (the collapsed sidebar does this)» (CLAUDE.md).

## 14.3 · تخطيط الصفحة

> الحشوة من `tokens.css`: «المسافة من حافّة السطح الأبيض إلى أوّل المحتوى وآخره… مصدر واحد تقرؤه قشرة اللوحة (base.component.scss) على `.content-body` نفسها، فتأخذها كل صفحة مهما كان غلافها الداخلي، ولا تكتب صفحةٌ حشوتها بنفسها». والتفاصيل في [`page-layout.md`](../organisms/page-layout.md). لا إعادة تعريف في الداكن.

| التوكن | القيمة | الجوال (`max-width: 767.98px`) | متى | متى لا |
|---|---|---|---|---|
| `--ds-page-padding-block` | `var(--ds-space-6)` (24) | `var(--ds-space-4)` (16) | «**تطبّقها القشرة لا الصفحة**» (الأسس). «24 من الجهات الأربع، و16 على الجوال: على شاشة 360px كانت 24 من كل جهة مع هامشَي السطح تأكل نحو خُمس العرض» | حشوة تكتبها الصفحة بنفسها — «ولا تكتب صفحةٌ حشوتها بنفسها» |
| `--ds-page-padding-inline` | `var(--ds-space-6)` (24) | `var(--ds-space-4)` (16) | كالسطر أعلاه. «وفتات الخبز يقرأ الحشوة الأفقية نفسها فيصطفّ مع عنوان الصفحة» | كالسطر أعلاه |
| `--ds-container-max` | `1440px` | — | «عرض المحتوى». أداة Tailwind الموروثة `max-w-ds-container` | — |
| `--ds-prose-max` | `72ch` | — | «**سطر الوصف لا يتجاوز 72 حرفًا** (`--ds-prose-max`): فوقها تفقد العين بداية السطر التالي» (page-layout.md). يقرؤه: `page-header-description-max` | — |

والكتلة نفسها على الجوال: «الصفحة تضيق فيضيق إطارها، والمحتوى يبقى. 767.98px هو حدّ القشرة نفسه (base.component.scss): تحته يصير الشريط الجانبي درجًا يطفو… ولا يُصغَّر شيء آخر: الرأس يعيد ترتيب نفسه (العنوان ثم الإجراء بعرض كامل) بدل أن يتقلّص — RESPONSIVE-02».

## 14.4 · اللون — أنواع الملفات

> «ألوان أنواع الملفات — تمييزٌ بصريّ لا حالة (قرار المنتج 2026-09-16). طبقةٌ فئوية مستقلّة: تستعير من السلالم مباشرةً لا من التوكنز الدلالية، فلا يصير الأخضر «نجاحًا» ولا الأحمر «خطرًا» حين يعني «فيديو» و«PDF». تُستعمل في مربّع الأيقونة وحده (الرفوف، صفّ الجدول، بطاقة الشبكة)، ولا تُستعمل خلفيةً لعنصر كبير ولا لونًا لنصّ. النوع مكتوب دائمًا بجوار الأيقونة، فاللون لا يحمل معنى وحده (WCAG 1.4.1).» (`tokens.css`). وفي الأسس: «**لا تُستعمل خارج الملفات** — ليست لونًا عامًّا لأي تصنيف آخر» و«ما يُختار وتعبئته لون العلامة (الرفّ المحدَّد) يتخلّى عن لون نوعه». وفي الداكن: «الرمز يفتح والخلفية تُغمق، كبقية الأزواج هنا».

| التوكن | القيمة | الداكن | متى | متى لا |
|---|---|---|---|---|
| `--ds-filetype-video-fg` | `var(--ds-success-700)` | `var(--ds-success-400)` | رمز مربّع أيقونة الفيديو — «فيديو أخضر» | خلفية صفّ أو بطاقة · نصّ ملوّن · شارة · خارج الملفات · الرفّ المحدَّد |
| `--ds-filetype-video-bg` | `var(--ds-success-50)` | `var(--ds-success-950)` | تعبئة مربّع أيقونة الفيديو | كالسطر أعلاه |
| `--ds-filetype-image-fg` | `var(--ds-warning-700)` | `var(--ds-warning-400)` | رمز مربّع أيقونة الصور — «صور برتقالي» | كالسطر أعلاه |
| `--ds-filetype-image-bg` | `var(--ds-warning-50)` | `var(--ds-warning-950)` | تعبئة مربّع أيقونة الصور | كالسطر أعلاه |
| `--ds-filetype-pdf-fg` | `var(--ds-danger-700)` | `var(--ds-danger-400)` | رمز مربّع أيقونة PDF — «PDF أحمر» | كالسطر أعلاه |
| `--ds-filetype-pdf-bg` | `var(--ds-danger-50)` | `var(--ds-danger-950)` | تعبئة مربّع أيقونة PDF | كالسطر أعلاه |
| `--ds-filetype-audio-fg` | `var(--ds-info-700)` | `var(--ds-info-400)` | رمز مربّع أيقونة الصوت — «صوت أزرق» | كالسطر أعلاه |
| `--ds-filetype-audio-bg` | `var(--ds-info-50)` | `var(--ds-info-950)` | تعبئة مربّع أيقونة الصوت | كالسطر أعلاه |
| `--ds-filetype-other-fg` | `var(--ds-accent-700)` | `var(--ds-accent-400)` | رمز مربّع أيقونة ما عداها — «وما عداها وردي» | كالسطر أعلاه |
| `--ds-filetype-other-bg` | `var(--ds-accent-50)` | `var(--ds-accent-950)` | تعبئة مربّع أيقونة ما عداها | كالسطر أعلاه |

## 14.5 · اللون — قنوات البيع

> «لونا قناتي البيع في المخططات والنقاط» — التفاصيل في [`chart.md`](../organisms/chart.md) § لونا قناتي البيع و[`distribution-bar.md`](../molecules/distribution-bar.md). لا إعادة تعريف في الداكن.

| التوكن | القيمة | متى | متى لا |
|---|---|---|---|
| `--ds-channel-site` | `var(--ds-brand-800)` | «لون مبيعات الموقع في كل مخططات اللوحة» (chart.md) | أجزاء محايدة: «ولا توكنز حالة (أخضر/أحمر) لأجزاء محايدة» (distribution-bar.md) |
| `--ds-channel-plus` | `#0B7A5E` | «أكاديميات بلس أخضر #0B7A5E بقرار المنتج 2026-09-24 (كان --ds-info-500): لونه لا درجة من سُلّم مشترك — تباينه مع الأبيض 5.3، فيصلح نصًّا أيضًا». «الأخضر لخطّ أكاديميات بلس في المخططات وحده» ([`sidebar.md`](../organisms/sidebar.md)) | الصفحة المفتوحة في الشريط الجانبي — «كان أخضر يومًا واحدًا (`--ds-sidebar-active-bg/fg`، حُذفا)» |
| `--ds-channel-site-mid` | `var(--ds-brand-600)` | «درجتان أفتح لكل قناة — لأجزاء كلٍّ واحد داخل عمود القناة، كالرسوم والعمولة في «من الإجمالي إلى الصافي»» (قرار المنتج 2026-09-24). تباين 4.62 | النصّ — «للأجزاء لا للنصّ» (chart.md) |
| `--ds-channel-site-subtle` | `var(--ds-brand-400)` | كالسطر أعلاه. تباين 2.40 | كالسطر أعلاه |
| `--ds-channel-plus-mid` | `#29A985` | «بفرق الإضاءة نفسه (OKLCH) من #0B7A5E». تباين 2.95 | كالسطر أعلاه |
| `--ds-channel-plus-subtle` | `#85D6B9` | كالسطر أعلاه. تباين 1.71 | كالسطر أعلاه |

## 15 · توكنز المكوّنات

> «Primitive ← Semantic ← Component (DS-Rule 6)» — طبقة كل مكوّن فوق الطبقة الدلالية، فتغييرُ مقاسه لا يمسّ غيره. معظمها «مشتقة من الطبقة الدلالية… لا قيمة خام إلا مقاسات… تُكتب لأنها قياس لا اشتقاق. لا تحتاج نسخة داكنة: الاشتقاق يتبع إعادة تعريف الدلالي في كتلة الوضع الداكن تلقائيًا» (تعليق الجدول). **متى ومتى لا لكل توكن في مواصفة مكوّنه** — لا يقرأ مكوّنٌ توكنَ مكوّنٍ آخر إلا حيث تشتقّه `tokens.css` صراحةً (مثل `--ds-date-field-cell-size: var(--ds-button-height-md)`).

| البادئة | العدد | المواصفة |
|---|---|---|
| `--ds-button-*` | 21 | [`button.md`](../atoms/button.md) |
| `--ds-switch-*` | 19 | [`switch.md`](../atoms/switch.md) |
| `--ds-avatar-*` | 7 | [`avatar.md`](../atoms/avatar.md) |
| `--ds-type-cover-*` | 13 | [`type-cover.md`](../atoms/type-cover.md) |
| `--ds-field-*` | 11 | [`input-and-form.md`](../molecules/input-and-form.md) |
| `--ds-search-*` | 9 | [`search-field.md`](../molecules/search-field.md) |
| `--ds-phone-*` | 24 | [`phone.md`](../molecules/phone.md) |
| `--ds-swatch-*` | 3 | [`color-field.md`](../molecules/color-field.md) |
| `--ds-date-field-*` | 3 | [`date-range-field.md`](../molecules/date-range-field.md) |
| `--ds-upload-*` | 46 | [`upload.md`](../molecules/upload.md) |
| `--ds-breadcrumb-*` | 12 | [`breadcrumb.md`](../molecules/breadcrumb.md) |
| `--ds-notice-strip-*` | 4 | [`notice-strip.md`](../molecules/notice-strip.md) |
| `--ds-toast-*` | 21 | [`alert-toast.md`](../molecules/alert-toast.md) (أُضيفت 2026-09-26) |
| `--ds-distribution-*` | 7 | [`distribution-bar.md`](../molecules/distribution-bar.md) |
| `--ds-accordion-*` | 15 | [`accordion.md`](../molecules/accordion.md) |
| `--ds-tab-*` | 19 | [`tabs.md`](../molecules/tabs.md) |
| `--ds-connection-*` | 9 | [`connection-card.md`](../molecules/connection-card.md) |
| `--ds-table-*` (عدا `--ds-table-columns-*`) | 32 | [`table.md`](../organisms/table.md) |
| `--ds-table-columns-*` | 1 | [`table-columns.md`](../organisms/table-columns.md) |
| `--ds-sidebar-*` | 2 | [`sidebar.md`](../organisms/sidebar.md) |
| `--ds-app-header-*` | 1 | [`app-header.md`](../organisms/app-header.md) |
| `--ds-page-header-*` | 13 | [`page-layout.md`](../organisms/page-layout.md) |
| `--ds-modal-*` | 26 | [`modal-drawer.md`](../organisms/modal-drawer.md) |
| `--ds-detail-panel-*` | 6 | [`detail-panel.md`](../organisms/detail-panel.md) |
| `--ds-save-bar-*` | 2 | [`save-bar.md`](../organisms/save-bar.md) |
| `--ds-shelf-*` | 2 | [`shelf-tabs.md`](../organisms/shelf-tabs.md) |
| `--ds-filter-panel-*` | 3 | [`filtering.md`](../patterns/filtering.md) |
| **المجموع** | **331** | |

> **قيس 2026-09-26** على `tokens.css` (الأسماء المعرَّفة بلا تكرار، في `:root` والداكن وقواعد الوسائط معًا): كل بادئة مكوّن فيه لها صفّ هنا، وكل عدد في الجدول مطابق. البادئات الأخرى في الملف أسس لها أقسامها أعلاه: `--ds-page-padding-*` · `--ds-container-max` · `--ds-prose-max` (§14.3) · `--ds-filetype-*` (§14.4) · `--ds-channel-*` (§14.5) · `--ds-control-height-*` · `--ds-touch-target-min` (§14) · `--ds-icon-size-*` (§14.2) · `--ds-focus-*` (§7).
>
> صُحّح 2026-09-26: كان الجدول بلا صفّ لـ`--ds-toast-*` (21 توكنًا، أُضيفت اليوم) ومجموعه 310؛ صار 331.
>
> صُحّح 2026-09-26: كان هنا «⚠️ ثلاث بادئات لا تذكر مواصفتُها الأصلية توكنزها بعد: `--ds-distribution-*` (`distribution-bar.md`)، و`--ds-shelf-*` (`shelf-tabs.md`)، و`--ds-avatar-*`» — والمواصفات الثلاث تذكرها اليوم في §6 من كلٍّ منها (السبعة كلها في `distribution-bar.md`، و`--ds-shelf-selected-*` في `shelf-tabs.md`، والسبعة في `avatar.md`).

### توكنز مكوّنات يسمّيها قرار في CLAUDE.md

| التوكن | القيمة | القرار |
|---|---|---|
| `--ds-notice-strip-warning-bg` | `var(--ds-warning-25)` (`#FEF8F5`) | الإشارة داخل الحوار: «background `--ds-notice-strip-warning-bg` (`#FEF8F5`) — no border, no side stripe, no icon, no close button» (قرار المنتج 2026-09-14 — CLAUDE.md). ومن `tokens.css`: «خلفية النيّة warning — أفتح من خلفية التنبيه (قرار المنتج 2026-09-13). تقرؤها أيضًا قاعدة «طرق سحب الأرباح» التي يُكتب عليها الشريط» |
| `--ds-table-clamp-line-length` | `60ch` | عمود النصّ في الجدول المزدحم: `class="ds-page__clamp-2"` — «a **fixed line length** of `--ds-table-clamp-line-length`, two lines, then «…»» (قرار المنتج 2026-09-21 — CLAUDE.md). الاستثناء الوحيد: جدول داخل حاوية نصف الصفحة أو أقلّ، يُرخى إلى حدّ أقصى في stylesheet الصفحة نفسها — «never change the utility itself» (المقتطف أدناه) |
| `--ds-avatar-size-sm` · `-md` · `-lg` | `24px` · `32px` · `40px` | «Avatar ⇒ `<app-avatar>`: 24 / 32 / 40, radius 8 (**not a circle**), `--ds-avatar-*`» (قرار المنتج 2026-09-15 — CLAUDE.md) |
| `--ds-avatar-radius` · `-radius-sm` | `var(--ds-radius-md)` (8) · `var(--ds-radius-sm)` (6) | كالسطر أعلاه. ⚠️ `tokens.css` يجعل sm على 6: «الاستدارة أصغر في sm: 8px على مربّع 24 تلتهم ثلثه فيعود شبه دائري»، وCLAUDE.md يقول «radius 8» — لم يُحسم هنا |
| `--ds-modal-close-*` (6) | الحجم `var(--ds-touch-target-min)` · الأيقونة `var(--ds-icon-size-md)` · الاستدارة `var(--ds-radius-md)` | «Close button ⇒ the `<app-modal>` one: 44×44, `essential/close-circle` at 20, radius 8, `--ds-modal-close-*`. Never an `✕` glyph, an `<svg>` of two lines, or a bordered square» (قرار المنتج 2026-09-15 — CLAUDE.md) |
| `--ds-modal-width-xl` | `960px` | «Two fields side by side ⇒ a wider dialog… the dialog goes to `<app-modal size="xl">` (960px) — at the default `md` (560) or `lg` (640) each column is too narrow for its value» (CLAUDE.md) |

```scss
.stats-card ::ng-deep .ds-page__clamp-2 {
  inline-size: auto;
  max-inline-size: var(--ds-table-clamp-line-length);
}
```

### توكنز مكوّنات تتغيّر بالسياق

| السياق | التوكنز |
|---|---|
| الداكن (`html.dark-theme`) | `--ds-type-cover-panel-from` · `-panel-to` · `-sheet` · `-sheet-edge` · `-sheet-back` · `-line` · `-line-strong` · `-mark` · `-shadow` · `--ds-shelf-selected-bg` · `-paper` · `--ds-accordion-header-bg` · `-bg-hover` · `--ds-field-bg` (`#1A191F`) · `--ds-field-bg-focus` (`#1E1D23`) · `--ds-field-bg-disabled` · `--ds-field-bg-readonly` · `--ds-field-ring` (`var(--ds-brand-950)`) · `--ds-modal-backdrop` (`var(--ds-color-overlay)`) |
| اللمس `(pointer: coarse)` | `--ds-button-height-sm` · `--ds-button-height-md` · `--ds-search-height` · `--ds-field-height-md` ← كلها `var(--ds-touch-target-min)` |
| الجوال `(max-width: 767.98px)` | `--ds-page-header-title-size` ← `var(--ds-font-size-2xl)` (20) · `--ds-page-header-spacing` ← `var(--ds-space-4)` (16) |
| تقليل الحركة | `--ds-switch-duration` ← `0ms` |

### أسماء في المواصفات ليست توكنز في tokens.css

لا تُعامَل توكنزًا — إمّا متغيّر يضبطه مكوّن أو مستهلك وقت التشغيل، أو اقتراح لم يُضَف، أو اسم محذوف:

| الاسم | أين ذُكر | ما هو |
|---|---|---|
| `--ds-canvas-sticky-header` · `-tabs` · `-filters` | `page-layout.md` · `segmented.md` | متغيّرات ينشرها ما يلتصق بأعلى الكانفاس بارتفاعه («وينشر `--ds-canvas-sticky-filters`») |
| `--ds-table-total-offset` | `table.md` | «`<app-table>` يقيس صفّ الإجمالي… ويضع ارتفاعه في `--ds-table-total-offset`… و`--ds-table-total-height` (44) احتياطٌ قبل القياس» |
| `--ds-toast-inset-inline-start` · `--ds-toast-wash-angle` | `alert-toast.md` | متغيّران يضبطهما الكود (قيس 2026-09-26): الأول في `src/styles.scss` على `body.ds-admin-session` بعرض الشريط الجانبي (ممتدًّا ومطويًّا وعلى الجوال)، واحتياطه في المكوّن `--ds-space-6`؛ والثاني في `toast-host.component.ts` — `90deg`، و`270deg` تحت `[dir="rtl"]` |
| `--ds-save-bar-lift` | `save-bar.md` | «بقدر الشريط وهامش الكانفاس تحته» — ترفع الأيقونتين العائمتين (قرار المنتج 2026-09-24) |
| `--ds-icon-glyph` | `icon.md` · `sidebar.md` · CLAUDE.md | يضبطه المستهلك مع `size="inherit"` (§14.2) |
| `--ds-button-ai-fill` · `--ds-button-ai-edge-start/end` | `button.md` | طبقتا زرّ الذكاء، «مسجَّلة نوعًا `<color>` عبر `@property`» في `button.component.scss` |
| `--ds-field-height-sm/-lg` · `--ds-field-padding-x` · `--ds-field-radius` · `--ds-field-gap` · `--ds-field-label-size` · `--ds-field-label-color` · `--ds-field-hint-size/-color` · `--ds-field-error-color` · `--ds-color-field-placeholder` | `input-and-form.md` | «**التوكنز المقترحة** (غير موجودة — لا تُستعمل قبل إضافتها)» |
| `--ds-color-field-bg-readonly` | `tokens.js` (`field.readonly`) · `TECHNICAL-DEBT.md` (`DEBT-002`) | غير معرَّف — الموجود `--ds-field-bg-readonly` (انظر «إعادة تسمية توكن أو حذفه») |
| `--ds-color-field-bg-focus` | `input-and-form.md` · `TECHNICAL-DEBT.md` (`DEBT-004`) | اسم سابق — التعبئة اليوم `--ds-field-bg-focus` |
| `--ds-sidebar-active-bg/fg` · `--ds-color-action-ai-gradient-highlight` | `sidebar.md` · `tokens.css` | محذوفة |

## إضافة توكن

هذا **تغيير في نظام التصميم**، لا قرار شاشة. قبل الإضافة:

- [ ] هل يوجد توكن دلالي قائم يفي بالغرض؟
- [ ] هل الاسم يعبّر عن **الوظيفة** لا عن مكان الاستخدام؟
      ✅ `--ds-color-text-muted` · ❌ `--ds-color-blog-page-title`
- [ ] هل عُرِّف في الوضعين الفاتح والداكن؟
- [ ] هل دُقِّق تباينه؟
- [ ] هل أُضيف إلى `tokens.js` إن كان يحتاج أداة Tailwind؟

**البوابة:** «لون أساسي أو أي توكن دلالي» و«مقياس الخط أو المسافات أو أنصاف الأقطار» تغييرٌ في نظام التصميم — «هذه لا تُقرَّر داخل شاشة. تُراجَع أولًا، ثم تُطبَّق في `tokens.css` أو في المكوّن المشترك» ([الحوكمة](../../DESIGN.md#8-الحوكمة)). والأسس: «وإن احتاجت شاشة قيمة غير موجودة فذلك قرار نظام تصميم يُعرض أولًا (الحوكمة)، لا قيمة تُكتب في الشاشة».

ثم يُضاف صفّه إلى هذا الملف — وإلا فهو غير موجود.

## إعادة تسمية توكن أو حذفه

> ⚠️ **غير موثّق بعد:** إجراء إعادة تسمية توكن أو حذفه — من يقرّره، وكيف يُبحث عن مستهلكيه في الكود وفي `tokens.js` والمواصفات، وهل يبقى الاسم القديم مرادفًا مؤقتًا، وأين يُسجَّل. لا يصفه أيّ مصدر.

ما حُذف أو تغيّر اسمه حتى اليوم — للتاريخ، لا إجراءً:

| الاسم | ما جرى | المصدر |
|---|---|---|
| `--ds-color-action-ai-gradient-highlight` | «أُزيل في 2026-09-11: كان بقعة الضوء في الدوران المخروطي، والشعاع حلّ محلّه» | `tokens.css` |
| `--ds-sidebar-active-bg` · `--ds-sidebar-active-fg` | «كان أخضر يومًا واحدًا (`--ds-sidebar-active-bg/fg`، حُذفا)» | [`sidebar.md`](../organisms/sidebar.md) |
| `--ds-color-field-bg-focus` | «كان يشير إلى `--ds-color-brand-bg`… الآن `--ds-field-bg-focus: var(--ds-neutral-0)`» | [`input-and-form.md`](../molecules/input-and-form.md) · `DEBT-004` |
| `--ds-color-field-bg-readonly` | غير معرَّف في `tokens.css`، وما زال `tokens.js` يربطه (`field.readonly: ref('color-field-bg-readonly')`) و`DEBT-002` يقول إنه «معرَّف في `tokens.css` ولا يقرؤه أحد». المعرَّف `--ds-field-bg-readonly` | [`tokens.js`](../../tokens/tokens.js) · [`TECHNICAL-DEBT.md`](../../TECHNICAL-DEBT.md) |

## روابط

- **الأسس:** [`color.md`](../foundations/color.md) · [`typography.md`](../foundations/typography.md) · [`spacing.md`](../foundations/spacing.md) · [`radius.md`](../foundations/radius.md) · [`elevation.md`](../foundations/elevation.md) · [`motion.md`](../foundations/motion.md) · [`controls.md`](../foundations/controls.md) · [`z-index.md`](../foundations/z-index.md) · [`iconography.md`](../foundations/iconography.md) · [`accessibility.md`](../foundations/accessibility.md) · [`dark-mode.md`](../foundations/dark-mode.md) · [`rtl.md`](../foundations/rtl.md)
- **المصدر:** [`tokens.css`](../../tokens/tokens.css) · [`tokens.js`](../../tokens/tokens.js)
- **الأصل:** `tokens/README.md` · `tokens.css` — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
- **الحوكمة:** [`README.md` § الحوكمة](../../DESIGN.md#8-الحوكمة)
- **المرجع السريع قبل أي رسم:** [`PLAYBOOK.md` § 0](../../migration/PLAYBOOK.md#0-راجع-المقاسات-المعتمدة-قبل-أي-رسم)
- **الديون:** [`TECHNICAL-DEBT.md`](../../TECHNICAL-DEBT.md)
- **القرارات:** [`CLAUDE.md`](../../../CLAUDE.md)
