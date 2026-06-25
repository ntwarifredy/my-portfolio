document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADER =====
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = '<div class="loader-spinner"></div>';
  document.body.prepend(loader);
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });

  // ===== CUSTOM CURSOR =====
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  if (cursor && cursorBlur) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorBlur.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      });
      document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform += ' scale(2)';
          cursorBlur.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
          cursorBlur.style.transform = cursorBlur.style.transform.replace(' scale(1.5)', '');
        });
      });
    }
  }

  // ===== TYPING EFFECT =====
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const titles = [
      'Full-Stack Developer',
      'Software Engineer',
      'UI/UX Enthusiast',
      'Open Source Contributor',
      'Cloud Architect'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = titles[titleIndex];
      if (!isDeleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
        setTimeout(typeEffect, 80);
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          setTimeout(typeEffect, 300);
          return;
        }
        setTimeout(typeEffect, 40);
      }
    }
    typeEffect();
  }

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  // Scroll effects
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Navbar background
    navbar?.classList.toggle('scrolled', scrollY > 50);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < bottom);
      }
    });
  });

  // ===== SCROLL REVEAL (Intersection Observer) =====
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  aosElements.forEach(el => aosObserver.observe(el));

  // ===== SKILL BAR ANIMATION =====
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  // ===== STAT COUNTER =====
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 25);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statObserver.observe(el));

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate sending (replace with actual form action)
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 1500);
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
