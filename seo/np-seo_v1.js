/* iNewProject SEO v1 (3 Nov 2026). The site template still names the site "New Project 1U" (og:site_name and the logo alt
   text), and Google picks that up as the site name. This file:
   - sets og:site_name and every logo alt that says "New Project 1U" to "iNewProject" (every page);
   - adds WebSite structured data with the name "iNewProject" (homepage only), Google's main site-name signal.
   Nothing visible changes. Loaded with defer from the Header Scripts box, so the page is fully parsed when it runs. */
(function () {
  var NAME = 'iNewProject', OLD = 'New Project 1U';
  try {
    var m = document.querySelector('meta[property="og:site_name"]');
    if (m && m.getAttribute('content') !== NAME) m.setAttribute('content', NAME);
  } catch (e) {}
  try {
    var imgs = document.querySelectorAll('img[alt]');
    for (var i = 0; i < imgs.length; i++) if (imgs[i].getAttribute('alt') === OLD) imgs[i].setAttribute('alt', NAME);
  } catch (e) {}
  try {
    var p = location.pathname;
    if ((p === '/' || p === '') && !document.getElementById('np-seo-website')) {
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = 'np-seo-website';
      s.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': NAME,
        'alternateName': 'inewproject.com',
        'url': 'https://www.inewproject.com/'
      });
      document.head.appendChild(s);
    }
  } catch (e) {}
})();
