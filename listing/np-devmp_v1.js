/* iNewProject . listing page: Developer Information + Master Plan, v1 (23 Nov 2026). A layer on the site's own markup: the site's
   blocks stay in the page (hidden), our cards are added after them, and the site's own text nodes (summary, description, sales
   gallery) are moved into our cards, so the site's BM / 中文 dictionary keeps translating them. EN / BM / 中文.
   Developer Information:
   - one card: logo, name, "Developer · <area from the address>", chips only when the summary itself says so (KPKT licence,
     projects completed with CCC, listed on Bursa), the summary folded to 3 lines with "View more";
   - e-Enquiry listings (owner 23 Nov: a direct contact leaks the lead): no developer email / phone / website; a card
     "Interested in <project>? Make a free e-Enquiry ..." with "View available units", and the sales gallery address if the
     page has one; listings without e-Enquiry keep the site's contact cards, minus any empty card.
   Master Plan:
   - one card: the picture (an Enlarge button on it, opens the site's own viewer) beside the text; chips from the page's own
     facts (Total development area, Total units, Tenure), kept in step with them (BM / 中文 after the site translates them); the description folded to 7 lines with "View more" (box 113's phone
     fold on the same text no longer finds it once it is moved, so there is one button).
   e-Enquiry listings: a summary paragraph or sales gallery line with an email, phone, web address or link stays hidden too,
   and a separate rule hides the site's contact cards from the start, even if everything else here fails.
   Fail-safe: an error while building -> our cards go, the site's blocks come back (the contact rule above stays).
   Off switch: window.NP_DEVMP_LIVE = false.
   Load it before listtop (listtop must stay the last listing script). */
(function () {
  var W = window, D = document, H = D.documentElement;
  if (!/^\/project\/[^\/]+\/?$/.test(location.pathname)) return;
  // an email, web address or Malaysian phone number (03-2715 1166, (03) 2715 1166, 012-786 1501, +60 3-..., 1-300-88-8888, 1800-22-8888);
  // " @ " in a project name and permit numbers like 30091-3/05-2027/0341(N)-(L) do not match
  var CONTACT = /[\w.+-]+@[\w-]+\.\w|www\.|https?:\/\/|\b[a-z0-9-]+\.(?:com|net|org|asia|biz|info|my)\b|(?:\b|\+)6?0\d{1,2}\)?[-\u2013\s]{0,3}\d{3,4}[-\u2013\s]?\d{3,4}\b|\(0\d{1,2}\)\s*\d{3,4}|\b1[-\s]?[38]00[-\s]?\d{2}[-\s]?\d{4}\b|\+60[\s-]?\d/i;
  // owner 23 Nov: an e-Enquiry listing never shows the developer's contacts. This runs first and is never undone,
  // so it holds even with the off switch below or if the cards fail (the page is parsed: the script loads with defer).
  try { if (D.getElementById('e-enquiry') && !D.getElementById('npdm-guard')) {
    [].forEach.call(D.querySelectorAll('#developer .dev-about > p'), function (p) { if (CONTACT.test(p.textContent) || p.querySelector('a')) p.classList.add('npdm-x'); });
    var g = D.createElement('style'); g.id = 'npdm-guard'; g.textContent = '#developer .dev-contact-stack,#developer .npdm-x{display:none!important}'; (D.head || H).appendChild(g); } } catch (e) {}
  if (W.NP_DEVMP_LIVE === false || W.__NPDM__) return; W.__NPDM__ = 1;
  var T = {
    dev: ['Developer', 'Pemaju', '发展商'],
    kpkt: ['KPKT-licensed developer', 'Pemaju berlesen KPKT', 'KPKT 持牌发展商'],
    ccc: ['Projects completed with CCC', 'Projek siap dengan CCC', '已完工项目持有 CCC'],
    bursa: ['Listed on Bursa Malaysia', 'Tersenarai di Bursa Malaysia', '马来西亚交易所上市'],
    ask: ['Interested in {p}?', 'Berminat dengan {p}?', '对 {p} 感兴趣？'], askX: ['Interested in this project?', 'Berminat dengan projek ini?', '对这个项目感兴趣？'],
    askP: ['Make a free e-Enquiry: the developer’s sales representative will contact you. The e-Enquiry reward applies once your SPA is signed.',
      'Buat e-Enquiry percuma: wakil jualan pemaju akan menghubungi anda. Ganjaran e-Enquiry terpakai selepas SPA anda ditandatangani.',
      '免费提交 e-Enquiry：发展商的销售代表会联系您。签署 SPA 后即可获得 e-Enquiry 奖励。'],
    units: ['View available units', 'Lihat unit tersedia', '查看可选单位'],
    gal: ['Sales gallery', 'Galeri jualan', '销售展厅'],
    more: ['View more', 'Lihat lagi', '查看更多'], less: ['View less', 'Lihat kurang', '收起'],
    big: ['Enlarge', 'Besarkan', '放大']
  };
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function t(k, v) { var s = T[k][L()]; return v ? s.replace('{p}', v) : s; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function tidy(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function q(s, r) { return (r || D).querySelector(s); }
  function qa(s, r) { return [].slice.call((r || D).querySelectorAll(s)); }
  function en(e) { return tidy(e && (e.getAttribute('data-np-k') || e.textContent)); }   // the page's English words (the dictionary keeps them)
  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ZOOM = '<svg viewBox="0 0 24 24" aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  var CSS = [
    /* Developer Information */
    '#developer .npd{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:20px;align-items:start}',
    '#developer .npd-card{background:#fff;border:1px solid #E7E4DE;border-radius:16px;padding:22px 24px;min-width:0}',
    '#developer .npd-head{display:flex;align-items:center;gap:14px;min-width:0}',
    '#developer .npd-head img{flex:none;width:56px;height:56px;object-fit:contain;border:1px solid #ECE8E1;border-radius:12px;background:#fff;padding:6px;box-sizing:border-box}',
    '#developer .npd-name{font-size:19px;font-weight:700;color:#1d1d1f;line-height:1.25;overflow-wrap:anywhere}',
    '#developer .npd-sub{margin-top:3px;font-size:14px;color:#6B706C;line-height:1.35}',
    '#developer .npd-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}',
    '#developer .npd-chips span{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;background:#F3F7F4;color:#167145;font-size:14px;font-weight:700;line-height:1.2}',
    '#developer .npd-chips i{width:6px;height:6px;border-radius:50%;background:#1E9E5A;flex:none}',
    '#developer .npd-sum{margin-top:16px;font-size:15.5px;line-height:1.65;color:#3a3a3a}#developer .npd-sum p{margin:0 0 12px}#developer .npd-sum p:last-child{margin-bottom:0}',
    '#developer .npd-sum.npd-c{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}#developer .npd-sum.npd-c p{display:inline}#developer .npd-sum.npd-c p+p:before{content:" "}',
    '.npd-more,.npm-more{display:inline-block;margin-top:8px;padding:0;border:0;background:none;color:#D0021B;font-family:inherit;font-weight:800;font-size:15px;text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
    '#developer .npd-ask h4{margin:0;font-family:inherit;font-size:17px;font-weight:700;line-height:1.35;color:#1d1d1f}',
    '#developer .npd-ask p{margin:8px 0 0;font-size:14.5px;line-height:1.55;color:#5F6661}',
    '#developer .npd-ask a.npd-go{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:16px;min-height:46px;padding:0 16px;border-radius:10px;background:#D0021B;color:#fff!important;font-weight:700;font-size:15px;text-decoration:none}',
    '#developer .npd-ask a.npd-go:hover{background:#A80016}',
    '#developer .npd-hq{margin-top:14px;padding-top:12px;border-top:1px solid #EFEBE4;font-size:14px;color:#5F6661;line-height:1.5}',
    '#developer .npd-hq b{display:block;margin-bottom:2px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#7A7F7B;font-weight:700}',
    '#developer .npd-hq .value{font-weight:500}',
    '#developer .npd-side>.dev-contact-card+.dev-contact-card{margin-top:12px}',
    '#developer .npd-side{min-width:0}#developer .npd-sum,#developer .npd-side .value,#developer .npd-side a,#developer .npd-hq{overflow-wrap:anywhere}',
    '@media (max-width:980px){#developer .npd{grid-template-columns:1fr;gap:14px}}@media (max-width:767.98px){#developer .npd-card{padding:18px}}',
    /* Master Plan */
    '#masterplan .npm{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);background:#fff;border:1px solid #E7E4DE;border-radius:16px;overflow:hidden}',
    '#masterplan .npm-pic{position:relative;display:flex;align-items:center;justify-content:center;min-height:300px;padding:0;border:0;background:#F6F5F2;cursor:zoom-in;font:inherit}',
    '#masterplan .npm-pic img{display:block;width:100%;height:100%;max-height:480px;object-fit:contain}',
    '#masterplan .npm-zoom{position:absolute;right:14px;bottom:14px;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px;background:rgba(17,17,17,.75);color:#fff;font-size:14px;font-weight:700;line-height:1}',
    '#masterplan .npm-txt{padding:24px 26px;min-width:0}',
    '#masterplan .npm-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}',
    '#masterplan .npm-chips span{padding:7px 12px;border-radius:10px;background:#F4F2EE;font-size:14px;font-weight:700;color:#1d1d1f;line-height:1.2}',
    'html.npdm-on #masterplan .npm-txt .fact-label{margin:0;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7A7F7B}',
    'html.npdm-on #masterplan .npm-txt .fact-value{margin-top:8px;font-size:15.5px;line-height:1.65;color:#3a3a3a}',
    '#masterplan .npm-txt .fact-value.npm-c{display:-webkit-box;-webkit-line-clamp:7;-webkit-box-orient:vertical;overflow:hidden}',
    /* box 113's phone fold on the same text: off here (one button) */
    'html.npdm-on #masterplan .npm .fact-value.npl-mp-long:not(.npl-mp-open){max-height:none!important;position:static!important}',
    'html.npdm-on #masterplan .npm .fact-value::after{display:none!important}html.npdm-on #masterplan .npl-mp-btn{display:none!important}',
    '@media (max-width:980px){#masterplan .npm{grid-template-columns:1fr}#masterplan .npm-pic{min-height:200px}}@media (max-width:767.98px){#masterplan .npm-txt{padding:18px}}'
  ].join('\n');

  var made = [], hid = [], moved = [], obs = [], cls = [];
  function hide(e) { if (e) { hid.push([e, e.style.display]); e.style.display = 'none'; } }
  function move(e, to) { if (e) { moved.push([e, e.parentNode, e.nextSibling]); to.appendChild(e); } }
  function undo() {   // put the site's blocks back exactly as they were
    moved.reverse().forEach(function (m) { try { m[1].insertBefore(m[0], m[2]); } catch (e) {} });
    hid.forEach(function (h) { try { h[0].style.display = h[1]; } catch (e) {} });
    cls.forEach(function (c) { try { c[0].classList.remove(c[1]); } catch (e) {} });
    obs.forEach(function (o) { try { o.disconnect(); } catch (e) {} });
    made.forEach(function (n) { try { if (n.parentNode) n.parentNode.removeChild(n); } catch (e) {} });
    H.classList.remove('npdm-on');
  }
  function fold(box, btn, c) {   // a "View more" only when there is more; checked again whenever the text or the width changes
    function words() { var v = box.classList.contains(c) ? t('more') : t('less'); if (btn.textContent !== v) btn.textContent = v; }
    btn.addEventListener('click', function () { box.classList.toggle(c); words(); });
    function check() { if (!box.classList.contains(c)) return; var on = box.scrollHeight > box.clientHeight + 2; btn.style.display = on ? '' : 'none'; }
    var qd = 0; function soon() { if (!qd) qd = requestAnimationFrame(function () { qd = 0; check(); }); }
    words(); soon(); setTimeout(check, 800); setTimeout(check, 2500); addEventListener('resize', soon); addEventListener('load', soon);
    if (W.MutationObserver) { var o = new MutationObserver(soon); o.observe(box, { childList: true, characterData: true, subtree: true }); obs.push(o); }
    return function () { words(); soon(); };
  }
  function areaOf(a) {   // "No. 62, Jalan ..., 70300 Seremban" -> "Seremban"; "..., 43500 Semenyih, Selangor Darul Ehsan, Malaysia." -> "Semenyih, Selangor"
    // the postcode must open a comma part ("Lot 12345, Jalan Besar" is not an area); up to 3 parts after it
    var x = tidy(a).replace(/[.\s]+$/, '').replace(/\s*,?\s*Malaysia$/i, ''), m = /(?:^|,)\s*\d{5},?\s+([^,]+?)(?:,\s*([^,]+?))?(?:,\s*([^,]+?))?\s*$/.exec(x); if (!m) return '';
    var parts = [m[1], m[2], m[3]].filter(Boolean).map(function (p) { return tidy(p.replace(/\bDarul\s+\S+/i, '').replace(/\bD\.\s*E\.?/i, '').replace(/^(Wilayah Persekutuan|W\.?\s*P\.?)(\s+|$)/i, '')); }).filter(Boolean), out = [];
    parts.forEach(function (p) { if (out.every(function (o) { return o.toLowerCase() !== p.toLowerCase(); })) out.push(p); });
    return out.join(', ');
  }
  var repaint = [];

  function developer() {
    var lay = q('#developer .dev-layout'); if (!lay) return;
    var about = q('.dev-about', lay), logo = q('.dev-logo', lay), name = tidy((q('.dev-name', lay) || {}).textContent); if (!about || !name) return;
    var ps = qa('.dev-about > p', lay), sumEn = ps.map(en).join(' ');
    var items = qa('.contact-item', lay), lab = function (i) { return en(q('.label', i)); };
    var addr = items.filter(function (i) { return /^(developer )?address$/i.test(lab(i)); })[0], area = addr ? areaOf((q('.value', addr) || {}).textContent) : '';
    var chips = [];
    if (/licen[cs]e[^.]{0,60}KPKT|KPKT[^.]{0,60}licen[cs]e/i.test(sumEn)) chips.push('kpkt');
    if (/(completed|delivered|handed over)[^.]{0,80}(\bCCC\b|certificates? of completion and compliance)|(\bCCC\b|certificates? of completion and compliance)[^.]{0,40}\b(issued|obtained|received)\b/i.test(sumEn)) chips.push('ccc');
    if (/listed on (the )?(main market|bursa)|main market of bursa|bursa malaysia[^.]{0,30}\blisted\b/i.test(sumEn)) chips.push('bursa');
    var ee = !!D.getElementById('e-enquiry');
    var show = ee ? ps.filter(function (p) { return !CONTACT.test(p.textContent) && !q('a', p); }) : ps;   // e-Enquiry: no paragraph that carries a contact
    var title = function () { var h = q('.hero-title'); if (!h) return ''; var c = h.cloneNode(true); qa('[class*="npp-"]', c).forEach(function (x) { x.parentNode.removeChild(x); }); return tidy(c.textContent); };   // the project's name (the SEO h1 inside; not the Project of the Month ribbon)
    var gal = items.filter(function (i) { return /sales gallery/i.test(lab(i)); })[0]; if (ee && gal && CONTACT.test((q('.value', gal) || {}).textContent || '')) gal = null;
    var box = D.createElement('div'); box.className = 'npd';
    box.innerHTML = '<div class="npd-card npd-main"><div class="npd-head">' + (logo && logo.getAttribute('src') ? '<img src="' + esc(logo.getAttribute('src')) + '" alt="">' : '') +
      '<div style="min-width:0"><div class="npd-name" data-np-skip translate="no">' + esc(name) + '</div>' + (area ? '<div class="npd-sub"><span class="npd-w" data-np-skip data-k="dev"></span> · <span data-np-skip translate="no">' + esc(area) + '</span></div>' : '') + '</div></div>' +
      (chips.length ? '<div class="npd-chips">' + chips.map(function (c) { return '<span><i></i><b class="npd-w" data-np-skip data-k="' + c + '" style="font-weight:inherit"></b></span>'; }).join('') + '</div>' : '') +
      (show.length ? '<div class="npd-sum npd-c"></div><button type="button" class="npd-more" data-np-skip></button>' : '') + '</div>' +
      (ee ? '<div class="npd-card npd-ask"><h4 class="npd-w" data-np-skip data-k="ask"></h4><p class="npd-w" data-np-skip data-k="askP"></p><a class="npd-go" href="' + esc(location.pathname.replace(/\/?$/, '/') + 'e-enquiry/#units') + '"><span class="npd-w" data-np-skip data-k="units"></span>' + ARROW + '</a>' +
        (gal ? '<div class="npd-hq"><b class="npd-w" data-np-skip data-k="gal"></b></div>' : '') + '</div>' : '<div class="npd-side"></div>');
    lay.parentNode.insertBefore(box, lay.nextSibling); made.push(box); hide(lay);
    var sum = q('.npd-sum', box); if (sum) show.forEach(function (p) { move(p, sum); });
    if (ee && gal) move(q('.value', gal), q('.npd-hq', box));
    if (!ee) { var side = q('.npd-side', box); qa('.dev-contact-card', lay).forEach(function (c) { if (q('.contact-item', c)) move(c, side); });   // empty cards stay behind (hidden)
      if (!side.children.length) { side.parentNode.removeChild(side); box.style.gridTemplateColumns = '1fr'; } }
    var w = sum ? fold(sum, q('.npd-more', box), 'npd-c') : function () {};
    repaint.push(function () { qa('.npd-w', box).forEach(function (e) { var k = e.getAttribute('data-k'), pj = k === 'ask' ? title() : '', v = k === 'ask' ? (pj ? t('ask', pj) : t('askX')) : t(k); if (e.textContent !== v) e.textContent = v; }); w(); });
  }

  function masterplan() {
    var lay = q('#masterplan .dual-layout'); if (!lay) return;
    var fr = q('.visual-frame', lay), img = fr && q('img', fr), cards = qa('.fact-card', lay);
    var desc = cards.filter(function (c) { return /description/i.test(en(q('.fact-label', c))); })[0], area = cards.filter(function (c) { return /area/i.test(en(q('.fact-label', c))); })[0];
    if (!img && !desc) return;
    var pd = function (re) { var out = null; qa('#project-details .project-detail-item').forEach(function (it) { var l = q('.project-detail-label', it), v = q('.project-detail-value', it); if (!out && l && v && re.test(en(l))) out = v; }); return out; };
    // the chips follow the page's own facts (the site's dictionary translates those after load and on a language switch)
    var src = [area ? q('.fact-value', area) : null, pd(/^total units$/i), pd(/^tenure$/i)], keep = [function (x) { return /\d/.test(x); }, function (x) { return /\d/.test(x); }, function (x) { return !!x && !/^[-\u2013\u2014]+$/.test(x); }];
    var chipVals = function () { return src.map(function (e, i) { var x = e ? tidy(e.textContent) : ''; return x && keep[i](x) ? x : ''; }).filter(Boolean); };
    var chips = chipVals();
    var box = D.createElement('div'); box.className = 'npm';
    box.innerHTML = (img ? '<button type="button" class="npm-pic"><img src="' + esc(img.getAttribute('src')) + '" alt="' + esc(img.getAttribute('alt') || '') + '"><span class="npm-zoom">' + ZOOM + '<span class="npd-w" data-np-skip data-k="big"></span></span></button>' : '') +
      '<div class="npm-txt">' + (chips.length ? '<div class="npm-chips" data-np-skip>' + chips.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' : '') + '<div class="npm-d"></div>' + (desc ? '<button type="button" class="npm-more" data-np-skip></button>' : '') + '</div>';
    if (!img) box.style.gridTemplateColumns = '1fr';
    lay.parentNode.insertBefore(box, lay.nextSibling); made.push(box); hide(lay);
    var cw = q('.npm-chips', box), paintChips = function () { if (!cw) return; var h = chipVals().map(function (c) { return '<span>' + esc(c) + '</span>'; }).join(''); if (cw.innerHTML !== h) cw.innerHTML = h; };
    if (cw && W.MutationObserver) { var mo = new MutationObserver(paintChips); src.forEach(function (e) { if (e) mo.observe(e, { childList: true, characterData: true, subtree: true }); }); obs.push(mo); }
    var pic = q('.npm-pic', box); if (pic) pic.addEventListener('click', function () { if (fr) fr.click(); });
    var w = function () {};
    if (desc) { var dl = q('.fact-label', desc), dv = q('.fact-value', desc), dd = q('.npm-d', box); move(dl, dd); move(dv, dd); dv.classList.add('npm-c'); cls.push([dv, 'npm-c']); w = fold(dv, q('.npm-more', box), 'npm-c'); }
    repaint.push(function () { qa('.npd-w', box).forEach(function (e) { var v = t(e.getAttribute('data-k')); if (e.textContent !== v) e.textContent = v; }); w(); paintChips(); });
  }

  function start() {
    try {
      if (!q('#developer .dev-layout') && !q('#masterplan .dual-layout')) return;
      var css = D.createElement('style'); css.id = 'npdm-css'; css.textContent = CSS; D.head.appendChild(css); made.push(css);
      developer(); masterplan(); H.classList.add('npdm-on');
      var go = function () { repaint.forEach(function (f) { f(); }); }; go();
      new MutationObserver(go).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] });
    } catch (e) { undo(); }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
