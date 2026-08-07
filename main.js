// main.js - Priority Sure LLC Shared Interactive Behaviors

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
  }

  // Mobile Mega Menu Submenu Toggle
  const hasMegaItems = document.querySelectorAll('.nav-item.has-mega');
  hasMegaItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link && window.innerWidth < 1024) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('active');
      });
    }
  });

  // 3. FAQ Accordion Behavior
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Close all adjacent accordions in same group if desired
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          const btn = i.querySelector('.accordion-header');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }

      if (!isExpanded) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. Animated Counters via Intersection Observer
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseFloat(target.getAttribute('data-target'));
          const prefix = target.getAttribute('data-prefix') || '';
          const suffix = target.getAttribute('data-suffix') || '';
          let startValue = 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = endValue / steps;

          const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= endValue) {
              target.textContent = prefix + endValue.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              target.textContent = prefix + Math.floor(startValue).toLocaleString() + suffix;
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // 5. Scroll-Reveal Animation
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));
  }

  // 6. Contact Form Client-Side Handling Demo
  const contactForms = document.querySelectorAll('form.js-contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Client-side validation check
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';

      setTimeout(() => {
        alert('Thank you for contacting Priority Sure. A representative will reach out shortly.');
        form.reset();
        btn.disabled = false;
        btn.textContent = origText;
      }, 1200);

      /* 
       * BACKEND / WORDPRESS INTEGRATION NOTE:
       * Replace timeout above with fetch() call to WordPress WP REST API or custom backend endpoint:
       * 
       * fetch('/wp-json/contact-form-7/v1/contact-forms/FORM_ID/feedback', {
       *   method: 'POST',
       *   body: new FormData(form)
       * }).then(res => res.json()).then(data => { ... });
       */
    });
  });

  // 7. Live Chat Widget Stub
  const chatBtn = document.getElementById('chat-widget-trigger');
  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      console.log('Priority Sure Chat Widget Triggered. Mount live chat service (e.g., Intercom, Drift, Crisp) here.');
      alert('Live Chat Placeholder: Our team is available Mon-Fri 8am-6pm EST.');
    });
  }
});