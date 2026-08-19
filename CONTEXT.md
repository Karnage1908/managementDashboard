# Product Context

## Product

**Command** — Personal Academic & Professional Management Dashboard

## Target Persona

A high-performing student, researcher, or early-career technologist balancing coursework, competitive coding, recruitment pipelines, portfolio engineering, and personal productivity.

## Problem Solved

Academic and professional execution is typically fractured across disconnected tools (LMS portals, GitHub, spreadsheets, Notion, job portals, calendars, and note apps). 

This fragmentation prevents students from seeing whether their day-to-day execution actually moves the needle on their high-level career and academic aspirations.

Command provides a single operational cockpit answering:
- **Immediate Attention**: Which assignments or application follow-ups are overdue or due within 72 hours?
- **Directional Trajectory**: Is current semester GPA on pace for the 3.85 target?
- **Skill Alignment**: Which competency gaps (e.g., System Design, AWS Cloud) are blocking tier-1 internship offers?
- **Portfolio Readiness**: Are active project deliverables building verified evidence for resume submissions?

---

## Core Relational Data Model

All data entities within `js/store.js` maintain interconnected references:

```text
Goal (e.g., Secure Summer Internship)
  ├── Project (ML Sentiment Engine / Portfolio Website)
  │     ├── Milestones (Architecture, Training, API Endpoint)
  │     └── Tasks (Implement AVL tree, Fix Auth Middleware)
  │           └── Calendar Events (Study Sessions, Hackathons)
  ├── Skill (Python, System Design, Machine Learning)
  │     ├── Evidence (HackTech 2nd Place, Published Survey Paper)
  │     └── Courses Completed (CS201, CS405)
  └── Job Application (Google, Meta, Airbnb)
        ├── OA / Test Follow-ups
        ├── Interview Schedules
        └── Offers & Achievements
```

---

## Implemented Domain Modules

### 1. Academics
- **Entities**: Courses, Assignments, Examinations, Attendance.
- **Key Features**: Expected vs. actual grades, assignment weightage calculator, exam countdown timers, and syllabus preparation gauges.

### 2. Professional & Career
- **Entities**: Career Strategy, Job/Internship Applications, Interview Schedules.
- **Key Features**: Target compensation benchmarks, 8-stage drag-and-drop Kanban pipeline, interview tracker, and recruiter follow-up logs.

### 3. Projects
- **Entities**: Academic, Professional, and Open Source Projects.
- **Key Features**: Milestone breakdowns, progress bars, deliverable checklists, and repository links.

### 4. Tasks & Execution
- **Entities**: Categorized action items with priorities (`Critical`, `High`, `Medium`, `Low`).
- **Key Features**: Timeframe views (`Today`, `Upcoming`, `Overdue`, `Completed`), inline completion toggles, and estimated time budgets.

### 5. Skills & Competencies
- **Entities**: Multi-domain skill matrix.
- **Key Features**: Interactive radar chart comparing Current Level vs. Target Level, automated gap analysis, and verified portfolio evidence.

### 6. Goals & Milestones
- **Entities**: Hierarchical goals (Long-Term → Yearly → Semester → Weekly Objectives).
- **Key Features**: Dynamic SVG progress rings, metric tracking, and sub-milestones.

### 7. Achievements & Portfolio
- **Entities**: Awards, Certifications, Publications, Hackathons, Leadership.
- **Key Features**: Verified accomplishment cards with external evidence and one-click JSON resume dataset export.

### 8. Analytics & Retrospectives
- **Key Features**: Daily study vs. deep work distributions, recruitment funnel efficiency, time category allocations, and Plan-Execute-Measure-Reflect framework.

### 9. Documents & Resources
- **Entities**: Cheat sheets, notes, resumes, and cloud links.

### 10. Settings & Portability
- **Key Features**: Profile management, localStorage JSON backup download & restoration, and seed data reset.
