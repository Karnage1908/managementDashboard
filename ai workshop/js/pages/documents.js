// ============================================
// DOCUMENTS PAGE — Resources & Files Management
// ============================================

const DocumentsPage = {
  render(container) {
    const documents = Store.get('documents');

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Documents & Learning Resources</h1>
          <p class="page-subtitle">Central repository for resumes, cheat sheets, lecture notes, and research drafts</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="ModalSystem.openForm('document')">
          <i data-lucide="plus"></i> Add Document
        </button>
      </div>

      <div class="dashboard-row cols-3">
        ${documents.map(doc => `
          <div class="card">
            <div class="card-header">
              <span class="badge ${Utils.categoryBadgeClass(doc.category)}">${doc.category}</span>
              <span class="badge badge-neutral">${doc.type}</span>
            </div>
            <div class="card-body">
              <h3 class="text-md font-bold mb-2">${doc.title}</h3>
              
              <div class="flex gap-1 flex-wrap mb-4">
                ${(doc.tags || []).map(t => `<span class="badge badge-neutral" style="font-size:10px">#${t}</span>`).join('')}
              </div>

              <div class="flex justify-between items-center text-xs text-muted pt-2" style="border-top:var(--border-subtle)">
                <span>Updated: ${Utils.relativeTime(doc.updatedAt)}</span>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-sm" onclick="ModalSystem.openForm('document', ${JSON.stringify(doc).replace(/"/g, '&quot;')})">
                    <i data-lucide="edit-2"></i>
                  </button>
                  <button class="btn btn-ghost btn-sm text-error" onclick="ModalSystem.confirmDelete('documents', '${doc.id}', '${doc.title}')">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
