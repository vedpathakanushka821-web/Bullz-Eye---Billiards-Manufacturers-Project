/* ============================================================
   BULLZ EYE BILLIARDS — Gallery Page JavaScript
   Handles: Category filters, lightbox
   ============================================================ */

// --- Category filter ---
(function initGalleryFilter() {
  const tabs  = document.querySelectorAll('.gallery-page .filter-tab');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      items.forEach(item => {
        const match = filter === 'All' || item.dataset.category === filter;
        item.style.display = match ? '' : 'none';
      });
    });
  });
})();

// --- Lightbox ---
(function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightboxImg');
  const lbCat       = document.getElementById('lightboxCat');
  const lbTitle     = document.getElementById('lightboxTitle');
  const lbClose     = document.getElementById('lightboxClose');
  if (!lightbox || !lbImg) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img    = item.querySelector('img');
      const cat    = item.dataset.category || '';
      const title  = item.dataset.title || '';
      lbImg.src    = img.src;
      lbImg.alt    = title;
      if (lbCat)   lbCat.textContent   = cat;
      if (lbTitle) lbTitle.textContent = title;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
})();
