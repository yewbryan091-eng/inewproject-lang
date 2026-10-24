/* np-potm v2.5 (24 Oct 2026): Project of the Month popup + reopen tag (homepage, New Launches), and a permanent
   "Project of the Month · <month>" badge on every past and current winner's cards and listing.
   Source: inewproject.os/projects/project-of-the-month/src/np-potm.js. Off switch in the Header Scripts box: window.NP_POTM_LIVE = false.
   Each month: change P (id, links, images, strings) and ADD the winner to AWARDS. A new id shows the popup once more to everyone. */
(function () {
  'use strict';
  if (window.NP_POTM_LIVE === false || window.__npPotm) return;
  window.__npPotm = 1;

  // Images are served next to this file (GitHub/jsDelivr copies, so an admin re-upload can't break them);
  // the site's own copy is the fallback if a copy fails to load.
  var CS = document.currentScript, BASE = CS && /\/np-potm[^\/]*\.js/.test(CS.src) ? CS.src.replace(/[^\/?#]+([?#].*)?$/, '') : '', U = '/images/uploads/';
  function A(file, site) { return { src: BASE ? BASE + file : site, alt: site }; }
  var P = {
    id: '2026-10-tuju',
    mon: 'OCT', // the month in the small seal: a fixed 3-letter mark in every language
    url: '/project/tuju-residences-1/',
    url2: '/project/tuju-residences-retail-lots/',
    img: A('2026-10-tuju-render.webp', U + 'project/644/NP1U_tuju-residences-1-1792780348.webp'), // gallery re-uploaded 24 Oct: old 1790065278 is gone
    imgPos: '37% 50%', // laptop crop: the whole tower + the KL twin towers
    dev: A('2026-10-tuju-developer.jpg', U + 'developer/NP1U_distinctive-group-sdn-bhd.jpeg'),
    r1img: A('reward-iphone-duo.webp', U + 'projectreward/644/NP1U_reward-1-1790566984.webp'),
    r2img: A('reward-tng-ewallet.webp', U + 'projectreward/644/NP1U_reward-2-1790566985.webp'),
    video: '', // e-Enquiry guide link; empty = line hidden
    t: {
      en: {
        label: 'Project of the Month', month: 'October', year: '2026', when: 'October 2026',
        kick: 'KL Duta North · Kuala Lumpur', by: 'By: Distinctive World Sdn. Bhd.', dev: 'Distinctive World Sdn. Bhd.', name: 'TuJu Residences',
        price: 'From <b>RM440,960</b>',
        hl: 'Buying TuJu? Get an extra reward worth <em>RM9,499</em>.', sub: 'Only through iNewProject.',
        or: 'OR',
        r1: 'Brand New iPhone Duo (256GB)', r2: 'Touch ’n Go eWallet Credit', worth: 'Worth RM 9,499',
        note: 'Choose one · yours once your SPA is signed.',
        cta: 'See units still open', link2: 'TuJu retail lots, below 932 homes', video: 'New to e-Enquiry? Watch the 60-second guide',
        fine: 'Artist’s impression. Reward T&C apply.',
        close: 'Close', ai: 'Artist’s impression'
      },
      ms: {
        label: 'Projek Bulan Ini', month: 'Oktober', year: '2026', when: 'Oktober 2026',
        kick: 'KL Duta North · Kuala Lumpur', by: 'Oleh: Distinctive World Sdn. Bhd.', dev: 'Distinctive World Sdn. Bhd.', name: 'TuJu Residences',
        price: 'Dari <b>RM440,960</b>',
        hl: 'Beli TuJu? Dapatkan ganjaran tambahan bernilai <em>RM9,499</em>.', sub: 'Hanya melalui iNewProject.',
        or: 'ATAU',
        r1: 'iPhone Duo Serba Baharu (256GB)', r2: 'Kredit Touch ’n Go eWallet', worth: 'Bernilai RM 9,499',
        note: 'Pilih satu · milik anda selepas SPA ditandatangani.',
        cta: 'Lihat unit yang masih dibuka', link2: 'Lot runcit TuJu, di bawah 932 kediaman', video: 'Baru dengan e-Enquiry? Tonton panduan 60 saat',
        fine: 'Gambaran artis. Tertakluk kepada T&S ganjaran.',
        close: 'Tutup', ai: 'Gambaran artis'
      },
      zh: {
        label: '本月精选项目', month: '十月', year: '2026', when: '2026年10月',
        kick: 'KL Duta North · 吉隆坡', by: '发展商：Distinctive World Sdn. Bhd.', dev: 'Distinctive World Sdn. Bhd.', name: 'TuJu Residences',
        price: '<b>RM440,960</b> 起',
        hl: '购买 TuJu？额外获得价值 <em>RM9,499</em> 的奖励。', sub: '仅限通过 iNewProject。',
        or: '或',
        r1: '全新 iPhone Duo (256GB)', r2: 'Touch ’n Go 电子钱包额度', worth: '价值 RM 9,499',
        note: '二选一 · 签署 SPA 后即归您所有。',
        cta: '查看仍开放的单位', link2: 'TuJu 零售单位，位于 932 户住宅楼下', video: '第一次使用 e-Enquiry？观看 60 秒教学',
        fine: '艺术构想图。奖励须遵守条款与条件。',
        close: '关闭', ai: '艺术构想图'
      }
    }
  };
  // Every Project of the Month keeps its badge for good (Bryan, 24 Oct 2026). Add each new winner; never remove one.
  var AWARDS = [
    { cards: ['/project/tuju-residences-1/', '/project/tuju-residences-retail-lots/'], mon: 'OCT',
      when: { en: 'October 2026', ms: 'Oktober 2026', zh: '2026年10月' }, short: { en: 'Oct 2026', ms: 'Okt 2026', zh: '2026年10月' } }
  ];

  var D = document, path = location.pathname; // the popup shows on every load of the homepage and New Launches (Bryan, 24 Oct)
  var showPage = /^\/(project\/)?$/.test(path);
  // ...but on New Launches only on arrival, not at every step inside the list (Bryan, 24 Oct: "disable at the new project by
  // state"): no auto-open (the tag stays) on a By State / area / search / type / e-Enquiry list, or when the visitor came from
  // another New Launches page (All State, Filter, Search). The homepage still opens it on every load.
  var inList = path === '/project/' && (
    /[?&](state|s|type|price|bedroom|size|completion_year|status(%5B%5D|\[\])?|tod|eenquiry(_viewin)?)=/.test(location.search) ||
    (function () { try { var r = new URL(D.referrer); return r.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '') && r.pathname === '/project/'; } catch (e) { return false; } })());

  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); return P.t[l] ? l : 'en'; }
  function T() { return P.t[lang()]; }
  function ev(name) { try { if (window.gtag) window.gtag('event', name, { potm_id: P.id, potm_lang: lang() }); } catch (e) {} }
  function img(a, alt, extra) { return '<img src="' + a.src + '" alt="' + (alt || '') + '"' + (extra || '') + (a.src !== a.alt ? ' onerror="this.onerror=null;this.src=\'' + a.alt + '\'"' : '') + '>'; }
  function el(tag, cls, html) { var e = D.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function skip(e) { e.setAttribute('data-np-skip', ''); e.setAttribute('translate', 'no'); return e; }

  var GOLD = '#8A6A1E', LINE = '#ECE4D3', MUTED = '#6E665A';
  var CSS = [
    '#np-potm{position:fixed;inset:0;z-index:99990;display:flex;align-items:center;justify-content:center;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}',
    '#np-potm *{box-sizing:border-box;margin:0;padding:0}',
    '#np-potm .npp-back{position:absolute;inset:0;background:rgba(10,12,18,.5);opacity:0;transition:opacity .25s}',
    '#np-potm.npp-in .npp-back{opacity:1}',
    '#np-potm .npp-card:focus,#np-potm button.npp-x:focus{outline:none}#np-potm button.npp-x:focus-visible{outline:2px solid ' + GOLD + ';outline-offset:2px}',
    '#np-potm .npp-card{position:relative;width:min(800px,calc(100vw - 48px));max-height:calc(100vh - 40px);display:grid;grid-template-columns:37% 63%;background:#fff;color:#141414;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.28);opacity:0;transform:translateY(14px);transition:opacity .3s,transform .3s}',
    '#np-potm.npp-in .npp-card{opacity:1;transform:none}',
    '#np-potm button.npp-x{position:absolute;right:14px;top:14px;z-index:3;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.96);color:#141414;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 6px rgba(0,0,0,.14)}',
    /* photo */
    '#np-potm .npp-photo{position:relative;background:#0E1424;min-height:100%;overflow:hidden}',
    '#np-potm .npp-photo>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' + (P.imgPos || '50% 50%') + ';display:block}',
    '#np-potm .npp-ai{position:absolute;right:12px;bottom:10px;z-index:1;font:500 11px "DM Sans",sans-serif;color:rgba(255,255,255,.9);text-shadow:0 1px 4px rgba(0,0,0,.55)}',
    '#np-potm .npp-mark{position:absolute;left:18px;bottom:18px;z-index:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,.28))}',
    /* body: the offer first */
    '#np-potm .npp-body{padding:26px 30px 20px;overflow:auto}',
    '#np-potm .npp-kick{display:none;margin-bottom:6px;font:700 10px/1.25 "DM Sans",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:' + GOLD + '}',
    '#np-potm .npp-hl{font-family:Fraunces,serif;font-style:italic;font-weight:400;font-size:31px;line-height:1.12;letter-spacing:-.01em;color:#141414;padding-right:40px}',
    '#np-potm .npp-hl em{font-style:italic;color:' + GOLD + '}',
    'html[data-np-lang="zh"] #np-potm .npp-hl{font-family:"Noto Serif SC",serif;font-style:normal;font-weight:600;font-size:27px}',
    'html[data-np-lang="zh"] #np-potm .npp-hl em{font-style:normal}',
    '#np-potm .npp-subl{margin-top:6px;font:600 13px/1.3 "DM Sans",sans-serif;color:' + MUTED + '}',
    /* the reward: the site's own gold reward card, real product images */
    '#np-potm .npp-gold{margin-top:14px;border-radius:18px;border:1px solid #EEDFB8;overflow:hidden;background:linear-gradient(100deg,#FFFDF8 0%,#FBF3DF 58%,#F2E0B3 100%)}',
    '#np-potm .npp-prods{display:grid;grid-template-columns:1fr auto 1fr;gap:6px;padding:12px 12px 12px}',
    '#np-potm .npp-prod{text-align:center}',
    '#np-potm .npp-pi{height:84px;display:flex;align-items:center;justify-content:center}',
    '#np-potm .npp-pi img{display:block;object-fit:contain}',
    '#np-potm .npp-p1 img{width:158px;height:84px}',
    '#np-potm .npp-p2 img{width:76px;height:76px;border-radius:17px;border:2px solid #fff;box-shadow:0 2px 8px rgba(80,50,0,.18)}',
    '#np-potm .npp-prod b{display:block;margin-top:7px;font:800 13.5px/1.25 "DM Sans",sans-serif;color:#141414}',
    '#np-potm .npp-prod em{display:block;margin-top:3px;font:800 13px/1.2 "DM Sans",sans-serif;font-style:normal;color:' + GOLD + '}',
    '#np-potm .npp-coin{align-self:center;justify-self:center;margin-top:0;min-width:32px;height:32px;padding:0 7px;border-radius:999px;background:linear-gradient(180deg,#E6C46A,#C99A2E);border:2px solid #fff;box-shadow:0 1px 5px rgba(80,50,0,.25);display:flex;align-items:center;justify-content:center;font:800 10px/1 "DM Sans",sans-serif;letter-spacing:.04em;color:#2B1E04}',
    '#np-potm .npp-gn{padding:9px 12px;text-align:center;background:rgba(255,255,255,.75);border-top:1px solid #EEDFB8;font:600 12px/1.3 "DM Sans",sans-serif;color:#4A443A}',
    /* the project strip: developer logo, name, place, developer, price */
    '#np-potm .npp-proj{display:flex;align-items:center;gap:12px;margin-top:14px;padding:10px 12px;border:1px solid ' + LINE + ';border-radius:14px}',
    '#np-potm .npp-logo{flex:0 0 auto;width:52px;height:52px;border-radius:12px;background:#fff;border:1px solid ' + LINE + ';display:flex;align-items:center;justify-content:center;overflow:hidden}',
    '#np-potm .npp-logo img{width:66px;height:66px;object-fit:contain;display:block}',
    '#np-potm .npp-pn{flex:1;min-width:0}',
    '#np-potm .npp-pn b{display:block;font:700 15px/1.2 "DM Sans",sans-serif;color:#141414}',
    '#np-potm .npp-pn span{display:block;margin-top:2px;font:500 12px/1.3 "DM Sans",sans-serif;color:' + MUTED + '}',
    '#np-potm .npp-pn span.npp-by{color:#262219}',
    '#np-potm .npp-pp{flex:0 0 auto;text-align:right;font:500 12px/1.2 "DM Sans",sans-serif;color:' + MUTED + '}',
    '#np-potm .npp-pp b{display:block;font:800 16px/1.2 "DM Sans",sans-serif;color:#141414}',
    'html[data-np-lang="zh"] #np-potm .npp-pp b{display:inline}',
    '#np-potm a.npp-cta{display:flex;align-items:center;justify-content:center;height:50px;margin-top:14px;background:#D0021B;color:#fff;border-radius:12px;font:700 15px "DM Sans",sans-serif;text-decoration:none}',
    '#np-potm a.npp-cta:hover{background:#B51424;color:#fff}',
    '#np-potm .npp-links{margin-top:10px;display:flex;flex-direction:column;gap:6px}',
    '#np-potm .npp-links a{font:500 13px/1.3 "DM Sans",sans-serif;color:#262219;text-decoration:underline;text-underline-offset:3px}',
    '#np-potm .npp-fine{margin-top:10px;font:500 11px/1.4 "DM Sans",sans-serif;color:#8C8477}',
    /* phone: bottom sheet */
    '@media (max-width:767px){',
    // iOS 26 Safari tints the strip behind its floating toolbar from whatever sits at the bottom edge (Bryan saw red).
    // So the sheet runs to the true bottom (large viewport) and keeps its content above the toolbar with padding.
    '#np-potm{align-items:flex-end;bottom:auto;height:100vh;height:100lvh}',
    '#np-potm .npp-links{display:none}#np-potm .npp-kick{display:block}',
    '#np-potm button.npp-x{width:40px;height:40px;right:10px;top:10px}',
    '#np-potm .npp-card{width:100%;max-height:92vh;max-height:calc(100dvh - 40px + (100lvh - 100dvh));grid-template-columns:1fr;grid-template-rows:96px auto;border-radius:24px 24px 0 0;transform:translateY(40px);overflow:auto}',
    '#np-potm .npp-photo{min-height:96px}#np-potm .npp-photo>img{object-position:50% 50%}',
    '#np-potm .npp-mark{left:14px;top:50%;bottom:auto;transform:translateY(-50%)}',
    '#np-potm .npp-body{padding:14px 16px 14px;padding-bottom:max(14px,env(safe-area-inset-bottom));padding-bottom:max(14px,env(safe-area-inset-bottom),calc(100lvh - 100dvh + 14px));background:#fff}',
    'html.npp-open,html.npp-open body{background:#fff!important}',
    '#np-potm .npp-hl{font-size:23px;padding-right:0}html[data-np-lang="zh"] #np-potm .npp-hl{font-size:21px}',
    '#np-potm .npp-gold{margin-top:10px;border-radius:16px}',
    '#np-potm .npp-prods{padding:10px 8px 10px}',
    '#np-potm .npp-pi{height:52px}#np-potm .npp-p1 img{width:98px;height:52px}#np-potm .npp-p2 img{width:48px;height:48px;border-radius:12px}',
    '#np-potm .npp-coin{min-width:28px;height:28px;padding:0 6px;font-size:9px}',
    '#np-potm .npp-prod b{font-size:12px;margin-top:5px}#np-potm .npp-prod em{font-size:12px}',
    '#np-potm .npp-gn{padding:7px 10px;font-size:11.5px}',
    '#np-potm .npp-proj{margin-top:10px;padding:8px 10px;gap:10px}',
    '#np-potm .npp-logo{width:46px;height:46px}#np-potm .npp-logo img{width:58px;height:58px}',
    '#np-potm .npp-pn b{font-size:14px}#np-potm .npp-pn span{font-size:11.5px}#np-potm .npp-pp b{font-size:15px}',
    '#np-potm a.npp-cta{height:48px;margin-top:10px}',
    '#np-potm .npp-fine{margin-top:8px}',
    '}',
    '@media (max-width:767px) and (max-height:620px){',
    '#np-potm .npp-card{grid-template-rows:68px auto}#np-potm .npp-photo{min-height:68px}#np-potm .npp-mark{transform:translateY(-50%) scale(.8);transform-origin:left center}',
    '#np-potm .npp-subl{display:none}#np-potm .npp-hl{font-size:21px}#np-potm .npp-body{padding-top:10px}#np-potm .npp-gold{margin-top:8px}',
    '#np-potm .npp-prods{padding:6px 8px 8px}#np-potm .npp-pi{height:44px}#np-potm .npp-p1 img{width:84px;height:44px}#np-potm .npp-p2 img{width:40px;height:40px}',
    '#np-potm .npp-proj{margin-top:8px;padding:6px 10px}#np-potm a.npp-cta{height:44px;margin-top:8px}#np-potm .npp-fine{margin-top:6px}',
    '}',
    /* reopen tag */
    '.npp-pill{position:fixed;left:16px;bottom:16px;z-index:9990;display:flex;align-items:center;gap:9px;padding:7px 14px 7px 7px;border:0;border-radius:999px;background:#0E1424;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.22);font:600 13px/1 "DM Sans",sans-serif;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}',
    '.npp-pill.npp-in{opacity:1;transform:none}',
    '.npp-pill i{font-style:normal;color:#F2C46D;font-weight:500}',
    /* permanent card badge + listing ribbon */
    '.npp-badge{position:absolute;left:10px;bottom:10px;z-index:3;display:flex;align-items:center;gap:7px;max-width:calc(100% - 20px);overflow:hidden;padding:4px 11px 4px 4px;border-radius:999px;background:#0E1424;color:#F2C46D;font:700 10px/1.1 "DM Sans",sans-serif;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}',
    '.npp-badge em{font-style:normal;color:#fff}',
    '.npp-ribbon{display:inline-flex;align-items:center;gap:8px;max-width:100%;overflow:hidden;white-space:nowrap;margin:0 0 12px;padding:5px 12px 5px 5px;border-radius:999px;background:#0E1424;color:#F2C46D;font:700 11px/1 "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase}',
    '.npp-ribbon em{font-style:normal;color:#fff}'
  ].join('');

  /* ---- laurel seal (thin branches drawn on a circle, type in the middle) ---- */
  function lines2(label) {
    var w = label.split(' ');
    if (w.length < 2) return [label.slice(0, 2), label.slice(2)];
    var n = Math.floor(w.length / 2);
    return [w.slice(0, n).join(' '), w.slice(n).join(' ')];
  }
  function seal(size, t) {
    var g = '', R = 41, cy = 63, d2r = Math.PI / 180;
    function leaf(x, y, rot, mirror) {
      if (mirror) { x = 120 - x; rot = 180 - rot; }
      var cx = x + Math.cos(rot * d2r) * 5.2, cyy = y + Math.sin(rot * d2r) * 5.2;
      return '<ellipse cx="' + cx.toFixed(2) + '" cy="' + cyy.toFixed(2) + '" rx="5.2" ry="1.9" fill="#F2C46D" transform="rotate(' + rot.toFixed(1) + ' ' + cx.toFixed(2) + ' ' + cyy.toFixed(2) + ')"/>';
    }
    [false, true].forEach(function (m) {
      var a0 = 102, a1 = 222, x0 = 60 + R * Math.cos(a0 * d2r), y0 = cy + R * Math.sin(a0 * d2r), x1 = 60 + R * Math.cos(a1 * d2r), y1 = cy + R * Math.sin(a1 * d2r);
      if (m) { x0 = 120 - x0; x1 = 120 - x1; }
      g += '<path d="M' + x0.toFixed(2) + ',' + y0.toFixed(2) + ' A' + R + ',' + R + ' 0 0,' + (m ? 0 : 1) + ' ' + x1.toFixed(2) + ',' + y1.toFixed(2) + '" fill="none" stroke="#F2C46D" stroke-width=".7"/>';
      for (var f = 110; f <= 214; f += 15) {
        var bx = 60 + R * Math.cos(f * d2r), by = cy + R * Math.sin(f * d2r);
        g += leaf(bx, by, f + 90 - 32, m) + leaf(bx, by, f + 90 + 30, m);
      }
    });
    var L = lines2(t.label), sm = 'text-anchor="middle" font-family="DM Sans,sans-serif" font-size="6.2" font-weight="700" letter-spacing="1.1" fill="#F2C46D"';
    var serif = t === P.t.zh ? 'font-family="Noto Serif SC,serif" font-weight="600"' : 'font-family="Fraunces,serif" font-style="italic"';
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="60" cy="60" r="59.5" fill="#0E1424"/>' + g +
      '<text x="60" y="44" ' + sm + '>' + L[0].toUpperCase() + '</text><text x="60" y="52" ' + sm + '>' + L[1].toUpperCase() + '</text>' +
      '<text x="60" y="70" text-anchor="middle" ' + serif + ' font-size="' + (t.month.length > 6 ? 16 : 18) + '" fill="#fff">' + t.month + '</text>' +
      '<text x="60" y="83" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="7.5" font-weight="700" letter-spacing="2.4" fill="#F2C46D">' + t.year + '</text>' +
      '</svg>';
  }
  function mini(mon) { // the popup seal in miniature: navy disc, gold ring, laurels, the month ("OCT") in the middle
    var g = '', R = 11, cy = 16.6, d2r = Math.PI / 180;
    function leaf(x, y, rot, m) {
      if (m) { x = 32 - x; rot = 180 - rot; }
      var cx = x + Math.cos(rot * d2r) * 2.7, c2 = y + Math.sin(rot * d2r) * 2.7;
      return '<ellipse cx="' + cx.toFixed(2) + '" cy="' + c2.toFixed(2) + '" rx="3" ry="1.45" fill="#F2C46D" transform="rotate(' + rot.toFixed(0) + ' ' + cx.toFixed(2) + ' ' + c2.toFixed(2) + ')"/>';
    }
    [false, true].forEach(function (m) {
      var x0 = 16 + R * Math.cos(112 * d2r), y0 = cy + R * Math.sin(112 * d2r), x1 = 16 + R * Math.cos(214 * d2r), y1 = cy + R * Math.sin(214 * d2r);
      if (m) { x0 = 32 - x0; x1 = 32 - x1; }
      g += '<path d="M' + x0.toFixed(2) + ',' + y0.toFixed(2) + ' A' + R + ',' + R + ' 0 0,' + (m ? 0 : 1) + ' ' + x1.toFixed(2) + ',' + y1.toFixed(2) + '" fill="none" stroke="#F2C46D" stroke-width=".9"/>';
      for (var f = 124; f <= 214; f += 30) {
        var bx = 16 + R * Math.cos(f * d2r), by = cy + R * Math.sin(f * d2r);
        g += leaf(bx, by, f + 90 - 38, m);
      }
    });
    return '<svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true" style="flex:0 0 auto"><circle cx="16" cy="16" r="16" fill="#0E1424"/>' +
      '<circle cx="16" cy="16" r="15" fill="none" stroke="#F2C46D" stroke-width="1"/>' + g +
      '<text x="16" y="18.9" text-anchor="middle" font-family="DM Sans,Arial,sans-serif" font-size="7.6" font-weight="800" letter-spacing=".2" fill="#F2C46D">' + (mon || P.mon) + '</text></svg>';
  }

  /* ---- popup ---- */
  var root, pill, lastFocus;
  function fonts() {
    var fam = 'family=Fraunces:ital,opsz,wght@1,9..144,400' + (lang() === 'zh' ? '&family=Noto+Serif+SC:wght@600' : ''), id = 'npp-fonts-' + lang();
    if (D.getElementById(id)) return;
    var l = D.createElement('link'); l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?' + fam + '&display=swap';
    D.head.appendChild(l);
  }
  function build() {
    var t = T(), mob = innerWidth < 768;
    var x = '<button type="button" class="npp-x" aria-label="' + t.close + '"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6"/></svg></button>';
    var prod = function (n, a, name) { return '<div class="npp-prod npp-p' + n + '"><div class="npp-pi">' + img(a) + '</div><b>' + name + '</b><em>' + t.worth + '</em></div>'; };
    return '<div class="npp-back"></div><div class="npp-card" tabindex="-1" role="dialog" aria-modal="true" aria-label="' + t.label + ': ' + t.name + '">' + x +
      '<div class="npp-photo">' + img(P.img, t.name) + '<div class="npp-mark">' + seal(mob ? 66 : 112, t) + '</div><div class="npp-ai">' + t.ai + '</div></div>' +
      '<div class="npp-body">' +
      '<div class="npp-kick">' + t.label + ' · ' + t.when + '</div>' +
      '<div class="npp-hl">' + t.hl + '</div><div class="npp-subl">' + t.sub + '</div>' +
      '<div class="npp-gold"><div class="npp-prods">' + prod(1, P.r1img, t.r1) + '<div class="npp-coin">' + t.or + '</div>' + prod(2, P.r2img, t.r2) + '</div>' +
      '<div class="npp-gn">' + t.note + '</div></div>' +
      '<div class="npp-proj"><div class="npp-logo">' + img(P.dev, t.dev) + '</div>' +
      '<div class="npp-pn"><b>' + t.name + '</b><span>' + t.kick + '</span><span class="npp-by">' + t.by + '</span></div>' +
      '<div class="npp-pp">' + t.price + '</div></div>' +
      '<a class="npp-cta" href="' + P.url + '">' + t.cta + '</a>' +
      '<div class="npp-links"><a class="npp-l2" href="' + P.url2 + '">' + t.link2 + '</a>' +
      (P.video ? '<a class="npp-vid" href="' + P.video + '" target="_blank" rel="noopener">' + t.video + '</a>' : '') + '</div>' +
      '<div class="npp-fine">' + t.fine + '</div>' +
      '</div></div>';
  }
  function open(auto) {
    if (root) return;
    fonts();
    lastFocus = D.activeElement;
    root = skip(el('div')); root.id = 'np-potm'; root.innerHTML = build();
    D.body.appendChild(root); D.documentElement.classList.add('npp-open');
    if (pill) pill.classList.remove('npp-in');
    requestAnimationFrame(function () { requestAnimationFrame(function () { root && root.classList.add('npp-in'); }); });
    root.querySelector('.npp-card').focus({ preventScroll: true });
    root.addEventListener('click', function (e) {
      var a = e.target.closest('a,button,.npp-back');
      if (!a) return;
      if (a.classList.contains('npp-cta')) { ev('potm_click'); return; }
      if (a.classList.contains('npp-l2')) { ev('potm_click_2'); return; }
      if (a.classList.contains('npp-vid')) { ev('potm_video'); return; }
      if (a.classList.contains('npp-x') || a.classList.contains('npp-back')) close();
    });
    D.addEventListener('keydown', onKey);
    ev(auto ? 'potm_view' : 'potm_reopen');
  }
  function onKey(e) { if (e.key === 'Escape') close(); }
  function close() {
    if (!root) return;
    ev('potm_close');
    var r = root; root = null; r.classList.remove('npp-in'); D.documentElement.classList.remove('npp-open');
    D.removeEventListener('keydown', onKey);
    setTimeout(function () { r.remove(); }, 300);
    showPill();
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }
  function showPill() {
    if (!showPage) return;
    var t = T();
    if (!pill) {
      pill = skip(el('button', 'npp-pill')); pill.type = 'button';
      pill.addEventListener('click', function () { open(false); });
      D.body.appendChild(pill);
    }
    pill.innerHTML = mini(P.mon) + '<span>' + t.label + ' <i>· ' + t.name + '</i></span>';
    pill.setAttribute('aria-label', t.label + ': ' + t.name);
    requestAnimationFrame(function () { pill.classList.add('npp-in'); });
  }

  /* ---- permanent badges: every winner's cards (anywhere) + its listing ribbon ---- */
  var ro = window.ResizeObserver ? new ResizeObserver(function (list) {   // re-fit when a card appears or resizes (carousels, tabs)
    list.forEach(function (en) { var e = en.target.querySelector('.npp-badge') || en.target.querySelector('.npp-ribbon'); if (e && e.__t) fit(e, e.__t); });
  }) : null;
  function fit(e, tiers) { // longest text that fits; the box itself never grows past its container
    if (e.__t !== tiers) { e.__t = tiers; if (ro && e.parentElement && !e.__o) { ro.observe(e.parentElement); e.__o = 1; } }
    for (var k = 0; k < tiers.length; k++) {
      if (e.innerHTML !== tiers[k]) e.innerHTML = tiers[k];
      if (!e.clientWidth || e.scrollWidth <= e.clientWidth + 1) return;
    }
  }
  function badges() {
    var l = lang(), label = P.t[l].label;
    AWARDS.forEach(function (a) {
      var ic = mini(a.mon), tiers = [ic + label + ' · <em>' + a.when[l] + '</em>', ic + label + ' · <em>' + a.short[l] + '</em>', ic + label];
      a.cards.forEach(function (u) {
        var links = D.querySelectorAll('.project-card a[href$="' + u + '"]');
        for (var i = 0; i < links.length; i++) {
          var img = links[i].querySelector('.project-image');
          if (!img) continue;
          var b = img.querySelector('.npp-badge');
          if (!b) { b = skip(el('div', 'npp-badge')); if (getComputedStyle(img).position === 'static') img.style.position = 'relative'; img.appendChild(b); }
          fit(b, tiers);
        }
        if (path === u) {
          var h = D.querySelector('.hero-title'), r = D.querySelector('.npp-ribbon');
          if (h && !r) { r = skip(el('div', 'npp-ribbon')); h.parentNode.insertBefore(r, h); }
          if (r) fit(r, tiers);
        }
      });
    });
  }
  var rz; addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(badges, 150); });
  addEventListener('load', function () { badges(); });

  function rerender() {
    badges();
    if (pill) showPill();
    if (root) { fonts(); var keep = root.classList.contains('npp-in'); root.innerHTML = build(); if (keep) root.classList.add('npp-in'); }
  }

  function start() {
    var s = el('style'); s.id = 'npp-css'; s.textContent = CSS; D.head.appendChild(s);
    badges();
    new MutationObserver(rerender).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
    if (!showPage) return;
    // Open straight away (Bryan, 25 Oct: "make that immediate"), but only once the popup's own images have decoded
    // (max 0.8 s) so it never flashes half-empty. NP_POTM_DELAY (ms) is only for tests.
    var delay = window.NP_POTM_DELAY != null ? +window.NP_POTM_DELAY : 0;
    fonts();
    if (inList) return showPill();
    function ready(cb) {
      var left = 4, done = false, fin = function () { if (!done) { done = true; cb(); } }, one = function () { if (!--left) fin(); };
      setTimeout(fin, 800);
      [P.img, P.dev, P.r1img, P.r2img].forEach(function (a) {
        var i = new Image(); i.src = a.src;
        if (i.decode) i.decode().then(one, one); else { i.onload = one; i.onerror = one; }
      });
    }
    // Never jump over someone who is already doing something: wait while a modal, the homepage search (nps-open)
    // or any text field is in use; once they have typed in a field on this page view, skip the auto-open (tag only).
    var typed = false, tries = 0;
    D.addEventListener('input', function (e) { var t = e.target; if (t && /^(INPUT|TEXTAREA)$/.test(t.tagName) && !(root && root.contains(t))) typed = true; }, true);
    function busy() {
      var a = D.activeElement;
      return D.body.classList.contains('modal-open') || D.documentElement.classList.contains('nps-open') ||
        !!(a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable));
    }
    function tryOpen() {
      if (root || D.querySelector('#np-potm')) return;
      if (typed || ++tries > 60) return showPill();   // they're searching: leave them be; the tag is there
      if (busy()) return setTimeout(tryOpen, 1500);
      open(true);
    }
    ready(function () { setTimeout(tryOpen, delay); });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
