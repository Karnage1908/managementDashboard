// ============================================
// ACADEMIC PAGE — Courses, Assignments, Exams, Analytics
// ============================================

const AcademicPage = {
  currentTab: 'courses',

  render(container) {
    const courses = Store.get('courses');
    const assignments = Store.get('assignments');
    const exams = Store.get('exams');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Academic Management</h1>
          <p class="page-subtitle">Track course progress, syllabus coverage, assignments, and examination readiness</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="ModalSystem.openForm('assignment')">
            <i data-lucide="plus"></i> Add Assignment
          </button>
          <button class="btn btn-secondary btn-sm" onclick="ModalSystem.openForm('course')">
            <i data-lucide="plus"></i> Add Course
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="dashboard-row cols-4 mb-6">
        <div class="kpi-card">
          <div class="kpi-icon academic"><i data-lucide="award"></i></div>
          <div class="kpi-value">${courses.length}</div>
          <div class="kpi-label">Active Courses</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon task"><i data-lucide="file-text"></i></div>
          <div class="kpi-value">${assignments.filter(a => a.status === 'In Progress' || a.status === 'Not Started').length}</div>
          <div class="kpi-label">Pending Assignments</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon danger"><i data-lucide="clock"></i></div>
          <div class="kpi-value">${exams.filter(e => e.status === 'Upcoming').length}</div>
          <div class="kpi-label">Upcoming Exams</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon success"><i data-lucide="check-circle"></i></div>
          <div class="kpi-value">${Math.round(courses.reduce((acc, c) => acc + (c.attendance || 0), 0) / (courses.length || 1))}%</div>
          <div class="kpi-label">Avg Attendance</div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs">
        <div class="tab ${this.currentTab === 'courses' ? 'active' : ''}" onclick="AcademicPage.switchTab('courses')">Courses</div>
        <div class="tab ${this.currentTab === 'assignments' ? 'active' : ''}" onclick="AcademicPage.switchTab('assignments')">Assignments</div>
        <div class="tab ${this.currentTab === 'exams' ? 'active' : ''}" onclick="AcademicPage.switchTab('exams')">Exams & Countdown</div>
        <div class="tab ${this.currentTab === 'analytics' ? 'active' : ''}" onclick="AcademicPage.switchTab('analytics')">Academic Analytics</div>
      </div>

      <!-- Tab Content Area -->
      <div id="academic-tab-content">
        ${this.renderActiveTab(courses, assignments, exams)}
      </div>
    `;

    if (this.currentTab === 'analytics') {
      setTimeout(() => this.renderAnalyticsCharts(), 100);
    }
  },

  switchTab(tabName) {
    this.currentTab = tabName;
    const content = document.getElementById('academic-tab-content');
    const courses = Store.get('courses');
    const assignments = Store.get('assignments');
    const exams = Store.get('exams');

    document.querySelectorAll('.tabs .tab').forEach(t => {
      t.classList.toggle('active', t.textContent.toLowerCase().includes(tabName));
    });

    if (content) {
      content.innerHTML = this.renderActiveTab(courses, assignments, exams);
      lucide.createIcons();
      if (tabName === 'analytics') {
        setTimeout(() => this.renderAnalyticsCharts(), 100);
      }
    }
  },

  renderActiveTab(courses, assignments, exams) {
    if (this.currentTab === 'courses') {
      return this.renderCoursesTab(courses);
    } else if (this.currentTab === 'assignments') {
      return this.renderAssignmentsTab(assignments);
    } else if (this.currentTab === 'exams') {
      return this.renderExamsTab(exams);
    } else {
      return this.renderAnalyticsTab(courses, assignments, exams);
    }
  },

  renderCoursesTab(courses) {
    return `
      <div class="dashboard-row cols-3">
        ${courses.map(course => `
          <div class="card">
            <div class="card-header">
              <div>
                <span class="badge badge-academic mb-2">${course.code}</span>
                <h3 class="text-md font-bold">${course.name}</h3>
                <span class="text-xs text-muted">Prof: ${course.professor} · ${course.credits} Credits</span>
              </div>
              <div class="table-actions" style="opacity: 1;">
                <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('course', ${JSON.stringify(course).replace(/"/g, '&quot;')})">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('courses', '${course.id}', '${course.name}')">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="stat-row">
                <span class="stat-label">Current Grade</span>
                <span class="stat-value text-accent">${course.currentGrade}% (Target: ${course.targetGrade}%)</span>
              </div>
              <div class="progress-bar mb-3">
                <div class="progress-bar-fill ${course.currentGrade >= course.targetGrade ? 'success' : 'warning'}" style="width: ${course.currentGrade}%"></div>
              </div>

              <div class="stat-row">
                <span class="stat-label">Attendance</span>
                <span class="stat-value">${course.attendance}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill ${course.attendance >= 85 ? 'success' : 'error'}" style="width: ${course.attendance}%"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderAssignmentsTab(assignments) {
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">All Course Assignments</span>
          <span class="text-xs text-muted">${assignments.length} total entries</span>
        </div>
        <div class="card-body overflow-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Deadline</th>
                <th>Weightage</th>
                <th>Expected / Actual</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${assignments.map(a => `
                <tr>
                  <td class="font-medium">${a.title}</td>
                  <td><span class="badge badge-academic">${a.course}</span></td>
                  <td class="mono ${Utils.isPast(a.deadline) && a.status !== 'Graded' && a.status !== 'Submitted' ? 'text-error' : ''}">
                    ${Utils.formatDate(a.deadline, 'medium')} (${Utils.relativeTime(a.deadline)})
                  </td>
                  <td class="mono">${a.weightage}%</td>
                  <td class="mono">${a.score != null ? a.score + '%' : (a.expectedScore ? '~' + a.expectedScore + '%' : '—')}</td>
                  <td><span class="badge ${Utils.statusBadgeClass(a.status)}">${a.status}</span></td>
                  <td>
                    <div class="flex gap-1">
                      <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('assignment', ${JSON.stringify(a).replace(/"/g, '&quot;')})">
                        <i data-lucide="edit-2"></i>
                      </button>
                      <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('assignments', '${a.id}', '${a.title}')">
                        <i data-lucide="trash-2"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderExamsTab(exams) {
    const upcoming = exams.filter(e => e.status === 'Upcoming').sort((a,b) => new Date(a.date) - new Date(b.date));
    const nextExam = upcoming[0];
    const countdown = nextExam ? Utils.countdown(nextExam.date) : null;

    return `
      ${nextExam ? `
        <div class="card mb-6" style="background: linear-gradient(135deg, rgba(226,183,20,0.08), rgba(202,71,84,0.05)); border: 1px solid var(--accent);">
          <div class="card-header">
            <span class="badge badge-warning">Next Exam Countdown</span>
            <span class="text-xs font-mono text-muted">${Utils.formatDate(nextExam.date, 'full')}</span>
          </div>
          <div class="card-body text-center">
            <h2 class="text-xl font-bold mb-2">${nextExam.subject} — ${nextExam.type}</h2>
            <p class="text-sm text-secondary mb-4">Syllabus Topics: ${nextExam.syllabusTopics}</p>
            <div class="countdown mb-4">
              <div class="countdown-unit">
                <div class="countdown-value">${countdown.days}</div>
                <div class="countdown-label">Days</div>
              </div>
              <div class="countdown-unit">
                <div class="countdown-value">${countdown.hours}</div>
                <div class="countdown-label">Hours</div>
              </div>
              <div class="countdown-unit">
                <div class="countdown-value">${countdown.minutes}</div>
                <div class="countdown-label">Mins</div>
              </div>
            </div>
            <div class="max-w-md mx-auto" style="max-width: 400px; margin: 0 auto;">
              <div class="progress-bar-label">
                <span>Preparation Completion</span>
                <span>${nextExam.preparationPercent}%</span>
              </div>
              ${Utils.progressBar(nextExam.preparationPercent, nextExam.preparationPercent >= 70 ? 'success' : 'warning')}
            </div>
          </div>
        </div>
      ` : ''}

      <div class="card">
        <div class="card-header">
          <span class="card-title">All Examinations</span>
        </div>
        <div class="card-body overflow-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Type</th>
                <th>Date</th>
                <th>Syllabus</th>
                <th>Prep %</th>
                <th>Target / Actual</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${exams.map(e => `
                <tr>
                  <td class="font-medium">${e.subject}</td>
                  <td>${Utils.badge(e.type, 'badge-neutral')}</td>
                  <td class="mono">${Utils.formatDate(e.date, 'medium')}</td>
                  <td class="text-xs text-secondary">${e.syllabusTopics}</td>
                  <td class="mono">
                    <div class="flex items-center gap-2">
                      <span>${e.preparationPercent}%</span>
                      <div class="progress-bar" style="width:60px">
                        <div class="progress-bar-fill ${e.preparationPercent >= 75 ? 'success' : 'warning'}" style="width:${e.preparationPercent}%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="mono">${e.targetScore}% / ${e.actualScore != null ? e.actualScore + '%' : '—'}</td>
                  <td><span class="badge ${e.status === 'Completed' ? 'badge-success' : 'badge-warning'}">${e.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderAnalyticsTab(courses, assignments, exams) {
    return `
      <div class="dashboard-row cols-2">
        <div class="card">
          <div class="card-header">
            <span class="card-title">GPA Progression Trend</span>
          </div>
          <div class="card-body">
            <div id="academic-chart-gpa" class="chart-container"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="card-title">Grade Distribution by Course</span>
          </div>
          <div class="card-body">
            <div id="academic-chart-grades" class="chart-container"></div>
          </div>
        </div>
      </div>

      <div class="dashboard-row cols-2 mt-4">
        <div class="card">
          <div class="card-header">
            <span class="card-title">Assignment Scores (Expected vs Actual)</span>
          </div>
          <div class="card-body">
            <div id="academic-chart-assignments" class="chart-container"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="card-title">Course Attendance Breakdown</span>
          </div>
          <div class="card-body">
            <div id="academic-chart-attendance" class="chart-container"></div>
          </div>
        </div>
      </div>
    `;
  },

  renderAnalyticsCharts() {
    const courses = Store.get('courses');
    const gradedAssignments = Store.get('assignments').filter(a => a.score != null || a.expectedScore != null);

    // GPA Trend
    Charts.line('academic-chart-gpa', ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5 (Current)'], [
      { label: 'GPA', data: [3.45, 3.58, 3.65, 3.70, 3.72], color: '#e2b714', fill: true }
    ], { height: 220, yScale: { min: 3.0, max: 4.0 } });

    // Grades Bar
    Charts.bar('academic-chart-grades', courses.map(c => c.code), [
      { label: 'Current Grade', data: courses.map(c => c.currentGrade), color: '#6eb4e2' },
      { label: 'Target Grade', data: courses.map(c => c.targetGrade), color: '#e2b714' }
    ], { height: 220 });

    // Assignments Expected vs Actual
    Charts.bar('academic-chart-assignments', gradedAssignments.slice(0, 5).map(a => Utils.truncate(a.title, 14)), [
      { label: 'Expected', data: gradedAssignments.slice(0, 5).map(a => a.expectedScore || 0), color: '#646669' },
      { label: 'Score', data: gradedAssignments.slice(0, 5).map(a => a.score || a.expectedScore || 0), color: '#7ec984' }
    ], { height: 220 });

    // Attendance Bar
    Charts.horizontalBar('academic-chart-attendance', courses.map(c => c.code), [
      { label: 'Attendance %', data: courses.map(c => c.attendance), color: '#7ee2c180' }
    ], { height: 220, max: 100 });
  }
};
