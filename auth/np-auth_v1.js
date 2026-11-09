/* iNewProject log in + sign up (9 Nov 2026), auth/np-auth_v1.js
   Runs only on /member/login/ and /register/. Restyles the site's own forms (same fields, same handlers, same
   requests): one card on the dusk with the homepage's house; sign-up in short steps (member 2, developer 3);
   inline messages instead of pop-up alerts; a show-password button (Confirm password is filled from it); a
   success card after sign-up; the sign-up page's Privacy Policy / Terms links go to those pages.
   Text is English here; BM / Chinese come from the dictionaries like every other page. */
(function () {
  'use strict';
  var w = window, d = document, de = d.documentElement;
  if (w.__NPA__) return;
  var path = location.pathname;
  if (!/^\/(member\/login|register)\/?$/.test(path)) return;
  w.__NPA__ = true;
  var LOGIN = /^\/member\/login/.test(path);
  var HOUSE = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@5cf55b48e4d3c0c2bcf89ad170beec33794b56c0/search/nl/nl-house_';
  var reEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;   // the page's own checks
  var rePhone = /^\+?(?:[0-9\-] ?){6,14}[0-9]$/;

  var P = 'html.np-auth:not(#npa):not(#npb) ';
  var DUSK = 'linear-gradient(180deg,#F6CFAF 0%,#F9DCC4 38%,#FCEADB 72%,#FEF4EA 100%)';
  var SH = '0 1px 2px rgba(120,64,24,.08),0 12px 28px rgba(160,90,40,.14),0 36px 72px rgba(200,120,60,.16)';
  var css = [
    /* page */
    P + '.auth-page,' + P + '.auth-reg-page{position:relative;overflow:hidden;background:' + DUSK + ';font-family:"DM Sans",system-ui,sans-serif;color:#141414}',
    P + '.npa-house{display:block;width:100%;height:auto;pointer-events:none;user-select:none}',
    /* login: house on top on phones, beside the card from 992 px */
    P + '.auth-page{min-height:0;padding:12px 16px 48px}',
    P + '.auth-page .npa-house{max-width:560px;margin:0 auto -40px}',
    '@media (min-width:992px){' + P + '.auth-page{display:grid;grid-template-columns:440px minmax(0,640px);justify-content:center;align-items:center;column-gap:56px;padding:48px 24px 0}' +
      P + '.auth-page .npa-house{grid-column:2;grid-row:1;align-self:end;max-width:none;margin:0 0 -6px}' + P + '.auth-page .auth-card{grid-column:1;grid-row:1;margin:0 0 56px}}',
    /* card */
    P + '.auth-card,' + P + '.auth-reg-card{position:relative;border:0;border-radius:28px;background:rgba(255,255,255,.97);box-shadow:' + SH + '}',
    P + '.auth-card{max-width:440px;overflow:visible}',
    /* Member / Developer switch */
    P + '.auth-tabs{display:flex;flex-wrap:nowrap;gap:4px;margin:20px 20px 0;padding:4px;background:#f6efe8;border-radius:12px}',
    P + '.auth-reg-header{max-width:960px;margin:0 auto 20px}' + P + '.auth-reg-header .auth-tabs{max-width:360px;margin:0 auto;background:rgba(255,255,255,.55)}',
    P + '.auth-tab-btn{flex:1 1 0;min-width:0;justify-content:center;height:44px;padding:0 10px;border:0;border-radius:8px;background:transparent;color:#6b5444;font-size:16px;font-weight:600;line-height:1.1;white-space:normal;text-align:center;transition:none}',
    P + '.auth-tab-btn:hover{color:#141414;border:0}',
    P + '.auth-tab-btn.active{background:#fff;color:#141414;box-shadow:0 1px 3px rgba(120,64,24,.18)}',
    P + '.auth-tab-btn:focus-visible{outline:2px solid #D0021B;outline-offset:2px}',
    /* panels + text */
    P + '.auth-panel{padding:18px 20px 24px}',
    P + '.auth-reg-page .auth-panel{padding:0}',
    P + '.auth-form-title{font-size:28px;font-weight:700;letter-spacing:-.4px;line-height:1.15;margin:4px 0 18px;color:#141414}',
    P + '.auth-card .auth-form-sub{display:none}',
    P + '.auth-reg-page .auth-form-sub{font-size:16px;color:#6b5444;margin:-10px 0 18px!important}',
    P + '.auth-field{margin-bottom:14px}',
    P + '.auth-field label{display:block;font-size:15px;font-weight:600;color:#3b2d22;margin-bottom:6px}',
    P + '.auth-field .form-control{height:52px;border:1.5px solid #eadfd4;border-radius:12px;padding:0 16px;font-size:16px;background:#fffdfb;color:#141414;box-shadow:none;transition:none}',
    P + '.auth-field .form-control::placeholder{color:#9c8778}',
    P + '.auth-field .form-control:focus{border-color:#D0021B;background:#fff;box-shadow:0 0 0 4px rgba(208,2,27,.10)}',
    P + '.auth-field .form-control.npa-bad{border-color:#b00016;background:#fff8f8}',
    P + '.npa-err{margin-top:6px;font-size:15px;line-height:1.4;color:#b00016;font-weight:500}',
    P + '.auth-forgot{display:block;width:max-content;margin:-4px 0 16px auto;font-size:15px;color:#6b5444;font-weight:500}',
    P + '.auth-forgot:hover{color:#D0021B}',
    P + '.auth-submit-btn{display:block;width:100%;height:54px;padding:0 16px;border:0;border-radius:12px;background:#D0021B;color:#fff;font-size:17px;font-weight:700;letter-spacing:0;box-shadow:0 8px 20px rgba(208,2,27,.26);transition:none;margin:4px 0 0}',
    P + '.auth-submit-btn:hover,' + P + '.auth-submit-btn:focus{background:#b00016;color:#fff}',
    P + '.auth-submit-btn:focus-visible{outline:2px solid #141414;outline-offset:2px}',
    P + '.auth-loading{height:54px;margin:4px 0 0;border-radius:12px;background:#D0021B;color:#fff;font-size:16px;font-weight:600;line-height:54px;padding:0 16px;text-align:center;opacity:.92}',
    P + '.auth-loading::before{content:"";display:inline-block;width:18px;height:18px;margin:0 10px -3px 0;border:2.5px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:npaSpin .8s linear infinite}',
    P + '.npa-in .auth-loading::before{width:16px;height:9px;margin:0 10px 2px 0;border:0;border-left:3px solid #fff;border-bottom:3px solid #fff;border-radius:0;transform:rotate(-45deg);animation:npaPop .25s ease-out both}',
    P + '.auth-divider{border-top:1px solid #f1e6dc;margin:20px 0 16px}',
    P + '.auth-footer-note{font-size:15px;color:#5a4636;line-height:1.5}',
    P + '.auth-footer-note a{color:#D0021B;font-weight:700}',
    P + '.style-msg.errormsg,' + P + '.style-msg.successmsg{border-radius:12px;padding:12px 14px;font-size:15px;line-height:1.45;border:0}',
    P + '.style-msg.errormsg{background:#fdecee;color:#8a0012}',
    P + '.style-msg.successmsg{background:#eaf6ee;color:#14532d}',
    /* show password */
    P + '.npa-pw{position:relative;display:block}',
    P + '.npa-pw .form-control{padding-right:56px}',
    P + '.npa-eye{position:absolute;right:4px;top:4px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:0;border-radius:8px;background:transparent;color:#6b5444;padding:0;cursor:pointer}',
    P + '.npa-eye:hover{color:#141414;background:#f6efe8}',
    P + '.npa-eye:focus-visible{outline:2px solid #D0021B}',
    P + '.npa-eye svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    P + '.npa-eye .npa-x{display:none}' + P + '.npa-eye[aria-pressed="true"] .npa-x{display:inline}',
    P + '.npa-hide{display:none!important}',
    P + '.auth-reg-right,' + P + '.auth-field,' + P + '.auth-tnc{scroll-margin-top:136px}',   // clear of the sticky header when we scroll to it
    /* sign-up: card, left panel */
    P + '.auth-reg-page{padding:28px 16px 64px}',
    P + '.auth-reg-card{max-width:960px;overflow:hidden;grid-template-columns:5fr 7fr}',
    P + '.auth-reg-left{position:relative;overflow:hidden;background:' + DUSK + ';padding:36px 32px 0;display:flex;flex-direction:column}',
    P + '.auth-reg-left-title{font-size:28px;font-weight:700;letter-spacing:-.4px;line-height:1.15;color:#141414;margin:0 0 6px}',
    P + '.auth-reg-left-sub{font-size:16px;color:#5a4636;margin:0 0 22px}',
    P + '.auth-benefit{gap:12px;margin-bottom:12px}',
    P + '.auth-benefit-icon{width:22px;min-width:22px;height:22px;background:#D0021B}',
    P + '.auth-benefit-icon svg{width:11px;height:11px;stroke:#fff;stroke-width:3}',
    P + '.auth-benefit-text{font-size:16px;color:#3b2d22;line-height:1.45}',
    P + '.auth-reg-left .npa-house{margin:auto -24px -6px -40px;width:calc(100% + 64px);max-width:none;padding-top:18px}',
    P + '#proj-tab-advertiser .auth-reg-left{background:#141414}',
    P + '#proj-tab-advertiser .auth-reg-left-title{color:#fff}' + P + '#proj-tab-advertiser .auth-reg-left-sub{color:#e2d4c8}',
    P + '#proj-tab-advertiser .auth-benefit-text{color:#efe5dc}' + P + '#proj-tab-advertiser .auth-reg-left{padding-bottom:28px}',
    P + '.auth-reg-right{padding:32px 36px 36px}',
    P + '.auth-section-label{display:none}',
    P + '.auth-tnc{flex-wrap:wrap;gap:12px;margin:8px 0 18px;font-size:16px;color:#3b2d22;line-height:1.45}',
    P + '.auth-tnc label{flex:1 1 0;min-width:0;margin:0}' + P + '.auth-tnc .npa-err{flex:1 0 100%;margin-top:-4px}',
    P + '.auth-tnc input[type="checkbox"]{width:22px;height:22px;margin:0;accent-color:#D0021B}',
    P + '.auth-tnc a{color:#D0021B!important;font-weight:600}',
    P + '.npa-one{grid-template-columns:1fr!important}',
    /* steps */
    P + '.npa-prog{margin:0 0 18px}',
    P + '.npa-prog-t{display:flex;justify-content:space-between;gap:12px;font-size:15px;font-weight:600;color:#6b5444;margin-bottom:8px}',
    P + '.npa-bar{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:6px}',
    P + '.npa-bar i{display:block;height:6px;border-radius:999px;background:#f1e6dc}',
    P + '.npa-bar i.on{background:#D0021B}',
    P + 'form[data-npa-cur] [data-npa-step]{display:none}',
    P + 'form[data-npa-cur="1"] [data-npa-step="1"],' + P + 'form[data-npa-cur="2"] [data-npa-step="2"],' + P + 'form[data-npa-cur="3"] [data-npa-step="3"]{display:block}',
    P + 'form[data-npa-cur="1"] .auth-field-row[data-npa-step="1"],' + P + 'form[data-npa-cur="2"] .auth-field-row[data-npa-step="2"],' + P + 'form[data-npa-cur="3"] .auth-field-row[data-npa-step="3"]{display:grid}',
    P + 'form[data-npa-cur="1"] .auth-tnc[data-npa-step="1"],' + P + 'form[data-npa-cur="2"] .auth-tnc[data-npa-step="2"],' + P + 'form[data-npa-cur="3"] .auth-tnc[data-npa-step="3"]{display:flex}',
    P + 'form[data-npa-cur] .auth-loading[data-npa-step]:not([style*="block"]){display:none!important}',
    P + 'form[data-npa-cur] .auth-submit-btn[data-npa-step][style*="none"]{display:none!important}',
    P + '.npa-back{display:block;margin:12px auto 0;height:44px;padding:0 16px;border:0;background:none;font-size:16px;font-weight:600;color:#5a4636;cursor:pointer}',
    P + '.npa-back:hover{color:#141414}',
    P + '.npa-back:focus-visible{outline:2px solid #D0021B;border-radius:8px}',
    /* success */
    P + '.npa-done{display:flex;flex-direction:column;gap:16px;animation:npaFly .7s cubic-bezier(.2,.8,.2,1) both}',
    P + '.npa-ok{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:700;color:#1d7a3a}',
    P + '.npa-ok svg{width:22px;height:22px;fill:none;stroke:#1d7a3a;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}',
    P + '.npa-mcard{position:relative;border-radius:28px;padding:8px;background:linear-gradient(180deg,#F6CFAF 0%,#FCEADB 100%);box-shadow:0 16px 40px rgba(170,95,40,.22)}',
    P + '.npa-mcard-art{position:relative;border-radius:20px;overflow:hidden;height:190px;background:' + DUSK + '}',
    P + '.npa-mcard-art .npa-house{position:absolute;right:-60px;bottom:-12px;width:400px;max-width:none}',
    P + '.npa-chip{position:absolute;left:22px;top:22px;padding:6px 10px;border-radius:999px;background:#141414;color:#fff;font-size:13px;font-weight:700;letter-spacing:1.4px;line-height:1}',
    P + '.npa-mcard-name{padding:14px 12px 8px;font-size:24px;font-weight:700;line-height:1.2;overflow-wrap:anywhere}',
    P + '.npa-dev .npa-mcard{background:#141414}' + P + '.npa-dev .npa-mcard-name{color:#fff}' + P + '.npa-dev .npa-chip{background:#fff;color:#141414}',
    P + '.npa-dev .npa-chip{position:static;display:inline-block;margin:14px 12px 0}',
    P + '.npa-msg{font-size:16px;line-height:1.5;color:#3b2d22}',
    P + 'a.npa-cta{display:flex;align-items:center;justify-content:center;text-decoration:none}',
    /* phones */
    '@media (max-width:768px){' + P + '.auth-reg-card{grid-template-columns:1fr}' + P + '.auth-reg-left{padding:20px 20px 0}' +
      P + '.auth-reg-left-title,' + P + '.auth-reg-left-sub,' + P + '.auth-reg-left .auth-benefit,' + P + '#proj-tab-advertiser .auth-reg-left{display:none}' +
      P + '.auth-reg-left .npa-house{width:calc(100% + 40px);margin:0 -20px -4px;padding-top:0}' + P + '.auth-reg-right{padding:24px 20px 28px}' +
      P + '.auth-field-row{grid-template-columns:1fr;gap:0}' + P + '.auth-reg-header .auth-tabs{max-width:none}}',
    '@media (max-width:359px){' + P + '#recaptcha1,' + P + '#recaptcha2{transform:scale(.85);transform-origin:0 0;height:67px;width:261px}}',   // Google\'s box is 304 px wide: fits from 360 px
    '@media (max-width:480px){' + P + '.auth-tabs{margin:16px 16px 0}' + P + '.auth-panel{padding:16px 16px 22px}' + P + '.auth-card{border-radius:24px}' +
      P + '.auth-form-title{font-size:26px}' + P + '.auth-reg-page{padding:20px 12px 48px}' + P + '.auth-reg-right{padding:22px 16px 26px}}',
    /* laptops: html zoom .9, so reading text is set a step up to stay at least 14 px on screen */
    '@media (min-width:1200px){' + P + '.auth-field label,' + P + '.auth-forgot,' + P + '.auth-footer-note,' + P + '.npa-err,' + P + '.npa-prog-t,' + P + '.style-msg.errormsg,' + P + '.style-msg.successmsg{font-size:16px}' +
      P + '.auth-tab-btn,' + P + '.auth-tnc,' + P + '.auth-benefit-text,' + P + '.npa-msg,' + P + '.auth-reg-page .auth-form-sub,' + P + '.auth-reg-left-sub{font-size:17px}' + P + '.npa-chip{font-size:14px}' +
      P + '.auth-tab-btn,' + P + '.npa-back{height:49px}' + P + '.auth-field .form-control{height:57px}' + P + '.npa-eye{width:49px;height:49px}}',   // 44 px on screen at zoom .9
    '@keyframes npaSpin{to{transform:rotate(360deg)}}',
    '@keyframes npaPop{0%{opacity:0;transform:rotate(-45deg) scale(.4)}100%{opacity:1;transform:rotate(-45deg) scale(1)}}',
    '@keyframes npaFly{0%{opacity:0;transform:translateY(40px) scale(.96)}60%{opacity:1;transform:translateY(-4px) scale(1.005)}100%{opacity:1;transform:none}}',
    '@media (prefers-reduced-motion:reduce){' + P + '.npa-done{animation:none}' + P + '.auth-loading::before{animation-duration:2s}}'
  ].join('');

  function el(tag, cls, text) { var e = d.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function $id(id) { return d.getElementById(id); }
  function svg(paths) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths + '</svg>'; }
  function house(sizes, lazy) {
    var i = el('img', 'npa-house'); i.alt = ''; i.setAttribute('aria-hidden', 'true'); i.decoding = 'async'; if (lazy) i.loading = 'lazy';
    i.src = HOUSE + '1130.webp'; i.srcset = HOUSE + '565.webp 565w, ' + HOUSE + '1130.webp 1130w, ' + HOUSE + '2260.webp 2260w'; i.sizes = sizes;
    i.width = 1130; i.height = 547; return i;
  }

  /* inline messages (instead of the page's pop-up alerts) */
  function clearErr(inp) {
    if (!inp) return; inp.classList.remove('npa-bad'); inp.removeAttribute('aria-invalid');
    var f = inp.closest('.auth-field, .auth-tnc'), m = f && f.querySelector('.npa-err'); if (m) m.parentNode.removeChild(m);
  }
  function setErr(inp, msg) {
    clearErr(inp);
    var f = inp.closest('.auth-field, .auth-tnc'); if (!f) return;
    if (inp.classList.contains('form-control')) { inp.classList.add('npa-bad'); inp.setAttribute('aria-invalid', 'true'); }
    var m = el('div', 'npa-err', msg); m.setAttribute('role', 'alert'); f.appendChild(m);
  }
  function v(id) { var e = $id(id); return e ? String(e.value || '') : ''; }
  // each check: [field id, test(value) -> message or '']
  function need(m) { return function (x) { return x ? '' : m; }; }
  function email(m1) { return function (x) { return !x ? m1 : (reEmail.test(x) ? '' : 'Please enter a valid email address.'); }; }
  function phone(m1, m2) { return function (x) { return !x ? m1 : (rePhone.test(x) ? '' : m2); }; }
  function check(list) {
    var first = null;
    list.forEach(function (c) {
      var inp = $id(c[0]); if (!inp) return;
      var msg = c[1](c[0] === 'tnc' || c[0] === 'tnc_2' ? (inp.checked ? '1' : '') : v(c[0]));
      if (msg) { setErr(inp, msg); if (!first) first = inp; } else clearErr(inp);
    });
    if (first) { try { first.focus({ preventScroll: true }); first.closest('.auth-field, .auth-tnc').scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} }
    return !first;
  }
  function captchaOk(name, fieldId) {
    try {
      if (!w.grecaptcha || typeof w[name] === 'undefined') return true;
      if (w.grecaptcha.getResponse(w[name]) !== '') { clearErr($id(fieldId)); return true; }
      var box = $id(fieldId); if (box) { var f = box.closest('.auth-field'); if (f) { var o = f.querySelector('.npa-err'); if (o) o.remove(); var m = el('div', 'npa-err', 'Please complete the captcha.'); m.setAttribute('role', 'alert'); f.appendChild(m); } }
      return false;
    } catch (e) { return true; }
  }

  /* show password; on sign-up the Confirm box is filled from it and hidden */
  function eye(inp, twin) {
    if (!inp || inp.parentNode.classList.contains('npa-pw')) return;
    var wrap = el('span', 'npa-pw'); inp.parentNode.insertBefore(wrap, inp); wrap.appendChild(inp);
    var b = el('button', 'npa-eye'); b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', 'Show password');
    b.setAttribute('aria-controls', inp.id);
    b.innerHTML = svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle><path class="npa-x" d="M4 4l16 16"></path>');
    b.addEventListener('click', function () {   // a toggle: the name stays, aria-pressed says whether it is shown
      var on = inp.type === 'password'; inp.type = on ? 'text' : 'password'; b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    wrap.appendChild(b);
    if (twin) {
      var sync = function () { twin.value = inp.value; }; inp.addEventListener('input', sync); inp.addEventListener('change', sync); sync();
      var tf = twin.closest('.auth-field'); if (tf) tf.classList.add('npa-hide');
      var row = inp.closest('.auth-field-row'); if (row) row.classList.add('npa-one');
      inp.setAttribute('autocomplete', 'new-password');
    }
  }

  /* steps for the sign-up forms */
  var STEPS = {
    registerForm: { names: ['About you', 'Set a password'], fields: [['firstname', 'lastname', 'email', 'contactNo'], ['password', 'repassword', 'recaptcha1', 'tnc', 'registerSubmit']],
      checks: [[['firstname', need('Please enter your first name.')], ['email', email('Please enter your email address.')], ['contactNo', phone('Please enter your contact number.', 'Please enter a valid contact number.')]],
               [['password', need('Please enter a password.')], ['tnc', need('You must agree to the privacy policy & terms of service.')]]],
      captcha: ['recaptcha1', 'recaptcha1'], pw: ['password', 'repassword'] },
    registerForm2: { names: ['Company', 'Your details', 'Password'], fields: [['compname_2', 'compaddr_2', 'contactNo_2'], ['firstname_2', 'lastname_2', 'email_2', 'contactNo2_2'], ['password_2', 'repassword_2', 'recaptcha2', 'tnc_2', 'registerSubmit_2']],
      checks: [[['compname_2', need('Please enter your company name.')], ['compaddr_2', need('Please enter your company address.')], ['contactNo_2', phone('Please enter your office tel number.', 'Please enter a valid office tel number.')]],
               [['firstname_2', need('Please enter your first name.')], ['email_2', email('Please enter your email address.')], ['contactNo2_2', phone('Please enter your mobile number.', 'Please enter a valid mobile number.')]],
               [['password_2', need('Please enter a password.')], ['tnc_2', need('You must agree to the privacy policy & terms of service.')]]],
      captcha: ['recaptcha2', 'recaptcha2'], pw: ['password_2', 'repassword_2'] }
  };
  function stepOf(form, n) { return +form.getAttribute('data-npa-cur') === n; }
  function prog(form, n) {
    var s = STEPS[form.id], total = s.names.length, old = form.querySelector('.npa-prog');
    var p = el('div', 'npa-prog'), t = el('div', 'npa-prog-t');
    t.appendChild(el('span', '', 'Step ' + n + ' of ' + total)); t.appendChild(el('span', '', s.names[n - 1]));
    var bar = el('div', 'npa-bar'); bar.setAttribute('aria-hidden', 'true');
    for (var i = 1; i <= total; i++) bar.appendChild(el('i', i <= n ? 'on' : ''));
    p.appendChild(t); p.appendChild(bar);
    if (old) old.parentNode.replaceChild(p, old); else form.insertBefore(p, form.firstChild);   // a new node each time, so the dictionaries translate it
  }
  function go(form, n, focus) {
    form.setAttribute('data-npa-cur', String(n)); prog(form, n);
    if (focus) {
      var f = form.querySelector('[data-npa-step="' + n + '"] .form-control');
      try { if (f) f.focus({ preventScroll: true }); var top = form.closest('.auth-reg-right') || form; var r = top.getBoundingClientRect(); if (r.top < 0 || r.top > innerHeight * .5) top.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) {}
    }
  }
  function steps(form) {
    var s = STEPS[form.id]; if (!s || form.hasAttribute('data-npa-cur')) return;
    var total = s.names.length;
    s.fields.forEach(function (ids, i) {
      ids.forEach(function (id) {
        var e = $id(id); if (!e || !form.contains(e)) return;
        var box = id === s.fields[i][s.fields[i].length - 1] && /Submit/.test(id) ? e : (e.closest('.auth-field-row') || e.closest('.auth-field') || e.closest('.auth-tnc') || e);
        box.setAttribute('data-npa-step', String(i + 1));
      });
    });
    var load = form.querySelector('.auth-loading'); if (load) load.setAttribute('data-npa-step', String(total));
    for (var i = 1; i <= total; i++) {
      if (i < total) {
        var nx = el('button', 'auth-submit-btn npa-next', 'Continue'); nx.type = 'button'; nx.setAttribute('data-npa-step', String(i));
        (function (k) { nx.addEventListener('click', function () { if (check(s.checks[k - 1])) go(form, k + 1, true); }); })(i);
        var anchor = form.querySelector('[data-npa-step="' + (i + 1) + '"]'); form.insertBefore(nx, anchor);
      }
      if (i > 1) {
        var bk = el('button', 'npa-back', 'Back'); bk.type = 'button'; bk.setAttribute('data-npa-step', String(i));
        (function (k) { bk.addEventListener('click', function () { go(form, k - 1, true); }); })(i);
        form.appendChild(bk);
      }
    }
    // Enter on an early step goes to the next step instead of sending the form
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.target.tagName !== 'INPUT' || e.target.type === 'checkbox') return;
      var cur = +form.getAttribute('data-npa-cur'); if (cur >= total) return;
      e.preventDefault(); var b = form.querySelector('.npa-next[data-npa-step="' + cur + '"]'); if (b) b.click();
    });
    go(form, 1, false);
  }

  /* the final button: check first, so the page's alert never shows; then the page's own handler sends it */
  function guard(btnId, fn) {
    d.addEventListener('click', function (e) {
      var b = e.target && e.target.closest && e.target.closest('#' + btnId); if (!b) return;
      if (!fn()) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
    }, true);
  }

  /* after sign-up: the page clears the form and shows its message; we show a card with that message */
  var SENT = {};
  function done(kind, data) {
    var form = $id(kind === 'dev' ? 'registerForm2' : 'registerForm'); if (!form) return;
    var right = form.closest('.auth-reg-right'); if (!right) return;
    var old = right.querySelector('.npa-done'); if (old) old.remove();
    var name = SENT[kind] || '';
    var box = el('div', 'npa-done' + (kind === 'dev' ? ' npa-dev' : ''));
    var ok = el('div', 'npa-ok'); ok.innerHTML = svg('<circle cx="12" cy="12" r="10"></circle><path d="M7.5 12.5l3 3 6-6.5"></path>'); ok.appendChild(el('span', '', 'Account created'));
    var card = el('div', 'npa-mcard');
    if (kind !== 'dev') { var art = el('div', 'npa-mcard-art'); art.appendChild(house('400px', true)); card.appendChild(art); }
    card.appendChild(el('div', 'npa-chip', kind === 'dev' ? 'DEVELOPER' : 'MEMBER'));   // its own block, so the dictionaries see the word alone
    if (name) { var nm = el('div', 'npa-mcard-name', name); nm.setAttribute('data-np-skip', ''); nm.setAttribute('translate', 'no'); card.appendChild(nm); }
    box.appendChild(ok); box.appendChild(card);
    var msg = String((data && data.msg) || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (msg) box.appendChild(el('p', 'npa-msg', msg));
    var cta = el('a', 'auth-submit-btn npa-cta', 'Log in now'); cta.href = 'https://www.inewproject.com/member/login/?log=' + (kind === 'dev' ? 'tb2' : 'tb1');
    box.appendChild(cta);
    Array.prototype.forEach.call(right.children, function (c) { c.classList.add('npa-hide'); });
    right.appendChild(box);
    var n = $id('noticeDiv'); if (n) n.style.display = 'none';
    setTimeout(function () { try { halt(); right.scrollIntoView({ block: 'start', behavior: 'smooth' }); cta.focus({ preventScroll: true }); } catch (e) {} }, 60);
  }
  // the page scrolls to its message 20 px from the top, under the sticky header: stop that, we scroll ourselves
  function halt() { try { if (w.jQuery) w.jQuery('html,body').stop(true); } catch (e) {} }
  function hookAjax() {
    var $ = w.jQuery; if (!$ || !$.ajaxPrefilter) return setTimeout(hookAjax, 200);
    $.ajaxPrefilter(function (opts, orig, xhr) {
      try {
        var url = String((opts && opts.url) || ''), kind = /\/register\/process\//.test(url) ? 'member' : /\/register\/devprocess\//.test(url) ? 'dev' :
          /\/member\/(dev)?login\/process\//.test(url) ? 'login' : '';
        if (!kind || !xhr || !xhr.done) return;
        xhr.done(function (r) {
          try {
            if (typeof r === 'string') r = JSON.parse(r);
            if (kind === 'login') { if (r && r.status == true) { var c = d.querySelector('.auth-card'); if (c) c.classList.add('npa-in'); } return; }
            if (r && r.status == true) setTimeout(function () { done(kind, r); }, 0);
            else {   // the message stays next to the button, not at the top of the page
              var n = $id('noticeDiv'), f = $id(kind === 'dev' ? 'registerForm2' : 'registerForm');
              if (n && f) { var at = f.querySelector('.auth-submit-btn[data-npa-step]:not(.npa-next)') || f.lastChild; f.insertBefore(n, at); n.style.margin = '0 0 14px';
                setTimeout(function () { try { halt(); n.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} }, 30); }
            }
          } catch (e) {}
        });
      } catch (e) {}
    });
  }

  function init() {
    var page = d.querySelector(LOGIN ? '.auth-page' : '.auth-reg-page'); if (!page || page.hasAttribute('data-npa')) return;
    page.setAttribute('data-npa', '');
    var st = el('style'); st.id = 'np-auth-css'; st.textContent = css; (d.head || de).appendChild(st);
    de.classList.add('np-auth');
    // Member / Developer: shorter names that fit one line in every language
    var t1 = $id('tb1'), t2 = $id('tb2');
    if (t1 && /^\s*Member \/ Investor\s*$/.test(t1.textContent)) t1.textContent = 'Member';
    if (t2 && /^\s*Advertiser \/ Developer\s*$/.test(t2.textContent)) t2.textContent = 'Developer';
    [t1, t2].forEach(function (b) { if (b) { b.setAttribute('type', 'button'); b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false'); } });
    var tabs = page.querySelector('.auth-tabs');
    if (tabs) new MutationObserver(function () { [t1, t2].forEach(function (b) { if (b) b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false'); }); })
      .observe(tabs, { subtree: true, attributes: true, attributeFilter: ['class'] });
    if (LOGIN) {
      page.insertBefore(house('(min-width: 992px) 640px, min(100vw, 560px)'), page.firstChild);
      var dt = d.querySelector('#proj-tab-advertiser .auth-form-title'); if (dt && /^\s*Advertiser Login\s*$/.test(dt.textContent)) dt.textContent = 'Developer log in';
      eye($id('loginpwd')); eye($id('loginpwd2'));
      guard('loginSubmit', function () { return check([['loginemail', email('Please enter your email address.')], ['loginpwd', need('Please enter your password.')]]); });
      guard('loginSubmit2', function () { return check([['loginemail2', email('Please enter your email address.')], ['loginpwd2', need('Please enter your password.')]]); });
      ['loginemail', 'loginpwd', 'loginemail2', 'loginpwd2'].forEach(function (id) { var e = $id(id); if (e) e.addEventListener('input', function () { clearErr(e); }); });
      ['loginForm', 'loginForm2'].forEach(function (id, i) {   // Enter in the boxes = the button, through our check
        var f = $id(id); if (f) f.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); var b = $id(i ? 'loginSubmit2' : 'loginSubmit'); if (b && b.offsetParent) b.click(); } });
      });
    } else {
      Array.prototype.forEach.call(page.querySelectorAll('.auth-reg-left'), function (left) {
        if (left.closest('#proj-tab-member')) left.appendChild(house('(min-width: 769px) 460px, 100vw', true));
      });
      Array.prototype.forEach.call(page.querySelectorAll('.auth-tnc a'), function (a) {   // the links went nowhere (#)
        var t = a.textContent.trim().toLowerCase();
        if (/privacy/.test(t)) a.href = 'https://www.inewproject.com/privacy-policy/'; else if (/terms/.test(t)) a.href = 'https://www.inewproject.com/terms-of-use/'; else return;
        a.target = '_blank'; a.rel = 'noopener';
      });
      Object.keys(STEPS).forEach(function (fid) {
        var f = $id(fid); if (!f) return; var s = STEPS[fid];
        eye($id(s.pw[0]), $id(s.pw[1]));
        steps(f);
        s.fields.forEach(function (ids) { ids.forEach(function (id) { var e = $id(id); if (e && e.tagName === 'INPUT') e.addEventListener(e.type === 'checkbox' ? 'change' : 'input', function () { clearErr(e); }); }); });
        var btn = s.fields[s.fields.length - 1].slice(-1)[0];
        guard(btn, function () {
          var ok = true;
          s.checks.forEach(function (c, k) { if (!ok) return; if (!check(c)) { ok = false; if (!stepOf(f, k + 1)) { go(f, k + 1, false); check(c); } } });
          if (ok && !captchaOk(s.captcha[0], s.captcha[1])) ok = false;
          if (ok) SENT[fid === 'registerForm2' ? 'dev' : 'member'] = fid === 'registerForm2' ? v('compname_2').trim().slice(0, 80) : v('firstname').trim().slice(0, 40);
          return ok;
        });
      });
    }
    hookAjax();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
