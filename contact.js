/* ============================================================
   BULLZ EYE BILLIARDS — Contact Page JavaScript
   Handles: Contact form submission via WhatsApp
   ============================================================ */

(function initContactForm() {
  const form = document.getElementById('contactPageForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const phone   = form.querySelector('[name="phone"]').value.trim();
    const city    = form.querySelector('[name="city"]').value.trim();
    const product = form.querySelector('[name="product"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    const waMsg = [
      `Hi Bullz Eye Billiards!`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      `Interested in: ${product}`,
      message ? `Message: ${message}` : ''
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;

    const successEl = document.getElementById('contactFormSuccess');
    if (successEl) {
      successEl.style.display = 'block';
      setTimeout(() => { successEl.style.display = 'none'; }, 6000);
    }

    window.open(waUrl, '_blank');
    form.reset();
  });
})();
