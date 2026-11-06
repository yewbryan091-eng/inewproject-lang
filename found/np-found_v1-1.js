/* iNewProject . New Launches: the NEW tag on state rows, v1.1 (6 Nov 2026). Loaded from the admin Header Scripts box, with np-found_v1.css.
   A state with a project added in the last 30 days gets the tag, in the side list and in the phone panel, on /project/ and its
   page numbers. The site sends the page no "date added", so this list is kept by hand: a new project = a new end date here
   (new file + one box line). End date = the first day without the tag, Malaysia time, so it switches off by itself.
   No tag next to a count of 0. Off switch (the tag and the count line): NP_FOUND_LIVE = false. */
(function () {
  'use strict';
  var NEW_UNTIL = {
    'Negeri Sembilan': '2026-12-06',
    'Selangor': '2026-12-03',
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tag);
  else tag();
})();
