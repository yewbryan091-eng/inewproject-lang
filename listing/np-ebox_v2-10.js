/* iNewProject . listing e-Enquiry box v2-10 (27 Nov 2026) = v2-9 + the reward strip on the red button, owner's pick 3 (27 Nov):
   a small gold "REWARD" label and the value in bold black ("REWARD RM 9,499"; two different values -> "REWARD up to RM <highest>"),
   on the gold reward card's champagne colours; the line naming the two choices goes (the gold card below shows them); "Terms apply"
   in black. One line; when it cannot fit (smallest phones, BM), "Terms apply" moves under it, nothing is cut.
   v2-9 (26 Nov 2026) = v2-8 + the spec strip never animates: the site gives every element a
   0.3 s transition, and fitSpec() re-measured mid-animation, so on some widths the strip flipped between 1 row and 2 x 2.
   v2-8 (26 Nov 2026) = v2-7 + the facts a buyer scans first move to the top (owner's pick B, 26 Nov):
   under the property type a red pin + the location (the site's own area line); under the price one spec strip, the bold value over a
   small label: size (sq ft) | bedrooms | tenure | the year (ready / completed); on phones under 360 px the strip is 2 x 2. Those
   four rows leave the list below, so only Developer stays there. Same data, same rules (completion row rules = v2-5).
   v2-7 (26 Nov 2026) = v2-6 + when the daily count says 0 of the project's units are open, the
   line says so: "No units open right now" (BM / 中文, grey dot) instead of "Open for e-Enquiry" (owner 26 Nov). An unknown count
   keeps "Open for e-Enquiry". Nothing else changes.
   v2-6 (24 Nov 2026) = v2-5 with (owner 24 Nov):
   - the HOT / LIMITED tag back on the red button's top-right corner (the 22 Nov rule; v2-5 put it on the strip + button block);
   - the gold reward card back, as box 112 had it (under the "Free e-Enquiry" line, above the facts), on every listing with a
     reward; v2-5 had dropped it. The reward strip on the button stays. Nothing else changes.
   v2-5 (23 Nov 2026) = v2-4 with the owner's final column:
   - under the price, the size the page states: "431–975 sq ft built-up" (Project Details' Built-up: one number or a range;
     anything else -> no line);
   - the reward strip joined on top of the red button: "Reward worth RM 9,499" / "iPhone Duo or Touch 'n Go eWallet credit"
     / "Terms apply" (the page's own two choices; different amounts -> "e-Enquiry reward"); the gold card further down goes;
   - the button says "View available units"; the HOT / LIMITED tag sits on the top-right corner of the strip + button block;
   - the facts list: "Expected completion 2030" (Completed: "Completed 2024") in place of Built-up (the size is on top); only a
     real year ("2030", "Q4 2030", "Dec 2030"); not TBC / N/A / "-", and not an expected year already past.
   Reward names: our short form when the page's English title has one ("Brand New iPhone Duo (256GB)" -> "iPhone Duo"),
   otherwise the page's own (translated) title. Everything else = v2-4 (status pill, green line, Explore floor plans,
   note, Bedrooms / Tenure / Location / Developer, rules). */
/* iNewProject . listing e-Enquiry box v2-4 (22 Nov 2026) = v2-3 with the status pill WITHOUT the year (owner's call):
   "Under Construction" / "Completed" / "Pre Launch" only (BM Dalam Pembinaan / Siap / Pra-Pelancaran, 中文 建筑中 / 已完工 / 预推介).
   The year stays in Project Details. Everything else as v2-3.
   v2-3 (22 Nov 2026) = v2-2 + two facts at a glance, both read, never invented:
   1. Project status pill above the property type, from Project Details' own "Status" (+ "Completion year"):
      "Under Construction . Completion 2029" (amber), "Completed 2024" (green), "Pre Launch" (maroon). A year only when it is
      4 digits (TBC / TBA -> none), and for Under Construction only when not yet past. Unknown or missing status -> no pill.
   2. Fire tag on the red "Choose your unit" button, from the developer's unit chart (live count if the e-Enquiry page was read
      in the last 10 min, else the daily file; total from the daily file):
      HOT     = 60%+ of the chart's units are no longer open (and 1+ open), the project is NOT Completed (leftover stock of a
                finished project is not "selling well"), and the chart covers the whole project (its unit count = Project Details'
                "Total units" when the page gives one; a Phase-1-only chart cannot make the project HOT).
                Line: "e-Enquiry available . only 12 of 46 left".
      LIMITED = not HOT and 1 to 20 units open. Line: "e-Enquiry available . only 4 units left".
      Otherwise no tag and the line as v2-2. The tag carries one word only, the line carries the number (no repeat).
      "Not open" in the chart can be booked, reserved or held, so no tag or line ever says "sold".
   The green line and the pill break only at their dot on narrow screens; the gap above the button no longer changes when the tag
   arrives; stacked layouts 576-991 px (upright iPads) start the column's text where the title starts (v2-2 did it only up to 40 px).
   v2-2 (21 Nov 2026) = v2-1 + phones and upright tablets (stacked layout): the site's Video /
   Virtual Tour / E-Brochure row sits right under the photos, before the column (v2-1: after it).
   v2-1 = v2 with, from 992 px: the column 40 px lower than the photo, the site's
   Video / Virtual Tour / E-Brochure row under the photo strip from the photo's left edge (v2 left it at the page edge under the
   whole section); everywhere: "e-Enquiry available . 450+ units open". Order (Epic: the buy block first, the details after):
   type, price, e-Enquiry line, Choose your unit, floor plans, note, incentives, then one list: Built-up, Bedrooms, Tenure, Location,
   Developer. Widths, phones: as v2.
   v2: Loaded from the admin Header Scripts box; listing pages of e-Enquiry projects.
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
    open: ['e-Enquiry available \u00b7 {n} units open', 'e-Enquiry tersedia \u00b7 {n} unit dibuka', '开放 e-Enquiry \u00b7 {n} 个单位可选'], few: ['e-Enquiry available \u00b7 few units left', 'e-Enquiry tersedia \u00b7 unit terhad', '开放 e-Enquiry \u00b7 单位所剩无几'], live: ['Open for e-Enquiry', 'Dibuka untuk e-Enquiry', '开放 e-Enquiry'], none: ['No units open right now', 'Tiada unit dibuka buat masa ini', '目前没有开放单位'],
    fromS: ['From', 'Dari', '起'], loc: ['Location', 'Lokasi', '位置'],
    affS: ['*LPHS conditions apply', '*Tertakluk syarat LPHS', '*须符合 LPHS 条件'],
    cta: ['View available units', 'Lihat unit tersedia', '查看可选单位'],
    plans: ['Explore floor plans', 'Lihat pelan lantai', '查看平面图'],
    note: ['Free e-Enquiry · no payment, no booking, no obligation', 'e-Enquiry percuma · tiada bayaran, tempahan atau komitmen', 'e-Enquiry 免费 · 无需付款、预订或任何义务'],
    // rk = the homepage rewards ribbon (site dictionary wording)
    rk: ['e-\u2060ENQUIRY EXCLUSIVE', 'EKSKLUSIF e-\u2060ENQUIRY', 'e-\u2060ENQUIRY 独家'], or: ['OR', 'ATAU', '或'],
    spa: ['After SPA signing', 'Selepas SPA ditandatangani', '签署 SPA 后'], tnc: ['Terms apply', 'Tertakluk syarat', '须符合条款'],
    dev: ['Developer', 'Pemaju', '发展商'],
    // v2-5: the size under the price, the reward strip, the completion row (dictionary wording where the site has it)
    bu: ['<b>{v} sq ft</b> built-up', '<b>{v} kaki persegi</b> keluasan binaan', '建筑面积 <b>{v} 平方尺</b>'],
    // v2-8: the spec strip's small labels (under each value)
    uSq: ['sq ft', 'kaki persegi', '平方尺'], uBed: ['bedrooms', 'bilik tidur', '卧室'], uTen: ['tenure', 'pegangan', '地契'],
    uReady: ['ready', 'jangkaan siap', '预计竣工'], uDone: ['completed', 'siap', '已完工'],
    rwW: ['Reward worth <b>{v}</b>', 'Ganjaran bernilai <b>{v}</b>', '奖励价值 <b>{v}</b>'], rwN: ['e-Enquiry reward', 'Ganjaran e-Enquiry', 'e-Enquiry 奖励'],
    rwL: ['REWARD', 'GANJARAN', '奖励'], rwU: ['up to', 'sehingga', '最高'],   // v2-10: the strip's label + the different-values word
    orw: [' or ', ' atau ', ' 或 '], ewc: ['{p} eWallet credit', 'Kredit {p} eWallet', '{p} 电子钱包额度'],
    expC: ['Expected completion', 'Jangkaan siap', '预计竣工'], doneC: ['Completed', 'Siap', '已完工'],
    // v2-3: the fire tag (one word) + the line that states the fact behind it
    hot: ['HOT', 'LARIS', '热卖'], lim: ['LIMITED', 'TERHAD', '数量有限'],
    hotL: ['e-Enquiry available \u00b7 only {a} of {b} left', 'e-Enquiry tersedia \u00b7 tinggal {a} daripada {b}', '开放 e-Enquiry \u00b7 仅剩 {a} 个（共 {b} 个）'],
    limL: ['e-Enquiry available \u00b7 only {a} units left', 'e-Enquiry tersedia \u00b7 tinggal {a} unit', '开放 e-Enquiry \u00b7 仅剩 {a} 个单位'],
    lim1: ['e-Enquiry available \u00b7 only 1 unit left', 'e-Enquiry tersedia \u00b7 tinggal 1 unit', '开放 e-Enquiry \u00b7 仅剩 1 个单位'],
    // v2-3: the status pill (the site's own BM / 中文 words for the status)
    stUC: ['Under Construction', 'Dalam Pembinaan', '建筑中'], stDone: ['Completed', 'Siap', '已完工'], stPre: ['Pre Launch', 'Pra-Pelancaran', '预推介']   // v2-4: no year
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
    var out = { n: n, total: 0, low: null, lays: [], prices: {} }, x = d.detail && d.detail[slug];
    if (x && typeof x === 'object') {
      if (Number.isInteger(x.total) && x.total >= n && x.total > 0 && x.total <= 5000) out.total = x.total;   // v2-3: all units in the chart
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
      tenure: pdRow(/^(tenure|pegangan|地契)$/i), dev: name ? tidy(name.textContent) : '', devLogo: src,
      comp: pdRow(/^(completion( year)?|expected completion|tahun siap|tarikh siap|jangkaan siap|竣工(年份)?|预计竣工)$/i) };   // v2-5
  }
  // v2-3: the status pill from Project Details (values in EN or after the site's BM / 中文 switch); unknown -> ''
  function stKind() { var s = pdRow(/^(status|状态)$/i), v = s ? s[1].toLowerCase() : '';
    return /^(under construction|dalam pembinaan|建筑中)$/.test(v) ? 'uc' : /^(completed|siap|已完工)$/.test(v) ? 'done' : /^(pre[ -]?launch|pra-pelancaran|预推介)$/.test(v) ? 'pre' : ''; }
  function status() {   // v2-4: the status word only, no year
    var k = stKind();
    if (!k) return '';
    var txt = k === 'uc' ? t('stUC') : k === 'done' ? t('stDone') : t('stPre');
    return '<span class="npe-st npe-st-' + k + '">' + lineHtml(txt) + '</span>';   // breaks only at the dot
  }
  // v2-5: "431 – 975 sq ft" -> "431–975"; "1,714 sq ft" -> "1,714"; "975 - 975" -> "975" (anything else -> no line)
  function size(built) {
    var U = '(?:\\s*(?:sq\\.?\\s*ft\\.?|sqft|sf|kaki persegi|平方尺))?';
    var m = built && new RegExp('^\\s*([\\d,]{2,7})' + U + '(?:\\s*[-\\u2013\\u2014]\\s*([\\d,]{2,7})' + U + ')?\\s*$', 'i').exec(built[1]);
    if (!m) return '';
    var a = +m[1].replace(/,/g, ''), b = m[2] ? +m[2].replace(/,/g, '') : 0;
    if (!(a >= 100) || (m[2] && !(b >= a))) return '';   // a home is never under 100 sq ft
    return num(a) + (b > a ? '\u2013' + num(b) : '');
  }
  // v2-5: the completion row only for a real year; an expected year already past -> no row
  function compRow(v) {
    var m = /^(?:(?:q[1-4]|[a-z]{3,9})\.?\s+)?((?:19|20)\d\d)$/i.exec(tidy(v)); if (!m) return null;
    var done = stKind() === 'done', y = +m[1], now = new Date(Date.now() + 8 * 36e5).getUTCFullYear();
    if (!done && y < now) return null;
    return [done ? t('doneC') : t('expC'), tidy(v)];
  }
  // v2-5: a reward's short name from its English title: "Brand New iPhone Duo (256GB)" -> "iPhone Duo"; "Touch 'n Go eWallet Credit" -> "Touch 'n Go eWallet credit"
  function rwName(en) {
    var x = tidy(en).replace(/^brand[\s-]+new\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '').trim(), w = /^(.*?)\s+e-?wallet\s+credits?$/i.exec(x);
    return w ? t('ewc', { p: w[1] }) : x;
  }
  // Project Details' own "Total units" (0 = not given)
  function pageTotal() { var r = pdRow(/^(total units|jumlah unit|总单位)$/i), m = r && /^\s*(\d[\d,]*)/.exec(r[1]); return m ? +m[1].replace(/,/g, '') : 0; }
  function num(n) { return Number(n).toLocaleString('en-MY'); }
  // v2-3: HOT / LIMITED from the open count (n, exact) and the chart's total (0 = unknown)
  function heat(n, total) {
    if (!(n >= 1)) return null;
    var all = pageTotal();
    if (stKind() !== 'done' && total >= n && (!all || all === total) && (total - n) / total >= 0.6) return { k: 'hot', line: t('hotL', { a: num(n), b: num(total) }) };
    if (n <= 20) return { k: 'lim', line: n === 1 ? t('lim1') : t('limL', { a: n }) };
    return null;
  }
  // the green line: breaks only at its dot
  function lineHtml(s) { return s.split(' \u00b7 ').map(function (x, i, A) { return '<span>' + esc(x + (i < A.length - 1 ? ' \u00b7' : '')) + '</span>'; }).join(' '); }

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
      '.npe-left{display:flex;align-items:flex-start;gap:8px;margin-top:calc(20px*var(--k));font-weight:700;font-size:calc(14px*var(--k));line-height:1.35;color:#167145}',
      '.npe-left i{flex:none;width:8px;height:8px;margin-top:calc((1.35em - 8px) / 2);border-radius:50%;background:#1E9E5A;box-shadow:0 0 0 3px rgba(30,158,90,.16)}',
      '.npe-left>span{min-width:0}.npe-left>span>span{display:inline-block}',   // v2-3: wraps only at the dot
      // v2-3: status pill (one per status, soft colours, dark text)
      '.npe-st{display:block;width:fit-content;max-width:100%;align-self:flex-start;margin:0 0 calc(10px*var(--k));padding:calc(7px*var(--k)) calc(11px*var(--k));border-radius:calc(16px*var(--k));text-align:left;font-weight:700;font-size:calc(14px*var(--k));line-height:1.15}.npe-st>span{display:inline-block}',   // 1 line = round ends; 2 lines (narrow) = rounded box, broken at the dot
      '.npe-st-uc{color:#7A4B00;background:#FFF1D6}.npe-st-done{color:#167145;background:#E3F3EA}.npe-st-pre{color:#6C1D45;background:#F5E8EE}',
      // v2-3: the fire tag on the button's top-right corner (black, one word)
      '.npe .npe-cta{position:relative;margin-top:calc(16px*var(--k))}',
      /* v2-5: the strip + button block; v2-6: the tag sits on the BUTTON's top-right corner (the button is its frame again) */
      '.npe-left.npe-none{color:#5F6661}.npe-left.npe-none i{background:#A8ADA9;box-shadow:none}',   // v2-7
      '.npe-buy{position:relative;margin-top:calc(16px*var(--k))}.npe .npe-buy .npe-cta{position:relative;margin-top:0}',
      '.npe-buy .npe-cta .npe-hot{top:calc(-11px*var(--k))}',
      '.npe-rw{display:flex;flex-wrap:wrap;align-items:center;gap:calc(6px*var(--k)) calc(12px*var(--k));padding:calc(12px*var(--k)) calc(16px*var(--k));border:1px solid #E9D9A8;border-bottom:0;border-radius:12px 12px 0 0;background:linear-gradient(#FBF3DF,#FFFDF8)}',
      '.npe-buy-rw .npe-cta{border-radius:0 0 10px 10px}',
      '.npe-rw-t{flex:1 1 auto;min-width:0}.npe-rw-t>span{display:block;white-space:nowrap;font-size:calc(16px*var(--k));line-height:1.35;color:#2A2A2A}.npe-rw-t b{font-size:calc(19px*var(--k));font-weight:800;color:#1d1d1f}',
      '.npe-rw-l{margin-right:calc(5px*var(--k));font-size:calc(12px*var(--k));font-weight:700;letter-spacing:.05em;color:#8A6A1E}html[data-np-lang=zh] .npe-rw-l{font-size:calc(13px*var(--k));letter-spacing:.02em}.npe-rw-u{margin-right:calc(4px*var(--k));font-size:calc(14px*var(--k));color:#5F6661}',
      '.npe .npe-rw-tc{flex:none;padding:0;border:0;background:none;font-family:inherit;font-size:calc(14px*var(--k));font-weight:500;line-height:1.4;color:#1d1d1f;text-decoration:underline;text-underline-offset:3px;cursor:pointer;white-space:nowrap}',
      '.npe-bu{margin-top:calc(6px*var(--k));font-size:calc(16px*var(--k));line-height:1.35;color:#5F6661}.npe-bu b{font-weight:700;color:#1d1d1f}',   // same gap with or without the tag: nothing moves when the tag arrives
      '.npe-cta .npe-hot{position:absolute;top:calc(-11px*var(--k));right:calc(14px*var(--k));display:flex;align-items:center;gap:4px;padding:calc(5px*var(--k)) calc(10px*var(--k));border-radius:999px;background:#111;color:#fff;font-size:calc(12px*var(--k));font-weight:800;letter-spacing:.06em;line-height:1;white-space:nowrap}',   // inside the link: a tap on the tag opens the units too
      '.npe-price{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px;margin-top:calc(8px*var(--k));color:#1d1d1f}.npe-price>span{font-size:calc(15px*var(--k));font-weight:600;color:#5F6661}',
      '.npe-price b{font-weight:800;font-size:calc(34px*var(--k));letter-spacing:-.02em;line-height:1.1}.npe-price b small{font-size:.55em;font-weight:700;margin-right:4px}.npe-price .npe-ast{font-style:normal;font-size:.6em;font-weight:700;line-height:1;vertical-align:top;margin-left:2px;color:#8A5A12}',
      '.npe-aff{margin-top:6px;font-size:calc(14px*var(--k));line-height:1.4;color:#8A5A12}',
      // v2-8: the location line (red pin) and the spec strip
      '.npe-loc{display:flex;align-items:flex-start;gap:calc(6px*var(--k));margin-top:calc(6px*var(--k));font-size:calc(16px*var(--k));font-weight:500;line-height:1.35;color:#2A2A2A}',
      '.npe-loc svg{flex:none;width:calc(17px*var(--k));height:calc(17px*var(--k));margin-top:1px;stroke:none!important}.npe-loc svg path{stroke:none!important}',
      '.npe-spec{display:flex;margin-top:calc(12px*var(--k));padding:calc(10px*var(--k)) 0;border-top:1px solid #ECE7E0;border-bottom:1px solid #ECE7E0}',
      '.npe-spec>div{flex:1 1 auto;min-width:0;padding:0 calc(10px*var(--k));border-left:1px solid #ECE7E0}.npe-spec>div:first-child{padding-left:0;border-left:0}.npe-spec>div:last-child{padding-right:0}',
      '.npe-spec,.npe-spec *{transition:none!important}',   // v2-9: no animation, so fitSpec() measures the final layout
      '.npe-spec b{display:block;font-size:calc(16px*var(--k));font-weight:700;line-height:1.25;color:#1d1d1f;white-space:nowrap}',
      '.npe-spec span{display:block;margin-top:2px;font-size:calc(13px*var(--k));line-height:1.3;color:#6B706C;white-space:nowrap}',
      '.npe-spec.npe-spec2{display:grid;grid-template-columns:1fr 1fr;row-gap:10px}.npe-spec.npe-spec2>div{padding:0 0 0 12px}.npe-spec.npe-spec2>div:nth-child(odd){padding-left:0;border-left:0}',   // set by fitSpec()
      '.npe-facts{margin-top:calc(24px*var(--k));border-top:1px solid #ECE7E0}.npe-facts+.npe-dev{margin-top:0;border-top:0}',   // v2-1: Developer = the list's last row
      '.npe-facts>div{display:flex;align-items:baseline;justify-content:space-between;gap:calc(16px*var(--k));padding:calc(12px*var(--k)) 0;border-bottom:1px solid #ECE7E0}',
      '.npe-facts span{flex:none;font-size:calc(14px*var(--k));color:#6B706C}.npe-facts b{min-width:0;text-align:right;font-size:calc(15px*var(--k));font-weight:700;line-height:1.35;color:#1d1d1f;word-break:keep-all;overflow-wrap:break-word}',
      '.npe-cta{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:calc(12px*var(--k));min-height:calc(50px*var(--k));padding:0 calc(20px*var(--k));border-radius:10px;background:#D0021B;color:#fff!important;font-weight:700;font-size:calc(16px*var(--k));transition:background .15s ease}',
      '.npe-cta:hover{background:#A80016}',
      '.npe-plans{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:calc(10px*var(--k));min-height:calc(44px*var(--k));border:1px solid #D9D4CC;border-radius:10px;background:#fff;color:#1d1d1f;font-family:inherit;font-weight:700;font-size:calc(15px*var(--k));cursor:pointer;width:100%;transition:border-color .15s ease}',
      '.npe-plans:hover{border-color:#1d1d1f}',
      '.npe-note span{display:inline-block}',
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
      '@media (min-width:992px){html.npe-on .gallery-grid{grid-template-columns:minmax(0,7fr) minmax(0,3fr)!important;grid-template-rows:auto auto auto auto 1fr;row-gap:12px;column-gap:40px!important;align-items:start}',   // 70 / 30: the photo bigger, the box an overview (the photo keeps its shape)
      ' html.npe-on .gallery-grid>.gallery-main{grid-column:1;grid-row:1}html.npe-on .gallery-grid>.npg-stripw{grid-column:1;grid-row:2}html.npe-on .gallery-grid>.npg-go{grid-column:1;grid-row:3;justify-self:start;margin:0}',
      ' html.npe-on .gallery-grid>.npe{grid-column:2;grid-row:1/span 5;margin-top:40px}html.npe-on .gallery-grid>.media-btns{grid-column:1;grid-row:4;justify-self:stretch;justify-content:flex-start;flex-wrap:wrap;margin:8px 0 0!important}html.npe-on .gallery-grid>*{min-width:0}',
      ' html.npe-on .hero-btn.primary{display:none!important}}',
      '@media (min-width:1080px){html.npe-on .gallery-grid{column-gap:53px!important}}',   // 48 px on screen at the site's 0.9 zoom
      '@media (max-width:991.98px){html.npe-on .gallery-grid{grid-template-columns:minmax(0,1fr)!important}html.npe-on .gallery-grid>*{min-width:0;max-width:100%}html.npe-on .gallery-grid>.npe{margin-top:24px}}'   // one column that cannot be pushed wider by the strip (Chrome sizes a 1fr column by its widest child)
    ].join('\n');
    D.head.appendChild(css);

    var box = D.createElement('aside'); box.className = 'npe'; box.setAttribute('data-np-skip', ''); box.setAttribute('aria-label', 'e-Enquiry');
    grid.appendChild(stripW); if (go) grid.appendChild(go);
    var mb = D.querySelector('.gallery-wrap~.media-btns,.gallery-wrap+.media-btns'); if (mb && mb.querySelector('.media-btn')) { W.__NPE_MB__ = [mb, mb.parentNode, mb.nextSibling]; grid.appendChild(mb); }   // v2-1: the media row joins the photo column; v2-2: before the box, so stacked it sits under the photos
    grid.appendChild(box);
    H.classList.add('npe-on');
    // the photo + box line up with the title row's edges (the site runs the photo section wider than its title column);
    // two columns (992 px and up): the section takes the title row's width; stacked: the box's text starts where the title starts
    var wrap = D.querySelector('.gallery-wrap'), top = D.querySelector('.hero-top'), wide = W.matchMedia ? W.matchMedia('(min-width:992px)') : null;
    function align() { if (!wrap || !top || !wide) return; var on = wide.matches && top.offsetWidth > 0 && H.classList.contains('npe-on');
      wrap.style.maxWidth = on ? top.offsetWidth + 'px' : ''; wrap.style.marginLeft = wrap.style.marginRight = on ? 'auto' : '';
      var d = !on && H.classList.contains('npe-on') ? Math.round(top.getBoundingClientRect().left - wrap.getBoundingClientRect().left) : 0; box.style.paddingLeft = box.style.paddingRight = d > 0 && d <= 200 ? d + 'px' : ''; }   // v2-3: 200 (was 40): upright iPads / large phones line up with the title too
    align(); W.addEventListener('resize', align); if (W.ResizeObserver && top) new W.ResizeObserver(align).observe(top);

    var dd = null;
    function rewardHtml(strip) {
      var opts = [].slice.call(D.querySelectorAll('.qc-opt')).slice(0, 2).map(function (o) {   // the page's own incentive card (both choices)
        var img = o.querySelector('img'), src = img && img.getAttribute('src');
        if (src && !/^https:\/\/www\.inewproject\.com\/images\//.test(src)) src = '';
        var te = o.querySelector('.qc-opt-title');
        return { src: src, title: tidy((te || {}).textContent), en: te ? tidy(te.getAttribute('data-np-k') || '') : '', value: tidy((o.querySelector('.qc-opt-value') || {}).textContent) };
      }).filter(function (o) { return o.title && /RM\s?[\d,]+/.test(o.value); });
      var choose = tidy((D.querySelector('.qc-choose') || {}).textContent);
      if (!opts.length && rew) {   // no two-choice card on this page: the e-Enquiry section's reward
        var img = rew.querySelector('img'), ti = tidy((rew.querySelector('.ebooking-reward-title') || {}).textContent), val = tidy((rew.querySelector('.ebooking-reward-value') || {}).textContent), src = img && img.getAttribute('src');
        if (src && !/^https:\/\/www\.inewproject\.com\/images\//.test(src)) src = '';
        var tn = rew.querySelector('.ebooking-reward-title');
        if (ti && /RM\s?[\d,]+/.test(val)) opts = [{ src: src, title: ti, en: tn ? tidy(tn.getAttribute('data-np-k') || '') : '', value: val }];
      }
      if (!opts.length) return '';
      if (strip) {   // v2-5: the strip on top of the button
        var vals = opts.map(function (o) { var m = /RM\s?([\d,]+)/.exec(o.value); return m ? m[1] : ''; }), same = vals[0] && vals.every(function (v) { return v === vals[0]; });
        var top = vals.reduce(function (a, v) { return +v.replace(/,/g, '') > +a.replace(/,/g, '') ? v : a; }, vals[0]);   // v2-10: different values -> the highest, "up to"
        return '<div class="npe-rw"><div class="npe-rw-t"><span><span class="npe-rw-l">' + esc(t('rwL')) + '</span>' + (same ? '' : '<span class="npe-rw-u">' + esc(t('rwU')) + '</span>') +
          '<b>RM\u00a0' + esc(top) + '</b></span></div>' +
          '<button type="button" class="npe-rw-tc" data-g="reward">' + esc(t('tnc')) + '</button></div>';
      }
      var tile = function (o) { return '<div class="npe-inc-c">' + (o.src ? '<img src="' + esc(o.src) + '" alt="">' : '') + '<b>' + esc(o.title) + '</b><span>' + esc(o.value) + '</span></div>'; };
      return '<div class="npe-inc"><div class="npe-inc-h"><span class="npe-ribbon">' + esc(t('rk')) + '</span></div>' +
        (opts.length === 2 ? '<div class="npe-inc-o">' + tile(opts[0]) + '<span class="npe-inc-or">' + esc(t('or')) + '</span>' + tile(opts[1]) + '</div>'
          : '<div class="npe-inc-o" style="grid-template-columns:1fr">' + tile(opts[0]) + '</div>') +
        '<div class="npe-inc-f">' + esc((choose || t('spa')).replace(/[.。]\s*$/, '')) + '<button type="button" data-g="reward">' + esc(t('tnc')) + '</button></div></div>';
    }
    function paint() {
      var pg = page(), lv = live(path), n = lv ? roundLive(lv.n) : dd ? roundDaily(dd.n) : null;
      var left = lv || (dd && dd.n > 0) ? (n ? t('open', { n: n }) : t('few')) : t('live');
      var ht = heat(lv ? lv.n : dd ? dd.n : 0, dd ? dd.total : 0); if (ht) left = ht.line;   // v2-3
      var none = !lv && dd && dd.n === 0 && dd.total > 0; if (none) left = t('none');   // v2-7: a known 0, not an unknown count
      // the price as the site states it ("Price From"), * when conv marks it as the affordable layout's price
      var kv = D.querySelector('.key-facts .kf-item .kf-value'), kp = kv && /RM\s?([\d,]+)/.exec(kv.textContent), aff = !!D.querySelector('.key-facts .npc-aff-kf');
      var price = kp ? '<div class="npe-price">' + (L() === 2 ? '' : '<span>' + esc(t('fromS')) + '</span>') + '<b><small>RM</small>' + esc(kp[1]) + (aff ? '<i class="npe-ast">*</i>' : '') + '</b>' + (L() === 2 ? '<span>' + esc(t('fromS')) + '</span>' : '') + '</div>' +
        (aff ? '<div class="npe-aff">' + esc(t('affS')) + '</div>' : '') : '';
      var comp = pg.comp ? compRow(pg.comp[1]) : null;   // v2-5 rules for the year
      var sz = size(pg.built), rw = rewardHtml(true), one = function (f) { return f ? f[1].split('/')[0].trim() : ''; };
      // v2-8: the spec strip (value over label); the location line under the type
      var cells = [[sz, t('uSq')], [one(pg.beds).replace(/\s*[-\u2013]\s*/g, '\u2013'), t('uBed')], [one(pg.tenure), t('uTen')], [comp ? comp[1] : '', stKind() === 'done' ? t('uDone') : t('uReady')]].filter(function (c) { return c[0] && !/^(?:[-\u2013\u2014]+|n\/?a|tb[ac]|0|nil|none|-)$/i.test(String(c[0]).trim()); });   // a placeholder is not a value
      var spec = cells.length ? '<div class="npe-spec">' + cells.map(function (c) { return '<div><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></div>'; }).join('') + '</div>' : '';
      var loc = pg.place ? '<div class="npe-loc"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#D0021B" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><span>' + esc(pg.place) + '</span></div>' : '';
      box.innerHTML =
        status() + (pg.type ? '<h2 class="npe-type">' + esc(pg.type) + '</h2>' : '') + loc + price + spec +
        '<div class="npe-left' + (none ? ' npe-none' : '') + '"><i></i><span>' + lineHtml(left) + '</span></div>' +
        '<div class="npe-buy' + (rw ? ' npe-buy-rw' : '') + '">' + rw +
        '<a class="npe-cta" data-g="cta" target="_blank" rel="noopener" href="' + esc(path + '#units') + '">' + esc(t('cta')) + ARROW +
        (ht ? '<span class="npe-hot" aria-hidden="true">\ud83d\udd25 ' + esc(t(ht.k)) + '</span>' : '') + '</a></div>' +
        (D.getElementById('floor-plan') ? '<button type="button" class="npe-plans" data-g="plans">' + esc(t('plans')) + '</button>' : '') +
        '<p class="npe-note">' + t('note').split(' \u00b7 ').map(function (x, i, A) { return '<span>' + esc(x + (i < A.length - 1 ? ' \u00b7' : '')) + '</span>'; }).join(' ') + '</p>' +   // v2-1: lines break only at the dot
        rewardHtml() +   // v2-6: the gold reward card back where box 112 had it (owner 24 Nov: "bring it back, for all listings")
        (pg.dev ? '<button type="button" class="npe-dev" data-g="developer"><span>' + esc(t('dev')) + '</span><div>' + (pg.devLogo ? '<img src="' + esc(pg.devLogo) + '" alt="">' : '') + '<b>' + esc(pg.dev) + '</b><i aria-hidden="true">\u203a</i></div></button>' : '');
      fitSpec();
    }
    // v2-8: the strip goes 2 x 2 whenever its 4 cells do not fit side by side (narrow phones, the laptop column, long BM words)
    function fitSpec() {
      var s = box.querySelector('.npe-spec'); if (!s) return;
      if (ro && s !== seen) { seen = s; ro.disconnect(); ro.observe(box); [].forEach.call(s.children, function (c) { ro.observe(c); }); }   // a cell widens when the web font arrives: check again then
      s.classList.remove('npe-spec2');
      var tight = s.scrollWidth > s.clientWidth + 0.5 || [].some.call(s.children, function (c) { return c.scrollWidth > c.clientWidth + 0.5; });
      if (tight) s.classList.add('npe-spec2');
    }
    W.addEventListener('resize', fitSpec);
    var fq = 0, seen = null, ro = W.ResizeObserver ? new W.ResizeObserver(function () { if (!fq) fq = requestAnimationFrame(function () { fq = 0; fitSpec(); }); }) : null;   // next frame: no resize-loop warnings
    if (ro) ro.observe(box);
    try { if (D.fonts) { if (D.fonts.ready) D.fonts.ready.then(fitSpec); if (D.fonts.addEventListener) D.fonts.addEventListener('loadingdone', fitSpec); } } catch (e) {}
    W.addEventListener('load', fitSpec);
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
  function safe() { try { start(); } catch (e) { try { H.classList.remove('npe-on'); var gw = D.querySelector('.gallery-wrap'); if (gw) gw.style.maxWidth = gw.style.marginLeft = gw.style.marginRight = ''; var m = W.__NPE_MB__; if (m && m[1]) m[1].insertBefore(m[0], m[2] && m[2].parentNode === m[1] ? m[2] : null); var b = D.querySelector('.npe'); if (b) b.remove(); var c = D.getElementById('npe-css'); if (c) c.remove(); } catch (e2) {} } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safe); else safe();
})();
