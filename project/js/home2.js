/* Afrin — Portfolio v3 homepage interactions
   Entrance animation is pure CSS (see .reveal in home2.css) so nothing can
   get stuck hidden. This file only handles count-up numbers, the clock, and
   smooth anchor scrolling. */
(function () {
  function start() {
    // ---- Count-up numbers ----
    var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
    function animateNumber(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      if (isNaN(target)) return;
      var dur = parseInt(el.getAttribute('data-duration') || '1500', 10);
      var t0 = performance.now();
      (function tick(now) {
        var p = Math.min(1, (now - t0) / dur);
        var v = easeOut(p) * target;
        el.textContent = (target % 1 !== 0) ? v.toFixed(1) : Math.round(v).toString();
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = (target % 1 !== 0) ? target.toFixed(1) : Math.round(target).toString();
      })(t0);
    }
    var counts = document.querySelectorAll('[data-target]');
    if ('IntersectionObserver' in window && counts.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateNumber(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counts.forEach(function (el) { io.observe(el); });
      // Failsafe: if the observer never fires, still show the final numbers.
      setTimeout(function () {
        counts.forEach(function (el) { if (/^0?$/.test(el.textContent.trim())) animateNumber(el); });
      }, 2800);
    } else {
      counts.forEach(animateNumber);
    }

    // ---- Local clock (Gulf Standard Time — she's targeting the UAE) ----
    var clock = document.querySelector('[data-clock]');
    if (clock) {
      var paint = function () {
        try {
          var opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Dubai' };
          clock.textContent = new Intl.DateTimeFormat('en-GB', opts).format(new Date()) + ' GST';
        } catch (e) { clock.textContent = ''; }
      };
      paint(); setInterval(paint, 30000);
    }

    // ---- Smooth anchor scroll with sticky-nav offset ----
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
