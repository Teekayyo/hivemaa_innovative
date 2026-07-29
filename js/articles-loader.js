// js/articles-loader.js
document.addEventListener('DOMContentLoaded', function() {
  const articlesGrid = document.getElementById('articlesGrid');
  if (!articlesGrid) return;

  function renderArticles(articles) {
    articlesGrid.innerHTML = '';
    
    articles.forEach(article => {
      const card = document.createElement('article');
      card.className = 'card article-card fade-up';
      card.dataset.tags = article.tags.join(' ');
      
      let icon = 'fa-newspaper';
      if (article.category === 'Technology') icon = 'fa-microchip';
      else if (article.category === 'Innovation') icon = 'fa-lightbulb';
      else if (article.category === 'Data') icon = 'fa-chart-line';
      
      card.innerHTML = `
        <div class="card-img">
          <i class="fas ${icon}"></i>
        </div>
        <div class="card-body">
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <div class="meta">
            <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
            <span><i class="far fa-clock"></i> ${article.readTime}</span>
            <span><i class="far fa-user"></i> ${article.author}</span>
          </div>
          <div class="tag-group">
            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <a href="${article.url}" class="btn btn-primary" style="margin-top: 16px; width: 100%; justify-content: center;">
            <i class="fas fa-book-open"></i> Read Article
          </a>
        </div>
      `;
      
      articlesGrid.appendChild(card);
    });

    setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
  }

  renderArticles(articlesData);
});
