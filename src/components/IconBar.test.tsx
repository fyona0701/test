import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IconBar } from './IconBar';
import { resizeCallbacks } from '../test/setup';

describe('IconBar', () => {
  it('notifies consumers and keeps the selected slot after resize', () => {
    vi.useFakeTimers();
    const onSelect = vi.fn();
    const { container } = render(<IconBar onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Files' }));
    act(() => vi.runAllTimers());
    const indicator = container.querySelector<HTMLElement>('.gnav-ind')!;
    const selectedPosition = indicator.style.transform;
    expect(onSelect).toHaveBeenCalledWith('files');
    act(() => resizeCallbacks.forEach((callback) => callback([], {} as ResizeObserver)));
    expect(indicator.style.transform).toBe(selectedPosition);
    expect(screen.getByRole('button', { name: 'Files' }).getAttribute('aria-current')).toBe('page');
  });

  it('cancels an in-flight horizontal animation when changing to column', () => {
    vi.useFakeTimers();
    const { container, rerender } = render(<IconBar />);
    fireEvent.click(screen.getByRole('button', { name: 'Saved' }));
    rerender(<IconBar axis="column" />);
    const indicator = container.querySelector<HTMLElement>('.gnav-ind')!;
    const columnPosition = indicator.style.transform;
    expect(columnPosition).toMatch(/^translate3d\(0, /);
    act(() => vi.runAllTimers());
    expect(indicator.style.transform).toBe(columnPosition);
    expect(indicator.dataset.phase).toBe('idle');
  });

  it('lands immediately when reduced motion is requested', () => {
    vi.useFakeTimers();
    vi.mocked(window.matchMedia).mockReturnValueOnce({ matches: true } as MediaQueryList);
    const { container } = render(<IconBar />);
    fireEvent.click(screen.getByRole('button', { name: 'You' }));
    expect(container.querySelector<HTMLElement>('.gnav-ind')!.dataset.phase).toBe('settle');
    expect(vi.getTimerCount()).toBe(0);
  });
});
