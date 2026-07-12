import { useState, useEffect } from 'react'
import api from '../services/api'
import BeforeAfter from '../components/BeforeAfter'

const CATS = ['all','photo-editing','video-editing','color-grading','retouching','composite']

export default function Portfolio() {
  const [items, setItems]     = useState([])
  const [cat, setCat]         = useState('all')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const params = cat !== 'all' ? { category: cat } : {}
    setLoading(true)
    api.get('/portfolio', { params }).then(r => setItems(r.data.items)).finally(() => setLoading(false))
  }, [cat])

  return (
    <div className="pt-28 pb-24 px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-[.4em] uppercase mb-3 text-center" style={{ color: 'var(--gold)' }}>Our Work</p>
        <h1 className="font-display text-5xl font-black text-center mb-4">Portfolio</h1>
        <p className="text-center text-lg mb-12" style={{ color: 'var(--text-dim)' }}>
          A selection of work across photography and film.
        </p>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all capitalize"
              style={{
                background: cat === c ? 'var(--gold)' : 'var(--bg3)',
                color: cat === c ? '#0a0800' : 'var(--text-dim)',
                border: `1px solid ${cat === c ? 'var(--gold)' : 'var(--glass-border)'}`,
              }}>
              {c === 'all' ? 'All Work' : c.replace('-', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: 'var(--gold)' }} />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'var(--text-dim)' }}>No portfolio items yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item._id}
                className="glass-card overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
                onClick={() => setSelected(item)}>
                {item.beforeImage && item.afterImage ? (
                  <BeforeAfter before={item.beforeImage} after={item.afterImage} alt={item.title} />
                ) : (
                  <img src={item.afterImage || item.video} alt={item.title}
                    className="w-full aspect-video object-cover" />
                )}
                <div className="p-4">
                  <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                    {item.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-semibold mt-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,.85)' }}
          onClick={() => setSelected(null)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="glass-card overflow-hidden">
              {selected.beforeImage ? (
                <BeforeAfter before={selected.beforeImage} after={selected.afterImage} alt={selected.title} />
              ) : (
                <img src={selected.afterImage} alt={selected.title} className="w-full" />
              )}
              <div className="p-6 flex justify-between items-start">
                <div>
                  <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
                    {selected.category.replace('-', ' ')}
                  </span>
                  <h2 className="text-xl font-bold mt-1">{selected.title}</h2>
                  {selected.description && <p className="text-sm mt-2" style={{ color: 'var(--text-dim)' }}>{selected.description}</p>}
                </div>
                <button onClick={() => setSelected(null)} className="text-2xl" style={{ color: 'var(--text-dim)' }}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
