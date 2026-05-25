// Hero — 3 variants (tweakable). Default: editorial split.

function Hero({ variant = 'editorial' }) {
  return (
    <section id="top" style={{ position: 'relative', background: 'var(--ink)', color: 'var(--paper)' }}>
      {variant === 'editorial' && <HeroEditorial />}
      {variant === 'fullbleed' && <HeroFullbleed />}
      {variant === 'typographic' && <HeroTypographic />}
    </section>
  );
}

/* --------- Variant A: EDITORIAL
   Type block + tall image column, asymmetric grid, meta strip bottom.
   --------- */
function HeroEditorial() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
        gap: 'var(--gutter)',
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '160px var(--gutter) 80px',
        width: '100%',
      }} className="hero-grid">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="eyebrow" style={{ color: 'var(--neutral-2)', marginBottom: 40 }}>
            FAJ Invest&nbsp;&nbsp;·&nbsp;&nbsp;Lançamento 2026
          </div>
          <h1 className="display" style={{
            fontSize: 'clamp(56px, 9vw, 148px)',
            fontWeight: 300,
            color: 'var(--paper)',
          }}>
            Seu negócio<br/>
            <span style={{ fontWeight: 700 }}>e seu investimento:</span><br/>
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral-2)' }}>
              SoHo Business.
            </em>
          </h1>

          <p style={{
            maxWidth: 520,
            marginTop: 48,
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--neutral-2)',
            fontWeight: 300,
          }}>
            A FAJ Invest apresenta o SoHo Business, um novo empreendimento que marca nossa entrada no segmento de salas comerciais.
          </p>

          <div style={{ display: 'flex', gap: 14, marginTop: 56, flexWrap: 'wrap' }}>
            <a href="#empreendimento" className="btn on-dark">
              Conheça o empreendimento
              <span className="arrow">→</span>
            </a>
            <a href="#plantas" className="btn ghost" style={{
              color: 'var(--paper)', borderColor: 'rgba(245,247,246,0.35)'
            }}>
              Ver tipologias
            </a>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%', height: '100%', minHeight: 560,
            background: `url('assets/fachada-2.jpg') center/cover no-repeat`,
            border: '1px solid rgba(245,247,246,0.08)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 24, left: 24,
            padding: '14px 18px',
            background: 'rgba(10,10,10,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(245,247,246,0.18)',
            color: 'var(--paper)',
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            — 21 pavimentos · 415 unidades
          </div>
        </div>
      </div>

      {/* Meta strip — editorial signature line */}
      <MetaStrip />

      <style>{`
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-top: 140px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* --------- Variant B: FULLBLEED
   Image fills the entire viewport; type overlaid bottom-left.
   --------- */
/* Video da hero — YouTube via IFrame API, loop sem tela de fim */
function HeroVideo() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let player = null;
    let pollInterval = null;
    let cancelled = false;

    const buildPlayer = () => {
      if (cancelled || !containerRef.current) return;
      player = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        videoId: 'VpxxWOqdX_0',
        playerVars: {
          autoplay: 1, mute: 1, controls: 0,
          modestbranding: 1, rel: 0, iv_load_policy: 3,
          playsinline: 1, disablekb: 1, fs: 0, cc_load_policy: 0,
        },
        events: {
          onReady: (e) => {
            try { e.target.mute(); e.target.playVideo(); } catch (err) {}
            // Re-seek antes do fim — evita a tela preta / end screen do YouTube
            pollInterval = setInterval(() => {
              try {
                const dur = e.target.getDuration();
                const cur = e.target.getCurrentTime();
                if (dur > 0 && cur >= dur - 0.4) {
                  e.target.seekTo(0, true);
                  e.target.playVideo();
                }
              } catch (err) {}
            }, 200);
          },
          onStateChange: (e) => {
            // Fallback — se ainda chegar ao fim, volta pro inicio
            if (e.data === 0) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      buildPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        buildPlayer();
      };
      if (!document.querySelector('script[data-yt-iframe-api]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.setAttribute('data-yt-iframe-api', '1');
        document.head.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
      if (pollInterval) clearInterval(pollInterval);
      if (player) { try { player.destroy(); } catch (err) {} }
    };
  }, []);

  return (
    <div className="hero-video" style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: '#0A0A0A',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 'max(100vw, calc(100vh * 16 / 9))',
        height: 'max(100vh, calc(100vw * 9 / 16))',
        transform: 'translate(-50%, -50%)',
      }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Camada bloqueia toques/cliques sobre o video */}
      <div style={{ position: 'absolute', inset: 0 }} />
      <style>{`
        .hero-video iframe {
          width: 100% !important;
          height: 100% !important;
          display: block;
          border: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

function HeroFullbleed() {
  return (
    <div style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden' }}>
      {/* Full-bleed video (YouTube — nao listado, controlado via IFrame API) */}
      <HeroVideo />

      {/* Subtle vignette for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 28%, rgba(10,10,10,0.05) 55%, rgba(10,10,10,0.75) 100%)',
      }} />

      {/* Bottom bar — logo + meta + CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '0 var(--gutter) 40px',
      }}>
        <div className="hero-bar" style={{
          maxWidth: 'var(--max)', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', gap: 40, flexWrap: 'wrap',
        }}>
          {/* Left: wordmark + tagline + meta */}
          <div className="hero-bar-logo" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <img src="assets/logotipo-soho-business-com-slogan.png" alt="SoHo Business" style={{
                width: 'min(380px, 76vw)', height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 2px 24px rgba(0,0,0,0.35))',
              }} />
            </div>
          </div>

          {/* Right: CTA */}
          <a href="#empreendimento" className="btn on-dark">
            Conheça o empreendimento <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-bar {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-bar-logo img {
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}

function MiniMeta({ k, v }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{
        fontFamily: 'var(--f-mono)', fontSize: 10,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--neutral-2)', opacity: 0.8,
      }}>{k}</span>
      <span style={{
        fontFamily: 'var(--f-display)',
        fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em',
        color: 'var(--paper)',
      }}>{v}</span>
    </div>
  );
}

/* --------- Variant C: TYPOGRAPHIC
   Oversized wordmark-driven hero; image is an inset card.
   --------- */
function HeroTypographic() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '160px var(--gutter) 80px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
        <div className="eyebrow" style={{ color: 'var(--neutral-2)', marginBottom: 24 }}>
          — FAJ Invest apresenta
        </div>

        <h1 className="display" style={{
          fontSize: 'clamp(80px, 18vw, 320px)',
          fontWeight: 800,
          letterSpacing: '-0.055em',
          color: 'var(--paper)',
          lineHeight: 0.85,
        }}>
          SOHO<br/>
          BUSINESS
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--gutter)',
          marginTop: 64,
          alignItems: 'start',
        }} className="typo-grid">
          <div style={{ gridColumn: 'span 5' }} className="typo-cell">
            <div style={{
              width: '100%', height: 320,
              background: `url('assets/fachada-2.jpg') center/cover no-repeat`,
              border: '1px solid rgba(245,247,246,0.08)',
            }} />
          </div>
          <div style={{ gridColumn: 'span 4', paddingTop: 12 }} className="typo-cell">
            <p style={{
              fontSize: 18, lineHeight: 1.55, color: 'var(--neutral-2)',
              fontWeight: 300, marginBottom: 32, maxWidth: 420,
            }}>
              Salas comerciais na região mais consolidada da cidade. Produto concebido para o investidor que entende valor no longo prazo.
            </p>
            <a href="#empreendimento" className="btn on-dark">
              Conheça <span className="arrow">→</span>
            </a>
          </div>
          <div style={{
            gridColumn: 'span 3',
            borderLeft: '1px solid rgba(245,247,246,0.15)',
            paddingLeft: 24, paddingTop: 12,
          }} className="typo-cell">
            <div style={{ marginBottom: 28 }}>
              <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 6 }}>Andares</div>
              <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--paper)' }}>21</div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 6 }}>Unidades</div>
              <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--paper)' }}>415</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--neutral)', marginBottom: 6 }}>Lançamento</div>
              <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--paper)' }}>2026</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .typo-cell { grid-column: span 12 !important; border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

/* ---- Meta strip (bottom of hero editorial) ---- */
function MetaStrip() {
  const items = [
    { k: 'Tipologia',   v: 'Salas comerciais' },
    { k: 'Pavimentos',  v: '21' },
    { k: 'Unidades',    v: '415 salas' },
    { k: 'Localização', v: 'São José do Rio Preto — SP' },
    { k: 'Entrega',     v: 'Q4 2028' },
  ];
  return (
    <div style={{
      borderTop: '1px solid rgba(245,247,246,0.12)',
      borderBottom: '1px solid rgba(245,247,246,0.12)',
      background: 'var(--ink)',
    }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '22px var(--gutter)',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 24,
      }} className="meta-grid">
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            borderLeft: i === 0 ? 'none' : '1px solid rgba(245,247,246,0.10)',
            paddingLeft: i === 0 ? 0 : 20,
          }} className="meta-cell">
            <span className="eyebrow" style={{ color: 'var(--neutral)' }}>{it.k}</span>
            <span style={{
              fontSize: 15, fontWeight: 500, color: 'var(--paper)',
              letterSpacing: '-0.01em',
            }}>{it.v}</span>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 860px) {
          .meta-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .meta-cell { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

/* ---- Reusable striped image placeholder (monospace label) ---- */
function ImagePlaceholder({ label, height = 400, minHeight, dark = false, fill = false }) {
  const bg = dark
    ? 'repeating-linear-gradient(45deg, #1a1a1a 0, #1a1a1a 2px, #141414 2px, #141414 14px)'
    : 'repeating-linear-gradient(45deg, #E6E8E7 0, #E6E8E7 2px, #EEF0EF 2px, #EEF0EF 14px)';
  const border = dark ? '1px solid rgba(245,247,246,0.08)' : '1px solid rgba(10,10,10,0.08)';
  const color = dark ? 'var(--neutral)' : 'var(--neutral)';
  return (
    <div style={{
      position: fill ? 'absolute' : 'relative',
      inset: fill ? 0 : 'auto',
      width: '100%',
      height,
      minHeight,
      background: bg,
      border,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
      padding: 20,
      overflow: 'hidden',
    }}>
      <span style={{
        fontFamily: 'var(--f-mono)', fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color,
        background: dark ? 'rgba(10,10,10,0.6)' : 'rgba(245,247,246,0.85)',
        padding: '6px 10px',
      }}>
        [ {label} ]
      </span>
    </div>
  );
}

window.Hero = Hero;
window.ImagePlaceholder = ImagePlaceholder;
