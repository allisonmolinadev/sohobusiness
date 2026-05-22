// Top navigation — minimal, fixo, com menu hambúrguer no mobile
const WHATSAPP_URL = 'https://wa.me/551732112420?text=Ol%C3%A1!%20Tenho%20interesse%20no%20SoHo%20Business.';

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc fecha o menu; resize para desktop também fecha
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Trava o scroll do body com o menu aberto
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '#empreendimento', label: 'Empreendimento' },
    { href: '#diferenciais',    label: 'Diferenciais' },
    { href: '#galeria',         label: 'Galeria' },
    { href: '#localizacao',     label: 'Localização' },
    { href: '#ficha',           label: 'Ficha técnica' },
    { href: '#plantas',         label: 'Tipologias' },
    { href: '#faj',             label: 'FAJ Invest' },
  ];

  return (
    <React.Fragment>
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
      background: (scrolled || menuOpen) ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(245,247,246,0.08)' : '1px solid transparent',
      transition: 'background 0.5s, backdrop-filter 0.5s, border-color 0.5s',
    }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        padding: '22px var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: 'var(--paper)',
      }}>
        <a href="#top" onClick={() => setMenuOpen(false)}
           style={{ display: 'block', height: 28 }}>
          <img src="assets/soho-logo-white.png" alt="SoHo Business"
               style={{ height: 28, width: 'auto' }} />
        </a>

        {/* Links — desktop */}
        <ul style={{
          display: 'flex', listStyle: 'none', gap: 38,
          alignItems: 'center',
        }} className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                color: 'var(--paper)',
                textDecoration: 'none',
                fontFamily: 'var(--f-body)',
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.78,
                transition: 'opacity 0.3s',
              }} onMouseEnter={e => e.currentTarget.style.opacity = 1}
                 onMouseLeave={e => e.currentTarget.style.opacity = 0.78}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
           className="nav-cta" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--f-body)',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--paper)',
          textDecoration: 'none',
          padding: '12px 20px',
          border: '1px solid rgba(245,247,246,0.4)',
          transition: 'background 0.3s, border-color 0.3s',
        }} onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--paper)';
          e.currentTarget.style.color = 'var(--ink)';
        }} onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--paper)';
        }}>
          <WhatsAppIcon />
          Contato
        </a>

        {/* Botão hambúrguer — mobile */}
        <button className="nav-burger" onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, padding: 0,
            background: 'transparent', border: 'none',
            color: 'var(--paper)', cursor: 'pointer',
          }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {menuOpen ? (
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media (min-width: 861px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </nav>

      {/* Painel de menu — mobile */}
      <div className="nav-mobile" style={{
        position: 'fixed', inset: 0, zIndex: 85,
        background: 'rgba(10,10,10,0.98)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '104px var(--gutter) 48px',
        overflowY: 'auto',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.35s ease, visibility 0.35s',
      }}>
        <ul style={{
          listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '12px 0',
                color: 'var(--paper)', textDecoration: 'none',
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(26px, 7vw, 42px)',
                fontWeight: 400, letterSpacing: '-0.02em',
              }}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
           onClick={() => setMenuOpen(false)}
           style={{
             display: 'inline-flex', alignItems: 'center', gap: 10,
             alignSelf: 'flex-start',
             marginTop: 40,
             fontFamily: 'var(--f-body)', fontSize: 12,
             letterSpacing: '0.16em', textTransform: 'uppercase',
             color: 'var(--ink)', textDecoration: 'none',
             padding: '16px 26px', background: 'var(--paper)',
           }}>
          <WhatsAppIcon />
          Contato
        </a>
      </div>
    </React.Fragment>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"
         style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

window.Nav = Nav;
