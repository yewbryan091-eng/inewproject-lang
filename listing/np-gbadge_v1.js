/* iNewProject . listing gallery: "Actual photo" on real photos (20 Nov 2026). Loaded from the admin Header Scripts box.
   The site's gallery template prints "Artist Impression" on every image, real photos included. On the files listed below (checked
   one by one: show-unit / sales-gallery photos, a scale model, photos of finished buildings, drone shots), the badge on the big image says
   "Actual photo" (BM "Gambar sebenar", 中文 "实拍照片") instead; on every other image the site's own badge shows, unchanged.
   Only files in this list change: a gallery that is not listed, or an image added later, keeps the site's badge. */
(function () {
  var REAL = [
    // TuJu Residences (644): the sales gallery show unit and entrance
    '644/NP1U_tuju-residences-1-1795145428.webp', '644/NP1U_tuju-residences-1-1795145430.webp',
    '644/NP1U_tuju-residences-1-1795145438.webp', '644/NP1U_tuju-residences-1-1795145455.webp',
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
  var WORD = { en: 'Actual photo', ms: 'Gambar sebenar', zh: '实拍照片' };
  var D = document;
  function lang() { var l = D.documentElement.getAttribute('data-np-lang'); if (!l) { try { l = localStorage.getItem('np_lang'); } catch (e) {} } return l === 'ms' || l === 'zh' ? l : 'en'; }
  function real(src) { var m = /\/images\/uploads\/project\/(\d+\/[^?#\/]+)/.exec(src || ''); return !!m && REAL.indexOf(m[1]) >= 0; }
  function start() {
    var img = D.getElementById('galleryMainImg'), site = img && img.parentNode.querySelector('.gallery-badge');
    if (!img || !site) return;
    var mine = D.createElement('div'); mine.className = 'gallery-badge np-gb-real'; mine.setAttribute('data-np-skip', ''); mine.setAttribute('translate', 'no');
    site.parentNode.insertBefore(mine, site.nextSibling);
    function paint() {
      var on = real(img.getAttribute('src'));
      mine.textContent = WORD[lang()]; mine.style.display = on ? '' : 'none'; site.style.display = on ? 'none' : '';
    }
    paint();
    new MutationObserver(paint).observe(img, { attributes: true, attributeFilter: ['src'] });
    new MutationObserver(paint).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
