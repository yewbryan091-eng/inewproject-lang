/* iNewProject . homepage search card v1-2 (20 Nov 2026) = v1-1 with the button saying just "Show" (BM "Papar", 中文 "显示"), no
   number; a choice that matches nothing still says "No match" and can't be pressed. v1-1 (20 Nov 2026) = v1 + on phones the chosen type / budget shows a short label
   ("Condo & Serviced", "Bawah RM300k") that may wrap to a second line, so it is never cut off; the list keeps the full
   names. Everything else = v1.
   v1 (20 Nov 2026). Loaded from the admin Header Scripts box; homepage only.
   The search bar stays exactly as it is (box, Map, Search, suggestions). Under it, in the same white card: Property type and
   Budget (each choice with how many projects it leaves; budgets also as an estimated monthly instalment, 90% loan, 4.25%,
   35 years, the site's own calculator) and the switch "Only e-Enquiry projects" (on). The Search button shows how many
   projects the buyer will see ("Show 19"); while text is typed it says the site's own "Search". The search (np-search v2.2)
   adds the card's choices to the link it builds (window.NPS_EXTRA), so typed places, developers and budgets work as before.
   The three ✓ points under the bar are folded into the switch line. Words: the site's own EN / BM / 中文 where it has them.
   Data: the search's own project list (sessionStorage "nps_v1", read when the visitor first touches the search), nothing
   else is downloaded. Fail-safe: no search, no list or any error -> no card, the points stay, the bar works as before. */
(function () {
  var W = window, D = document, H = D.documentElement;
  if (location.pathname !== '/' || W.__NPX__) return; W.__NPX__ = 1;
  var T = {
    type: ['Property type', 'Jenis Hartanah', '产业类型'], bud: ['Budget', 'Bajet', '预算'],
    anyT: ['Any type', 'Semua Jenis Hartanah', '所有产业类型'], anyB: ['Any budget', 'Semua Harga', '不限价格'],
    condo: ['Condo & Serviced Apartment', 'Kondominium & Pangsapuri Servis', '共管公寓与服务式公寓'],
    terrace: ['Terrace & Townhouse', 'Rumah Teres & Rumah Bandar', '排屋与城镇屋'],
    semid: ['Semi-D, Bungalow & Villa', 'Rumah Berkembar, Banglo & Vila', '半独立式、独立式洋房与别墅'],
    shop: ['Shop Office & Retail', 'Kedai Pejabat & Runcit', '店屋与零售'], factory: ['Factory & Warehouse', 'Kilang & Gudang', '工厂与仓库'], land: ['Land', 'Tanah', '土地'],
    b1: ['Under RM300k', 'Kurang daripada RM300k', 'RM300k 以下'], b2: ['RM300k – 500k', 'RM300k – 500k', 'RM300k – 500k'], b3: ['RM500k – 1M', 'RM500k – 1M', 'RM500k – 1M'],
    b4: ['RM1M – 2M', 'RM1M – 2M', 'RM1M – 2M'], b5: ['Above RM2M', 'Lebih daripada RM2M', 'RM2M 以上'],
    upto: ['about {a}/month', 'kira-kira {a}/bulan', '每月约 {a}'], range: ['about {a} to {b}/month', 'kira-kira {a} hingga {b}/bulan', '每月约 {a} 至 {b}'], from: ['from about {a}/month', 'dari kira-kira {a}/bulan', '每月约 {a} 起'],
    ee: ['Only e-Enquiry projects', 'Projek e-Enquiry sahaja', '仅显示 e-Enquiry 项目'],
    eeNote: ['free to enquire, reward on eligible SPAs', 'percuma, ganjaran dijamin untuk SPA yang layak', '免费咨询，合格 SPA 保证获得奖励'],
    show: ['Show', 'Papar', '显示'], none: ['No match', 'Tiada padanan', '无匹配'],   // v1-2: no number on the button
    // v1-1: short labels for the closed fields on phones
    anyT_s: ['Any type', 'Semua jenis', '所有类型'], anyB_s: ['Any budget', 'Semua harga', '不限价格'],
    condo_s: ['Condo & Serviced', 'Kondo & Servis', '公寓'], terrace_s: ['Terrace & Townhouse', 'Rumah Teres', '排屋'],
    semid_s: ['Semi-D & Bungalow', 'Berkembar & Banglo', '半独立与独立式'], shop_s: ['Shop & Retail', 'Kedai & Runcit', '店屋与零售'],
    factory_s: ['Factory & Warehouse', 'Kilang & Gudang', '工厂与仓库'], land_s: ['Land', 'Tanah', '土地'],
    b1_s: ['Under RM300k', 'Bawah RM300k', 'RM300k 以下'], b2_s: ['RM300k – 500k', 'RM300k – 500k', 'RM300k – 500k'], b3_s: ['RM500k – 1M', 'RM500k – 1M', 'RM500k – 1M'],
    b4_s: ['RM1M – 2M', 'RM1M – 2M', 'RM1M – 2M'], b5_s: ['Above RM2M', 'Atas RM2M', 'RM2M 以上']
  };
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function t(k, v) { var s = T[k][L()]; if (v) Object.keys(v).forEach(function (x) { s = s.split('{' + x + '}').join(v[x]); }); return s; }
  // the property groups and their New Launches values = np-ptype v1-1 (checked 58 of 58 against the admin categories)
  function grp(x) {
    var s = String(x || '').toLowerCase();
    if (/factory|warehouse|industrial/.test(s)) return 'factory';
    if (/\bland\b/.test(s)) return 'land';
    if (/soho|sovo|sofo/.test(s)) return 'condo';
    if (/shop|retail|office|business suite|commercial/.test(s)) return 'shop';
    if (/condo|apartment|suite|residence|flat|penthouse/.test(s)) return 'condo';
    if (/link villa/.test(s)) return 'terrace';
    if (/villa/.test(s)) return 'semid';
    var a = s.search(/terrace|townhouse|town house|\blink\b|superlink/), b = s.search(/semi|bungalow|cluster|detached/);
    if (a < 0 && b < 0) return '';
    if (b < 0 || (a >= 0 && a < b)) return 'terrace';
    return 'semid';
  }
  var TYPES = [['', 'anyT'], ['condo', 'condo', '|1|2|3|24|25|26'], ['terrace', 'terrace', '|4|5'], ['semid', 'semid', '|6|7|8'], ['shop', 'shop', '|21|27|30'], ['factory', 'factory', '|48|46'], ['land', 'land', '|9|61|63|64']];
  var M = 0.9 * (0.0425 / 12) / (1 - Math.pow(1 + 0.0425 / 12, -420));
  function mo(p) { return 'RM' + (Math.round(p * M / 10) * 10).toLocaleString('en-MY'); }
  // the New Launches price filter counts a project by its starting price (checked against the live page, 20 Nov)
  var BUD = [['', 'anyB', 0, 0], ['<300k', 'b1', 0, 3e5], ['300-500', 'b2', 3e5, 5e5], ['500-1000', 'b3', 5e5, 1e6], ['1000-2000', 'b4', 1e6, 2e6], ['>2000', 'b5', 2e6, 0]];
  function moText(b) { return !b[0] ? '' : !b[2] ? t('upto', { a: mo(b[3]) }) : !b[3] ? t('from', { a: mo(b[2]) }) : t('range', { a: mo(b[2]), b: mo(b[3]) }); }
  function ga(f, v) { try { if (typeof W.gtag === 'function') W.gtag('event', 'search_card', { field: f, value: String(v) }); } catch (e) {} }

  function start(tries) {
    var wrap = D.getElementById('searchWrap'), bar = wrap && wrap.querySelector('.search-bar'), input = D.getElementById('searchInput'), go = bar && bar.querySelector('.search-btn');
    if (!H.classList.contains('nps-on') || !wrap || !bar || !input || !go || !bar.querySelector('.nps-map')) {   // the search has not built its bar yet
      if ((tries || 0) < 60 && H.classList.contains('nps-on')) setTimeout(function () { start((tries || 0) + 1); }, 150);
      return;
    }
    var data = null, st = { t: 0, b: 0, ee: true };
    var card = D.createElement('div'); card.className = 'npx'; card.setAttribute('data-np-skip', ''); card.setAttribute('translate', 'no');
    card.innerHTML = '<label class="npx-f"><span class="npx-l"></span><span class="npx-v"></span><select class="npx-s"></select></label>' +
      '<label class="npx-f"><span class="npx-l"></span><span class="npx-v"></span><select class="npx-s"></select></label>' +
      '<label class="npx-ee"><input type="checkbox" checked><span class="npx-sw"></span><span class="npx-et"><b></b> · <span></span></span></label>';
    var f = card.querySelectorAll('.npx-f'), selT = f[0].querySelector('select'), selB = f[1].querySelector('select'), eeBox = card.querySelector('.npx-ee input');
    var cnt = D.createElement('span'); cnt.className = 'npx-cnt'; cnt.setAttribute('data-np-skip', ''); cnt.setAttribute('translate', 'no');
    var css = D.createElement('style'); css.id = 'npx-css'; css.textContent = [
      'html.nps-on.npx-on:not(.nps-sheet) #searchWrap{background:#fff;border-radius:30px;box-shadow:0 14px 36px rgba(60,30,10,.12);border:1.5px solid #ECDCCB}',
      'html.nps-on.npx-on:not(.nps-sheet) #searchWrap .search-bar{border:0!important;box-shadow:none!important;background:transparent!important}',
      'html.nps-on.npx-on .hero-content>.hero-tags{visibility:hidden!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important;border:0!important}',
      'html.nps-sheet .npx,html:not(.nps-on) .npx{display:none!important}',
      '.npx{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid #EEE9E2;margin:0 18px}',
      '.npx-f{position:relative;display:flex;flex-direction:column;padding:10px 4px 10px 12px;margin:0;cursor:pointer;min-width:0}.npx-f+.npx-f{border-left:1px solid #EEE9E2;padding-left:18px}',
      '.npx-l{font:700 12.5px/1.2 Inter,"DM Sans",sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#8a847c}',
      '.npx-v{padding:4px 24px 0 0;font:600 16px/1.3 "DM Sans",Inter,sans-serif;color:#1d1d1f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.npx-s{position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer;font-size:16px}',
      '.npx-f:after{content:"";position:absolute;right:10px;bottom:17px;width:7px;height:7px;border-right:2px solid #86817a;border-bottom:2px solid #86817a;transform:rotate(45deg);pointer-events:none}',
      '.npx-f:focus-within{background:#FAF7F3;border-radius:10px}',
      '.npx-ee{grid-column:1/-1;display:flex;align-items:center;gap:10px;margin:0;padding:11px 12px 14px;border-top:1px solid #EEE9E2;cursor:pointer;font:500 14.5px/1.3 "DM Sans",Inter,sans-serif;color:#2d2d2d}',
      '.npx-ee input{position:absolute;opacity:0;width:1px;height:1px}.npx-ee input:focus-visible+.npx-sw{outline:3px solid #D0021B;outline-offset:2px}',
      '.npx-sw{flex:none;width:38px;height:22px;border-radius:99px;background:#cfc8bf;position:relative;transition:background .15s}.npx-sw:after{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .15s}',
      '.npx-ee input:checked+.npx-sw{background:#1E9E5A}.npx-ee input:checked+.npx-sw:after{left:19px}.npx-et b{font-weight:700}',
      '#searchWrap .search-btn.npx-has{font-size:0!important}#searchWrap .search-btn.npx-has>*:not(.npx-cnt){display:none!important}.npx-cnt{display:none}#searchWrap .search-btn.npx-has .npx-cnt{display:inline}',
      '@media (min-width:1080px){.npx-l{font-size:calc(12.5px*1.111111)}.npx-v{font-size:calc(16px*1.111111)}.npx-ee{font-size:calc(14.5px*1.111111)}}',
      '@media (max-width:649.9px){html.nps-on.npx-on:not(.nps-sheet) #searchWrap{border-radius:20px}.npx{margin:0 10px}.npx-f{padding-left:6px}.npx-f+.npx-f{padding-left:12px}.npx-v{font-size:15px;padding-right:18px;white-space:normal;overflow:visible;text-overflow:clip}.npx-f:after{right:6px}.npx-ee{padding:10px 6px 12px}}'
    ].join('\n');
    D.head.appendChild(css); bar.parentNode.insertBefore(card, bar.nextSibling); go.appendChild(cnt);
    var goPx = getComputedStyle(go).fontSize; cnt.style.fontSize = goPx;
    H.classList.add('npx-on');

    function q() { return (input.value || '').trim(); }
    function small() { return innerWidth < 650; }   // v1-1: phones show the short label
    var rz; addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(paint, 150); });
    function n(ti, bi) {
      if (!data) return -1;
      var g = TYPES[ti][0], b = BUD[bi];
      return data.filter(function (p) { var pr = +p.price_from || 0;
        return (!st.ee || p.enquiry_type === 'e-Enquiry') && (!g || grp(p.development_type) === g) && (!b[0] || (pr > 0 && pr >= b[2] && (!b[3] || pr < b[3]))); }).length;
    }
    function teardown() { try { H.classList.remove('npx-on'); go.classList.remove('npx-has'); go.disabled = false; if (cnt.parentNode) cnt.parentNode.removeChild(cnt); if (card.parentNode) card.parentNode.removeChild(card); W.NPS_EXTRA = null; } catch (e) {} }
    function paint() { try { draw(); } catch (e) { teardown(); } }
    function draw() {
      if (!go.contains(cnt)) go.appendChild(cnt);
      var useN = !!data && !q(), types = TYPES.filter(function (x, i) { return i === 0 || x[0] !== 'land' || !!data && data.some(function (p) { return grp(p.development_type) === 'land'; }); });
      f[0].querySelector('.npx-l').textContent = t('type'); f[1].querySelector('.npx-l').textContent = t('bud');
      selT.innerHTML = types.map(function (x) { var i = TYPES.indexOf(x), c = useN ? n(i, st.b) : -1; return '<option value="' + i + '"' + (i === st.t ? ' selected' : '') + (i && c === 0 ? ' disabled' : '') + '>' + t(x[1]) + (c >= 0 ? ' (' + c + ')' : '') + '</option>'; }).join('');
      selB.innerHTML = BUD.map(function (b, i) { var c = useN ? n(st.t, i) : -1, m = moText(b); return '<option value="' + i + '"' + (i === st.b ? ' selected' : '') + (i && c === 0 ? ' disabled' : '') + '>' + t(b[1]) + (m ? ' · ' + m : '') + (c >= 0 ? ' (' + c + ')' : '') + '</option>'; }).join('');
      f[0].querySelector('.npx-v').textContent = t(TYPES[st.t][1] + (small() ? '_s' : '')); f[1].querySelector('.npx-v').textContent = t(BUD[st.b][1] + (small() ? '_s' : ''));
      card.querySelector('.npx-et b').textContent = t('ee'); card.querySelector('.npx-et span').textContent = t('eeNote'); eeBox.checked = st.ee;
      var c = useN ? n(st.t, st.b) : -1;
      if (c >= 0) { cnt.textContent = c ? t('show', { n: c }) : t('none'); go.classList.add('npx-has'); go.disabled = !c; }
      else { go.classList.remove('npx-has'); go.disabled = false; }
    }
    selT.addEventListener('change', function () { st.t = +selT.value || 0; ga('type', TYPES[st.t][0] || 'any'); paint(); });
    selB.addEventListener('change', function () { st.b = +selB.value || 0; ga('budget', BUD[st.b][0] || 'any'); paint(); });
    eeBox.addEventListener('change', function () { st.ee = eeBox.checked; ga('ee_only', st.ee ? 'on' : 'off'); paint(); });
    input.addEventListener('input', paint);
    // the search builds the link; it asks for the card's choices here (np-search v2.2)
    W.NPS_EXTRA = function () { if (!H.classList.contains('npx-on')) return []; return [['type', TYPES[st.t][2] || ''], ['price', BUD[st.b][0]], ['eenquiry', st.ee ? '1' : '']]; };
    // the project list: the search's own cache, filled when the visitor first touches the search
    function read() { try { var c = JSON.parse(sessionStorage.getItem('nps_v1') || 'null'); if (c && c.d && c.d.length && Date.now() - c.t < 12e5) return c.d; } catch (e) {} try { if (W.__PROJECTS__ && W.__PROJECTS__.length) return W.__PROJECTS__; } catch (e) {} return null; }
    var polling = 0;
    function want() { if (data || polling) return; polling = 1; var k = 0; (function tick() { var d = read(); if (d) { data = d; paint(); return; } if (++k < 70) setTimeout(tick, 150); else polling = 0; })(); }
    data = read();
    ['pointerdown', 'touchstart', 'focusin'].forEach(function (ev) { wrap.addEventListener(ev, want, { passive: true }); });
    try { new MutationObserver(paint).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
    paint();
  }
  function boot() { try { start(0); } catch (e) { try { H.classList.remove('npx-on'); var c = D.querySelector('.npx'); if (c) c.parentNode.removeChild(c); W.NPS_EXTRA = null; } catch (x) {} } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
