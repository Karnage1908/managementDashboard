// ============================================
// PROFESSIONAL PAGE — Career Goals & Strategy
// ============================================

const ProfessionalPage = {
  render(container) {
    const applications = Store.get('applications');
    const skills = Store.get('skills');
    const goals = Store.get('goals').filter(g => g.priority === 'Critical' || g.level === 'Yearly');

    const totalApps = applications.length;
    const activeApps = applications.filter(a => !['Rejected', 'Offer'].includes(a.stage)).length;
    const interviews = applications.filter(a => ['Interview', 'Final Round'].includes(a.stage)).length;
    const offers = applications.filter(a => a.stage === 'Offer').length;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Professional & Career Strategy</h1>
          <p class="page-subtitle">Align career trajectories, industry targets, skill gaps, and interview prep</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-primary btn-sm" onclick="Router.navigate('/applications')">
            <i data-lucide="kanban"></i> Open Applications Pipeline
          </button>
          <button class="btn btn-secondary btn-sm" onclick="ModalSystem.openForm('application')">
            <i data-lucide="plus"></i> Add Application
          </button>
        </div>
      </div>

      <!-- High-level KPI Row -->
      <div class="dashboard-row cols-4 mb-6">
        <div class="kpi-card" onclick="Router.navigate('/applications')">
          <div class="kpi-icon professional"><i data-lucide="send"></i></div>
          <div class="kpi-value">${totalApps}</div>
          <div class="kpi-label">Total Applications</div>
        </div>
        <div class="kpi-card" onclick="Router.navigate('/applications')">
          <div class="kpi-icon task"><i data-lucide="loader"></i></div>
          <div class="kpi-value">${activeApps}</div>
          <div class="kpi-label">In Pipeline</div>
        </div>
        <div class="kpi-card" onclick="Router.navigate('/applications')">
          <div class="kpi-icon academic"><i data-lucide="video"></i></div>
          <div class="kpi-value">${interviews}</div>
          <div class="kpi-label">Active Interviews</div>
        </div>
        <div class="kpi-card" onclick="Router.navigate('/applications')">
          <div class="kpi-icon success"><i data-lucide="party-popper"></i></div>
          <div class="kpi-value">${offers}</div>
          <div class="kpi-label">Offers Received</div>
        </div>
      </div>

      <!-- Career Profile & Target Persona -->
      <div class="dashboard-row cols-3-2 mb-6">
        <div class="card">
          <div class="card-header">
            <span class="card-title">🎯 Career Profile & Target Blueprint</span>
            <span class="badge badge-accent">2027 Grad Target</span>
          </div>
          <div class="card-body">
            <div class="dashboard-row cols-2 mb-4">
              <div class="p-3 rounded-md" style="background:var(--bg-secondary)">
                <span class="text-xs text-muted">TARGET ROLE</span>
                <div class="text-md font-bold text-primary mt-1">Full-Stack / ML Systems Engineer</div>
              </div>
              <div class="p-3 rounded-md" style="background:var(--bg-secondary)">
                <span class="text-xs text-muted">TARGET COMPENSATION</span>
                <div class="text-md font-bold text-accent mt-1">$140k - $175k / yr</div>
              </div>
              <div class="p-3 rounded-md" style="background:var(--bg-secondary)">
                <span class="text-xs text-muted">PREFERRED LOCATIONS</span>
                <div class="text-md font-bold text-primary mt-1">San Francisco, Bay Area, NYC, Remote</div>
              </div>
              <div class="p-3 rounded-md" style="background:var(--bg-secondary)">
                <span class="text-xs text-muted">DESIRED INDUSTRIES</span>
                <div class="text-md font-bold text-primary mt-1">AI/ML Infra, Cloud, FinTech, Autonomous Tech</div>
              </div>
            </div>

            <h4 class="text-sm font-semibold mb-2">Target Tier-1 Companies</h4>
            <div class="flex gap-2 flex-wrap mb-4">
              <span class="badge badge-neutral">Google</span>
              <span class="badge badge-neutral">Meta</span>
              <span class="badge badge-neutral">Apple</span>
              <span class="badge badge-neutral">Microsoft</span>
              <span class="badge badge-neutral">Stripe</span>
              <span class="badge badge-neutral">Databricks</span>
              <span class="badge badge-neutral">OpenAI</span>
              <span class="badge badge-neutral">Anthropic</span>
            </div>

            <h4 class="text-sm font-semibold mb-2">Key Competency Gaps to Close</h4>
            <div class="skill-bar">
              <div class="skill-bar-header">
                <span class="skill-bar-name">System Design & Distributed Scalability</span>
                <span class="skill-bar-level">40% / 75% Target</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill warning" style="width: 40%"></div>
              </div>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-header">
                <span class="skill-bar-name">AWS Cloud Architectures</span>
                <span class="skill-bar-level">35% / 75% Target</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill error" style="width: 35%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">💼 Career Milestones</span>
            <span class="card-action" onclick="Router.navigate('/goals')">View Goals →</span>
          </div>
          <div class="card-body">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot professional"></div>
                <div class="timeline-time">Current Stage</div>
                <div class="timeline-content font-semibold">Summer Internship Recruiting Season</div>
                <div class="timeline-desc">Secured 1 offer (Airbnb), in technical rounds with Google and Meta.</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot project"></div>
                <div class="timeline-time">Next 60 Days</div>
                <div class="timeline-content font-semibold">Ship Portfolio & Research Paper Draft</div>
                <div class="timeline-desc">Build strong external evidence to strengthen final internship selection.</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot academic"></div>
                <div class="timeline-time">Year 2026-2027</div>
                <div class="timeline-content font-semibold">AWS Solutions Architect + 300 LeetCode</div>
                <div class="timeline-desc">Establish solid foundation for full-time new grad placement.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actionable Application Watchlist -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">🔥 High Priority Opportunities</span>
          <span class="card-action" onclick="Router.navigate('/applications')">View Full Kanban →</span>
        </div>
        <div class="card-body overflow-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Stage</th>
                <th>Next Action</th>
                <th>Follow-up / Interview</th>
                <th>Referral</th>
              </tr>
            </thead>
            <tbody>
              ${applications.filter(a => ['Interview', 'Final Round', 'OA/Test', 'Offer'].includes(a.stage)).map(a => `
                <tr>
                  <td class="font-bold text-accent">${a.company}</td>
                  <td>${a.role}</td>
                  <td><span class="badge ${Utils.statusBadgeClass(a.stage)}">${a.stage}</span></td>
                  <td class="text-sm font-medium">${a.nextAction || '—'}</td>
                  <td class="mono">${a.interviewDate ? Utils.formatDate(a.interviewDate, 'medium') + ' (Interview)' : (a.followUpDate ? Utils.relativeTime(a.followUpDate) + ' (Action)' : '—')}</td>
                  <td class="text-xs text-muted">${a.referral || 'Direct apply'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
