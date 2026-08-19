// ============================================
// MODAL SYSTEM — Create/Edit Forms
// ============================================

const ModalSystem = {
  isOpen: false,

  formConfigs: {
    task: {
      title: 'New Task',
      collection: 'tasks',
      fields: [
        { key: 'title', label: 'Task Title', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'category', label: 'Category', type: 'select', options: ['Academic', 'Professional', 'Personal', 'Project'] },
        { key: 'priority', label: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] },
        { key: 'status', label: 'Status', type: 'select', options: ['Todo', 'In Progress', 'Completed', 'Overdue'] },
        { key: 'dueDate', label: 'Due Date', type: 'date' },
        { key: 'estimatedTime', label: 'Est. Hours', type: 'number' },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ]
    },
    goal: {
      title: 'New Goal',
      collection: 'goals',
      fields: [
        { key: 'title', label: 'Goal Title', type: 'text', required: true },
        { key: 'level', label: 'Level', type: 'select', options: ['Long-Term', 'Yearly', 'Semester', 'Monthly', 'Weekly'] },
        { key: 'target', label: 'Target Description', type: 'text' },
        { key: 'targetValue', label: 'Target Value', type: 'number' },
        { key: 'currentValue', label: 'Current Value', type: 'number' },
        { key: 'unit', label: 'Unit', type: 'text' },
        { key: 'deadline', label: 'Deadline', type: 'date' },
        { key: 'priority', label: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] },
        { key: 'status', label: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Completed', 'At Risk'] }
      ]
    },
    event: {
      title: 'New Event',
      collection: 'events',
      fields: [
        { key: 'title', label: 'Event Title', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Academic', 'Professional', 'Project', 'Personal'] },
        { key: 'type', label: 'Type', type: 'select', options: ['Class', 'Meeting', 'Interview', 'Study', 'Exam', 'Event', 'Deadline'] },
        { key: 'date', label: 'Start Date/Time', type: 'datetime-local' },
        { key: 'endDate', label: 'End Date/Time', type: 'datetime-local' }
      ]
    },
    application: {
      title: 'New Application',
      collection: 'applications',
      fields: [
        { key: 'company', label: 'Company', type: 'text', required: true },
        { key: 'role', label: 'Role', type: 'text', required: true },
        { key: 'location', label: 'Location', type: 'text' },
        { key: 'stage', label: 'Stage', type: 'select', options: ['Saved', 'Preparing', 'Applied', 'OA/Test', 'Interview', 'Final Round', 'Offer', 'Rejected'] },
        { key: 'applicationDate', label: 'Application Date', type: 'date' },
        { key: 'deadline', label: 'Deadline', type: 'date' },
        { key: 'jobUrl', label: 'Job URL', type: 'text' },
        { key: 'resumeVersion', label: 'Resume Version', type: 'text' },
        { key: 'referral', label: 'Referral', type: 'text' },
        { key: 'nextAction', label: 'Next Action', type: 'text' },
        { key: 'followUpDate', label: 'Follow-up Date', type: 'date' },
        { key: 'interviewDate', label: 'Interview Date', type: 'date' },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ]
    },
    project: {
      title: 'New Project',
      collection: 'projects',
      fields: [
        { key: 'name', label: 'Project Name', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'objective', label: 'Objective', type: 'text' },
        { key: 'category', label: 'Category', type: 'select', options: ['Academic', 'Professional', 'Personal'] },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'deadline', label: 'Deadline', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Planning', 'Active', 'Blocked', 'Completed', 'Archived'] },
        { key: 'priority', label: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] },
        { key: 'completion', label: 'Completion %', type: 'number' },
        { key: 'repository', label: 'Repository URL', type: 'text' }
      ]
    },
    course: {
      title: 'New Course',
      collection: 'courses',
      fields: [
        { key: 'name', label: 'Course Name', type: 'text', required: true },
        { key: 'code', label: 'Course Code', type: 'text' },
        { key: 'professor', label: 'Professor', type: 'text' },
        { key: 'credits', label: 'Credits', type: 'number' },
        { key: 'semester', label: 'Semester', type: 'text' },
        { key: 'currentGrade', label: 'Current Grade', type: 'number' },
        { key: 'targetGrade', label: 'Target Grade', type: 'number' },
        { key: 'attendance', label: 'Attendance %', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Completed', 'Dropped'] }
      ]
    },
    assignment: {
      title: 'New Assignment',
      collection: 'assignments',
      fields: [
        { key: 'title', label: 'Assignment Title', type: 'text', required: true },
        { key: 'course', label: 'Course', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'deadline', label: 'Deadline', type: 'date' },
        { key: 'weightage', label: 'Weightage %', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Submitted', 'Graded', 'Overdue'] },
        { key: 'priority', label: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'] }
      ]
    },
    achievement: {
      title: 'New Achievement',
      collection: 'achievements',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Academic', 'Certification', 'Hackathon', 'Leadership', 'Achievement', 'Publication', 'Competition', 'Internship'] },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'evidence', label: 'Evidence / Link', type: 'text' }
      ]
    },
    skill: {
      title: 'New Skill',
      collection: 'skills',
      fields: [
        { key: 'name', label: 'Skill Name', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Programming', 'Data Science', 'Machine Learning', 'Web Development', 'Cloud', 'Databases', 'Algorithms', 'Communication', 'Leadership', 'Domain Knowledge'] },
        { key: 'currentLevel', label: 'Current Level (0-100)', type: 'number' },
        { key: 'targetLevel', label: 'Target Level (0-100)', type: 'number' },
        { key: 'hoursInvested', label: 'Hours Invested', type: 'number' }
      ]
    },
    document: {
      title: 'New Document',
      collection: 'documents',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Academic', 'Career', 'Certification', 'Personal'] },
        { key: 'type', label: 'Type', type: 'select', options: ['PDF', 'Doc', 'Notes', 'Link', 'Sheet', 'Overleaf'] },
        { key: 'url', label: 'URL / Path', type: 'text' }
      ]
    }
  },

  openForm(type, editData = null) {
    const config = this.formConfigs[type];
    if (!config) return;

    const isEdit = !!editData;
    const title = isEdit ? `Edit ${config.title.replace('New ', '')}` : config.title;

    const fieldsHtml = config.fields.map(f => {
      const value = editData ? (editData[f.key] || '') : '';
      let input = '';

      if (f.type === 'select') {
        input = `<select class="form-select" name="${f.key}" ${f.required ? 'required' : ''}>
          <option value="">Select...</option>
          ${f.options.map(o => `<option value="${o}" ${value === o ? 'selected' : ''}>${o}</option>`).join('')}
        </select>`;
      } else if (f.type === 'textarea') {
        input = `<textarea class="form-textarea" name="${f.key}" rows="3" ${f.required ? 'required' : ''}>${value}</textarea>`;
      } else {
        input = `<input class="form-input" type="${f.type}" name="${f.key}" value="${value}" ${f.required ? 'required' : ''} ${f.type === 'number' ? 'step="any"' : ''}>`;
      }

      return `<div class="form-group">
        <label class="form-label">${f.label}</label>
        ${input}
      </div>`;
    }).join('');

    const html = `
      <div class="modal-overlay" id="modal-overlay" onclick="ModalSystem.closeOnOverlay(event)">
        <div class="modal ${config.fields.length > 6 ? 'modal-lg' : ''}">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="ModalSystem.close()"><i data-lucide="x"></i></button>
          </div>
          <div class="modal-body">
            <form id="modal-form" onsubmit="ModalSystem.handleSubmit(event, '${type}', ${isEdit ? `'${editData.id}'` : 'null'})">
              <div class="${config.fields.length > 4 ? 'form-row' : ''}">
                ${fieldsHtml}
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="ModalSystem.close()">Cancel</button>
            <button class="btn btn-primary" onclick="document.getElementById('modal-form').requestSubmit()">
              ${isEdit ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Insert modal
    let container = document.getElementById('modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-container';
      document.body.appendChild(container);
    }
    container.innerHTML = html;
    this.isOpen = true;
    lucide.createIcons({ nameAttr: 'data-lucide', node: container });

    // Close quick add dropdown
    const dropdown = document.getElementById('quick-add-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    Header.quickAddOpen = false;
  },

  handleSubmit(e, type, editId) {
    e.preventDefault();
    const form = document.getElementById('modal-form');
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      if (value !== '') {
        const field = this.formConfigs[type].fields.find(f => f.key === key);
        if (field && field.type === 'number') {
          data[key] = parseFloat(value);
        } else {
          data[key] = value;
        }
      }
    }

    const config = this.formConfigs[type];

    if (editId) {
      Store.update(config.collection, editId, data);
      App.showToast('Updated successfully', 'success');
    } else {
      // Set defaults
      if (type === 'goal') {
        data.progress = data.targetValue ? Math.round((data.currentValue || 0) / data.targetValue * 100) : 0;
        data.milestones = [];
      }
      if (type === 'project') {
        data.milestones = [];
        data.collaborators = [];
        data.deliverables = [];
      }
      Store.add(config.collection, data);
      App.showToast('Created successfully', 'success');
    }

    this.close();

    // Refresh current page
    const pageContent = document.getElementById('page-content');
    if (pageContent && Router.routes[Router.currentRoute]) {
      Router.routes[Router.currentRoute](pageContent);
      if (window.lucide) lucide.createIcons();
    }
  },

  close() {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
    this.isOpen = false;
  },

  closeOnOverlay(e) {
    if (e.target.id === 'modal-overlay') {
      this.close();
    }
  },

  // View detail modal
  showDetail(title, contentHtml) {
    const html = `
      <div class="modal-overlay" id="modal-overlay" onclick="ModalSystem.closeOnOverlay(event)">
        <div class="modal modal-lg">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="ModalSystem.close()"><i data-lucide="x"></i></button>
          </div>
          <div class="modal-body">
            ${contentHtml}
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="ModalSystem.close()">Close</button>
          </div>
        </div>
      </div>
    `;

    let container = document.getElementById('modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-container';
      document.body.appendChild(container);
    }
    container.innerHTML = html;
    this.isOpen = true;
    lucide.createIcons({ nameAttr: 'data-lucide', node: container });
  },

  // Confirm delete
  confirmDelete(collection, id, itemName) {
    const html = `
      <div class="modal-overlay" id="modal-overlay" onclick="ModalSystem.closeOnOverlay(event)">
        <div class="modal" style="max-width:420px">
          <div class="modal-header">
            <h3 class="modal-title">Confirm Delete</h3>
            <button class="modal-close" onclick="ModalSystem.close()"><i data-lucide="x"></i></button>
          </div>
          <div class="modal-body">
            <p class="text-secondary">Are you sure you want to delete <strong>${itemName}</strong>? This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="ModalSystem.close()">Cancel</button>
            <button class="btn btn-danger" onclick="ModalSystem.executeDelete('${collection}', '${id}')">Delete</button>
          </div>
        </div>
      </div>
    `;

    let container = document.getElementById('modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-container';
      document.body.appendChild(container);
    }
    container.innerHTML = html;
    lucide.createIcons({ nameAttr: 'data-lucide', node: container });
  },

  executeDelete(collection, id) {
    Store.remove(collection, id);
    this.close();
    App.showToast('Deleted successfully', 'success');

    // Refresh
    const pageContent = document.getElementById('page-content');
    if (pageContent && Router.routes[Router.currentRoute]) {
      Router.routes[Router.currentRoute](pageContent);
      if (window.lucide) lucide.createIcons();
    }
  }
};
