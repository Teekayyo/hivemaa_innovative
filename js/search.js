// ===== SEARCH FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  if (!searchInput || !searchBtn) {
    console.log('Search elements not found');
    return;
  }

  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.article-card');
    
    // If search is empty, show all cards
    if (!query) {
      cards.forEach(card => {
        card.style.display = 'block';
        card.style.border = 'none';
        card.style.opacity = '1';
      });
      // Remove "no results" message if it exists
      const msg = document.querySelector('.search-result-msg');
      if (msg) msg.remove();
      return;
    }

    let found = 0;
    
    cards.forEach((card) => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const excerpt = card.querySelector('p')?.textContent?.toLowerCase() || '';
      const tags = card.dataset.tags?.toLowerCase() || '';
      
      if (title.includes(query) || excerpt.includes(query) || tags.includes(query)) {
        card.style.display = 'block';
        card.style.border = '2px solid var(--primary)';
        card.style.opacity = '1';
        found++;
      } else {
        card.style.display = 'none';
        card.style.border = 'none';
        card.style.opacity = '0.3';
      }
    });

    // Remove existing message
    const existingMsg = document.querySelector('.search-result-msg');
    if (existingMsg) existingMsg.remove();

    // Show "no results" message
    if (found === 0) {
      const msg = document.createElement('p');
      msg.className = 'search-result-msg';
      msg.style.textAlign = 'center';
      msg.style.marginTop = '20px';
      msg.style.padding = '20px';
      msg.style.color = 'var(--primary)';
      msg.style.fontWeight = '500';
      msg.textContent = '🔍 No articles found. Try a different keyword.';
      
      const grid = document.querySelector('.card-grid');
      if (grid) grid.after(msg);
    }
  }

  // Search button click
  searchBtn.addEventListener('click', performSearch);

  // Enter key press
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  // Optional: Live search as you type (comment out if you don't want this)
  // searchInput.addEventListener('input', performSearch);
});
