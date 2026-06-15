// Afrin portfolio v2 — homepage interactions
(function () {
  // Smooth scroll for anchor links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  // Count-up numbers
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const fmt = (v, decimals) => {
    if (decimals > 0) return v.toFixed(decimals);
    return Math.round(v).toLocaleString();
  };
  const animateNumber = (el) => {
    const target = parseFloat(el.dataset.target);
    if (Number.isNaN(target)) return;
    const dur = parseInt(el.dataset.duration || '1600', 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const startTs = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startTs) / dur);
      const v = easeOutCubic(t) * target;
      el.textContent = fmt(v, decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target, decimals);
    };
    requestAnimationFrame(tick);
  };

  const countEls = document.querySelectorAll('[data-target]');
  if ('IntersectionObserver' in window && countEls.length) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            animateNumber(en.target);
            io2.unobserve(en.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countEls.forEach((el) => {
      el.textContent = '0';
      io2.observe(el);
    });
  } else {
    countEls.forEach(animateNumber);
  }

  // Live local clock
  const clock = document.querySelector('[data-local-clock]');
  if (clock) {
    const fmtClock = () => {
      try {
        const d = new Date();
        const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
        clock.textContent = new Intl.DateTimeFormat('en-GB', opts).format(d) + ' IST';
      } catch (e) {
        clock.textContent = '';
      }
    };
    fmtClock();
    setInterval(fmtClock, 30000);
  }
})();
