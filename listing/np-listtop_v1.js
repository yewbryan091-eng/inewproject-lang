/* iNewProject . listing page: the facts strip and the order under the photos, v1 (20 Nov 2026). Loaded from the admin Header
   Scripts box; listing pages only (not e-Enquiry pages).
   1. The strip under the project name shows what a buyer decides on: Price from · Built-up · Bedrooms · Units still open ·
      Completion (was Price from · Tenure · Status · Completion). Built-up and Bedrooms come from the page's own Project Details
      (already in the visitor's language); a listing without one simply shows fewer boxes. "Units still open" is the same
      rounded number as the e-Enquiry tag (189 -> 150+, under 20 the real number), read from the count conv keeps for 10 minutes;
      until that count is known (or on a listing without e-Enquiry) the box shows Tenure, as before. Status is in Project Details.
   2. Selling Points come before Project Details (the reasons first, then the specs). The sections keep their alternating colours.
   Fail-safe: anything missing or any error -> the page stays as the site built it. */
(function () {
  var D = document, H = D.documentElement;
  if (!/^\/project\/[^\/]+\/?$/.test(location.pathname)) return;
  var T = { units: ['Units still open', 'Unit masih dibuka', '仍开放单位'] };
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function round(n) { var st = n < 20 ? 1 : n < 100 ? 10 : n < 1000 ? 50 : 100; return (Math.floor(n / st) * st).toLocaleString('en-MY') + (st > 1 ? '+' : ''); }
  function tidy(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }

  function order() {
    var sp = D.getElementById('selling-points'), pd = D.getElementById('project-details');
    if (!sp || !pd || pd.nextElementSibling !== sp || sp.querySelectorAll('.sp-card').length < 1) return;
    var a = sp.className, b = pd.className;
    pd.parentNode.insertBefore(sp, pd);
    if (a !== b) { sp.className = b; pd.className = a; }   // the alternating backgrounds stay in order
  }

  function strip() {
    var kf = D.querySelector('.key-facts'); if (!kf || kf.getAttribute('data-npl')) return;
    var items = [].slice.call(kf.querySelectorAll(':scope > .kf-item')); if (items.length < 3) return;
    var price = items[0], tenure = items[1], status = items[2], done = items[3] || null;
    kf.setAttribute('data-npl', '1');
    function pdRow(i) { var it = D.querySelectorAll('#project-details .project-detail-item')[i]; return it ? [tidy(it.querySelector('.project-detail-label') && it.querySelector('.project-detail-label').textContent), tidy(it.querySelector('.project-detail-value') && it.querySelector('.project-detail-value').textContent)] : null; }
    // Project Details rows: by the site's English key (data-np-k on translated text) or the EN / BM / 中文 label
    var rows = [].slice.call(D.querySelectorAll('#project-details .project-detail-item'));
    var iB = -1, iR = -1; rows.forEach(function (it, i) { var k = tidy((it.querySelector('.project-detail-label') || {}).getAttribute ? it.querySelector('.project-detail-label').getAttribute('data-np-k') || it.querySelector('.project-detail-label').textContent : ''); if (/^(built-?up|keluasan binaan|\u5efa\u7b51\u9762\u79ef)$/i.test(k)) iB = i; if (/^(bedrooms?\s*\/\s*bathrooms?|bilik tidur\s*\/\s*bilik air|\u5367\u5ba4\s*\/\s*\u6d74\u5ba4)$/i.test(k)) iR = i; });
    function mk(cls) { var e = D.createElement('div'); e.className = 'kf-item ' + cls; e.setAttribute('data-np-skip', ''); e.innerHTML = '<div class="kf-label"></div><div class="kf-value"></div>'; return e; }
    var built = iB >= 0 ? mk('npl-built') : null, beds = iR >= 0 ? mk('npl-beds') : null, units = mk('npl-units');
    if (built) kf.insertBefore(built, tenure); if (beds) kf.insertBefore(beds, tenure); kf.insertBefore(units, tenure);
    status.style.display = 'none';
    var link = D.querySelector('#e-enquiry a[href*="/e-enquiry"]'), key = '';
    try { if (link) key = 'npc_units:' + new URL(link.getAttribute('href'), location.href).pathname.replace(/\/?$/, '/'); } catch (e) {}
    function count() { try { var c = key && JSON.parse(localStorage.getItem(key) || 'null'); return c && Date.now() - c.t < 6e5 && c.n > 0 ? c.n : 0; } catch (e) { return 0; } }
    function paint() {
      var b = iB >= 0 && pdRow(iB), r = iR >= 0 && pdRow(iR);
      if (built && b) { built.querySelector('.kf-label').textContent = b[0]; built.querySelector('.kf-value').textContent = b[1]; }
      if (beds && r) { beds.querySelector('.kf-label').textContent = r[0].split('/')[0].trim(); beds.querySelector('.kf-value').textContent = r[1].split('/')[0].trim(); }
      var n = count();
      units.style.display = n ? '' : 'none'; tenure.style.display = n ? 'none' : '';
      if (n) { units.querySelector('.kf-label').textContent = T.units[L()]; units.querySelector('.kf-value').innerHTML = ''; units.querySelector('.kf-value').appendChild(D.createTextNode(round(n) + ' ')); var dot = D.createElement('i'); dot.className = 'npl-dot'; units.querySelector('.kf-value').appendChild(dot); }
      var shown = [].filter.call(kf.children, function (x) { return x.classList.contains('kf-item') && x.style.display !== 'none'; }).length;
      kf.style.setProperty('--npl-n', shown);
      kf.style.setProperty('--npl-cols', 'minmax(0,1.4fr) repeat(' + Math.max(1, shown - 1) + ',minmax(0,1fr))');   // the price box carries the affordable note
    }
    var css = D.createElement('style'); css.textContent = '@media (min-width:768px){.key-facts[data-npl]{grid-template-columns:var(--npl-cols,repeat(4,minmax(0,1fr)))!important}}' +
      '.npl-dot{display:inline-block;width:8px;height:8px;margin-left:2px;border-radius:50%;background:#1E9E5A;box-shadow:0 0 0 3px rgba(30,158,90,.16);vertical-align:middle}';
    D.head.appendChild(css);
    paint();
    // the count arrives when conv reads it (the e-Enquiry tag appears) or from another tab; the language can change
    try { var box = D.getElementById('e-enquiry'); if (box) new MutationObserver(function () { if (count()) paint(); }).observe(box, { childList: true, subtree: true }); } catch (e) {}
    addEventListener('storage', function (e) { if (e.key === key) paint(); });
    try { new MutationObserver(function () { setTimeout(paint, 300); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
  }

  function start() { try { order(); } catch (e) {} try { strip(); } catch (e) {} }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
