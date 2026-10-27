/*
 * iNewProject listing Project Details: a "Bumi discount" row (v1, 27 Oct 2026).
 *   The site's Project Details box never prints the admin's Bumi Discount field, so this adds that row for the listings
 *   below, right after "Price range", as one more box exactly like the site's own (a copy of its Price range box).
 *   Figures come from the developer's price list / approved advertisement: add a listing here once its figure is confirmed.
 *   The language switcher translates the label like the rest of the box ("Bumi discount" is in the dictionaries).
 *
 * Loaded from the admin Header Scripts box. window.NP_PD_LIVE = false turns it off.
 * Do no harm: it only adds the row when the box is there with its "Price range" row and no Bumi row yet; anything
 * unexpected leaves the box as the site drew it.
 */
(function () {
  'use strict';
  if (window.NP_PD_LIVE === false || window.__nppd) return;
  window.__nppd = 1;   // the block pasted twice still adds one row

  // listing slug → Bumi discount
  var BUMI = {
    'the-aura-1': '7%'   // The Aura Townvilla: price list 26 Oct 2026 + approved advertisement
  };
  var m = /^\/project\/([a-z0-9-]+)\/?$/.exec(location.pathname), value = m && BUMI[m[1]];
  if (!value) return;

  // the label's English text, also when the language switcher has already translated it (it keeps the English in data-np-k)
  function key(el) {
    var k = el.getAttribute('data-np-k') || (el.querySelector('[data-np-k]') || el).getAttribute('data-np-k');
    return (k || el.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function start() {
    var grid = document.querySelector('#project-details .project-details-grid');
    if (!grid || grid.querySelector('.npbumi')) return;
    var items = grid.querySelectorAll('.project-detail-item'), price = null;
    for (var i = 0; i < items.length; i++) {
      var lab = items[i].querySelector('.project-detail-label');
      if (!lab) continue;
      if (/bumi/i.test(key(lab))) return;   // the site prints one itself: leave it
      if (!price && key(lab) === 'Price range') price = items[i];
    }
    if (!price) return;
    var row = price.cloneNode(true);
    // a fresh copy for the language switcher: no marks from the Price range box
    [row].concat([].slice.call(row.querySelectorAll('*'))).forEach(function (e) {
      [].slice.call(e.attributes).forEach(function (a) { if (/^data-np/.test(a.name)) e.removeAttribute(a.name); });
    });
    var l = row.querySelector('.project-detail-label'), v = row.querySelector('.project-detail-value');
    if (!l || !v) return;
    l.textContent = 'Bumi discount';
    v.textContent = value;
    row.classList.add('npbumi');
    price.parentNode.insertBefore(row, price.nextSibling);
  }
  function safeStart() { try { start(); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
