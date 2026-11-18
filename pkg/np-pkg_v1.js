/* iNewProject . e-Enquiry page "Sales Package" section (np-pkg v1, 18 Nov 2026).
   The section is the developer's package only: what the developer pays for (SPA / loan legal fees, MOT ...) and other
   package items. It reads the lines the admin already has in #sales-package and sorts them:
     - package lines -> kept as written, one row each with the site's own tick, SPA first, then loan, then MOT;
     - lines with a rebate, discount, cashback, % or nett figure -> never shown (the developer's margin stays private);
     - property lines (price, tenure, car parks, panel banks, "completed" ...) -> not shown here (they belong in Property
       Information);
     - "ask for the latest package" filler and "Not applicable" lines -> not shown (the section says it once, below).
   No package line left -> one honest line instead. The site's promotion band is replaced by one action row:
   Choose your unit (main, with the open-unit count) + Ask about the sales package (fills the enquiry form, goes to it).
   The developer's lines are moved, not copied, so the language switcher keeps translating them; our words follow it
   (EN / BM / 中文). Off: window.NP_PKG_OFF = true. Loaded twice: draws once. */
(function () {
  'use strict';
  if (window.NP_PKG_OFF || window.__npk) return;
  window.__npk = 1;
  var D = document;
  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); if (!l) { try { l = localStorage.getItem('np_lang'); } catch (e) {} } return l === 'ms' || l === 'zh' ? l : 'en'; }
  var W = {
    src: ['From the developer', 'Daripada pemaju', '来自发展商'],
    note: ['Confirm the latest terms with the developer’s sales representative.', 'Sahkan terma terkini dengan wakil jualan pemaju.', '最新条款请向发展商的销售代表确认。'],
    none: ['Sales packages change often. Ask the developer’s sales representative what this project offers now.', 'Pakej jualan kerap berubah. Tanya wakil jualan pemaju apa yang ditawarkan projek ini sekarang.', '销售配套经常更新。请向发展商的销售代表咨询本项目目前的配套。'],
    go: ['Choose your unit', 'Pilih unit anda', '选择您的单位'],
    open: ['{n} open', '{n} dibuka', '开放 {n} 个'],
    ask: ['Ask about the sales package', 'Tanya tentang pakej jualan', '咨询销售配套'],
    msg: ['Hi, I would like to know the latest sales package for {p}.', 'Hai, saya ingin tahu pakej jualan terkini untuk {p}.', '您好，我想了解 {p} 的最新销售配套。']
  };
  function t(k, v) { var s = W[k][{ en: 0, ms: 1, zh: 2 }[lang()]]; if (v) Object.keys(v).forEach(function (x) { s = s.split('{' + x + '}').join(v[x]); }); return s; }

  // what a line is, read from its English (the switcher's key when the page shows BM / 中文)
  var PKG = /\bfree\b|rebate|discount|borne by|cash ?back|furnish|waive|absorb|package for|down ?payment|\bnow RM|\bpay \d+%|return on investment/i;
  var ASK = /^(ask|enquire)\b/i, NA = /not applicable/i;
  var FIG = /rebate|discount|cash ?back|\d\s?%|\bnow RM|nett|net price|return on investment/i;   // never on the site
  function kind(s) {
    if (/rebate|discount|cash ?back|\d+\s?%|now RM/i.test(s)) return 'pct';
    if (/\bSPA\b|sale and purchase/i.test(s)) return 'doc';
    if (/loan/i.test(s)) return 'bank';
    if (/M\.?O\.?T\b|memorandum|transfer|stamp/i.test(s)) return 'stamp';
    return 'gift';
  }
  function key(el) {
    var k = el.getAttribute('data-np-k');
    if (!k) { var c = el.querySelector('[data-np-k]'); k = c && c.getAttribute('data-np-k'); }
    return (k || el.textContent).replace(/\s+/g, ' ').trim();
  }
  function projectName() { var h = D.querySelector('h1'); return (h ? h.textContent : D.title.split('|')[0]).replace(/\s+/g, ' ').trim(); }
  function openCount() {
    var n = 0;
    try { /* the page's own unit data (a top-level const) */
      var bd = typeof BD !== 'undefined' ? BD : null; if (!bd) return 0;   // eslint-disable-line no-undef
      Object.keys(bd).forEach(function (b) { Object.keys(bd[b]).forEach(function (f) { (bd[b][f].wings || []).forEach(function (w) { (w.units || []).forEach(function (u) { if (u.status === 'green') n++; }); }); }); });
    } catch (e) {}
    return n;
  }

  function start() {
    try { draw(); } catch (e) {}   // anything wrong: the site's own section stays as it was
  }
  function draw() {
    var sec = D.getElementById('sales-package'), grid = sec && sec.querySelector('.sp-perk-grid'), promo = sec && sec.querySelector('.sp-promo');
    if (!sec || sec.querySelector('.npk')) return;
    var names = grid ? [].slice.call(grid.querySelectorAll('.sp-perk-name')) : [];
    var keep = names.filter(function (n) { var s = key(n); return PKG.test(s) && !FIG.test(s) && !ASK.test(s) && !NA.test(s); });
    var ORDER = { doc: 0, bank: 1, stamp: 2, gift: 3, pct: 4 };   // SPA, loan, MOT, the rest
    keep = keep.map(function (n, i) { return { n: n, i: i, o: ORDER[kind(key(n))] }; }).sort(function (x, y) { return x.o - y.o || x.i - y.i; }).map(function (x) { return x.n; });
    var red = '#D0021B';
    try { var c = promo && getComputedStyle(promo.querySelector('.sp-promo-cta')).backgroundColor; if (c && !/rgba?\(0, 0, 0(, 0)?\)/.test(c)) red = c; } catch (e) {}
    var css = D.createElement('style'); css.id = 'npk-css';
    css.textContent = [
      '#sales-package.npk-on .sp-perk-grid,#sales-package.npk-on .sp-promo{display:none!important}',
      '.npk{--npk-red:' + red + ';margin-top:6px;font-family:inherit;color:#1f1f1f}',
      '.npk-src{font-size:calc(15px*var(--npk-z,1));line-height:1.5;color:#555;margin:0 0 18px}',
      '.npk-src b{display:inline-block;font-size:calc(13px*var(--npk-z,1));font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--npk-red);margin-right:8px}',
      '.npk-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;column-gap:48px;border-top:1px solid #e6e2dc}',
      '.npk-list.npk-c1{grid-template-columns:minmax(0,640px)}.npk-list.npk-c3{grid-template-columns:repeat(3,minmax(0,1fr));column-gap:40px}',
      '.npk-i{display:flex;align-items:center;gap:16px;padding:18px 0;border-bottom:1px solid #e6e2dc;min-width:0}',
      '.npk-tick{flex:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(208,2,27,.06);color:var(--npk-red);font:900 calc(19px*var(--npk-z,1))/1 "DM Sans",sans-serif}',
      '.npk-i .sp-perk-name{font-size:calc(18px*var(--npk-z,1));line-height:1.45;font-weight:600;color:#1f1f1f;margin:0;min-width:0;overflow-wrap:anywhere}',
      '.npk-empty{display:flex;align-items:center;gap:16px;padding:20px 0;border-top:1px solid #e6e2dc;border-bottom:1px solid #e6e2dc}',
      '.npk-empty p{margin:0;font-size:calc(18px*var(--npk-z,1));line-height:1.5;font-weight:600;color:#1f1f1f;max-width:640px}',
      '.npk-act{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:24px}',
      '.npk-act button{font:inherit;font-size:calc(16px*var(--npk-z,1));font-weight:700;line-height:1.2;border-radius:12px;padding:15px 24px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;min-height:52px}',
      '.npk-go{background:var(--npk-red);color:#fff;border:1.5px solid var(--npk-red);box-shadow:0 6px 18px rgba(208,2,27,.25)}',
      '.npk-go span{font-weight:500;opacity:.9;padding-left:10px;border-left:1px solid rgba(255,255,255,.45)}',
      '.npk-ask{background:#fff;color:var(--npk-red);border:1.5px solid var(--npk-red)}',
      '.npk-act button:hover{filter:brightness(.95)}',
      '.npk-act button:focus-visible{outline:3px solid rgba(208,2,27,.4);outline-offset:2px}',
      '@media (max-width:991.9px){.npk-list,.npk-list.npk-c3{grid-template-columns:1fr}}',
      '@media (max-width:767.9px){.npk-src{font-size:14px}.npk-i{gap:14px;padding:15px 0}.npk-tick{width:30px;height:30px;font-size:18px}.npk-i .sp-perk-name,.npk-empty p{font-size:16px}.npk-act{flex-direction:column;align-items:stretch}.npk-act button{justify-content:center;width:100%}}'
    ].join('\n');
    D.head.appendChild(css);

    var wrap = D.createElement('div'); wrap.className = 'npk';
    // the site runs some screens at 90% (laptops, iPads held sideways): our text scales back up, so it reads the same size everywhere
    function fit() { var z = parseFloat(getComputedStyle(D.documentElement).zoom) || 1; wrap.style.setProperty('--npk-z', z > 0 && z < 1 ? String(Math.round(1e4 / z) / 1e4) : '1'); }
    fit(); addEventListener('resize', fit);
    var head = '<p class="npk-src" data-np-skip=""><b></b><span></span></p>';
    var body = keep.length
      ? '<ul class="npk-list npk-c' + (keep.length === 1 ? 1 : keep.length === 2 || keep.length === 4 ? 2 : 3) + '">' + keep.map(function (n) { return '<li class="npk-i"><span class="npk-tick" aria-hidden="true">\u2713</span></li>'; }).join('') + '</ul>'
      : '<div class="npk-empty"><p data-np-skip=""></p></div>';
    var n = openCount(), units = !!D.getElementById('booking');
    wrap.innerHTML = head + body + '<div class="npk-act" data-np-skip="">' + (units ? '<button type="button" class="npk-go"><b></b>' + (n ? '<span></span>' : '') + '</button>' : '') + '<button type="button" class="npk-ask"></button></div>';
    function paint() {
      wrap.querySelector('.npk-src b').textContent = t('src'); wrap.querySelector('.npk-src span').textContent = t('note');
      var e = wrap.querySelector('.npk-empty p'); if (e) e.textContent = t('none');
      var g = wrap.querySelector('.npk-go b'); if (g) g.textContent = t('go'); var o = wrap.querySelector('.npk-go span'); if (o) o.textContent = t('open', { n: n });
      wrap.querySelector('.npk-ask').textContent = t('ask');
    }
    paint();
    if (units) wrap.querySelector('.npk-go').addEventListener('click', function () {
      var bk = D.getElementById('booking'); if (!bk) return;
      if (typeof scrollToSection === 'function' && innerWidth >= 768) scrollToSection('booking');   // eslint-disable-line no-undef
      else scrollTo({ top: bk.getBoundingClientRect().top + scrollY + 1, behavior: 'smooth' });
    });
    wrap.querySelector('.npk-ask').addEventListener('click', function () {
      var m = D.getElementById('srMessage'); if (m && !m.value) { m.value = t('msg', { p: projectName() }); m.dispatchEvent(new Event('input', { bubbles: true })); }
      if (typeof scrollToSection === 'function') scrollToSection('contact-us'); else { var c = D.getElementById('contact-us'); if (c) c.scrollIntoView({ behavior: 'smooth' }); }   // eslint-disable-line no-undef
    });
    // last, all at once: our block in, the developer's lines moved into it (their switcher key intact), the site's grid + band hidden
    (grid || sec.querySelector('.sp-head')).parentNode.insertBefore(wrap, grid ? grid : sec.querySelector('.sp-head').nextSibling);
    if (keep.length) [].slice.call(wrap.querySelectorAll('.npk-i')).forEach(function (li, i) { li.appendChild(keep[i]); });
    sec.classList.add('npk-on');
    new MutationObserver(function () { try { paint(); } catch (e) {} }).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
