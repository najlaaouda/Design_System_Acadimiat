---
title: عناصر التحكم وأهداف اللمس
name: controls
tier: foundation
status: approved
source: ['Design-System/tokens/tokens.css']
origin: ['Design-System/01-FOUNDATIONS.md#7-عناصر-التحكم-وأهداف-اللمس']
last_verified: unknown
---

# عناصر التحكم وأهداف اللمس — الأسس

> يحكم ارتفاعات عناصر التحكم والحد الأدنى لهدف اللمس.

## 1. المبدأ

44px ليست رقمًا عشوائيًا: هي الحد الأدنى المريح لهدف اللمس.

## 2. القيم

> القيم في هذا الجدول هي الوحيدة المسموحة — [القاعدة](../../DESIGN.md#القيم-المسموحة) · [المرجع السريع](../../migration/PLAYBOOK.md).

| توكن | القيمة | متى |
|---|---|---|
| `--ds-control-height-sm` | 36px | جداول مضغوطة، شريط فلاتر |
| `--ds-control-height-md` | **44px** | **الافتراضي** |
| `--ds-control-height-lg` | 52px | إجراء بارز |

## 3. الاستعمال

وعلى الأجهزة اللمسية يرتفع `sm` تلقائيًا إلى 44px عبر `@media (pointer: coarse)`.

## 4. قواعد إلزامية

> ⚠️ **غير موثّق بعد:** قاعدة إلزامية مكتوبة لارتفاع عنصر التحكم (مثل منع ارتفاع بقيمة حرة، أو ما يُفعل بمكوّن ارتفاعه دون 44px) — الأصل يكتفي بالجدول والحد الأدنى في §1.

## 5. شجرة القرار

من عمود «متى» في جدول §2:

```
أين عنصر التحكم؟
├── جداول مضغوطة، شريط فلاتر   → --ds-control-height-sm · 36px (44px على اللمس)
├── إجراء بارز                 → --ds-control-height-lg · 52px
└── غير ذلك — الافتراضي        → --ds-control-height-md · 44px
```

## 6. افعل / لا تفعل

> ⚠️ **غير موثّق بعد:** أزواج ✓ / ✗ لهذا الأساس — لا يكتبها الأصل.

## 7. إضافة قيمة جديدة

ارتفاع جديد تغيير في نظام التصميم لا قرار شاشة — [الحوكمة](../../DESIGN.md#8-الحوكمة) · [إضافة توكن جديد](../tokens/token-reference.md).

## 8. روابط

- **التوكنز:** [`token-reference.md`](../tokens/token-reference.md)
- **يُستخدم في:** [`button.md`](../atoms/button.md) · [`input-and-form.md`](../molecules/input-and-form.md) · [`search-field.md`](../molecules/search-field.md) · [`filtering.md`](../patterns/filtering.md) (شريط الفلاتر) · [`table.md`](../organisms/table.md)
- **ذو صلة:** [`accessibility.md`](./accessibility.md) · [`radius.md`](./radius.md) (`--ds-radius-control`)
- **الأصل:** `01-FOUNDATIONS.md` §7 عناصر التحكم وأهداف اللمس — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
