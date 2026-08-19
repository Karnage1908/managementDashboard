// ============================================
// SKILLS PAGE — Personal Skill Matrix & Gap Radar
// ============================================

const SkillsPage = {
  render(container) {
    const skills = Store.get('skills');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Skills Matrix & Gap Analysis</h1>
          <p class="page-subtitle">Evaluate current competency vs industry targets, certifications, and project evidence</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('skill')">
          <i data-lucide="plus"></i> Add Skill
        </button>
      </div>

      <!-- Radar Chart & Gap Summary -->
      <div class="dashboard-row cols-2 mb-6">
        <div class="card">
          <div class="card-header">
            <span class="card-title">Skill Gap Radar (Current vs Target)</span>
          </div>
          <div class="card-body">
            <div id="skills-radar-chart" class="chart-container" style="height:320px"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Top Skill Gaps</span>
          </div>
          <div class="card-body">
            ${skills.sort((a,b) => (b.targetLevel - b.currentLevel) - (a.targetLevel - a.currentLevel)).slice(0, 5).map(s => {
              const gap = s.targetLevel - s.currentLevel;
              return `
                <div class="mb-4">
                  <div class="flex justify-between items-center text-sm mb-1">
                    <span class="font-semibold">${s.name} <span class="text-xs text-muted">(${s.category})</span></span>
                    <span class="mono text-xs text-error">Gap: -${gap}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill warning" style="width: ${s.currentLevel}%"></div>
                  </div>
                  <div class="flex justify-between text-xs text-muted mt-1">
                    <span>Current: ${s.currentLevel}%</span>
                    <span>Target: ${s.targetLevel}%</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Detailed Skill Matrix Grid -->
      <div class="dashboard-row cols-3">
        ${skills.map(skill => `
          <div class="card">
            <div class="card-header">
              <span class="badge badge-accent">${skill.category}</span>
              <div class="flex gap-1">
                <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('skill', ${JSON.stringify(skill).replace(/"/g, '&quot;')})">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('skills', '${skill.id}', '${skill.name}')">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <h3 class="text-md font-bold mb-2">${skill.name}</h3>
              
              <div class="skill-bar">
                <div class="skill-bar-header">
                  <span class="text-xs text-secondary">Proficiency</span>
                  <span class="skill-bar-level">${skill.currentLevel}% / ${skill.targetLevel}%</span>
                </div>
                <div class="skill-bar-track">
                  <div class="skill-bar-current" style="width: ${skill.currentLevel}%"></div>
                  <div class="skill-bar-target" style="left: ${skill.targetLevel}%"></div>
                </div>
              </div>

              <div class="text-xs text-secondary mb-2">
                <span class="text-muted">Evidence: </span>
                ${(skill.evidence || []).join(', ') || 'Course projects'}
              </div>

              <div class="flex justify-between text-xs text-muted mt-3 pt-2" style="border-top:var(--border-subtle)">
                <span>Invested: ${skill.hoursInvested ? skill.hoursInvested + 'h' : '—'}</span>
                <span>Practiced: ${skill.lastPracticed ? Utils.relativeTime(skill.lastPracticed) : 'Recent'}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    setTimeout(() => this.renderRadarChart(skills), 100);
  },

  renderRadarChart(skills) {
    const topSkills = skills.slice(0, 6);
    Charts.radar('skills-radar-chart', topSkills.map(s => s.name), [
      { label: 'Current Level', data: topSkills.map(s => s.currentLevel), color: '#e2b714' },
      { label: 'Target Level', data: topSkills.map(s => s.targetLevel), color: '#6eb4e2' }
    ], { height: 300 });
  }
};
