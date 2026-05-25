// Tipologias — salas comerciais: info à esquerda + marquee dos 3Ds à direita
function Plantas() {
  const salas = [
    { src: 'assets/sala-01.jpg',       label: 'Sala tipo' },
    { src: 'assets/sala-02.jpg',       label: 'Sala · escritório' },
    { src: 'assets/sala-dentista.jpg', label: 'Sala · consultório' },
  ];
  // Lista duplicada para o loop contínuo do marquee
  const loop = [...salas, ...salas];
  const [lightbox, setLightbox] = React.useState(null);

  // Tecla Esc fecha o lightbox
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Trava o scroll do body com o lightbox aberto
  React.useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="plantas" style={{
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '160px var(--gutter)',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <SectionLabel num="06" label="Tipologias" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(40px, 6vw, 96px)',
          marginTop: 80,
          alignItems: 'center',
        }} className="plantas-grid">
          {/* ESQUERDA — informações */}
          <div className="reveal">
            <h2 className="display" style={{
              fontSize: 'clamp(44px, 7vw, 100px)',
              fontWeight: 400, textTransform: 'uppercase',
              letterSpacing: '-0.03em', lineHeight: 0.95,
            }}>
              Salas<br/>Comerciais
            </h2>

            <div style={{ marginTop: 48 }}>
              <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 12 }}>
                A partir de
              </div>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap',
              }}>
                <Medida n="32" />
                <span style={{
                  fontFamily: 'var(--f-display)',
                  fontSize: 'clamp(18px, 1.8vw, 26px)',
                  color: 'var(--neutral)', fontWeight: 300,
                }}>até</span>
                <Medida n="1080" />
              </div>
            </div>

            <div style={{ width: 64, height: 1, background: 'var(--ink)', margin: '40px 0' }} />

            <p style={{
              fontSize: 'clamp(17px, 1.7vw, 21px)', lineHeight: 1.5,
              fontWeight: 300, maxWidth: 470,
            }}>
              <strong style={{ fontWeight: 600 }}>Soluções exclusivas</strong> que se moldam
              perfeitamente ao <strong style={{ fontWeight: 600 }}>layout da sua empresa</strong>.
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              marginTop: 40, padding: '18px 26px',
              border: '1px solid var(--ink)', borderRadius: 28,
              maxWidth: 440,
            }}>
              <KeyIcon />
              <span style={{ fontSize: 15, lineHeight: 1.4 }}>
                Possibilidade de junção de salas após a{' '}
                <strong style={{ fontWeight: 600 }}>entrega das chaves</strong>.
              </span>
            </div>
          </div>

          {/* DIREITA — marquee dos 3Ds das salas */}
          <div className="salas-viewport reveal" style={{
            position: 'relative',
            overflow: 'hidden',
            height: 'clamp(520px, 66vw, 760px)',
          }}>
            <div className="salas-track">
              {loop.map((s, i) => (
                <button key={i} onClick={() => setLightbox(i % salas.length)}
                  className="sala-card" aria-label={`Ampliar ${s.label}`}>
                  <img src={s.src} alt={s.label} />
                </button>
              ))}
            </div>
            <div className="salas-fade salas-fade-top" />
            <div className="salas-fade salas-fade-bottom" />
          </div>
        </div>
      </div>

      {/* Lightbox — imagem ampliada */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} className="plantas-lb" style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(10,10,10,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(16px, 4vw, 72px)', cursor: 'zoom-out',
        }}>
          <img src={salas[lightbox].src} alt={salas[lightbox].label}
            onClick={e => e.stopPropagation()}
            className="plantas-lb-img"
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain', cursor: 'default',
            }} />
          <button onClick={() => setLightbox(null)} aria-label="Fechar" style={{
            position: 'fixed', top: 24, right: 24,
            width: 52, height: 52,
            border: '1px solid rgba(245,247,246,0.4)',
            background: 'transparent', color: 'var(--paper)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
          </button>
        </div>
      )}

      <style>{`
        .salas-track {
          display: flex; flex-direction: column;
          animation: salas-scroll 34s linear infinite;
          will-change: transform;
        }
        .salas-viewport:hover .salas-track { animation-play-state: paused; }
        @keyframes salas-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .sala-card {
          display: block; width: 100%; padding: 0;
          margin: 0 0 14px 0;
          border: none; background: none; cursor: zoom-in;
          overflow: hidden;
        }
        .sala-card img {
          display: block; width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(.2,.7,.2,1), filter 0.4s ease;
        }
        .sala-card:hover img { transform: scale(1.05); filter: brightness(1.05); }
        .salas-fade {
          position: absolute; left: 0; right: 0;
          height: 90px; pointer-events: none; z-index: 2;
        }
        .salas-fade-top { top: 0; background: linear-gradient(var(--paper), transparent); }
        .salas-fade-bottom { bottom: 0; background: linear-gradient(transparent, var(--paper)); }
        .plantas-lb { animation: plb-fade 0.3s ease; }
        .plantas-lb-img { animation: plb-zoom 0.35s cubic-bezier(.2,.7,.2,1); }
        @keyframes plb-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes plb-zoom {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .salas-track { animation: none; }
        }
        @media (max-width: 860px) {
          .plantas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* Número grande + unidade m² */
function Medida({ n }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 5 }}>
      <span style={{
        fontFamily: 'var(--f-display)',
        fontSize: 'clamp(44px, 6vw, 92px)',
        fontWeight: 400, letterSpacing: '-0.03em',
      }}>{n}</span>
      <span style={{
        fontFamily: 'var(--f-display)',
        fontSize: 'clamp(26px, 3.4vw, 52px)',
        fontWeight: 400, color: 'var(--neutral)',
      }}>m²</span>
    </span>
  );
}

/* Ícone de chave (line-style) */
function KeyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
         style={{ flexShrink: 0 }} aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="4.5"/>
      <path d="M10.7 10.7 20 20"/>
      <path d="M16.6 16.6l2.2-2.2"/>
      <path d="M13.8 13.8l2.2-2.2"/>
    </svg>
  );
}

window.Plantas = Plantas;
