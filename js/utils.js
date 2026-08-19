// ============================================
// UTILS — Formatting, Date Helpers, DOM Utilities
// ============================================

const Utils = {
  // Date formatting
  formatDate(dateStr, format = 'short') {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '—';

    const formats = {
      short: { month: 'short', day: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit', hour12: true },
      datetime: { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true },
      full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
      iso: null
    };

    if (format === 'iso') return date.toISOString().split('T')[0];
    return new Intl.DateTimeFormat('en-US', formats[format] || formats.short).format(date);
  },

  formatTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  },

  relativeTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date - now;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays > 7 && diffDays <= 14) return `In ${Math.ceil(diffDays / 7)} weeks`;
    if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
    if (diffDays < -7) return `${Math.abs(Math.ceil(diffDays / 7))} weeks ago`;
    return this.formatDate(dateStr, 'short');
  },

  daysUntil(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return Math.round((date - now) / (1000 * 60 * 60 * 24));
  },

  countdown(dateStr) {
    if (!dateStr) return { days: 0, hours: 0, minutes: 0 };
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.max(0, date - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    };
  },

  isToday(dateStr) {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },

  isPast(dateStr) {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  },

  isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toDateString() === d2.toDateString();
  },

  // Number formatting
  formatGpa(gpa) {
    return Number(gpa).toFixed(2);
  },

  formatPercent(value) {
    return Math.round(value) + '%';
  },

  formatHours(hours) {
    if (hours == null) return '—';
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    return `${hours}h`;
  },

  // Priority helpers
  priorityColor(priority) {
    const colors = {
      'Critical': 'var(--priority-critical)',
      'High': 'var(--priority-high)',
      'Medium': 'var(--priority-medium)',
      'Low': 'var(--priority-low)'
    };
    return colors[priority] || 'var(--text-secondary)';
  },

  priorityBadgeClass(priority) {
    const classes = {
      'Critical': 'badge-critical',
      'High': 'badge-high',
      'Medium': 'badge-medium',
      'Low': 'badge-low'
    };
    return classes[priority] || 'badge-neutral';
  },

  statusBadgeClass(status) {
    const classes = {
      'Completed': 'badge-success',
      'Graded': 'badge-success',
      'Submitted': 'badge-info',
      'In Progress': 'badge-accent',
      'Active': 'badge-accent',
      'Todo': 'badge-neutral',
      'Not Started': 'badge-neutral',
      'Pending': 'badge-neutral',
      'Planning': 'badge-neutral',
      'Overdue': 'badge-error',
      'Blocked': 'badge-error',
      'Rejected': 'badge-error',
      'Archived': 'badge-neutral',
      'Offer': 'badge-success',
      'Interview': 'badge-info',
      'Applied': 'badge-accent',
      'OA/Test': 'badge-warning',
      'Final Round': 'badge-info',
      'Saved': 'badge-neutral',
      'Preparing': 'badge-neutral'
    };
    return classes[status] || 'badge-neutral';
  },

  categoryBadgeClass(category) {
    const classes = {
      'Academic': 'badge-academic',
      'Professional': 'badge-professional',
      'Personal': 'badge-personal',
      'Project': 'badge-project'
    };
    return classes[category] || 'badge-neutral';
  },

  categoryColor(category) {
    const colors = {
      'Academic': 'var(--cat-academic)',
      'Professional': 'var(--cat-professional)',
      'Personal': 'var(--cat-personal)',
      'Project': 'var(--cat-project)'
    };
    return colors[category] || 'var(--text-secondary)';
  },

  // DOM helpers
  el(tag, attrs = {}, children = []) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'className') element.className = value;
      else if (key === 'innerHTML') element.innerHTML = value;
      else if (key === 'textContent') element.textContent = value;
      else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      }
      else if (key.startsWith('on')) {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      }
      else element.setAttribute(key, value);
    }
    if (typeof children === 'string') {
      element.innerHTML = children;
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') element.appendChild(document.createTextNode(child));
        else if (child instanceof Node) element.appendChild(child);
      });
    }
    return element;
  },

  // Progress ring SVG
  progressRing(percent, size = 60, strokeWidth = 5, color = 'var(--accent)') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    const displayPercent = Math.round(percent);
    const fontSize = size < 50 ? 'var(--fs-xs)' : 'var(--fs-sm)';

    return `
      <div class="progress-ring" style="width:${size}px;height:${size}px;">
        <svg width="${size}" height="${size}">
          <circle class="progress-ring-bg" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"/>
          <circle class="progress-ring-fill" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"
            stroke="${color}" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <span class="progress-ring-text" style="font-size:${fontSize}">${displayPercent}%</span>
      </div>
    `;
  },

  // Progress bar HTML
  progressBar(percent, colorClass = '') {
    const clampedPercent = Math.min(100, Math.max(0, percent));
    return `
      <div class="progress-bar">
        <div class="progress-bar-fill ${colorClass}" style="width:${clampedPercent}%"></div>
      </div>
    `;
  },

  // Badge HTML
  badge(text, className = 'badge-neutral') {
    return `<span class="badge ${className}">${text}</span>`;
  },

  // Generate unique ID
  generateId() {
    return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
  },

  // Truncate text
  truncate(str, maxLen = 50) {
    if (!str) return '';
    return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
  },

  // Sort helper
  sortBy(arr, key, direction = 'asc') {
    return [...arr].sort((a, b) => {
      let va = a[key], vb = b[key];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return direction === 'asc' ? -1 : 1;
      if (va > vb) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },

  // Debounce
  debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  },

  // Today's date string
  today() {
    return new Date().toISOString().split('T')[0];
  },

  // Get current day name
  dayName() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
  }
};
