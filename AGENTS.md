# Agent Instructions

## Mission

Build and maintain a personal academic and professional management
dashboard ("Command"). Prioritize clarity, reliability, actionable information, and
strong relationships between goals, projects, skills, tasks, and
outcomes.

## Product Rules

1.  Do not turn the product into a generic Todoist/Notion clone.
2.  Preserve the relationship between strategic goals and operational work.
3.  Prefer structured data over duplicated free-form information.
4.  Every important metric should have an actionable interpretation.
5.  Avoid unnecessary dashboard widgets and visual noise.
6.  Preserve historical data when records are updated.
7.  Never silently delete user data.
8.  Make important states explicit: planned, active, blocked, completed, archived.
9.  Keep academic and professional workflows distinct where their semantics differ, while allowing shared entities such as tasks, projects, skills, and goals.
10. Design for a single user first; multi-user architecture should not complicate the MVP.

## Core Relationships

Use these relationships wherever applicable:

-   Goal → Project
-   Goal → Skill
-   Project → Task
-   Project → Skill
-   Project → Achievement
-   Course → Assessment
-   Course → Grade
-   Opportunity → Interview
-   Opportunity → Application materials
-   Achievement → Evidence
-   Skill → Evidence
-   Task → Goal / Project / Course / Opportunity

## Dashboard Rules

The Overview page must prioritize:

1.  Immediate risks
2.  Today's actions
3.  Upcoming deadlines
4.  Strategic progress
5.  Trends

Do not prioritize vanity metrics.

## UX Rules

-   **Aesthetic**: Follow the Monkeytype dark theme (`#323437` background, `#2c2e31` panels, `#e2b714` golden yellow accents).
-   Use consistent terminology across all views.
-   Use clear status labels.
-   Keep primary actions obvious.
-   Prefer progressive disclosure over overwhelming the user.
-   Support quick-add actions.
-   Make overdue and at-risk states visible without being alarmist.
-   Never make a score look more authoritative than the underlying data supports.

## Codebase Architecture & File Structure

```
ai workshop/
├── index.html                  # Single entry point
├── css/
│   ├── design-system.css       # Color tokens, typography, reset, utility classes
│   ├── layout.css              # Sidebar, header, responsive grid
│   └── components.css          # Cards, badges, buttons, tables, forms, modals, kanban
├── js/
│   ├── store.js                # LocalStorage data layer + realistic seed dataset
│   ├── router.js               # Hash-based SPA router with animated transitions
│   ├── utils.js                # Date/time helpers, SVG progress rings, formatters
│   ├── charts.js               # Chart.js theme defaults & chart factories
│   ├── app.js                  # Main controller, route bootstrap, toasts, theme toggle
│   ├── components/
│   │   ├── sidebar.js          # Left navigation rail
│   │   ├── header.js           # Top bar (search, quick add, notifications)
│   │   └── modal.js            # Dynamic CRUD modal system
│   └── pages/
│       ├── overview.js         # Executive command dashboard
│       ├── academic.js         # Course, assignment, exam, and GPA management
│       ├── professional.js     # Career goals & strategy
│       ├── applications.js     # Kanban recruitment pipeline
│       ├── projects.js         # List, Kanban & Timeline project tracking
│       ├── tasks.js            # Multi-view task manager
│       ├── calendar.js         # Unified agenda & month calendar
│       ├── goals.js            # Hierarchical goal tree with progress rings
│       ├── skills.js           # Skill matrix & radar gap analysis
│       ├── achievements.js     # Accomplishments & resume dataset export
│       ├── analytics.js        # Multi-domain intelligence charts
│       ├── documents.js        # File & resource repository
│       └── settings.js         # Data backups & profile preferences
```

## Data Rules

-   Use stable IDs generated via `Utils.generateId()`.
-   Store timestamps for important changes.
-   Separate current state from historical events where useful.
-   Avoid duplicated sources of truth; store canonical data in `Store`.
-   Validate dates, scores, percentages, and status transitions.
-   Make calculations reproducible from underlying records.

## Definition of Done

A feature is complete when:

-   The core user flow works end-to-end.
-   Empty, loading, error, and success states exist.
-   Data validation is implemented.
-   Existing relationships are preserved.
-   The feature is responsive.
-   Accessibility has been considered.
-   No unrelated functionality is broken.
-   Documentation is updated when behavior or architecture changes.
