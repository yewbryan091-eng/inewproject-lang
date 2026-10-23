/* iNewProject site fixes v1 (24 Oct 2026), from the 24 Oct site audit.
   Layer on top of EasyAsia's pages: fixes what visitors see, never the data. Off switch: window.NP_FIX_LIVE = false.
   1 developer email links get mailto:   2 e-Enquiry wording ("sales representative", no "booking"/"reservation")
   3 old brand Newproject1U / New Project 1U   4 blank or zero fields in key facts + floor plans are hidden
   5 states with 0 listings hidden in the menus   6 <html lang>, Organization data, Insights article titles
   7 "Browse all articles" link on Insights pages
   Homepage copy is deliberately NOT touched (Bryan, 24 Oct). */
(function () {
  if (window.NP_FIX_LIVE === false) return;
  var D = document;
  var RSQ = '\u2019', DASH = '\u2014';
  var path = location.pathname;

  function lang() {
    try { return localStorage.getItem('np_lang') || 'en'; } catch (e) { return 'en'; }
  }
  function hide(el) {
    if (el.style.display !== 'none') { el.style.display = 'none'; el.setAttribute('data-np-fix-hidden', '1'); }
  }
  function unhide(el) {
    if (el.getAttribute('data-np-fix-hidden') === '1') { el.style.display = ''; el.removeAttribute('data-np-fix-hidden'); }
  }
  function safe(fn) { return function () { try { fn.apply(this, arguments); } catch (e) {} }; }

  /* 6a. <html lang>: np-lang sets ms / zh itself; English pages had none. */
  if (!D.documentElement.getAttribute('lang')) D.documentElement.setAttribute('lang', 'en');

  /* 2b. Pop-up alerts in project-enquiry.js. They are never translated, so swap in every language. */
  var ALERTS = {};
  ALERTS['You have already submitted a reservation for this unit. Our team will be in touch.'] =
    'You have already sent an e-Enquiry for this unit. The developer' + RSQ + 's sales representative will be in touch.';
  ALERTS['Too many reservation attempts. Please contact us directly via WhatsApp or phone.'] =
    'Too many e-Enquiry attempts. Please contact us directly via WhatsApp or phone.';
  var nativeAlert = window.alert;
  window.alert = function (msg) {
    return nativeAlert.call(window, Object.prototype.hasOwnProperty.call(ALERTS, msg) ? ALERTS[msg] : msg);
  };

  /* 2a. Text swaps. These strings have no BM / Chinese translation, so they show in English in every language. */
  var SWAPS = [
    ["The developer's agent will contact you shortly.",
      'The developer' + RSQ + 's sales representative will contact you shortly.'],
    ["This tower isn't open for booking yet " + DASH + ' please check back later.',
      'Not open for enquiries yet ' + DASH + ' please check back later.']
  ];
  function swapText(root) {
    if (!root) return;
    var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, v, i;
    while ((n = w.nextNode())) {
      v = n.nodeValue;
      if (!v || v.length < 20) continue;
      for (i = 0; i < SWAPS.length; i++) {
        if (v.indexOf(SWAPS[i][0]) > -1) n.nodeValue = v = v.split(SWAPS[i][0]).join(SWAPS[i][1]);
      }
    }
  }

  /* 3. Old brand in the listing sign-up pop-up. The BM / Chinese dictionaries translate this title,
     so in those languages it is fixed only after np-lang has translated it. */
  function fixBrand(root) {
    if (!root) return;
    var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.nodeValue.indexOf('Newproject1U') > -1) n.nodeValue = n.nodeValue.split('Newproject1U').join('iNewProject');
    }
  }
  function watchBrand() {
    var modal = D.getElementById('signupModal');
    if (!modal) return;
    if (lang() === 'en') { fixBrand(modal); return; }
    var run = safe(function () { fixBrand(modal); });
    new MutationObserver(run).observe(modal, { childList: true, subtree: true, characterData: true });
    setTimeout(run, 3000);
  }

  /* 1. Developer email link: href="name@company.com" opened a 400 page. */
  function fixMail() {
    var as = D.querySelectorAll('.dev-contact-card a[href]'), i, h;
    for (i = 0; i < as.length; i++) {
      h = (as[i].getAttribute('href') || '').trim();
      if (h.indexOf('@') > 0 && !/^[a-z][a-z0-9+.-]*:/i.test(h) && !/[\s\/]/.test(h)) as[i].setAttribute('href', 'mailto:' + h);
    }
  }

  /* 4. Blank / zero fields. Matched by structure, so it works in every language. */
  var EMPTY_VAL = /^(RM)?\s*\/?\s*(sq\.?\s?ft\.?|kaki persegi|\u5e73\u65b9\u82f1\u5c3a)?$/i;
  function cleanFields() {
    var i, els, v;
    els = D.querySelectorAll('.kf-item');
    for (i = 0; i < els.length; i++) {
      v = els[i].querySelector('.kf-value');
      if (v) { if (v.textContent.trim() === '') hide(els[i]); else unhide(els[i]); }
    }
    els = D.querySelectorAll('[id^="floorBlockUnits-"]');
    for (i = 0; i < els.length; i++) {
      if (els[i].textContent.trim() === '0') hide(els[i].parentNode); else unhide(els[i].parentNode);
    }
    els = D.querySelectorAll('#floor-plan .spec-table tr');
    for (i = 0; i < els.length; i++) {
      var td = els[i].children;
      if (td.length !== 2) continue;
      v = td[1].textContent.replace(/\u00a0/g, ' ').trim();
      if (EMPTY_VAL.test(v)) hide(els[i]); else unhide(els[i]);
    }
    els = D.querySelectorAll('#floor-plan [id^="typeTabs-"] .floor-tab');
    for (i = 0; i < els.length; i++) {
      var w = D.createTreeWalker(els[i], NodeFilter.SHOW_TEXT, null), n;
      while ((n = w.nextNode())) {
        if (/\u00b7\s*sq\.?\s?ft\.?\s*$/.test(n.nodeValue) && !/\d\s*sq\.?\s?ft/.test(n.nodeValue)) {
          n.nodeValue = n.nodeValue.replace(/\s*\u00b7\s*sq\.?\s?ft\.?\s*$/, ' ');
        }
      }
    }
  }
  function watchFields() {
    cleanFields();
    var fp = D.getElementById('floor-plan'), timer = null;
    if (!fp) return;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(safe(cleanFields), 30);
    }).observe(fp, { childList: true, subtree: true, characterData: true });
  }

  /* 5. States with 0 listings in the New Launches menu and the /project/ sidebar. */
  function hideEmptyStates() {
    var items = D.querySelectorAll('.accordion-item'), i, c;
    for (i = 0; i < items.length; i++) {
      c = items[i].querySelector(':scope > button .count, :scope > .accordion-trigger .count, :scope > .header-accordion-trigger .count');
      if (c && c.textContent.trim() === '0') hide(items[i]);
    }
  }

  /* 6b. Organization data for Google (homepage only). */
  function orgData() {
    if (path !== '/') return;
    var s = D.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization', name: 'iNewProject',
      url: 'https://www.inewproject.com/',
      logo: 'https://www.inewproject.com/images/uploads/layout/NP1U_logo-5.png',
      email: 'info@inewproject.com',
      sameAs: ['https://www.facebook.com/inewproject/', 'https://www.instagram.com/inewproject/',
        'https://www.tiktok.com/@inewproject.com', 'https://www.threads.com/@inewproject']
    });
    D.head.appendChild(s);
  }

  /* 6c. Insights articles all had the title "Insights". English only (np-lang owns the other languages). */
  var INSIGHT_LISTS = /^\/insights\/(news|events-launching|area-analysis|project-reviews|events)?\/?(\d+\/?)?$/;
  function articleTitle() {
    if (!/^\/insights\/[^\/]+\/?$/.test(path) || INSIGHT_LISTS.test(path)) return;
    if (lang() !== 'en' || D.title.trim() !== 'Insights') return;
    var h1 = D.querySelector('.article-hero h1');
    if (!h1 || !h1.textContent.trim()) return;
    var head = h1.textContent.replace(/\s+/g, ' ').trim();
    D.title = head + ' | iNewProject';
    var p = D.querySelectorAll('.article-stage p'), text = '', i;
    for (i = 0; i < p.length; i++) {
      text = p[i].textContent.replace(/\s+/g, ' ').trim();
      if (text.length > 60) break;
    }
    if (text.length > 60) {
      if (text.length > 158) text = text.slice(0, 155).replace(/\s+\S*$/, '') + '\u2026';
      var m = D.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', text);
    }
  }

  /* 3b. 404 page title "New Project 1U". */
  function notFoundTitle() {
    if (path.indexOf('/pagenotfound') === 0 && /New Project 1U/.test(D.title)) D.title = 'Page not found | iNewProject';
  }

  /* 7. Link from the Insights lists to the full archive page. */
  function archiveLink() {
    if (!INSIGHT_LISTS.test(path)) return;
    var grid = D.getElementById('insight-grid');
    if (!grid || D.getElementById('np-fix-allins')) return;
    var a = D.createElement('a');
    a.id = 'np-fix-allins';
    a.href = 'https://www.inewproject.com/all-insights/';
    a.textContent = 'Browse all articles \u2192';
    a.style.cssText = 'display:block;width:max-content;margin:28px auto 8px;font-weight:700;color:var(--red,#D0021B);text-decoration:none;';
    grid.parentNode.insertBefore(a, grid.nextSibling);
  }

  function onReady() {
    safe(fixMail)();
    safe(function () { swapText(D.getElementById('reservationToast')); })();
    safe(watchBrand)();
    safe(watchFields)();
    safe(hideEmptyStates)();
    safe(orgData)();
    safe(articleTitle)();
    safe(notFoundTitle)();
    safe(archiveLink)();
    /* The floor list is redrawn by renderFloorList(); this wraps the level-order wrapper too. */
    if (typeof window.renderFloorList === 'function') {
      var draw = window.renderFloorList;
      window.renderFloorList = function () {
        var out = draw.apply(this, arguments);
        try { swapText(D.getElementById('ofbFloorList')); } catch (e) {}
        return out;
      };
      safe(function () { swapText(D.getElementById('ofbFloorList')); })();
    }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', onReady); else onReady();
})();
