/* ============================================================
   BULLZ EYE BILLIARDS — Products Page JavaScript
   Handles: Category filter tabs, card show/hide with animation
   ============================================================ */

(function initProductFilter() {
  const tabs   = document.querySelectorAll('.filter-tab');
  const cards  = document.querySelectorAll('.product-card[data-category]');
  const noRes  = document.querySelector('.no-results');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const match = filter === 'All' || card.dataset.category === filter;
        if (match) {
          card.style.display = '';
          card.classList.add('reveal');
          // Trigger re-reveal animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 10);
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
    });
  });
})();
