/* ========================================
   VIDEO EDITOR PORTFOLIO - MAIN JAVASCRIPT
   Interactive & Experimental Features
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavigation();
  initScrollReveal();
  initProjectFilter();
  initSmoothScroll();
  initParallaxEffects();
});

/* ========================================
   CUSTOM CURSOR
   ======================================== */

function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!cursor || !follower) return;

  // Check if device supports hover (not touch)
  if (window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
      // Main cursor - fast follow
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Follower - slower follow
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea, select');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  } else {
    // Hide custom cursor on touch devices
    cursor.style.display = 'none';
    follower.style.display = 'none';
  }
}

/* ========================================
   NAVIGATION
   ======================================== */

function initNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (!nav || !navToggle || !navLinks) return;

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Hide/show navigation on scroll
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinkItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ========================================
   SCROLL REVEAL ANIMATION
   ======================================== */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length === 0) return;

  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // Also animate project cards on load
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
}

/* ========================================
   PROJECT FILTER
   ======================================== */

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Filter projects with animation
      projectCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Add stagger animation
          card.style.transitionDelay = `${index * 0.05}s`;
        } else {
          card.classList.add('hidden');
          card.style.transitionDelay = '0s';
        }
      });
    });
  });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed nav

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   FORM VALIDATION
   ======================================== */

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  let error = formGroup.querySelector('.error-message');

  if (!error) {
    error = document.createElement('span');
    error.className = 'error-message';
    error.style.cssText = 'color: #e63946; font-size: 0.8rem; margin-top: 0.5rem; display: block;';
    formGroup.appendChild(error);
  }

  error.textContent = message;
  input.style.borderColor = '#e63946';
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const error = formGroup.querySelector('.error-message');

  if (error) {
    error.remove();
  }

  input.style.borderColor = '';
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background: rgba(230, 57, 70, 0.1);
    border: 1px solid rgba(230, 57, 70, 0.3);
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 1rem;
    animation: fadeInUp 0.5s ease;
  `;
  successDiv.innerHTML = `
    <h3 style="color: #e63946; margin-bottom: 0.5rem;">Message Sent!</h3>
    <p style="color: #a1a1aa;">Thank you for reaching out. I'll respond within 24-48 hours.</p>
  `;

  form.appendChild(successDiv);

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.style.opacity = '0';
    setTimeout(() => successDiv.remove(), 300);
  }, 5000);
}

/* ========================================
   LAZY LOADING
   ======================================== */



/* ========================================
   PARALLAX EFFECTS
   ======================================== */

function initParallaxEffects() {
  const heroSection = document.querySelector('.hero');

  if (!heroSection) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = heroSection.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
  });
}

/* ========================================
   CLIENT LOGOS INFINITE SCROLL
   ======================================== */



/* ========================================
   VIDEO PLAYER ENHANCEMENT
   ======================================== */



/* ========================================
   UTILITIES
   ======================================== */

// Debounce function for performance
function debounce(func, wait = 20) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll percentage
function getScrollPercentage() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
}

/* ========================================
   PROJECT PAGE SPECIFIC
   ======================================== */

// For project detail pages
if (document.querySelector('.project-hero')) {
  initProjectPage();
}

function initProjectPage() {
  // Add back button functionality
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (document.referrer.includes(window.location.hostname)) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }
}


const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const emailInput = document.getElementById("email");

  emailInput.addEventListener("input", () => clearError(emailInput));

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address.");
      emailInput.focus();
      return;
    }
    clearError(emailInput);

    const submitButton = contactForm.querySelector(".form-submit");
    const originalButtonHTML = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = {
      name: document.getElementById("name").value,
      email: emailInput.value,
      company: document.getElementById("company").value,
      projectType: document.getElementById("project-type").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };

        try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyzXQ30ILWQ3OeDxjfl-aub7rOnk0yaQufdPB0J75C40HPpbeSG84oEb22HgZaqo4ig/exec",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(formData)
        }
      );
      const result = await response.json();
      if (result.result !== "success") throw new Error("Script returned failure");

      contactForm.reset();
      showSuccessMessage(contactForm);
      submitButton.innerHTML = "Message Sent ✓";

      setTimeout(() => {
        submitButton.innerHTML = originalButtonHTML;
        submitButton.disabled = false;
      }, 3000);

    } catch (error) {
      console.error("Form submission error:", error);

      submitButton.innerHTML = "Failed to Send";

      setTimeout(() => {
        submitButton.innerHTML = originalButtonHTML;
        submitButton.disabled = false;
      }, 3000);
    }
  });
}

/* ========================================
   CONSOLE WELCOME MESSAGE
   ======================================== */

console.log('%c🎬 Video Editor Portfolio', 'font-size: 24px; font-weight: bold; color: #e63946;');
console.log('%cBuilt with passion for visual storytelling', 'font-size: 14px; color: #a1a1aa;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #333;');
console.log('Want to collaborate? Let\'s create something amazing together.');
