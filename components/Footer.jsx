// Footer + CTA strip
function Footer() {
  return (
    <React.Fragment>
      {/* Contact CTA */}
      <section id="contato" style={{
        background: 'var(--paper)',
        color: 'var(--ink)',
        padding: '140px var(--gutter) 0',
        borderTop: '1px solid var(--line)',
      }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.78fr) minmax(0, 1.22fr)',
            gap: 'clamp(40px, 6vw, 96px)',
            alignItems: 'start',
          }} className="cta-grid reveal">
            {/* Esquerda — só a fachada */}
            <img src="assets/fachada-form.png" alt="Fachada do SoHo Business" style={{
              width: '100%', height: 'auto', display: 'block',
              alignSelf: 'end',
            }} />

            {/* Direita — título, subtítulo e formulário */}
            <div style={{ paddingBottom: 'clamp(80px, 8vw, 120px)' }}>
              <h2 className="display" style={{
                fontSize: 'clamp(30px, 3vw, 48px)',
                fontWeight: 400,
                lineHeight: 1.12,
              }}>
                Faça parte do próximo movimento{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--neutral)' }}>
                  de negócios da cidade!
                </em>
              </h2>

              <p style={{
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.4, fontWeight: 400,
                color: 'var(--ink)',
                marginTop: 20,
              }}>
                Cadastre-se e conheça o SoHo Business.
              </p>

              <p style={{
                fontSize: 16, lineHeight: 1.65, color: '#333',
                marginTop: 24, marginBottom: 32, maxWidth: 460,
              }}>
                Material completo com plantas, especificações, projeto arquitetônico e valores sob consulta.
              </p>
              <Form />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '80px var(--gutter) 40px',
      }}>
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
            gap: 40, paddingBottom: 72,
            borderBottom: '1px solid rgba(245,247,246,0.12)',
          }} className="foot-grid">
            <div>
              <img src="assets/soho-logo-white.png" alt="SoHo Business"
                   style={{ height: 36, width: 'auto', marginBottom: 28 }} />
              <p style={{
                fontSize: 13, lineHeight: 1.65, color: 'var(--neutral-2)',
                maxWidth: 300,
              }}>
                Empreendimento comercial realizado pela FAJ Invest. Lançamento 2026.
              </p>
            </div>

            <FCol title="Empreendimento" items={[
              { label: 'Sobre', href: '#empreendimento' },
              { label: 'Diferenciais', href: '#diferenciais' },
              { label: 'Galeria', href: '#galeria' },
              { label: 'Tipologias', href: '#plantas' },
            ]} />
            <FCol title="Institucional" items={[
              { label: 'FAJ Invest', href: '#faj' },
              { label: 'Política de privacidade', href: '#' },
              { label: 'Termos de uso', href: '#' },
            ]} />
            <FCol title="Contato" items={[
              { label: 'contato@sohobusiness.com.br', href: '#' },
              { label: '+55 (XX) XXXX-XXXX', href: '#' },
              { label: 'Endereço da obra', href: '#' },
            ]} />
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingTop: 32, flexWrap: 'wrap', gap: 16,
            fontFamily: 'var(--f-mono)', fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--neutral)',
          }}>
            <span>© 2026 FAJ Invest · Todos os direitos reservados</span>
            <span>Perspectiva artística — imagens ilustrativas</span>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .foot-grid { grid-template-columns: 1fr !important; }
            .cta-grid {
              grid-template-columns: 1fr !important;
              align-items: start !important;
            }
            .cta-grid > div { order: 1; }
            .cta-grid > img { order: 2; }
          }
        `}</style>
      </footer>

      {/* Assinatura FAJ Invest — logo gigante cortado de fora a fora */}
      <div style={{
        background: 'var(--ink)',
        overflow: 'hidden',
        width: '100%',
        lineHeight: 0,
        height: 'clamp(88px, 15vw, 300px)',
      }}>
        <img src="assets/logo-faj-invest-branco.png" alt="FAJ Invest"
             style={{ width: '130%', marginLeft: '-0.3%', display: 'block' }} />
      </div>
    </React.Fragment>
  );
}

function FCol({ title, items }) {
  return (
    <div>
      <div className="eyebrow" style={{
        color: 'var(--neutral)', marginBottom: 20,
      }}>— {title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(it => (
          <li key={it.label}>
            <a href={it.href} style={{
              color: 'var(--paper)', textDecoration: 'none',
              fontSize: 14, opacity: 0.8,
              transition: 'opacity 0.3s',
            }} onMouseEnter={e => e.currentTarget.style.opacity = 1}
               onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const WEBHOOK_URL = 'https://autowebhook.grupofaj.app/webhook/forms-sites';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_produto'];

function getUtms() {
  try {
    const params = new URLSearchParams(window.location.search);
    return UTM_KEYS.reduce((acc, k) => {
      acc[k] = params.get(k) || '';
      return acc;
    }, {});
  } catch (e) {
    return UTM_KEYS.reduce((acc, k) => { acc[k] = ''; return acc; }, {});
  }
}

function Form() {
  const [values, setValues] = React.useState({
    nome: '', sobrenome: '', telefone: '', email: '', aceite: false,
  });
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const set = (k) => (e) => setValues({
    ...values,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
  });

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setError('');
    setSending(true);
    try {
      const payload = {
        nome: values.nome.trim(),
        sobrenome: values.sobrenome.trim(),
        telefone: values.telefone.trim(),
        email: values.email.trim(),
        aceite: values.aceite,
        origem: 'site-soho-business',
        url: window.location.href,
        enviado_em: new Date().toISOString(),
        ...getUtms(),
      };
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      // Sucesso — redireciona para a página de obrigado
      window.location.href = 'obrigado.html';
      return;
    } catch (err) {
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
      setSending(false);
    }
  };

  const input = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid var(--ink)',
    padding: '14px 0', fontSize: 15, fontFamily: 'var(--f-body)',
    color: 'var(--ink)', outline: 'none',
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <input style={input} placeholder="Nome*"
               value={values.nome} onChange={set('nome')} required />
        <input style={input} placeholder="Sobrenome*"
               value={values.sobrenome} onChange={set('sobrenome')} required />
      </div>
      <input style={input} type="tel" placeholder="Telefone*"
             value={values.telefone} onChange={set('telefone')} required />
      <input style={input} type="email" placeholder="E-mail*"
             value={values.email} onChange={set('email')} required />

      <label style={{
        display: 'flex', alignItems: 'flex-start', gap: 10,
        marginTop: 20, fontSize: 13, lineHeight: 1.5,
        color: '#333', cursor: 'pointer',
      }}>
        <input type="checkbox" checked={values.aceite} onChange={set('aceite')} required
               style={{ marginTop: 3, accentColor: 'var(--ink)', cursor: 'pointer' }} />
        <span>
          Aceito receber informações sobre o empreendimento SoHo Business e demais comunicações da FAJ Invest por e-mail, telefone e WhatsApp.*
        </span>
      </label>

      {error && (
        <div style={{
          marginTop: 12, padding: '10px 12px',
          border: '1px solid #c0392b', color: '#c0392b',
          fontSize: 13,
        }}>{error}</div>
      )}

      <button type="submit" className="btn" disabled={sending}
              style={{
                marginTop: 24, justifyContent: 'center',
                opacity: sending ? 0.6 : 1,
                cursor: sending ? 'not-allowed' : 'pointer',
              }}>
        {sending ? 'Enviando…' : <>Receber book <span className="arrow">→</span></>}
      </button>
    </form>
  );
}

window.Footer = Footer;
