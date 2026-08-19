// ============================================
// ANALYTICS PAGE — Comprehensive Performance Intelligence
// ============================================

const AnalyticsPage = {
  render(container) {
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Performance Analytics & Intelligence</h1>
          <p class="page-subtitle">Deep dive across academic results, productivity hours, job recruitment funnels, and goal velocity</p>
        </div>
      </div>

      <!-- Domain Charts Grid -->
      <div class="dashboard-row cols-2 mb-6">
        <div class="card">
          <div class="card-header">
            <span class="card-title">Productivity Distribution (Hours / Day)</span>
          </div>
          <div class="card-body">
            <div id="analytics-chart-productivity" class="chart-container"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Job Application Funnel Efficiency</span>
          </div>
          <div class="card-body">
            <div id="analytics-chart-funnel" class="chart-container"></div>
          </div>
        </div>
      </div>

      <div class="dashboard-row cols-2 mb-6">
        <div class="card">
          <div class="card-header">
            <span class="card-title">Category Time Allocation</span>
          </div>
          <div class="card-body">
            <div id="analytics-chart-categories" class="chart-container"></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Goal Velocity Over Semesters</span>
          </div>
          <div class="card-body">
            <div id="analytics-chart-goals" class="chart-container"></div>
          </div>
        </div>
      </div>

      <!-- Retrospective Weekly & Semester Review -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">🔄 Plan → Execute → Measure → Reflect Framework</span>
        </div>
        <div class="card-body">
          <div class="dashboard-row cols-3">
            <div class="p-4 rounded-md" style="background:var(--bg-secondary)">
              <div class="text-xs font-semibold text-accent mb-2">1. KEY HIGHLIGHTS</div>
              <p class="text-sm text-secondary">Maintained a 12-day productivity streak, achieved Dean's list, advanced to Meta and Google interview rounds, and completed AVL tree project.</p>
            </div>
            <div class="p-4 rounded-md" style="background:var(--bg-secondary)">
              <div class="text-xs font-semibold text-error mb-2">2. FRICTION POINTS</div>
              <p class="text-sm text-secondary">Overdue DBMS SQL assignment requires TA intervention. System design skill score is lagging behind target by 35%.</p>
            </div>
            <div class="p-4 rounded-md" style="background:var(--bg-secondary)">
              <div class="text-xs font-semibold text-success mb-2">3. RECTIFICATION PLAN</div>
              <p class="text-sm text-secondary">Block out 4 hours every Saturday for LeetCode medium graphs + System Design Primer reading. Clear DBMS assignment today.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => this.renderCharts(), 100);
  },

  renderCharts() {
    // Productivity
    Charts.bar('analytics-chart-productivity', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [
      { label: 'Study & Coursework', data: [4, 5, 3.5, 4.5, 3, 6, 2], color: '#e2b714' },
      { label: 'Coding & Projects', data: [3, 2, 4, 3, 2.5, 4, 3], color: '#6eb4e2' }
    ], { height: 240 });

    // Funnel Doughnut
    Charts.doughnut('analytics-chart-funnel', ['Applied', 'OA / Test', 'Interview', 'Offer', 'Rejected'], [3, 1, 2, 1, 1], {
      height: 240,
      colors: ['#e2b714', '#e28314', '#6eb4e2', '#7ec984', '#ca4754']
    });

    // Categories
    Charts.doughnut('analytics-chart-categories', ['Academic', 'Professional', 'Projects', 'Personal'], [45, 25, 20, 10], {
      height: 240,
      colors: ['#6eb4e2', '#b47ee2', '#7ee2c1', '#e27ea8']
    });

    // Goals Velocity
    Charts.line('analytics-chart-goals', ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5 (Current)'], [
      { label: 'Goal Completion %', data: [55, 68, 74, 82, 88], color: '#7ec984', fill: true }
    ], { height: 240, yScale: { min: 40, max: 100 } });
  }
};
