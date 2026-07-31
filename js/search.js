// ===== FULL SITE SEARCH =====
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchBtn) return;

    // Search index of all pages
    const sitePages = [
        { title: 'Home', url: 'index.html', keywords: 'home hivemaa agritech agriculture technology' },
        { title: 'About', url: 'about.html', keywords: 'about mission vision values hivemaa agritech' },
        { title: 'News', url: 'news.html', keywords: 'news latest updates agricultural innovations' },
        { title: 'Articles', url: 'articles.html', keywords: 'articles blog posts insights analysis research' },
        { title: 'Opportunities', url: 'opportunities.html', keywords: 'opportunities scholarships jobs internships grants fellowships competitions' },
        { title: 'Scholarships', url: 'scholarships.html', keywords: 'scholarships funding study education agritech' },
        { title: 'Jobs', url: 'jobs.html', keywords: 'jobs career employment agritech agriculture' },
        { title: 'Internships', url: 'internships.html', keywords: 'internships training experience students' },
        { title: 'Competitions', url: 'competitions.html', keywords: 'competitions prizes pitch innovation' },
        { title: 'Grants', url: 'grants.html', keywords: 'grants funding research startup' },
        { title: 'Fellowships', url: 'fellowships.html', keywords: 'fellowships leadership mentorship' },
        { title: 'Resources', url: 'resources.html', keywords: 'resources guides templates downloads videos' },
        { title: 'Community', url: 'community.html', keywords: 'community social instagram facebook linkedin whatsapp' },
        { title: 'Contact', url: 'contact.html', keywords: 'contact phone email message support' }
    ];

    // Article search function (for content inside articles)
    async function searchArticles(query) {
        try {
            const response = await fetch('js/articles-data.js');
            const data = await response.text();
            const match = data.match(/const articlesData = (\[[\s\S]*?\]);/);
            if (match) {
                const articles = eval(match[1]);
                return articles
                    .filter(a => 
                        a.title.toLowerCase().includes(query) || 
                        a.excerpt.toLowerCase().includes(query) ||
                        a.tags.some(t => t.toLowerCase().includes(query))
                    )
                    .map(a => ({
                        title: a.title,
                        url: a.url || `articles/article-${a.id}.html`,
                        excerpt: a.excerpt,
                        type: 'article'
                    }));
            }
        } catch (e) {
            console.log('Error loading articles:', e);
        }
        return [];
    }

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        // Remove old results
        const oldResults = document.querySelector('.search-results');
        if (oldResults) oldResults.remove();

        if (!query) return;

        // Search site pages
        const pageResults = sitePages.filter(page => 
            page.title.toLowerCase().includes(query) ||
            page.keywords.toLowerCase().includes(query)
        );

        // Show results
        showResults(query, pageResults);
    }

    async function showResults(query, pageResults) {
        // Also search articles
        const articleResults = await searchArticles(query);
        const allResults = [...pageResults, ...articleResults];

        if (allResults.length === 0) {
            const msg = document.createElement('div');
            msg.className = 'search-results';
            msg.style.cssText = `
                background: var(--card-bg);
                border-radius: 12px;
                padding: 24px;
                margin-top: 16px;
                box-shadow: var(--shadow);
                border: 1px solid rgba(0,0,0,0.05);
                text-align: center;
                color: var(--text);
            `;
            msg.innerHTML = `
                <p style="opacity: 0.6;">🔍 No results found for "<strong>${query}</strong>"</p>
                <p style="font-size: 0.9rem; opacity: 0.4; margin-top: 8px;">Try searching for: agriculture, scholarships, AI, farming, or opportunities</p>
            `;
            document.querySelector('.search-wrap').after(msg);
            return;
        }

        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-results';
        resultDiv.style.cssText = `
            background: var(--card-bg);
            border-radius: 12px;
            padding: 24px;
            margin-top: 16px;
            box-shadow: var(--shadow);
            border: 1px solid rgba(0,0,0,0.05);
            max-height: 400px;
            overflow-y: auto;
        `;

        let html = `<p style="font-size: 0.85rem; opacity: 0.5; margin-bottom: 16px;">Found ${allResults.length} result(s) for "<strong>${query}</strong>"</p>`;
        html += '<div style="display: flex; flex-direction: column; gap: 8px;">';

        allResults.forEach(result => {
            const typeIcon = result.type === 'article' ? '📄' : '📌';
            html += `
                <a href="${result.url}" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 8px;
                    background: var(--light-grey);
                    text-decoration: none;
                    color: var(--text);
                    transition: 0.2s;
                " onmouseover="this.style.background='var(--primary)'; this.style.color='white';" 
                   onmouseout="this.style.background='var(--light-grey)'; this.style.color='var(--text)';">
                    <span style="font-size: 1.2rem;">${typeIcon}</span>
                    <div>
                        <div style="font-weight: 600;">${result.title}</div>
                        ${result.excerpt ? `<div style="font-size: 0.85rem; opacity: 0.6;">${result.excerpt.substring(0, 80)}...</div>` : ''}
                    </div>
                </a>
            `;
        });

        html += '</div>';
        resultDiv.innerHTML = html;
        document.querySelector('.search-wrap').after(resultDiv);
    }

    // Search on click or Enter
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-wrap') && !e.target.closest('.search-results')) {
            const results = document.querySelector('.search-results');
            if (results) results.remove();
        }
    });
});
