import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/auth'
import toast from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', country: '' })
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters')
    setLoading(true)
    try {
      const { data } = await register(form)
      loginUser(data.token, data.refreshToken, data.user)
      toast.success('Account created! Welcome to APEX LINK Studio.')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="glass-card p-10">
          <p className="font-display text-2xl font-black mb-1" style={{ color: 'var(--gold)' }}>APEX STUDIO</p>
          <h1 className="text-2xl font-bold mb-8">Create your account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: 'Min 8 characters' },
              { key: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+1 555 000 0000' },
              { key: 'country', label: 'Country (optional)', type: 'text', placeholder: 'United States' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm mb-1.5" style={{ color: 'var(--text-dim)' }}>{label}</label>
                <input type={type} value={form[key]} onChange={update(key)}
                  required={!['phone','country'].includes(key)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg4)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                  placeholder={placeholder}
                />
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="btn-gold w-full py-3 mt-2 disabled:opacity-60">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: 'var(--text-dim)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--gold)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
