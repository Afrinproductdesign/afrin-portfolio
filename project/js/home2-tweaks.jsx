/* Afrin — Portfolio v3 · Tweaks panel
   Controls: Direction (3 visual variations), Light/Dark, Accent, Hero size.
   Relies on tweaks-panel.jsx (TweaksPanel, useTweaks, Tweak* controls). */

const AF_TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS || {
  direction: "vector",
  mode: "light",
  accent: "#1447E6",
  heroSize: "regular",
  headline: "pov"
};

const HERO_SCALE = { compact: 0.86, regular: 1, large: 1.14 };

// Headline wording options (innerHTML, with accent emphasis)
const HEADLINES = {
  pov:       'Every product is a decision.<br>I focus on <em class="emph">the right ones</em>.',
  simple:    'Complex enterprise software, <em class="emph">made simple</em>.',
  role:      'Product designer making complex B2B software <em class="emph">simple</em>.',
  decisions: 'Simpler operations. <em class="emph">Better decisions.</em>',
  simplify:  'Designing products that <em class="emph">simplify complex operations</em>.'
};

// Sensible accent presets per direction (used when switching direction)
const DIR_ACCENT = { eclipse: "#F59E0B", atlas: "#B45309", vector: "#1447E6" };

function applyAf(t) {
  const r = document.documentElement;
  r.setAttribute('data-direction', t.direction);
  r.setAttribute('data-mode', t.mode);
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--hero-scale', String(HERO_SCALE[t.heroSize] || 1));
  const h = document.getElementById('af-headline');
  if (h && HEADLINES[t.headline] && h.innerHTML.trim() !== HEADLINES[t.headline]) {
    h.innerHTML = HEADLINES[t.headline];
  }
}

function AfTweaks() {
  const [t, setTweak] = useTweaks(AF_TWEAK_DEFAULTS);

  React.useEffect(() => { applyAf(t); }, [t.direction, t.mode, t.accent, t.heroSize, t.headline]);

  const setDirection = (d) => {
    // switching direction also moves the accent to that direction's signature color
    setTweak({ direction: d, accent: DIR_ACCENT[d] || t.accent });
  };

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Visual direction" />
      <TweakRadio
        label="Direction"
        value={t.direction}
        options={[
          { value: "eclipse", label: "Eclipse" },
          { value: "atlas", label: "Atlas" },
          { value: "vector", label: "Vector" }
        ]}
        onChange={setDirection}
      />
      <TweakRadio
        label="Mode"
        value={t.mode}
        options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
        onChange={(v) => setTweak('mode', v)}
      />

      <TweakSection label="Accent" />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={["#1447E6", "#0369A1", "#7C3AED", "#0D9488", "#F59E0B", "#B45309"]}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Hero" />
      <TweakSelect
        label="Headline"
        value={t.headline}
        options={[
          { value: "pov",       label: "Good products are decisions" },
          { value: "simple",    label: "Made simple" },
          { value: "role",      label: "Role forward" },
          { value: "decisions", label: "Better decisions" },
          { value: "simplify",  label: "Simplify operations" }
        ]}
        onChange={(v) => setTweak('headline', v)}
      />
      <TweakRadio
        label="Headline size"
        value={t.heroSize}
        options={[
          { value: "compact", label: "S" },
          { value: "regular", label: "M" },
          { value: "large", label: "L" }
        ]}
        onChange={(v) => setTweak('heroSize', v)}
      />
    </TweaksPanel>
  );
}

(function mountAf() {
  let host = document.getElementById('af-tweaks-root');
  if (!host) { host = document.createElement('div'); host.id = 'af-tweaks-root'; document.body.appendChild(host); }
  ReactDOM.createRoot(host).render(<AfTweaks />);
})();
