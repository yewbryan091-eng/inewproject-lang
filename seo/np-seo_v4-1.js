/* iNewProject SEO v4.1 (11 Nov 2026): v4 with no hreflang on Insights articles (each is written in one language; the BM
   Klang article is Malay, so it must not be labelled the English version). */
/* iNewProject SEO v4 (11 Nov 2026) = v3 plus the address tags Google uses to pick the right page. Nothing visible changes.
   v4 adds (the server's own tags are wrong; we correct them in the page):
   - canonical = the page's clean address: no ?tags (search words, ad-click gclid/fbclid, utm), ending with "/".
     Only ?lang=ms / ?lang=zh is kept, so the BM and 中文 versions count as their own pages. New Launches page 2, 3 ...
     (/project/12/) point to themselves instead of page 1.
   - hreflang: every public page names its English, BM and 中文 versions (en, ms, zh-Hans, x-default = English).
   - og:url = the same clean address.
   v3 (11 Nov 2026) = v2 plus two fixes.
   v3 adds: Insights articles get their own <title> and meta description (the template gives every article the
   Insights hub's title, so Google saw one page title for all articles): title = the article's h1 + " | iNewProject",
   description = its first paragraph (about 155 characters). New Launches page 2, 3 ... (/project/12 ...) get the
   New Launches description and a "(Page N)" title instead of "iNewProject".
   v2 (10 Nov 2026) = v1 plus four things Google reads.
   v1 (3 Nov): og:site_name and logo alt "New Project 1U" -> "iNewProject" (every page); WebSite structured data (homepage).
   v2 adds:
   - a real <h1> around the page's existing visible title, where the page has none:
       New Launches (/project/, its pages and searches): the "Search New Properties" title;
       a listing (/project/<name>/): the project name at the top. The e-Enquiry page already has one.
     The <h1> sits inside the title box with every style inherited and no box of its own (display: contents), so the
     title looks and moves exactly as before. Checked again after load, in case another script rewrites the title.
   - the e-Enquiry page's meta description (the template repeats the title there);
   - <html lang="en"> when no language is set (the language switcher still sets ms / zh-Hans for BM / 中文);
   - Organization structured data on the homepage (name, logo, official social pages).
   Loaded with defer from the Header Scripts box, so the page is fully parsed when it runs. */
(function () {
  var NAME = 'iNewProject', OLD = 'New Project 1U', SITE = 'https://www.inewproject.com/';
  var path = location.pathname;
  var isHome = path === '/' || path === '';
  var isEnquiry = /^\/project\/[^\/]+\/e-enquiry\/?$/.test(path);
  var isListing = !isEnquiry && /^\/project\/[^\/]+\/?$/.test(path) && !/^\/project\/\d+\/?$/.test(path);
  var isLaunches = /^\/project(\/\d+)?\/?$/.test(path);

  try {
    var m = document.querySelector('meta[property="og:site_name"]');
    if (m && m.getAttribute('content') !== NAME) m.setAttribute('content', NAME);
  } catch (e) {}
  try {
    var imgs = document.querySelectorAll('img[alt]');
    for (var i = 0; i < imgs.length; i++) if (imgs[i].getAttribute('alt') === OLD) imgs[i].setAttribute('alt', NAME);
  } catch (e) {}

  try {
    if (!document.documentElement.getAttribute('lang')) document.documentElement.setAttribute('lang', 'en');
  } catch (e) {}

  function addLd(id, data) {
    if (document.getElementById(id)) return;
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = id;
    s.text = JSON.stringify(data);
    document.head.appendChild(s);
  }
  try {
    if (isHome) {
      addLd('np-seo-website', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': NAME,
        'alternateName': 'inewproject.com',
        'url': SITE
      });
      addLd('np-seo-org', {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': NAME,
        'url': SITE,
        'logo': 'https://www.inewproject.com/images/uploads/layout/NP1U_logo-5.png',
        'sameAs': [
          'https://www.facebook.com/inewproject/',
          'https://www.instagram.com/inewproject/',
          'https://www.tiktok.com/@inewproject.com',
          'https://www.youtube.com/@iNewProject',
          'https://www.linkedin.com/company/newproject1u/'
        ]
      });
    }
  } catch (e) {}

  function text(el) { return el ? String(el.textContent || '').replace(/\s+/g, ' ').trim() : ''; }

  try {
    if (isEnquiry) {
      var h = document.querySelector('h1');
      var project = text(h) || String(document.title || '').split('|')[0].trim();
      var d = document.querySelector('meta[name="description"]');
      if (project && d && d.getAttribute('content') === document.title) {
        d.setAttribute('content', 'Choose a unit at ' + project +
          ': see which units are still open and their floor plans, then send a free e-Enquiry and get rewarded.');
      }
    }
  } catch (e) {}

  function meta(sel, v) { var m = document.querySelector(sel); if (m && v) m.setAttribute('content', v); }
  function clip(t, n) { t = String(t || '').replace(/\s+/g, ' ').trim(); if (t.length <= n) return t; t = t.slice(0, n - 1); return t.slice(0, Math.max(t.lastIndexOf(' '), n - 20)).replace(/[\s,.:;]+$/, '') + '\u2026'; }
  try {
    var body = /^\/insights\/[^\/]+\/?$/.test(path) && document.querySelector('.article-body');
    var ah = body && document.querySelector('h1');
    if (ah && text(ah)) {
      var t = text(ah) + ' | ' + NAME;
      document.title = t;
      meta('meta[property="og:title"]', t);
      var p1 = body.querySelector('p');
      var d1 = clip(text(p1), 155);
      if (d1) { meta('meta[name="description"]', d1); meta('meta[property="og:description"]', d1); }
    }
  } catch (e) {}
  try {
    var pg = /^\/project\/(\d+)\/?$/.exec(path);
    var dd = document.querySelector('meta[name="description"]');
    if (pg && document.title === NAME) document.title = 'New Launches in Malaysia: Units Still Open (Page ' + (Math.floor(+pg[1] / 12) + 1) + ') | ' + NAME;
    if (pg && dd && dd.getAttribute('content') === NAME) {
      dd.setAttribute('content', 'Browse new launch condos, landed homes and shops across Malaysia. See which units are still open, prices and layouts, and send a free e-Enquiry.');
    }
  } catch (e) {}


  try {
    var priv = /^\/(member|register|admin|pagenotfound|logout|login)(\/|$)/.test(path);
    var lm = /[?&]lang=(ms|zh)(?=&|#|$)/.exec(location.search);
    var lang = lm ? lm[1] : '';
    var clean = location.origin.replace(/^http:/, 'https:') + (path.replace(/\/+$/, '') + '/').replace(/^\/\/$/, '/');
    if (!/^https:\/\/www\.inewproject\.com\//.test(clean)) clean = 'https://www.inewproject.com' + (path.replace(/\/+$/, '') + '/').replace(/^\/\/$/, '/');
    var own = lang ? clean + '?lang=' + lang : clean;
    var can = document.querySelector('link[rel="canonical"]');
    if (!priv) {
      if (!can) { can = document.createElement('link'); can.rel = 'canonical'; document.head.appendChild(can); }
      can.setAttribute('href', own);
      meta('meta[property="og:url"]', own);
      var robots = document.querySelector('meta[name="robots"]');
      if (!/^\/insights\/[^\/]+\/?$/.test(path) && !(robots && /noindex/i.test(robots.content)) && !document.querySelector('link[rel="alternate"][hreflang]')) {
        [['en', clean], ['ms', clean + '?lang=ms'], ['zh-Hans', clean + '?lang=zh'], ['x-default', clean]].forEach(function (a) {
          var l = document.createElement('link');
          l.rel = 'alternate'; l.setAttribute('hreflang', a[0]); l.href = a[1];
          document.head.appendChild(l);
        });
      }
    }
  } catch (e) {}
  function target() {
    if (isListing) return document.querySelector('.hero-top .hero-title');
    if (isLaunches) return document.querySelector('#pagetitle .container > .sec-title');
    return null;
  }
  function heading() {
    try {
      if (document.querySelector('h1')) return;
      var t = target();
      if (!t || !text(t)) return;
      var h1 = document.createElement('h1');
      h1.className = 'np-seo-h1';
      h1.setAttribute('style', 'all:inherit;display:contents');
      while (t.firstChild) h1.appendChild(t.firstChild);
      t.appendChild(h1);
    } catch (e) {}
  }
  if (isListing || isLaunches) {
    heading();
    window.addEventListener('load', heading);
    setTimeout(heading, 3000);
  }
})();
