// Hero chat mockup orchestrator.
// Sequence: show user → wait 1s → show typing → wait 2s → hide typing + show bot → wait 6s → reset.
// Loops every ~12s. Pauses when document.hidden === true.

type Phase = 'user' | 'typing' | 'bot' | 'rest';

const TIMINGS: Record<Phase, number> = {
  user: 1000,
  typing: 2000,
  bot: 6000,
  rest: 800,
};

const init = (): void => {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  if (!root) return;

  const userMsg = root.querySelector<HTMLElement>('[data-chat-user]');
  const typingMsg = root.querySelector<HTMLElement>('[data-chat-typing]');
  const botMsg = root.querySelector<HTMLElement>('[data-chat-bot]');
  if (!userMsg || !typingMsg || !botMsg) return;

  let timer: number | undefined;
  let cancelled = false;

  const show = (el: HTMLElement): void => {
    el.classList.remove('is-hidden');
    requestAnimationFrame(() => el.classList.add('is-shown'));
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
    [userMsg, typingMsg, botMsg].forEach((el) => {
      el.classList.remove('is-shown');
      el.classList.add('is-hidden');
    });
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

      hide(userMsg);
      hide(botMsg);
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
