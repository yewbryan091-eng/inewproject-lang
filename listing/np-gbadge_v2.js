/* iNewProject . listing gallery photo label v2 (26 Nov 2026), owner 26 Nov: the big "ARTIST IMPRESSION" / "ACTUAL PHOTO" pills go.
   On a real photo (the list below) there is no label at all. On every other photo a small "Artist's impression" note sits at the
   bottom-left (BM "Gambaran artis", 中文 "艺术构想图"), the same height and edge as the "3 / 15" count; the site's pill is hidden.
   If the site prints no pill on a listing, nothing is added (as before). Alt text = v1-1. The viewer does the same (np-gallery v2-4).
   v1-1 (20 Nov 2026) = v1 + the main photo's alt text (read by Google
   and screen readers) says "Actual photo" instead of "Artist Impression" on those photos too. Everything else = v1.
   v1 (20 Nov 2026). Loaded from the admin Header Scripts box.
   The site's gallery template prints "Artist Impression" on every image, real photos included. On the files listed below (checked
   one by one: show-unit / sales-gallery photos, a scale model, photos of finished buildings, drone shots), the badge on the big image says
   "Actual photo" (BM "Gambar sebenar", 中文 "实拍照片") instead; on every other image the site's own badge shows, unchanged.
   Only files in this list change: a gallery that is not listed, or an image added later, keeps the site's badge. */
(function () {
  var REAL = [
    // TuJu Residences (644): the sales gallery show unit and entrance
    '644/NP1U_tuju-residences-1-1795145428.webp', '644/NP1U_tuju-residences-1-1795145430.webp',
    '644/NP1U_tuju-residences-1-1795145438.webp', '644/NP1U_tuju-residences-1-1795169286.webp',   // the entrance photo, re-uploaded 20 Nov
    // K Residence (661): the completed tower, all 11
    '661/NP1U_k-residence-1790404874.webp', '661/NP1U_k-residence-1794909308.webp', '661/NP1U_k-residence-1794909310.webp',
    '661/NP1U_k-residence-1794909311.webp', '661/NP1U_k-residence-1794909313.webp', '661/NP1U_k-residence-1794909315.webp',
    '661/NP1U_k-residence-1794909317.webp', '661/NP1U_k-residence-1794909319.webp', '661/NP1U_k-residence-1794909320.webp',
    '661/NP1U_k-residence-1794909322.webp', '661/NP1U_k-residence-1794909324.webp',
    // ROSEDALE by Ancubic (627): the scale model, the Type C show unit (16 Oct 2026 visit) and the site under construction
    '627/NP1U_rosedale-by-ancubic-1795151828.webp', '627/NP1U_rosedale-by-ancubic-1795151830.webp', '627/NP1U_rosedale-by-ancubic-1795151832.webp',
    '627/NP1U_rosedale-by-ancubic-1795151834.webp', '627/NP1U_rosedale-by-ancubic-1795151836.webp', '627/NP1U_rosedale-by-ancubic-1795151837.webp',
    '627/NP1U_rosedale-by-ancubic-1795151857.webp',
    // Taman Sungai Bertek (682): the finished row, its rooms and the site (image 1, the developer's render, keeps its badge)
    '682/NP1U_taman-sungai-bertek-klang-1794817166.webp', '682/NP1U_taman-sungai-bertek-klang-1794817168.webp',
    '682/NP1U_taman-sungai-bertek-klang-1794817170.webp', '682/NP1U_taman-sungai-bertek-klang-1794817171.webp',
    '682/NP1U_taman-sungai-bertek-klang-1794817173.webp', '682/NP1U_taman-sungai-bertek-klang-1794817175.webp',
    '682/NP1U_taman-sungai-bertek-klang-1794817176.webp', '682/NP1U_taman-sungai-bertek-klang-1794817178.webp'
  ];
  var WORD = { en: 'Actual photo', ms: 'Gambar sebenar', zh: '实拍照片' };   // alt text only (v1-1)
  var AI = { en: 'Artist\'s impression', ms: 'Gambaran artis', zh: '艺术构想图' };   // v2: the note on renders
  var D = document;
  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); if (!l) { try { l = localStorage.getItem('np_lang'); } catch (e) {} } return l === 'ms' || l === 'zh' ? l : 'en'; }
  function real(src) { var m = /\/images\/uploads\/project\/(\d+\/[^?#\/]+)/.exec(src || ''); return !!m && REAL.indexOf(m[1]) >= 0; }
  function start() {
    var img = D.getElementById('galleryMainImg'), site = img && img.parentNode.querySelector('.gallery-badge');
    if (!img || !site) return;
    if (!D.getElementById('np-ai-css')) { var css = D.createElement('style'); css.id = 'np-ai-css'; css.textContent =   // v2: lines up with the count (right:14px;bottom:14px;28px*k high)
      '.np-ai{--k:1;position:absolute;left:14px;bottom:14px;z-index:2;display:flex;align-items:center;box-sizing:border-box;height:calc(28px*var(--k));' +
      'padding:0 calc(10px*var(--k));border-radius:calc(6px*var(--k));background:rgba(17,17,17,.5);color:#fff;font-family:inherit;font-weight:500;' +
      'font-size:calc(13px*var(--k));line-height:1;letter-spacing:.01em;white-space:nowrap;pointer-events:none;text-transform:none}' +
      '@media (min-width:1080px){.np-ai{--k:1.111111}}'; D.head.appendChild(css); }   // laptops show the site at 90%
    var mine = D.createElement('div'); mine.className = 'np-ai'; mine.setAttribute('data-np-skip', ''); mine.setAttribute('translate', 'no');
    site.parentNode.insertBefore(mine, site.nextSibling);
    var alt0 = img.getAttribute('alt') || '';
    function paint() {
      var on = real(img.getAttribute('src'));
      mine.textContent = AI[lang()]; mine.style.display = on ? 'none' : ''; site.style.display = 'none';   // v2: real = no label
      var want = on ? (/artist impression/i.test(alt0) ? alt0.replace(/artist impression/i, WORD[lang()]) : (alt0 + ' ' + WORD[lang()]).trim()) : alt0;   // v1-1
      if (img.getAttribute('alt') !== want) img.setAttribute('alt', want);
    }
    paint();
    new MutationObserver(paint).observe(img, { attributes: true, attributeFilter: ['src'] });
    new MutationObserver(paint).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
