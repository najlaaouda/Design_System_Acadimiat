---
title: الحوارات
name: dialogs
tier: pattern
status: approved
components: ['<app-modal>', '<app-drawer>', '<app-sheet>', '<app-detail-panel>', '<app-notice-strip>', '<app-alert>']
origin: ['Design-System/components/modal-drawer.md', 'CLAUDE.md']
decisions: ['UI-12 — حوار أم درج أم صفحة (بلا تاريخ في الأصل)', '2026-09-11 — حقلان متجاوران ⇒ <app-modal size="xl"> («إضافة مدرب»)', '2026-09-14 — الإشارة أوّل جسم النافذة تحت العنوان، ولا يعلوها إلا تنبيه تعذّر الحفظ', '2026-09-14 — لا <app-alert tone="info"> للإشارة في النافذة، وتعذّر الحفظ <app-alert tone="danger"> أعلى الجسم']
last_verified: 2026-09-26
---

# الحوارات — نمط

> أيّ طبقة تُفتح — حوار أم درج أم صفحة (UI-12) — وما يوضع داخل النافذة وبأيّ ترتيب، ومتى تتّسع.

## 1. متى تستخدمه

- حين يُفتح شيء فوق الصفحة أو بجوارها — تأكيد، إجراء قصير، نموذج، تفاصيل سجلّ، إنشاء أو تحرير رئيسي — فتُختار طبقته من [§6](#6-شجرة-القرار).
- حين يوضع داخل `<app-modal>` إشارة، أو تنبيه تعذّر الحفظ، أو حقلان متجاوران — [§7](#7-القواعد).

## 2. متى لا تستخدمه

**الخطأ الشائع:** حشر نموذج من 12 حقلًا في حوار. النتيجة تمرير داخل تمرير، وأزرار تختفي، وتجربة سيئة على الجوال. إن احتاج المحتوى تمريرًا كثيرًا فهو صفحة.

- متى لا تُستخدم الورقة `<app-sheet>` وبديلها ← [sheet.md §2](../organisms/sheet.md#2-متى-لا-تستخدمه)
- متى لا تُستخدم لوحة التفاصيل `<app-detail-panel>` وبديلها ← [detail-panel.md §2](../organisms/detail-panel.md#2-متى-لا-تستخدمه)

## 3. المكوّنات المستخدمة

| المكوّن | دوره في النمط | ملفه |
|---|---|---|
| `<app-modal>` | تأكيد، إجراء قصير، نموذج صغير | [modal-drawer.md](../organisms/modal-drawer.md#modal) |
| `ConfirmDialogComponent` (عبر `ConfirmOverlayService`) | حوار التأكيد، على `<app-modal>` | [modal-drawer.md §4](../organisms/modal-drawer.md#حوار-التأكيد--confirmdialogcomponent) |
| `<app-drawer>` | تفاصيل، تحرير سياقي، مسار ثانوي | [modal-drawer.md](../organisms/modal-drawer.md#drawer) |
| `<app-sheet>` | إنشاء أو تحرير رئيسي: محرّر، نموذج طويل، إعدادات بجانب المحتوى | [sheet.md](../organisms/sheet.md) |
| `<app-detail-panel>` | قراءة سجلّ من قائمة، وتصفّح إخوته | [detail-panel.md](../organisms/detail-panel.md) |
| `<app-notice-strip>` | الإشارة داخل النافذة | [notice-strip.md](../molecules/notice-strip.md) |
| `<app-alert tone="danger">` | تعذّر الحفظ، أعلى جسم النافذة | [alert-toast.md](../molecules/alert-toast.md) |

## 4. التشريح

ترتيب النافذة من الأعلى إلى الأسفل (قرار المنتج 2026-09-14 — CLAUDE.md):

```
عنوان النافذة                                   [⊗]
[تعذر الحفظ … — <app-alert tone="danger">، عند الفشل وحده]
[شريط الإشارة — <app-notice-strip>]
الحقول / المحتوى
                                    [إلغاء] [الفعل]
```

القاعدة في [§7](#الإشارة-أعلى-النافذة). ورأس النافذة وجسمها وذيلها — [modal-drawer.md §3](../organisms/modal-drawer.md#3-التشريح).

## 5. الأنواع

> لا ينطبق — الأنواع هي الطبقات في [§3](#3-المكوّنات-المستخدمة)، والاختيار بينها في [§6](#6-شجرة-القرار).

## 6. شجرة القرار

### القرار: حوار أم درج أم صفحة؟ (UI-12)

| | Modal | Drawer | صفحة |
|---|---|---|---|
| **متى** | تأكيد، إجراء قصير، نموذج صغير | تفاصيل، تحرير سياقي، مسار ثانوي | نموذج معقّد، مسار طويل، إنشاء/تحرير رئيسي |
| **السياق خلفه** | محجوب | مرئي جزئيًا ومفيد | مستبدل |
| **الحجم** | ≤ 3 حقول | قائمة تفاصيل | بلا حد |
| **مثال** | «حذف الدورة؟» | تفاصيل طلب | إنشاء دورة |

### الطبقات الأخرى — الجدول في ملف كلٍّ منها

- الورقة `<app-sheet>` أم حوار أم درج أم مسار خارج قشرة اللوحة ← [sheet.md §1–§2](../organisms/sheet.md#1-متى-تستخدمه)
- لوحة التفاصيل `<app-detail-panel>` أم حوار أم درج ← [detail-panel.md §2](../organisms/detail-panel.md#2-متى-لا-تستخدمه)

### قرارات مجاورة

- فعل بأكثر من وجهة (نشر الدورة) ← `choices` في حوار التأكيد — [modal-drawer.md §4](../organisms/modal-drawer.md#حوار-التأكيد--confirmdialogcomponent)
- رفض الخادم لفعلٍ في حوار التأكيد ← «الرفض» في المواصفة — [modal-drawer.md §4](../organisms/modal-drawer.md#حوار-التأكيد--confirmdialogcomponent)
- «حذف» من قائمة ⋯ ← [menu.md § الترتيب](../molecules/menu.md#الترتيب)
- «حفظ» صفحة من عدّة بطاقات أم تذييل حوار ← [save-bar.md §2](../organisms/save-bar.md#2-متى-لا-تستخدمه)

## 7. القواعد

### الإشارة أعلى النافذة

(قرار المنتج 2026-09-14 — CLAUDE.md)

> **The notice sits at the top of the dialog** (product decision, 2026-09-14) — the first thing in the body, directly under the title, before the fields or the content, exactly where those two dialogs place it. The only thing above it is the failed-save alert, when there is one. Never a notice below the fields or at the end of the body.

«those two dialogs»: حوار التطبيقات وحوار بوابات الدفع — [`integration-form-dialog.component.html`](../../../src/app/views/admin/main-features/integrations/integration-form-dialog/integration-form-dialog.component.html) و[`gateway-form-dialog.component.html`](../../../src/app/views/admin/main-features/settings/settings-portal-tab/gateway-form-dialog/gateway-form-dialog.component.html). الرسم في [§4](#4-التشريح).

### تعذّر الحفظ

(قرار المنتج 2026-09-14 — CLAUDE.md)

> A failed save stays `<app-alert tone="danger">` at the top of the dialog body, as in those two dialogs.

### شكل الإشارة

← «A notice inside a dialog looks exactly like the one in the integrations and payment-gateway dialogs» (قرار المنتج 2026-09-14 — CLAUDE.md): الشكل كلّه في [notice-strip.md](../molecules/notice-strip.md).

### حقلان متجاوران ⇒ نافذة أعرض

(قرار المنتج — CLAUDE.md)

> **Two fields side by side ⇒ a wider dialog.** One field per line is the default. When two related fields share a row (email + mobile in «إضافة مدرب», IBAN + Swift in «إضافة حساب بنكي»), the dialog goes to `<app-modal size="xl">` (960px) — at the default `md` (560) or `lg` (640) each column is too narrow for its value.

← تخطيط الصفّ نفسه في [forms.md](./forms.md) · والأحجام في [modal-drawer.md § الأحجام](../organisms/modal-drawer.md#الأحجام)

### الأيقونتان العائمتان تُخفيان فوق كل نافذة

(قرار المنتج 2026-09-11)

فقاعة «مركز المساعدة» (المحادثة) ودائرة إمكانية الوصول **لا تظهران فوق أيّ نافذة منبثقة**، وتظهران في صفحات اللوحة وحدها. كانت الفقاعة مرفوعة فوق الحوارات عمدًا، والدائرة تقع على الجوال فوق الزرّ الأساسي في ذيل الحوار. (المستخدم يسمّي الاثنتين «أيقونة المساعدة».)

القاعدة **واحدة** في `src/styles.scss` لكل ما يُفتح فوق الصفحة: `[data-custom-dialog-root]` (كل حوار، ومنه `<app-modal>`) · `.custom-dialog-backdrop` · `html.ds-sheet-open` · `body.swal2-shown` · `.ds-drawer__overlay` · `.ds-upload-tray` · `app-detail-panel`.

* **نوع نافذة جديد يُضاف محدِّده إلى القاعدة نفسها** — لا صنف على `body` لكل شاشة كالقواعد القديمة.
* فوق شريط الحفظ الثابت لا تُخفيان بل تصعدان بقدره — [save-bar.md](../organisms/save-bar.md).

## 8. RTL والاستجابة

كل طبقة تحمل قواعدها:

- الحوار والدرج ← [modal-drawer.md §9](../organisms/modal-drawer.md#9-الاستجابة) و[§10](../organisms/modal-drawer.md#10-rtl)
- الورقة ← [sheet.md §9](../organisms/sheet.md#9-الاستجابة) و[§10](../organisms/sheet.md#10-rtl)
- لوحة التفاصيل ← [detail-panel.md §9](../organisms/detail-panel.md#9-الاستجابة) و[§10](../organisms/detail-panel.md#10-rtl)

## 9. إمكانية الوصول

الفرق في حبس التركيز و`aria-modal` بين الحوار والدرج ولوحة التفاصيل ← الجدول في [detail-panel.md §2](../organisms/detail-panel.md#2-متى-لا-تستخدمه). وتفاصيل كل طبقة في §11 من ملفها: [الحوار والدرج](../organisms/modal-drawer.md#11-إمكانية-الوصول) · [الورقة](../organisms/sheet.md#11-إمكانية-الوصول) · [لوحة التفاصيل](../organisms/detail-panel.md#11-إمكانية-الوصول).

## 10. النصوص

- عنوان الحوار وأزراره، وحوار التأكيد وحوار الإدخال ← [modal-drawer.md §12](../organisms/modal-drawer.md#12-النصوص)
- الورقة ← [sheet.md §12](../organisms/sheet.md#12-النصوص)
- القواعد العامة ← [ux-writing.md](../foundations/ux-writing.md) §3–4

## 11. مثال

| النافذة | ما تُظهره من النمط | الملف |
|---|---|---|
| حوار التطبيقات | الإشارة أوّل الجسم، وتعذّر الحفظ فوقها | [`integration-form-dialog.component.html`](../../../src/app/views/admin/main-features/integrations/integration-form-dialog/integration-form-dialog.component.html) |
| حوار بوابات الدفع | الإشارة أوّل الجسم، وتعذّر الحفظ فوقها | [`gateway-form-dialog.component.html`](../../../src/app/views/admin/main-features/settings/settings-portal-tab/gateway-form-dialog/gateway-form-dialog.component.html) |
| «إضافة مدرب» | البريد والموبايل متجاوران ⇒ `xl` | [`user-dialog-form.scss`](../../../src/app/views/admin/members/users/user-dialog-form.scss) |
| «إضافة حساب بنكي» | IBAN وSwift متجاوران ⇒ `xl` | [`bankaccount-form-dialog.component.html`](../../../src/app/views/admin/main-features/finance/finance-bankaccount/bankaccount-form-dialog/bankaccount-form-dialog.component.html) |

## 12. ممنوع

* ❌ Never `<app-alert tone="info">`, `tone="info"` on the strip, or a hand-drawn colored box for a notice in a dialog. (قرار المنتج 2026-09-14 — CLAUDE.md)

## 13. روابط

- **المكوّنات:** [modal-drawer.md](../organisms/modal-drawer.md) · [sheet.md](../organisms/sheet.md) · [detail-panel.md](../organisms/detail-panel.md) · [notice-strip.md](../molecules/notice-strip.md) · [alert-toast.md](../molecules/alert-toast.md)
- **ذو صلة:** [forms.md](./forms.md) — تخطيط الحقول داخل النافذة · [menu.md](../molecules/menu.md) · [save-bar.md](../organisms/save-bar.md) · [ux-writing.md](../foundations/ux-writing.md)
- **الأصل:** `Design-System/components/modal-drawer.md` § «القرار: حوار أم درج أم صفحة؟ (UI-12)» · `CLAUDE.md` § Mandatory — «A notice inside a dialog looks exactly like…»، «The notice sits at the top of the dialog»، «Two fields side by side ⇒ a wider dialog» — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
