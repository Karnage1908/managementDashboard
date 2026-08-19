// ============================================
// OVERVIEW PAGE — Executive Dashboard
// ============================================

const OverviewPage = {
  render(container) {
    const settings = Store.getSettings();
    const courses = Store.get('courses');
    const assignments = Store.get('assignments');
    const exams = Store.get('exams');
    const tasks = Store.get('tasks');
    const projects = Store.get('projects');
    const applications = Store.get('applications');
    const goals = Store.get('goals');
    const events = Store.get('events');

    // Computed values
    const activeCourses = courses.filter(c => c.status === 'Active').length;
    const assignmentsDue = assignments.filter(a => {
      const days = Utils.daysUntil(a.deadline);
      return days !== null && days >= 0 && days <= 7 && a.status !== 'Graded' && a.status !== 'Submitted';
    }).length;
    const upcomingExams = exams.filter(e => e.status === 'Upcoming').length;
    const activeProjects = projects.filter(p => p.status === 'Active').length;
    const activeApps = applications.filter(a => !['Rejected', 'Offer'].includes(a.stage)).length;
    const pendingTasks = tasks.filter(t => !['Completed', 'Graded'].includes(t.status)).length;
    const goalProgress = goals.length ? Math.round(goals.reduce((sum, g) => sum + (g.progress || 0), 0) / goals.length) : 0;

    container.innerHTML = `
      <div class="dashboard-grid">
        <!-- KPI ROW -->
        <div class="dashboard-row cols-auto" style="grid-template-columns: repeat(5, 1fr);">
          <div class="kpi-card animate-fade-in-up stagger-1" onclick="Router.navigate('/academic')">
            <div class="kpi-icon academic"><i data-lucide="award"></i></div>
            <div class="kpi-value">${Utils.formatGpa(settings.gpa)}</div>
            <div class="kpi-label">Current GPA</div>
            <div class="kpi-trend up">↑ Target: ${Utils.formatGpa(settings.targetGpa)}</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-2" onclick="Router.navigate('/academic')">
            <div class="kpi-icon academic"><i data-lucide="book-open"></i></div>
            <div class="kpi-value">${activeCourses}</div>
            <div class="kpi-label">Active Courses</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-3" onclick="Router.navigate('/academic')">
            <div class="kpi-icon ${assignmentsDue > 2 ? 'danger' : 'task'}"><i data-lucide="file-edit"></i></div>
            <div class="kpi-value">${assignmentsDue}</div>
            <div class="kpi-label">Assignments Due</div>
            <div class="kpi-trend ${assignmentsDue > 2 ? 'down' : 'up'}">${assignmentsDue > 2 ? '⚠ This week' : '✓ On track'}</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-4" onclick="Router.navigate('/academic')">
            <div class="kpi-icon danger"><i data-lucide="clock"></i></div>
            <div class="kpi-value">${upcomingExams}</div>
            <div class="kpi-label">Upcoming Exams</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-5" onclick="Router.navigate('/projects')">
            <div class="kpi-icon project"><i data-lucide="folder-kanban"></i></div>
            <div class="kpi-value">${activeProjects}</div>
            <div class="kpi-label">Active Projects</div>
          </div>
        </div>

        <div class="dashboard-row cols-auto" style="grid-template-columns: repeat(5, 1fr);">
          <div class="kpi-card animate-fade-in-up stagger-6" onclick="Router.navigate('/applications')">
            <div class="kpi-icon professional"><i data-lucide="send"></i></div>
            <div class="kpi-value">${activeApps}</div>
            <div class="kpi-label">Active Applications</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-7" onclick="Router.navigate('/tasks')">
            <div class="kpi-icon task"><i data-lucide="list-checks"></i></div>
            <div class="kpi-value">${pendingTasks}</div>
            <div class="kpi-label">Pending Tasks</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-8" onclick="Router.navigate('/goals')">
            <div class="kpi-icon success"><i data-lucide="target"></i></div>
            <div class="kpi-value">${goalProgress}%</div>
            <div class="kpi-label">Goal Completion</div>
            ${Utils.progressBar(goalProgress, goalProgress >= 70 ? 'success' : goalProgress >= 40 ? 'warning' : 'error')}
          </div>
          <div class="kpi-card animate-fade-in-up stagger-9">
            <div class="kpi-icon academic"><i data-lucide="calendar-days"></i></div>
            <div class="kpi-value" style="font-size:var(--fs-lg)">${settings.currentSemester}</div>
            <div class="kpi-label">Current Semester</div>
          </div>
          <div class="kpi-card animate-fade-in-up stagger-10">
            <div class="kpi-icon success"><i data-lucide="flame"></i></div>
            <div class="kpi-value">${settings.productivityStreak}</div>
            <div class="kpi-label">Day Streak 🔥</div>
          </div>
        </div>

        <!-- ROW 2: Today's Command Center + Needs Attention -->
        <div class="dashboard-row cols-3-2">
          <!-- Today's Schedule -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">📅 Today's Schedule</span>
              <span class="card-action" onclick="Router.navigate('/calendar')">View Calendar →</span>
            </div>
            <div class="card-body">
              ${this.renderTodaySchedule(events)}
            </div>
          </div>

          <!-- Needs Attention -->
          <div class="card animate-fade-in-up" style="border-color: rgba(202, 71, 84, 0.3);">
            <div class="card-header">
              <span class="card-title" style="color: var(--color-error);">⚠ Needs Attention</span>
            </div>
            <div class="card-body" style="max-height: 380px; overflow-y: auto;">
              ${this.renderAttentionPanel(tasks, assignments, exams, applications, projects, goals)}
            </div>
          </div>
        </div>

        <!-- ROW 3: Today's Tasks -->
        <div class="dashboard-row">
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">✅ Today's Tasks</span>
              <div class="flex gap-2">
                <span class="filter-chip active" onclick="this.classList.toggle('active')">All</span>
                <span class="filter-chip" onclick="this.classList.toggle('active')">Academic</span>
                <span class="filter-chip" onclick="this.classList.toggle('active')">Professional</span>
                <span class="filter-chip" onclick="this.classList.toggle('active')">Personal</span>
              </div>
            </div>
            <div class="card-body">
              ${this.renderTodayTasks(tasks)}
            </div>
          </div>
        </div>

        <!-- ROW 4: Academic Progress + Professional Pipeline -->
        <div class="dashboard-row cols-2">
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">📊 Academic Progress</span>
              <span class="card-action" onclick="Router.navigate('/academic')">Details →</span>
            </div>
            <div class="card-body">
              <div id="chart-gpa-trend" class="chart-container"></div>
              <div style="margin-top:var(--sp-4)">
                ${courses.filter(c => c.status === 'Active').map(c => `
                  <div class="stat-row">
                    <span class="stat-label flex items-center gap-2">
                      <span class="dot" style="background:${c.color}"></span>
                      ${c.code}
                    </span>
                    <div class="flex items-center gap-3">
                      <span class="stat-value">${c.currentGrade}%</span>
                      <div class="progress-bar" style="width:80px">
                        <div class="progress-bar-fill ${c.currentGrade >= c.targetGrade ? 'success' : c.currentGrade >= c.targetGrade - 5 ? 'warning' : 'error'}" style="width:${c.currentGrade}%"></div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">💼 Application Pipeline</span>
              <span class="card-action" onclick="Router.navigate('/applications')">Details →</span>
            </div>
            <div class="card-body">
              <div id="chart-app-pipeline" class="chart-container"></div>
              <div style="margin-top:var(--sp-4)">
                ${this.renderMiniPipeline(applications)}
              </div>
            </div>
          </div>
        </div>

        <!-- ROW 5: Active Projects + Goal Progress -->
        <div class="dashboard-row cols-2">
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">🚀 Active Projects</span>
              <span class="card-action" onclick="Router.navigate('/projects')">View All →</span>
            </div>
            <div class="card-body">
              ${projects.filter(p => p.status === 'Active').map(p => `
                <div class="flex items-center justify-between p-3 rounded-md" style="background:var(--bg-secondary);margin-bottom:var(--sp-2);">
                  <div class="flex-1" style="min-width:0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-sm font-medium truncate">${p.name}</span>
                      ${Utils.badge(p.category, Utils.categoryBadgeClass(p.category))}
                    </div>
                    <div class="progress-bar-label">
                      <span>${p.status}</span>
                      <span>${p.completion}%</span>
                    </div>
                    ${Utils.progressBar(p.completion, p.completion >= 70 ? 'success' : p.completion >= 40 ? 'warning' : 'info')}
                  </div>
                  <div class="text-xs text-muted ml-auto" style="margin-left:var(--sp-4);white-space:nowrap">
                    ${Utils.relativeTime(p.deadline)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">🎯 Goal Progress</span>
              <span class="card-action" onclick="Router.navigate('/goals')">View All →</span>
            </div>
            <div class="card-body">
              <div class="flex flex-wrap gap-4 justify-center mb-4">
                ${goals.slice(0, 4).map(g => `
                  <div class="text-center">
                    ${Utils.progressRing(g.progress, 70, 5, g.progress >= 70 ? 'var(--color-success)' : g.progress >= 40 ? 'var(--accent)' : 'var(--color-error)')}
                    <div class="text-xs text-secondary mt-2" style="max-width:80px">${Utils.truncate(g.title, 20)}</div>
                  </div>
                `).join('')}
              </div>
              ${goals.slice(0, 5).map(g => `
                <div class="stat-row">
                  <div class="flex items-center gap-2">
                    ${Utils.badge(g.level, 'badge-neutral')}
                    <span class="stat-label text-sm">${Utils.truncate(g.title, 30)}</span>
                  </div>
                  <span class="stat-value">${g.progress}%</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- ROW 6: Productivity + Upcoming Deadlines -->
        <div class="dashboard-row cols-2">
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">📈 Productivity</span>
              <span class="card-action" onclick="Router.navigate('/analytics')">Analytics →</span>
            </div>
            <div class="card-body">
              <div class="flex gap-4 mb-4">
                <div class="flex-1 p-3 rounded-md" style="background:var(--bg-secondary)">
                  <div class="text-xs text-secondary mb-1">Study Hours</div>
                  <div class="text-lg font-bold font-mono">${settings.studyHoursThisWeek}h</div>
                  <div class="text-xs text-muted">This week</div>
                </div>
                <div class="flex-1 p-3 rounded-md" style="background:var(--bg-secondary)">
                  <div class="text-xs text-secondary mb-1">Deep Work</div>
                  <div class="text-lg font-bold font-mono">${settings.deepWorkHoursThisWeek}h</div>
                  <div class="text-xs text-muted">This week</div>
                </div>
                <div class="flex-1 p-3 rounded-md" style="background:var(--bg-secondary)">
                  <div class="text-xs text-secondary mb-1">Tasks Done</div>
                  <div class="text-lg font-bold font-mono">${tasks.filter(t => t.status === 'Completed').length}</div>
                  <div class="text-xs text-muted">This week</div>
                </div>
              </div>
              <div id="chart-productivity" class="chart-container"></div>
            </div>
          </div>

          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">📆 Upcoming Deadlines</span>
            </div>
            <div class="card-body">
              ${this.renderUpcomingDeadlines(assignments, exams, projects, applications)}
            </div>
          </div>
        </div>

        <!-- ROW 7: Weekly Review -->
        <div class="dashboard-row">
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">📋 Weekly Review Summary</span>
              <span class="card-action" onclick="Router.navigate('/analytics')">Full Review →</span>
            </div>
            <div class="card-body">
              <div class="dashboard-row cols-3">
                <div>
                  <h5 class="text-sm font-semibold mb-3" style="color:var(--color-success)">✅ Completed</h5>
                  <ul style="list-style:none;padding:0">
                    <li class="text-sm text-secondary mb-2">• ${tasks.filter(t => t.status === 'Completed').length} tasks completed</li>
                    <li class="text-sm text-secondary mb-2">• ${assignments.filter(a => a.status === 'Graded' || a.status === 'Submitted').length} assignments submitted</li>
                    <li class="text-sm text-secondary mb-2">• ${applications.filter(a => a.stage === 'Applied' || a.stage === 'Interview').length} applications progressed</li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-semibold mb-3" style="color:var(--color-error)">⚠ Needs Action</h5>
                  <ul style="list-style:none;padding:0">
                    <li class="text-sm text-secondary mb-2">• ${tasks.filter(t => t.status === 'Overdue').length} overdue tasks</li>
                    <li class="text-sm text-secondary mb-2">• ${assignments.filter(a => a.status === 'Overdue').length} overdue assignments</li>
                    <li class="text-sm text-secondary mb-2">• ${goals.filter(g => g.progress < 30).length} goals at risk</li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-semibold mb-3" style="color:var(--accent)">🎯 Top 3 Priorities</h5>
                  <ul style="list-style:none;padding:0">
                    ${this.getTopPriorities().map((p, i) => `
                      <li class="text-sm text-secondary mb-2">
                        <span class="font-mono text-accent">${i + 1}.</span> ${p}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render charts after DOM update
    setTimeout(() => this.renderCharts(), 100);
  },

  renderTodaySchedule(events) {
    const todayEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      const today = new Date();
      return eventDate.toDateString() === today.toDateString();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!todayEvents.length) {
      return `
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-time">No events today</div>
            <div class="timeline-content text-muted">Your schedule is clear</div>
          </div>
        </div>
      `;
    }

    return `
      <div class="timeline">
        ${todayEvents.map(e => `
          <div class="timeline-item">
            <div class="timeline-dot ${e.category ? e.category.toLowerCase() : ''}"></div>
            <div class="timeline-time">${Utils.formatTime(e.date)} — ${Utils.formatTime(e.endDate)}</div>
            <div class="timeline-content">${e.title}</div>
            <div class="timeline-desc">${Utils.badge(e.type || e.category, Utils.categoryBadgeClass(e.category))}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderAttentionPanel(tasks, assignments, exams, applications, projects, goals) {
    const items = [];

    // Overdue tasks
    tasks.filter(t => t.status === 'Overdue').forEach(t => {
      items.push({ priority: 'Critical', title: t.title, desc: `Task overdue by ${Math.abs(Utils.daysUntil(t.dueDate))} days`, type: 'task' });
    });

    // Overdue assignments
    assignments.filter(a => a.status === 'Overdue').forEach(a => {
      items.push({ priority: 'Critical', title: a.title, desc: `${a.course} — overdue`, type: 'academic' });
    });

    // Deadlines within 3 days
    assignments.filter(a => {
      const days = Utils.daysUntil(a.deadline);
      return days !== null && days >= 0 && days <= 3 && a.status !== 'Graded' && a.status !== 'Submitted';
    }).forEach(a => {
      items.push({ priority: 'High', title: a.title, desc: `Due ${Utils.relativeTime(a.deadline)} — ${a.course}`, type: 'academic' });
    });

    // Upcoming exams with low prep
    exams.filter(e => {
      const days = Utils.daysUntil(e.date);
      return e.status === 'Upcoming' && days !== null && days <= 14 && e.preparationPercent < 70;
    }).forEach(e => {
      items.push({ priority: e.preparationPercent < 40 ? 'High' : 'Medium', title: `${e.subject} ${e.type}`, desc: `In ${Utils.daysUntil(e.date)} days — ${e.preparationPercent}% prepared`, type: 'academic' });
    });

    // Applications needing action
    applications.filter(a => {
      const days = Utils.daysUntil(a.followUpDate);
      return days !== null && days >= 0 && days <= 2 && !['Rejected', 'Offer'].includes(a.stage);
    }).forEach(a => {
      items.push({ priority: 'High', title: `${a.company} — ${a.stage}`, desc: a.nextAction || 'Follow up required', type: 'professional' });
    });

    // Goals at risk
    goals.filter(g => g.progress < 30 && g.status !== 'Completed').forEach(g => {
      items.push({ priority: 'Medium', title: g.title, desc: `Only ${g.progress}% progress`, type: 'goal' });
    });

    // Sort by priority
    const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    items.sort((a, b) => (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3));

    if (!items.length) {
      return '<div class="text-center p-4 text-secondary">All clear! No items need attention. 🎉</div>';
    }

    return items.slice(0, 8).map(item => `
      <div class="attention-item ${item.priority.toLowerCase()}">
        <span class="attention-icon">
          <i data-lucide="${item.type === 'academic' ? 'graduation-cap' : item.type === 'professional' ? 'briefcase' : item.type === 'goal' ? 'target' : 'alert-triangle'}"></i>
        </span>
        <div class="attention-content">
          <div class="attention-title">${item.title}</div>
          <div class="attention-desc">${item.desc}</div>
        </div>
        ${Utils.badge(item.priority, Utils.priorityBadgeClass(item.priority))}
      </div>
    `).join('');
  },

  renderTodayTasks(tasks) {
    const todayTasks = tasks.filter(t => {
      if (t.status === 'Completed') return false;
      const days = Utils.daysUntil(t.dueDate);
      return days !== null && days <= 1 && days >= -3;
    }).sort((a, b) => {
      const po = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return (po[a.priority] || 3) - (po[b.priority] || 3);
    });

    if (!todayTasks.length) {
      return '<div class="text-center p-4 text-secondary">No tasks due today. 🎉</div>';
    }

    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due</th>
            <th>Est. Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${todayTasks.map(t => `
            <tr>
              <td class="font-medium">${t.title}</td>
              <td>${Utils.badge(t.category, Utils.categoryBadgeClass(t.category))}</td>
              <td>${Utils.badge(t.priority, Utils.priorityBadgeClass(t.priority))}</td>
              <td class="mono">${Utils.relativeTime(t.dueDate)}</td>
              <td class="mono">${Utils.formatHours(t.estimatedTime)}</td>
              <td>${Utils.badge(t.status, Utils.statusBadgeClass(t.status))}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  renderMiniPipeline(applications) {
    const stages = ['Saved', 'Preparing', 'Applied', 'OA/Test', 'Interview', 'Final Round', 'Offer', 'Rejected'];
    const stageCounts = {};
    stages.forEach(s => stageCounts[s] = applications.filter(a => a.stage === s).length);

    return `
      <div class="flex gap-2 flex-wrap">
        ${stages.map(s => `
          <div class="flex items-center gap-1 px-3 py-2 rounded-md" style="background:var(--bg-secondary);${stageCounts[s] > 0 ? '' : 'opacity:0.4'}">
            <span class="font-mono text-sm font-bold" style="color:${s === 'Offer' ? 'var(--color-success)' : s === 'Rejected' ? 'var(--color-error)' : 'var(--accent)'}">${stageCounts[s]}</span>
            <span class="text-xs text-secondary">${s}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderUpcomingDeadlines(assignments, exams, projects, applications) {
    const deadlines = [];

    assignments.filter(a => {
      const days = Utils.daysUntil(a.deadline);
      return days !== null && days >= 0 && days <= 14 && a.status !== 'Graded';
    }).forEach(a => {
      deadlines.push({ title: a.title, date: a.deadline, type: 'Assignment', category: 'Academic' });
    });

    exams.filter(e => e.status === 'Upcoming').forEach(e => {
      deadlines.push({ title: `${e.subject} ${e.type}`, date: e.date, type: 'Exam', category: 'Academic' });
    });

    projects.forEach(p => {
      (p.milestones || []).filter(m => {
        const days = Utils.daysUntil(m.date);
        return days !== null && days >= 0 && days <= 14 && m.status !== 'Completed';
      }).forEach(m => {
        deadlines.push({ title: `${p.name}: ${m.title}`, date: m.date, type: 'Milestone', category: 'Project' });
      });
    });

    applications.filter(a => {
      const days = Utils.daysUntil(a.interviewDate);
      return days !== null && days >= 0 && days <= 14;
    }).forEach(a => {
      deadlines.push({ title: `${a.company} Interview`, date: a.interviewDate, type: 'Interview', category: 'Professional' });
    });

    deadlines.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!deadlines.length) {
      return '<div class="text-center p-4 text-secondary">No upcoming deadlines</div>';
    }

    return `
      <div class="timeline">
        ${deadlines.slice(0, 8).map(dl => `
          <div class="timeline-item">
            <div class="timeline-dot ${dl.category.toLowerCase()}"></div>
            <div class="timeline-time">${Utils.formatDate(dl.date, 'medium')}</div>
            <div class="timeline-content">${dl.title}</div>
            <div class="timeline-desc">
              ${Utils.badge(dl.type, Utils.categoryBadgeClass(dl.category))}
              <span class="text-xs text-muted" style="margin-left:8px">${Utils.relativeTime(dl.date)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  getTopPriorities() {
    const priorities = [];
    const tasks = Store.get('tasks');
    const assignments = Store.get('assignments');
    const exams = Store.get('exams');

    // Overdue items first
    const overdue = assignments.filter(a => a.status === 'Overdue');
    if (overdue.length) priorities.push(`Submit overdue: ${overdue[0].title}`);

    // Next exam prep
    const nextExam = exams.filter(e => e.status === 'Upcoming').sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    if (nextExam) priorities.push(`Prepare for ${nextExam.subject} ${nextExam.type}`);

    // Critical tasks
    const criticalTasks = tasks.filter(t => t.priority === 'Critical' && t.status !== 'Completed');
    if (criticalTasks.length) priorities.push(criticalTasks[0].title);

    // High priority tasks
    const highTasks = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed');
    if (highTasks.length && priorities.length < 3) priorities.push(highTasks[0].title);

    // Fill with upcoming assignments
    while (priorities.length < 3) {
      const remaining = assignments.filter(a => !['Graded', 'Submitted', 'Overdue'].includes(a.status));
      if (remaining.length) {
        remaining.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        const item = remaining.find(r => !priorities.includes(r.title));
        if (item) priorities.push(`Complete ${item.title}`);
        else break;
      } else break;
    }

    return priorities.slice(0, 3);
  },

  renderCharts() {
    // GPA Trend chart
    const courses = Store.get('courses');
    Charts.line('chart-gpa-trend', ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
      [{
        label: 'GPA',
        data: [3.55, 3.60, 3.62, 3.68, 3.65, 3.70, 3.72, 3.72],
        color: '#e2b714',
        fill: true
      }],
      { height: 180, beginAtZero: false, yScale: { min: 3.4, max: 4.0 } }
    );

    // Application Pipeline
    const apps = Store.get('applications');
    const stages = ['Saved', 'Preparing', 'Applied', 'OA/Test', 'Interview', 'Final Round', 'Offer', 'Rejected'];
    const stageCounts = stages.map(s => apps.filter(a => a.stage === s).length);
    Charts.bar('chart-app-pipeline', stages, [{
      label: 'Applications',
      data: stageCounts,
      colors: ['#64666980', '#64666980', '#e2b71480', '#e2831480', '#6eb4e280', '#b47ee280', '#7ec98480', '#ca475480']
    }], { height: 180 });

    // Productivity
    Charts.bar('chart-productivity',
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [{
        label: 'Study Hours',
        data: [4.5, 3.5, 5, 4, 3, 6, 2],
        color: '#e2b714'
      }, {
        label: 'Deep Work',
        data: [3, 2.5, 3.5, 2.5, 2, 4, 1.5],
        color: '#6eb4e2'
      }],
      { height: 180 }
    );
  }
};
