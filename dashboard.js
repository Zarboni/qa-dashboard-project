/**
 * dashboard.js
 * Fetches test result data from data/test-results.json and
 * renders all dashboard components: summary cards, progress
 * bar, stacked bar chart, and the detailed suite table.
 */

// ── Entry point ──────────────────────────────────────────
// Wait for the page to fully load, then kick off data fetch.
document.addEventListener('DOMContentLoaded', () => {
  loadDashboard();
});

// ── Data loading ─────────────────────────────────────────
async function loadDashboard() {
  try {
    const response = await fetch('data/test-results.json');

    // Throw a readable error if the file couldn't be found.
    if (!response.ok) {
      throw new Error(`Could not load test data (HTTP ${response.status})`);
    }

    const data = await response.json();
    renderDashboard(data);

  } catch (error) {
    showError(error.message);
  }
}

// ── Main render ──────────────────────────────────────────
// Orchestrates all render calls once the data is available.
function renderDashboard(data) {
  renderLastUpdated(data.lastUpdated);
  renderSummaryCards(data.summary);
  renderProgressBar(data.summary);
  renderChart(data.suites, data.summary.total);
  renderTable(data.suites);
}

// ── Last updated timestamp ────────────────────────────────
function renderLastUpdated(isoString) {
  const el = document.getElementById('last-updated');
  const date = new Date(isoString);

  // Format: "Wed 30 Apr 2025, 10:00"
  el.textContent = 'Last updated: ' + date.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ── Summary cards ────────────────────────────────────────
function renderSummaryCards(summary) {
  const passRate = calculatePassRate(summary.passed, summary.total);

  document.getElementById('total').textContent   = summary.total;
  document.getElementById('passed').textContent  = summary.passed;
  document.getElementById('failed').textContent  = summary.failed;
  document.getElementById('skipped').textContent = summary.skipped;
  document.getElementById('pass-rate').textContent = passRate + '%';
}

// ── Progress bar ─────────────────────────────────────────
function renderProgressBar(summary) {
  const passRate = calculatePassRate(summary.passed, summary.total);
  const fill     = document.getElementById('progress-bar-fill');
  const label    = document.getElementById('progress-bar-label');
  const wrapper  = document.getElementById('progress-bar-wrapper');

  // Update ARIA value so screen readers announce the percentage.
  wrapper.setAttribute('aria-valuenow', passRate);

  // Animate the bar width (CSS transition handles the smoothing).
  fill.style.width = passRate + '%';
  label.textContent = passRate + '%';

  // Turn bar red if pass rate drops below 70% to signal a problem.
  if (passRate < 70) {
    fill.classList.add('critical');
  }
}

// ── Stacked bar chart ────────────────────────────────────
// Each suite gets a row with three colour-coded segments
// representing passed, failed, and skipped counts.
function renderChart(suites, totalTests) {
  const chart = document.getElementById('chart');

  suites.forEach(suite => {
    const row = document.createElement('div');
    row.className = 'chart-row';

    // Suite name label on the left
    const labelEl = document.createElement('span');
    labelEl.className = 'chart-label';
    labelEl.title = suite.name;   // full name on hover if truncated
    labelEl.textContent = suite.name;

    // Bar track containing the three coloured segments
    const track = document.createElement('div');
    track.className = 'chart-bar-track';

    track.appendChild(makeBarSegment('bar-passed',  suite.passed,  suite.total));
    track.appendChild(makeBarSegment('bar-failed',  suite.failed,  suite.total));
    track.appendChild(makeBarSegment('bar-skipped', suite.skipped, suite.total));

    row.appendChild(labelEl);
    row.appendChild(track);
    chart.appendChild(row);
  });
}

// Creates a single coloured segment for the stacked bar.
// Width is the percentage of that result type within the suite.
function makeBarSegment(className, count, suiteTotal) {
  const segment = document.createElement('div');
  segment.className = className;

  const pct = suiteTotal > 0 ? (count / suiteTotal) * 100 : 0;
  segment.style.width = pct + '%';

  // Tooltip shows the raw number on hover.
  segment.title = `${count} (${Math.round(pct)}%)`;

  return segment;
}

// ── Suite table ──────────────────────────────────────────
function renderTable(suites) {
  const tbody = document.getElementById('suite-table-body');

  suites.forEach(suite => {
    const passRate = calculatePassRate(suite.passed, suite.total);
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${escapeHtml(suite.name)}</td>
      <td>${suite.total}</td>
      <td>${suite.passed}</td>
      <td>${suite.failed}</td>
      <td>${suite.skipped}</td>
      <td>${passRate}%</td>
      <td><span class="badge badge--${suite.status}">${suite.status}</span></td>
    `;

    tbody.appendChild(tr);
  });
}

// ── Helpers ───────────────────────────────────────────────

// Returns pass rate as a whole-number percentage string.
function calculatePassRate(passed, total) {
  if (total === 0) return 0;
  return Math.round((passed / total) * 100);
}

// Prevents XSS when injecting user-supplied strings into innerHTML.
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Displays a friendly error banner when data fails to load.
function showError(message) {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div style="
      background:#fff5f5;
      border:1px solid #fc8181;
      border-radius:8px;
      padding:1.5rem;
      color:#c53030;
      font-size:0.95rem;
    ">
      <strong>Failed to load dashboard data.</strong><br/>
      ${escapeHtml(message)}<br/><br/>
      Make sure you are serving this project over HTTP (not opening index.html
      directly as a file). Run: <code>npx serve .</code> or
      <code>python3 -m http.server 8080</code>
    </div>
  `;
}
