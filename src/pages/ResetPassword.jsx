import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/auth'
import toast from 'react-hot-toast'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const { token }               = useParams()
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) return toast.error('Password must be at least 8 characters')
    setLoading(true)
    try {
      await resetPassword(token, password)
      toast.success('Password reset! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed — link may have expired')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="glass-card p-10">
          <h1 className="text-2xl font-bold mb-8">Set New Password</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
              placeholder="New password (min 8 chars)"
            />
            <button type="submit" disabled={loading} className="btn-gold w-full py-3 disabled:opacity-60">
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
