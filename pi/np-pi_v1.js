/*
 * iNewProject e-Enquiry "Property Information" as a price headline + key-facts row (v1, 26 Oct 2026).
 *   Bryan picked option D (25 Oct): price as the headline with the developer beside it, one ruled row of key facts with
 *   brand-red line icons, the rest as a two-column list. Titles in black and a little bigger than the site's tiles
 *   (26 Oct); answers keep the site's own size and weight. Modelled on Rightmove's new-homes page: no boxes.
 *
 * A layer on top of EasyAsia's e-Enquiry page, loaded from the admin Header Scripts box:
 *   window.NP_PI_LIVE = true   → visitors see it. Leave it out (or false) for the hidden test.
 *   ?np_pi_preview=1           → this browser sees it while hidden (remembered; ?np_pi_preview=0 turns it off).
 *
 * Automatic for every e-Enquiry page, now and future: it reads the facts the admin entered and sorts them by title.
 *   · any title with "Price" in it → the headline (two prices sit side by side); "Developer" → beside the price
 *   · Location / Property Type / Built-up (Area, Range) / Completion (Expected, Status) → the icon row, in that order
 *     (only when at least two of them are there)
 *   · every other fact → the list, in the admin's order. A title we don't know just lands in the list.
 *
 * Do no harm: it moves the site's own title/answer elements (never copies or rewrites them), so the language switcher
 * translates them as before. It only draws when the section has exactly the site's tile markup; if anything throws,
 * every element goes back into its tile and the site's tiles show again.
 */
(function () {
  'use strict';
  var D = document, KEY = 'np_pi_preview', on = window.NP_PI_LIVE === true;
  try {
    var pv = /[?&]np_pi_preview=([01])/.exec(location.search);
    if (pv) { if (pv[1] === '1') localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); }
    if (localStorage.getItem(KEY) === '1') on = true;
  } catch (e) {}
  if (!on || window.NP_PI_LIVE === false || window.__nppi) return;
  window.__nppi = 1;   // the block pasted twice still draws once
  if (!/^\/project\/[^\/]+\/e-enquiry\/?$/.test(location.pathname)) return;

  // The icon row: one fact per kind, matched on the English title (lower case).
  var ROW = [
    ['location', ['location'],
      '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0z"/><circle cx="12" cy="10" r="2.5"/>'],
    ['type', ['property type'],
      '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5"/>'],
    ['size', ['built-up', 'built-up area', 'built-up range'],
      '<path d="M3 3h18v18H3zM3 9h6M15 3v6M9 21v-6M21 15h-6"/>'],
    ['done', ['expected completion', 'completion', 'completion status'],
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 15l2.5 2.5L16 13"/>']
  ];

  var CSS = [
    '#project-info .pi-tiles.npi-off{display:none!important}',
    '.npi{border-top:1px solid #dcd6cf;border-bottom:1px solid #dcd6cf}',
    '.npi .pi-tile-label{color:#141414;font-size:.74rem;letter-spacing:.1em}',
    'html[data-np-lang="zh"] .npi .pi-tile-label{letter-spacing:.06em}',
    '.npi .pi-tile-value{margin-top:.5rem}',
    '.npi-top{display:flex;justify-content:space-between;align-items:flex-end;gap:16px 40px;flex-wrap:wrap;padding:26px 0 24px}',
    '.npi-prices{display:flex;flex-wrap:wrap;gap:16px 56px;min-width:0}',
    '.npi-price .pi-tile-value{font-size:2.2rem;line-height:1.05;letter-spacing:-.02em}',
    '.npi-dev{text-align:right;max-width:min(560px,50%)}',
    '.npi-top.npi-solo .npi-dev{text-align:left;max-width:none}',
    '.npi-facts{display:grid;grid-template-columns:repeat(var(--npi-n),minmax(0,1fr));gap:20px 36px;padding:24px 0 26px}',
    '.npi-top+.npi-facts,.npi-top+.npi-more,.npi-facts+.npi-more{border-top:1px solid #e8e3dd}',
    '.npi-v{display:flex;gap:.5em;align-items:flex-start;margin-top:.5rem}',
    '.npi .npi-v .pi-tile-value{margin-top:0}',
    '.npi-v svg{flex:none;width:1.1em;height:1.1em;margin-top:.08em;font-size:1.02rem;fill:none;stroke:#D0021B;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.npi-more{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:64px}',
    '.npi-row{display:grid;grid-template-columns:190px minmax(0,1fr);gap:20px;padding:16px 0;border-bottom:1px solid #eee9e3;align-items:baseline}',
    '.npi .npi-row .pi-tile-value{margin-top:0}',
    '.npi-more .npi-row:last-child,.npi-more .npi-row:nth-last-child(2):nth-child(odd){border-bottom:0}',
    '@media (max-width:980px){',
    ' .npi-facts{grid-template-columns:repeat(2,minmax(0,1fr))}',
    ' .npi-more{grid-template-columns:minmax(0,1fr)}',
    ' .npi-more .npi-row:nth-last-child(2):nth-child(odd){border-bottom:1px solid #eee9e3}',
    '}',
    '@media (max-width:760px){',
    ' .npi-top{display:grid;gap:18px;padding:20px 0}',
    ' .npi-prices{display:grid;gap:18px}',
    ' .npi-price .pi-tile-value{font-size:2rem}',
    ' .npi-price.npi-long .pi-tile-value{font-size:min(2rem,6.4vw)}',   // a price range ("RM 517,000 - RM 629,000") stays on one line
    ' .npi-dev{text-align:left;max-width:none}',
    ' .npi-facts{grid-template-columns:minmax(0,1fr);gap:16px;padding:20px 0}',
    ' .npi-row{grid-template-columns:minmax(0,1fr);gap:0;padding:13px 0}',
    ' .npi .npi-row .pi-tile-value{margin-top:.5rem}',
    ' .npi-v svg{font-size:.95rem}',
    '}'
  ].join('\n');

  // The English title, whether or not the language switcher has already marked it.
  function key(el) {
    var k = el.getAttribute('data-np-k');
    if (k == null) k = el.textContent;
    return k.replace(/&amp;/g, '&').replace(/[\s\u00a0]+/g, ' ').trim().toLowerCase();
  }
  function div(cls) { var d = D.createElement('div'); d.className = cls; return d; }

  var tiles, made, box;
  function take(it, parent) { parent.appendChild(it.l); return parent; }
  function cell(cls, it) { var d = div(cls); take(it, d); d.appendChild(it.v); return d; }

  function start() {
    box = D.querySelector('#project-info .pi-tiles');
    if (!box || box.children.length < 2) return;
    var items = [];
    for (var i = 0; i < box.children.length; i++) {
      var t = box.children[i];
      if (!t.classList.contains('pi-tile') || t.children.length !== 2) return;
      var l = t.children[0], v = t.children[1];
      if (!l.classList.contains('pi-tile-label') || !v.classList.contains('pi-tile-value')) return;
      var k = key(l);
      if (!k) return;
      items.push({ t: t, l: l, v: v, k: k, full: /[A-Za-z0-9\u00c0-\u024f\u3400-\u9fff]/.test(v.textContent) });
    }
    tiles = items;

    var prices = items.filter(function (it) { return it.full && /\bprice\b/.test(it.k); });
    var dev = items.filter(function (it) { return it.full && it.k === 'developer'; })[0] || null;
    var row = [];
    ROW.forEach(function (r) {
      for (var j = 0; j < items.length; j++) {
        var it = items[j];
        if (it.full && r[1].indexOf(it.k) >= 0 && prices.indexOf(it) < 0) { row.push([it, r[2]]); return; }
      }
    });
    if (row.length < 2) row = [];   // one fact alone is not a row: it stays in the list
    var used = prices.concat(dev ? [dev] : [], row.map(function (r) { return r[0]; }));
    var rest = items.filter(function (it) { return used.indexOf(it) < 0; });

    var st = D.createElement('style'); st.id = 'npi-css'; st.textContent = CSS; D.head.appendChild(st);
    made = div('npi');
    if (prices.length || dev) {
      var top = div('npi-top' + (prices.length ? '' : ' npi-solo'));
      if (prices.length) {
        var ps = div('npi-prices');
        prices.forEach(function (it) { ps.appendChild(cell('npi-price' + (it.v.textContent.replace(/\s+/g, ' ').trim().length > 18 ? ' npi-long' : ''), it)); });
        top.appendChild(ps);
      }
      if (dev) top.appendChild(cell('npi-dev', dev));
      made.appendChild(top);
    }
    if (row.length) {
      var facts = div('npi-facts');
      facts.style.setProperty('--npi-n', row.length);
      row.forEach(function (r) {
        var c = take(r[0], div('npi-fact'));
        // the icon sits beside the answer, not inside it, so the language switcher still reads the answer's own text
        var v = div('npi-v');
        v.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + r[1] + '</svg>';
        v.appendChild(r[0].v);
        c.appendChild(v);
        facts.appendChild(c);
      });
      made.appendChild(facts);
    }
    if (rest.length) {
      var more = div('npi-more');
      rest.forEach(function (it) { more.appendChild(cell('npi-row', it)); });
      made.appendChild(more);
    }
    box.parentNode.insertBefore(made, box);
    box.classList.add('npi-off');
  }

  // Anything wrong: every title and answer back into its own tile, our block gone, the site's tiles shown.
  function undo() {
    try {
      (tiles || []).forEach(function (it) { it.t.appendChild(it.l); it.t.appendChild(it.v); });
      if (made && made.parentNode) made.parentNode.removeChild(made);
      if (box) box.classList.remove('npi-off');
      var st = D.getElementById('npi-css'); if (st) st.parentNode.removeChild(st);
    } catch (e) {}
  }
  function safeStart() { try { start(); } catch (e) { undo(); } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
