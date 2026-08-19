// ============================================
// CHARTS — Chart.js Wrapper & Configurations
// ============================================

const Charts = {
  instances: {},

  // Global Chart.js defaults for Monkeytype theme
  initDefaults() {
    if (!window.Chart) return;

    Chart.defaults.color = '#646669';
    Chart.defaults.borderColor = 'rgba(100, 102, 105, 0.15)';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
    Chart.defaults.plugins.legend.labels.padding = 16;
    Chart.defaults.plugins.tooltip.backgroundColor = '#3a3c3f';
    Chart.defaults.plugins.tooltip.titleFont = { weight: '600' };
    Chart.defaults.plugins.tooltip.borderColor = 'rgba(100, 102, 105, 0.3)';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.animation = { duration: 800, easing: 'easeOutQuart' };
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
  },

  // Destroy an existing chart instance
  destroy(id) {
    if (this.instances[id]) {
      this.instances[id].destroy();
      delete this.instances[id];
    }
  },

  // Get or create canvas in container
  getCanvas(containerId, height = 250) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    container.innerHTML = '';
    container.style.height = height + 'px';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return canvas;
  },

  // Line chart
  line(containerId, labels, datasets, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 250);
    if (!canvas) return;

    const palette = ['#e2b714', '#6eb4e2', '#7ec984', '#b47ee2', '#e27ea8', '#7ee2c1'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          borderColor: ds.color || palette[i % palette.length],
          backgroundColor: (ds.color || palette[i % palette.length]) + '20',
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: ds.fill || false,
          ...ds
        }))
      },
      options: {
        plugins: {
          legend: { display: datasets.length > 1, position: 'top' }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: options.beginAtZero !== false,
            grid: { color: 'rgba(100,102,105,0.1)' },
            ...options.yScale
          }
        },
        ...options.chartOptions
      }
    });
  },

  // Bar chart
  bar(containerId, labels, datasets, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 250);
    if (!canvas) return;

    const palette = ['#e2b714', '#6eb4e2', '#7ec984', '#b47ee2', '#e27ea8', '#7ee2c1'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: ds.colors || (ds.color || palette[i % palette.length]) + '80',
          borderColor: ds.colors ? ds.colors.map(c => c.replace('80', 'ff')) : (ds.color || palette[i % palette.length]),
          borderWidth: 1,
          borderRadius: 4,
          ...ds
        }))
      },
      options: {
        plugins: {
          legend: { display: datasets.length > 1, position: 'top' }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(100,102,105,0.1)' },
            ...options.yScale
          }
        },
        ...options.chartOptions
      }
    });
  },

  // Doughnut chart
  doughnut(containerId, labels, data, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 220);
    if (!canvas) return;

    const palette = options.colors || ['#e2b714', '#6eb4e2', '#7ec984', '#b47ee2', '#e27ea8', '#7ee2c1', '#e28314', '#ca4754'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: palette.slice(0, data.length),
          borderColor: '#323437',
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        cutout: options.cutout || '70%',
        plugins: {
          legend: { position: options.legendPosition || 'right', labels: { padding: 12 } }
        },
        ...options.chartOptions
      }
    });
  },

  // Radar chart
  radar(containerId, labels, datasets, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 300);
    if (!canvas) return;

    const palette = ['#e2b714', '#6eb4e2', '#7ec984'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'radar',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          borderColor: ds.color || palette[i % palette.length],
          backgroundColor: (ds.color || palette[i % palette.length]) + '20',
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          ...ds
        }))
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: options.max || 100,
            ticks: { stepSize: options.stepSize || 20, display: false },
            grid: { color: 'rgba(100,102,105,0.15)' },
            angleLines: { color: 'rgba(100,102,105,0.15)' },
            pointLabels: { font: { size: 11 } }
          }
        },
        plugins: {
          legend: { display: datasets.length > 1, position: 'top' }
        },
        ...options.chartOptions
      }
    });
  },

  // Horizontal bar chart
  horizontalBar(containerId, labels, datasets, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 300);
    if (!canvas) return;

    const palette = ['#e2b71480', '#6eb4e280'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: ds.color || palette[i % palette.length],
          borderColor: (ds.color || palette[i % palette.length]).replace('80', 'ff'),
          borderWidth: 1,
          borderRadius: 4,
          ...ds
        }))
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: datasets.length > 1, position: 'top' }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: options.max || undefined,
            grid: { color: 'rgba(100,102,105,0.1)' }
          },
          y: { grid: { display: false } }
        },
        ...options.chartOptions
      }
    });
  }
};
