// ============================================
// OVERVIEW PAGE — Executive Cyber HUD Dashboard
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
    const activeCourses = courses.filter(c => c.status === 'Active').length || 6;
    const assignmentsDue = assignments.filter(a => {
      const days = Utils.daysUntil(a.deadline);
      return days !== null && days >= 0 && days <= 7 && a.status !== 'Graded' && a.status !== 'Submitted';
    }).length || 5;
    const upcomingExams = exams.filter(e => e.status === 'Upcoming').length || 3;
    const activeProjects = projects.filter(p => p.status === 'Active').length || 4;
    const activeApps = applications.filter(a => !['Rejected', 'Offer'].includes(a.stage)).length || 8;
    const pendingTasks = tasks.filter(t => !['Completed', 'Graded'].includes(t.status)).length || 20;
    const goalProgress = goals.length ? Math.round(goals.reduce((sum, g) => sum + (g.progress || 0), 0) / goals.length) : 52;

    container.innerHTML = `
      <div class="dashboard-grid">
        <!-- ROW 1: 10 KPI TELEMETRY METRIC CARDS -->
        <div class="dashboard-row cols-5">
          <!-- Card 1: GPA -->
          <div class="kpi-card animate-fade-in-up stagger-1" onclick="Router.navigate('/academic')">
            <div class="kpi-icon academic"><i data-lucide="graduation-cap"></i></div>
            <div class="kpi-value">${Utils.formatGpa(settings.gpa || 3.72)}</div>
            <div class="kpi-label">CURRENT GPA</div>
          </div>
          <!-- Card 2: Courses -->
          <div class="kpi-card animate-fade-in-up stagger-2" onclick="Router.navigate('/academic')">
            <div class="kpi-icon academic"><i data-lucide="book-open"></i></div>
            <div class="kpi-value">${activeCourses}</div>
            <div class="kpi-label">ACTIVE COURSES</div>
          </div>
          <!-- Card 3: Assignments Due -->
          <div class="kpi-card animate-fade-in-up stagger-3" onclick="Router.navigate('/academic')">
            <div class="kpi-icon"><i data-lucide="file-text"></i></div>
            <div class="kpi-value">${assignmentsDue}</div>
            <div class="kpi-label">ASSIGNMENTS DUE</div>
            <div class="kpi-sub">(This week)</div>
          </div>
          <!-- Card 4: Upcoming Exams -->
          <div class="kpi-card animate-fade-in-up stagger-4" onclick="Router.navigate('/academic')">
            <div class="kpi-icon"><i data-lucide="clipboard-check"></i></div>
            <div class="kpi-value">${upcomingExams}</div>
            <div class="kpi-label">UPCOMING EXAMS</div>
          </div>
          <!-- Card 5: Active Projects -->
          <div class="kpi-card animate-fade-in-up stagger-5" onclick="Router.navigate('/projects')">
            <div class="kpi-icon project"><i data-lucide="folder"></i></div>
            <div class="kpi-value">${activeProjects}</div>
            <div class="kpi-label">ACTIVE PROJECTS</div>
          </div>
        </div>

        <div class="dashboard-row cols-5">
          <!-- Card 6: Active Apps -->
          <div class="kpi-card animate-fade-in-up stagger-6" onclick="Router.navigate('/applications')">
            <div class="kpi-icon professional"><i data-lucide="contact"></i></div>
            <div class="kpi-value">${activeApps}</div>
            <div class="kpi-label">ACTIVE APPLICATIONS</div>
          </div>
          <!-- Card 7: Pending Tasks -->
          <div class="kpi-card animate-fade-in-up stagger-7" onclick="Router.navigate('/tasks')">
            <div class="kpi-icon"><i data-lucide="list"></i></div>
            <div class="kpi-value">${pendingTasks}</div>
            <div class="kpi-label">PENDING TASKS</div>
          </div>
          <!-- Card 8: Goal Completion -->
          <div class="kpi-card animate-fade-in-up stagger-8" onclick="Router.navigate('/goals')">
            <div class="kpi-icon success"><i data-lucide="pie-chart"></i></div>
            <div class="kpi-value">${goalProgress}%</div>
            <div class="kpi-label">GOAL COMPLETION</div>
          </div>
          <!-- Card 9: Semester -->
          <div class="kpi-card animate-fade-in-up stagger-9">
            <div class="kpi-icon"><i data-lucide="calendar"></i></div>
            <div class="kpi-value" style="font-size:var(--fs-xl);margin-top:2px">${settings.currentSemester || 'Fall 2026'}</div>
            <div class="kpi-label">CURRENT SEMESTER</div>
          </div>
          <!-- Card 10: Streak -->
          <div class="kpi-card animate-fade-in-up stagger-10">
            <div class="kpi-icon success"><i data-lucide="calendar-check"></i></div>
            <div class="kpi-value">${settings.productivityStreak || 12}</div>
            <div class="kpi-label">DAY STREAK</div>
          </div>
        </div>

        <!-- ROW 2: TODAY'S SCHEDULE + NEEDS ATTENTION -->
        <div class="dashboard-row cols-3-2">
          <!-- Today's Schedule -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">TODAY'S SCHEDULE</span>
              <span class="card-action" onclick="Router.navigate('/calendar')">•••</span>
            </div>
            <div class="card-body">
              ${this.renderHorizontalSchedule(events)}
            </div>
          </div>

          <!-- Needs Attention -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">NEEDS ATTENTION</span>
              <span class="card-action">•••</span>
            </div>
            <div class="card-body" style="max-height: 240px; overflow-y: auto;">
              ${this.renderAttentionPanel(tasks, assignments, exams, applications, projects, goals)}
            </div>
          </div>
        </div>

        <!-- ROW 3: TODAY'S TASKS -->
        <div class="dashboard-row">
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">TODAY'S TASKS</span>
              <span class="card-action" onclick="Router.navigate('/tasks')">•••</span>
            </div>
            <div class="card-body">
              ${this.renderTodayTasks(tasks)}
            </div>
          </div>
        </div>

        <!-- ROW 4: ACADEMIC PROGRESS + APPLICATION PIPELINE + ACTIVE PROJECTS -->
        <div class="dashboard-row cols-3">
          <!-- Academic Progress -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">ACADEMIC PROGRESS</span>
              <span class="card-action" onclick="Router.navigate('/academic')">•••</span>
            </div>
            <div class="card-body">
              <div id="chart-gpa-trend" class="chart-container" style="height:190px"></div>
            </div>
          </div>

          <!-- Application Pipeline -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">APPLICATION PIPELINE</span>
              <span class="card-action" onclick="Router.navigate('/applications')">•••</span>
            </div>
            <div class="card-body">
              ${this.renderPipelineVisual(applications)}
            </div>
          </div>

          <!-- Active Projects -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">ACTIVE PROJECTS</span>
              <span class="card-action" onclick="Router.navigate('/projects')">•••</span>
            </div>
            <div class="card-body">
              ${projects.slice(0, 4).map(p => `
                <div style="margin-bottom:var(--sp-3)">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-medium">${p.name}</span>
                    <span class="text-xs font-mono text-secondary">${p.completion}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill success" style="width:${p.completion}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- ROW 5: GOAL PROGRESS + PRODUCTIVITY + UPCOMING DEADLINES -->
        <div class="dashboard-row cols-3">
          <!-- Goal Progress -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">GOAL PROGRESS</span>
              <span class="card-action" onclick="Router.navigate('/goals')">•••</span>
            </div>
            <div class="card-body">
              <div class="flex items-center gap-4 mb-4">
                ${Utils.progressRing(goalProgress, 74, 6, 'var(--accent)')}
                <div class="flex-1">
                  <div class="text-xs text-secondary mb-1">Strategic Completion</div>
                  <div class="text-sm font-bold text-accent">${goalProgress}% of Key Milestones</div>
                  <div class="text-xs text-muted">On track for Semester Goals</div>
                </div>
              </div>
              ${goals.slice(0, 2).map(g => `
                <div style="margin-bottom:var(--sp-2)">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="truncate">${g.title}</span>
                    <span class="font-mono text-accent">${g.progress}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill success" style="width:${g.progress}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Productivity -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">PRODUCTIVITY</span>
              <span class="card-action" onclick="Router.navigate('/analytics')">•••</span>
            </div>
            <div class="card-body">
              <div id="chart-productivity" class="chart-container" style="height:190px"></div>
            </div>
          </div>

          <!-- Upcoming Deadlines -->
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <span class="card-title">UPCOMING DEADLINES</span>
              <span class="card-action">•••</span>
            </div>
            <div class="card-body">
              ${this.renderUpcomingDeadlinesList(assignments, exams, projects)}
            </div>
          </div>
        </div>
      </div>
    `;

    // Render charts after DOM insertion
    setTimeout(() => this.renderCharts(), 60);
    if (window.lucide) lucide.createIcons();
  },

  renderHorizontalSchedule(events) {
    const defaultSchedule = [
      { time: '09:00 AM', title: 'Data Structures Lecture' },
      { time: '11:00 AM', title: 'Machine Learning Lecture', active: true },
      { time: '01:00 PM', title: 'Linear Algebra' },
      { time: '03:00 PM', title: 'DBMS Lab' }
    ];

    return `
      <div class="schedule-track">
        ${defaultSchedule.map((node) => `
          <div class="schedule-node">
            ${node.active ? `
              <div class="schedule-node-top">
                <div class="text-xs font-mono text-accent flex items-center gap-1">
                  <i data-lucide="video" style="width:12px;height:12px"></i> ${node.time}
                </div>
                <div class="text-xs font-bold">${node.title}</div>
              </div>
            ` : ''}
            <div class="schedule-node-dot" style="${node.active ? 'background:var(--accent);box-shadow:0 0 12px var(--accent)' : ''}"></div>
            <div class="schedule-node-time">${node.time}</div>
            <div class="schedule-node-title">${node.title}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderAttentionPanel(tasks, assignments, exams, applications, projects, goals) {
    const items = [
      { title: 'Binary Tree Implementation', desc: 'Due in 2 days', priority: 'High', type: 'academic' },
      { title: 'Google - Interview', desc: 'Prepare for technical', priority: 'High', type: 'professional' },
      { title: 'Microsoft - OA/Test', desc: 'Complete assessment', priority: 'Medium', type: 'professional' },
      { title: 'Meta - Final Round', desc: 'Prepare design interview', priority: 'Medium', type: 'professional' }
    ];

    return items.map(item => `
      <div class="attention-item ${item.priority.toLowerCase()}">
        <span class="attention-icon">
          <i data-lucide="alert-triangle" style="width:16px;height:16px"></i>
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
    const sampleTasks = [
      { title: 'Complete AVL tree implementation', category: 'Academic', priority: 'High', due: 'In 2 days', time: '3h', status: 'In Progress' },
      { title: 'Review ML lecture notes', category: 'Academic', priority: 'High', due: 'Tomorrow', time: '2h', status: 'Todo' },
      { title: 'Mock interview prep', category: 'Professional', priority: 'High', due: 'In 2 days', time: '2h', status: 'Todo' },
      { title: 'Follow up with Microsoft recruiter', category: 'Professional', priority: 'High', due: 'Tomorrow', time: '30m', status: 'Todo' },
      { title: 'Team meeting for ML project', category: 'Project', priority: 'High', due: 'Tomorrow', time: '1h', status: 'Todo' },
      { title: 'LeetCode daily practice', category: 'Professional', priority: 'Medium', due: 'Today', time: '1.5h', status: 'Todo' },
      { title: 'Review PR for ML project', category: 'Project', priority: 'Medium', due: 'Tomorrow', time: '1h', status: 'Todo' },
      { title: 'Weekly planner review', category: 'Personal', priority: 'Medium', due: 'Today', time: '30m', status: 'Todo' },
      { title: 'Submit DBMS assignment', category: 'Academic', priority: 'Critical', due: 'Yesterday', time: '2h', status: 'Overdue' },
      { title: 'Gym workout', category: 'Personal', priority: 'Low', due: 'Today', time: '1.5h', status: 'Todo' }
    ];

    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>TASK</th>
            <th>CATEGORY</th>
            <th>PRIORITY</th>
            <th>DUE</th>
            <th>EST. TIME</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${sampleTasks.map(t => `
            <tr>
              <td class="font-medium">${t.title}</td>
              <td>${Utils.badge(t.category, Utils.categoryBadgeClass(t.category))}</td>
              <td>${Utils.badge(t.priority, Utils.priorityBadgeClass(t.priority))}</td>
              <td class="mono">${t.due}</td>
              <td class="mono">${t.time}</td>
              <td>${Utils.badge(t.status, Utils.statusBadgeClass(t.status))}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  renderPipelineVisual(applications) {
    return `
      <div class="flex flex-col gap-3 py-2">
        <div class="flex items-center justify-between p-2 rounded-md" style="background:rgba(0,255,157,0.04);border:1px solid rgba(0,255,157,0.15)">
          <div class="flex items-center gap-2">
            <span class="dot-accent"></span>
            <span class="text-xs font-semibold">Application Pipeline</span>
          </div>
          <span class="badge badge-accent">8 Active</span>
        </div>
        <div class="flex items-center justify-center gap-2 py-3">
          <div class="text-center p-2 rounded-md flex-1" style="background:var(--bg-secondary);border:1px solid var(--border-subtle)">
            <div class="text-sm font-bold font-mono text-accent">3</div>
            <div class="text-xs text-secondary">Applied</div>
          </div>
          <span class="text-muted">→</span>
          <div class="text-center p-2 rounded-md flex-1" style="background:var(--bg-secondary);border:1px solid var(--border-subtle)">
            <div class="text-sm font-bold font-mono text-accent">2</div>
            <div class="text-xs text-secondary">OA/Test</div>
          </div>
          <span class="text-muted">→</span>
          <div class="text-center p-2 rounded-md flex-1" style="background:var(--bg-secondary);border:1px solid var(--accent)">
            <div class="text-sm font-bold font-mono text-accent">2</div>
            <div class="text-xs text-accent font-semibold">Interview</div>
          </div>
          <span class="text-muted">→</span>
          <div class="text-center p-2 rounded-md flex-1" style="background:var(--bg-secondary);border:1px solid var(--border-subtle)">
            <div class="text-sm font-bold font-mono text-accent">1</div>
            <div class="text-xs text-secondary">Final</div>
          </div>
        </div>
      </div>
    `;
  },

  renderUpcomingDeadlinesList(assignments, exams, projects) {
    const list = [
      { title: 'Remaining 3.7h', due: 'Today', progress: 85 },
      { title: 'Remaining 5, 6', due: 'Today', progress: 60 },
      { title: 'Upcoming 8, 3', due: 'Today', progress: 40 },
      { title: 'Upcoming 1.5h', due: 'Today', progress: 20 }
    ];

    return `
      <div>
        ${list.map(item => `
          <div style="margin-bottom:var(--sp-3)">
            <div class="flex justify-between text-xs mb-1">
              <span class="font-medium">${item.title}</span>
              <span class="font-mono text-secondary">${item.due}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill success" style="width:${item.progress}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderCharts() {
    // Dual neon green smooth curves for Academic Progress
    Charts.line('chart-gpa-trend',
      ['Jan', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      [
        {
          label: 'Progress A',
          data: [60, 120, 220, 180, 240, 280],
          color: '#00ff9d',
          fill: true
        },
        {
          label: 'Progress B',
          data: [30, 80, 110, 90, 160, 210],
          color: '#00e5ff',
          fill: false
        }
      ],
      { height: 180, beginAtZero: true, yScale: { min: 0, max: 300 } }
    );

    // Productivity Histogram (Mon-Sat)
    Charts.bar('chart-productivity',
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      [
        {
          label: 'Deep Work',
          data: [4, 5.5, 6, 8, 6.5, 9],
          color: '#00ff9d'
        },
        {
          label: 'Study',
          data: [2, 3, 2.5, 3.5, 2, 4],
          color: '#00e5ff'
        }
      ],
      { height: 180 }
    );
  }
};
