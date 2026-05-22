// Sobre o empreendimento — editorial copy block with vertical section label
function Sobre() {
  return (
    <section id="empreendimento" style={{
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '160px var(--gutter)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <SectionLabel num="01" label="O empreendimento" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
          gap: 'clamp(40px, 6vw, 120px)',
          marginTop: 80,
        }} className="sobre-grid reveal">
          <div>
            <h2 className="display" style={{
              fontSize: 'clamp(34px, 3.6vw, 58px)',
              fontWeight: 400,
            }}>
              Seu negócio<br/>
              e seu <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral)' }}>investimento.</em>
            </h2>
            <div style={{
              marginTop: 48,
              width: '100%',
              aspectRatio: '4 / 5',
              background: "url('assets/fachada-2.jpg') center/cover no-repeat",
              border: '1px solid var(--line)',
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 16 }}>
            <p style={{
              fontSize: 20, lineHeight: 1.55, fontWeight: 300,
              color: 'var(--ink)', maxWidth: 620,
            }}>
              A FAJ Invest apresenta o SoHo Business, um novo empreendimento que marca nossa entrada no segmento de salas comerciais.
            </p>
            <p style={{
              fontSize: 17, lineHeight: 1.7, fontWeight: 400,
              color: '#333', maxWidth: 620,
            }}>
              Localizado próximo ao Shopping Iguatemi, em uma das regiões mais valorizadas da cidade, o SoHo Business une conveniência e rentabilidade. Mais do que um endereço, é uma oportunidade para quem busca investir com consciência e segurança.
            </p>
            <p style={{
              fontSize: 17, lineHeight: 1.7, fontWeight: 400,
              color: '#333', maxWidth: 620,
            }}>
              Agora, seu investimento e seu negócio podem compartilhar o mesmo espaço, com o selo de solidez e transparência da FAJ Invest.
            </p>
            <p style={{
              fontSize: 17, lineHeight: 1.7, fontWeight: 400,
              color: '#333', maxWidth: 620,
            }}>
              O SoHo Business reúne salas comerciais, centro comercial integrado e espaços de convivência em um empreendimento completo, pensado para valorizar empresas, investidores e o fluxo de pessoas no dia a dia. Com hall amplo, estacionamento com valet, áreas externas de convivência e lojas integradas ao projeto, o empreendimento oferece mais praticidade, estrutura e movimento para quem trabalha, investe ou circula pelo espaço.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              marginTop: 32, borderTop: '1px solid var(--line)',
            }} className="sobre-stats">
              <Stat label="Área privativa" value="32 — 322,57m²" first />
              <Stat label="Unidades" value="454 salas" />
              <Stat label="Pavimentos" value="21" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .sobre-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .sobre-stats { grid-template-columns: 1fr !important; }
          .sobre-stats > * + * { border-top: 1px solid var(--line) !important; }
        }
      `}</style>
    </section>
  );
}

function Stat({ label, value, first }) {
  return (
    <div style={{
      padding: `32px 28px 32px ${first ? 0 : 28}px`,
      borderRight: '1px solid var(--line)',
    }} className="stat">
      <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 12 }}>{label}</div>
      <div style={{
        fontFamily: 'var(--f-display)',
        fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em',
      }}>{value}</div>
    </div>
  );
}

function SectionLabel({ num, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      borderTop: '1px solid var(--line)',
      paddingTop: 24,
    }} className="reveal">
      <span style={{
        fontFamily: 'var(--f-mono)',
        fontSize: 11, letterSpacing: '0.2em',
        color: 'var(--neutral)',
      }}>{num}</span>
      <span className="eyebrow" style={{ color: 'var(--ink)' }}>
        — {label}
      </span>
    </div>
  );
}

window.Sobre = Sobre;
window.Stat = Stat;
window.SectionLabel = SectionLabel;
