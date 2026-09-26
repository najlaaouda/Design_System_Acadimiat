---
title: الترتيب بالسحب
name: sortable
tier: molecule
group: data-display
status: implemented
selector: ['[dsSortableList]', '[dsSortableItem]', '[dsSortableHandle]', '*dsSortablePreview']
source: ['src/app/shared/ui/sortable']
origin: ['Design-System/components/sortable.md']
keywords: ['ترتيب', 'سحب', 'إفلات', 'إعادة الترتيب', 'sortable', 'drag and drop', 'reorder', 'dsSortableList', 'dsSortableHandle']
last_verified: 2026-09-10
---

# الترتيب بالسحب — `dsSortableList` · `dsSortableItem` · `dsSortableHandle`

> قائمة يرتّب المستخدم عناصرها بنفسه — ترتيب ظهورها للزوار أو للطالب. **بلا مكتبة**: بديل `@angular/cdk/drag-drop` بقرار المنتج ([`CLAUDE.md`](../../../CLAUDE.md) § Styling، 2026-09-10).

## 1. متى تستخدمه

* **نعم:** ترتيب يحفظه الخادم ويراه غير المستخدم — المقالات والتصنيفات، دروس الدورة، أقسام الصفحة.

## 2. متى لا تستخدمه

* **لا:** ترتيب عرض مؤقّت (الأحدث/الأقدم) — ذلك زرّ ترتيب في شريط الجدول ([`filtering.md`](../patterns/filtering.md)).
* **لا:** نقل بين حالات (سير عمل) — ذلك إجراء بقائمة ⋯ أو حقل.

## 3. التشريح

الأصناف للمستهلك: `ds-sortable-list--sorting` · `ds-sortable-item--placeholder` · `ds-sortable-item--keyboard` · `ds-sortable-item--landed` · `ds-sortable-preview` · `ds-sortable-preview__badge`.

← الأجزاء بتوجيهاتها (`dsSortableList` · `[dsSortableItem]` · `dsSortableHandle` · `*dsSortablePreview`) في §7، وشكل كلٍّ منها في §6.

## 4. الأنواع والمقاسات

**ما يدعمه:** ترتيب **عمودي** داخل قائمة واحدة — كل ما يستعمله المنتج (جرد 2026-09-10: 37 شاشة، لا أفقي ولا سحب حر). النقل بين قائمتين (تمرين «التوصيل» للطالب) يُضاف مع نقل تلك الشاشة.

## 5. الحالات

← حالات العنصر أثناء الترتيب — الفراغ (`ds-sortable-item--placeholder`)، النقل بالسهمين (`ds-sortable-item--keyboard`)، الوميض بعد الإفلات (`ds-sortable-item--landed`) — سلوكها في §8 وشكلها في §6. والتعطيل `[sortableDisabled]` على القائمة وعلى العنصر في §7.

## 6. التوكنز

| الموضع | القيمة |
|---|---|
| **اللون** | **رماديّ كله، لا بلون العلامة** (قرار 2026-09-10): الفراغ مكانٌ لا اختيار، والبنفسجي يبقى للإجراء الأساسي |
| حركة الإزاحة | `--ds-duration-normal` · `--ds-easing-standard` — ويصفّرها `prefers-reduced-motion` من التوكن نفسه |
| الرفع والاستقرار | Web Animations في المكوّن: رفع 140ms (= `--ds-duration-fast`)، واستقرار 460ms بارتداد `cubic-bezier(0.34, 1.56, 0.64, 1)` — لا توكن للارتداد. تُتخطّى يدويًّا مع `prefers-reduced-motion`، والميلان يبقى لأنه شكل لا حركة |
| طبقة النسخة المرفوعة | `--ds-z-popover` — فوق الحوار، فالترتيب داخل حوار يعمل |
| سطحها | `--ds-color-surface-raised` · حدّ `--ds-color-border-subtle` · `--ds-elevation-4` · `--ds-radius-md` — عالمي في `src/styles.scss` (`.ds-sortable-preview`) لأنها في `body` |
| شارة الموضع | `--ds-color-surface-inverse` / `--ds-color-text-inverse` · `--ds-radius-pill` · `--ds-font-size-xs`، في طرف النهاية فوق زرّ ⋯ |
| الفراغ | خلفية `--ds-color-surface-sunken` وإطار `--ds-border-width-sm` بـ `--ds-color-border-strong`، والمحتوى مخفيّ. **outline لا border**: حدّ يغيّر ارتفاع الصفّ لحظة البدء فيقفز ما تحته. للجدول في `<app-table>` (الخلفية على الخلايا)، ولغيره عالمي |
| النقل بالسهمين | `--ds-color-surface-sunken` |
| الوميض بعد الإفلات | من `--ds-color-surface-sunken` إلى خلفية العنصر في 900ms (`LANDED_DURATION` في المكوّن يطابقها) |

## 7. الواجهة البرمجية

| | المدخل / المخرج | |
|---|---|---|
| `dsSortableList` | `[sortableDisabled]` | أثناء التحميل أو الحفظ — لا سحب فوق هيكل عظمي |
| | `(sortableDrop)` | `{ previousIndex, currentIndex, item, source: 'pointer' \| 'keyboard' }` — ولا يُطلق للإفلات في الموضع نفسه |
| `[dsSortableItem]` | البيانات | تعود في `item` |
| | `[sortableLabel]` | اسمه لقارئ الشاشة في إعلان الموضع. بلاه: نصّه |
| | `[sortableDisabled]` | يبقى مكانه ويُزاح حوله |
| `dsSortableHandle` | على `<button>` حقيقي | بلا مقبض يُسحب العنصر كلّه — لتمارين الطالب وحدها |
| `*dsSortablePreview` | اختياري، ونادر | شكل آخر لما يُرفع. بلاه (وهو الأصل، والجداول كلها): نسخة من العنصر نفسه بمقاسه وتنسيقه |
| `moveItem(array, from, to)` | | بديل `moveItemInArray` |

## 8. السلوك ولوحة المفاتيح

**بالفأرة واللمس**
* السحب يبدأ بعد حركة 4px — فالمقبض يبقى زرًّا يُنقر، ويظهر تلميحه.
* **الرفع مع الإمالة** (قرار 2026-09-10 من مختبر السحب — مرجعه Pinterest وFeaturebase على Mobbin): نسخة من العنصر نفسه تُرفع بظلّ، وتكبر قليلًا (1.015)، وتميل 1.2° كورقة في اليد. طرف المقبض هو الأعلى، فيُعكس الميلان في LTR. وعليها شارة «2 من 6» بالموضع الذي ستستقرّ فيه، ولا تخرج عن حدود القائمة. والنسخة تحمل التنسيق المحسوب للعنصر، لأنها في `body` خارج تنسيق الجدول.
* العنصر نفسه يبقى في موضعه **فراغًا رماديًّا** (`ds-sortable-item--placeholder`) ينزاح إلى حيث سيستقرّ، والجيران يفسحون له.
* عند الإفلات يستقرّ من موضع النسخة بارتداد لطيف، ويومض رماديًّا لحظة إن تغيّر موضعه (`ds-sortable-item--landed`). والإلغاء يعيده بالارتداد نفسه بلا وميض.
* قرب حافّة منطقة التمرير (48px) تتمرّر الصفحة وحدها — منطقة محتوى اللوحة أو النافذة.
* Escape أثناء السحب تلغيه. والنقرة التي تلي الإفلات لا تفتح ما تحت المؤشّر.
* اللمس على المقبض سحبٌ لا تمرير (`touch-action: none` عليه وحده).

**بلوحة المفاتيح** (DEBT-012 — منجز)
* ↑ / ↓ على المقبض: خطوة، والعنصر رماديّ (`ds-sortable-item--keyboard`) وهو ينزاح.
* قارئ الشاشة يسمع «التسويق: الموضع 3 من 12» مع كل خطوة.
* **الحفظ بعد توقّف ثانية** لا مع كل ضغطة (قرار 2026-09-10): حدث `sortableDrop` واحد للنقلة كلّها — طلب واحد للخادم. وEnter أو خروج التركيز يحفظ فورًا، وEscape تلغي وتعيده.
* بعد الحفظ يعود التركيز إلى المقبض نفسه في موضعه الجديد، فيتابع المستخدم.

(اتجاه الأسهم في RTL — §10.)

**لماذا لا يُنقل شيء في الشجرة أثناء السحب؟** القائمة من `@for`، وAngular يعرف ترتيب عُقدها. الإزاحة بـ `transform` ثم إطلاق الحدث — والمستهلك يعيد ترتيب مصفوفته فيعيد Angular رسمها — تُبقي الاثنين متّفقين.

## 9. الاستجابة

> لا ينطبق — أداة سلوك تُركَّب على قائمة موجودة، بلا تخطيط خاص بها؛ اللمس في §8 («بالفأرة واللمس»).

## 10. RTL

* الأسهم عمودية فلا تنعكس في RTL.

← وميلان النسخة المرفوعة يُعكس في LTR لأن طرف المقبض هو الأعلى — §8. وشارة الموضع في طرف النهاية — §6.

## 11. إمكانية الوصول

* المقبض `<button>` باسم («إعادة ترتيب …»)، ومربوط بتعليمة ثابتة بـ `aria-describedby`: «اسحب لإعادة الترتيب، أو استخدم السهمين…». والتلميح يضيف وصفه إليها ولا يمحوها ([`tooltip.md`](../atoms/tooltip.md)).
* الإعلان في منطقة `aria-live="polite"` واحدة في `body` — خدمة المشروع القائمة مبنية على LiveAnnouncer من CDK فلا تُستعمل.
* WCAG 2.1.1: كل ما يُفعل بالسحب يُفعل بلوحة المفاتيح.

## 12. النصوص

← اسم المقبض «إعادة ترتيب …» وتعليمته الثابتة في §11، وتلميحه «اسحب لإعادة الترتيب» في §13، وإعلان الموضع «التسويق: الموضع 3 من 12» وشارة «2 من 6» في §8.

## 13. مثال

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

```ts
import { SORTABLE, SortableDrop, moveItem } from 'src/app/shared/ui/sortable/sortable';

drop(event: SortableDrop<Row>): void {
  if (event.previousIndex === event.currentIndex) return;
  moveItem(this.rows, event.previousIndex, event.currentIndex);
  // …الحفظ، وعند فشله يُعاد الترتيب السابق
}
```

## 14. ممنوع

* ❌ `@angular/cdk/drag-drop` (`cdkDropList` · `cdkDrag` · `moveItemInArray`) في شاشة جديدة.
* ❌ عنصر يُسحب كلّه بلا مقبض في اللوحة — يلتقط كل نقرة فيه ([`table.md`](../organisms/table.md)).
* ❌ مقبض `<span>` — لا يصله التركيز فلا يُرتَّب بلوحة المفاتيح.
* ❌ حفظ مع كل ضغطة سهم.

## 15. الدَّين القائم

### خطة النقل

| الدفعة | الشاشات | الحالة |
|---|---|---|
| 1 | جداول المدونة: المقالات · التصنيفات · الوسوم | ✅ 2026-09-10 |
| 2 | روابط الموقع (الهيدر والفوتر) | ✅ 2026-09-15 |
| 2 | بقية الجداول: الدورات · الباقات · الاستشارات · الكوتشينغ · المنتجات الرقمية · تصنيفات الموقع | ⏳ |
| 3 | معلومات المنتجات الستّ · الشروط · الخصوصية · محتوى الدرس · الترتيب المنطقي | ⏳ |
| 4 | محرّر الصفحات (v1 وv2) · القمع · Linktree | ⏳ |
| 5 | منهج الدورة (أقسام ودروس) · الاستطلاع (أسئلة وإجابات) | ⏳ |
| 6 | تمارين الطالب (والنقل بين قائمتين) · إزالة `cdkDropListGroup` الميّت من 4 شاشات | ⏳ |

## 16. روابط

- **يستخدم:** [`tooltip.md`](../atoms/tooltip.md) · [`icon.md`](../atoms/icon.md) (`essential/grip-horizontal`)
- **يُستخدم في:** [`table.md`](../organisms/table.md) § إعادة الترتيب بالسحب (`/admin/blog`: المقالات والتصنيفات والوسوم) · روابط الموقع (الهيدر والفوتر) · [`table-columns.md`](../organisms/table-columns.md)
- **ذو صلة:** [`filtering.md`](../patterns/filtering.md) · [`DEBT-012`](../../TECHNICAL-DEBT.md)
- **الكود:** [`shared/ui/sortable/`](../../../src/app/shared/ui/sortable/) — `dsSortableList` · `dsSortableItem` · `dsSortableHandle` · `*dsSortablePreview` · الاختبار [`sortable.spec.ts`](../../../src/app/shared/ui/sortable/sortable.spec.ts)
- **الأصل:** `Design-System/components/sortable.md` — نُقل إلى هذا الملف وحُذف الأصل (2026-09-26)
