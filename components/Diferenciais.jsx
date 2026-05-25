// Diferenciais / amenidades — editorial list, large numerals + ícones animados

/* ---- Ícones line-style (stroke = currentColor) ---- */
const difIcons = {
  local: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.5s-6.5-5.2-6.5-10.5a6.5 6.5 0 1 1 13 0c0 5.3-6.5 10.5-6.5 10.5Z"/>
      <circle cx="12" cy="11" r="2.4"/>
    </svg>
  ),
  layout: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M11 9v12"/>
    </svg>
  ),
  loja: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5V20h16V9.5"/>
      <path d="M2.5 9.5 4.5 4h15l2 5.5"/>
      <path d="M2.5 9.5a3 3 0 0 0 5.8 0 3 3 0 0 0 5.8 0 3 3 0 0 0 5.8 0"/>
      <path d="M9.5 20v-5.5h5V20"/>
    </svg>
  ),
  premium: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h14l3 6-10 12L2 9l3-6Z"/>
      <path d="M2 9h20M8 3 6 9l6 12 6-12-2-6"/>
    </svg>
  ),
  carro: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5 5.6 7.8A2.5 2.5 0 0 1 8 6h8a2.5 2.5 0 0 1 2.4 1.8L20 12.5"/>
      <path d="M3 12.5h18V18H3z"/>
      <circle cx="7.5" cy="18" r="1.6"/>
      <circle cx="16.5" cy="18" r="1.6"/>
    </svg>
  ),
  rooftop: (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="11" r="3.5"/>
      <path d="M12 3v1.8M12 17.2V19M4.2 11H2.4M21.6 11h-1.8M6.4 5.4 5.1 4.1M18.9 4.1l-1.3 1.3"/>
      <path d="M3 21h18"/>
    </svg>
  ),
};

function Diferenciais() {
  const items = [
    {
      n: '01',
      icon: difIcons.local,
      title: 'Localização consolidada',
      body: 'Implantação em uma das regiões mais maduras e valorizadas da cidade — com infraestrutura de serviços, transporte e mobilidade plenamente estabelecidos.',
    },
    {
      n: '02',
      icon: difIcons.layout,
      title: 'Flexibilidade de layout',
      body: 'Salas com laje livre, permitindo configurações de consultório, escritório tradicional, sala de reunião ou unidades integradas por união.',
    },
    {
      n: '03',
      icon: difIcons.loja,
      title: 'Térreo ativado',
      body: 'Pavimento térreo com usos comerciais, café e lobby assinado — gerando fluxo e convivência no entorno imediato do edifício.',
    },
    {
      n: '04',
      icon: difIcons.premium,
      title: 'Especificação premium',
      body: 'Fachada em materiais nobres, esquadrias de alto desempenho, elevadores inteligentes e climatização central por andar.',
    },
    {
      n: '05',
      icon: difIcons.carro,
      title: 'Vagas e acessos',
      body: 'Subsolos com vagas lineares, bicicletário, bagageiro e acesso independente para entregas e serviços.',
    },
    {
      n: '06',
      icon: difIcons.rooftop,
      title: 'Rooftop corporativo',
      body: 'Terraço panorâmico com sala de reuniões de uso coletivo, copa de apoio e lounge — disponível a todos os condôminos.',
    },
  ];

  return (
    <section id="diferenciais" style={{
      background: 'var(--ink)',
      color: 'var(--paper)',
      padding: '160px var(--gutter)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 'clamp(32px, 5vw, 88px)',
          alignItems: 'stretch',
        }} className="dif-head reveal">
          {/* Esquerda — etiqueta + título */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            paddingBottom: 'clamp(48px, 7vw, 104px)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 24,
              borderTop: '1px solid rgba(245,247,246,0.15)',
              paddingTop: 24,
            }}>
              <span style={{
                fontFamily: 'var(--f-mono)', fontSize: 11,
                letterSpacing: '0.2em', color: 'var(--neutral)',
              }}>02</span>
              <span className="eyebrow" style={{ color: 'var(--paper)' }}>
                — Diferenciais e amenidades
              </span>
            </div>
            <h2 className="display" style={{
              fontSize: 'clamp(40px, 4.8vw, 84px)',
              fontWeight: 400,
              marginTop: 'clamp(56px, 8vw, 120px)',
            }}>
              Atributos que<br/>
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
                valorizam o ativo
              </em><br/>
              no tempo.
            </h2>
          </div>

          {/* Direita — fachada alinhada de ponta a ponta */}
          <img src="assets/fachada-2-square.jpg" alt="Fachada do empreendimento" style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginTop: 0,
          borderTop: '1px solid rgba(245,247,246,0.12)',
        }} className="dif-grid reveal">
          {items.map((it, i) => (
            <div key={it.n} style={{
              padding: '48px 40px 48px 0',
              borderRight: ((i + 1) % 3 !== 0) ? '1px solid rgba(245,247,246,0.12)' : 'none',
              borderBottom: (i < 3) ? '1px solid rgba(245,247,246,0.12)' : 'none',
              paddingLeft: (i % 3 === 0) ? 0 : 40,
            }} className="dif-cell">
              <div className="dif-icon" style={{ color: 'var(--neutral)', marginBottom: 26 }}>
                {it.icon}
              </div>
              <div style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11, letterSpacing: '0.2em',
                color: 'var(--neutral)',
                marginBottom: 14,
              }}>— {it.n}</div>
              <h3 className="dif-title" style={{
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
        .dif-cell {
          transition: background 0.45s ease;
        }
        .dif-cell:hover {
          background: rgba(245,247,246,0.04);
        }
        .dif-icon {
          display: inline-block;
          transition: transform 0.5s cubic-bezier(.2,.7,.2,1),
                      color 0.4s ease;
        }
        .dif-icon svg { display: block; }
        .dif-cell:hover .dif-icon {
          transform: translateY(-6px) scale(1.12);
          color: var(--paper);
        }
        .dif-title {
          transition: transform 0.45s cubic-bezier(.2,.7,.2,1);
        }
        .dif-cell:hover .dif-title {
          transform: translateX(8px);
        }
        @media (prefers-reduced-motion: reduce) {
          .dif-icon, .dif-title { transition: none; }
          .dif-cell:hover .dif-icon,
          .dif-cell:hover .dif-title { transform: none; }
        }
        @media (max-width: 980px) {
          .dif-head { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dif-head > img { height: auto !important; aspect-ratio: 16 / 11; }
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
