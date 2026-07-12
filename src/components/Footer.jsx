import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-display text-xl tracking-widest mb-3" style={{ color: 'var(--gold)' }}>APEX STUDIO</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)', maxWidth: '320px' }}>
            Premium photo & video editing for visionaries. Cinematic quality, delivered with precision.
          </p>
          <div className="flex gap-4 mt-6">
            {['instagram','twitter','youtube','behance'].map(s => (
              <a key={s} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--bg3)', border: '1px solid var(--glass-border)', color: 'var(--text-dim)' }}>
                <span className="text-xs">{s[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Services</p>
          {['Photo Editing','Video Editing','Color Grading','Retouching','Compositing'].map(s => (
            <Link key={s} to="/services" className="block text-sm mb-2 transition-colors hover:text-[var(--gold)]"
              style={{ color: 'var(--text-dim)' }}>{s}</Link>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Company</p>
          {[['About', '/about'],['Portfolio', '/portfolio'],['Pricing', '/pricing'],['Contact', '/contact'],['Start Project', '/start-project']].map(([l, to]) => (
            <Link key={l} to={to} className="block text-sm mb-2 transition-colors hover:text-[var(--gold)]"
              style={{ color: 'var(--text-dim)' }}>{l}</Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2"
        style={{ borderTop: '1px solid var(--glass-border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} APEX LINK Studio. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          apexlinkgroups@gmail.com
        </p>
      </div>
    </footer>
  )
}
