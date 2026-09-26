# خريطة الترحيل — Bootstrap إلى نظام التصميم

جدول تحويل مباشر. الأعداد من مسح فعلي لـ `src/app/views/admin/**/*.html`.

---

## الأزرار — 550 استخدامًا

| Bootstrap | البديل |
|---|---|
| `btn btn-primary` | `<app-button variant="primary">` |
| `btn btn-secondary` \| `btn-outline-*` | `<app-button variant="secondary">` |
| `btn btn-link` \| `btn-light` | `<app-button variant="tertiary">` |
| `btn btn-danger` | `<app-button variant="danger">` |
| `btn btn-success` | `<app-button variant="primary">` — لا زر نجاح في النظام |
| `btn btn-sm` \| `btn-lg` | `size="sm"` \| `size="lg"` |
| `btn btn-block` | `[fullWidth]="true"` |
| `disabled` | `[disabled]="…"` |
| `p-btn-primary` (من panel-style) | `<app-button variant="primary">` |

---

## الحقول — 516 + 125 + 97 استخدامًا

| Bootstrap | البديل |
|---|---|
| `form-control` | `<app-form-field>` |
| `form-control-sm` | لا مقابل — ارتفاع الحقل موحّد |
| `form-group` | تخطيط بـ `--ds-space-6` |
| `form-label` | `label` على `<app-form-field>` |
| `form-text` \| `text-muted` (مساعد) | `hint` |
| `invalid-feedback` \| `is-invalid` | `error` |
| `form-select` \| `custom-select` | `<app-native-select>` |
| `form-check` + `form-check-input` | `<app-checkbox>` \| `<app-radio>` |
| `form-switch` | `<app-toggle>` |
| `input-group` | تخطيط داخل `<app-form-field>` |

---

## البطاقات — 1224 استخدامًا

| Bootstrap | البديل |
|---|---|
| `card` | `<app-card>` |
| `card-header` | `heading` + `[card-actions]` |
| `card-body` | المحتوى المُسقَط |
| `card-footer` | `[card-footer]` + `[hasFooter]="true"` |
| `card-title` | `heading` |
| `card-subtitle` \| `card-text` (شارح) | `description` |
| `shadow` \| `shadow-sm` | `appearance="raised"` |

---

## الجداول — 367 استخدامًا

| Bootstrap | البديل |
|---|---|
| `table` | `<app-table caption="…">` حول `<table>` أصلي |
| `table-responsive` | مدمج — تمرير داخل الحاوية |
| `table-striped` | `[zebra]="true"` |
| `table-sm` | `density="compact"` |
| `table-hover` | مدمج افتراضيًا |
| `text-end` على خلية رقمية | `class="ds-table__numeric"` |
| عمود إجراءات | `class="ds-table__actions"` |

---

## التغذية الراجعة — 182 + 111 استخدامًا

| Bootstrap | البديل |
|---|---|
| `alert alert-*` | `<app-alert tone="…">` |
| `alert-dismissible` | `[dismissible]="true"` |
| `badge badge-*` \| `bg-*` | `<app-badge tone="…">` |
| شارة تمثّل حالة كائن | **`<app-status status="…">`** |
| `spinner-border` \| `spinner-grow` | `<app-skeleton-group>` أو `[loading]` على الزر |
| `progress` + `progress-bar` | `<app-progress-bar>` |
| `toast` | `ToastService` |
| `tooltip` \| `title` | `[appTooltip]` |

---

## الطبقات — 99 استخدامًا

| Bootstrap | البديل |
|---|---|
| `modal` + `modal-dialog` | `CustomDialogService` |
| `modal-header` / `-body` / `-footer` | بنية الحوار القائمة |
| `offcanvas` | `<app-drawer>` |
| `dropdown` + `dropdown-menu` | `<app-menu>` |
| `nav nav-tabs` | `<app-tabs>` |
| `breadcrumb` | `<app-breadcrumbs>` |
| `pagination` | `<app-paginator>` |

---

## الشبكة — 788 + 286 استخدامًا

هنا **لا يوجد مكوّن بديل**. الشبكة تخطيط لا مكوّن، وتُستبدل بـ Tailwind مباشرةً.

| Bootstrap | Tailwind |
|---|---|
| `container` \| `container-fluid` | `tw-mx-auto tw-max-w-ds-container tw-px-ds-4` |
| `row` | `tw-grid tw-grid-cols-12 tw-gap-ds-4` |
| `col-md-6` | `tw-col-span-12 tw-md:tw-col-span-6` |
| `d-flex` | `tw-flex` |
| `justify-content-between` | `tw-justify-between` |
| `align-items-center` | `tw-items-center` |
| `mb-3` \| `mt-4` … | `tw-mb-ds-4` \| `tw-mt-ds-6` — **من المقياس** |
| `text-center` | `tw-text-center` — راجع RTL-04 أولًا |
| `text-end` | `tw-text-end` |
| `d-none d-md-block` | `tw-hidden tw-md:tw-block` |

### تحذير الشبكة

`row` + `col-*` في Bootstrap 4 تعتمد **هوامش سالبة**. لا تخلط `row` مع `tw-grid` في الشجرة نفسها؛ رحّل الحاوية كاملة دفعة واحدة.

---

## الألوان والنصوص المساعدة

| Bootstrap | البديل |
|---|---|
| `text-primary` | `tw-text-content-brand` |
| `text-muted` | `tw-text-content-muted` |
| `text-danger` | `tw-text-content-danger` |
| `bg-light` | `tw-bg-surface-page` |
| `bg-white` | `tw-bg-surface` |
| `border` | `tw-border tw-border-stroke-subtle` |
| `rounded` | `tw-rounded-ds-md` |

---

## متغيرات CSS الموروثة

| موروث | البديل |
|---|---|
| `var(--p-primary-color)` | `var(--ds-color-action-primary-bg)` |
| `var(--p-primary-light)` | `var(--ds-color-brand-bg)` |
| `var(--p-secondary-color)` | `var(--ds-accent-800)` |
| `var(--primary)` (برتقالي `#eb8153`) | `var(--ds-color-action-primary-bg)` — كان انحرافًا |
| `var(--bs-danger)` | `var(--ds-color-danger-solid)` |
| `var(--bs-success)` | `var(--ds-color-success-solid)` |
| `#702ea4` مكتوبًا يدويًا | `var(--ds-color-action-primary-bg)` |

**استثناء:** `--btn-background-color` و`--main-color` و`--heading-color` تخص **تلوين الموقع العام لكل مستأجر** عبر `setProperty`. لا تُلمس — هي ليست جزءًا من هوية لوحة التحكم.
