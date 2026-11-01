/*
 * iNewProject listing Selling Points as infographic stat cards (v5, 1 Nov 2026; v4 27 Oct; v3 27 Oct; v2 24 Oct).
 *   · Hand-made listings (LISTINGS): TuJu Residences, Project of the Month October 2026, in the gold award look
 *     (no button, bold titles). Unchanged from v1.1.
 *     v3 adds TuJu Retail Lots in the same gold look. Its cards say only what its six admin selling points say;
 *     the BM / 中文 lines are the dictionaries' own.
     v4: the gap between the heading and the cards is the site's own (1rem, as under every other section heading).
     v5: ROSEDALE by Ancubic, Project of the Month November 2026, in the same gold look: the residences (627) and the
     Retail & Business Suites (647). Cards say only what each listing's six admin selling points say; every BM / 中文
     line under a card is the dictionaries' own. TuJu stays gold (its award is permanent).
     Also v5: the copied award ribbon refits like np-potm's own (full date → short date → label only), and on 320 px
     phones a long unit drops under its figure instead of running past the card.
 *   · Every other listing: automatic red stat cards built from the listing's own selling points, in whatever language
 *     the page is showing. A title that starts with a number gets the big red figure ("90 shops on site"); any other title
 *     stays as written, in bold. Nothing is added, invented or reworded.
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
    },
    'rosedale-by-ancubic': {
      theme: 'gold',
      match: ['About 1 km to the LRT', 'Jaya Grocer as anchor', '26 facilities', '2 car parks per home', '4-tier security',
              'Bandar Botanic address'],
      t: {
        en: { h: 'Why Rosedale?', c: [
          ['road', 'Close to the LRT', '~1', 'km to the LRT', 'Bandar Bukit Tinggi station, LRT3 Shah Alam Line'],
          ['cart', 'Jaya Grocer as Anchor', '', '', 'Groceries within the development'],
          ['pool', 'Facilities', '26', 'facilities', 'On a 60,051 sq ft facilities deck'],
          ['car', 'Parking', '2', 'car parks per home', 'Plus 7 EV charging bays'],
          ['shield', 'Security', '4', 'tiers', 'Boom gate, CCTV, lift access, 24-hour guards'],
          ['pin', 'Bandar Botanic Address', '', '', 'An established, mature Klang neighbourhood']] },
        ms: { h: 'Kenapa Rosedale?', c: [
          ['road', 'Dekat LRT', '~1', 'km ke LRT', 'Stesen Bandar Bukit Tinggi, Laluan LRT3 Shah Alam'],
          ['cart', 'Jaya Grocer sebagai Penyewa Utama', '', '', 'Pasar raya di dalam pembangunan'],
          ['pool', 'Kemudahan', '26', 'kemudahan', 'Di dek kemudahan seluas 60,051 kaki persegi'],
          ['car', 'Tempat Letak Kereta', '2', 'petak setiap rumah', 'Serta 7 petak pengecasan EV'],
          ['shield', 'Sekuriti', '4', 'lapis', 'Palang automatik, CCTV, akses lif, pengawal 24 jam'],
          ['pin', 'Beralamat di Bandar Botanic', '', '', 'Kejiranan Klang yang matang dan mantap']] },
        zh: { h: '为什么选择 Rosedale？', c: [
          ['road', '邻近 LRT', '~1', 'km 至 LRT 站', 'LRT3 莎阿南线 Bandar Bukit Tinggi 站'],
          ['cart', 'Jaya Grocer 为主力租户', '', '', '项目内就有超市'],
          ['pool', '设施', '26', '项设施', '坐落于 60,051 平方尺的设施平台'],
          ['car', '停车位', '2', '个车位（每户）', '另有 7 个电动车充电位'],
          ['shield', '保安', '4', '层保安系统', '道闸、闭路电视、电梯门禁、24 小时保安'],
          ['pin', '坐落于 Bandar Botanic', '', '', '巴生成熟的老牌社区']] }
      }
    },
    'rosedale-by-ancubic-1': {
      theme: 'gold',
      match: ['40 shops, 105 suites', '976 homes on site', 'Jaya Grocer as anchor', 'About 1 km to the LRT3',
              'Short-term rental allowed', 'Main-road frontage'],
      t: {
        en: { h: 'Why Rosedale Retail & Suites?', c: [
          ['shop', 'Shops & Suites', '40', 'shops, 105 suites', 'Shops 786–8,650 sq ft; suites 630 sq ft'],
          ['home', 'Customers Upstairs', '976', 'homes on site', 'A ready customer base above your shop'],
          ['cart', 'Jaya Grocer as Anchor', '', '', 'Brings daily shoppers; MOU signed Jan 2026'],
          ['road', 'Close to the LRT3', '~1', 'km to the LRT3', 'Bandar Bukit Tinggi station, open since June'],
          ['key', 'Short-term Rental Allowed', '', '', 'For business suites, with facilities deck access'],
          ['shop', 'Main-road Frontage', '', '', '24/7 security and direct car-park access']] },
        ms: { h: 'Kenapa Rosedale Kedai & Suite?', c: [
          ['shop', 'Kedai & Suite', '40', 'kedai, 105 suite', 'Kedai 786–8,650 kaki persegi; suite 630 kaki persegi'],
          ['home', 'Pelanggan di Tingkat Atas', '976', 'kediaman', 'Pelanggan sedia ada betul-betul di atas kedai anda'],
          ['cart', 'Jaya Grocer sebagai Penyewa Utama', '', '', 'Menarik pengunjung setiap hari; MOU ditandatangani Jan 2026'],
          ['road', 'Dekat LRT3', '~1', 'km ke LRT3', 'Stesen Bandar Bukit Tinggi, beroperasi sejak Jun'],
          ['key', 'Sewaan Jangka Pendek Dibenarkan', '', '', 'Untuk suite perniagaan, dengan akses ke dek kemudahan'],
          ['shop', 'Menghadap Jalan Utama', '', '', 'Kawalan keselamatan 24/7 dan akses terus ke tempat letak kereta']] },
        zh: { h: '为什么选择 Rosedale 店铺与套房？', c: [
          ['shop', '店铺与套房', '40', '间店铺，105 间套房', '店铺 786–8,650 平方尺；套房 630 平方尺'],
          ['home', '楼上住户', '976', '个住宅单位', '楼上就是现成客源'],
          ['cart', 'Jaya Grocer 为主力租户', '', '', '每日带来人流；已于 2026年1月签署 MOU'],
          ['road', '邻近 LRT3', '~1', 'km 至 LRT3', 'Bandar Bukit Tinggi 站，6 月起已通车'],
          ['key', '允许短租', '', '', '适用于商务套房，可使用设施平台'],
          ['shop', '面向主干道', '', '', '24/7 保安，直通停车场']] }
      }
    },
    'tuju-residences-retail-lots': {
      theme: 'gold',
      match: ['Last 4 lots', '932 homes above', '1,249–1,410 sq ft', '205 sq ft extra area', 'Highway connected',
              'Trade or lease it out'],
      t: {
        en: { h: 'Why TuJu Retail?', c: [
          ['shop', 'Last Lots', '4', 'lots left', '34 of 38 taken; first-floor lots remain'],
          ['home', 'Customers Upstairs', '932', 'homes', 'Built-in customers from day one'],
          ['plan', 'Lot Sizes', '', '', '1,249–1,410 sq ft; fits a clinic, salon, café or office'],
          ['plus', 'Extra Area', '205', 'sq ft', 'Accessory or alfresco space with every lot'],
          ['road', 'Highway Connected', '4', 'highways', 'DUKE, SPRINT, NKVE and LDP nearby'],
          ['key', 'Trade or Lease', '', '', 'Run your business here, or earn rent']] },
        ms: { h: 'Kenapa TuJu Retail?', c: [
          ['shop', 'Lot Terakhir', '4', 'lot lagi', '34 daripada 38 sudah diambil; tinggal lot tingkat 1'],
          ['home', 'Pelanggan di Tingkat Atas', '932', 'kediaman', 'Pelanggan sedia ada sejak hari pertama'],
          ['plan', 'Saiz Lot', '', '', '1,249–1,410 kaki persegi; sesuai untuk klinik, salun, kafe atau pejabat'],
          ['plus', 'Ruang Tambahan', '205', 'kaki persegi', 'Petak aksesori atau ruang alfresco untuk setiap lot'],
          ['road', 'Terhubung ke Lebuhraya', '4', 'lebuhraya', 'DUKE, SPRINT, NKVE dan LDP berdekatan'],
          ['key', 'Berniaga atau Sewakan', '', '', 'Jalankan perniagaan anda di sini, atau jana pendapatan sewa']] },
        zh: { h: '为什么选择 TuJu Retail？', c: [
          ['shop', '最后单位', '4', '个单位', '38 个中已有 34 个被认购，余下第 1 层单位'],
          ['home', '楼上住户', '932', '户住家', '开业第一天就有现成客源'],
          ['plan', '单位面积', '', '', '1,249–1,410 平方尺，适合诊所、美发沙龙、咖啡馆或办公室'],
          ['plus', '额外空间', '205', '平方尺', '每个单位附设附属地段或户外空间'],
          ['road', '大道直达', '4', '条大道', '邻近 DUKE、SPRINT、NKVE 和 LDP'],
          ['key', '自营或出租皆可', '', '', '在这里做生意，或收取租金']] }
      }
    }
  };

  var m = /^\/project\/([^\/]+)\/?$/.exec(location.pathname);
  if (!m) return;
  var P = LISTINGS[m[1]] || null;   // null = automatic cards from the listing's own text

  // A leading figure: optional lead word, a number (range, +, %, °), then the rest of the title.
  // "4-tier", "3km", "20' × 64'", "3½", "24/7" stay words.
  var FIG = /^((?:Up to|Only|From|Over|Under|Just|Below|About|Around|Nearly|Almost|More than|Sehingga|Hingga|Hanya|Dari|Lebih|Hampir|Kira-kira)\s+)?((?:RM\s?)?\d[\d,.]*(?:\s?[–-]\s?\d[\d,.]*)?\+?[%°]?)(?![A-Za-z0-9\-'′"×½¼¾\/.,])\s*(\S.*)$/i;

  var ICON = {
    road: '<path d="M8 3 4 21M16 3l4 18M12 4v2.5M12 10.5v3M12 17.5V20"/>',
    bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 6.5h8M7 18v2.5M17 18v2.5"/><circle cx="8" cy="14.5" r=".9"/><circle cx="16" cy="14.5" r=".9"/>',
    pool: '<path d="M2 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',
    view: '<path d="M2.5 20 9 9l4 6.5 2.5-3.5 6 8Z"/><circle cx="17.5" cy="5.5" r="2"/>',
    plug: '<path d="M9 2.5v4.5M15 2.5v4.5M6 7h12v3.5a6 6 0 0 1-12 0V7ZM12 16.5v5"/>',
    plan: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h9M12 3v18M12 15.5h9"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 20 3M16.5 6.5l3 3M14 9l2.5 2.5"/>',
    cart: '<path d="M2.5 4H5l2.2 10.4a1.6 1.6 0 0 0 1.6 1.3h8.5a1.6 1.6 0 0 0 1.5-1.1L21 8H6"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    shop: '<path d="M4.5 10v10h15V10M3 4h18l-1.3 4.6a2.5 2.5 0 0 1-4.7.6 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.7-.6Z"/><path d="M10 20v-5h4v5"/>'
  };

  var CSS = [
    '#selling-points.npsp-on>.container>.sec-title,#selling-points.npsp-on .sp-grid{display:none!important}',
    '#selling-points.npsp-gold{background:#FFFDF8;border-top:1px solid #EEDFB8;border-bottom:1px solid #EEDFB8}',
    '.npsp-head{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin:0 0 1rem}',
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
    '}',
    '@media (max-width:359px){.npsp-big{flex-wrap:wrap;row-gap:2px}}',
    /* automatic everyday cards (red figure; the site's own "Selling Points" heading stays) */
    '#selling-points.npsp-auto .sp-grid{display:none!important}',
    '.npsa-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:1rem}',   /* = the site's .sp-grid, which it replaces */
    '.npsa-card{background:#fff;border:1px solid #e6e6e6;border-radius:12px;padding:16px 18px;display:flex;flex-direction:column;gap:6px}',
    '.npsa-big{display:flex;align-items:baseline;flex-wrap:wrap;column-gap:7px;color:#141414;line-height:1.15}',
    '.npsa-pre{font-size:15px;font-weight:700}',
    '.npsa-n{font-size:34px;font-weight:700;color:#D0021B;letter-spacing:-.02em;line-height:1}',
    '.npsa-u{font-size:16px;font-weight:700}',
    '.npsa-w{font-size:19px;font-weight:700;color:#141414;line-height:1.25}',
    '.npsa-d{font-size:13.5px;color:#6f6f6f;line-height:1.4}',
    '@media (max-width:767px){',
    ' .npsa-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}',
    ' .npsa-card{padding:13px 12px}.npsa-pre{font-size:13px}.npsa-n{font-size:28px}.npsa-u{font-size:14px}.npsa-w{font-size:16px}.npsa-d{font-size:12.5px}',
    '}'
  ].join('\n');

  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); return P.t[l] ? l : 'en'; }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // The English title of a live card, whether or not the language switcher has already wrapped or translated it.
  function title(card) {
    var t = card.querySelector('.sp-title'); if (!t) return '';
    var w = t.hasAttribute('data-np-k') ? t : t.querySelector('[data-np-k]');
    var s = w ? w.getAttribute('data-np-k') : t.textContent;
    return s.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }

  var sec, box, block, grid;
  // Automatic cards: read the site's own (hidden) cards as the page shows them now, so BM / 中文 come from the dictionaries.
  function drawAuto() {
    block.innerHTML = '<div class="npsa-grid">' + [].map.call(grid.querySelectorAll('.sp-card'), function (c) {
      var t = txt(c.querySelector('.sp-title')), d = txt(c.querySelector('.sp-desc')), f = FIG.exec(t), big;
      if (f) big = '<div class="npsa-big">' + (f[1] ? '<span class="npsa-pre">' + esc(f[1].trim()) + '</span>' : '') +
        '<span class="npsa-n">' + esc(f[2]) + '</span><span class="npsa-u">' + esc(f[3]) + '</span></div>';
      else big = '<div class="npsa-w">' + esc(t) + '</div>';
      return '<div class="npsa-card">' + big + (d ? '<div class="npsa-d">' + esc(d) + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  }
  function draw() {
    if (!P) return drawAuto();
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
    if (rib) { rib = rib.cloneNode(true); rib.removeAttribute('id'); head.appendChild(rib); fitRib(); }
    var h = D.createElement('h2'); h.className = 'npsp-h'; h.textContent = T.h; head.appendChild(h);
  }
  // The copy keeps the hero ribbon's wording, measured for the hero. Refit it here the same way np-potm does:
  // "November 2026" → "Nov 2026" → label only.
  function fitRib() {
    var r = block && block.isConnected && block.querySelector('.npsp-head .npp-ribbon'), em = r && r.querySelector('em');
    if (!em || !r.clientWidth || r.scrollWidth <= r.clientWidth + 1) return;
    em.textContent = em.textContent.replace(/^(\S{3})\S*\s/, '$1 ');
    if (r.scrollWidth <= r.clientWidth + 1) return;
    var t = em.previousSibling; if (t && t.nodeType === 3) t.nodeValue = t.nodeValue.replace(/\s*·\s*$/, '');
    em.parentNode.removeChild(em);
  }

  function start() {
    sec = D.getElementById('selling-points');
    box = sec && sec.querySelector('.container');
    grid = sec && sec.querySelector('.sp-grid');
    var cards = sec ? sec.querySelectorAll('.sp-card') : [];
    if (!P) {
      // automatic: at least 2 cards, every card with a title, all inside the site's grid
      if (!box || !grid || cards.length < 2 || grid.querySelectorAll('.sp-card').length !== cards.length) return;
      for (var j = 0; j < cards.length; j++) if (!txt(cards[j].querySelector('.sp-title'))) return;
    } else {
      if (!box || cards.length !== P.match.length) return;
      for (var i = 0; i < cards.length; i++) if (title(cards[i]) !== P.match[i]) return;
    }

    var st = D.createElement('style'); st.id = 'npsp-css'; st.textContent = CSS; D.head.appendChild(st);
    if (P && !D.getElementById('npsp-fonts')) {
      var f = D.createElement('link'); f.id = 'npsp-fonts'; f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400&family=Noto+Serif+SC:wght@600&display=swap';
      D.head.appendChild(f);
    }
    block = D.createElement('div');
    block.className = 'npsp';
    block.setAttribute('data-np-skip', '');
    block.setAttribute('translate', 'no');
    draw();
    if (!P) {
      grid.parentNode.insertBefore(block, grid.nextSibling);
      sec.classList.add('npsp-auto');
      // The language switcher rewrites the site's cards in place: copy them again whenever they change.
      var due = 0;
      new MutationObserver(function () {
        clearTimeout(due); due = setTimeout(function () { try { drawAuto(); } catch (e) {} }, 60);
      }).observe(grid, { subtree: true, childList: true, characterData: true });
      return;
    }
    box.appendChild(block);
    sec.classList.add('npsp-on');
    if (P.theme === 'gold') {
      sec.classList.add('npsp-gold'); fitRib();
      var rz; addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { try { draw(); } catch (e) {} }, 150); });
    }

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
      if (sec) { sec.classList.remove('npsp-on', 'npsp-gold', 'npsp-auto'); if (block && block.parentNode) block.parentNode.removeChild(block); }
    }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
