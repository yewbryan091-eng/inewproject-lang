/* iNewProject SEO v2 (10 Nov 2026) = v1 plus four things Google reads. Nothing visible changes.
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
