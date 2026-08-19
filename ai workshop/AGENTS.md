# Agent Instructions

## Mission

Build and maintain a personal academic and professional management
dashboard. Prioritize clarity, reliability, actionable information, and
strong relationships between goals, projects, skills, tasks, and
outcomes.

## Product Rules

1.  Do not turn the product into a generic Todoist/Notion clone.
2.  Preserve the relationship between strategic goals and operational
    work.
3.  Prefer structured data over duplicated free-form information.
4.  Every important metric should have an actionable interpretation.
5.  Avoid unnecessary dashboard widgets and visual noise.
6.  Preserve historical data when records are updated.
7.  Never silently delete user data.
8.  Make important states explicit: planned, active, blocked, completed,
    archived.
9.  Keep academic and professional workflows distinct where their
    semantics differ, while allowing shared entities such as tasks,
    projects, skills, and goals.
10. Design for a single user first; multi-user architecture should not
    complicate the MVP.

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

-   Use consistent terminology.
-   Use clear status labels.
-   Keep primary actions obvious.
-   Prefer progressive disclosure over overwhelming the user.
-   Support quick-add actions.
-   Make overdue and at-risk states visible without being alarmist.
-   Never make a score look more authoritative than the underlying data
    supports.

## Data Rules

-   Use stable IDs.
-   Store timestamps for important changes.
-   Separate current state from historical events where useful.
-   Avoid duplicated sources of truth.
-   Validate dates, scores, percentages, and status transitions.
-   Make calculations reproducible from underlying records.

## Analytics Rules

Analytics must explain trends, not merely display numbers.

For every major metric, consider:

-   Current value
-   Previous value
-   Direction of change
-   Target
-   Risk
-   Recommended action

## AI Agent Behavior

If AI functionality is introduced:

-   Never fabricate academic grades, applications, achievements,
    deadlines, or professional outcomes.
-   Clearly distinguish user-provided facts from generated
    recommendations.
-   Ask for missing information when it materially affects a
    recommendation.
-   Prefer recommendations grounded in tracked data.
-   Do not automatically change important user records without
    confirmation.

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
