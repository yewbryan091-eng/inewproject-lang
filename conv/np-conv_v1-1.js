/*
 * iNewProject e-Enquiry conversion layer v1.1 (4 Nov 2026). Loaded from the admin Header Scripts box, after np-unit.
 * e-Enquiry pages:
 *   - "Choose your unit" under the project name, and a bar while reading (phones: bottom bar; laptops: small floating pill).
 *     The page keeps its order: project information first.
 *   - The promotion band still goes to the sales representative's form; it says so and types the question in.
 *   - Layout and budget filter right above the level list. Floor by floor stays; a tapped level shows its level plan first.
 *     No dead ends: a tower only offers what it has open; a choice that can't combine replaces the other and says why; a layout
 *     missing in this tower points to the tower that has it. Where there is nothing to narrow, the filter stays away.
 *   - Phones: while choosing units the site header and section tabs step away and the tower chooser is one slim line.
 *   - "All 28 units open" where nothing on a floor is taken; "Only N of M left" stays everywhere else.
 *   - Unit details, ranked: Share and Compare beside the unit number; availability together; price; the loan estimate in a box;
 *     the incentive as one slim row of pictures. Bedrooms follow the approved brochure where the unit list differs.
 *   - Compare any two units: any level, any tower or row, under any filter, high-rise or landed.
 *   - The form: plain name hint and the incentive pictures above Submit.
 *   - Tracking: steps between the page view and the submit (GA4), ViewContent on a unit (Meta Pixel). No name, phone or email.
 * Listing pages with e-Enquiry open:
 *   - The red e-Enquiry button opens the e-Enquiry page; the same bar appears while reading and steps aside at the reward card.
 * Every listing: the loan calculator starts at 4.25%.
 *
 * Do no harm: everything reads the page's own unit list and wraps the site's own functions. If something is missing or throws, that
 * part steps aside and the site works as before. Our words carry their own EN / BM / 中文; the site's words go through its
 * language switcher as usual.
 */
(function () {
  'use strict';
  if (window.__npConv) return;
  window.__npConv = 1;
  var D = document, path = location.pathname;
  var isEnq = /^\/project\/[^\/]+\/e-enquiry\/?$/.test(path), isList = /^\/project\/[^\/]+\/?$/.test(path) && !/^\/project\/\d+\/?$/.test(path);
  if (!isEnq && !isList) return;
  var $ = function (s, r) { return (r || D).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  function el(h) { var t = D.createElement('template'); t.innerHTML = h.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function tidy(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function rm(n) { return 'RM' + Math.round(n).toLocaleString('en-MY'); }
  function rmk(n) { return 'RM' + (n >= 1e6 ? +(n / 1e6).toFixed(2) + 'm' : Math.round(n / 1000) + 'k'); }
  function monthly(p) { var L = p * 0.9, r = 0.0425 / 12, f = Math.pow(1 + r, 420); return L * r * f / (f - 1); }   // 90% loan, 4.25%, 35 years
  function cfg(k) { try { if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG[k]) return String(APP_CONFIG[k]); } catch (e) {} return ''; }
  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); if (!l) { try { l = localStorage.getItem('np_lang'); } catch (e) {} } return l === 'ms' || l === 'zh' ? l : 'en'; }
  function ix() { return { en: 0, ms: 1, zh: 2 }[lang()]; }

  var W = {
    heroBtn: ['Choose your unit', 'Pilih unit anda', '选择您的单位'], heroOpen: ['{n} open', '{n} dibuka', '开放 {n} 个'], heroNote: ['or read about the project first', 'atau baca tentang projek dahulu', '或先了解项目'],
    units1: ['1 unit open', '1 unit dibuka', '开放 1 个单位'], unitsN: ['{n} units open', '{n} unit dibuka', '开放 {n} 个单位'], from: ['from {p}', 'dari {p}', '{p} 起'], free: ['e-Enquiry is free', 'e-⁠Enquiry percuma', 'e-⁠Enquiry 免费'], barBtn: ['Choose a unit', 'Pilih unit', '选择单位'],
    listOpen: ['e-Enquiry open', 'e-⁠Enquiry dibuka', 'e-⁠Enquiry 开放中'], listFree: ['free, no payment', 'percuma, tanpa bayaran', '免费，无需付款'],
    promoLine: ['Promotion & rebate available. Ask the developer’s sales representative.', 'Promosi & rebat tersedia. Tanya wakil jualan pemaju.', '现有促销与回扣。请咨询发展商的销售代表。'], promoBtn: ['Ask about promotions', 'Tanya tentang promosi', '咨询促销'], promoAlt: ['Ready to pick a unit?', 'Sedia memilih unit?', '准备好选单位了吗？'],
    promoMsg: ['Hi, I would like to know the latest promotion and rebate for {p}.', 'Hai, saya ingin tahu promosi dan rebat terkini untuk {p}.', '您好，我想了解 {p} 的最新促销与回扣。'],
    askMsg: ['Hi, I am looking for {w} at {p}.', 'Hai, saya mencari {w} di {p}.', '您好，我想在 {p} 找 {w}。'], askUnit: ['a unit', 'unit', '单位'], askBudget: ['a unit up to {p}', 'unit sehingga {p}', '{p} 以内的单位'],
    fLayout: ['Layout:', 'Susun Atur:', '格局：'], fBudget: ['Budget:', 'Bajet:', '预算：'], fAll: ['All', 'Semua', '全部'], fAny: ['Any price', 'Semua harga', '不限价格'], fUpto: ['Up to {p}', 'Sehingga {p}', '{p} 以内'], fClear: ['Clear', 'Kosongkan', '清除'], fAsk: ['Not sure? Ask the developer\u2019s sales representative', 'Tidak pasti? Tanya wakil jualan pemaju', '不确定？询问发展商的销售代表'],
    bed: ['{n} bed', '{n} bilik', '{n} 房'], sqft: ['{n} sq ft', '{n} kaki persegi', '{n} 平方尺'], onLevels: [' on {n} levels', ' di {n} tingkat', '，分布于 {n} 层'], onName: [' on {n}', ' di {n}', '，位于{n}'], sumFrom: [' · from {p}', ' · dari {p}', '，{p} 起'],
    bL1: ['1 {t} unit open', '1 unit {t} dibuka', '开放 1 个 {t} 单位'], bLN: ['{n} {t} units open', '{n} unit {t} dibuka', '开放 {n} 个 {t} 单位'], bB1: ['1 unit in budget', '1 unit dalam bajet', '预算内 1 个单位'], bBN: ['{n} units in budget', '{n} unit dalam bajet', '预算内 {n} 个单位'], bM1: ['1 unit matches', '1 unit sepadan', '符合 1 个单位'], bMN: ['{n} units match', '{n} unit sepadan', '符合 {n} 个单位'],
    allOpen: ['All {n} units open', 'Semua {n} unit dibuka', '{n} 个单位全部开放'],
    noLB: ['No {t} up to {p}. The cheapest {t} is {c}.', 'Tiada {t} sehingga {p}. {t} termurah ialah {c}.', '{p} 以内没有 {t}。最便宜的 {t} 是 {c}。'], noBL: ['No {t} up to {p}. Showing all units up to {p}.', 'Tiada {t} sehingga {p}. Menunjukkan semua unit sehingga {p}.', '{p} 以内没有 {t}。现显示 {p} 以内的所有单位。'],
    none: ['No {w} open in {b}.', 'Tiada {w} dibuka di {b}.', '{b} 暂无开放的 {w}。'], noneUnits: ['units up to {p}', 'unit sehingga {p}', '{p} 以内的单位'], see: ['See {b} ({n})', 'Lihat {b} ({n})', '查看 {b}（{n}）'],
    left: ['Only {a} of {b} units left', 'Tinggal {a} daripada {b} unit', '仅剩 {a} 个（共 {b} 个单位）'], loanT: ['Est. monthly loan', 'Anggaran pinjaman bulanan', '每月贷款估算'], loanS: ['90% loan · 4.25% · 35 years', 'Pinjaman 90% · 4.25% · 35 tahun', '贷款 90% · 4.25% · 35 年'], loanM: ['a month', 'sebulan', '每月'],
    rwMany: ['Choose 1 · worth {v}', 'Pilih 1 · bernilai {v}', '任选 1 项 · 价值 {v}'], rwManyNo: ['Choose 1 reward', 'Pilih 1 ganjaran', '任选 1 项奖励'], rwOne: ['Worth {v}', 'Bernilai {v}', '价值 {v}'], rwOneNo: ['e-Enquiry reward', 'Ganjaran e-⁠Enquiry', 'e-⁠Enquiry 奖励'], rwSub: ['once SPA is signed.', 'selepas SPA ditandatangani.', '签署 SPA 后可得。'], rwTc: ['T&C apply.', 'Tertakluk kepada T&S.', '须符合条款。'],
    share: ['Share', 'Kongsi', '分享'], compare: ['Compare', 'Bandingkan', '比较'], added: ['Added', 'Ditambah', '已添加'], copied: ['Link copied', 'Pautan disalin', '链接已复制'], name: ['Your full name', 'Nama penuh anda', '您的全名'],
    cTitle: ['Compare 2 units', 'Bandingkan 2 unit', '比较 2 个单位'], cSep: [', ', ', ', '，'], cStop: ['.', '.', '。'], cPicked: ['{n} of 2 units picked', '{n} daripada 2 unit dipilih', '已选 {n}/2 个单位'], cMore: ['Pick one more, on any level', 'Pilih satu lagi, di mana-mana tingkat', '再选一个，任何楼层皆可'], cApart: ['{p} apart', 'beza {p}', '相差 {p}'], cSqApart: ['{n} sq ft apart', 'beza {n} kaki persegi', '相差 {n} 平方尺'],
    cBuilt: ['Built-up', 'Keluasan binaan', '建筑面积'], cPsf: ['Price per sq ft', 'Harga sekaki persegi', '每平方尺价格'], cBed: ['Bedrooms', 'Bilik tidur', '卧室'], cBath: ['Bathrooms', 'Bilik air', '浴室'], cWhere: ['Where', 'Lokasi', '位置'], cFace: ['Facing · view', 'Arah · pemandangan', '朝向 · 景观'], cPos: ['Position', 'Kedudukan', '位置类型'],
    cNote: ['Monthly: 90% loan, 4.25% a year, 35 years. An estimate only; the bank decides.', 'Bulanan: pinjaman 90%, 4.25% setahun, 35 tahun. Anggaran sahaja; bank yang memutuskan.', '每月：贷款 90%，年利率 4.25%，35 年。仅为估算，以银行批准为准。'], cEnq: ['Enquire {u}', 'Tanya {u}', '咨询 {u}'], cUnit: ['Unit {u}', 'Unit {u}', '单位 {u}'], cLvlUnit: ['{l} · Unit {u}', '{l} · Unit {u}', '{l} · 单位 {u}'],
    lvl: ['Level {n}', 'Tingkat {n}', '第 {n} 层'], clearCmp: ['Clear compare', 'Kosongkan perbandingan', '清除比较']
  };
  function t(k, v) { var s = W[k][ix()]; if (v) Object.keys(v).forEach(function (x) { s = s.split('{' + x + '}').join(v[x]); }); return s; }
  // the site's own word for a name: its dictionary (also its &amp; keys), then its rules, then the Type pattern
  function word(n) {
    var l = lang(); if (l === 'en') return n;
    try {
      var d = window.NP_DICT && NP_DICT[l], k = d && (d[n] || d[n.replace(/&/g, '&amp;')]);
      if (k && k.indexOf('<') < 0) return k.replace(/&amp;/g, '&');
      var rules = window.NP_RULES && NP_RULES[l];
      if (rules) { var a = n; rules.forEach(function (r) { a = a.replace(r[0], r[1]); }); if (a !== n && a.indexOf('<') < 0) return a; }
    } catch (e) {}
    return l === 'ms' ? n.replace(/^Type /, 'Jenis ') : n.replace(/^Type (.+)$/, '$1 型');
  }
  function isPhone() { return innerWidth < 768 || innerHeight <= 500; }   // landscape phones too: the same media query in the CSS

  /* ---------- tracking: no personal details, ever ---------- */
  function ev(name, extra) {
    try {
      if (typeof window.gtag !== 'function') return;
      var p = {}, n = cfg('projectName'), id = cfg('projectId');
      if (n) p.project_name = n.slice(0, 100);
      if (/^\d{1,6}$/.test(id)) p.project_id = id;
      for (var k in extra) if (extra[k]) p[k] = extra[k];
      window.gtag('event', name, p);
    } catch (e) {}
  }
  function band(p) { return !p ? '' : p < 3e5 ? 'under 300k' : p < 5e5 ? '300k-500k' : p < 7e5 ? '500k-700k' : p < 1e6 ? '700k-1m' : '1m and up'; }

  var repaint = [];   // our words follow the language switcher, as the unit pop-up's do
  function onLang() { new MutationObserver(function () { repaint.forEach(function (f) { try { f(); } catch (e) {} }); }).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] }); }

  /* ---------- the bar ---------- */
  function makeBar(paintText, onTap, showWhen) {
    var bar = el('<div class="npc-bar" data-np-skip=""><div class="npc-bar-txt"><b></b><span></span></div><button type="button"></button></div>');
    function paint() { var x = paintText(); $('b', bar).textContent = x[0]; $('span', bar).textContent = x[1]; $('button', bar).textContent = t('barBtn'); }
    paint(); repaint.push(paint);
    $('button', bar).addEventListener('click', onTap);
    D.body.appendChild(bar);
    function tick() { var on = showWhen(); bar.classList.toggle('on', on); D.documentElement.classList.toggle('npc-bar-on', on); }
    addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick); tick();
  }

  /* ---------- listing page ---------- */
  function listing() {
    var r = $('#calcRate');   // every listing: the calculator starts where banks start
    if (r && parseFloat(r.value) === 4) { r.value = '4.25'; r.step = '0.05'; if (typeof window.calcMortgage === 'function') window.calcMortgage(); }
    var card = $('#e-enquiry'); if (!card) return;
    var link = $('#e-enquiry a[href*="/e-enquiry"]'), url = link ? link.getAttribute('href') : path.replace(/\/?$/, '/') + 'e-enquiry/';
    $$('.hero-btn.primary').forEach(function (b) {
      if (!/scrollToSection\(['"]e-enquiry['"]\)/.test(b.getAttribute('onclick') || '')) return;
      b.removeAttribute('onclick');
      b.addEventListener('click', function () { location.href = url; });
    });
    var price = ''; $$('.kf-value').some(function (v) { var x = tidy(v.textContent); if (/^RM\s?[\d,]+$/.test(x)) { price = x; return true; } return false; });
    makeBar(function () { return [t('listOpen'), price ? t('from', { p: price }) : t('listFree')]; }, function () { location.href = url.replace(/#.*$/, '') + '#units'; }, function () {
      var c = card.getBoundingClientRect();
      return scrollY > innerHeight * 0.8 && (c.top > innerHeight * 0.7 || c.bottom < 0);
    });
    onLang();
  }

  /* ---------- e-Enquiry page ---------- */
  var BROCHURE = { 'rosedale-by-ancubic': { 'Type B': '2+1' } };   // the approved brochure wins over the unit list
  var slug = (/\/project\/([^\/]+)/.exec(path) || [])[1];
  // one choice per real layout: "Type A1 · Left Entrance", "Type A / Aa" and "Type A — 2+1 Bedrooms" group under their type
  function short(x) { var n = tidy(x).split(/\s+[·\/]\s+/)[0]; if (/^Type\b/i.test(n)) n = n.split(/\s+[—–]\s+/)[0]; n = n.trim(); return n ? n.charAt(0).toUpperCase() + n.slice(1) : n; }
  function bedOf(u) { var o = (BROCHURE[slug] || {})[short(u.type)]; if (o) return o; var m = /(\d(?:\+\d)?)\s*Bedrooms?/i.exec(u.type || ''); if (m) return m[1]; var b = +u.bedrooms || 0; return b ? String(b) : ''; }
  function green(u) { return u.status === 'green'; }
  function priced(u) { return +u.price > 0; }
  function nice(p) { var s = p < 1e6 ? 5e4 : p < 5e6 ? 1e5 : 5e5; return Math.ceil(p / s) * s; }
  function stepsOf(open) {   // from where the open units really are, rounded up; a step catching over 90% is no use
    var pr = open.filter(priced).map(function (u) { return +u.price; }).sort(function (a, b) { return a - b; }), seen = {};
    if (Object.keys(pr.reduce(function (o, p) { o[p] = 1; return o; }, {})).length < 2) return [];
    return [.2, .4, .6, .8].map(function (q) { return nice(pr[Math.floor(q * pr.length)]); }).filter(function (v) { if (seen[v]) return false; seen[v] = 1; var n = pr.filter(function (p) { return p <= v; }).length; return n && n <= pr.length * 0.9; }).sort(function (a, b) { return a - b; }).slice(0, 4);
  }
  function enquiry() {
    var N = window.NPC = { layout: null, budget: 0, note: null, cmp: [] };
    function all() { return allProjectUnits(); }
    function projectName() { return tidy(($('.hero-project-name') || {}).textContent) || cfg('projectName'); }
    function inBudget(u) { return !N.budget || (priced(u) && +u.price <= N.budget); }
    function fits(u) { return (N.layout === null || short(u.type) === N.layout) && inBudget(u); }
    function active() { return N.layout !== null || !!N.budget; }
    N.active = active;
    function blockOf(btn) { var m = /ofbSwitchBlock\((".*?"),/.exec(btn.getAttribute('onclick') || ''); try { return m && JSON.parse(m[1]); } catch (e) { return null; } }
    function placeOf(x) {
      var b = BD[x.block], d = tidy(b && b[String(x.level)] && b[String(x.level)].displayName), m = /^Level\s+(.+)$/i.exec(d);
      if (m) return t('lvl', { n: m[1] });
      return d ? word(d) : levelWord(x.block) === 'level' ? t('lvl', { n: x.level }) : word(levelWord(x.block, true) + ' ' + x.level);
    }
    function towerName(k) { return word(tidy(towerLabel(k))); }
    function isLevelName(x) { var b = BD[x.block], d = b && b[String(x.level)] && b[String(x.level)].displayName; return !d || /^level\b/i.test(d); }

    function toUnits() {
      var bk = $('#booking'); if (!bk) return;
      if (isPhone()) scrollTo({ top: bk.getBoundingClientRect().top + scrollY + 1, behavior: 'smooth' });
      else scrollToSection('booking');
    }
    var openAll = all().filter(green), openCount = openAll.length;

    /* the shortcut under the project name, and the bar while reading */
    if (openCount) {
      var link = $('.hero-details-link');
      if (link) {
        var cta = el('<div class="npc-hero-cta" data-np-skip=""><button type="button" class="npc-jump"><span class="t"></span><b></b><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg></button><span class="npc-hero-note"></span></div>');
        var pc = function () { $('.t', cta).textContent = t('heroBtn'); $('b', cta).textContent = t('heroOpen', { n: openCount }); $('.npc-hero-note', cta).textContent = t('heroNote'); };
        pc(); repaint.push(pc); link.parentNode.insertBefore(cta, link.nextSibling); $('.npc-jump', cta).addEventListener('click', toUnits);
      }
      var from = openAll.filter(priced).map(function (u) { return +u.price; });
      from = from.length ? Math.min.apply(null, from) : 0;
      makeBar(function () { return [t(openCount === 1 ? 'units1' : 'unitsN', { n: openCount }), from ? t('from', { p: rm(from) }) : t('free')]; }, toUnits, function () {
        var b = $('#booking').getBoundingClientRect(), c = $('#contact-us');
        return scrollY > innerHeight * 0.8 && b.top > innerHeight * 0.6 && (!c || c.getBoundingClientRect().top > innerHeight);
      });
    }

    /* the promotion band: still the sales representative, by design */
    var band_ = $('.sp-promo');
    if (band_) {
      var line = $('.sp-promo-line', band_), btn = $('.sp-promo-cta', band_), span = btn && $('span', btn), copy = $('.sp-promo-copy', band_);
      if (line && btn && span && copy) {
        line.setAttribute('data-np-skip', ''); span.setAttribute('data-np-skip', '');
        var alt = el('<span class="npc-promo-alt" data-np-skip=""><span></span> <button type="button"></button></span>');
        copy.appendChild(alt); $('button', alt).addEventListener('click', toUnits);
        var pp = function () { line.textContent = t('promoLine'); span.textContent = t('promoBtn'); $('span', alt).textContent = t('promoAlt'); $('button', alt).textContent = t('heroBtn'); };
        pp(); repaint.push(pp);
        btn.removeAttribute('onclick');
        btn.addEventListener('click', function () { fillAsk(t('promoMsg', { p: projectName() })); scrollToSection('contact-us'); });
      }
    }
    function fillAsk(msg) { var m = $('#srMessage'); if (m && !m.value) { m.value = msg; m.dispatchEvent(new Event('input', { bubbles: true })); } }

    /* "All 28 units open", and the filter's numbers */
    var _badge = availabilityBadge;
    window.availabilityBadge = function (a, b) {
      if (active()) {
        var nm = N.layout !== null ? word(N.layout) : '';
        return { text: N.layout !== null && N.budget ? t(a === 1 ? 'bM1' : 'bMN', { n: a }) : N.layout !== null ? (nm.length <= 9 ? t(a === 1 ? 'bL1' : 'bLN', { n: a, t: nm }) : t(a === 1 ? 'units1' : 'unitsN', { n: a })) : t(a === 1 ? 'bB1' : 'bBN', { n: a }), tier: a ? 'green' : 'amber' };
      }
      if (a === b && b > 0) return { text: b === 1 ? t('units1') : t('allOpen', { n: b }), tier: 'green' };
      return _badge(a, b);
    };

    /* the filter */
    var rail = $('#ofbFloorList'), box = el('<div class="npc-filter" data-np-skip=""></div>');
    D.documentElement.classList.add('npc-f-on');
    rail.parentNode.insertBefore(box, rail);
    var _match = unitMatchesFilter;
    window.unitMatchesFilter = function (u) { return _match(u) && fits(u); };
    var _floors = renderFloorList;
    window.renderFloorList = function () { _floors(); try { paintFilter(); } catch (e) { box.hidden = true; } };
    var _wings = renderWings;
    window.renderWings = function () { _wings(); if (active()) $$('#ofbWingsMount .ofb-wing').forEach(function (w) { if (!$('.ofb-cell', w)) w.classList.add('npc-hide'); }); };
    function refresh() { setUnitTypePreference('all'); }   // the site's own redraw: levels, then the open level (closed if nothing matches)
    function poolOf(n) { return allUnitsForBlock().filter(function (u) { return green(u) && short(u.type) === n; }); }
    N.setType = function (x) {
      N.note = null; N.layout = x === 'all' ? null : x;
      if (N.layout !== null && N.budget) { var pool = poolOf(N.layout); if (pool.length && !pool.some(inBudget)) { var ps = pool.filter(priced).map(function (u) { return +u.price; }); N.note = ['noLB', { t: N.layout, p: rmk(N.budget), c: ps.length ? rm(Math.min.apply(null, ps)) : '' }]; N.noteIn = ofbCurrentBlock; N.budget = 0; } }
      if (N.layout !== null) ev('filter_use', { filter_type: 'layout', unit_type: N.layout.slice(0, 40) });
      refresh();
    };
    N.setBudget = function (v) {
      N.note = null; var had = N.layout; N.budget = v;
      if (v && had !== null) { var pool = poolOf(had); if (pool.length && !pool.some(inBudget)) { N.note = ['noBL', { t: had, p: rmk(v) }]; N.noteIn = ofbCurrentBlock; N.layout = null; } }
      if (v) ev('filter_use', { filter_type: 'budget', price_band: band(v) });
      refresh();
    };
    N.clear = function () { N.layout = null; N.budget = 0; N.note = null; refresh(); };
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-l],[data-b],[data-go],.npc-f-clear,.npc-f-ask'); if (!b) return;
      if (b.classList.contains('npc-f-clear')) return N.clear();
      if (b.classList.contains('npc-f-ask')) { fillAsk(t('askMsg', { w: N.layout !== null ? word(N.layout) : N.budget ? t('askBudget', { p: rmk(N.budget) }) : t('askUnit'), p: projectName() })); return scrollToSection('contact-us'); }
      if (b.getAttribute('data-go') !== null) return $$('#booking .fp-block-btn')[+b.getAttribute('data-go')].click();
      if (b.getAttribute('data-l') !== null) { var l = b.getAttribute('data-l'); return N.setType(l === '' || l === N.layout ? 'all' : l); }
      var v = +b.getAttribute('data-b'); N.setBudget(v === N.budget ? 0 : v);
    });
    box.addEventListener('change', function (e) { if (e.target.matches('.npc-sel')) N.setType(e.target.value === '' ? 'all' : e.target.value); });
    function paintFilter() {
      var units = allUnitsForBlock(), open = units.filter(green), every = all().filter(green);
      // the buttons follow this tower or row: towers can sell different things
      var nameSet = {}; open.forEach(function (u) { var n = short(u.type); if (n) nameSet[n] = 1; }); if (N.layout !== null) nameSet[N.layout] = 1;
      var names = Object.keys(nameSet).sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
      var steps = stepsOf(open); if (N.budget && steps.indexOf(N.budget) < 0) { steps.push(N.budget); steps.sort(function (a, b) { return a - b; }); }
      var levelsAll = Object.keys(BD).reduce(function (n, b) { return n + Object.keys(BD[b]).length; }, 0);
      box.hidden = !units.length || levelsAll < 2 || (!active() && names.length < 2 && !steps.length);   // nothing to narrow: stay away
      if (box.hidden) { box.innerHTML = ''; if (active()) { N.layout = null; N.budget = 0; N.note = null; } $$('.ofb-floor-row.npc-hide', rail).forEach(function (r) { r.classList.remove('npc-hide'); }); return; }
      function anyOf(n) { return every.filter(function (u) { return short(u.type) === n; })[0] || all().filter(function (u) { return short(u.type) === n; })[0] || {}; }
      var beds = {}, sizes = {}; names.forEach(function (n) { beds[bedOf(anyOf(n))] = 1; sizes[+anyOf(n).sqft || 0] = 1; });
      function detail(n) { var u = anyOf(n), bed = bedOf(u), sq = +u.sqft || 0; return Object.keys(beds).length > 1 && bed ? t('bed', { n: bed }) : Object.keys(sizes).length > 1 && sq && !/\d\s*sf\b/i.test(n) ? t('sqft', { n: sq.toLocaleString('en-MY') }) : ''; }
      function count(n) { return open.filter(function (u) { return short(u.type) === n && inBudget(u); }).length; }
      var allN = open.filter(inBudget).length;
      function label(n) { var d = detail(n); return word(n) + (d ? ' · ' + d : ''); }
      var layoutRow = '';
      if (names.length >= 2) layoutRow = names.length > 8
        ? '<select class="npc-sel" aria-label="' + esc(t('fLayout')) + '"><option value="">' + esc(t('fAll')) + ' (' + allN + ')</option>' + names.map(function (n) { return '<option value="' + esc(n) + '"' + (N.layout === n ? ' selected' : '') + '>' + esc(label(n)) + ' (' + count(n) + ')</option>'; }).join('') + '</select>'
        : '<div class="npc-chips">' + [''].concat(names).map(function (n) { var c = n ? count(n) : allN, on = !!n && N.layout === n; return '<button type="button" class="npc-chip' + (on ? ' on' : '') + (c ? '' : ' dim') + '" aria-pressed="' + on + '" data-l="' + esc(n) + '">' + esc(n ? label(n) : t('fAll')) + ' <span class="c">(' + c + ')</span></button>'; }).join('') + '</div>';
      function budgetFit(v) { return open.some(function (u) { return (N.layout === null || short(u.type) === N.layout) && priced(u) && +u.price <= v; }); }
      var budgetRow = steps.length ? '<div class="npc-chips">' + [0].concat(steps).map(function (v) { var on = !!v && N.budget === v; return '<button type="button" class="npc-chip' + (on ? ' on' : '') + (!v || budgetFit(v) ? '' : ' dim') + '" aria-pressed="' + on + '" data-b="' + v + '">' + esc(v ? t('fUpto', { p: rmk(v) }) : t('fAny')) + '</button>'; }).join('') + '</div>' : '';
      var hit = open.filter(fits), on = active();
      var lv = Object.keys(BD[ofbCurrentBlock] || {}).filter(function (l) { return floorAvailableCount(l) > 0; });
      var plain = lv.every(function (l) { var d = BD[ofbCurrentBlock][l].displayName; return !d || /^level\b/i.test(d); });
      var where = !on || !lv.length ? '' : lv.length === 1 ? t('onName', { n: placeOf({ block: ofbCurrentBlock, level: lv[0] }) }) : plain ? t('onLevels', { n: lv.length }) : '';
      var prices = hit.filter(priced).map(function (u) { return +u.price; }), fromTxt = on && prices.length ? t('sumFrom', { p: rm(Math.min.apply(null, prices)) }) : '';
      var none = '';
      if (on && !hit.length) {   // only reached when this tower has none: show where they are instead of a blank list
        var what = N.layout !== null ? word(N.layout) : t('noneUnits', { p: rmk(N.budget) });
        var others = $$('#booking .fp-block-btn').map(function (b, i) { var bk = blockOf(b); return { i: i, name: tidy(b.textContent), n: bk && bk !== ofbCurrentBlock && BD[bk] ? Object.keys(BD[bk]).reduce(function (c, f) { return c + BD[bk][f].wings.reduce(function (d, w) { return d + w.units.filter(function (u) { return green(u) && fits(u); }).length; }, 0); }, 0) : 0 }; }).filter(function (o) { return o.n; }).slice(0, 3);
        none = '<div class="npc-none"><b>' + esc(t('none', { w: what, b: towerName(ofbCurrentBlock) })) + '</b><div class="npc-none-a">' + others.map(function (o) { return '<button type="button" class="npc-chip" data-go="' + o.i + '">' + esc(t('see', { b: o.name, n: o.n })) + '</button>'; }).join('') + '</div><button type="button" class="npc-f-ask">' + esc(t('fAsk')) + '</button></div>';
      }
      var note = '';
      if (N.note && N.noteIn !== ofbCurrentBlock) N.note = null;
      if (N.note) { var v = {}; Object.keys(N.note[1]).forEach(function (k) { v[k] = k === 't' ? word(N.note[1][k]) : N.note[1][k]; }); note = t(N.note[0], v); }
      var keep = $$('.npc-chips', box).map(function (s) { return s.scrollLeft; });
      box.innerHTML = (layoutRow ? '<div class="npc-f-row"><div class="npc-f-lbl">' + esc(t('fLayout')) + '</div>' + layoutRow + '</div>' : '')
        + (budgetRow ? '<div class="npc-f-row"><div class="npc-f-lbl">' + esc(t('fBudget')) + '</div>' + budgetRow + '</div>' : '')
        + (note ? '<div class="npc-f-note">' + esc(note) + '</div>' : '')
        + (on && hit.length ? '<div class="npc-f-sum"><span><b>' + esc(t(hit.length === 1 ? 'units1' : 'unitsN', { n: hit.length })) + '</b>' + esc(where) + esc(fromTxt) + '</span><button type="button" class="npc-f-clear">' + esc(t('fClear')) + '</button></div>' : '')
        + (none ? none + '<div class="npc-f-sum"><span></span><button type="button" class="npc-f-clear">' + esc(t('fClear')) + '</button></div>' : '');
      $$('.npc-chips', box).forEach(function (s, i) { var c = $('.npc-chip.on', s); if (c && c.offsetLeft - s.offsetLeft + c.offsetWidth > s.clientWidth) s.scrollLeft = c.offsetLeft - s.offsetLeft - 12; else s.scrollLeft = c ? 0 : (keep[i] || 0); });
      $$('.ofb-floor-row', rail).forEach(function (r) { r.classList.toggle('npc-hide', on && !!$('.zero', r)); });
    }
    renderFloorList();
    if (currentFloor) renderWings();
    repaint.push(function () { renderFloorList(); if (currentFloor) renderWings(); });

    /* phones: one slim bar while choosing units */
    D.documentElement.classList.add('npc-slim');
    function slimTick() { var b = $('#booking').getBoundingClientRect(); D.documentElement.classList.toggle('npc-in-units', isPhone() && b.top < 140 && b.bottom > 260); }
    addEventListener('scroll', slimTick, { passive: true }); addEventListener('resize', slimTick); slimTick();
    var _sf = selectFloor, quiet = false;   // quiet: we moved the page ourselves, so it isn't counted as a tap
    window.selectFloor = function (l) {
      _sf(l); if (!quiet) ev('level_tap', { level: String(l).slice(0, 30) });
      // the site scrolls 206 px short of a tapped level to clear its bars; with the slim bar the level plan sits right under it
      if (isPhone()) setTimeout(function () { var c = $('#ofbWingsCard'); if (c) { scrollTo({ top: c.getBoundingClientRect().top + scrollY - 64, behavior: 'instant' }); slimTick(); } }, 80);
    };

    /* the incentive as pictures, from the page's own incentives section */
    function rewards() { return $$('#how-it-works .rw-band').map(function (b) { var i = $('img', b), v = $('.rw-value', b), m = v && /RM\s?[\d,]+/.exec(v.textContent); return { img: i && i.src, title: tidy(($('.rw-title', b) || {}).textContent), value: m ? m[0] : '' }; }).filter(function (r) { return r.img; }); }
    function terms() { var m = $('#ebooking-tnc-modal'); if (m) { if (m.parentNode !== D.body) D.body.appendChild(m); m.style.zIndex = 100005; m.style.display = 'flex'; } }
    function rewardRow() {
      var rs = rewards(); if (!rs.length) return null;
      var worth = rs.every(function (r) { return r.value === rs[0].value; }) ? rs[0].value : '';
      var head = rs.length > 1 ? (worth ? t('rwMany', { v: worth }) : t('rwManyNo')) : (worth ? t('rwOne', { v: worth }) : t('rwOneNo'));
      var r = el('<button type="button" class="npc-rw" data-np-skip=""><span class="npc-rw-imgs">' + rs.slice(0, 3).map(function (x) { return '<span class="npc-rw-i"><img src="' + esc(x.img) + '" alt="' + esc(x.title) + '"></span>'; }).join('') + '</span><span class="npc-rw-txt"><b>' + esc(head) + '</b><span>' + esc(t('rwSub')) + ' <u>' + esc(t('rwTc')) + '</u></span></span></button>');
      r.addEventListener('click', terms);
      return r;
    }

    /* unit details, ranked */
    function shareUnit(u) {
      var url = location.origin + path.replace(/\/?$/, '/') + '?u=' + encodeURIComponent([ofbCurrentBlock, currentFloor, u.unitNo].join('~'));
      ev('unit_share', { unit_type: short(u.type).slice(0, 40) });
      if (navigator.share) { navigator.share({ title: projectName(), url: url }).catch(function () {}); return; }
      function done() { toast(t('copied')); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { prompt('', url); }); else prompt('', url);
    }
    function toast(s) { $('.npc-toast') && $('.npc-toast').remove(); var x = el('<div class="npc-toast" data-np-skip="">' + esc(s) + '</div>'); D.body.appendChild(x); setTimeout(function () { x.remove(); }, 2000); }
    var ICON = { share: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>', plus: '<path d="M12 5v14"/><path d="M5 12h14"/>', tick: '<path d="m5 12 5 5 9-10"/>' };
    function paintPopup() {
      var ov = $('#unitInfoOverlay'), info = ov && $('.npu-info', ov), u = typeof currentUnit !== 'undefined' && currentUnit;
      if (!info || !u || !ov.classList.contains('open')) return;
      $$('.npc-ud,.npc-left-pill', info).forEach(function (e) { e.remove(); });
      var id = $('.npu-id', info), row = $('.npc-idrow', info);
      if (id) {
        if (!row) { row = el('<div class="npc-idrow"></div>'); id.parentNode.insertBefore(row, id); row.appendChild(id); }
        var old = $('.npc-ud-acts', row); if (old) old.remove();
        var added = N.cmp.some(function (x) { return x.u === u; });
        var acts = el('<div class="npc-ud-acts" data-np-skip=""><button type="button" class="npc-share-btn" aria-label="' + esc(t('share')) + '"><svg viewBox="0 0 24 24">' + ICON.share + '</svg><span class="lbl">' + esc(t('share')) + '</span></button><button type="button" class="npc-cmp-btn' + (added ? ' on' : '') + '" aria-label="' + esc(t('compare')) + '"><svg viewBox="0 0 24 24">' + (added ? ICON.tick : ICON.plus) + '</svg><span class="lbl">' + esc(added ? t('added') : t('compare')) + '</span></button></div>');
        row.appendChild(acts);
        $('.npc-share-btn', acts).addEventListener('click', function () { shareUnit(u); });
        $('.npc-cmp-btn', acts).addEventListener('click', function () { N.addCompare(this); });
      }
      var lvl = BD[ofbCurrentBlock][String(currentFloor)].wings.reduce(function (a, w) { return a.concat(w.units); }, []), left = lvl.filter(green).length;
      var pill = $('.npu-pill', info);
      if (pill) {
        var wrap = $('.npc-pills', info); if (!wrap) { wrap = el('<div class="npc-pills"></div>'); pill.parentNode.insertBefore(wrap, pill); wrap.appendChild(pill); }
        if (lvl.length > 1) wrap.appendChild(el('<div class="npc-left-pill" data-np-skip="">' + esc(left === lvl.length ? t('allOpen', { n: left }) : t('left', { a: left, b: lvl.length })) + '</div>'));
      }
      var box2 = el('<div class="npc-ud" data-np-skip="">' + (priced(u) ? '<div class="npc-loan"><div class="npc-loan-l"><div class="npc-loan-t">' + esc(t('loanT')) + '</div><div class="npc-loan-s">' + esc(t('loanS')) + '</div></div><div class="npc-loan-v">' + rm(monthly(+u.price)) + '<small>' + esc(t('loanM')) + '</small></div></div>' : '') + '</div>');
      var rw = rewardRow(); if (rw) { rw.removeAttribute('data-np-skip'); box2.appendChild(rw); }
      var anchor = $('.npu-price', info), rooms = $('.npu-rooms', info);   // hidden prices have no price block: same place, above the rooms
      if (anchor) anchor.parentNode.insertBefore(box2, anchor.nextSibling); else if (rooms) rooms.parentNode.insertBefore(box2, rooms); else info.appendChild(box2);
      var bed = bedOf(u), room = $('.npu-room b', info); if (room && bed && (BROCHURE[slug] || {})[short(u.type)]) room.textContent = bed;
    }
    N.popup = paintPopup;
    var _open = openUnitInfo;
    window.openUnitInfo = function (no) {
      _open(no);
      try {
        paintPopup();
        var u = typeof currentUnit !== 'undefined' && currentUnit;
        if (!quiet && u && $('#unitInfoOverlay').classList.contains('open')) {
          var ty = short(u.type).slice(0, 40), b = band(+u.price);
          ev('unit_open', { unit_type: ty, price_band: b });
          if (typeof window.fbq === 'function') { var p = { content_category: 'e_enquiry' }, n = cfg('projectName'), i = cfg('projectId'); if (n) p.content_name = n.slice(0, 100); if (/^\d{1,6}$/.test(i)) p.project_id = i; if (ty) p.unit_type = ty; window.fbq('track', 'ViewContent', p); }
        }
      } catch (e) {}
    };
    repaint.push(paintPopup);

    /* compare any two units */
    N.addCompare = function (b) {
      var u = currentUnit; if (!u) return;
      var at = -1; N.cmp.forEach(function (x, i) { if (x.u === u) at = i; });
      if (at >= 0) N.cmp.splice(at, 1); else { if (N.cmp.length >= 2) N.cmp.shift(); N.cmp.push({ u: u, block: ofbCurrentBlock, level: currentFloor }); ev('unit_compare', { unit_type: short(u.type).slice(0, 40) }); }
      if (b) { var on = at < 0; b.classList.toggle('on', on); $('.lbl', b).textContent = on ? t('added') : t('compare'); $('svg', b).innerHTML = on ? ICON.tick : ICON.plus; }
      tray();
    };
    N.clearCompare = function () { N.cmp = []; tray(); };
    function nm(x) { return isLevelName(x) ? placeOf(x) + ' · ' + x.u.unitNo : x.u.unitNo; }
    function tray() {
      var o = $('.npc-tray'); if (o) o.remove(); D.documentElement.classList.toggle('npc-tray-on', !!N.cmp.length); if (!N.cmp.length) return;
      var x = el('<div class="npc-tray" data-np-skip=""><button type="button" class="npc-tray-x" aria-label="' + esc(t('clearCmp')) + '">×</button><div class="npc-tray-txt"><b>' + esc(t('cPicked', { n: N.cmp.length })) + '</b><span>' + (N.cmp.length < 2 ? esc(nm(N.cmp[0])) + '. ' + esc(t('cMore')) : N.cmp.map(function (c) { return esc(nm(c)); }).join('  vs  ')) + '</span></div><button type="button" class="npc-tray-go"' + (N.cmp.length < 2 ? ' disabled' : '') + '>' + esc(t('compare')) + '</button></div>');
      $('.npc-tray-x', x).addEventListener('click', N.clearCompare);
      $('.npc-tray-go', x).addEventListener('click', N.showCompare);
      D.body.appendChild(x);
    }
    repaint.push(tray);
    function goUnit(x) {   // take the buyer to this unit's form, whichever tower and level it is on
      var s = $('.npc-cmp'); if (s) s.remove();
      if (x.block !== ofbCurrentBlock) { var i = -1; $$('#booking .fp-block-btn').forEach(function (b, k) { if (blockOf(b) === x.block) i = k; }); if (i >= 0) $$('#booking .fp-block-btn')[i].click(); }
      if (active()) N.clear();
      quiet = true; selectFloor(x.level); openUnitInfo(x.u.unitNo); quiet = false;
      if (typeof window.openReservationForm === 'function') window.openReservationForm();
    }
    N.showCompare = function () {
      var o = $('.npc-cmp'); if (o) o.remove();
      var A = N.cmp[0], B = N.cmp[1]; if (!A || !B) return;
      var hasPrice = priced(A.u) && priced(B.u), towers = Object.keys(BD).length > 1;
      function psf(x) { return +x.u.price / +x.u.sqft; }
      function own(s) { return '<npc-o data-np-skip="">' + esc(s) + '</npc-o>'; }
      function site(s) { return '<npc-w>' + esc(s) + '</npc-w>'; }
      function head(x) { return isLevelName(x) ? t('cLvlUnit', { l: placeOf(x), u: x.u.unitNo }) : t('cUnit', { u: x.u.unitNo }); }
      function col(x) { var img = getUnitFloorPlanImage(x.u); return '<div class="npc-cmp-col"><div class="npc-cmp-plan">' + (img ? '<img src="' + esc(img) + '" alt="' + esc(short(x.u.type)) + '">' : '') + '</div><div class="npc-cmp-id">' + own(head(x)) + '<span>' + site(short(x.u.type)) + (x.u.position ? ' · ' + site(x.u.position) : '') + '</span></div>' + (hasPrice ? '<div class="npc-cmp-price" data-np-skip="">' + rm(+x.u.price) + '</div>' : '') + '</div>'; }
      function row(lbl, f, isSite) { var a = f(A), b = f(B); if (!a && !b) return ''; function cell(v) { return '<div><small>' + own(lbl) + '</small>' + (isSite ? site(v || '-') : own(v || '-')) + '</div>'; } return '<div class="npc-cmp-r">' + cell(a) + cell(b) + '</div>'; }
      var dp = Math.abs(+A.u.price - +B.u.price), ds = Math.abs((+A.u.sqft || 0) - (+B.u.sqft || 0));
      var gap = [hasPrice && dp ? t('cApart', { p: rm(dp) }) : '', ds ? t('cSqApart', { n: ds.toLocaleString('en-MY') }) : ''].filter(Boolean).join(t('cSep'));
      var s = el('<div class="npc-cmp"><div class="npc-cmp-sheet"><div class="npc-cmp-head"><h3 data-np-skip="">' + esc(t('cTitle')) + '</h3><button type="button" class="npc-cmp-x" aria-label="×">×</button></div>' + (gap ? '<div class="npc-cmp-sub" data-np-skip="">' + esc(gap + t('cStop')) + '</div>' : '') + '<div class="npc-cmp-grid">' + col(A) + col(B) + '</div><div class="npc-cmp-rows">'
        + row(t('cBuilt'), function (x) { return +x.u.sqft ? t('sqft', { n: (+x.u.sqft).toLocaleString('en-MY') }) : ''; })
        + (hasPrice && +A.u.sqft && +B.u.sqft ? row(t('cPsf'), function (x) { return 'RM' + Math.round(psf(x)); }) : '')
        + (hasPrice ? row(t('loanT'), function (x) { return rm(monthly(+x.u.price)); }) : '')
        + row(t('cBed'), function (x) { return bedOf(x.u); })
        + row(t('cBath'), function (x) { return +x.u.bathrooms ? String(x.u.bathrooms) : ''; })
        + row(t('cWhere'), function (x) { return (towers ? towerName(x.block) + ' · ' : '') + placeOf(x); })
        + row(t('cFace'), function (x) { return x.u.viewType || x.u.face || ''; }, true)
        + row(t('cPos'), function (x) { return x.u.position || ''; }, true)
        + '</div>' + (hasPrice ? '<div class="npc-cmp-note" data-np-skip="">' + esc(t('cNote')) + '</div>' : '') + '<div class="npc-cmp-cta" data-np-skip=""><button type="button" class="a">' + esc(t('cEnq', { u: A.u.unitNo })) + '</button><button type="button" class="b">' + esc(t('cEnq', { u: B.u.unitNo })) + '</button></div></div></div>');
      $('.npc-cmp-x', s).addEventListener('click', function () { s.remove(); });
      s.addEventListener('click', function (e) { if (e.target === s) s.remove(); });
      function esc2(e) { if (e.key === 'Escape') { s.remove(); D.removeEventListener('keydown', esc2); } }
      D.addEventListener('keydown', esc2);
      $('.npc-cmp-cta .a', s).addEventListener('click', function () { goUnit(A); });
      $('.npc-cmp-cta .b', s).addEventListener('click', function () { goUnit(B); });
      D.body.appendChild(s);
    };

    /* the forms: plain name hint; the incentive pictures above Submit */
    function namePlaceholders() { ['rfName', 'srName'].forEach(function (i) { var f = D.getElementById(i); if (f) { f.setAttribute('data-np-skip', ''); f.placeholder = t('name'); } }); }
    namePlaceholders(); repaint.push(namePlaceholders);
    function paintForm() {
      var f = $('#reservationOverlay'), go = f && $('#ebookingForm .ofb-modal-cta'); if (!go) return;
      var o = $('.npc-rw', f); if (o) o.remove();
      var r = rewardRow(); if (r) go.parentNode.insertBefore(r, go);
      namePlaceholders();
    }
    if (typeof window.openReservationForm === 'function') {
      var _rf = openReservationForm;
      window.openReservationForm = function () { _rf.apply(this, arguments); try { paintForm(); var u = typeof currentUnit !== 'undefined' && currentUnit; ev('form_open', { unit_type: u ? short(u.type).slice(0, 40) : '' }); } catch (e) {} };
      repaint.push(function () { if ($('#reservationOverlay.open')) paintForm(); });
    }
    // the site's form stops on the first problem with an alert: count which field it was (its name only, never what was typed)
    if (typeof window.submitReservation === 'function') {
      var _sub = submitReservation;
      window.submitReservation = function () {
        try {
          var v = function (i) { var f = D.getElementById(i); return f ? f.value.trim() : ''; }, c = function (i) { var f = D.getElementById(i); return !!(f && f.checked); };
          var why = !v('rfName') ? 'name' : !v('rfPhone') ? 'phone' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('rfEmail')) ? 'email' : !c('rfAck') ? 'acknowledge' : !c('rfConsent') ? 'consent' : '';
          if (why) ev('form_error', { field: why });
        } catch (e) {}
        return _sub.apply(this, arguments);
      };
    }
    // and the server saying no
    var notice = $('#ebookingnoticeDiv'), lastErr = 0;
    if (notice) new MutationObserver(function () { if (notice.classList.contains('errormsg') && Date.now() - lastErr > 2000) { lastErr = Date.now(); ev('form_error', { field: 'server' }); } }).observe(notice, { attributes: true, attributeFilter: ['class'] });

    /* tracking: the buyer reached the units */
    var seenEl = $('.ofb-floors-card');
    if (seenEl && 'IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); ev('units_seen', {}); } }); io.observe(seenEl); }

    /* a shared link opens that unit; the listing bar lands on the units */
    var q = /[?&]u=([^&#]+)/.exec(location.search);
    if (q) {
      var raw = ''; try { raw = decodeURIComponent(q[1]); } catch (e) {}   // a broken link is simply ignored
      var parts = raw.split('~'), bk = parts[0], l = parts[1], no = parts.slice(2).join('~');
      // a link only ever picks from the page's own list: its words are compared with the list and never put on the page
      var own = Object.prototype.hasOwnProperty;
      if (own.call(BD, bk) && own.call(BD[bk], l)) {
        if (bk !== ofbCurrentBlock) $$('#booking .fp-block-btn').forEach(function (b) { if (blockOf(b) === bk) b.click(); });
        quiet = true; selectFloor(l); quiet = false;
        if (BD[bk][l].wings.some(function (w) { return w.units.some(function (u) { return u.unitNo === no && green(u); }); })) setTimeout(function () { openUnitInfo(no); }, 120);
      }
    } else if (location.hash === '#units') setTimeout(toUnits, 250);
    onLang();
  }

  /* the site's own functions and unit list must exist, and have drawn once, before we touch anything */
  var tries = 0, started = false;
  function ready() {
    if (started) return;
    if (isList) { started = true; try { listing(); } catch (e) {} return; }
    var ok = false;
    try { ok = typeof BD !== 'undefined' && typeof ofbCurrentBlock !== 'undefined' && !!ofbCurrentBlock && !!$('#ofbFloorList') && ['availabilityBadge', 'unitMatchesFilter', 'renderFloorList', 'renderWings', 'setUnitTypePreference', 'selectFloor', 'openUnitInfo', 'allProjectUnits', 'allUnitsForBlock', 'floorAvailableCount', 'towerLabel', 'levelWord', 'getUnitFloorPlanImage', 'scrollToSection'].every(function (f) { return typeof window[f] === 'function'; }) && $('#ofbFloorList').children.length > 0; } catch (e) {}
    if (ok) { started = true; try { enquiry(); } catch (e) { D.documentElement.classList.remove('npc-f-on', 'npc-slim', 'npc-in-units'); } return; }
    if (++tries < 200) setTimeout(ready, 50);
  }
  if (D.readyState === 'complete') ready(); else D.addEventListener('DOMContentLoaded', ready);
})();
