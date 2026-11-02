/* iNewProject Meta Pixel v1 (2 Nov 2026). Dataset "iNewProject website" 2071002696938711, owned by the inewproject.com portfolio.
   PageView on every page. Lead ONLY when the server confirms an e-Enquiry (POST home/sendEnquiryEEnquiry/ answered status:true),
   the same trigger as GA4's generate_lead e_enquiry. The sales-rep form, listing enquiry and sign-ups send nothing.
   Automatic events are off, so Meta sees only what this file sends. No name, phone or email is ever sent.
   Our own browsers (?np_internal=1, the same flag as GA4) load nothing. */
(function () {
  var ID = '2071002696938711';
  try {
    if (/[?&]np_internal=1/.test(location.search)) localStorage.setItem('np_internal', '1');
    if (/[?&]np_internal=0/.test(location.search)) localStorage.removeItem('np_internal');
    if (localStorage.getItem('np_internal') === '1') return;
  } catch (e) {}
  if (window.__npPx) return;
  window.__npPx = 1;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('set', 'autoConfig', false, ID);
  fbq('init', ID);
  fbq('track', 'PageView');

  function cfg(k) { try { if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG[k]) return String(APP_CONFIG[k]); } catch (e) {} return ''; }
  function lead(data) {
    var p = { content_category: 'e_enquiry' },
        n = cfg('projectName') || String((data && data.projectname) || '').split(' | ')[0],
        id = cfg('projectId') || String((data && data.projectid) || ''),
        u = String((data && data.unittype) || '').slice(0, 40);
    if (n) p.content_name = String(n).trim().slice(0, 100);
    if (/^\d{1,6}$/.test(id)) p.project_id = id;
    if (u) p.unit_type = u;
    fbq('track', 'Lead', p);
  }
  var tries = 0;
  (function hook() {
    var $ = window.jQuery;
    if (!$ || !$.ajaxPrefilter) { if (++tries < 150) setTimeout(hook, 200); return; }
    $.ajaxPrefilter(function (opts, orig, xhr) {
      try {
        if (!/\/home\/sendEnquiryEEnquiry\//.test(String((opts && opts.url) || '')) || !xhr || !xhr.done) return;
        var data = (orig && typeof orig.data === 'object' && orig.data) || {};
        xhr.done(function (d) {
          try { if (typeof d === 'string') d = JSON.parse(d); if (d && d.status == true) lead(data); } catch (e) {}
        });
      } catch (e) {}
    });
  })();
})();
