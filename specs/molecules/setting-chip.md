---
title: رقاقة الإعداد
name: setting-chip
tier: molecule
group: basics
status: implemented
selector: ['<app-setting-chip>']
source: ['src/app/shared/ui/setting-chip']
origin: ['Design-System/components/setting-chip.md']
keywords: ['رقاقة', 'رقاقة الإعداد', 'إعداد اختياري', 'خيارات جاهزة', 'حقل حر', 'setting chip', 'chip']
last_verified: 2026-09-26
---

# رقاقة الإعداد (Setting chip) — `<app-setting-chip>`

> تعرض القيمة المختارة («النبرة: احترافي ودود») وتفتح لوحة خيارات جاهزة وحقلًا حرًّا، ونوع «إضافة» بحدّ مقطّع.

## 1. متى تستخدمه

إعدادٌ اختياري لما سيُنشأ، يُقرأ من الرقاقة نفسها: «الجمهور: رواد الأعمال الناشئين». الضغط يفتح لوحة صغيرة فيها **خيارات جاهزة** تملأ القيمة بضغطة، وتحتها **حقل حرّ** لمن يريد غيرها. فيبقى المطلوب وحده ظاهرًا (الفكرة)، وكل إعداد آخر على بعد ضغطة ويُرى ما اختير فيه دون فتحه.

| الحالة | استخدم |
|---|---|
| إعداد اختياري لما سيُنشأ، له أمثلة شائعة ويقبل نصًّا حرًّا (الجمهور، النبرة) | **`app-setting-chip`** |

## 2. متى لا تستخدمه

| الحالة | استخدم |
|---|---|
| فلترة صفوف جدول | `app-filter-chip` — [`filtering.md`](../patterns/filtering.md) |
| أوامر على عنصر (تعديل، حذف) | `app-menu` — [`menu.md`](./menu.md) |
| حقل مطلوب | حقلٌ ظاهر — لا يُخفى ما يجب ملؤه |
| قسم من عدّة حقول | `appearance="add"` تُظهره في مكانه، أو `app-collapsible-card` — [`collapsible-card.md`](./collapsible-card.md) |

## 3. التشريح

```
فارغة:      (🎙 النبرة)                        ← كبسولة بيضاء، حدّ border-default
مضبوطة:     (👥 الجمهور: رواد الأعمال الناشئين)  ← brand-bg · brand-border · النصّ text-brand، والاسم text-muted
مفتوحة:     الحدّ border-brand + --ds-field-ring
إضافة:      (⊕ تفاصيل أخرى)                    ← حدّ مقطّع، بلا لوحة

اللوحة:     ┌──────────────────────────┐
            │ النبرة والأسلوب           │ ← panelTitle، 12 · text-muted
            │ ▓ احترافي ودود           │ ← الخيار المختار: surface-selected · text-brand
            │   بسيط وواضح             │ ← 40px · radius-md · التمرير surface-hover
            │ ┌──────────────────────┐ │
            │ │ مثال: رسمي، ودود…    │ │ ← المحتوى المُسقَط (app-form-field)
            │ └──────────────────────┘ │
            └──────────────────────────┘   20rem · radius-lg · elevation-2 · border-subtle
```

## 4. الأنواع والمقاسات

نوعان بالمُدخل `appearance`: `default` بلوحة، و`add` بحدّ مقطّع وبلا لوحة — [§3](#3-التشريح) · [§7](#7-الواجهة-البرمجية). والمقاس في [§6](#6-التوكنز).

## 5. الحالات

| الحالة | الشكل |
|---|---|
| Default | كبسولة بيضاء بحدّ `border-default`، النص `text-secondary` |
| Hover | `surface-hover` وحدّ `border-strong`؛ المضبوطة `surface-selected-bold` |
| Focus | `--ds-focus-ring` |
| Active (مفتوحة) | حدّ `border-brand` و`--ds-field-ring` |
| Disabled | `surface-disabled` ونص `text-disabled` — والحدّ `--ds-color-action-disabled-border` (وُثّق 2026-09-26 من الكود) |
| Set (مضبوطة) | `brand-bg` وحدّ `brand-border` والقيمة مكتوبة |
| Loading · Error · Success | لا تنطبق: الإعداد يُحفظ في النموذج لا على الخادم |

وفي وضع الألوان القسرية (`forced-colors: active`) يصير حدّ المضبوطة والمفتوحة `Highlight`. (وُثّق 2026-09-26 من الكود)

## 6. التوكنز

| البند | القيمة |
|---|---|
| الارتفاع | 32px (`--ds-button-height-sm`)، و44px على اللمس |
| الحشوة | 4 × 12 · الفجوة بين الأيقونة والنص 8 |
| الخط | 14 · 500، والاسم أمام القيمة 400 |
| الأيقونة | 16 (`size="sm"`) من `src/icons/` |
| القيمة الطويلة | تُقصّ بنقاط عند 16rem |

وألوان الرقاقة واللوحة وقيمها في رسم التشريح ([§3](#3-التشريح)) وجدول الحالات ([§5](#5-الحالات)).

**التوكنز كما يقرؤها الكود** (لا طبقة `--ds-setting-chip-*`؛ الدلالي مباشرة):

| العنصر | التوكن | القيمة |
|---|---|---|
| الرقاقة — الارتفاع · الحشوة · الفجوة | `--ds-button-height-sm` (و`--ds-touch-target-min` لمسًا) · `--ds-space-1` × `--ds-space-3` · `--ds-space-2` | 32 (44) · 4×12 · 8 |
| الرقاقة — الحدّ · الاستدارة · التعبئة · النص | `--ds-color-border-default` · `--ds-radius-pill` · `--ds-color-surface-default` · `--ds-color-text-secondary` | `#C7C5CE` · دائرية · `#FFFFFF` · `#55525E` |
| الخطّ | `--ds-font-size-md` · `--ds-font-weight-medium` · `--ds-line-height-snug`؛ والاسم أمام القيمة `regular` و`--ds-color-text-muted` | 14 · 500 · 1.45 |
| الأيقونة | `--ds-color-text-muted`، والمضبوطة `--ds-color-text-brand` | `#686573` · `#6E2BA1` |
| التمرير | `--ds-color-surface-hover` · حدّ `--ds-color-border-strong`؛ المضبوطة `--ds-color-surface-selected-bold` | `#F5F5F7` · `#AEAAB7` · `#F0E4FF` |
| المضبوطة | `--ds-color-brand-bg` · `--ds-color-brand-border` · `--ds-color-text-brand` | `#F8F3FF` · `#E4CEFE` · `#6E2BA1` |
| المفتوحة | حدّ `--ds-color-border-brand` · `box-shadow: var(--ds-field-ring)` (انظر §15) | `#6E2BA1` |
| المعطّلة | `--ds-color-surface-disabled` · `--ds-color-action-disabled-border` · `--ds-color-text-disabled` | `#EAE9ED` · `#D9D8DE` · `#7E7A8A` |
| التركيز | `--ds-focus-ring` | حلقة 2px بعد فجوة 2px |
| اللوحة | عرض 20rem (ولا تتجاوز الشاشة ناقص `--ds-space-8`) · أقصى ارتفاع `--ds-filter-panel-max-block-size` · حشوة وفجوة `--ds-space-2` · `--ds-color-surface-raised` · حدّ `--ds-color-border-subtle` · `--ds-radius-lg` · `--ds-elevation-2` | 320px · `min(400px, 70vh)` · 8 · `#FFFFFF` · `#D9D8DE` · 12 |
| عنوان اللوحة | `--ds-font-size-xs` · `medium` · `--ds-color-text-muted` · حشوة 8/12 | 12 · 500 |
| الخيار | `--ds-button-height-md` (أدنى) · حشوة 8×12 · `--ds-radius-md` · 14 · التمرير `--ds-color-surface-hover` · المختار `--ds-color-surface-selected` + `--ds-color-text-brand` + `medium` | 40 · 8 |

(وُثّق 2026-09-26 من الكود)

## 7. الواجهة البرمجية

| الاسم | النوع | الافتراضي | |
|---|---|---|---|
| `label` | `string` | — | **إلزامي**. اسم الإعداد القصير: «الجمهور» |
| `icon` | `string \| null` | `null` | اسم أيقونة من `src/icons/` |
| `value` | `string \| null` | `''` | القيمة الحالية؛ فارغةً (أو مسافات) تُعرض الرقاقة باسمها وحده |
| `options` | `readonly string[]` | `[]` | خيارات جاهزة أعلى اللوحة |
| `panelTitle` | `string` | `''` | عنوان اللوحة واسمها لقارئ الشاشة: «النبرة والأسلوب» |
| `appearance` | `'default' \| 'add'` | `'default'` | `add` بلا لوحة |
| `disabled` | `boolean` | `false` | |
| `valueChange` | `string` | | عند ضغط خيار — و`''` حين يُضغط الخيار المختار نفسه |
| `activate` | `void` | | عند ضغط رقاقة `add` |
| `close(restoreFocus = true)` | تابع عامّ | | يُغلق اللوحة من المحتوى المُسقَط («محتوى يُنهي الإعداد بنفسه») |

(`string | null` و`readonly` و`close()` وُثّقت 2026-09-26 من الكود.)

## 8. السلوك ولوحة المفاتيح

الحقل الحرّ مربوط **بالقيمة نفسها**: الخيار الجاهز يملؤه، وما يُكتب فيه يظهر على الرقاقة أثناء الكتابة.

* **السهم ↓ على الرقاقة** يفتح اللوحة أيضًا، والتركيز يدخلها إلى الخيار المختار أو أوّل عنصر فيها. (وُثّق 2026-09-26 من الكود)
* **الخيار يملأ ويُغلق.** والضغط على الخيار المختار يلغيه — طريق العودة إلى «بلا قيمة» بلا زرّ «مسح».
* **Enter في الحقل الحرّ** يعتمد ما كُتب ويُغلق. (لا في مربع نصّ متعدّد الأسطر.)
* **Escape** تُغلق اللوحة وحدها — تمنع افتراضيّها فلا تُغلق النافذة حولها — وتعيد التركيز إلى الرقاقة.
* **النقر خارجها** يُغلقها ويترك التركيز حيث نقر المستخدم.
* **Tab من طرف اللوحة** يُغلقها ويعيد التركيز إلى رقاقتها: اللوحة في `body`، والخروج منها كان سيذهب إلى آخر الصفحة.
* اللوحة على `FloatingPanel` ([`overlay.md`](./overlay.md)): تحت الرقاقة إن اتّسع وإلا فوقها، وتتبعها مع التمرير.

## 9. الاستجابة

> ⚠️ **غير موثّق بعد:** سلوك الرقاقة ولوحتها على الشاشة الضيّقة — الأصل يذكر ارتفاع 44px على اللمس وحده ([§6](#6-التوكنز)).

**ما في الكود:** لا درج ولا شكل آخر للجوال — اللوحة نفسها عائمة بعرض 20rem لا يتجاوز الشاشة ناقص 32px (`calc(100vw - var(--ds-space-8))`)، وأقصى ارتفاعها `min(400px, 70vh)` وتتمرّر داخلها؛ تبعد 8px عن الرقاقة ولا تقترب من حافّة الشاشة دون 16px (`FloatingPanel`). والرقاقة لا تتجاوز عرض حاويها، وقيمتها تُقصّ عند 16rem. (وُثّق 2026-09-26 من الكود)

## 10. RTL

المواضع كلها منطقية، و`FloatingPanel` يحاذي بداية اللوحة مع بداية الرقاقة في الاتجاهين. لا أيقونة اتجاهية.

## 11. إمكانية الوصول

* الرقاقة زرّ أصلي بـ`aria-haspopup="dialog"` و`aria-expanded` و`aria-controls` حين تُفتح. اسمها المقروء نصّها: «النبرة: بسيط وواضح».
* اللوحة `role="dialog"` باسم `panelTitle`، والتركيز يدخلها عند الفتح (إلى المختار أو أوّل عنصر).
* الخيار المختار `aria-pressed="true"` — واللون ليس وحده: الوزن يتغيّر أيضًا.
* الحقل الحرّ له تسميته وإن أُخفيت (`labelHidden`): عنوان اللوحة يُرى، والتسمية تُقرأ.

## 12. النصوص

* `label` اسم قصير من المنتج نفسه («الجمهور»، «النبرة»)، و`panelTitle` تسمية الحقل الكاملة («الجمهور المستهدف»، «النبرة والأسلوب»).
* لا نصّ شارح في اللوحة: الخيارات والحقل بمثاله يكفيان.

## 13. مثال

```html
<app-setting-chip
  label="النبرة"
  icon="video-audio-image/microphone-2"
  panelTitle="النبرة والأسلوب"
  [value]="form.controls.tone_style.value"
  [options]="tones"
  (valueChange)="setText('tone_style', $event)"
>
  <app-form-field label="النبرة والأسلوب" [labelHidden]="true" [formControl]="form.controls.tone_style" placeholder="مثال: رسمي، ودود، احترافي، بسيط" />
</app-setting-chip>

<app-setting-chip appearance="add" icon="essential/add-circle" label="تفاصيل أخرى" (activate)="openDetails()" />
```

## 14. ممنوع

* ❌ إخفاء حقل مطلوب خلف رقاقة.
* ❌ استعمالها فلترًا لجدول — ذاك `app-filter-chip`.
* ❌ لون الرقاقة المضبوطة وحده دون القيمة مكتوبة.

## 15. الدَّين القائم

> لا ينطبق — الأصل لا يسجّل دَينًا قائمًا لهذا المكوّن.

### مراجعة 2026-09-26 مقابل الكود

* ⚠️ تعارض (2026-09-26): §3 و§5 «مفتوحة: الحدّ `border-brand` + `--ds-field-ring`» · الكود يكتب `box-shadow: var(--ds-field-ring)`، و`--ds-field-ring` **لون** (`brand-100`) لا ظلّ — فالقيمة غير صالحة ويتجاهلها المتصفّح، والرقاقة المفتوحة تُرسم بحدّها البنفسجي وحده بلا إطار. (الحقل النصّي يكتبه `0 0 0 var(--ds-field-ring-width) var(--ds-field-ring)`.)
* مُلئت §9، وأُكملت §6 و§7 و§8 من الكود.
* قيس 2026-09-26: مستعمل في قالب واحد — نافذة «إنشاء مقال بالذكاء الاصطناعي» (`ai-article.component.html`).

## 16. روابط

- **يستخدم:** `FloatingPanel` — [`overlay.md`](./overlay.md) · [`<app-form-field>`](./input-and-form.md) — الحقل الحرّ المُسقَط · [`<ds-icon>`](../atoms/icon.md)
- **يُستخدم في:** **أوّل استعمال:** نافذة «إنشاء مقال بالذكاء الاصطناعي» (`/admin/blog/articles/ai`)
- **ذو صلة:** رقائق الاختيار (`appRadioGroup appearance="chip"`) بشكل هذه الرقاقة نفسه — [`checkbox-radio-switch.md` §4](../atoms/checkbox-radio-switch.md#4-الأنواع-والمقاسات) · [`filtering.md`](../patterns/filtering.md) · [`menu.md`](./menu.md) · [`collapsible-card.md`](./collapsible-card.md)
- **الكود:** [`src/app/shared/ui/setting-chip/setting-chip.component.ts`](../../../src/app/shared/ui/setting-chip/setting-chip.component.ts)
- **الأصل:** `Design-System/components/setting-chip.md` — **القرار:** 2026-09-11 (الاتجاه «ج — الفكرة على ورقة المقال»). — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
