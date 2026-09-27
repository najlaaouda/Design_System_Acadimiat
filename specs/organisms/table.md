---
title: الجدول
name: table
tier: organism
group: data-display
status: implemented
selector: ['<app-table>', '[appTableTotal]', 'tr[appTableGroup]', '<app-table-bar>', '<app-table-range>', '<app-table-toolbar>', '<app-table-selection-bar>', '<app-paginator>', '[appSort]', '[appSortHeader]']
source: ['src/app/shared/ui/table']
origin: ['Design-System/components/table.md']
keywords: ['جدول', 'ترقيم', 'صفوف', 'table', 'pagination']
last_verified: 2026-09-26
---

# الجدول — `<app-table>`

> يعرض بيانات يقارنها المستخدم أو يتخذ قرارًا بناءً عليها.

## 1. متى تستخدمه

يحل محل `class="table"` و`table-responsive` — **كانت 367 استخدامًا** في لوحة التحكم. الباقي منها اليوم 23 `class="table …"` و63 `table-responsive` في 42 ملفًّا، و`<app-table>` في 48 موضعًا في 33 ملفًّا (قيس 2026-09-26).

**قبل إضافة أي عمود اسأل (UI-10):** هل يحتاج المستخدم هذه المعلومة **في هذا السياق**؟ العمود الذي يُقرأ نادرًا مكانه صفحة التفاصيل لا الجدول.

## 2. متى لا تستخدمه

> ⚠️ **غير موثّق بعد:** متى لا يُستعمل الجدول كلّه وما بديله. الأصل يقول ذلك على مستوى العمود وحده («العمود الذي يُقرأ نادرًا مكانه صفحة التفاصيل لا الجدول» — §1)، وعلى مستوى الخليّة: نسبة واحدة داخل خليّة جدول ← `<app-table-bar>` (§3)، لا [`distribution-bar.md`](../molecules/distribution-bar.md).

## 3. التشريح

المكوّن غلاف حول جدول HTML **دلالي حقيقي**. لا يُستبدل `<table>` بـ `div`، لأن قارئ الشاشة يعتمد بنية الجدول ليعلن «صف 3 من 40، عمود السعر».

### الأجزاء والمقاسات كما يرسمها الكود

> وُثّق 2026-09-26 من الكود ([`table.component.ts`](../../../src/app/shared/ui/table/table.component.ts)).

```
<app-table>                         ← [bordered] (افتراضيًّا true): سطح surface-raised · حدّ border-width-sm بـborder-subtle · استدارة 12 · overflow: clip
├── [table-toolbar]                 ← فتحة: <app-table-toolbar> وما يرافقه (<app-filter-bar>، سطر مجموع) فوق الرأس
├── .ds-table__scroller             ← منطقة التمرير الأفقي: tabindex=0 · role=region · aria-label=caption · container-type: inline-size · isolation: isolate
│   └── <table>                     ← عرض 100% · border-collapse · خط 14 · text-primary
│       ├── <thead> th              ← ارتفاع --ds-table-header-height (40) · حشوة أفقية --ds-table-cell-padding-inline (16) · 12/600 · text-secondary · سطح surface-raised · حدّ سفلي border-width-md (2) بـborder-default · بلا التفاف
│       └── <tbody> td              ← حشوة --ds-table-cell-padding-block/-inline (16/16) · line-height snug · حدّ سفلي border-width-sm بـdivider · وسط رأسيًّا · الارتفاع من المحتوى لا height
└── .ds-table__selection            ← فتحة [table-selection]: شريط التحديد، لاصق بأسفل النافذة (sticky · inset-block-end 0 · --ds-z-sticky)
```

* `<caption>` إن وُجد: حشوة 16 × 20، خط 16/600، `text-primary`، محاذاة `start`.
* داخل `[bordered]` يسقط الحدّ السفلي لآخر صفّ: حدّ البطاقة يُغلق الجدول.
* `density="compact"`: حشوة الخليّة 8 × 12 والرأس حشوة أفقية 12.
* `[stickyHeader]`: منطقة التمرير بحدّ أقصى `70vh` وتمرير رأسي، والرأس `sticky` بـ`--ds-z-sticky`.
* `[zebra]`: الصفوف الزوجية `surface-page`.

### صف الإجمالي — `[appTableTotal]`

جدول أرقام بلا صف إجمالي ينقصه أول ما تبحث عنه العين. يُكتب **داخل `<thead>` قبل صف الرؤوس**، لا أسفل الجدول — أسفله يختفي عند أول تمرير.

```html
<app-table caption="التحويلات المالية" [stickyHeader]="true" [hasTotalRow]="true">
  <table>
    <thead>
      <tr appTableTotal>
        <th scope="row">الإجمالي</th>
        <td class="ds-table__numeric">12,400.00</td>
        <td colspan="3"></td>
      </tr>
      <tr><th scope="col">المرجع</th>…</tr>
    </thead>
```

`[hasTotalRow]` **إلزامي** مع `[stickyHeader]`: بدونه يلتصق صف الرؤوس عند الإزاحة نفسها فيغطّي الإجمالي. لا يُستنتج لأن المحتوى مُسقَط من المستهلك.

**الإزاحة بارتفاع الصفّ الفعلي** (2026-09-14): `<app-table>` يقيس صفّ الإجمالي (`ResizeObserver` على الرأس) ويضع ارتفاعه في `--ds-table-total-offset`، فتلتصق الرؤوس تحته ولو التفّ سطرين. و`--ds-table-total-height` (44) احتياطٌ قبل القياس.

**الحساب على المستهلك لا المكوّن.** خادم مرقَّم لا يعرف المجموع ما لم يُرسله، وجمع الصفحة المعروضة وحدها يعطي رقمًا خاطئًا يبدو صحيحًا.

**شكل الصفّ في الكود** (وُثّق 2026-09-26 من الكود): كل خليّة بارتفاع `--ds-table-total-height` (44) وحشوة 8 × 16، خط 14/600، سطح `--ds-table-total-bg` ونصّ `--ds-table-total-fg`، وحدّ سفلي `border-width-sm` بـ`--ds-table-total-border`، بلا التفاف. وخليّة `ds-table__numeric` فيه LTR بأرقام متساوية العرض ومحاذاة `end` كعمودها.

**صفّ ملخّص لا مجموع عمود** (سجل المسحوبات 2026-09-14): حين يحمل الصفّ أرقامًا من الخادم لا تجمع عمودًا — «مسحوباتي في الفترة» و«أجور التحويل البنكي» — يكون **خليّة واحدة بعرض الصفّ** (`<td [attr.colspan]="columns">`) والأرقام سطرًا واحدًا بجوار أسمائها. تحت عمود «المبلغ» يُقرأ الرقم مجموعَ ذلك العمود وهو ليس كذلك، واسمٌ طويل في خليّة العمود الأول يوسّع ذلك العمود فيُقصّ آخر الجدول. ويبقى الصفّ سطرًا واحدًا: ارتفاعه `--ds-table-total-height` هو ما تُزاح به الرؤوس الملتصقة تحته.

> **صُحّح 2026-09-26 من الكود:** سجل المسحوبات لم يعد يكتب هذا الملخّص صفًّا في الجدول. منذ 2026-09-17 (طلب المنتج — رأس `finance-history.component.html`) هو سطرٌ في منطقة الأدوات (`<div class="fin-history__total-line" table-toolbar>`) فوق الجدول والمخطط معًا، لأن «جدول / مخطط» يتبادلان المكان تحته. ولا شاشة في اللوحة تستعمل `[appTableTotal]` ولا `[hasTotalRow]` اليوم (قيس 2026-09-26).

### عنوان القسم — `tr[appTableGroup]`

```html
<tr appTableGroup label="مايو 2026" [count]="12" [colspan]="6"
    [(expanded)]="open['2026-05']"></tr>

@if (open['2026-05']) {
  @for (row of rowsOf('2026-05'); track row.id) { <tr>…</tr> }
}
```

| القاعدة | لماذا |
|---|---|
| **إخفاء الصفوف على المستهلك** | المكوّن يبثّ `expandedChange` ولا يلمس DOM الصفوف. البحث عن الصفوف التالية وإخفاؤها يكسر `@for` و`track` |
| **القسم الفارغ يبقى بعدّاد 0** | يقول «لا شيء هنا» بلا حالة فارغة وبلا اختفاء يربك من يبحث عن شهر بعينه |
| **إلا تحت فلتر** | مع فلتر (الحالة في سجل المسحوبات) يُخفى القسم الخالي مما فُلتر به: أشهر «لا تحويلات» بين النتائج تُقرأ نتائج (بلاغ المنتج 2026-09-14) |
| **التجميع يُسقط عمودًا** | جمّعت بعمود «النوع»؟ احذفه من `<thead>` والصفوف واحسب `colspan` بعده — وإلا تكرّرت قيمته تحت عنوان يقولها |
| `<th scope="colgroup">` | قارئ الشاشة ينسب الصفوف التالية إليه |

اللافتة أقصر من الصف (`--ds-table-group-height` = 40px) وبحد أعلى فقط — لافتة لا صف.

**أبيض بخطّ بنفسجي في بدايتها** (قرار المنتج 2026-09-14 — كانت رمادية فاتحة `surface-page`، وقبلها `surface-sunken`): الخلفية `--ds-table-group-bg` = `surface-default`، واسم القسم **أسود** `--ds-table-group-fg` = `text-primary` (طلب المنتج: الخطّ وحده بنفسجي)، وفي بداية العنوان خطّ `--ds-table-group-accent` (`brand-600`) بعرض `--ds-table-group-accent-width` (4 — كان 2، وطلب المنتج «زيد سمك الخط»). **لكل قسم مفتوح خطّه**: يبدأ تحت حافّة عنوانه بـ8 ويمتدّ على صفوفه حتى 8 قبل حافّة آخرها — فيُقرأ الشهر وطلباته كتلةً واحدة، وبين الأقسام فراغ. **والمطويّ أو الفارغ خطّ قصير** على عنوانه وحده (8 من أعلاه وأسفله). الحدّ الأعلى يفصل القسم عمّا قبله.

> جُرّب الخطّ **متصلًا** (العنوان وصفوفه بلا فراغ) ورُفض: كل صفّ في الجدول تابع لقسم، فصار إطارًا واحدًا على طول الجدول لا يفصل الأشهر. واختار المنتج الفراغ بين الأقسام من ثلاثة بدائل (2026-09-14).

```html
<tr appTableGroup …></tr>
@if (open[key]) {
  @for (row of rowsOf(key); track row.id; let last = $last) {
    <!-- الخطّ على أوّل خليّة فيه، وينتهي قبل حافّة آخر صفّ -->
    <tr class="ds-table__group-member" [class.ds-table__group-member--last]="last">…</tr>
  }
}
```

الخطّ عنصر زائف لا حدّ: الحدّ يزيح المحتوى 2px، والخطّ يغطّي الحدّ السفلي بين صفوف القسم فلا ينقطع داخله. والعنوان يعرف أنه مفتوح وله صفوف (`ds-table__group-cell--open`)، والصفوف يضع المستهلك صنفيها. ومنطقي (`inset-inline-start`) فيقع يمينًا في العربية. ورجّح المنتج الأبيض على الرمادي (Mercury، Quicken، Monarch) وعلى البنفسجي الفاتح (لون صفّ الإجمالي نفسه).

**بقية الأجزاء في الكود** (وُثّق 2026-09-26 من الكود — [`table-group.component.ts`](../../../src/app/shared/ui/table/table-group.component.ts)):

* الخليّة `<th scope="colgroup">` بارتفاع `--ds-table-group-height` (40) وحشوة أفقية 16 بلا رأسية، وحدّ أعلى `border-width-sm` بـ`border-default` وحده.
* في داخلها غلاف لاصق ببداية منطقة التمرير بعرض `100cqi` ناقص 16 من كل جهة، فيبقى الاسم والمجموع ظاهرين في جدول يُمرَّر أفقيًّا.
* زرّ الطيّ بارتفاع اللافتة كلّها (هدف اللمس)، والاسم فيه 14/600، والسهم `fa-light fa-angle-down` بـ`--ds-icon-size-sm` بلون `text-muted` — يدور 90° حين يُطوى ليشير إلى بداية السطر (−90 في LTR و+90 في RTL). والتركيز `--ds-focus-ring` باستدارة `radius-sm`.
* العدّاد 12 عادي `text-muted` بأرقام متساوية العرض؛ والمجموع 14/600 `text-primary`، LTR معزول. بين الاسم والعدّاد 12، وبين العدّاد والمجموع 16.

#### مجموع القسم — `total` و`countLabel`

> **مطبَّق 2026-09-13** — أوّل مستهلك: سجل المسحوبات (`/admin/finance/history`)، من فيجما node 249:302.
>
> **(قيس 2026-09-26):** لا مستهلك لـ`tr[appTableGroup]` اليوم في الكود كلّه — سجل المسحوبات صار جدولًا مسطّحًا «بلا تجميع بالشهر ولا طيّ» منذ 2026-09-17 (طلب المنتج، رأس `finance-history.component.html`). المكوّن باقٍ بمدخلاته كما هنا.

```html
<tr appTableGroup label="مايو 2026" [count]="3" countLabel="3 تحويلات" total="$45,150.00"
    [colspan]="9" [(expanded)]="open['2026-05']"></tr>
```

| المُدخل | ما يفعله |
|---|---|
| `total` | مجموع صفوف القسم مكتوبًا كما يُعرض، في طرف النهاية — LTR معزول بمنازل مصفوفة. ومعه ينتقل العدّاد إلى الطرف نفسه: «مايو 2026 ……… 3 تحويلات  $45,150.00» |
| `countLabel` | العدد بمعدوده («3 تحويلات»، «لا تحويلات») بدل الرقم وحده |

**المجموع من صفوف محمّلة كلها.** في سجل المسحوبات يُحمَّل السجل كاملًا ثم يُجمَّع؛ من صفحة واحدة من خادم مرقَّم يكون المجموع خاطئًا ويبدو صحيحًا — كقاعدة صف الإجمالي.

### شريط النسبة — `<app-table-bar>`

```html
<td><app-table-bar [percent]="73" /></td>
```

الشريط **ومعه** الرقم دائمًا: الطول وحده لا ينقل القيمة لمن لا يميّزه بدقة (WCAG 1.4.1)، والرقم وحده لا يُقارَن بنظرة على العمود كله.

الشريط `aria-hidden` والرقم هو ما يُقرأ — تكرارهما إعلان مزدوج. لا `role="progressbar"`: هذه قيمة مقروءة في جدول لا عملية جارية. القيم خارج المدى تُقصّ إلى 0–100.

**في الكود** (وُثّق 2026-09-26 من الكود): المسار يتمدّد بأدنى عرض 48px وبارتفاع `--ds-table-bar-height` (6)، والتعبئة بعرض النسبة المقرّبة إلى عدد صحيح؛ والرقم بعده بفجوة 12، خط 12 `text-secondary`، LTR بأرقام متساوية العرض ومحاذاة `end` وعرض أدنى `5ch`. قيمة غير رقمية تُعرض 0%. يستعمله «نظرة عامة» في `/admin/dashboard` (قيس 2026-09-26).

### المدى التاريخي — `<app-table-range>`

```html
<td><app-table-range [from]="plan.startDate" [to]="plan.endDate" /></td>
```

**عمود واحد لا عمودان.** `startdate` و`enddate` منفصلين يأكلان العرض مرتين ويُقرآن رقمين لا مدى.

**«بلا نهاية» حالة أولى لا استثناء** — خانة فارغة يقرأها المستخدم «بيانات ناقصة» لا «مفتوحة». غيّر النص بـ `[openLabel]`.

**في الكود** (وُثّق 2026-09-26 من الكود): «من — إلى» سطرًا واحدًا بلا التفاف وفجوة 8، والتاريخان `dir="ltr"` بأرقام متساوية العرض، والشرطة `—` و«بلا نهاية» بلون `text-muted`. بلا `from` يُعرض `openLabel` وحده. لا شاشة في اللوحة تستعمله بعد (قيس 2026-09-26).

### شريط الأدوات — `<app-table-toolbar>`

> وُثّق 2026-09-26 من الكود ([`table-toolbar.component.ts`](../../../src/app/shared/ui/table/table-toolbar.component.ts)). المستعملون: 20 ملفًّا (قيس 2026-09-26).

يوضع في فتحة `[table-toolbar]` من `<app-table>`، فيعلو الرأس داخل القشرة نفسها:

```
[ البحث · الفترة · الفلتر ]  ← [toolbar-filters] في طرف البداية        [toolbar-actions] في طرف النهاية →  [ تصدير · الأعمدة ]
```

* الشريط: حشوة 12 × 16، سطح `--ds-table-toolbar-bg`، حدّ سفلي `border-width-sm` بـ`--ds-table-toolbar-border`، وفجوة 12 بين السطرين و16 بين الطرفين حين يلتفّ.
* مجموعة الحقول لا تنكمش، وفجوتها `--ds-table-toolbar-gap-fields` (12). `<app-search-field>` و`<app-date-range-field>` فيها بعرض ثابت `--ds-table-toolbar-search-width` (320، في `inline-size` لا في `flex-basis` وحده)، و`<app-filter-chip>` و`<app-filter-panel>` بعرض محتواهما بعد البحث.
* مجموعة الأفعال بفجوة `--ds-table-toolbar-gap-actions` (8)، تُدفع إلى طرف النهاية بـ`margin-inline-start: auto`، ولا تتجاوز عرض الشريط فتلتفّ.
* ≤ 768px: الحقول تأخذ السطر كاملًا والفلتر بجوار البحث فيه (قرار المنتج 2026-09-24)، والحقل يملأ ما يبقى بأدنى نصف السطر، والأفعال في سطر تحته من البداية.

### شريط التحديد — `<app-table-selection-bar>`

> وُثّق 2026-09-26 من الكود ([`table-selection-bar.component.ts`](../../../src/app/shared/ui/table/table-selection-bar.component.ts)). المستعملون: 12 ملفًّا (قيس 2026-09-26).

يوضع في فتحة `[table-selection]`، فيجلس أسفل الصفوف ويلتصق بأسفل النافذة ما دام الجدول أطول منها. لا يُرسم أصلًا حين `count` صفر.

```
┌──────────────────────────────────────────────────────────────┐
│ تم تحديد 2 من 48 عميلًا                [أفعال]  إلغاء التحديد │
└──────────────────────────────────────────────────────────────┘
```

* سطح مقلوب `--ds-table-selection-bg` ونصّ `--ds-table-selection-fg`، استدارة `--ds-table-selection-radius` (12)، هامش 12 من كل جهة، حشوة 8 × 16، وفجوة 16.
* العدّ 14/600 في طرف البداية؛ الأفعال (فتحة `[bar-actions]`) ثم «إلغاء التحديد» في طرف النهاية بفجوة 8.
* «إلغاء التحديد» زرّ بشكل رابط: 14 بخطّ تحته، حشوة 8، وتركيزه إطار `border-width-md` بلون النصّ وإزاحة 2px (الحلقة الافتراضية تختفي على الداكن).
* الفعل الهدّام داخله بـ`data-tone="danger"` يأخذ `--ds-table-selection-danger-fg`.
* ≤ 640px: العدّ سطرًا والأفعال سطرًا تحته بعرض كامل.
* المعدود بأربع صيغ عربية (`SelectionNoun`): 1 مفرد · 2 مثنّى · 3–10 جمع · 11 فأكثر مفرد منصوب — ويتبع **العدد الكلّي** حين يُعرف.

### المرقِّم — `<app-paginator>`

> وُثّق 2026-09-26 من الكود ([`paginator.component.ts`](../../../src/app/shared/ui/table/paginator.component.ts)). بديل `<mat-paginator>` بالشكل نفسه — **ليس على توكنز النظام بعد** (§15).

```
عدد العناصر: [10 ▾]      1 - 10 من 40      [«] [‹ السابق] [التالي ›] [»]
```

* سطر واحد يلتفّ، محاذاته `flex-end`، فجوته `1.5rem`، حشوة رأسية `0.5rem`، خط `0.875rem` بلون `#555`.
* القائمة `<select>` أصلية بحدّ `#ced4da` واستدارة `0.25rem`.
* أزرار التنقّل دوائر `2rem` بلا حدّ، تمريرها `rgba(0, 0, 0, 0.05)`، والمعطّل شفافية `0.35`. أيقوناتها `fa-light fa-angle-*` (Font Awesome)، مثبّتة لاتجاه RTL: «السابق» `angle-right` و«التالي» `angle-left`.
* زرّا الأولى والأخيرة يظهران بـ`[showFirstLastButtons]` وحده.
* يُخفى (`display: none` ويبقى مركّبًا) حين `length ≤ 5` وهو في الصفحة الأولى.

## 4. الأنواع والمقاسات

← الكثافة (`density`: `default` \| `compact`) والتخطيط المخطَّط (`zebra`) مدخلان في §7.

### فئات الخلايا

| الفئة | الأثر |
|---|---|
| `ds-table__numeric` | أرقام مصفوفة عموديًا + `direction: ltr` + محاذاة `end` |
| `ds-table__actions` | عمود ضيق في نهاية الصف، بلا التفاف |
| `ds-table__nowrap` | خليّة لا يلتفّ محتواها — تُوسّع عمودها بدل كسره سطرين |
| `ds-table__col-grow` | عمود واحد يبتلع الفراغ الزائد، فتلتصق بقيّة الأعمدة |
| `ds-table__col-equal` | عمودان أو أكثر يتقاسمون الفراغ **بالتساوي** |
| `ds-table__select` | عمود خانة الاختيار في طرف البداية: عرض `--ds-table-select-width` (60)، حشوة أفقية 12، بلا التفاف (وُثّق 2026-09-26 من الكود) |
| `ds-table__row--active` (على `<tr>`) | الصفّ المعروض الآن في لوحة التفاصيل: خطّ في بداية أوّل خليّة بعرض `--ds-table-active-bar-width` (4) ولون `--ds-color-border-brand` — غير `aria-selected` («مختار لفعل قادم») (وُثّق 2026-09-26 من الكود) |

**النصّ الطويل في خليّة:** سطران ثم «…» بـ`ds-page__clamp-2` (شاشات المدونة، `views/admin/blog/blog-page.scss`) ومعه `[appTooltip]` و`[appTooltipIfTruncated]="true"` فيظهر النصّ كاملًا عند المرور والتركيز إن قُصّ فقط. عرضه ثابت بطول سطره، والعمود المقصوص **لا يأخذ `col-grow`**: الفراغ لبقيّة الأعمدة. سطر اسم التصنيف والوسم `--ds-table-clamp-line-length` (60ch)، وسطر عنوان المقال `--ds-table-title-line-length` (281px، من Figma — قرار المنتج 2026-09-11).

(قيس 2026-09-26): `ds-page__clamp-2` في 11 شاشة. ثلاث منها — المقالات والاستطلاعات والدورات — تعيد ضبط `--ds-table-clamp-line-length` في ورقتها إلى `min(var(--ds-table-title-line-length), 50vw)`، والباقي على 60ch. والأداة نفسها معرَّفة مرّتين: `blog-page.scss` و`site-page.scss` (DEBT-015).

(قرار المنتج 2026-09-21 — [CLAUDE.md](../../../CLAUDE.md)):

**A text column in a crowded table is as wide as the article-title column** (product decision, 2026-09-21). Any table cell holding a name or a title the user has to read — product name, buyer name, coupon, file, article — wears `class="ds-page__clamp-2"` (defined in `src/app/views/admin/blog/blog-page.scss`): a **fixed line length** of `--ds-table-clamp-line-length`, two lines, then «…», with the full text kept in the DOM for the screen reader and shown in a tooltip (`appTooltipIfTruncated`). The width is fixed and not `max-content`, because a table with many numeric columns squeezes a flexible text column down to one word per line — exactly what makes a dense table unreadable. Do not replace it with a percentage width, `ds-table__col-equal` alone, or `nowrap`.

The one exception is a table inside a narrow container (a card that is half the page or less): there the fixed length is wider than its own card and pushes the numeric column out of the frame (measured 626px inside 306px on the dashboard). In that case, and only there, relax it **to a maximum** in the page's own stylesheet — never change the utility itself:

```scss
.stats-card ::ng-deep .ds-page__clamp-2 {
  inline-size: auto;
  max-inline-size: var(--ds-table-clamp-line-length);
}
```

**`col-grow` أم `col-equal`؟** بالمرتبة لا بالطول. عمودٌ واحد أهمّ من بقيّة الأعمدة مجتمعةً → `col-grow`. عمودان في مرتبة واحدة — الاسم والبريد في جدول المشرفين مثلًا — → `col-equal` على كليهما: تمديد أحدهما وحده يجعله ضِعف الآخر، والعين تقرأ فارق العرض كفارق أهمية لا كفارق محتوى.

### نسخ قيمة من الخليّة — `.ds-table__copyable`

> **القاعدة (متّفق عليها مع المنتج، وُثّقت 2026-09-14):** القيمة التي تُنسخ — بريد، رقم موبايل، مرجع تحويل — يجاورها **زرّ نسخ يظهر عند المرور على الصفّ**، في خليّتها نفسها: لا في ⋯ ولا في عمود الإجراءات.

```html
<td class="ds-table__nowrap">
  <span class="ds-table__copyable">
    <span dir="ltr">{{ row.transactionReference }}</span>
    <button type="button" class="ds-table__hover-action ds-table__copy-button"
            appTooltip="نسخ المرجع" [attr.aria-label]="'نسخ مرجع الطلب ' + row.id" (click)="copyReference(row)">
      <ds-icon name="design-tools/copy" size="sm" />
    </button>
  </span>
</td>
```

| الجزء | القاعدة | لماذا |
|---|---|---|
| المكان | بجوار القيمة في خليّتها | موضع الزرّ يقول ماذا يُنسخ؛ في ⋯ يحتاج فتح قائمة وقراءتها، وفي آخر الصفّ يبتعد عن قيمته |
| الظهور | `ds-table__hover-action`: بالمرور وبالتركيز، ودائمًا على اللمس | الصفّ الساكن نصّ لا شبكة أيقونات |
| الزرّ | `.ds-table__copy-button` — `design-tools/copy` عارية بهدف لمس كامل، واسمٌ يذكر الصفّ («نسخ مرجع الطلب 1042»، «نسخ بريد أحمد») وتلميحٌ بالفعل | أيقونة وحدها تحتاج اسمًا، و«نسخ» وحدها لا تقول أيّ صفّ |
| القيمة | نصٌّ يُحدَّد ويُقرأ، لا زرّ | قيمةٌ تُنسخ بنقرها لا شيء يقول ذلك قبل النقر |
| النتيجة | رسالة «تم نسخ …»، وعند الفشل «تعذر نسخ … انسخه من الجدول يدويًا.» | النسخ لا يُرى؛ بلا رسالة لا يعرف المستخدم أنه وقع |
| `dir="ltr"` | على نصّ القيمة اللاتينية لا على الخليّة | على الخليّة يقلب محاذاة البداية فينفصل العمود عن الصفّ |

**في الكود** (وُثّق 2026-09-26 من الكود): `.ds-table__copyable` سطرٌ مرن بفجوة 8. و`.ds-table__copy-button` مربّع 24×24 (`--ds-space-6`) بلا حدّ ولا خلفية، بلون `text-muted` واستدارة `radius-sm`؛ تمريره `surface-sunken` و`text-primary`، وتركيزه `--ds-focus-ring`. لا مساحة لمس ممتدّة حوله — انظر ⚠️ في §15.

**المستعملون:** البريد والموبايل في جداول المستخدمين (الطلاب، المدربون، المدراء، المشرفون، العملاء المحتملون)، ومرجع التحويل في سجل المسحوبات (2026-09-14)، ورقم الطلب والبريد والموبايل في الطلبات (2026-09-15).

### علامة محدودة في الخليّة — نجمة التمييز

> **القاعدة (قرار المنتج 2026-09-21):** ما يُعلَّم به عددٌ محدود من الصفوف — «مميزة» في قوائم المنتجات (ثلاث منتجات لا أكثر) — يُرسم **نجمةً في خليّتها**، لا مفتاحًا ولا مربّع اختيار.

**لماذا لا مفتاح؟** المفتاح يقول «إعداد مستقل لكل صفّ»، ولا يلمّح إلى ندرة. و«مميزة» ليست إعدادًا بل **علامة على عدد محدود**: من يرى ثلاثة مفاتيح مضاءة وسبعة مطفأة لا يعرف أن الرابع ممنوع حتى يضغطه. و«المفتاح يسري الآن والمربّع يسري عند الحفظ» ([`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md)) تحسم **المربّع أم المفتاح**، ولا تمنع علامةً ثالثة حين يكون المعنى علامةً لا إعدادًا.

```html
<td class="products-table__featured">
  <button
    type="button"
    class="products-star"
    [class.products-star--on]="row.featured"
    [disabled]="!canFeature(row)"
    [attr.aria-pressed]="row.featured"
    [attr.aria-label]="'تمييز ' + row.name"
    [appTooltip]="featuredTooltip(row)"
    (click)="toggleFeatured(row)">
    <ds-icon [name]="row.featured ? 'support-like-question/star-filled' : 'support-like-question/star'" size="md" />
  </button>
</td>
```

| الجزء | القاعدة | لماذا |
|---|---|---|
| الشكل | **ممتلئة** مميزة · **مفرغة** غير مميزة (`support-like-question/star-filled` ومقابلتها `star`) | الحالة في الشكل أولًا: تُقرأ بلا لون وعلى شاشة متباينة (WCAG 1.4.1) |
| اللون | الممتلئة `--ds-warning-500` · المفرغة `--ds-color-text-muted` | البرتقالي فوق الشكل لا بدلًا منه |
| بلوغ الحدّ | الصفوف الباقية **معطَّلة** بشفافية `--ds-opacity-disabled`، والتلميح يقول العدد وطريق الخروج: «تميز 3 دورات فقط. ألغ تمييز دورة أخرى أولا.» | المنع قبل الضغط أصدق من خطأ بعده (UX-13) |
| هدف اللمس | 44×44 من حجم الزرّ لا من حجم النجمة (20) | القاعدة نفسها في كل عنصر تفاعلي |
| الوصول | `aria-pressed` يعلن الحالة، و`aria-label` يذكر اسم الصفّ | أيقونة وحدها تحتاج اسمًا، و«تمييز» وحدها لا تقول أيّ صفّ |
| الحدّ | يأتي من الخادم لا يُكتب في الشاشة ([`BACKEND-REQUIREMENTS.md`](../../BACKEND-REQUIREMENTS.md) REQ-066) | الرقم `3` في الواجهة يتقادم في أوّل تغيير للباقات، والحدّ على المنتجات كلها لا على الدورات وحدها |

**أوّل متبنٍّ:** عمود «مميزة» في `/admin/products/courses` (2026-09-21). وبقية قوائم المنتجات تتبعه.

## 5. الحالات

### الحالات الأربع الإلزامية

| الحالة | ماذا يُعرض |
|---|---|
| تحميل | `<app-skeleton-group>` بصفوف تشبه شكل الجدول — لا دوّار في منتصف فراغ |
| **لا بيانات** | `<app-empty-state variant="empty">` + إجراء إنشاء |
| **لا نتائج** | `<app-empty-state variant="no-results">` + مسح الفلتر |
| خطأ | `<app-empty-state variant="error">` + إعادة محاولة |

**التفريق بين «لا بيانات» و«لا نتائج» إلزامي (§19).** عرض زر «إنشاء دورة» لمستخدم بحث عن كلمة غير موجودة يوحي له بأن أكاديميته فارغة بينما لديه 200 دورة.

**صفّ «لا نتائج» على الجوال** (2026-09-12): الحالة في خليةٍ واحدة `<td colspan>` بعرض الجدول كلّه، والجدول على الجوال أعرض من الشاشة — فكانت تتوسّط العرض الكامل ويخرج نصف وصفها عن الحافّة. `<app-table>` يتكفّل بها: الحاوية تعلن عرضها المرئي (`container-type: inline-size`)، و`td[colspan] > app-empty-state` بعرضه (`100cqi`) ولاصقةٌ ببدايته، فتبقى مكانها مهما مُرِّرت الأعمدة. لا شيء على الشاشة: ضع `<app-empty-state>` **ابنًا مباشرًا** للخلية.

**«لا بيانات» تُخفي الجدول وأدواته كاملةً؛ «لا نتائج» تُبقيهما** (قرار المنتج 2026-09-17، من صفحتَي الطلبات المكتملة وتفاصيل الكوبون). الفرق ليس في الرسالة وحدها:

* **لا بيانات** (لم يُستخدم الكوبون قط، لا طلبات للأكاديمية إطلاقًا) — بحثٌ أو فلتر فترة فوق صفر صفوف بلا معنى، فيُخفى `<app-table-toolbar>` (البحث والفترة) وأعمدة `<thead>` كلّها، ويُعرض `<app-empty-state variant="empty">` وحده في الصفحة، **خارج** `<app-table>`. لا شرط بحث ولا شرط فترة نشِط وقتها — كلاهما على قيمتيهما الافتراضيتين.
* **لا نتائج** (بحثٌ أو فترة ضيّقا نتيجة كانت ستظهر لولاهما) — الجدول وأداتاه **يبقيان ظاهرين**: هما سبب الخلوّ وطريق الخروج منه («إزالة البحث»، «عرض كل الفترة»)؛ الحالة تُرسم صفًّا واحدًا `<td colspan>` كالمعتاد.

الفحص عمليًّا (`isEmptyAcademy` في `orders.component.ts`، و`isEmptyCoupon` في `coupons-details.component.ts`):

```ts
get isEmptyCoupon(): boolean {
  return !this.isLoading && !this.hasActiveSearch && !this.hasActiveDateFilter && this.transactions.length === 0;
}
```

أي شاشة فيها جدول ثانوي بجوار بحث و/أو فلتر فترة تتّبع الفرق نفسه — لا تُخفَ الأداة عند «لا نتائج»، ولا تُبقَ الجدول فارغًا بأعمدته حين لا بيانات إطلاقًا.

> لا توجد دورات بعد
> أنشئ أول دورة وابدأ في بيعها لطلابك.

> لا توجد دورات مطابقة لبحثك
> لا نتائج لـ «التسويق». جرب كلمة بحث أقصر أو تأكد من كتابة الكلمة بشكل صحيح.

### حالات الصفّ والأدوات كما يرسمها الكود

> وُثّق 2026-09-26 من الكود ([`table.component.ts`](../../../src/app/shared/ui/table/table.component.ts)).

| الحالة | الشكل |
|---|---|
| تمرير على الصفّ | خلاياه `surface-hover`، وتظهر `.ds-table__hover-action` فيه (شفافية 0 ← 1 في `--ds-duration-fast` بـ`--ds-easing-standard`، بلا حركة مع `prefers-reduced-motion`) |
| تركيز داخل الصفّ | كالتمرير: `:focus-within` يُظهر أفعاله؛ والزرّ نفسه يظهر بـ`:focus-visible` |
| قائمة ⋯ مفتوحة | الزرّ الذي فتحها يبقى ظاهرًا (`aria-expanded="true"`) ولو خرج المؤشّر من الصفّ |
| لمس (`hover: none`) | أفعال التمرير ظاهرة دائمًا |
| مختار (`aria-selected="true"`) | خلاياه `surface-selected` |
| معروض في لوحة التفاصيل (`ds-table__row--active`) | خطّ `--ds-color-border-brand` بعرض 4 في بدايته |
| تركيز منطقة التمرير | `--ds-focus-ring` |
| زرّ النسخ / المقبض: تمرير | `surface-sunken` و`text-primary` |
| زرّ النسخ / المقبض: تركيز | `--ds-focus-ring` |
| المقبض: ضغط | مؤشّر `grabbing` |
| أثناء السحب | الصفّ فراغٌ `surface-sunken` بإطار `outline` `border-width-sm` بـ`border-strong` ومحتوى مخفي؛ وبالسهمين `surface-sunken` وحده (§8) |
| جدول أعرض من حاويته، والصفّ ممرور أو فيه التركيز أو قائمته مفتوحة (`hover: hover`) | خليّة `ds-table__actions` تلتصق بحافّة النهاية بـ`--ds-z-raised`؛ وبلا مرور تأخذ سطح `surface-raised` |
| المرقِّم: زرّ معطّل | شفافية `0.35` ومؤشّر `not-allowed` (قيمة خام — §15) |

## 6. التوكنز

القيم من [`tokens.css`](../../tokens/tokens.css) § الجدول.

| العنصر | التوكن | القيمة |
|---|---|---|
| صف الإجمالي — الخلفية | `--ds-table-total-bg` | `var(--ds-color-surface-selected)` |
| صف الإجمالي — النص | `--ds-table-total-fg` | `var(--ds-color-text-brand)` |
| صف الإجمالي — الحدّ | `--ds-table-total-border` | `var(--ds-brand-200)` |
| صف الإجمالي — الارتفاع (احتياط قبل القياس) | `--ds-table-total-height` | `44px` |
| إزاحة الرؤوس تحت صف الإجمالي | `--ds-table-total-offset` | يضعه `<app-table>` بالقياس (§3) — ليس في `tokens.css` |
| الرأس | `--ds-table-header-height` | `40px` |
| حشوة الخليّة رأسيًّا | `--ds-table-cell-padding-block` | `var(--ds-space-4)` |
| حشوة الخليّة أفقيًّا | `--ds-table-cell-padding-inline` | `var(--ds-space-4)` |
| عمود الاختيار | `--ds-table-select-width` | `60px` |
| عنوان القسم — الخلفية | `--ds-table-group-bg` | `var(--ds-color-surface-default)` |
| عنوان القسم — اسم القسم | `--ds-table-group-fg` | `var(--ds-color-text-primary)` |
| عنوان القسم — الخطّ | `--ds-table-group-accent` | `var(--ds-brand-600)` |
| عنوان القسم — عرض الخطّ | `--ds-table-group-accent-width` | `4px` |
| عنوان القسم — الارتفاع | `--ds-table-group-height` | `40px` |
| خطّ الصفّ المفتوح في لوحة التفاصيل (`.ds-table__row--active`) | `--ds-table-active-bar-width` | `4px` |
| شريط التحديد — السطح | `--ds-table-selection-bg` | `var(--ds-color-surface-inverse)` |
| شريط التحديد — النص | `--ds-table-selection-fg` | `var(--ds-color-text-inverse)` |
| شريط التحديد — الفعل الهدّام | `--ds-table-selection-danger-fg` | `var(--ds-danger-400)` |
| شريط التحديد — الاستدارة | `--ds-table-selection-radius` | `var(--ds-radius-lg)` |
| شريط الأدوات — الخلفية | `--ds-table-toolbar-bg` | `var(--ds-color-surface-page)` |
| شريط الأدوات — الحدّ | `--ds-table-toolbar-border` | `var(--ds-color-divider)` |
| شريط الأدوات — بين أزرار الأفعال | `--ds-table-toolbar-gap-actions` | `var(--ds-space-2)` |
| شريط الأدوات — بين البحث والفلتر | `--ds-table-toolbar-gap-fields` | `var(--ds-space-3)` |
| شريط الأدوات — بين طرفيه | `--ds-table-toolbar-gap-sides` | `var(--ds-space-4)` |
| شريط الأدوات — حقل البحث | `--ds-table-toolbar-search-width` | `320px` |
| الشارة في خليّة الحالة (حدّ أدنى) | `--ds-table-badge-min-width` | `64px` |
| قصّ الاسم | `--ds-table-truncate-max-width` | `256px` |
| سطر اسم التصنيف والوسم (`ds-page__clamp-2`) | `--ds-table-clamp-line-length` | `60ch` |
| سطر عنوان المقال | `--ds-table-title-line-length` | `281px` |
| شريط النسبة — المسار | `--ds-table-bar-track` | `var(--ds-neutral-100)` |
| شريط النسبة — التعبئة | `--ds-table-bar-fill` | `var(--ds-color-brand-solid)` |
| شريط النسبة — الارتفاع | `--ds-table-bar-height` | `6px` |
| شريط النسبة — الاستدارة | `--ds-table-bar-radius` | `var(--ds-radius-pill)` |
| نجمة التمييز — ممتلئة | `--ds-warning-500` | `#D57842` |
| نجمة التمييز — مفرغة | `--ds-color-text-muted` | `var(--ds-neutral-700)` |
| نجمة التمييز — معطّلة | `--ds-opacity-disabled` | `0.5` |

## 7. الواجهة البرمجية

| المُدخل | القيم | ملاحظة |
|---|---|---|
| `caption` | `string` | **إلزامي** — اسم منطقة التمرير لقارئ الشاشة |
| `stickyHeader` | `boolean` | رأس ثابت للجداول الطويلة |
| `density` | `default` \| `compact` | |
| `zebra` | `boolean` | للجداول العريضة فقط |

و`[hasTotalRow]` — §3 «صف الإجمالي». ومدخلات `tr[appTableGroup]` و`<app-table-bar>` و`<app-table-range>` في أقسامها في §3.

### الواجهة كاملةً من الكود

> وُثّق 2026-09-26 من الكود — كل ما يلي موجود في [`shared/ui/table/`](../../../src/app/shared/ui/table/).

**`<app-table>`**

| الاسم | النوع | الافتراضي | |
|---|---|---|---|
| `caption` | `string` | — (**إلزامي**) | `aria-label` لمنطقة التمرير |
| `stickyHeader` | `boolean` | `false` | |
| `density` | `'default' \| 'compact'` | `'default'` | |
| `zebra` | `boolean` | `false` | |
| `hasTotalRow` | `boolean` | `false` | |
| `bordered` | `boolean` | `true` | يلفّ الجدول ببطاقة (سطح وحدّ واستدارة 12). `false` حين تكون قشرة الصفحة سطحًا أبيض واحدًا — لا بطاقة داخل بطاقة |
| فتحة `[table-toolbar]` | محتوى | — | فوق الرأس داخل القشرة: `<app-table-toolbar>` وما يرافقه |
| فتحة `[table-selection]` | محتوى | — | أسفل الصفوف لاصقًا: `<app-table-selection-bar>` |

**`tr[appTableTotal]`** — بلا مدخلات؛ يضيف الصنف `ds-table__total`.

**`tr[appTableGroup]`**

| الاسم | النوع | الافتراضي | |
|---|---|---|---|
| `label` | `string` | — (**إلزامي**) | اسم القسم |
| `count` | `number` | — (**إلزامي**) | عدد صفوفه؛ 0 ولا يُحذف |
| `countLabel` | `string \| null` | `null` | العدد بمعدوده |
| `total` | `string \| null` | `null` | مجموع القسم كما يُعرض |
| `colspan` | `number` | — (**إلزامي**) | بعد إسقاط عمود التجميع |
| `expanded` | `boolean` | `true` | ثنائي الاتجاه مع `expandedChange` |
| `controls` | `string \| null` | `null` | لـ`aria-controls` |
| `(expandedChange)` | `boolean` | مخرج | عند الطيّ والفتح |

**`<app-table-bar>`** — `percent: number` (**إلزامي**).
**`<app-table-range>`** — `from: string | null` (`null`) · `to: string | null` (`null`) · `openLabel: string` (`'بلا نهاية'`).
**`<app-table-toolbar>`** — بلا مدخلات؛ فتحتان: `[toolbar-filters]` و`[toolbar-actions]`.

**`<app-table-selection-bar>`**

| الاسم | النوع | الافتراضي | |
|---|---|---|---|
| `count` | `number` | `0` (**إلزامي**) | صفر = لا شريط في DOM |
| `totalCount` | `number \| null` | `null` | المجموع المطابق؛ `null` يذكر العدد وحده |
| `itemNoun` | `SelectionNoun` | — (**إلزامي**) | `{ singular, dual, plural, accusative }` |
| `label` | `string \| null` | `null` | نصّ جاهز يغلب الصيغة |
| `(cleared)` | `void` | مخرج | «إلغاء التحديد» |
| فتحة `[bar-actions]` | محتوى | — | أفعال الاختيار |

**`<app-paginator>`**

| الاسم | النوع | الافتراضي | |
|---|---|---|---|
| `length` | `number` | `0` | |
| `pageSize` | `number` | `10` | |
| `pageIndex` | `number` | `0` | |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | |
| `showFirstLastButtons` | `boolean` | `false` | |
| `ariaLabel` | `string` | `'الصفحات'` | اسم المجموعة `role="group"` |
| `(page)` | `PageEvent` | مخرج | `{ pageIndex, pageSize, length, previousPageIndex? }` — شكل `PageEvent` في Material |

**الفرز:** `[appSort]` (`exportAs: 'appSort'`) ومخرجه `(appSortChange)` بـ`SortState` = `{ active: string; direction: 'asc' | 'desc' | '' }`. و`[appSortHeader]` على `<th>` ومدخله المعرّف نفسه (`appSortHeader="…"`، افتراضيًّا فارغ). كل ضغطة تدور: تصاعدي ← تنازلي ← بلا فرز.

**`TableDataSource<T>`** — بديل `MatTableDataSource` بالشكل نفسه: `data` · `filter` · `filteredData` · `paginator` · `sort` · `connect()` · `disconnect()`، و`filterPredicate` الافتراضي بحثٌ في نصّ الصفّ كلّه بأحرف صغيرة.

## 8. السلوك ولوحة المفاتيح

### الفرز والفلترة والترقيم

* **الفرز** — عبر [`sort.directive.ts`](../../../src/app/shared/ui/table/sort.directive.ts) القائم. رأس العمود القابل للفرز زر، وحالة الفرز معلنة بـ `aria-sort`.
  * **الواجهة البرمجية (وُثّقت 2026-09-26 من الكود):** `[appSort]` على `<table>` أو أيّ أصل للخلايا — بديل `matSort`، ويُطلق `(appSortChange)` بـ`SortState`. و`[appSortHeader]` على `<th>` — بديل `mat-sort-header`، بلا معرّف عمود في كل استعمالات اللوحة (10 شاشات)، فالضغط يبدّل حالة فرز واحدة مشتركة لا فرزًا بحسب العمود؛ حُفظ هذا السلوك كما كان ولم «يُصلَح». الاتجاه في `aria-sort` وحده.
  * ⚠️ **لا سهم ظاهر لاتجاه الفرز** — الحالة تصل قارئ الشاشة ولا تُرى. يحتاج قرار تصميم (أيقونة من `src/icons` بجوار عنوان العمود).
  * **ما يفعله الكود فعلًا** (وُثّق 2026-09-26 من الكود): `[appSortHeader]` يضيف إلى `<th>` مستمع نقر والصنف `app-sort-header` (مؤشّر يد وبلا تحديد نصّ — `src/styles.scss`)، ولا يجعله زرًّا: لا `role` ولا `tabindex` ولا مفتاح. و`aria-sort` يُكتب حين يكون للعمود معرّف وحده، والشاشات العشر بلا معرّف (قيس 2026-09-26) — فلا `aria-sort` في أيٍّ منها. والشاشات العشر كلها جداول `tw-` موروثة، لا `<app-table>`. انظر ⚠️ في §15.
* **الفلترة** — النمط المعتمد في [`filtering.md`](../patterns/filtering.md): مفتاح حالة فوق الجدول، وزرّ «فلترة» في الشريط يفتح لوحة بعمودين، والمطبَّق رقائق عبر [`<app-filter-bar>`](../../../src/app/shared/ui/filter-bar/) — مرئية دائمًا.
* **الترقيم** — عبر [`<app-paginator>`](../../../src/app/shared/ui/table/paginator.component.ts) القائم. **يظهر فقط حين يزيد عدد الصفوف عن 5** (قرار 2026-09-11). القاعدة داخل المكوّن، فلا تكتب الشاشة شرط `> 5` بنفسها. يبقى مركّبًا ويُخفى، فلا يعود رقم الصفحة إلى الأولى، ولا يُخفى خارج الصفحة الأولى. والشاشة تخفيه بنفسها في التحميل والخطأ فقط.
  * **في الكود** (وُثّق 2026-09-26 من الكود): تغيير حجم الصفحة يُبقي أوّل صفّ معروض في الصفحة الجديدة (`pageIndex = floor(start / size)`)، والانتقال خارج المدى يُقصّ ولا يُطلق حدثًا. والمدى «1 - 10 من 40»، و«0 من 0» بلا صفوف. المستعملون: 46 ملفًّا (قيس 2026-09-26).

### الإجراءات الجماعية

عند وجود اختيار متعدد:

* خانة اختيار في رأس العمود بحالة `indeterminate` عند الاختيار الجزئي.
* شريط إجراءات يظهر عند وجود اختيار، ويعرض **العدد المختار** صراحةً.
* الإجراء المدمّر الجماعي يمر بحوار تأكيد يذكر العدد: «حذف 12 دورة؟».
* **نطاق «تحديد الكل»** يتبع مصدر الصفوف: حين يرقّم **الخادم** (المقالات) تحدّد خانة الرأس الصفحة المعروضة وحدها ([REQ-003](../../BACKEND-REQUIREMENTS.md)). وحين تكون القائمة كلها **محمّلة** والترقيم في الواجهة (التصنيفات والوسوم، 2026-09-12) تحدّد كل الصفوف المطابقة للبحث عبر الصفحات. في الحالتين يذكر الشريط المجموع «3 من 48» فلا يلتبس النطاق، والبحث يُسقط التحديد — لا يقع فعلٌ على ما لم يعد ظاهرًا.
* ما لم يقع عليه الفعل (رفضه الخادم) **يبقى محدَّدًا** بعده، والرسالة تقول كم نجح وكم تعذّر ولماذا — فيرى المستخدم أيّ الصفوف بقي.

### إعادة الترتيب بالسحب

> **الحالة: مطبَّق** — 2026-09-10. المستهلكون: المقالات والتصنيفات والوسوم في `/admin/blog`.

للجدول الذي يرتّب المستخدم صفوفه بنفسه (ترتيب الظهور للزوار). السلوك من [`sortable.md`](../molecules/sortable.md) — بلا مكتبة (كان `@angular/cdk/drag-drop` حتى 2026-09-10) — والشكل من `<app-table>`، لا نسخة في كل شاشة.

```html
<tbody dsSortableList [sortableDisabled]="loading" (sortableDrop)="drop($event)">
  @for (row of rows; track row.id) {
    <tr [dsSortableItem]="row" [sortableLabel]="row.name">
      <td class="ds-table__drag">
        <button type="button" dsSortableHandle class="ds-table__drag-handle ds-table__hover-action"
                [attr.aria-label]="'إعادة ترتيب ' + row.name" appTooltip="اسحب لإعادة الترتيب">
          <ds-icon name="essential/grip-horizontal" size="sm" />
        </button>
      </td>
      …
    </tr>
  }
</tbody>
```

| الجزء | القاعدة | لماذا |
|---|---|---|
| `th/td.ds-table__drag` | أول عمود، بعرض هدف اللمس، ورأسه نصّ مخفي «إعادة الترتيب» | `<th>` فارغ يُقرأ عمودًا بلا اسم |
| `.ds-table__drag-handle` | `<button>` حقيقي باسم، وأيقونته `essential/grip-horizontal` | `<span>` لا يصله التركيز، وسحب بلا مقبض يلتقط كل نقرة في الصفّ |
| `ds-table__hover-action` على المقبض | يظهر بالتمرير وبالتركيز، ودائمًا على اللمس — كزرّ ⋯ في طرف الصفّ | الصفّ الساكن نصّ لا شبكة أيقونات (قرار 2026-09-10) |
| ما يتبع المؤشّر | نسخة الصفّ نفسه مرفوعة مائلة بشارة موضعها — بلا `*dsSortablePreview`. سطحها عالمي في `src/styles.scss` (`.ds-sortable-preview`) | النسخة تُلحق بـ `body`، خارج المكوّن؛ والصفّ كاملًا أوضح من بطاقة باسمه (قرار 2026-09-10) |
| الفراغ | الصفّ نفسه بصنف `ds-sortable-item--placeholder`، رماديّ لا بلون العلامة — تنسيقه في `<app-table>` | لا `<tr>` ثانٍ يُدرج في `<tbody>`، والصفّ يحفظ ارتفاعه فلا يقفز الجدول |
| `[sortableDisabled]` | أثناء التحميل | لا سحب فوق هيكل عظمي |

**المقاسات في الكود** (وُثّق 2026-09-26 من الكود): الخليّة `ds-table__drag` بعرض `--ds-touch-target-min` (44) وحشوة أفقية 8 وتوسيط؛ والمقبض 32×32 (`--ds-space-8`) باستدارة `--ds-radius-control` (12) ولون `text-muted` ومؤشّر `grab`.

**فشل الحفظ يعيد الترتيب السابق** — ترتيب معروض لم يُحفظ يَعِد بما لم يقع. والإفلات في الموضع نفسه لا يرسل طلبًا.

**لوحة المفاتيح:** ↑ / ↓ على المقبض تنقل الصفّ خطوة ويُعلن موضعه، ويُحفظ بعد توقّف ثانية — [`sortable.md`](../molecules/sortable.md) (أغلق [`DEBT-012`](../../TECHNICAL-DEBT.md)).

### إجراءات الصفّ بالتمرير

> **القاعدة (قرار المنتج 2026-09-11):** كل جدول فيه «تعديل» يُظهر زرّ **«تعديل»** عند المرور على الصفّ **بجانب ⋯**، ويبقى «تعديل» في ⋯ أيضًا. وما يتكرّر استعماله غيره (معاينة المقال) يجاوره بالطريقة نفسها. أوّل تطبيق: جدول المقالات.

```html
<td class="ds-table__actions">
  <div class="ds-table__row-actions">
    <button dsButton type="button" variant="tertiary" size="sm" [iconOnly]="true" class="ds-table__hover-action"
            [attr.aria-label]="'تعديل ' + row.name" appTooltip="تعديل" (click)="edit(row)">
      <ds-icon button-icon name="content-edit/edit" size="sm" />
    </button>
    <button dsButton … class="ds-table__hover-action" [appMenuTriggerFor]="menu" [attr.aria-label]="'إجراءات ' + row.name">
      <ds-icon button-icon name="settings/3-dots-more" size="sm" />
    </button>
  </div>
  <app-menu #menu="appMenu">
    <button type="button" appMenuItem (click)="edit(row)">تعديل</button>
    …
    <button type="button" appMenuItem danger (click)="remove(row)">حذف</button>
  </app-menu>
</td>
```

| الجزء | القاعدة | لماذا |
|---|---|---|
| `.ds-table__row-actions` | الأزرار متجاورة بفجوة 4px، و⋯ آخرها عند حافّة الصفّ | فجوة من المسافة بين الوسوم ليست توكنًا |
| الأزرار الظاهرة | `ds-table__hover-action` كـ⋯: بالتمرير وبالتركيز، ودائمًا على اللمس. أيقونة وحدها باسمٍ يذكر الصفّ («تعديل كيف تبني…») وتلميح بالفعل | الصفّ الساكن نصّ لا شبكة أيقونات |
| ترتيبها | «تعديل» أوّلًا، ثم ما يجاوره، ثم ⋯ | الأكثر استعمالًا أقرب إلى العين |
| ترتيب ⋯ | تعديل · ما يُعرض (معاينة) · تغيير الحالة (نشر) · المشاركة (نسخ الرابط) · **حذف آخرًا** بـ`danger`: أحمر وخطّ فوقه — [`menu.md`](../molecules/menu.md) | الهدّام بعيدًا عمّا يُضغط كثيرًا |
| الأيقونات | `content-edit/edit` للتعديل، `security/eye` للمعاينة — كجداول المستخدمين | شكل واحد لكل معنى |
| جدول يُمرَّر أفقيًّا | خلية `ds-table__actions` **تلتصق بحافّة النهاية** ما دام الصفّ ممرورًا عليه أو فيه التركيز أو قائمته مفتوحة، فتظهر الأزرار فورًا بلا سحب إلى آخر الجدول. تلقائيّ من `app-table` — لا شيء يُضاف في الشاشة. على اللمس تبقى مكانها | الإجراء عند الصفّ الذي تنظر إليه، لا في آخر الجدول (طلب 2026-09-12) |

> **لماذا بالمرور لا دائمًا:** عمود ملتصق دائمًا يغطّي آخر الجزء المرئي من كل صفّ، وأزراره مخفية في الصفوف الساكنة — فيحجب البيانات بفراغ. والالتصاق لا يغيّر التخطيط، فلا يقفز الصفّ لحظة المرور.

#### فعلٌ واحد بلا ⋯ — سجل المسحوبات (2026-09-14)

جدول لا «تعديل» فيه وفعله المتكرّر واحد: **«تنزيل الإيصال»** زرّ أيقونة بالتمرير في `ds-table__actions` — `arrow/import-arrow-01`، أيقونة «تصدير كملف إكسل» نفسها، فالتنزيل شكلٌ واحد — ولطلب مكتمل وحده. و**لا ⋯**: كل ما كان فيها («تنزيل الإيصال»، «نسخ المرجع») ظاهرٌ بالتمرير، وقائمةٌ تكرّر ما حولها بلا جديد نقرةٌ زائدة.

## 9. الاستجابة

### الاستجابة (RESPONSIVE-04)

السلوك الافتراضي **تمرير أفقي داخل الحاوية وحدها** — الصفحة نفسها لا تُمرَّر أفقيًا أبدًا.

خيارات أخرى حسب طبيعة البيانات:

* **أولوية الأعمدة** — إخفاء الأعمدة الثانوية على الشاشات الضيقة.
* **عرض بديل** — تحويل كل صف إلى بطاقة على الجوال. مناسب للجداول قليلة الأعمدة كثيرة القراءة.

← قابلية منطقة التمرير للتركيز في §11. وصفّ «لا نتائج» على الجوال في §5.

## 10. RTL

لا شيء خاص: الجدول يتبع `dir` الصفحة، والمحاذاة `start`، والحدود منطقية.

**الاستثناء الوحيد** الأرقام والمبالغ والتواريخ: تبقى LTR داخل الخلية عبر `ds-table__numeric`، وإلا انعكس ترتيب الخانات وصار ٣٥٠ يُقرأ ٠٥٣.

### الأرقام العربية-الهندية

`font-variant-numeric: tabular-nums` **لا ينطبق** على ٠١٢٣، فمنازل عمود المبالغ لا تصطف بها. الأعمدة الرقمية تُصيَّر بأرقام لاتينية؛ النص العربي حولها يبقى عربيًا.

والعدّادات: كل عدّاد في **عقدة مستقلّة**. «3 معلّقة · 1 مرفوضة» في نص واحد — «·» محايد اتجاهيًا فيلتقط اتجاه ما حوله وتُعرض «مرفوضة 1».

## 11. إمكانية الوصول

منطقة التمرير قابلة للتركيز (`tabindex="0"`) لأن منطقة تمرير غير قابلة للتركيز تخالف WCAG 2.1.1: من يستخدم لوحة المفاتيح فقط لن يصل إلى المحتوى المخفي.

وفي الأقسام الأخرى:

* البنية الدلالية التي يعتمدها قارئ الشاشة، و`caption` اسمًا لمنطقة التمرير — §3 و§7.
* رأس العمود القابل للفرز زرّ بـ `aria-sort` — §8.
* `<th scope="colgroup">` لعنوان القسم — §3.
* شريط النسبة `aria-hidden` والرقم معه دائمًا (WCAG 1.4.1) — §3.
* مقبض الترتيب `<button>` باسم، والترتيب بلوحة المفاتيح — §8.
* زرّ النسخ ونجمة التمييز باسمٍ يذكر الصفّ، و`aria-pressed` للنجمة — §4.

## 12. النصوص

← نصّا «لا بيانات» و«لا نتائج» في §5. رسالتا النسخ «تم نسخ …» و«تعذر نسخ …» وتلميح بلوغ حدّ التمييز في §4. حوار الحذف الجماعي «حذف 12 دورة؟» في §8.

## 13. مثال

```html
<app-table caption="قائمة الدورات" [stickyHeader]="true">
  <table>
    <thead>
      <tr>
        <th scope="col">اسم الدورة</th>
        <th scope="col">الحالة</th>
        <th scope="col" class="ds-table__numeric">السعر</th>
        <th scope="col" class="ds-table__actions">الإجراءات</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>أساسيات التسويق الرقمي</td>
        <td><app-status status="published" /></td>
        <td class="ds-table__numeric">٣٥٠ ر.س</td>
        <td class="ds-table__actions">…</td>
      </tr>
    </tbody>
  </table>
</app-table>
```

## 14. ممنوع

* ❌ `class="table table-striped"` أو `table-responsive`.
* ❌ مقبض سحب `<span>`، أو صفّ كامل يُسحب بلا مقبض.
* ❌ جدول مبني من `div` بدل عناصر الجدول الدلالية.
* ❌ `<th>` بلا `scope`.
* ❌ تمرير أفقي على مستوى الصفحة.
* ❌ دمج «لا بيانات» مع «لا نتائج».
* ❌ صف إجمالي أسفل الجدول.
* ❌ شريط نسبة بلا رقم بجانبه.
* ❌ `[appTableTotal]` مع `[stickyHeader]` بلا `[hasTotalRow]`.

## 15. الدَّين القائم

* `<app-paginator>` — «⏳ يحتاج ترقية» في جدول المكوّنات في [`README.md`](../../README.md). (وُثّق 2026-09-26 من الكود) ما يحتاجها: ورقته [`paginator.component.scss`](../../../src/app/shared/ui/table/paginator.component.scss) قيم خام لا توكنز (`#555` · `#333` · `#ced4da` · `#fff` · `rgba(0, 0, 0, 0.05)` · `1.5rem` · `0.875rem` · `0.35`)، وخصائص فيزيائية (`width`/`height`)، وأيقونات Font Awesome (`fa-light fa-angle-*`) مثبّتة لاتجاه RTL فلا تنعكس في LTR — §3 «المرقِّم».
* [`DEBT-015`](../../TECHNICAL-DEBT.md) — ثلاث نسخ من أدوات `.ds-page*`، والرابعة على الطريق (منها `.ds-page__clamp-2` المستعملة للنصّ الطويل في §4).
* [`DEBT-012`](../../TECHNICAL-DEBT.md) — منجز 2026-09-10 (§8 «إعادة الترتيب بالسحب»).
* صُحّح 2026-09-26: كانت المواصفة تقول إن صفّ الملخّص في سجل المسحوبات خليّةٌ بعرض الصفّ داخل الجدول (2026-09-14)، والكود منذ 2026-09-17 سطرٌ في منطقة الأدوات `[table-toolbar]` فوق الجدول والمخطط — §3.
* صُحّح 2026-09-26: كان §1 يقول «367 استخدامًا» لـ`class="table"` و`table-responsive`، والباقي اليوم 23 و63 — §1.
* صُحّح 2026-09-26: كانت المواصفة تذكر سجل المسحوبات مستهلكًا لـ`tr[appTableGroup]`، ولا مستهلك له اليوم (الجدول مسطّح منذ 2026-09-17) — §3.
* ⚠️ تعارض (2026-09-26): المواصفة «رأس العمود القابل للفرز زر، وحالة الفرز معلنة بـ`aria-sort`» (§8 · §11) · الكود `<th appSortHeader>` بمستمع نقر وحده — لا يصله التركيز ولا يُفعَّل بلوحة المفاتيح، و`aria-sort` لا يُكتب لأن الشاشات العشر بلا معرّف عمود.
* ⚠️ تعارض (2026-09-26): المواصفة «`.ds-table__copy-button` — `design-tools/copy` عارية بهدف لمس كامل» (§4) · الكود مربّع 24×24 (`--ds-space-6`) بلا مساحة لمس ممتدّة، دون `--ds-touch-target-min` (44). وكذلك مقبض السحب 32×32 داخل خليّة بعرض 44.
* ⚠️ تعارض (2026-09-26): قاعدة الأيقونات «`src/icons/` أولًا» ([`iconography.md`](../foundations/iconography.md)) · الكود يرسم سهم عنوان القسم (`fa-light fa-angle-down`) وأسهم المرقِّم (`fa-light fa-angle-*`) بـFont Awesome لا بـ`<ds-icon>`.

## 16. روابط

- **يستخدم:** [`badge-status.md`](../atoms/badge-status.md) (`<app-status>`) · [`states.md`](../patterns/states.md) (`<app-empty-state>` · `<app-skeleton-group>`) · [`sortable.md`](../molecules/sortable.md) · [`menu.md`](../molecules/menu.md) · [`tooltip.md`](../atoms/tooltip.md) · [`button.md`](../atoms/button.md) · [`icon.md`](../atoms/icon.md)
- **يُستخدم في:** `/admin/blog` (المقالات والتصنيفات والوسوم) · `/admin/finance/history` (سجل المسحوبات) · الطلبات · تفاصيل الكوبون · جداول المستخدمين · `/admin/products/courses` · `/admin/dashboard` (`<app-table-bar>` في «نظرة عامة») — و`<app-table>` في 33 ملفًّا إجمالًا (قيس 2026-09-26)
- **ذو صلة:** [`table-columns.md`](./table-columns.md) · [`filtering.md`](../patterns/filtering.md) · [`checkbox-radio-switch.md`](../atoms/checkbox-radio-switch.md) · [`distribution-bar.md`](../molecules/distribution-bar.md)
- **الكود:** [`src/app/shared/ui/table/`](../../../src/app/shared/ui/table/)
- **الأصل:** `Design-System/components/table.md` — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
