// catalog.js
(function() {
  // Category data for redirect cards
  const categories = [
    { 
      id: 'digital', 
      name: 'Digital', 
      icon: '</>', 
      desc: 'Templates, tools, assets — instant download',
      count: 12,
      badge: 'instant',
      redirect: '/digital'
    },
    { 
      id: 'physical', 
      name: 'Physical', 
      icon: '📦', 
      desc: 'Handmade goods, ceramics, textiles — ships worldwide',
      count: 8,
      badge: '3-5d ship',
      redirect: '/physical'
    },
    { 
      id: 'templates', 
      name: 'Templates', 
      icon: '📄', 
      desc: 'Notion, Excel, Docs — productivity ready',
      count: 6,
      badge: 'popular',
      redirect: '/templates'
    },
    { 
      id: 'design', 
      name: 'Design', 
      icon: '🎨', 
      desc: 'UI kits, icons, Procreate brushes',
      count: 5,
      badge: 'new',
      redirect: '/design'
    },
    { 
      id: 'home', 
      name: 'Home', 
      icon: '🏠', 
      desc: 'Ceramics, candles, organizers — minimal style',
      count: 4,
      badge: 'curated',
      redirect: '/home'
    },
    { 
      id: 'stationery', 
      name: 'Stationery', 
      icon: '✎', 
      desc: 'Notebooks, pens, planners — analog tools',
      count: 3,
      badge: 'limited',
      redirect: '/stationery'
    },
    { 
      id: 'bundles', 
      name: 'Bundles', 
      icon: '📦📦', 
      desc: 'Curated packs — save up to 40%',
      count: 2,
      badge: 'sale',
      redirect: '/bundles'
    },
    { 
      id: 'new', 
      name: 'New Arrivals', 
      icon: '✨', 
      desc: 'Fresh drops — this week only',
      count: 4,
      badge: 'just in',
      redirect: '/new'
    }
  ];

  const gridEl = document.getElementById('redirectGrid');
  const quickLinksEl = document.getElementById('quickLinks');
  const searchInput = document.getElementById('searchInput');
  const toastEl = document.getElementById('toast');
  let toastTimeout = null;

  // Toast function
  function showToast(msg, isRedirect = false) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, isRedirect ? 3000 : 2000);
  }

  // Render grid cards
  function renderGrid(filteredCats) {
    if (!gridEl) return;
    
    gridEl.innerHTML = filteredCats.map(cat => `
      <div class="redirect-card" data-category="${cat.id}" data-redirect="${cat.redirect}">
        <div class="card-icon">${cat.icon}</div>
        <div class="card-title">
          ${cat.name}
          <span class="arrow-hint">→</span>
        </div>
        <div class="card-desc">${cat.desc}</div>
        <div class="card-meta">
          <span class="card-count">${cat.count} products</span>
          <span class="card-badge">${cat.badge}</span>
        </div>
      </div>
    `).join('');

    // Attach click handlers
    document.querySelectorAll('.redirect-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const category = card.dataset.category;
        const redirect = card.dataset.redirect;
        const catData = categories.find(c => c.id === category);
        
        showToast(`redirecting to ${redirect} …`, true);
        
        // Simulate redirect (in real app: window.location.href = redirect)
        setTimeout(() => {
          console.log(`Redirect to: ${redirect}`);
          // window.location.href = redirect; // Uncomment for actual redirect
        }, 800);
      });
    });
  }

  // Render quick links
  function renderQuickLinks(cats) {
    if (!quickLinksEl) return;
    
    quickLinksEl.innerHTML = cats.slice(0, 8).map((cat, idx) => `
      <div class="quick-link" data-redirect="${cat.redirect}">
        <span class="key">${idx + 1}</span>
        <span>${cat.name}</span>
      </div>
    `).join('');

    document.querySelectorAll('.quick-link').forEach(link => {
      link.addEventListener('click', () => {
        const redirect = link.dataset.redirect;
        showToast(`quick nav: ${redirect}`, true);
      });
    });
  }

  // Filter function
  function filterCategories(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return categories;
    
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(term) || 
      cat.desc.toLowerCase().includes(term) ||
      cat.badge.toLowerCase().includes(term)
    );
  }

  // Search handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const filtered = filterCategories(e.target.value);
      renderGrid(filtered);
      
      if (filtered.length === 0) {
        showToast('no matching categories');
      }
    });
  }

  // Initialize
  renderGrid(categories);
  renderQuickLinks(categories);

  // Cart button
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => showToast('cart opened (0 items)'));
  }

  // Featured button
  const featuredBtn = document.getElementById('featuredBtn');
  if (featuredBtn) {
    featuredBtn.addEventListener('click', () => {
      showToast('loading digital essentials collection…', true);
      const digitalCard = document.querySelector('[data-category="digital"]');
      if (digitalCard) digitalCard.click();
    });
  }

  // Keyboard shortcuts (1-8)
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '1' && key <= '8') {
      const index = parseInt(key) - 1;
      if (index < categories.length) {
        const cat = categories[index];
        showToast(`keyboard nav: ${cat.redirect}`, true);
        
        // Highlight the corresponding card
        const card = document.querySelector(`[data-category="${cat.id}"]`);
        if (card) {
          card.style.transition = 'all 0.15s';
          card.style.background = 'var(--surface)';
          setTimeout(() => card.style.background = '', 200);
        }
      }
    }
    
    // ESC to clear search
    if (e.key === 'Escape' && searchInput) {
      searchInput.value = '';
      renderGrid(categories);
      showToast('search cleared');
    }
  });

  // Expose showToast globally if needed
  window.showToast = showToast;

  // Add hover effect for stats (just for polish)
  document.querySelectorAll('.stat-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.borderColor = 'var(--green)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.borderColor = 'var(--border2)';
    });
  });

  console.log('✓ Catalog redirect page loaded — press 1-8 for quick navigation');
})();