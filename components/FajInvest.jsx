// Sobre a FAJ Invest — institutional section
function FajInvest() {
  return (
    <section id="faj" style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '160px var(--gutter)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          borderTop: '1px solid rgba(245,247,246,0.15)',
          paddingTop: 24,
        }} className="reveal">
          <span style={{
            fontFamily: 'var(--f-mono)', fontSize: 11,
            letterSpacing: '0.2em', color: 'var(--neutral)',
          }}>05</span>
          <span className="eyebrow" style={{ color: 'var(--paper)' }}>
            — Realização
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 120px)',
          marginTop: 80, alignItems: 'start',
        }} className="faj-grid reveal">
          <div>
            <img src="assets/logo-faj-invest-branco.png" alt="FAJ Invest" style={{
              width: 'min(340px, 80%)', height: 'auto', display: 'block',
            }} />
            <div style={{
              marginTop: 40,
              display: 'flex', flexDirection: 'column',
              gap: 32, alignItems: 'flex-start',
            }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 14 }}>
                  — Realização
                </div>
                <a href="https://fajempreendimentos.com/" target="_blank" rel="noopener noreferrer"
                   style={{ display: 'block', width: 'min(340px, 100%)' }} aria-label="FAJ Empreendimentos">
                  <img src="assets/logo-faj-empreendimentos-horizontal.png" alt="FAJ Empreendimentos" style={{
                    width: '100%', height: 'auto', display: 'block',
                  }} />
                </a>
              </div>
              <div>
                <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 14 }}>
                  — Linha
                </div>
                <a href="https://fajinvest.com.br/" target="_blank" rel="noopener noreferrer"
                   style={{ display: 'block', width: 'min(340px, 100%)' }} aria-label="FAJ Invest">
                  <img src="assets/logo-faj-invest-branco.png" alt="FAJ Invest" style={{
                    width: '100%', height: 'auto', display: 'block',
                  }} />
                </a>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 8 }}>
            <h3 className="display" style={{
              fontSize: 'clamp(32px, 3.5vw, 56px)',
              fontWeight: 400, marginBottom: 36,
            }}>
              Construímos ativos que<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
                atravessam o tempo.
              </em>
            </h3>

            <p style={{
              fontSize: 17, lineHeight: 1.7, color: 'var(--neutral-2)',
              marginBottom: 24, fontWeight: 300,
            }}>
              A FAJ Invest atua no desenvolvimento de empreendimentos imobiliários com estratégia, consistência e visão de longo prazo.
            </p>
            <p style={{
              fontSize: 17, lineHeight: 1.7, color: 'var(--neutral-2)',
              fontWeight: 300,
            }}>
              SoHo Business é parte de um portfólio pensado para empresários e investidores que valorizam localização, qualidade construtiva e decisões sólidas.
            </p>

            <a href="https://fajinvest.com.br/" target="_blank" rel="noopener noreferrer"
               className="btn ghost" style={{
                 marginTop: 48,
                 color: 'var(--paper)',
                 borderColor: 'rgba(245,247,246,0.35)',
               }}>
              Conheça mais sobre a
              <img src="assets/logo-faj-invest-branco.png" alt="FAJ Invest"
                   style={{ height: 14, width: 'auto' }} />
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .faj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.FajInvest = FajInvest;
