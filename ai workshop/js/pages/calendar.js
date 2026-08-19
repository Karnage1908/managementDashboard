// ============================================
// CALENDAR PAGE — Unified Calendar & Schedule
// ============================================

const CalendarPage = {
  currentView: 'agenda', // 'month' | 'agenda'

  render(container) {
    const events = Store.get('events');
    const assignments = Store.get('assignments');
    const exams = Store.get('exams');

    // Combine all events & deadlines
    const allSchedule = [
      ...events.map(e => ({ title: e.title, date: e.date, category: e.category, type: e.type || 'Event' })),
      ...assignments.map(a => ({ title: `[Due] ${a.title}`, date: a.deadline, category: 'Academic', type: 'Assignment' })),
      ...exams.map(e => ({ title: `[Exam] ${e.subject}`, date: e.date, category: 'Academic', type: 'Exam' }))
    ].sort((a,b) => new Date(a.date) - new Date(b.date));

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Unified Schedule & Calendar</h1>
          <p class="page-subtitle">Synchronized timeline of lectures, exams, deadlines, interviews, and study sessions</p>
        </div>
        <div class="flex gap-2">
          <div class="btn-group mr-2">
            <button class="btn btn-secondary btn-sm ${this.currentView === 'agenda' ? 'active' : ''}" onclick="CalendarPage.switchView('agenda')">Agenda</button>
            <button class="btn btn-secondary btn-sm ${this.currentView === 'month' ? 'active' : ''}" onclick="CalendarPage.switchView('month')">Month</button>
          </div>
          <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('event')">
            <i data-lucide="plus"></i> Add Event
          </button>
        </div>
      </div>

      <!-- Schedule Content -->
      <div id="calendar-view-container">
        ${this.currentView === 'agenda' ? this.renderAgenda(allSchedule) : this.renderMonthView(allSchedule)}
      </div>
    `;
  },

  switchView(view) {
    this.currentView = view;
    const container = document.getElementById('page-content');
    if (container) this.render(container);
  },

  renderAgenda(items) {
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">Upcoming Agenda & Commitments</span>
          <span class="text-xs text-muted">${items.length} scheduled items</span>
        </div>
        <div class="card-body">
          <div class="timeline">
            ${items.map(item => `
              <div class="timeline-item">
                <div class="timeline-dot ${item.category ? item.category.toLowerCase() : ''}"></div>
                <div class="timeline-time">${Utils.formatDate(item.date, 'long')} ${item.date.includes('T') ? '· ' + Utils.formatTime(item.date) : ''}</div>
                <div class="timeline-content font-bold">${item.title}</div>
                <div class="timeline-desc">
                  <span class="badge ${Utils.categoryBadgeClass(item.category)}">${item.category}</span>
                  <span class="badge badge-neutral" style="margin-left:4px">${item.type}</span>
                  <span class="text-xs text-muted" style="margin-left:8px">${Utils.relativeTime(item.date)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderMonthView(items) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const daysInMonth = 30; // Clean calendar grid representation

    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${now.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div class="card-body p-0">
          <div class="calendar-grid">
            ${days.map(d => `<div class="calendar-day-header">${d}</div>`).join('')}
            ${Array.from({ length: 35 }).map((_, i) => {
              const dayNum = (i % 31) + 1;
              const isToday = dayNum === now.getDate() && i < 31;
              return `
                <div class="calendar-day ${isToday ? 'today' : ''}">
                  <div class="calendar-day-number">${dayNum}</div>
                  ${isToday ? `<div class="calendar-event academic">CS201 Lecture</div><div class="calendar-event exam">ML Quiz Prep</div>` : ''}
                  ${dayNum === 15 ? `<div class="calendar-event professional">Google Interview</div>` : ''}
                  ${dayNum === 22 ? `<div class="calendar-event deadline">AVL Tree Due</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
