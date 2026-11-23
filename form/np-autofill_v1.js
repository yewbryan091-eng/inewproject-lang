/*
 * np-autofill v1 (23 Nov 2026): tells the phone what each enquiry field is, so iPhone and Android offer the buyer's saved
 * name, phone and email in one tap. Invisible: no words, no layout, nothing else changes.
 *   name  -> autocomplete=name,  capital letters per word, no autocorrect
 *   phone -> autocomplete=tel,   phone keypad
 *   email -> autocomplete=email, email keyboard, no capitals, no autocorrect
 * Forms: unit e-Enquiry (rf*), the developer's sales representative (sr*), the enquiry and email pop-ups (enquiry*, email*),
 * and the plain listing form (eq*). The site's own checks and send are untouched. Attributes already set are kept.
 * Off switch: window.NP_AUTOFILL_LIVE = false.
 */
(function () {
  'use strict';
  if (window.NP_AUTOFILL_LIVE === false || window.__npautofill) return;
  window.__npautofill = 1;
  var D = document;
  var KIND = {
    name: { autocomplete: 'name', autocapitalize: 'words', autocorrect: 'off', spellcheck: 'false' },
    tel: { autocomplete: 'tel', inputmode: 'tel' },
    email: { autocomplete: 'email', inputmode: 'email', autocapitalize: 'none', autocorrect: 'off', spellcheck: 'false' }
  };
  var FIELDS = [
    ['rfName', 'name'], ['rfPhone', 'tel'], ['rfEmail', 'email'],
    ['srName', 'name'], ['srPhone', 'tel'], ['srEmail', 'email'],
    ['enquiryName', 'name'], ['enquiryPhone', 'tel'], ['enquiryEmail', 'email'],
    ['emailName', 'name'], ['emailPhone', 'tel'], ['emailAddress', 'email'],
    ['eqName', 'name'], ['eqPhone', 'tel'], ['eqEmail', 'email']
  ];
  function apply() {
    try {
      FIELDS.forEach(function (f) {
        var el = D.getElementById(f[0]), a = KIND[f[1]];
        if (!el || el.getAttribute('data-npaf')) return;
        for (var k in a) if (!el.hasAttribute(k)) el.setAttribute(k, a[k]);
        el.setAttribute('data-npaf', f[1]);
      });
    } catch (e) {}
  }
  apply();
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', apply);
  addEventListener('load', apply);
  // a field drawn later (an overlay opened, a form redrawn) gets the same hints before the buyer types
  D.addEventListener('focusin', function (e) { var t = e.target; if (t && t.id && !t.getAttribute('data-npaf')) apply(); }, true);
})();
