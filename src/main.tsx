import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IconBar } from './components/IconBar';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <h1>Bencho</h1>
      <p>An elastic icon bar. Select an icon to try it.</p>
      <div className="examples" data-surface="glass">
        <section className="example" aria-label="Horizontal example"><IconBar /></section>
        <section className="example vertical" aria-label="Vertical example"><IconBar axis="column" /></section>
      </div>
      <p>Component from <a href="https://bencho.dev/licence">Bencho · MIT licence</a></p>
    </main>
  </StrictMode>,
);
