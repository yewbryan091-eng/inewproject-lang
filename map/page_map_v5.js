/* ──────────────────────────────────────────────────────────────────
   page_map.js — /map/ (page_map_view.php), v2 Oct 2026
   Replaces the inline Leaflet script. Reads the same data the page
   already prints (window.__PROJECTS__) and the same elements
   (#npMap, #npMapCount, #npResetMap, #npMapEmpty, #npEmptyReset,
   #npMapChips .np-chip, .js-map-card-link cards → clickroute()).
   Needs: maplibre-gl.js loaded first. No API key.

   Pins come in three kinds only:
     RM 441K          one project
     RM 441K •        one project, e-Enquiry (red dot)
     ③ RM 335K        several projects (same site, or close together at this zoom)

   v5 (24 Oct 2026): budget chips (Under RM400K/500K/600K, link #under500),
   Klang + Pulau Indah area chips, "All Residential/Commercial/…" search fix,
   Price ⇄ Monthly switch (an estimate, homes only).
   ────────────────────────────────────────────────────────────────── */
(function(){
	'use strict';
	var canvas = document.getElementById('npMap');
	if(!canvas || typeof maplibregl === 'undefined') return;

	// ── Budget + monthly estimate: every assumption lives here ─────────
	var NP = {
		budgets: [400000, 500000, 600000],   // budget chips, RM (link: #under400 / #under500 / #under600)
		// Est. monthly instalment = standard loan maths, M = P·r / (1 − (1+r)^−n)
		loanShare: 0.90,     // loan = 90% of the "from" price
		years: 35,
		rate: 4.2,           // % a year. Checked 23 Oct 2026: OPR 2.75% (BNM), main banks 4.10–4.35% (Public Bank 4.22%)
		roundTo: 10,         // monthly figures to the nearest RM10
		chipRoundTo: 100,    // monthly budget chips to the nearest RM100
		// Extra "Popular areas" where most of the affordable stock is (the server's chips are all KL)
		areas: [
			{ name: 'Klang',       lat: 3.055, lng: 101.40,  zoom: 11, bounds: [101.33, 2.975, 101.47, 3.14] },
			{ name: 'Pulau Indah', lat: 2.937, lng: 101.323, zoom: 13, bounds: [101.295, 2.912, 101.352, 2.962] }
		]
	};
	function estMonthly(price){
		var P = price * NP.loanShare, r = NP.rate / 100 / 12, n = NP.years * 12;
		return r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n;
	}
	function roundTo(v, step){ return Math.round(v / step) * step; }
	function commas(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
	var EST_LINE = 'est. ' + Math.round(NP.loanShare * 100) + '% loan · ' + NP.years + ' yrs · ' + NP.rate + '%';

	// ── "All Residential / Commercial / Industrial / Land" ──────────────
	// The heading options (value 0 / 20 / 40 / 60) find nothing on /map/, so they send the
	// types listed under them instead, e.g. 0 → |1|2|3|4|5|6|7|8 (what /project/?type=0 shows).
	function fixTypeHeadings(){
		var asked = new URLSearchParams(location.search).get('type'), leaving = false;
		var sel = document.querySelector('#searchForm select[name="type"]');
		if(!sel) return false;
		var heads = [], head = null;
		[].slice.call(sel.options).forEach(function(o){
			if(/^-{2,}.*-{2,}$/.test(o.text.trim())){ head = { opt: o, code: o.value, ids: [] }; heads.push(head); return; }
			if(head && o.value) String(o.value).split('|').forEach(function(id){
				if(id && head.ids.indexOf(id) < 0) head.ids.push(id);
			});
		});
		heads.forEach(function(h){
			if(!h.ids.length) return;
			var v = '|' + h.ids.join('|');
			if(asked === h.code){   // arrived on ?type=0 (no results): ask again the way that works
				var u = new URL(location.href); u.searchParams.set('type', v);
				location.replace(u.toString()); leaving = true;
			}
			h.opt.value = v;
			if(asked === v) sel.value = v;   // keep the heading shown as chosen
		});
		return leaving;
	}
	if(fixTypeHeadings()) return;

	var STREET_STYLE = 'https://tiles.openfreemap.org/styles/positron';
	var SAT_TILES    = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
	var DEFAULT_IMG  = 'https://www.inewproject.com/images/default_img.png';
	var KV_CENTER    = [101.62, 3.06];   // Klang Valley, [lng, lat]
	var KV_ZOOM      = 9.3;
	// Opening view when no search is applied: 'kl' (Kuala Lumpur city), 'klcc' (the KLCC chip) or 'kv' (Klang Valley).
	var OPEN_ON      = window.NP_MAP_OPEN_ON || 'kl';
	var KL_CENTER    = [101.66, 3.12];

	// ── Data ────────────────────────────────────────────────────────────
	var ALL = (window.__PROJECTS__ || []).filter(function(p){
		return p && isFinite(parseFloat(p.lat)) && isFinite(parseFloat(p.lng)) && +p.lat !== 0 && +p.lng !== 0;
	});
	var qs = new URLSearchParams(location.search);
	var stateParam = qs.get('state') || '';
	var LIST = stateParam ? ALL.filter(function(p){ return String(p.state_id) === String(stateParam); }) : ALL;
	if(!LIST.length) LIST = ALL;
	// A search (state / location / type) opens on whatever it returned.
	var searched = ['state','location','type','s'].some(function(k){ return (qs.get(k) || '') !== ''; });

	function num(v){ return parseFloat(String(v == null ? '' : v).replace(/[^0-9.]/g,'')) || 0; }
	function priceShort(n){
		if(!n) return '';
		if(n >= 999500){
			var m = n / 1e6;
			return 'RM ' + (m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/0$/,'')) + 'M';
		}
		return 'RM ' + Math.round(n / 1000) + 'K';
	}
	function esc(s){
		return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
			return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
		});
	}
	function isGift(p){ return p.enquiry_type === 'e-Enquiry' || p.enquiry_type === 'e-Booking'; }
	var store = {
		get: function(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } },
		set: function(k, v){ try{ sessionStorage.setItem(k, v); }catch(e){} }
	};
	var REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
	var TOUCH   = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
	function dur(ms){ return REDUCED ? 0 : ms; }

	// Homes get a monthly estimate; shops, offices, retail, factories and land keep the full price.
	var NOT_HOME = /shop|office|retail|commercial|factory|warehouse|industrial|land\b|\blots?\b|soho|sovo|sofo|business/i;
	var HOME     = /condo|apartment|residen|suite|penthouse|house|villa|bungalow|terrace|semi-d|cluster|duplex|flat/i;
	LIST.forEach(function(p){
		p._lat = +p.lat; p._lng = +p.lng; p._n = num(p.price_from);
		var type = String(p.development_type || '').split('\n')[0];
		p._home = !NOT_HOME.test(type) && HOME.test(type);
		p._mo = p._home && p._n ? roundTo(estMonthly(p._n), NP.roundTo) : 0;   // as shown: nearest RM10
	});

	// ── What is on the map: budget chip + Price / Monthly ───────────────
	var budget = -1;          // index into NP.budgets; -1 = no budget
	var monthlyOn = false;
	function budgetMonthly(i){ return roundTo(estMonthly(NP.budgets[i]), NP.chipRoundTo); }
	function budgetLabel(i){
		return monthlyOn ? 'RM' + commas(budgetMonthly(i)) + '/mo' : 'RM' + Math.round(NP.budgets[i] / 1000) + 'K';
	}
	// A budget shows the homes priced at or under it, compared as shown (the price, or the rounded monthly).
	function passes(p){
		if(budget < 0) return true;
		if(!p._home || !p._n) return false;
		return monthlyOn ? p._mo <= budgetMonthly(budget) : p._n <= NP.budgets[budget];
	}
	var VIS = LIST;           // the projects currently on the map

	// Projects on the same site (≈80 m) always share one pin.
	var SITES = [];
	function summarise(items){
		var prices = items.map(function(p){ return p._n; }).filter(Boolean);
		return { min: prices.length ? Math.min.apply(null, prices) : 0, gift: items.some(isGift) };
	}
	function buildSites(){
		VIS = LIST.filter(passes);
		SITES = [];
		VIS.forEach(function(p){
			for(var i = 0; i < SITES.length; i++){
				var s = SITES[i];
				if(Math.abs(s.lat - p._lat) < 7e-4 && Math.abs(s.lng - p._lng) < 7e-4){ s.items.push(p); return; }
			}
			SITES.push({ id: SITES.length, lat: p._lat, lng: p._lng, items: [p] });
		});
		SITES.forEach(function(s){
			var t = summarise(s.items); s.min = t.min; s.gift = t.gift;
			// who leads a group: e-Enquiry first, then the cheaper project, "Enquire" last
			s.prio = (s.gift ? 0 : 1e12) + (s.min || 9e11);
		});
	}
	buildSites();
	// Pin text: the lowest price — or, with Monthly on, the lowest monthly estimate of the homes in it.
	function pinLabel(items){
		if(monthlyOn){
			var mos = items.map(function(p){ return p._mo; }).filter(Boolean);
			if(mos.length) return '~RM' + commas(Math.min.apply(null, mos)) + '/mo';
		}
		var t = summarise(items);
		return t.min ? priceShort(t.min) : 'Enquire';
	}
	// Best first: e-Enquiry, then cheapest — used for the order of cards in a group.
	function byPriority(a, b){ return (isGift(b) - isGift(a)) || ((a._n || 9e11) - (b._n || 9e11)); }

	function boundsOf(points){
		var b = new maplibregl.LngLatBounds();
		points.forEach(function(p){ b.extend([p._lng != null ? p._lng : p.lng, p._lat != null ? p._lat : p.lat]); });
		return b;
	}

	// ── Elements ────────────────────────────────────────────────────────
	var sec     = document.getElementById('np-map-section');
	var elCount = document.getElementById('npMapCount');
	var elReset = document.getElementById('npResetMap');
	var elEmpty = document.getElementById('npMapEmpty');
	var elEmptyR= document.getElementById('npEmptyReset');
	var elChips = document.getElementById('npMapChips');
	var elHint  = document.getElementById('npMapHint');
	var elLayers= document.getElementById('npMapLayers');

	// Popular areas: add the affordable areas the server's chips don't cover (same chip, same data-* contract).
	if(elChips){
		var have = [].slice.call(elChips.querySelectorAll('.np-chip')).map(function(c){ return c.textContent.trim().toLowerCase(); });
		var firstChip = elChips.querySelector('.np-chip');
		NP.areas.forEach(function(a){
			if(have.indexOf(a.name.toLowerCase()) > -1) return;
			var b = document.createElement('button');
			b.type = 'button'; b.className = 'np-chip'; b.textContent = a.name;
			b.dataset.lat = a.lat; b.dataset.lng = a.lng; b.dataset.zoom = a.zoom; b.dataset.bounds = a.bounds.join(',');
			elChips.insertBefore(b, firstChip);   // first: that's where most of the stock under RM500K is
		});
	}
	// Budget row under Popular areas, quiet like it.
	var elBudget = null;
	if(elChips){
		elBudget = document.createElement('div');
		elBudget.className = 'np-map-chips np-budget';
		elBudget.id = 'npBudget';
		elBudget.innerHTML = '<span class="np-chips-label">Budget:</span>' + NP.budgets.map(function(v, i){
			return '<button type="button" class="np-chip" data-budget="' + i + '"></button>';
		}).join('');
		elChips.parentNode.insertBefore(elBudget, elChips.nextSibling);
	}
	// Price ⇄ Monthly switch, on the map under the count, and the estimate line it always comes with.
	var elMo = document.createElement('div');
	elMo.className = 'np-map-overlay np-map-mo';
	elMo.id = 'npMapMo';
	elMo.setAttribute('role', 'group');
	elMo.setAttribute('aria-label', 'Show prices as');
	elMo.innerHTML = '<button type="button" data-mo="0" aria-pressed="true">Price</button><button type="button" data-mo="1" aria-pressed="false">Monthly</button>';
	var elEst = document.createElement('div');
	elEst.className = 'np-map-overlay np-map-est';
	elEst.id = 'npMapEst';
	elEst.textContent = EST_LINE;
	elEst.title = 'Estimated monthly instalment: ' + Math.round(NP.loanShare * 100) + '% loan, ' + NP.years + ' years, ' + NP.rate +
		'% a year. Excludes the 10% down payment and fees. Subject to bank approval. Homes only; other properties show the full price.';
	(elCount && elCount.parentNode === canvas.parentNode ? elCount : canvas).insertAdjacentElement('afterend', elEst);
	elEst.insertAdjacentElement('beforebegin', elMo);

	function paintControls(){
		if(elBudget) [].slice.call(elBudget.querySelectorAll('[data-budget]')).forEach(function(b){
			var i = +b.dataset.budget;
			b.textContent = 'Under ' + budgetLabel(i);
			b.classList.toggle('is-active', i === budget);
			b.setAttribute('aria-pressed', String(i === budget));
		});
		[].slice.call(elMo.querySelectorAll('button')).forEach(function(b){
			b.setAttribute('aria-pressed', String((b.dataset.mo === '1') === monthlyOn));
		});
		var on = elBudget && elBudget.querySelector('.is-active');
		if(elBudget && !on) elBudget.scrollLeft = 0;
		if(on && elBudget.scrollWidth > elBudget.clientWidth){
			var rr = elBudget.getBoundingClientRect(), cr = on.getBoundingClientRect();
			if(cr.right > rr.right || cr.left < rr.left) elBudget.scrollLeft += cr.left - rr.left - 12;
		}
		elEst.classList.toggle('is-visible', monthlyOn);
		canvas.parentNode.classList.toggle('is-monthly', monthlyOn);
	}

	// Links for posts: /map/#under500 (also ?under=500), and #mo for Monthly.
	(function readLink(){
		var h = location.hash.replace(/^#/, '').split('&'), q = new URLSearchParams(location.search).get('under');
		var want = (h.filter(function(t){ return /^under\d+$/.test(t); })[0] || (q ? 'under' + q : '')).replace('under', '');
		var i = NP.budgets.indexOf(+want * 1000);
		if(i > -1) budget = i;
		monthlyOn = h.indexOf('mo') > -1;
	})();
	buildSites();
	paintControls();

	var map, popup, booted = false;
	var touched = /mv=/.test(location.hash);   // the visitor has taken control of the view (then we never re-fit it)
	var pins = {};            // key → marker for the pins currently on the map
	var openKey = null;       // the pin whose card is open

	function klccChip(){
		if(!elChips) return null;
		return [].slice.call(elChips.querySelectorAll('.np-chip')).filter(function(c){ return /klcc/i.test(c.textContent); })[0] || null;
	}
	function startView(){
		// a budget opens on every home it found (most of them are outside KL)
		if(budget > -1 && VIS.length){
			if(VIS.length === 1) return { center: [VIS[0]._lng, VIS[0]._lat], zoom: 13 };
			return { bounds: boundsOf(VIS), fit: budgetFit() };
		}
		if(!LIST.length) return { center: KV_CENTER, zoom: KV_ZOOM };
		if(searched){
			if(LIST.length === 1) return { center: [LIST[0]._lng, LIST[0]._lat], zoom: 14 };
			return { bounds: boundsOf(LIST) };
		}
		if(OPEN_ON === 'klcc'){
			var c = klccChip();
			if(c) return { center: [parseFloat(c.dataset.lng), parseFloat(c.dataset.lat)], zoom: parseFloat(c.dataset.zoom) || 13, chip: c };
		}
		if(OPEN_ON === 'kv'){
			var core = LIST.filter(function(p){ return p._lat > 2.8 && p._lat < 3.26 && p._lng > 101.25 && p._lng < 101.88; });
			if(core.length >= 3) return { bounds: boundsOf(core) };
		}
		// Kuala Lumpur with its neighbours (PJ, Cheras, Kepong): a bit wider on phones
		return { center: KL_CENTER, zoom: canvas.clientWidth >= 768 ? 10 : 9.5 };
	}
	var FIT = { padding: { top: 60, bottom: 50, left: 40, right: 40 }, maxZoom: 13.5 };
	function fitOf(v){ return v.fit || FIT; }
	// Fitting a budget: leave room for the widest pill at the sides and for the controls on top,
	// so every pin it found is fully on screen.
	function budgetFit(){
		var w = 0;
		SITES.forEach(function(s){ w = Math.max(w, pillSize(pinLabel(s.items), s.items.length > 1).w); });
		var side = Math.round(Math.min(w / 2 + 10, canvas.clientWidth * 0.22));
		var top = (monthlyOn ? elEst : elMo);
		return { padding: { top: top.offsetTop + top.offsetHeight + 24, bottom: 60, left: side, right: side }, maxZoom: 13.5 };
	}

	// ── Map size: fill the screen below the page header, leaving a sliver of the
	//    search bar visible so people know the page continues. ───────────────
	var wrapEl = canvas.parentNode, sizedWidth = 0;
	function nativeFull(){ return document.fullscreenElement === wrapEl || document.webkitFullscreenElement === wrapEl; }
	function isFull(){ return nativeFull() || wrapEl.classList.contains('np-full'); }
	function sizeMap(){
		if(isFull()) return;
		var phone = window.innerWidth < 768, h;
		if(phone){
			// phones: once the short intro row is scrolled away, the map fills the screen under the header
			h = window.innerHeight - headerOffset() - 48;
		}else{
			// laptops: the map fills the screen as the page opens, with the search bar peeking below
			h = window.innerHeight - (wrapEl.getBoundingClientRect().top + window.pageYOffset) - 56;
		}
		h = Math.round(Math.max(phone ? 380 : 480, Math.min(1100, h)));
		if(wrapEl.style.height !== h + 'px') wrapEl.style.height = h + 'px';
		sizedWidth = window.innerWidth;
	}
	sizeMap();

	// ── Boot ────────────────────────────────────────────────────────────
	function boot(){
		if(booted) return; booted = true;
		sizeMap();
		var v = startView();
		var opts = {
			container: 'npMap', style: STREET_STYLE,
			attributionControl: { compact: false },
			dragRotate: false, pitchWithRotate: false, touchPitch: false,
			cooperativeGestures: TOUCH,      // phones: two fingers move the map, one finger scrolls the page
			scrollZoom: false                // desktop: wheel-zoom only while the cursor is on the map (as v1)
		};
		if(v.bounds){ opts.bounds = v.bounds; opts.fitBoundsOptions = fitOf(v); }
		else { opts.center = v.center; opts.zoom = v.zoom; }
		try{
			map = new maplibregl.Map(opts);
		}catch(e){
			if(window.console) console.error('Map could not start:', e);
			if(elEmpty){
				elEmpty.querySelector('p').textContent = 'The map could not load on this browser.';
				elEmpty.querySelector('span').textContent = 'All projects are listed below.';
				elEmpty.classList.add('is-visible');
			}
			return;
		}
		window.__NP_MAP__ = map;
		map.touchZoomRotate.disableRotation();
		map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
		map.addControl(fullScreenControl(), 'top-right');
		if(!TOUCH){
			canvas.addEventListener('mouseenter', function(){ map.scrollZoom.enable(); });
			canvas.addEventListener('mouseleave', function(){ map.scrollZoom.disable(); });
		}
		if(v.chip) clearChips(v.chip);

		popup = new maplibregl.Popup({ anchor: 'bottom', offset: 22, maxWidth: 'none', focusAfterOpen: false });
		popup.on('close', function(){
			canvas.parentNode.classList.remove('has-card');
			var mk = openKey && pins[openKey];
			if(mk){ mk._el.classList.remove('is-selected'); mk._wrap.classList.remove('is-front'); }
			openKey = null;
			regroup();   // drop a pin that was only kept on screen for its card
		});

		// The page can still be settling (fonts, header) when the map is created,
		// so fit the opening view again once the map has loaded — unless the
		// visitor already moved it or arrived on a shared #mv= link.
		map.on('dragstart', function(){ touched = true; });
		map.on('zoomstart', function(e){ if(e.originalEvent) touched = true; });
		function refit(){
			if(touched) return;
			var sv = startView();
			if(sv.bounds) map.fitBounds(sv.bounds, Object.assign({ duration: 0 }, fitOf(sv)));
			else map.jumpTo({ center: sv.center, zoom: sv.zoom });
		}
		if('ResizeObserver' in window){
			var lastW = canvas.clientWidth, lastH = canvas.clientHeight;
			new ResizeObserver(function(){
				if(canvas.clientWidth === lastW && canvas.clientHeight === lastH) return;
				lastW = canvas.clientWidth; lastH = canvas.clientHeight;
				map.resize(); refit(); regroup();
			}).observe(canvas);
		}

		map.on('load', function(){
			map.resize();
			refit();
			quietBasemap();
			map.addSource('np-sat', { type: 'raster', tiles: [SAT_TILES], tileSize: 256, attribution: 'Tiles &copy; Esri' });
			var firstSymbol = (map.getStyle().layers.filter(function(l){ return l.type === 'symbol'; })[0] || {}).id;
			map.addLayer({ id: 'np-sat', type: 'raster', source: 'np-sat', layout: { visibility: 'none' } }, firstSymbol);
		});
		// Grouping depends only on the zoom, so it is redone when the zoom settles (not on every pan).
		map.on('zoomend', regroup);
		map.on('moveend', function(){ refreshCount(); writeHash(); hintCheck(); });

		readHash();
		regroup();
		refreshCount();
		setTimeout(hintCheck, 1200);
	}

	// ── Full screen: the whole map box (count, Reset, layers, cards) fills the screen.
	//    Real full screen where the browser supports it; iPhones get the box covering the window.
	//    Exit always matches how it was entered, so nobody can get stuck. ─────────────────────
	var fsBtn = null, fsMode = null;   // null | 'native' | 'cover'
	function setFsButton(on){
		if(!fsBtn) return;
		fsBtn.className = on ? 'maplibregl-ctrl-shrink' : 'maplibregl-ctrl-fullscreen';
		fsBtn.title = on ? 'Exit full screen' : 'Full screen';
		fsBtn.setAttribute('aria-label', fsBtn.title);
	}
	function afterFsChange(on){
		setFsButton(on);
		if(TOUCH){ if(on) map.cooperativeGestures.disable(); else map.cooperativeGestures.enable(); }
		setTimeout(function(){ if(!on) sizeMap(); map.resize(); regroup(); if(popup && popup.isOpen()) fitPopup(); }, 80);
	}
	function enterFull(){
		touched = true;
		var req = wrapEl.requestFullscreen || wrapEl.webkitRequestFullscreen;
		if(req){
			try{
				var r = req.call(wrapEl);
				fsMode = 'native';
				if(r && r.catch) r.catch(function(){ fsMode = null; cover(true); });
				return;
			}catch(e){}
		}
		cover(true);
	}
	function cover(on){
		fsMode = on ? 'cover' : null;
		wrapEl.classList.toggle('np-full', on);
		document.documentElement.classList.toggle('np-map-full', on);
		afterFsChange(on);
	}
	function exitFull(){
		if(fsMode === 'cover' || wrapEl.classList.contains('np-full')){ cover(false); return; }
		if(nativeFull()){
			var ex = document.exitFullscreen || document.webkitExitFullscreen;
			try{ var r = ex && ex.call(document); if(r && r.catch) r.catch(function(){}); }catch(e){}
		}
	}
	function onNativeChange(){
		if(nativeFull()){ fsMode = 'native'; afterFsChange(true); }
		else if(fsMode === 'native'){ fsMode = null; afterFsChange(false); }
	}
	document.addEventListener('fullscreenchange', onNativeChange);
	document.addEventListener('webkitfullscreenchange', onNativeChange);
	document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && fsMode === 'cover' && !(popup && popup.isOpen())) cover(false); });
	function fullScreenControl(){
		return {
			onAdd: function(){
				var box = document.createElement('div');
				box.className = 'maplibregl-ctrl maplibregl-ctrl-group';
				fsBtn = document.createElement('button');
				fsBtn.type = 'button';
				fsBtn.innerHTML = '<span class="maplibregl-ctrl-icon" aria-hidden="true"></span>';
				setFsButton(false);
				fsBtn.addEventListener('click', function(){ if(isFull()) exitFull(); else enterFull(); });
				box.appendChild(fsBtn);
				return box;
			},
			onRemove: function(){}
		};
	}

	// Calm the street map so the price pins carry the colour. Each layer is
	// optional — if the tile style changes, the map still works untouched.
	function quietBasemap(){
		(map.getStyle().layers || []).forEach(function(l){
			var id = l.id.toLowerCase();
			try{
				if(l.type === 'background') map.setPaintProperty(l.id, 'background-color', '#f6f4f0');
				else if(l.type === 'fill' && /water/.test(id)) map.setPaintProperty(l.id, 'fill-color', '#c6dcee');
				else if(l.type === 'fill' && /park|grass|wood|forest|green|cemetery|golf|pitch|garden/.test(id)) map.setPaintProperty(l.id, 'fill-color', '#e1eadb');
				else if(l.type === 'fill' && /building/.test(id)) map.setPaintProperty(l.id, 'fill-color', '#ebe8e2');
				else if(l.type === 'line' && /waterway|river/.test(id)) map.setPaintProperty(l.id, 'line-color', '#c6dcee');
				else if(l.type === 'symbol') map.setPaintProperty(l.id, 'text-color', /place|city|town|village|state|country/.test(id) ? '#5a6275' : '#8a909b');
			}catch(e){}
		});
	}

	// ── Card ────────────────────────────────────────────────────────────
	function cardHTML(p){
		var type  = String(p.development_type || '').split('\n')[0].trim();
		var built = String(p.built_up || '').trim();
		var badge = p.enquiry_type === 'e-Enquiry' ? '<span class="emap-pop-badge">e-ENQUIRY AVAILABLE</span>'
		          : p.enquiry_type === 'e-Booking' ? '<span class="emap-pop-badge">e-BOOKING AVAILABLE</span>' : '';
		return '<div class="emap-pop">' +
			'<div class="emap-pop-img" style="background:#eee center/cover no-repeat;background-image:url(\'' + esc(p.image_url || DEFAULT_IMG) + '\')">' + badge + '</div>' +
			'<div class="emap-pop-name">' + esc(p.name) + '</div>' +
			'<div class="emap-pop-loc">' + esc(p.address || p.state_name || '') + '</div>' +
			(type  ? '<div class="emap-pop-type">' + esc(type) + '</div>' : '') +
			(built ? '<div class="emap-pop-size">' + esc(built) + ' sq.ft</div>' : '') +
			(p._n  ? '<div class="emap-pop-price">From <b>' + esc(priceShort(p._n)) + '</b></div>'
			       : '<div class="emap-pop-price"><b>Enquire the Price</b></div>') +
			(monthlyOn && p._mo ? '<div class="emap-pop-mo">est. <b>RM' + commas(p._mo) + '/mo</b><span>' + esc(EST_LINE.replace(/^est\. /, '')) + '</span></div>' : '') +
			'<a class="emap-pop-cta" href="' + esc(p.url || '#') + '">View Project</a>' +
		'</div>';
	}

	// ── Pins: group by distance on screen, then draw ────────────────────
	// Rough pill size, used before the pill exists (16px bold, padding 12px, count badge 27px).
	function pillSize(label, counted){ return { w: 26 + label.length * 9.4 + (counted ? 27 : 0), h: 34 }; }
	var GAP = 8;
	// Share of a pill that may tuck behind its neighbour before the two merge (as on Airbnb).
	var TUCK = 0.3;

	function groupSites(){
		var placed = [];
		SITES.slice().sort(function(a, b){ return a.prio - b.prio; }).forEach(function(s){
			var pt = map.project([s.lng, s.lat]);
			var size = pillSize(pinLabel(s.items), true);
			for(var i = 0; i < placed.length; i++){
				var g = placed[i];
				if(Math.abs(pt.x - g.x) < (size.w + g.w) / 2 * (1 - TUCK) + GAP && Math.abs(pt.y - g.y) < (size.h + g.h) / 2 * (1 - TUCK) + GAP){
					g.sites.push(s); return;
				}
			}
			placed.push({ x: pt.x, y: pt.y, w: size.w, h: size.h, lead: s, sites: [s] });
		});
		return placed.map(function(g){
			var items = [];
			g.sites.forEach(function(s){ items = items.concat(s.items); });
			var t = summarise(items);
			return {
				key: g.sites.map(function(s){ return s.id; }).sort(function(a, b){ return a - b; }).join('-'),
				lng: g.lead.lng, lat: g.lead.lat,          // the pin sits on the leading project
				sites: g.sites, items: items.sort(byPriority), min: t.min, gift: t.gift
			};
		});
	}

	function makePin(gr, i){
		var wrap = document.createElement('div');
		wrap.className = 'emap-pin-wrap';
		var el = document.createElement('button');
		el.type = 'button';
		el.className = 'emap-pin' + (gr.gift ? ' is-gift' : '');
		el.style.animationDelay = Math.min(i * 14, 420) + 'ms';
		var label = pinLabel(gr.items);
		var n = gr.items.length;
		el.innerHTML = (n > 1 ? '<span class="emap-cnt">' + n + '</span>' : '') + label;
		el.title = n > 1 ? n + ' projects: ' + gr.items.map(function(p){ return p.name; }).join(' · ') : gr.items[0].name;
		el.setAttribute('aria-label', (n > 1 ? n + ' projects, from ' : gr.items[0].name + ', from ') + (gr.min ? label.replace(/^~/, 'about ') : 'enquire for price'));
		wrap.appendChild(el);
		var mk = new maplibregl.Marker({ element: wrap, anchor: 'center' }).setLngLat([gr.lng, gr.lat]).addTo(map);
		mk._gr = gr; mk._el = el; mk._wrap = wrap;
		el.addEventListener('click', function(e){ e.stopPropagation(); pinClicked(mk); });
		return mk;
	}

	function regroup(){
		if(!map) return;
		var next = {}, i = 0;
		groupSites().forEach(function(gr){
			if(pins[gr.key]){ next[gr.key] = pins[gr.key]; next[gr.key]._gr = gr; delete pins[gr.key]; }
			else { next[gr.key] = makePin(gr, i++); }
		});
		// pins that no longer exist at this zoom
		Object.keys(pins).forEach(function(k){
			if(k === openKey && popup && popup.isOpen()){ next[k] = pins[k]; return; }   // keep the open one until its card closes
			pins[k].remove();
		});
		pins = next;
		if(openKey && pins[openKey]){ pins[openKey]._el.classList.add('is-selected'); pins[openKey]._wrap.classList.add('is-front'); }
	}

	// Budget or Price/Monthly changed: new set of projects, new labels — redraw every pin.
	function redraw(){
		if(popup) popup.remove();
		buildSites();
		paintControls();
		if(!map) return;
		Object.keys(pins).forEach(function(k){ pins[k].remove(); });
		pins = {};
		regroup();
		refreshCount();
		writeHash();
	}
	function fitVisible(){
		var v = startView();
		if(v.bounds) map.fitBounds(v.bounds, Object.assign({ duration: dur(800) }, fitOf(v)));
		else map.flyTo({ center: v.center, zoom: v.zoom, duration: dur(800) });
	}
	function setBudget(i, fit){
		budget = budget === i ? -1 : i;   // tap again = clear
		redraw();
		if(map && fit && budget > -1 && VIS.length) fitVisible();
		track('map_budget', { budget: budget > -1 ? NP.budgets[budget] : 0, monthly: monthlyOn });
	}
	function setMonthly(on){
		if(on === monthlyOn) return;
		monthlyOn = on;
		redraw();   // a budget re-checks its homes against the monthly figure
		if(map && budget > -1 && VIS.length) fitVisible();   // and shows them all again (pills change width)
		track('map_monthly', { on: on });
	}
	function track(name, params){ try{ if(window.gtag) window.gtag('event', name, params); }catch(e){} }
	if(elBudget) elBudget.addEventListener('click', function(e){
		var b = e.target.closest('[data-budget]'); if(!b) return;
		setBudget(+b.dataset.budget, true);
	});
	elMo.addEventListener('click', function(e){
		var b = e.target.closest('[data-mo]'); if(!b) return;
		setMonthly(b.dataset.mo === '1');
	});

	function pinClicked(mk){
		var gr = mk._gr;
		if(gr.sites.length === 1) return openCard(mk);
		// several sites: zoom in until they separate; if they can't, list them in one card
		var cam = map.cameraForBounds(boundsOf(gr.sites), { padding: 90 });
		if(cam && cam.zoom > map.getZoom() + 0.6 && map.getZoom() < 16){
			if(popup) popup.remove();
			map.easeTo({ center: cam.center, zoom: Math.min(cam.zoom, 16), duration: dur(650) });
		}else{
			openCard(mk);
		}
	}

	function openCard(mk, first){
		var gr = mk._gr, items = gr.items.slice();
		if(first) items.sort(function(a, b){ return (b === first) - (a === first); });
		if(popup.isOpen()) popup.remove();
		touched = true;
		openKey = gr.key;
		mk._el.classList.add('is-selected');
		mk._wrap.classList.add('is-front');
		hideHint();
		canvas.parentNode.classList.add('has-card');
		popup.setLngLat([gr.lng, gr.lat])
			.setHTML('<div class="emap-pops' + (items.length > 1 ? ' is-multi' : '') + '">' + items.map(cardHTML).join('') + '</div>')
			.addTo(map);
		fitPopup();
	}

	// Pan just enough to keep the whole card inside the map (clear of the count chip).
	function fitPopup(){
		requestAnimationFrame(function(){ requestAnimationFrame(function(){
			var pe = popup.getElement(); if(!pe) return;
			var r = pe.getBoundingClientRect(), m = canvas.getBoundingClientRect();
			var BOTTOM = 52;   // room under the card for the pin itself (offset 22 + half a pill + margin)
			// keep the card below the "N projects in this area" chip when there is room
			var topEl = monthlyOn ? elEst : elMo;
			var topPad = Math.round(topEl.getBoundingClientRect().bottom - m.top + 8);
			if(r.height > m.height - topPad - BOTTOM) topPad = Math.max(8, m.height - r.height - BOTTOM);
			var dx = 0, dy = 0;
			if(r.top < m.top + topPad) dy = r.top - (m.top + topPad);
			else if(r.bottom > m.bottom - BOTTOM) dy = r.bottom - (m.bottom - BOTTOM);
			// keep clear of the + / − / full-screen buttons when the card reaches their height
			var rightEdge = m.right - 10, ctl = wrapEl.querySelector('.maplibregl-ctrl-top-right');
			if(ctl){ var c = ctl.getBoundingClientRect(); if(r.top - dy < c.bottom + 6 && c.width) rightEdge = Math.min(rightEdge, c.left - 8); }
			if(r.left < m.left + 10) dx = r.left - (m.left + 10);
			else if(r.right > rightEdge) dx = r.right - rightEdge;
			if(dx || dy) map.panBy([dx, dy], { duration: dur(350) });
		}); });
	}

	// ── Count / empty / reset / chips ───────────────────────────────────
	function refreshCount(){
		if(!map) return;
		var b = map.getBounds(), n = 0;
		VIS.forEach(function(p){ if(b.contains([p._lng, p._lat])) n++; });
		if(elCount) elCount.innerHTML = '<b>' + n + '</b>&nbsp;' + (budget > -1
			? '<span class="np-new">new </span>home' + (n === 1 ? '' : 's') + ' from under ' + budgetLabel(budget)   // "from": the cheapest unit may be sold
			: 'project' + (n === 1 ? '' : 's') + ' in this area');
		if(elEmpty) elEmpty.classList.toggle('is-visible', n === 0);
	}
	function clearChips(active){
		if(elChips) elChips.querySelectorAll('.np-chip').forEach(function(c){ c.classList.toggle('is-active', c === active); });
	}
	function resetMap(){
		if(!map) return;
		if(popup) popup.remove();
		if(budget > -1){ budget = -1; redraw(); }
		var v = startView();
		clearChips(v.chip || null);
		if(v.bounds) map.fitBounds(v.bounds, Object.assign({ duration: dur(800) }, fitOf(v)));
		else map.flyTo({ center: v.center, zoom: v.zoom, duration: dur(800) });
	}
	if(elReset)  elReset.addEventListener('click', resetMap);
	if(elEmptyR) elEmptyR.addEventListener('click', resetMap);
	if(elChips) elChips.addEventListener('click', function(e){
		var btn = e.target.closest('.np-chip'); if(!btn || !map) return;
		if(popup) popup.remove();
		clearChips(btn);
		var bb = (btn.dataset.bounds || '').split(',').map(parseFloat);
		if(bb.length === 4 && bb.every(isFinite)) map.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], Object.assign({ duration: dur(900) }, FIT));
		else map.flyTo({ center: [parseFloat(btn.dataset.lng), parseFloat(btn.dataset.lat)],
		                 zoom: parseFloat(btn.dataset.zoom) || 13, duration: dur(900) });
	});

	// ── Map / Satellite switch ──────────────────────────────────────────
	if(elLayers){
		var open  = function(){ elLayers.classList.add('is-open'); };
		var close = function(){ elLayers.classList.remove('is-open'); };
		if(!TOUCH){ elLayers.addEventListener('mouseenter', open); elLayers.addEventListener('mouseleave', close); }
		elLayers.querySelector('.emap-layers-btn').addEventListener('click', function(e){ e.stopPropagation(); open(); });
		document.addEventListener('click', function(e){ if(!elLayers.contains(e.target)) close(); });
		elLayers.addEventListener('change', function(e){
			if(!map || !map.getLayer('np-sat')) return;
			map.setLayoutProperty('np-sat', 'visibility', e.target.value === 'sat' ? 'visible' : 'none');
			if(TOUCH) close();
		});
	}

	// ── "Zoom in to see more prices" ────────────────────────────────────
	// Shown while grouped pins (several sites in one pin) are on screen.
	var hintBusy = false, hintTimer;
	function hideHint(){ if(elHint) elHint.classList.remove('is-visible'); }
	function hintCheck(){
		if(!map || !elHint || store.get('npHintDone')) return;
		if(map.getZoom() >= 13.5){ store.set('npHintDone', '1'); hideHint(); return; }
		if(hintBusy || (popup && popup.isOpen())) return;
		var b = map.getBounds(), grouped = 0;
		Object.keys(pins).forEach(function(k){
			var gr = pins[k]._gr;
			if(gr.sites.length > 1 && b.contains([gr.lng, gr.lat])) grouped++;
		});
		if(!grouped) return;
		hintBusy = true;
		elHint.classList.add('is-visible');
		clearTimeout(hintTimer);
		hintTimer = setTimeout(function(){
			hideHint();
			setTimeout(function(){ hintBusy = false; }, 15000);
		}, 4000);
	}

	// ── Shareable view: #under500&mo&mv=zoom,lat,lng ────────────────────
	var hashTimer;
	function writeHash(){
		clearTimeout(hashTimer);
		hashTimer = setTimeout(function(){
			var c = map.getCenter(), parts = [];
			if(budget > -1) parts.push('under' + Math.round(NP.budgets[budget] / 1000));
			if(monthlyOn) parts.push('mo');
			parts.push('mv=' + map.getZoom().toFixed(2) + ',' + c.lat.toFixed(5) + ',' + c.lng.toFixed(5));
			try{ history.replaceState(null, '', location.pathname + location.search + '#' + parts.join('&')); }catch(e){}
		}, 300);
	}
	function readHash(){
		var m = /[#&]mv=([\d.]+),([-\d.]+),([-\d.]+)/.exec(location.hash);
		if(m){ map.jumpTo({ zoom: +m[1], center: [+m[3], +m[2]] }); clearChips(null); }
	}

	// ── clickroute(): the listing cards below call this (v1 contract) ───
	// Height of whatever fixed/sticky header is covering the top of the window.
	function headerOffset(){
		var h = 0;
		document.querySelectorAll('body *').forEach(function(el){
			if(el.offsetHeight < 30 || el.offsetWidth < window.innerWidth * 0.6) return;
			var pos = getComputedStyle(el).position;
			if(pos !== 'fixed' && pos !== 'sticky') return;
			var r = el.getBoundingClientRect();
			if(r.top <= 1 && r.bottom > 0 && r.bottom < window.innerHeight / 2) h = Math.max(h, r.bottom);
		});
		return h;
	}
	function scrollToMap(){
		if(!sec) return;
		var y = sec.getBoundingClientRect().top + window.pageYOffset - headerOffset();
		window.scrollTo({ top: Math.max(0, y), behavior: REDUCED ? 'auto' : 'smooth' });
	}
	function pinForProject(p){
		var keys = Object.keys(pins);
		for(var i = 0; i < keys.length; i++){ if(pins[keys[i]]._gr.items.indexOf(p) > -1) return pins[keys[i]]; }
		return null;
	}

	window.clickroute = function(rLat, rLng, rName){
		if(!booted) boot();
		scrollToMap();
		if(!map) return false;
		var target = null;
		for(var i = 0; i < LIST.length; i++){
			var p = LIST[i];
			if((rName && p.name === rName) ||
			   (Math.abs(p._lat - parseFloat(rLat)) < 1e-4 && Math.abs(p._lng - parseFloat(rLng)) < 1e-4)){ target = p; break; }
		}
		if(target){
			if(popup) popup.remove();
			if(budget > -1 && VIS.indexOf(target) < 0){ budget = -1; redraw(); }
			clearChips(null);
			var here = map.project([target._lng, target._lat]), c = map.getCanvas();
			var onScreenAndClose = map.getZoom() >= 15 &&
				here.x > 40 && here.y > 40 && here.x < c.clientWidth - 40 && here.y < c.clientHeight - 40;
			var go = function(){ var mk = pinForProject(target); if(mk) openCard(mk, target); };
			if(onScreenAndClose){ go(); }
			else{
				map.once('moveend', go);
				map.flyTo({ center: [target._lng, target._lat], zoom: Math.max(map.getZoom(), 15), duration: dur(900) });
			}
		}
		return false;
	};
	document.addEventListener('click', function(e){
		var link = e.target.closest && e.target.closest('.js-map-card-link');
		if(!link) return;
		e.preventDefault();
		window.clickroute(link.dataset.crLat, link.dataset.crLng, link.dataset.crName);
	});
	document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && popup) popup.remove(); });

	// ── Start now if the map is on screen, otherwise when it scrolls near ─
	var r0 = sec ? sec.getBoundingClientRect() : { top: 0, bottom: 1 };
	if(!sec || !('IntersectionObserver' in window) || (r0.top < window.innerHeight + 300 && r0.bottom > -300)){
		boot();
	}else{
		var io = new IntersectionObserver(function(entries){
			entries.forEach(function(en){ if(en.isIntersecting){ boot(); io.disconnect(); } });
		}, { rootMargin: '300px' });
		io.observe(sec);
	}
	var resizeTimer;
	window.addEventListener('resize', function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function(){
			if(window.innerWidth !== sizedWidth) sizeMap();
			if(map){ map.resize(); regroup(); }
		}, 150);
	});
	// The header can still grow after this runs (e.g. the logo image arriving), so size again once the
	// page has settled and whenever the header changes size.
	function settleSize(){ if(!isFull()) sizeMap(); }
	if(document.readyState === 'complete') setTimeout(settleSize, 0); else window.addEventListener('load', settleSize);
	[300, 1000, 2500].forEach(function(t){ setTimeout(settleSize, t); });
	var headerEl = document.querySelector('nav.navbar') || document.querySelector('header');
	if(headerEl && 'ResizeObserver' in window) new ResizeObserver(settleSize).observe(headerEl);
})();
