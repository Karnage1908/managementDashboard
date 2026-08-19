// ============================================
// APPLICATIONS PAGE — Kanban & Table View
// ============================================

const ApplicationsPage = {
  viewMode: 'kanban', // 'kanban' | 'table'
  stages: ['Saved', 'Preparing', 'Applied', 'OA/Test', 'Interview', 'Final Round', 'Offer', 'Rejected'],

  render(container) {
    const applications = Store.get('applications');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Job & Internship Applications</h1>
          <p class="page-subtitle">Manage recruitment stages, referrals, online tests, and interviews</p>
        </div>
        <div class="flex gap-2">
          <div class="btn-group mr-2">
            <button class="btn btn-secondary btn-sm ${this.viewMode === 'kanban' ? 'active' : ''}" onclick="ApplicationsPage.switchView('kanban')">
              <i data-lucide="kanban"></i> Kanban
            </button>
            <button class="btn btn-secondary btn-sm ${this.viewMode === 'table' ? 'active' : ''}" onclick="ApplicationsPage.switchView('table')">
              <i data-lucide="table"></i> Table
            </button>
          </div>
          <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('application')">
            <i data-lucide="plus"></i> Add Application
          </button>
        </div>
      </div>

      <!-- Quick Funnel Stats -->
      <div class="dashboard-row cols-auto mb-6" style="grid-template-columns: repeat(4, 1fr);">
        <div class="kpi-card">
          <div class="kpi-label">Applied Total</div>
          <div class="kpi-value text-accent">${applications.length}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Interview Rate</div>
          <div class="kpi-value text-info">${Math.round((applications.filter(a => ['Interview', 'Final Round', 'Offer'].includes(a.stage)).length / (applications.length || 1)) * 100)}%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Active Next Actions</div>
          <div class="kpi-value text-warning">${applications.filter(a => a.nextAction && !['Rejected', 'Offer'].includes(a.stage)).length}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Offers</div>
          <div class="kpi-value text-success">${applications.filter(a => a.stage === 'Offer').length}</div>
        </div>
      </div>

      <!-- View Container -->
      <div id="applications-view-content">
        ${this.viewMode === 'kanban' ? this.renderKanban(applications) : this.renderTable(applications)}
      </div>
    `;
  },

  switchView(mode) {
    this.viewMode = mode;
    const content = document.getElementById('applications-view-content');
    const applications = Store.get('applications');
    if (content) {
      content.innerHTML = mode === 'kanban' ? this.renderKanban(applications) : this.renderTable(applications);
      lucide.createIcons();
    }
    document.querySelectorAll('.btn-group .btn').forEach(b => {
      b.classList.toggle('active', b.textContent.toLowerCase().includes(mode));
    });
  },

  renderKanban(applications) {
    return `
      <div class="kanban-board">
        ${this.stages.map(stage => {
          const stageApps = applications.filter(a => a.stage === stage);
          return `
            <div class="kanban-column" ondragover="event.preventDefault()" ondrop="ApplicationsPage.handleDrop(event, '${stage}')">
              <div class="kanban-column-header">
                <span class="kanban-column-title">${stage}</span>
                <span class="kanban-column-count">${stageApps.length}</span>
              </div>
              <div class="kanban-cards">
                ${stageApps.map(app => `
                  <div class="kanban-card" draggable="true" ondragstart="ApplicationsPage.handleDragStart(event, '${app.id}')">
                    <div class="flex justify-between items-start mb-1">
                      <span class="font-bold text-sm text-primary">${app.company}</span>
                      <div class="flex gap-1">
                        <button class="btn btn-ghost btn-sm" style="padding:2px" onclick="ModalSystem.openForm('application', ${JSON.stringify(app).replace(/"/g, '&quot;')})">
                          <i data-lucide="edit-2" style="width:12px;height:12px"></i>
                        </button>
                      </div>
                    </div>
                    <div class="text-xs text-secondary mb-2">${app.role}</div>
                    <div class="text-xs text-muted mb-2 flex items-center gap-1">
                      <i data-lucide="map-pin" style="width:12px;height:12px"></i> ${app.location || 'Remote'}
                    </div>
                    ${app.nextAction ? `
                      <div class="p-2 rounded-sm mb-2" style="background:var(--bg-secondary); border-left: 2px solid var(--accent); font-size: 11px;">
                        <span class="text-accent font-medium">Next:</span> ${app.nextAction}
                      </div>
                    ` : ''}
                    <div class="kanban-card-meta flex justify-between items-center text-xs text-muted">
                      <span>${app.applicationDate ? Utils.formatDate(app.applicationDate, 'short') : 'Not submitted'}</span>
                      ${app.referral ? '<span class="badge badge-accent" style="font-size:10px">Referral</span>' : ''}
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

  renderTable(applications) {
    return `
      <div class="card">
        <div class="card-body overflow-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Stage</th>
                <th>Date Applied</th>
                <th>Next Action</th>
                <th>Follow-up</th>
                <th>Interview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${applications.map(app => `
                <tr>
                  <td class="font-bold text-accent">${app.company}</td>
                  <td>${app.role}</td>
                  <td class="text-xs text-secondary">${app.location || '—'}</td>
                  <td>
                    <select class="form-select" style="padding:2px 8px;font-size:11px;width:auto;" onchange="ApplicationsPage.updateStage('${app.id}', this.value)">
                      ${this.stages.map(s => `<option value="${s}" ${app.stage === s ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                  </td>
                  <td class="mono">${app.applicationDate ? Utils.formatDate(app.applicationDate, 'short') : '—'}</td>
                  <td class="text-xs font-medium">${app.nextAction || '—'}</td>
                  <td class="mono">${app.followUpDate ? Utils.relativeTime(app.followUpDate) : '—'}</td>
                  <td class="mono">${app.interviewDate ? Utils.formatDate(app.interviewDate, 'short') : '—'}</td>
                  <td>
                    <div class="flex gap-1">
                      <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('application', ${JSON.stringify(app).replace(/"/g, '&quot;')})">
                        <i data-lucide="edit-2"></i>
                      </button>
                      <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('applications', '${app.id}', '${app.company}')">
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

  handleDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
  },

  handleDrop(e, newStage) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      Store.update('applications', id, { stage: newStage });
      this.switchView('kanban');
      App.showToast(`Application moved to ${newStage}`, 'info');
    }
  },

  updateStage(id, newStage) {
    Store.update('applications', id, { stage: newStage });
    App.showToast(`Stage updated to ${newStage}`, 'info');
  }
};
