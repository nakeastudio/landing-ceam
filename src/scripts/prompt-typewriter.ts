// Typewriter loop for PromptExamples. Cycles through prompts in a fake input.
// Chips below pause the loop and snap to that prompt for 6s, then resume.

interface State {
  index: number;
  typing: boolean;
  paused: boolean;
  timer: number | undefined;
}

const TYPE_SPEED = 38;   // ms per character (type)
const DELETE_SPEED = 18; // ms per character (delete)
const HOLD_AFTER_TYPE = 2200;
const HOLD_AFTER_CHIP = 6000;
const HOLD_BEFORE_NEXT = 400;

const init = (): void => {
  const root = document.querySelector<HTMLElement>('[data-prompt-typewriter]');
  if (!root) return;

  const textEl = root.querySelector<HTMLElement>('[data-typewriter-text]');
  const chips = root.querySelectorAll<HTMLButtonElement>('[data-typewriter-chip]');
  if (!textEl || chips.length === 0) return;

  const prompts = Array.from(chips).map((c) => c.dataset.prompt ?? '');

  const state: State = { index: 0, typing: false, paused: false, timer: undefined };

  const wait = (ms: number): Promise<void> =>
    new Promise((resolve) => {
      state.timer = window.setTimeout(resolve, ms);
    });

  const setActiveChip = (i: number): void => {
    chips.forEach((c, idx) => {
      c.dataset.active = idx === i ? 'true' : 'false';
    });
  };

  const typeString = async (str: string): Promise<void> => {
    textEl.textContent = '';
    for (let i = 0; i < str.length; i++) {
      if (state.paused) return;
      textEl.textContent = str.slice(0, i + 1);
      await wait(TYPE_SPEED);
    }
  };

  const deleteString = async (): Promise<void> => {
    const current = textEl.textContent ?? '';
    for (let i = current.length; i > 0; i--) {
      if (state.paused) return;
      textEl.textContent = current.slice(0, i - 1);
      await wait(DELETE_SPEED);
    }
  };

  const loop = async (): Promise<void> => {
    while (!state.paused) {
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
      setActiveChip(state.index);
      await typeString(prompts[state.index] ?? '');
      await wait(HOLD_AFTER_TYPE);
      await deleteString();
      await wait(HOLD_BEFORE_NEXT);
      state.index = (state.index + 1) % prompts.length;
    }
  };

  const startLoop = (): void => {
    state.paused = false;
    loop().catch(() => {
      /* swallow */
    });
  };

  const pauseLoop = (): void => {
    state.paused = true;
    if (state.timer) {
      window.clearTimeout(state.timer);
      state.timer = undefined;
    }
  };

  // Chip click: jump to that prompt, hold longer, then resume
  chips.forEach((chip, i) => {
    chip.addEventListener('click', async (e) => {
      e.preventDefault();
      pauseLoop();
      state.index = i;
      setActiveChip(i);
      textEl.textContent = '';
      // Snap-type fast
      const prompt = prompts[i] ?? '';
      for (let j = 0; j < prompt.length; j++) {
        textEl.textContent = prompt.slice(0, j + 1);
        await new Promise((r) => setTimeout(r, 12));
      }
      // Hold then resume
      window.setTimeout(() => {
        state.index = (i + 1) % prompts.length;
        startLoop();
      }, HOLD_AFTER_CHIP);
    });
  });

  // Start loop only when section is visible (perf)
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startLoop();
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(root);
  } else {
    startLoop();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
