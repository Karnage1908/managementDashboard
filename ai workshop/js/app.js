// ============================================
// APP — Main Application Controller
// ============================================

const App = {
  init() {
    // Initialize store
    Store.init();

    // Initialize Chart.js defaults
    Charts.initDefaults();

    // Apply theme
    const settings = Store.getSettings();
    document.documentElement.setAttribute('data-theme', settings.theme || 'dark');

    // Render shell
    this.renderShell();

    // Register routes
    this.registerRoutes();

    // Initialize router
    Router.init();

    // Initialize Lucide icons
    if (window.lucide) lucide.createIcons();

    // Mobile overlay click
    const overlay = document.querySelector('.mobile-overlay');
    if (overlay) overlay.addEventListener('click', () => Sidebar.closeMobile());
  },

  renderShell() {
    const app = document.getElementById('app');
    app.innerHTML = `
      ${Sidebar.render()}
      <div class="mobile-overlay"></div>
      <div class="main-wrapper">
        ${Header.render()}
        <div class="page-content" id="page-content" style="transition: opacity 0.15s ease, transform 0.15s ease;">
          <!-- Page content rendered by router -->
        </div>
      </div>
      <div class="toast-container" id="toast-container"></div>
    `;
  },

  registerRoutes() {
    Router.register('/overview', (el) => OverviewPage.render(el));
    Router.register('/academic', (el) => AcademicPage.render(el));
    Router.register('/professional', (el) => ProfessionalPage.render(el));
    Router.register('/applications', (el) => ApplicationsPage.render(el));
    Router.register('/projects', (el) => ProjectsPage.render(el));
    Router.register('/tasks', (el) => TasksPage.render(el));
    Router.register('/calendar', (el) => CalendarPage.render(el));
    Router.register('/goals', (el) => GoalsPage.render(el));
    Router.register('/skills', (el) => SkillsPage.render(el));
    Router.register('/achievements', (el) => AchievementsPage.render(el));
    Router.register('/analytics', (el) => AnalyticsPage.render(el));
    Router.register('/documents', (el) => DocumentsPage.render(el));
    Router.register('/settings', (el) => SettingsPage.render(el));
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    Store.updateSettings({ theme: next });

    // Update Chart.js defaults for new theme
    if (window.Chart) {
      Chart.defaults.color = next === 'dark' ? '#646669' : '#888a8d';
      Chart.defaults.borderColor = next === 'dark' ? 'rgba(100,102,105,0.15)' : 'rgba(50,52,55,0.1)';
      Chart.defaults.plugins.tooltip.backgroundColor = next === 'dark' ? '#3a3c3f' : '#f5f3ef';
      Chart.defaults.plugins.tooltip.titleColor = next === 'dark' ? '#d1d0c5' : '#323437';
      Chart.defaults.plugins.tooltip.bodyColor = next === 'dark' ? '#d1d0c5' : '#323437';
    }
  },

  showToast(message, type = 'info', title = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: 'check-circle',
      error: 'alert-circle',
      warning: 'alert-triangle',
      info: 'info'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon"><i data-lucide="${icons[type] || 'info'}"></i></span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <span class="toast-close" onclick="this.parentElement.remove()"><i data-lucide="x"></i></span>
    `;

    container.appendChild(toast);
    lucide.createIcons({ nameAttr: 'data-lucide', node: toast });

    // Auto remove
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
