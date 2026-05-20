/**
 * WhatsApp floating bubble — preview cycle
 *
 * - Shows the preview message ~800ms after mount (right when the user lands)
 * - Auto-hides after 7s
 * - Repeats every 20s for 7s
 * - Pauses cycle while document is hidden
 * - Dismissed permanently for the session via sessionStorage
 * - Hovering the button shows the preview manually (unless dismissed)
 */

const DISMISSED_KEY = 'ceam-wa-dismissed';
const FIRST_SHOW_DELAY_MS = 800;
const VISIBLE_MS = 7_000;
const CYCLE_MS = 20_000;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const init = (): void => {
  const root = document.querySelector<HTMLElement>('[data-wa-root]');
  if (!root) return;

  const preview = root.querySelector<HTMLElement>('[data-wa-preview]');
  const button = root.querySelector<HTMLElement>('[data-wa-btn]');
  const closeBtn = root.querySelector<HTMLElement>('[data-wa-close]');
  if (!preview || !button) return;

  const isDismissed = (): boolean => {
    try {
      return sessionStorage.getItem(DISMISSED_KEY) === '1';
    } catch {
      return false;
    }
  };

  const dismiss = (): void => {
    try {
      sessionStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      /* noop */
    }
  };

  let hideTimeoutId: number | null = null;
  let cycleTimeoutId: number | null = null;
  let manualHover = false;

  const open = (): void => {
    if (isDismissed()) return;
    preview.classList.add('is-open');
  };

  const close = (): void => {
    preview.classList.remove('is-open');
  };

  const clearTimers = (): void => {
    if (hideTimeoutId !== null) {
      window.clearTimeout(hideTimeoutId);
      hideTimeoutId = null;
    }
    if (cycleTimeoutId !== null) {
      window.clearTimeout(cycleTimeoutId);
      cycleTimeoutId = null;
    }
  };

  const scheduleNextCycle = (delay: number): void => {
    if (isDismissed()) return;
    if (cycleTimeoutId !== null) window.clearTimeout(cycleTimeoutId);
    cycleTimeoutId = window.setTimeout(() => {
      if (document.hidden || isDismissed()) {
        scheduleNextCycle(CYCLE_MS);
        return;
      }
      runShowCycle();
    }, delay);
  };

  const runShowCycle = (): void => {
    if (isDismissed()) return;
    open();
    if (hideTimeoutId !== null) window.clearTimeout(hideTimeoutId);
    hideTimeoutId = window.setTimeout(() => {
      if (!manualHover) close();
      scheduleNextCycle(CYCLE_MS - VISIBLE_MS);
    }, VISIBLE_MS);
  };

  // Close button — permanent session dismiss
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dismiss();
    close();
    clearTimers();
  });

  // Hover-on-button manual reveal
  button.addEventListener('mouseenter', () => {
    if (isDismissed()) return;
    manualHover = true;
    open();
  });
  button.addEventListener('mouseleave', () => {
    manualHover = false;
    // If we're not inside the auto-visible window, hide
    if (hideTimeoutId === null) close();
  });

  // Pause/resume on tab visibility
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // pause: keep state but don't fire timeouts work
      // we let existing timers run; the runShowCycle guard re-schedules if hidden
    } else {
      // resuming: if nothing scheduled, start a fresh cycle
      if (cycleTimeoutId === null && hideTimeoutId === null && !isDismissed()) {
        scheduleNextCycle(CYCLE_MS);
      }
    }
  });

  // Kick off
  if (prefersReducedMotion()) {
    // Static — no auto cycle, but still allow hover
    return;
  }
  if (isDismissed()) return;
  scheduleNextCycle(FIRST_SHOW_DELAY_MS);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

export {};
