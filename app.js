/* ==========================================================================
   APP.JS - INTERACTIVE SCRIPTS & DYNAMIC BEHAVIORS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. FLOATING HEADER SCROLL ACTION
     ========================================================================== */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* ==========================================================================
     2. MOBILE NAVIGATION OVERLAY
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on clicking any navigation item
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     3. INTERACTIVE CSS MOBILE PHONE MOCKUP
     ========================================================================== */
  const screens = document.querySelectorAll('.app-screen');
  const navTabs = document.querySelectorAll('.app-nav-bar .app-nav-tab');
  
  // Function to switch app screens inside the mockup phone
  function switchAppScreen(targetScreenId) {
    // 1. Deactivate all screens
    screens.forEach(screen => {
      screen.classList.remove('active');
    });
    
    // 2. Activate target screen
    const targetScreen = document.getElementById(targetScreenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }

    // 3. Update tab bar active highlight state
    navTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('data-target') === targetScreenId) {
        tab.classList.add('active');
      }
    });
  }

  // Bind click handlers to app bar tabs
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-target');
      switchAppScreen(target);
    });
  });

  // Flow Triggers: Clicking app service items goes to Booking Screen
  const mockBookingTriggers = document.querySelectorAll('.mock-trigger-booking');
  mockBookingTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      switchAppScreen('screen-booking');
    });
  });

  // Flow Triggers: Clicking "Combos banner" inside App goes to Combos Screen
  const mockCombosTriggers = document.querySelectorAll('.mock-trigger-combos');
  mockCombosTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      switchAppScreen('screen-combos');
    });
  });

  // Flow Triggers: Clicking Back arrows inside App goes back to Home Screen
  const mockBackToHomeTriggers = document.querySelectorAll('.mock-back-to-home');
  mockBackToHomeTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      switchAppScreen('screen-home');
    });
  });

  // Flow Triggers: Clicking "Book in 60 Secs" in App booking form goes to Confirm Screen
  const btnConfirmBooking = document.getElementById('mock-btn-confirm');
  if (btnConfirmBooking) {
    btnConfirmBooking.addEventListener('click', () => {
      switchAppScreen('screen-confirm');
    });
  }

  // Interactive booking time pills
  const bookingDatePills = document.querySelectorAll('.app-date-pill');
  bookingDatePills.forEach(pill => {
    pill.addEventListener('click', () => {
      bookingDatePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  const bookingTimePills = document.querySelectorAll('.app-time-pill');
  bookingTimePills.forEach(pill => {
    pill.addEventListener('click', () => {
      bookingTimePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });


  /* ==========================================================================
     4. HERO SPARKLE CANVAS ENGINE
     ========================================================================== */
  const canvas = document.getElementById('sparkle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 40;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class SparkleParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        // Start near bottom or random
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // 1 to 4px bubbles
        this.speedY = -(Math.random() * 0.5 + 0.1); // float upwards gently
        this.speedX = (Math.random() * 0.4 - 0.2); // subtle drift
        this.alpha = Math.random() * 0.5 + 0.1; // initial soft opacity
        this.fadeRate = Math.random() * 0.005 + 0.002;
        this.sparkle = Math.random() > 0.6; // some are tiny four-point stars
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        // Sparkle shimmer oscillation
        if (this.sparkle) {
          this.alpha += (Math.random() * 0.2 - 0.1);
          if (this.alpha < 0.1) this.alpha = 0.1;
          if (this.alpha > 0.8) this.alpha = 0.8;
        }

        // Float limit reset
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height; // restart at bottom
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#FFFFFF';
        
        if (this.sparkle && this.size > 2) {
          // Draw a small sparkling star
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - this.size * 2);
          ctx.quadraticCurveTo(this.x, this.y, this.x + this.size * 2, this.y);
          ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + this.size * 2);
          ctx.quadraticCurveTo(this.x, this.y, this.x - this.size * 2, this.y);
          ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - this.size * 2);
          ctx.closePath();
          
          // Accent glow color
          ctx.fillStyle = '#FFB300';
          ctx.fill();
        } else {
          // Draw standard clean floating bubble
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new SparkleParticle());
    }

    function animateSparkles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateSparkles);
    }

    animateSparkles();
  }


  /* ==========================================================================
     5. REVEAL ON SCROLL INTERSECTION OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.15, // trigger when 15% visible
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => {
      el.classList.add('active');
    });
  }


  /* ==========================================================================
     6. FAQ ACCORDION TRANSITIONS
     ========================================================================== */
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(questionBtn => {
    questionBtn.addEventListener('click', () => {
      const faqItem = questionBtn.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isAlreadyActive = faqItem.classList.contains('active');

      // 1. Close all active FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // 2. Toggle clicked FAQ
      if (!isAlreadyActive) {
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });


  /* ==========================================================================
     7. TESTIMONIAL SLIDER / CAROUSEL
     ========================================================================== */
  const reviewsTrack = document.getElementById('reviews-track');
  const dots = document.querySelectorAll('#slider-dots .dot');
  
  if (reviewsTrack && dots.length > 0) {
    let currentSlideIndex = 0;
    const totalSlides = dots.length;
    let autoSlideInterval;

    function goToSlide(index) {
      currentSlideIndex = index;
      reviewsTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
      
      // Update dot highlights
      dots.forEach(d => d.classList.remove('active'));
      dots[currentSlideIndex].classList.add('active');
    }

    function autoSlide() {
      let nextIndex = (currentSlideIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }

    // Auto-advance every 5 seconds
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(autoSlide, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
    }

    // Bind dots click handlers
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
        startAutoSlide();
      });
    });

    // Start auto slide
    startAutoSlide();

    // Pause auto slide when cursor sits on reviews area
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      reviewsSection.addEventListener('mouseenter', stopAutoSlide);
      reviewsSection.addEventListener('mouseleave', startAutoSlide);
    }
  }


  /* ==========================================================================
     8. ACTIVE NAVIGATION LINK INDICATORS ON SCROLL
     ========================================================================== */
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let scrollPos = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Trigger initial execution


  /* ==========================================================================
     9. DOWNLOAD CTAS CONVERSION SIMULATOR
     ========================================================================== */
  const storeCTAs = document.querySelectorAll('a[href="#download"]');
  storeCTAs.forEach(cta => {
    cta.addEventListener('click', (e) => {
      // If it's the specific target element anchor, don't interrupt scroll
      if (cta.getAttribute('href') === '#download') return;
      
      e.preventDefault();
      const targetElement = document.getElementById('download');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
