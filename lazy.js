// ─────────────────────────────────────────────
// lazy.js: LQIP + IntersectionObserver + crossfade
// ─────────────────────────────────────────────

function carregar(real) {
  const img = new Image();
  img.onload = () => {
    real.src = img.src;
    real.closest('.lqip').classList.add('loaded'); // crossfade via CSS transition
  };
  img.onerror = () => console.warn('Erro ao carregar:', real.dataset.src);
  img.src = real.dataset.src;
}

const imagens = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      carregar(entry.target);
      observer.unobserve(entry.target); // carregou: para de observar
    });
  }, { rootMargin: '200px' }); // começa 200px antes de aparecer

  imagens.forEach((img) => observer.observe(img));
} else {
  // browsers muito antigos: carrega tudo de uma vez
  imagens.forEach(carregar);
}
