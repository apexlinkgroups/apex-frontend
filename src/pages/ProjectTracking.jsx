import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../services/projects'
import { loadStripe } from '@stripe/stripe-js'
import { createStripeIntent, confirmStripe } from '../services/payment'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK || 'pk_test_placeholder')

const STEPS = ['pending', 'in-review', 'in-progress', 'completed', 'delivered']

export default function ProjectTracking() {
  const { id }            = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [payLoading, setPayLoading] = useState(false)

  useEffect(() => {
    getProject(id).then(r => setProject(r.data.project)).finally(() => setLoading(false))
  }, [id])

  const handlePay = async () => {
    setPayLoading(true)
    try {
      const { data } = await createStripeIntent(id)
      // In a full implementation you'd use @stripe/react-stripe-js Elements here
      // For MVP, direct to Stripe Checkout or handle via PaymentElement
      toast('Redirecting to payment…')
      // Simulate completion for demo
      await confirmStripe(id, data.intentId)
      const r = await getProject(id)
      setProject(r.data.project)
      toast.success('Payment successful!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    } finally { setPayLoading(false) }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: 'var(--gold)' }} />
    </div>
  )

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="text-center"><p className="text-xl mb-4">Project not found</p>
        <Link to="/dashboard" className="btn-gold px-6 py-2.5">← Dashboard</Link>
      </div>
    </div>
  )

  const activeStep = STEPS.indexOf(project.status)

  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/dashboard" className="text-sm mb-6 inline-flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
          style={{ color: 'var(--text-dim)' }}>← Back to Dashboard</Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-black">{project.title}</h1>
            <p className="text-sm mt-1 capitalize" style={{ color: 'var(--text-dim)' }}>
              {project.type.replace('-', ' ')} · Created {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
          {project.payment?.status !== 'paid' && project.pricing?.total > 0 && (
            <button onClick={handlePay} disabled={payLoading} className="btn-gold px-5 py-2.5 text-sm disabled:opacity-60">
              {payLoading ? 'Processing…' : `Pay $${project.pricing.total}`}
            </button>
          )}
        </div>

        {/* Progress tracker */}
        <div className="glass-card p-8 mb-6">
          <h2 className="font-semibold mb-6">Project Progress</h2>
          <div className="flex items-center mb-6">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: i <= activeStep ? 'var(--gold)' : 'var(--bg4)',
                      color: i <= activeStep ? '#0a0800' : 'var(--text-muted)',
                    }}>
                    {i < activeStep ? '✓' : i + 1}
                  </div>
                  <span className="text-xs mt-2 capitalize text-center" style={{ color: i <= activeStep ? 'var(--gold)' : 'var(--text-muted)' }}>
                    {s.replace('-', ' ')}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="h-0.5 flex-1 mx-2"
                    style={{ background: i < activeStep ? 'var(--gold)' : 'var(--glass-border)' }} />
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full mb-2" style={{ background: 'var(--bg4)' }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${project.progress || 0}%`, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{project.progress || 0}% complete</p>
        </div>

        {/* Timeline */}
        {project.timeline?.length > 0 && (
          <div className="glass-card p-8 mb-6">
            <h2 className="font-semibold mb-6">Timeline</h2>
            <div className="space-y-4">
              {[...project.timeline].reverse().map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--gold)' }} />
                  <div>
                    <p className="text-sm font-medium capitalize">{event.status.replace('-', ' ')}</p>
                    <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{event.message}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {new Date(event.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Output files */}
        {project.outputFiles?.length > 0 && (
          <div className="glass-card p-8">
            <h2 className="font-semibold mb-5">Deliverables</h2>
            <div className="space-y-3">
              {project.outputFiles.map((f, i) => (
                <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors hover:border-[var(--gold)]"
                  style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)' }}>
                  <span className="text-sm">{f.originalName || `File ${i + 1}`}</span>
                  <span className="text-xs" style={{ color: 'var(--gold)' }}>Download ↓</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
