/* iNewProject . property types v1 (18 Nov 2026, from the approved mockup "Property Type filter + Similar Projects").
   Three parts, all from the site's own live data (the map page's project list, shared with the search box through the
   same session cache "nps_v1", and the New Launches pages for each card's full price range and developer):
   1. New Launches filter: Property Type becomes 5 buyer groups with live counts (Condo & Serviced Apartment, Terrace &
      Townhouse, Semi-D Bungalow & Villa, Shop Office & Retail, Factory & Warehouse; Land only when a land listing exists).
      The site's own select stays (hidden) and still carries the value, so Apply and Reset work as before.
   2. Listing pages: Similar Projects = type first, then price and distance together; never over 5x or under 1/5 of the
      price, never over 100 km; 2 or 3 cards when that is all that fits; none at all: "More new launches" (the first 4 of
      New Launches). Each card says how far it is. Cards keep the site's own markup (photo, badge, Save, BY developer).
   3. e-Enquiry pages: the header shows the listing's own property type, not the old category ("Shop" ->
      "2 & 3-Storey Shop Office").
   Anything missing or failing leaves the site's own version as it was. Off switch: window.NP_PTYPE_LIVE = false.
   Loaded from the admin Header Scripts box. */
(function () {
  'use strict';
  var D = document, W = window;
  if (W.NP_PTYPE_LIVE === false) return;
  var PATH = location.pathname;

  // ---- own words [EN, BM, ZH] -------------------------------------------------------------------------------------
  var T = {
    homes: ['Homes', 'Kediaman', '\u4f4f\u5b85'],
    biz: ['Business', 'Perniagaan', '\u5546\u4e1a'],
    condo: ['Condo & Serviced Apartment', 'Kondominium & Pangsapuri Servis', '\u5171\u7ba1\u516c\u5bd3\u4e0e\u670d\u52a1\u5f0f\u516c\u5bd3'],
    terrace: ['Terrace & Townhouse', 'Rumah Teres & Rumah Bandar', '\u6392\u5c4b\u4e0e\u57ce\u9547\u5c4b'],
    semid: ['Semi-D, Bungalow & Villa', 'Rumah Berkembar, Banglo & Vila', '\u534a\u72ec\u7acb\u5f0f\u3001\u72ec\u7acb\u5f0f\u6d0b\u623f\u4e0e\u522b\u5885'],
    shop: ['Shop Office & Retail', 'Kedai Pejabat & Runcit', '\u5e97\u5c4b\u4e0e\u96f6\u552e'],
    factory: ['Factory & Warehouse', 'Kilang & Gudang', '\u5de5\u5382\u4e0e\u4ed3\u5e93'],
    land: ['Land', 'Tanah', '\u571f\u5730'],
    all: ['All Property Type', 'Semua Jenis Hartanah', '\u6240\u6709\u4ea7\u4e1a\u7c7b\u578b'],
    more: ['More new launches', 'Lagi Projek Baharu', '\u66f4\u591a\u65b0\u697c\u76d8'],
    away: ['{n} km away', '{n} km dari sini', '\u8ddd\u79bb {n} \u516c\u91cc']
  };
  function L() { var l = D.documentElement.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function tr(k, n) { var s = T[k][L()]; return n == null ? s : s.replace('{n}', n); }
  function own(tag, k, n, cls) {
    var e = D.createElement(tag);
    e.setAttribute('data-np-skip', '');
    e.setAttribute('data-npt-t', k);
    if (n != null) e.setAttribute('data-npt-n', n);
    if (cls) e.className = cls;
    e.textContent = tr(k, n);
    return e;
  }
  function repaint() {
    [].forEach.call(D.querySelectorAll('[data-npt-t]'), function (e) {
      var s = tr(e.getAttribute('data-npt-t'), e.getAttribute('data-npt-n'));
      if (e.textContent !== s) e.textContent = s;
    });
  }
  try { new MutationObserver(repaint).observe(D.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (x) {}

  // ---- property group from the listing's own property type (checked 18 Nov: 58 of 58 match the admin category) ---------
  function grp(t) {
    var s = String(t || '').toLowerCase();
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
  function family(g) { return g === 'condo' || g === 'terrace' || g === 'semid' ? 'home' : g; }

  // ---- the site's project list (map page), shared with the search box: session cache "nps_v1", 20 minutes -------------
  var KEY = 'nps_v1', TTL = 12e5, dataP = null;
  function parseProjects(h) {
    var i = h.indexOf('window.__PROJECTS__'); if (i < 0) return null;
    i = h.indexOf('[', i); if (i < 0) return null;
    var depth = 0, q = false, qc = '', j;
    for (j = i; j < h.length; j++) {
      var c = h[j];
      if (q) { if (c === '\\') j++; else if (c === qc) q = false; }
      else if (c === '"' || c === "'") { q = true; qc = c; }
      else if (c === '[') depth++;
      else if (c === ']' && !--depth) break;
    }
    return JSON.parse(h.slice(i, j + 1));
  }
  function cached() {
    try { if (W.__PROJECTS__ && W.__PROJECTS__.length) return W.__PROJECTS__; } catch (x) {}
    try { var c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.t < TTL && c.d && c.d.length) return c.d; } catch (x) {}
    return null;
  }
  function data() {
    if (dataP) return dataP;
    var c = cached();
    if (c) return (dataP = Promise.resolve(c));
    dataP = fetch('/map/', { credentials: 'same-origin' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (h) {
        var d = parseProjects(h);
        if (!d || !d.length) throw new Error('no projects');
        try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: d })); } catch (x) {}
        return d;
      });
    dataP.catch(function () { dataP = null; });
    return dataP;
  }
  function slugOf(u) { var m = /\/project\/([^\/?#]+)\/?(?:[?#]|$)/.exec(u || ''); return m ? m[1] : ''; }
  function idOf(p) { var m = /\/uploads\/project\/(\d+)\//.exec(p.image_url || ''); return m ? m[1] : ''; }
  function css(text) { var s = D.createElement('style'); s.setAttribute('data-npt', ''); s.textContent = text; D.head.appendChild(s); }
  function ready(f) { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', f); else f(); }

  // ================================= 1. New Launches filter =========================================================
  var GROUPS = [
    { id: 'condo', v: '|1|2|3|24|25|26', sec: 'homes' },
    { id: 'terrace', v: '|4|5', sec: 'homes' },
    { id: 'semid', v: '|6|7|8', sec: 'homes' },
    { id: 'shop', v: '|21|27|30', sec: 'biz' },
    { id: 'factory', v: '|48|46', sec: 'biz' },
    { id: 'land', v: '|9|61|63|64', sec: 'biz' }
  ];
  function filter(tries) {
    var sel = D.getElementById('type'), box = sel && sel.closest('#filterPopup .filter-group');
    // the search box moves the site's select into the filter pop-up; wait for it (up to about 6 s)
    if (!sel || !box) { if ((tries || 0) < 40) setTimeout(function () { filter((tries || 0) + 1); }, 150); return; }
    if (box.querySelector('.npt-chips')) return;
    var cur = sel.value || new URLSearchParams(location.search).get('type') || '';
    // the group values join the site's own options (the search box's filter pill reads its label from them)
    GROUPS.forEach(function (g) {
      var have = [].some.call(sel.options, function (o) { return o.value === g.v; });
      if (!have) { var o = own('option', g.id); o.value = g.v; sel.appendChild(o); }
    });
    if (cur && sel.value !== cur) sel.value = cur;
    css('.npt-chips{display:flex;flex-direction:column;gap:10px;margin-top:4px}' +
      '.npt-sec{font-size:13px;font-weight:600;color:#6b6b6b;margin:6px 0 0}' +
      '.npt-chip{display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:48px;width:100%;box-sizing:border-box;' +
      'padding:0 18px;border-radius:14px;font:700 16px/1.25 "DM Sans",sans-serif;text-align:left;cursor:pointer;border:1px solid #d9d9d9;background:#fff;color:#2d2d2d}' +
      '.npt-chip:hover{border-color:#b5b5b5}.npt-chip:focus-visible{outline:2px solid #D0021B;outline-offset:2px}' +
      '.npt-chip[aria-pressed="true"]{border:2px solid #D0021B;background:#fdecee;color:#b00217;padding:0 17px}' +
      '.npt-chip .npt-n{font-weight:500;opacity:.85;flex:0 0 auto}.npt-chip[hidden],.npt-sec[hidden]{display:none}');
    sel.style.display = 'none'; sel.setAttribute('aria-hidden', 'true'); sel.tabIndex = -1;
    var wrap = D.createElement('div'); wrap.className = 'npt-chips'; wrap.setAttribute('role', 'group');
    var chips = [];
    function chip(v, labelEl, gid) {
      var b = D.createElement('button'); b.type = 'button'; b.className = 'npt-chip'; b.setAttribute('data-v', v);
      if (gid) b.setAttribute('data-g', gid);
      var n = D.createElement('span'); n.className = 'npt-n'; n.setAttribute('data-np-skip', '');
      b.appendChild(labelEl); b.appendChild(n);
      b.addEventListener('click', function () { pick(v); });
      chips.push(b); return b;
    }
    wrap.appendChild(chip('', own('span', 'all'), ''));
    // a link from before (an old single category such as type=21): keep it, labelled as the site labels it
    var known = cur === '' || GROUPS.some(function (g) { return g.v === cur; });
    if (!known) {
      var o = [].filter.call(sel.options, function (x) { return x.value === cur; })[0];
      if (o) { var ol = D.createElement('span'); ol.textContent = o.textContent.replace(/^[-\s]+|[-\s]+$/g, ''); wrap.appendChild(chip(cur, ol, '')); }
    }
    var secs = {};
    GROUPS.forEach(function (g) {
      if (!secs[g.sec] && g.id !== 'land') { secs[g.sec] = own('div', g.sec, null, 'npt-sec'); wrap.appendChild(secs[g.sec]); }
      var b = chip(g.v, own('span', g.id), g.id);
      if (g.id === 'land' && cur !== g.v) b.hidden = true;
      wrap.appendChild(b);
    });
    var title = box.querySelector('.filter-group-title');
    wrap.setAttribute('aria-label', title ? title.textContent.trim() : 'Property Type');
    box.insertBefore(wrap, sel);
    function paintSel() { chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === sel.value ? 'true' : 'false'); }); }
    function pick(v) {
      if (![].some.call(sel.options, function (o) { return o.value === v; })) return;
      sel.value = v;
      try { sel.dispatchEvent(new Event('change', { bubbles: true })); } catch (x) {}
      paintSel();
    }
    sel.addEventListener('change', paintSel);
    var reset = D.getElementById('filterReset');
    if (reset) reset.addEventListener('click', function () { setTimeout(paintSel, 0); });
    paintSel();
    function counts(d) {
      var c = { all: 0 };
      d.forEach(function (p) { var g = grp(p.development_type); c.all++; if (g) c[g] = (c[g] || 0) + 1; });
      chips.forEach(function (b) {
        var g = b.getAttribute('data-g'), v = b.getAttribute('data-v'), n = b.querySelector('.npt-n');
        if (v === '') { n.textContent = String(c.all); return; }
        if (!g) return;
        n.textContent = String(c[g] || 0);
        b.hidden = !c[g] && v !== sel.value;
      });
      Object.keys(secs).forEach(function (k) {
        var any = chips.some(function (b) { var g = b.getAttribute('data-g'); return g && !b.hidden && GROUPS.some(function (x) { return x.id === g && x.sec === k; }); });
        secs[k].hidden = !any;
      });
    }
    var have = cached();
    if (have) { counts(have); return; }
    var go = function () { data().then(counts).catch(function () {}); };
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); go(); } });
      io.observe(wrap);
    } else go();
  }

  // ================================= 2. Similar Projects ============================================================
  function km(a, b) {
    var r = Math.PI / 180, la1 = a.lat * r, la2 = b.lat * r, dla = la2 - la1, dlo = (b.lng - a.lng) * r;
    var h = Math.sin(dla / 2) * Math.sin(dla / 2) + Math.cos(la1) * Math.cos(la2) * Math.sin(dlo / 2) * Math.sin(dlo / 2);
    return 12742 * Math.asin(Math.min(1, Math.sqrt(h)));
  }
  function price(p) { var n = parseFloat(p.price_from); return n > 0 ? n : 0; }
  function picks(d, me) {
    var gm = grp(me.development_type), fm = family(gm), pa = price(me), out = [];
    if (!gm || !(+me.lat) || !(+me.lng)) return null;
    d.forEach(function (x, i) {
      if (x === me || slugOf(x.url) === slugOf(me.url)) return;
      var g = grp(x.development_type);
      if (!g || family(g) !== fm || !(+x.lat) || !(+x.lng)) return;
      var dist = km({ lat: +me.lat, lng: +me.lng }, { lat: +x.lat, lng: +x.lng });
      if (dist > 100) return;
      var pb = price(x), s = 0;
      if (pa && pb) { if (Math.max(pa, pb) / Math.min(pa, pb) > 5) return; s += Math.abs(Math.log(pa / pb)) * 20; }
      if (g !== gm) s += 15;
      if (String(x.state_id) !== String(me.state_id)) s += 15;
      s += Math.min(dist, 150) * 0.5;
      out.push({ p: x, i: i, km: dist, s: s });
    });
    out.sort(function (a, b) { return a.s - b.s; });
    return out.slice(0, 4);
  }
  // full card facts (price range, developer, logo) from the New Launches page that holds the card; 12 cards a page
  var CKEY = 'npt_cards_v1';
  function cardCache() { try { var c = JSON.parse(sessionStorage.getItem(CKEY) || 'null'); if (c && Date.now() - c.t < TTL && c.d) return c; } catch (x) {} return { t: Date.now(), d: {}, pages: {} }; }
  function readPage(h, store) {
    var doc = new DOMParser().parseFromString(h, 'text/html');
    [].forEach.call(doc.querySelectorAll('.project-card'), function (card) {
      var a = card.querySelector('a[href*="/project/"]'), s = a && slugOf(a.getAttribute('href'));
      if (!s) return;
      var q = function (sel) { var e = card.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; };
      var meta = {};
      [].forEach.call(card.querySelectorAll('.project-meta > span'), function (sp) {
        var k = sp.querySelector('.metatitle'), v = sp.querySelector('.metadesc');
        if (k && v) meta[k.textContent.trim()] = v.textContent.replace(/\s+/g, ' ').trim();
      });
      var logo = card.querySelector('.developer-logo img');
      store[s] = { name: q('.project-name'), loc: q('.project-location'), type: q('.project-type'), size: meta['Built-up'] || '',
        price: meta['Price Range'] || '', tenure: meta['Tenure'] || '', dev: q('.developer-name'), logo: logo ? logo.getAttribute('src') : '',
        e: !!card.querySelector('.project-ebadge') };
    });
  }
  function facts(list) {
    var c = cardCache(), need = {};
    list.forEach(function (x) { if (!c.d[slugOf(x.p.url)]) need[Math.floor(x.i / 12)] = 1; });
    var pages = Object.keys(need).filter(function (k) { return !c.pages[k]; });
    return Promise.all(pages.map(function (k) {
      return fetch(+k ? '/project/' + (12 * k) : '/project/', { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (h) { readPage(h, c.d); c.pages[k] = 1; });
    })).then(function () {
      try { sessionStorage.setItem(CKEY, JSON.stringify(c)); } catch (x) {}
      return c.d;
    });
  }
  function oneprice(s) {
    var m = /^\s*(RM)\s?([\d,]+(?:\.\d+)?)\s*[-\u2013\u2014]\s*RM\s?([\d,]+(?:\.\d+)?)\s*$/.exec(String(s).replace(/\u00a0/g, ' '));
    return m && m[2] === m[3] ? m[1] + ' ' + m[2] : String(s).replace(/\u00a0/g, ' ').trim();
  }
  function kmText(v) { return v < 10 ? v.toFixed(1) : String(Math.round(v)); }
  function similar() {
    var sec = D.getElementById('similar-projects'), grid = sec && sec.querySelector('.similar-grid');
    var tpl = grid && grid.querySelector('.similar-card');
    var mine = slugOf(PATH);
    if (!tpl || !mine || /\/e-enquiry\//.test(PATH)) return;
    css('.npt-cardlink{display:block;color:inherit;text-decoration:none}.npt-cardlink:hover{color:inherit;text-decoration:none}' +
      '.npt-km{display:inline-block;align-self:flex-start;font-size:13px;font-weight:700;line-height:18px;color:#b00217;background:#fdecee;border-radius:999px;padding:2px 10px;margin:4px 0 2px}');
    var originals = {};
    [].forEach.call(grid.querySelectorAll('.similar-card'), function (c) { var a = c.querySelector('a[href*="/project/"]'); if (a) originals[slugOf(a.getAttribute('href'))] = c; });
    function run() {
      data().then(function (d) {
        var me = d.filter(function (x) { return slugOf(x.url) === mine; })[0];
        if (!me) return;
        var list = picks(d, me), more = false;
        if (!list) return;
        if (!list.length) {
          more = true;
          list = d.map(function (x, i) { return { p: x, i: i, km: null }; }).filter(function (x) { return slugOf(x.p.url) !== mine; }).slice(0, 4);
        }
        return facts(list).then(function (f) {
          var cards = list.map(function (x) { return build(x, f[slugOf(x.p.url)]); }).filter(Boolean);
          if (!cards.length) return;
          while (grid.firstChild) grid.removeChild(grid.firstChild);
          cards.forEach(function (c) { grid.appendChild(c); });
          if (more) {
            var t = sec.querySelector('.sec-title');
            if (t) { var n = own('div', 'more', null, t.className); t.parentNode.replaceChild(n, t); }
          }
        });
      }).catch(function () {});
    }
    function build(x, f) {
      if (!f || !f.name) return null;
      var p = x.p, url = p.url, c = tpl.cloneNode(true);
      // the copy comes from a card the site's translator may already have done (it marks those data-np-*); new words
      // must not carry those marks, so the translator does them again when the card goes in
      var fresh = function (e) { [e].concat([].slice.call(e.querySelectorAll('*'))).forEach(function (n) { [].slice.call(n.attributes).forEach(function (at) { if (/^data-np-/.test(at.name) && at.name !== 'data-np-skip') n.removeAttribute(at.name); }); }); };
      var set = function (sel, v) { var e = c.querySelector(sel); if (e) { e.textContent = v; fresh(e); } return e; };
      [].forEach.call(c.querySelectorAll('a[href*="/project/"]'), function (a) { a.setAttribute('href', url); });
      var img = c.querySelector('.similar-media img');
      if (img) { img.setAttribute('src', p.image_url); img.setAttribute('alt', f.name); fresh(img); }
      var badge = c.querySelector('.similar-ebadge');
      if (badge && !f.e) badge.parentNode.removeChild(badge);
      if (!badge && f.e && img) { var ob = D.querySelector('#similar-projects .similar-ebadge'); if (ob) img.parentNode.insertBefore(ob.cloneNode(true), img.nextSibling); }
      set('.similar-name', f.name);
      var loc = set('.similar-loc', f.loc);
      set('.similar-type', f.type);
      set('.similar-size', f.size);
      var pr = c.querySelector('.similar-price');
      if (pr) { if (f.price) { pr.textContent = oneprice(f.price); fresh(pr); } else pr.parentNode.removeChild(pr); }
      set('.similar-dev-name', f.dev);
      var dl = c.querySelector('.similar-dev-badge img');
      if (dl) { if (f.logo) { dl.setAttribute('src', f.logo); dl.setAttribute('alt', f.dev + ' Logo'); fresh(dl); } else dl.parentNode.removeChild(dl); }
      [].forEach.call(c.querySelectorAll('.npt-km'), function (e) { e.parentNode.removeChild(e); });
      // the site's card only links its photo (its markup nests one link in another); the words link too
      var copy = c.querySelector('.similar-copy');
      if (copy && !copy.closest('a')) { var cl = D.createElement('a'); cl.href = url; cl.className = 'npt-cardlink'; copy.parentNode.insertBefore(cl, copy); cl.appendChild(copy); }
      if (x.km != null && loc) loc.parentNode.insertBefore(own('div', 'away', kmText(x.km), 'npt-km'), loc.nextSibling);
      // Save: a logged-out card links to login (kept); a member's button carries this project's id
      var sv = c.querySelector('.project-save-btn');
      if (sv && sv.hasAttribute('data-project-id')) {
        var orig = originals[slugOf(url)], ob2 = orig && orig.querySelector('.project-save-btn');
        if (ob2) sv.parentNode.replaceChild(ob2.cloneNode(true), sv);
        else {
          var id = idOf(p);
          if (!id) sv.parentNode.removeChild(sv);
          else {
            sv.setAttribute('data-project-id', id); sv.setAttribute('data-project-name', f.name); sv.setAttribute('data-saved-id', '0');
            sv.setAttribute('aria-pressed', 'false'); sv.classList.remove('is-saved'); sv.title = 'Save this project';
            var h = sv.querySelector('.heart'), lb = sv.querySelector('.psave-label');
            if (h) h.innerHTML = '&#9825;';
            if (lb) lb.textContent = 'Save';
          }
        }
      }
      return c;
    }
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); run(); } }, { rootMargin: '800px 0px' });
      io.observe(sec);
    } else run();
  }

  // ================================= 3. e-Enquiry header ===========================================================
  // the English words of an element, also after the site's translator has swapped them (it keeps them in data-np-k)
  function enText(e) {
    var k = e.getAttribute('data-np-k'), c = e.querySelector('[data-np-k]');
    if (!k && c && c.textContent.replace(/\s+/g, ' ').trim() === e.textContent.replace(/\s+/g, ' ').trim()) k = c.getAttribute('data-np-k');
    return (k || e.textContent).replace(/\s+/g, ' ').trim();
  }
  function header() {
    if (!/\/project\/[^\/]+\/e-enquiry\/?$/.test(PATH)) return;
    var src = D.querySelector('.ofb-project-meta .ofb-project-type');
    var items = D.querySelectorAll('.hero-meta .hero-meta-item'), it = null;
    [].forEach.call(items, function (e) { if (!e.querySelector('.hero-loc-dot')) it = e; });
    if (!src || !it) return;
    var meta = it.parentNode;
    if (!enText(src) || enText(src) === enText(it)) return;
    // the header shows what the property type below says, in the language on screen; the site's translator may treat
    // the whole header line as one block, so the item is kept in step with the type below on every change
    function apply() {
      var want = src.textContent.replace(/\s+/g, ' ').trim(), cur = null;
      [].forEach.call(meta.querySelectorAll('.hero-meta-item'), function (e) { if (!e.querySelector('.hero-loc-dot')) cur = e; });
      if (!want || !cur) return;
      if (!cur.hasAttribute('data-np-skip')) cur.setAttribute('data-np-skip', '');
      if (cur.textContent.replace(/\s+/g, ' ').trim() !== want) cur.textContent = want;
    }
    apply();
    try {
      var mo = new MutationObserver(apply);
      mo.observe(src, { childList: true, subtree: true, characterData: true });
      mo.observe(meta, { childList: true, subtree: true, characterData: true });
    } catch (x) {}
  }

  ready(function () {
    try { if (/^\/project\/?(\d+\/?)?$/.test(PATH)) filter(); } catch (x) {}
    try { similar(); } catch (x) {}
    try { header(); } catch (x) {}
  });
})();
