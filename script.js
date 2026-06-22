/* ============================================================
   ASM Auto Repairs — script.js
   Template A: Auto / Trades / Industrial
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Footer year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     Scroll Progress Bar
  ---------------------------------------------------------- */
  const progressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  /* ----------------------------------------------------------
     Nav: transparent → scrolled
  ---------------------------------------------------------- */
  const nav = document.getElementById('mainNav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /* ----------------------------------------------------------
     Back to Top
  ---------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
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

  /* ----------------------------------------------------------
     Combined scroll handler
  ---------------------------------------------------------- */
  window.addEventListener('scroll', function () {
    updateScrollProgress();
    updateNav();
    updateBackToTop();
  }, { passive: true });

  // Initial call
  updateScrollProgress();
  updateNav();
  updateBackToTop();

  /* ----------------------------------------------------------
     Mobile Nav — Hamburger Overlay
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const overlayClose = document.getElementById('overlayClose');
  const overlayLinks = document.querySelectorAll('.overlay-link');

  function openOverlay() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeOverlay() {
    if (!mobileOverlay) return;
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openOverlay);
  if (overlayClose) overlayClose.addEventListener('click', closeOverlay);

  overlayLinks.forEach(function (link) {
    link.addEventListener('click', closeOverlay);
  });

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('open')) {
      closeOverlay();
    }
  });

  /* ----------------------------------------------------------
     Active Nav Link — IntersectionObserver
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('active-link');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active-link');
              }
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ----------------------------------------------------------
     Scroll Reveal — IntersectionObserver
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     Stats Count-Up Animation
  ---------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const duration = 1500;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.floor(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    const statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statNumbers.forEach(function (el) {
      statsObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------
     Contact Form — Prevent submit + show thank you
  ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formThanks = document.getElementById('formThanks');

  if (contactForm && formThanks) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Fade form out
      contactForm.style.transition = 'opacity 0.3s ease';
      contactForm.style.opacity = '0';

      setTimeout(function () {
        contactForm.style.display = 'none';
        formThanks.style.display = 'block';
        formThanks.style.opacity = '0';
        formThanks.style.transition = 'opacity 0.3s ease';
        // Trigger reflow
        void formThanks.offsetHeight;
        formThanks.style.opacity = '1';
      }, 300);
    });
  }

  /* ----------------------------------------------------------
     Smooth scroll for all anchor links (fallback for older browsers)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

})();
