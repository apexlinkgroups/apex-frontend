import { Link } from 'react-router-dom'
import BeforeAfter from '../components/BeforeAfter'

// Demo placeholders — replace with real images
const DEMO_BEFORE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=60&sat=-100'
const DEMO_AFTER  = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'

export default function PhotoEditing() {
  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Services / Photo</p>
        <h1 className="font-display text-5xl font-black mb-6">Photo Editing</h1>
        <p className="text-xl mb-12 leading-relaxed" style={{ color: 'var(--text-dim)', maxWidth: '600px' }}>
          From subtle colour correction to full compositing, our editors bring your images to life.
        </p>

        {/* Before/After demo */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-dim)' }}>See the difference</h2>
          <BeforeAfter before={DEMO_BEFORE} after={DEMO_AFTER} alt="Photo editing example" />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { title: 'Colour Grading', desc: 'Hollywood-level grading — from subtle warmth adjustments to full cinematic looks.' },
            { title: 'Retouching', desc: 'Frequency separation, dodge & burn, skin smoothing that still looks natural.' },
            { title: 'Compositing', desc: 'Seamless multi-layer composites for advertising, editorial, or creative work.' },
            { title: 'Background Removal', desc: 'Precise cutouts with hair masking for any background replacement.' },
            { title: 'Object Removal', desc: 'Clean removal of distractions, watermarks, and unwanted elements.' },
            { title: 'Batch Processing', desc: 'Consistent edits across hundreds of photos with tight style matching.' },
          ].map(f => (
            <div key={f.title} className="glass-card p-6">
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Link to="/start-project?type=photo-editing" className="btn-gold px-8 py-3">Start a Photo Project</Link>
          <Link to="/pricing"                          className="btn-outline px-8 py-3">View Pricing</Link>
        </div>
      </div>
    </div>
  )
}
