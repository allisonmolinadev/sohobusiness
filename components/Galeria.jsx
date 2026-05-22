// Galeria — carrossel editorial, 2 imagens por vez
function Galeria() {
  const images = [
    { src: 'assets/drone-sunset.jpg',    label: 'Vista aérea',        caption: 'Implantação ao pôr do sol' },
    { src: 'assets/acesso-fachada.jpg',  label: 'Acesso principal',   caption: 'Entrada pelo passeio ajardinado' },
    { src: 'assets/acesso-fachada-2.jpg',label: 'Acesso — volumetria',caption: 'Composição de fachada e acesso de veículos' },
    { src: 'assets/fachada-2.jpg',       label: 'Fachada frontal',    caption: '21 pavimentos · fachada em vidro e alumínio' },
    { src: 'assets/fachada-lateral.jpg', label: 'Fachada lateral',    caption: 'Volume térreo em pele metálica branca' },
    { src: 'assets/fachada-secundaria.jpg', label: 'Fachada secundária', caption: 'Acesso secundário com tratamento paisagístico' },
    { src: 'assets/drone-01.jpg',        label: 'Vista diurna',       caption: 'Implantação no contexto do bairro' },
    { src: 'assets/drone-02.jpg',        label: 'Vista aproximada',   caption: 'Ângulo sudoeste' },
    { src: 'assets/hall-01.jpg',         label: 'Hall principal',     caption: 'Recepção com revestimentos nobres' },
    { src: 'assets/hall-02.jpg',         label: 'Hall — lounge',      caption: 'Espaço de espera com curadoria artística' },
    { src: 'assets/hall-03.jpg',         label: 'Hall — estar',       caption: 'Ambiente de convivência' },
    { src: 'assets/praca-01.jpg',        label: 'Praça comercial',    caption: 'Térreo ativado com espelho d’água' },
    { src: 'assets/praca-02.jpg',        label: 'Passarela',          caption: 'Eixo de circulação externo' },
    { src: 'assets/praca-03.jpg',        label: 'Galeria externa',    caption: 'Cobertura com vegetação suspensa' },
    { src: 'assets/praca-04.jpg',        label: 'Passeio comercial',  caption: 'Vista interna dos acessos' },
    { src: 'assets/sala-01.jpg',         label: 'Sala tipo',          caption: 'Layout corporativo sugerido' },
    { src: 'assets/sala-02.jpg',         label: 'Sala tipo — trabalho',caption: 'Configuração para escritório tradicional' },
    { src: 'assets/sala-dentista.jpg',   label: 'Sala — saúde',       caption: 'Configuração para consultório' },
  ];

  // STEP = quantas imagens são exibidas/avançadas por vez
  const STEP = 2;
  const [idx, setIdx] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(false);
  const carouselRef = React.useRef(null);
  const thumbsRef = React.useRef(null);
  const touchRef = React.useRef({ x: 0, dx: 0 });

  const next = React.useCallback(() => setIdx(i => (i + STEP) % images.length), [images.length]);
  const prev = React.useCallback(() => setIdx(i => (i - STEP + images.length) % images.length), [images.length]);

  // Autoplay (pausa no hover)
  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [autoplay, next]);

  // Navegação por teclado (somente com a galeria visível)
  React.useEffect(() => {
    const onKey = (e) => {
      const el = carouselRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2;
      if (!visible) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Mantém a miniatura ativa visível
  React.useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const active = container.children[idx];
    if (active) {
      const cRect = container.getBoundingClientRect();
      const aRect = active.getBoundingClientRect();
      const offset = (aRect.left - cRect.left) - (cRect.width / 2) + (aRect.width / 2);
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }, [idx]);

  // Swipe em telas touch
  const onTouchStart = (e) => { touchRef.current.x = e.touches[0].clientX; touchRef.current.dx = 0; };
  const onTouchMove = (e) => { touchRef.current.dx = e.touches[0].clientX - touchRef.current.x; };
  const onTouchEnd = () => {
    if (Math.abs(touchRef.current.dx) > 50) {
      touchRef.current.dx < 0 ? next() : prev();
    }
  };

  // Índices das 2 imagens visíveis
  const visible = Array.from({ length: STEP }, (_, k) => (idx + k) % images.length);
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section id="galeria" style={{
      background: 'linear-gradient(rgba(10,10,10,0.78), rgba(10,10,10,0.78)), url(assets/background.jpg) center/cover no-repeat',
      color: 'var(--paper)',
      padding: '160px 0 120px',
    }} ref={carouselRef}
       onMouseEnter={() => setAutoplay(false)}
       onMouseLeave={() => setAutoplay(true)}>

      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '0 var(--gutter)', width: '100%',
      }}>
        {/* Cabeçalho da seção */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          borderTop: '1px solid rgba(245,247,246,0.15)',
          paddingTop: 24,
        }} className="reveal">
          <span style={{
            fontFamily: 'var(--f-mono)', fontSize: 11,
            letterSpacing: '0.2em', color: 'var(--neutral)',
          }}>03</span>
          <span className="eyebrow" style={{ color: 'var(--paper)' }}>
            — Galeria
          </span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginTop: 72, gap: 40, flexWrap: 'wrap',
        }} className="reveal">
          <h2 className="display" style={{
            fontSize: 'clamp(44px, 6vw, 104px)',
            fontWeight: 400, maxWidth: 900,
          }}>
            Materialidade<br/>
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
              e presença.
            </em>
          </h2>
          <div style={{
            fontFamily: 'var(--f-mono)', fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--neutral-2)',
          }}>
            {pad(visible[0] + 1)}–{pad(visible[STEP - 1] + 1)} <span style={{ opacity: 0.5 }}>/ {pad(images.length)}</span>
          </div>
        </div>
      </div>

      {/* Visualizador — 2 imagens lado a lado, sem corte (contain) */}
      <div style={{ position: 'relative', marginTop: 72 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Barra de progresso */}
        <div style={{
          height: 2, background: 'rgba(245,247,246,0.12)',
        }}>
          <div style={{
            height: '100%',
            width: `${((idx + STEP) / images.length) * 100}%`,
            background: 'var(--paper)',
            transition: 'width 0.5s cubic-bezier(.2,.7,.2,1)',
          }} />
        </div>

        {/* Par de imagens */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
        }} className="gal-pair">
          {visible.map((i, k) => {
            const im = images[i];
            return (
              <div key={`${idx}-${k}`} style={{
                position: 'relative',
                aspectRatio: '16 / 10',
                background: '#0A0A0A',
                overflow: 'hidden',
              }} className="gal-slide">
                <img src={im.src} alt={im.caption} style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                }} />
                {/* Vinheta para legibilidade da legenda */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(10,10,10,0) 58%, rgba(10,10,10,0.65) 100%)',
                  pointerEvents: 'none',
                }} />
                {/* Legenda */}
                <div style={{
                  position: 'absolute', left: 24, right: 24, bottom: 22,
                  color: 'var(--paper)',
                }}>
                  <div style={{
                    fontFamily: 'var(--f-mono)', fontSize: 10,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'var(--neutral-2)', marginBottom: 8,
                  }}>— {im.label}</div>
                  <div style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: 'clamp(15px, 1.5vw, 20px)',
                    fontWeight: 400, lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}>{im.caption}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Setas de navegação */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: 12,
          maxWidth: 'var(--max)', margin: '20px auto 0',
          padding: '0 var(--gutter)',
        }}>
          <ArrowBtn onClick={prev} direction="prev" />
          <ArrowBtn onClick={next} direction="next" />
        </div>
      </div>

      {/* Miniaturas */}
      <div style={{
        marginTop: 8,
        padding: '0 var(--gutter)',
        maxWidth: 'var(--max)', margin: '8px auto 0',
      }}>
        <div ref={thumbsRef} style={{
          display: 'flex', gap: 8,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: 4,
        }} className="thumb-strip">
          {images.map((im, i) => {
            const on = visible.includes(i);
            return (
              <button key={i} onClick={() => setIdx(i - (i % STEP))} style={{
                flex: '0 0 auto',
                width: 108, height: 72,
                padding: 0, cursor: 'pointer',
                background: `url('${im.src}') center/cover no-repeat`,
                border: 'none',
                outline: on ? '2px solid var(--paper)' : '2px solid transparent',
                outlineOffset: -2,
                opacity: on ? 1 : 0.5,
                transition: 'opacity 0.3s, outline-color 0.3s',
                position: 'relative',
              }} onMouseEnter={e => { if (!on) e.currentTarget.style.opacity = 0.85; }}
                 onMouseLeave={e => { if (!on) e.currentTarget.style.opacity = 0.5; }}>
                <span style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Rodapé da seção */}
      <div style={{
        maxWidth: 'var(--max)', margin: '40px auto 0',
        padding: '0 var(--gutter)',
        display: 'flex', justifyContent: 'space-between',
        borderTop: '1px solid rgba(245,247,246,0.12)', paddingTop: 20,
        fontFamily: 'var(--f-mono)', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--neutral)', flexWrap: 'wrap', gap: 12,
      }} className="reveal">
        <span>— {pad(images.length)} imagens</span>
        <span>Imagens preliminares · sujeitas a alterações</span>
      </div>

      <style>{`
        .thumb-strip::-webkit-scrollbar { display: none; }
        .gal-slide {
          animation: gal-fade-in 0.8s cubic-bezier(.2,.7,.2,1);
        }
        @keyframes gal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 760px) {
          .gal-pair { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ArrowBtn({ onClick, direction }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 56, height: 56,
        border: '1px solid rgba(245,247,246,0.4)',
        background: hover ? 'var(--paper)' : 'transparent',
        color: hover ? 'var(--ink)' : 'var(--paper)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.3s, color 0.3s, border-color 0.3s',
      }}
      aria-label={direction === 'next' ? 'Próxima' : 'Anterior'}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {direction === 'next' ? (
          <path d="M1 9H17M17 9L10 2M17 9L10 16" stroke="currentColor" strokeWidth="1.2"/>
        ) : (
          <path d="M17 9H1M1 9L8 16M1 9L8 2" stroke="currentColor" strokeWidth="1.2"/>
        )}
      </svg>
    </button>
  );
}

window.Galeria = Galeria;
