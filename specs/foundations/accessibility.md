---
title: إمكانية الوصول
name: accessibility
tier: foundation
status: approved
source: ['Design-System/tokens/tokens.css']
origin: ['Design-System/01-FOUNDATIONS.md#10-إمكانية-الوصول', 'CLAUDE.md#accessibility-is-mandatory']
last_verified: unknown
---

# إمكانية الوصول — الأسس

> يحكم التباين، والتركيز، ولوحة المفاتيح، والتسميات، والأخطاء، واستقلالية اللون، والحركة.

## 1. المبدأ

الهدف: **WCAG 2.1 AA**.

## 2. القيم

> القيم في هذا الجدول هي الوحيدة المسموحة — [القاعدة](../../DESIGN.md#القيم-المسموحة) · [المرجع السريع](../../migration/PLAYBOOK.md).

* **التباين** — 4.5:1 للنص العادي، 3:1 للنص الكبير وحدود عناصر التحكم. كل توكن لوني موثّق بنسبة تباينه.
* **التركيز** — حلقة موحّدة عبر `--ds-focus-ring`، بعرض 2px وإزاحة 2px. `outline: none` دون بديل مرئي ممنوع.

## 3. الاستعمال

* **لوحة المفاتيح** — كل عنصر تفاعلي قابل للوصول والتشغيل بلوحة المفاتيح. مناطق التمرير الأفقي قابلة للتركيز (WCAG 2.1.1).
* **التسميات** — كل حقل له تسمية مرتبطة بـ `for`/`id`. الـ placeholder ليس تسمية.
* **الأخطاء** — مرتبطة بالحقل عبر `aria-describedby`، ومعلنة بـ `role="alert"`.

## 4. قواعد إلزامية

* **استقلالية اللون** — لا حالة يُبلَّغ عنها باللون وحده.
* **الحركة** — `prefers-reduced-motion` محترم في طبقة التوكنز.
* **حلقة التركيز مخفية افتراضيًّا في المنتج كله** (واقع قائم، وُثّق 2026-09-26): `src/styles.scss` يلغي `outline` بـ`!important` عن كل عنصر مركَّز ما دام `<html>` بلا `data-a11y-focus="default"` أو `"high"` — وهذا الافتراضي. فقواعد `:focus-visible` في المكوّنات لا تظهر إلا حين يفعّل المستخدم خيار التركيز من دائرة إمكانية الوصول.
  * ⚠️ يخالف WCAG 2.4.7 (التركيز المرئي). قرار منتج يُعرض على مالكه — **لا يُصلح في مكوّن واحد**.
  * عند فحص حلقة التركيز بلقطة: `document.documentElement.dataset.a11yFocus = 'default'` أولًا، وإلا فغيابها لا يعني خللًا في المكوّن.

### Accessibility Is Mandatory

([CLAUDE.md § Accessibility Is Mandatory](../../../CLAUDE.md#accessibility-is-mandatory))

> Target:
>
> **WCAG 2.1 AA**
>
> Check:
>
> * Keyboard navigation
> * Focus states
> * Accessible labels
> * Contrast
> * Error messaging
> * Screen-reader semantics
> * Touch targets
> * Color independence

## 5. شجرة القرار

> ⚠️ **غير موثّق بعد:** لا جدول «متى أيّ قيمة» في الأصل لهذا الأساس.

## 6. افعل / لا تفعل

> ⚠️ **غير موثّق بعد:** أزواج ✓ / ✗ لهذا الأساس — الأصل يكتب الممنوع داخل البنود (§2 «`outline: none` دون بديل مرئي ممنوع»، §3 «الـ placeholder ليس تسمية»).

## 7. إضافة قيمة جديدة

> لا ينطبق — قيم هذا الأساس معايير WCAG 2.1 AA لا سلّم يُوسَّع؛ وتوكن التركيز يتبع [إضافة توكن جديد](../tokens/token-reference.md) و[الحوكمة](../../DESIGN.md#8-الحوكمة).

## 8. روابط

- **التوكنز:** [`token-reference.md`](../tokens/token-reference.md)
- **يُستخدم في:** [`input-and-form.md`](../molecules/input-and-form.md) (التسميات والأخطاء) · [`button.md`](../atoms/button.md) (حلقة التركيز)
- **ذو صلة:** [`color.md`](./color.md) (نسب التباين، قاعدة النص الحاكمة) · [`controls.md`](./controls.md) (هدف اللمس) · [`motion.md`](./motion.md) (تقليل الحركة) · [`iconography.md` §8](./iconography.md#8-إمكانية-الوصول) · [`f:\doc` — 04-PLATFORM-RULES.md](../../../../doc/04-PLATFORM-RULES.md)
- **الأصل:** `01-FOUNDATIONS.md` §10 إمكانية الوصول · CLAUDE.md § Accessibility Is Mandatory — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
