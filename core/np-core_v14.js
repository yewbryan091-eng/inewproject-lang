/* iNewProject core scripts v14 (8 Nov 2026) = v13 with the dictionary pin moved (About, Developer Summary and Master Plan text for 7 listings) and one block added at the end (the site's pop-ups always fit the screen; empty listing facts hidden). v13 (8 Nov 2026) = v12 with the dictionary pin moved (phase names with blocks), nothing else. v7 (6 Nov 2026) = v6 with the dictionary pin moved, nothing else. v6 (6 Nov 2026, never in a box) = v5 with the dictionary pin moved. v5 (6 Nov 2026) = v4 with the dictionary pin moved. v4 was: v3 with the search and hero pins moved to drawing v14; v3 (2 Nov 2026) = v2 with the homepage reward steps' e-Enquire icon as a tick in a circle
   (Tabler Icons "circle-check", filled, MIT licence, (c) Pawel Kuna). v2 = v1 without the GA4 lead events, which went
   back into the admin Header Scripts box next to Google's own tags. v1: every script that was written out inside the
   box, moved here unchanged and in the same order. Loaded from the box, pinned to a commit and checked with SRI, without
   defer, so it runs at the same moment the inline scripts did. Each part sits in its own try/catch. */
/* iNewProject . card Save buttons + header Log in / Register (added 29 Oct 2026). Save: a bookmark instead of the heart
     on every card, filled when saved, never covering the badge. Header: a quiet "Log in" and a solid red "Register".
     v2 (1 Nov 2026): the e-Enquiry site plan at most 480 px tall on every project. If jsDelivr fails, the page shows as before. */
try {
(function () {
  var SV = '.project-save-btn, .pl-save-btn, .save-btn', CH = '.project-ebadge, .similar-ebadge, .fair-status-chip, .pl-status-chip', t = 0;
  var ro = window.ResizeObserver && window.WeakSet ? new ResizeObserver(later) : null, seen = ro ? new WeakSet() : null;
  function chip(b) { var k = b.parentElement ? b.parentElement.children : [], i; for (i = 0; i < k.length; i++) if (k[i] !== b && k[i].matches(CH)) return k[i]; return null; }
  function gap(x) { return x[0].getBoundingClientRect().left - x[1].getBoundingClientRect().right; }
  function run() {
    var s = document.querySelectorAll(SV), w = [], i, b, c;
    for (i = 0; i < s.length; i++) {
      b = s[i]; c = chip(b);
      b.classList.remove('np-sv-icon', 'np-sv-low'); b.style.removeProperty('--np-sv-y');
      if (!c) continue;
      c.classList.remove('np-sv-top');
      if (ro && !seen.has(b.parentElement)) { seen.add(b.parentElement); ro.observe(b.parentElement); }
      if (getComputedStyle(b).position === 'absolute' && getComputedStyle(c).position === 'absolute') w.push([b, c]);
    }
    w = w.filter(function (x) { return x[0].offsetWidth && x[1].offsetWidth && gap(x) < 8; });
    w.forEach(function (x) { x[0].classList.add('np-sv-icon'); });
    w = w.filter(function (x) { return gap(x) < 8; });
    w.forEach(function (x) { x[1].classList.add('np-sv-top'); });
    w.forEach(function (x) { var f = x[0].offsetHeight / parseFloat(getComputedStyle(x[0]).height) || 1;
      x[0].style.setProperty('--np-sv-y', (parseFloat(getComputedStyle(x[1]).top) + x[1].offsetHeight / f + 8) + 'px'); x[0].classList.add('np-sv-low'); });
  }
  function later() { if (!t) t = setTimeout(function () { t = 0; try { run(); } catch (e) {} }, 80); }
  function start() { try { run(); new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true }); addEventListener('resize', later); addEventListener('load', later); if (document.fonts && document.fonts.ready) document.fonts.ready.then(later); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject . homepage first section, the three points (added 30 Oct 2026): the first two reworded to "1,000+ units open"
     and "Free, no obligation"; the third "Guaranteed reward on eligible SPAs" (30 Oct; "eligible" stays: the Rewards T&C
     entitles every eligible SPA to one reward, a bare "guaranteed" would contradict it). EN kept short and the tray's inner
     spacing a little tighter on laptops so the three stay on one row (BM keeps its two rows). The open-unit count comes from the e-Enquiry unit charts: 1,421 open on
     30 Oct; recount monthly and change or remove this block if it ever gets near 1,000. It sits before the languages block so
     the words change before the translator reads them (BM / ZH rows in the dictionaries). */
try {
(function () {
	if (location.pathname !== '/') return;
	var W = { 'Free to enquire': '1,000+ units open', 'Live unit availability': 'Free, no obligation', 'Get rewarded on a completed SPA': 'Guaranteed reward on eligible SPAs' };
	function fix() {
		var t = document.querySelectorAll('.hero-tags .hero-tag');
		for (var i = 0; i < t.length; i++) {
			var x = t[i].firstChild, k = x && x.nodeType === 3 ? x.nodeValue.trim() : '';
			if (W[k]) x.nodeValue = x.nodeValue.replace(k, W[k]);
		}
		return t.length >= 3;
	}
	var mo = new MutationObserver(function () { if (fix()) mo.disconnect(); });
	mo.observe(document.documentElement, { childList: true, subtree: true });
	document.addEventListener('DOMContentLoaded', function () { fix(); mo.disconnect(); });
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject . member wording + Similar Projects cards (added 30 Oct 2026). (1) The account type is "Member", not
     "Member/Investor": the header Log in / Register menus, the login page and pop-up tabs, the register page tab and its two
     lines ("member privileges"; developers "reach serious property buyers"). Words swapped before the translator reads them
     (BM "Ahli", ZH from the dictionaries), also in anything the page adds later. Project write-ups that mention investors stay.
     (2) Similar Projects cards: the site's template puts the Save link inside the card link, so the browser cuts the card link
     short and the name and details did not open the project; a click anywhere on the card now opens it (Save still saves).
     Both are also on the developer's list to fix in the template. */
try {
(function () {
	var W = { 'Member/Investor': 'Member', 'Member / Investor': 'Member', 'Enjoy exclusive investor privileges': 'Enjoy exclusive member privileges', 'Reach serious property investors': 'Reach serious property buyers' };
	function one(t) { var v = t.nodeValue; if (v.length > 60) return; var k = v.trim(); if (W[k]) t.nodeValue = v.replace(k, W[k]); }
	function fix(n) {
		if (n.nodeType === 3) return one(n);
		if (n.nodeType !== 1 || n.tagName === 'SCRIPT' || n.tagName === 'STYLE') return;
		var w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT), t;
		while ((t = w.nextNode())) one(t);
	}
	new MutationObserver(function (ms) {
		for (var i = 0; i < ms.length; i++) for (var j = 0; j < ms[i].addedNodes.length; j++) fix(ms[i].addedNodes[j]);
	}).observe(document.documentElement, { childList: true, subtree: true });
	document.addEventListener('click', function (e) {
		var c = e.target.closest && e.target.closest('#similar-projects .similar-card');
		if (!c || e.defaultPrevented || e.target.closest('a[href], button, input, label')) return;
		var a = c.querySelector('a[href]:not(.project-save-btn)');
		if (!a) return;
		if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(a.href, '_blank'); else location.href = a.href;
	});
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject . homepage reward steps icons (added 31 Oct 2026): the three step icons in "Get rewarded with e-Enquiry
     incentives" (e-Enquire / Sign your SPA / Get rewarded) become solid icons: a tick in a circle (2 Nov), a pen nib, a gift.
     Only the icon drawings change; the circles, numbers, line, green last step and words stay the site's own.
     Homepage only; does nothing if the section does not have exactly three steps. */
try {
(function () {
	if (location.pathname !== '/') return;
	var S = ["<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z\"/></svg>", "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" fill-rule=\"evenodd\" aria-hidden=\"true\"><g transform=\"rotate(45 12 12) translate(0 .5)\"><path d=\"M8.6 1h6.8l4 9.6L12 22.5 4.6 10.6zM10 10.4a2 2 0 1 0 4 0a2 2 0 1 0 -4 0zM12.0 12.4h0.0a0.7 0.7 0 0 1 0.7 0.7v9.6a0.7 0.7 0 0 1 -0.7 0.7h-0.0a0.7 0.7 0 0 1 -0.7 -0.7v-9.6a0.7 0.7 0 0 1 0.7 -0.7z\"/></g></svg>", "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" fill-rule=\"evenodd\" aria-hidden=\"true\"><path d=\"M4.2 7.8h15.6a1.2 1.2 0 0 1 1.2 1.2v2.1999999999999997a1.2 1.2 0 0 1 -1.2 1.2h-15.6a1.2 1.2 0 0 1 -1.2 -1.2v-2.1999999999999997a1.2 1.2 0 0 1 1.2 -1.2zM5.7 13.4h12.6a1.2 1.2 0 0 1 1.2 1.2v5.699999999999999a1.2 1.2 0 0 1 -1.2 1.2h-12.6a1.2 1.2 0 0 1 -1.2 -1.2v-5.699999999999999a1.2 1.2 0 0 1 1.2 -1.2zM11.1 7.8h1.8a0 0 0 0 1 0 0v4.6a0 0 0 0 1 -0 0h-1.8a0 0 0 0 1 -0 -0v-4.6a0 0 0 0 1 0 -0zM11.1 13.4h1.8a0 0 0 0 1 0 0v8.1a0 0 0 0 1 -0 0h-1.8a0 0 0 0 1 -0 -0v-8.1a0 0 0 0 1 0 -0z\"/><path d=\"M12 7.2C10.6 3.2 6.2 3.4 6.8 5.9c.4 1.6 2.6 1.6 5.2 1.3zM12 7.2c1.4-4 5.8-3.8 5.2-1.3-.4 1.6-2.6 1.6-5.2 1.3z\"/></svg>"];
	function fix() {
		var n = document.querySelectorAll('.rwh-steps .rwh-node svg');
		if (n.length !== 3 || n[0].getAttribute('data-np-ic')) return n.length === 3;
		for (var i = 0; i < 3; i++) n[i].outerHTML = S[i].replace('<svg ', '<svg data-np-ic="1" ');
		return true;
	}
	var mo = new MutationObserver(function () { if (fix()) mo.disconnect(); });
	mo.observe(document.documentElement, { childList: true, subtree: true });
	document.addEventListener('DOMContentLoaded', function () { fix(); mo.disconnect(); });
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject languages: EN | BM | ZH switcher next to the logo (added 23 Oct 2026) 
     Translations load only when a visitor picks BM or ZH, from GitHub via jsDelivr (pinned commit, never changes).
     Off switch: NP_LANG_LIVE = false. Source + runbook: inewproject.os/projects/site-languages/deploy/DEPLOY.md */
try {
window.NP_LANG_LIVE = true;
window.NP_LANGS = ['en', 'ms', 'zh'];
window.NP_DICT_BASE = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@a54372170f56a1a150c0bf1e48865f1905fd679f/';
window.NP_DICT_FILES = { ms: 'dict.ms_v2.js', zh: 'dict.zh_v2.js' };
window.NP_LANG_CSS = '/images/uploads/editor/files/np-lang_v1.css';
} catch (e) { setTimeout(function () { throw e; }); }
try {
/* np-lang v4 inline (24 Oct 2026), minified from site-languages/proof/np-lang.js */!function(){"use strict";var t="np_preview",e=!1;try{var n=/[?&]np_preview=([01])/.exec(location.search);n&&("1"===n[1]?localStorage.setItem(t,"1"):localStorage.removeItem(t)),e="1"===localStorage.getItem(t)}catch(t){}if(!0===window.NP_LANG_LIVE||e){if(window.NP_LANG_CSS){var a=document.createElement("link");a.rel="stylesheet",a.href=window.NP_LANG_CSS,(document.head||document.documentElement).appendChild(a)}var r=window.NP_LANGS||["en","ms","zh"],o=[{code:"en",label:"EN",html:"en"},{code:"ms",label:"BM",html:"ms"},{code:"zh",label:"\u4e2d\u6587",html:"zh-Hans"}].filter((function(t){return r.indexOf(t.code)>-1||"en"===t.code})),l="np_lang",c=/^(A|ABBR|B|BDI|BR|CITE|EM|FONT|I|IMG|MARK|Q|S|SMALL|SPAN|STRONG|SUB|SUP|TIME|U|SVG)$/,i=/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE|TEMPLATE|IFRAME|OBJECT|CANVAS|VIDEO|AUDIO|HEAD|TITLE)$/,d=["placeholder","title","aria-label"],u=/[A-Za-z]/,s="en",p=null,f="en";try{f=localStorage.getItem(l)||"en"}catch(t){}b(f)||(f="en"),"en"!==f&&(S(!0),function t(){var e=document.head||document.documentElement;if(!e)return setTimeout(t,0);var n=document.createElement("style");n.textContent="html.np-wait body{visibility:hidden!important}",e.appendChild(n),document.documentElement.classList.add("np-wait")}(),setTimeout(N,2500));var m=String.fromCharCode(38),h=new RegExp(m+"lt;","g"),g=new RegExp(m+"gt;","g"),v=new RegExp(m+"amp;","g"),A={},y={},E=!1;window.NPLang={set:q,get:function(){return s},keys:function(){var t={};return Array.prototype.forEach.call(document.querySelectorAll("[data-np-k]"),(function(e){t[e.getAttribute("data-np-k")]=1})),Array.prototype.forEach.call(document.querySelectorAll("*"),(function(e){d.concat("value").forEach((function(n){var a=e.getAttribute("data-np-a-"+n);a&&(t[C(a)]=1)}))})),Object.keys(t)},missing:function(t){return Object.keys(A[t]||{})}},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",M):M()}function b(t){return o.some((function(e){return e.code===t}))}function N(){document.documentElement&&document.documentElement.classList.remove("np-wait")}function S(t){var e=document.documentElement;if(e){t?(e.setAttribute("translate","no"),e.classList.add("notranslate")):(e.removeAttribute("translate"),e.classList.remove("notranslate"));var n=document.querySelector('meta[name="google"][content="notranslate"]');t&&!n&&document.head?((n=document.createElement("meta")).name="google",n.content="notranslate",document.head.appendChild(n)):!t&&n&&n.parentNode.removeChild(n)}}function C(t){return t.replace(/&/g,m+"amp;").replace(/</g,m+"lt;").replace(/>/g,m+"gt;")}function T(t){return t.replace(h,"<").replace(g,">").replace(v,m)}function w(t){return t.replace(/[\s\xa0]+/g," ").trim()}function I(t){if(i.test(t.tagName))return!0;if("np-lang"===t.id)return!0;var e=t.closest&&t.closest('[data-np-skip],.notranslate,[translate="no"]');return!!e&&e!==document.documentElement}function L(t){return/^(BR|IMG|SVG)$/.test(t.tagName)||!u.test(t.textContent)}function _(t){for(var e=0;e<t.childNodes.length;e++){var n=t.childNodes[e];if(1===n.nodeType){if(i.test(n.tagName)||!c.test(n.tagName))return!1;if(!L(n)&&!_(n))return!1}}return!0}function k(t){t&&1===t.nodeType&&(d.forEach((function(e){var n=t.getAttribute(e);n&&u.test(n)&&!t.hasAttribute("data-np-a-"+e)&&t.setAttribute("data-np-a-"+e,w(n))})),"INPUT"===t.tagName&&/^(submit|button|reset)$/i.test(t.type)&&u.test(t.value||"")&&!t.hasAttribute("data-np-a-value")&&t.setAttribute("data-np-a-value",w(t.value)))}function x(t,e){for(var n="",a=0;a<t.childNodes.length;a++){var r=t.childNodes[a];if(3===r.nodeType)n+=C(r.nodeValue);else if(1===r.nodeType){var o=e.length;e.push(r),n+=L(r)?"<"+o+"/>":"<"+o+">"+x(r,e)+"</"+o+">"}}return n}function P(t){for(var e=t;;){var n=Array.prototype.filter.call(e.childNodes,(function(t){return 1===t.nodeType||3===t.nodeType&&t.nodeValue.trim()}));if(1!==n.length||1!==n[0].nodeType||L(n[0]))break;e=n[0]}var a=[],r=x(e,a),o=w(r);if(u.test(o)){e.setAttribute("data-np-k",o);var l=(/^\s/.test(r)?"l":"")+(/\s$/.test(r)?"r":"");l&&e.setAttribute("data-np-ws",l),/\u00a0/.test(r)&&e.setAttribute("data-np-sp",JSON.stringify(r.split(/<\/?\d+\/?>/).map((function(t){return[(t=T(t)).match(/^\s*/)[0],t.match(/\s*$/)[0]]}))));var c={},i=!1;T(r.replace(/<\/?\d+\/?>/g,"X")).replace(/(\s*)([^\sA-Za-z0-9])(\s*)/g,(function(t,e,n,a){return/\u00a0/.test(e+a)&&(c[n]=[e,a],i=!0),t})),i&&e.setAttribute("data-np-pm",JSON.stringify(c)),a.forEach((function(t,e){t.setAttribute("data-np-i",e)})),k(t),Array.prototype.forEach.call(t.querySelectorAll("*"),k)}}function O(t){var e=t.nodeValue,n=C(w(e));if(u.test(n)&&t.parentNode){var a=t.parentNode,r=e.match(/^[\s\xa0]*/)[0],o=e.match(/[\s\xa0]*$/)[0],l=document.createElement("np-t");l.setAttribute("data-np-k",n),l.textContent=w(e),r&&a.insertBefore(document.createTextNode(r),t),a.insertBefore(l,t),o&&o!==e&&a.insertBefore(document.createTextNode(o),t),a.removeChild(t)}}function R(t){3!==t.nodeType?1!==t.nodeType||I(t)||t.hasAttribute("data-np-k")||t.closest("[data-np-k]")||(u.test(t.textContent)&&_(t)?P(t):function(t){if(!I(t)&&(k(t),!t.hasAttribute("data-np-k")))for(var e=Array.prototype.slice.call(t.childNodes),n=0;n<e.length;n++){var a=e[n];3===a.nodeType?u.test(a.nodeValue)&&O(a):1===a.nodeType&&R(a)}}(t)):u.test(t.nodeValue)&&t.parentNode&&!t.parentNode.closest("[data-np-k]")&&O(t)}function B(t,e){var n=(window.NP_RULES||{})[t];if(!n)return null;var a=e;return n.forEach((function(t){a=a.replace(t[0],t[1])})),a===e?null:a}function D(t,e){e=e||document.body;var n="en"===t?null:(window.NP_DICT||{})[t]||{},a=Array.prototype.slice.call(e.querySelectorAll?e.querySelectorAll("[data-np-k]"):[]);e.hasAttribute&&e.hasAttribute("data-np-k")&&a.unshift(e),a.forEach((function(e){var a=e.getAttribute("data-np-k"),r=n?n[a]:a;null==r&&(r=B(t,a)),null==r&&(r=a,(A[t]=A[t]||{})[a]=1),e.getAttribute("data-np-cur")!==t+"|"+r&&(r!==a||e.hasAttribute("data-np-cur"))&&(!function(t,e){var n={},a={};Array.prototype.forEach.call(t.querySelectorAll("[data-np-i]"),(function(t){var e=t.getAttribute("data-np-i");e in n||(n[e]=t)}));var r,o=document.createDocumentFragment(),l=[o],c=/<(\/?)(\d+)(\/?)>/g,i=0,d=null,u=null,s=0;try{d=JSON.parse(t.getAttribute("data-np-sp")||"null"),u=JSON.parse(t.getAttribute("data-np-pm")||"null")}catch(t){}function p(t){var e=d&&d[s++];t&&(t=T(t),e&&(t=t.trim()?t.replace(/^\s+/,e[0]||" ").replace(/\s+$/,e[1]||" "):e[0]||t),u&&(t=t.replace(/(\s*)([^\sA-Za-z0-9])(\s*)/g,(function(t,e,n,a){return u[n]?(e&&u[n][0]||e)+n+(a&&u[n][1]||a):t}))),l[l.length-1].appendChild(document.createTextNode(t)))}function f(t,e){var r=n[t];if(!r)return document.createElement("span");if(a[t])return r.cloneNode(e);if(a[t]=1,!e)for(;r.firstChild;)r.removeChild(r.firstChild);return r}for(;r=c.exec(e);)if(p(e.slice(i,r.index)),i=c.lastIndex,r[1])l.length>1&&l.pop();else if(r[3])l[l.length-1].appendChild(f(r[2],!0));else{var m=f(r[2],!1);l[l.length-1].appendChild(m),l.push(m)}p(e.slice(i));var h=t.getAttribute("data-np-ws")||"";for(h.indexOf("l")>-1&&o.insertBefore(document.createTextNode(d?d[0][0]:" "),o.firstChild),h.indexOf("r")>-1&&o.appendChild(document.createTextNode(d?d[d.length-1][1]:" "));t.firstChild;)t.removeChild(t.firstChild);t.appendChild(o)}(e,r),e.setAttribute("data-np-cur",t+"|"+r))}));var r="[data-np-a-placeholder],[data-np-a-title],[data-np-a-aria-label],[data-np-a-value]",o=Array.prototype.slice.call(e.querySelectorAll?e.querySelectorAll(r):[]);e.matches&&e.matches(r)&&o.unshift(e),o.forEach((function(e){d.concat("value").forEach((function(a){var r=e.getAttribute("data-np-a-"+a);if(null!=r){var o=r;if(n){var l=C(r),c=null!=n[l]?n[l]:B(t,l);null!=c?o=T(c):(A[t]=A[t]||{})[l]=1}"value"===a&&(e.value=o),e.setAttribute(a,o)}}))})),p&&p.takeRecords()}function q(t,e){if("en"===t&&!E){s="en";try{localStorage.setItem(l,"en")}catch(t){}return V("en"),void(e&&e())}if("en"!==t){!function(){if(E)return;E=!0,R(document.body),(p=new MutationObserver((function(t){var e=[];t.forEach((function(t){Array.prototype.forEach.call(t.addedNodes,(function(t){e.push(t)}))})),e.length&&(e.forEach((function(t){if(t.isConnected){var e="[placeholder],[title],[aria-label],input",n=1===t.nodeType&&(t.matches(e)||!!t.querySelector(e));if((u.test(t.textContent||"")||n)&&(1!==t.nodeType||!t.closest||!t.closest("#np-lang"))){var a=t.parentNode&&t.parentNode.closest?t.parentNode.closest("[data-np-k]"):null;if(a)return["data-np-k","data-np-ws","data-np-sp","data-np-pm","data-np-cur"].forEach((function(t){a.removeAttribute(t)})),R(a),void D(s,a);var r=t.parentNode;R(t),1===t.nodeType?D(s,t):r&&D(s,r)}}})),p.takeRecords())}))).observe(document.body,{childList:!0,subtree:!0})}(),s=t;try{localStorage.setItem(l,t)}catch(t){}var n=o.filter((function(e){return e.code===t}))[0]||o[0];V(t),function(t,e){if("en"===t||(window.NP_DICT||{})[t]||!window.NP_DICT_BASE)return e();if(y[t])y[t].push(e);else{y[t]=[e];var n=document.createElement("script"),a=(window.NP_DICT_FILES||{})[t]||"dict."+t+".js";n.src=window.NP_DICT_BASE+a+(window.NP_DICT_VERSION?"?v="+window.NP_DICT_VERSION:""),n.onload=n.onerror=function(){var e=y[t];y[t]=null,e.forEach((function(t){t()}))},(document.head||document.documentElement).appendChild(n)}}(t,(function(){if(s!==t)return e&&e();document.documentElement.setAttribute("lang",n.html),document.documentElement.setAttribute("data-np-lang",t),S("en"!==t),D(t),e&&e()}))}else{try{localStorage.setItem(l,"en")}catch(t){}location.reload()}}function V(t){Array.prototype.forEach.call(document.querySelectorAll("#np-lang button"),(function(e){e.setAttribute("aria-pressed",String(e.getAttribute("data-np-lang")===t))}))}function M(){if(!document.body)return setTimeout(M,0);!function(){if(window.self===window.top){var t=document.querySelector(".nav-logo");if(t&&!document.getElementById("np-lang")){var e=document.createElement("div");e.id="np-lang",e.setAttribute("role","group"),e.setAttribute("aria-label","Language \xb7 Bahasa \xb7 \u8bed\u8a00"),o.forEach((function(t,n){if(n){var a=document.createElement("span");a.className="np-bar",a.setAttribute("aria-hidden","true"),a.textContent="|",e.appendChild(a)}var r=document.createElement("button");r.type="button",r.textContent=t.label,r.setAttribute("lang",t.html),r.setAttribute("data-np-lang",t.code),e.appendChild(r)})),e.addEventListener("click",(function(t){var e=t.target.closest("[data-np-lang]");e&&(t.preventDefault(),t.stopPropagation(),q(e.getAttribute("data-np-lang")))})),t.insertAdjacentElement("afterend",e)}}}();var t="en";try{t=localStorage.getItem(l)||"en"}catch(t){}q(b(t)?t:"en",(function(){document.documentElement.classList.add("np-ready"),N()}))}}();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject · Map v2 without a template change (admin › Setting › Header & Footer Scripts) 
     Runs on /map/ only. Stops the old Leaflet map from starting and puts the new map in its place.
     Hidden until switched on: open /map/?np_map_preview=1 to test (?np_map_preview=0 to stop).
     To switch on for everyone: NP_MAP_V2_LIVE = true.  NP_MAP_BASE = where page_map.css / page_map.js are uploaded. */
try {
window.NP_MAP_V2_LIVE = true;
window.NP_MAP_BASE = '/images/uploads/editor/files/';   /* admin uploader › files: page_map.css + page_map.js (please don't delete) */
(function () {
	if (!/^\/map\/?$/.test(location.pathname)) return;
	var on = window.NP_MAP_V2_LIVE === true;
	try {
		var pv = /[?&]np_map_preview=([01])/.exec(location.search);
		if (pv) { if (pv[1] === '1') localStorage.setItem('np_map_preview', '1'); else localStorage.removeItem('np_map_preview'); }
		on = on || localStorage.getItem('np_map_preview') === '1';
	} catch (e) {}
	if (!on) return;

	// 1 · The old map script starts with "if (typeof L === 'undefined') return;". Keep L undefined on this page,
	//     so Leaflet still loads but the old map never starts (no watermark tiles, no old pins, no old clickroute).
	try { Object.defineProperty(window, 'L', { configurable: true, get: function () { return undefined; }, set: function () {} }); } catch (e) {}

	var V = '2';
	var SRI = {'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css': 'sha384-MinO0mNliZ3vwppuPOUnGa+iq619pfMhLVUXfC4LHwSCvF9H+6P/KO4Q7qBOYV5V', 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js': 'sha384-SYKAG6cglRMN0RVvhNeBY0r3FYKNOJtznwA0v7B5Vp9tr31xAHsZC0DqkQ/pZDmj', 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@d18b060d6ceef2fdf4dc2f692fa1a5c6b4e8fa45/map/page_map_v6.css': 'sha384-CfTfFAVSCwH3bjqJyozTPa0lcyMhg8yYhXlwgaN4D6OeJ4h+h0BmOWRwLf//THoo', 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@d18b060d6ceef2fdf4dc2f692fa1a5c6b4e8fa45/map/page_map_v6.js': 'sha384-NXaRXg7lbkhLexVal6IJna7ka1Yuy6VBiOxiYQfLNusoOlYNFAzb97VB5hIqJOWk'};   // each file must match its hash or the browser refuses it
	function sri(el, url) { if (SRI[url]) { el.integrity = SRI[url]; el.crossOrigin = 'anonymous'; } }
	function css(href, where) { var l = document.createElement('link'); l.rel = 'stylesheet'; sri(l, href); l.href = href; (where || document.head).appendChild(l); }
	// If the new map can't load, say so in the map's own "empty" box instead of leaving a blank space.
	function unavailable(src) {
		if (window.console) console.error('Map v2: could not load ' + src);
		var box = document.getElementById('npMapEmpty');
		if (!box) return;
		var p = box.querySelector('p'), s = box.querySelector('span'), b = box.querySelector('button');
		if (p) p.textContent = 'The map is not available right now.';
		if (s) s.textContent = 'All projects are listed below.';
		if (b) b.style.display = 'none';
		box.classList.add('is-visible');
	}
	function js(src, cb) { var s = document.createElement('script'); sri(s, src); s.src = src; s.onload = cb; s.onerror = function () { unavailable(src); }; document.head.appendChild(s); }

	// 2 · After the page (and its project data) has loaded, put the new map in.
	document.addEventListener('DOMContentLoaded', function () {
		css('https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css');
		css('https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@d18b060d6ceef2fdf4dc2f692fa1a5c6b4e8fa45/map/page_map_v6.css', document.body);   // after the old page_map.css, so ours wins

		var guide = document.querySelector('.np-map-guide span');
		if (guide) guide.innerHTML = 'Drag the map to explore new launches. Click any price to view details. <i class="np-dot"></i> e-Enquiry';

		var mapEl = document.getElementById('npMap');
		if (mapEl && !document.getElementById('npMapLayers')) mapEl.insertAdjacentHTML('afterend',
			'<div class="np-map-overlay emap-layers" id="npMapLayers">' +
				'<button type="button" class="emap-layers-btn" aria-label="Map or satellite view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 8.5 12 14l10-5.5L12 3z"/><path d="m2 13 10 5.5L22 13"/><path d="m2 17.5 10 5.5 10-5.5" opacity=".45"/></svg></button>' +
				'<div class="emap-layers-list"><label><input type="radio" name="npBase" value="map" checked> Map</label><label><input type="radio" name="npBase" value="sat"> Satellite</label></div>' +
			'</div>' +
			'<div class="np-map-overlay np-map-hint" id="npMapHint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>Zoom in to see more prices</div>');

		js('https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js', function () {
			js('https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@d18b060d6ceef2fdf4dc2f692fa1a5c6b4e8fa45/map/page_map_v6.js', function () {
				setTimeout(function () { if (!window.__NP_MAP__) unavailable('page_map.js (did not start)'); }, 4000);
			});
		});
	});
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject . search v2 (homepage 24 Oct 2026, New Launches 25 Oct 2026) 
     Homepage: Map button in the search bar, the old "All Types" box hidden, and a new panel under the bar.
     New Launches (/project/): white band with the house drawing, round search bar, "All Property Type" moved into
     Filter, the same panel. Panel = type tabs, budgets, areas, results with photo + price; full screen on phones.
     Files: GitHub via jsDelivr, pinned + SRI. Off switches: NP_SEARCH_LIVE (homepage), NP_SEARCH_NL_LIVE (New Launches).
     Test while off: open the page with ?np_search_preview=1 (?np_search_preview=0 to stop).
     Source + runbook: inewproject.os/projects/homepage-search/build/DEPLOY.md */
try {
window.NP_SEARCH_LIVE = true;
window.NP_SEARCH_NL_LIVE = true;
window.NP_SEARCH_BASE = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@bc0ad62473a93a18b1392350fc0e99a0d7c4e14f/search/';
window.NP_SEARCH_NEW_UNTIL = '9999-12-31';   /* the NEW tag on the Map buttons (homepage + New Launches): no end date; put a date here to end it (Malaysia time) */
(function () {
	var home = location.pathname === '/', nl = /^\/project\/(\d+\/?)?$/.test(location.pathname);   /* every New Launches page: /project/, /project/12, /project/24 ... */
	if (!home && !nl) return;
	var on = (home ? window.NP_SEARCH_LIVE : window.NP_SEARCH_NL_LIVE) === true;
	try {
		var pv = /[?&]np_search_preview=([01])/.exec(location.search);
		if (pv) { if (pv[1] === '1') localStorage.setItem('np_search_preview', '1'); else localStorage.removeItem('np_search_preview'); }
		on = on || localStorage.getItem('np_search_preview') === '1';
	} catch (e) {}
	if (!on) return;
	var de = document.documentElement, base = window.NP_SEARCH_BASE;
	function off() { de.classList.remove('nps-on', 'nps-nl'); }   /* files unreachable: the site's own search stays */
	de.classList.add('nps-on');
	if (nl) de.classList.add('nps-nl');
	var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = base + 'np-search_v2.css';
	l.integrity = 'sha384-dd9taRmcLStCOXorG4dNXQteqj3sA2gik5wgKM8DcNIdsqNoy0XCbnb+LggCdtm+'; l.crossOrigin = 'anonymous'; l.onerror = off; document.head.appendChild(l);
	var s = document.createElement('script'); s.src = base + 'np-search_v2-1.js'; s.async = true;
	s.integrity = 'sha384-z+7d/59N0nFKhbnX7gWCwLMNlrVuQa4QA1v0w5bkmNm3zchhNt7C2un9XvpRgK3M'; s.crossOrigin = 'anonymous'; s.onerror = off; document.head.appendChild(s);
	// Homepage Map button + shorter placeholders, added before the page finishes loading so the BM / ZH switcher translates them.
	function bar() {
		var phone = window.matchMedia && window.matchMedia('(max-width: 649.9px)').matches;
		if (nl) {
			var f = document.getElementById('searchForm'), i = document.getElementById('s');
			if (!f || !i) { off(); return; }
			i.setAttribute('placeholder', phone ? 'Area, project or budget' : 'Area, project, developer or budget');
			i.setAttribute('autocomplete', 'off');
			return;
		}
		var b = document.querySelector('#searchWrap .search-bar'), go = b && b.querySelector('.search-btn'), q = document.getElementById('searchInput');
		if (!b || !go || !q) { off(); return; }
		q.setAttribute('placeholder', phone ? 'Area, project or budget' : 'Area, project, developer or budget');
		var a = document.createElement('a');
		a.className = 'nps-map'; a.href = '/map/';
		a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>Map';
		if (Date.now() < Date.parse(window.NP_SEARCH_NEW_UNTIL + 'T00:00:00+08:00')) { var n = document.createElement('span'); n.className = 'nps-new'; n.textContent = 'NEW'; a.appendChild(n); }
		b.insertBefore(a, go);
	}
	if (document.readyState === 'loading') document.addEventListener('readystatechange', function f() { if (document.readyState !== 'loading') { document.removeEventListener('readystatechange', f); bar(); } });
	else bar();
})();
} catch (e) { setTimeout(function () { throw e; }); }
try {
try { if (!/^\/map\//.test(location.pathname) && Date.now() < Date.parse(window.NP_SEARCH_NEW_UNTIL + 'T00:00:00+08:00')) document.documentElement.classList.add('npnl-new'); } catch (e) {}
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject . homepage first section v3 (v1 25 Oct 2026; v2 26 Oct: the three points back as a tray, bigger bar, deeper dusk, new drawing;
     v3 26 Oct night: the headline in DM Serif Display (Fraunces' f looked broken), Search centred in its button) --
     The New Launches look on the homepage: a dusk sky instead of the photo, the headline in a serif, the round search
     bar, the site's three points in a tray under it (Free to enquire / Live unit availability / Get rewarded) and the
     drawing + red line.
     Off switch: NP_HERO_LIVE = false (the old hero comes back). Test only: /?np_hero_preview=1 (=0 to stop).
     If the file can't load, the old hero comes back by itself. Runbook: inewproject.os/projects/homepage-hero/build/ */
try {
window.NP_HERO_LIVE = true;
(function () {
	if (location.pathname !== '/') return;
	var de = document.documentElement, on = window.NP_HERO_LIVE === true;
	try {
		var pv = /[?&]np_hero_preview=([01])/.exec(location.search);
		if (pv) { if (pv[1] === '1') localStorage.setItem('np_hero_preview', '1'); else localStorage.removeItem('np_hero_preview'); }
		on = on || localStorage.getItem('np_hero_preview') === '1';
	} catch (e) {}
	if (!on) return;
	de.classList.add('nph-on');
	var f = document.createElement('link'); f.rel = 'stylesheet'; f.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap'; document.head.appendChild(f);   /* the headline font, homepage only */
	function off() { de.classList.remove('nph-on', 'nph-hasfacts'); }   /* the file can't load: the old hero, exactly as before */
	var s = document.createElement('script');
	s.src = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@5cf55b48e4d3c0c2bcf89ad170beec33794b56c0/hero/np-hero_v1.js';
	s.integrity = 'sha384-KJ5si+mF6aG5N/eoLWWPHwC7mgVLIg5anvkjjJZJ5bT8bMR3WuYMWDVTkUcwH7MB'; s.crossOrigin = 'anonymous'; s.onerror = off; document.head.appendChild(s);
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* Meta Pixel 2071002696938711 (2 Nov 2026): PageView; Lead only on a confirmed e-Enquiry */
try {
/* iNewProject: e-Enquiry tower level lists read lowest floor first (Level 09 at the top).
   Re-orders the rows EasyAsia's renderFloorList() draws; landed/row blocks are left alone.
   Safe to remove at any time; a no-op if the site already lists floors lowest-first. */
(function(){
  function rank(label){
    var s = String(label).replace(/\s+/g, ' ').trim();
    if (/^(lower ground|LG\b)/i.test(s)) return -1;
    if (/^(upper ground|UG\b)/i.test(s)) return 0.5;
    if (/^(ground|G\b)/i.test(s)) return 0;
    var m = s.match(/(\d+)([A-Z](?![a-z]))?/);
    return m ? parseInt(m[1], 10) + (m[2] ? 0.5 : 0) : 9999;
  }
  function reorder(){
    if (typeof isRowTier === 'function' && isRowTier(ofbCurrentBlock)) return;
    var list = document.getElementById('ofbFloorList');
    if (!list) return;
    var rows = Array.prototype.slice.call(list.children).filter(function(el){
      return el.classList && el.classList.contains('ofb-floor-row');
    });
    if (rows.length < 2) return;
    rows.map(function(el, i){
      var t = el.querySelector('.ofb-floor-row-title');
      return { el: el, r: rank(t ? t.textContent : ''), i: i };
    }).sort(function(a, b){ return (a.r - b.r) || (a.i - b.i); })
      .forEach(function(x){ list.appendChild(x.el); });
  }
  document.addEventListener('DOMContentLoaded', function(){
    if (typeof renderFloorList !== 'function') return;
    var original = renderFloorList;
    window.renderFloorList = function(){
      var out = original.apply(this, arguments);
      try { reorder(); } catch (e) {}
      return out;
    };
    try { reorder(); } catch (e) {}
  });
})();
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject Project of the Month: popup on home + New Launches, permanent card badges (added 24 Oct 2026) */
try {
window.NP_POTM_LIVE = true;
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject listing Selling Points infographic: TuJu stat cards, Project of the Month look (added 24 Oct 2026) */
try {
window.NP_SP_LIVE = true;
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject e-Enquiry Property Information: price with the property type and completion beside it, the rest in one outlined panel, a Floor Plan link (v2, added 29 Oct 2026) */
try {
window.NP_PI_LIVE = true;
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject e-Enquiry unit popup: new left side + floor plan always inside the window (added 28 Oct 2026) */
try {
window.NP_UNIT_LIVE = true;
} catch (e) { setTimeout(function () { throw e; }); }
/* iNewProject . the site's own pop-ups always fit the screen + empty listing facts hidden (added 8 Nov 2026).
     (1) Video / Sign-up / Share pop-ups (.modal-overlay), the e-Enquiry "Send an Email" / enquiry forms (.enquiry-modal)
     and the listing page's e-Enquiry Terms & Conditions were centred with no height limit: on a short screen (a laptop at
     1366x768, Windows at 125-150 %, a phone turned sideways) their top and close button sat above the screen, and the
     listing T&C (11,000 px tall) opened in the middle of clause 18 with no way to scroll or close. Now they stay centred
     when they fit, and scroll from their top when they don't; the listing T&C text scrolls inside the box like the one on
     the e-Enquiry page (90 % laptop zoom allowed for). (2) A listing's "Total Development Area" box is hidden while it is
     empty. (3) On project cards, a Built-up line that is only "sqft" (no number in the backend) is hidden. */
try {
(function () {
	var css = '.modal-overlay.open,.enquiry-modal.open,#ebooking-tnc-modal{overflow-y:auto;-webkit-overflow-scrolling:touch;align-items:flex-start}' +
		'.modal-overlay.open>.modal-box,.enquiry-modal.open>.enquiry-modal-box,#ebooking-tnc-modal>div{margin-top:auto;margin-bottom:auto}' +
		'#ebooking-tnc-modal .ryi-desc{max-height:calc(100vh - 150px);max-height:calc(100dvh - 150px);overflow:auto}' +
		'@media (min-width:1200px){html #ebooking-tnc-modal .ryi-desc{max-height:calc(100vh / .9 - 150px)}}' +
		'.fact-card:has(>.fact-value>strong:only-child:empty){display:none}' +
		'.project-meta>span.np-nofact{display:none!important}';
	var st = document.createElement('style'); st.id = 'np-fit-css'; st.textContent = css; (document.head || document.documentElement).appendChild(st);
	function meta() {
		var s = document.querySelectorAll('.project-meta>span'), i, d, t;
		for (i = 0; i < s.length; i++) { d = s[i].querySelector('.metadesc'); if (!d) continue; t = d.textContent.trim();
			s[i].classList.toggle('np-nofact', !t || (/^(sq\s?ft|kaki persegi|\u5e73\u65b9\u5c3a)$/i.test(t))); }
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', meta); else meta();
	addEventListener('load', meta); addEventListener('np:cards', meta);
})();
} catch (e) { setTimeout(function () { throw e; }); }
