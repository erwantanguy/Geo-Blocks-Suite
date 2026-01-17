/* GEO Blocks Suite - Lightbox */
(function(){
  function initLightbox() {
    var body = document.body;
    if (!body) return;

    body.addEventListener('click', function(e) {
      var link = e.target && (e.target.closest ? e.target.closest('.geo-lightbox') : null);
      if (!link) return;

      e.preventDefault();
      var src = link.getAttribute('data-geo-src') || link.getAttribute('href') || '';
      var alt = '';
      try {
        alt = (link.querySelector && link.querySelector('img') && link.querySelector('img').getAttribute('alt')) || '';
      } catch (err) {
        alt = '';
      }

      var existing = document.querySelectorAll('.geo-modal');
      Array.prototype.forEach.call(existing, function(el) {
        el.parentNode.removeChild(el);
      });

      var modal = document.createElement('div');
      modal.className = 'geo-modal';
      modal.innerHTML = '<div class="geo-modal-content" role="dialog" aria-modal="true"><button class="geo-close" aria-label="Fermer">&times;</button><img src="' + src.replace(/"/g, '&quot;') + '" alt="' + String(alt).replace(/"/g, '&quot;') + '"></div>';
      document.body.appendChild(modal);

      var closeBtn = modal.querySelector('.geo-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          if (modal.parentNode) modal.parentNode.removeChild(modal);
        });
      }
      modal.addEventListener('click', function(ev) {
        if (ev.target === modal && modal.parentNode) modal.parentNode.removeChild(modal);
      });

      var escHandler = function(ev) {
        if (ev.key === 'Escape') {
          if (modal.parentNode) modal.parentNode.removeChild(modal);
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
