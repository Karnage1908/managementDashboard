// ============================================
// SETTINGS PAGE — Preferences & Data Backups
// ============================================

const SettingsPage = {
  render(container) {
    const settings = Store.getSettings();

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Settings & System Preferences</h1>
          <p class="page-subtitle">Configure academic periods, target GPA benchmarks, data backups, and theme</p>
        </div>
      </div>

      <div class="dashboard-grid" style="max-width: 800px;">
        <!-- General Preferences -->
        <div class="card mb-4">
          <div class="card-header">
            <span class="card-title">Academic & User Profile</span>
          </div>
          <div class="card-body">
            <form id="settings-form" onsubmit="SettingsPage.saveProfile(event)">
              <div class="form-row mb-4">
                <div class="form-group">
                  <label class="form-label">User / Student Name</label>
                  <input type="text" class="form-input" name="userName" value="${settings.userName || 'Student'}">
                </div>
                <div class="form-group">
                  <label class="form-label">Current Semester</label>
                  <input type="text" class="form-input" name="currentSemester" value="${settings.currentSemester || 'Fall 2026'}">
                </div>
              </div>

              <div class="form-row mb-4">
                <div class="form-group">
                  <label class="form-label">Current GPA Score</label>
                  <input type="number" step="0.01" class="form-input" name="gpa" value="${settings.gpa || 3.72}">
                </div>
                <div class="form-group">
                  <label class="form-label">Target GPA Score</label>
                  <input type="number" step="0.01" class="form-input" name="targetGpa" value="${settings.targetGpa || 3.85}">
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-sm">Save Profile</button>
            </form>
          </div>
        </div>

        <!-- Data Backup & Reset -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Data Storage & Portability</span>
          </div>
          <div class="card-body">
            <p class="text-sm text-secondary mb-4">All application records are securely persisted locally in your browser's localStorage. You can export complete JSON snapshots or import them on another device.</p>
            
            <div class="flex gap-3 flex-wrap mb-6">
              <button class="btn btn-secondary btn-sm" onclick="SettingsPage.exportJson()">
                <i data-lucide="download"></i> Export JSON Backup
              </button>
              <button class="btn btn-secondary btn-sm" onclick="document.getElementById('import-file-input').click()">
                <i data-lucide="upload"></i> Import JSON Backup
              </button>
              <input type="file" id="import-file-input" class="hidden" accept=".json" onchange="SettingsPage.importJson(event)">
              
              <button class="btn btn-danger btn-sm" onclick="SettingsPage.confirmReset()">
                <i data-lucide="refresh-cw"></i> Reset to Factory Seed Data
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveProfile(e) {
    e.preventDefault();
    const form = document.getElementById('settings-form');
    const data = new FormData(form);
    Store.updateSettings({
      userName: data.get('userName'),
      currentSemester: data.get('currentSemester'),
      gpa: parseFloat(data.get('gpa')),
      targetGpa: parseFloat(data.get('targetGpa'))
    });
    App.showToast('Profile settings saved', 'success');
  },

  exportJson() {
    const dataStr = Store.exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    App.showToast('Backup successfully downloaded', 'success');
  },

  importJson(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const ok = Store.importData(event.target.result);
      if (ok) {
        App.showToast('Data imported successfully! Reloading...', 'success');
        setTimeout(() => window.location.reload(), 800);
      } else {
        App.showToast('Failed to parse JSON backup file', 'error');
      }
    };
    reader.readAsText(file);
  },

  confirmReset() {
    if (confirm('Are you sure you want to reset all stored dashboard data back to initial seed data?')) {
      Store.resetData();
      App.showToast('Dashboard reset to seed data! Reloading...', 'info');
      setTimeout(() => window.location.reload(), 600);
    }
  }
};
