// Main composition

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "fullbleed"
}/*EDITMODE-END*/;

function useRevealObserver() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  });
}

function App() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = React.useState(false);

  useRevealObserver();

  // Edit-mode protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweak = (key, val) => {
    setTweaks(prev => {
      const next = { ...prev, [key]: val };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
      return next;
    });
  };

  return (
    <React.Fragment>
      <Nav />
      <Hero variant={tweaks.heroVariant} />
      <Sobre />
      <Diferenciais />
      <Galeria />
      <Localizacao />
      <FichaTecnica />
      <Plantas />
      <FajInvest />
      <Footer />
      {editMode && <Tweaks tweaks={tweaks} onUpdate={updateTweak} />}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
