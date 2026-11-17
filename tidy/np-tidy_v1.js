/* iNewProject . site tidy v1 (17 Nov 2026, from the 17 Nov site audit). Two small fixes:
   1. Listing pages: the Save button shown to visitors who are not logged in opened the site's old sign-up pop-up
      ("Sign Up for Newproject1U", with old cash-reward and group-purchase lines). It now goes to the login page, the same
      place a card's Save already goes (/member/login/?log=tb1). Only buttons that open that pop-up are changed.
   2. A price range with the same price at both ends ("RM 965,000 - RM 965,000") shows one price ("RM 965,000"),
      on cards, in Project Details and in the key facts.
   Off switch: window.NP_TIDY_LIVE = false. Loaded from the admin Header Scripts box. */
(function () {
  'use strict';
  var D = document;
  if (window.NP_TIDY_LIVE === false) return;
  var LOGIN = '/member/login/?log=tb1';

  // 1. Save -> login page. Capture phase on document runs before the button's own onclick, which never fires.
  D.addEventListener('click', function (e) {
    try {
      var b = e.target && e.target.closest && e.target.closest('[onclick*="openModal(\'signupModal\')"]');
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      location.href = LOGIN;
    } catch (x) {}
  }, true);

  // 2. One price when both ends of a range are the same.
  var RE = /^\s*(RM)\s?([\d,]+(?:\.\d+)?)\s*[-\u2013\u2014]\s*RM\s?([\d,]+(?:\.\d+)?)\s*$/;
  var SEL = '.project-meta strong, .project-meta .metadesc, .project-detail-value, .kf-value';
  function tidy() {
    var els = D.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.children.length) continue;
      var m = RE.exec(el.textContent.replace(/\u00a0/g, ' '));
      if (m && m[2] === m[3]) el.textContent = m[1] + ' ' + m[2];
    }
  }
  var queued = false;
  function soon() {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; try { tidy(); } catch (x) {} }, 60);
  }
  function start() {
    try { tidy(); } catch (x) {}
    try {
      new MutationObserver(soon).observe(D.body, { childList: true, subtree: true, characterData: true });
    } catch (x) {}
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
