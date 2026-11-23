/* np-potm_v12.js (23 Nov 2026) = np-potm_v11.js + big screens (owner's call): the popup card is scaled like the first section behind it (x1.12 from 1800 px wide and 860 px tall, x1.28 from 2200 x 1000, x1.4 from 2800 x 1200; its height cap is divided by the same factor, so it still fits the screen), and the reopen pill is bigger from 1080 px wide (x1.25, laptops and iPads held sideways; x1.45 from 1800 px; x1.65 from 2200 px), grown with scale from its bottom-left corner (not zoom: every browser measures a scaled box the same way, so tuck() still compares like with like). Phones and upright tablets unchanged. */
/* np-potm_v11.js (20 Nov 2026) = np-potm_v10.js + the listing ribbon sits to the right of the project name (same line when it fits; a narrow phone puts it under the name), its text 12 px on screen; the Rosedale image fallback = the current gallery file. */
/* np-potm_v10.js = np-potm_v9.js @4d4be44 + iPad fix (17 Nov 2026): the laptop look now starts at 1080 px (was 1200 px), so iPads held sideways (1080-1194 px) get the site at 90% like a laptop; screens >= 1200 px and < 1080 px unchanged. */
/* np-potm v9 (16 Nov 2026: the popup's title leads with the project's name in its own maroon, upright Instrument Serif (class npp-ttl), "by <developer>" beside it, then the offer on its own line, P.ink + t.hn / t.hb / t.offer; v8 11 Nov 2026: the popup's main button "See units still open" goes straight to the units on the e-Enquiry page, the second link to the shops' e-Enquiry page; v7 8 Nov: the listing ribbon never pushes a small phone's page sideways; v6 8 Nov: on laptops the popup always fits the screen, its text scrolls when it must; v5 3 Nov: the cards' "e-ENQUIRY AVAILABLE" pill on the photo, P.eb; v4 2 Nov: TuJu's cards without the badge, its listing ribbon stays; v3 31 Oct: November = ROSEDALE by Ancubic; v2.6 30 Oct phones = a centred card): Project of the Month popup + reopen tag (homepage, New Launches), and a permanent
   "Project of the Month · <month>" badge on the winners' cards (ribbonOnly: listing ribbon only) and listings.
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
    id: '2026-11-rosedale',
    mon: 'NOV', // the month in the small seal: a fixed 3-letter mark in every language
    ink: '#A42129', // the title's colour: the project's own maroon
    eb: true, // the cards' "e-ENQUIRY AVAILABLE" pill on the photo: only while the winner's e-Enquiry is open
    url: '/project/rosedale-by-ancubic/e-enquiry/#units',
    url2: '/project/rosedale-by-ancubic-1/e-enquiry/',
    img: A('2026-11-rosedale-render.webp', U + 'project/627/NP1U_rosedale-by-ancubic-1795151826.webp'), // Ancubic's own daylight render (ancubic.com)
    imgPos: '37% 50%', // laptop crop: Tower A (the residences on sale, ANCUBIC crown) from crown to podium
    imgPosM: '50% 30%', // phone strip: both towers' upper floors
    dev: A('2026-11-rosedale-developer.jpg', U + 'developer/NP1U_ancubic-pj-sdn-bhd.jpeg'),
    r1img: A('reward-iphone-18-pro.webp', U + 'projectreward/627/NP1U_reward-1-1791477471.webp'),
    r2img: A('reward-tng-ewallet.webp', U + 'projectreward/627/NP1U_reward-2-1791477471.webp'),
    video: '', // e-Enquiry guide link; empty = line hidden
    t: {
      en: {
        label: 'Project of the Month', month: 'November', year: '2026', when: 'November 2026',
        kick: 'Bandar Botanic · Klang', by: 'By: Ancubic PJ Sdn. Bhd.', dev: 'Ancubic PJ Sdn. Bhd.', name: 'ROSEDALE by Ancubic', tag: 'ROSEDALE',
        price: 'From <b>RM270,000</b>',
        hn: 'Rosedale', hb: 'by Ancubic', offer: 'An extra reward worth <b>RM5,500</b>.', sub: 'Only through iNewProject.',
        or: 'OR',
        r1: 'Brand New iPhone 18 Pro (256GB)', r2: 'Touch ’n Go eWallet Credit', worth: 'Worth RM 5,500',
        note: 'Choose one · yours once your SPA is signed.',
        cta: 'See units still open', link2: 'Rosedale shops & business suites: reward worth RM9,499', video: 'New to e-Enquiry? Watch the 60-second guide',
        fine: 'Artist’s impression. Reward T&C apply.',
        close: 'Close', ai: 'Artist’s impression', eb: 'e-ENQUIRY AVAILABLE'
      },
      ms: {
        label: 'Projek Bulan Ini', month: 'November', year: '2026', when: 'November 2026',
        kick: 'Bandar Botanic · Klang', by: 'Oleh: Ancubic PJ Sdn. Bhd.', dev: 'Ancubic PJ Sdn. Bhd.', name: 'ROSEDALE by Ancubic', tag: 'ROSEDALE',
        price: 'Dari <b>RM270,000</b>',
        hn: 'Rosedale', hb: 'by Ancubic', offer: 'Ganjaran tambahan bernilai <b>RM5,500</b>.', sub: 'Hanya melalui iNewProject.',
        or: 'ATAU',
        r1: 'iPhone 18 Pro Serba Baharu (256GB)', r2: 'Kredit Touch ’n Go eWallet', worth: 'Bernilai RM 5,500',
        note: 'Pilih satu · milik anda selepas SPA ditandatangani.',
        cta: 'Lihat unit yang masih dibuka', link2: 'Kedai & suite perniagaan Rosedale: ganjaran bernilai RM9,499', video: 'Baru dengan e-Enquiry? Tonton panduan 60 saat',
        fine: 'Gambaran artis. Tertakluk kepada T&S ganjaran.',
        close: 'Tutup', ai: 'Gambaran artis', eb: 'e-\u2060ENQUIRY TERSEDIA'
      },
      zh: {
        label: '本月精选项目', month: '十一月', year: '2026', when: '2026年11月',
        kick: 'Bandar Botanic · 巴生', by: '发展商：Ancubic PJ Sdn. Bhd.', dev: 'Ancubic PJ Sdn. Bhd.', name: 'ROSEDALE by Ancubic', tag: 'ROSEDALE',
        price: '<b>RM270,000</b> 起',
        hn: 'Rosedale', hb: 'by Ancubic', offer: '额外奖励价值 <b>RM5,500</b>。', sub: '仅限通过 iNewProject。',
        or: '或',
        r1: '全新 iPhone 18 Pro (256GB)', r2: 'Touch ’n Go 电子钱包额度', worth: '价值 RM 5,500',
        note: '二选一 · 签署 SPA 后即归您所有。',
        cta: '查看仍开放的单位', link2: 'Rosedale 店铺与商务套房：奖励价值 RM9,499', video: '第一次使用 e-Enquiry？观看 60 秒教学',
        fine: '艺术构想图。奖励须遵守条款与条件。',
        close: '关闭', ai: '艺术构想图', eb: '可 e-\u2060ENQUIRY'
      }
    }
  };
  // Every Project of the Month keeps its listing ribbon for good (24 Oct 2026). Add each new winner; never remove one.
  // ribbonOnly: no badge on that winner's cards, the ribbon on its own listings stays (TuJu, 2 Nov 2026).
  var AWARDS = [
    { cards: ['/project/tuju-residences-1/', '/project/tuju-residences-retail-lots/'], mon: 'OCT', ribbonOnly: true,
      when: { en: 'October 2026', ms: 'Oktober 2026', zh: '2026年10月' }, short: { en: 'Oct 2026', ms: 'Okt 2026', zh: '2026年10月' } },
    { cards: ['/project/rosedale-by-ancubic/', '/project/rosedale-by-ancubic-1/'], mon: 'NOV',
      when: { en: 'November 2026', ms: 'November 2026', zh: '2026年11月' }, short: { en: 'Nov 2026', ms: 'Nov 2026', zh: '2026年11月' } }
  ];

  var D = document, path = location.pathname; // the popup shows on every load of the homepage and New Launches (24 Oct)
  var NL = /^\/project\/(\d+\/?)?$/, home = path === '/', showPage = home || NL.test(path);
  // ...but on New Launches only on arrival, not at every step inside the list (24 Oct: "disable at the new project by
  // state"): no auto-open (the tag stays) on a By State / area / search / type / e-Enquiry list, or when the visitor came from
  // another New Launches page (All State, Filter, Search). The homepage still opens it on every load.
  var inList = path !== '/' && (path !== '/project/' ||
    /[?&](state|s|type|price|bedroom|size|completion_year|status(%5B%5D|\[\])?|tod|eenquiry(_viewin)?)=/.test(location.search) ||
    (function () { try { var r = new URL(D.referrer); return r.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '') && NL.test(r.pathname); } catch (e) { return false; } })());

  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); return P.t[l] ? l : 'en'; }
  function T() { return P.t[lang()]; }
  function ev(name) { try { if (window.gtag) window.gtag('event', name, { potm_id: P.id, potm_lang: lang() }); } catch (e) {} }
  function img(a, alt, extra) { return '<img src="' + a.src + '" alt="' + (alt || '') + '"' + (extra || '') + (a.src !== a.alt ? ' onerror="this.onerror=null;this.src=\'' + a.alt + '\'"' : '') + '>'; }
  function el(tag, cls, html) { var e = D.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function skip(e) { e.setAttribute('data-np-skip', ''); e.setAttribute('translate', 'no'); return e; }

  var GOLD = '#8A6A1E', LINE = '#ECE4D3', MUTED = '#6E665A', INK = P.ink || '#141414';
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
    '#np-potm .npp-eb{position:absolute;top:.85rem;left:.85rem;z-index:2;display:inline-flex;align-items:center;gap:.35rem;padding:.34rem .72rem;border-radius:999px;background:rgba(208,2,27,.92);color:#fff;font:800 .64rem/normal "DM Sans",sans-serif;letter-spacing:.08em;white-space:nowrap;box-shadow:0 10px 20px rgba(208,2,27,.2)}#np-potm .npp-eb::before{content:"";width:8px;height:8px;border-radius:50%;background:#fff;flex:none}',   // the cards' pill (3 Nov)
    /* body: the offer first */
    '#np-potm .npp-body{padding:26px 30px 20px;overflow:auto}',
    '#np-potm .npp-kick{display:none;margin-bottom:6px;font:700 10px/1.25 "DM Sans",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:' + GOLD + '}',
    '#np-potm .npp-ttl{display:flex;flex-wrap:wrap;align-items:baseline;column-gap:9px;font-family:"Instrument Serif",Georgia,serif;font-style:normal;font-weight:400;font-size:56px;line-height:.98;letter-spacing:-.018em;color:' + INK + ';padding-right:40px}',
    '#np-potm .npp-ttl .npp-tb{font:600 14px/1.35 "DM Sans",sans-serif;letter-spacing:0;white-space:nowrap;color:' + INK + '}',
    '#np-potm .npp-offer{margin-top:7px;font:500 16px/1.33 "DM Sans",sans-serif;color:#141414}',
    '#np-potm .npp-offer b{font-weight:800;white-space:nowrap}',
    '#np-potm .npp-subl{margin-top:4px;font:600 13px/1.3 "DM Sans",sans-serif;color:' + MUTED + '}',
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
    '@media (min-width:768px){',
    '#np-potm .npp-card{max-height:calc(var(--npp-h,100vh) - 40px)}',
    '#np-potm .npp-body{max-height:calc(var(--npp-h,100vh) - 40px)}',
    '#np-potm .npp-body,#np-potm .npp-body *{transition:none}',
    '#np-potm .npp-tight .npp-body{padding:18px 26px 14px}',
    '#np-potm .npp-tight .npp-ttl{font-size:44px}#np-potm .npp-tight .npp-offer{margin-top:5px;font-size:15px}',
    '#np-potm .npp-tight .npp-gold{margin-top:10px}#np-potm .npp-tight .npp-prods{padding:8px 12px}',
    '#np-potm .npp-tight .npp-pi{height:60px}#np-potm .npp-tight .npp-p1 img{width:113px;height:60px}#np-potm .npp-tight .npp-p2 img{width:56px;height:56px;border-radius:13px}',
    '#np-potm .npp-tight .npp-prod b{margin-top:5px}#np-potm .npp-tight .npp-gn{padding:7px 12px}',
    '#np-potm .npp-tight .npp-proj{margin-top:10px;padding:8px 12px}#np-potm .npp-tight a.npp-cta{height:46px;margin-top:10px}',
    '#np-potm .npp-tight .npp-links{margin-top:8px}#np-potm .npp-tight .npp-fine{margin-top:8px}',
    '}',
    '@media (min-width:1080px){#np-potm .npp-ttl{font-size:calc(56px*1.111111)}#np-potm .npp-ttl .npp-tb{font-size:calc(14px*1.111111)}#np-potm .npp-offer{font-size:calc(16px*1.111111)}#np-potm .npp-tight .npp-ttl{font-size:calc(44px*1.111111)}#np-potm .npp-tight .npp-offer{font-size:calc(15px*1.111111)}}',
    /* phone: a centred card (30 Oct) */
    '@media (max-width:767px){',
    // iOS 26 Safari tints the strip behind its floating toolbar from whatever sits at the bottom edge (it showed red).
    // So the dim backdrop runs to the true bottom (large viewport) and the card is centred in the part the visitor sees.
    '#np-potm{bottom:auto;height:100vh;height:100lvh;padding:12px;padding-bottom:calc(12px + 100lvh - 100dvh)}',
    '#np-potm .npp-links{display:none}#np-potm .npp-kick{display:block}',
    '#np-potm button.npp-x{width:40px;height:40px;right:10px;top:10px}',
    '#np-potm .npp-card{width:100%;max-width:440px;max-height:calc(100vh - 24px);max-height:calc(100dvh - 24px);grid-template-columns:1fr;grid-template-rows:96px auto;border-radius:20px;overflow:auto}',
    '#np-potm .npp-photo{min-height:96px}#np-potm .npp-photo>img{object-position:' + (P.imgPosM || '50% 50%') + '}',
    '#np-potm .npp-mark{left:14px;top:50%;bottom:auto;transform:translateY(-50%)}',
    '#np-potm .npp-eb{top:50%;left:90px;transform:translateY(-50%)}',   // phones: beside the seal
    '#np-potm .npp-body{padding:14px 16px 16px;background:#fff}',
    '#np-potm .npp-ttl{font-size:42px;column-gap:8px;padding-right:0}#np-potm .npp-offer{margin-top:5px;font-size:14px}',
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
    '@media (max-width:767px) and (max-height:700px){',
    '#np-potm button.npp-x{width:36px;height:36px;right:8px;top:6px}#np-potm .npp-ai{bottom:3px}',
    '#np-potm .npp-card{grid-template-rows:68px auto}#np-potm .npp-photo{min-height:68px}#np-potm .npp-mark{transform:translateY(-50%) scale(.8);transform-origin:left center}',
    '#np-potm .npp-eb{left:76px;top:9px;transform:none}',   // short phones: level with the seal's top, clear of the caption
    '#np-potm .npp-subl{display:none}#np-potm .npp-ttl{font-size:34px}#np-potm .npp-offer{margin-top:3px}#np-potm .npp-body{padding-top:10px}#np-potm .npp-gold{margin-top:8px}',
    '#np-potm .npp-prods{padding:6px 8px 8px}#np-potm .npp-pi{height:44px}#np-potm .npp-p1 img{width:84px;height:44px}#np-potm .npp-p2 img{width:40px;height:40px}',
    '#np-potm .npp-proj{margin-top:8px;padding:6px 10px}#np-potm a.npp-cta{height:44px;margin-top:8px}#np-potm .npp-fine{margin-top:6px}',
    '}',
    '@media (max-width:399px){#np-potm .npp-proj{flex-wrap:wrap;row-gap:4px}#np-potm .npp-pn{flex:1 1 0}#np-potm .npp-pp{flex:1 0 100%;text-align:left;padding-left:56px}#np-potm .npp-pp b{display:inline}}',
    '@media (max-width:359px){#np-potm .npp-kick{display:none}#np-potm .npp-prod b{font-size:11px}#np-potm .npp-prod em{font-size:11px}#np-potm .npp-gn{font-size:11px}}',   // the seal already says it
    /* reopen tag */
    '.npp-pill{position:fixed;left:16px;bottom:16px;z-index:9990;display:flex;align-items:center;gap:9px;padding:7px 14px 7px 7px;border:0;border-radius:999px;background:#0E1424;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.22);font:600 13px/1 "DM Sans",sans-serif;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}',
    '.npp-pill.npp-in{opacity:1;transform:none}',
    '.npp-pill.npp-tuck{opacity:0;pointer-events:none}',
    '.npp-pill i{font-style:normal;color:#F2C46D;font-weight:500}',
    /* v12: big screens */
    '@supports (zoom:1){',   // browsers without zoom (Firefox before 126) keep the card as it was, height cap too
    '@media (min-width:1800px) and (min-height:860px){#np-potm .npp-card{zoom:1.12}#np-potm .npp-card,#np-potm .npp-body{max-height:calc((var(--npp-h,100vh) - 40px)/1.12)}}',
    '@media (min-width:2200px) and (min-height:1000px){#np-potm .npp-card{zoom:1.28}#np-potm .npp-card,#np-potm .npp-body{max-height:calc((var(--npp-h,100vh) - 40px)/1.28)}}',
    '@media (min-width:2800px) and (min-height:1200px){#np-potm .npp-card{zoom:1.4}#np-potm .npp-card,#np-potm .npp-body{max-height:calc((var(--npp-h,100vh) - 40px)/1.4)}}',
    '}',
    '@media (min-width:1080px){.npp-pill{scale:1.25;transform-origin:0 100%}}@media (min-width:1800px){.npp-pill{scale:1.45}}@media (min-width:2200px){.npp-pill{scale:1.65}}',
    /* permanent card badge + listing ribbon */
    '.npp-badge{position:absolute;left:10px;bottom:10px;z-index:3;display:flex;align-items:center;gap:7px;max-width:calc(100% - 20px);overflow:hidden;padding:4px 11px 4px 4px;border-radius:999px;background:#0E1424;color:#F2C46D;font:700 10px/1.1 "DM Sans",sans-serif;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}',
    '.npp-badge em{font-style:normal;color:#fff}',
    '.npp-ribbon{display:inline-flex;align-items:center;gap:8px;max-width:100%;overflow:hidden;white-space:nowrap;margin:0;vertical-align:middle;padding:5px 12px 5px 5px;border-radius:999px;background:#0E1424;color:#F2C46D;font:700 12px/1 "DM Sans",sans-serif;letter-spacing:.12em;text-transform:uppercase}.hero-title.npp-named{display:inline-block;vertical-align:middle;margin-right:16px}@media (min-width:1080px){.npp-ribbon{font-size:calc(12px*1.111111)}}',
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
    if (!D.getElementById('npp-fonts-ttl')) {   // v9: the title's font on its own small request (only the name's letters), so nothing heavier holds it up
      var n = D.createElement('link'); n.id = 'npp-fonts-ttl'; n.rel = 'stylesheet';
      n.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif&text=' + encodeURIComponent(P.t.en.hn + P.t.ms.hn + P.t.zh.hn) + '&display=swap';
      n.onload = function () { try { D.fonts.load('56px "Instrument Serif"', P.t.en.hn); } catch (e) {} };
      D.head.appendChild(n);
    }
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
      '<div class="npp-photo">' + img(P.img, t.name) + '<div class="npp-mark">' + seal(mob ? 66 : 112, t) + '</div><div class="npp-ai">' + t.ai + '</div>' + (P.eb ? '<div class="npp-eb">' + t.eb + '</div>' : '') + '</div>' +
      '<div class="npp-body">' +
      '<div class="npp-kick">' + t.label + ' · ' + t.when + '</div>' +
      '<div class="npp-ttl"><span class="npp-tn">' + t.hn + '</span><span class="npp-tb">' + t.hb + '</span></div><div class="npp-offer">' + t.offer + '</div><div class="npp-subl">' + t.sub + '</div>' +
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
  // v6: the card never runs past the screen. --npp-h = the visible height in the page's own pixels (laptops run at
  // html zoom .9, where 100vh is only 90 % of the screen); the tight spacing goes on only while the offer would not fit.
  function fitCard() {
    if (!root) return;
    var z = parseFloat(getComputedStyle(D.documentElement).zoom) || 1, card = root.querySelector('.npp-card'), body = root.querySelector('.npp-body');
    root.style.setProperty('--npp-h', (innerHeight / z) + 'px');
    if (!card || !body) return;
    card.classList.remove('npp-tight');
    if (innerWidth >= 768 && body.scrollHeight > body.clientHeight + 1) card.classList.add('npp-tight');
  }
  var fq; function fitSoon() { if (!fq) fq = requestAnimationFrame(function () { fq = 0; fitCard(); }); }
  addEventListener('resize', fitSoon);
  function open(auto) {
    if (root) return;
    fonts();
    lastFocus = D.activeElement;
    root = skip(el('div')); root.id = 'np-potm'; root.innerHTML = build();
    D.body.appendChild(root); D.documentElement.classList.add('npp-open');
    if (pill) pill.classList.remove('npp-in');
    requestAnimationFrame(function () { requestAnimationFrame(function () { root && root.classList.add('npp-in'); }); });
    fitCard(); if (D.fonts && D.fonts.ready) D.fonts.ready.then(fitSoon); setTimeout(fitSoon, 400); setTimeout(fitSoon, 1500);
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
    pill.innerHTML = mini(P.mon) + '<span>' + t.label + ' <i>· ' + (t.tag || t.name) + '</i></span>';
    pill.setAttribute('aria-label', t.label + ': ' + t.name);
    requestAnimationFrame(function () { pill.classList.add('npp-in'); tuck(); setTimeout(tuck, 400); setTimeout(tuck, 1500); });   // again once it has slid in and the fonts have settled
  }
  // The tag never sits on the homepage's headline, search bar or points tray: on the smallest phones (iPhone SE 1st gen,
  // 320x568) it waits out of sight at the top of the page and fades in once the page scrolls clear.
  var KEEP = ['.hero-title', '#searchWrap .search-bar', '.hero-tags'], tq;
  function tuck() {
    if (!pill || !home) return;
    var a = pill.getBoundingClientRect(), on = false;
    if (a.width) KEEP.forEach(function (s) {
      var e = D.querySelector(s), b = e && e.getBoundingClientRect();
      if (b && b.width && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) on = true;
    });
    pill.classList.toggle('npp-tuck', on); pill.tabIndex = on ? -1 : 0;
  }
  function tuckSoon() { if (!tq) tq = requestAnimationFrame(function () { tq = 0; tuck(); }); }
  addEventListener('scroll', tuckSoon, { passive: true }); addEventListener('resize', tuckSoon);

  /* ---- permanent badges: every winner's cards (anywhere) + its listing ribbon ---- */
  var ro = window.ResizeObserver ? new ResizeObserver(function (list) {   // re-fit when a card appears or resizes (carousels, tabs)
    list.forEach(function (en) { var e = en.target.querySelector('.npp-badge') || en.target.querySelector('.npp-ribbon'); if (e && e.__t) fit(e, e.__t); });
  }) : null;
  function fit(e, tiers) { // longest text that fits; the box itself never grows past its container
    if (e.__t !== tiers) { e.__t = tiers; if (ro && e.parentElement && !e.__o) { ro.observe(e.parentElement); e.__o = 1; } }
    for (var k = 0; k < tiers.length; k++) {
      if (e.innerHTML !== tiers[k]) e.innerHTML = tiers[k];
      if (!e.clientWidth || (e.scrollWidth <= e.clientWidth + 1 && e.getBoundingClientRect().right <= document.documentElement.clientWidth + 0.5)) return;   // v7: and inside the screen
    }
  }
  function badges() {
    var l = lang(), label = P.t[l].label;
    AWARDS.forEach(function (a) {
      var ic = mini(a.mon), tiers = [ic + label + ' · <em>' + a.when[l] + '</em>', ic + label + ' · <em>' + a.short[l] + '</em>', ic + label];
      a.cards.forEach(function (u) {
        var links = a.ribbonOnly ? [] : D.querySelectorAll('.project-card a[href$="' + u + '"]');
        for (var i = 0; i < links.length; i++) {
          var img = links[i].querySelector('.project-image');
          if (!img) continue;
          var b = img.querySelector('.npp-badge');
          if (!b) { b = skip(el('div', 'npp-badge')); if (getComputedStyle(img).position === 'static') img.style.position = 'relative'; img.appendChild(b); }
          fit(b, tiers);
        }
        if (path === u) {
          var h = D.querySelector('.hero-title'), r = D.querySelector('.npp-ribbon');
          if (h && !r) { r = skip(el('div', 'npp-ribbon')); h.parentNode.insertBefore(r, h.nextSibling); h.classList.add('npp-named'); }   // v11: beside the name
          if (r) fit(r, tiers);
        }
      });
    });
  }
  var rz; addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(badges, 150); });
  addEventListener('load', function () { badges(); tuck(); });
  addEventListener('np:cards', function () { badges(); });   // search v3 swaps in cards from later pages (price < RM300k / > RM2m)

  function rerender() {
    badges();
    if (pill) showPill();
    if (root) { fonts(); var keep = root.classList.contains('npp-in'); root.innerHTML = build(); if (keep) root.classList.add('npp-in'); fitCard(); setTimeout(fitSoon, 400); }
  }

  function start() {
    var s = el('style'); s.id = 'npp-css'; s.textContent = CSS; D.head.appendChild(s);
    badges();
    new MutationObserver(rerender).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
    if (!showPage) return;
    // Open straight away (25 Oct: "make that immediate"), but only once the popup's own images have decoded
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
