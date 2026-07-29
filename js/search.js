document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  if (!searchInput || !searchBtn) return;

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
      document.querySelectorAll('.article-card').forEach(card => {
        card.style.border = 'none';
        card.style.opacity = '1';
      });
      const msg = document.querySelector('.search-result-msg');
      if (msg) msg.remove();
      return;
    }

    const cards = document.querySelectorAll('.article-card');
    let found = 0;
    
    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const excerpt = card.querySelector('p')?.textContent?.toLowerCase() || '';
      const tags = card.dataset.tags?.toLowerCase() || '';
      
      if (title.includes(query) || excerpt.includes(query) || tags.includes(query)) {
        card.style.border = '2px solid var(--primary)';
        card.style.opacity = '1';
        found++;
      } else {
        card.style.border = 'none';
        card.style.opacity = '0.3';
      }
    });

    const existingMsg = document.querySelector('.search-result-msg');
    if (found === 0) {
      if (!existingMsg) {
        const msg = document.createElement('p');
        msg.className = 'search-result-msg';
        msg.style.textAlign = 'center';
        msg.style.marginTop = '20px';
        msg.style.color = 'var(--primary)';
        msg.textContent = 'No articles found. Try a different keyword.';
        document.querySelector('.card-grid')?.after(msg);
      }
    } else {
      existingMsg?.remove();
    }
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
});