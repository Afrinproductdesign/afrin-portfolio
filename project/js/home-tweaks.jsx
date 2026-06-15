// Afrin portfolio — Homepage Tweaks
const { useEffect } = React;

function HomeTweaks() {
  const defaults = window.__TWEAK_DEFAULTS || {
    accent: '#0F6E56',
    dark: false,
    heroSize: 'default',
    cardStyle: 'minimal',
  };
  const [t, setTweak] = useTweaks(defaults);

  // Apply tweaks live
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.setAttribute('data-dark', t.dark ? '1' : '0');
    r.setAttribute('data-hero-size', t.heroSize);
    r.setAttribute('data-card-style', t.cardStyle);
  }, [t.accent, t.dark, t.heroSize, t.cardStyle]);

  return (
    <TweaksPanel title="Design Controls">
      <TweakSection title="Color">
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak('accent', v)}
          options={[
            '#0F6E56', // teal (default)
            '#1a3a8f', // deep blue
            '#7c3aed', // purple
            '#c2410c', // burnt orange
            '#0a0a0a', // near-black
          ]}
        />
      </TweakSection>

      <TweakSection title="Theme">
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak('dark', v)}
        />
      </TweakSection>

      <TweakSection title="Hero">
        <TweakRadio
          label="Headline size"
          value={t.heroSize}
          onChange={(v) => setTweak('heroSize', v)}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'large', label: 'Large' },
            { value: 'compact', label: 'Compact' },
          ]}
        />
      </TweakSection>

      <TweakSection title="Work Cards">
        <TweakRadio
          label="Card style"
          value={t.cardStyle}
          onChange={(v) => setTweak('cardStyle', v)}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'elevated', label: 'Elevated' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = document.createElement('div');
root.id = '__tweaks_root';
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<HomeTweaks />);
