// Top navigation — minimal, fixed, blends into hero
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#empreendimento', label: 'Empreendimento' },
    { href: '#diferenciais',    label: 'Diferenciais' },
    { href: '#galeria',         label: 'Galeria' },
    { href: '#localizacao',     label: 'Localização' },
    { href: '#ficha',           label: 'Ficha técnica' },
    { href: '#plantas',         label: 'Plantas' },
    { href: '#faj',             label: 'FAJ Invest' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
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
        <a href="#top" style={{ display: 'block', height: 28 }}>
          <img src="assets/soho-logo-white.png" alt="SoHo Business"
               style={{ height: 28, width: 'auto' }} />
        </a>

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

        <a href="#contato" style={{
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
          Interesse
        </a>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

window.Nav = Nav;
