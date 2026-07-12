import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Contact form sends to backend /api/auth... or a dedicated contact route
    // For now simulate success
    await new Promise(r => setTimeout(r, 800))
    toast.success('Message sent! We'll reply within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Reach Out</p>
        <h1 className="font-display text-5xl font-black mb-4">Contact Us</h1>
        <p className="text-lg mb-14" style={{ color: 'var(--text-dim)' }}>
          Have a project in mind? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { k: 'name', label: 'Name', type: 'text', ph: 'Your full name' },
              { k: 'email', label: 'Email', type: 'email', ph: 'you@example.com' },
              { k: 'subject', label: 'Subject', type: 'text', ph: 'Project enquiry…' },
            ].map(({ k, label, type, ph }) => (
              <div key={k}>
                <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>{label}</label>
                <input type={type} required value={form[k]} onChange={update(k)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg3)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                  placeholder={ph} />
              </div>
            ))}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>Message</label>
              <textarea rows={6} required value={form.message} onChange={update('message')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'var(--bg3)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                placeholder="Describe your project…" />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full py-3 disabled:opacity-60">
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            {[
              { label: 'Email', value: 'apexlinkgroups@gmail.com', icon: '✉' },
              { label: 'Response Time', value: 'Within 24 hours', icon: '⏱' },
              { label: 'Working Hours', value: 'Mon–Fri, 9am–6pm (EST)', icon: '🕐' },
              { label: 'Rush Service', value: '24-hour turnaround available', icon: '⚡' },
            ].map(info => (
              <div key={info.label} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'var(--bg4)' }}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--text-muted)' }}>{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
