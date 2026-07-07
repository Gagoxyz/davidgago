document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Active nav link on scroll
  function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    '.trayectoria-card, .proyecto-card, .skill-item, .contacto-item, .sobre-mi-text p, .sobre-mi-signature'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Smooth parallax effect on hero
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
});
