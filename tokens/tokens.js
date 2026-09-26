/**
 * Acadimiat Design System — جسر التوكنز إلى Tailwind
 * ============================================================================
 *
 * هذا الملف لا يحتوي على أي قيمة تصميم خام.
 * كل قيمة هنا هي مرجع `var(--ds-*)` يشير إلى `tokens.css` — المصدر الوحيد للحقيقة.
 *
 * الفائدة: تغيير لون العلامة يتم في ملف CSS واحد، فتتبعه أدوات Tailwind
 * والمكونات معًا دون أي مزامنة يدوية، ويعمل الوضع الداكن تلقائيًا لأن
 * `var()` يُحلّ وقت التشغيل لا وقت البناء.
 *
 * الاستخدام في tailwind.config.js:
 *   const ds = require('./Design-System/tokens/tokens.js');
 *   theme: { extend: { ...ds.tailwindTheme } }
 *
 * ملاحظة: قيم `opacity` في Tailwind (مثل `tw-bg-brand/50`) لا تعمل مع
 * مراجع var() التي تحمل صيغة hex. عند الحاجة لشفافية استخدم توكن
 * دلالي جاهز (مثل --ds-color-overlay) بدل توليدها من الأداة.
 */

const ref = (name) => `var(--ds-${name})`;

/** سلالم الألوان الخام — للحالات النادرة التي تحتاج درجة محددة. */
const palette = (base) =>
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce(
    (acc, step) => ({ ...acc, [step]: ref(`${base}-${step}`) }),
    {}
  );

const colors = {
  // اللوحات الخام
  brand: palette('brand'),
  accent: palette('accent'),
  neutral: { 0: ref('neutral-0'), ...palette('neutral') },
  success: palette('success'),
  danger: palette('danger'),
  warning: palette('warning'),
  info: palette('info'),

  // الطبقة الدلالية — هذه هي التي يجب أن تستخدمها المكونات
  surface: {
    page: ref('color-surface-page'),
    DEFAULT: ref('color-surface-default'),
    raised: ref('color-surface-raised'),
    sunken: ref('color-surface-sunken'),
    hover: ref('color-surface-hover'),
    selected: ref('color-surface-selected'),
    disabled: ref('color-surface-disabled'),
    inverse: ref('color-surface-inverse'),
  },
  content: {
    DEFAULT: ref('color-text-primary'),
    secondary: ref('color-text-secondary'),
    muted: ref('color-text-muted'),
    placeholder: ref('color-text-placeholder'),
    disabled: ref('color-text-disabled'),
    inverse: ref('color-text-inverse'),
    brand: ref('color-text-brand'),
    link: ref('color-text-link'),
    success: ref('color-text-success'),
    danger: ref('color-text-danger'),
    warning: ref('color-text-warning'),
    info: ref('color-text-info'),
  },
  stroke: {
    subtle: ref('color-border-subtle'),
    DEFAULT: ref('color-border-default'),
    strong: ref('color-border-strong'),
    brand: ref('color-border-brand'),
    danger: ref('color-border-danger'),
  },
  field: {
    DEFAULT: ref('color-field-bg'),
    disabled: ref('color-field-bg-disabled'),
    readonly: ref('color-field-bg-readonly'),
    border: ref('color-field-border'),
    'border-hover': ref('color-field-border-hover'),
    'border-focus': ref('color-field-border-focus'),
    'border-error': ref('color-field-border-error'),
  },
  overlay: ref('color-overlay'),
  focus: ref('color-focus-ring'),
};

const spacing = {
  'ds-0': ref('space-0'),
  'ds-1': ref('space-1'),
  'ds-2': ref('space-2'),
  'ds-3': ref('space-3'),
  'ds-4': ref('space-4'),
  'ds-5': ref('space-5'),
  'ds-6': ref('space-6'),
  'ds-8': ref('space-8'),
  'ds-10': ref('space-10'),
  'ds-12': ref('space-12'),
  'ds-16': ref('space-16'),
};

const tailwindTheme = {
  colors,
  spacing,
  fontFamily: {
    ds: [ref('font-family')],
    'ds-mono': [ref('font-family-mono')],
  },
  fontSize: {
    'ds-2xs': [ref('font-size-2xs'), { lineHeight: ref('line-height-snug') }],
    'ds-xs': [ref('font-size-xs'), { lineHeight: ref('line-height-snug') }],
    'ds-md': [ref('font-size-md'), { lineHeight: ref('line-height-normal') }],
    'ds-lg': [ref('font-size-lg'), { lineHeight: ref('line-height-normal') }],
    'ds-xl': [ref('font-size-xl'), { lineHeight: ref('line-height-snug') }],
    'ds-2xl': [ref('font-size-2xl'), { lineHeight: ref('line-height-snug') }],
    'ds-3xl': [ref('font-size-3xl'), { lineHeight: ref('line-height-tight') }],
    'ds-4xl': [ref('font-size-4xl'), { lineHeight: ref('line-height-tight') }],
  },
  borderRadius: {
    'ds-xs': ref('radius-xs'),
    'ds-sm': ref('radius-sm'),
    'ds-md': ref('radius-md'),
    'ds-lg': ref('radius-lg'),
    'ds-xl': ref('radius-xl'),
    'ds-2xl': ref('radius-2xl'),
    'ds-pill': ref('radius-pill'),
  },
  boxShadow: {
    'ds-0': ref('elevation-0'),
    'ds-1': ref('elevation-1'),
    'ds-2': ref('elevation-2'),
    'ds-3': ref('elevation-3'),
    'ds-4': ref('elevation-4'),
    'ds-focus': ref('focus-ring'),
  },
  transitionDuration: {
    'ds-instant': ref('duration-instant'),
    'ds-fast': ref('duration-fast'),
    'ds-normal': ref('duration-normal'),
    'ds-slow': ref('duration-slow'),
  },
  transitionTimingFunction: {
    'ds-standard': ref('easing-standard'),
    'ds-enter': ref('easing-enter'),
    'ds-exit': ref('easing-exit'),
  },
  // ⚠️ الزرّ مفكوك عن سلّم عناصر التحكّم: control = 36/44/52 وbutton = 32/40/48.
  //    لا تقس زرًّا بـ h-ds-control-* ولا العكس — الاسمان يعنيان رقمين مختلفين.
  height: {
    'ds-control-sm': ref('control-height-sm'),
    'ds-control-md': ref('control-height-md'),
    'ds-control-lg': ref('control-height-lg'),
    'ds-button-sm': ref('button-height-sm'),
    'ds-button-md': ref('button-height-md'),
    'ds-button-lg': ref('button-height-lg'),
  },
  minHeight: {
    'ds-touch': ref('touch-target-min'),
    'ds-control-sm': ref('control-height-sm'),
    'ds-control-md': ref('control-height-md'),
    'ds-control-lg': ref('control-height-lg'),
  },
  minWidth: {
    'ds-touch': ref('touch-target-min'),
  },
  zIndex: {
    'ds-sticky': ref('z-sticky'),
    'ds-dropdown': ref('z-dropdown'),
    'ds-overlay': ref('z-overlay'),
    'ds-modal': ref('z-modal'),
    'ds-drawer': ref('z-drawer'),
    'ds-popover': ref('z-popover'),
    'ds-toast': ref('z-toast'),
    'ds-tooltip': ref('z-tooltip'),
  },
  maxWidth: {
    'ds-container': ref('container-max'),
    'ds-prose': ref('prose-max'),
  },
};

module.exports = { tailwindTheme, colors, spacing, ref };
