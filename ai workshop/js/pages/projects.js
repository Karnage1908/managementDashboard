// ============================================
// PROJECTS PAGE — List, Kanban, and Timeline Views
// ============================================

const ProjectsPage = {
  viewMode: 'list', // 'list' | 'kanban' | 'timeline'

  render(container) {
    const projects = Store.get('projects');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Project Management</h1>
          <p class="page-subtitle">Track academic, professional, and personal engineering initiatives</p>
        </div>
        <div class="flex gap-2">
          <div class="btn-group mr-2">
            <button class="btn btn-secondary btn-sm ${this.viewMode === 'list' ? 'active' : ''}" onclick="ProjectsPage.switchView('list')">
              <i data-lucide="list"></i> List
            </button>
            <button class="btn btn-secondary btn-sm ${this.viewMode === 'kanban' ? 'active' : ''}" onclick="ProjectsPage.switchView('kanban')">
              <i data-lucide="kanban"></i> Kanban
            </button>
            <button class="btn btn-secondary btn-sm ${this.viewMode === 'timeline' ? 'active' : ''}" onclick="ProjectsPage.switchView('timeline')">
              <i data-lucide="git-branch"></i> Timeline
            </button>
          </div>
          <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('project')">
            <i data-lucide="plus"></i> Add Project
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="dashboard-row cols-4 mb-6">
        <div class="kpi-card">
          <div class="kpi-icon project"><i data-lucide="folder"></i></div>
          <div class="kpi-value">${projects.length}</div>
          <div class="kpi-label">Total Projects</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon academic"><i data-lucide="play"></i></div>
          <div class="kpi-value">${projects.filter(p => p.status === 'Active').length}</div>
          <div class="kpi-label">Active Sprints</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon success"><i data-lucide="check"></i></div>
          <div class="kpi-value">${projects.filter(p => p.status === 'Completed').length}</div>
          <div class="kpi-label">Completed</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon task"><i data-lucide="percent"></i></div>
          <div class="kpi-value">${Math.round(projects.reduce((acc, p) => acc + (p.completion || 0), 0) / (projects.length || 1))}%</div>
          <div class="kpi-label">Avg Completion</div>
        </div>
      </div>

      <!-- Main Content -->
      <div id="projects-view-content">
        ${this.renderActiveView(projects)}
      </div>
    `;
  },

  switchView(mode) {
    this.viewMode = mode;
    const content = document.getElementById('projects-view-content');
    const projects = Store.get('projects');
    if (content) {
      content.innerHTML = this.renderActiveView(projects);
      lucide.createIcons();
    }
    document.querySelectorAll('.btn-group .btn').forEach(b => {
      b.classList.toggle('active', b.textContent.toLowerCase().includes(mode));
    });
  },

  renderActiveView(projects) {
    if (this.viewMode === 'list') return this.renderListView(projects);
    if (this.viewMode === 'kanban') return this.renderKanbanView(projects);
    return this.renderTimelineView(projects);
  },

  renderListView(projects) {
    return `
      <div class="dashboard-grid">
        ${projects.map(project => `
          <div class="card">
            <div class="card-header">
              <div class="flex items-center gap-3">
                <span class="badge ${Utils.categoryBadgeClass(project.category)}">${project.category}</span>
                <h3 class="text-md font-bold">${project.name}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge ${Utils.statusBadgeClass(project.status)}">${project.status}</span>
                <span class="badge ${Utils.priorityBadgeClass(project.priority)}">${project.priority}</span>
                <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('project', ${JSON.stringify(project).replace(/"/g, '&quot;')})">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('projects', '${project.id}', '${project.name}')">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-sm text-secondary mb-3">${project.description || project.objective || 'No description provided.'}</p>
              
              <div class="progress-bar-label">
                <span>Overall Milestone Completion</span>
                <span>${project.completion}%</span>
              </div>
              <div class="progress-bar mb-4">
                <div class="progress-bar-fill ${project.completion >= 75 ? 'success' : 'warning'}" style="width: ${project.completion}%"></div>
              </div>

              <!-- Milestones Breakdown -->
              <div class="p-3 rounded-md mb-3" style="background: var(--bg-secondary);">
                <div class="text-xs font-semibold text-muted mb-2">MILESTONES & DELIVERABLES</div>
                <div class="flex flex-col gap-2">
                  ${(project.milestones || []).map(m => `
                    <div class="flex justify-between items-center text-xs">
                      <span class="flex items-center gap-2">
                        <i data-lucide="${m.status === 'Completed' ? 'check-circle' : 'circle'}" style="width:14px;height:14px;color:${m.status === 'Completed' ? 'var(--color-success)' : 'var(--text-muted)'}"></i>
                        <span class="${m.status === 'Completed' ? 'text-muted' : 'text-primary font-medium'}">${m.title}</span>
                      </span>
                      <span class="mono text-muted">${m.date ? Utils.formatDate(m.date, 'short') : ''}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="flex justify-between items-center text-xs text-muted">
                <span>Deadline: ${project.deadline ? Utils.formatDate(project.deadline, 'medium') : 'Open-ended'}</span>
                ${project.repository ? `<a href="https://${project.repository}" target="_blank" class="flex items-center gap-1 text-accent"><i data-lucide="github" style="width:12px;height:12px"></i> Repo</a>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderKanbanView(projects) {
    const statuses = ['Planning', 'Active', 'Blocked', 'Completed', 'Archived'];
    return `
      <div class="kanban-board">
        ${statuses.map(status => {
          const group = projects.filter(p => p.status === status);
          return `
            <div class="kanban-column">
              <div class="kanban-column-header">
                <span class="kanban-column-title">${status}</span>
                <span class="kanban-column-count">${group.length}</span>
              </div>
              <div class="kanban-cards">
                ${group.map(p => `
                  <div class="kanban-card">
                    <div class="text-sm font-bold mb-1">${p.name}</div>
                    <div class="text-xs text-secondary mb-2">${Utils.truncate(p.description, 40)}</div>
                    <div class="progress-bar mb-2">
                      <div class="progress-bar-fill" style="width:${p.completion}%"></div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                      <span class="badge ${Utils.categoryBadgeClass(p.category)}">${p.category}</span>
                      <span class="mono text-muted">${p.completion}%</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderTimelineView(projects) {
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">Project Sprint Timelines & Milestones</span>
        </div>
        <div class="card-body">
          <div class="timeline">
            ${projects.map(p => `
              <div class="timeline-item">
                <div class="timeline-dot ${p.category.toLowerCase()}"></div>
                <div class="timeline-time">${Utils.formatDate(p.startDate, 'short')} → ${Utils.formatDate(p.deadline, 'short')}</div>
                <div class="timeline-content font-bold">${p.name} (${p.completion}% complete)</div>
                <div class="timeline-desc">
                  ${(p.milestones || []).map(m => `• ${m.title} (${m.status})`).join(' ')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};
