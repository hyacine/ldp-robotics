// main.js is intentionally left blank.

document.addEventListener('DOMContentLoaded', function () {
  // Sous-menu toggle (existant)
  document.querySelectorAll('.menu li.has-submenu > a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('open');
      const submenu = parent.querySelector('.submenu');
      if (submenu) {
        submenu.style.display = parent.classList.contains('open') ? 'block' : 'none';
      }
    });
  });

  // Lightbox simple pour ouvrir les images au clic
  const selectors = '.member-avatar, .team-grid img, .grid img';
  function createLightbox(src, alt) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-wrap" role="dialog" aria-label="${alt || 'Image'}">
        <img class="lightbox-img" src="${src}" alt="${alt || ''}">
        <button class="lightbox-close" aria-label="Fermer">✕</button>
      </div>
    `;
    document.body.appendChild(overlay);
    // close handlers
    function remove() {
      document.removeEventListener('keydown', onKey);
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 180);
    }
    function onKey(e) { if (e.key === 'Escape') remove(); }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('lightbox-close')) remove();
    });
    document.addEventListener('keydown', onKey);
    // small delay to trigger CSS transition
    requestAnimationFrame(() => overlay.classList.add('open'));
  }

  document.querySelectorAll(selectors).forEach(img => {
    // some images may be decorative — skip if no src
    if (!img.src) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      createLightbox(img.src, img.alt || '');
    });
  });
});