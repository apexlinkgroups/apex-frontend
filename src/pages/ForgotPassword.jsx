import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../services/auth'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="glass-card p-10">
          <h1 className="text-2xl font-bold mb-3">Reset Password</h1>
          {sent ? (
            <div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-dim)' }}>
                Check your inbox — we sent a reset link to <strong style={{ color: 'var(--gold)' }}>{email}</strong>.
              </p>
              <Link to="/login" className="btn-gold block text-center py-3">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
                Enter your email and we'll send a password reset link.
              </p>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                placeholder="you@example.com"
              />
              <button type="submit" disabled={loading} className="btn-gold w-full py-3 disabled:opacity-60">
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
              <div className="text-center">
                <Link to="/login" className="text-sm" style={{ color: 'var(--text-dim)' }}>← Back to Login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
