# Command — Design System & UX Specification (Cyber Neon Edition)

## Design Vision & Identity

**Command** is a next-generation, high-density personal academic and professional operations system designed as a futuristic Cyber/Matrix-inspired executive HUD (Heads-Up Display). It transforms fragmented academic tracking, career recruitment pipelines, project milestones, and personal productivity into a cohesive, radiant command console.

### Aesthetic Principles
- **Cyber Dark Canvas**: Deep, immersive obsidian void (`#0a1012`, `#0d1518`) with glassmorphism layers and ambient matrix luminescences.
- **Radiant Emerald Accent**: Vibrant cyber-neon emerald (`#00ff9d`) with electric glow effects, high contrast readability, and status-driven chromatic hierarchy.
- **High Information Density (HUD)**: Compact telemetry cards, monospace data streams (`JetBrains Mono`), tabular metrics, and visual execution flows.
- **Micro-Luminescence & Tactility**: Smooth glow halos, border shimmer on hover, fluid animations, and crisp SVG radial gauges.
- **Zero Build Dependency**: 100% native ES6 modules, CSS Custom Properties, and modular component architecture.

---

## Color Palette Tokens

```css
:root {
  /* Surface & Backgrounds */
  --bg-primary: #0a1012;       /* Main cyber canvas backdrop */
  --bg-secondary: #0d1518;     /* Sidebar & panel background */
  --bg-tertiary: #060a0b;      /* Deep contrast base */
  --bg-card: #0e171a;          /* Surface card fill */
  --bg-card-hover: #132226;    /* Interactive card hover */
  --bg-input: #0b1417;         /* Form input fill */
  --bg-overlay: rgba(6, 11, 13, 0.88);

  /* Primary Accent — Cyber Neon Emerald */
  --accent: #00ff9d;           /* Radiant Matrix Green */
  --accent-hover: #33ffb1;
  --accent-dim: rgba(0, 255, 157, 0.12);
  --accent-glow: rgba(0, 255, 157, 0.28);
  --accent-subtle: rgba(0, 255, 157, 0.05);

  /* Typography */
  --text-primary: #e6f9f2;     /* Crisp high-contrast text */
  --text-secondary: #74968f;   /* Cyber teal subtext & labels */
  --text-muted: #45635c;       /* Inactive metadata */
  --text-accent: #00ff9d;      /* Radiant accent text */
  --text-on-accent: #04140d;   /* Dark text for vibrant buttons */

  /* Status Tokens */
  --color-success: #00ff9d;    /* Neon Emerald */
  --color-success-dim: rgba(0, 255, 157, 0.14);
  --color-warning: #e2b714;    /* Cyber Gold */
  --color-warning-dim: rgba(226, 183, 20, 0.15);
  --color-error: #ff385c;      /* Neon Crimson */
  --color-error-dim: rgba(255, 56, 92, 0.15);
  --color-info: #00e5ff;       /* Electric Cyan */
  --color-info-dim: rgba(0, 229, 255, 0.15);

  /* Priority Levels */
  --priority-critical: #ff385c;
  --priority-high: #00ff9d;
  --priority-medium: #e2b714;
  --priority-low: #00e5ff;

  /* Categories */
  --cat-academic: #00e5ff;     /* Cyan */
  --cat-professional: #c084fc; /* Lavender Purple */
  --cat-personal: #f472b6;     /* Neon Pink */
  --cat-project: #00ff9d;      /* Emerald */

  /* Chart Palette */
  --chart-1: #00ff9d;
  --chart-2: #00e5ff;
  --chart-3: #e2b714;
  --chart-4: #c084fc;
  --chart-5: #f472b6;
  --chart-6: #38bdf8;
  --chart-7: #fb923c;
  --chart-8: #ff385c;

  /* Borders & Cyber Glows */
  --border-subtle: 1px solid rgba(0, 255, 157, 0.18);
  --border-medium: 1px solid rgba(0, 255, 157, 0.32);
  --border-glow: 1px solid rgba(0, 255, 157, 0.6);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 255, 157, 0.2);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.75), 0 0 12px rgba(0, 255, 157, 0.15);
  --shadow-glow: 0 0 20px var(--accent-glow);
}
```

---

## Typography Hierarchy

- **Interface Body & Headings**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Data Streams, KPI Values, Timestamps & Code**: `JetBrains Mono`, `Fira Code`, `monospace`

| Token | Size | Line Height | Weight | Typical Application |
|---|---|---|---|---|
| `--fs-xs` | 0.6875rem (11px) | 1.2 | 500/600 | Badges, timestamps, small tags |
| `--fs-sm` | 0.75rem (12px) | 1.4 | 400/500 | Metadata, table cells, form labels |
| `--fs-base`| 0.875rem (14px) | 1.5 | 400/500 | Standard body copy, list items |
| `--fs-md` | 1.0rem (16px) | 1.4 | 600 | Card titles, subheadings |
| `--fs-lg` | 1.125rem (18px) | 1.3 | 600/700 | Section headers, modal titles |
| `--fs-xl` | 1.375rem (22px) | 1.2 | 700 | Main titles, large callouts |
| `--fs-2xl`| 1.75rem (28px) | 1.1 | 700/800 | Top KPI Values, Page headings |
| `--fs-3xl`| 2.25rem (36px) | 1.0 | 800 | Main Hero Stats |

---

## Layout & HUD Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Top Bar: Page Title · Live Date · Current Semester · + Quick Add · Notification Hub (1)│
├───────────────┬────────────────────────────────────────────────────────────────────────┤
│ Sidebar Nav   │ Row 1: 10 KPI Telemetry Grid (GPA, Courses, Due, Exams, Projects...)    │
│ • Overview    ├────────────────────────────────────────┬───────────────────────────────┤
│ • Academic    │ Row 2: Today's Schedule                │ Row 2: Needs Attention        │
│ • Professional│        (Horizontal Cyber Timeline)     │        (Risk & Threat Engine) │
│ • Applications├────────────────────────────────────────┴───────────────────────────────┤
│ • Projects    │ Row 3: Today's Tasks (HUD Priority & Status Matrix Table)              │
│ • Tasks       ├─────────────────────────┬──────────────────────────────┬───────────────┤
│ • Calendar    │ Row 4: Academic Progress│ Application Pipeline         │ Active Project│
│ • Goals       │        (Neon Dual Line) │ (Interactive Node Flow)      │ Progress Bars │
│ • Skills      ├─────────────────────────┼──────────────────────────────┼───────────────┤
│ • Achievements│ Row 5: Goal Radial Rings│ Productivity Focus Bars      │ Upcoming      │
│ • Analytics   │        (52% Completion) │ (Mon-Sat Study / Deep Work)  │ Deadlines     │
│ • Resources   ├─────────────────────────┴──────────────────────────────┴───────────────┤
│ ⇥ Collapse    │ Row 6: Weekly Strategic Review & Top 3 Priority Objectives             │
└───────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. KPI Telemetry Cards (`.kpi-card`)
- **Icon Container**: Square rounded container (`36x36px`) with emerald border (`1px solid rgba(0, 255, 157, 0.25)`) and dark green background tint.
- **Value**: Monospace bold white typography (`#e6f9f2`) with count-up animation.
- **Label**: Uppercase letter-spaced subtext in cyan-teal (`#74968f`).
- **Interactive States**: Hover lift `-2px` with luminous border brightening and outer green glow.

### 2. Schedule Timeline (`.schedule-timeline-horizontal`)
- Continuous glowing horizontal line with circular status nodes.
- Direct timestamp indicators (`09:00 AM`, `11:00 AM`, `01:00 PM`, `03:00 PM`).
- Node cards with title, course code, and lecture room metadata.

### 3. Threat / Attention Panel (`.attention-item`)
- Left accent borders indicating severity:
  - `Critical`: Neon Crimson (`#ff385c`)
  - `High`: Cyber Emerald (`#00ff9d`)
  - `Medium`: Cyber Gold (`#e2b714`)
- Direct action prompts (e.g., *Due in 2 days*, *Prepare for technical interview*, *Complete assessment*).

### 4. HUD Task Table (`.data-table`)
- Crisp headers with sorting triggers.
- Monospace duration and due dates.
- Category pills (`Academic`, `Professional`, `Project`, `Personal`) with subtle translucent neon backgrounds.
- High-contrast status badges (`In Progress`, `Todo`, `Overdue`, `Completed`).

### 5. Multi-Domain Visualizations (`Charts`)
- **Dual Gradient Line Charts**: Smooth bezier curves with neon emerald `#00ff9d` and cyan `#00e5ff` glowing fills.
- **Productivity Histogram**: Rounded glowing emerald bars with stacked study/deep work segments.
- **Application Pipeline Flow**: Step-by-step stage indicators with stage-specific badge counts.
- **Radial Goal Gauges**: Dynamic SVG circumference math with stroke glows.

---

## Responsive Breakpoints
- **Ultra-Wide (≥1440px)**: 5-column metric rows, 3-column analysis grid.
- **Desktop (1024px–1439px)**: 3-column / 2-column auto-wrapping grids.
- **Tablet & Mobile (<1024px)**: Collapsible slide-out navigation drawer, stacked single-column HUD cards, touch-optimized tap targets.
