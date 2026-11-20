/* iNewProject . New Launches cards: units open inside the e-Enquiry pill, v1 (20 Nov 2026). Loaded from the admin Header
   Scripts box; New Launches pages only (/project/, /project/12/ ...).
   The card's own pill "e-ENQUIRY AVAILABLE" becomes "e-ENQUIRY · 150+ UNITS OPEN" (BM "UNIT DIBUKA", 中文 "个单位开放").
   The number comes from a file counted once a day (GitHub Actions "e-Enquiry counts", 06:30 MYT, the same rule as the listing's
   tag). Because it can be up to a day old, the card never claims the full count: 10% off first, then rounded down
   (189 -> 150+, 561 -> 500+, 41 -> 30+); under 20 the pill says "FEW UNITS LEFT"; 0 changes nothing.
   Fail-safe: no file, a file older than 48 hours, an odd value or any error -> the pill stays as the site made it. */
(function () {
  var W = window, D = document, H = D.documentElement;
  if (!/^\/project\/?(\d+\/?)?$/.test(location.pathname) || W.__NPCC__) return; W.__NPCC__ = 1;
  var SRC = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@counts/eenquiry-counts.json', KEY = 'npcc_v1', MAXAGE = 48 * 36e5;
  var T = { open: ['e-ENQUIRY · {n} UNITS OPEN', 'e-ENQUIRY · {n} UNIT DIBUKA', 'e-ENQUIRY · {n} 个单位开放'],
            few: ['e-ENQUIRY · FEW UNITS LEFT', 'e-ENQUIRY · UNIT TERHAD', 'e-ENQUIRY · 单位所剩无几'] };
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function label(n) {
    if (!(n > 0)) return '';
    var m = Math.floor(n * 0.9);
    if (m < 20) return T.few[L()];
    var st = m < 100 ? 10 : m < 1000 ? 50 : 100;
    return T.open[L()].replace('{n}', (Math.floor(m / st) * st).toLocaleString('en-MY') + '+');
  }
  function valid(d) {
    if (!d || typeof d.t !== 'string' || !d.counts || typeof d.counts !== 'object') return null;
    var t = Date.parse(d.t); if (!(t > 0) || Date.now() - t > MAXAGE || t - Date.now() > 36e5) return null;
    var c = {}; Object.keys(d.counts).forEach(function (k) { var n = d.counts[k]; if (/^[a-z0-9-]+$/.test(k) && Number.isInteger(n) && n >= 0 && n <= 5000) c[k] = n; });
    return Object.keys(c).length ? c : null;
  }
  function day() { return new Date(Date.now() + 8 * 36e5).toISOString().slice(0, 10); }   // Malaysia date: one fresh copy a day
  function load() {
    try { var s = JSON.parse(sessionStorage.getItem(KEY) || 'null'); var v = s && s.day === day() && valid(s.d); if (v) return Promise.resolve(v); } catch (e) {}
    if (!W.fetch) return Promise.resolve(null);
    var ctl = W.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
    return fetch(SRC + '?d=' + day(), { credentials: 'omit', signal: ctl ? ctl.signal : undefined }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { clearTimeout(to); var v = valid(d); if (v) { try { sessionStorage.setItem(KEY, JSON.stringify({ day: day(), d: d })); } catch (e) {} } return v; })
      .catch(function () { clearTimeout(to); return null; });
  }
  var C = null;
  function paint() {
    if (!C) return;
    [].forEach.call(D.querySelectorAll('.project-card .project-ebadge'), function (b) {
      var card = b.closest('.project-card'), a = card && card.querySelector('a[href*="/project/"]'), m = a && /\/project\/([^\/?#]+)/.exec(a.getAttribute('href') || '');
      var txt = m && label(C[m[1]]); if (!txt) return;
      if (!b.hasAttribute('data-npcc')) { b.setAttribute('data-npcc', ''); b.setAttribute('data-np-skip', ''); b.setAttribute('translate', 'no'); }
      if (b.textContent !== txt) b.textContent = txt;
    });
  }
  var q; function later() { if (!q) q = setTimeout(function () { q = 0; try { paint(); } catch (e) {} }, 120); }
  function start() {
    if (!D.querySelector('.project-card')) return;
    load().then(function (v) { C = v; if (!C) return; paint();
      try { new MutationObserver(later).observe(D.body, { childList: true, subtree: true }); } catch (e) {}
      try { new MutationObserver(later).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
      addEventListener('np:cards', later); });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
