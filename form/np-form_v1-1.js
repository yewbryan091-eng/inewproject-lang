/*
 * v1-1 (22 Nov 2026) = v1 with the reward shown once, calmly (owner's call):
 *   - Step 1: the full incentive block (pictures + amount + SPA line above the loan box) is gone, and so is the site's own
 *     reward card there; ONE quiet line just above "Enquire about this unit": "e-Enquiry reward worth RM 9,499 · T&C apply"
 *     (T&C opens the terms). Different amounts per option -> "e-Enquiry reward · T&C apply". No reward bands -> no line.
 *   - Step 2 (design B, owner's pick; the site's reward standard): the red "e-ENQUIRY EXCLUSIVE" ribbon on the right, flush
 *     with the card's edge (as in the listing page's e-Enquiry column), then one white tile per option side by side
 *     (picture, short name, a small second line from the reward's own title: "(256GB)" -> "256GB", "... eWallet Credit" ->
 *     "eWallet credit"; a 4+ word name splits after word 2: "Dyson V12" / "Detect Slim Absolute"; then "Worth RM 9,499"),
 *     "OR" between them, then "Your choice of one, once the SPA is signed. T&C" (2 options; else "Yours once the SPA is
 *     signed. T&C"). No "e-Enquiry reward" label, no "Added to your e-Enquiry" (the buyer has not qualified yet); the sub
 *     line no longer says "Incentive added".
 * iNewProject e-Enquiry form v1 (21 Nov 2026): steps 1 and 2 of the unit popup, redesigned to get more e-Enquiries.
 * A layer on top of the unit popup (unit/np-unit_v1-13.js) and the conversion layer (conv/np-conv_v1-12.js): load it AFTER both.
 * It only reshapes what they drew; if anything is missing or throws, it steps aside and the popup shows exactly as before.
 *
 * Step 1 (unit details):
 *   - "Available" moves onto the unit line ("Intermediate · Level 13 · ● Available"); the level pill reads
 *     "On this level: Only 6 of 16 left" (same count as before, from the developer's unit chart).
 *   - "Good to know": shown ONLY when it is true, from the page's own unit list: this unit is the single cheapest open unit of
 *     its layout (3+ open, no tie): "Lowest price among the 76 open 2+1 bedroom units."
 *   - the incentive as a receipt line ("With your e-Enquiry", the reward pictures, amount, options, SPA line), above the loan box;
 *     the small reward band above the button on phones goes (it repeated the same line).
 *   - under the button: "Free. No payment. Next: tell us where to send your e-Enquiry receipt. About 1 minute." (no "booking").
 * Step 2 (details):
 *   - the unit card becomes the e-Enquiry receipt: YOUR e-ENQUIRY + a counter ("4 details to go" grey -> "✓ Complete" green),
 *     project, unit + level, layout + size, price, the same level line as step 1, a tear line, and the incentive stub
 *     ("✓ Added to your e-Enquiry"). Headings follow the counter: ready / almost done / your incentive awaits.
 *   - one tick box (enquiry only + Privacy Notice) instead of two; it ticks both of the site's boxes, so the site's checks pass.
 *   - under Phone: "Only the developer's sales representative will contact you."
 *   - the Submit bar stays at the bottom of the screen (outside the form, so it sticks even when the form starts low).
 *   - a missing field gets a kind line under it and the field comes into view, instead of a pop-up; the site's own
 *     checks and messages still run (server replies keep their pop-up).
 *   - short phones: a tighter receipt so the first field shows above the Submit bar on landing (375x667, 360x640, 320x568).
 * Numbers only from the page (unit chart, the project's reward bands); nothing invented. No timers, no "people viewing".
 * Words: EN / BM / 中文, following the site's language switcher. The incentive amount and options are each project's own.
 */
(function () {
  'use strict';
  var D = document;
  if (window.NP_FORM_LIVE === false || window.__npform) return;
  window.__npform = 1;
  if (!/^\/project\/[^\/]+\/e-enquiry\/?$/.test(location.pathname)) return;

  var T = {
    // step 1
    lvlLeft: ['On this level: Only {a} of {b} left', 'Di tingkat ini: Tinggal {a} daripada {b}', '本层：仅剩 {a} 个（共 {b} 个）'],
    avail: ['Available', 'Tersedia', '可咨询'],
    gkL: ['Good to know', 'Untuk makluman', '值得留意'],
    gkBed: ['Lowest price among the {n} open {b} bedroom units.', 'Harga terendah antara {n} unit {b} bilik tidur yang masih dibuka.', '在 {n} 个仍开放的 {b} 房单位中价格最低。'],
    gkType: ['Lowest price among the {n} open {b} units.', 'Harga terendah antara {n} unit {b} yang masih dibuka.', '在 {n} 个仍开放的 {b} 单位中价格最低。'],
    note1: ['<b>Free. No payment.</b> Next: tell us where to send your e-⁠Enquiry receipt. About 1 minute.',
      '<b>Percuma. Tiada bayaran.</b> Seterusnya: butiran untuk resit e-⁠Enquiry anda. Kira-kira 1 minit.',
      '<b>免费，无需付款。</b>下一步：告诉我们您的 e-⁠Enquiry 收据发送到哪里。约 1 分钟。'],
    // the incentive (both steps)
    fine: ['Yours once the SPA is signed. <u>T&amp;C</u>', 'Milik anda selepas SPA ditandatangani. <u>T&amp;S</u>', '签署 SPA 后即可获得。<u>条款</u>'],
    rw1: ['e-⁠Enquiry reward worth {v} · <u>T&amp;C apply</u>', 'Ganjaran e-⁠Enquiry bernilai {v} · <u>Tertakluk T&amp;S</u>', 'e-⁠Enquiry 奖励价值 {v} · <u>须符合条款</u>'],
    rw1No: ['e-⁠Enquiry reward · <u>T&amp;C apply</u>', 'Ganjaran e-⁠Enquiry · <u>Tertakluk T&amp;S</u>', 'e-⁠Enquiry 奖励 · <u>须符合条款</u>'],
    worthW: ['<span class="npf-wo">Worth </span>{v}', '<span class="npf-wo">Bernilai </span>{v}', '<span class="npf-wo">价值 </span>{v}'], orW: ['OR', 'ATAU', '或'],
    fineB: ['Your choice of one, once the SPA is signed. <u>T&amp;C</u>', 'Pilih satu, selepas SPA ditandatangani. <u>T&amp;S</u>', '签署 SPA 后二选一。<u>条款</u>'],
    ewc: ['eWallet credit', 'Kredit eWallet', '电子钱包额度'],   // the site's own words (dict.ms / dict.zh: "Touch 'n Go eWallet Credit")
    rk: ['e-\u2060ENQUIRY EXCLUSIVE', 'EKSKLUSIF e-\u2060ENQUIRY', 'e-\u2060ENQUIRY 独家'],   // the listing column's ribbon (listing/np-ebox)
    // step 2
    head: ['Your e-⁠Enquiry', 'e-⁠Enquiry anda', '您的 e-⁠Enquiry'],
    unit: ['Unit {n}', 'Unit {n}', '单位 {n}'],
    togo: ['{n} details to go', '{n} butiran lagi', '还差 {n} 项'], togo1: ['1 detail to go', '1 butiran lagi', '还差 1 项'],
    done: ['✓ Complete', '✓ Lengkap', '✓ 已完成'],
    t0: ['Your e-⁠Enquiry is ready', 'e-⁠Enquiry anda sudah sedia', '您的 e-⁠Enquiry 已准备好'],
    t1: ['Almost done', 'Hampir siap', '就快完成了'],
    t2: ['Your incentive awaits', 'Ganjaran anda menanti', '您的奖励在等着您'], t2No: ['All set', 'Semua sudah lengkap', '一切就绪'],
    s0: ['Just your details to go.', 'Hanya butiran anda lagi.', '只差您的资料。'],   // v1-1: no "Incentive added"
    s0No: ['Just your details to go.', 'Hanya butiran anda lagi.', '只差您的资料。'],
    s2: ['Receipt goes to {e}.', 'Resit akan dihantar ke {e}.', '收据将发送至 {e}。'],
    tick: ['I agree to the <a href="{h}" target="_blank" rel="noopener">Privacy Notice</a> and understand the developer confirms the final price and availability.',
      'Saya bersetuju dengan <a href="{h}" target="_blank" rel="noopener">Notis Privasi</a> dan faham bahawa pemaju yang mengesahkan harga dan status unit yang muktamad.',
      '我同意<a href="{h}" target="_blank" rel="noopener">隐私声明</a>，并了解最终价格及单位供应由发展商确认。'],
    phone: ['Only the developer’s sales representative will contact you.', 'Hanya wakil jualan pemaju akan menghubungi anda.', '只有发展商的销售代表会联系您。'],
    note2: ['<b>Free. No payment.</b> Receipt emailed <span class="npf-nw">right away.</span>', '<b>Percuma. Tiada bayaran.</b> Resit terus ke <span class="npf-nw">e-mel</span> anda.', '<b>免费，无需付款。</b>收据立即发到您的电邮。'],
    nName: ['Just your name here.', 'Hanya nama anda di sini.', '请在这里填写您的姓名。'],
    nPhone: ['Just your phone number here.', 'Hanya nombor telefon anda di sini.', '请在这里填写您的电话号码。'],
    nEmail: ['Your receipt goes to this email.', 'Resit anda dihantar ke e-mel ini.', '收据将发送到这个电邮。'],
    nEmailBad: ['Check this email address.', 'Semak alamat e-mel ini.', '请检查这个电邮地址。'],
    nTick: ['One tick and you’re done.', 'Satu tanda lagi dan siap.', '打个勾就完成了。']
  };
  function L() { var l = D.documentElement.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function t(k, v) { var s = T[k][L()]; if (v) for (var n in v) s = s.split('{' + n + '}').join(v[n]); return s; }   // HTML: callers escape what goes into v
  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = D.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; e.setAttribute('data-np-skip', ''); return e; }
  function tidy(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function num(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function short(x) { var n = tidy(x).split(/\s+[·\/]\s+/)[0]; if (/^Type\b/i.test(n)) n = n.split(/\s+[—–]\s+/)[0]; n = n.trim(); return n ? n.charAt(0).toUpperCase() + n.slice(1) : n; }   // as conv
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // the site's own check

  /* facts from the page */
  function levelUnits() {
    try {   /* globals from the page: BD, ofbCurrentBlock, currentFloor */
      var lv = BD[ofbCurrentBlock][String(currentFloor)], a = [];
      lv.wings.forEach(function (w) { (w.units || []).forEach(function (u) { a.push(u); }); });
      return a;
    } catch (e) { return []; }
  }
  function levelCount() {   // the conversion layer's own count: open units on this level, of all units on it
    var a = levelUnits(), left = a.filter(function (u) { return u.status === 'green'; }).length;
    return a.length > 1 && left >= 1 && left < a.length ? { a: left, b: a.length } : null;
  }
  function levelLine() { var c = levelCount(); return c ? t('lvlLeft', c) : ''; }
  // our words inside the receipt card, in the visitor's language (the unit popup repaints its own words itself)
  function paint2(card) {
    $$('[data-npf-k]', card).forEach(function (e) {
      var v = e.getAttribute('data-npf-v'), h = t(e.getAttribute('data-npf-k'), v ? JSON.parse(v) : null);
      if (e.innerHTML !== h) e.innerHTML = h;
    });
    var i = $('.npf-inc', card), inc = i && incentive();
    if (i && inc) { var ih = '<div class="npf-ih"><span class="npf-rk">' + t('rk') + '</span></div><div class="npf-tiles npf-n' + inc.tiles.length + '">' + inc.tiles.join('<span class="npf-or">' + t('orW') + '</span>') + '</div><div class="npf-fine">' + t(inc.tiles.length === 2 ? 'fineB' : 'fine') + '</div>'; if (i.getAttribute('data-npf') !== ih) { i.innerHTML = ih; i.setAttribute('data-npf', ih); } }
  }
  function rewards() {
    return $$('#how-it-works .rw-band').map(function (b) {
      var i = $('img', b), v = $('.rw-value', b), m = v && /RM\s?[\d,]+/.exec(v.textContent);
      var te = $('.rw-title', b), en = te && te.getAttribute('data-np-k');
      return { img: i && i.src, title: tidy(en || (i && i.alt) || (te || {}).textContent), value: m ? m[0].replace(/RM\s?/, 'RM ') : '' };
    }).filter(function (r) { return r.img && r.title; });
  }
  function shortTitle(s) {   // "Brand New iPhone 18 Pro (256GB)" -> "iPhone 18 Pro"; "Touch 'n Go eWallet Credit" -> "Touch 'n Go"
    var x = tidy(s).replace(/^brand[\s-]+new\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '').replace(/\s+(e-?wallet\s+)?credits?$/i, '').trim();
    return x || tidy(s);
  }
  function nameSub(s) {   // v1-1 B: [name, second line (HTML)] for a step 2 tile
    var x = tidy(s), n = shortTitle(s), m = /\(([^)]+)\)\s*$/.exec(x);
    if (m && tidy(m[1])) return [n, esc(tidy(m[1]))];
    if (/\se-?wallet\s+credits?$/i.test(x)) return [n, t('ewc')];
    var w = n.split(' ');
    return w.length >= 4 ? [w.slice(0, 2).join(' '), esc(w.slice(2).join(' '))] : [n, ''];
  }
  function incentive() {   // null when the project shows no rewards
    var rs = rewards(); if (!rs.length) return null;
    var same = rs.every(function (r) { return r.value && r.value === rs[0].value; });
    return {
      v: same ? rs[0].value : '',   // step 1 line
      tiles: rs.slice(0, 3).map(function (r) { var ns = nameSub(r.title); return '<div class="npf-tl"><img src="' + esc(r.img) + '" alt=""><b>' + esc(ns[0]) + '</b>' + (ns[1] ? '<span class="npf-tv">' + ns[1] + '</span>' : '') + (r.value ? '<small>' + t('worthW', { v: '<span class="npf-nw">' + esc(r.value) + '</span>' }) + '</small>' : '') + '</div>'; })
    };
  }
  function goodToKnow(u, info) {   // true or nothing: the single cheapest open unit of its layout
    try {
      if (!u || u.status !== 'green' || !(+u.price > 0) || typeof allProjectUnits !== 'function') return '';
      var ty = short(u.type); if (!ty) return '';
      var same = allProjectUnits().filter(function (x) { return x.status === 'green' && +x.price > 0 && short(x.type) === ty; });
      if (same.length < 3) return '';
      var min = Math.min.apply(null, same.map(function (x) { return +x.price; }));
      if (+u.price !== min || same.filter(function (x) { return +x.price === min; }).length !== 1) return '';
      var bed = '';
      $$('.npu-room', info).forEach(function (r) { if (!bed && $('[data-npu-t="bed"],[data-npu-t="bed1"]', r)) bed = tidy(($('b', r) || {}).textContent); });
      return bed && /^\d+(\+\d+)?$/.test(bed) ? t('gkBed', { n: same.length, b: esc(bed) }) : t('gkType', { n: same.length, b: esc(ty) });
    } catch (e) { return ''; }
  }
  function projectName() {
    var h = $('.hero-project-name'); if (h && tidy(h.textContent)) return tidy(h.textContent);
    return tidy(D.title.split(/\s[|–-]\s/)[0]);
  }

  var CSS = [
    /* step 1 */
    '#unitInfoOverlay.npf1 .npc-pills>.npu-pill{display:none!important}',
    '#unitInfoOverlay.npf1 .npc-pills.npf-empty{display:none!important}',
    '#unitInfoOverlay.npf1 .npf-av{display:inline-flex;align-items:center;gap:calc(6px*var(--k,1));color:#17703A;font-weight:700;white-space:nowrap}',
    '#unitInfoOverlay.npf1 .npf-av i{display:block;width:calc(8px*var(--k,1));height:calc(8px*var(--k,1));border-radius:50%;background:#17A34A}',
    '#unitInfoOverlay.npf1 .npc-left-pill{margin-top:0!important}',
    '.npf-gk{margin:calc(14px*var(--k,1)) 0 calc(4px*var(--k,1));padding:calc(2px*var(--k,1)) 0 calc(2px*var(--k,1)) calc(14px*var(--k,1));border-left:3px solid #C9A646;text-align:left}',
    '.npf-gk-l{font-size:calc(12px*var(--k,1))!important;font-weight:700;line-height:1.3;letter-spacing:.08em;text-transform:uppercase;color:#777}',
    '.npf-gk-t{margin-top:calc(3px*var(--k,1));font-size:calc(16.5px*var(--k,1))!important;font-weight:600;line-height:1.4;color:#111}',
    '#unitInfoOverlay.npf1 .npc-ud .npc-loan{margin-top:calc(14px*var(--k,1))}',
    '.npf-nw{white-space:nowrap}',
    '.npf-fine{margin-top:calc(10px*var(--k,1));font-size:calc(13.5px*var(--k,1))!important;font-weight:500;line-height:1.4;color:#777}',
    '#unitInfoOverlay.npf1 .npu-rwd{display:none!important}',
    /* v1-1: step 1 = one quiet reward line above the button; the site's reward card there hides */
    '#unitInfoOverlay.npf1 .npc-ud .npc-rw{display:none!important}',
    '.npf-rl{margin:0 0 calc(10px*var(--k,1));text-align:center;font-size:calc(14px*var(--k,1))!important;font-weight:600;line-height:1.4;color:#8A6A1E}',
    '.npf-rl u{cursor:pointer;text-underline-offset:2px}', '.npf-rl>span{display:inline-block}',
    /* v1-1: step 2 reward, design B: the red ribbon on the right (flush with the card's edge), two white tiles with OR between */
    '.npf-ih{display:flex;justify-content:flex-end;margin:0 calc(-1 * var(--pad,18px)) calc(10px*var(--k,1)) 0}',
    '.npf-rk{display:inline-block;background:linear-gradient(180deg,#E8152F,#B5001A);color:#fff;font-family:Inter,Arial,sans-serif;font-weight:900;font-size:calc(12px*var(--k,1))!important;letter-spacing:.1em;line-height:1;padding:calc(7px*var(--k,1)) calc(16px*var(--k,1)) calc(7px*var(--k,1)) calc(22px*var(--k,1));white-space:nowrap;clip-path:polygon(0 0,100% 0,100% 100%,0 100%,calc(10px*var(--k,1)) 50%)}',
    '.npf-tiles{display:flex;align-items:stretch;gap:calc(8px*var(--k,1))}',
    '.npf-tl{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;text-align:center;padding:calc(10px*var(--k,1)) calc(8px*var(--k,1));border:1px solid #E9D9A8;border-radius:calc(12px*var(--k,1));background:#fff}',
    '.npf-tl img{display:block;width:100%;max-width:calc(96px*var(--k,1));height:calc(44px*var(--k,1));object-fit:contain;border:0;border-radius:0;background:none}',
    '.npf-tl b{display:block;margin-top:calc(6px*var(--k,1));font-size:calc(14.5px*var(--k,1))!important;font-weight:700;line-height:1.25;color:#111;text-wrap:balance;overflow-wrap:break-word}',
    '.npf-tl .npf-tv{display:block;margin-top:calc(1px*var(--k,1));font-size:calc(13px*var(--k,1))!important;font-weight:500;line-height:1.3;color:#666;text-wrap:balance;overflow-wrap:break-word}',
    '.npf-tl small{display:block;margin-top:auto;padding-top:calc(2px*var(--k,1));font-size:calc(14px*var(--k,1))!important;font-weight:700;line-height:1.3;color:#8A6A1E}',
    '.npf-or{flex:none;align-self:center;font-size:calc(12px*var(--k,1))!important;font-weight:800;line-height:1;color:#8A6A1E}',
    '.npu-note.npf-note b,.npu2-note.npf-note b{color:#111;font-weight:700}',
    /* step 2: the receipt */
    '#reservationOverlay.npf2 .npu2-card.npf-card{display:block!important;position:relative;overflow:visible;--pad:calc(18px*var(--k,1));padding:calc(16px*var(--k,1)) var(--pad)!important;text-align:left}',
    '.npf-h{display:flex;justify-content:space-between;align-items:center;gap:calc(10px*var(--k,1));margin-bottom:calc(12px*var(--k,1))}',
    '.npf-hl{font-size:calc(12px*var(--k,1))!important;font-weight:700;line-height:1.2;letter-spacing:.08em;text-transform:uppercase;color:#777;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.npf-hl .npf-hp{display:none}',
    '.npf-ok{display:inline-flex;align-items:center;flex:none;padding:calc(4px*var(--k,1)) calc(10px*var(--k,1));border-radius:99px;background:#EFEDE8;color:#555;font-size:calc(13px*var(--k,1))!important;font-weight:700;line-height:1.2;white-space:nowrap}',
    '.npf-ok.npf-done{background:#E8F5EC;color:#17703A}',
    '.npf-p{font-size:calc(14px*var(--k,1))!important;font-weight:600;line-height:1.3;color:#666}',
    '.npf-u{margin-top:calc(2px*var(--k,1));font-size:calc(18px*var(--k,1))!important;font-weight:700;line-height:1.3;color:#111}',
    '.npf-m{font-size:calc(14px*var(--k,1))!important;font-weight:500;line-height:1.4;color:#666}',
    '.npf-pr{margin-top:calc(8px*var(--k,1));font-size:calc(22px*var(--k,1))!important;font-weight:700;line-height:1.2;color:#111}',
    '.npf-sc{display:flex;align-items:flex-start;gap:calc(8px*var(--k,1));margin-top:calc(6px*var(--k,1));font-size:calc(14px*var(--k,1))!important;font-weight:600;line-height:1.4;color:#92400E}',
    '.npf-sc i{display:block;flex:none;width:calc(7px*var(--k,1));height:calc(7px*var(--k,1));margin-top:calc(7px*var(--k,1));border-radius:50%;background:#D97706}',
    '.npf-card .npu-hot,.npf-card .npu2-bumi{margin-top:calc(8px*var(--k,1))}',
    '.npf-d{position:relative;margin:calc(14px*var(--k,1)) 0;border-top:1.5px dashed #D8D2C2}',
    '.npf-d::before,.npf-d::after{content:"";position:absolute;top:calc(-9px*var(--k,1) - 1px);width:calc(18px*var(--k,1));height:calc(18px*var(--k,1));border-radius:50%;background:#fff;border:1px solid var(--line,#E5E0D3)}',
    '.npf-d::before{left:calc(-1 * var(--pad) - 10px*var(--k,1));clip-path:inset(0 0 0 50%)}',
    '.npf-d::after{right:calc(-1 * var(--pad) - 10px*var(--k,1));clip-path:inset(0 50% 0 0)}',
    '#reservationOverlay.npf2 .npf-inc{cursor:pointer}',
    '#reservationOverlay.npf2 form#ebookingForm .npc-rw{display:none!important}',
    '#reservationOverlay.npf2 label.npf-con{display:none!important}',
    '#reservationOverlay.npf2.npf2 label.npf-ack{display:flex!important;align-items:flex-start;gap:calc(12px*var(--k,1))!important;margin-top:calc(4px*var(--k,1));padding:calc(12px*var(--k,1)) calc(14px*var(--k,1));border:1px solid #E5E0D3;border-radius:calc(12px*var(--k,1));background:#fff;cursor:pointer}',
    '#reservationOverlay.npf2.npf2 label.npf-ack>span{font-size:calc(14.5px*var(--k,1))!important;font-weight:500!important;line-height:1.45;color:#333}',
    '#reservationOverlay.npf2.npf2 label.npf-ack input{flex:none;width:calc(22px*var(--k,1));height:calc(22px*var(--k,1));margin:calc(1px*var(--k,1)) 0 0;accent-color:#17703A}',
    '.npf-ph{margin-top:calc(-2px*var(--k,1));font-size:calc(13.5px*var(--k,1))!important;font-weight:500;line-height:1.4;color:#666;text-transform:none;letter-spacing:0}',
    '#reservationOverlay.npf2.npf2 .npf-need input:not([type=checkbox]),#reservationOverlay.npf2.npf2 label.npf-ack.npf-need{border-color:#C9A646!important;box-shadow:0 0 0 3px rgba(201,166,70,.25)!important}',
    '.npf-nudge{margin-top:calc(6px*var(--k,1));font-size:calc(14px*var(--k,1))!important;font-weight:600;line-height:1.4;color:#92400E;text-transform:none;letter-spacing:0}',
    /* the Submit bar: its own form element (the site styles "form .ofb-modal-cta"), pinned to the bottom of the popup */
    '#reservationOverlay.npf2 form.npf-bar{position:sticky;z-index:3;margin-top:calc(10px*var(--k,1));padding:calc(12px*var(--k,1)) 0 calc(26px*var(--k,1));background:#fff;border-top:1px solid #E5E5E5;box-shadow:0 -10px 14px -12px rgba(0,0,0,.18)}',
    '#reservationOverlay.npf2.npf2 form.npf-bar .ofb-modal-cta{margin-top:0}',
    /* short phones: a tighter receipt, one step at a time, until the Name field shows above the Submit bar on landing (fit()) */
    '#reservationOverlay.npf-x1 .npu2-title{margin-top:12px!important;margin-bottom:2px;font-size:24px!important;line-height:1.2}',
    '#reservationOverlay.npf-x1 .npu2-sub{font-size:15px!important}',
    '#reservationOverlay.npf-x1 .npu2-card.npf-card{--pad:14px;padding:12px var(--pad)!important;margin-top:10px!important}',
    '.npf-x1 .npf-h{margin-bottom:6px}', '.npf-x1 .npf-u{font-size:17px!important;margin-top:0}', '.npf-x1 .npf-pr{font-size:20px!important;margin-top:4px}', '.npf-x1 .npf-sc{margin-top:2px}',
    '.npf-x1 .npf-d{margin:10px 0}',
    '.npf-x1 .npf-tl img{height:38px}', '.npf-x1 .npf-tl{padding:8px 6px}', '.npf-x1 .npf-rk{padding-top:6px;padding-bottom:6px}', '.npf-x1 .npf-tl b{margin-top:4px}', '.npf-x1 .npf-ih{margin-bottom:6px}',
    '.npf-x1 .npf-card .npf-fine{margin-top:6px}',
    '#reservationOverlay.npf-x1 form.npf-bar{padding:8px 0 14px;margin-top:6px}', '#reservationOverlay.npf-x1 form.npf-bar .npu2-note{margin-top:6px}',
    '.npf-x2 .npf-hl .npf-hs{display:none}', '.npf-x2 .npf-hl .npf-hp{display:inline}', '.npf-x2 .npf-p{display:none}',
    '.npf-x2 .npf-mp{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-top:2px}', '.npf-x2 .npf-mp .npf-m{flex:1;min-width:0}', '.npf-x2 .npf-mp .npf-pr{flex:none}', '.npf-x2 .npf-mp .npf-pr{margin-top:0}',
    '#reservationOverlay.npf-x2 form.npf-bar{padding:6px 0 12px}',
    '#reservationOverlay.npf-x3 .npu2-title{font-size:21px!important}', '#reservationOverlay.npf-x3 .npu2-sub{display:none}',
    '#reservationOverlay.npf-x3 .npu2-card.npf-card{margin-top:4px!important}',
    '.npf-x3 .npf-tl img{height:32px}', '.npf-x3 .npf-tl{padding:6px}', '.npf-x3 .npf-tl b{font-size:14px!important;margin-top:2px}', '.npf-x3 .npf-tl small{font-size:13px!important}', '.npf-x3 .npf-tl .npf-tv{font-size:12.5px!important;margin-top:0}', '.npf-x3 .npf-ih{margin-bottom:6px}', '.npf-x3 .npf-rk{padding-top:5px;padding-bottom:5px}', '.npf-x3 .npf-tl small{padding-top:0}',
    '.npf-x3 .npf-d{margin:8px 0}', '.npf-x3 .npf-card .npu-hot{padding:8px 12px;margin-top:6px}', '.npf-x3 .npf-card .npf-fine{margin-top:4px}',
    '#reservationOverlay.npf-x3 form.npf-bar .npu2-note{font-size:13px!important;margin-top:4px}',
    '#reservationOverlay.npf-x3.npf-x3 form.npf-bar .ofb-modal-cta{padding-top:12px;padding-bottom:12px;min-height:46px}',
    '#reservationOverlay.npf-x4 .npu2-title{margin-top:8px!important;font-size:19px!important}', '#reservationOverlay.npf-x4 .npu2-card.npf-card{padding-top:10px!important;padding-bottom:10px!important}',
    '.npf-x4 .npf-sc{font-size:13px!important}', '.npf-x4 .npf-tl img{height:26px}', '.npf-x4 .npf-tl{padding:5px 6px}', '.npf-x4 .npf-wo{display:none}', '.npf-x4 .npf-tl b{margin-top:2px;font-size:13.5px!important}', '.npf-x5 .npf-tl img{display:none}', '.npf-x5 .npf-tl b{margin-top:0}', '.npf-x5 .npf-tl{padding:4px 6px}', '.npf-x6 .npf-tl .npf-tv{display:none}', '.npf-x4 .npf-card .npf-fine{font-size:12.5px!important}', '.npf-x4 .npf-d{margin:6px 0}', '.npf-x4 .npf-card .npu-hot .npu-fl{display:none}',
    '@media (max-width:380px){#reservationOverlay.npf2 form.npf-bar .npu2-note{font-size:13px!important}}',
    '@media (max-width:340px){',
    ' #reservationOverlay.npf2.npu-on2 .ofb-modal{padding-left:16px!important;padding-right:16px!important}',
    ' #reservationOverlay.npf2 .npu2-card.npf-card{--pad:12px;padding-left:12px!important;padding-right:12px!important}',
    ' .npf-hl{white-space:nowrap;font-size:11px!important;letter-spacing:.04em} .npf-ok{font-size:12px!important;padding:3px 8px}',
    ' .npf-m{font-size:13px!important} .npf-pr{white-space:nowrap;font-size:18px!important}', ' .npf-tl small{font-size:13px!important}',
    ' #reservationOverlay.npf2 form.npf-bar .npu2-note{font-size:12.5px!important}',
    '}'
  ].join('\n');

  /* ---------- step 1 ---------- */
  var ov, info;
  function off1() { try { if (ov) ov.classList.remove('npf1'); $$('.npf-gk,.npf-av-s,.npf-rl', ov).forEach(function (e) { e.remove(); }); } catch (e) {} }
  function apply1() {
    ov = $('#unitInfoOverlay'); info = ov && $('.npu-info', ov);
    var u = typeof currentUnit !== 'undefined' && currentUnit;
    if (!info || !u || !ov.classList.contains('open')) return;
    try {
      // the level line, as step 2 says it
      var lp = $('.npc-left-pill', info), line = levelLine();
      if (lp && line && lp.innerHTML !== line) lp.innerHTML = line;
      // "Available" on the unit line; the green pill hides (CSS)
      var desc = $('.npu-desc', info), pill = $('.npc-pills>.npu-pill', info);
      if (desc && pill && u.status === 'green') {
        var av = $('.npf-av-s', desc), h = '<span class="npu-sep">·</span><span class="npf-av"><i></i>' + t('avail') + '</span>';
        if (!av) { av = el('span', 'npf-av-s', h); desc.appendChild(av); } else if (av.innerHTML !== h) av.innerHTML = h;
      }
      var pw = $('.npc-pills', info); if (pw) pw.classList.toggle('npf-empty', !$('.npc-left-pill', pw) || getComputedStyle($('.npc-left-pill', pw)).display === 'none');
      // Good to know (only when true)
      var gk = $('.npf-gk', info), g = goodToKnow(u, info), after = pw || desc;
      if (!g) { if (gk) gk.remove(); }
      else {
        var gh = '<div class="npf-gk-l">' + t('gkL') + '</div><div class="npf-gk-t">' + g + '</div>';
        if (!gk) { gk = el('div', 'npf-gk', gh); } else if (gk.innerHTML !== gh) gk.innerHTML = gh;
        if (after && gk.previousElementSibling !== after) after.parentNode.insertBefore(gk, after.nextSibling);
      }
      // v1-1: the reward as ONE quiet line just above the button (the site's reward card in step 1 hides: CSS)
      var cta = $('.npu-cta', ov), inc = incentive(), rl = $('.npf-rl', ov);
      if (cta && inc) {
        var lh = (inc.v ? t('rw1', { v: esc(inc.v) }) : t('rw1No')).split(' · ').map(function (x) { return '<span>' + x + '</span>'; }).join(' · ');   // breaks only at the dot
        if (!rl) { rl = el('div', 'npf-rl', lh); rl.setAttribute('data-np-skip', ''); } else if (rl.innerHTML !== lh) rl.innerHTML = lh;
        if (rl.nextElementSibling !== cta) cta.parentNode.insertBefore(rl, cta);
      } else if (rl) rl.parentNode.removeChild(rl);
      // under the button
      var note = $('.npu-foot .npu-note', ov) || $('.npu-note', ov), nh = t('note1');
      if (note && note.getAttribute('data-npf') !== nh) { note.innerHTML = nh; note.setAttribute('data-npf', nh); note.setAttribute('data-np-skip', ''); note.classList.add('npf-note'); }
      ov.classList.add('npf1');
    } catch (e) { off1(); }
  }

  /* ---------- step 2 ---------- */
  var ro, modal, bar, inForm;
  function fields() { return { name: D.getElementById('rfName'), phone: D.getElementById('rfPhone'), email: D.getElementById('rfEmail'), ack: D.getElementById('rfAck'), con: D.getElementById('rfConsent') }; }
  function left(f) {
    var n = 0;
    if (!tidy(f.name.value)) n++;
    if (!tidy(f.phone.value)) n++;
    if (!EMAIL.test(tidy(f.email.value))) n++;
    if (!f.ack.checked) n++;
    return n;
  }
  function off2() {
    try {
      if (ro) { ro.classList.remove('npf2'); X.forEach(function (c) { ro.classList.remove(c); }); }
      var f = $('#ebookingForm');
      if (bar && f) {   // the button and its note back into the site's form
        var cta = $('.ofb-modal-cta', bar), note = $('.npu2-note', bar);
        if (cta) f.appendChild(cta); if (note) f.appendChild(note);
        bar.remove(); bar = null;
      }
      $$('.npf-ph,.npf-nudge', ro).forEach(function (e) { e.remove(); });
    } catch (e) {}
  }
  function status() {   // the counter, the heading and the line under it
    var f = fields(), card = $('.npf-card', modal); if (!f.name || !card) return;
    var n = left(f), inc = !!$('.npf-inc', card), ok = $('.npf-ok', card);
    var oh = n ? (n === 1 ? t('togo1') : t('togo', { n: n })) : t('done');
    if (ok.innerHTML !== oh) ok.innerHTML = oh;
    ok.classList.toggle('npf-done', !n);
    var ti = $('.npu2-title', modal), su = $('.npu2-sub', modal);
    var th = n === 4 ? t('t0') : n ? t('t1') : inc ? t('t2') : t('t2No');
    var sh = n ? (inc ? t('s0') : t('s0No')) : t('s2', { e: '<span class="npf-nw">' + esc(tidy(f.email.value)) + '</span>' });
    if (ti && ti.getAttribute('data-npf') !== th) { ti.innerHTML = '<span data-np-skip>' + th + '</span>'; ti.setAttribute('data-npf', th); }
    if (su && su.getAttribute('data-npf') !== sh) { su.innerHTML = '<span data-np-skip>' + sh + '</span>'; su.setAttribute('data-npf', sh); }
  }
  function receipt(card) {
    var u = typeof currentUnit !== 'undefined' && currentUnit; if (!u) throw new Error('no unit');
    var id = $('.npu2-id', card), desc = $('.npu2-desc', card), meta = $('.npu2-meta', card), amt = $('.npu2-amt', card);
    var hot = $('.npu-hot', card), bumi = $('.npu2-bumi', card);
    // the level: what the unit popup wrote after the position (its own words, repainted by it on a language switch)
    var lvl = '';
    if (desc) { var parts = desc.innerHTML.split('<span class="npu-sep">·</span>'); lvl = parts.length > 1 ? parts.slice(1).join('<span class="npu-sep">·</span>') : ''; }
    var unitNo = id ? tidy(id.textContent) : String(u.unitNo);
    var hotLvl = hot && $('[data-npu-t="hotLvl"],[data-npu-t="hotTop"]', hot);
    var sc = !hotLvl ? levelCount() : null, inc = incentive(), pn = projectName();
    var price = amt ? tidy(amt.textContent).replace(/^RM\s?/, 'RM ') : '';
    var K = function (k, v) { return ' data-npf-k="' + k + '"' + (v ? ' data-npf-v="' + esc(JSON.stringify(v)) + '"' : ''); };
    var h = '<div class="npf-h"><span class="npf-hl"><span class="npf-hs"' + K('head') + '></span><span class="npf-hp">' + esc(pn) + '</span></span><span class="npf-ok"></span></div>' +
      (pn ? '<div class="npf-p">' + esc(pn) + '</div>' : '') +
      '<div class="npf-u"><span data-np-skip translate="no"' + K('unit', { n: esc(unitNo) }) + '></span>' + (lvl ? '<span class="npu-sep">·</span>' + lvl : '') + '</div>' +
      '<div class="npf-mp">' + (meta ? '<div class="npf-m">' + meta.innerHTML + '</div>' : '') + (price ? '<div class="npf-pr" data-np-skip>' + esc(price) + '</div>' : '') + '</div>' +
      (bumi ? bumi.outerHTML : '') + (hot ? hot.outerHTML : '') +
      (sc ? '<div class="npf-sc" data-np-skip><i></i><span' + K('lvlLeft', sc) + '></span></div>' : '') +
      (inc ? '<div class="npf-d"></div><div class="npf-inc" data-np-skip role="button" tabindex="0"></div>' : '');
    return h;
  }
  function terms() { var m = $('#ebooking-tnc-modal'); if (m) { if (m.parentNode !== D.body) D.body.appendChild(m); m.style.zIndex = 100005; m.style.display = 'flex'; } }
  function apply2() {
    ro = $('#reservationOverlay'); modal = ro && $('.ofb-modal', ro);
    if (!modal || !ro.classList.contains('open') || !ro.classList.contains('npu-on2')) return;
    try {
      var f = fields(), card = $('.npu2-card', modal), form = $('#ebookingForm', modal);
      if (!f.name || !f.phone || !f.email || !f.ack || !f.con || !card || !form) return;
      // the receipt (rebuilt whenever the unit popup redraws its card)
      var built = false;
      if (!card.classList.contains('npf-card')) {
        built = true;
        var src = D.createElement('div'); src.innerHTML = card.innerHTML;
        card.innerHTML = receipt(src);
        card.classList.add('npf-card');
      }
      paint2(card);
      // one tick box: the site's two boxes stay, the second follows the first
      var ackL = f.ack.closest('label'), conL = f.con.closest('label');
      if (ackL && conL) {
        conL.classList.add('npf-con'); ackL.classList.add('npf-ack');
        var a = $('a', conL), href = a ? a.getAttribute('href') : '/privacy-policy/', sp = $('span', ackL), th = t('tick', { h: esc(href) });
        if (sp && sp.getAttribute('data-npf') !== th) { sp.innerHTML = th; sp.setAttribute('data-npf', th); sp.setAttribute('data-np-skip', ''); }
        if (f.con.checked !== f.ack.checked) f.con.checked = f.ack.checked;
      }
      // under Phone
      var pl = f.phone.closest('label'), ph = pl && $('.npf-ph', pl);
      if (pl) { if (!ph) { ph = el('div', 'npf-ph'); pl.appendChild(ph); } if (ph.textContent !== t('phone')) ph.textContent = t('phone'); }
      // the Submit bar
      var cta = $('.ofb-modal-cta', form) || (bar && $('.ofb-modal-cta', bar)), note = $('.npu2-note', form) || (bar && $('.npu2-note', bar));
      if (!bar || bar.parentNode !== modal) { bar = el('form', 'npf-bar'); bar.setAttribute('novalidate', ''); bar.addEventListener('submit', function (e) { e.preventDefault(); }); modal.appendChild(bar); }
      if (cta && cta.parentNode !== bar) bar.appendChild(cta);
      if (note) { if (note.parentNode !== bar) bar.appendChild(note); var nh = t('note2'); if (note.getAttribute('data-npf') !== nh) { note.innerHTML = nh; note.setAttribute('data-npf', nh); note.setAttribute('data-np-skip', ''); note.classList.add('npf-note'); } }
      var pb = parseFloat(getComputedStyle(modal).paddingBottom) || 0;
      bar.style.bottom = (-pb) + 'px';
      ro.classList.add('npf2');
      status();
      if (built || needFit) fit();
      $$('.npf-nudge', modal).forEach(function (n) { var k = n.getAttribute('data-k'); if (k && T[k] && n.textContent !== t(k)) n.textContent = t(k); });
    } catch (e) { off2(); }
  }

  var needFit = false, X = ['npf-x1', 'npf-x2', 'npf-x3', 'npf-x4', 'npf-x5', 'npf-x6'];   // v1-1: x5 = reward pictures off, x6 = their second line off (smallest phones, long words)
  function fit() {   // phones: the Name field must show above the Submit bar when the buyer lands
    needFit = false;
    var f = D.getElementById('rfName'); if (!f || !bar || !modal) return;
    X.forEach(function (c) { ro.classList.remove(c); });
    if (modal.scrollTop > 0) return;
    for (var i = 0; i <= X.length; i++) {
      if (f.getBoundingClientRect().bottom + 6 <= bar.getBoundingClientRect().top) return;
      if (i < X.length) ro.classList.add(X[i]);
    }
  }

  /* a missing field: a kind line under it, not a pop-up */
  var submitting = false;
  function firstMissing() {
    var f = fields();
    if (!tidy(f.name.value)) return [f.name, 'nName'];
    if (!tidy(f.phone.value)) return [f.phone, 'nPhone'];
    var e = tidy(f.email.value); if (!e) return [f.email, 'nEmail']; if (!EMAIL.test(e)) return [f.email, 'nEmailBad'];
    if (!f.ack.checked) return [f.ack, 'nTick'];
    return null;
  }
  function clearNudge() { $$('.npf-nudge', modal).forEach(function (e) { e.remove(); }); $$('.npf-need', modal).forEach(function (e) { e.classList.remove('npf-need'); }); }
  function nudge(m) {
    clearNudge();
    var lab = m[0].closest('label'); if (!lab) return false;
    lab.classList.add('npf-need');
    var n = el('div', 'npf-nudge'); n.setAttribute('data-k', m[1]); n.setAttribute('role', 'alert'); n.textContent = t(m[1]);
    lab.parentNode.insertBefore(n, lab.nextSibling);
    var sc = modal, r = lab.getBoundingClientRect(), b = bar ? bar.getBoundingClientRect().top : innerHeight;
    if (r.top < 60 || r.bottom + 40 > b) sc.scrollTop += r.top - Math.max(60, (b - r.height) / 2);
    try { m[0].focus({ preventScroll: true }); } catch (e) { m[0].focus(); }
    return true;
  }
  function hookAlert() {
    var al = window.alert;
    window.alert = function (msg) {
      if (submitting && ro && ro.classList.contains('npf2')) { var m = firstMissing(); if (m && nudge(m)) return; }
      return al.apply(window, arguments);
    };
  }

  function start() {
    var st = D.createElement('style'); st.id = 'npf-css'; st.textContent = CSS; D.head.appendChild(st);
    hookAlert();
    var q1 = 0, q2 = 0;
    function s1() { if (!q1) q1 = setTimeout(function () { q1 = 0; apply1(); if (o1) o1.takeRecords(); }, 0); }
    function s2() { if (!q2) q2 = setTimeout(function () { q2 = 0; apply2(); if (o2) o2.takeRecords(); }, 0); }
    var o1 = null, o2 = null, u = $('#unitInfoOverlay'), r = $('#reservationOverlay');
    if (u) { o1 = new MutationObserver(s1); o1.observe(u, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true, characterData: true }); s1();
      u.addEventListener('click', function (e) { var x = e.target.closest && e.target.closest('.npf-rl u'); if (x) { e.preventDefault(); e.stopPropagation(); terms(); } }, true); }   // v1-1: T&C on the step 1 line
    if (r) {
      o2 = new MutationObserver(s2); o2.observe(r, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true }); s2();
      r.addEventListener('input', function (e) { if (!r.classList.contains('npf2')) return; status(); var m = firstMissing(); if (!m || m[0] !== e.target) { var lab = e.target.closest && e.target.closest('label'); if (lab && lab.classList.contains('npf-need')) clearNudge(); } });
      r.addEventListener('change', function (e) {
        if (!r.classList.contains('npf2')) return;
        if (e.target && e.target.id === 'rfAck') { var c = D.getElementById('rfConsent'); if (c) c.checked = e.target.checked; if (e.target.checked) clearNudge(); }
        status();
      });
      // the Submit button: the site's checks run as before; a missing field shows a line instead of the pop-up
      r.addEventListener('click', function (e) {
        var c = e.target.closest && e.target.closest('.ofb-modal-cta');
        if (c && r.classList.contains('npf2')) { submitting = true; setTimeout(function () { submitting = false; }, 0); }
        var i = e.target.closest && e.target.closest('.npf-inc'); if (i) terms();
      }, true);
      r.addEventListener('keydown', function (e) { var i = e.target.closest && e.target.closest('.npf-inc'); if (i && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); terms(); } });
    }
    // our words follow the language switcher
    new MutationObserver(function () { s1(); needFit = true; s2(); })
      .observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  var rz = 0;
  addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (ro && ro.classList.contains('npf2')) { needFit = true; apply2(); } }, 150); });
  function safeStart() { try { start(); } catch (e) { off1(); off2(); } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
