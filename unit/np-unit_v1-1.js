/*
 * iNewProject e-Enquiry unit popup ("Step 1 of 2"): a new left side (v1, 28 Oct 2026; v1.1, 28 Oct 2026: the steps line,
 *   its numbers and the availability pill at 14 px like all reading text; narrow phones show "1 Unit details of 2";
 *   a layout written as "null" in the admin counts as empty).
 *   The chosen design (option A, "Guided split"): the left side reads top to bottom: the two steps, the unit (number,
 *   position + level, availability), the unit price, the rooms (one ruled row), the details (layout, facing, view, row),
 *   then the button. The floor plan on the right stays the site's own; it only gets sized so it always fits.
 *   Fixes, on every e-Enquiry page, automatically:
 *     · the floor plan always fits inside the screen; "Click to enlarge" kept
 *     · no price shown when the unit's price is 0 or blank (also in Step 2 and the on-page receipt): never "RM 0"
 *     · only facts that have a value (no "—")
 *     · the level once, with the right word ("Level 28", "First Floor"); no "Unit on level"
 *     · the facing word once (taken out of the view when the view repeats it)
 *     · built-up always shown (today it sits in the price line and goes when the price is hidden)
 *     · phones and tablets: the button stays at the bottom of the popup
 *
 * A layer on top of the site's popup, loaded from the admin Header Scripts box:
 *   window.NP_UNIT_LIVE = true   → visitors see it. Leave it out (or false) for the hidden test.
 *   ?np_unit_preview=1           → this browser sees it while hidden (remembered; ?np_unit_preview=0 turns it off).
 *
 * Do no harm: the site still fills its own popup first; this layer then draws the left side from the same unit data and
 * hides the site's left column. If anything is missing or throws, the layer steps aside and the site's popup shows as
 * before. Labels carry their own EN / BM / 中文; the unit's own words (layout, position ...) go through the site's
 * language switcher exactly as today.
 */
(function () {
  'use strict';
  var D = document, KEY = 'np_unit_preview', on = window.NP_UNIT_LIVE === true;
  try {
    var pv = /[?&]np_unit_preview=([01])/.exec(location.search);
    if (pv) { if (pv[1] === '1') localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); }
    if (localStorage.getItem(KEY) === '1') on = true;
  } catch (e) {}
  if (!on || window.NP_UNIT_LIVE === false || window.__npunit) return;
  window.__npunit = 1;   // the block pasted twice still runs once
  if (!/^\/project\/[^\/]+\/e-enquiry\/?$/.test(location.pathname)) return;

  // Our own words: [EN, BM, 中文]. The site's dictionary and glossary wording where it has one.
  var T = {
    step1: ['Unit details', 'Butiran unit', '单位详情'],
    step2: ['Your details', 'Butiran anda', '您的资料'],
    of2: ['of 2', 'daripada 2', '（共 2 步）'],
    sel: ['Selected unit', 'Unit dipilih', '所选单位'],
    avail: ['Available to enquire', 'Terbuka untuk pertanyaan', '可咨询'],
    level: ['Level {n}', 'Tingkat {n}', '第 {n} 层'],
    price: ['Unit price', 'Harga unit', '单位价格'],
    psf: ['RM {n} per sq ft', 'RM {n} sekaki persegi', '每平方尺 RM {n}'],
    bu: ['{n} sq ft built-up', 'Keluasan binaan {n} kaki persegi', '建筑面积 {n} 平方尺'],
    sqft: ['{n} sq ft', '{n} kaki persegi', '{n} 平方尺'],
    bed: ['Bedrooms', 'Bilik tidur', '卧室'], bed1: ['Bedroom', 'Bilik tidur', '卧室'],
    bath: ['Bathrooms', 'Bilik air', '浴室'], bath1: ['Bathroom', 'Bilik air', '浴室'],
    car: ['Car parks', 'Petak letak kereta', '停车位'], car1: ['Car park', 'Petak letak kereta', '停车位'],
    layout: ['Layout', 'Susun atur', '格局'],
    facing: ['Facing', 'Arah menghadap', '朝向'],
    view: ['View', 'Pemandangan', '景观'],
    size: ['Built-up', 'Keluasan binaan', '建筑面积'],
    row: ['Row', 'Baris', '排'], block: ['Block', 'Blok', '楼座'], tower: ['Tower', 'Menara', '楼座'], phase: ['Phase', 'Fasa', '期数'],
    lots: ['Lots', 'Lot', '地段'],
    raw: ['{n}', '{n}', '{n}'],   // a value of the unit's own (a row's name and numbers): only "Lots" is translated
    dir: ['', '', ''],            // a compass word (from DIR)
    cta: ['Enquire about this unit', 'Tanya tentang unit ini', '咨询此单位'],
    note: ['No payment needed. It’s an enquiry only.', 'Tiada bayaran diperlukan. Ini pertanyaan sahaja.', '无需付款，仅为询问。']
  };
  var DIR = {   // compass words: [EN, BM, 中文]
    'north': ['North', 'Utara', '北'], 'south': ['South', 'Selatan', '南'], 'east': ['East', 'Timur', '东'], 'west': ['West', 'Barat', '西'],
    'north-east': ['North-east', 'Timur laut', '东北'], 'north-west': ['North-west', 'Barat laut', '西北'],
    'south-east': ['South-east', 'Tenggara', '东南'], 'south-west': ['South-west', 'Barat daya', '西南']
  };
  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }

  var ICON = {   // quiet line icons, grey (red is kept for the selection and the button)
    bed: '<path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 15h18M7 9V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/>',
    bath: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2zM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2"/>',
    car: '<path d="M5 17v-5l1.8-4.5A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.5L19 12v5M5 17h14M5 17v2M19 17v2M5 12h14"/><circle cx="8.5" cy="14.5" r=".6"/><circle cx="15.5" cy="14.5" r=".6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };

  // Sizes are CSS px × --k: laptops run the site at 90% zoom, so --k = 1/0.9 keeps the same size on screen
  // (reading text ≥ 14 px, small caps ≥ 12 px). The right side keeps the site's own look; only its sizing changes.
  var CSS = [
    '#unitInfoOverlay.npu-on{--k:1;--ink:#1F2421;--mute:#666D69;--line:#E2E4E0}',
    '#unitInfoOverlay.npu-on .unit-detail-info{display:none!important}',
    // the site animates every change on every element (body *{transition:all .3s}); inside our popup sizes land at once
    '#unitInfoOverlay.npu-on,#unitInfoOverlay.npu-on *{transition:none}',
    // laptop: the left side sets the height (never more than the window); the plan fills the rest of its column
    '#unitInfoOverlay.npu-on .unit-detail-modal{height:auto;min-height:min(100%,calc(560px*var(--k)));max-height:100%;overflow:hidden;display:flex}',
    '#unitInfoOverlay.npu-on .unit-detail-grid{flex:1;min-width:0;min-height:0;height:auto;grid-template-rows:minmax(0,1fr) auto;grid-template-areas:"info plan" "foot plan"}',
    '#unitInfoOverlay.npu-on.npu-noplan .unit-detail-modal{max-width:calc(520px*var(--k));min-height:0}',
    '#unitInfoOverlay.npu-on.npu-noplan .unit-detail-grid{grid-template-columns:minmax(0,1fr);grid-template-areas:"info" "foot"}',
    '#unitInfoOverlay.npu-on.npu-noplan .unit-detail-plan{display:none}',
    '#unitInfoOverlay.npu-on .unit-detail-plan{grid-area:plan;contain:size;min-height:0;min-width:0}',
    '#unitInfoOverlay.npu-on .unit-plan-frame{flex:1 1 0;min-height:0;max-height:none}',
    '#unitInfoOverlay.npu-on .unit-plan-frame img{max-width:100%;max-height:100%}',
    // the left side
    '.npu-info{grid-area:info;min-height:0;overflow-y:auto;padding:calc(26px*var(--k)) calc(30px*var(--k)) calc(14px*var(--k));color:var(--ink);font-family:inherit;line-height:1.45;text-align:left}',
    '.npu-steps{display:flex;align-items:center;gap:calc(10px*var(--k));list-style:none;margin:0;padding:0;font-size:calc(14px*var(--k));color:#80867F;white-space:nowrap}',
    '.npu-steps li{display:flex;align-items:center;gap:calc(7px*var(--k))}',
    '.npu-steps b{display:grid;place-items:center;width:calc(24px*var(--k));height:calc(24px*var(--k));border-radius:50%;border:1px solid var(--line);font-size:calc(14px*var(--k));font-weight:600;line-height:1}',
    '.npu-of{display:none;font-weight:400;color:#80867F}',
    '.npu-steps .npu-now{color:var(--ink);font-weight:600}',
    '.npu-steps .npu-now b{background:#D0021B;border-color:#D0021B;color:#fff}',
    '.npu-steps i{width:calc(14px*var(--k));height:1px;background:#C4C8C2}',
    '.npu-eyebrow{margin-top:calc(26px*var(--k));font-size:calc(12px*var(--k));font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:#D0021B}',
    '.npu-id{margin-top:calc(4px*var(--k));font-size:calc(38px*var(--k));font-weight:600;letter-spacing:-.04em;line-height:1.15;color:var(--ink);overflow-wrap:anywhere}',
    '.npu-desc{margin-top:calc(6px*var(--k));font-size:calc(15px*var(--k));color:var(--mute)}',
    '.npu-sep{margin:0 .5em;color:#AEB3AD}',
    '.npu-pill{display:inline-flex;align-items:center;gap:calc(7px*var(--k));margin-top:calc(12px*var(--k));padding:calc(5px*var(--k)) calc(10px*var(--k));border-radius:calc(5px*var(--k));background:#ECF5EC;color:#167145;font-size:calc(14px*var(--k));font-weight:600;line-height:1.3}',
    '.npu-pill i{width:calc(7px*var(--k));height:calc(7px*var(--k));border-radius:50%;background:#167145}',
    '.npu-price{margin-top:calc(24px*var(--k))}',
    '.npu-plbl{font-size:calc(12px*var(--k));font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}',
    '.npu-amt{margin-top:calc(2px*var(--k));font-size:calc(34px*var(--k));font-weight:600;letter-spacing:-.04em;line-height:1.25;color:var(--ink);font-variant-numeric:tabular-nums}',
    '.npu-amt small{font-size:calc(19px*var(--k));font-weight:500;letter-spacing:-.01em;margin-right:calc(5px*var(--k))}',
    '.npu-psub{margin-top:calc(4px*var(--k));font-size:calc(14px*var(--k));color:var(--mute)}',
    '.npu-rooms{display:flex;gap:calc(10px*var(--k));margin-top:calc(22px*var(--k));padding:calc(15px*var(--k)) 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}',
    '.npu-room{flex:1;min-width:0;display:grid;grid-template-columns:calc(22px*var(--k)) minmax(0,1fr);column-gap:calc(9px*var(--k));align-items:start;align-content:start}',   // numbers and labels each on one line even when a label wraps (BM)
    '.npu-room svg{grid-row:1/3;margin-top:calc(1px*var(--k));width:calc(22px*var(--k));height:calc(22px*var(--k));fill:none;stroke:#6F7870;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
    '.npu-room b{font-size:calc(19px*var(--k));font-weight:600;line-height:1.15;color:var(--ink)}',
    '.npu-room>span{font-size:calc(14px*var(--k));line-height:1.2;color:var(--mute);overflow-wrap:break-word}',
    '.npu-specs{margin:calc(14px*var(--k)) 0 0;padding:0}',
    '.npu-specs>div{display:flex;justify-content:space-between;align-items:baseline;gap:calc(18px*var(--k));padding:calc(8px*var(--k)) 0}',
    '.npu-specs dt{flex:none;font-size:calc(15px*var(--k));color:var(--mute);font-weight:400}',
    '.npu-specs dd{margin:0;min-width:0;font-size:calc(15px*var(--k));font-weight:600;color:var(--ink);text-align:right;overflow-wrap:break-word}',
    // the button, at the foot of the left side
    '.npu-foot{grid-area:foot;padding:calc(16px*var(--k)) calc(30px*var(--k)) calc(18px*var(--k));border-top:1px solid var(--line);background:#fff}',
    '.npu-cta{display:flex;align-items:center;justify-content:space-between;gap:calc(16px*var(--k));width:100%;min-height:calc(52px*var(--k));padding:calc(12px*var(--k)) calc(20px*var(--k));border:0;border-radius:calc(8px*var(--k));background:#D0021B;color:#fff;font-family:inherit;font-size:calc(16px*var(--k));font-weight:600;line-height:1.25;text-align:left;cursor:pointer}',
    '#unitInfoOverlay.npu-on .npu-cta{transition:background .15s}',
    '.npu-cta:hover{background:#A80016}',
    '.npu-cta svg{flex:none;width:calc(20px*var(--k));height:calc(20px*var(--k));fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.npu-note{margin-top:calc(9px*var(--k));font-size:calc(14px*var(--k));color:var(--mute);text-align:center}',
    'html[data-np-lang="zh"] .npu-eyebrow,html[data-np-lang="zh"] .npu-plbl{letter-spacing:.04em}',
    // phones + tablets under 900 px (the site's own switch to one column): the plan sized to the screen, the button
    // stays at the bottom while scrolling
    '@media (max-width:899px){',
    ' #unitInfoOverlay.npu-on .unit-detail-modal{height:100%;min-height:0;max-height:100%;overflow-y:auto;display:block}',
    ' #unitInfoOverlay.npu-on.npu-noplan .unit-detail-modal{height:auto}',
    ' #unitInfoOverlay.npu-on .unit-detail-grid{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:auto auto 1fr;grid-template-areas:"info" "plan" "foot";min-height:100%}',
    ' .npu-info{overflow:visible;padding:20px 20px 22px}',
    ' .npu-steps{padding-right:44px}',
    ' .npu-eyebrow{margin-top:20px}',
    ' .npu-id{font-size:32px}',
    ' .npu-amt{font-size:30px}',
    ' #unitInfoOverlay.npu-on .unit-detail-plan{contain:none;align-self:start}',
    ' #unitInfoOverlay.npu-on .unit-plan-frame{flex:none;width:100%;min-height:0;aspect-ratio:var(--npu-ar,3/4);max-height:62vh;max-height:62svh}',
    ' .npu-foot{position:sticky;bottom:0;z-index:5;align-self:end;padding:12px 20px 14px;box-shadow:0 -6px 16px rgba(0,0,0,.05)}',
    '}',
    // narrow phones: one step label, "1 Unit details of 2" (BM is longer)
    '@media (max-width:480px){',
    ' .npu-steps>i,.npu-steps>li~li{display:none}',
    ' .npu-of{display:inline}',
    '}'
  ].join('\n');

  var ov, grid, plan, img, info, foot, made = false;

  function el(tag, cls) { var e = D.createElement(tag); if (cls) e.className = cls; return e; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function num(n) { return Number(n).toLocaleString('en-MY'); }
  // A fixed word of ours, written in the visitor's language. It sits in its own tag with data-np-skip (a tag the switcher
  // never treats as part of a sentence), and a language change only rewrites its text in place, so the switcher never
  // reads our BM / 中文 as new English.
  function txt(k, v, L) {
    var s = T[k][L];
    if (v) {
      s = s.replace(/\{(\w)\}/g, function (m, x) { return v[x]; });
      if (v.lots) s = s.replace(/\bLots\b/g, T.lots[L]);   // "RB1 · Lots 2–56" → "RB1 · Lot 2–56" / "RB1 · 地段 2–56"
      if (v.dir) s = DIR[v.dir][L];
    }
    return s;
  }
  function own(k, vars) {
    return '<npu-o data-np-skip data-npu-t="' + k + '"' + (vars ? ' data-npu-v="' + esc(JSON.stringify(vars)) + '"' : '') + '>' + esc(txt(k, vars, lang())) + '</npu-o>';
  }
  // the unit's own words: plain English, translated by the site's switcher as today (own element, so each piece is its own key)
  function val(s) { return '<npu-w>' + esc(s) + '</npu-w>'; }
  function paint(root) {
    var L = lang();
    Array.prototype.forEach.call(root.querySelectorAll('[data-npu-t]'), function (e) {
      var v = e.getAttribute('data-npu-v'), s = txt(e.getAttribute('data-npu-t'), v ? JSON.parse(v) : null, L);
      if (e.childNodes.length === 1 && e.firstChild.nodeType === 3) { if (e.firstChild.nodeValue !== s) e.firstChild.nodeValue = s; }
      else e.textContent = s;
    });
  }
  // empty, 0, a dash, or the words null / undefined (two listings carry the word "null" as a layout)
  function filled(v) { if (v == null) return ''; v = String(v).trim(); return /^(0|-|—|–|n\/?a|null|undefined)?$/i.test(v) ? '' : v; }
  function rx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function render() {
    /* globals from the site's own script: currentUnit, ofbCurrentBlock, currentFloor, towerLabel */
    var u = currentUnit;
    if (!u || typeof towerLabel !== 'function') throw new Error('no unit');
    var unitNo = D.getElementById('uiId').textContent.replace(/\s+/g, ' ').trim() || String(u.unitNo);
    var price = Number(u.price) > 0 ? Number(u.price) : 0, sqft = Number(u.sqft) > 0 ? Number(u.sqft) : 0;

    // position · level ("Level 28" for a code like 28 / 23A / G; a name like "First Floor" as it is)
    var fl = filled(currentFloor), desc = [val(filled(u.position) || 'Intermediate')];   // the site's own default
    if (fl) desc.push(/^([0-9]{1,3}[A-Za-z]?|[A-Za-z]{1,2}[0-9]{0,2})$/.test(fl) ? own('level', { n: fl }) : val(fl));

    // rooms: only the ones with a value
    var rooms = [];
    [['bed', u.bedrooms], ['bath', u.bathrooms], ['car', u.carpark]].forEach(function (c) {
      var v = filled(c[1]);
      if (v) rooms.push('<div class="npu-room"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[c[0]] + '</svg><b>' +
        (/[A-Za-z]/.test(v) ? val(v) : esc(v)) + '</b><span>' + own(v === '1' ? c[0] + '1' : c[0]) + '</span></div>');
    });

    // details: layout, facing, view (without the facing again), row / block, built-up when there is no price line
    var specs = [], lay = filled(u.type), face = filled(u.face), vt = filled(u.viewType);
    if (lay) specs.push(['layout', val(lay)]);
    var dir = face && DIR[face.toLowerCase()] ? face.toLowerCase() : null;
    if (face) specs.push(['facing', dir ? own('dir', { dir: dir }) : val(face)]);
    if (vt && face) {
      var f = rx(face);
      // "East-facing · Jalan …", "West · Faces Parcel 2", "West Facing", "Batu Caves View (North)": the facing word goes;
      // a name that only starts with it ("North Row (Jalan Haruan 5/8)") stays
      vt = vt.replace(new RegExp('^\\s*' + f + '([- ]facing)?\\s*[·|,-]\\s*', 'i'), '')
             .replace(new RegExp('\\s*\\(\\s*' + f + '\\s*\\)\\s*$', 'i'), '')
             .replace(new RegExp('^\\s*' + f + '([- ]facing)?\\s*$', 'i'), '').trim();
    }
    if (vt) specs.push(['view', val(vt)]);
    // "Row RB1 · Lots 2–56" → Row: RB1 · Lots 2–56 · "Block A" → Block: A · "Row 1 · Lots 1–23" stays whole (a bare number reads oddly)
    var blk = filled(towerLabel(ofbCurrentBlock)), bm = /^(Row|Block|Tower|Phase)\s+([A-Za-z].*)$/i.exec(blk), bw = /^(Row|Block|Tower|Phase)\b/i.exec(blk);
    if (blk) specs.push(bm ? [bm[1].toLowerCase(), own('raw', { n: bm[2], lots: 1 })] : [bw ? bw[1].toLowerCase() : 'block', val(blk)]);
    if (sqft && !price) specs.push(['size', own('sqft', { n: num(sqft) })]);

    info.innerHTML =
      '<ol class="npu-steps"><li class="npu-now"><b>1</b>' + own('step1') + '<span class="npu-of">' + own('of2') + '</span></li><i></i><li><b>2</b>' + own('step2') + '</li></ol>' +
      '<div class="npu-eyebrow">' + own('sel') + '</div>' +
      '<div class="npu-id" data-np-skip translate="no">' + esc(unitNo) + '</div>' +
      '<div class="npu-desc">' + desc.join('<span class="npu-sep">·</span>') + '</div>' +
      '<div class="npu-pill"><i></i>' + own('avail') + '</div>' +
      (price ? '<div class="npu-price"><div class="npu-plbl">' + own('price') + '</div><div class="npu-amt" data-np-skip><small>RM</small>' + num(price) + '</div>' +
        '<div class="npu-psub">' + (sqft ? own('psf', { n: num(Math.round(price / sqft)) }) + '<span class="npu-sep">·</span>' + own('bu', { n: num(sqft) }) : '') + '</div></div>' : '') +
      (rooms.length ? '<div class="npu-rooms">' + rooms.join('') + '</div>' : '') +
      '<dl class="npu-specs">' + specs.map(function (s) { return '<div><dt>' + own(s[0]) + '</dt><dd>' + s[1] + '</dd></div>'; }).join('') + '</dl>';
    foot.innerHTML = '<button type="button" class="npu-cta">' + own('cta') + '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON.arrow + '</svg></button>' +
      '<div class="npu-note">' + own('note') + '</div>';

    var hasPlan = !!(img.getAttribute('src') && img.style.display !== 'none');
    ov.classList.toggle('npu-noplan', !hasPlan);
    var z = parseFloat(getComputedStyle(D.documentElement).zoom) || 1;
    ov.style.setProperty('--k', String(Math.round(1 / z * 10000) / 10000));
    ov.classList.add('npu-on');
    info.scrollTop = 0;
    var m = ov.querySelector('.unit-detail-modal'); if (m) m.scrollTop = 0;
    ratio();
  }
  // phones and tablets: the plan's box takes the drawing's own shape, up to 62% of the screen
  function ratio() {
    try {
      if (img.naturalWidth && img.naturalHeight) ov.style.setProperty('--npu-ar', img.naturalWidth + ' / ' + img.naturalHeight);
      else ov.style.removeProperty('--npu-ar');
    } catch (e) {}
  }

  function off() {
    try {
      if (ov) { ov.classList.remove('npu-on', 'npu-noplan'); ['--k', '--npu-ar'].forEach(function (p) { ov.style.removeProperty(p); }); }
      [info, foot].forEach(function (e) { if (e && e.parentNode) e.parentNode.removeChild(e); });
      made = false;
    } catch (e) {}
  }

  // "RM 0" never shows in Step 2 or on the on-page receipt either
  function hideZeroPrice() {
    try {
      var u = currentUnit, rf = D.getElementById('rfPriceSummary');
      if (rf) rf.style.display = u && Number(u.price) > 0 ? '' : 'none';
    } catch (e) {}
  }
  function hideZeroReceipt() {
    try {
      var rp = D.getElementById('receiptPrice'), row = rp && rp.closest('.receipt-detail'), t = rp ? rp.textContent.trim() : '';
      if (row) row.style.display = /^RM\s*0(\.0+)?$/.test(t) || t === '-' ? 'none' : '';
    } catch (e) {}
  }

  function wrap(name, after) {
    var f = window[name];
    if (typeof f !== 'function' || f.__npu) return false;
    var w = function () { var r = f.apply(this, arguments); after(); return r; };
    w.__npu = 1; window[name] = w; return true;
  }

  function start() {
    ov = D.getElementById('unitInfoOverlay');
    grid = ov && ov.querySelector('.unit-detail-modal .unit-detail-grid');
    plan = grid && grid.querySelector('.unit-detail-plan');
    img = D.getElementById('unitPlanImg');
    var siteInfo = grid && grid.querySelector('.unit-detail-info'), siteCta = siteInfo && siteInfo.querySelector('.ofb-modal-cta');
    // only on the popup we know: its two columns, the plan picture, the site's button, the unit number and the functions
    if (!grid || !plan || !img || !siteInfo || !siteCta || !D.getElementById('uiId') ||
        typeof window.openUnitInfo !== 'function' || typeof window.openReservationForm !== 'function') return;
    var st = el('style'); st.id = 'npu-css'; st.textContent = CSS; D.head.appendChild(st);
    info = el('div', 'npu-info'); foot = el('div', 'npu-foot');
    foot.addEventListener('click', function (e) { if (e.target.closest('.npu-cta')) siteCta.click(); });
    img.addEventListener('load', ratio);
    wrap('openUnitInfo', function () {
      try {
        if (!ov.classList.contains('open')) return;   // the site found no such unit and opened nothing
        if (!made) { grid.insertBefore(info, plan); grid.appendChild(foot); made = true; }
        render();
      } catch (e) { off(); }
    });
    wrap('openReservationForm', hideZeroPrice);
    wrap('showEnquiryReceipt', hideZeroReceipt);
    // the visitor switches language with the popup open: our words follow
    new MutationObserver(function () { if (made) { paint(info); paint(foot); } })
      .observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  function safeStart() { try { start(); } catch (e) { off(); } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
