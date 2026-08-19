# Command — Personal Academic & Professional Management Dashboard

**Command** is a personal executive management dashboard designed to act as a single command center for tracking, planning, evaluating, and accelerating academic and professional progress.

It answers five critical questions at any moment:
1. **What do I need to do?** (Execution & tasks)
2. **What am I currently working on?** (Active sprints, projects, & courses)
3. **Am I making enough progress?** (Goal velocity, GPA trajectories, & skill gaps)
4. **What deadlines or opportunities are approaching?** (Exams, assignment due dates, interviews)
5. **Am I moving toward my long-term academic and career goals?** (Strategic alignment)

---

## Aesthetic & Architecture

- **Theme & Aesthetic**: Inspired by the Monkeytype minimalist dark palette (`#323437` slate dark base, `#2c2e31` panels, `#d1d0c5` high-contrast typography, and `#e2b714` golden yellow accents) with custom glassmorphism and micro-animations.
- **Zero Build Step SPA**: Built with vanilla HTML5, custom modular CSS, and ES6 JavaScript.
- **Persistence**: Browser `localStorage` with full JSON backup export and import.
- **Data Visualizations**: Chart.js 4.4 CDN (GPA trends, application funnels, skill gap radar charts, productivity distribution).
- **Icons**: Lucide Icons CDN.
- **Typography**: Google Fonts (*Inter* for UI text and *JetBrains Mono* for metrics/code/dates).

---

## Implemented Modules (13 Navigation Sections)

1. **Overview / Executive Dashboard (`#/overview`)**
   - 10 interactive KPI cards (Current GPA, Active Courses, Assignments Due, Upcoming Exams, Active Projects, Active Applications, Pending Tasks, Goal Completion %, Current Semester, 12-Day Streak).
   - **"Needs Attention" Engine**: Auto-surfaces critical overdue items, impending deadlines (≤ 3 days), exams with low prep, and application follow-ups.
   - **Today's Command Center**: Synchronized hourly schedule timeline and today's priority tasks.
   - **Progress Pipelines**: Mini GPA trend line, Application funnel breakdown, active project meters, and goal rings.
   - **Weekly Review**: Completed vs. missed objectives with Top 3 Actionable Priorities for the week.

2. **Academic Management (`#/academic`)**
   - Active courses with attendance progress, professor info, credit values, and target vs. current grades.
   - Assignment tracker with weightages, submission states, and expected vs. actual scores.
   - Exam countdown clock widget, preparation completion tracking, and syllabus coverage.
   - Academic analytics (GPA progression trend, grade distribution, attendance breakdown).

3. **Professional & Career Strategy (`#/professional`)**
   - Career blueprint: Target role (Full-Stack/ML Systems), target compensation, location preferences, and target tier-1 company lists.
   - Skill gap deficit analysis (e.g. System Design, AWS Cloud).
   - High-priority opportunity watchlist with interview schedules.

4. **Applications Pipeline (`#/applications`)**
   - **Kanban Board**: Drag-and-drop cards across 8 recruitment stages (`Saved` → `Preparing` → `Applied` → `OA/Test` → `Interview` → `Final Round` → `Offer` → `Rejected`).
   - Table view with inline stage modification and interview dates.
   - Funnel metrics (Application count, Interview rate %, Offers).

5. **Project Management (`#/projects`)**
   - Multi-view explorer: List view, Kanban status board, and Gantt-style Timeline.
   - Milestone checklist, deliverable progress meters, and repository links.

6. **Task Management (`#/tasks`)**
   - Multi-category engine (Academic, Professional, Project, Personal).
   - Smart timeframe filters: All, Today, Upcoming, Overdue, and Completed.
   - Interactive checkbox completion, inline status/priority editing, and estimated time tracking.

7. **Calendar & Schedule (`#/calendar`)**
   - Aggregated Agenda timeline unifying class lectures, deadlines, exams, and interviews.
   - Month view with color-coded category markers.

8. **Goals & Milestones (`#/goals`)**
   - Hierarchical goal tree (Long-Term → Yearly → Semester → Weekly Objectives).
   - SVG progress rings, numerical metric targets, and sub-milestone checklists.

9. **Skills Management (`#/skills`)**
   - Interactive Radar Chart comparing Current Level vs. Target Level.
   - Gap calculation engine identifying areas with highest deficit.
   - Evidence logs, completed coursework references, and invested hours.

10. **Achievements & Portfolio (`#/achievements`)**
    - Verified log of academic honors, hackathon placements, and certifications.
    - One-click JSON resume dataset export (`resume_dataset_*.json`).

11. **Performance Analytics (`#/analytics`)**
    - Charts for Daily Study vs. Coding hours, application funnel conversion, category time allocation, and goal velocity.
    - Retrospective Plan-Execute-Measure-Reflect framework.

12. **Documents & Resources (`#/documents`)**
    - Catalog for resumes, cheat sheets, lecture notes, and Overleaf drafts.

13. **Settings & Data Portability (`#/settings`)**
    - User profile configuration (Name, Semester, Target GPA).
    - Complete JSON backup export and import for seamless multi-device migration.
    - Factory seed data reset.

---

## Hosting on GitHub Pages

This project is pre-configured for deployment to GitHub Pages.

### Option A: Via GitHub Actions (Recommended & Automated)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Command dashboard"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow will automatically build and publish your site at `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`.

### Option B: Direct Branch Deployment

1. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Select branch **`main`** (or `master`) and directory **`/ (root)`**.
   - Click **Save**.
2. The included `.nojekyll` and `404.html` files ensure proper routing and asset serving immediately.

---

## File Structure

```
ai workshop/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── .nojekyll                   # Disables Jekyll processing on GitHub Pages
├── 404.html                    # GitHub Pages SPA fallback & redirect handler
├── index.html                  # Single entry point
├── css/
│   ├── design-system.css       # Monkeytype color tokens, typography, utilities, animations
│   ├── layout.css              # Collapsible sidebar, header bar, responsive grid
│   └── components.css          # Reusable cards, badges, buttons, tables, forms, modals, kanban
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
├── AGENTS.md                   # AI Agent instructions & coding guidelines
├── CONTEXT.md                  # Product context & domain model
├── DESIGN.md                   # Design system & UX specifications
└── README.md                   # Project overview & documentation
```
