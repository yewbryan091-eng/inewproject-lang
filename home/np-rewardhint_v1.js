/* iNewProject . homepage "e-Enquiry rewards" hint, v1 (20 Nov 2026). Loaded from the admin Header Scripts box; homepage only.
   When the rewards section under the first section cannot be seen (big screens, where the first section fills the screen),
   a small "e-Enquiry rewards ↓" sits at the bottom of the first section (BM "Ganjaran e-Enquiry", 中文 "e-Enquiry 奖励").
   A tap scrolls to the rewards; it fades once the visitor scrolls. Laptop layout only (from 1080 px wide); when the rewards
   already show, or on phones and portrait tablets, nothing. */
(function () {
  var D = document, H = D.documentElement;
  if (location.pathname !== '/') return;
  var T = { en: 'e-Enquiry rewards', ms: 'Ganjaran e-Enquiry', zh: 'e-Enquiry 奖励' };
  function start() {
    var h = D.querySelector('.hero'), nx = D.querySelector('section.rwh') || (h && h.nextElementSibling);
    if (!h || !nx || D.querySelector('.npr-hint')) return;
    var a = D.createElement('a'); a.className = 'npr-hint'; a.href = '#'; a.setAttribute('data-np-skip', ''); a.setAttribute('translate', 'no');
    var s = D.createElement('span'), i = D.createElement('i'); i.textContent = '↓'; i.setAttribute('aria-hidden', 'true'); a.appendChild(s); a.appendChild(D.createTextNode(' ')); a.appendChild(i);
    function word() { s.textContent = T[H.getAttribute('data-np-lang')] || T.en; }
    word(); h.appendChild(a);
    a.addEventListener('click', function (e) { e.preventDefault(); nx.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    function chk() { var out = innerWidth >= 1080 && nx.getBoundingClientRect().top >= innerHeight - 8; a.classList.toggle('on', out || (a.classList.contains('on') && scrollY > 0)); a.classList.toggle('gone', scrollY > 40); }
    chk(); addEventListener('resize', chk); addEventListener('scroll', chk, { passive: true }); addEventListener('load', chk);
    try { new ResizeObserver(chk).observe(h); } catch (e) {}
    setTimeout(chk, 600); setTimeout(chk, 1500);
    try { new MutationObserver(word).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
