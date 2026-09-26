---
title: الطبقات (z-index)
name: z-index
tier: foundation
status: approved
source: ['Design-System/tokens/tokens.css']
origin: ['Design-System/01-FOUNDATIONS.md#8-الطبقات-z-index']
last_verified: unknown
---

# الطبقات (z-index) — الأسس

> يحكم ترتيب الطبقات فوق الصفحة: الملتصق، القوائم، الحجب، الحوار، الدرج، المنبثق، التوست، التلميح.

## 1. المبدأ

الوضع القائم في المشروع فوضوي: قيم تصل إلى `9999999999999`.

## 2. القيم

> القيم في هذا الجدول هي الوحيدة المسموحة — [القاعدة](../../DESIGN.md#القيم-المسموحة) · [المرجع السريع](../../migration/PLAYBOOK.md).

النظام يحجز نطاقًا موثّقًا:

| توكن | القيمة |
|---|---|
| `--ds-z-sticky` | 1020 |
| `--ds-z-dropdown` | 1030 |
| `--ds-z-overlay` | 1040 |
| `--ds-z-modal` | 1050 |
| `--ds-z-drawer` | 1055 |
| `--ds-z-popover` | 1060 |
| `--ds-z-toast` | 1080 |
| `--ds-z-tooltip` | 1090 |

## 3. الاستعمال

> ⚠️ **غير موثّق بعد:** متى تُستعمل كل طبقة — الأصل يسرد التوكنز وقيمها بلا عمود استعمال؛ الاسم وحده يدلّ على الطبقة.

## 4. قواعد إلزامية

**أي `z-index` بقيمة حرة في كود جديد مرفوض.** القيم الموروثة العالية دَين تقني مسجّل في [`migration/PLAYBOOK.md`](../../migration/PLAYBOOK.md).

## 5. شجرة القرار

> ⚠️ **غير موثّق بعد:** لا جدول «متى أيّ طبقة» في الأصل تُبنى منه الشجرة (مثلًا: أيّهما فوق الآخر حين يُفتح حوار من درج).

## 6. افعل / لا تفعل

> ⚠️ **غير موثّق بعد:** أزواج ✓ / ✗ لهذا الأساس — الممنوع الوحيد في الأصل هو القيمة الحرة في §4.

## 7. إضافة قيمة جديدة

طبقة جديدة تغيير في نظام التصميم لا قرار شاشة — [الحوكمة](../../DESIGN.md#8-الحوكمة) · [إضافة توكن جديد](../tokens/token-reference.md).

## 8. روابط

- **التوكنز:** [`token-reference.md`](../tokens/token-reference.md)
- **يُستخدم في:** [`modal-drawer.md`](../organisms/modal-drawer.md) · [`menu.md`](../molecules/menu.md) · [`overlay.md`](../molecules/overlay.md) · [`alert-toast.md`](../molecules/alert-toast.md) · [`tooltip.md`](../atoms/tooltip.md)
- **ذو صلة:** [`elevation.md`](./elevation.md) · [الدين المسجّل: فوضى `z-index`](../../migration/PLAYBOOK.md#1-فوضى-z-index)
- **الأصل:** `01-FOUNDATIONS.md` §8 الطبقات (z-index) — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
