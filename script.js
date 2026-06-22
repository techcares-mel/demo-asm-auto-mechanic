/* ============================================================
   ASM Auto Repairs — script.js
   Template: DL Auto Care reference — Light Professional Automotive
   ============================================================ */

(function () {
  'use strict';

  /* =====================================================
     SCROLL PROGRESS BAR
     ===================================================== */
  const progressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
  }

  /* =====================================================
     BACK TO TOP
     ===================================================== */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =====================================================
     NAVBAR — SCROLL STATE
     ===================================================== */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /* =====================================================
     MOBILE NAV — HAMBURGER OVERLAY
     ===================================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navClose  = document.getElementById('navClose');

  function openNav() {
    if (navLinks) navLinks.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (navLinks) navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openNav);
  if (navClose)  navClose.addEventListener('click', closeNav);

  // Close on any nav link click
  if (navLinks) {
    navLinks.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* =====================================================
     ACTIVE NAV LINK — IntersectionObserver
     ===================================================== */
  function initActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navAnchors.length) return;

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* =====================================================
     SCROLL REVEAL — IntersectionObserver
     ===================================================== */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* =====================================================
     STATS COUNTER — count-up animation
     ===================================================== */
  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuad(progress);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initStatsCounter() {
    const statEls = document.querySelectorAll('.stat-number[data-target]');
    if (!statEls.length) return;

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statEls.forEach(function (el) { counterObserver.observe(el); });
  }

  /* =====================================================
     CONTACT FORM — prevent default, show thanks
     ===================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Fade out form
      form.style.transition = 'opacity 0.3s ease';
      form.style.opacity = '0';

      setTimeout(function () {
        form.style.display = 'none';

        // Create and insert thank-you message
        var thanks = document.createElement('div');
        thanks.className = 'form-thanks';
        thanks.innerHTML =
          '<h3>Thank you!</h3>' +
          '<p>We have received your message and will be in touch shortly.</p>';
        form.parentNode.appendChild(thanks);
      }, 320);
    });
  }

  /* =====================================================
     SCROLL EVENT — batch all scroll handlers
     ===================================================== */
  let scrollTicking = false;

  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateScrollProgress();
        toggleBackToTop();
        updateNavbar();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  /* =====================================================
     INIT
     ===================================================== */
  window.addEventListener('scroll', onScroll, { passive: true });

  // Run once on load for initial state
  updateScrollProgress();
  toggleBackToTop();
  updateNavbar();

  initActiveNav();
  initReveal();
  initStatsCounter();
  initContactForm();

})();
