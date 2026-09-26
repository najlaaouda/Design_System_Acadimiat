---
title: الأيقونات
name: iconography
tier: foundation
status: approved
source: ['src/icons/', 'Design-System/tokens/tokens.css', 'src/app/shared/ui/icon/ds-icon.component.ts']
origin: ['Design-System/02-ICONS.md', 'CLAUDE.md#icons--srcicons-is-the-source-of-truth']
last_verified: 2026-09-14
---

# الأيقونات — الأسس

> يحكم مصدر الأيقونات، ومقاساتها، والفجوة بينها وبين النص، وشكلًا واحدًا لكل معنى، والطبقة القديمة (Font Awesome) حتى يكتمل ترحيلها.

**الحالة:** معتمد للبانل · **النطاق:** `src/app/views/admin` + مكوّنات `shared/ui` التابعة له

## 1. المبدأ

> ### ⚠️ تصحيح — مصدر الأيقونات هو `src/icons/`
>
> **مجموعة أيقونات المنتج هي [`src/icons/`](../../../src/icons/)**: ١١٨٩ أيقونة SVG في ٣٤ مجلّد تصنيف (١١٨٨ في الأصل، ومقبض السحب `essential/grip-horizontal` أُضيف في 2026-09-10 — §11) (`essential`، `arrow`، `notifications`، `school-learning`، `time`، `users`، `weather`، `files`، `money`، …). كل ملف 24×24 بـ`fill="none"` وحدود على `currentColor` بسُمك 1.5.
>
> **كل أيقونة جديدة تُؤخذ من هناك.** للبحث: `find src/icons -iname "*<كلمة>*.svg"`.
>
> وما يلي في هذا الملف يصف **الطبقة القديمة** — Font Awesome 6 Pro التي ما زالت ترسم ~١٨٠٠ `<i class="fa-…">` وما رُحّل إلى `[dsIcon]`. تبقى عاملة ولا تُوسَّع، ولا تُختار منها أيقونة جديدة.
>
> **آلية العرض:** `<ds-icon name="تصنيف/اسم">` من [`shared/ui/icon/ds-icon.component.ts`](../../../src/app/shared/ui/icon/ds-icon.component.ts). يضمّن الـSVG من سجلّ يكتبه [`scripts/generate-icons.js`](../../../scripts/generate-icons.js) وقت البناء للأسماء المستعملة وحدها — فلا طلب شبكة، وSSR يرسم الأيقونة في HTML الأوّل. بعد اسم جديد: `npm run icons` (يجري في prebuild وprestart وكل سكربتات البناء، ويُفشل البناء على اسم غير موجود).
>
> **ما رُحّل:** الشريط العلوي والشريط الجانبي (٢٩ أيقونة). الباقي — ~٢٢٦٥ استخدامًا لـ`<i class="fa-…">` — يُرحَّل شاشةً شاشة، ويُحذف خطّ Font Awesome عند آخرها.

ومن [CLAUDE.md § Icons](../../../CLAUDE.md#icons--srcicons-is-the-source-of-truth) ما ليس أعلاه:

```bash
find src/icons -iname "*<word>*.svg"      # by name
ls src/icons/<category>/                  # browse a category
```

> Font Awesome is **legacy**, not the source. … keep those working, but do not pick a new icon from it — and never add a second icon library on top of either.
>
> `Design-System/specs/foundations/iconography.md` [= هذا الملف] is the full reference; read it before any feature that renders an icon.

### §1 المكتبة الواحدة

> **Font Awesome 6 Pro هي مكتبة الأيقونات الوحيدة في البانل. لا تُضاف مكتبة ثانية.**

| | |
|---|---|
| الإصدار | `6.0.0-beta2 Pro` (ترخيص تجاري) |
| ملف CSS | [`src/assets/assets/fonts/font-awesome/css/font-awesome.min.css`](../../../src/assets/assets/fonts/font-awesome/css/font-awesome.min.css) — 440 KB |
| الخطوط | `webfonts/` — الأوزان الستة بصيغتَي `woff2` و`ttf` |
| التحميل | [`angular.json:56`](../../../angular.json) عالميًا |

الأوزان المتاحة فعليًا: `fa-thin-100` · `fa-light-300` · `fa-regular-400` · `fa-solid-900` · `fa-duotone-900` · `fa-brands-400`.

#### مكتبات كانت تتعايش معها

| المكتبة | حالتها في البانل | حالتها في المشروع |
|---|---|---|
| Line Awesome (87 KB) | ✅ صفر — رُحِّلت | ما زالت في `views/home` و`views/study` (~490 استخدام) |
| Simple Line Icons (12 KB + 483 KB خطوط) | ✅ صفر — رُحِّلت | 3 أيقونات فقط في [`views/study/lesson`](../../../src/app/views/study/lesson/lesson.component.html) |
| Flaticon (1 KB + 5 ملفات خط) | ✅ صفر | **صفر في المشروع كله** — محمَّلة بلا استخدام |

ملفات CSS الثلاثة ما زالت في [`angular.json:54,55,58`](../../../angular.json) لأن `home`/`study` تعتمد عليها. حذفها مشروط بترحيلهما.

## 2. القيم

> القيم في هذا الجدول هي الوحيدة المسموحة — [القاعدة](../../DESIGN.md#القيم-المسموحة) · [المرجع السريع](../../migration/PLAYBOOK.md).

### §3 الحجم

استخدم توكنز النظام لا فئات FA (`fa-lg`, `fa-xl`, `fa-2x`):

| التوكن | القيمة | الاستعمال |
|---|---|---|
| `--ds-icon-size-sm` | 16px | داخل الجداول والشارات |
| `--ds-icon-size-md` | 20px | الافتراضي |
| `--ds-icon-size-lg` | 24px | رؤوس الصفحات والحالات الفارغة |

الزرّ يربطها تلقائيًا عبر `--ds-button-icon-sm/md/lg` — راجع [`atoms/button.md`](../atoms/button.md).

**استثناء واحد موثَّق — أيقونة داخل الحقل: 18px** (`--ds-field-icon-size`، منذ 2026-09-10). نصّ الحقل 12px، فـ20px أثقل منه و16px أصغر من أن تُقرأ علامةً للحقل. تُعرض بـ `<ds-icon size="inherit">` والمكوّن يضبط أبعاد العنصر من التوكن. لا مقاس رابع غيره: أي حاجة أخرى تُطرح توكنًا في `tokens.css`، لا قيمة في شاشة.

### §2 الأوزان ومتى يُستخدم كلٌّ منها

| الوزن | الكتابة الصحيحة | الاستعمال |
|---|---|---|
| Solid 900 | `fa-solid` | الفعل الأساسي، الحالة النشطة، ما يجب أن يُرى أولًا |
| Regular 400 | `fa-regular` | الافتراضي داخل النماذج والحوارات |
| Light 300 | `fa-light` | الأيقونات المصمتة: مقابض السحب، أدوات ثانوية، أيقونات داخل جداول |
| Brands 400 | `fa-brands` | شعارات المنصات فقط |

`fa-thin` و`fa-duotone` **غير مستخدمَين** — لا تُدخلهما بلا قرار نظام تصميم.

#### توزيع البانل اليوم

```
fa           925   ← اختصار قديم، يساوي fa-solid
fa-solid     398
fa-light     360
fa-regular   258
fas          134   ← اختصار FA5، يساوي fa-solid كذلك
fa-brands     35
```

**ثلاث كتابات لوزن واحد.** `fa` و`fas` و`fa-solid` كلها Solid 900. الكتابة المعتمدة هي **الصيغة الطويلة** `fa-solid`؛ الاختصاران موروثان ويُصحَّحان عند لمس الملف، لا بحملة منفصلة.

## 3. الاستعمال

### العرض — `<ds-icon>`

من [CLAUDE.md § Icons](../../../CLAUDE.md#icons--srcicons-is-the-source-of-truth) — **How to render one:**

```html
<ds-icon name="notifications/notification" />                <!-- decorative, 20px -->
<ds-icon name="content-edit/edit" size="sm" />               <!-- 16 / 20 / 24 / inherit -->
<ds-icon name="arrow/arrow-right-01" directional />          <!-- flips in RTL -->
<button aria-label="حذف"><ds-icon name="essential/trash" /></button>
```

> `DsIconComponent` (`src/app/shared/ui/icon/ds-icon.component.ts`) inlines the SVG from `icons.generated.ts` … A name built at runtime goes in [`src/app/shared/ui/icon/icons.allowlist.json`](../../../src/app/shared/ui/icon/icons.allowlist.json). Size comes from the `size` input; a consumer needing a larger tile than glyph uses `size="inherit"` and sets the element's size plus `--ds-icon-glyph` in CSS (the collapsed sidebar does this).

والباقي من الفقرة نفسها (السجلّ المولَّد، `npm run icons`، إفشال البناء على اسم غير موجود) في «آلية العرض» في §1.

### §11 شكل واحد لكل معنى — السهم والإضافة والإغلاق

> **قرار (2026-09-10، بطلب صريح):** المعنى الواحد يُرسم بشكل واحد في المنتج كلّه. لا «+» عارية في شاشة و«+» في دائرة في جارتها، ولا سهم بساق في حقل وسهم بلا ساق في الشريط الجانبي.

| المعنى | الأيقونة الوحيدة | لا تُستعمل |
|---|---|---|
| **سهم** — فتح قائمة، طيّ وتوسيع، تالٍ وسابق، «عرض الكل»، الترقيم | `arrow/arrow-down-02` · `-up-02` · `-right-02` · `-left-02` — **بلا ساق** | `arrow-*-01` (بساق) · `arrow-*-03` · `arrow-*-04` |
| **إضافة** | `essential/add-circle` | `essential/add` (عارية) · `essential/add-square` |
| **إغلاق · مسح · إزالة** | `essential/close-circle` | `essential/close-square` · `essential/close` (عارية — لمقبض المفتاح وحده) |
| **سحب لإعادة الترتيب** — مقبض صفّ الجدول | `essential/grip-horizontal` — صفّان من ثلاث نقاط | `fa-grip-lines` · `fa-grip-vertical` · `essential/menu` (قائمة) · `settings/3-dots-more` (إجراءات الصفّ) |

**مقبض السحب أُضيف إلى المجموعة (2026-09-10، بطلب صريح):** `src/icons/` كانت بلا أيقونة سحب، و`settings/3-dots-more` هي زرّ ⋯ في طرف الصفّ نفسه — استعمالها للسحب يضع في الصفّ الواحد شكلين متطابقين بمعنيين. فرُسمت `essential/grip-horizontal` بأسلوب المجموعة: 24×24، `fill="none"`، نقاط بحدّ 1.5 على `currentColor` كنقاط `3-dots-more`. غير اتجاهية فلا تنعكس. مواضعها في [`table.md`](../organisms/table.md) § إعادة الترتيب بالسحب.

**السهم بلا ساق في ثلاثة مواضع بالاسم:**

- **الحقول:** سهم القائمة المنسدلة، وزرّ دولة الموبايل، ومنتقي التاريخ — `arrow/arrow-down-02`. رأسي، فلا `directional`.
- **الأزرار:** «التالي» و«رجوع» و«عرض الكل» — `arrow/arrow-left-02` أو `-right-02` مع `directional`.
- **الشريط الجانبي:** طيّ المجموعات `arrow/arrow-down-02`، وزرّ طيّ الشريط في الشريط العلوي `arrow/arrow-right-02`.

**لماذا الدائرة للإضافة:** يوم القرار لم يكن في `src/icons/` × عارية — الإغلاق دائرة أو مربّع حتمًا. فالإضافة دائرة كذلك، وإلّا اجتمع في الشاشة الواحدة «+» عارية و«×» في دائرة. والدائرة ما يستعمله الحوار وحقل البحث للإغلاق من قبل.

**✓ و× العاريتان أُضيفتا للمفتاح وحده (2026-09-10، بطلب صريح):** `essential/tick` و`essential/close` بأسلوب المجموعة (24×24، حدّ 1.5 على `currentColor`). مكانهما مقبض `<app-toggle>`: المقبض دائرة بيضاء، و`tick-circle` داخله دائرة داخل دائرة. ⛔ لا تُستعملان خارجه — الإغلاق في كل موضع آخر `close-circle`. **ومنذ 2026-09-12 لا يستعملهما المقبض أيضًا:** صار عليه وجه مرسوم ([`switch.md`](../atoms/switch.md))، فالملفان باقيان في `src/icons/` بلا مستعمل ولا يدخلان الحزمة.

**ليسا سهمين بهذا المعنى:** `arrow/import-arrow-01` و`arrow/export-arrow-02` — ملف يدخل ويخرج، لا اتجاه. ولا الصفحة الأولى والأخيرة في الترقيم (سهم مزدوج).

#### الطبقة القديمة — يُصحَّح ما يُلمس

Font Awesome لا تُختار منها أيقونة جديدة، وما فيها يُصحَّح حين يُلمس ملفّه — لا بحملة. قياس 2026-09-10 في `src/app` (بلا ملفّات الاختبار):

| القائم | العدد | يصير |
|---|---|---|
| `fa-arrow-left` · `-right` · `-down` · `-up` · `fa-long-arrow-*` · `fa-arrow-*-long` — **بساق** | 81 | `arrow/arrow-*-02` |
| `fa-chevron-*` · `fa-angle-*` · `fa-caret-*` — بلا ساق | 122 | `arrow/arrow-*-02` — الشكل صحيح، والمكتبة وحدها تتغيّر |
| `fa-plus` · `fa-plus-square` | 65 | `essential/add-circle` |
| `fa-circle-plus` · `fa-plus-circle` | 58 | `essential/add-circle` |
| `fa-xmark` · `fa-times` · `fa-close` | 296 | `essential/close-circle` |
| `fa-circle-xmark` · `fa-times-circle` | 9 | `essential/close-circle` |

وفي `<ds-icon>` صُحّح ما خالف يوم القرار: سهم دولة الموبايل (`arrow-down-01` ← `-02`)، وزرّ طيّ الشريط (`arrow-right-01` ← `-02`)، و«مقال جديد» (`essential/add` ← `add-circle`).

### §5 أيقونات العلامات التجارية

كل شعارات المنصات في البانل تُكتب `fa-brands fa-<name>` — **بلا استثناء واحد**.

> (CLAUDE.md § Icons) **Platform logos:** `fa-brands` until the migration lands; if a glyph is missing add one CSS mask in `src/styles.scss` (as `fa-x-twitter` and `fa-threads` do), not a copy per screen.

#### الغائبتان عن الحزمة

الحزمة المرفقة (6.0.0-beta2) تسبق إطلاق X وThreads، فلا glyph لهما. الحل قناع CSS في [`src/styles.scss`](../../../src/styles.scss) يجعلهما تتصرفان كأي أيقونة FA:

| الأيقونة | القناع | مصدر الشكل |
|---|---|---|
| `fa-brands fa-x-twitter` | `styles.scss:2661` | مسار مضمّن |
| `fa-brands fa-threads` | `styles.scss:2684` | [`assets/icons/threads.svg`](../../../src/assets/icons/threads.svg) |

القناع يرسم بـ`background-color: currentColor` بحجم `1em`، فترث الأيقونة لون النص وحجمه تمامًا كبقية `fa-brands`.

**لماذا قناع لا `<img>`:** ملفات المجلد مثبَّتة الألوان (`threads.svg` رمادي `#7e7e7e`، `xb.svg` أسود). كصور لن ترث لون النص، فتختلف عن جيرانها في كل سياق.

❌ ممنوع `<svg>` مضمّن لشعار منصة. كان في البانل **أربع نسخ** من شعار X بثلاثة مسارات مختلفة قبل التوحيد.

### §6 شعارات الخدمات الملوّنة — الاستثناء الوحيد

صفحات [`main-features/integrations/`](../../../src/app/views/admin/main-features/integrations/) تستخدم `<img>` من [`src/assets/icons/`](../../../src/assets/icons/) لا Font Awesome:

`gtm` · `calendly` · `zapier` · `ga4` · `ga4-logo` · `meta` · `snap` · `tiktok` · `zoom` · `copyleaks` — 27 موضعًا.

**السبب:** شعارات ملوّنة بألوان علاماتها (`snap.svg` أصفر `#EEE312`، `tiktok.svg` سماوي `#25F4EE`، `meta.svg` بتدرّج). Font Awesome أحادية اللون، ولا بديل فيها أصلًا لـ`calendly` أو `copyleaks` أو `zapier` أو `ga4`.

**القاعدة:** شعار خدمة على بطاقة تكامل → صورة من المجلد. أيقونة واجهة أو رابط منصة → Font Awesome.

### §10 جرد `src/assets/icons/`

> (CLAUDE.md § Icons) **`src/assets/icons/` is not an icon set.** It holds `simple-line-icons/` (legacy, being deleted) and the full-colour service logos only. `<img>` is for those colour logos alone, never for a UI icon.

591 KB في 26 ملفًا.

| المحتوى | الحجم | الحالة |
|---|---|---|
| `simple-line-icons/` | 483 KB | صفر استخدام في البانل · 3 أيقونات في `study` |
| 15 شعار خدمة `.svg`/`.png` | ~96 KB | مستخدمة — انظر §6 |
| `xb.svg` | 646 B | **صفر مراجع** (الكود يستخدم `xb.png`) |
| `suspend.svg` | 10.8 KB | **صفر مراجع** (الكود يستخدم `suspend.png`) |
| `.DS_Store` ×2 | 12 KB | مخلفات macOS |

⚠️ [`subscription.component.scss:32`](../../../src/app/views/admin/marketing/subscription/subscription.component.scss) يحمّل `177-x.svg` برابط مطلق `https://cdn.acadimiat.net/...`، فلا يمرّ عبر `deployUrl` ولا يظهر محليًا ولا في `review`/`ai`.

### ما يُنهي المهمة

- [ ] ترحيل الأيقونات الثلاث في [`views/study/lesson`](../../../src/app/views/study/lesson/lesson.component.html) → حذف `simple-line-icons` (495 KB) من `angular.json`.
- [ ] ترحيل Line Awesome في `home`/`study` (~490 استخدام) → حذف 87 KB.
- [ ] حذف `flaticon.css` وخطوطها — صفر استخدام في المشروع كله.
- [ ] إصلاح الأسماء المكسورة في §9.
- [ ] ترقية الحزمة عن `6.0.0-beta2` — تُغني عن قناعَي X وThreads وعن نصف §9.

## 4. قواعد إلزامية

> (CLAUDE.md § Icons) **`src/icons/` first.** If the icon exists there, use it. Only if it is genuinely absent, say so and raise it — do not silently fall back to a font glyph, an inline `<svg>` copy, or a downloaded file.

### §4 الفجوة بين الأيقونة والنص

> **8px. دائمًا.**

`--ds-button-gap: var(--ds-space-2)` = 8px، مطبَّقة في [`button.component.scss:19`](../../../src/app/shared/ui/button/button.component.scss).

الأزرار القديمة (`class="btn"`) داخل البانل تأخذها من قاعدة `body.ds-admin .btn` في آخر [`src/styles.scss`](../../../src/styles.scss)، التي تُصفِّر كذلك هوامش `mr-*`/`ml-*` على الأيقونة — وإلا تراكمت فوق الـ `gap` فصارت 16 أو 24px.

❌ لا تكتب `mr-2` على أيقونة داخل زر. الفجوة مسؤولية الحاوية لا العنصر.

> (قرار المنتج 2026-09-14 — CLAUDE.md) **Icon-to-label gap is 8px — everywhere** (`--ds-space-2`, `02-ICONS.md` §4): buttons, menu items, list rows, the sidebar rows (`.dn-item`) and the sidebar's pinned actions. It comes from `gap` on the container. Never `mr-*`/`ml-*` on an icon inside a button — it stacks on top of the gap. The sidebar rows were `tw-gap-4` (16px) until 2026-09-14 and were brought to 8; the submenu indentation (44px) and the tree line in `deznav-native.component.scss` are derived from it, so change them together.

### §7 RTL

الأيقونات الاتجاهية (رجوع، تالي، طيّ، ترتيب) تحتاج انعكاسًا صريحًا. غير الاتجاهية (حذف، تعديل، بحث) **لا تُعكس** — راجع [`rtl.md`](./rtl.md).

⚠️ **قائم في المنتج:** [`paginator.component.html`](../../../src/app/shared/ui/table/paginator.component.html) يثبّت `fa-angle-double-right` للصفحة الأولى — صحيح في RTL، معكوس في LTR.

### §8 إمكانية الوصول

| الحالة | المطلوب |
|---|---|
| أيقونة بجوار نص | `aria-hidden="true"` على الأيقونة |
| أيقونة وحدها في زر | `aria-hidden="true"` + `aria-label` مفهوم **على الزر** |
| أيقونة داخل حاوية مخفية أصلًا | لا شيء — لا تُكرِّر `aria-hidden` |

❌ أيقونة هي المحتوى الوحيد لزر بلا `aria-label` = زر بلا اسم عند قارئ الشاشة.

### §9 أسماء لا توجد في الحزمة

> (CLAUDE.md § Icons) **Legacy Font Awesome rules — for existing code only.** … [`src/app/shared/ui/icon/icon-names.generated.ts`](../../../src/app/shared/ui/icon/icon-names.generated.ts) lists what the bundle actually contains.

الحزمة `6.0.0-beta2` **تتضمّن أسماء FA5 كمرادفات** — `fa-times` و`fa-pencil` و`fa-file-text` و`fa-dashboard` و`fa-check-circle` و`fa-external-link-alt` و`fa-cloud-upload` و`fa-television` كلها تعمل.

لكن هذه **لا تعمل وتظهر فارغة**:

| النوع | الأسماء | البديل |
|---|---|---|
| أسماء FA4 بلاحقة `-o` | `fa-clock-o` `fa-comments-o` `fa-calendar-o` `fa-file-text-o` `fa-play-circle-o` `fa-calendar-check-o` | احذف `-o` أو استخدم `fa-circle-*` |
| أيقونات أحدث من الحزمة | `fa-file-circle-plus` `fa-file-circle-check` `fa-chart-simple` `fa-flask-vial` `fa-funnel` `fa-arrow-up-left-from-square` `fa-arrow-up-right-dots` `fa-shield-halved` | بديل من الحزمة، أو قناع CSS |
| أخطاء إملائية | `fa-inco-circle` `fa-inf-circle` | `fa-info-circle` |

#### مواضع قائمة تحتاج إصلاحًا

| الاسم | الموضع |
|---|---|
| `fa-file-excel-o` | [`finance-income.component.html:179`](../../../src/app/views/admin/main-features/finance/finance-income/finance-income.component.html) |
| `fa-file-pdf-o` | [`pdf-container.component.html:93`](../../../src/app/views/admin/shared/pdf-container/pdf-container.component.html) |
| `fa-star-o` | [`poll.component.html:454,471`](../../../src/app/views/admin/main-features/polls/poll/poll.component.html) |
| `fa-inco-circle` | [`get-started/products.component.html:11`](../../../src/app/views/admin/main-features/get-started/products/products.component.html) |
| `fa-inf-circle` | [`create-quizz.component.html:15`](../../../src/app/views/admin/shared/quizz-ac/create-quizz/create-quizz.component.html) |
| `fa-shield-halved` | [`roles-dialog.component.html`](../../../src/app/views/admin/main-features/settings/settings-roles-tab/roles-dialog/roles-dialog.component.html) · [`floating-add.component.ts:102`](../../../src/app/views/admin/page-edit-v2/floating-add/floating-add.component.ts) |
| `fa-file-circle-plus` | [`lecture-content.component.html:32`](../../../src/app/views/admin/products/courses/course-details/course-content-tab/lecture-content/lecture-content.component.html) |
| `fa-file-circle-check` | [`funnel-edit.component.html:144`](../../../src/app/views/admin/funnel-builder/funnel-edit/funnel-edit.component.html) |
| `fa-chart-simple` · `fa-flask-vial` | [`funnel-ab-dialog.component.html:33,88`](../../../src/app/views/admin/funnel-builder/funnel-ab-dialog/funnel-ab-dialog.component.html) |
| `fa-funnel` | [`funnel-analytics.component.html:111`](../../../src/app/views/admin/funnel-builder/funnel-analytics/funnel-analytics.component.html) |
| `fa-arrow-up-right-dots` | [`step-type-meta.ts:14`](../../../src/app/views/admin/funnel-builder/funnel-canvas/step-type-meta.ts) |

> **الطريقة الموصى بها للتحقّق: استخدم [`[dsIcon]`](../atoms/icon.md)** — يرفض الاسم غير الموجود في الكونسول وقت التطوير، فلا يصل مربّع فارغ إلى المستخدم أصلًا.
>
> وللفحص اليدوي في كود لم يُحوَّل بعد:
> ```bash
> grep -c "\.fa-<name>:" src/assets/assets/fonts/font-awesome/css/font-awesome.min.css
> ```
> النتيجة `0` تعني أن الأيقونة ستظهر فارغة. لا تعتمد على موقع Font Awesome — الحزمة المرفقة أقدم منه.

## 5. شجرة القرار

### من أين الأيقونة؟

من «تصحيح» أوّل المبدأ، ومن §5 و§6، ومن «ممنوعات»، ومن «`src/icons/` first» (CLAUDE.md):

```
ما الذي يُرسم؟
├── أيقونة واجهة
│   ├── موجودة في src/icons/          → <ds-icon name="تصنيف/اسم"> — كل أيقونة جديدة تُؤخذ من هناك
│   └── غائبة عنها حقًّا               → say so and raise it — لا خطّ ولا <svg> مضمّن ولا ملف مُنزَّل
├── شعار منصة                         → fa-brands fa-<name> — بلا استثناء واحد (وقناع CSS إن غاب الـglyph)
└── شعار خدمة على بطاقة تكامل         → صورة من المجلد src/assets/icons/ — الصور للشعارات الملوّنة فقط
```

### أيّ مقاس؟

من جدول §3 الحجم واستثنائه:

```
أين الأيقونة؟
├── داخل الحقل                        → 18px — --ds-field-icon-size، بـ <ds-icon size="inherit">
├── داخل الجداول والشارات             → --ds-icon-size-sm · 16px
├── رؤوس الصفحات والحالات الفارغة     → --ds-icon-size-lg · 24px
└── غير ذلك — الافتراضي               → --ds-icon-size-md · 20px
```

وأيّ أيقونة لأيّ معنى (سهم، إضافة، إغلاق، سحب): جدول [§11](#11-شكل-واحد-لكل-معنى--السهم-والإضافة-والإغلاق).

## 6. افعل / لا تفعل

### ممنوعات

* ❌ مكتبة أيقونات ثانية في البانل.
* ❌ سهم بساق (`arrow-*-01`) في حقل أو زرّ أو الشريط الجانبي — السهم بلا ساق (§11).
* ❌ «+» عارية أو «×» في مربّع — الإضافة `essential/add-circle` والإغلاق `essential/close-circle` (§11).
* ❌ `<svg>` مضمّن لشعار منصة — استخدم `fa-brands` أو أضف قناعًا.
* ❌ `<img>` لأيقونة واجهة — الصور للشعارات الملوّنة فقط.
* ❌ اسم أيقونة بلا تحقّق من وجوده في الحزمة.
* ❌ `mr-*`/`ml-*` على أيقونة داخل زر — الفجوة من `gap`.
* ❌ حجم أيقونة بقيمة حرة عندما يوجد `--ds-icon-size-*`.
* ❌ أيقونة وحدها في زر بلا `aria-label`.
* ❌ عكس أيقونة غير اتجاهية في RTL.

## 7. إضافة قيمة جديدة

إضافة إلى هذا الأساس تغيير في نظام التصميم لا قرار شاشة — [الحوكمة](../../DESIGN.md#8-الحوكمة) · [إضافة توكن جديد](../tokens/token-reference.md). وما يخصّه، في أقسامه:

- **أيقونة غائبة عن `src/icons/`:** «`src/icons/` first» أوّل [§4 قواعد إلزامية](#4-قواعد-إلزامية)، ومثال إضافة موثّق: مقبض السحب و✓ و× العاريتان في [§11](#11-شكل-واحد-لكل-معنى--السهم-والإضافة-والإغلاق).
- **اسم جديد في الكود:** `npm run icons` — «آلية العرض» في [§1](#1-المبدأ)، والاسم المبني وقت التشغيل في [العرض — `<ds-icon>`](#العرض--ds-icon).
- **مقاس جديد:** «لا مقاس رابع غيره» في [§3 الحجم](#3-الحجم).
- **وزن FA غير مستخدم:** `fa-thin` و`fa-duotone` في [§2](#2-الأوزان-ومتى-يُستخدم-كلٌّ-منها).

## 8. روابط

- **التوكنز:** [`token-reference.md`](../tokens/token-reference.md)
- **يُستخدم في:** [`icon.md`](../atoms/icon.md) · [`button.md`](../atoms/button.md) · [`switch.md`](../atoms/switch.md) · [`type-cover.md`](../atoms/type-cover.md) · [`input-and-form.md`](../molecules/input-and-form.md) · [`select.md`](../molecules/select.md) · [`search-field.md`](../molecules/search-field.md) · [`phone.md`](../molecules/phone.md) · [`date-field.md`](../molecules/date-field.md) · [`accordion.md`](../molecules/accordion.md) · [`sidebar.md`](../organisms/sidebar.md) · [`table.md`](../organisms/table.md) · [`detail-panel.md`](../organisms/detail-panel.md)
- **ذو صلة:** [`spacing.md`](./spacing.md) · [`rtl.md`](./rtl.md) · [`accessibility.md`](./accessibility.md)
- **الأصل:** `02-ICONS.md` · CLAUDE.md § Icons — `src/icons/` is the source of truth — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)

| § في الأصل | القسم في هذا الملف |
|---|---|
| §1 المكتبة الواحدة | [1. المبدأ](#1-المكتبة-الواحدة) |
| §2 الأوزان ومتى يُستخدم كلٌّ منها | [2. القيم](#2-الأوزان-ومتى-يُستخدم-كلٌّ-منها) |
| §3 الحجم | [2. القيم](#3-الحجم) |
| §4 الفجوة بين الأيقونة والنص | [4. قواعد إلزامية](#4-الفجوة-بين-الأيقونة-والنص) |
| §5 أيقونات العلامات التجارية | [3. الاستعمال](#5-أيقونات-العلامات-التجارية) |
| §6 شعارات الخدمات الملوّنة — الاستثناء الوحيد | [3. الاستعمال](#6-شعارات-الخدمات-الملوّنة--الاستثناء-الوحيد) |
| §7 RTL | [4. قواعد إلزامية](#7-rtl) |
| §8 إمكانية الوصول | [4. قواعد إلزامية](#8-إمكانية-الوصول) |
| §9 أسماء لا توجد في الحزمة | [4. قواعد إلزامية](#9-أسماء-لا-توجد-في-الحزمة) |
| §10 جرد `src/assets/icons/` | [3. الاستعمال](#10-جرد-srcassetsicons) |
| §11 شكل واحد لكل معنى — السهم والإضافة والإغلاق | [3. الاستعمال](#11-شكل-واحد-لكل-معنى--السهم-والإضافة-والإغلاق) |
| ممنوعات | [6. افعل / لا تفعل](#ممنوعات) |
| ما يُنهي المهمة | [3. الاستعمال](#ما-يُنهي-المهمة) |
