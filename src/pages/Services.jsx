import { Link } from 'react-router-dom'

const services = [
  {
    icon: '📸', title: 'Photo Editing', link: '/services/photo-editing',
    items: ['Color correction & grading', 'Background removal', 'Skin retouching', 'Composite & manipulation', 'Object removal / cloning'],
    deliverables: '10–500+ photos per batch',
  },
  {
    icon: '🎬', title: 'Video Editing', link: '/services/video-editing',
    items: ['Cinematic cuts & sequences', 'Motion graphics & titles', 'Color grade & LUT', 'Sound design & music sync', 'Export for all platforms'],
    deliverables: 'Up to 4K, any format',
  },
  {
    icon: '🎨', title: 'Color Grading', link: '/services',
    items: ['Hollywood-grade sessions', 'Custom LUT creation', 'Consistent brand palette', 'Log-to-Rec.709/P3', 'Skin-tone preservation'],
    deliverables: 'Photos & video sequences',
  },
  {
    icon: '✨', title: 'Retouching', link: '/services',
    items: ['High-end beauty retouching', 'Fashion & editorial work', 'Frequency separation', 'Dodge & burn', 'Studio blemish removal'],
    deliverables: 'Per-image or bulk rates',
  },
]

export default function Services() {
  return (
    <div className="pt-28 pb-24 px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-[.4em] uppercase mb-3 text-center" style={{ color: 'var(--gold)' }}>What We Offer</p>
        <h1 className="font-display text-5xl font-black text-center mb-4">Our Services</h1>
        <p className="text-center text-lg mb-16" style={{ color: 'var(--text-dim)', maxWidth: '540px', margin: '0 auto 4rem' }}>
          End-to-end creative editing for photographers, filmmakers, brands, and agencies.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map(svc => (
            <div key={svc.title} className="glass-card p-8 transition-all hover:border-[var(--gold)]">
              <div className="text-5xl mb-5">{svc.icon}</div>
              <h2 className="font-display text-2xl font-bold mb-4">{svc.title}</h2>

              <ul className="space-y-2.5 mb-6">
                {svc.items.map(i => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-dim)' }}>
                    <span className="mt-0.5" style={{ color: 'var(--gold)' }}>◆</span>
                    {i}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: 'var(--bg4)', color: 'var(--text-dim)', border: '1px solid var(--glass-border)' }}>
                  {svc.deliverables}
                </span>
                <Link to={svc.link} className="text-sm font-semibold transition-colors hover:text-[var(--gold-light)]"
                  style={{ color: 'var(--gold)' }}>
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="glass-card p-10 mt-12 text-center">
          <h3 className="font-display text-3xl font-bold mb-4">Not sure what you need?</h3>
          <p className="mb-6" style={{ color: 'var(--text-dim)' }}>Send us your files and we'll scope the project for free.</p>
          <Link to="/contact" className="btn-gold px-8 py-3">Get a Free Quote</Link>
        </div>
      </div>
    </div>
  )
}
