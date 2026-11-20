/* iNewProject . listing page: the facts strip and the order under the photos, v1-2 (21 Nov 2026) = v1-1 + when Selling Points
   move above Project Details only the site's background class (alt) is swapped; v1 / v1-1 swapped the whole class list, which
   carried the Selling Points add-on's own classes (npsp-*) to Project Details, so the site's original cards showed twice.
   Also: a facts-strip box with no value (a listing without Tenure) hides, and Project Details' side card hides when it has
   nothing to tap (the site hides its button; listings without e-Enquiry showed a title and a sentence only): the details card
   takes the full width, 3 columns on laptops.
   v1-1 (21 Nov 2026) = v1 + the tab bar lights the
   right tab again: the site picks the last section in its own fixed list whose top has passed the bar, so after v1 moved
   Selling Points above Project Details (and with the tabs we hide) no tab was red at Project Details. v1-1 picks by where the
   sections really are, and when that section's tab is hidden it lights the nearest visible tab above it (About -> Project
   Details, Amenities -> Facilities ...); on phones the bar slides so the red tab stays in view. v1 (20 Nov 2026). Loaded from the admin Header
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
    var a = sp.classList.contains('alt'), b = pd.classList.contains('alt');
    pd.parentNode.insertBefore(sp, pd);
    if (a !== b) { sp.classList.toggle('alt', b); pd.classList.toggle('alt', a); }   // the alternating backgrounds stay in order (only the site's class moves)
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
      units.style.display = n ? '' : 'none'; tenure.style.display = n || !tidy((tenure.querySelector('.kf-value') || {}).textContent) ? 'none' : '';
      if (n) { units.querySelector('.kf-label').textContent = T.units[L()]; units.querySelector('.kf-value').innerHTML = ''; units.querySelector('.kf-value').appendChild(D.createTextNode(round(n) + ' ')); var dot = D.createElement('i'); dot.className = 'npl-dot'; units.querySelector('.kf-value').appendChild(dot); }
      if (done) done.style.display = tidy((done.querySelector('.kf-value') || {}).textContent) ? '' : 'none';
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

  // v1-1: the red tab follows the section on screen (the site's own rule runs first; this runs after it on every scroll)
  function spy() {
    var nav = D.querySelector('.section-nav'), links = nav ? [].slice.call(nav.querySelectorAll('.snav-link[onclick*="scrollToSection("]')) : [];
    if (links.length < 2) return;
    var items = links.map(function (a) { var m = /scrollToSection\('([^']+)'\)/.exec(a.getAttribute('onclick') || ''); return { a: a, el: m && D.getElementById(m[1]) }; }).filter(function (x) { return x.el; });
    if (items.length < 2) return;
    var last = null;
    function shown(a) { return getComputedStyle(a).display !== 'none' && a.getBoundingClientRect().width > 0; }
    function run() {
      try {
        // sections in page order; the current one = the last whose top has passed the bar (the site's 140 px line)
        var byPos = items.slice().sort(function (p, q) { return p.el.getBoundingClientRect().top - q.el.getBoundingClientRect().top; });
        var cur = -1; byPos.forEach(function (x, i) { if (x.el.getBoundingClientRect().top <= 140) cur = i; });
        var pick = null;
        for (var i = cur; i >= 0; i--) if (shown(byPos[i].a)) { pick = byPos[i].a; break; }
        if (!pick && cur >= 0) for (var j = cur + 1; j < byPos.length; j++) if (shown(byPos[j].a)) { pick = byPos[j].a; break; }
        links.forEach(function (a) { var on = a === pick; if (a.classList.contains('active') !== on) a.classList.toggle('active', on); });
        if (pick && pick !== last && nav.scrollWidth > nav.clientWidth + 2) {   // phones: keep the red tab in view
          var r = pick.getBoundingClientRect(), n = nav.getBoundingClientRect();
          if (r.left < n.left + 8 || r.right > n.right - 8) nav.scrollLeft += (r.left + r.width / 2) - (n.left + n.width / 2);
        }
        last = pick;
      } catch (e) {}
    }
    var q = 0; function soon() { if (!q) q = requestAnimationFrame(function () { q = 0; run(); }); }
    addEventListener('scroll', soon, { passive: true }); addEventListener('resize', soon); addEventListener('load', soon); setTimeout(run, 400); run();
  }

  // v1-2: Project Details' side card with nothing to tap (no visible button or link, no incentive choices) hides
  function pdCard() {
    var sc = D.querySelector('.project-details-showcase'), card = sc && sc.querySelector(':scope > .quick-ebooking-card');
    if (!card || card.querySelector('.qc-opt') || !sc.querySelector(':scope > .project-details-card')) return;
    if ([].some.call(card.querySelectorAll('a,button'), function (x) { return x.offsetParent !== null; })) return;
    var css = D.createElement('style'); css.id = 'npl-pd-css'; css.textContent = 'html.npl-pdfull .project-details-showcase>.quick-ebooking-card{display:none!important}html.npl-pdfull .project-details-showcase{grid-template-columns:minmax(0,1fr)!important}' +
      '@media (min-width:992px){html.npl-pdfull .project-details-showcase .project-details-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}' +
      'html.npl-pdfull .project-details-grid>:nth-child(3n+1):nth-last-child(-n+3),html.npl-pdfull .project-details-grid>:nth-child(3n+1):nth-last-child(-n+3)~*{border-bottom-color:transparent!important}}';
    D.head.appendChild(css); H.classList.add('npl-pdfull');
  }

  function start() { try { order(); } catch (e) {} try { strip(); } catch (e) {} try { spy(); } catch (e) {} try { pdCard(); } catch (e) {} }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
