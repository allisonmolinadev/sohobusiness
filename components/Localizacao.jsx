// Localização — embed do Google Maps + pontos de interesse com link
function Localizacao() {
  const [mapaOpen, setMapaOpen] = React.useState(false);

  // Tecla Esc fecha o lightbox
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMapaOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Trava o scroll do body com o lightbox aberto
  React.useEffect(() => {
    document.body.style.overflow = mapaOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mapaOpen]);

  // Rota do Google Maps a partir do SoHo Business até cada destino
  const ORIGEM = 'Salas comerciais FAJ';
  const rota = (destino) =>
    `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ORIGEM)}&destination=${encodeURIComponent(destino)}`;

  const pois = [
    { name: 'SoHo Business',     tipo: 'Empreendimento', dist: '—',       link: 'https://maps.app.goo.gl/RVznptrp7PKdsbAY6' },
    { name: 'Shopping Iguatemi', tipo: 'Comércio',       dist: '~1,1 km', link: rota('Shopping Iguatemi São José do Rio Preto') },
    { name: 'Hotel Hyatt Place', tipo: 'Hotelaria',      dist: '~1,1 km', link: rota('Hyatt Place São José do Rio Preto') },
    { name: 'Avenida JK',        tipo: 'Via arterial',   dist: '~4,6 km', link: rota('JK Avenue São José do Rio Preto') },
  ];

  return (
    <section id="localizacao" style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '160px var(--gutter)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          borderTop: '1px solid rgba(245,247,246,0.15)', paddingTop: 24,
        }} className="reveal">
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--neutral)' }}>04</span>
          <span className="eyebrow" style={{ color: 'var(--paper)' }}>— Localização</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(40px, 6vw, 96px)',
          marginTop: 72,
          alignItems: 'stretch',
        }} className="loc-head reveal">
          {/* Esquerda — título + proximidades */}
          <div>
            <h2 className="display" style={{
              fontSize: 'clamp(44px, 6vw, 104px)', fontWeight: 400,
            }}>
              No eixo mais<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>ativo da cidade.</em>
            </h2>

            <div style={{ marginTop: 'clamp(56px, 7vw, 96px)' }}>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 11,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--neutral-2)',
                marginBottom: 28,
              }}>
                — Proximidades
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{
                  fontSize: 20, lineHeight: 1.55, fontWeight: 300,
                  color: 'var(--paper)',
                }}>
                  O SoHo Business chega para redefinir o conceito de investimento corporativo em São José do Rio Preto.
                </p>
                <p style={{
                  fontSize: 16, lineHeight: 1.7, fontWeight: 400,
                  color: 'var(--neutral-2)',
                }}>
                  Em uma das regiões mais valorizadas da cidade, ao lado do Shopping Iguatemi e próximo aos principais eixos de acesso, o empreendimento une visibilidade, conveniência e rentabilidade.
                </p>
                <p style={{
                  fontSize: 16, lineHeight: 1.7, fontWeight: 400,
                  color: 'var(--neutral-2)',
                }}>
                  Com fácil acesso pela BR-153 e Avenida Juscelino Kubitschek, o SoHo Business coloca você no ponto mais estratégico para trabalhar, investir e crescer. Mais do que um endereço comercial, é uma escolha inteligente para quem busca valor, credibilidade e potencial de retorno, com a solidez da FAJ Invest.
                </p>
              </div>
            </div>
          </div>

          {/* Direita — mapa de localização (clicável para ampliar) */}
          <img src="assets/localizacao.jpg" alt="Mapa aéreo da região com pontos de interesse"
            onClick={() => setMapaOpen(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'center',
              display: 'block', cursor: 'zoom-in',
            }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
          gap: 'clamp(24px, 3vw, 48px)',
          marginTop: 80, alignItems: 'stretch',
        }} className="loc-grid reveal">
          {/* Google Maps */}
          <iframe
            title="Localização do SoHo Business no Google Maps"
            src="https://www.google.com/maps?q=Salas+comerciais+FAJ&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{
              width: '100%', minHeight: 560,
              border: '1px solid rgba(245,247,246,0.12)',
              display: 'block',
            }}
          />

          {/* Lista de pontos de interesse — cada item abre no Google Maps */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              padding: '20px 0', borderTop: '1px solid rgba(245,247,246,0.15)',
              borderBottom: '1px solid rgba(245,247,246,0.15)',
              fontFamily: 'var(--f-mono)', fontSize: 10,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--neutral)',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>— Pontos de interesse</span>
              <span>{String(pois.length).padStart(2, '0')}</span>
            </div>

            {pois.map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer"
                 className="poi-link" style={{
                   display: 'block', width: '100%',
                   textDecoration: 'none',
                   borderBottom: '1px solid rgba(245,247,246,0.1)',
                   padding: '22px 20px 22px 0',
                   color: 'var(--paper)',
                 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--f-mono)', fontSize: 10,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'var(--neutral)', marginBottom: 6,
                    }}>— {String(i+1).padStart(2, '0')} · {p.tipo}</div>
                    <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{p.name}</div>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontFamily: 'var(--f-mono)', fontSize: 11,
                    color: 'var(--neutral)',
                  }}>
                    <span>{p.dist}</span>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="poi-arrow">
                      <path d="M3.5 9.5L9.5 3.5M9.5 3.5H4.5M9.5 3.5V8.5" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}

            <div style={{
              marginTop: 32, padding: '20px 0',
              borderTop: '1px solid rgba(245,247,246,0.15)',
            }}>
              <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 8 }}>— Endereço</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--paper)' }}>
                São José do Rio Preto — SP
              </div>
              <a href="https://maps.app.goo.gl/RVznptrp7PKdsbAY6" target="_blank" rel="noopener noreferrer"
                 className="btn on-dark" style={{ marginTop: 28 }}>
                Abrir no Maps <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox — mapa ampliado */}
      {mapaOpen && (
        <div onClick={() => setMapaOpen(false)} className="loc-lb" style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(10,10,10,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(16px, 4vw, 72px)', cursor: 'zoom-out',
        }}>
          <img src="assets/localizacao.jpg" alt="Mapa aéreo da região com pontos de interesse"
            onClick={e => e.stopPropagation()}
            className="loc-lb-img"
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain', cursor: 'default',
            }} />
          <button onClick={() => setMapaOpen(false)} aria-label="Fechar" style={{
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
        .poi-link { transition: background 0.3s; }
        .poi-link:hover { background: rgba(245,247,246,0.06); }
        .poi-link .poi-arrow { transition: transform 0.3s, color 0.3s; }
        .poi-link:hover .poi-arrow { transform: translate(2px, -2px); color: var(--paper); }
        .loc-lb { animation: loc-lb-fade 0.3s ease; }
        .loc-lb-img { animation: loc-lb-zoom 0.35s cubic-bezier(.2,.7,.2,1); }
        @keyframes loc-lb-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes loc-lb-zoom {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 980px) {
          .loc-grid { grid-template-columns: 1fr !important; }
          .loc-head { grid-template-columns: 1fr !important; gap: 32px !important; }
          .loc-head > img { height: auto !important; object-fit: contain !important; }
        }
      `}</style>
    </section>
  );
}

window.Localizacao = Localizacao;
