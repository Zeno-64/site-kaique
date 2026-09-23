(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // Cabeçalho ganha fundo ao rolar
  var header = document.querySelector('.header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Revelação suave dos blocos ao entrarem na tela
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Conversões do Meta Pixel em todo clique para o WhatsApp.
  // Os links abrem em nova aba, então o evento é enviado sem precisar atrasar o redirecionamento.
  document.addEventListener('click', function (event) {
    var cta = event.target.closest('[data-cta]');
    if (!cta || typeof window.fbq !== 'function') return;
    window.fbq('track', 'Lead', { content_name: cta.getAttribute('data-cta') });
    window.fbq('track', 'Contact');
  });

  // Vídeos do YouTube carregados só quando a pessoa clica (página mais leve)
  document.querySelectorAll('.video__btn[data-yt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + btn.getAttribute('data-yt') + '?autoplay=1&rel=0';
      iframe.title = btn.getAttribute('aria-label');
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      btn.replaceWith(iframe);
    });
  });

  // Carrossel das avaliações (mobile)
  var track = document.querySelector('.reviews');
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var direction = btn.getAttribute('data-scroll') === 'next' ? 1 : -1;
      track.scrollBy({ left: direction * track.clientWidth * 0.84, behavior: 'smooth' });
    });
  });

  // Avaliação ampliada
  var dialog = document.querySelector('.lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    var dialogImg = dialog.querySelector('img');
    document.querySelectorAll('.review').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        dialogImg.src = img.currentSrc || img.src;
        dialogImg.alt = img.alt;
        dialog.showModal();
      });
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || event.target.closest('.lightbox__close')) dialog.close();
    });
  }
})();
