// Ficha Técnica — institutional spec sheet, editorial dark layout
function FichaTecnica() {
  const specs = [
    { k: 'Área do terreno',   v: '5.274,52',  un: 'm²' },
    { k: 'Pavimentos',        v: '21',        un: 'pavimentos + 4 subsolos' },
    { k: 'Área construída',   v: '44.443,66', un: 'm²' },
    { k: 'Total de unidades', v: '415',       un: 'salas comerciais' },
    { k: 'Torres',            v: '1',         un: 'torre exclusiva' },
    { k: 'Total de vagas',    v: '495',       un: 'vagas de estacionamento' },
  ];

  return (
    <section id="ficha" style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '160px var(--gutter)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          borderTop: '1px solid rgba(245,247,246,0.15)', paddingTop: 24,
        }} className="reveal">
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--neutral)' }}>05</span>
          <span className="eyebrow" style={{ color: 'var(--paper)' }}>— Ficha técnica</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: 'clamp(40px, 6vw, 120px)',
          marginTop: 80,
        }} className="ficha-grid reveal">
          <div>
            <img src="assets/soho-logo-white.png" alt="SoHo Business" style={{
              width: 'min(260px, 70%)', height: 'auto', display: 'block',
              marginBottom: 40,
            }} />
            <h2 className="display" style={{
              fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 400,
            }}>
              Os números<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
                do projeto.
              </em>
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7, fontWeight: 300,
              color: 'var(--neutral-2)', marginTop: 32, maxWidth: 460,
            }}>
              O SoHo Business oferece flexibilidade para diferentes perfis de negócios. Desde profissionais autônomos até empresas consolidadas, o projeto atende com eficiência e adaptabilidade.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            borderTop: '1px solid rgba(245,247,246,0.15)',
          }} className="ficha-list">
            {specs.map((s, i) => (
              <FichaRow key={i} k={s.k} v={s.v} un={s.un} idx={i+1} />
            ))}
          </div>
        </div>

        <div style={{
          marginTop: 64,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--f-mono)', fontSize: 10,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--neutral)', flexWrap: 'wrap', gap: 12,
          borderTop: '1px solid rgba(245,247,246,0.12)', paddingTop: 20,
        }} className="reveal">
          <span>— Informações preliminares</span>
          <span>Sujeitas a alterações conforme aprovação dos órgãos competentes</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .ficha-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ficha-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FichaRow({ k, v, un, idx }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(245,247,246,0.15)',
      borderRight: '1px solid rgba(245,247,246,0.15)',
      padding: '28px 24px',
      display: 'flex', flexDirection: 'column', gap: 14,
    }} className="ficha-cell">
      <div style={{
        fontFamily: 'var(--f-mono)', fontSize: 10,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--neutral)',
      }}>
        — {String(idx).padStart(2,'0')} · {k}
      </div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        fontFamily: 'var(--f-display)',
      }}>
        <span style={{
          fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400,
          letterSpacing: '-0.02em', color: 'var(--paper)',
        }}>{v}</span>
        {un && (
          <span style={{
            fontSize: 14, fontWeight: 400,
            color: 'var(--neutral-2)',
          }}>{un}</span>
        )}
      </div>
    </div>
  );
}

window.FichaTecnica = FichaTecnica;
