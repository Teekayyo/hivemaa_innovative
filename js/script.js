document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkToggle');
  if (!toggle) return;

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    toggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }

  toggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const icon = this.querySelector('i');
    
    if (document.body.classList.contains('dark')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { 
    threshold: 0.15, 
    rootMargin: '0px 0px -40px 0px' 
  });

  fadeEls.forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
});