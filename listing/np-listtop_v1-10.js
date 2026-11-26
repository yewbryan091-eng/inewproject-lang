/* v1-10 (27 Nov 2026) = v1-9 + the lines under the project name (owner's pick B, 26 Nov) and the 2 listing tags (owner 22 Nov
   look: a small red line icon + short bold words; 25 Nov rule: each tag is something only THIS project has, taken from its own
   Selling Points; 26 Nov: "fix whatever u owe me"). e-Enquiry listings: on laptops, where the e-Enquiry box sits beside the photos
   and already shows the type and the red-pin location, the grey "location . type" line goes, the title uses the photo column's
   width at a calmer size and the 2 tags sit under it; on phones and upright tablets (box further down) the line becomes the
   red pin + location (the type is in the title and the box). Listings without e-Enquiry keep the site's line, tags under it.
   Every screen: a title never breaks inside a hyphenated word ("Semi-Detached"). Tags carry their own BM / 中文.
   v1-9 (25 Nov 2026) = v1-8 without the Selling Points move: Project Details comes first, then Selling Points, the site's own
   order and backgrounds (owner 25 Nov; v1 - v1-8 moved Selling Points above Project Details). Nothing else changes.
   v1-8 (24 Nov 2026) = v1-7 + at the very top of the page (above the first section) the tab bar's first tab, Overview, is red;
   v1-7 left no tab red until the Overview section reached the bar. Nothing else changes.
   iNewProject . listing page: the facts strip and the order under the photos, v1-7 (23 Nov 2026) = v1-6 + a listing with no price
   (the page's own "Price From" is "—" and Project Details has no RM price, e.g. Tropicana Avan before its APDL) hides the
   Mortgage Calculator section: its template default (RM 468,000) read like a price. Listings with a price: unchanged; when the
   price field can't be found at all, nothing hides.
   v1-6 (23 Nov 2026) = v1-5 + phones (under 768 px): a
   Master Plan description taller than 400 px folds to 330 px with a white fade and "View more" / "View less" under it, the
   same look as the site's own About fold (BM Lihat lagi / Lihat kurang; 中文 查看更多 / 收起). "View less" brings the card back
   into view (just under the tab bar) when its top has scrolled away. Laptops and tablets unchanged.
   v1-5 (21 Nov 2026) = v1-4 + html.npl-ok is set
   once this file has run (it is the last listing script in the box, so the photo block and the e-Enquiry column are already
   rebuilt): snav v1-4 keeps the first section unseen until then. Keep this file after gallery and ebox in the box.
   v1-4 (21 Nov 2026) = v1-3 + the tab bar's lit
   tab is also re-checked when the page's height changes (photos arriving used to leave it one section behind until the next
   scroll) and the slide that keeps it in view allows for the pinned e-Enquiry tab (snav v1-3); a Project Details row whose
   value is only a dash is taken out. (The line under the project name is left exactly as the site writes it: the language
   switcher translates it as one piece.)
   v1-3 (21 Nov 2026) = v1-2 + phones and tablets:
   the section tab bar is pinned with position:fixed instead of the site's position:sticky. On iPhones the sticky bar let go
   once the page was scrolled past the first section (the site's body has overflow-x:hidden, which breaks sticky there), so
   the tabs were gone for the rest of the page. The bar's own place in the page is at or above where it sticks (it is stuck from the
   first pixel), so fixed at the same top looks identical; the next block gets the bar's height as a top margin, so nothing below
   moves. Only applied when that holds.
   v1-2 (21 Nov 2026) = v1-1 + when Selling Points
   move above Project Details only the site's background class (alt) is swapped; v1 / v1-1 swapped the whole class list, which
   carried the Selling Points add-on's own classes (npsp-*) to Project Details, so the site's original cards showed twice.
   Also: a facts-strip box with no value (a listing without Tenure) hides, and Project Details' side card hides when it has
   nothing to tap (the site hides its button; listings without e-Enquiry showed a title and a sentence only): the details card
   takes the full width, 3 columns on laptops.
   v1-1 (21 Nov 2026) = v1 + the tab bar lights the
   right tab again: the site picks the last section in its own fixed list whose top has passed the bar, so after v1 moved
   Selling Points above Project Details (and with the tabs we hide) no tab was red at Project Details. v1-1 picks by where the
   sections really are, and when that section's tab is hidden it lights the nearest visible tab above it (About -> Project
   Details, Amenities -> Facilities ...); on phones the bar slides so the red tab stays in view. v1 (20 Nov 2026). Loaded from the admin Header
   Scripts box; listing pages only (not e-Enquiry pages).
   1. The strip under the project name shows what a buyer decides on: Price from · Built-up · Bedrooms · Units still open ·
      Completion (was Price from · Tenure · Status · Completion). Built-up and Bedrooms come from the page's own Project Details
      (already in the visitor's language); a listing without one simply shows fewer boxes. "Units still open" is the same
      rounded number as the e-Enquiry tag (189 -> 150+, under 20 the real number), read from the count conv keeps for 10 minutes;
      until that count is known (or on a listing without e-Enquiry) the box shows Tenure, as before. Status is in Project Details.
   2. (v1 - v1-8 moved Selling Points above Project Details; since v1-9 the site's own order stays.)
   Fail-safe: anything missing or any error -> the page stays as the site built it. */
(function () {
  var D = document, H = D.documentElement;
  function ok() { try { H.classList.add('npl-ok'); } catch (e) {} }   // v1-5: the first section may show now (snav v1-4)
  if (!/^\/project\/[^\/]+\/?$/.test(location.pathname)) { ok(); return; }
  var T = { units: ['Units still open', 'Unit masih dibuka', '仍开放单位'] };
  function L() { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; }
  function round(n) { var st = n < 20 ? 1 : n < 100 ? 10 : n < 1000 ? 50 : 100; return (Math.floor(n / st) * st).toLocaleString('en-MY') + (st > 1 ? '+' : ''); }
  function tidy(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }

  function strip() {
    var kf = D.querySelector('.key-facts'); if (!kf || kf.getAttribute('data-npl')) return;
    var items = [].slice.call(kf.querySelectorAll(':scope > .kf-item')); if (items.length < 3) return;
    var price = items[0], tenure = items[1], status = items[2], done = items[3] || null;
    kf.setAttribute('data-npl', '1');
    function pdRow(i) { var it = D.querySelectorAll('#project-details .project-detail-item')[i]; return it ? [tidy(it.querySelector('.project-detail-label') && it.querySelector('.project-detail-label').textContent), tidy(it.querySelector('.project-detail-value') && it.querySelector('.project-detail-value').textContent)] : null; }
    // Project Details rows: by the site's English key (data-np-k on translated text) or the EN / BM / 中文 label
    var rows = [].slice.call(D.querySelectorAll('#project-details .project-detail-item'));
    var iB = -1, iR = -1; rows.forEach(function (it, i) { var k = tidy((it.querySelector('.project-detail-label') || {}).getAttribute ? it.querySelector('.project-detail-label').getAttribute('data-np-k') || it.querySelector('.project-detail-label').textContent : ''); if (/^(built-?up|keluasan binaan|\u5efa\u7b51\u9762\u79ef)$/i.test(k)) iB = i; if (/^(bedrooms?\s*\/\s*bathrooms?|bilik tidur\s*\/\s*bilik air|\u5367\u5ba4\s*\/\s*\u6d74\u5ba4)$/i.test(k)) iR = i; });
    function mk(cls) { var e = D.createElement('div'); e.className = 'kf-item ' + cls; e.setAttribute('data-np-skip', ''); e.innerHTML = '<div class="kf-label"></div><div class="kf-value"></div>'; return e; }
    var built = iB >= 0 ? mk('npl-built') : null, beds = iR >= 0 ? mk('npl-beds') : null, units = mk('npl-units');
    if (built) kf.insertBefore(built, tenure); if (beds) kf.insertBefore(beds, tenure); kf.insertBefore(units, tenure);
    status.style.display = 'none';
    var link = D.querySelector('#e-enquiry a[href*="/e-enquiry"]'), key = '';
    try { if (link) key = 'npc_units:' + new URL(link.getAttribute('href'), location.href).pathname.replace(/\/?$/, '/'); } catch (e) {}
    function count() { try { var c = key && JSON.parse(localStorage.getItem(key) || 'null'); return c && Date.now() - c.t < 6e5 && c.n > 0 ? c.n : 0; } catch (e) { return 0; } }
    function paint() {
      var b = iB >= 0 && pdRow(iB), r = iR >= 0 && pdRow(iR);
      if (built && b) { built.querySelector('.kf-label').textContent = b[0]; built.querySelector('.kf-value').textContent = b[1]; }
      if (beds && r) { beds.querySelector('.kf-label').textContent = r[0].split('/')[0].trim(); beds.querySelector('.kf-value').textContent = r[1].split('/')[0].trim(); }
      var n = count();
      units.style.display = n ? '' : 'none'; tenure.style.display = n || !tidy((tenure.querySelector('.kf-value') || {}).textContent) ? 'none' : '';
      if (n) { units.querySelector('.kf-label').textContent = T.units[L()]; units.querySelector('.kf-value').innerHTML = ''; units.querySelector('.kf-value').appendChild(D.createTextNode(round(n) + ' ')); var dot = D.createElement('i'); dot.className = 'npl-dot'; units.querySelector('.kf-value').appendChild(dot); }
      if (done) done.style.display = tidy((done.querySelector('.kf-value') || {}).textContent) ? '' : 'none';
      var shown = [].filter.call(kf.children, function (x) { return x.classList.contains('kf-item') && x.style.display !== 'none'; }).length;
      kf.style.setProperty('--npl-n', shown);
      kf.style.setProperty('--npl-cols', 'minmax(0,1.4fr) repeat(' + Math.max(1, shown - 1) + ',minmax(0,1fr))');   // the price box carries the affordable note
    }
    var css = D.createElement('style'); css.textContent = '@media (min-width:768px){.key-facts[data-npl]{grid-template-columns:var(--npl-cols,repeat(4,minmax(0,1fr)))!important}}' +
      '.npl-dot{display:inline-block;width:8px;height:8px;margin-left:2px;border-radius:50%;background:#1E9E5A;box-shadow:0 0 0 3px rgba(30,158,90,.16);vertical-align:middle}';
    D.head.appendChild(css);
    paint();
    // the count arrives when conv reads it (the e-Enquiry tag appears) or from another tab; the language can change
    try { var box = D.getElementById('e-enquiry'); if (box) new MutationObserver(function () { if (count()) paint(); }).observe(box, { childList: true, subtree: true }); } catch (e) {}
    addEventListener('storage', function (e) { if (e.key === key) paint(); });
    try { new MutationObserver(function () { setTimeout(paint, 300); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
  }

  // v1-10: the lines under the project name (owner's pick B) + the 2 listing tags; slug: [[icon, EN, BM, 中文], ...]
  var TAGS = {"9-madge":[["building","A private building of 23 homes","Bangunan eksklusif dengan 23 kediaman","共 23 户的私密住宅楼"],["pin","2.7 km to Suria KLCC","2.7 km ke Suria KLCC","距 Suria KLCC 2.7 km"]],"araca-taman-bunga-raya-klang":[["bath","A bathroom for every bedroom","Satu bilik air untuk setiap bilik tidur","卧室与浴室数量相同"],["court","Pickleball court in the estate","Gelanggang pickleball dalam kawasan perumahan","住宅区内设匹克球场"]],"breeze-hill":[["tj","Hotel-style stays with T Journey","Perkhidmatan gaya hotel melalui T Journey","T Journey 酒店式服务"],["hill","Hill or Genting views","Pemandangan bukit atau Genting","山景或云顶景观"]],"breeze-hill-shop-lots":[["homes","861 apartments above","861 pangsapuri di atas","楼上有 861 个公寓单位"],["pin","On Gohtong Jaya's tourist route","Di laluan pelancong Gohtong Jaya","Gohtong Jaya 旅游路线上"]],"candela":[["sun","Staircase lightwell","Tangga dengan telaga cahaya","楼梯采光天井"],["tree","Forest reserve behind","Hutan simpan di belakang","屋后是森林保留地"]],"cg-new-town-by-ancubic":[["car","2 car parks per unit","2 petak letak kereta setiap unit","每单位 2 个停车位"],["height","14.7 ft ground-floor ceilings","Siling tingkat bawah setinggi 14.7 kaki","底楼楼高 14.7 尺"]],"harmoni-one-by-ancubic":[["lift","Lift to every level","Lif ke setiap tingkat","电梯直达每一层"],["car","550 car park bays","550 petak letak kereta","550 个停车位"]],"irama-wangsa-wangsa-maju":[["tree","4-acre private hill park","Taman bukit persendirian 4 ekar","4 英亩私人山丘公园"],["bus","Shuttle to Sri Rampai LRT","Bas ulang-alik ke LRT Sri Rampai","穿梭巴士往返 LRT Sri Rampai 站"]],"k-residence":[["pin","Across from Suria KLCC","Bertentangan Suria KLCC","Suria KLCC 对面"],["building","Half-floor or duplex homes","Kediaman separuh tingkat atau dupleks","半层或复式单位"]],"kenny-heights-villa":[["lift","Private lift and pool","Lif dan kolam renang persendirian","私人电梯和泳池"],["landmark","Opposite Istana Negara","Bertentangan Istana Negara","国家皇宫对面"]],"oakland-92":[["key","Own the land and the building","Miliki tanah dan seluruh bangunan","拥有土地和整栋建筑"],["stairs","Separate staircase for every floor","Tangga berasingan untuk setiap tingkat","每层都有独立楼梯"]],"oakland-square-1":[["shop","Dual or triple shop frontage","Kedai dua atau tiga muka hadapan","双面或三面临街店面"],["car","407 car parks","407 petak letak kereta","407 个停车位"]],"residensi-sinaran":[["homes","Only 62 townhouses","Hanya 62 buah rumah bandar","仅 62 间城镇屋"],["eye","Ready to view","Sedia untuk dilihat","现房可看"]],"rosedale-by-ancubic":[["court","26 facilities","26 kemudahan","26 项设施"],["car","2 car parks per home","2 petak letak kereta setiap rumah","每户 2 个停车位"]],"rosedale-by-ancubic-1":[["homes","976 homes on site","976 kediaman di tapak yang sama","同一地段共 976 个住宅单位"],["shop","Main-road frontage","Menghadap jalan utama","面向主干道"]],"taman-amanah-jenjarom":[["school","Next to SK Jenjarom","Bersebelahan SK Jenjarom","紧邻 SK Jenjarom"],["eye","Show house ready to view","Rumah contoh sedia untuk dilihat","样板房可供参观"]],"taman-amanah-semi-detached-house":[["school","Next to SK Jenjarom","Bersebelahan SK Jenjarom","紧邻 SK Jenjarom"],["bed","Bedroom on the ground floor","Bilik tidur di tingkat bawah","楼下设卧室"]],"taman-dato-harun-1":[["homes","Only 25 homes","Hanya 25 buah rumah","仅 25 间住宅"],["bed","3 bedrooms, no stairs","3 bilik tidur, tanpa tangga","3 间卧室，免爬楼梯"]],"taman-perigi-nenas-semi-detached-house":[["land","Land on 3 sides","Tanah di 3 sisi","3 面有空地"],["homes","Only 8 homes","Hanya 8 buah rumah","仅 8 间住宅"]],"taman-perigi-nenas-terraced-house":[["ship","Built for port workers","Dibina untuk pekerja pelabuhan","为港口员工而建"],["school","1 km to SK Pulau Indah","1 km ke SK Pulau Indah","距 SK Pulau Indah 1 km"]],"taman-persiaran-masjid-8":[["land","Malay Reserve land","Tanah Rizab Melayu","马来保留地"],["bed","3 bedrooms, no stairs","3 bilik tidur, tanpa tangga","3 间卧室，免爬楼梯"]],"taman-sungai-bertek-klang":[["yard","51 ft backyard","Halaman belakang 51 kaki","51 尺后院"],["train","1.7 km to KTM Teluk Pulai","1.7 km ke KTM Teluk Pulai","距 KTM Teluk Pulai 1.7 km"]],"taman-tok-muda-mulia":[["bed","4 bedrooms, single level","4 bilik tidur, satu tingkat","4 间卧室，单层设计"],["pin","10 min to Kapar town","10 min ke pekan Kapar","10 分钟到加埔市区"]],"the-aura-1":[["court","Hall, gym and court on site","Dewan, gim dan gelanggang dalam kawasan","园内设礼堂、健身房和球场"],["car","2 parking bays per home","2 petak letak kereta setiap rumah","每户 2 个停车位"]],"tuju-residences-1":[["hill","KL city or Batu Caves views","Pemandangan bandar KL atau Batu Caves","吉隆坡市景或黑风洞景观"],["key","10 layouts, incl. dual-key","10 susun atur, termasuk dwi-kunci","10 种格局，包括双钥匙设计"]],"tuju-residences-retail-lots":[["homes","932 homes above","932 kediaman di atas","楼上 932 户住家"],["land","205 sq ft extra area per lot","Ruang tambahan 205 kaki persegi setiap lot","每个铺位另有 205 平方尺"]],"7-square-bukit-serdang":[["height","18 ft ground-floor ceilings","Siling tingkat bawah setinggi 18 kaki","底楼楼高 18 尺"],["award","Award-winning industrial park","Taman perindustrian pemenang anugerah","获奖工业园"]],"963-industrial-park-sungai-purun":[["factory","Only 10 factories","Hanya 10 kilang","仅 10 间工厂"],["weight","2-ton floor loading","Beban lantai 2 tan","楼面承重 2 吨"]],"alaia-titiwangsa-kuala-lumpur-1":[["hill","180° city and hill views","Pemandangan bandar dan bukit 180°","180° 城市与山峦景观"],["desk","Co-working on site","Ruang kerja bersama dalam kawasan","项目内设共享办公空间"]],"anja-residence":[["pool","Zero-entry pool and kindergarten","Kolam renang ala pantai dan tadika","沙滩式泳池和幼儿园"],["building","Sky lounge on Level 32","Sky lounge di Tingkat 32","第 32 层空中休闲厅"]],"damaira-setia-mayuri":[["homes","Only 54 homes","Hanya 54 buah rumah","仅 54 间住宅"],["bed","Guest room downstairs","Bilik tetamu di tingkat bawah","楼下设客房"]],"desa-salak-gemilang":[["land","2,051 sq ft built-up","Keluasan binaan 2,051 kaki persegi","建筑面积 2,051 平方尺"],["plane","13 km to KLIA","13 km ke KLIA","距 KLIA 13 km"]],"imas-industrial-semenyih":[["factory","Only 7 factories","Hanya 7 kilang","仅 7 间工厂"],["land","Own compound each","Setiap kilang ada kawasan sendiri","每间都有独立院地"]],"kd-281-kundang":[["land","33,465 sq ft of land","33,465 kaki persegi tanah","33,465 平方尺土地"],["pin","3.8 km to LATAR","3.8 km ke LATAR","距 LATAR 3.8 km"]],"kd-285-kundang":[["land","20,785 sq ft of land","20,785 kaki persegi tanah","20,785 平方尺土地"],["pin","4.6 km to LATAR","4.6 km ke LATAR","距 LATAR 4.6 km"]],"lido-waterfront-boulevard":[["train","4.6 km to the RTS Link","4.6 km ke RTS Link","距 RTS Link 4.6 km"],["globe","Open to foreign buyers","Terbuka kepada pembeli asing","外国买家也可购买"]],"minest-residence":[["pin","6 km to KLCC","6 km ke KLCC","距 KLCC 6 km"],["pool","50 m infinity pool","Kolam renang infiniti 50 m","50 米无边际泳池"]],"queensville-setia-ecohill":[["homes","Only 37 bungalows","Hanya 37 buah banglo","仅 37 间独立式洋房"],["bed","All on one level","Semuanya di satu tingkat","全部位于同一层"]],"residensi-klia":[["plane","18 km to KLIA","18 km ke KLIA","距 KLIA 18 km"],["school","2 schools within 1 km","2 sekolah dalam lingkungan 1 km","1 km 内有 2 所学校"]],"ria-sunsuria-kwasa-damansara":[["home","Balcony in every layout","Balkoni di setiap susun atur","每种格局都有阳台"],["pin","Direct DASH access","Akses terus ke DASH","直通 DASH 大道"]],"serai-avenue":[["cart","Next to Econsave Kundang","Bersebelahan Econsave Kundang","紧邻 Econsave Kundang"],["shop","Shop below, office above","Kedai di bawah, pejabat di atas","楼下店铺，楼上办公室"]],"sutera-suites":[["train","5-min walk to the LRT","5 min berjalan kaki ke LRT","步行 5 分钟到 LRT 站"],["sofa","Fully furnished suites","Suite lengkap berperabot","附全套家具的套房"]],"taman-ara-bayu-2":[["bed","4 bedrooms, single storey","4 bilik tidur, satu tingkat","4 间卧室，单层设计"],["school","1.7 km to SK Mantin","1.7 km ke SK Mantin","距 SK Mantin 1.7 km"]],"taman-intan-baiduri-salak-tinggi":[["bed","4 bedrooms, one floor","4 bilik tidur, satu tingkat","4 间卧室，全在一层"],["train","7 km to ERL Salak Tinggi","7 km ke ERL Salak Tinggi","距 ERL Salak Tinggi 站 7 km"]],"taman-langat-utama-2":[["homes","Only 24 terraces","Hanya 24 buah rumah teres","仅 24 间排屋"],["bed","All on one level","Semuanya di satu tingkat","全部位于同一层"]],"taman-langat-utama-2-1":[["homes","Only 6 bungalows","Hanya 6 buah banglo","仅 6 间独立式洋房"],["bed","All on one level","Semuanya di satu tingkat","全部位于同一层"]],"tipp-7313-7314-rawang":[["factory","2 factories side by side","2 kilang bersebelahan","2 间并排的工厂"],["desk","Office above the workshop","Pejabat di atas bengkel","办公室位于车间上方"]],"tipp-7315-rawang":[["land","32,744 sq ft of land","32,744 kaki persegi tanah","32,744 平方尺土地"],["truck","Lorry bay on site","Petak lori di tapak","厂内设罗里停车位"]],"tipp-7316-rawang":[["land","34,025 sq ft of land","34,025 kaki persegi tanah","34,025 平方尺土地"],["truck","Lorry space beside the factory","Ruang lori di sebelah kilang","厂房旁设罗里停车位"]]};
  var ICON = {"building":"<rect x=\"6\" y=\"3\" width=\"12\" height=\"18\" rx=\"1\"/><path d=\"M10 7h1M13 7h1M10 11h1M13 11h1M10 15h1M13 15h1\"/>","pin":"<path d=\"M12 21s-6-6.3-6-11a6 6 0 0 1 12 0c0 4.7-6 11-6 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.2\"/>","bath":"<path d=\"M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z\"/><path d=\"M6 12V6a2 2 0 0 1 4 0\"/><path d=\"M8 19l-1 2M16 19l1 2\"/>","court":"<rect x=\"3\" y=\"6\" width=\"18\" height=\"12\" rx=\"1\"/><path d=\"M12 6v12\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/>","hill":"<path d=\"M2 19 9 7l4 7 2-3 7 8z\"/>","homes":"<path d=\"M2 12l5-4 5 4\"/><path d=\"M3.5 11v8h7v-8\"/><path d=\"M12 9l5-4 5 4\"/><path d=\"M20.5 8v11H13\"/>","sun":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/>","tree":"<path d=\"M12 21v-5\"/><path d=\"M12 3 6 11h3l-4 5h14l-4-5h3z\"/>","lift":"<rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"1\"/><path d=\"M12 3v18\"/><path d=\"M7.5 10l1.5-2 1.5 2M13.5 14l1.5 2 1.5-2\"/>","height":"<path d=\"M12 4v16\"/><path d=\"M9 7l3-3 3 3M9 17l3 3 3-3\"/><path d=\"M4 4h4M4 20h4M16 4h4M16 20h4\"/>","car":"<path d=\"M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11\"/><rect x=\"3\" y=\"11\" width=\"18\" height=\"6\" rx=\"1.5\"/><circle cx=\"7.5\" cy=\"17.5\" r=\"1.5\"/><circle cx=\"16.5\" cy=\"17.5\" r=\"1.5\"/>","bus":"<rect x=\"4\" y=\"5\" width=\"16\" height=\"12\" rx=\"2\"/><path d=\"M4 11h16\"/><circle cx=\"8\" cy=\"19\" r=\"1.4\"/><circle cx=\"16\" cy=\"19\" r=\"1.4\"/>","landmark":"<path d=\"M3 21h18\"/><path d=\"M5 21V10M9.5 21V10M14.5 21V10M19 21V10\"/><path d=\"M3 10h18L12 4z\"/>","key":"<circle cx=\"8\" cy=\"15\" r=\"4\"/><path d=\"M11 12l9-9M17 6l2 2M15 8l2 2\"/>","stairs":"<path d=\"M4 20h4v-4h4v-4h4V8h4\"/>","shop":"<path d=\"M4 10v10h16V10\"/><path d=\"M3 10l2-6h14l2 6z\"/><path d=\"M10 20v-5h4v5\"/>","eye":"<path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","cart":"<path d=\"M3 4h2l2.4 11h11L21 7H6.2\"/><circle cx=\"9\" cy=\"19.5\" r=\"1.5\"/><circle cx=\"17\" cy=\"19.5\" r=\"1.5\"/>","school":"<path d=\"M2 9l10-5 10 5-10 5z\"/><path d=\"M6 11.5V17c3 2 9 2 12 0v-5.5\"/>","bed":"<path d=\"M3 18V7M3 15h18v3M21 15v-3a3 3 0 0 0-3-3h-7v6\"/><circle cx=\"6.5\" cy=\"11.5\" r=\"1.8\"/>","yard":"<path d=\"M3 20h18\"/><path d=\"M6 20v-6M12 20V9M18 20v-6\"/><path d=\"M6 14c-2-1-2-3 0-4 2 1 2 3 0 4zM12 9c-2-1-2-3 0-4 2 1 2 3 0 4zM18 14c-2-1-2-3 0-4 2 1 2 3 0 4z\"/>","land":"<path d=\"M4 4h16v16H4z\"/><path d=\"M4 9h3M4 14h3M9 4v3M14 4v3\"/>","ship":"<path d=\"M3 15l2 5h14l2-5z\"/><path d=\"M6 15V9h12v6\"/><path d=\"M12 9V4\"/><path d=\"M12 4h3\"/>","train":"<rect x=\"6\" y=\"3\" width=\"12\" height=\"14\" rx=\"3\"/><path d=\"M6 11h12\"/><path d=\"M8 21l2-4M16 21l-2-4\"/>","award":"<circle cx=\"12\" cy=\"9\" r=\"5\"/><path d=\"M8.5 13l-1.5 8 5-3 5 3-1.5-8\"/>","factory":"<path d=\"M3 21V10l5 3V10l5 3V10l5 3V5h3v16z\"/>","weight":"<path d=\"M7 8h10l3 12H4z\"/><circle cx=\"12\" cy=\"5\" r=\"2\"/>","desk":"<path d=\"M3 11h18\"/><path d=\"M5 11v9M19 11v9\"/><rect x=\"8\" y=\"4\" width=\"8\" height=\"7\" rx=\"1\"/>","pool":"<path d=\"M2 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0\"/><path d=\"M2 21c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0\"/><path d=\"M8 14V5a2 2 0 0 1 4 0M16 14V5\"/><path d=\"M8 9h8\"/>","plane":"<path d=\"M2 13l9-1 5-8h2l-2 8 5 .5a1.5 1.5 0 0 1 0 3l-5 .5 2 8h-2l-5-8-9-1z\"/>","truck":"<rect x=\"2\" y=\"6\" width=\"12\" height=\"10\" rx=\"1\"/><path d=\"M14 9h4l3 4v3h-7\"/><circle cx=\"6\" cy=\"18\" r=\"1.8\"/><circle cx=\"17\" cy=\"18\" r=\"1.8\"/>","globe":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18\"/><path d=\"M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18\"/>","sofa":"<path d=\"M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3\"/><path d=\"M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2z\"/><path d=\"M5 18v2M19 18v2\"/>","home":"<path d=\"M4 11 12 4l8 7\"/><path d=\"M6 10v10h12V10\"/><path d=\"M10 20v-6h4v6\"/>"}, TJ = 'https://cdn.jsdelivr.net/gh/yewbryan091-eng/inewproject-lang@aeb8afa9cdc282c6d83888928b78e3c27c158891/listing/img-tj-mark-90.png';
  function head() {
    var top = D.querySelector('.hero-top'), title = D.querySelector('.hero-title'), loc = D.querySelector('.hero-loc');
    if (!top || !title || !loc || !title.parentNode) return;
    var col = title.parentNode, slug = ((/^\/project\/([^\/]+)/.exec(location.pathname) || [])[1] || '').toLowerCase(), tags = TAGS[slug] || null;
    var css = D.createElement('style'); css.id = 'npl-head-css';
    css.textContent = '.npl-nw{white-space:nowrap}' +
      '.npl-tags{display:flex;flex-wrap:wrap;align-items:center;gap:8px 26px;margin:10px 0 2px}' +
      '.npl-tags>span{display:inline-flex;align-items:center;gap:8px;font-size:max(1rem,15px);font-weight:600;line-height:1.3;color:#2A2A2A}' +
      '.npl-tags svg{flex:none;width:22px;height:22px;fill:none;stroke:#D0021B;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}' +
      '.npl-tags img{flex:none;display:block;height:30px;width:auto}' +
      '.npl-loc{display:none;align-items:flex-start;gap:8px}.npl-loc svg{flex:none;width:22px;height:18px;margin-top:.15em}' +
      'html.npl-ee .hero-loc{display:none!important}html.npl-ee:not(.npl-side) .npl-loc{display:flex}' +
      'html.npl-side .hero-title{max-width:none!important;font-size:clamp(32px,3.05vw,52px)!important;line-height:1.1!important}';
    D.head.appendChild(css);
    // 1. a title never breaks inside a hyphenated word (titles are names: no row changes them in BM / 中文)
    function nw() {
      if (title.querySelector('.npl-nw')) return;
      var w = D.createTreeWalker(title, 4), ns = []; while (w.nextNode()) ns.push(w.currentNode);
      ns.forEach(function (n) {
        var v = n.nodeValue; if (!/\S-\S/.test(v)) return;
        var f = D.createDocumentFragment();
        v.split(/(\S*-\S*)/).forEach(function (p, i) { if (!p) return; if (i % 2) { var e = D.createElement('span'); e.className = 'npl-nw'; e.textContent = p; f.appendChild(e); } else f.appendChild(D.createTextNode(p)); });
        n.parentNode.replaceChild(f, n);
      });
    }
    // 2. phones / upright tablets on e-Enquiry listings: red pin + the location (the site's own words, already in the visitor's language)
    var pl = D.createElement('div'); pl.className = 'npl-loc'; pl.setAttribute('data-np-skip', '');
    pl.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#D0021B" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg><span></span>';
    function look() {   // the site's own line sets the size: read it again on every layout change (phone / tablet / rotation)
      var cs = getComputedStyle(loc), sp0 = loc.querySelector('span'), ss = sp0 ? getComputedStyle(sp0) : cs, st = pl.style;
      st.marginTop = cs.marginTop; st.marginBottom = cs.marginBottom; st.fontSize = cs.fontSize; st.lineHeight = cs.lineHeight; st.fontWeight = ss.fontWeight; st.color = ss.color;
    }
    function tr(t) { var l = H.getAttribute('data-np-lang'), d = l && window.NP_DICT && window.NP_DICT[l]; return d && typeof d[t] === 'string' ? d[t] : t; }   // the address alone has a row even where the whole line has none
    function place() { var sp = loc.querySelector('span'), t = tr(tidy(sp ? sp.textContent : loc.textContent.split('·')[0])); var o = pl.querySelector('span'); if (o.textContent !== t) o.textContent = t; }
    loc.parentNode.insertBefore(pl, loc.nextSibling);
    // 3. the 2 tags
    var tg = null;
    function paintTags() {
      if (!tg) return; var l = L(), h = '';
      tags.forEach(function (x) {
        var ic = x[0] === 'tj' ? '<img src="' + TJ + '" alt="" width="26" height="30" onerror="this.style.display=\'none\'">' : '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICON[x[0]] || '') + '</svg>';
        h += '<span>' + ic + '<b style="font:inherit"></b></span>';
      });
      tg.innerHTML = h;
      [].forEach.call(tg.querySelectorAll('b'), function (b, i) { b.textContent = tags[i][1 + l]; });
    }
    if (tags && tags.length) { tg = D.createElement('div'); tg.className = 'npl-tags'; tg.setAttribute('data-np-skip', ''); pl.parentNode.insertBefore(tg, pl.nextSibling); paintTags(); }
    // 4. which layout: e-Enquiry box beside the photos (laptops) or under them
    function mode() {
      var gm = D.querySelector('.gallery-main'), box = D.querySelector('.npe');
      var br = box && box.getBoundingClientRect(), gr = gm && gm.getBoundingClientRect();
      var ee = !!box, side = !!(br && gr && br.width > 0 && gr.width > 0 && br.left >= gr.right - 1);
      if (H.classList.contains('npl-ee') !== ee) H.classList.toggle('npl-ee', ee);
      if (H.classList.contains('npl-side') !== side) H.classList.toggle('npl-side', side);
      var mw = side ? Math.round(gr.right - col.getBoundingClientRect().left) + 'px' : '';
      if (col.style.maxWidth !== mw) { col.style.maxWidth = mw; col.style.flex = side ? '1 1 auto' : ''; col.style.minWidth = side ? '0' : ''; }
      look(); place(); nw();
    }
    var q = 0; function soon() { if (!q) q = requestAnimationFrame(function () { q = 0; mode(); }); }
    mode(); addEventListener('resize', soon); addEventListener('load', soon); setTimeout(soon, 400); setTimeout(soon, 1500);
    try { if (window.ResizeObserver) new window.ResizeObserver(soon).observe(D.body); } catch (e) {}
    try { new MutationObserver(soon).observe(loc, { childList: true, subtree: true, characterData: true }); } catch (e) {}   // the language switcher rewrites the line
    try { new MutationObserver(function () { paintTags(); soon(); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] }); } catch (e) {}
  }

  // v1-1: the red tab follows the section on screen (the site's own rule runs first; this runs after it on every scroll)
  function spy() {
    var nav = D.querySelector('.section-nav'), links = nav ? [].slice.call(nav.querySelectorAll('.snav-link[onclick*="scrollToSection("]')) : [];
    if (links.length < 2) return;
    var items = links.map(function (a) { var m = /scrollToSection\('([^']+)'\)/.exec(a.getAttribute('onclick') || ''); return { a: a, el: m && D.getElementById(m[1]) }; }).filter(function (x) { return x.el; });
    if (items.length < 2) return;
    var last = null;
    function shown(a) { return getComputedStyle(a).display !== 'none' && a.getBoundingClientRect().width > 0; }
    function run() {
      try {
        // sections in page order; the current one = the last whose top has passed the bar (the site's 140 px line)
        var byPos = items.slice().sort(function (p, q) { return p.el.getBoundingClientRect().top - q.el.getBoundingClientRect().top; });
        var cur = -1; byPos.forEach(function (x, i) { if (x.el.getBoundingClientRect().top <= 140) cur = i; });
        var pick = null;
        for (var i = cur; i >= 0; i--) if (shown(byPos[i].a)) { pick = byPos[i].a; break; }
        if (!pick) for (var j = cur + 1; j < byPos.length; j++) if (shown(byPos[j].a)) { pick = byPos[j].a; break; }   // v1-8: above the first section (the page top) the first tab, Overview, is red
        links.forEach(function (a) { var on = a === pick; if (a.classList.contains('active') !== on) a.classList.toggle('active', on); });
        if (pick && pick !== last && nav.scrollWidth > nav.clientWidth + 2) {   // phones: keep the red tab in view
          var r = pick.getBoundingClientRect(), n = nav.getBoundingClientRect();
          var pin = 0; links.forEach(function (a) { if (a !== pick && getComputedStyle(a).position === 'sticky') pin = Math.max(pin, a.getBoundingClientRect().right - n.left); });   // v1-4: the pinned tab covers the left
          if (getComputedStyle(pick).position !== 'sticky' && (r.left < n.left + pin + 8 || r.right > n.right - 8)) nav.scrollLeft += (r.left + r.width / 2) - (n.left + pin + (n.width - pin) / 2);
        }
        last = pick;
      } catch (e) {}
    }
    var q = 0; function soon() { if (!q) q = requestAnimationFrame(function () { q = 0; run(); }); }
    addEventListener('scroll', soon, { passive: true }); addEventListener('resize', soon); addEventListener('load', soon); setTimeout(run, 400); run();
    try { if (window.ResizeObserver) new window.ResizeObserver(soon).observe(D.body); } catch (e) {}   // v1-4: the page grew or shrank (photos, add-ons)
  }

  // v1-2: Project Details' side card with nothing to tap (no visible button or link, no incentive choices) hides
  function pdCard() {
    var sc = D.querySelector('.project-details-showcase'), card = sc && sc.querySelector(':scope > .quick-ebooking-card');
    if (!card || card.querySelector('.qc-opt') || !sc.querySelector(':scope > .project-details-card')) return;
    if ([].some.call(card.querySelectorAll('a,button'), function (x) { return x.offsetParent !== null; })) return;
    var css = D.createElement('style'); css.id = 'npl-pd-css'; css.textContent = 'html.npl-pdfull .project-details-showcase>.quick-ebooking-card{display:none!important}html.npl-pdfull .project-details-showcase{grid-template-columns:minmax(0,1fr)!important}' +
      '@media (min-width:992px){html.npl-pdfull .project-details-showcase .project-details-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}' +
      'html.npl-pdfull .project-details-grid>:nth-child(3n+1):nth-last-child(-n+3),html.npl-pdfull .project-details-grid>:nth-child(3n+1):nth-last-child(-n+3)~*{border-bottom-color:transparent!important}}';
    D.head.appendChild(css); H.classList.add('npl-pdfull');
  }

  // v1-3: phones / tablets: pin the tab bar (fixed) where it sticks; only when its own place in the page is that same spot
  function navFix() {
    var nav = D.querySelector('.section-nav'), next = nav && nav.nextElementSibling, par = nav && nav.parentNode;
    if (!nav || !next || !par || !window.matchMedia) return;
    var mq = window.matchMedia('(max-width:991.98px),(hover:none) and (pointer:coarse)');
    var css = D.createElement('style'); css.id = 'npl-nav-css';
    css.textContent = '@media (max-width:991.98px),(hover:none) and (pointer:coarse){html.npl-navfix .section-nav{position:fixed!important;left:0;right:0}html.npl-navfix .section-nav+*{margin-top:var(--npl-navh,48px)!important}}';
    D.head.appendChild(css);
    var base = null;
    function set() {
      try {
        if (!mq.matches) { H.classList.remove('npl-navfix'); return; }
        var on = H.classList.contains('npl-navfix'), cs = getComputedStyle(nav), z = parseFloat(getComputedStyle(H).zoom) || 1, h = nav.getBoundingClientRect().height / z;
        if (!on) {
          if (cs.position !== 'sticky' || !h) return;
          var top = parseFloat(cs.top);
          // the bar's own place in the page (the next block's top minus the bar) is at or above where it sticks, so it is stuck from the
          // first pixel of the page to the last: fixed at the same top looks the same
          var own = next.getBoundingClientRect().top + (window.pageYOffset || 0) - nav.getBoundingClientRect().height;
          if (!(top >= 0) || own > top * z + 3) return;
          base = parseFloat(getComputedStyle(next).marginTop) || 0;
        }
        H.style.setProperty('--npl-navh', (Math.round((h + (base || 0)) * 100) / 100) + 'px'); H.classList.add('npl-navfix');
      } catch (e) { H.classList.remove('npl-navfix'); }
    }
    set(); addEventListener('resize', set); addEventListener('load', set); setTimeout(set, 600);
    if (mq.addEventListener) mq.addEventListener('change', set);
    if (window.ResizeObserver) new window.ResizeObserver(set).observe(nav);
  }
  // v1-4: a Project Details row with no value (only a dash) is taken out; runs first, strip() keeps row numbers
  function pdDash() {
    [].slice.call(D.querySelectorAll('#project-details .project-details-grid > .project-detail-item')).forEach(function (it) {
      var v = it.querySelector('.project-detail-value'); if (v && !v.children.length && /^[\s\u00a0\-\u2013\u2014]*$/.test(v.textContent) && it.parentNode.children.length > 1) it.parentNode.removeChild(it);
    });
  }
  // v1-6: phones: a long Master Plan description folds like About (the site's own .overview-toggle button look)
  function mpMore() {
    if (D.getElementById('npl-mp-css')) return;   // once per page
    var W = { m: ['View more', 'Lihat lagi', '\u67e5\u770b\u66f4\u591a'], l: ['View less', 'Lihat kurang', '\u6536\u8d77'] };
    var lg = function () { var l = H.getAttribute('data-np-lang'); return l === 'ms' ? 1 : l === 'zh' ? 2 : 0; };
    var css = D.createElement('style'); css.id = 'npl-mp-css';
    css.textContent = '@media (max-width:767.98px){#masterplan .fact-value.npl-mp-long:not(.npl-mp-open){max-height:330px;overflow:hidden;position:relative}' +
      '#masterplan .fact-value.npl-mp-long:not(.npl-mp-open)::after{content:"";position:absolute;left:0;right:0;bottom:0;height:4.5em;background:linear-gradient(rgba(255,255,255,0),var(--npl-mp-bg,#fff));pointer-events:none}}' +
      '#masterplan .npl-mp-btn{display:none}@media (max-width:767.98px){#masterplan .npl-mp-long+.npl-mp-btn{display:inline-block}}';
    D.head.appendChild(css);
    var phone = window.matchMedia ? window.matchMedia('(max-width:767.98px)') : { matches: false };
    var items = [].slice.call(D.querySelectorAll('#masterplan .fact-card > .fact-value')).map(function (v) {
      var b = D.createElement('button'); b.type = 'button'; b.className = 'overview-toggle npl-mp-btn'; b.setAttribute('data-np-skip', '');
      v.parentNode.insertBefore(b, v.nextSibling);
      for (var e = v.parentNode; e && e.nodeType === 1; e = e.parentNode) {   // the fade ends in the first solid background behind the text
        var bg = getComputedStyle(e).backgroundColor, m = /^rgba?\(([^)]+)\)$/.exec(bg || ''), p = m && m[1].split(',');
        if (p && (p.length < 4 || parseFloat(p[3]) >= 1)) { v.style.setProperty('--npl-mp-bg', bg); break; }
      }
      b.addEventListener('click', function () {
        var open = v.classList.toggle('npl-mp-open');
        if (!open) { check(); var nb = D.querySelector('.section-nav'), off = (nb ? Math.max(0, nb.getBoundingClientRect().bottom) : 0) + 12, c = v.parentNode.getBoundingClientRect(); if (c.top < off) window.scrollBy({ top: c.top - off, behavior: 'instant' }); }
        words();
      });
      return { v: v, b: b };
    });
    if (!items.length) return;
    function words() { items.forEach(function (it) { var t = W[it.v.classList.contains('npl-mp-open') ? 'l' : 'm'][lg()]; if (it.b.textContent !== t) it.b.textContent = t; it.b.setAttribute('aria-expanded', it.v.classList.contains('npl-mp-open') ? 'true' : 'false'); }); }
    function check() {
      items.forEach(function (it) {
        if (!phone.matches || it.v.classList.contains('npl-mp-open')) return;
        it.v.classList.remove('npl-mp-long');
        if (it.v.scrollHeight > 400) it.v.classList.add('npl-mp-long');
      });
      words();
    }
    var q; function soon() { if (!q) q = setTimeout(function () { q = 0; check(); }, 150); }
    check(); addEventListener('resize', soon); addEventListener('load', soon); setTimeout(check, 800); setTimeout(check, 2500);
    if (window.ResizeObserver) { var ro = new window.ResizeObserver(soon); items.forEach(function (it) { ro.observe(it.v); }); }   // late text (BM / 中文 arriving)
    new MutationObserver(function () { soon(); }).observe(H, { attributes: true, attributeFilter: ['data-np-lang'] });
  }
  // v1-7: no price on the page -> no loan calculator (its template default is not this project's price)
  function noPrice() {
    var kf = [].slice.call(D.querySelectorAll('.key-facts .kf-item')).filter(function (it) { var l = it.querySelector('.kf-label'); return l && /^(price( from)?|harga( dari)?|起价|价格)$/i.test((l.getAttribute('data-np-k') || l.textContent).replace(/\s+/g, ' ').trim()); })[0];
    var v = kf && kf.querySelector('.kf-value'); if (!v || /\d/.test(v.textContent)) return;   // a price, or no price field: leave it
    var pd = [].slice.call(D.querySelectorAll('#project-details .project-detail-item')).some(function (it) { var l = it.querySelector('.project-detail-label'), x = it.querySelector('.project-detail-value');
      return l && x && /^(price( range| from)?|harga|julat harga|价格|价格范围)$/i.test((l.getAttribute('data-np-k') || l.textContent).replace(/\s+/g, ' ').trim()) && /RM\s?\d/i.test(x.textContent); });
    if (pd || !D.getElementById('mortgage')) return;
    var css = D.createElement('style'); css.id = 'npl-noprice-css'; css.textContent = 'html.npl-noprice #mortgage{display:none!important}'; D.head.appendChild(css);
    H.classList.add('npl-noprice');
  }
  function start() { try { head(); } catch (e) {} try { noPrice(); } catch (e) {} try { pdDash(); } catch (e) {} try { strip(); } catch (e) {} try { spy(); } catch (e) {} try { pdCard(); } catch (e) {} try { navFix(); } catch (e) {} try { mpMore(); } catch (e) {} }
  function go() { try { start(); } finally { ok(); } }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})();
