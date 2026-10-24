/*
 * iNewProject listing Selling Points as infographic stat cards (v1.1, 24 Oct 2026). First listing: TuJu Residences,
 * Project of the Month October 2026, in the gold award look (Bryan picked option 1: no button, bold titles).
 *
 * A layer on top of EasyAsia's listing page, loaded from the admin Header Scripts box:
 *   window.NP_SP_LIVE = true   → visitors see it. Leave it out (or false) for the hidden test.
 *   ?np_sp_preview=1           → this browser sees it while hidden (remembered; ?np_sp_preview=0 turns it off).
 *
 * Do no harm: it only draws when the listing's live cards still carry exactly the titles below. If the developer's
 * wording changes in the admin, or anything throws, the page keeps the site's own cards. The site's cards are only
 * hidden (never removed), and our block is skipped by the language switcher, which it follows for EN / BM / 中文.
 */
(function () {
  'use strict';
  var D = document, KEY = 'np_sp_preview', on = window.NP_SP_LIVE === true;
  try {
    var pv = /[?&]np_sp_preview=([01])/.exec(location.search);
    if (pv) { if (pv[1] === '1') localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); }
    if (localStorage.getItem(KEY) === '1') on = true;
  } catch (e) {}
  if (!on || window.NP_SP_LIVE === false || window.__npsp) return;
  window.__npsp = 1;   // the block pasted twice still draws once

  // One entry per listing slug. Figures only where the developer's own details give an honest number;
  // otherwise an icon. Titles = the developer's USPs as they stand in the admin (the match below).
  var LISTINGS = {
    'tuju-residences-1': {
      theme: 'gold',
      match: ['Location & Connectivity', 'Shuttle Bus Services', '50+ Lifestyle Facilities',
              'KL City & Batu Caves Views', 'EV-Ready Infrastructure', 'Flexible Living Spaces'],
      t: {
        en: { h: 'Why TuJu Residences?', c: [
          ['road', 'Location & Connectivity', '5', 'highways', 'New flyover to MITEC, Mont Kiara'],
          ['bus', 'Shuttle Bus Services', '', '', 'Hassle-free commuting to key destinations'],
          ['pool', 'Lifestyle Facilities', '50+', 'facilities', '50 m lap pool to Level 41 sky dining'],
          ['view', 'KL City & Batu Caves Views', '2', 'landmark views', 'Batu Caves north, KL skyline south'],
          ['plug', 'EV-Ready Infrastructure', '', '', 'Provision for future EV chargers'],
          ['plan', 'Flexible Living Spaces', '10', 'layouts', '710–1,442 sq ft, incl. dual-key']] },
        ms: { h: 'Kenapa TuJu Residences?', c: [
          ['road', 'Lokasi & Akses', '5', 'lebuh raya', 'Jejambat baharu ke MITEC, Mont Kiara'],
          ['bus', 'Perkhidmatan Bas Ulang-alik', '', '', 'Mudah ke destinasi utama tanpa kerumitan'],
          ['pool', 'Kemudahan Gaya Hidup', '50+', 'kemudahan', 'Kolam 50 m hingga sky dining Aras 41'],
          ['view', 'Pemandangan Bandar KL & Batu Caves', '2', 'pemandangan ikonik', 'Batu Caves di utara, KL di selatan'],
          ['plug', 'Infrastruktur Sedia EV', '', '', 'Persediaan untuk pengecas EV masa hadapan'],
          ['plan', 'Ruang Kediaman Fleksibel', '10', 'susun atur', '710–1,442 kaki persegi, termasuk unit dual-key']] },
        zh: { h: '为什么选择 TuJu Residences？', c: [
          ['road', '地点与交通', '5', '条大道', '新天桥通往 MITEC、满家乐'],
          ['bus', '穿梭巴士服务', '', '', '轻松往返主要地点'],
          ['pool', '生活设施', '50+', '项设施', '50米泳池至41楼空中餐饮'],
          ['view', '吉隆坡市景与黑风洞景观', '2', '种地标景观', '北望黑风洞，南望吉隆坡'],
          ['plug', '电动车充电配套', '', '', '已为日后安装 EV 充电器做好准备'],
          ['plan', '灵活的居住空间', '10', '种格局', '710–1,442 平方尺，含双钥匙单位']] }
      }
    }
  };

  var m = /^\/project\/([^\/]+)\/?$/.exec(location.pathname);
  var P = m && LISTINGS[m[1]];
  if (!P) return;

  var ICON = {
    road: '<path d="M8 3 4 21M16 3l4 18M12 4v2.5M12 10.5v3M12 17.5V20"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 6.5h8M7 18v2.5M17 18v2.5"/><circle cx="8" cy="14.5" r=".9"/><circle cx="16" cy="14.5" r=".9"/>',
    pool: '<path d="M2 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',
    view: '<path d="M2.5 20 9 9l4 6.5 2.5-3.5 6 8Z"/><circle cx="17.5" cy="5.5" r="2"/>',
    plug: '<path d="M9 2.5v4.5M15 2.5v4.5M6 7h12v3.5a6 6 0 0 1-12 0V7ZM12 16.5v5"/>',
    plan: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h9M12 3v18M12 15.5h9"/>'
  };

  var CSS = [
    '#selling-points.npsp-on>.container>.sec-title,#selling-points.npsp-on .sp-grid{display:none!important}',
    '#selling-points.npsp-gold{background:#FFFDF8;border-top:1px solid #EEDFB8;border-bottom:1px solid #EEDFB8}',
    '.npsp-head{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin:0 0 20px}',
    '.npsp-head .npp-ribbon{margin:0!important}',
    '.npsp-h{font-family:Fraunces,serif;font-style:italic;font-weight:400;font-size:40px;line-height:1.08;letter-spacing:-.01em;color:#141414;margin:0}',
    'html[data-np-lang="zh"] .npsp-h{font-family:"Noto Serif SC",serif;font-style:normal;font-weight:600;font-size:32px}',
    '.npsp-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
    '.npsp-card{background:#fff;border:1px solid #EEDFB8;border-radius:14px;padding:18px 18px 16px;display:flex;flex-direction:column;gap:8px}',
    '.npsp-k{font-size:15px;font-weight:700;color:#141414;line-height:1.3}',
    '.npsp-big{display:flex;align-items:baseline;gap:8px;min-height:50px;color:#141414}',
    '.npsp-big.ic{align-items:center}',
    '.npsp-n{font-family:Fraunces,serif;font-style:italic;font-weight:400;font-size:48px;line-height:1;letter-spacing:-.02em}',
    '.npsp-u{font-size:16px;font-weight:700;line-height:1.2;min-width:0}',
    '.npsp-ic{width:44px;height:44px;color:#8A6A1E}',
    '.npsp-d{font-size:14px;line-height:1.4;color:#5f5a50}',
    '@media (max-width:767px){',
    ' .npsp-h{font-size:31px}html[data-np-lang="zh"] .npsp-h{font-size:26px}',
    ' .npsp-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}',
    ' .npsp-card{padding:13px 12px 12px;gap:6px}',
    ' .npsp-k{font-size:13.5px}',
    ' .npsp-big{min-height:40px;gap:5px}.npsp-n{font-size:38px}.npsp-u{font-size:14px}.npsp-ic{width:36px;height:36px}',
    ' .npsp-d{font-size:12.5px}',
    '}'
  ].join('\n');

  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); return P.t[l] ? l : 'en'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // The English title of a live card, whether or not the language switcher has already wrapped or translated it.
  function title(card) {
    var t = card.querySelector('.sp-title'); if (!t) return '';
    var w = t.hasAttribute('data-np-k') ? t : t.querySelector('[data-np-k]');
    var s = w ? w.getAttribute('data-np-k') : t.textContent;
    return s.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }

  var sec, box, block;
  function draw() {
    var T = P.t[lang()];
    var html = '<div class="npsp-head"></div><div class="npsp-grid">' + T.c.map(function (c) {
      var big = c[2]
        ? '<div class="npsp-big"><span class="npsp-n">' + esc(c[2]) + '</span><span class="npsp-u">' + esc(c[3]) + '</span></div>'
        : '<div class="npsp-big ic"><svg class="npsp-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[c[0]] + '</svg></div>';
      return '<div class="npsp-card"><div class="npsp-k">' + esc(c[1]) + '</div>' + big + '<div class="npsp-d">' + esc(c[4]) + '</div></div>';
    }).join('') + '</div>';
    block.innerHTML = html;
    var head = block.querySelector('.npsp-head');
    // The award ribbon is Project of the Month's own (np-potm); copy it so the wording and laurel stay in one place.
    var rib = P.theme === 'gold' && D.querySelector('.hero-title') && D.querySelector('.npp-ribbon');
    if (rib) { rib = rib.cloneNode(true); rib.removeAttribute('id'); head.appendChild(rib); }
    var h = D.createElement('h2'); h.className = 'npsp-h'; h.textContent = T.h; head.appendChild(h);
  }

  function start() {
    sec = D.getElementById('selling-points');
    box = sec && sec.querySelector('.container');
    var cards = sec ? sec.querySelectorAll('.sp-card') : [];
    if (!box || cards.length !== P.match.length) return;
    for (var i = 0; i < cards.length; i++) if (title(cards[i]) !== P.match[i]) return;

    var st = D.createElement('style'); st.id = 'npsp-css'; st.textContent = CSS; D.head.appendChild(st);
    if (!D.getElementById('npsp-fonts')) {
      var f = D.createElement('link'); f.id = 'npsp-fonts'; f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400&family=Noto+Serif+SC:wght@600&display=swap';
      D.head.appendChild(f);
    }
    block = D.createElement('div');
    block.className = 'npsp';
    block.setAttribute('data-np-skip', '');
    block.setAttribute('translate', 'no');
    draw();
    box.appendChild(block);
    sec.classList.add('npsp-on');
    if (P.theme === 'gold') sec.classList.add('npsp-gold');

    // Redraw when the visitor switches EN / BM / 中文, and once the award ribbon appears (np-potm draws it after load).
    // (again a moment later, so the copied ribbon carries np-potm's re-rendered wording)
    new MutationObserver(function () {
      try { draw(); } catch (e) {}
      setTimeout(function () { try { draw(); } catch (e) {} }, 150);
    }).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
    if (P.theme === 'gold' && !block.querySelector('.npp-ribbon')) {
      var tries = 0, iv = setInterval(function () {
        if (D.querySelector('.npp-ribbon') || ++tries > 20) { clearInterval(iv); if (D.querySelector('.npp-ribbon')) try { draw(); } catch (e) {} }
      }, 250);
    }
  }

  function safeStart() {
    try { start(); } catch (e) {
      if (sec) { sec.classList.remove('npsp-on', 'npsp-gold'); if (block && block.parentNode) block.parentNode.removeChild(block); }
    }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
