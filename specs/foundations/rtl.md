---
title: RTL
name: rtl
tier: foundation
status: approved
source: ['Design-System/tokens/tokens.css']
origin: ['Design-System/01-FOUNDATIONS.md#9-rtl', 'CLAUDE.md#rtl-is-mandatory']
last_verified: unknown
---

# RTL — الأسس

> يحكم اتجاه الواجهة من اليمين إلى اليسار: الخصائص المنطقية، وما لا تحلّه، والمحاذاة.

## 1. المبدأ

أكاديميات منتج عربي أولًا. RTL ليس طبقة تُضاف بعد التصميم.

### القاعدة العملية الوحيدة

> **استخدم الخصائص المنطقية. لا تكتب `left` أو `right` أبدًا.**

## 2. القيم

> القيم في هذا الجدول هي الوحيدة المسموحة — [القاعدة](../../DESIGN.md#القيم-المسموحة) · [المرجع السريع](../../migration/PLAYBOOK.md).

| ❌ ممنوع | ✅ بديله |
|---|---|
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `left: 0` | `inset-inline-start: 0` |
| `border-left` | `border-inline-start` |
| `width` / `height` | `inline-size` / `block-size` |

المكوّن المبني بخصائص منطقية يعمل في الاتجاهين **دون أي قاعدة خاصة بكل اتجاه** — لا `[dir="rtl"]` ولا ملف `rtl.css`.

## 3. الاستعمال

### ما لا تحلّه الخصائص المنطقية

* **`transform: translateX`** لا يعرف الاتجاه. استبدله بـ `inset-inline-start` حيثما أمكن — هكذا أُصلح خلل مفتاح التبديل الذي كان يعمل في العربية فقط.
* **الأيقونات الاتجاهية** (رجوع، تالي، طيّ) تحتاج انعكاسًا صريحًا. الأيقونات غير الاتجاهية (حذف، تعديل) **لا تُعكس**.
* **الأرقام والمبالغ** تبقى LTR داخل النص العربي، وإلا انكسر ترتيب الخانات. جداول النظام تطبّق `direction: ltr` على الخلايا الرقمية.
* **الرسوم البيانية** تحتاج قرارًا صريحًا لاتجاه المحور.

## 4. قواعد إلزامية

### التوسيط ليس حلًّا لـ RTL

`text-align: center` لإخفاء مشكلة اتجاه ممنوع (RTL-04). النص الجاري يحاذي `start`. التوسيط قرار تخطيط مشروع في الحالات الفارغة وحدها.

### RTL Is Mandatory

([CLAUDE.md § RTL Is Mandatory](../../../CLAUDE.md#rtl-is-mandatory))

> Acadimiat is an Arabic-first product.
>
> Every feature MUST be reviewed for RTL behavior.
>
> Pay particular attention to:
>
> * Layout direction
> * Text alignment
> * Navigation
> * Tables
> * Forms
> * Breadcrumbs
> * Pagination
> * Directional icons
> * Drawers
> * Modals
> * Charts
> * Logical CSS properties
>
> Do not assume that an LTR implementation will automatically work correctly in RTL.

## 5. شجرة القرار

> ⚠️ **غير موثّق بعد:** لا جدول «متى أيّ قيمة» في الأصل لهذا الأساس — جدول البدائل في §2 تحويل واحد لواحد لا قرار.

## 6. افعل / لا تفعل

الأزواج ❌ / ✅ لهذا الأساس هي جدول [§2](#2-القيم).

## 7. إضافة قيمة جديدة

> لا ينطبق — RTL قاعدة لا سلّم قيم؛ وأي تغيير فيها يمسّ أكثر من ميزة فهو قرار [الحوكمة](../../DESIGN.md#8-الحوكمة).

## 8. روابط

- **التوكنز:** [`token-reference.md`](../tokens/token-reference.md)
- **يُستخدم في:** [`switch.md`](../atoms/switch.md) (خلل `translateX` المُصلَح) · [`table.md`](../organisms/table.md) (الخلايا الرقمية) · [`chart.md`](../organisms/chart.md) (اتجاه المحور)
- **ذو صلة:** [`iconography.md` §7 RTL](./iconography.md#7-rtl) (الأيقونات الاتجاهية) · [`ux-writing.md` §9 الأرقام و RTL](./ux-writing.md#9-الأرقام-و-rtl) · [الدين المسجّل: الطبقة القديمة و`rtl.css`](../../migration/PLAYBOOK.md#5-الطبقة-القديمة-في-angularjson)
- **الأصل:** `01-FOUNDATIONS.md` §9 RTL · CLAUDE.md § RTL Is Mandatory — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
