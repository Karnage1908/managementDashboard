// ============================================
// HEADER Component
// ============================================

const Header = {
  quickAddOpen: false,

  render() {
    const settings = Store.getSettings();
    const notifications = Store.get('notifications');
    const unreadCount = notifications.filter(n => !n.read).length;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    return `
      <header class="header" id="header">
        <div class="header-left">
          <button class="header-btn header-mobile-toggle" onclick="Sidebar.openMobile()">
            <i data-lucide="menu"></i>
          </button>
          <div>
            <div class="header-page-title" id="header-page-title">Overview</div>
            <div class="header-date">${dateStr} · ${settings.currentSemester || 'Fall 2026'}</div>
          </div>
        </div>

        <div class="header-right">
          <div class="header-search">
            <span class="header-search-icon"><i data-lucide="search"></i></span>
            <input type="text" placeholder="Search..." id="global-search" onkeyup="Header.onSearch(event)">
          </div>

          <button class="header-btn" onclick="Header.toggleNotifications()" id="btn-notifications">
            <i data-lucide="bell"></i>
            ${unreadCount > 0 ? '<span class="notification-dot"></span>' : ''}
          </button>

          <div style="position:relative">
            <button class="header-quick-add" onclick="Header.toggleQuickAdd()" id="btn-quick-add">
              <i data-lucide="plus"></i>
              <span>Quick Add</span>
            </button>
            <div class="quick-add-dropdown hidden" id="quick-add-dropdown">
              <div class="quick-add-item" onclick="ModalSystem.openForm('task')">
                <i data-lucide="check-square"></i>
                <span>New Task</span>
              </div>
              <div class="quick-add-item" onclick="ModalSystem.openForm('goal')">
                <i data-lucide="target"></i>
                <span>New Goal</span>
              </div>
              <div class="quick-add-item" onclick="ModalSystem.openForm('event')">
                <i data-lucide="calendar-plus"></i>
                <span>New Event</span>
              </div>
              <div class="quick-add-item" onclick="ModalSystem.openForm('application')">
                <i data-lucide="send"></i>
                <span>New Application</span>
              </div>
              <div class="quick-add-item" onclick="ModalSystem.openForm('project')">
                <i data-lucide="folder-plus"></i>
                <span>New Project</span>
              </div>
            </div>
          </div>

          <button class="header-btn" onclick="App.toggleTheme()" id="btn-theme">
            <i data-lucide="moon"></i>
          </button>
        </div>
      </header>

      <!-- Notification Panel -->
      <div class="notification-panel" id="notification-panel">
        <div class="notification-panel-header">
          <h3>Notifications</h3>
          <button class="btn btn-ghost btn-sm" onclick="Header.markAllRead()">Mark all read</button>
          <button class="modal-close" onclick="Header.toggleNotifications()"><i data-lucide="x"></i></button>
        </div>
        <div class="notification-panel-body" id="notification-list">
          ${this.renderNotifications(notifications)}
        </div>
      </div>
    `;
  },

  renderNotifications(notifications) {
    if (!notifications.length) {
      return '<div class="empty-state"><div class="empty-state-title">No notifications</div></div>';
    }
    return notifications.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}" onclick="Header.readNotification('${n.id}')">
        <div class="flex items-center gap-2 mb-2">
          <span class="badge ${n.type === 'critical' ? 'badge-critical' : n.type === 'high' ? 'badge-high' : n.type === 'medium' ? 'badge-medium' : 'badge-low'}">${n.type}</span>
          <span class="text-xs text-muted">${Utils.relativeTime(n.date)}</span>
        </div>
        <div class="text-sm font-medium">${n.title}</div>
        <div class="text-xs text-secondary" style="margin-top:4px">${n.message}</div>
      </div>
    `).join('');
  },

  toggleQuickAdd() {
    this.quickAddOpen = !this.quickAddOpen;
    const dropdown = document.getElementById('quick-add-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden', !this.quickAddOpen);
      if (this.quickAddOpen) {
        lucide.createIcons({ nameAttr: 'data-lucide', node: dropdown });
      }
    }
    // Close on outside click
    if (this.quickAddOpen) {
      setTimeout(() => {
        document.addEventListener('click', this._closeQuickAdd, { once: true });
      }, 10);
    }
  },

  _closeQuickAdd(e) {
    const dropdown = document.getElementById('quick-add-dropdown');
    const btn = document.getElementById('btn-quick-add');
    if (dropdown && !dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.add('hidden');
      Header.quickAddOpen = false;
    }
  },

  toggleNotifications() {
    const panel = document.getElementById('notification-panel');
    if (panel) {
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) {
        lucide.createIcons({ nameAttr: 'data-lucide', node: panel });
      }
    }
  },

  readNotification(id) {
    Store.update('notifications', id, { read: true });
    const list = document.getElementById('notification-list');
    if (list) {
      list.innerHTML = this.renderNotifications(Store.get('notifications'));
    }
  },

  markAllRead() {
    Store.get('notifications').forEach(n => {
      Store.update('notifications', n.id, { read: true });
    });
    const list = document.getElementById('notification-list');
    if (list) {
      list.innerHTML = this.renderNotifications(Store.get('notifications'));
    }
  },

  onSearch(e) {
    // Global search — simple implementation
    if (e.key === 'Enter') {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        Router.navigate('/tasks');
      }
    }
  }
};
