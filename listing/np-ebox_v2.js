/* iNewProject . listing e-Enquiry box v2 (21 Nov 2026). Loaded from the admin Header Scripts box; listing pages of e-Enquiry projects.
   Epic-style right column beside the photos (photos 70%, the column 30%, no card frame; from 992 px the photo section takes the
   title row's width so photo, column, title and Share line up). Every word and number comes from the page itself or the daily
   unit file (GitHub Actions, jsDelivr @counts, no load on the site):
     property type · "From RM 270,000" (the page's Price From; * + the LPHS line when conv marks it as the affordable layout's)
     rows: Built-up · Bedrooms · Tenure · Location
     "150+ units still open" · [Choose your unit] (red, the units, new tab) · [Explore floor plans]
     "Free e-Enquiry · no payment, no booking, no obligation"
     e-ENQUIRY EXCLUSIVE ribbon + the page's own two incentive choices + Terms apply · Developer <logo, name>
   With the column on: the facts strip under the title and Project Details' incentives card hide (the column carries both; Project
   Details takes the full width, 3 columns on laptops); on laptops the title row's red button hides too; on phones the column sits
   under the photos, its text starting where the title starts. Fail-safe: anything missing or any error -> no column, the page as
   before. EN / BM / 中文: our words are ours; the page's own words (type, place, built-up, reward, developer) are read after the
   site translates them. */
(function () {
  var W = window, D = document, H = D.documentElement;
  if (!/^\/project\/[^\/]+\/?$/.test(location.pathname) || W.__NPE__) return; W.__NPE__ = 1;
  var SRC = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@counts/eenquiry-counts.json', KEY = 'npcc_v1', MAXAGE = 48 * 36e5;
  var AFFORD = { 'rosedale-by-ancubic': ['A/M'] };   // = conv's: affordable layouts with buyer conditions
  var T = {
    open: ['{n} units still open', '{n} unit masih dibuka', '{n} 个单位仍开放'], few: ['Few units left', 'Unit terhad', '单位所剩无几'], live: ['Open for e-Enquiry', 'Dibuka untuk e-Enquiry', '开放 e-Enquiry'],
    fromS: ['From', 'Dari', '起'], loc: ['Location', 'Lokasi', '位置'],
    affS: ['*LPHS conditions apply', '*Tertakluk syarat LPHS', '*须符合 LPHS 条件'],
    cta: ['Choose your unit', 'Pilih unit anda', '挑选您的单位'], plans: ['Explore floor plans', 'Lihat pelan lantai', '查看平面图'],
    note: ['Free e-Enquiry · no payment, no booking, no obligation', 'e-Enquiry percuma · tiada bayaran, tempahan atau komitmen', 'e-Enquiry 免费 · 无需付款、预订或任何义务'],
    // rk = the homepage rewards ribbon (site dictionary wording)
    rk: ['e-\u2060ENQUIRY EXCLUSIVE', 'EKSKLUSIF e-\u2060ENQUIRY', 'e-\u2060ENQUIRY 独家'], or: ['OR', 'ATAU', '或'],
    spa: ['After SPA signing', 'Selepas SPA ditandatangani', '签署 SPA 后'], tnc: ['Terms apply', 'Tertakluk syarat', '须符合条款'],
    dev: ['Developer', 'Pemaju', '发展商']
  };
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function t(k, v) { var s = T[k][L()]; if (v) s = s.replace(/\{(\w)\}/g, function (m, x) { return v[x]; }); return s; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function tidy(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function rm(n) { return 'RM ' + Number(n).toLocaleString('en-MY'); }
  function day() { return new Date(Date.now() + 8 * 36e5).toISOString().slice(0, 10); }
  function ga(target) { try { if (typeof W.gtag === 'function') W.gtag('event', 'ebox_click', { target: target }); } catch (e) {} }
  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  // the daily file (shared cache with the New Launches cards), strictly checked
  function okStr(v, max) { return typeof v === 'string' && v.length && v.length <= max && !/[<>"]/.test(v); }
  function valid(d, slug) {
    if (!d || typeof d.t !== 'string' || !d.counts || typeof d.counts !== 'object') return null;
    var tm = Date.parse(d.t); if (!(tm > 0) || Date.now() - tm > MAXAGE || tm - Date.now() > 36e5) return null;
    var n = d.counts[slug]; if (!Number.isInteger(n) || n < 0 || n > 5000) return null;
    var out = { n: n, low: null, lays: [], prices: {} }, x = d.detail && d.detail[slug];
    if (x && typeof x === 'object') {
      var lo = x.low;
      if (lo && typeof lo === 'object' && ['b', 'l', 'no', 'type'].every(function (k) { return okStr(lo[k], 60); }) && Number.isFinite(lo.price) && lo.price > 0 && lo.price < 1e9) out.low = lo;
      if (x.layouts && typeof x.layouts === 'object') out.lays = Object.keys(x.layouts).filter(function (k) { var c = x.layouts[k]; return okStr(k, 40) && Number.isInteger(c) && c > 0 && c <= 5000; })
        .map(function (k) { return [k, x.layouts[k]]; }).sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0], undefined, { numeric: true }); }).slice(0, 4);
      if (x.prices && typeof x.prices === 'object') Object.keys(x.prices).forEach(function (k) { var p = x.prices[k]; if (okStr(k, 40) && Number.isFinite(p) && p > 0 && p < 1e9) out.prices[k] = p; });
    }
    return out;
  }
  function daily(slug) {
    try { var s = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (s && s.day === day() && s.d && s.d.detail) { var v = valid(s.d, slug); if (v) return Promise.resolve(v); } } catch (e) {}
    if (!W.fetch) return Promise.resolve(null);
    var ctl = W.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
    return fetch(SRC + '?d=' + day(), { credentials: 'omit', signal: ctl ? ctl.signal : undefined }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { clearTimeout(to); var v = valid(d, slug); if (v) { try { sessionStorage.setItem(KEY, JSON.stringify({ day: day(), d: d })); } catch (e) {} } return v; })
      .catch(function () { clearTimeout(to); return null; });
  }
  function live(path) { try { var c = JSON.parse(localStorage.getItem('npc_units:' + path) || 'null'); return c && Date.now() - c.t < 6e5 && c.n > 0 ? c : null; } catch (e) { return null; } }
  function roundLive(n) { var st = n < 20 ? 1 : n < 100 ? 10 : n < 1000 ? 50 : 100; return (Math.floor(n / st) * st).toLocaleString('en-MY') + (st > 1 ? '+' : ''); }   // = the listing tag
  function roundDaily(n) { var m = Math.floor(n * 0.9); if (m < 20) return null; var st = m < 100 ? 10 : m < 1000 ? 50 : 100; return (Math.floor(m / st) * st).toLocaleString('en-MY') + '+'; }   // = the cards

  // the page's own words, read after the site's language switch has run (Project Details rows: by data-np-k or EN / BM / 中文 label)
  function pdRow(re) {
    var rows = D.querySelectorAll('#project-details .project-detail-item');
    for (var i = 0; i < rows.length; i++) { var lb = rows[i].querySelector('.project-detail-label'), v = rows[i].querySelector('.project-detail-value'); if (!lb || !v) continue;
      var k = tidy(lb.getAttribute('data-np-k') || lb.textContent); if (re.test(k) || re.test(tidy(lb.textContent))) return [tidy(lb.textContent), tidy(v.textContent)]; }
    return null;
  }
  function page() {
    var loc = D.querySelector('.hero-loc'), span = loc && loc.querySelector('span');
    var type = loc ? tidy(loc.textContent.replace(span ? span.textContent : '', '')).replace(/^[\s··]+/, '') : '';
    var sp = [].slice.call(D.querySelectorAll('#selling-points .sp-card .sp-title')).slice(0, 2).map(function (e) { return tidy(e.textContent); }).filter(Boolean);
    var logo = D.querySelector('#developer .dev-logo'), name = D.querySelector('#developer .dev-name'), src = logo && logo.getAttribute('src');
    if (src && !/^https:\/\/www\.inewproject\.com\/images\//.test(src)) src = '';
    return { type: type, place: span ? tidy(span.textContent) : '', sp: sp,
      built: pdRow(/^(built-?up|keluasan binaan|建筑面积)$/i), beds: pdRow(/^(bedrooms?(\s*\/\s*bathrooms?)?|bilik tidur(\s*\/\s*bilik air)?|卧室(\s*\/\s*浴室)?)$/i),
      tenure: pdRow(/^(tenure|pegangan|地契)$/i), dev: name ? tidy(name.textContent) : '', devLogo: src };
  }

  function start() {
    var slug = location.pathname.split('/')[2], grid = D.querySelector('.gallery-grid'), main = D.querySelector('.gallery-main'), stripW = D.querySelector('.npg-stripw');
    var link = D.querySelector('a[href*="/project/' + slug + '/e-enquiry"]');
    if (!grid || !main || !stripW || !link || D.querySelector('.npe')) return;   // e-Enquiry listings with the photo section only
    var enq; try { enq = new URL(link.getAttribute('href'), location.href); } catch (e) { return; }
    if (enq.origin !== location.origin || enq.pathname.replace(/\/?$/, '/') !== '/project/' + slug + '/e-enquiry/') return;
    var path = enq.pathname.replace(/\/?$/, '/');
    var rew = D.querySelector('#e-enquiry .ebooking-reward'), go = D.querySelector('.npg-go');

    var css = D.createElement('style'); css.id = 'npe-css';
    css.textContent = [
      '.npe{--k:1;box-sizing:border-box;display:flex;flex-direction:column;padding:0;border:0;border-radius:0;background:none;box-shadow:none;color:#1d1d1f;font-family:"DM Sans",Arial,sans-serif;-webkit-font-smoothing:antialiased;min-width:0}',   // DM Sans = the listing's body + Project Details font
      '@media (min-width:1080px){.npe{--k:1.111111}}',
      '.npe *{box-sizing:border-box}.npe a{text-decoration:none!important}',
      '.npe svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
      '.npe .npe-type{margin:0;font-family:inherit;font-weight:700;font-size:calc(26px*var(--k))!important;line-height:1.2!important;letter-spacing:-.01em;color:#1d1d1f}',   // set on purpose: the site's h2 size must not decide it
      '.npe-left{display:flex;align-items:center;gap:8px;margin-top:calc(20px*var(--k));font-weight:700;font-size:calc(14px*var(--k));color:#167145}',
      '.npe-left i{width:8px;height:8px;border-radius:50%;background:#1E9E5A;box-shadow:0 0 0 3px rgba(30,158,90,.16)}',
      '.npe-price{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px;margin-top:calc(8px*var(--k));color:#1d1d1f}.npe-price>span{font-size:calc(15px*var(--k));font-weight:600;color:#5F6661}',
      '.npe-price b{font-weight:800;font-size:calc(34px*var(--k));letter-spacing:-.02em;line-height:1.1}.npe-price b small{font-size:.55em;font-weight:700;margin-right:4px}.npe-price .npe-ast{font-style:normal;font-size:.6em;font-weight:700;line-height:1;vertical-align:top;margin-left:2px;color:#8A5A12}',
      '.npe-aff{margin-top:6px;font-size:calc(14px*var(--k));line-height:1.4;color:#8A5A12}',
      '.npe-facts{margin-top:calc(20px*var(--k));border-top:1px solid #ECE7E0}',
      '.npe-facts>div{display:flex;align-items:baseline;justify-content:space-between;gap:calc(16px*var(--k));padding:calc(12px*var(--k)) 0;border-bottom:1px solid #ECE7E0}',
      '.npe-facts span{flex:none;font-size:calc(14px*var(--k));color:#6B706C}.npe-facts b{min-width:0;text-align:right;font-size:calc(15px*var(--k));font-weight:700;line-height:1.35;color:#1d1d1f;word-break:keep-all;overflow-wrap:break-word}',
      '.npe-cta{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:calc(12px*var(--k));min-height:calc(50px*var(--k));padding:0 calc(20px*var(--k));border-radius:10px;background:#D0021B;color:#fff!important;font-weight:700;font-size:calc(16px*var(--k));transition:background .15s ease}',
      '.npe-cta:hover{background:#A80016}',
      '.npe-plans{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:calc(10px*var(--k));min-height:calc(44px*var(--k));border:1px solid #D9D4CC;border-radius:10px;background:#fff;color:#1d1d1f;font-family:inherit;font-weight:700;font-size:calc(15px*var(--k));cursor:pointer;width:100%;transition:border-color .15s ease}',
      '.npe-plans:hover{border-color:#1d1d1f}',
      '.npe-note{margin:calc(12px*var(--k)) 0 0;line-height:1.45;text-wrap:balance;text-align:center;font-size:calc(14px*var(--k));color:#6B706C}',
      // e-Enquiry incentives: the site's own two-choice card look (one champagne gold), choices side by side with OR between
      '.npe-inc{margin-top:calc(20px*var(--k));border:1px solid #E9D9A8;border-radius:14px;background:linear-gradient(180deg,#FBF3DF 0%,#FFFDF8 100%);overflow:hidden}',
      '.npe-inc-h{display:flex;justify-content:flex-end;padding-top:calc(14px*var(--k))}',   // the ribbon on the right, flush with the card's edge (like the homepage)
      // the homepage rewards ribbon: red, notched ends
      '.npe-ribbon{display:inline-block;background:linear-gradient(180deg,#E8152F,#B5001A);color:#fff;font-family:Inter,Arial,sans-serif;font-weight:900;font-size:calc(12px*var(--k));letter-spacing:.1em;line-height:1;padding:calc(7px*var(--k)) calc(16px*var(--k)) calc(7px*var(--k)) calc(22px*var(--k));white-space:nowrap;clip-path:polygon(0 0,100% 0,100% 100%,0 100%,calc(10px*var(--k)) 50%)}',
      '.npe .npe-inc-f button{padding:0;border:0;background:none;font-family:inherit;font-size:inherit;font-weight:600;line-height:inherit;letter-spacing:0;text-transform:none;color:#765A16;text-decoration:underline;text-underline-offset:2px;cursor:pointer;white-space:nowrap;display:block;margin:calc(4px*var(--k)) auto 0}',
      '.npe-inc-o{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:stretch;gap:8px;padding:calc(12px*var(--k)) calc(14px*var(--k))}',
      '.npe-inc-c{display:flex;flex-direction:column;align-items:center;text-align:center;min-width:0}',
      '.npe-inc-c img{display:block;width:100%;max-width:calc(150px*var(--k));height:calc(84px*var(--k));object-fit:contain;background:none;border:0;border-radius:0;box-shadow:none}',   // the reward pictures are cut-outs: straight on the gold
      '.npe-inc-c b{display:block;margin-top:8px;font-size:calc(14px*var(--k));font-weight:700;line-height:1.3;text-wrap:balance;color:#2B2005}',
      '.npe-inc-c span{display:block;margin-top:auto;padding-top:3px;font-size:calc(14px*var(--k));font-weight:700;color:#8A6A1E}',
      '.npe-inc-or{align-self:start;margin-top:calc(27px*var(--k));display:grid;place-items:center;min-width:calc(30px*var(--k));height:calc(30px*var(--k));padding:0 calc(7px*var(--k));border-radius:999px;background:#C9A24A;color:#fff;font-size:calc(12px*var(--k));font-weight:800}',
      '.npe-inc-f{padding:calc(10px*var(--k)) calc(14px*var(--k));border-top:1px solid #EFE3BF;font-size:calc(14px*var(--k));line-height:1.45;text-wrap:balance;text-align:center;color:#765A16}',
      // developer: one key-value row like the facts (label left; logo + name right), the whole row opens the Developer section
      '.npe-dev{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:calc(20px*var(--k));padding:calc(12px*var(--k)) 0;border:0;border-top:1px solid #ECE7E0;border-bottom:1px solid #ECE7E0;background:none;color:#1d1d1f!important;font-family:inherit;text-align:left;width:100%;cursor:pointer}',
      '.npe-dev>span{flex:none;font-size:calc(14px*var(--k));color:#6B706C}',
      '.npe-dev>div{display:flex;align-items:center;justify-content:flex-end;gap:10px;min-width:0}',
      '.npe-dev img{flex:none;width:calc(32px*var(--k));height:calc(32px*var(--k));object-fit:contain;border-radius:6px}',
      '.npe-dev b{min-width:0;font-size:calc(15px*var(--k));font-weight:700;line-height:1.3;text-align:right;overflow-wrap:anywhere}',
      '.npe-dev i{flex:none;font-style:normal;font-size:calc(20px*var(--k));line-height:1;color:#9A9F9B}',
      '.npe-dev:hover b{color:#C0001A}',
      'html.npe-on .gallery-grid{height:auto!important;max-height:none!important}html.npe-on .key-facts{display:none!important}',   // the box carries the facts
      'html.npe-on .project-details-showcase>.quick-ebooking-card{display:none!important}html.npe-on .project-details-showcase{grid-template-columns:minmax(0,1fr)!important}',   // its incentives card would repeat the box: Project Details takes the full width
      '@media (min-width:992px){html.npe-on .project-details-showcase .project-details-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}',
      ' html.npe-on .project-details-grid>:nth-child(3n+1):nth-last-child(-n+3),html.npe-on .project-details-grid>:nth-child(3n+1):nth-last-child(-n+3)~*{border-bottom-color:transparent!important}}',   // no line under the last row of 3
      // laptops: photo + strip left, the box right (the site's columns: the photo keeps its size); the facts strip and the red title button hide
      '@media (min-width:992px){html.npe-on .gallery-grid{grid-template-columns:minmax(0,7fr) minmax(0,3fr)!important;grid-template-rows:auto auto 1fr;row-gap:12px;column-gap:40px!important;align-items:start}',   // 70 / 30: the photo bigger, the box an overview (the photo keeps its shape)
      ' html.npe-on .gallery-grid>.gallery-main{grid-column:1;grid-row:1}html.npe-on .gallery-grid>.npg-stripw{grid-column:1;grid-row:2}html.npe-on .gallery-grid>.npg-go{grid-column:1;grid-row:3;justify-self:start;margin:0}',
      ' html.npe-on .gallery-grid>.npe{grid-column:2;grid-row:1/span 3}html.npe-on .gallery-grid>*{min-width:0}',
      ' html.npe-on .hero-btn.primary{display:none!important}}',
      '@media (min-width:1080px){html.npe-on .gallery-grid{column-gap:53px!important}}',   // 48 px on screen at the site's 0.9 zoom
      '@media (max-width:991.98px){html.npe-on .gallery-grid{grid-template-columns:minmax(0,1fr)!important}html.npe-on .gallery-grid>*{min-width:0;max-width:100%}html.npe-on .gallery-grid>.npe{margin-top:24px}}'   // one column that cannot be pushed wider by the strip (Chrome sizes a 1fr column by its widest child)
    ].join('\n');
    D.head.appendChild(css);

    var box = D.createElement('aside'); box.className = 'npe'; box.setAttribute('data-np-skip', ''); box.setAttribute('aria-label', 'e-Enquiry');
    grid.appendChild(stripW); if (go) grid.appendChild(go); grid.appendChild(box);
    H.classList.add('npe-on');
    // the photo + box line up with the title row's edges (the site runs the photo section wider than its title column);
    // two columns (992 px and up): the section takes the title row's width; stacked: the box's text starts where the title starts
    var wrap = D.querySelector('.gallery-wrap'), top = D.querySelector('.hero-top'), wide = W.matchMedia ? W.matchMedia('(min-width:992px)') : null;
    function align() { if (!wrap || !top || !wide) return; var on = wide.matches && top.offsetWidth > 0 && H.classList.contains('npe-on');
      wrap.style.maxWidth = on ? top.offsetWidth + 'px' : ''; wrap.style.marginLeft = wrap.style.marginRight = on ? 'auto' : '';
      var d = !on && H.classList.contains('npe-on') ? Math.round(top.getBoundingClientRect().left - wrap.getBoundingClientRect().left) : 0; box.style.paddingLeft = box.style.paddingRight = d > 0 && d <= 40 ? d + 'px' : ''; }
    align(); W.addEventListener('resize', align); if (W.ResizeObserver && top) new W.ResizeObserver(align).observe(top);

    var dd = null;
    function rewardHtml() {
      var opts = [].slice.call(D.querySelectorAll('.qc-opt')).slice(0, 2).map(function (o) {   // the page's own incentive card (both choices)
        var img = o.querySelector('img'), src = img && img.getAttribute('src');
        if (src && !/^https:\/\/www\.inewproject\.com\/images\//.test(src)) src = '';
        return { src: src, title: tidy((o.querySelector('.qc-opt-title') || {}).textContent), value: tidy((o.querySelector('.qc-opt-value') || {}).textContent) };
      }).filter(function (o) { return o.title && /RM\s?[\d,]+/.test(o.value); });
      var choose = tidy((D.querySelector('.qc-choose') || {}).textContent);
      if (!opts.length && rew) {   // no two-choice card on this page: the e-Enquiry section's reward
        var img = rew.querySelector('img'), ti = tidy((rew.querySelector('.ebooking-reward-title') || {}).textContent), val = tidy((rew.querySelector('.ebooking-reward-value') || {}).textContent), src = img && img.getAttribute('src');
        if (src && !/^https:\/\/www\.inewproject\.com\/images\//.test(src)) src = '';
        if (ti && /RM\s?[\d,]+/.test(val)) opts = [{ src: src, title: ti, value: val }];
      }
      if (!opts.length) return '';
      var tile = function (o) { return '<div class="npe-inc-c">' + (o.src ? '<img src="' + esc(o.src) + '" alt="">' : '') + '<b>' + esc(o.title) + '</b><span>' + esc(o.value) + '</span></div>'; };
      return '<div class="npe-inc"><div class="npe-inc-h"><span class="npe-ribbon">' + esc(t('rk')) + '</span></div>' +
        (opts.length === 2 ? '<div class="npe-inc-o">' + tile(opts[0]) + '<span class="npe-inc-or">' + esc(t('or')) + '</span>' + tile(opts[1]) + '</div>'
          : '<div class="npe-inc-o" style="grid-template-columns:1fr">' + tile(opts[0]) + '</div>') +
        '<div class="npe-inc-f">' + esc((choose || t('spa')).replace(/[.。]\s*$/, '')) + '<button type="button" data-g="reward">' + esc(t('tnc')) + '</button></div></div>';
    }
    function paint() {
      var pg = page(), lv = live(path), n = lv ? roundLive(lv.n) : dd ? roundDaily(dd.n) : null;
      var left = lv || (dd && dd.n > 0) ? (n ? t('open', { n: n }) : t('few')) : t('live');
      // the price as the site states it ("Price From"), * when conv marks it as the affordable layout's price
      var kv = D.querySelector('.key-facts .kf-item .kf-value'), kp = kv && /RM\s?([\d,]+)/.exec(kv.textContent), aff = !!D.querySelector('.key-facts .npc-aff-kf');
      var price = kp ? '<div class="npe-price">' + (L() === 2 ? '' : '<span>' + esc(t('fromS')) + '</span>') + '<b><small>RM</small>' + esc(kp[1]) + (aff ? '<i class="npe-ast">*</i>' : '') + '</b>' + (L() === 2 ? '<span>' + esc(t('fromS')) + '</span>' : '') + '</div>' +
        (aff ? '<div class="npe-aff">' + esc(t('affS')) + '</div>' : '') : '';
      var facts = [pg.built, pg.beds, pg.tenure].filter(Boolean).map(function (f) { return [f[0].split('/')[0].trim(), f[1].split('/')[0].trim()]; });
      if (pg.place) facts.push([t('loc'), pg.place]);
      box.innerHTML =
        (pg.type ? '<h2 class="npe-type">' + esc(pg.type) + '</h2>' : '') + price +
        (facts.length ? '<div class="npe-facts">' + facts.map(function (f) { return '<div><span>' + esc(f[0]) + '</span><b>' + esc(f[1]) + '</b></div>'; }).join('') + '</div>' : '') +
        '<div class="npe-left"><i></i>' + esc(left) + '</div>' +
        '<a class="npe-cta" data-g="cta" target="_blank" rel="noopener" href="' + esc(path + '#units') + '">' + esc(t('cta')) + ARROW + '</a>' +
        (D.getElementById('floor-plan') ? '<button type="button" class="npe-plans" data-g="plans">' + esc(t('plans')) + '</button>' : '') +
        '<p class="npe-note">' + esc(t('note')) + '</p>' +
        rewardHtml() +
        (pg.dev ? '<button type="button" class="npe-dev" data-g="developer"><span>' + esc(t('dev')) + '</span><div>' + (pg.devLogo ? '<img src="' + esc(pg.devLogo) + '" alt="">' : '') + '<b>' + esc(pg.dev) + '</b><i aria-hidden="true">\u203a</i></div></button>' : '');
    }
    function jump(id) { try { if (typeof W.scrollToSection === 'function') W.scrollToSection(id); else { var e = D.getElementById(id); if (e) e.scrollIntoView({ behavior: 'smooth' }); } } catch (e) {} }
    box.addEventListener('click', function (e) {
      var a = e.target.closest('[data-g]'); if (!a) return; var g = a.getAttribute('data-g'); ga(g);
      if (g === 'plans') jump('floor-plan');
      else if (g === 'developer') jump('developer');
      else if (g === 'reward') { var m = D.getElementById('ebooking-tnc-modal'); if (m) m.style.display = 'flex'; else jump('e-enquiry'); }
    });
    paint();
    daily(slug).then(function (v) { dd = v; paint(); });
    var had = !!live(path);
    function check() { var now = !!live(path); if (now !== had) { had = now; paint(); } }
    try { var sec = D.getElementById('e-enquiry'); if (sec) new MutationObserver(check).observe(sec, { childList: true, subtree: true, characterData: true }); } catch (e) {}
    // conv marks the affordable price on the facts strip a moment after load: repaint when the strip changes
    try { var kf = D.querySelector('.key-facts'), kq = 0; if (kf) new MutationObserver(function () { if (!kq) kq = setTimeout(function () { kq = 0; paint(); }, 200); }).observe(kf, { childList: true, subtree: true }); } catch (e) {}
    var ticks = 0, iv = setInterval(function () { check(); if (++ticks > 100) clearInterval(iv); }, 3000);
    addEventListener('storage', function (e) { if (e.key === 'npc_units:' + path) paint(); });
    new MutationObserver(function () { setTimeout(paint, 400); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  function safe() { try { start(); } catch (e) { try { H.classList.remove('npe-on'); var gw = D.querySelector('.gallery-wrap'); if (gw) gw.style.maxWidth = gw.style.marginLeft = gw.style.marginRight = ''; var b = D.querySelector('.npe'); if (b) b.remove(); var c = D.getElementById('npe-css'); if (c) c.remove(); } catch (e2) {} } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safe); else safe();
})();
