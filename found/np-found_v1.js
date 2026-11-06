/* iNewProject . NEW pill on the New Launches state rows (6 Nov 2026). A state shows it until the date below, 00:00 Malaysia time:
   30 days after its newest project went up. The site gives the page no "date added", so the dates are kept here by hand.
   Off switch: window.NP_FOUND_LIVE = false before this file. */
(function () {
  var until = { 'npf-kl': '2026-11-19', 'npf-sel': '2026-12-03' };
  try {
    if (window.NP_FOUND_LIVE === false || !/^\/project\/(\d+\/?)?$/.test(location.pathname)) return;
    for (var k in until) if (Date.now() < Date.parse(until[k] + 'T00:00:00+08:00')) document.documentElement.classList.add(k);
  } catch (e) {}
})();
