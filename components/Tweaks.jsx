// Tweaks panel — variations of the hero layout
function Tweaks({ tweaks, onUpdate }) {
  const options = [
    { id: 'editorial',   label: 'Editorial',     desc: 'Split com type + imagem vertical' },
    { id: 'fullbleed',   label: 'Full-bleed',    desc: 'Imagem em tela cheia com overlay' },
    { id: 'typographic', label: 'Tipográfico',   desc: 'Wordmark oversized + grid modular' },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 100,
      background: 'var(--ink)', color: 'var(--paper)',
      padding: 24, width: 320,
      border: '1px solid rgba(245,247,246,0.2)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      fontFamily: 'var(--f-body)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20,
      }}>
        <span className="eyebrow" style={{ color: 'var(--paper)' }}>Tweaks</span>
        <span className="eyebrow" style={{ color: 'var(--neutral)' }}>Hero</span>
      </div>

      <div style={{
        fontFamily: 'var(--f-display)', fontSize: 13, fontWeight: 400,
        color: 'var(--neutral-2)', marginBottom: 16,
      }}>Layout do hero</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {options.map(opt => {
          const on = tweaks.heroVariant === opt.id;
          return (
            <button key={opt.id}
              onClick={() => onUpdate('heroVariant', opt.id)}
              style={{
                textAlign: 'left', cursor: 'pointer',
                background: on ? 'var(--paper)' : 'transparent',
                color: on ? 'var(--ink)' : 'var(--paper)',
                border: `1px solid ${on ? 'var(--paper)' : 'rgba(245,247,246,0.2)'}`,
                padding: '14px 16px',
                fontFamily: 'inherit',
                transition: 'all 0.25s',
              }}>
              <div style={{
                fontSize: 14, fontWeight: 500, marginBottom: 4,
              }}>{opt.label}</div>
              <div style={{
                fontSize: 11, opacity: 0.7,
                fontFamily: 'var(--f-mono)', letterSpacing: '0.05em',
              }}>{opt.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

window.Tweaks = Tweaks;
