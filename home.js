/* ============================================================
   BULLZ EYE BILLIARDS — Home Page JavaScript
   Handles: Contact form submission
   ============================================================ */

(function initContactForm() {
  const form = document.getElementById('homeContactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const phone   = form.querySelector('[name="phone"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    // Open WhatsApp with pre-filled message
    const waMsg = `Hi Bullz Eye Billiards! I am ${name} (${phone}). ${message}`;
    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;

    // Show success banner
    const successEl = document.getElementById('homeFormSuccess');
    if (successEl) {
      successEl.style.display = 'block';
      setTimeout(() => { successEl.style.display = 'none'; }, 5000);
    }

    window.open(waUrl, '_blank');
    form.reset();
  });
})();
