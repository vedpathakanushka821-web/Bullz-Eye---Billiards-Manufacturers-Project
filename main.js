/* ============================================================
   BULLZ EYE BILLIARDS — Shared JavaScript
   Handles: Navbar scroll, mobile menu, WhatsApp, reveal animations,
   active nav link highlighting, animated counters
   ============================================================ */

// --- Navbar scroll effect ---
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// --- Mobile menu toggle ---
(function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

// --- Active nav link ---
(function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefFile = href.split('/').pop();
    if (
      hrefFile === currentPath ||
      (currentPath === '' && hrefFile === 'index.html') ||
      (currentPath === 'index.html' && hrefFile === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

// --- Scroll reveal animation ---
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// --- Animated number counters ---
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = parseInt(el.dataset.duration || '2000', 10);
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
})();

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
