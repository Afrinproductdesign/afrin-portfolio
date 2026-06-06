// Afrin portfolio — small interactions
(function () {
  // ---- Smooth scroll for in-page anchor links
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

  // ---- Ship process diagram auto-advance (and hover-pause)
  const flow = document.querySelector('[data-ship-flow]');
  if (flow) {
    const steps = [...flow.querySelectorAll('.ship-step')];
    const fill = flow.querySelector('.ship-track .fill');
    let i = 0;
    let timer = null;
    let paused = false;
    const tick = () => {
      steps.forEach((s, k) => s.classList.toggle('active', k <= i));
      if (fill) fill.style.width = `${((i + 1) / steps.length) * 100}%`;
      i = (i + 1) % steps.length;
    };
    const start = () => {
      stop();
      timer = setInterval(() => { if (!paused) tick(); }, 1800);
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    // intersection: only run while visible
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) { tick(); start(); } else { stop(); }
      }
    }, { threshold: 0.25 });
    io.observe(flow);
    flow.addEventListener('mouseenter', () => { paused = true; });
    flow.addEventListener('mouseleave', () => { paused = false; });
    steps.forEach((s, k) => {
      s.addEventListener('mouseenter', () => {
        steps.forEach((x, j) => x.classList.toggle('active', j <= k));
        if (fill) fill.style.width = `${((k + 1) / steps.length) * 100}%`;
        i = (k + 1) % steps.length;
      });
    });
  }

  // ---- TOC active-section highlight on case study pages
  const tocLinks = document.querySelectorAll('.cs-toc a[href^="#"]');
  if (tocLinks.length) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const sec = document.querySelector(a.getAttribute('href'));
      if (sec) map.set(sec, a);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const a = map.get(e.target);
        if (!a) return;
        if (e.isIntersecting && e.intersectionRatio > 0.1) {
          tocLinks.forEach((x) => x.classList.remove('active'));
          a.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] });
    map.forEach((_a, sec) => io.observe(sec));
  }

  // ---- Cmd-K command palette
  const palette = document.querySelector('[data-cmdk]');
  if (palette) {
    const input = palette.querySelector('input');
    const items = [...palette.querySelectorAll('.cmdk-item')];
    let sel = 0;
    const render = (q) => {
      const ql = q.trim().toLowerCase();
      let first = -1;
      items.forEach((it, k) => {
        const t = it.dataset.q || it.textContent || '';
        const ok = !ql || t.toLowerCase().includes(ql);
        it.style.display = ok ? '' : 'none';
        if (ok && first < 0) first = k;
      });
      sel = first;
      items.forEach((it, k) => it.classList.toggle('sel', k === sel));
    };
    const open = () => {
      palette.classList.add('open');
      input.value = '';
      render('');
      setTimeout(() => input.focus(), 50);
    };
    const close = () => palette.classList.remove('open');
    document.addEventListener('keydown', (e) => {
      const isOpen = palette.classList.contains('open');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? close() : open();
        return;
      }
      if (!isOpen) return;
      if (e.key === 'Escape') { close(); return; }
      const visible = items.filter((it) => it.style.display !== 'none');
      const idx = visible.findIndex((it) => it.classList.contains('sel'));
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = visible[(idx + 1 + visible.length) % visible.length];
        items.forEach((it) => it.classList.remove('sel'));
        if (next) next.classList.add('sel');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = visible[(idx - 1 + visible.length) % visible.length];
        items.forEach((it) => it.classList.remove('sel'));
        if (prev) prev.classList.add('sel');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cur = items.find((it) => it.classList.contains('sel'));
        if (cur) cur.click();
      }
    });
    palette.addEventListener('click', (e) => {
      if (e.target === palette) close();
    });
    input.addEventListener('input', () => render(input.value));
    palette.querySelectorAll('[data-cmdk-open]').forEach((b) =>
      b.addEventListener('click', open)
    );
    // Buttons elsewhere with data-cmdk-trigger
    document.querySelectorAll('[data-cmdk-trigger]').forEach((b) =>
      b.addEventListener('click', open)
    );
    items.forEach((it, k) => {
      it.addEventListener('mouseenter', () => {
        items.forEach((x) => x.classList.remove('sel'));
        it.classList.add('sel');
      });
    });
  }

  // ---- Local clock for hero meta (so it feels alive)
  const clock = document.querySelector('[data-local-clock]');
  if (clock) {
    const fmt = () => {
      try {
        const d = new Date();
        const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
        clock.textContent = new Intl.DateTimeFormat('en-GB', opts).format(d) + ' IST';
      } catch (e) {
        clock.textContent = '';
      }
    };
    fmt();
    setInterval(fmt, 30000);
  }
})();
