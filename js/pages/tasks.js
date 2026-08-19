// ============================================
// TASKS PAGE — Centralized Multi-View Task Manager
// ============================================

const TasksPage = {
  currentFilter: 'all', // 'all' | 'today' | 'upcoming' | 'overdue' | 'completed'
  categoryFilter: 'all',

  render(container) {
    const tasks = Store.get('tasks');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Task Management</h1>
          <p class="page-subtitle">Unified execution engine across academic, career, and personal domains</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('task')">
          <i data-lucide="plus"></i> Add Task
        </button>
      </div>

      <!-- Filter Controls -->
      <div class="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div class="flex gap-2 flex-wrap">
          <span class="filter-chip ${this.currentFilter === 'all' ? 'active' : ''}" onclick="TasksPage.setFilter('all')">All (${tasks.length})</span>
          <span class="filter-chip ${this.currentFilter === 'today' ? 'active' : ''}" onclick="TasksPage.setFilter('today')">Today</span>
          <span class="filter-chip ${this.currentFilter === 'upcoming' ? 'active' : ''}" onclick="TasksPage.setFilter('upcoming')">Upcoming</span>
          <span class="filter-chip ${this.currentFilter === 'overdue' ? 'active' : ''}" onclick="TasksPage.setFilter('overdue')">Overdue (${tasks.filter(t => t.status === 'Overdue' || (Utils.isPast(t.dueDate) && t.status !== 'Completed')).length})</span>
          <span class="filter-chip ${this.currentFilter === 'completed' ? 'active' : ''}" onclick="TasksPage.setFilter('completed')">Completed</span>
        </div>

        <div class="flex gap-2">
          <select class="form-select text-xs" style="padding:4px 28px 4px 10px; width:auto;" onchange="TasksPage.setCategoryFilter(this.value)">
            <option value="all">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Professional">Professional</option>
            <option value="Project">Project</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>

      <!-- Task List Table -->
      <div class="card">
        <div class="card-body overflow-auto">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 40px;"></th>
                <th>Task Details</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Est. Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="tasks-table-body">
              ${this.renderRows(tasks)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  setFilter(filter) {
    this.currentFilter = filter;
    this.refreshList();
  },

  setCategoryFilter(cat) {
    this.categoryFilter = cat;
    this.refreshList();
  },

  refreshList() {
    const tasks = Store.get('tasks');
    const tbody = document.getElementById('tasks-table-body');
    if (tbody) {
      tbody.innerHTML = this.renderRows(tasks);
      lucide.createIcons();
    }
    document.querySelectorAll('.filter-chip').forEach(c => {
      c.classList.toggle('active', c.textContent.toLowerCase().startsWith(this.currentFilter));
    });
  },

  renderRows(tasks) {
    let filtered = tasks;

    // Time filter
    if (this.currentFilter === 'today') {
      filtered = filtered.filter(t => Utils.isToday(t.dueDate) || t.recurrence === 'Daily');
    } else if (this.currentFilter === 'upcoming') {
      filtered = filtered.filter(t => !Utils.isPast(t.dueDate) && t.status !== 'Completed');
    } else if (this.currentFilter === 'overdue') {
      filtered = filtered.filter(t => t.status === 'Overdue' || (Utils.isPast(t.dueDate) && t.status !== 'Completed'));
    } else if (this.currentFilter === 'completed') {
      filtered = filtered.filter(t => t.status === 'Completed');
    }

    // Category filter
    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === this.categoryFilter);
    }

    if (!filtered.length) {
      return `<tr><td colspan="8" class="text-center p-6 text-muted">No matching tasks found.</td></tr>`;
    }

    return filtered.map(t => {
      const isDone = t.status === 'Completed';
      return `
        <tr>
          <td>
            <div class="checkbox ${isDone ? 'checked' : ''}" onclick="TasksPage.toggleDone('${t.id}')"></div>
          </td>
          <td>
            <div class="font-medium ${isDone ? 'line-through text-muted' : ''}" style="${isDone ? 'text-decoration: line-through;' : ''}">${t.title}</div>
            ${t.description ? `<div class="text-xs text-secondary mt-1">${t.description}</div>` : ''}
          </td>
          <td><span class="badge ${Utils.categoryBadgeClass(t.category)}">${t.category}</span></td>
          <td><span class="badge ${Utils.priorityBadgeClass(t.priority)}">${t.priority}</span></td>
          <td class="mono ${Utils.isPast(t.dueDate) && !isDone ? 'text-error' : ''}">
            ${t.dueDate ? Utils.formatDate(t.dueDate, 'short') + ' (' + Utils.relativeTime(t.dueDate) + ')' : '—'}
          </td>
          <td class="mono">${Utils.formatHours(t.estimatedTime)}</td>
          <td>
            <select class="form-select" style="padding:2px 8px;font-size:11px;width:auto;" onchange="TasksPage.updateStatus('${t.id}', this.value)">
              <option value="Todo" ${t.status === 'Todo' ? 'selected' : ''}>Todo</option>
              <option value="In Progress" ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Completed" ${t.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Overdue" ${t.status === 'Overdue' ? 'selected' : ''}>Overdue</option>
            </select>
          </td>
          <td>
            <div class="flex gap-1">
              <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('task', ${JSON.stringify(t).replace(/"/g, '&quot;')})">
                <i data-lucide="edit-2"></i>
              </button>
              <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('tasks', '${t.id}', '${t.title}')">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  toggleDone(id) {
    const task = Store.getById('tasks', id);
    if (task) {
      const nextStatus = task.status === 'Completed' ? 'Todo' : 'Completed';
      Store.update('tasks', id, { status: nextStatus });
      this.refreshList();
      App.showToast(`Task marked as ${nextStatus.toLowerCase()}`, 'success');
    }
  },

  updateStatus(id, newStatus) {
    Store.update('tasks', id, { status: newStatus });
    this.refreshList();
    App.showToast(`Task status updated`, 'info');
  }
};
