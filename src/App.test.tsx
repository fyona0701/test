import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './App';

it('updates the preview and integration snippet, then resets the whole bench', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Direction'), { target: { value: 'column' } });
  fireEvent.change(screen.getByLabelText('Material'), { target: { value: 'flat' } });
  fireEvent.change(screen.getByRole('slider', { name: 'Speed' }), { target: { value: '80' } });
  fireEvent.click(screen.getByRole('button', { name: 'Saved' }));
  expect(screen.getByRole('navigation').dataset.orientation).toBe('vertical');
  expect(screen.getByText(/^Selected:/).textContent).toBe('Selected: Saved');
  expect(screen.getByLabelText('Current component configuration').textContent).toContain('speed={80}');
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByRole('navigation').dataset.orientation).toBe('horizontal');
  expect(screen.getByText(/^Selected:/).textContent).toBe('Selected: Home');
  expect((screen.getByLabelText('Material') as HTMLSelectElement).value).toBe('glass');
  expect((screen.getByRole('slider', { name: 'Speed' }) as HTMLInputElement).value).toBe('50');
});
