// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('navLinks');
  
  if (btn && menu) {
    // Toggle menu on button click
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      menu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        btn.classList.remove('active');
        menu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        btn.classList.remove('active');
        menu.classList.remove('open');
      }
    });
  }

  // ===== SCROLL FADE-IN =====
  var fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ===== ACTIVE NAV LINK =====
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
