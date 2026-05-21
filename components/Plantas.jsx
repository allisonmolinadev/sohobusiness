// Plantas e tipologias — selectable tabs, schematic floorplan placeholder
function Plantas() {
  const tipos = [
    { id: 't1', area: '34m²', nome: 'Essencial',   vagas: '1', config: 'Laje livre', desc: 'Formato enxuto, ideal para profissional liberal ou escritório individual.' },
    { id: 't2', area: '52m²', nome: 'Studio',      vagas: '1', config: 'Laje livre + copa', desc: 'Versatilidade para escritório com equipe reduzida ou consultório com sala de espera.' },
    { id: 't3', area: '74m²', nome: 'Dual',        vagas: '2', config: 'Duas salas + copa', desc: 'Sala principal com possibilidade de divisão — recebimento e trabalho independentes.' },
    { id: 't4', area: '112m²', nome: 'Executivo',  vagas: '3', config: 'Modular', desc: 'Unidade dupla unida, atendendo equipes maiores, escritórios societários ou clínicas.' },
  ];
  const [active, setActive] = React.useState('t2');
  const cur = tipos.find(t => t.id === active);

  return (
    <section id="plantas" style={{
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '160px var(--gutter)',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <SectionLabel num="06" label="Plantas e tipologias" />

        <h2 className="display reveal" style={{
          fontSize: 'clamp(44px, 6vw, 104px)',
          fontWeight: 400, marginTop: 72, maxWidth: 900,
        }}>
          Quatro tipologias,<br/>
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral)' }}>
            infinitas composições.
          </em>
        </h2>

        {/* Tabs */}
        <div style={{
          marginTop: 80,
          display: 'flex', gap: 0,
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          flexWrap: 'wrap',
        }} className="reveal">
          {tipos.map((t, i) => {
            const on = t.id === active;
            return (
              <button key={t.id} onClick={() => setActive(t.id)} style={{
                flex: '1 1 200px',
                padding: '26px 28px',
                background: on ? 'var(--ink)' : 'transparent',
                color: on ? 'var(--paper)' : 'var(--ink)',
                border: 'none',
                borderRight: i < tipos.length - 1 ? '1px solid var(--line)' : 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.3s, color 0.3s',
              }}>
                <div style={{
                  fontFamily: 'var(--f-mono)', fontSize: 10,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: on ? 'var(--neutral-2)' : 'var(--neutral)',
                  marginBottom: 8,
                }}>Tipologia 0{i+1}</div>
                <div style={{
                  fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em',
                }}>{t.nome}</div>
                <div style={{
                  fontFamily: 'var(--f-mono)', fontSize: 11,
                  color: on ? 'var(--neutral-2)' : 'var(--neutral)',
                  marginTop: 6,
                }}>{t.area}</div>
              </button>
            );
          })}
        </div>

        {/* Active tipologia */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 100px)',
          marginTop: 80,
        }} className="plantas-active reveal" key={cur.id}>
          <SchematicFloorPlan tipo={cur.id} />
          <div style={{ paddingTop: 12 }}>
            <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 20 }}>
              — {cur.nome}
            </div>
            <h3 className="display" style={{
              fontSize: 'clamp(44px, 5vw, 72px)',
              fontWeight: 400,
            }}>
              {cur.area}
            </h3>
            <p style={{
              fontSize: 17, lineHeight: 1.7, color: '#333',
              marginTop: 32, maxWidth: 520,
            }}>
              {cur.desc}
            </p>

            <div style={{
              marginTop: 48, borderTop: '1px solid var(--line)',
            }}>
              <Row k="Configuração" v={cur.config} />
              <Row k="Vagas de garagem" v={cur.vagas} />
              <Row k="Pé-direito" v="3,20m" />
              <Row k="Orientação" v="Nordeste / Sudoeste" />
            </div>

            <a href="#contato" className="btn" style={{ marginTop: 40 }}>
              Solicitar planta completa <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .plantas-active { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Row({ k, v }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '18px 0', borderBottom: '1px solid var(--line)',
    }}>
      <span className="eyebrow" style={{ color: 'var(--neutral)' }}>{k}</span>
      <span style={{
        fontFamily: 'var(--f-display)', fontSize: 16, fontWeight: 500,
        letterSpacing: '-0.01em',
      }}>{v}</span>
    </div>
  );
}

function SchematicFloorPlan({ tipo }) {
  // Schematic placeholder — simple architectural-style floor plan rendered in SVG
  const plans = {
    t1: (
      <g>
        <rect x="40" y="40" width="320" height="220" fill="none" stroke="#0A0A0A" strokeWidth="2"/>
        <line x1="40" y1="140" x2="200" y2="140" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="200" y1="40" x2="200" y2="140" stroke="#0A0A0A" strokeWidth="1"/>
        <text x="120" y="95" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">ESCRITÓRIO</text>
        <text x="275" y="95" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">LAVABO</text>
        <text x="120" y="205" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">COPA</text>
        <line x1="55" y1="258" x2="75" y2="258" stroke="#0A0A0A" strokeWidth="2"/>
      </g>
    ),
    t2: (
      <g>
        <rect x="40" y="40" width="360" height="220" fill="none" stroke="#0A0A0A" strokeWidth="2"/>
        <line x1="40" y1="160" x2="260" y2="160" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="260" y1="40" x2="260" y2="260" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="260" y1="150" x2="400" y2="150" stroke="#0A0A0A" strokeWidth="1"/>
        <text x="120" y="105" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">SALA PRINCIPAL</text>
        <text x="310" y="100" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">COPA</text>
        <text x="310" y="210" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">LAVABO</text>
        <text x="120" y="215" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">RECEPÇÃO</text>
        <line x1="55" y1="258" x2="75" y2="258" stroke="#0A0A0A" strokeWidth="2"/>
      </g>
    ),
    t3: (
      <g>
        <rect x="40" y="40" width="400" height="220" fill="none" stroke="#0A0A0A" strokeWidth="2"/>
        <line x1="240" y1="40" x2="240" y2="260" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="240" y1="150" x2="440" y2="150" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="340" y1="150" x2="340" y2="260" stroke="#0A0A0A" strokeWidth="1"/>
        <text x="110" y="155" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">SALA A</text>
        <text x="290" y="100" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">SALA B</text>
        <text x="260" y="210" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">COPA</text>
        <text x="355" y="210" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">LAVABO</text>
        <line x1="55" y1="258" x2="75" y2="258" stroke="#0A0A0A" strokeWidth="2"/>
      </g>
    ),
    t4: (
      <g>
        <rect x="40" y="40" width="440" height="220" fill="none" stroke="#0A0A0A" strokeWidth="2"/>
        <line x1="260" y1="40" x2="260" y2="260" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="40" y1="170" x2="260" y2="170" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="260" y1="150" x2="480" y2="150" stroke="#0A0A0A" strokeWidth="1"/>
        <line x1="370" y1="150" x2="370" y2="260" stroke="#0A0A0A" strokeWidth="1"/>
        <text x="110" y="110" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">SALA REUNIÕES</text>
        <text x="110" y="220" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">ESTAÇÕES</text>
        <text x="300" y="100" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">GERÊNCIA</text>
        <text x="280" y="210" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">COPA</text>
        <text x="395" y="210" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E8E" letterSpacing="1.5">LAVABO</text>
        <line x1="55" y1="258" x2="75" y2="258" stroke="#0A0A0A" strokeWidth="2"/>
      </g>
    ),
  };

  return (
    <div style={{
      background: '#F0F2F1',
      border: '1px solid rgba(10,10,10,0.08)',
      padding: 32,
      position: 'relative',
      aspectRatio: '4 / 3',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg viewBox="0 0 520 300" width="100%" height="100%"
        style={{ display: 'block' }}>
        {plans[tipo]}
      </svg>
      <div style={{
        position: 'absolute', top: 20, left: 20,
        fontFamily: 'var(--f-mono)', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--neutral)',
      }}>— Planta esquemática</div>
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        fontFamily: 'var(--f-mono)', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--neutral)',
      }}>N ↑</div>
    </div>
  );
}

window.Plantas = Plantas;
