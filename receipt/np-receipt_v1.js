/*
 * iNewProject e-Enquiry receipt, design C "Document receipt" (v1, 31 Oct 2026).
 *   The receipt that shows after a buyer submits an e-Enquiry, redrawn as one calm document:
 *   "Enquiry received" + "e-Enquiry receipt" and the time it was submitted · the Reference ID with Copy · the enquiry
 *   (project, unit, block + level, price, layout, size, position, view) beside the contact details · what happens next
 *   and where the copy of the receipt goes · the e-Enquiry incentive · the buttons (Save to my account / View my
 *   e-Enquiries, Print, Done) with the reward condition under them, always in view.
 *   The same wording rules as the rest of the site: no "proof of eligibility", the reward condition word for word,
 *   a unit with no price shows "RM -". Print opens the same document, in the visitor's language.
 *
 * A layer on top of the site's own receipt, loaded from the admin Header Scripts box. It is on once loaded;
 *   window.NP_RECEIPT_LIVE = false (before the script) keeps it out.
 *
 * Do no harm: the site still fills its own receipt first (the same fields, the same buttons, the same sign-in gate); this
 * layer then draws from the same data and hides the site's version. If anything is missing or throws, the layer steps
 * aside and the site's receipt shows as before. Our words carry their own EN / BM / 中文; the unit's own words
 * (layout, position, view ...) go through the site's language switcher exactly as today.
 */
(function () {
  'use strict';
  var D = document;
  if (window.NP_RECEIPT_LIVE === false || window.__nprc) return;
  window.__nprc = 1;   // the block pasted twice still runs once
  if (!/^\/project\/[^\/]+\/e-enquiry\/?$/.test(location.pathname)) return;

  var EQ = 'e-\u2060Enquiry';   // "e-Enquiry" never breaks at its hyphen (the dictionaries write it the same way)
  // Our own words: [EN, BM, 中文]. The site's dictionary wording where it has one.
  var T = {
    tag: [EQ + ' receipt', 'Resit ' + EQ, EQ + ' 收据'],
    ok: ['Enquiry received', 'Pertanyaan diterima', '询问已收到'],
    title: [EQ + ' receipt', 'Resit ' + EQ, EQ + ' 收据'],
    when: ['Submitted', 'Dihantar', '提交时间'],
    ref: ['Reference ID', 'ID Rujukan', '参考编号'],
    copy: ['Copy', 'Salin', '复制'],
    copied: ['Copied', 'Disalin', '已复制'],
    yours: ['Your enquiry', 'Pertanyaan anda', '您的询问'],
    unit: ['Unit {n}', 'Unit {n}', '单位 {n}'],
    level: ['Level {n}', 'Tingkat {n}', '第 {n} 层'],
    sqft: ['{n} sq ft', '{n} kaki persegi', '{n} 平方尺'],
    price: ['Unit price', 'Harga unit', '单位价格'],
    bumi: ['Bumi lot', 'Lot Bumi', '土著单位'],
    contact: ['Contact details', 'Maklumat hubungan', '联系资料'],
    name: ['Name', 'Nama', '姓名'], phone: ['Phone', 'Telefon', '电话'], email: ['Email', 'E-mel', '电邮'],
    next: ['What happens next', 'Langkah seterusnya', '接下来'],
    nextp: ['The developer’s sales representative will contact you to confirm the latest availability, pricing, promotions and next steps.',
      'Wakil jualan pemaju akan menghubungi anda untuk mengesahkan status unit, harga, promosi dan langkah seterusnya yang terkini.',
      '发展商的销售代表会联系您，确认最新的单位供应、价格、优惠及下一步安排。'],
    sent: ['A copy of this receipt will be sent to {e}.', 'Salinan resit ini akan dihantar ke {e}.', '本收据副本将发送至 {e}。'],
    inc: [EQ + ' incentive', 'Ganjaran ' + EQ, EQ + ' 奖励'],
    save: ['Save to my account', 'Simpan ke akaun saya', '保存到我的账户'],
    mine: ['View my e-\u2060Enquiries', 'Lihat ' + EQ + ' saya', '查看我的 ' + EQ],
    print: ['Print', 'Cetak', '打印'],
    done: ['Done', 'Selesai', '完成'],
    close: ['Close', 'Tutup', '关闭'],
    terms: ['This reference confirms your e-Enquiry submission only. e-Enquiry rewards are confirmed after SPA completion, terms and conditions apply.',
      'Rujukan ini hanya mengesahkan penghantaran ' + EQ + ' anda. Ganjaran ' + EQ + ' disahkan selepas SPA ditandatangani, tertakluk kepada terma dan syarat.',
      '此参考编号仅确认您已提交 ' + EQ + '。' + EQ + ' 奖励于签署 SPA 后确认，须遵守条款与条件。'],
    // the incentive as the site writes it: "<gift> or Touch 'n Go eWallet Credit (worth RM 9,499, choose one)"
    incx: ['{g} or Touch ’n Go eWallet Credit (worth {v}, choose one)', '{g} atau Kredit Touch ’n Go eWallet (bernilai {v}, pilih satu)', '{g} 或 Touch ’n Go 电子钱包额度（价值 {v}，二选一）'],
    raw: ['{n}', '{n}', '{n}']
  };
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      MON_MS = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
  var LANGS = ['en', 'ms', 'zh'];
  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }

  var ICON = {
    ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>',
    print: '<path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v6H7z"/>',
    save: '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/>'
  };
  function svg(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>'; }

  // Sizes are CSS px × --k: laptops run the site at 90% zoom, so --k = 1/0.9 keeps the same size on screen
  // (reading text ≥ 14 px). Doubled ids/classes: the site's and the bigger-text sheet's rules are stronger than one class.
  var CSS = [
    '#enquiryReceiptOverlay.npr-on{--k:1;--ink:#1F2421;--mute:#5F6661;--line:#E2E4E0;--red:#D0021B;padding:calc(12px*var(--k))}',
    '#enquiryReceiptOverlay.npr-on,#enquiryReceiptOverlay.npr-on *{transition:none}',
    '#enquiryReceiptOverlay.npr-on .enquiry-receipt-modal>:not(.npr):not(.modal-close-x){display:none!important}',
    '#enquiryReceiptOverlay.npr-on.npr-on .enquiry-receipt-modal{display:flex;flex-direction:column;width:min(100%,calc(860px*var(--k)));max-width:none;max-height:100%;height:auto;padding:0;overflow:hidden;border-radius:calc(16px*var(--k));border-top:3px solid var(--red);text-align:left;background:#fff}',
    '#enquiryReceiptOverlay.npr-on.npr-on .modal-close-x{top:calc(14px*var(--k));right:calc(16px*var(--k));z-index:3}',
    '.npr{display:flex;flex-direction:column;min-height:0;flex:1;color:var(--ink);font-family:inherit;line-height:1.45}',
    '.npr-top{flex:none;display:flex;align-items:center;gap:calc(16px*var(--k));min-height:calc(64px*var(--k));padding:0 calc(76px*var(--k)) 0 calc(32px*var(--k));border-bottom:1px solid var(--line)}',
    '.npr-top img{display:block;height:calc(34px*var(--k));width:auto}',
    '.npr-tag{margin-left:auto;font-size:calc(14px*var(--k));color:var(--mute)}',
    '.npr-body{flex:1;min-height:0;overflow-y:auto;padding:calc(26px*var(--k)) calc(32px*var(--k)) calc(8px*var(--k))}',
    '.npr-head{display:flex;justify-content:space-between;align-items:flex-end;gap:calc(20px*var(--k));padding-bottom:calc(20px*var(--k));border-bottom:1px solid var(--line)}',
    '.npr-ok{display:inline-flex;align-items:center;gap:calc(8px*var(--k));font-size:calc(14px*var(--k));font-weight:600;color:#167145}',
    '.npr-ok i{display:grid;place-items:center;width:calc(22px*var(--k));height:calc(22px*var(--k));border-radius:50%;background:#E6F2E8}',
    '.npr-ok svg{width:calc(13px*var(--k));height:calc(13px*var(--k));fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}',
    '.npr-title{margin:calc(8px*var(--k)) 0 0;font-family:"DM Serif Display",Georgia,"Times New Roman",serif;font-size:calc(36px*var(--k));font-weight:400;letter-spacing:-.01em;line-height:1.15;color:var(--ink)}',
    'html[data-np-lang="zh"] .npr-title{font-family:inherit;font-weight:600;letter-spacing:0}',
    '.npr-when{flex:none;text-align:right}',
    '.npr-lbl{display:block;font-size:calc(14px*var(--k));font-weight:400;color:var(--mute)}',
    '.npr-when b{display:block;margin-top:calc(2px*var(--k));font-size:calc(15px*var(--k));font-weight:600;color:var(--ink)}',
    '.npr-ref{display:flex;justify-content:space-between;align-items:center;gap:calc(16px*var(--k));padding:calc(18px*var(--k)) 0;border-bottom:1px solid var(--line)}',
    '.npr-ref>div{min-width:0}',
    '.npr-refid{display:block;margin-top:calc(2px*var(--k));font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:calc(22px*var(--k));font-weight:600;letter-spacing:.02em;color:var(--ink);overflow-wrap:anywhere}',
    '.npr-btn{display:inline-flex;align-items:center;justify-content:center;gap:calc(8px*var(--k));min-height:calc(46px*var(--k));padding:0 calc(16px*var(--k));border:1px solid #CFD3CE;border-radius:calc(8px*var(--k));background:#fff;color:var(--ink);font-family:inherit;font-size:calc(15px*var(--k));font-weight:600;line-height:1.2;white-space:nowrap;cursor:pointer}',
    '.npr-btn:hover{border-color:#9AA09B}',
    '.npr-btn svg{flex:none;width:calc(18px*var(--k));height:calc(18px*var(--k));fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
    '.npr-copy{flex:none}',
    '.npr-copy.npr-did{border-color:#167145;color:#167145}',
    '.npr-cols{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);border-bottom:1px solid var(--line)}',
    '.npr-unit{padding:calc(20px*var(--k)) calc(28px*var(--k)) calc(22px*var(--k)) 0;border-right:1px solid var(--line)}',
    '.npr-contact{padding:calc(20px*var(--k)) 0 calc(22px*var(--k)) calc(28px*var(--k))}',
    '.npr-proj{margin-top:calc(4px*var(--k));font-size:calc(18px*var(--k));font-weight:600;line-height:1.3;color:var(--ink);overflow-wrap:break-word}',
    '.npr-unitrow{display:flex;justify-content:space-between;align-items:flex-start;gap:calc(16px*var(--k));margin-top:calc(14px*var(--k))}',
    '.npr-unitrow>div{min-width:0}',
    '.npr-id{font-size:calc(24px*var(--k));font-weight:600;letter-spacing:-.02em;line-height:1.2;color:var(--ink);overflow-wrap:anywhere}',
    '.npr-sub,.npr-line,.npr-view{margin-top:calc(4px*var(--k));font-size:calc(14px*var(--k));color:var(--mute)}',
    '.npr-line{margin-top:calc(12px*var(--k));font-size:calc(15px*var(--k));color:var(--ink)}',
    // each piece ("Tingkat Satu", "Pintu Masuk Kiri", "1,184 sq ft") moves to the next line whole; only a piece wider than the line wraps
    '.npr-sub npr-o,.npr-sub npr-w,.npr-line npr-o,.npr-line npr-w,.npr-view npr-w,.npr-view npr-o{display:inline-block;max-width:100%}',
    '.npr-sep{margin:0 .45em;color:#AEB3AD}',
    '.npr-price{flex:none;text-align:right}',
    '.npr-amt{font-size:calc(24px*var(--k));font-weight:600;letter-spacing:-.02em;line-height:1.2;color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}',
    '#enquiryReceiptOverlay .npr .npr-h{margin:0;font-family:inherit;font-size:calc(16px*var(--k));font-weight:600;letter-spacing:0;line-height:1.3;color:var(--ink)}',
    '.npr-dl{margin:calc(12px*var(--k)) 0 0;padding:0}',
    '.npr-dl>div{display:grid;grid-template-columns:calc(92px*var(--k)) minmax(0,1fr);gap:calc(12px*var(--k));padding:calc(6px*var(--k)) 0}',
    '.npr-dl dt{font-size:calc(14px*var(--k));color:var(--mute);font-weight:400}',
    '.npr-dl dd{margin:0;font-size:calc(15px*var(--k));font-weight:500;color:var(--ink);overflow-wrap:anywhere}',
    '.npr-sec{padding:calc(20px*var(--k)) 0;border-bottom:1px solid var(--line)}',
    '.npr-sec:last-of-type{border-bottom:0}',
    '.npr-p{margin:calc(6px*var(--k)) 0 0;font-size:calc(15px*var(--k));line-height:1.55;color:#3F4541}',
    '.npr-p b{font-weight:600;color:var(--ink);overflow-wrap:anywhere}',
    '.npr-foot{flex:none;padding:calc(16px*var(--k)) calc(32px*var(--k)) calc(14px*var(--k));border-top:1px solid var(--line);background:#fff}',
    '.npr-acts{display:flex;align-items:center;gap:calc(10px*var(--k))}',
    '.npr-save{flex:1;border-color:var(--red);background:var(--red);color:#fff;min-height:calc(50px*var(--k));font-size:calc(16px*var(--k))}',
    '.npr-save:hover{background:#A80016;border-color:#A80016}',
    '.npr-done{border-color:transparent;background:none}',
    '.npr-done:hover{border-color:var(--line)}',
    '.npr-terms{margin:calc(10px*var(--k)) 0 0;font-size:calc(14px*var(--k));line-height:1.45;color:var(--mute);text-align:center}',
    '.npr-body .npr-terms2{display:none;margin:0;padding:calc(18px*var(--k)) 0 calc(14px*var(--k));border-top:1px solid var(--line);text-align:left}',
    // phones + tablets under 900 px: a full-height sheet; one column; the buttons stay at the bottom
    '@media (max-width:899px){',
    ' #enquiryReceiptOverlay.npr-on{padding:8px}',
    ' #enquiryReceiptOverlay.npr-on.npr-on .enquiry-receipt-modal{width:100%;height:auto;max-height:100%;border-radius:16px}',
    ' #enquiryReceiptOverlay.npr-on.npr-on .modal-close-x{top:10px;right:12px}',
    ' .npr-top{min-height:60px;padding:0 64px 0 20px}',
    ' .npr-top img{height:30px}',
    ' .npr-body{padding:20px 20px 4px}',
    ' .npr-head{display:block;padding-bottom:16px}',
    ' .npr-title{font-size:32px}',
    ' .npr-when{margin-top:8px;text-align:left;display:flex;flex-wrap:wrap;gap:0 8px;align-items:baseline}',
    ' .npr-when b{margin-top:0;font-size:14px}',
    ' .npr-refid{font-size:20px}',
    ' .npr-cols{display:block;border-bottom:0}',
    ' .npr-unit{padding:18px 0;border-right:0;border-bottom:1px solid var(--line)}',
    ' .npr-contact{padding:18px 0;border-bottom:1px solid var(--line)}',
    ' .npr-amt,.npr-id{font-size:22px}',
    ' .npr-foot{padding:12px 20px 12px;box-shadow:0 -6px 16px rgba(0,0,0,.05)}',
    '}',
    '@media (max-width:899px) and (min-width:600px){ .npr-tag{display:block} }',
    '@media (max-width:599px){',
    ' .npr-tag{display:none}',
    ' .npr-acts{flex-wrap:wrap}',
    ' .npr-save{flex:1 1 100%}',
    ' .npr-print,.npr-done{flex:1 1 0;min-height:44px}',
    ' .npr-foot .npr-terms{display:none}',   // phones: the condition sits at the end of the receipt, the buttons stay compact
    ' .npr-body .npr-terms2{display:block}',
    ' .npr-dl>div{grid-template-columns:76px minmax(0,1fr)}',
    '}',
    '@media (max-width:359px){ .npr-unitrow{flex-direction:column;gap:8px} .npr-price{text-align:left} }'
  ].join('\n');

  var ov, modal, root, made = false, rec = null, timer;

  function el(tag, cls) { var e = D.createElement(tag); if (cls) e.className = cls; return e; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function num(n) { return Number(n).toLocaleString('en-MY'); }
  // empty, a dash, or the words null / undefined
  function filled(v) { if (v == null) return ''; v = String(v).trim(); return /^(-|—|–|n\/?a|null|undefined)?$/i.test(v) ? '' : v; }

  // the submitted time as the site writes it ("30 Oct 2026, 4:57 PM"), in the visitor's language; anything else as it is
  function when(s, L) {
    var m = /^(\d{1,2}) ([A-Za-z]{3})[a-z]* (\d{4}),? (\d{1,2}):(\d{2})\s*([AaPp][Mm])$/.exec(String(s).trim()), i = m ? MON.indexOf(m[2][0].toUpperCase() + m[2].slice(1, 3).toLowerCase()) : -1;
    if (i < 0 || !L) return String(s);
    var pm = /p/i.test(m[6]);
    if (L === 1) return m[1] + ' ' + MON_MS[i] + ' ' + m[3] + ', ' + m[4] + ':' + m[5] + ' ' + (pm ? 'PTG' : 'PG');
    return m[3] + '年' + (i + 1) + '月' + m[1] + '日 ' + (pm ? '下午' : '上午') + m[4] + ':' + m[5];
  }
  // a value of the site's in the visitor's language, the way the site's switcher would (its dictionary, then its rules);
  // used where the switcher doesn't reach (inside our sentences, and the print window)
  function tr(s, L) {
    if (!L || !/[A-Za-z]/.test(s)) return s;
    try {
      var lg = LANGS[L], d = (window.NP_DICT || {})[lg] || {}, k = esc(String(s).replace(/\s+/g, ' ').trim()).replace(/&quot;/g, '"');
      var un = function (x) { return x.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/⁠/g, ''); };
      if (d[k] != null) return un(d[k]);
      var o = k; ((window.NP_RULES || {})[lg] || []).forEach(function (r) { o = o.replace(r[0], r[1]); });
      return o === k ? s : un(o);
    } catch (e) { return s; }
  }
  function txt(k, v, L) {
    var s = T[k][L];
    if (v) {
      if (v.d != null) return when(v.d, L);
      if (v.g != null) return s.replace('{g}', tr(v.g, L)).replace('{v}', v.v);
      s = s.replace(/\{(\w)\}/g, function (m, x) { return v[x]; });
    }
    return s;
  }
  // A word of ours in its own tag with data-np-skip (the switcher leaves it alone); a language change rewrites it in place
  function own(k, vars) {
    return '<npr-o data-np-skip data-npr-t="' + k + '"' + (vars ? ' data-npr-v="' + esc(JSON.stringify(vars)) + '"' : '') + '>' + esc(txt(k, vars, lang())) + '</npr-o>';
  }
  // the unit's own words: plain English, translated by the site's switcher as today (own tag, so each piece is its own key)
  function val(s) { return '<npr-w>' + esc(s) + '</npr-w>'; }
  function paint() {
    if (!root) return;
    var L = lang();
    Array.prototype.forEach.call(root.querySelectorAll('[data-npr-t]'), function (e) {
      var v = e.getAttribute('data-npr-v'), s = txt(e.getAttribute('data-npr-t'), v ? JSON.parse(v) : null, L);
      if (e.childNodes.length === 1 && e.firstChild.nodeType === 3) { if (e.firstChild.nodeValue !== s) e.firstChild.nodeValue = s; }
      else e.textContent = s;
    });
    Array.prototype.forEach.call(root.querySelectorAll('[data-npr-s]'), function (e) {   // a sentence with a value inside
      var k = e.getAttribute('data-npr-s'), v = e.getAttribute('data-npr-e');
      e.innerHTML = esc(T[k][L]).replace('{e}', '<b>' + esc(v) + '</b>');
    });
  }

  // everything the receipt shows, from the site's data and (when it is the same unit) the unit the visitor picked
  function facts(d) {
    var f = { ref: filled(d.referenceId), proj: filled(d.projectName), full: filled(d.unitFullId), type: filled(d.unitType),
      sqft: Number(d.sqft) > 0 ? Number(d.sqft) : 0, price: Number(d.price) > 0 ? Number(d.price) : 0,
      name: filled(d.name), phone: filled(d.phone), email: filled(d.email), at: filled(d.submittedAtLabel), inc: filled(d.incentive),
      member: !!d.isLoggedIn, blk: '', lvl: '', pos: '', view: '', bumi: false };
    try {
      /* globals from the site's own script: currentUnit, fullUnitLabel, towerLabel */
      var u = window.currentUnit || (typeof currentUnit !== 'undefined' ? currentUnit : null);
      if (u && typeof fullUnitLabel === 'function' && (!f.full || fullUnitLabel(u.unitBlock, u.unitLevel, u.unitNo, u.unitNoIsFullLabel) === f.full)) {
        f.blk = filled(typeof towerLabel === 'function' ? towerLabel(u.unitBlock) : u.unitBlock);
        f.lvl = filled(u.unitLevel); f.pos = filled(u.position); f.view = filled(u.viewType); f.bumi = !!u.bumiOnly;
      }
    } catch (e) {}
    return f;
  }
  function levelWord(l) { return /^([0-9]{1,3}[A-Za-z]?|[A-Za-z]{1,2}[0-9]{0,2})$/.test(l) ? own('level', { n: l }) : val(l); }
  function incentive(s) {
    var m = /^(.+?) or Touch ['’]n Go eWallet [Cc]redit \(worth (RM ?[\d,]+), choose one\)$/.exec(s);
    return m ? '<npr-o data-np-skip data-npr-t="incx" data-npr-v="' + esc(JSON.stringify({ g: m[1], v: m[2] })) + '">' + esc(txt('incx', { g: m[1], v: m[2] }, lang())) + '</npr-o>' : val(s);
  }
  var SEP = '<span class="npr-sep">·</span>';
  // a block named after the project ("Candela", "Breeze Hill Shoppes") says nothing new under the project's name
  function same(a, b) { a = String(a).toLowerCase().replace(/\s+/g, ' ').trim(); b = String(b).toLowerCase().replace(/\s+/g, ' ').trim(); return !!a && (a === b || b.indexOf(a) === 0); }

  function render(d) {
    var f = facts(d);
    if (!f.ref) throw new Error('no reference');
    var logo = D.querySelector('header img[src*="logo"], .logo img, img[src*="NP1U_logo"]');
    var sub = [], line = [], view = [];
    if (f.blk && !same(f.blk, f.proj)) sub.push(val(f.blk));   // "Block A", "Row RB2 · Lots 1–55": the site's dictionary has them all
    if (f.lvl && f.lvl !== f.blk) sub.push(levelWord(f.lvl));
    if (f.type) line.push(val(f.type));
    if (f.sqft) line.push(own('sqft', { n: num(f.sqft) }));
    if (f.pos) line.push(val(f.pos));
    if (f.view) view.push(val(f.view));
    if (f.bumi) view.push(own('bumi'));
    var contact = [['name', f.name], ['phone', f.phone], ['email', f.email]].filter(function (c) { return c[1]; });

    root.innerHTML =
      '<div class="npr-top">' + (logo && logo.getAttribute('src') ? '<img src="' + esc(logo.getAttribute('src')) + '" alt="iNewProject">' : '') +
        '<span class="npr-tag">' + own('tag') + '</span></div>' +
      '<div class="npr-body">' +
        '<div class="npr-head"><div><div class="npr-ok"><i>' + svg('ok') + '</i>' + own('ok') + '</div>' +
          '<h2 class="npr-title" id="npr-title">' + own('title') + '</h2></div>' +
          (f.at ? '<div class="npr-when"><span class="npr-lbl">' + own('when') + '</span><b>' + own('raw', { d: f.at }) + '</b></div>' : '') + '</div>' +
        '<div class="npr-ref"><div><span class="npr-lbl">' + own('ref') + '</span><span class="npr-refid" data-np-skip translate="no">' + esc(f.ref) + '</span></div>' +
          '<button type="button" class="npr-btn npr-copy">' + svg('copy') + own('copy') + '</button></div>' +
        '<div class="npr-cols"><section class="npr-unit"><span class="npr-lbl">' + own('yours') + '</span>' +
            (f.proj ? '<div class="npr-proj">' + val(f.proj) + '</div>' : '') +
            '<div class="npr-unitrow"><div>' + (f.full ? '<div class="npr-id">' + own('unit', { n: f.full }) + '</div>' : '') +
              (sub.length ? '<div class="npr-sub">' + sub.join(SEP) + '</div>' : '') + '</div>' +
              '<div class="npr-price"><div class="npr-amt" data-np-skip>' + (f.price ? 'RM ' + num(f.price) : 'RM -') + '</div><span class="npr-lbl">' + own('price') + '</span></div></div>' +
            (line.length ? '<div class="npr-line">' + line.join(SEP) + '</div>' : '') +
            (view.length ? '<div class="npr-view">' + view.join(SEP) + '</div>' : '') + '</section>' +
          '<section class="npr-contact"><h3 class="npr-h">' + own('contact') + '</h3><dl class="npr-dl">' +
            contact.map(function (c) { return '<div><dt>' + own(c[0]) + '</dt><dd data-np-skip translate="no">' + esc(c[1]) + '</dd></div>'; }).join('') + '</dl></section></div>' +
        '<section class="npr-sec"><h3 class="npr-h">' + own('next') + '</h3><p class="npr-p">' + own('nextp') + '</p>' +
          (f.email ? '<p class="npr-p" data-np-skip data-npr-s="sent" data-npr-e="' + esc(f.email) + '"></p>' : '') + '</section>' +
        (f.inc ? '<section class="npr-sec"><h3 class="npr-h">' + own('inc') + '</h3><p class="npr-p">' + incentive(f.inc) + '</p></section>' : '') +
        '<p class="npr-terms npr-terms2">' + own('terms') + '</p>' +
      '</div>' +
      '<div class="npr-foot"><div class="npr-acts">' +
        '<button type="button" class="npr-btn npr-save">' + svg('save') + own(f.member ? 'mine' : 'save') + '</button>' +
        '<button type="button" class="npr-btn npr-print">' + svg('print') + own('print') + '</button>' +
        '<button type="button" class="npr-btn npr-done">' + own('done') + '</button></div>' +
        '<p class="npr-terms">' + own('terms') + '</p></div>';
    paint();
    var z = parseFloat(getComputedStyle(D.documentElement).zoom) || 1;
    ov.style.setProperty('--k', String(Math.round(1 / z * 10000) / 10000));
    ov.classList.add('npr-on');
    var b = root.querySelector('.npr-body'); if (b) b.scrollTop = 0;
    font();
  }
  // the heading's serif (the homepage headline's), fetched the first time a receipt shows
  function font() {
    try {
      if (D.querySelector('link[href*="DM+Serif+Display"]')) return;
      var l = el('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap'; D.head.appendChild(l);
    } catch (e) {}
  }

  function off() {
    try {
      if (ov) { ov.classList.remove('npr-on'); ov.style.removeProperty('--k'); }
      if (root && root.parentNode) root.parentNode.removeChild(root);
      made = false;
    } catch (e) {}
  }

  function copy() {
    var ref = rec && filled(rec.referenceId), btn = root.querySelector('.npr-copy');
    if (!ref || !btn) return;
    var done = function () {
      var o = btn.querySelector('[data-npr-t]'); if (!o) return;
      o.setAttribute('data-npr-t', 'copied'); btn.classList.add('npr-did'); paint();
      clearTimeout(timer); timer = setTimeout(function () { o.setAttribute('data-npr-t', 'copy'); btn.classList.remove('npr-did'); paint(); }, 1600);
    };
    var old = function () {
      var i = el('textarea'); i.value = ref; i.setAttribute('readonly', ''); i.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      D.body.appendChild(i); i.select(); var r = false; try { r = D.execCommand('copy'); } catch (e) {} D.body.removeChild(i); if (r) done();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ref).then(done, old); else old();
  }

  // Print: the same document in a window of its own, in the visitor's language, then the browser's print (or Save as PDF)
  function printDoc(d) {
    var f = facts(d), L = lang(), t = function (k, v) { return esc(txt(k, v, L)); }, w = function (s) { return esc(tr(s, L)); };
    var logo = D.querySelector('header img[src*="logo"], .logo img, img[src*="NP1U_logo"]');
    var lw = function (l) { return /^([0-9]{1,3}[A-Za-z]?|[A-Za-z]{1,2}[0-9]{0,2})$/.test(l) ? t('level', { n: l }) : w(l); };
    var sub = [], line = [], view = [];
    if (f.blk && !same(f.blk, f.proj)) sub.push(w(f.blk));
    if (f.lvl && f.lvl !== f.blk) sub.push(lw(f.lvl));
    if (f.type) line.push(w(f.type)); if (f.sqft) line.push(t('sqft', { n: num(f.sqft) })); if (f.pos) line.push(w(f.pos));
    if (f.view) view.push(w(f.view)); if (f.bumi) view.push(t('bumi'));
    var im = f.inc && /^(.+?) or Touch ['’]n Go eWallet [Cc]redit \(worth (RM ?[\d,]+), choose one\)$/.exec(f.inc);
    var sep = ' <span class="s">·</span> ';
    var html = '<!doctype html><html lang="' + ['en', 'ms', 'zh'][L] + '"><head><meta charset="utf-8"><title>' + esc(f.ref) + ' · ' + t('title') + '</title>' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Serif+Display&display=swap">' +
      '<style>' +
      '*{box-sizing:border-box}body{margin:0;padding:32px;background:#fff;color:#1F2421;font-family:"DM Sans",Arial,sans-serif;font-size:15px;line-height:1.5}' +
      'main{max-width:760px;margin:0 auto;border-top:3px solid #D0021B}' +
      '.top{display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid #E2E4E0}.top img{height:28px}.top span{color:#5F6661;font-size:14px}' +
      '.head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;padding:24px 0 18px;border-bottom:1px solid #E2E4E0}' +
      '.ok{color:#167145;font-weight:600;font-size:14px}h1{margin:6px 0 0;font-family:"DM Serif Display",Georgia,serif;font-weight:400;font-size:34px;line-height:1.15}' +
      (L === 2 ? 'h1{font-family:inherit;font-weight:600}' : '') +
      '.l{display:block;color:#5F6661;font-size:14px}.when{text-align:right}.when b{display:block;font-size:15px}' +
      '.ref{padding:16px 0;border-bottom:1px solid #E2E4E0}.ref b{display:block;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:22px;letter-spacing:.02em}' +
      '.cols{display:grid;grid-template-columns:1.25fr 1fr;border-bottom:1px solid #E2E4E0}.u{padding:18px 24px 18px 0;border-right:1px solid #E2E4E0}.c{padding:18px 0 18px 24px}' +
      '.p{font-size:18px;font-weight:600;margin-top:2px}.row{display:flex;justify-content:space-between;gap:16px;margin-top:12px}.id,.amt{font-size:22px;font-weight:600}.amt{text-align:right;white-space:nowrap}' +
      '.sub{color:#5F6661;font-size:14px;margin-top:2px}.line{margin-top:10px}.s{color:#AEB3AD;margin:0 .3em}' +
      'h3{margin:0;font-size:16px}dl{margin:10px 0 0}dl div{display:grid;grid-template-columns:92px 1fr;gap:12px;padding:4px 0}dt{color:#5F6661;font-size:14px}dd{margin:0;overflow-wrap:anywhere}' +
      '.sec{padding:16px 0;border-bottom:1px solid #E2E4E0}.sec p{margin:6px 0 0;color:#3F4541}' +
      '.terms{margin:16px 0 0;color:#5F6661;font-size:14px;text-align:center}' +
      '@media print{body{padding:0}@page{margin:14mm}}' +
      '</style></head><body><main>' +
      '<div class="top">' + (logo && logo.src ? '<img src="' + esc(logo.src) + '" alt="iNewProject">' : '<b>iNewProject</b>') + '<span>' + t('tag') + '</span></div>' +
      '<div class="head"><div><div class="ok">✓ ' + t('ok') + '</div><h1>' + t('title') + '</h1></div>' +
        (f.at ? '<div class="when"><span class="l">' + t('when') + '</span><b>' + esc(when(f.at, L)) + '</b></div>' : '') + '</div>' +
      '<div class="ref"><span class="l">' + t('ref') + '</span><b>' + esc(f.ref) + '</b></div>' +
      '<div class="cols"><div class="u"><span class="l">' + t('yours') + '</span>' + (f.proj ? '<div class="p">' + w(f.proj) + '</div>' : '') +
        '<div class="row"><div>' + (f.full ? '<div class="id">' + t('unit', { n: f.full }) + '</div>' : '') + (sub.length ? '<div class="sub">' + sub.join(sep) + '</div>' : '') + '</div>' +
        '<div><div class="amt">' + (f.price ? 'RM ' + num(f.price) : 'RM -') + '</div><span class="l" style="text-align:right">' + t('price') + '</span></div></div>' +
        (line.length ? '<div class="line">' + line.join(sep) + '</div>' : '') + (view.length ? '<div class="sub">' + view.join(sep) + '</div>' : '') + '</div>' +
      '<div class="c"><h3>' + t('contact') + '</h3><dl>' + [['name', f.name], ['phone', f.phone], ['email', f.email]].filter(function (c) { return c[1]; })
        .map(function (c) { return '<div><dt>' + t(c[0]) + '</dt><dd>' + esc(c[1]) + '</dd></div>'; }).join('') + '</dl></div></div>' +
      '<div class="sec"><h3>' + t('next') + '</h3><p>' + t('nextp') + '</p>' + (f.email ? '<p>' + esc(T.sent[L]).replace('{e}', '<b>' + esc(f.email) + '</b>') + '</p>' : '') + '</div>' +
      (f.inc ? '<div class="sec"><h3>' + t('inc') + '</h3><p>' + (im ? t('incx', { g: im[1], v: im[2] }) : w(f.inc)) + '</p></div>' : '') +
      '<p class="terms">' + t('terms') + '</p>' +
      '</main><script>(function(){var go=function(){setTimeout(function(){window.print();},150);};' +
      'window.onload=function(){if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go,go);else go();};})();<\/script></body></html>';
    var pw = window.open('', '_blank', 'width=820,height=900');
    if (!pw) return false;
    pw.document.open(); pw.document.write(html); pw.document.close();
    return true;
  }

  function wrap(name, fn) {
    var f = window[name];
    if (typeof f !== 'function' || f.__npr) return false;
    var w = function () { return fn(f, this, arguments); };
    w.__npr = 1; window[name] = w; return true;
  }

  function start() {
    ov = D.getElementById('enquiryReceiptOverlay');
    modal = ov && ov.querySelector('.enquiry-receipt-modal');
    // only on the receipt we know: its box, its fields, its close button and the site's functions
    if (!modal || !modal.querySelector('.modal-close-x') || !D.getElementById('receiptReferenceId') || !D.getElementById('receiptSaveBtn') ||
        typeof window.showEnquiryReceipt !== 'function' || typeof window.closeEnquiryReceipt !== 'function' ||
        typeof window.handleReceiptSaveClick !== 'function' || typeof window.printEnquiryReceipt !== 'function') return;
    var st = el('style'); st.id = 'npr-css'; st.textContent = CSS; D.head.appendChild(st);
    root = el('div', 'npr');
    modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-labelledby', 'npr-title');
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.classList.contains('npr-copy')) copy();
      else if (b.classList.contains('npr-save')) window.handleReceiptSaveClick();
      else if (b.classList.contains('npr-print')) window.printEnquiryReceipt();
      else if (b.classList.contains('npr-done')) window.closeEnquiryReceipt();
    });
    wrap('showEnquiryReceipt', function (f, self, args) {
      var r = f.apply(self, args);
      try {
        if (!ov.classList.contains('open')) return r;
        rec = args[0] || null;
        if (!made) { modal.appendChild(root); made = true; }
        render(rec || {});
      } catch (e) { off(); }
      return r;
    });
    wrap('printEnquiryReceipt', function (f, self, args) {
      try { if (made && rec && ov.classList.contains('npr-on') && printDoc(rec)) return; } catch (e) {}
      return f.apply(self, args);
    });
    // Escape closes the receipt (not while the sign-in box is open over it)
    D.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !ov.classList.contains('open') || !ov.classList.contains('npr-on')) return;
      var g = D.getElementById('memberSaveGateOverlay'); if (g && g.classList.contains('open')) return;
      window.closeEnquiryReceipt();
    });
    // the visitor switches language with the receipt open: our words follow
    new MutationObserver(function () { if (made) paint(); }).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
    var c = modal.querySelector('.modal-close-x'); if (c) c.setAttribute('aria-label', T.close[0]);
  }
  function safeStart() { try { start(); } catch (e) { off(); } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
