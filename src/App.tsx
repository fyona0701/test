import { useState } from 'react';
import { ArrowUpRight, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { IconBar, type IconBarKey } from './components/IconBar';
import './app.css';

const defaults = { dilate: 100, bounce: 50, speed: 50, hug: 6, corner: 26, glyph: 17 };
const controls = [
  { key: 'dilate', label: 'Stretch', max: 100, min: 0, hint: 'How far the indicator reaches.' },
  { key: 'bounce', label: 'Bounce', max: 100, min: 0, hint: 'The give as it lands.' },
  { key: 'speed', label: 'Speed', max: 100, min: 0, hint: 'From a slow glide to a quick snap.' },
  { key: 'hug', label: 'Padding', max: 14, min: 0, hint: 'Space around each icon.' },
  { key: 'corner', label: 'Corner', max: 26, min: 0, hint: 'From a square to a full pill.' },
  { key: 'glyph', label: 'Icon size', max: 28, min: 12, hint: 'The glyph inside its fixed slot.' },
] as const;
const labels: Record<IconBarKey, string> = { home: 'Home', search: 'Search', files: 'Files', saved: 'Saved', you: 'You' };

export default function App() {
  const [settings, setSettings] = useState(defaults);
  const [axis, setAxis] = useState<'row' | 'column'>('row');
  const [surface, setSurface] = useState('glass');
  const [stroke, setStroke] = useState(false);
  const [selected, setSelected] = useState<IconBarKey>('home');
  const [revision, setRevision] = useState(0);
  const snippet = `<IconBar axis="${axis}"\n  dilate={${settings.dilate}} bounce={${settings.bounce}} speed={${settings.speed}}\n  hug={${settings.hug}} corner={${settings.corner}} glyph={${settings.glyph}}\n/>`;

  function reset() {
    setSettings(defaults);
    setAxis('row');
    setSurface('glass');
    setStroke(false);
    setSelected('home');
    setRevision((value) => value + 1);
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="wordmark" href="#main">bencho<span> / the workbench</span></a>
        <a className="source-link" href="https://github.com/fyona0701/test">View source <ArrowUpRight size={15} aria-hidden /></a>
      </header>
      <main id="main">
        <div className="intro">
          <p className="eyebrow">01 / INTERFACE EXPLORATIONS</p>
          <h1>A little give.<br />A lot of character.</h1>
          <p className="description">An icon bar with a softer landing. Try the motion, change the material, and make it your own.</p>
        </div>
        <div className="workbench">
          <section className="preview-panel" aria-label="Component preview" data-surface={surface} data-stroke={stroke ? 'on' : 'off'}>
            <div className="panel-caption"><span>Icon bar</span><span>LIVE PREVIEW</span></div>
            <div className="preview-stage" data-axis={axis}>
              <IconBar key={revision} {...settings} axis={axis} onSelect={setSelected} ariaLabel="Icon bar preview" />
            </div>
            <div className="preview-footer"><span role="status">Selected: {labels[selected]}</span><span>Click an icon to feel it.</span></div>
          </section>
          <section className="controls-panel" aria-labelledby="controls-heading">
            <div className="controls-heading"><h2 id="controls-heading"><SlidersHorizontal size={17} aria-hidden /> Make it yours</h2><button type="button" className="reset-button" onClick={reset}><RotateCcw size={14} aria-hidden /> Reset</button></div>
            <div className="select-controls">
              <label>Direction<select value={axis} onChange={(event) => setAxis(event.target.value as 'row' | 'column')}><option value="row">Row</option><option value="column">Column</option></select></label>
              <label>Material<select value={surface} onChange={(event) => setSurface(event.target.value)}><option value="glass">Glass</option><option value="flat">Flat</option></select></label>
            </div>
            {controls.map(({ key, label, min, max, hint }) => (
              <div className="range-control" key={key}>
                <div className="control-label"><label htmlFor={key}>{label}</label><output htmlFor={key}>{settings[key]}{key === 'hug' || key === 'corner' || key === 'glyph' ? 'px' : ''}</output></div>
                <input id={key} type="range" min={min} max={max} value={settings[key]} aria-describedby={`${key}-hint`} onChange={(event) => setSettings({ ...settings, [key]: Number(event.target.value) })} />
                <p id={`${key}-hint`}>{hint}</p>
              </div>
            ))}
            <label className="stroke-control"><input type="checkbox" checked={stroke} onChange={(event) => setStroke(event.target.checked)} /> Add a hairline stroke <span>Visible on flat material</span></label>
          </section>
        </div>
        <section className="integration" aria-labelledby="integration-heading">
          <div><p className="eyebrow">BUILT TO BE BORROWED</p><h2 id="integration-heading">Take it into your project.</h2><p>React + TypeScript. Lucide icons.<br />Local tokens, with the original tuning notes intact.</p></div>
          <pre aria-label="Current component configuration"><code>{snippet}</code></pre>
        </section>
      </main>
      <footer><span>Small details. Considered motion.</span><a href="https://bencho.dev/licence">Original component by Bencho · MIT <ArrowUpRight size={13} aria-hidden /></a></footer>
    </div>
  );
}
