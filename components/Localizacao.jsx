// Localização — MapLibre GL dark map + pontos de interesse
function Localizacao() {
  const mapRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [activePoi, setActivePoi] = React.useState(0);

  const CENTER = [-49.42506, -20.870295];
  const pois = [
    { name: 'SoHo Business',        coord: CENTER,                          tipo: 'Empreendimento', dist: '—' },
    { name: 'Shopping Iguatemi',    coord: [-49.4148336, -20.8666897],      tipo: 'Comércio',       dist: '~1,1 km' },
    { name: 'Hotel Hyatt Place',    coord: [-49.4153,    -20.8672],         tipo: 'Hotelaria',      dist: '~1,1 km' },
    { name: 'Avenida JK',           coord: [-49.4052388, -20.8328657],      tipo: 'Via arterial',   dist: '~4,6 km' },
  ];

  React.useEffect(() => {
    // Load MapLibre only once
    if (window.maplibregl) {
      initMap();
      return;
    }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';
    document.head.appendChild(css);

    const s = document.createElement('script');
    s.src = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
    s.onload = initMap;
    document.head.appendChild(s);

    function initMap() {
      if (!containerRef.current || mapRef.current) return;
      const map = new window.maplibregl.Map({
        container: containerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: CENTER,
        zoom: 13,
        attributionControl: { compact: true },
      });
      mapRef.current = map;

      map.on('load', () => {
        const bounds = new window.maplibregl.LngLatBounds();
        pois.forEach(p => bounds.extend(p.coord));
        map.fitBounds(bounds, { padding: 80, duration: 0, maxZoom: 14.5 });

        pois.forEach((p, i) => {
          const primary = i === 0;

          // Wrapper so label + dot move together as one marker
          const wrap = document.createElement('div');
          wrap.style.cssText = `
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            cursor: pointer; transition: transform 0.3s;
          `;

          const label = document.createElement('div');
          label.style.cssText = `
            font-family: 'Space Grotesk', sans-serif;
            font-size: ${primary ? 13 : 11}px;
            font-weight: ${primary ? 600 : 500};
            letter-spacing: ${primary ? '0.04em' : '0.06em'};
            text-transform: uppercase;
            color: #F5F7F6;
            background: rgba(10,10,10,0.82);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            padding: ${primary ? '6px 10px' : '4px 8px'};
            border: 1px solid rgba(245,247,246,${primary ? 0.35 : 0.18});
            white-space: nowrap;
          `;
          label.textContent = p.name;

          const dot = document.createElement('div');
          dot.style.cssText = `
            width: ${primary ? 22 : 14}px;
            height: ${primary ? 22 : 14}px;
            border-radius: 50%;
            background: ${primary ? '#F5F7F6' : 'transparent'};
            border: ${primary ? '3px solid #0A0A0A' : '1.5px solid #F5F7F6'};
            box-shadow: ${primary ? '0 0 0 4px rgba(245,247,246,0.25)' : 'none'};
          `;

          wrap.appendChild(label);
          wrap.appendChild(dot);
          wrap.addEventListener('mouseenter', () => wrap.style.transform = 'scale(1.06)');
          wrap.addEventListener('mouseleave', () => wrap.style.transform = 'scale(1)');
          wrap.addEventListener('click', () => {
            setActivePoi(i);
            map.flyTo({ center: p.coord, zoom: 16, duration: 900 });
          });

          // anchor: 'bottom' → the dot sits exactly on the coordinate,
          // and the label stacks above it. Both move together with the map.
          new window.maplibregl.Marker({ element: wrap, anchor: 'bottom' })
            .setLngLat(p.coord)
            .addTo(map);
        });

        map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      });
    }

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  const onPoiClick = (i) => {
    setActivePoi(i);
    if (mapRef.current) mapRef.current.flyTo({ center: pois[i].coord, zoom: 16, duration: 900 });
  };

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

        <h2 className="display reveal" style={{
          fontSize: 'clamp(44px, 6vw, 104px)', fontWeight: 400,
          marginTop: 72, maxWidth: 1100,
        }}>
          No eixo mais<br/>
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>ativo da cidade.</em>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: 'clamp(40px, 6vw, 120px)',
          marginTop: 72,
        }} className="loc-intro reveal">
          <div style={{
            fontFamily: 'var(--f-mono)', fontSize: 11,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--neutral-2)',
          }}>
            — Proximidades
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{
              fontSize: 20, lineHeight: 1.55, fontWeight: 300,
              color: 'var(--paper)', maxWidth: 720,
            }}>
              O SoHo Business chega para redefinir o conceito de investimento corporativo em São José do Rio Preto.
            </p>
            <p style={{
              fontSize: 16, lineHeight: 1.7, fontWeight: 400,
              color: 'var(--neutral-2)', maxWidth: 720,
            }}>
              Em uma das regiões mais valorizadas da cidade, ao lado do Shopping Iguatemi e próximo aos principais eixos de acesso, o empreendimento une visibilidade, conveniência e rentabilidade.
            </p>
            <p style={{
              fontSize: 16, lineHeight: 1.7, fontWeight: 400,
              color: 'var(--neutral-2)', maxWidth: 720,
            }}>
              Com fácil acesso pela BR-153 e Avenida Juscelino Kubitschek, o SoHo Business coloca você no ponto mais estratégico para trabalhar, investir e crescer. Mais do que um endereço comercial, é uma escolha inteligente para quem busca valor, credibilidade e potencial de retorno, com a solidez da FAJ Invest.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
          gap: 'clamp(24px, 3vw, 48px)',
          marginTop: 80, alignItems: 'stretch',
        }} className="loc-grid reveal">
          {/* Map */}
          <div ref={containerRef} style={{
            width: '100%', minHeight: 560,
            background: '#0A0A0A',
            border: '1px solid rgba(245,247,246,0.12)',
          }} />

          {/* POI list */}
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

            {pois.map((p, i) => {
              const on = i === activePoi;
              return (
                <button key={i} onClick={() => onPoiClick(i)} style={{
                  display: 'block', width: '100%',
                  textAlign: 'left', cursor: 'pointer',
                  background: on ? 'rgba(245,247,246,0.06)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(245,247,246,0.1)',
                  padding: '22px 20px 22px 0',
                  color: 'var(--paper)', fontFamily: 'inherit',
                  transition: 'background 0.3s',
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
                      fontFamily: 'var(--f-mono)', fontSize: 11,
                      color: on ? 'var(--paper)' : 'var(--neutral)',
                    }}>{p.dist}</div>
                  </div>
                </button>
              );
            })}

            <div style={{
              marginTop: 32, padding: '20px 0',
              borderTop: '1px solid rgba(245,247,246,0.15)',
            }}>
              <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 8 }}>— Endereço</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--paper)' }}>
                São José do Rio Preto — SP<br/>
                <span style={{ color: 'var(--neutral-2)', fontSize: 13 }}>Plus code: 4HHF+VX</span>
              </div>
              <a href="https://maps.app.goo.gl/UiZzvvtLrckwMrGX8" target="_blank" rel="noopener noreferrer"
                 className="btn on-dark" style={{ marginTop: 28 }}>
                Abrir no Maps <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .loc-grid { grid-template-columns: 1fr !important; }
          .loc-intro { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        .maplibregl-ctrl-attrib {
          background: rgba(10,10,10,0.7) !important;
          color: var(--neutral-2) !important;
        }
        .maplibregl-ctrl-attrib a { color: var(--paper) !important; }
      `}</style>
    </section>
  );
}

function FixedPin({ left, top, name, primary }) {
  return (
    <div style={{
      position: 'absolute', left, top,
      transform: 'translate(-50%, -50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: primary ? 13 : 11,
        fontWeight: primary ? 600 : 500,
        letterSpacing: primary ? '0.04em' : '0.06em',
        textTransform: 'uppercase',
        color: '#F5F7F6',
        background: 'rgba(10,10,10,0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: primary ? '6px 10px' : '4px 8px',
        border: `1px solid rgba(245,247,246,${primary ? 0.35 : 0.18})`,
        whiteSpace: 'nowrap',
      }}>{name}</div>
      <div style={{
        width: primary ? 22 : 14,
        height: primary ? 22 : 14,
        borderRadius: '50%',
        background: primary ? '#F5F7F6' : 'transparent',
        border: primary ? '3px solid #0A0A0A' : '1.5px solid #F5F7F6',
        boxShadow: primary ? '0 0 0 4px rgba(245,247,246,0.25)' : 'none',
      }} />
    </div>
  );
}

window.Localizacao = Localizacao;