// ── Shared utilities ─────────────────────────────────────────
// Small, pure helper functions used across multiple modules.

/** Cached element lookup by ID. */
const _els = {};
export function $(id) {
  return _els[id] || (_els[id] = document.getElementById(id));
}

/** Escape HTML special characters. */
export function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Show a temporary toast notification. */
let _toastTimer = null;
export function showToast(msg) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('visible'), 2000);
}

/**
 * Build an SVG radar/pentagon chart for the five virtue axes.
 * @param {Array<{key:string,label:string}>} axes
 * @param {Object<string,number>} scores 0-100 per axis key
 * @returns {string} SVG markup
 */
export function radarSvg(axes, scores) {
  // viewBox is padded beyond the chart radius so axis labels never clip.
  const size = 300, cx = size / 2, cy = size / 2, r = 92;
  const n = axes.length;
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i, frac) => [cx + Math.cos(angle(i)) * r * frac, cy + Math.sin(angle(i)) * r * frac];

  const rings = [0.25, 0.5, 0.75, 1].map((f) => {
    const pts = axes.map((_, i) => point(i, f).map((v) => v.toFixed(1)).join(',')).join(' ');
    return `<polygon class="radar-ring" points="${pts}"></polygon>`;
  }).join('');

  const spokes = axes.map((_, i) => {
    const [x, y] = point(i, 1);
    return `<line class="radar-spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"></line>`;
  }).join('');

  const dataPts = axes.map((a, i) => point(i, (scores[a.key] || 0) / 100).map((v) => v.toFixed(1)).join(',')).join(' ');
  const dataPoly = `<polygon class="radar-area" points="${dataPts}"></polygon>`;

  const labels = axes.map((a, i) => {
    const [x, y] = point(i, 1.16);
    // Anchor by horizontal position so side labels grow inward, not off-canvas.
    const dx = x - cx;
    const anchor = dx > 8 ? 'start' : dx < -8 ? 'end' : 'middle';
    return `<text class="radar-label" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle">${escHtml(a.label)}</text>`;
  }).join('');

  // Horizontal padding in the viewBox gives long side labels (e.g. "Imagination") room.
  const pad = 56;
  return `<svg viewBox="${-pad} 0 ${size + pad * 2} ${size}" class="radar" role="img" aria-label="Virtue radar chart">${rings}${spokes}${dataPoly}${labels}</svg>`;
}

/** Download a string as a file. */
export function downloadFile(name, text, type = 'application/json') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
