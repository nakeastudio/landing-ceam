// Hero chat mockup orchestrator.
// Sequence: user → typing → bot (medical) → image (community) → followup (soft CTA).
// Auto-scrolls the conversation container to the bottom on each new message.
// Loops every ~16s. Pauses when document.hidden === true.

type Phase = 'user' | 'typing' | 'bot' | 'image' | 'followup' | 'rest';

const TIMINGS: Record<Phase, number> = {
  user: 1000,
  typing: 2000,
  bot: 5000,
  image: 1800,
  followup: 5500,
  rest: 800,
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

  const show = (el: HTMLElement): void => {
    el.classList.remove('is-hidden');
    requestAnimationFrame(() => {
      el.classList.add('is-shown');
      // Wait a frame for layout, then scroll to bottom
      requestAnimationFrame(scrollToBottom);
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

  const reset = (): void => {
    [userMsg, typingMsg, botMsg, imageMsg, followupMsg].forEach((el) => {
      el.classList.remove('is-shown');
      el.classList.add('is-hidden');
    });
    if (scrollEl) scrollEl.scrollTop = 0;
  };

  const loop = async (): Promise<void> => {
    while (!cancelled) {
      if (document.hidden) {
        await new Promise<void>((resolve) => {
          const onVisible = (): void => {
            if (!document.hidden) {
              document.removeEventListener('visibilitychange', onVisible);
              resolve();
            }
          };
          document.addEventListener('visibilitychange', onVisible);
        });
      }

      reset();
      await wait(TIMINGS.rest);

      show(userMsg);
      await wait(TIMINGS.user);

      show(typingMsg);
      await wait(TIMINGS.typing);

      hide(typingMsg, true);
      show(botMsg);
      await wait(TIMINGS.bot);

      show(imageMsg);
      await wait(TIMINGS.image);

      show(followupMsg);
      await wait(TIMINGS.followup);

      hide(userMsg);
      hide(botMsg);
      hide(imageMsg);
      hide(followupMsg);
      await wait(TIMINGS.rest);
    }
  };

  // Initial visible state: user first message shown right away to avoid flash of nothing
  show(userMsg);
  window.setTimeout(() => {
    loop().catch(() => {
      /* swallow */
    });
  }, 2500);

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
