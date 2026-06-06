// Afrin portfolio — Tweaks panel
const { useEffect } = React;

function PortfolioTweaks() {
  const defaults = window.__TWEAK_DEFAULTS || {
    accent: '#0a6b6b',
    density: 'default',
    dark: false,
    voice: 'terse',
  };
  const [t, setTweak] = useTweaks(defaults);

  // Apply on every change
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.setAttribute('data-density', t.density);
    r.setAttribute('data-dark', t.dark ? '1' : '0');
  }, [t.accent, t.density, t.dark]);

  // Voice swap — terse vs warm — on the hero statement only
  useEffect(() => {
    const el = document.querySelector('.hero-statement');
    if (!el) return;
    if (t.voice === 'warm') {
      el.innerHTML =
        'I design <em>calm</em> systems for enterprise teams, and I ship them faster than anyone expects.';
    } else {
      el.innerHTML =
        'Senior product designer who thinks in <em>systems</em>, ships fast, and works <em>natively</em> with AI.';
    }
  }, [t.voice]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakColor
          label="Accent color"
          value={t.accent}
          onChange={(v) => setTweak('accent', v)}
          options={['#0a6b6b', '#1a3a8f', '#c2410c', '#0e0e0c', '#7c3aed']}
        />
      </TweakSection>

      <TweakSection title="Theme">
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          onChange={(v) => setTweak('density', v)}
          options={[
            { value: 'default', label: 'Spacious' },
            { value: 'compact', label: 'Compact' },
          ]}
        />
      </TweakSection>

      <TweakSection title="Voice">
        <TweakRadio
          label="Hero voice"
          value={t.voice}
          onChange={(v) => setTweak('voice', v)}
          options={[
            { value: 'terse', label: 'Terse' },
            { value: 'warm', label: 'Warm' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = document.createElement('div');
root.id = '__tweaks_root';
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<PortfolioTweaks />);
