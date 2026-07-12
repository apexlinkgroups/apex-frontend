import { useState, useEffect } from 'react'
import api from '../services/api'
import PricingCard from '../components/PricingCard'

const CATEGORIES = ['all','photo-editing','video-editing','color-grading','retouching','composite','bundle']

export default function Pricing() {
  const [plans, setPlans]     = useState([])
  const [cat, setCat]         = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = cat !== 'all' ? { category: cat } : {}
    api.get('/pricing', { params }).then(r => setPlans(r.data.plans)).finally(() => setLoading(false))
  }, [cat])

  return (
    <div className="pt-28 pb-24 px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-xs tracking-[.4em] uppercase mb-3 text-center" style={{ color: 'var(--gold)' }}>Transparent Pricing</p>
        <h1 className="font-display text-5xl font-black text-center mb-4">Choose Your Plan</h1>
        <p className="text-center text-lg mb-12" style={{ color: 'var(--text-dim)' }}>
          No hidden fees. Start immediately after payment.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all capitalize"
              style={{
                background: cat === c ? 'var(--gold)' : 'var(--bg3)',
                color: cat === c ? '#0a0800' : 'var(--text-dim)',
                border: `1px solid ${cat === c ? 'var(--gold)' : 'var(--glass-border)'}`,
              }}>
              {c === 'all' ? 'All' : c.replace('-', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: 'var(--gold)' }} />
          </div>
        ) : plans.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'var(--text-dim)' }}>No plans available in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(p => <PricingCard key={p._id} plan={p} />)}
          </div>
        )}

        {/* FAQ note */}
        <div className="glass-card p-8 mt-16 text-center">
          <h3 className="font-display text-xl font-bold mb-3">Need a custom quote?</h3>
          <p className="text-sm mb-5" style={{ color: 'var(--text-dim)' }}>
            Large projects, recurring retainers, or bundle deals — we'll build a package that fits.
          </p>
          <a href="/contact" className="btn-outline px-8 py-3 text-sm inline-block">Contact Us</a>
        </div>
      </div>
    </div>
  )
}
