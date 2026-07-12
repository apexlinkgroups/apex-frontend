import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/auth'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm]   = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await login(form)
      loginUser(data.token, data.refreshToken, data.user)
      toast.success(`Welcome back, ${data.user.name}!`)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="glass-card p-10">
          <p className="font-display text-2xl font-black mb-1" style={{ color: 'var(--gold)' }}>APEX STUDIO</p>
          <h1 className="text-2xl font-bold mb-8">Sign in to your account</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-dim)' }}>Email address</label>
              <input type="email" required
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--text-dim)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required
                  value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-10"
                  style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: 'var(--text-dim)' }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm transition-colors hover:text-[var(--gold)]"
                style={{ color: 'var(--text-dim)' }}>Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading}
              className="btn-gold w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: 'var(--text-dim)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="transition-colors hover:text-[var(--gold)]" style={{ color: 'var(--gold)' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
