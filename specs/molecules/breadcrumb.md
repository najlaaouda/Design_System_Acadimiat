---
title: مسار التنقّل
name: breadcrumb
tier: molecule
group: layers-navigation
status: implemented
selector: ['<app-breadcrumb>', '<app-breadcrumbs>']
source: ['src/app/shared/ui/breadcrumb', 'src/app/standalone/breadcrumbs']
origin: ['Design-System/components/breadcrumb.md']
keywords: ['مسار', 'تنقل', 'breadcrumb', 'aria-current', 'طيّ', 'nav']
last_verified: 2026-09-26
---

# مسار التنقّل (Breadcrumb) — `<app-breadcrumb>`

> سؤالان لا ثالث لهما: **أين أنا** في شجرة الموقع، و**كيف أصعد** منها درجة.

## 1. متى تستخدمه

فيظهر حين يكون للصفحة أمّ حقيقية — «تعديل الدرس» داخل دورة داخل المنتجات — ويختفي في الصفحات المسطّحة. والمكوّن يخفي نفسه عند `items.length < 2`، فلا حاجة إلى `@if` حوله.

## 2. متى لا تستخدمه

**وهو ليس تاريخًا للتصفّح.** الصعود درجةً في الشجرة غير الرجوع خطوةً في التاريخ، وزرّ المتصفّح يتكفّل بالثاني. ولهذا لا زرّ «رجوع» فيه — بخلاف `<app-breadcrumbs>` القديم.

← **لا مسار فوق صفحة في الشريط الجانبي** (قرار المنتج 2026-09-14): القرار في [`page-naming.md` §7](../patterns/page-naming.md#7-القواعد).

← **التبويب ليس درجةً في المسار**: القرار في [`page-naming.md` §7](../patterns/page-naming.md#التبويب-ليس-درجةً-في-المسار).

## 3. التشريح

| # | الجزء | لماذا |
|---|---|---|
| ١ | `<nav aria-label>` | معلَم مسمّى. في صفحة اللوحة ثلاثة معالم تنقّل على الأقل — القائمة الجانبية وشريط الأقسام وهذا — وثلاثة بلا أسماء أسوأ من واحد |
| ٢ | `<ol>` | الترتيب جزء من المعنى: الأولى جذر والأخيرة موضعنا. وهو ما يقول لقارئ الشاشة «عنصر ٢ من ٤» بلا سمة تُكتب وتُنسى |
| ٣ | الفاصل | شيفرون مرسوم LTR ويُعكس في RTL. مخفيّ بـ `aria-hidden` وخارج مساحة النقر. في الكود `<svg>` مضمَّن في القالب (16×16، خطّ 1.5 بـ`currentColor`، `focusable="false"`) لا `<ds-icon>` — انظر [§15](#15-الدَّين-القائم) (وُثّق 2026-09-26 من الكود) |
| ٤ | الدرجة الحالية | نصّ لا رابط، أدكن وأثقل، ويحمل `aria-current="page"` |
| ٥ | زرّ «…» | يظهر حين تتجاوز الدرجات `collapseAfter`. زرّ حقيقي، واسمه يحمل عدد المخفيّ فلا يُسمع «نقطة نقطة نقطة» |

**لماذا الأخيرة نصّ لا رابط:** رابط يقود إلى الصفحة التي نحن فيها وعدٌ كاذب، وقارئ الشاشة يعلنه رابطًا فيُحسب وجهةً أخرى.

## 4. الأنواع والمقاسات

### الطيّ

عند تجاوز `collapseAfter` يُطوى **الوسط**، وتبقى الأولى والأخيرتان:

```
الرئيسية › المنتجات › دورة التسويق › الوحدة الثانية › الدروس › تعديل الدرس
                              ↓  collapseAfter = 4
الرئيسية › … › الدروس › تعديل الدرس
```

الجذر يقول أين نحن من الموقع، والأب هو الوجهة الوحيدة التي يُرجَّح أن يقصدها المستخدم — وهما ما يبقى.

## 5. الحالات

(وُثّق 2026-09-26 من الكود — [`breadcrumb.component.scss`](../../../src/app/shared/ui/breadcrumb/breadcrumb.component.scss) و[المحوِّل](../../../src/app/standalone/breadcrumbs/breadcrumbs.component.ts))

| الحالة | الدرجة الرابط | زرّ «…» | الدرجة الحالية |
|---|---|---|---|
| Default | `--ds-breadcrumb-link-fg` (`text-secondary`) · 400 · بلا تسطير | لون الرابط · بلا خلفية | `--ds-breadcrumb-current-fg` (`text-primary`) · 600 · `aria-current="page"` |
| Hover | `--ds-breadcrumb-link-fg-hover` (`text-primary`) + تسطير بإزاحة `0.2em` · انتقال اللون `--ds-breadcrumb-transition` | `text-primary` + خلفية `--ds-color-surface-sunken` | لا ينطبق — نصّ لا رابط |
| Focus | ظلّ `--ds-focus-ring` (لا `outline`) باستدارة `--ds-breadcrumb-link-radius`، ومعه لون المرور وتسطيره | ظلّ `--ds-focus-ring` بالاستدارة نفسها | لا ينطبق — لا يُركَّز عليها |
| Active | لا قاعدة `:active` | لا قاعدة `:active` | — |
| Disabled | لا ينطبق. الدرجة بلا `link` نصّ (`ds-breadcrumb__link--inert`) بلون الروابط و`cursor: default` — لكنها تأخذ شكل المرور، انظر [§15](#15-الدَّين-القائم) | — | — |
| Loading | في المكوّن لا ينطبق. **المحوِّل** لا يرسم المسار كله ما دام اسم الصفحة الحالية لم يصل (عنوان `SESSION:` فارغ)، ويُسقط كل درجة أعلى بلا اسم، ثم يُعيد البناء حين تُبلغ الصفحة `BreadcrumbsService.changed` | — | — |
| Error · Success | لا ينطبق | — | — |
| بعد الكشف | تظهر الدرجات كلّها | يختفي الزرّ، والتركيز إلى أوّل رابط كُشف ([§8](#8-السلوك-ولوحة-المفاتيح)) | — |

## 6. التوكنز

| التوكن | يشير إلى | القيمة |
|---|---|---|
| `--ds-breadcrumb-gap` | `--ds-space-2` | 8px |
| `--ds-breadcrumb-min-height` | `--ds-space-8` | 32px |
| `--ds-breadcrumb-font-size` | `--ds-font-size-md` | 14px |
| `--ds-breadcrumb-link-fg` | `--ds-color-text-secondary` | neutral-800 |
| `--ds-breadcrumb-link-fg-hover` | `--ds-color-text-primary` | neutral-950 |
| `--ds-breadcrumb-link-weight` | `--ds-font-weight-regular` | 400 |
| `--ds-breadcrumb-link-radius` | `--ds-radius-sm` | 6px |
| `--ds-breadcrumb-current-fg` | `--ds-color-text-primary` | neutral-950 |
| `--ds-breadcrumb-current-weight` | `--ds-font-weight-semibold` | 600 |
| `--ds-breadcrumb-separator-fg` | `--ds-color-text-muted` | neutral-700 |
| `--ds-breadcrumb-separator-size` | `--ds-icon-size-sm` | 16px |
| `--ds-breadcrumb-transition` | `--ds-duration-fast` + `--ds-easing-standard` | 140ms |

**لماذا الفاصل بـ `text-muted`:** هو مخفيّ عن قارئ الشاشة، فهو عنصر واجهة غير نصّي — يكفيه 3:1 (WCAG 1.4.11)، لا 4.5:1.

## 7. الواجهة البرمجية

| المدخل | النوع | الافتراضي | ماذا يفعل |
|---|---|---|---|
| `items` | `readonly BreadcrumbItem[]` | `[]` | الدرجات بترتيبها: الأولى الجذر والأخيرة موضعنا |
| `label` | `string` | `مسار التنقّل` | اسم المعلَم — صفه بما يصفه: «مسار صفحة الدورة» لا «مسار» |
| `collapseAfter` | `number` | `4` | يُطوى ما زاد على هذا العدد |

و`BreadcrumbItem` هو `{ label, link?, queryParams? }`. الدرجة بلا `link` نصّ لا رابط — والأخيرة كذلك دائمًا مهما مُرّر لها.

**تفاصيل من الكود** (وُثّق 2026-09-26 من الكود): الأنواع `label: string` · `link?: string | readonly unknown[]` (ما يقبله `routerLink`) · `queryParams?: Record<string, unknown>`. تغيير `items` يعيد الطيّ إن كان قد كُشف. `collapseAfter` بـ`0` أو أقلّ يلغي الطيّ، والمطويّ `items.length − 3` درجة. لا مخرجات.

**المحوِّل `<app-breadcrumbs>`** ([`standalone/breadcrumbs`](../../../src/app/standalone/breadcrumbs/breadcrumbs.component.ts)) بلا مدخلات ولا مخرجات. يجد الصفحة الحالية في `PATHES` بمطابقة `location.pathname`، ويصعد منها `level − 1` درجة عبر `parent`، ويعيد البناء عند كل `NavigationEnd` وكل `BreadcrumbsService.changed`. لا مسار إن لم تُسجَّل الصفحة، أو كانت `tab: true`، أو لم يصل اسمها. والأخيرة بلا `link`، وما قبلها روابط بمساراتها و`params` المسجّلة. واسم المعلَم «مسار صفحة» يتبعه اسم الحالية («مسار صفحة المحتويات»). ويلفّ المكوّن بـ`.ds-breadcrumb-bar` ولا يرسمها إلا إن كانت الدرجات أكثر من واحدة، لأن الحاوية تحمل حشوتها في القشرة.

## 8. السلوك ولوحة المفاتيح

**السلوك بلوحة المفاتيح:** Tab حتى «…» ثم Enter — الزرّ يختفي، فينتقل التركيز إلى أوّل درجة كُشفت بدل أن يسقط إلى `body`. وهذا ما يمنع فقدان الموضع الذي يحدث حين يُهدم العنصر المركَّز عليه.

## 9. الاستجابة

**في المكوّن** (وُثّق 2026-09-26 من الكود): لا نقطة كسر فيه. القائمة `flex-wrap: wrap`، فإن ضاق السطر نزلت الدرجة كاملةً مع فاصلها إلى سطر ثانٍ — ولا طيّ بالعرض: الطيّ بالعدد وحده (`collapseAfter`). وكل درجة — رابطًا أو حاليةً أو «…» — سطر واحد بحدّ `22ch` ثم «…» (`text-overflow: ellipsis`). النصّ الكامل باقٍ في DOM لقارئ الشاشة، ولا تلميح يُظهره للعين.

**في القشرة:** حاوية المحوِّل `.ds-breadcrumb-bar` بحشوة `--ds-space-4` من أعلى و`--ds-page-padding-inline` من الجانبين وصفر من أسفل، فيصطفّ المسار مع عنوان الصفحة على كل مقاس ([`base.component.scss`](../../../src/app/views/admin/components/base/base.component.scss)). وموضعه — ثابت في رأس السطح على الديسكتوب ويتمرّر مع الصفحة على الجوال — في [`page-layout.md` § الكانفاس والتمرير](../organisms/page-layout.md#الكانفاس-والتمرير).

## 10. RTL

الشيفرون مرسوم للاتجاه اللاتيني ويُعكس بـ `scaleX(-1)` تحت `[dir="rtl"]` أو `.rtl`، فيشير دائمًا إلى الدرجة التالية **في اتجاه القراءة**. وباقي التخطيط بخصائص منطقية (`min-inline-size` · `max-inline-size`)، فلا قاعدة اتجاهية تُكتب مرتين.

## 11. إمكانية الوصول

- `<nav>` باسم + `<ol>` مرتّبة + `aria-current="page"` على الحالية.
- الفاصل `aria-hidden` وخارج مساحة النقر — كان في القديم `&gt;` داخل نصّ الرابط فيُقرأ «التقارير أكبر من».
- الروابط `routerLink` حقيقية: تُفتح في تبويب جديد، ويُنسخ عنوانها، وتعمل قبل ترطيب JavaScript.
- زرّ «…» يحمل `aria-label` بعدد المخفيّ، والتركيز يُنقل بعد الكشف.
- حلقة تركيز من `--ds-focus-ring` على الروابط والزرّ.

## 12. النصوص

← اسم كل درجة هو اسم صفحتها حرفًا بحرف، كما في الشريط الجانبي وعنوان الصفحة: [`page-naming.md` §10](../patterns/page-naming.md#10-النصوص). واسم المعلَم (`label`) في [§7](#7-الواجهة-البرمجية).

## 13. مثال

```html
<app-breadcrumb
  label="مسار صفحة مقدمة الدورة"
  [items]="[
    { label: 'الدورات', link: '/admin/products/courses' },
    { label: 'تسويق المحتوى', link: '/admin/products/courses/42' },
    { label: 'المحتويات', link: '/admin/products/courses/42/content' },
    { label: 'مقدمة الدورة' }
  ]"
/>
```

وهو المسار الذي يبنيه المحوِّل لصفحة درس من `PATHES` («الدورات › اسم الدورة › المحتويات › اسم الدرس»). في اللوحة لا يُكتب المكوّن مباشرة — انظر [§16](#16-روابط).

## 14. ممنوع

* ❌ استعماله بديلًا عن زرّ رجوع — الشجرة ليست التاريخ.
* ❌ درجة للتبويب المفتوح.
* ❌ درجة لا تقود إلى صفحة موجودة فعلًا.
* ❌ كتابة الفاصل داخل نصّ الدرجة.
* ❌ الاعتماد على اللون وحده لتمييز الحالية — الوزن جزء من التمييز.
* ❌ اسم معلَم عامّ («مسار») حين يمكن وصفه («مسار صفحة الدورة»).

## 15. الدَّين القائم

### الحالة في اللوحة

| الاستعمال | الحالة |
|---|---|
| `<app-breadcrumb>` | ✅ المكوّن في `shared/ui/breadcrumb` — يستقبل `items` |
| `<app-breadcrumbs>` في [`base.component.html`](../../../src/app/views/admin/components/base/base.component.html) | ✅ صار **محوِّلًا**: يشتقّ الدرجات من `PATHES` ويسلّمها إلى المكوّن أعلاه |

الفصل مقصود: الاشتقاق من المسار الحالي منطق تنقّل يخصّ اللوحة، وعرض المسار مكوّن لا يعرف شيئًا عن `PATHES`. ولذلك لم تُمسّ صفحة واحدة في الترحيل — الوسم نفسه في `base.component.html`، والمتغيّر ما تحته.

**وحُذف زرّ «رجوع»** من الشريط بقرار صريح: الدرجة الأب حاضرة في المسار وقابلة للنقر دائمًا فالزرّ يكرّرها، وفي مسارات التبويبات كان يعود إلى الصفحة نفسها. والرجوع في التاريخ وظيفة المتصفّح.

المخالفات المعروفة لقاعدة «لا مسار فوق صفحة في الشريط الجانبي» في [`page-naming.md` § المخالفات المعروفة](../patterns/page-naming.md#المخالفات-المعروفة).

### ما ظهر في مراجعة 2026-09-26

- **الطيّ لا يقع في اللوحة** (قيس 2026-09-26): أعمق مسار في `PATHES` أربع درجات، و`collapseAfter` الافتراضي 4 والمحوِّل لا يغيّره، فزرّ «…» لا يظهر في أي صفحة اليوم.
- **خلل في الكود — لم يُصلح:** الدرجة بلا وجهة تحمل الصنف `ds-breadcrumb__link` مع `--inert`، فتأخذ لون المرور وتسطيره ([`breadcrumb.component.scss`](../../../src/app/shared/ui/breadcrumb/breadcrumb.component.scss) السطور 54–60)، مع أن تعليقها يقول «لا تدّعي التفاعل». والمحوِّل يعطي كل درجة قبل الأخيرة وجهة، فالخلل لا يظهر في اللوحة اليوم.
- ⚠️ تعارض (2026-09-26): الأيقونات من `src/icons/` عبر `<ds-icon>` ولا `<svg>` منسوخ ([`iconography.md`](../foundations/iconography.md) و`CLAUDE.md` الجذر) · الكود: الفاصل `<svg>` مرسوم في القالب ([`breadcrumb.component.ts`](../../../src/app/shared/ui/breadcrumb/breadcrumb.component.ts) السطور 95–109).
- ⚠️ تعارض (2026-09-26): كل قيمة من توكن ([`CLAUDE.md`](../../CLAUDE.md) §2) · الكود: حدّ الدرجة `max-inline-size: 22ch` خامًا بلا توكن (`breadcrumb.component.scss` السطر 38)، ومعه `line-height: 1` في «…» و`text-underline-offset: 0.2em`.
- البند 21 في تعارضات [`README.md`](../../README.md) (الفاصل `‹` أم `›`) — تحقّق 2026-09-26 مقابل الكود: شيفرون واحد يشير إلى اليمين (›) في LTR ويُعكس في RTL فيُرى ‹، أي يشير دائمًا إلى الدرجة التالية في اتجاه القراءة. و`›` في مثال [§4](#4-الأنواع-والمقاسات) رمز نصّي داخل سطر عربي. لم يُحسم أيّ الرمزين يُكتب في التوثيق.
- صُحّح 2026-09-26: كانت [§10](#10-rtl) تقول إن التخطيط بـ`min-inline-size` · `margin-inline`، والكود لا `margin-inline` فيه: `min-inline-size` · `max-inline-size`.
- صُحّح 2026-09-26: كان مثال [§13](#13-مثال) يربط درجة «المحتوى» بـ`/admin/products`، والكود: لا مسار بهذا في التوجيه ولا في `PATHES` (حُذفت درجته 2026-09-21) — فصار المثال مسار الدرس كما يبنيه المحوِّل.
- صُحّح 2026-09-26: كان رأس البيانات يذكر `<app-breadcrumb>` ومصدره وحدهما، والملف يوثّق المحوِّل أيضًا — أُضيف `<app-breadcrumbs>` و`src/app/standalone/breadcrumbs`.
- مُلئ 2026-09-26 من الكود: [§5](#5-الحالات) و[§9](#9-الاستجابة)، وتفاصيل الأنواع والمحوِّل في [§7](#7-الواجهة-البرمجية).

## 16. روابط

- **يستخدم:** —
- **يُستخدم في:** المحوِّل `<app-breadcrumbs>` في قشرة اللوحة ([`base.component.html`](../../../src/app/views/admin/components/base/base.component.html)) — يرسم المسار فوق السطح لكل صفحة لها مسار. (قيس 2026-09-26: المحوِّل هو المستعمل الوحيد لـ`<app-breadcrumb>`، وهو نفسه مستعمل مرّة واحدة — `base.component.html` السطر 102.)
- **ذو صلة:** [`page-naming.md`](../patterns/page-naming.md) · [`page-structure.md`](../patterns/page-structure.md) · [`page-layout.md`](../organisms/page-layout.md) · [`sidebar.md`](../organisms/sidebar.md) · [`tabs.md`](./tabs.md)
- **الكود:** [`shared/ui/breadcrumb/`](../../../src/app/shared/ui/breadcrumb/) · **الوسم:** `<app-breadcrumb>` · المحوِّل [`standalone/breadcrumbs/`](../../../src/app/standalone/breadcrumbs/) · الدرجات [`PATHES`](../../../src/app/shared/constants/breadcrumb/breadcrumb.ts)
- **الأصل:** `Design-System/components/breadcrumb.md` — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
