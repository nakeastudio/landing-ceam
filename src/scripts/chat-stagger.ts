// Hero chat mockup — one-shot intro animation.
// Plays once on load: user → typing → bot (1 line) → image → followup.
// After the sequence completes, stays in the final state with focus on the image.
// Pauses while document.hidden === true so the animation runs when the tab becomes visible.

type Phase = 'user' | 'typing' | 'bot' | 'image' | 'followup';

const TIMINGS: Record<Phase, number> = {
  user: 900,     // user message visible before typing appears
  typing: 1300,  // typing dots duration
  bot: 1800,    // bot text visible before image arrives
  image: 1500,  // image visible before followup arrives
  followup: 0,  // stays visible at end
};

const init = (): void => {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  if (!root) return;

  const scrollEl = root.querySelector<HTMLElement>('[data-chat-scroll]');
  const userMsg = root.querySelector<HTMLElement>('[data-chat-user]');
  const typingMsg = root.querySelector<HTMLElement>('[data-chat-typing]');
  const botMsg = root.querySelector<HTMLElement>('[data-chat-bot]');
  const imageMsg = root.querySelector<HTMLElement>('[data-chat-image]');
  const followupMsg = root.querySelector<HTMLElement>('[data-chat-followup]');
  if (!userMsg || !typingMsg || !botMsg || !imageMsg || !followupMsg) return;

  let timer: number | undefined;
  let cancelled = false;

  const scrollToBottom = (): void => {
    if (!scrollEl) return;
    scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
  };

  const scrollIntoView = (el: HTMLElement): void => {
    if (!scrollEl) return;
    const elTop = el.offsetTop - scrollEl.offsetTop;
    scrollEl.scrollTo({ top: Math.max(0, elTop - 16), behavior: 'smooth' });
  };

  const show = (el: HTMLElement, scrollTo: 'bottom' | 'self' = 'bottom'): void => {
    el.classList.remove('is-hidden');
    requestAnimationFrame(() => {
      el.classList.add('is-shown');
      requestAnimationFrame(() => {
        if (scrollTo === 'self') scrollIntoView(el);
        else scrollToBottom();
      });
    });
  };

  const hide = (el: HTMLElement, immediate = false): void => {
    el.classList.remove('is-shown');
    if (immediate) el.classList.add('is-hidden');
    else window.setTimeout(() => el.classList.add('is-hidden'), 320);
  };

  const wait = (ms: number): Promise<void> =>
    new Promise((resolve) => {
      timer = window.setTimeout(resolve, ms);
    });

  const waitVisible = async (): Promise<void> => {
    if (!document.hidden) return;
    await new Promise<void>((resolve) => {
      const onVisible = (): void => {
        if (!document.hidden) {
          document.removeEventListener('visibilitychange', onVisible);
          resolve();
        }
      };
      document.addEventListener('visibilitychange', onVisible);
    });
  };

  const run = async (): Promise<void> => {
    if (cancelled) return;
    await waitVisible();

    // user is already visible from the initial state
    await wait(TIMINGS.user);
    if (cancelled) return;

    show(typingMsg);
    await wait(TIMINGS.typing);
    if (cancelled) return;

    hide(typingMsg, true);
    show(botMsg);
    await wait(TIMINGS.bot);
    if (cancelled) return;

    show(imageMsg, 'self'); // scroll to keep image in focus, not pushed off top
    await wait(TIMINGS.image);
    if (cancelled) return;

    show(followupMsg);
    // No further wait — final state stays put with focus on the image area.
  };

  // Initial state: only user message visible to avoid flash of nothing
  userMsg.classList.remove('is-hidden');
  requestAnimationFrame(() => userMsg.classList.add('is-shown'));

  // Kick off the one-shot intro after a brief delay
  window.setTimeout(() => {
    run().catch(() => {
      /* swallow */
    });
  }, 1200);

  window.addEventListener('beforeunload', () => {
    cancelled = true;
    if (timer) window.clearTimeout(timer);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
