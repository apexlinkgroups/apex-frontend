import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Who We Are</p>
        <h1 className="font-display text-5xl font-black mb-8">About APEX LINK Studio</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-dim)' }}>
              APEX LINK Studio was founded with one mission: to give every photographer, filmmaker, and brand access to the kind of editing talent that was once reserved for major studios.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-dim)' }}>
              Our team of 50+ specialist editors work across photo retouching, cinematic colour grading, and video post-production — delivering results that make work unforgettable.
            </p>
          </div>
          <div className="glass-card p-8">
            <h3 className="font-display text-xl font-bold mb-5">Our Values</h3>
            {['Precision over speed', 'Transparency in every project', 'Creative partnership, not just service', 'Continuous improvement'].map(v => (
              <div key={v} className="flex items-start gap-3 mb-4">
                <span style={{ color: 'var(--gold)' }}>◆</span>
                <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { v: '2019', l: 'Founded' }, { v: '50+', l: 'Editors' },
            { v: '5K+', l: 'Projects' }, { v: '40+', l: 'Countries Served' },
          ].map(s => (
            <div key={s.l} className="glass-card p-6 text-center">
              <p className="font-display text-3xl font-black mb-1" style={{ color: 'var(--gold)' }}>{s.v}</p>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{s.l}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/contact" className="btn-gold px-10 py-4">Work With Us</Link>
        </div>
      </div>
    </div>
  )
}
