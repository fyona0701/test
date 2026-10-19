import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => { cleanup(); vi.useRealTimers(); });

export const resizeCallbacks = new Set<ResizeObserverCallback>();
class Observer {
  constructor(private callback: ResizeObserverCallback) {}
  observe() { resizeCallbacks.add(this.callback); }
  unobserve() {}
  disconnect() { resizeCallbacks.delete(this.callback); }
}
vi.stubGlobal('ResizeObserver', Observer);
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn(() => ({ matches: false })) });

// jsdom has no layout. Give each navigation slot a distinct position on both axes.
Object.defineProperties(HTMLElement.prototype, {
  offsetLeft: { configurable: true, get() { return Array.from(this.parentElement?.children ?? []).indexOf(this) * 41; } },
  offsetTop: { configurable: true, get() { return Array.from(this.parentElement?.children ?? []).indexOf(this) * 43; } },
  offsetWidth: { configurable: true, get() { return 38; } },
  offsetHeight: { configurable: true, get() { return 38; } },
});
