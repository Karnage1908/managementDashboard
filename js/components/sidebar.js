// ============================================
// SIDEBAR Component
// ============================================

const Sidebar = {
  collapsed: false,

  render() {
    const tasks = Store.get('tasks');
    const notifications = Store.get('notifications');
    const pendingTasks = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Graded').length;
    const unreadNotifs = notifications.filter(n => !n.read).length;

    return `
      <nav class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">C</div>
          <span class="sidebar-title">Command</span>
        </div>

        <div class="sidebar-nav">
          <div class="sidebar-section">
            <div class="sidebar-section-title">Dashboard</div>
            <div class="nav-item active" data-route="/overview" onclick="Router.navigate('/overview')">
              <span class="nav-item-icon"><i data-lucide="layout-dashboard"></i></span>
              <span class="nav-item-label">Overview</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Management</div>
            <div class="nav-item" data-route="/academic" onclick="Router.navigate('/academic')">
              <span class="nav-item-icon"><i data-lucide="graduation-cap"></i></span>
              <span class="nav-item-label">Academic</span>
            </div>
            <div class="nav-item" data-route="/professional" onclick="Router.navigate('/professional')">
              <span class="nav-item-icon"><i data-lucide="briefcase"></i></span>
              <span class="nav-item-label">Professional</span>
            </div>
            <div class="nav-item" data-route="/applications" onclick="Router.navigate('/applications')">
              <span class="nav-item-icon"><i data-lucide="send"></i></span>
              <span class="nav-item-label">Applications</span>
              <span class="nav-item-badge" style="background:var(--cat-professional);color:#fff">${Store.get('applications').filter(a => a.stage === 'Interview' || a.stage === 'Final Round').length || ''}</span>
            </div>
            <div class="nav-item" data-route="/projects" onclick="Router.navigate('/projects')">
              <span class="nav-item-icon"><i data-lucide="folder-kanban"></i></span>
              <span class="nav-item-label">Projects</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Tracking</div>
            <div class="nav-item" data-route="/tasks" onclick="Router.navigate('/tasks')">
              <span class="nav-item-icon"><i data-lucide="check-square"></i></span>
              <span class="nav-item-label">Tasks</span>
              ${pendingTasks ? `<span class="nav-item-badge">${pendingTasks}</span>` : ''}
            </div>
            <div class="nav-item" data-route="/calendar" onclick="Router.navigate('/calendar')">
              <span class="nav-item-icon"><i data-lucide="calendar"></i></span>
              <span class="nav-item-label">Calendar</span>
            </div>
            <div class="nav-item" data-route="/goals" onclick="Router.navigate('/goals')">
              <span class="nav-item-icon"><i data-lucide="target"></i></span>
              <span class="nav-item-label">Goals & Milestones</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Growth</div>
            <div class="nav-item" data-route="/skills" onclick="Router.navigate('/skills')">
              <span class="nav-item-icon"><i data-lucide="bar-chart-3"></i></span>
              <span class="nav-item-label">Skills</span>
            </div>
            <div class="nav-item" data-route="/achievements" onclick="Router.navigate('/achievements')">
              <span class="nav-item-icon"><i data-lucide="trophy"></i></span>
              <span class="nav-item-label">Achievements</span>
            </div>
            <div class="nav-item" data-route="/analytics" onclick="Router.navigate('/analytics')">
              <span class="nav-item-icon"><i data-lucide="trending-up"></i></span>
              <span class="nav-item-label">Analytics</span>
            </div>
          </div>

          <div class="sidebar-section">
            <div class="sidebar-section-title">Resources</div>
            <div class="nav-item" data-route="/documents" onclick="Router.navigate('/documents')">
              <span class="nav-item-icon"><i data-lucide="file-text"></i></span>
              <span class="nav-item-label">Documents</span>
            </div>
            <div class="nav-item" data-route="/settings" onclick="Router.navigate('/settings')">
              <span class="nav-item-icon"><i data-lucide="settings"></i></span>
              <span class="nav-item-label">Settings</span>
            </div>
          </div>
        </div>

        <div class="sidebar-footer">
          <div class="sidebar-toggle" onclick="Sidebar.toggle()">
            <span class="nav-item-icon"><i data-lucide="panel-left-close"></i></span>
            <span class="nav-item-label">Collapse</span>
          </div>
        </div>
      </nav>
    `;
  },

  toggle() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      this.collapsed = !this.collapsed;
      sidebar.classList.toggle('collapsed', this.collapsed);
    }
  },

  closeMobile() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  },

  openMobile() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    if (sidebar) sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
  }
};
