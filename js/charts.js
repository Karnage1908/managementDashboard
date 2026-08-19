// ============================================
// CHARTS — Cyber HUD Chart.js Configurations
// ============================================

const Charts = {
  instances: {},

  // Global Chart.js defaults for active theme
  initDefaults() {
    if (!window.Chart) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    Chart.defaults.color = isLight ? '#475569' : '#74968f';
    Chart.defaults.borderColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 255, 157, 0.08)';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
    Chart.defaults.plugins.legend.labels.padding = 16;
    Chart.defaults.plugins.legend.labels.color = isLight ? '#475569' : '#74968f';
    Chart.defaults.plugins.tooltip.backgroundColor = isLight ? '#ffffff' : '#0e171a';
    Chart.defaults.plugins.tooltip.titleColor = isLight ? '#059669' : '#00ff9d';
    Chart.defaults.plugins.tooltip.bodyColor = isLight ? '#0f172a' : '#e6f9f2';
    Chart.defaults.plugins.tooltip.titleFont = { weight: '600' };
    Chart.defaults.plugins.tooltip.borderColor = isLight ? 'rgba(5, 150, 105, 0.3)' : 'rgba(0, 255, 157, 0.35)';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.animation = { duration: 750, easing: 'easeOutQuart' };
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
  getCanvas(containerId, height = 220) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    container.innerHTML = '';
    container.style.height = height + 'px';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return canvas;
  },

  // Line chart with neon glowing gradients
  line(containerId, labels, datasets, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 220);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const palette = ['#00ff9d', '#00e5ff', '#e2b714', '#c084fc', '#f472b6', '#38bdf8'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map((ds, i) => {
          const baseColor = ds.color || palette[i % palette.length];
          let bg = ds.backgroundColor;
          if (ds.fill && !bg && ctx) {
            const grad = ctx.createLinearGradient(0, 0, 0, options.height || 220);
            grad.addColorStop(0, baseColor + '40');
            grad.addColorStop(1, baseColor + '00');
            bg = grad;
          }
          return {
            label: ds.label,
            data: ds.data,
            borderColor: baseColor,
            backgroundColor: bg || baseColor + '18',
            borderWidth: 2.5,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: baseColor,
            pointBorderColor: '#0a1012',
            pointBorderWidth: 2,
            tension: 0.45,
            fill: ds.fill !== undefined ? ds.fill : true,
            ...ds
          };
        })
      },
      options: {
        plugins: {
          legend: { display: datasets.length > 1, position: 'top' }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#74968f', font: { family: "'JetBrains Mono', monospace", size: 10 } }
          },
          y: {
            beginAtZero: options.beginAtZero !== false,
            grid: { color: 'rgba(0, 255, 157, 0.06)' },
            ticks: { color: '#74968f', font: { family: "'JetBrains Mono', monospace", size: 10 } },
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
    const canvas = this.getCanvas(containerId, options.height || 220);
    if (!canvas) return;

    const palette = ['#00ff9d', '#00e5ff', '#e2b714', '#c084fc', '#f472b6', '#38bdf8'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: ds.colors || (ds.color || palette[i % palette.length]) + 'aa',
          borderColor: ds.colors ? ds.colors.map(c => c.replace('aa', 'ff')) : (ds.color || palette[i % palette.length]),
          borderWidth: 1,
          borderRadius: 6,
          ...ds
        }))
      },
      options: {
        plugins: {
          legend: { display: datasets.length > 1, position: 'top' }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#74968f', font: { family: "'JetBrains Mono', monospace", size: 10 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 255, 157, 0.06)' },
            ticks: { color: '#74968f', font: { family: "'JetBrains Mono', monospace", size: 10 } },
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
    const canvas = this.getCanvas(containerId, options.height || 200);
    if (!canvas) return;

    const palette = options.colors || ['#00ff9d', '#00e5ff', '#e2b714', '#c084fc', '#f472b6', '#38bdf8', '#fb923c', '#ff385c'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: palette.slice(0, data.length),
          borderColor: '#0a1012',
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        cutout: options.cutout || '72%',
        plugins: {
          legend: { position: options.legendPosition || 'right', labels: { padding: 12, color: '#74968f' } }
        },
        ...options.chartOptions
      }
    });
  },

  // Radar chart
  radar(containerId, labels, datasets, options = {}) {
    this.destroy(containerId);
    const canvas = this.getCanvas(containerId, options.height || 280);
    if (!canvas) return;

    const palette = ['#00ff9d', '#00e5ff', '#e2b714'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'radar',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          borderColor: ds.color || palette[i % palette.length],
          backgroundColor: (ds.color || palette[i % palette.length]) + '25',
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: ds.color || palette[i % palette.length],
          ...ds
        }))
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: options.max || 100,
            ticks: { stepSize: options.stepSize || 20, display: false },
            grid: { color: 'rgba(0, 255, 157, 0.12)' },
            angleLines: { color: 'rgba(0, 255, 157, 0.12)' },
            pointLabels: { color: '#74968f', font: { size: 11 } }
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
    const canvas = this.getCanvas(containerId, options.height || 280);
    if (!canvas) return;

    const palette = ['#00ff9daa', '#00e5ffaa'];

    this.instances[containerId] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          backgroundColor: ds.color || palette[i % palette.length],
          borderColor: (ds.color || palette[i % palette.length]).replace('aa', 'ff'),
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
            grid: { color: 'rgba(0, 255, 157, 0.06)' },
            ticks: { color: '#74968f' }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#74968f' }
          }
        },
        ...options.chartOptions
      }
    });
  }
};
