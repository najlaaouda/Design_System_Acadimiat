---
title: الأفاتار
name: avatar
tier: atom
group: data-display
status: implemented
selector: ['<app-avatar>']
source: ['src/app/shared/ui/avatar']
origin: ['CLAUDE.md', 'src/app/shared/ui/avatar']
keywords: ['أفاتار', 'صورة المستخدم', 'الحرفان', 'avatar', 'initials']
last_verified: 2026-09-15
---

# الأفاتار — `<app-avatar>`

> صورة المستخدم، أو حرفاه حين لا صورة.

## 1. متى تستخدمه

(قرار المنتج 2026-09-15 — CLAUDE.md، قاعدة الصورة المرجعية)

> * Avatar ⇒ `<app-avatar>`: 24 / 32 / 40, radius 8 (**not a circle**), `--ds-avatar-*`. The reference showing a 56px circle does not change that. **And its fallback is the two initials, drawn by the component itself** — so pass the user's real photo or nothing (`null`). Never feed it `environment.defaultUserImage` or any other placeholder file: that replaces the approved initials with a grey silhouette and silently disables the fallback (bug fixed 2026-09-15, orders detail panel).

**لماذا مكوّن لا `<img>` مباشرة؟** (تعليق الكود) «لأن حالة «لا صورة» هي الحالة الغالبة في أكاديميات لا الاستثناء، ولأن السقوط إليها يجب أن يقع أيضًا حين **يفشل تحميل** رابط موجود — وإلا ظهر مربع مكسور في عمود الاسم.»

## 2. متى لا تستخدمه

> ⚠️ **غير موثّق بعد:** لا يذكر CLAUDE.md ولا الكود حالات لا يُستعمل فيها الأفاتار ولا بديلها.

## 3. التشريح

```
<app-avatar>                      ← المضيف: inline-flex، يحمل صنف المقاس (ds-avatar--sm / ds-avatar--lg)
└── span.ds-avatar                ← المربّع: المقاس والاستدارة والخلفية — aria-hidden="true"
    ├── img.ds-avatar__img        ← حين يوجد src ولم يفشل تحميله — object-fit: cover، alt=""
    └── span.ds-avatar__initials  ← وإلا: الحرفان
```

| الجزء | إلزامي؟ | ملاحظات |
|---|---|---|
| المربّع `.ds-avatar` | نعم | `inline-size` و`block-size` من المقاس، والاستدارة من `--_radius`، و`overflow: hidden` |
| الصورة `.ds-avatar__img` | لا — حين `src` موجود ولم يفشل | `inline-size: 100%` · `block-size: 100%` · `object-fit: cover` · `alt=""` |
| الحرفان `.ds-avatar__initials` | لا — حين لا صورة أو فشل تحميلها | `letter-spacing: 0` |

**مربّع لا دائري.** (تعليق الكود) «الدائرة في هذا النظام لغة الأيقونات والنقاط (نقطة الحالة، شارة الإشعار)، والمربّع يفصل «هذا شخص» عن «هذه أيقونة». والحرفان العربيان يجلسان في مساحة أوسع داخل المربّع.»

**الخلفية رمادية واللون واحد.** (تعليق الكود) «الخلفية رمادية خفيفة لا بلون العلامة: الأفاتار حاملٌ للمعلومة لا معلومة، وعمودٌ من الحبوب البنفسجية يزاحم حبّة الحالة في الصف نفسه. الحرفان وحدهما يبقيان بلون العلامة.» · «اللون واحد لكل المستخدمين لا مشتقّ من الاسم: اللون في هذا النظام يحمل معنى دلاليًا (UI-07)، وصبغ المستخدمين بألوان عشوائية يُدخل ألوانًا بلا معنى في شاشة تستخدم الأخضر والأحمر للحالة.»

## 4. الأنواع والمقاسات

نوع واحد (لا مُدخل للشكل)، وثلاثة مقاسات على شبكة الـ8 كما في الكود:

| `size` | المربّع | الاستدارة | حجم الحرفين | الاستعمال (تعليق الكود) |
|---|---|---|---|---|
| `sm` | 24 — `--ds-avatar-size-sm` | 6 — `--ds-avatar-radius-sm` | 12 — `--ds-font-size-xs` | القوائم الكثيفة |
| `md` (الافتراضي) | 32 — `--ds-avatar-size-md` | 8 — `--ds-avatar-radius` | 12 — `--ds-font-size-xs` | صفوف الجداول |
| `lg` | 40 — `--ds-avatar-size-lg` | 8 — `--ds-avatar-radius` | 14 — `--ds-font-size-md` | الهيدر |

* استدارة `sm` أصغر — (تعليق الكود) «8px على مربّع 24 تلتهم ثلثه فيعود شبه دائري.»
* حجم حرفَي `lg` أكبر — (تعليق الكود) «lg يحمل حرفين أكبر: 12px في مربّع 40 يتركه شبه فارغ.»
* المقاس والاستدارة على المضيف لا على الابن — (تعليق الكود) «صنف المقاس يُطبَّق من host، والابن يرثهما — فلا تتكرّر ثلاث قواعد لكل مقاس.»

## 5. الحالات

| الحالة | ما يفعله الكود |
|---|---|
| صورة | `src` موجود ولم يفشل تحميله: `<img>` بملء المربّع (`object-fit: cover`) |
| بلا صورة | `src` فارغ أو `null`: الحرفان على الخلفية الرمادية |
| فشل تحميل الصورة | `(error)` يجعل `failed = true` فيسقط العرض إلى الحرفين |
| اسم فارغ | «؟» مكان الحرفين |
| Hover · Focus · Active · Disabled | لا ينطبق — لا مستمع ولا حالة تفاعل في المكوّن، والمربّع `aria-hidden` |
| Loading | لا حالة تحميل في الكود — الصورة تُحمَّل في `<img>` بلا هيكل |

## 6. التوكنز

| العنصر | التوكن | القيمة |
|---|---|---|
| مربّع `sm` | `--ds-avatar-size-sm` | `24px` |
| مربّع `md` | `--ds-avatar-size-md` | `32px` |
| مربّع `lg` | `--ds-avatar-size-lg` | `40px` |
| استدارة `md` و`lg` | `--ds-avatar-radius` | `var(--ds-radius-md)` — 8 |
| استدارة `sm` | `--ds-avatar-radius-sm` | `var(--ds-radius-sm)` — 6 |
| الخلفية | `--ds-avatar-bg` | `var(--ds-color-surface-sunken)` — `neutral-100` |
| الحرفان | `--ds-avatar-fg` | `var(--ds-color-text-brand)` — `brand-800` |
| حجم الحرفين `sm` و`md` | `--ds-font-size-xs` | 12px |
| حجم الحرفين `lg` | `--ds-font-size-md` | 14px |
| وزن الحرفين | `--ds-font-weight-semibold` | 600 |
| خطّ الحرفين | `--ds-font-family` | — |

من تعليق `tokens.css` على الخلفية: «رمادي خفيف جدًا: الأفاتار حاملٌ للصورة أو للحرفين، لا عنصرٌ يُرى بذاته. لون العلامة خلفه كان يجعل عمودًا من الصفوف صفًّا من الحبوب البنفسجية تزاحم حبّة الحالة. الحرفان يبقيان بلون العلامة — هما المعلومة، والخلفية سطح يحملها.»

## 7. الواجهة البرمجية

| المُدخل | النوع | الافتراضي | الوصف (تعليق الكود) |
|---|---|---|---|
| `src` | `string \| null` | `null` | رابط صورة المستخدم. غيابه — أو فشل تحميله — يعرض الحرفين. |
| `name` | `string` — **مطلوب** (`required: true`) | `''` | الاسم الكامل. منه تُشتقّ الحروف. |
| `size` | `AvatarSize` = `'sm' \| 'md' \| 'lg'` | `'md'` | md للجداول · lg للهيدر · sm للقوائم الكثيفة. |

لا مُخرجات. الاستيراد: `import { AvatarComponent } from 'src/app/shared/ui/avatar/avatar.component';`

## 8. السلوك ولوحة المفاتيح

**اشتقاق الحرفين** (`get initials()`):

* يُقصّ الاسم ويُقسم على المسافات.
* لا كلمات ← «؟».
* كلمة واحدة ← أول حرفين منها (`slice(0, 2)`).
* كلمتان فأكثر ← أول حرف من الكلمة الأولى + أول حرف من الثانية.

(تعليق الكود) «الحرفان لا حرف واحد: «سارة القحطاني» ← «سق». حرف واحد يتكرّر كثيرًا في قائمة عربية فيفقد قيمته التمييزية.» · «أول حرف من أول كلمتين. الأسماء العربية تُكتب «الاسم اللقب» غالبًا، فالكلمتان الأوليان أدلّ من الأولى والأخيرة حين يكون الاسم رباعيًا.»

**فشل الصورة:** `failed` يصير `true` عند `(error)`، ولا يعود إلى `false` في الكود إن تغيّر `src` بعدها.

**لا تفاعل:** لا مستمع نقر ولا تركيز في المكوّن. والحرفان `user-select: none` — (تعليق الكود) «ليسا نصًّا يُنسخ.»

## 9. الاستجابة

> لا ينطبق — لا قاعدة استجابة في الكود؛ المقاس يُختار بمُدخل `size`.

## 10. RTL

* المقاسات بخصائص منطقية (`inline-size` / `block-size`)، ولا قاعدة اتجاه في المكوّن.
* `letter-spacing: 0` على الحرفين — (تعليق الكود) «الحرفان العربيان يتّصلان، فلا تباعد بينهما.»

> ⚠️ **غير موثّق بعد:** ترتيب الحرفين واتجاههما لاسم لاتيني داخل صفحة RTL.

## 11. إمكانية الوصول

(تعليق الكود) «الأفاتار **زخرفي دائمًا**: الاسم مكتوب بجواره نصًّا أو على الزرّ الحاوي، فإعلانه لقارئ الشاشة تكرار. لذلك `aria-hidden` ثابت و`alt=""`.»

> ⚠️ **غير موثّق بعد:** تباين الحرفين (`--ds-avatar-fg` على `--ds-avatar-bg`) — لا رقم له في CLAUDE.md ولا في الكود.

## 12. النصوص

النصّ الوحيد الذي يكتبه المكوّن «؟» حين يخلو الاسم ([§8](#8-السلوك-ولوحة-المفاتيح)).

## 13. مثال

```html
<!-- صفّ جدول: md -->
<app-avatar size="md" [src]="trainer.profileImage" [name]="trainer.name ?? ''" />

<!-- بلا صورة من الخادم: الحرفان وحدهما -->
<app-avatar size="md" [name]="student.fullName" />

<!-- لوحة تفاصيل الطلب: lg -->
<app-avatar [src]="view.avatar" [name]="view.customerName" size="lg" />
```

```ts
// order-view.ts — صورة المستخدم الحقيقية أو null، لا صورة افتراضية
// فارغ لا صورة افتراضية: <app-avatar> يسقط إلى حرفَي الاسم من نفسه، وهو
// الشكل المعتمد. وحقن صورة بديلة يُبطل ذلك ويضع رسمة شخص رمادية مكان الحرفين
// (خلل أُصلح 2026-09-15).
avatar: (user?.avatar || '').toString().trim() || null,
```

## 14. ممنوع

* ❌ صورة افتراضية في `src` (`environment.defaultUserImage` أو أي ملف بديل) — تُبطل الحرفين وتضع رسمة شخص رمادية؛ مرّر صورة المستخدم الحقيقية أو `null` ([§1](#1-متى-تستخدمه)).
* ❌ أفاتار دائري أو بمقاس خارج 24 / 32 / 40 — ولو أظهرته الصورة المرجعية ([§1](#1-متى-تستخدمه)).

## 15. الدَّين القائم

* `src/app/views/admin/main-features/orders/order-details/order-details.component.ts` (السطران 87 و100) ما زال يمرّر `environment.defaultUserImage || 'assets/images/default-avatar.png'` إلى `[src]` في `order-details.component.html:21` — النافذة التي تفتحها `cancelled-payments` و`user-participations-tab`. إصلاح 2026-09-15 كان في `order-view.ts` (لوحة تفاصيل الطلبات) وحدها.
* تعليق رأس `avatar.component.ts` يشير إلى المواصفة `Design-System/specs/atoms/avatar.md`، ولا ملف بهذا الاسم.

## 16. روابط

- **يستخدم:** —
- **يُستخدم في:** الشريط العلوي [`app-header.md`](../organisms/app-header.md) (`lg`) · لوحة تفاصيل الطلبات (`orders.component.html`) · نافذة تفاصيل الطلب (`order-details`) · تفاصيل الكوبون (`coupons-details`) · السلات المتروكة (`abandoned-cart-list`، `[src]="null"`) · تبويبات المستخدمين `administrators-tab` · `moderators-tab` · `students-tab` · `trainers-tab` · `expected-clients-tab` (`md`) · بيانات الدورة (`course-info-tab`، `lg`)
- **ذو صلة:** [`connection-card.md`](../molecules/connection-card.md) (لوح الشعار على `--ds-avatar-radius`) · [`upload.md`](../molecules/upload.md) · [REQ-004](../../BACKEND-REQUIREMENTS.md)
- **الكود:** [`src/app/shared/ui/avatar/avatar.component.ts`](../../../src/app/shared/ui/avatar/avatar.component.ts) · التوكنز: [`tokens.css`](../../tokens/tokens.css) § الأفاتار
- **الأصل:** [CLAUDE.md](../../../CLAUDE.md) (§ Do Not Invent New Patterns — Avatar) · الكود نفسه — لا ملف مواصفة سابق
