// ============================================
// ROUTER — Hash-based SPA Router
// ============================================

const Router = {
  routes: {},
  currentRoute: null,

  init() {
    window.addEventListener('hashchange', () => this._onHashChange());
    window.addEventListener('load', () => this._onHashChange());
  },

  register(path, renderFn) {
    this.routes[path] = renderFn;
  },

  navigate(path) {
    window.location.hash = path;
  },

  _onHashChange() {
    const hash = window.location.hash.slice(1) || '/overview';
    const path = hash.split('?')[0];
    this.currentRoute = path;

    const pageContent = document.getElementById('page-content');
    if (!pageContent) return;

    // Fade out
    pageContent.style.opacity = '0';
    pageContent.style.transform = 'translateY(8px)';

    setTimeout(() => {
      if (this.routes[path]) {
        this.routes[path](pageContent);
      } else {
        pageContent.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon"><i data-lucide="alert-circle"></i></div>
            <div class="empty-state-title">Page Not Found</div>
            <div class="empty-state-desc">The page "${path}" doesn't exist.</div>
          </div>
        `;
      }

      // Re-initialize Lucide icons
      if (window.lucide) lucide.createIcons();

      // Fade in
      requestAnimationFrame(() => {
        pageContent.style.opacity = '1';
        pageContent.style.transform = 'translateY(0)';
      });

      // Update sidebar active state
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.route === path);
      });

      // Update header title
      const headerTitle = document.getElementById('header-page-title');
      if (headerTitle) {
        const titles = {
          '/overview': 'Overview',
          '/academic': 'Academic',
          '/professional': 'Professional',
          '/projects': 'Projects',
          '/tasks': 'Tasks',
          '/calendar': 'Calendar',
          '/goals': 'Goals & Milestones',
          '/skills': 'Skills',
          '/applications': 'Applications',
          '/achievements': 'Achievements',
          '/analytics': 'Analytics',
          '/documents': 'Documents',
          '/settings': 'Settings'
        };
        headerTitle.textContent = titles[path] || 'Dashboard';
      }
    }, 150);
  }
};
