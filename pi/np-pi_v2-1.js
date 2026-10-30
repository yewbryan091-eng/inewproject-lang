/*
 * iNewProject e-Enquiry "Property Information" (v2.1, 30 Oct 2026; v2 28 Oct): the "Open facts" layout.
 *   v2.1: the price, type and completion columns line up at the top, so their titles stay on one line when an answer wraps;
 *   the Chinese property type wraps at the spaces around the dot, not inside a word.
 *   Open bands split by hairlines, a red accent on the top rule:
 *     1. the price, with the property type (a property icon) and the completion (a green clock) beside it; without a
 *        property type, the tenure takes its place;
 *     2. everything else in one white panel, location, developer, built-up and layouts first: title beside answer, two to
 *        a row with thin dividers (one per row, title above answer, on phones); an odd last fact stays on the left;
 *     then a "Floor Plan" link down to the page's own floor-plan section.
 *   The type is unchanged from v1: titles .74rem black caps, answers at the site's own size and weight, the price 2.2rem.
 *   Text-size rule (box 31): on screen, titles at least 12 px and everything else at least 14 px. Laptops (>=1200 px) run the
 *   page at zoom .9, so sizes there are x10/9; the bigger-text sheet (np-text) agrees with these minimums.
 *
 * A layer on top of the site's e-Enquiry page, loaded from the admin Header Scripts box:
 *   window.NP_PI_LIVE = true   → visitors see it. Leave it out (or false) for the hidden test.
 *   ?np_pi_preview=1           → this browser sees it while hidden (remembered; ?np_pi_preview=0 turns it off).
 *
 * Automatic for every e-Enquiry page, now and future: it reads the facts the admin entered and sorts them by title;
 * a title it doesn't know goes to the panel, in the admin's order.
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
  window.__nppi = 1;
  if (!/^\/project\/[^\/]+\/e-enquiry\/?$/.test(location.pathname)) return;

  var ICON = {
    type: '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5"/>',
    done: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'
  };
  var NAMES = {
    tenure: ['tenure'], type: ['property type'], size: ['built-up', 'built-up area', 'built-up range'],
    done: ['expected completion', 'completion', 'completion status', 'launched / completed'],
    lay: ['layouts', 'layout'], loc: ['location'], dev: ['developer']
  };

  var CSS = [
    '#project-info .pi-tiles.npi-off{display:none!important}',
    '.npi{position:relative;border-top:1px solid #e3ddd6}',
    '.npi:before{content:"";position:absolute;left:0;top:-1px;width:56px;height:2px;background:#D0021B}',
    '.npi .pi-tile-label{color:#141414;font-size:max(.74rem,12px);letter-spacing:.1em}',
    'html[data-np-lang="zh"] .npi .pi-tile-label{letter-spacing:.06em}',
    '.npi .pi-tile-value{margin-top:.5rem}',
    // 1. price | tenure | completion
    '.npi-b1{display:grid;grid-template-columns:minmax(0,1.5fr) repeat(var(--npi-k),minmax(0,1fr));gap:20px 40px;align-items:start;padding:28px 0 26px}',
    '.npi-b1.npi-noprice{grid-template-columns:repeat(var(--npi-k),minmax(0,1fr))}',
    '.npi-prices{display:grid;gap:18px;min-width:0}',
    '.npi-price .pi-tile-value{font-size:2.2rem;line-height:1.05;letter-spacing:-.02em}',
    '.npi-v{display:flex;gap:.5em;align-items:flex-start;margin-top:.5rem}',
    '.npi .npi-v .pi-tile-value{margin-top:0}',
    '.npi-v svg{flex:none;width:1.1em;height:1.1em;margin-top:.08em;font-size:1.02rem;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.npi-i-type svg{stroke:#141414}',
    '.npi-i-done svg{stroke:#1A7A45}',
    'html[data-np-lang="zh"] .npi-i-type .pi-tile-value{word-break:keep-all;overflow-wrap:anywhere}',
    // 2. the rest in one white panel, title beside answer, two to a row; an odd last fact stays on the left. The divider
    //    under each fact stops on the bottom row of each column (with an odd count, the right column ends a row higher).
    '.npi-more{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:56px;margin:24px 0 26px;padding:6px 28px;background:#fff;border:1px solid #BDB6AE;border-radius:14px}',
    '.npi-row{display:grid;grid-template-columns:170px minmax(0,1fr);gap:16px;align-items:baseline;padding:17px 0;border-bottom:1px solid #E5DFD8;min-width:0}',
    '.npi .npi-row .pi-tile-value{margin-top:0}',
    '.npi-row:last-child,.npi-row:nth-last-child(2){border-bottom:0}',
    '.npi>:first-child{border-top:0}',
    // the floor-plan link
    '.npi-foot{display:flex;justify-content:flex-end;padding:16px 0 2px;border-top:1px solid #e8e3dd}',
    '.npi-more+.npi-foot{border-top:0;padding-top:0}',
    '#project-info .npi .npi-foot a{display:inline-flex;align-items:center;gap:.55em;color:#D0021B;font-weight:700;font-size:max(.88rem,14px);text-decoration:none}',
    '#project-info .npi .npi-foot a:hover{text-decoration:underline}',
    '.npi-foot svg{width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '@media (min-width:1200px){',   // laptops: zoom .9, so x10/9 keeps the on-screen minimums
    ' .npi .pi-tile-label{font-size:max(calc(.74rem * 10 / 9),13.334px)}',
    ' #project-info .npi .npi-foot a{font-size:max(calc(.88rem * 10 / 9),15.556px)}',
    ' .npi-row{grid-template-columns:216px minmax(0,1fr)}',   // the larger titles stay on one line
    '}',
    '@media (max-width:980px){',
    ' .npi-b1,.npi-b1.npi-noprice{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}',
    ' .npi-b1 .npi-prices{grid-column:1/-1}',
    ' .npi-more{grid-template-columns:minmax(0,1fr)}',
    ' .npi-row:nth-last-child(2){border-bottom:1px solid #E5DFD8}',
    '}',
    '@media (max-width:760px){',
    ' .npi-b1,.npi-b1.npi-noprice{grid-template-columns:minmax(0,1fr);gap:18px;padding:22px 0 20px}',   // phones: price, type, completion stacked
    ' .npi-price .pi-tile-value{font-size:2rem}',
    ' .npi-price.npi-long .pi-tile-value{font-size:min(2rem,6.4vw)}',
    ' .npi-more{margin:20px 0;padding:2px 18px}',
    ' .npi-row{grid-template-columns:minmax(0,1fr);gap:0;padding:14px 0}',
    ' .npi .npi-row .pi-tile-value{margin-top:.45rem}',
    ' .npi-foot{justify-content:flex-start}',
    ' .npi-v svg{font-size:.95rem}',
    '}'
  ].join('\n');

  function key(el) {
    var k = el.getAttribute('data-np-k');
    if (k == null) k = el.textContent;
    return k.replace(/&amp;/g, '&').replace(/[\s\u00a0]+/g, ' ').trim().toLowerCase();
  }
  function div(cls) { var d = D.createElement('div'); d.className = cls; return d; }

  var tiles, made, box;
  function cell(cls, it) { var d = div(cls); d.appendChild(it.l); d.appendChild(it.v); return d; }
  // the icon sits beside the answer, not inside it, so the language switcher still reads the answer's own text
  function iconCell(cls, it, ico) {
    var c = div(cls); c.appendChild(it.l);
    var v = div('npi-v npi-i-' + ico); v.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[ico] + '</svg>';
    v.appendChild(it.v); c.appendChild(v); return c;
  }

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
    var used = [];
    function find(n) { for (var j = 0; j < items.length; j++) { var it = items[j]; if (it.full && used.indexOf(it) < 0 && NAMES[n].indexOf(it.k) >= 0) return it; } return null; }
    function take(it) { if (it) used.push(it); return it; }

    var prices = items.filter(function (it) { return it.full && /\bprice\b/.test(it.k); });
    prices.forEach(take);
    // 1. the property type (without it, the tenure) and the completion beside the price
    var b1 = [], t2 = take(find('type')), k2 = t2 || take(find('tenure')), k3 = take(find('done'));
    if (k2) b1.push([k2, t2 ? 'type' : '']);
    if (k3) b1.push([k3, 'done']);
    // 2. location, developer, built-up and layouts first, then the rest in the admin's order
    var first = [take(find('loc')), take(find('dev')), take(find('size')), take(find('lay'))].filter(Boolean);
    var rest = first.concat(items.filter(function (it) { return used.indexOf(it) < 0; }));

    var st = D.createElement('style'); st.id = 'npi-css'; st.textContent = CSS; D.head.appendChild(st);
    made = div('npi');
    if (prices.length || b1.length) {
      var top = div('npi-b1' + (prices.length ? '' : ' npi-noprice'));
      top.style.setProperty('--npi-k', b1.length || 1);
      if (prices.length) {
        var ps = div('npi-prices');
        prices.forEach(function (it) { ps.appendChild(cell('npi-price' + (it.v.textContent.replace(/\s+/g, ' ').trim().length > 18 ? ' npi-long' : ''), it)); });
        top.appendChild(ps);
      }
      b1.forEach(function (r) { top.appendChild(r[1] ? iconCell('npi-key', r[0], r[1]) : cell('npi-key', r[0])); });
      made.appendChild(top);
    }
    if (rest.length) {
      var more = div('npi-more');
      rest.forEach(function (it) { more.appendChild(cell('npi-row', it)); });
      made.appendChild(more);
    }
    if (D.getElementById('floor-plan')) {   // the page's own floor-plan section; "Floor Plan" is in the BM / 中文 dictionaries
      var f = div('npi-foot'), a = D.createElement('a');
      a.href = '#floor-plan'; a.appendChild(D.createTextNode('Floor Plan'));
      a.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>');
      f.appendChild(a); made.appendChild(f);
    }
    box.parentNode.insertBefore(made, box);
    box.classList.add('npi-off');
  }

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
