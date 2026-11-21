/* iNewProject . listing photo section v2-3 (21 Nov 2026) = v2-2 + laptops and tablets (768 px and up): the "All N photos" pill is not
   drawn on the big photo either (a click on the photo opens the viewer; the "3 / 15" count stays); the button stays for keyboard
   users and shows when it has keyboard focus; a click on the photo's frame opens the viewer like a click on the photo. v2-2 = v2-1 + where the arrows are hidden (under 992 px: phones, upright
   tablets) the first photo carries a small "Swipe >" tab on its right edge: one gentle nudge, gone after 4.5 s or at the first
   touch, once per visit (sessionStorage), never when there is one photo; no nudge with reduced motion. v2-1 = v2 + phones (under 768 px): no "All N photos" pill on the big photo
   (a tap on the photo opens the viewer; the "3 / 15" count stays). v2 = v1 + the thumbnail strip gets arrows (Epic-style) and, when the listing
   has the e-Enquiry box (listing/np-ebox, html.npe-on), the strip sits under the big photo on laptops too, instead of the side
   tiles (the box takes the right column). The big photo keeps its size and shape. v1 (20 Nov 2026): Loaded from the admin Header Scripts box; listing pages only.
   The big main photo stays the same size. On it: arrows, "3 / 15", "All 15 photos" and swipe on phones; a tap opens a
   full-screen viewer (caption, arrows, keys, swipe, a strip). v2: no category row above the photo (v1 had "All · Show unit ·
   Building ..."; removed 21 Nov as too much); captions and the Actual photo / Artist impression badge stay in the viewer.
   Beside it on laptops: 5 photos + a "+N more" tile; on phones a strip under it. Show-unit photos of a listing whose
   show-unit layout is known link to that layout's open units on its e-Enquiry page ("Type C units still open").
   The photos and their order are the site's own; the site's switchGallery() still changes the main photo (so the
   "Actual photo" badge keeps working). EN / BM / 中文. Fail-safe: anything missing or any error -> the site's gallery.
   Also (listing pages): long links / emails in the Developer card wrap (one page ran wider than a phone). */
(function () {
  var W = window, D = document, H = D.documentElement;
  if (!/^\/project\/[^\/]+\/?$/.test(location.pathname) || W.__NPG__) return; W.__NPG__ = 1;
  // Our words: [EN, BM, 中文]
  var T = {
    all: ['All', 'Semua', '全部'], allN: ['All {n} photos', 'Semua {n} foto', '全部 {n} 张照片'], more: ['+{n} more', '+{n} lagi', '另 {n} 张'],
    swipe: ['Swipe', 'Leret', '滑动'],
    close: ['Close', 'Tutup', '关闭'], prev: ['Previous photo', 'Foto sebelumnya', '上一张'], next: ['Next photo', 'Foto seterusnya', '下一张'],
    unit: ['Show unit', 'Unit pameran', '样板房'], interior: ['Interiors', 'Dalaman', '室内'], building: ['Building', 'Bangunan', '建筑'],
    facilities: ['Facilities', 'Kemudahan', '设施'], location: ['Location', 'Lokasi', '位置'], progress: ['Site progress', 'Kemajuan tapak', '工程进度'],
    impression: ['Artist impression', 'Gambaran artis', '艺术构想图'], actual: ['Actual photo', 'Gambar sebenar', '实拍照片'],
    open: ['{t} units still open', 'Unit {t} masih dibuka', '{t} 单位仍开放']
  };
  // Captioned listings: file id -> [category, EN, BM, 中文, actual?]. unitType = the show unit's layout (links to its open units).
  var INFO = {
    'rosedale-by-ancubic': { unitType: 'Type C', ids: {
      '1795151826': ['building', 'The twin towers', 'Dua menara kembar', '双子塔', 0],
      '1795151828': ['building', 'Scale model at the sales gallery', 'Model skala di galeri jualan', '销售展厅的建筑模型', 1],
      '1795151830': ['unit', 'Type C show unit · dining', 'Unit pameran Jenis C · ruang makan', 'C 型样板房 · 餐厅', 1],
      '1795151832': ['unit', 'Type C show unit · master bedroom', 'Unit pameran Jenis C · bilik tidur utama', 'C 型样板房 · 主卧', 1],
      '1795151834': ['unit', 'Type C show unit · kitchen', 'Unit pameran Jenis C · dapur', 'C 型样板房 · 厨房', 1],
      '1795151836': ['unit', 'Type C show unit · bedroom 2', 'Unit pameran Jenis C · bilik tidur 2', 'C 型样板房 · 卧室 2', 1],
      '1795151837': ['unit', 'Type C show unit · kids’ room', 'Unit pameran Jenis C · bilik kanak-kanak', 'C 型样板房 · 儿童房', 1],
      '1795151839': ['facilities', 'Resort pool', 'Kolam renang resort', '度假式泳池', 0],
      '1795151841': ['facilities', 'Pool deck', 'Dek kolam', '泳池平台', 0],
      '1795151844': ['building', 'The towers at night', 'Menara pada waktu malam', '夜景', 0],
      '1795151848': ['location', 'Shops downstairs', 'Kedai di tingkat bawah', '楼下商店', 0],
      '1795151850': ['location', 'Cafés at your doorstep', 'Kafe di depan pintu', '家门口的咖啡馆', 0],
      '1795151852': ['location', 'Near the LRT and KESAS', 'Berhampiran LRT dan KESAS', '靠近 LRT 和 KESAS', 0],
      '1795151854': ['location', 'Highways around the project', 'Lebuh raya di sekitar projek', '项目周边的高速公路', 0],
      '1795151857': ['progress', 'Site progress, October 2026', 'Kemajuan tapak, Oktober 2026', '工程进度，2026 年 10 月', 1] } },
    'tuju-residences-1': { unitType: '', ids: {
      '1795145426': ['building', 'TuJu over the KL skyline', 'TuJu dengan latar langit KL', 'TuJu 与吉隆坡天际线', 0],
      '1795145428': ['unit', 'Show unit · dining and living', 'Unit pameran · ruang makan dan tamu', '样板房 · 餐厅与客厅', 1],
      '1795145430': ['unit', 'Show unit · living room', 'Unit pameran · ruang tamu', '样板房 · 客厅', 1],
      '1795145432': ['facilities', 'Resort pool deck', 'Dek kolam resort', '度假式泳池平台', 0],
      '1795145434': ['building', 'Arrival lobby', 'Lobi ketibaan', '入口大堂', 0],
      '1795145436': ['facilities', 'Sky deck with the KL skyline', 'Dek langit dengan pemandangan KL', '空中平台与吉隆坡天际线', 0],
      '1795145438': ['unit', 'Show unit · living room', 'Unit pameran · ruang tamu', '样板房 · 客厅', 1],
      '1795169273': ['interior', 'Type D living room', 'Ruang tamu Jenis D', 'D 型客厅', 0],
      '1795169275': ['interior', 'Master bedroom', 'Bilik tidur utama', '主卧', 0],
      '1795169277': ['facilities', 'Gym', 'Gimnasium', '健身房', 0],
      '1795169279': ['facilities', 'Residents’ lounge', 'Ruang rehat penghuni', '住户休息室', 0],
      '1795169281': ['facilities', 'Co-working lounge', 'Ruang kerja bersama', '共享办公区', 0],
      '1795169284': ['facilities', 'Kids’ splash pool', 'Kolam percikan kanak-kanak', '儿童戏水池', 0],
      '1795169286': ['unit', 'Sales gallery entrance', 'Pintu masuk galeri jualan', '销售展厅入口', 1] } }
  };
  // Real photos on listings without captions (the same files as the "Actual photo" badge)
  var REAL = ['661/NP1U_k-residence-1790404874', '661/NP1U_k-residence-1794909308', '661/NP1U_k-residence-1794909310', '661/NP1U_k-residence-1794909311',
    '661/NP1U_k-residence-1794909313', '661/NP1U_k-residence-1794909315', '661/NP1U_k-residence-1794909317', '661/NP1U_k-residence-1794909319',
    '661/NP1U_k-residence-1794909320', '661/NP1U_k-residence-1794909322', '661/NP1U_k-residence-1794909324',
    '682/NP1U_taman-sungai-bertek-klang-1794817166', '682/NP1U_taman-sungai-bertek-klang-1794817168', '682/NP1U_taman-sungai-bertek-klang-1794817170',
    '682/NP1U_taman-sungai-bertek-klang-1794817171', '682/NP1U_taman-sungai-bertek-klang-1794817173', '682/NP1U_taman-sungai-bertek-klang-1794817175',
    '682/NP1U_taman-sungai-bertek-klang-1794817176', '682/NP1U_taman-sungai-bertek-klang-1794817178'];
  var ORDER = ['unit', 'interior', 'building', 'facilities', 'location', 'progress', 'impression', 'actual'];
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function t(k, v) { var s = T[k][L()]; if (v) s = s.replace(/\{(\w)\}/g, function (m, x) { return v[x]; }); return s; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function start() {
    var main = D.getElementById('galleryMainImg'), gm = main && main.parentNode, grid = D.querySelector('.gallery-grid'), side = D.querySelector('.gallery-side');
    if (!main || !gm || !grid || !gm.classList.contains('gallery-main') || D.querySelector('.npg-cats,.npg-stripw')) return;
    var thumbs = [].slice.call(D.querySelectorAll('.gallery-side .gallery-thumb'));
    var srcs = thumbs.map(function (el) { var m = /switchGallery\('([^']+)'/.exec(el.getAttribute('onclick') || ''); return m ? m[1] : ''; });
    if (srcs.length < 2 || srcs.some(function (s) { return !/^https:\/\/www\.inewproject\.com\/images\/uploads\/project\/\d+\/[^\s'"<>]+$/.test(s); })) return;
    var slug = location.pathname.split('/')[2], info = INFO[slug] || null;
    function id(s) { var m = /-(\d{10})\.webp$/.exec(s); return m ? m[1] : ''; }
    function file(s) { var m = /\/project\/(\d+\/NP1U_[^\/]+?)\.webp$/.exec(s); return m ? m[1] : ''; }
    function meta(s) {   // [category, caption or '', actual?]
      if (info) { var r = info.ids[id(s)]; if (r) return [r[0], r[1 + L()], !!r[4]]; return ['building', '', false]; }
      var a = REAL.indexOf(file(s)) >= 0; return [a ? 'actual' : 'impression', '', a];
    }
    var cats = ['all'].concat(ORDER.filter(function (c) { return srcs.some(function (s) { return meta(s)[0] === c; }); }));
    cats = ['all'];   // no category row on the page (21 Nov: too much); captions + Actual / Impression badges stay in the viewer
    var cat = 'all', list = srcs.slice(), cur = Math.max(0, srcs.indexOf(main.getAttribute('src')));
    var unitType = info && info.unitType, enq = D.querySelector('a[href*="/e-enquiry"]');
    var enqUrl = enq ? new URL(enq.getAttribute('href'), location.href) : null;
    if (enqUrl && (enqUrl.origin !== location.origin || enqUrl.pathname.replace(/\/?$/, '/') !== '/project/' + slug + '/e-enquiry/')) enqUrl = null;   // this listing's own e-Enquiry page only

    var css = D.createElement('style'); css.id = 'npg-css';
    css.textContent = [
      '.gallery-main{position:relative}',
      '.npg-ui{--k:1}',
      '@media (min-width:1080px){.npg-ui{--k:1.111111}}',   // laptops show the site at 90%: the same size on screen as on a phone
      '.gallery-main .npg-nav,#npg-view .npg-nav{position:absolute;top:50%;z-index:3;transform:translateY(-50%);width:calc(44px*var(--k));height:calc(44px*var(--k));border:0;border-radius:50%;background:rgba(255,255,255,.94);box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer;padding:0}',
      '.npg-nav:after{content:"";position:absolute;top:50%;left:50%;width:calc(10px*var(--k));height:calc(10px*var(--k));border-top:2.5px solid #1d1d1f;border-right:2.5px solid #1d1d1f}',
      '.npg-prev{left:14px}.npg-prev:after{transform:translate(-30%,-50%) rotate(-135deg)}.npg-next{right:14px}.npg-next:after{transform:translate(-70%,-50%) rotate(45deg)}',
      '.npg-count{position:absolute;right:14px;bottom:14px;z-index:3;padding:calc(7px*var(--k)) calc(12px*var(--k));border-radius:999px;background:rgba(17,17,17,.72);color:#fff;font-family:inherit;font-weight:700;font-size:calc(14px*var(--k));line-height:1}',
      '@media (max-width:767.98px){.gallery-main .npg-all{display:none!important}}',
      '@media (min-width:768px){.gallery-main .npg-all:not(:focus-visible){width:1px!important;height:1px!important;padding:0!important;overflow:hidden!important;clip-path:inset(50%)!important;box-shadow:none!important;white-space:nowrap!important}}',   // v2-3: laptops and tablets too; kept for the keyboard (shows on keyboard focus)   // v2-1: phones: no "All N photos" pill on the photo (a tap on the photo opens the viewer; the count stays)
      '.npg-all{position:absolute;left:14px;bottom:14px;z-index:3;padding:calc(10px*var(--k)) calc(15px*var(--k));border:0;border-radius:999px;background:#fff;color:#1d1d1f;font-family:inherit;font-weight:700;font-size:calc(14px*var(--k));line-height:1;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer}',
      '#galleryMainImg.npg-zoom{cursor:zoom-in}',
      '.gallery-main:has(>#galleryMainImg.npg-zoom){cursor:zoom-in}',
      '.npg-cats{display:flex;gap:8px;margin:0 0 12px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}.npg-cats::-webkit-scrollbar{display:none}',
      '.npg-cats button{flex:none;display:inline-flex;align-items:center;gap:6px;padding:calc(9px*var(--k)) calc(14px*var(--k));border:1.5px solid #E7E2DB;border-radius:999px;background:#fff;color:#2d2d2d;font-family:inherit;font-weight:600;font-size:calc(14px*var(--k));line-height:1;cursor:pointer;white-space:nowrap}',
      '.npg-cats button b{font-weight:700;color:#8a8a8a}.npg-cats button.on{background:#1d1d1f;border-color:#1d1d1f;color:#fff}.npg-cats button.on b{color:#cfcfcf}',
      '.npg-side{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:10px;height:100%;min-height:0}',
      '.npg-t{position:relative;border-radius:12px;overflow:hidden;cursor:pointer;min-height:0;background:#eee}.npg-t img{display:block;width:100%;height:100%;object-fit:cover}',
      '.npg-t.on{outline:3px solid #D0021B;outline-offset:-3px}',
      '.npg-more{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(17,17,17,.55);color:#fff;font-family:inherit;font-weight:800;font-size:calc(18px*var(--k))}',
      '.npg-strip{display:none}.npg-stripw{position:relative}.npg-sa{display:none}',
      // v2: with the e-Enquiry box (html.npe-on) the strip sits under the big photo on laptops, with arrows (Epic-style)
      '@media (min-width:992px){html.npe-on .gallery-grid .gallery-side,html.npe-on .gallery-grid .npg-side{display:none!important}',
      ' html.npe-on .npg-strip{display:flex;gap:10px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;padding:2px}html.npe-on .npg-strip::-webkit-scrollbar{display:none}',
      ' html.npe-on .npg-strip .npg-t{flex:0 0 calc(124px*var(--k));height:calc(72px*var(--k));border-radius:10px}',
      ' html.npe-on .npg-sa{display:block;position:absolute;top:50%;z-index:2;transform:translateY(-50%);width:calc(34px*var(--k));height:calc(34px*var(--k));border:0;border-radius:50%;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.2);cursor:pointer;padding:0}',
      ' html.npe-on .npg-sa[hidden]{display:none}html.npe-on .npg-sa-l{left:-6px}html.npe-on .npg-sa-r{right:-6px}',
      ' html.npe-on .npg-sa:after{content:"";position:absolute;top:50%;left:50%;width:8px;height:8px;border-top:2.5px solid #1d1d1f;border-right:2.5px solid #1d1d1f}',
      ' html.npe-on .npg-sa-l:after{transform:translate(-30%,-50%) rotate(-135deg)}html.npe-on .npg-sa-r:after{transform:translate(-70%,-50%) rotate(45deg)}}',
      '.npg-go{display:inline-flex;align-items:center;gap:6px;margin:10px 0 0;padding:calc(9px*var(--k)) calc(14px*var(--k));border-radius:999px;background:#FFF0F1;border:1px solid #F4C9CE;color:#B0001A;font-family:inherit;font-weight:700;font-size:calc(14px*var(--k));text-decoration:none}',
      '.npg-go[hidden]{display:none}',
      '.npg-hint{position:absolute;right:0;top:50%;z-index:3;display:none;align-items:center;gap:4px;padding:10px 8px 10px 14px;border-radius:999px 0 0 999px;background:rgba(17,17,17,.72);color:#fff;font-family:inherit;font-weight:700;font-size:14px;line-height:1;pointer-events:none;transform:translateY(-50%);opacity:1;transition:opacity .25s ease}',
      '.npg-hint svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.npg-hint.npg-out{opacity:0}',
      '@keyframes npg-nudge{0%,100%{transform:translateY(-50%)}50%{transform:translate(-8px,-50%)}}',
      '@media (max-width:991.98px){.npg-hint{display:inline-flex}}@media (max-width:991.98px) and (prefers-reduced-motion:no-preference){.npg-hint{animation:npg-nudge .9s ease-in-out .6s 2}}',
      '@media (max-width:991.98px){.gallery-grid .gallery-side,.gallery-grid .npg-side{display:none!important}.gallery-grid{grid-template-columns:1fr!important}',
      ' .npg-strip{display:flex;gap:8px;overflow-x:auto;margin-top:10px;scrollbar-width:none;-webkit-overflow-scrolling:touch}.npg-strip::-webkit-scrollbar{display:none}',
      ' .npg-strip .npg-t{flex:0 0 84px;height:60px;border-radius:10px}.gallery-main .npg-nav{display:none}}',
      '#npg-view{position:fixed;inset:0;z-index:100000;display:none;flex-direction:column;background:#0b0b0b;color:#fff;font-family:inherit}#npg-view.on{display:flex}',
      '.npgv-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;font-weight:700;font-size:calc(15px*var(--k))}',
      '.npgv-close{border:0;border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font-family:inherit;font-weight:700;font-size:calc(15px*var(--k));padding:calc(10px*var(--k)) calc(16px*var(--k));cursor:pointer}',
      '.npgv-stage{position:relative;flex:1;display:flex;align-items:center;justify-content:center;min-height:0;padding:0 70px}.npgv-stage img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px}',
      '.npgv-badge{display:inline-block;margin:0 8px 0 0;padding:4px 9px;border-radius:6px;background:rgba(255,255,255,.16);color:#fff;font-weight:700;font-size:calc(14px*var(--k));vertical-align:1px}',
      '.npgv-cap{text-align:center;padding:12px 20px 4px;font-weight:600;font-size:calc(16px*var(--k));line-height:1.35;color:#eee}',
      '.npgv-cap .npg-go{display:flex;width:max-content;max-width:100%;margin:10px auto 0}',
      '.npgv-strip{display:flex;gap:8px;overflow-x:auto;padding:10px 18px 18px;scrollbar-width:none}.npgv-strip::-webkit-scrollbar{display:none}',
      '.npgv-strip img{flex:0 0 76px;height:52px;object-fit:cover;border-radius:6px;opacity:.55;cursor:pointer}.npgv-strip img.on{opacity:1;outline:2px solid #fff}',
      '#npg-view .npg-nav{background:rgba(255,255,255,.16)}#npg-view .npg-nav:after{border-color:#fff}',
      '@media (max-width:767.98px){.npgv-stage{padding:0 6px}#npg-view .npg-nav{display:none}}',
      // listing page, not the gallery: a long link or email in the Developer card wraps (Residensi Sinaran's LinkedIn link made
      // the page 57 px wider than a phone). Only unbroken strings are affected.
      '.dev-about,.dev-contact-stack,.dev-contact-card,.dev-contact-card .contact-list,.dev-contact-card .contact-item,.dev-contact-card .value{min-width:0;max-width:100%}.dev-about .value,.dev-about a,.dev-about p,.dev-contact-stack .value,.dev-contact-stack a{overflow-wrap:anywhere}'
    ].join('\n');
    D.head.appendChild(css);

    // build (our elements carry data-np-skip: their words are ours, already in the visitor's language)
    function el(tag, cls, html) { var e = D.createElement(tag); if (cls) e.className = cls; e.setAttribute('data-np-skip', ''); if (html != null) e.innerHTML = html; return e; }
    var ui = el('div', 'npg-ui'); ui.style.display = 'contents'; gm.appendChild(ui);
    var bPrev = el('button', 'npg-nav npg-prev'), bNext = el('button', 'npg-nav npg-next'), count = el('span', 'npg-count'), bAll = el('button', 'npg-all');
    [bPrev, bNext, bAll].forEach(function (b) { b.type = 'button'; }); ui.appendChild(bPrev); ui.appendChild(bNext); ui.appendChild(count); ui.appendChild(bAll);
    main.classList.add('npg-zoom');
    var catBox = el('div', 'npg-cats npg-ui'); if (cats.length > 1) grid.parentNode.insertBefore(catBox, grid);
    var sideBox = el('div', 'npg-side npg-ui'); if (side) { side.style.display = 'none'; side.parentNode.insertBefore(sideBox, side.nextSibling); }
    var stripW = el('div', 'npg-stripw npg-ui'), strip = el('div', 'npg-strip'), sL = el('button', 'npg-sa npg-sa-l'), sR = el('button', 'npg-sa npg-sa-r');
    sL.type = sR.type = 'button'; stripW.appendChild(sL); stripW.appendChild(strip); stripW.appendChild(sR); grid.parentNode.insertBefore(stripW, grid.nextSibling);
    function stripArrows() { var max = strip.scrollWidth - strip.clientWidth; sL.hidden = strip.scrollLeft <= 2; sR.hidden = strip.scrollLeft >= max - 2; }
    sL.addEventListener('click', function () { strip.scrollBy({ left: -strip.clientWidth * 0.8, behavior: 'smooth' }); });
    sR.addEventListener('click', function () { strip.scrollBy({ left: strip.clientWidth * 0.8, behavior: 'smooth' }); });
    strip.addEventListener('scroll', stripArrows, { passive: true }); addEventListener('resize', stripArrows);
    if (W.ResizeObserver) new ResizeObserver(stripArrows).observe(strip);   // the strip can become visible later (box mode) or change size
    var go = el('a', 'npg-go npg-ui'); go.hidden = true; stripW.parentNode.insertBefore(go, stripW.nextSibling);
    var view = el('div', ''); view.id = 'npg-view'; view.setAttribute('role', 'dialog'); view.setAttribute('aria-modal', 'true');
    view.innerHTML = '<div class="npgv-top npg-ui"><span class="npgv-n"></span><button type="button" class="npgv-close"></button></div>' +
      '<div class="npgv-stage npg-ui"><button type="button" class="npg-nav npg-prev"></button><img alt=""><button type="button" class="npg-nav npg-next"></button></div>' +
      '<div class="npgv-cap npg-ui"><span class="npgv-badge"></span><span class="npgv-c"></span></div><div class="npgv-strip"></div>';
    D.body.appendChild(view);
    var vImg = view.querySelector('.npgv-stage img'), vGo = go.cloneNode(false); view.querySelector('.npgv-cap').appendChild(vGo);

    function catName(c) { return c === 'all' ? t('all') : t(c); }
    function goLink() {   // show-unit photos of a listing whose show-unit layout is known -> that layout's open units
      if (!unitType || !enqUrl || meta(list[cur])[0] !== 'unit') return null;
      return enqUrl.pathname + '#units&layout=' + encodeURIComponent(unitType);
    }
    function show(i) {
      cur = (i + list.length) % list.length;
      var s = list[cur], th = thumbs[srcs.indexOf(s)];
      try { if (typeof W.switchGallery === 'function' && th) W.switchGallery(s, th); else main.src = s; } catch (e) { main.src = s; }
      paint();
    }
    function paint() {
      count.textContent = (cur + 1) + ' / ' + list.length;
      bAll.textContent = t('allN', { n: srcs.length }); bPrev.setAttribute('aria-label', t('prev')); bNext.setAttribute('aria-label', t('next'));
      if (cats.length > 1) catBox.innerHTML = cats.map(function (c) { var n = c === 'all' ? srcs.length : srcs.filter(function (s) { return meta(s)[0] === c; }).length;
        return '<button type="button" class="' + (c === cat ? 'on' : '') + '" data-c="' + c + '" aria-pressed="' + (c === cat) + '">' + esc(catName(c)) + '<b>' + n + '</b></button>'; }).join('');
      var six = list.length > 6;
      sideBox.innerHTML = list.slice(0, 6).map(function (s, i) { return '<div class="npg-t' + (i === cur ? ' on' : '') + '" data-i="' + i + '"><img src="' + esc(s) + '" alt="" loading="lazy">' +
        (i === 5 && six ? '<span class="npg-more">' + esc(t('more', { n: list.length - 5 })) + '</span>' : '') + '</div>'; }).join('');
      strip.innerHTML = list.map(function (s, i) { return '<div class="npg-t' + (i === cur ? ' on' : '') + '" data-i="' + i + '"><img src="' + esc(s) + '" alt="" loading="lazy"></div>'; }).join('');
      var on = strip.querySelector('.npg-t.on'); if (on && strip.scrollWidth > strip.clientWidth) strip.scrollLeft = Math.max(0, on.offsetLeft - strip.clientWidth / 2 + on.offsetWidth / 2);
      sL.setAttribute('aria-label', t('prev')); sR.setAttribute('aria-label', t('next')); stripArrows();
      var g = goLink(); [go, vGo].forEach(function (a) { a.hidden = !g; if (g) { a.setAttribute('href', g); a.textContent = t('open', { t: unitType }) + ' →'; } });
      if (view.classList.contains('on')) paintView();
    }
    function paintView() {
      var s = list[cur], m = meta(s);
      vImg.src = s; vImg.alt = m[1] || '';
      view.querySelector('.npgv-n').textContent = (cur + 1) + ' / ' + list.length + (cat !== 'all' ? ' · ' + catName(cat) : '');
      view.querySelector('.npgv-close').textContent = t('close');
      view.querySelectorAll('.npg-prev')[0].setAttribute('aria-label', t('prev')); view.querySelectorAll('.npg-next')[0].setAttribute('aria-label', t('next'));
      view.querySelector('.npgv-c').textContent = m[1] || (info ? catName(m[0]) : '');
      view.querySelector('.npgv-badge').textContent = m[2] ? t('actual') : t('impression');
      var st = view.querySelector('.npgv-strip');
      st.innerHTML = list.map(function (x, i) { return '<img src="' + esc(x) + '" data-i="' + i + '"' + (i === cur ? ' class="on"' : '') + ' alt="" loading="lazy">'; }).join('');
      var o = st.querySelector('img.on'); if (o) st.scrollLeft = Math.max(0, o.offsetLeft - st.clientWidth / 2 + 38);
    }
    var lastFocus = null;
    function open() { lastFocus = D.activeElement; view.classList.add('on'); H.style.overflow = 'hidden'; paintView(); view.querySelector('.npgv-close').focus(); }
    function close() { view.classList.remove('on'); H.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }

    bPrev.addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    bNext.addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    bAll.addEventListener('click', function (e) { e.stopPropagation(); open(); });
    main.addEventListener('click', open);
    gm.addEventListener('click', function (e) { if (e.target === gm || e.target === count) open(); });   // v2-3: no pill now, so a click on the photo's frame (photo still loading, or not filling it) opens the viewer too
    view.querySelector('.npgv-stage .npg-prev').addEventListener('click', function () { show(cur - 1); });
    view.querySelector('.npgv-stage .npg-next').addEventListener('click', function () { show(cur + 1); });
    view.querySelector('.npgv-close').addEventListener('click', close);
    view.querySelector('.npgv-strip').addEventListener('click', function (e) { var i = e.target.getAttribute('data-i'); if (i != null) show(+i); });
    function pick(e) { var x = e.target.closest('.npg-t'); if (!x) return; var i = +x.getAttribute('data-i'); if (x.querySelector('.npg-more')) { cur = i; open(); paint(); } else show(i); }
    sideBox.addEventListener('click', pick); strip.addEventListener('click', pick);
    catBox.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; var c = b.getAttribute('data-c'); if (cats.indexOf(c) < 0) return;
      cat = c; list = c === 'all' ? srcs.slice() : srcs.filter(function (s) { return meta(s)[0] === c; }); show(0); });
    D.addEventListener('keydown', function (e) { if (!view.classList.contains('on')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1); });
    var x0 = null, y0 = null;
    [gm, view.querySelector('.npgv-stage')].forEach(function (z) {
      z.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      z.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) show(cur + (dx < 0 ? 1 : -1)); }, { passive: true });
    });
    // v2-2: "Swipe >" on the first photo where the arrows are hidden; once per visit
    (function () { try {
      if (list.length < 2 || !W.matchMedia || !W.matchMedia('(max-width:991.98px)').matches) return;
      try { if (sessionStorage.getItem('npg_swipe')) return; } catch (e) {}
      var hint = el('div', 'npg-hint', '<span></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'); hint.firstChild.textContent = t('swipe'); ui.appendChild(hint);
      var gone = false, off = function () { if (gone) return; gone = true; try { sessionStorage.setItem('npg_swipe', '1'); } catch (e) {} hint.classList.add('npg-out'); setTimeout(function () { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 300); };
      gm.addEventListener('touchstart', off, { passive: true }); gm.addEventListener('click', off); setTimeout(off, 4500);
      new MutationObserver(function () { if (!gone) hint.firstChild.textContent = t('swipe'); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] });
    } catch (e) {} })();
    // the site's own thumbs (if anything still calls them) keep us in step
    new MutationObserver(function () { var i = list.indexOf(main.getAttribute('src')); if (i >= 0 && i !== cur) { cur = i; paint(); } }).observe(main, { attributes: true, attributeFilter: ['src'] });
    new MutationObserver(function () { paint(); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] });
    paint();
  }
  function safe() { try { start(); } catch (e) { try { var s = D.querySelector('.gallery-side'); if (s) s.style.display = ''; ['npg-css', 'npg-view'].forEach(function (i) { var x = D.getElementById(i); if (x) x.remove(); });
    [].forEach.call(D.querySelectorAll('.npg-ui'), function (x) { x.remove(); }); } catch (e2) {} } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safe); else safe();
})();
