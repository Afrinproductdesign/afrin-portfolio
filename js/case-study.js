// Case Study Interactions

// ===================== BUILDER TOGGLE =====================
const toggleButtons = document.querySelectorAll('.toggle-btn');
const mobilePan = document.getElementById('mobile-panel');
const webPanel = document.getElementById('web-panel');

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    
    // Update active state
    toggleButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Toggle panels
    if (target === 'mobile') {
      mobilePan?.classList.add('active');
      webPanel?.classList.remove('active');
    } else if (target === 'web') {
      webPanel?.classList.add('active');
      mobilePan?.classList.remove('active');
    }
  });
});

// ===================== COMPARISON SLIDER =====================
const comparisonSlider = document.getElementById('comparison-slider');
const sliderHandle = document.getElementById('slider-handle');
const beforeLayer = document.getElementById('before-layer');

if (comparisonSlider && sliderHandle && beforeLayer) {
  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = comparisonSlider.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    
    sliderHandle.style.left = position + '%';
    beforeLayer.style.width = position + '%';
  };

  const startDragging = (e) => {
    isDragging = true;
    e.preventDefault();
  };

  const stopDragging = () => {
    isDragging = false;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    updateSlider(clientX);
  };

  // Mouse events
  sliderHandle.addEventListener('mousedown', startDragging);
  comparisonSlider.addEventListener('mousedown', (e) => {
    startDragging(e);
    onMove(e);
  });
  window.addEventListener('mouseup', stopDragging);
  window.addEventListener('mousemove', onMove);

  // Touch events
  sliderHandle.addEventListener('touchstart', startDragging, { passive: false });
  comparisonSlider.addEventListener('touchstart', (e) => {
    startDragging(e);
    onMove(e);
  }, { passive: false });
  window.addEventListener('touchend', stopDragging);
  window.addEventListener('touchmove', onMove, { passive: false });
}

// ===================== SCROLL REVEAL =====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || !href) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
