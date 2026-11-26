/* iNewProject . New Launches: v1.3 (26 Nov 2026) = v1.2 + the "New Project By State" list (owner 26 Nov):
   - "Klang Valley" over Kuala Lumpur, Selangor and Putrajaya, "Other states" over the rest (BM / 中文). Headings only: the
     site cannot list two states at once, so every row keeps opening the site's own page with the site's own count.
   Both lists: the side list on laptops and the phone panel. Off switch for this part: NP_STATES_LIVE = false.
   Headings only when Kuala Lumpur, Selangor and Putrajaya come first and together (else none).
   States with 0 projects stay as the site shows them (owner 26 Nov: leave them for now); the site itself already leaves out areas with 0.
   v1.2: the NEW tag on state rows, (17 Nov 2026) = v1.1 with Selangor until 2026-12-16 (680 Damaira, 681 Queensville and 682 Taman Sungai Bertek went live 16 Nov); nothing else changed.
   v1.1 (6 Nov 2026). Loaded from the admin Header Scripts box, with np-found_v1.css.
   A state with a project added in the last 30 days gets the tag, in the side list and in the phone panel, on /project/ and its
   page numbers. The site sends the page no "date added", so this list is kept by hand: a new project = a new end date here
   (new file + one box line). End date = the first day without the tag, Malaysia time, so it switches off by itself.
   No tag next to a count of 0. Off switch (the tag and the count line): NP_FOUND_LIVE = false. */
(function () {
  'use strict';
  var NEW_UNTIL = {
    'Negeri Sembilan': '2026-12-06',
    'Selangor': '2026-12-16',
    'Kuala Lumpur': '2026-11-19'
  };
  if (window.NP_FOUND_LIVE === false) { document.documentElement.classList.add('npf-off'); return; }
  if (!/^\/project\/(\d+\/?)?$/.test(location.pathname)) return;
  function tag() {
    var now = Date.now();
    var rows = document.querySelectorAll('#projectListing .accordion-trigger, .mobile-filter .header-accordion-trigger');
    for (var i = 0; i < rows.length; i++) {
      var img = rows[i].querySelector('img.marker'), state = img && img.getAttribute('alt');
      if (!state || !Object.prototype.hasOwnProperty.call(NEW_UNTIL, state)) continue;
      if (!(now < Date.parse(NEW_UNTIL[state] + 'T00:00:00+08:00'))) continue;
      var count = rows[i].querySelector('.count'), label = rows[i].querySelector('.label');
      if (!label || !count || !(parseInt(count.textContent, 10) > 0)) continue;
      rows[i].classList.add('npf-row');
      (label.querySelector('a') || label).classList.add('npf-new');
    }
  }
  // v1.3: the state list for buyers
  var KV = { 'Kuala Lumpur': 1, 'Selangor': 1, 'Putrajaya': 1 };
  var W = { kv: ['Klang Valley', 'Lembah Klang', '\u5df4\u751f\u8c37'], other: ['Other states', 'Negeri lain', '\u5176\u4ed6\u5dde\u5c5e'] };
  function L() { var l = document.documentElement.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function states() {
    if (window.NP_STATES_LIVE === false) return;
    if (!document.getElementById('npf-st-css')) { var st = document.createElement('style'); st.id = 'npf-st-css';
      st.textContent = '.npf-grp{margin:14px 4px 6px;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#4A4F4B;line-height:1.3}';
      document.head.appendChild(st); }
    var lists = [document.querySelector('.col-lg-3 .fact-card'), document.querySelector('.mobile-filter')];
    lists.forEach(function (box) {
      if (!box || box.getAttribute('data-npf-st')) return;
      var items = [].slice.call(box.querySelectorAll('.accordion-item')).filter(function (it) { return !it.classList.contains('all-state-item'); });
      if (items.length < 2) return;
      var kv = [], other = [];
      items.forEach(function (it) {
        var trig = it.querySelector('.accordion-trigger, .header-accordion-trigger'), img = trig && trig.querySelector('img.marker'), name = img ? img.getAttribute('alt') : '';
        (Object.prototype.hasOwnProperty.call(KV, name) ? kv : other).push(it);
      });
      function head(k, before) { var d = document.createElement('div'); d.className = 'npf-grp'; d.setAttribute('data-np-skip', ''); d.setAttribute('translate', 'no'); d.setAttribute('data-k', k); d.textContent = W[k][L()]; before.parentNode.insertBefore(d, before); }
      // only when there is something to tell apart AND the Klang Valley states come first, together (the site's own order today);
      // if the site ever re-sorts the list, no headings rather than a wrong one
      var first = items.slice(0, kv.length).every(function (it) { return kv.indexOf(it) >= 0; });
      if (kv.length && other.length && first) { head('kv', kv[0]); head('other', other[0]); }
      box.setAttribute('data-npf-st', '1');
    });
  }
  function paintHeads() { [].slice.call(document.querySelectorAll('.npf-grp')).forEach(function (d) { var k = d.getAttribute('data-k'); if (W[k]) d.textContent = W[k][L()]; }); }
  function start() { try { tag(); } catch (e) {} try { states(); } catch (e) {} }
  try { new MutationObserver(paintHeads).observe(document.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
