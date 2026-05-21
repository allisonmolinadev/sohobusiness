// Diferenciais / amenidades — editorial list, large numerals
function Diferenciais() {
  const items = [
    {
      n: '01',
      title: 'Localização consolidada',
      body: 'Implantação em uma das regiões mais maduras e valorizadas da cidade — com infraestrutura de serviços, transporte e mobilidade plenamente estabelecidos.',
    },
    {
      n: '02',
      title: 'Flexibilidade de layout',
      body: 'Salas com laje livre, permitindo configurações de consultório, escritório tradicional, sala de reunião ou unidades integradas por união.',
    },
    {
      n: '03',
      title: 'Térreo ativado',
      body: 'Pavimento térreo com usos comerciais, café e lobby assinado — gerando fluxo e convivência no entorno imediato do edifício.',
    },
    {
      n: '04',
      title: 'Especificação premium',
      body: 'Fachada em materiais nobres, esquadrias de alto desempenho, elevadores inteligentes e climatização central por andar.',
    },
    {
      n: '05',
      title: 'Vagas e acessos',
      body: 'Subsolos com vagas lineares, bicicletário, bagageiro e acesso independente para entregas e serviços.',
    },
    {
      n: '06',
      title: 'Rooftop corporativo',
      body: 'Terraço panorâmico com sala de reuniões de uso coletivo, copa de apoio e lounge — disponível a todos os condôminos.',
    },
  ];

  return (
    <section id="diferenciais" style={{
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
          }}>02</span>
          <span className="eyebrow" style={{ color: 'var(--paper)' }}>
            — Diferenciais e amenidades
          </span>
        </div>

        <h2 className="display reveal" style={{
          fontSize: 'clamp(44px, 6vw, 104px)',
          fontWeight: 400,
          marginTop: 72,
          maxWidth: 1100,
        }}>
          Atributos que<br/>
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
            valorizam o ativo
          </em>
          &nbsp;no tempo.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginTop: 96,
          borderTop: '1px solid rgba(245,247,246,0.12)',
        }} className="dif-grid reveal">
          {items.map((it, i) => (
            <div key={it.n} style={{
              padding: '48px 40px 48px 0',
              borderRight: ((i + 1) % 3 !== 0) ? '1px solid rgba(245,247,246,0.12)' : 'none',
              borderBottom: (i < 3) ? '1px solid rgba(245,247,246,0.12)' : 'none',
              paddingLeft: (i % 3 === 0) ? 0 : 40,
            }} className="dif-cell">
              <div style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11, letterSpacing: '0.2em',
                color: 'var(--neutral)',
                marginBottom: 28,
              }}>— {it.n}</div>
              <h3 style={{
                fontFamily: 'var(--f-display)',
                fontSize: 24, fontWeight: 500,
                letterSpacing: '-0.015em', marginBottom: 16,
                color: 'var(--paper)',
              }}>{it.title}</h3>
              <p style={{
                fontSize: 15, lineHeight: 1.65, fontWeight: 400,
                color: 'var(--neutral-2)',
              }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dif-grid { grid-template-columns: 1fr !important; }
          .dif-cell {
            border-right: none !important;
            border-bottom: 1px solid rgba(245,247,246,0.12) !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

window.Diferenciais = Diferenciais;
