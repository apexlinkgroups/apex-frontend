import { Link } from 'react-router-dom'

export default function VideoEditing() {
  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Services / Video</p>
        <h1 className="font-display text-5xl font-black mb-6">Video Editing</h1>
        <p className="text-xl mb-12 leading-relaxed" style={{ color: 'var(--text-dim)', maxWidth: '600px' }}>
          Cinematic cuts, motion graphics, and sonic design that transform raw footage into compelling stories.
        </p>

        {/* What's included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[
            { title: 'Narrative Editing', desc: 'Story-driven cuts with precise pacing and emotional arc.' },
            { title: 'Motion Graphics', desc: 'Custom animated titles, lower-thirds, and branded elements.' },
            { title: 'Colour Grading', desc: 'Log-to-Rec.709 and full cinematic grade sessions.' },
            { title: 'Sound Design', desc: 'Foley, music sync, dialogue cleanup, and mastering.' },
            { title: 'Visual Effects', desc: 'Compositing, green-screen keying, and light effects.' },
            { title: 'Multi-Platform Export', desc: 'YouTube, Instagram, TikTok, broadcast — any codec, any spec.' },
          ].map(f => (
            <div key={f.title} className="glass-card p-6 flex gap-4">
              <div className="w-2 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
              <div>
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process steps */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold mb-6">Our Process</h2>
          <div className="flex flex-col gap-0">
            {['Upload your footage','Choose style & direction','We edit & deliver a rough cut','Review & revise','Receive final exports'].map((step, i) => (
              <div key={step} className="flex items-start gap-4 pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--gold)', color: '#0a0800' }}>
                    {i + 1}
                  </div>
                  {i < 4 && <div className="w-px h-8 mt-1" style={{ background: 'var(--glass-border)' }} />}
                </div>
                <p className="pt-1.5" style={{ color: i === 0 ? 'var(--text)' : 'var(--text-dim)' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Link to="/start-project?type=video-editing" className="btn-gold px-8 py-3">Start a Video Project</Link>
          <Link to="/pricing"                          className="btn-outline px-8 py-3">View Pricing</Link>
        </div>
      </div>
    </div>
  )
}
