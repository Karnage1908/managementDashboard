# Design System & UX Specification

## Design Goal

Create a high-information personal management interface that feels like an executive command center rather than a simple spreadsheet or to-do list.

The design philosophy is heavily inspired by **Monkeytype's Serika Dark palette** and modern minimalist dashboards:
- **Calm and Focused**: Low-distraction dark theme (`#323437`) with golden yellow (`#e2b714`) accents.
- **High Information Density**: Progressive disclosure, compact metadata, tabular numeric formatting.
- **Fluid Micro-Animations**: Smooth entry transitions, hover lifts, progress fill animations.
- **Zero Build Step**: Native CSS custom properties and ES6 modules.

---

## Color Palette Tokens

```css
:root {
  /* Surface & Backgrounds */
  --bg-primary: #323437;       /* Main canvas background */
  --bg-secondary: #2c2e31;     /* Sidebar & component secondary backgrounds */
  --bg-tertiary: #1e1f21;      /* Deep contrast base */
  --bg-card: #3a3c3f;          /* Surface card fill */
  --bg-card-hover: #444648;    /* Interactive card hover */
  --bg-input: #2c2e31;         /* Form input fill */
  --bg-overlay: rgba(30, 31, 33, 0.85);

  /* Primary Accent */
  --accent: #e2b714;           /* Monkeytype golden yellow */
  --accent-hover: #f0c928;
  --accent-dim: rgba(226, 183, 20, 0.15);
  --accent-glow: rgba(226, 183, 20, 0.25);

  /* Typography */
  --text-primary: #d1d0c5;     /* High contrast off-white text */
  --text-secondary: #646669;   /* Subtext & labels */
  --text-muted: #4a4c4f;       /* Inactive metadata */
  --text-accent: #e2b714;

  /* Status Tokens */
  --color-success: #7ec984;    /* Green */
  --color-warning: #e2b714;    /* Yellow */
  --color-error: #ca4754;      /* Red */
  --color-info: #6eb4e2;       /* Cyan */

  /* Priority Levels */
  --priority-critical: #ca4754;
  --priority-high: #e28314;
  --priority-medium: #e2b714;
  --priority-low: #7ec984;

  /* Categories */
  --cat-academic: #6eb4e2;
  --cat-professional: #b47ee2;
  --cat-personal: #e27ea8;
  --cat-project: #7ee2c1;
}
```

---

## Typography

- **Body & Headings**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Numbers, Dates, & Code**: `JetBrains Mono`, `Fira Code`, `monospace`

```css
--fs-xs: 0.6875rem;   /* 11px */
--fs-sm: 0.75rem;     /* 12px */
--fs-base: 0.875rem;  /* 14px */
--fs-md: 1rem;        /* 16px */
--fs-lg: 1.125rem;    /* 18px */
--fs-xl: 1.375rem;    /* 22px */
--fs-2xl: 1.75rem;    /* 28px */
--fs-3xl: 2.25rem;    /* 36px */
```

---

## Information Hierarchy & Layouts

### Application Shell
1. **Sidebar Navigation (`#sidebar`)**:
   - Fixed 260px width (collapsible to 72px icon rail).
   - Grouped sections: `Dashboard`, `Management`, `Tracking`, `Growth`, `Resources`.
   - Real-time badge indicators for pending tasks and active interviews.
2. **Top Header (`#header`)**:
   - Live date display & academic semester context.
   - Global quick-search input.
   - Interactive notification flyout drawer.
   - Quick Add menu with 1-click modal shortcuts.
   - Dark/light mode toggle.
3. **Main Content Container (`#page-content`)**:
   - CSS grid responsive dashboard container.
   - Max width constraint 1600px with dynamic padding.

### Executive Overview Grid Architecture
```text
┌────────────────────────────────────────────────────────────────────────┐
│ Top Bar: Live Date · Current Semester · Quick Add · Notifications · Search│
├───────────────┬────────────────────────────────────────────────────────┤
│ Sidebar Nav   │ Row 1: 10 KPI Metric Cards                             │
│ • Overview    ├───────────────────────────────┬────────────────────────┤
│ • Academic    │ Row 2: Today's Schedule       │ Row 2: Needs Attention │
│ • Professional│        (Hourly Timeline)      │        (Risk Engine)   │
│ • Applications├───────────────────────────────┴────────────────────────┤
│ • Projects    │ Row 3: Today's Prioritized Tasks                       │
│ • Tasks       ├───────────────────────────────┬────────────────────────┤
│ • Calendar    │ Row 4: Academic GPA Trend     │ Row 4: App Pipeline    │
│ • Goals       ├───────────────────────────────┼────────────────────────┤
│ • Skills      │ Row 5: Active Projects        │ Row 5: Goal Rings      │
│ • Achievements├───────────────────────────────┼────────────────────────┤
│ • Analytics   │ Row 6: Productivity Hours     │ Row 6: Deadlines       │
│ • Documents   ├───────────────────────────────┴────────────────────────┤
│ • Settings    │ Row 7: Weekly Retrospective Review & Top 3 Priorities  │
└───────────────┴────────────────────────────────────────────────────────┘
```

---

## Component Architecture

1. **KPI Cards (`.kpi-card`)**:
   - Hover micro-lift with subtle border highlighting.
   - Monospace large typography for instantaneous scanning.
   - Direct click-through routing to target detailed modules.

2. **Data Tables (`.data-table`)**:
   - Monospace numeric/date cells.
   - Hover row highlight with action buttons visible on hover.
   - Status & priority chip badges.

3. **Kanban Boards (`.kanban-board`, `.kanban-column`, `.kanban-card`)**:
   - Full drag-and-drop support using HTML5 native Drag & Drop API.
   - Horizontal smooth scroll container with column item count pills.

4. **Progress Rings & Gauges (`.progress-ring`, `.progress-bar`)**:
   - Calculated dynamic SVG circumference dash-offset for goal completion percentages.
   - Semantic color fills (`success` ≥ 70%, `warning` 40-69%, `error` < 40%).

5. **Modal System (`ModalSystem`)**:
   - Auto-generated schema-based forms for tasks, goals, events, applications, projects, courses, assignments, achievements, and documents.
   - Inline data editing and confirmation prompts for deletion.
