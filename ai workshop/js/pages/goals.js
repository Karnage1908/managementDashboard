// ============================================
// GOALS & MILESTONES PAGE — Hierarchical Goal System
// ============================================

const GoalsPage = {
  render(container) {
    const goals = Store.get('goals');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Goals & Strategic Milestones</h1>
          <p class="page-subtitle">Hierarchical alignment: Long-Term Vision → Yearly → Semester → Weekly Objectives</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('goal')">
          <i data-lucide="plus"></i> Add Goal
        </button>
      </div>

      <!-- High-level KPI Rings -->
      <div class="card mb-6">
        <div class="card-header">
          <span class="card-title">Strategic Goal Progress Rings</span>
        </div>
        <div class="card-body">
          <div class="flex flex-wrap gap-6 justify-around">
            ${goals.map(g => `
              <div class="flex flex-col items-center text-center">
                ${Utils.progressRing(g.progress, 75, 6, g.progress >= 70 ? 'var(--color-success)' : g.progress >= 40 ? 'var(--accent)' : 'var(--color-error)')}
                <div class="text-sm font-bold mt-2" style="max-width:140px">${g.title}</div>
                <div class="text-xs text-muted">${g.level}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Detailed Hierarchical Goal List -->
      <div class="dashboard-grid">
        ${goals.map(goal => `
          <div class="card">
            <div class="card-header">
              <div class="flex items-center gap-3">
                <span class="badge badge-accent">${goal.level}</span>
                <h3 class="text-md font-bold">${goal.title}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge ${Utils.priorityBadgeClass(goal.priority)}">${goal.priority}</span>
                <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('goal', ${JSON.stringify(goal).replace(/"/g, '&quot;')})">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('goals', '${goal.id}', '${goal.title}')">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <p class="text-sm text-secondary mb-3">${goal.target || 'No target description.'}</p>
              
              <div class="stat-row mb-2">
                <span class="stat-label">Metric Completion</span>
                <span class="stat-value text-accent">${goal.currentValue} / ${goal.targetValue} ${goal.unit || ''} (${goal.progress}%)</span>
              </div>
              <div class="progress-bar mb-4">
                <div class="progress-bar-fill ${goal.progress >= 75 ? 'success' : goal.progress >= 40 ? 'warning' : 'error'}" style="width: ${goal.progress}%"></div>
              </div>

              ${(goal.milestones && goal.milestones.length) ? `
                <div class="p-3 rounded-md mb-2" style="background:var(--bg-secondary)">
                  <div class="text-xs font-semibold text-muted mb-2">SUB-MILESTONES</div>
                  <div class="flex flex-col gap-1">
                    ${goal.milestones.map(m => `
                      <div class="flex items-center gap-2 text-xs text-secondary">
                        <i data-lucide="check" style="width:12px;height:12px;color:var(--color-success)"></i>
                        <span>${m}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="text-xs text-muted text-right">
                Target Deadline: ${goal.deadline ? Utils.formatDate(goal.deadline, 'medium') : 'Continuous'}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
