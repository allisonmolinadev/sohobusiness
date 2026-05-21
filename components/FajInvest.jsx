// Sobre a FAJ Invest — institutional section
function FajInvest() {
  return (
    <section id="faj" style={{
      background: 'linear-gradient(rgba(10,10,10,0.78), rgba(10,10,10,0.78)), url(assets/background.jpg) center/cover no-repeat',
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
            <div style={{
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(64px, 9vw, 132px)',
              fontWeight: 800, letterSpacing: '-0.055em',
              lineHeight: 0.9,
            }}>
              FAJ<br/>INVEST
            </div>
            <p style={{
              fontFamily: 'var(--f-mono)', fontSize: 11,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--neutral)',
              marginTop: 24,
            }}>
              — Desenvolvimento imobiliário
            </p>
          </div>

          <div style={{ paddingTop: 8 }}>
            <h3 className="display" style={{
              fontSize: 'clamp(32px, 3.5vw, 56px)',
              fontWeight: 400, marginBottom: 36,
            }}>
              Construímos produtos que<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
                envelhecem bem.
              </em>
            </h3>

            <p style={{
              fontSize: 17, lineHeight: 1.7, color: 'var(--neutral-2)',
              marginBottom: 24, fontWeight: 300,
            }}>
              A FAJ Invest atua no desenvolvimento e gestão de empreendimentos imobiliários com foco em produtos que geram valor consistente para o investidor — desde a concepção do projeto até a entrega das chaves.
            </p>
            <p style={{
              fontSize: 17, lineHeight: 1.7, color: 'var(--neutral-2)',
              fontWeight: 300,
            }}>
              SoHo Business é parte de um portfólio pensado para investidores que priorizam permanência, localização e qualidade construtiva.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              marginTop: 56, gap: 0,
              borderTop: '1px solid rgba(245,247,246,0.12)',
            }} className="faj-stats">
              <FajStat label="Empreendimentos" value="12" />
              <FajStat label="VGV histórico" value="R$ 1,8bi" />
              <FajStat label="Anos de mercado" value="18" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .faj-grid { grid-template-columns: 1fr !important; }
          .faj-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FajStat({ label, value }) {
  return (
    <div style={{
      padding: '28px 24px',
      borderRight: '1px solid rgba(245,247,246,0.12)',
    }}>
      <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 10 }}>{label}</div>
      <div style={{
        fontFamily: 'var(--f-display)',
        fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em',
        color: 'var(--paper)',
      }}>{value}</div>
    </div>
  );
}

window.FajInvest = FajInvest;
