/* =====================================================================
   FRUTAS BECA — comportamento do site (sem dependências)
   - vídeo do hero por breakpoint
   - menu mobile
   - reveal on scroll (IntersectionObserver)
   - contadores animados
   - timeline (nós ativos conforme scroll)
   - dots dos carrosséis (frutas / depoimentos)
   - link ativo no header
   ===================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HERO VIDEO ---------- */
  (function () {
    var v = document.querySelector('.hero__media video');
    if (!v) return;
    var mobile = window.matchMedia('(max-width: 767px)').matches;
    var src = mobile ? v.getAttribute('data-src-mobile') : v.getAttribute('data-src-desktop');
    if (!src) return;
    var s = document.createElement('source');
    s.src = src; s.type = 'video/mp4';
    v.appendChild(s);
    v.load();
    function tryPlay () { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (v.readyState >= 2) tryPlay(); else v.addEventListener('loadeddata', tryPlay);
    window.addEventListener('pointerdown', tryPlay, { once: true });
  })();

  /* ---------- MENU MOBILE ---------- */
  (function () {
    var burger = document.getElementById('burger');
    var drawer = document.getElementById('drawer');
    var nav = document.getElementById('nav');
    if (!burger || !drawer) return;
    function set (open) {
      drawer.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    burger.addEventListener('click', function () { set(!drawer.classList.contains('is-open')); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  })();

  /* ---------- REVEAL ---------- */
  (function () {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length || reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        // pequeno stagger entre irmãos que entram juntos
        var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.hasAttribute('data-reveal') && !c.classList.contains('is-in'); });
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = (Math.max(0, idx) * 70) + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- CONTADORES ---------- */
  (function () {
    var nums = document.querySelectorAll('.stat__n[data-count]');
    if (!nums.length || reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = +el.getAttribute('data-count'), suffix = el.getAttribute('data-suffix') || '';
        var t0 = null, dur = 1400;
        function step (t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / dur);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- TIMELINE ---------- */
  (function () {
    var items = document.querySelectorAll('.tl__item');
    if (!items.length || !('IntersectionObserver' in window)) return;
    if (reduce) { items.forEach(function (it) { it.classList.add('is-on'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          // ativa este e todos os anteriores
          var i = Array.prototype.indexOf.call(items, en.target);
          for (var k = 0; k <= i; k++) items[k].classList.add('is-on');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.5 });
    items.forEach(function (it) { io.observe(it); });
  })();

  /* ---------- DOTS DOS CARROSSÉIS ---------- */
  (function () {
    document.querySelectorAll('[data-dots-for]').forEach(function (dotsEl) {
      var rail = document.getElementById(dotsEl.getAttribute('data-dots-for'));
      if (!rail) return;
      var cards = Array.prototype.slice.call(rail.children);
      if (cards.length < 2) return;

      cards.forEach(function (c, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ir para item ' + (i + 1));
        b.addEventListener('click', function () {
          rail.scrollTo({ left: c.offsetLeft - cards[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
        });
        dotsEl.appendChild(b);
      });
      var dots = dotsEl.querySelectorAll('button');

      function update () {
        var x = rail.scrollLeft;
        var best = 0, bestD = Infinity;
        cards.forEach(function (c, i) {
          var d = Math.abs((c.offsetLeft - cards[0].offsetLeft) - x);
          if (d < bestD) { bestD = d; best = i; }
        });
        dots.forEach(function (d, i) { d.classList.toggle('is-on', i === best); });
        // no fim do trilho, marca o último
        if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2) {
          dots.forEach(function (d, i) { d.classList.toggle('is-on', i === cards.length - 1); });
        }
      }
      var raf = null;
      rail.addEventListener('scroll', function () {
        if (raf) return;
        raf = requestAnimationFrame(function () { raf = null; update(); });
      }, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  })();

  /* ---------- LINK ATIVO NO HEADER ---------- */
  (function () {
    var links = document.querySelectorAll('.nav__links a[data-nav]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('data-nav')] = a; });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var a = map[en.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* ---------- MARQUEE: pausa no toque ---------- */
  (function () {
    var track = document.querySelector('.marquee__track');
    if (!track) return;
    var parent = track.parentNode;
    parent.addEventListener('touchstart', function () { track.style.animationPlayState = 'paused'; }, { passive: true });
    parent.addEventListener('touchend', function () { setTimeout(function () { track.style.animationPlayState = ''; }, 1500); }, { passive: true });
  })();

})();
