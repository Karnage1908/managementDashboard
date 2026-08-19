// ============================================
// SIDEBAR Component — Cyber Terminal Navigation
// ============================================

const Sidebar = {
  collapsed: false,

  render() {
    const tasks = Store.get('tasks');
    const pendingTasks = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Graded').length;

    return `
      <nav class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <i data-lucide="terminal" style="width:18px;height:18px;stroke-width:2.5"></i>
          </div>
          <span class="sidebar-title">Command</span>
        </div>

        <div class="sidebar-nav">
          <div class="sidebar-section">
            <div class="nav-item active" data-route="/overview" onclick="Router.navigate('/overview')">
              <span class="nav-item-icon"><i data-lucide="terminal"></i></span>
              <span class="nav-item-label">Overview</span>
            </div>
            <div class="nav-item" data-route="/academic" onclick="Router.navigate('/academic')">
              <span class="nav-item-icon"><i data-lucide="graduation-cap"></i></span>
              <span class="nav-item-label">Academic</span>
            </div>
            <div class="nav-item" data-route="/professional" onclick="Router.navigate('/professional')">
              <span class="nav-item-icon"><i data-lucide="briefcase"></i></span>
              <span class="nav-item-label">Professional</span>
            </div>
            <div class="nav-item" data-route="/applications" onclick="Router.navigate('/applications')">
              <span class="nav-item-icon"><i data-lucide="file-check-2"></i></span>
              <span class="nav-item-label">Applications</span>
            </div>
            <div class="nav-item" data-route="/projects" onclick="Router.navigate('/projects')">
              <span class="nav-item-icon"><i data-lucide="folder"></i></span>
              <span class="nav-item-label">Projects</span>
            </div>
            <div class="nav-item" data-route="/tasks" onclick="Router.navigate('/tasks')">
              <span class="nav-item-icon"><i data-lucide="list"></i></span>
              <span class="nav-item-label">Tasks</span>
            </div>
            <div class="nav-item" data-route="/calendar" onclick="Router.navigate('/calendar')">
              <span class="nav-item-icon"><i data-lucide="calendar"></i></span>
              <span class="nav-item-label">Calendar</span>
            </div>
            <div class="nav-item" data-route="/goals" onclick="Router.navigate('/goals')">
              <span class="nav-item-icon"><i data-lucide="target"></i></span>
              <span class="nav-item-label">Goals & Milestones</span>
            </div>
            <div class="nav-item" data-route="/skills" onclick="Router.navigate('/skills')">
              <span class="nav-item-icon"><i data-lucide="mortarboard"></i></span>
              <span class="nav-item-label">Skills</span>
            </div>
            <div class="nav-item" data-route="/achievements" onclick="Router.navigate('/achievements')">
              <span class="nav-item-icon"><i data-lucide="trophy"></i></span>
              <span class="nav-item-label">Achievements</span>
            </div>
            <div class="nav-item" data-route="/analytics" onclick="Router.navigate('/analytics')">
              <span class="nav-item-icon"><i data-lucide="bar-chart-2"></i></span>
              <span class="nav-item-label">Analytics</span>
            </div>
            <div class="nav-item" data-route="/documents" onclick="Router.navigate('/documents')">
              <span class="nav-item-icon"><i data-lucide="folder-open"></i></span>
              <span class="nav-item-label">Resources</span>
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
      if (window.lucide) lucide.createIcons();
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
    if (window.lucide) lucide.createIcons();
  }
};
