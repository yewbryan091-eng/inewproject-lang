/* iNewProject . homepage Featured Developers v1 (17 Nov 2026): a compact strip that moves on its own (logo + name, no boxes).
   Reads the developers the admin lists in #s5 (logo + name), hides the site's slider (and stops its autoplay), and shows them
   in one row that loops at about 38 px a second; its logos load when the section comes within 400 px of the screen. Pauses on hover (mouse screens), while a finger holds it, and when it is off screen; with
   reduced motion it is a still, centred grid. Adding a developer in the admin adds it here. Names are company names, kept as
   written (data-np-skip); the section's heading stays the site's own (translated as before).
   Homepage only. Off switch: window.NP_DEVS_LIVE = false (the site's slider stays). Loaded from the admin Header Scripts box. */
(function () {
  'use strict';
  var D = document;
  if (window.NP_DEVS_LIVE === false || location.pathname !== '/') return;
  function start() {
    var sec = D.getElementById('s5'), sw = sec && sec.querySelector('.feaDevSwiper');
    if (!sec || !sw || sec.querySelector('.npd')) return;
    var seen = {}, devs = [].slice.call(sw.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)')).map(function (s) {
      var img = s.querySelector('img'), name = s.querySelector('.feature-title');
      return img && img.getAttribute('src') ? { src: img.getAttribute('src'), name: (name ? name.textContent : img.getAttribute('alt') || '').replace(/\s+/g, ' ').trim() } : null;
    }).filter(function (d) { if (!d || seen[d.src]) return false; seen[d.src] = 1; return true; });
    if (devs.length < 3) return;   // too few to move: the site's slider stays
    var css = D.createElement('style'); css.id = 'npd-css';
    css.textContent = [
      '#s5.npd-on{padding-top:56px;padding-bottom:48px}',
      '#s5.npd-on .feaDevSwiper,#s5.npd-on .swiper-button-next,#s5.npd-on .swiper-button-prev{display:none!important}',
      '#s5.npd-on .sec-header{margin-bottom:22px!important}',
      '.npd{position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%)}',
      '.npd-row{display:flex;width:max-content;gap:28px;padding:6px 0;animation:npdMove var(--npd-t,40s) linear infinite}',
      '@media (hover:hover){.npd:hover .npd-row{animation-play-state:paused}}',   // mouse screens only: a tap on a phone would leave it stuck paused
      '.npd.npd-hold .npd-row,.npd.npd-off .npd-row{animation-play-state:paused}',
      '@keyframes npdMove{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
      '.npd-t{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:204px;height:128px;padding:6px 8px;box-sizing:border-box}',
      '.npd-t img{display:block;height:64px;width:auto;max-width:160px;object-fit:contain}',
      '.npd-n{font:600 14px/1.3 "DM Sans",system-ui,sans-serif;color:#2B2B2B;text-align:center;max-width:100%;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-wrap:balance}',
      '@media (min-width:1200px){.npd-n{font-size:15.56px}}',   // laptops run the page at 90%: 14 px on screen
      '@media (max-width:767.9px){#s5.npd-on{padding-top:40px;padding-bottom:36px}.npd-t{width:176px;height:124px;padding:6px}.npd-t img{height:52px;max-width:136px}.npd-row{gap:20px}}',
      '@media (prefers-reduced-motion:reduce){.npd{-webkit-mask-image:none;mask-image:none}.npd-row{animation:none;width:auto;flex-wrap:wrap;justify-content:center}.npd-row .npd-dup{display:none}}'
    ].join('\n');
    D.head.appendChild(css);
    function esc(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    function tiles(dup) {
      return devs.map(function (d) {
        return '<div class="npd-t' + (dup ? ' npd-dup" aria-hidden="true"' : '" role="listitem"') + '><img data-npd-src="' + esc(d.src) + '" alt="' + (dup ? '' : esc(d.name)) + '" decoding="async"><div class="npd-n">' + esc(d.name) + '</div></div>';
      }).join('');
    }
    var wrap = D.createElement('div'); wrap.className = 'npd'; wrap.setAttribute('data-np-skip', ''); wrap.setAttribute('role', 'list');   // no English-only label: the section's own (translated) heading names it
    // each half of the row is one or more copies of the list and at least 2,560 px wide, so the loop (-50%) never shows a gap on any screen
    var per = devs.length * 232, k = Math.max(1, Math.ceil(2560 / per)), half = tiles(false);
    for (var i = 1; i < k; i++) half += tiles(true);
    var all = half + half.replace(/class="npd-t" role="listitem"/g, 'class="npd-t npd-dup" aria-hidden="true"').replace(/ alt="[^"]*"/g, ' alt=""');
    wrap.innerHTML = '<div class="npd-row">' + all + '</div>';
    sw.parentNode.insertBefore(wrap, sw.nextSibling); sec.classList.add('npd-on');
    try { if (sw.swiper && sw.swiper.autoplay) sw.swiper.autoplay.stop(); } catch (e) {}
    var row = wrap.firstChild;
    // logos: all at once when the section comes near (lazy loading alone would leave the ones waiting off to the side unloaded)
    function logos() { [].slice.call(wrap.querySelectorAll('img[data-npd-src]')).forEach(function (im) { im.src = im.getAttribute('data-npd-src'); im.removeAttribute('data-npd-src'); }); }
    if (window.IntersectionObserver) { var lo = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { lo.disconnect(); logos(); } }, { rootMargin: '400px 0px' }); lo.observe(wrap); } else logos();
    function speed() { var w = row.scrollWidth / 2; if (w) row.style.setProperty('--npd-t', Math.round(w / 38) + 's'); }
    speed(); addEventListener('load', speed);
    wrap.addEventListener('touchstart', function () { wrap.classList.add('npd-hold'); }, { passive: true });
    wrap.addEventListener('touchend', function () { setTimeout(function () { wrap.classList.remove('npd-hold'); }, 1200); }, { passive: true });
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { wrap.classList.toggle('npd-off', !es[0].isIntersecting); }).observe(wrap);
  }
  function safeStart() { try { start(); } catch (e) { try { D.getElementById('s5').classList.remove('npd-on'); } catch (x) {} } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', safeStart); else safeStart();
})();
