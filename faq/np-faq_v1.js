/*
 * iNewProject listing FAQ, EN / BM / 中文 (v1, 6 Nov 2026). Loaded from the admin Header Scripts box.
 *   Adds a "Frequently Asked Questions" section above the e-Enquiry section, on the listings named below only.
 *   The text is our own fixed text: nothing from the page, the URL or the visitor goes into it.
 *   A new listing = a new file version + one box line. Prices and facts follow the developer's chart: recheck when a new chart arrives.
 * Off switch: window.NP_FAQ_LIVE = false. Do no harm: if the e-Enquiry section isn't there, nothing is added.
 */
(function () {
  'use strict';
  if (window.NP_FAQ_LIVE === false || window.__npfaq) return;
  window.__npfaq = 1;

  var FAQ = {
    'rosedale-by-ancubic': {
      en: { h: 'Frequently Asked Questions', q: [
        ['How much is Rosedale?', 'From RM270,000, up to RM707,500, depending on the unit. Bumiputera buyers get a 10% discount.'],
        ['Which units are still open?', 'Check the unit chart on Rosedale’s e-Enquiry page, floor by floor. It follows the developer’s latest chart, and the developer’s sales representative confirms availability.'],
        ['Is it freehold? When is completion?', 'Yes, it’s freehold. Completion is expected in 2030.'],
        ['What sizes are there?', '1 to 3 bedrooms, 550 to 920 sq ft, with 2 car parks per unit. Maintenance fee starts from RM0.35 per sq ft.'],
        ['How close is the LRT?', 'LRT3 Bandar Bukit Tinggi station is about a 3-minute drive away. Jaya Grocer is the anchor store within the development.'],
        ['Where is the sales gallery?', 'Persiaran Mahogani Utama, Bandar Botanik, 41200 Klang. Open daily, 10 am to 6 pm. Send your e-Enquiry first, and the developer’s sales representative will arrange your visit.'],
        ['What is an e-Enquiry?', 'A free enquiry about the unit you pick. You don’t need an account to send one, and there’s no obligation. The developer’s sales representative follows up with you.'],
        ['What do I get?', 'Choose an iPhone 18 Pro (256GB) worth RM5,500, or Touch ’n Go eWallet credit of the same value, once your SPA is signed. You’ll need an iNewProject member account to receive it. T&C apply.']
      ] },
      ms: { h: 'Soalan Lazim', q: [
        ['Berapakah harga Rosedale?', 'Dari RM270,000 hingga RM707,500, bergantung pada unit. Pembeli Bumiputera mendapat diskaun 10%.'],
        ['Unit mana yang masih tersedia?', 'Semak carta unit di halaman e-⁠Enquiry Rosedale, tingkat demi tingkat. Carta ini mengikut carta terkini pemaju, dan wakil jualan pemaju akan mengesahkan unit yang tersedia.'],
        ['Adakah ia Pegangan Bebas? Bila siap?', 'Ya, ia Pegangan Bebas. Dijangka siap pada 2030.'],
        ['Apakah saiz yang ada?', '1 hingga 3 bilik tidur, 550 hingga 920 kaki persegi, dengan 2 petak letak kereta bagi setiap unit. Yuran penyelenggaraan bermula dari RM0.35 sekaki persegi.'],
        ['Berapa dekat LRT?', 'Stesen LRT3 Bandar Bukit Tinggi hanya kira-kira 3 minit dengan kereta. Jaya Grocer ialah kedai utama dalam pembangunan ini.'],
        ['Di manakah galeri jualan?', 'Persiaran Mahogani Utama, Bandar Botanik, 41200 Klang. Dibuka setiap hari, 10 pagi hingga 6 petang. Buat e-⁠Enquiry dahulu, dan wakil jualan pemaju akan mengatur lawatan anda.'],
        ['Apakah itu e-⁠Enquiry?', 'Pertanyaan percuma tentang unit yang anda pilih. Anda tidak memerlukan akaun untuk menghantarnya, dan tiada sebarang kewajipan. Wakil jualan pemaju akan menghubungi anda.'],
        ['Apakah yang saya dapat?', 'Pilih iPhone 18 Pro (256GB) bernilai RM5,500, atau kredit Touch ’n Go eWallet dengan nilai yang sama, selepas SPA anda ditandatangani. Anda memerlukan akaun ahli iNewProject untuk menerimanya. Tertakluk pada terma dan syarat.']
      ] },
      zh: { h: '常见问题', q: [
        ['Rosedale 的价格是多少？', 'RM270,000 起，最高 RM707,500，视单位而定。土著买家可享 10% 折扣。'],
        ['哪些单位还开放？', '请到 Rosedale 的 e-⁠Enquiry 页面，逐层查看单位图。单位图依据发展商最新的资料，并由发展商的销售代表确认单位。'],
        ['是永久地契吗？何时竣工？', '是的，属于永久地契，预计 2030 年竣工。'],
        ['有哪些面积？', '1 至 3 间卧室，550 至 920 平方尺，每个单位 2 个停车位。管理费每平方尺 RM0.35 起。'],
        ['离轻快铁有多近？', '距离 LRT3 Bandar Bukit Tinggi 站约 3 分钟车程。Jaya Grocer 是项目内的主要商户。'],
        ['销售展厅在哪里？', 'Persiaran Mahogani Utama, Bandar Botanik, 41200 Klang。每天上午 10 点至下午 6 点开放。请先提交 e-⁠Enquiry，发展商的销售代表会为您安排参观。'],
        ['什么是 e-⁠Enquiry？', '针对您所选单位的免费询问。提交时无需注册账户，也没有任何义务。发展商的销售代表会跟进联系您。'],
        ['我能获得什么？', '签署 SPA 后，可选择价值 RM5,500 的 iPhone 18 Pro（256GB），或等值的 Touch ’n Go 电子钱包额度。领取时需要 iNewProject 会员账户。须遵守条款与条件。']
      ] }
    }
  };

  var m = /^\/project\/([a-z0-9-]+)\/?$/.exec(location.pathname), P = m && Object.prototype.hasOwnProperty.call(FAQ, m[1]) && FAQ[m[1]];
  if (!P) return;

  var CSS = [
    '#np-faq .npq-list{display:flex;flex-direction:column;gap:10px;margin-top:1rem}',
    '#np-faq .npq-item{background:#fff;border:1px solid #e6e6e6;border-radius:12px;margin:0}',
    '#np-faq .npq-q{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:48px;padding:15px 18px;font-size:17px;font-weight:700;line-height:1.35;color:#141414;cursor:pointer;list-style:none}',
    '#np-faq .npq-q::-webkit-details-marker{display:none}',
    '#np-faq .npq-q::after{content:"";flex:none;width:9px;height:9px;margin:-4px 4px 0 0;border-right:2px solid #141414;border-bottom:2px solid #141414;transform:rotate(45deg)}',
    '#np-faq .npq-item[open]>.npq-q::after{margin-top:4px;transform:rotate(-135deg)}',
    '#np-faq .npq-a{margin:0;padding:0 18px 16px;max-width:860px;font-size:16px;line-height:1.55;color:#3f3f3f}',
    '@media (max-width:767px){',
    ' #np-faq .npq-q{padding:13px 14px;font-size:16px}',
    ' #np-faq .npq-a{padding:0 14px 14px;font-size:15px}',
    '}'
  ].join('\n');

  function lang() { var l = document.documentElement.getAttribute('data-np-lang'); return Object.prototype.hasOwnProperty.call(P, l) ? l : 'en'; }

  function draw(sec) {
    var open = [].map.call(sec.querySelectorAll('.npq-item'), function (d) { return d.open; });
    var L = P[lang()], box = sec.firstChild;
    while (box.firstChild) box.removeChild(box.firstChild);
    var title = document.createElement('div');
    title.className = 'sec-title';
    title.textContent = L.h;
    box.appendChild(title);
    var list = document.createElement('div');
    list.className = 'npq-list';
    L.q.forEach(function (row, i) {
      var item = document.createElement('details'), q = document.createElement('summary'), a = document.createElement('p');
      item.className = 'npq-item';
      item.open = open.length ? !!open[i] : i === 0;
      q.className = 'npq-q';
      q.textContent = row[0];
      a.className = 'npq-a';
      a.textContent = row[1];
      item.appendChild(q);
      item.appendChild(a);
      list.appendChild(item);
    });
    box.appendChild(list);
  }

  function start() {
    var next = document.getElementById('e-enquiry');
    if (!next || !next.parentNode || document.getElementById('np-faq')) return;
    var style = document.createElement('style');
    style.id = 'np-faq-css';
    style.textContent = CSS;
    document.head.appendChild(style);
    var sec = document.createElement('section'), box = document.createElement('div');
    sec.className = 'section';
    sec.id = 'np-faq';
    sec.setAttribute('data-np-skip', '');   // the language switcher leaves this alone; the text below is already in all three languages
    box.className = 'container';
    sec.appendChild(box);
    draw(sec);
    next.parentNode.insertBefore(sec, next);
    new MutationObserver(function () { try { draw(sec); } catch (e) {} })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-np-lang'] });
  }

  function safeStart() { try { start(); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeStart);
  else safeStart();
})();
