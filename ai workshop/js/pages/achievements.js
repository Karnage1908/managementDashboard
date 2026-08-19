// ============================================
// ACHIEVEMENTS PAGE — Accomplishments & Portfolio Data
// ============================================

const AchievementsPage = {
  render(container) {
    const achievements = Store.get('achievements');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Achievements & Portfolio Evidence</h1>
          <p class="page-subtitle">Verified record of academic honors, hackathon placements, certifications, and leadership roles</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="AchievementsPage.exportResumeJson()">
            <i data-lucide="download"></i> Export Resume Dataset
          </button>
          <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('achievement')">
            <i data-lucide="plus"></i> Add Achievement
          </button>
        </div>
      </div>

      <!-- High-level Metric Cards -->
      <div class="dashboard-row cols-4 mb-6">
        <div class="kpi-card">
          <div class="kpi-icon success"><i data-lucide="trophy"></i></div>
          <div class="kpi-value">${achievements.length}</div>
          <div class="kpi-label">Recorded Wins</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon academic"><i data-lucide="award"></i></div>
          <div class="kpi-value">${achievements.filter(a => a.category === 'Academic').length}</div>
          <div class="kpi-label">Academic Honors</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon project"><i data-lucide="zap"></i></div>
          <div class="kpi-value">${achievements.filter(a => a.category === 'Hackathon').length}</div>
          <div class="kpi-label">Hackathons</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon professional"><i data-lucide="shield-check"></i></div>
          <div class="kpi-value">${achievements.filter(a => a.category === 'Certification').length}</div>
          <div class="kpi-label">Certifications</div>
        </div>
      </div>

      <!-- Achievement Timeline Grid -->
      <div class="dashboard-row cols-2">
        ${achievements.map(ach => `
          <div class="card">
            <div class="card-header">
              <span class="badge ${Utils.categoryBadgeClass(ach.category)}">${ach.category}</span>
              <div class="flex gap-1">
                <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('achievement', ${JSON.stringify(ach).replace(/"/g, '&quot;')})">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('achievements', '${ach.id}', '${ach.title}')">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <h3 class="text-md font-bold text-primary mb-1">${ach.title}</h3>
              <div class="mono text-xs text-muted mb-3">${Utils.formatDate(ach.date, 'medium')} (${Utils.relativeTime(ach.date)})</div>
              
              <p class="text-sm text-secondary mb-4">${ach.description}</p>
              
              <div class="p-3 rounded-md mb-3" style="background:var(--bg-secondary)">
                <div class="text-xs font-semibold text-muted mb-1">DEMONSTRATED COMPETENCIES</div>
                <div class="flex gap-1 flex-wrap">
                  ${(ach.skills || []).map(s => `<span class="badge badge-neutral" style="font-size:10px">${s}</span>`).join('')}
                </div>
              </div>

              ${ach.evidence ? `
                <div class="text-xs text-muted flex items-center gap-1">
                  <i data-lucide="link" style="width:12px;height:12px"></i>
                  <span>Evidence: <strong>${ach.evidence}</strong></span>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  exportResumeJson() {
    const achs = Store.get('achievements');
    const skills = Store.get('skills');
    const projects = Store.get('projects');
    const payload = {
      user: Store.getSettings().userName,
      academicGpa: Store.getSettings().gpa,
      skills: skills.map(s => ({ name: s.name, level: s.currentLevel })),
      projects: projects.map(p => ({ title: p.name, desc: p.description, status: p.status })),
      achievements: achs
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_dataset_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    App.showToast('Resume dataset exported', 'success');
  }
};
