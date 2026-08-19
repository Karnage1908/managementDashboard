# Design System & UX Specification

## Design Goal

Create a high-information personal management interface that feels like
a command center rather than a spreadsheet.

The design should be:

-   Clear
-   Dense but readable
-   Fast
-   Responsive
-   Consistent
-   Data-driven
-   Calm under high workload

## Information Hierarchy

The default hierarchy is:

1.  Critical risks
2.  Immediate actions
3.  Upcoming commitments
4.  Strategic progress
5.  Historical trends
6.  Supporting details

## Application Shell

### Desktop

Use a persistent left navigation rail/sidebar with:

-   Overview
-   Academics
-   Professional
-   Projects
-   Goals
-   Skills
-   Tasks
-   Calendar
-   Achievements
-   Documents
-   Analytics
-   Settings

The top bar should contain:

-   Global search
-   Quick add
-   Notifications
-   Profile/settings

### Mobile

Use:

-   Compact top bar
-   Bottom navigation for highest-frequency destinations
-   Drawer for secondary navigation
-   Stacked cards instead of dense multi-column layouts

## Overview Layout

Recommended structure:

``` text
┌─────────────────────────────────────────────┐
│ Header / Search / Quick Add                 │
├───────────────┬─────────────────────────────┤
│ Navigation    │ Executive Snapshot          │
│               ├─────────────────────────────┤
│               │ Today's Priorities           │
│               ├──────────────┬──────────────┤
│               │ Goal Progress│ Upcoming     │
│               │              │ Deadlines    │
│               ├──────────────┴──────────────┤
│               │ Academic + Career Timeline   │
│               ├──────────────┬──────────────┤
│               │ Projects     │ Career       │
│               │              │ Pipeline      │
│               ├──────────────┴──────────────┤
│               │ Analytics / Trends           │
└───────────────┴─────────────────────────────┘
```

## Cards

Cards should have:

-   Clear title
-   Optional supporting metric
-   Primary status
-   Relevant action
-   Consistent spacing

Avoid excessive borders, shadows, gradients, or decorative elements.

## Status System

Use consistent semantic statuses:

-   Planned
-   In Progress
-   Blocked
-   At Risk
-   Completed
-   Archived

Status should be communicated through more than color alone. Use text,
icons, or labels for accessibility.

## Priority

-   Critical
-   High
-   Medium
-   Low

Priority should affect ordering and visual prominence.

## Typography

Use a clear sans-serif typeface with:

-   Strong page headings
-   Medium-weight section headings
-   Highly readable body text
-   Compact metadata
-   Tabular/numeric typography where useful

Avoid excessive font sizes and decorative typography.

## Data Visualization

Prefer simple visualizations:

-   Progress bars
-   Line charts for trends
-   Bar charts for comparisons
-   Donut/ring charts only when proportions are useful
-   Kanban boards for pipelines
-   Timelines for deadlines
-   Heatmaps for recurring activity

Every chart should have a clear purpose.

## Dashboard Metrics

A metric should ideally show:

`Current Value + Change + Target/Context`

Example:

`Projects Completed: 8  ↑ 33% vs last month`

Avoid displaying a number without explaining why it matters.

## Empty States

Empty states should teach the user what to do next.

Example:

**No active projects**

"Create a project to connect tasks, skills, milestones, and
achievements."

Include a primary action.

## Loading States

Use skeleton loaders for dashboard cards and lists.

Avoid blocking the entire interface while an independent widget loads.

## Error States

Errors should explain:

-   What failed
-   Whether existing data is safe
-   What the user can do next

Avoid exposing raw technical errors by default.

## Forms

Forms should:

-   Group related fields
-   Use sensible defaults
-   Validate inline
-   Preserve user input after validation errors
-   Clearly indicate required fields
-   Support keyboard navigation

## Quick Add

Quick Add should support:

-   Task
-   Goal
-   Project
-   Assignment
-   Opportunity
-   Achievement

The action should require the minimum information necessary initially
and allow details to be added later.

## Accessibility

Target WCAG 2.2 AA principles where practical.

Requirements:

-   Keyboard navigation
-   Visible focus states
-   Adequate contrast
-   Semantic HTML
-   Accessible form labels
-   Non-color status indicators
-   Screen-reader-friendly charts and tables
-   Reduced-motion support

## Responsive Behavior

Desktop should optimize for information density.

Tablet should reduce columns.

Mobile should prioritize:

1.  Today's priorities
2.  Deadlines
3.  Tasks
4.  Goals
5.  Quick actions

Secondary analytics can move deeper into the navigation.

## Interaction Principles

-   One-click access to common actions.
-   Avoid unnecessary confirmation dialogs for reversible actions.
-   Confirm destructive operations.
-   Use optimistic updates only where failure can be safely recovered.
-   Preserve filters and view state where reasonable.
-   Make relationships between entities easy to discover.

## Design North Star

The user should be able to open the dashboard and understand within
seconds:

**What matters now, what is at risk, and how today's work contributes to
long-term goals.**
