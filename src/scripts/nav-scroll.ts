// Toggle .is-scrolled on the nav once the user scrolls past 16px.

const SCROLL_THRESHOLD = 16;

const init = (): void => {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  let ticking = false;
  const update = (): void => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    nav.classList.toggle('is-scrolled', scrolled);
    ticking = false;
  };

  const onScroll = (): void => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
